import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, NoteRecord, SessionUserRow } from '../types';

const notes = new Hono<AppEnv>();

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

notes.use('/*', requireAuth);

function mapNote(row: NoteRecord) {
  return {
    id: row.id,
    title: row.title || '',
    content: row.content,
    tags: row.tags || '',
    source: row.source,
    source_query: row.source_query || '',
    is_pinned: row.is_pinned ? 1 : 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

notes.get('/', async (c) => {
  const user = c.get('user')!;
  const limit = Math.min(parseInt(c.req.query('limit') || '50', 10) || 50, 200);
  const offset = parseInt(c.req.query('offset') || '0', 10) || 0;
  const tag = c.req.query('tag');
  const pinnedOnly = c.req.query('pinned_only') === 'true' || c.req.query('pinned_only') === '1';

  const conditions: string[] = ['user_id = ?'];
  const values: (string | number)[] = [user.id];

  if (tag) {
    conditions.push('tags LIKE ?');
    values.push(`%${tag}%`);
  }
  if (pinnedOnly) {
    conditions.push('is_pinned = 1');
  }

  const where = conditions.join(' AND ');
  const countRow = await c.env.DB.prepare(
    `SELECT COUNT(*) as total FROM notes WHERE ${where}`
  ).bind(...values).first<{ total: number }>();

  values.push(limit, offset);
  const result = await c.env.DB.prepare(
    `SELECT * FROM notes WHERE ${where} ORDER BY is_pinned DESC, updated_at DESC LIMIT ? OFFSET ?`
  ).bind(...values).all<NoteRecord>();

  return c.json({
    notes: (result.results || []).map(mapNote),
    total: countRow?.total || 0,
  });
});

notes.get('/search', async (c) => {
  const user = c.get('user')!;
  const q = (c.req.query('q') || '').trim();
  if (!q) {
    return c.json({ notes: [] });
  }

  const pattern = `%${q}%`;
  const result = await c.env.DB.prepare(
    `SELECT * FROM notes WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     ORDER BY updated_at DESC LIMIT 50`
  ).bind(user.id, pattern, pattern, pattern).all<NoteRecord>();

  return c.json({ notes: (result.results || []).map(mapNote) });
});

notes.post('/', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    title?: string;
    content?: string;
    tags?: string;
    source?: 'manual' | 'research' | 'chat';
    source_query?: string;
    is_pinned?: number | boolean;
  }>();

  const content = (body.content || '').trim();
  if (!content) {
    return c.json({ error: 'content is required' }, 400);
  }

  const source = body.source && ['manual', 'research', 'chat'].includes(body.source)
    ? body.source
    : 'manual';
  const isPinned = body.is_pinned ? 1 : 0;

  const row = await c.env.DB.prepare(
    `INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     RETURNING *`
  ).bind(
    user.id,
    (body.title || '').trim(),
    content,
    (body.tags || '').trim(),
    source,
    (body.source_query || '').trim(),
    isPinned,
  ).first<NoteRecord>();

  return c.json({ note: mapNote(row!) });
});

notes.put('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'), 10);
  if (!id) return c.json({ error: 'Invalid note id' }, 400);

  const existing = await c.env.DB.prepare(
    'SELECT id FROM notes WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first();
  if (!existing) return c.json({ error: 'Note not found' }, 404);

  const body = await c.req.json<{
    title?: string;
    content?: string;
    tags?: string;
    is_pinned?: number | boolean;
  }>();

  const sets: string[] = [];
  const values: (string | number)[] = [];

  if (body.title !== undefined) {
    sets.push('title = ?');
    values.push(body.title);
  }
  if (body.content !== undefined) {
    const content = body.content.trim();
    if (!content) return c.json({ error: 'content cannot be empty' }, 400);
    sets.push('content = ?');
    values.push(content);
  }
  if (body.tags !== undefined) {
    sets.push('tags = ?');
    values.push(body.tags);
  }
  if (body.is_pinned !== undefined) {
    sets.push('is_pinned = ?');
    values.push(body.is_pinned ? 1 : 0);
  }

  if (sets.length === 0) {
    return c.json({ error: 'No fields to update' }, 400);
  }

  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id, user.id);

  const row = await c.env.DB.prepare(
    `UPDATE notes SET ${sets.join(', ')} WHERE id = ? AND user_id = ? RETURNING *`
  ).bind(...values).first<NoteRecord>();

  return c.json({ note: mapNote(row!) });
});

notes.delete('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'), 10);
  if (!id) return c.json({ error: 'Invalid note id' }, 400);

  const result = await c.env.DB.prepare(
    'DELETE FROM notes WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  if (!result.meta.changes) {
    return c.json({ error: 'Note not found' }, 404);
  }

  return c.json({ success: true });
});

export default notes;
