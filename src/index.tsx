// Karna — Personal AI Assistant
// Main application entry point

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from './types';
import { getAppHTML } from './frontend';
import { getDashboardPreviewHTML } from './frontend/preview-dashboard';

// Cloudflare Workers types for scheduled events
type ScheduledEvent = {
  scheduledTime: number;
  cron: string;
};
type ExecutionContext = {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
};

// Route imports
import auth from './routes/auth';
import chat from './routes/chat';
import settings from './routes/settings';
import system from './routes/system';
import telegram from './routes/channels/telegram';
import proactive from './routes/proactive';
import skillsRouter from './routes/skills';
import notifications from './routes/notifications';
import documents from './routes/documents';
import memoryReview from './routes/memory-review';
import { completeOAuthFlow } from './services/google';
// crypto import removed — cron logic moved to system.ts

// Exported so the Render Node entrypoint (src/render/server.ts) can mount the
// exact same routes natively, injecting Cloudflare-compatible bindings per request.
export const app = new Hono<AppEnv>();

const RENDER_PROXY_ROUTES = [
  '/api/auth',
  '/api/chat',
  '/api/settings',
  '/api/telegram',
  '/api/system',
  '/api/proactive',
  '/api/skills',
  '/api/notifications',
  '/api/documents',
  '/api/memory',
];

async function proxyToRender(c: any) {
  const renderUrl = c.env.RENDER_BACKEND_URL;
  const sharedSecret = c.env.RENDER_API_SECRET;
  const enabled = c.env.ENABLE_RENDER_PROXY === 'true';
  if (!enabled || !renderUrl || !sharedSecret) return null;

  // Break the proxy loop: requests that originated from the Render worker
  // (forwarded back to Cloudflare) must be processed locally, not re-proxied.
  if (c.req.header('x-via-render-worker')) return null;

  const shouldProxy = RENDER_PROXY_ROUTES.some((route) => c.req.path.startsWith(route));
  if (!shouldProxy) return null;

  const target = new URL(c.req.url);
  target.protocol = new URL(renderUrl).protocol;
  target.host = new URL(renderUrl).host;

  const headers = new Headers(c.req.header());
  headers.set('x-render-api-secret', sharedSecret);

  // Chat (SSE) and Telegram (blocking JSON) routes run browser tasks up to 5 min.
  // 310s = DEFAULT_TIMEOUT_MS (300s) + 10s headroom for the CF→Render proxy hop.
  // For SSE, fetch() resolves on headers so clearTimeout fires within seconds anyway —
  // the high value only matters for blocking routes like Telegram webhook.
  const isLongRoute = c.req.path.startsWith('/api/chat') || c.req.path.startsWith('/api/telegram');
  const longRouteTimeoutMs = Number(c.env.RENDER_PROXY_TIMEOUT_MS_LONG || '310000');
  const shortRouteTimeoutMs = Number(c.env.RENDER_PROXY_TIMEOUT_MS || '8000');
  const timeoutMs = isLongRoute ? longRouteTimeoutMs : shortRouteTimeoutMs;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('render-proxy-timeout'), timeoutMs);

  let res: Response;
  try {
    res = await fetch(target.toString(), {
    method: c.req.method,
    headers,
    body: c.req.method === 'GET' || c.req.method === 'HEAD' ? undefined : await c.req.arrayBuffer(),
    signal: controller.signal,
  });
  } catch (error) {
    return c.json({ error: 'Render backend unavailable', detail: String(error) }, 503);
  } finally {
    clearTimeout(timer);
  }

  return new Response(res.body, { status: res.status, headers: res.headers });
}

// Global middleware
app.use('/api/*', cors({
  exposeHeaders: ['X-Thread-Id'],
}));
// Optional split-architecture proxy: when RENDER_BACKEND_URL is set,
// selected API routes are forwarded to Render.
app.use('/api/*', async (c, next) => {
  const proxied = await proxyToRender(c);
  if (proxied) return proxied;
  await next();
});


// API routes
app.route('/api/auth', auth);
app.route('/api/chat', chat);
app.route('/api/settings', settings);
app.route('/api/system', system);
app.route('/api/telegram', telegram);
app.route('/api/proactive', proactive);
app.route('/api/skills', skillsRouter);
app.route('/api/notifications', notifications);
app.route('/api/documents', documents);
app.route('/api/memory', memoryReview);

// ==========================================
// Google OAuth 2.0 Callback
// ==========================================
// This handles the redirect from Google after user grants consent.
// Extracts the code, exchanges for tokens, stores the refresh token.
app.get('/auth/google/callback', async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return c.html(getOAuthResultHTML(false, `Google denied access: ${error}`));
  }

  if (!code || !state) {
    return c.html(getOAuthResultHTML(false, 'Missing authorization code or state parameter.'));
  }

  try {
    // Decode state to get session ID
    const stateData = JSON.parse(atob(state));
    const sessionId = stateData.sessionId;

    if (!sessionId) {
      return c.html(getOAuthResultHTML(false, 'Invalid state parameter — missing session.'));
    }

    // Verify session
    const session = await c.env.DB.prepare(
      `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`
    ).bind(sessionId).first<any>();

    if (!session) {
      return c.html(getOAuthResultHTML(false, 'Session expired. Please log in again and retry.'));
    }

    const userId = session.user_id;
    const pinHash = session.pin_hash;

    // Build redirect URI (must match exactly what was sent to Google)
    const redirectUri = `${url.protocol}//${url.host}/auth/google/callback`;

    // Complete the OAuth flow — exchanges code for tokens, stores them
    const result = await completeOAuthFlow(
      c.env.DB, userId, pinHash, code, redirectUri,
      c.env.GOOGLE_CLIENT_ID, c.env.GOOGLE_CLIENT_SECRET
    );

    return c.html(getOAuthResultHTML(true, `Connected as ${result.email}`, result.email));
  } catch (err: any) {
    return c.html(getOAuthResultHTML(false, `OAuth failed: ${err.message}`));
  }
});

