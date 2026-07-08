// Notifications & Reminders routes — Better Notifications and Reminder Controls

import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, SessionUserRow} from '../types';

const router = new Hono<AppEnv>();

// Auth middleware — exact pattern from src/routes/chat.ts
async function requireAuth(c: Context<AppEnv>, next: Next) {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<SessionUserRow>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
    personality_prompt: session.personality_prompt,
    telegram_chat_id: session.telegram_chat_id,
    timezone: session.timezone,
    assistant_name: session.assistant_name || 'Karna',
    created_at: session.created_at,
    updated_at: session.updated_at,
  } as UserRecord);
  c.set('sessionId', sessionId);

  await next();
}

router.use('/*', requireAuth);

// === Helpers ===

function nowInTimezone(tz: string): Date {
  const str = new Date().toLocaleString('en-US', { timeZone: tz });
  return new Date(str);
}

function getTomorrow9AM(timezone: string): Date {
  const userNow = nowInTimezone(timezone);
  const candidate = new Date(userNow);
  candidate.setDate(candidate.getDate() + 1);
  candidate.setHours(9, 0, 0, 0);

  const utcEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzEquivalent = new Date(candidate.toLocaleString('en-US', { timeZone: timezone }));
  const offsetMs = utcEquivalent.getTime() - tzEquivalent.getTime();
  return new Date(candidate.getTime() + offsetMs);
}

function extractCronId(source: string | null): number | null {
  if (!source) return null;
  if (source.startsWith('cron:')) {
    const id = parseInt(source.replace('cron:', ''), 10);
    return isNaN(id) ? null : id;
  }
  return null;
}

// ==========================================
// Notification Endpoints
// ==========================================

// 1. Mark notification as done — completes any linked cron job and removes the
// notification from the user's list (so it disappears from the bell dropdown,
// matching the small "ok" dismiss button's UX).
router.put('/:id/done', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const notification = await c.env.DB.prepare(
    'SELECT * FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!notification) return c.json({ error: 'Notification not found' }, 404);

  const cronId = extractCronId(notification.source);
  if (cronId) {
    await c.env.DB.prepare(
      "UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
    ).bind(cronId, user.id).run();
  }

  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true, cron_completed: cronId !== null });
});

