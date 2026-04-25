import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';
import { MemoryService } from '../services/memory';

const commandCenter = new Hono<AppEnv>();

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
  await next();
}

commandCenter.use('/*', requireAuth);

commandCenter.get('/action-center', async (c) => {
  const user = c.get('user')!;
  const db = c.env.DB;
  const [actions, notifications, memorySuggestions, documents, schedules] = await Promise.all([
    db.prepare(`SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','running','failed') ORDER BY priority DESC, COALESCE(due_at, updated_at) ASC LIMIT 40`).bind(user.id).all<any>().catch(() => ({ results: [] })),
    db.prepare(`SELECT * FROM notifications WHERE user_id = ? AND (is_read = 0 OR status = 'open') ORDER BY created_at DESC LIMIT 20`).bind(user.id).all<any>().catch(() => ({ results: [] })),
    db.prepare(`SELECT * FROM memory_suggestions WHERE user_id = ? AND status = 'pending' ORDER BY importance DESC, created_at DESC LIMIT 20`).bind(user.id).all<any>().catch(() => ({ results: [] })),
    db.prepare(`SELECT * FROM document_library WHERE user_id = ? ORDER BY updated_at DESC LIMIT 8`).bind(user.id).all<any>().catch(() => ({ results: [] })),
    db.prepare(`SELECT * FROM cron_jobs WHERE user_id = ? AND enabled = 1 ORDER BY next_run ASC LIMIT 10`).bind(user.id).all<any>().catch(() => ({ results: [] })),
  ]);

  const actionRows = actions.results || [];
  const needsApproval = [
    ...actionRows.filter((a: any) => a.status === 'needs_approval'),
    ...(memorySuggestions.results || []).map((m: any) => ({ ...m, type: 'memory_suggestion', title: `Remember: ${m.title}`, source: 'memory_suggestions' })),
  ];
  const today = new Date().toISOString().slice(0, 10);
  const remindersToday = (notifications.results || []).filter((n: any) => (n.type === 'reminder' || n.due_at) && String(n.due_at || n.created_at || '').slice(0, 10) <= today);

  return c.json({
    counts: {
      open: actionRows.length + (notifications.results || []).length,
      pending: actionRows.filter((a: any) => a.status === 'pending').length,
      needs_approval: needsApproval.length,
      failed: actionRows.filter((a: any) => a.status === 'failed').length,
      memory_suggestions: (memorySuggestions.results || []).length,
      documents: (documents.results || []).length,
    },
    today: { reminders: remindersToday, schedules: schedules.results || [] },
    pending: actionRows.filter((a: any) => ['pending', 'running', 'failed'].includes(a.status)),
    needs_approval: needsApproval,
    notifications: notifications.results || [],
    documents: documents.results || [],
  });
});

commandCenter.get('/action-center/pending', async (c) => {
  const user = c.get('user')!;
  const rows = await c.env.DB.prepare(
    `SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','running','failed') ORDER BY updated_at DESC LIMIT 100`
  ).bind(user.id).all<any>().catch(() => ({ results: [] }));
  return c.json({ items: rows.results || [] });
});

async function updateAction(c: any, status: string) {
  const user = c.get('user')!;
  const id = Number(c.req.param('id'));
  const completed = status === 'completed' ? ', completed_at = CURRENT_TIMESTAMP' : '';
  await c.env.DB.prepare(
    `UPDATE action_items SET status = ?, updated_at = CURRENT_TIMESTAMP${completed} WHERE id = ? AND user_id = ?`
  ).bind(status, id, user.id).run();
  return c.json({ success: true });
}

commandCenter.post('/action-center/:id/complete', (c) => updateAction(c, 'completed'));
commandCenter.post('/action-center/:id/cancel', (c) => updateAction(c, 'cancelled'));
commandCenter.post('/action-center/:id/approve', (c) => updateAction(c, 'pending'));
commandCenter.post('/action-center/:id/retry', async (c) => {
  const user = c.get('user')!;
  const id = Number(c.req.param('id'));
  await c.env.DB.prepare(
    `UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();
  return c.json({ success: true, message: 'Marked pending for retry.' });
});

commandCenter.get('/memory/review', async (c) => {
  const user = c.get('user')!;
  const type = c.req.query('type') || undefined;
  const tier = c.req.query('tier') || undefined;
  const q = (c.req.query('q') || '').trim();
  const params: any[] = [user.id];
  let sql = 'SELECT * FROM memory WHERE user_id = ?';
  if (type) { sql += ' AND type = ?'; params.push(type); }
  if (tier) { sql += ' AND tier = ?'; params.push(tier); }
  if (q) { sql += ' AND (title LIKE ? OR content LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  sql += ' ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT 200';
  const memories = await c.env.DB.prepare(sql).bind(...params).all<any>();
  const suggestions = await c.env.DB.prepare(
    `SELECT * FROM memory_suggestions WHERE user_id = ? AND status = 'pending' ORDER BY importance DESC, created_at DESC LIMIT 50`
  ).bind(user.id).all<any>().catch(() => ({ results: [] }));
  return c.json({ memories: memories.results || [], suggestions: suggestions.results || [] });
});

commandCenter.post('/memory/:id/promote', async (c) => {
  const user = c.get('user')!;
  await new MemoryService(c.env.DB).promote(Number(c.req.param('id')), user.id);
  return c.json({ success: true });
});

commandCenter.post('/memory/:id/demote', async (c) => {
  const user = c.get('user')!;
  await new MemoryService(c.env.DB).demote(Number(c.req.param('id')), user.id);
  return c.json({ success: true });
});

commandCenter.put('/memory/:id', async (c) => {
  const user = c.get('user')!;
  const { content } = await c.req.json();
  if (!content?.trim()) return c.json({ error: 'Content required' }, 400);
  await new MemoryService(c.env.DB).update(Number(c.req.param('id')), user.id, content.trim());
  return c.json({ success: true });
});

commandCenter.post('/memory-suggestions/:id/accept', async (c) => {
  const user = c.get('user')!;
  const id = Number(c.req.param('id'));
  const row = await c.env.DB.prepare(
    `SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'`
  ).bind(id, user.id).first<any>();
  if (!row) return c.json({ error: 'Suggestion not found' }, 404);
  await new MemoryService(c.env.DB).store(user.id, row.type, row.title, row.content, row.importance || 5, 'long_term');
  await c.env.DB.prepare(
    `UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

commandCenter.post('/memory-suggestions/:id/reject', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    `UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind(Number(c.req.param('id')), user.id).run();
  return c.json({ success: true });
});

export default commandCenter;