// Local UI preview — dashboard with new tiles, no auth required
app.get('/preview-dashboard', (c) => {
  c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  return c.html(getDashboardPreviewHTML());
});

// Serve the main application HTML — no-cache to prevent stale UI
app.get('/', (c) => {
  c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
  return c.html(getAppHTML(c.env.API_BASE_URL || ''));
});

// Catch-all for SPA — serve the same HTML for any non-API route
app.get('*', (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: 'Not found' }, 404);
  }
  c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
  return c.html(getAppHTML(c.env.API_BASE_URL || ''));
});

// OAuth callback result page
function getOAuthResultHTML(success: boolean, message: string, email?: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Google OAuth — Karna</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center; min-height:100vh;
    background:#0a0a0a; color:#e0e0e0; font-family:'Inter',sans-serif; }
  .card { background:#141414; border:1px solid #222; border-radius:12px; padding:32px; max-width:400px; text-align:center; }
  .icon { font-size:48px; margin-bottom:16px; }
  .msg { font-size:15px; color:#999; margin:12px 0; }
  .email { color:#4fd1c5; font-weight:500; }
  .btn { display:inline-block; margin-top:16px; padding:10px 24px; background:#4fd1c5; color:#0a0a0a;
    border:none; border-radius:8px; font-weight:600; cursor:pointer; text-decoration:none; font-size:14px; }
</style></head><body>
<div class="card">
  <div class="icon">${success ? '&#10003;' : '&#10007;'}</div>
  <h2 style="margin:0; color:${success ? '#4fd1c5' : '#ff6b6b'};">${success ? 'Connected' : 'Connection Failed'}</h2>
  <p class="msg">${message}</p>
  ${email ? '<p class="email">' + email + '</p>' : ''}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${success}, email: '${email || ''}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
</script>
</body></html>`;
}

// ==========================================
// Scheduled Handler — Integrated Cron (runs every minute)
// ==========================================
async function scheduled(event: ScheduledEvent, env: AppEnv['Bindings'], ctx: ExecutionContext) {
  const appUrl = 'https://karna-5xs.pages.dev'; // Production URL
  const secret = env.CRON_SECRET || 'karna-cron-default-v1';
  const headers = { 'Content-Type': 'application/json', 'X-Cron-Secret': secret };

  try {
    // === Phase 1: Find and dispatch due cron jobs (fast) ===
    const res = await fetch(`${appUrl}/api/system/cron/execute`, {
      method: 'POST', headers,
    });
    const data = await res.json() as any;
    
    // Phase 2: Run agent for each actionable job (parallel)
    if (data.results && data.results.length > 0) {
      const agentJobs = data.results.filter((r: any) => r.needs_agent && r.status === 'dispatched');
      
      if (agentJobs.length > 0) {
        const promises = agentJobs.map((job: any) =>
          fetch(`${appUrl}/api/system/cron/run-task/${job.job_id}`, {
            method: 'POST', headers,
          }).then(r => r.json()).catch(err => ({ job_id: job.job_id, error: err.message }))
        );
        
        ctx.waitUntil(Promise.allSettled(promises).then(results => {
          console.log(`Cron: ${data.executed} dispatched, ${agentJobs.length} agent tasks`, 
            JSON.stringify(results.map((r: any) => r.status === 'fulfilled' ? r.value : r.reason)));
        }));
      }

      const simpleJobs = data.results.filter((r: any) => !r.needs_agent && r.status === 'dispatched');
      if (simpleJobs.length > 0) {
        const simplePromises = simpleJobs.map((job: any) =>
          fetch(`${appUrl}/api/system/cron/run-task/${job.job_id}`, {
            method: 'POST', headers,
          }).catch(() => {})
        );
        ctx.waitUntil(Promise.allSettled(simplePromises));
      }
    }

    // === Phase 3: Proactive Intelligence ===
    
    // Evening Briefing — runs every minute, endpoint checks each user's preferred briefing time
    ctx.waitUntil(
      fetch(`${appUrl}/api/proactive/cron/evening-briefing`, {
        method: 'POST', headers,
      }).then(r => r.json()).then((r: any) => {
        if (r.executed > 0) {
          console.log('Evening briefing result:', JSON.stringify(r));
        }
      }).catch(err => {
        console.error('Evening briefing error:', err.message);
      })
    );
    
    // Meeting Reminders — every 5 minutes
    const minute = new Date().getMinutes();
    if (minute % 5 < 2) {
      ctx.waitUntil(
        fetch(`${appUrl}/api/proactive/cron/meeting-reminders`, {
          method: 'POST', headers,
        }).then(r => r.json()).then((r: any) => {
          if (r.results?.some((x: any) => x.reminders_sent > 0)) {
            console.log('Meeting reminders:', JSON.stringify(r));
          }
        }).catch(() => {})
      );
    }

    // Pending Browser Task Notifier — every minute, lightweight poll
    ctx.waitUntil(
      fetch(`${appUrl}/api/system/cron/check-browser-tasks`, {
        method: 'POST', headers,
      }).catch(() => {})
    );
  } catch (err: any) {
    console.error('Scheduled cron error:', err.message || err);
  }
}

// ==========================================
// Export — fetch + scheduled (integrated cron)
// ==========================================
export default {
  fetch: app.fetch,
  scheduled,
};
