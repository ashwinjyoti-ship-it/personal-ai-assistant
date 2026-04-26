// Action Center routes — Pending Actions Inbox and task management

import { Hono } from 'hono';
import type { AppEnv, UserRecord, ActionItemRecord } from '../types';

const actionCenter = new Hono<AppEnv>();

// Auth middleware
async function requireAuth(c: any, next: any) {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<any>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
    role: session.role,
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

actionCenter.use('/*', requireAuth);

// ==========================================
// Summary Dashboard
// ==========================================

actionCenter.get('/', async (c) => {
  const user = c.get('user')!;

  // Fetch action items AND pending cron jobs (reminders/scheduled tasks) together
  const [
    pendingCount,
    runningCount,
    failedCount,
    completedCount,
    needsApprovalCount,
    totalCount,
    byTypeResult,
    todayResult,
    pendingResult,
    needsApprovalResult,
    recentActivityResult,
    upcomingCronResult,
    pendingCronResult,
  ] = await Promise.all([
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'pending'").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'running'").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'failed'").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'completed'").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'needs_approval'").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ?").bind(user.id).first<{ cnt: number }>(),
    c.env.DB.prepare("SELECT type, COUNT(*) as cnt FROM action_items WHERE user_id = ? GROUP BY type").bind(user.id).all<{ type: string; cnt: number }>(),
    c.env.DB.prepare(
      `SELECT * FROM action_items WHERE user_id = ? AND (status IN ('pending', 'running', 'needs_approval') OR date(due_at) = date('now'))
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`
    ).bind(user.id).all<ActionItemRecord>(),
    c.env.DB.prepare(
      `SELECT * FROM action_items WHERE user_id = ? AND status = 'pending'
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`
    ).bind(user.id).all<ActionItemRecord>(),
    c.env.DB.prepare(
      `SELECT * FROM action_items WHERE user_id = ? AND status = 'needs_approval'
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`
    ).bind(user.id).all<ActionItemRecord>(),
    c.env.DB.prepare(
      `SELECT * FROM action_items WHERE user_id = ? AND status IN ('completed', 'cancelled', 'failed')
       ORDER BY updated_at DESC LIMIT 20`
    ).bind(user.id).all<ActionItemRecord>(),
    // Include upcoming cron jobs (reminders) in Action Center — fixes scheduled tasks not showing up
    c.env.DB.prepare(
      `SELECT id, name as title, description as body, 'reminder' as type, 'pending' as status, 'normal' as priority, next_run as due_at,
              'cron' as source, CAST(id as TEXT) as source_id, schedule_type, schedule_value
       FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND state IN ('active', 'reminding') AND next_run >= datetime('now')
       ORDER BY next_run ASC LIMIT 50`
    ).bind(user.id).all<any>(),
    // Also include pending cron jobs that are overdue
    c.env.DB.prepare(
      `SELECT id, name as title, description as body, 'reminder' as type, 'pending' as status, 'high' as priority, next_run as due_at,
              'cron' as source, CAST(id as TEXT) as source_id, schedule_type, schedule_value
       FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND state IN ('active', 'reminding') AND next_run < datetime('now')
       ORDER BY next_run ASC LIMIT 50`
    ).bind(user.id).all<any>(),
  ]);

  const byType: Record<string, number> = {};
  for (const row of (byTypeResult.results || [])) {
    byType[row.type] = row.cnt;
  }

  // Merge cron jobs into today/pending lists so they show in Action Center
  const cronItems = [...(upcomingCronResult.results || []), ...(pendingCronResult.results || [])];
  const actionItems = todayResult.results || [];
  const allToday = [...actionItems];

  // Add cron jobs to today list (they are time-based tasks)
  for (const cron of cronItems) {
    // Avoid duplicates if already an action_item for this cron job
    const exists = allToday.some(a => a.source === 'cron' && a.source_id === String(cron.id));
    if (!exists) {
      allToday.push(cron);
    }
  }

  // Sort combined list by due date
  allToday.sort((a, b) => {
    const aTime = a.due_at ? new Date(a.due_at).getTime() : Infinity;
    const bTime = b.due_at ? new Date(b.due_at).getTime() : Infinity;
    return aTime - bTime;
  });

  return c.json({
    counts: {
      pending: (pendingCount?.cnt || 0) + cronItems.length,
      running: runningCount?.cnt || 0,
      failed: failedCount?.cnt || 0,
      completed: completedCount?.cnt || 0,
      needs_approval: needsApprovalCount?.cnt || 0,
      total: (totalCount?.cnt || 0) + cronItems.length,
    },
    by_type: byType,
    today: allToday.slice(0, 50),
    pending: [...(pendingResult.results || []), ...cronItems.filter(c => c.next_run && new Date(c.next_run) >= new Date())].slice(0, 50),
    needs_approval: needsApprovalResult.results || [],
    recent_activity: recentActivityResult.results || [],
    cron_jobs_count: cronItems.length,
  });
});

// ==========================================
// Pending Actions List
// ==========================================

actionCenter.get('/pending', async (c) => {
  const user = c.get('user')!;
  const typeFilter = c.req.query('type');
  const limit = parseInt(c.req.query('limit') || '50');

  let query = `SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending', 'needs_approval')`;
  const bindings: any[] = [user.id];

  if (typeFilter) {
    query += ` AND type = ?`;
    bindings.push(typeFilter);
  }

  query += ` ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT ?`;
  bindings.push(limit);

  const result = await c.env.DB.prepare(query).bind(...bindings).all<ActionItemRecord>();
  return c.json({ items: result.results || [] });
});

// ==========================================
// Complete/Cancel Cron Job (scheduled reminder) from Action Center
// ==========================================

actionCenter.post('/cron/:id/complete', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

actionCenter.post('/cron/:id/cancel', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Complete Action
// ==========================================

actionCenter.post('/:id/complete', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE action_items SET status = 'completed', completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Cancel Action
// ==========================================

actionCenter.post('/:id/cancel', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE action_items SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Retry Action
// ==========================================

actionCenter.post('/:id/retry', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ? AND status = 'failed'`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Approve Action
// ==========================================

actionCenter.post('/:id/approve', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ? AND status = 'needs_approval'`
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// Create Manual Action
// ==========================================

actionCenter.post('/', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    type?: string;
    title: string;
    body?: string;
    priority?: string;
    due_at?: string;
    source?: string;
    source_id?: string;
    action_payload?: string;
  }>();

  if (!body.title || typeof body.title !== 'string') {
    return c.json({ error: 'Title is required' }, 400);
  }

  const result = await c.env.DB.prepare(
    `INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(
    user.id,
    body.type || 'manual',
    body.title,
    body.body || null,
    body.priority || 'normal',
    body.source || null,
    body.source_id || null,
    body.action_payload || null,
    body.due_at || null
  ).first<{ id: number }>();

  return c.json({ success: true, id: result?.id });
});

// ==========================================
// Delete Action
// ==========================================

actionCenter.delete('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    'DELETE FROM action_items WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

export default actionCenter;
