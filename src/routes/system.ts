// System routes — heartbeat, health, cron execution with overlap lock + state machine

import { Hono, type Context } from 'hono';
import type { AppEnv, CronJobRecord, UserRecord, NormalizedMessage } from '../types';
import { logError, createRotatingProvider } from '../services/llm/provider';
import { decrypt } from '../services/crypto';
import { runAgent, runAgentRouted } from '../services/agent';
import { getBrowserTaskStatus } from '../services/browser';
import { sendNotification } from '../services/notify';

const system = new Hono<AppEnv>();

// Debug: verify timezone handling on Cloudflare Workers
system.get('/debug/time', (c) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return c.json({
    utc_iso: now.toISOString(),
    utc_ms: now.getTime(),
    formatted_ist: formatter.format(now),
    toLocaleString_ist: now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  });
});

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
async function sendCronTelegram(db: D1Database, userId: number, chatId: string, text: string, notifId?: number): Promise<void> {
  const fetchWithTimeout = (url: string, init: RequestInit, timeoutMs = 10000): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...init, signal: controller.signal as RequestInit['signal'] }).finally(() => clearTimeout(timer));
  };

  try {
    const cred = await db.prepare(
      `SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`
    ).bind(userId).first<{ encrypted_value: string; pin_hash: string }>();
    if (!cred) return;

    const botToken = await decrypt(cred.encrypted_value, cred.pin_hash);
    if (!botToken?.trim()) {
      console.warn('[sendCronTelegram] empty token for user', userId);
      return;
    }

    const TG_MAX = 4000;
    const msg = text.length > TG_MAX ? text.substring(0, TG_MAX - 3) + '...' : text;

    const replyMarkup = notifId ? {
      inline_keyboard: [[
        { text: '✅ Seen', callback_data: `notif_seen:${notifId}` },
        { text: '⏰ Snooze', callback_data: `notif_snooze_menu:${notifId}` },
        { text: '✓ Done', callback_data: `notif_done:${notifId}` },
      ]],
    } : undefined;

    const payload: Record<string, any> = { chat_id: chatId, text: msg, parse_mode: 'Markdown' };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    const res = await fetchWithTimeout(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const fallback: Record<string, any> = { chat_id: chatId, text: msg };
      if (replyMarkup) fallback.reply_markup = replyMarkup;
      const retryRes = await fetchWithTimeout(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fallback),
      });
      if (!retryRes.ok) {
        console.error('[sendCronTelegram] failed for user', userId, 'status:', retryRes.status);
      }
    }
  } catch (err: any) {
    console.error('[sendCronTelegram] error for user', userId, ':', err.message);
  }
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
    `SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone, u.pin_hash
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`
  ).bind(nowISO).all<any>();

  const results: any[] = [];

  for (const job of (dueJobs.results || [])) {
    try {
      // ANTI-DOUBLE-FIRE: Mark last_run immediately at the start of each job's processing
      // This prevents a second concurrent cron tick from picking up the same job
      await c.env.DB.prepare(
        `UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))`
      ).bind(nowISO, job.id).run();

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

      // Handle simple reminders directly in Phase 1 — Phase 2 is skipped for needs_agent:false jobs
      if (job.action_type === 'reminder') {
        try {
          const remConfig = JSON.parse(job.action_config || '{}');
          const remBody = remConfig.description || job.description || job.name || 'Time for your scheduled task.';
          const remTitle = '⏰ ' + (job.name || 'Scheduled Task');
          await c.env.DB.prepare(
            `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, 'system', 'assistant', ?, ?)`
          ).bind(job.user_id, remTitle + '\n' + remBody, JSON.stringify({ type: 'cron', job_id: job.id })).run();
          // Always call sendNotification — it handles in-app insert unconditionally and
          // only attempts Ntfy when pin_hash + ntfy_url are available.
          const { channel } = await sendNotification(c.env.DB, job.user_id, remTitle, remBody, {
            pinHash: job.pin_hash || undefined,
            priority: 'default',
            tags: ['reminder', 'karna'],
            type: 'reminder',
            source: `cron:${job.id}`,
          });
          if (channel === 'ntfy-failed') {
            console.warn(`[cron/execute] job ${job.id}: Ntfy push failed — in-app delivered. Check ntfy_url/ntfy_token in Settings.`);
          } else {
            console.info(`[cron/execute] job ${job.id}: reminder delivered via ${channel}`);
          }
        } catch (remErr: any) {
          console.warn('[cron/execute] reminder notification failed for job', job.id, ':', remErr?.message);
        }
      }

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

  // Housekeeping: demote done tasks older than 7 days from working memory to long-term.
  // Runs on every cron tick (typically every 1-5 min) but is a cheap UPDATE with no rows
  // matched most of the time.
  try {
    const { MemoryService } = await import('../services/memory');
    const allUsers = await c.env.DB.prepare('SELECT id FROM users').all<{ id: number }>();
    for (const u of (allUsers.results || [])) {
      const mem = new MemoryService(c.env.DB);
      await mem.cleanupDoneTasks(u.id);
    }
  } catch (_) {}

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
            u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`
  ).bind(jobId).first<any>();

  if (!job) return c.json({ error: 'Job not found' }, 404);

  // Simple reminders are fully handled in Phase 1 (notification + conversation insert)
  if (job.action_type === 'reminder') {
    return c.json({ job_id: jobId, status: 'completed', note: 'reminder handled by phase1' });
  }

  const config = JSON.parse(job.action_config || '{}');
  const taskDescription = config.description || job.description || '';
  const title = '⏰ ' + (job.name || 'Scheduled Task');
  const nowISO = new Date().toISOString();

  // Run agent (or skip for simple reminders)
  let agentResponse = '';
  const isSimpleReminder = job.action_type === 'reminder';

  // Safety net: if a CUSTOM action has an actionable description, run through agent.
  // NEVER upgrade a 'reminder' type through the agent — reminders always deliver passively.
  // Running reminder text through the agent caused the scheduler to create duplicate jobs.
  const actionablePattern = /\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;
  const isActionableReminder = !isSimpleReminder && job.action_type === 'custom' && actionablePattern.test(taskDescription);

  if (isSimpleReminder) {
    // Simple reminders: send the description directly — no LLM needed.
    // Running through the LLM caused conversation history poisoning
    // where each cron run's stored response got increasingly duplicated.
    agentResponse = taskDescription || job.name || 'Time for your scheduled task.';
  } else {
    try {
      const user: UserRecord = {
        id: job.user_id,
        username: job.username || 'user',
        name: job.user_name || 'User',
        pin_hash: job.pin_hash || '',
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
        channel: 'cron',
        text: buildCronTaskMessage(job.name, taskDescription, job.action_type, job.schedule_type),
        sessionId: 'cron-' + job.id,
        timestamp: nowISO,
      };

      const { provider, rotation } = await createRotatingProvider(c.env.DB, job.user_id, job.pin_hash);
      agentResponse = await runAgentRouted(cronMessage, c.env.DB, provider, user, rotation, {
        GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
        GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
      });
    } catch (agentErr: any) {
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
  }

  // === Cron Execution Verification ===
  // For tool-requiring action types, check if any tools were actually called
  const toolRequiringActions = ['check_mail', 'check_calendar', 'check_sheet', 'custom'];
  if (toolRequiringActions.includes(job.action_type)) {
    try {
      const recentTools = await c.env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`
      ).bind(job.user_id).first<{ cnt: number }>();
      
      if (!recentTools || recentTools.cnt === 0) {
        // No tools were called for a task that requires tools — log warning
        await logError(c.env.DB, job.user_id, 'cron_verification', 'no_tools_called',
          `Cron job "${job.name}" (${job.action_type}) completed without any tool calls`,
          { job_id: job.id, action_type: job.action_type, response_preview: agentResponse.substring(0, 200) });
      }
    } catch (_) { /* non-critical */ }
  }

  // Build notification
  let body = agentResponse || taskDescription || 'Time for your scheduled task.';
  // Strip narration prefixes the LLM sometimes adds despite instructions
  body = body.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i, '');
  const notifText = title + '\n' + body;

  // Write to conversations (history) — only for simple reminders since
  // runAgent/runAgentRouted already stores the response for agent-processed tasks
  if (isSimpleReminder) {
    await c.env.DB.prepare(
      `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
    ).bind(job.user_id, 'system', 'assistant', notifText, JSON.stringify({ type: 'cron', job_id: job.id })).run();
  }

  // Push via Ntfy + in-app bell (sendNotification handles both — no duplicate sendCronNtfy)
  // job.pin_hash comes from the JOIN above; no need for a second query
  if (job.pin_hash) {
    const { channel } = await sendNotification(c.env.DB, job.user_id, title, body, {
      pinHash: job.pin_hash,
      priority: 'default',
      tags: ['reminder', 'karna'],
      type: 'reminder',
      source: `cron:${job.id}`,
    });
    if (channel === 'ntfy-failed') {
      console.warn(`[run-task] job ${job.id}: Ntfy push failed — in-app notification still delivered. Check ntfy_url/ntfy_token in Settings.`);
    } else if (channel === 'in-app') {
      console.warn(`[run-task] job ${job.id}: Ntfy not configured — delivered in-app only.`);
    }
  } else {
    await c.env.DB.prepare(
      `INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, 'reminder', ?, ?, ?, 0)`
    ).bind(job.user_id, title, body, 'cron:' + job.id).run();
  }

  return c.json({ job_id: jobId, status: 'completed', response_length: agentResponse.length });
});


// === Session auth helper for health endpoints ===
async function getAuthenticatedUserId(c: Context<AppEnv>): Promise<number | null> {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return null;
  const session = await c.env.DB.prepare(
    `SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number }>();
  return session?.user_id || null;
}

