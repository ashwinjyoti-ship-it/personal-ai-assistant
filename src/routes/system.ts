// System routes — heartbeat, health, cron execution

import { Hono } from 'hono';
import type { AppEnv, CronJobRecord } from '../types';

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
      version: '1.0.0',
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

  const [activeJobs, memoryCount, msgCount, lastHeartbeat] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?').bind(userId).first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT status, latency_ms, created_at FROM heartbeat_log ORDER BY created_at DESC LIMIT 1').first<any>(),
  ]);

  return c.json({
    active_schedules: activeJobs?.cnt || 0,
    memory_entries: memoryCount?.cnt || 0,
    total_messages: msgCount?.cnt || 0,
    heartbeat: lastHeartbeat || { status: 'unknown' },
    version: '1.0.0',
  });
});

// Cron executor — processes due scheduled jobs
// This would be called by Cloudflare Cron Trigger or manual invocation
system.post('/cron/execute', async (c) => {
  const now = new Date().toISOString();
  
  // Find all due jobs
  const dueJobs = await c.env.DB.prepare(
    `SELECT cj.*, u.name as user_name, u.telegram_chat_id 
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ?`
  ).bind(now).all<CronJobRecord & { user_name: string; telegram_chat_id: string }>();

  const results: any[] = [];

  for (const job of (dueJobs.results || [])) {
    try {
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
        nextRun = new Date(currentTime.getTime() + 60 * 60 * 1000); // Default 1 hour
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
        JSON.stringify({ type: 'cron_notification', job_id: job.id })
      ).run();

      // TODO: Phase 1.4 — Send via Telegram if configured
      // if (job.telegram_chat_id) { sendTelegramMessage(...) }

      results.push({ job_id: job.id, name: job.name, status: 'executed', next_run: nextRun.toISOString() });
    } catch (err: any) {
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
