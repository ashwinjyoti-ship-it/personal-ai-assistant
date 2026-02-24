// System routes — heartbeat, health, cron execution with overlap lock + state machine

import { Hono } from 'hono';
import type { AppEnv, CronJobRecord, UserRecord, NormalizedMessage } from '../types';
import { logError, createRotatingProvider } from '../services/llm/provider';
import { decrypt } from '../services/crypto';
import { runAgent } from '../services/agent';

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

  const [activeJobs, memoryCount, msgCount, errorCount] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0').bind(userId).first<{ cnt: number }>(),
  ]);

  return c.json({
    active_schedules: activeJobs?.cnt || 0,
    memory_entries: memoryCount?.cnt || 0,
    total_messages: msgCount?.cnt || 0,
    unread_errors: errorCount?.cnt || 0,
    heartbeat: { status: 'ok' },
    version: '4.0.0',
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

// ─── Phase 1: Fast dispatcher — finds due jobs, updates timing, returns job IDs for Phase 2 ───
system.post('/cron/execute', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  const now = new Date();
  const nowISO = now.toISOString();
  
  try {
    await c.env.DB.prepare(
      `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
    ).bind('ok', 0, JSON.stringify({ event: 'cron_tick', ts: nowISO })).run();
  } catch (_) {}

  const dueJobs = await c.env.DB.prepare(
    `SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`
  ).bind(nowISO).all<any>();

  const results: any[] = [];

  for (const job of (dueJobs.results || [])) {
    try {
      // Calculate next run — timezone-aware
      const userTz = job.user_timezone || 'UTC';
      let nextRun: Date;

      // We need to determine if we should keep it enabled or complete it
      let shouldDisable = false;
      let newState = job.state || 'active';

      if (job.schedule_type === 'interval') {
        const minutes = parseInt(job.schedule_value, 10);
        nextRun = new Date(now.getTime() + minutes * 60 * 1000);
      } else if (job.schedule_type === 'daily') {
        const [hours, mins] = job.schedule_value.split(':').map(Number);
        const userNow = nowInTimezone(userTz);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
        const utcEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: userTz }));
        const offsetMs = utcEquivalent.getTime() - tzEquivalent.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
      } else if (job.schedule_type === 'weekly') {
        // schedule_value format: "Friday 17:00" or "Friday 17:00:00"
        const [dayStr, timeStr] = job.schedule_value.split(' ');
        const [hours, mins] = (timeStr || '00:00').split(':').map(Number);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const targetDay = days.findIndex(d => d.toLowerCase() === dayStr.toLowerCase());
        
        const userNow = nowInTimezone(userTz);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        
        // If it's already past the time today, or it's not the target day, add days
        let daysToAdd = (targetDay - candidate.getDay() + 7) % 7;
        if (daysToAdd === 0 && candidate <= userNow) {
          daysToAdd = 7;
        }
        candidate.setDate(candidate.getDate() + daysToAdd);
        
        const utcEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: userTz }));
        const offsetMs = utcEquivalent.getTime() - tzEquivalent.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
      } else if (job.schedule_type === 'once') {
        shouldDisable = true;
        newState = 'completed';
        nextRun = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year future, won't run anyway
      } else {
        nextRun = new Date(now.getTime() + 60 * 60 * 1000);
      }

      // Update timing immediately (prevents re-firing next tick)
      await c.env.DB.prepare(
        `UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(nowISO, nextRun.toISOString(), shouldDisable ? 0 : job.enabled, newState, job.id).run();

      const config = JSON.parse(job.action_config || '{}');
      const isActionable = (config.description || job.description) && (
        job.action_type === 'check_mail' || job.action_type === 'check_calendar' ||
        job.action_type === 'check_sheet' || job.action_type === 'custom'
      );

      results.push({
        job_id: job.id,
        name: job.name,
        status: 'dispatched',
        needs_agent: isActionable,
        next_run: nextRun.toISOString(),
      });
    } catch (err: any) {
      results.push({ job_id: job.id, name: job.name, status: 'error', error: err.message });
    }
  }

  return c.json({ executed: results.length, results, timestamp: nowISO });
});

// ─── Phase 2: Run a single task through the agent (called per-job by cron worker) ───
// This endpoint gets its own request with full timeout budget (~30s on Workers).
system.post('/cron/run-task/:jobId', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  const jobId = parseInt(c.req.param('jobId'), 10);
  if (!jobId) return c.json({ error: 'Invalid job ID' }, 400);

  // Load job + user
  const job = await c.env.DB.prepare(
    `SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`
  ).bind(jobId).first<any>();

  if (!job) return c.json({ error: 'Job not found' }, 404);

  const config = JSON.parse(job.action_config || '{}');
  const taskDescription = config.description || job.description || '';
  const title = '⏰ ' + (job.name || 'Scheduled Task');
  const nowISO = new Date().toISOString();

  // Run agent
  let agentResponse = '';
  try {
    const user: UserRecord = {
      id: job.user_id,
      username: job.username || 'user',
      name: job.user_name || 'User',
      pin_hash: job.pin_hash || '',
      role: job.user_role || '',
      personality_prompt: job.personality_prompt || '',
      telegram_chat_id: job.telegram_chat_id || '',
      timezone: job.user_timezone || 'UTC',
      assistant_name: job.assistant_name || 'Karna',
      created_at: '',
      updated_at: '',
    };

    const cronMessage: NormalizedMessage = {
      userId: job.user_id,
      username: user.username,
      channel: 'web',
      text: `[Scheduled task "${job.name}"]: ${taskDescription}. Respond with a short, clean plain-text summary. No markdown headers, no bold markers. Use simple numbered lines.`,
      sessionId: 'cron-' + job.id,
      timestamp: nowISO,
    };

    const { provider, rotation } = await createRotatingProvider(c.env.DB, job.user_id, job.pin_hash);
    agentResponse = await runAgent(cronMessage, c.env.DB, provider, user, rotation, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
      GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
    });
  } catch (agentErr: any) {
    // Log the real error for debugging, but give users a clean message
    const errMsg = agentErr.message || 'unknown error';
    const isRateLimit = errMsg.includes('rate_limit') || errMsg.includes('429') || errMsg.includes('quota');
    const isTimeout = errMsg.includes('timeout') || errMsg.includes('Timeout');
    
    if (isRateLimit) {
      agentResponse = 'Couldn\u2019t complete this task right now \u2014 API rate limit reached. Will run at next scheduled time.';
    } else if (isTimeout) {
      agentResponse = 'Task timed out. Will retry at next scheduled time.';
    } else {
      agentResponse = 'Task encountered an error. Will retry at next scheduled time.';
    }
    await logError(c.env.DB, job.user_id, 'cron_agent', 'execution_error', errMsg, { job_id: job.id });
  }

  // Build notification
  const body = agentResponse || taskDescription || 'Time for your scheduled task.';
  const notifText = title + '\n' + body;

  // Write to notifications table (bell icon)
  await c.env.DB.prepare(
    `INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)`
  ).bind(job.user_id, 'reminder', title, body, 'cron:' + job.id).run();

  // Write to conversations (history)
  await c.env.DB.prepare(
    `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
  ).bind(job.user_id, 'system', 'assistant', notifText, JSON.stringify({ type: 'cron', job_id: job.id })).run();

  // Push to Telegram
  if (job.telegram_chat_id) {
    await sendCronTelegram(c.env.DB, job.user_id, job.telegram_chat_id, notifText);
  }

  return c.json({ job_id: jobId, status: 'completed', response_length: agentResponse.length });
});


system.get('/dump_errors', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM error_log ORDER BY created_at DESC LIMIT 10').all();
  return c.json(result);
});


system.get('/apply_mig', async (c) => {
  const sql = `-- Add 'once' and 'weekly' schedule types to cron_jobs table

CREATE TABLE cron_jobs_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  schedule_type TEXT NOT NULL CHECK(schedule_type IN ('interval', 'daily', 'weekly', 'once', 'cron')),
  schedule_value TEXT NOT NULL,
  action_type TEXT NOT NULL,
  action_config TEXT DEFAULT '{}',
  enabled INTEGER DEFAULT 1,
  last_run DATETIME,
  next_run DATETIME,
  notify_channel TEXT DEFAULT 'all',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  state TEXT DEFAULT 'active' CHECK(state IN ('created', 'active', 'reminding', 'paused', 'completed')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO cron_jobs_new SELECT * FROM cron_jobs;

DROP TABLE cron_jobs;

ALTER TABLE cron_jobs_new RENAME TO cron_jobs;
`;
  
  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
  
  const results = [];
  for (const stmt of statements) {
    try {
      const res = await c.env.DB.prepare(stmt).run();
      results.push({ stmt: stmt.substring(0, 50), success: true, meta: res.meta });
    } catch(err) {
      results.push({ stmt: stmt.substring(0, 50), success: false, error: err.message });
    }
  }
  
  return c.json(results);
});

export default system;