// === Tool Execution Health Metrics ===
system.get('/health/tools', async (c) => {
  const userId = await getAuthenticatedUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);

  try {
    // Tool call success/failure rates (last 24h)
    const toolStats = await c.env.DB.prepare(
      `SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`
    ).bind(userId).all();

    // Enforcement triggers (last 24h)
    const enforcement = await c.env.DB.prepare(
      `SELECT agent_type, provider_name, COUNT(*) as triggers,
              SUM(CASE WHEN was_enforcement_retry = 1 THEN 1 ELSE 0 END) as retries_that_worked
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name = '__enforcement_trigger'
       GROUP BY agent_type, provider_name`
    ).bind(userId).all();

    // Enforcement retry success rate
    const retryStats = await c.env.DB.prepare(
      `SELECT COUNT(*) as total_retries,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_retries
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND was_enforcement_retry = 1
       AND tool_name != '__enforcement_trigger'`
    ).bind(userId).all();

    // Cron execution results (last 24h)
    const cronStats = await c.env.DB.prepare(
      `SELECT status, COUNT(*) as count
       FROM cron_execution_log
       WHERE user_id = ? AND started_at > datetime('now', '-24 hours')
       GROUP BY status`
    ).bind(userId).all();

    // Cron verification warnings
    const cronWarnings = await c.env.DB.prepare(
      `SELECT message, details, created_at
       FROM error_log
       WHERE user_id = ? AND source = 'cron_verification'
       AND created_at > datetime('now', '-24 hours')
       ORDER BY created_at DESC LIMIT 10`
    ).bind(userId).all();

    // Provider usage (last 24h) — from persistent llm_calls log
    const providerStats = await c.env.DB.prepare(
      `SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`
    ).bind(userId).all();

    return c.json({
      period: 'last_24h',
      tool_stats: toolStats.results,
      enforcement: {
        triggers: enforcement.results,
        retry_results: retryStats.results?.[0] || { total_retries: 0, successful_retries: 0 },
      },
      cron: {
        executions: cronStats.results,
        warnings: cronWarnings.results,
      },
      providers: providerStats.results,
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Failed to fetch metrics' }, 500);
  }
});


// === Recent Tool Execution Log ===
system.get('/health/tools/recent', async (c) => {
  const userId = await getAuthenticatedUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);

  try {
    const recent = await c.env.DB.prepare(
      `SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`
    ).bind(userId).all();
    return c.json({ logs: recent.results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});







// === Helper: Build a cron task message that the agent can execute autonomously ===
// OUTPUT RULE: All cron responses go to Telegram notifications — must be short and direct.
const CRON_OUTPUT_RULE = `

RESPONSE FORMAT: This goes to a Telegram notification. Give ONLY the answer to what was asked.
- Answer the SPECIFIC question — not everything you found:
  "crew" = names only. "schedule" = names + call time. "details" = everything (program, sound, team, CT).
- NO narration ("I checked...", "Let me look...", "Looking at the data...")
- NO markdown, no bold, no headers
- NO process description — just the result
- 1-2 sentences maximum. Telegram notification, not an essay.
- If nothing found, say so in one line.
- NEVER FABRICATE: If search results don't contain the specific data (e.g., order status, delivery date), say "Couldn't find [X]" — do NOT invent a status or guess.
- Example: "TET crew tomorrow: Nikhil, Nazar."
- Example: "TET schedule tomorrow: Nikhil, Nazar. CT 14:00."
- Example: "No events at Tata Theatre tomorrow."
- Example: "Couldn't retrieve Amazon order status — requires login."`;

function buildCronTaskMessage(jobName: string, description: string, actionType: string, scheduleType?: string): string {
  // For reminder types, just send a simple reminder message
  if (actionType === 'reminder') {
    return `[Scheduled Reminder] "${jobName}": ${description || 'Time for your reminder.'}`;
  }

  // For check_mail, check_calendar, check_sheet — give explicit tool instructions
  if (actionType === 'check_mail') {
    return `[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${jobName}"
Instructions: ${description || 'Check Gmail for new/important emails.'}
You MUST call gmail_list or gmail_search immediately.${CRON_OUTPUT_RULE}`;
  }

  if (actionType === 'check_calendar') {
    return `[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${jobName}"
Instructions: ${description || 'Check calendar for upcoming events.'}
You MUST call list_calendar_events immediately.${CRON_OUTPUT_RULE}`;
  }

  if (actionType === 'check_sheet') {
    return `[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${jobName}"
Instructions: ${description}
You MUST call read_sheet immediately with the relevant spreadsheet.${CRON_OUTPUT_RULE}`;
  }

  // For 'custom' type — the description should already contain tool instructions
  if (actionType === 'custom' && description) {
    // Recurring jobs (interval/daily/weekly) must NOT send emails to external recipients — doing so
    // fires on every cron tick and spams recipients. Only once-type custom tasks may call gmail_send.
    const isRecurring = scheduleType === 'interval' || scheduleType === 'daily' || scheduleType === 'weekly';
    const emailSendGuard = isRecurring
      ? '\nCRITICAL SAFETY RULE: This is a RECURRING scheduled task. You MUST NOT call gmail_send or gmail_draft — sending emails on every cron tick spams recipients. Report findings as text only.'
      : '';
    return `[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${jobName}"
Instructions: ${description}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${emailSendGuard}${CRON_OUTPUT_RULE}`;
  }

  // Fallback
  return `[Scheduled task "${jobName}"]: ${description || 'Execute this scheduled task.'}${CRON_OUTPUT_RULE}`;
}

// ─── Cron: check pending browser tasks and notify user on completion ───
// Called from the scheduled handler alongside other proactive cron endpoints.
// Polls each unnotified pending_browser_tasks row; sends a web + Telegram notification
// on completion so the user never has to ask "what happened with the browser task?".
system.post('/cron/check-browser-tasks', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  let checked = 0;
  let notified = 0;

  try {
    const pending = await c.env.DB.prepare(
      `SELECT pbt.id, pbt.user_id, pbt.task_id, pbt.task_description,
              pbt.thread_id, pbt.channel,
              u.telegram_chat_id, u.pin_hash
       FROM pending_browser_tasks pbt
       JOIN users u ON pbt.user_id = u.id
       WHERE pbt.notified = 0
       ORDER BY pbt.created_at ASC
       LIMIT 10`
    ).all<{ id: number; user_id: number; task_id: string; task_description: string | null; thread_id: number | null; channel: string; telegram_chat_id: string | null; pin_hash: string }>();

    for (const row of (pending.results || [])) {
      checked++;
      try {
        // Retrieve the Browser Use API key for this user
        const buCred = await c.env.DB.prepare(
          `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'`
        ).bind(row.user_id).first<{ encrypted_value: string }>();
        if (!buCred) continue;

        const apiKey = (await decrypt(buCred.encrypted_value, row.pin_hash)).trim();
        const status = await getBrowserTaskStatus(row.task_id, apiKey, { waitMs: 8000 });

        if (!status.done) continue; // still running — check again next minute

        // Claim all pending rows for this task atomically (prevents duplicate Ntfy from cron retries or duplicate rows)
        const claim = await c.env.DB.prepare(
          `UPDATE pending_browser_tasks SET notified = 1
           WHERE user_id = ? AND task_id = ? AND notified = 0`
        ).bind(row.user_id, row.task_id).run();
        if (!claim.meta.changes) continue;

        // Compose notification body
        const taskLabel = row.task_description
          ? `"${row.task_description.substring(0, 80)}${row.task_description.length > 80 ? '...' : ''}"`
          : 'Your browser task';
        let title: string;
        let body: string;

        if (status.status === 'finished' && status.output) {
          title = 'Browser task completed';
          body = `${taskLabel} finished.\n\n${status.output.substring(0, 500)}${status.output.length > 500 ? '...' : ''}`;
        } else if (status.status === 'finished') {
          title = 'Browser task completed (no output)';
          body = `${taskLabel} finished, but the browser returned no readable content. You may want to retry.`;
        } else {
          title = 'Browser task ended';
          body = `${taskLabel} ended with status "${status.status}". Check the browser dashboard for details.`;
        }

        // Deliver result as an assistant message in the original conversation thread.
        // This is the primary delivery path — the result appears inline in chat,
        // eliminating the need to hunt for a notification.
        if (row.thread_id) {
          const threadMsg = status.status === 'finished' && status.output
            ? status.output.substring(0, 8000)
            : body;
          const tokenEst = Math.ceil(threadMsg.length / 4);
          try {
            await c.env.DB.prepare(
              `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id)
               VALUES (?, ?, 'assistant', ?, '{}', ?, ?)`
            ).bind(row.user_id, row.channel || 'web', threadMsg, tokenEst, row.thread_id).run();
          } catch { /* non-critical — fall through to notification */ }
        }

        // Push notification (in-app bell + Ntfy via sendNotification — single delivery path)
        if (row.pin_hash) {
          await sendNotification(c.env.DB, row.user_id, title, body, {
            pinHash: row.pin_hash,
            tags: ['browser', 'karna'],
          });
        }

        notified++;
        // Small delay to avoid rate-limiting Telegram on rapid multi-user sends
        await new Promise(r => setTimeout(r, 200));
      } catch { /* one failure should not block the rest */ }
    }
  } catch { /* table may not exist yet */ }

  return c.json({ checked, notified });
});

// ─── Nightly decay recomputation for all users ───────────────────────────────
system.post('/cron/recompute-decay-scores', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  const { MemoryService } = await import('../services/memory');
  const mem = new MemoryService(c.env.DB);

  const users = await c.env.DB.prepare(
    `SELECT id FROM users ORDER BY id ASC`
  ).all<{ id: number }>();

  let totalUpdated = 0;
  let totalCompacted = 0;
  const errors: string[] = [];

  for (const user of (users.results || [])) {
    try {
      const updated = await mem.recomputeDecayScores(user.id);
      totalUpdated += updated;

      // Compact for users who have old low-score memories (older than 30 days)
      const stale = await c.env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM memory
         WHERE user_id = ? AND decay_score < 0.1
           AND valid_until IS NULL
           AND last_accessed_at < datetime('now', '-30 days')`
      ).bind(user.id).first<{ cnt: number }>();

      if ((stale?.cnt || 0) > 0) {
        const result = await mem.compactLowScoreMemories(user.id, 0.1);
        totalCompacted += result.compactedCount;
      }
    } catch (err: any) {
      errors.push(`user ${user.id}: ${err?.message || String(err)}`);
    }
  }

  return c.json({ updated: totalUpdated, compacted: totalCompacted, errors });
});

export default system;

// Weekly observability scorecard (authenticated)
system.get('/scorecard/weekly', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Auth required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number }>();
  if (!session) return c.json({ error: 'Invalid session' }, 401);

  const userId = session.user_id;
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [totals, retries, grounded] = await Promise.all([
    c.env.DB.prepare(
      `SELECT COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as success_count,
              AVG(latency_ms) as avg_latency,
              MAX(latency_ms) as p95_latency_hint
       FROM tool_execution_log
       WHERE user_id = ? AND created_at >= ?`
    ).bind(userId, since).first<any>(),
    c.env.DB.prepare(
      `SELECT COUNT(*) as retry_count
       FROM tool_execution_log
       WHERE user_id = ? AND was_enforcement_retry = 1 AND created_at >= ?`
    ).bind(userId, since).first<any>(),
    c.env.DB.prepare(
      `SELECT COUNT(*) as cited_responses
       FROM conversations
       WHERE user_id = ? AND role = 'assistant' AND created_at >= ? AND (content LIKE '%[S1]%' OR content LIKE '%source%')`
    ).bind(userId, since).first<any>(),
  ]);

  const total = Number(totals?.total || 0);
  const success = Number(totals?.success_count || 0);
  const successRate = total ? (success / total) : 0;

  return c.json({
    window: '7d',
    task_success_rate: Number(successRate.toFixed(3)),
    groundedness_rate_hint: Number((Number(grounded?.cited_responses || 0) / Math.max(1, total)).toFixed(3)),
    avg_latency_ms: Math.round(Number(totals?.avg_latency || 0)),
    p95_latency_hint_ms: Math.round(Number(totals?.p95_latency_hint || 0)),
    fallback_frequency_hint: Number((Number(retries?.retry_count || 0) / Math.max(1, total)).toFixed(3)),
    totals: { total_tool_calls: total, successful_tool_calls: success },
  });
});
