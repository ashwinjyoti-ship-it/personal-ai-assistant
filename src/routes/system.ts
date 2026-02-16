// System routes — heartbeat, health, cron execution with overlap lock + state machine

import { Hono } from 'hono';
import type { AppEnv, CronJobRecord } from '../types';
import { logError } from '../services/llm/provider';

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

// Cron executor — processes due scheduled jobs
system.post('/cron/execute', async (c) => {
  const now = new Date().toISOString();
  
  // Find all due jobs
  const dueJobs = await c.env.DB.prepare(
    `SELECT cj.*, u.name as user_name, u.telegram_chat_id 
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND cj.state != 'completed'`
  ).bind(now).all<CronJobRecord & { user_name: string; telegram_chat_id: string }>();

  const results: any[] = [];

  for (const job of (dueJobs.results || [])) {
    // Acquire lock — skip if already running
    const lock = await acquireCronLock(c.env.DB, job.id, job.user_id);
    if (!lock.acquired) {
      results.push({ job_id: job.id, name: job.name, status: 'skipped', reason: 'Already running (locked)' });

      // Log as skipped
      try {
        const idempKey = `${job.id}-${now}-skip`;
        await c.env.DB.prepare(
          `INSERT INTO cron_execution_log (job_id, user_id, status, idempotency_key, completed_at, result) VALUES (?, ?, 'skipped', ?, CURRENT_TIMESTAMP, 'Overlap detected')`
        ).bind(job.id, job.user_id, idempKey).run();
      } catch (_) {}
      continue;
    }

    try {
      // Transition state
      const newState = await transitionJobState(c.env.DB, job.id, job.state || 'active', job.action_type);

      // Calculate next run
      let nextRun: Date;
      const currentTime = new Date();

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

      // Update job timing
      await c.env.DB.prepare(
        `UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(now, nextRun.toISOString(), job.id).run();

      // Store the notification as a conversation message
      const config = JSON.parse(job.action_config || '{}');
      const notificationText = `⏰ Scheduled reminder: **${job.name}**\n${config.description || job.description || 'Time for your scheduled task.'}`;

      await c.env.DB.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
      ).bind(
        job.user_id, 
        'system', 
        'assistant', 
        notificationText,
        JSON.stringify({ type: 'cron_notification', job_id: job.id, state: newState })
      ).run();

      // Release lock — success
      await releaseCronLock(c.env.DB, lock.executionId!, 'completed', `Executed: ${job.name}`);

      results.push({ job_id: job.id, name: job.name, status: 'executed', state: newState, next_run: nextRun.toISOString() });
    } catch (err: any) {
      // Release lock — failure
      if (lock.executionId) {
        await releaseCronLock(c.env.DB, lock.executionId, 'failed', '', err.message);
      }
      await logError(c.env.DB, job.user_id, 'cron', 'execution_error', err.message || 'Cron job failed', { job_id: job.id, job_name: job.name });
      results.push({ job_id: job.id, name: job.name, status: 'error', error: err.message });
    }
  }

  return c.json({ 
    executed: results.length, 
    results,
    timestamp: now,
  });
});

export default system;
