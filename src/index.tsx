// Karna — Personal AI Assistant
// Main application entry point

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from './types';
import { getAppHTML } from './frontend';

// Route imports
import auth from './routes/auth';
import chat from './routes/chat';
import settings from './routes/settings';
import system from './routes/system';
import telegram from './routes/channels/telegram';
import { completeOAuthFlow } from './services/google';
import { decrypt } from './services/crypto';

const app = new Hono<AppEnv>();

// Global middleware
app.use('/api/*', cors());

// API routes
app.route('/api/auth', auth);
app.route('/api/chat', chat);
app.route('/api/settings', settings);
app.route('/api/system', system);
app.route('/api/telegram', telegram);

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

// Serve the main application HTML
app.get('/', (c) => {
  return c.html(getAppHTML());
});

// Catch-all for SPA — serve the same HTML for any non-API route
app.get('*', (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: 'Not found' }, 404);
  }
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

// Cron handler for Cloudflare Workers scheduled events
export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
    // Execute due cron jobs
    const now = new Date().toISOString();
    
    try {
      // Record heartbeat
      await env.DB.prepare(
        `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
      ).bind('ok', 0, JSON.stringify({ event: 'cron_tick', trigger: event.cron })).run();

      // Find and execute due jobs
      const dueJobs = await env.DB.prepare(
        `SELECT cj.*, u.name as user_name, u.telegram_chat_id 
         FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
         WHERE cj.enabled = 1 AND cj.next_run <= ?`
      ).bind(now).all();

      for (const job of (dueJobs.results || [])) {
        const currentTime = new Date();
        let nextRun: Date;

        if (job.schedule_type === 'interval') {
          const minutes = parseInt(job.schedule_value, 10);
          nextRun = new Date(currentTime.getTime() + minutes * 60 * 1000);
        } else if (job.schedule_type === 'daily') {
          const [hours, mins] = job.schedule_value.split(':').map(Number);
          nextRun = new Date(currentTime);
          nextRun.setUTCHours(hours, mins, 0, 0);
          if (nextRun <= currentTime) nextRun.setDate(nextRun.getDate() + 1);
        } else {
          nextRun = new Date(currentTime.getTime() + 60 * 60 * 1000);
        }

        // Update job
        await env.DB.prepare(
          `UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(now, nextRun.toISOString(), job.id).run();

        // Store notification
        const config = JSON.parse(job.action_config || '{}');
        const notificationText = '⏰ Scheduled: **' + job.name + '**\n' + (config.description || job.description || '');

        await env.DB.prepare(
          `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
        ).bind(job.user_id, 'system', 'assistant', notificationText, JSON.stringify({ type: 'cron', job_id: job.id })).run();
      }
    } catch (err) {
      console.error('Cron execution error:', err);
      await env.DB.prepare(
        `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
      ).bind('error', 0, JSON.stringify({ error: String(err) })).run();
    }
  }
};
