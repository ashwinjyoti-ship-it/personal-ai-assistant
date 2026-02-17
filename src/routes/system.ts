// System routes — heartbeat, health, cron execution with overlap lock + state machine

import { Hono } from 'hono';
import type { AppEnv, CronJobRecord } from '../types';
import { logError } from '../services/llm/provider';
import { decrypt } from '../services/crypto';

const system = new Hono<AppEnv>();

// Public health check
system.get('/health', async (c) => {
  try {
    // Test DB connection
    const start = Date.now();
    await c.env.DB.prepare('SELECT 1').first();
    const latency = Date.now() - start;

    return c.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      db_latency_ms: latency,
      version: '3.1.0',
    });
  } catch (err) {
    return c.json({ status: 'error', error: 'Database unreachable' }, 500);
  }
});

// Record heartbeat
system.post('/heartbeat', async (c) => {
  try {
    const start = Date.now();
    await c.env.DB.prepare('SELECT 1').first();
    const latency = Date.now() - start;

    await c.env.DB.prepare(
      `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
    ).bind('ok', latency, JSON.stringify({ timestamp: new Date().toISOString() })).run();

    // Clean old heartbeat logs (keep last 1000)
    await c.env.DB.prepare(
      `DELETE FROM heartbeat_log WHERE id NOT IN (
        SELECT id FROM heartbeat_log ORDER BY created_at DESC LIMIT 1000
      )`
    ).run();

    return c.json({ status: 'ok', latency_ms: latency });
  } catch (err: any) {
    return c.json({ status: 'error', error: err.message }, 500);
  }
});

// Get system status (authenticated)
system.get('/status', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Auth required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number }>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  const userId = session.user_id;

  const [activeJobs, memoryCount, msgCount, lastHeartbeat, errorCount] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT status, latency_ms, created_at FROM heartbeat_log ORDER BY created_at DESC LIMIT 1').first<any>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0').bind(userId).first<{ cnt: number }>(),
  ]);

  return c.json({
    active_schedules: activeJobs?.cnt || 0,
    memory_entries: memoryCount?.cnt || 0,
    total_messages: msgCount?.cnt || 0,
    unread_errors: errorCount?.cnt || 0,
    heartbeat: lastHeartbeat || { status: 'unknown' },
    version: '3.1.0',
  });
});

// === Cron Executor with Overlap Lock + State Machine ===

// Stale lock timeout: 30 minutes
const STALE_LOCK_MINUTES = 30;

// Acquire lock for a job — returns true if lock acquired, false if already locked
async function acquireCronLock(db: D1Database, jobId: number, userId: number): Promise<{ acquired: boolean; executionId?: number }> {
  const now = new Date().toISOString();
  const staleThreshold = new Date(Date.now() - STALE_LOCK_MINUTES * 60 * 1000).toISOString();

  // Check for existing running lock that isn't stale
  const existing = await db.prepare(
    `SELECT id, started_at FROM cron_execution_log 
     WHERE job_id = ? AND status = 'running' AND started_at > ?`
  ).bind(jobId, staleThreshold).first<{ id: number; started_at: string }>();

  if (existing) {
    return { acquired: false };
  }

  // Clear any stale locks
  await db.prepare(
    `UPDATE cron_execution_log SET status = 'failed', error = 'Stale lock cleared', completed_at = ?
     WHERE job_id = ? AND status = 'running' AND started_at <= ?`
  ).bind(now, jobId, staleThreshold).run();

  // Create new lock
  const idempotencyKey = `${jobId}-${now}`;
  await db.prepare(
    `INSERT INTO cron_execution_log (job_id, user_id, status, idempotency_key) VALUES (?, ?, 'running', ?)`
  ).bind(jobId, userId, idempotencyKey).run();

  const lockRecord = await db.prepare(
    `SELECT id FROM cron_execution_log WHERE idempotency_key = ?`
  ).bind(idempotencyKey).first<{ id: number }>();

  return { acquired: true, executionId: lockRecord?.id };
}

// Release lock on completion
async function releaseCronLock(db: D1Database, executionId: number, status: 'completed' | 'failed', result: string = '', error: string = ''): Promise<void> {
  await db.prepare(
    `UPDATE cron_execution_log SET status = ?, completed_at = CURRENT_TIMESTAMP, result = ?, error = ? WHERE id = ?`
  ).bind(status, result, error, executionId).run();
}

// Transition cron job state
async function transitionJobState(db: D1Database, jobId: number, currentState: string, actionType: string): Promise<string> {
  // State machine: created → active → reminding → acknowledged → completed
  // Reminder jobs cycle: active → reminding (on fire) → active (on next fire)
  // One-off reminders: active → completed (when user marks done)
  
  let newState = currentState;

  switch (actionType) {
    case 'reminder':
    case 'check_mail':
    case 'check_sheet':
    case 'check_calendar':
      // Recurring tasks cycle between active and reminding
      if (currentState === 'active' || currentState === 'created') {
        newState = 'reminding';
      }
      break;
    case 'custom':
    default:
      if (currentState === 'created') newState = 'active';
      break;
  }

  if (newState !== currentState) {
    await db.prepare(
      `UPDATE cron_jobs SET state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    ).bind(newState, jobId).run();
  }

  return newState;
}

// === Telegram push helper for cron notifications ===
async function sendCronTelegram(db: D1Database, userId: number, chatId: string, text: string): Promise<void> {
  try {
    const cred = await db.prepare(
      `SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`
    ).bind(userId).first<{ encrypted_value: string; pin_hash: string }>();
    if (!cred) return;

    const botToken = await decrypt(cred.encrypted_value, cred.pin_hash);
    const TG_MAX = 4000;
    const msg = text.length > TG_MAX ? text.substring(0, TG_MAX - 3) + '...' : text;
    
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
    });
    if (!res.ok) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg }),
      });
    }
  } catch (_) { /* silent */ }
}