// 2. Snooze a notification — schedule a new reminder and remove the original
// notification (the snoozed cron job will create a fresh notification when it fires).
router.post('/:id/snooze', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json<{ minutes?: number; until?: 'tomorrow_morning'; new_time?: string }>();

  const notification = await c.env.DB.prepare(
    'SELECT * FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!notification) return c.json({ error: 'Notification not found' }, 404);

  let nextRun: Date;

  if (typeof body.minutes === 'number') {
    nextRun = new Date(Date.now() + body.minutes * 60 * 1000);
  } else if (body.until === 'tomorrow_morning') {
    nextRun = getTomorrow9AM(user.timezone || 'UTC');
  } else if (body.new_time) {
    nextRun = new Date(body.new_time);
  } else {
    return c.json({ error: 'Invalid snooze parameters' }, 400);
  }

  if (isNaN(nextRun.getTime())) {
    return c.json({ error: 'Invalid time' }, 400);
  }

  const iso = nextRun.toISOString();

  // If the bell notification was fired by a cron reminder, complete the original cron row
  // so the snoozed copy doesn't create a duplicate Action Center entry alongside the
  // post-fire 'reminding' row.
  const origCronId = extractCronId(notification.source);
  if (origCronId) {
    await c.env.DB.prepare(
      "UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
    ).bind(origCronId, user.id).run();
  }

  const result = await c.env.DB.prepare(
    `INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(
    user.id,
    notification.title,
    notification.body,
    'once',
    iso,
    'reminder',
    JSON.stringify({ description: notification.body || '' }),
    iso,
    1,
    'active'
  ).first<{ id: number }>();

  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true, job_id: result?.id });
});

// 3. Reschedule a notification (update linked cron job or create new one)
router.post('/:id/reschedule', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const { new_time } = await c.req.json<{ new_time: string }>();

  if (!new_time) return c.json({ error: 'new_time is required' }, 400);

  const nextRun = new Date(new_time);
  if (isNaN(nextRun.getTime())) {
    return c.json({ error: 'Invalid time' }, 400);
  }

  const notification = await c.env.DB.prepare(
    'SELECT * FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!notification) return c.json({ error: 'Notification not found' }, 404);

  const iso = nextRun.toISOString();
  const cronId = extractCronId(notification.source);

  if (cronId) {
    await c.env.DB.prepare(
      `UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(iso, iso, cronId, user.id).run();
    return c.json({ success: true, job_id: cronId });
  }

  const result = await c.env.DB.prepare(
    `INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(
    user.id,
    notification.title,
    notification.body,
    'once',
    iso,
    'reminder',
    JSON.stringify({ description: notification.body || '' }),
    iso,
    1,
    'active'
  ).first<{ id: number }>();

  return c.json({ success: true, job_id: result?.id });
});

// 4. Cancel (delete) a notification and disable linked cron job
router.delete('/:id/cancel', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const notification = await c.env.DB.prepare(
    'SELECT * FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!notification) return c.json({ error: 'Notification not found' }, 404);

  const cronId = extractCronId(notification.source);
  if (cronId) {
    await c.env.DB.prepare(
      "UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
    ).bind(cronId, user.id).run();
  }

  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Reminder (cron job) Endpoints
// ==========================================

// 5. Snooze a reminder directly
router.post('/reminders/:id/snooze', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json<{ minutes?: number; until_tomorrow_9am?: boolean; new_time?: string }>();

  const job = await c.env.DB.prepare(
    'SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!job) return c.json({ error: 'Reminder not found' }, 404);

  let nextRun: Date;

  if (typeof body.minutes === 'number') {
    nextRun = new Date(Date.now() + body.minutes * 60 * 1000);
  } else if (body.until_tomorrow_9am) {
    nextRun = getTomorrow9AM(user.timezone || 'UTC');
  } else if (body.new_time) {
    nextRun = new Date(body.new_time);
  } else {
    return c.json({ error: 'Invalid snooze parameters' }, 400);
  }

  if (isNaN(nextRun.getTime())) {
    return c.json({ error: 'Invalid time' }, 400);
  }

  const iso = nextRun.toISOString();
  await c.env.DB.prepare(
    `UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind(iso, iso, id, user.id).run();

  return c.json({ success: true });
});

// 6. Mark a reminder as done
router.post('/reminders/:id/done', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const job = await c.env.DB.prepare(
    'SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!job) return c.json({ error: 'Reminder not found' }, 404);

  await c.env.DB.prepare(
    "UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
  ).bind(id, user.id).run();

  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE source = ? AND user_id = ?'
  ).bind(`cron:${id}`, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Reminders CRUD (direct cron_job management)
// ==========================================

const REMINDER_DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function computeNextRun(scheduleType: string, scheduleValue: string, tz: string): Date | null {
  try {
    if (scheduleType === 'once') {
      // schedule_value: "YYYY-MM-DD HH:MM" treated as user-local time
      const dt = new Date(scheduleValue.replace(' ', 'T'));
      if (isNaN(dt.getTime())) return null;
      const utcEquiv = new Date(dt.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzEquiv  = new Date(dt.toLocaleString('en-US', { timeZone: tz }));
      return new Date(dt.getTime() + (utcEquiv.getTime() - tzEquiv.getTime()));
    }
    if (scheduleType === 'daily') {
      const [h, m] = scheduleValue.split(':').map(Number);
      if (isNaN(h) || isNaN(m)) return null;
      const userNow = nowInTimezone(tz);
      const cand = new Date(userNow);
      cand.setHours(h, m, 0, 0);
      if (cand <= userNow) cand.setDate(cand.getDate() + 1);
      const utcEquiv = new Date(cand.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzEquiv  = new Date(cand.toLocaleString('en-US', { timeZone: tz }));
      return new Date(cand.getTime() + (utcEquiv.getTime() - tzEquiv.getTime()));
    }
    if (scheduleType === 'weekly') {
      const parts = scheduleValue.split(' ');
      if (parts.length < 2) return null;
      const targetDay = REMINDER_DAYS.indexOf(parts[0]);
      const [h, m] = parts[1].split(':').map(Number);
      if (targetDay === -1 || isNaN(h) || isNaN(m)) return null;
      const userNow = nowInTimezone(tz);
      const cand = new Date(userNow);
      cand.setHours(h, m, 0, 0);
      let daysUntil = (targetDay - userNow.getDay() + 7) % 7;
      if (daysUntil === 0 && cand <= userNow) daysUntil = 7;
      cand.setDate(cand.getDate() + daysUntil);
      const utcEquiv = new Date(cand.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzEquiv  = new Date(cand.toLocaleString('en-US', { timeZone: tz }));
      return new Date(cand.getTime() + (utcEquiv.getTime() - tzEquiv.getTime()));
    }
    if (scheduleType === 'interval') {
      const mins = parseInt(scheduleValue, 10);
      if (isNaN(mins) || mins < 1) return null;
      return new Date(Date.now() + mins * 60 * 1000);
    }
  } catch { /* fall through */ }
  return null;
}

// GET /reminders — list all reminder-type cron jobs for user
router.get('/reminders', async (c) => {
  const user = c.get('user')!;
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM cron_jobs WHERE user_id = ? AND action_type = 'reminder'
     ORDER BY CASE WHEN enabled = 1 AND state NOT IN ('completed','paused') THEN 0 ELSE 1 END,
              next_run ASC NULLS LAST`
  ).bind(user.id).all();
  return c.json({ reminders: results || [] });
});

// POST /reminders — create new reminder
router.post('/reminders', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    name: string; description?: string;
    schedule_type: string; schedule_value: string;
  }>();
  if (!body.name?.trim()) return c.json({ error: 'Name is required' }, 400);
  const VALID = ['once', 'daily', 'weekly', 'interval'];
  if (!VALID.includes(body.schedule_type)) return c.json({ error: 'Invalid schedule_type' }, 400);
  const tz = (user as any).timezone || 'UTC';
  const nextRun = computeNextRun(body.schedule_type, body.schedule_value, tz);
  if (!nextRun) return c.json({ error: 'Invalid schedule_value for this schedule_type' }, 400);
  const result = await c.env.DB.prepare(
    `INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type,
       action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, 'reminder', ?, ?, 1, 'active') RETURNING id`
  ).bind(
    user.id, body.name.trim(), body.description?.trim() || '',
    body.schedule_type, body.schedule_value,
    JSON.stringify({ description: body.description || '' }),
    nextRun.toISOString()
  ).first<{ id: number }>();
  return c.json({ success: true, id: result?.id });
});

// PATCH /reminders/:id — update name/description/schedule/enabled
router.patch('/reminders/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json<{
    name?: string; description?: string;
    schedule_type?: string; schedule_value?: string; enabled?: boolean;
  }>();
  const job = await c.env.DB.prepare(
    'SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();
  if (!job) return c.json({ error: 'Reminder not found' }, 404);

  const tz = (user as any).timezone || 'UTC';
  const schedType  = body.schedule_type  ?? job.schedule_type;
  const schedValue = body.schedule_value ?? job.schedule_value;
  let nextRunStr = job.next_run;
  if (body.schedule_type !== undefined || body.schedule_value !== undefined) {
    const nr = computeNextRun(schedType, schedValue, tz);
    if (!nr) return c.json({ error: 'Invalid schedule' }, 400);
    nextRunStr = nr.toISOString();
  }
  const enabledVal = body.enabled !== undefined ? (body.enabled ? 1 : 0) : job.enabled;
  const newState   = enabledVal ? (job.state === 'completed' ? 'active' : job.state) : 'paused';

  await c.env.DB.prepare(
    `UPDATE cron_jobs SET name = ?, description = ?, schedule_type = ?, schedule_value = ?,
     next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(
    body.name?.trim() ?? job.name,
    body.description?.trim() ?? job.description,
    schedType, schedValue, nextRunStr, enabledVal, newState,
    id, user.id
  ).run();
  return c.json({ success: true });
});

// DELETE /reminders/:id
router.delete('/reminders/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const job = await c.env.DB.prepare(
    'SELECT id FROM cron_jobs WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<{ id: number }>();
  if (!job) return c.json({ error: 'Reminder not found' }, 404);
  await c.env.DB.prepare('DELETE FROM cron_jobs WHERE id = ? AND user_id = ?').bind(id, user.id).run();
  await c.env.DB.prepare("DELETE FROM notifications WHERE source = ? AND user_id = ?").bind(`cron:${id}`, user.id).run();
  return c.json({ success: true });
});

export default router;
