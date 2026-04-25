// Karna — Personal AI Assistant
// Main application entry point

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from './types';
import { getAppHTML } from './frontend';

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
import commandCenter from './routes/command-center';
import documents from './routes/documents';
import { completeOAuthFlow } from './services/google';
// crypto import removed — cron logic moved to system.ts

const app = new Hono<AppEnv>();

// Global middleware
app.use('/api/*', cors());

// API routes
app.route('/api/auth', auth);
app.route('/api/chat', chat);
app.route('/api/settings', settings);
app.route('/api/system', system);
app.route('/api/telegram', telegram);
app.route('/api/proactive', proactive);
app.route('/api/skills', skillsRouter);
app.route('/api', commandCenter);
app.route('/api/documents', documents);

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

// Serve the main application HTML — no-cache to prevent stale UI
app.get('/', (c) => {
  c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
  return c.html(getAppHTML());
});

// Catch-all for SPA — serve the same HTML for any non-API route
app.get('*', (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: 'Not found' }, 404);
  }
  c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
  return c.html(getAppHTML());
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

    for (const endpoint of ['morning-briefing', 'email-digest', 'weekly-review']) {
      ctx.waitUntil(
        fetch(`${appUrl}/api/proactive/cron/${endpoint}`, {
          method: 'POST', headers,
        }).then(r => r.json()).then((r: any) => {
          if (r.executed > 0) console.log(`${endpoint} result:`, JSON.stringify(r));
        }).catch(err => {
          console.error(`${endpoint} error:`, err.message);
        })
      );
    }
    
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