// === Helper: get current time in a user's timezone ===
function nowInTimezone(tz: string): Date {
  // Build a locale string in the user's timezone and parse it back
  const str = new Date().toLocaleString('en-US', { timeZone: tz });
  return new Date(str);
}

// Cron executor — processes due scheduled jobs
// Protected by CRON_SECRET header so only the cron worker can call it
system.post('/cron/execute', async (c) => {
  // Auth: require shared secret
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const now = new Date();
  const nowISO = now.toISOString();
  
  // Record heartbeat
  try {
    await c.env.DB.prepare(
      `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
    ).bind('ok', 0, JSON.stringify({ event: 'cron_tick', ts: nowISO })).run();
  } catch (_) {}

  // Find all due jobs — compare next_run (stored in UTC) against current UTC
  const dueJobs = await c.env.DB.prepare(
    `SELECT cj.*, u.name as user_name, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`
  ).bind(nowISO).all<CronJobRecord & { user_name: string; telegram_chat_id: string; user_timezone: string }>();

  const results: any[] = [];
  const telegramPromises: Promise<void>[] = [];

  for (const job of (dueJobs.results || [])) {
    // Acquire lock — skip if already running
    const lock = await acquireCronLock(c.env.DB, job.id, job.user_id);
    if (!lock.acquired) {
      results.push({ job_id: job.id, name: job.name, status: 'skipped', reason: 'locked' });
      continue;
    }

    try {
      // Transition state
      const newState = await transitionJobState(c.env.DB, job.id, job.state || 'active', job.action_type);

      // Calculate next run — timezone-aware for daily schedules
      const userTz = job.user_timezone || 'UTC';
      let nextRun: Date;

      if (job.schedule_type === 'interval') {
        const minutes = parseInt(job.schedule_value, 10);
        nextRun = new Date(now.getTime() + minutes * 60 * 1000);
      } else if (job.schedule_type === 'daily') {
        // schedule_value is "HH:MM" in the user's local timezone
        const [hours, mins] = job.schedule_value.split(':').map(Number);
        // Get "now" in user's timezone to compute next occurrence
        const userNow = nowInTimezone(userTz);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
        // Convert back to UTC by computing the offset
        const utcEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: userTz }));
        const offsetMs = utcEquivalent.getTime() - tzEquivalent.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
      } else {
        nextRun = new Date(now.getTime() + 60 * 60 * 1000);
      }

      // Update job timing
      await c.env.DB.prepare(
        `UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(nowISO, nextRun.toISOString(), job.id).run();

      // Build notification content
      const config = JSON.parse(job.action_config || '{}');
      const title = '⏰ ' + (job.name || 'Scheduled Task');
      const body = config.description || job.description || 'Time for your scheduled task.';
      const notifText = title + '\n' + body;

      // 1) Write to notifications table (powers the bell icon on web)
      await c.env.DB.prepare(
        `INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)`
      ).bind(job.user_id, 'reminder', title, body, 'cron:' + job.id).run();

      // 2) Also keep in conversations for thread history
      await c.env.DB.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
      ).bind(job.user_id, 'system', 'assistant', notifText, JSON.stringify({ type: 'cron', job_id: job.id, state: newState })).run();

      // 3) Push to Telegram if chat ID exists
      if (job.telegram_chat_id) {
        telegramPromises.push(sendCronTelegram(c.env.DB, job.user_id, job.telegram_chat_id, notifText));
      }

      // Release lock — success
      await releaseCronLock(c.env.DB, lock.executionId!, 'completed', `Executed: ${job.name}`);
      results.push({ job_id: job.id, name: job.name, status: 'executed', state: newState, next_run: nextRun.toISOString() });
    } catch (err: any) {
      if (lock.executionId) {
        await releaseCronLock(c.env.DB, lock.executionId, 'failed', '', err.message);
      }
      await logError(c.env.DB, job.user_id, 'cron', 'execution_error', err.message || 'Cron job failed', { job_id: job.id, job_name: job.name });
      results.push({ job_id: job.id, name: job.name, status: 'error', error: err.message });
    }
  }

  // Fire Telegram pushes in parallel (don't block response)
  if (telegramPromises.length > 0) {
    await Promise.allSettled(telegramPromises);
  }

  return c.json({ 
    executed: results.length, 
    results,
    timestamp: nowISO,
  });
});

export default system;
