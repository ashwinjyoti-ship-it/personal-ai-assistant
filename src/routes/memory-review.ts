import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, MemoryRecord, MemorySuggestionRecord, SessionUserRow} from '../types';
import { MemoryService } from '../services/memory';

const router = new Hono<AppEnv>();

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

// 1. GET /review
router.get('/review', async (c) => {
  const user = c.get('user')!;
  const tier = c.req.query('tier');
  const type = c.req.query('type');
  const search = c.req.query('search');
  const limit = parseInt(c.req.query('limit') || '50');

  let query = `SELECT * FROM memory WHERE user_id = ?`;
  const params: any[] = [user.id];

  if (tier) {
    query += ` AND tier = ?`;
    params.push(tier);
  }
  if (type) {
    query += ` AND type = ?`;
    params.push(type);
  }
  if (search) {
    query += ` AND (title LIKE ? OR content LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }
  query += ` ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?`;
  params.push(limit);

  const memoriesResult = await c.env.DB.prepare(query).bind(...params).all<MemoryRecord>();

  const countsResult = await c.env.DB.prepare(
    `SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier`
  ).bind(user.id).all<{ tier: string; cnt: number }>();

  const tier_counts: Record<string, number> = { working: 0, long_term: 0 };
  for (const row of countsResult.results || []) {
    tier_counts[row.tier] = row.cnt;
  }

  return c.json({ memories: memoriesResult.results || [], tier_counts });
});

// 2. PUT /review/:id
router.put('/review/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json<{ title?: string; content?: string; importance?: number; tier?: 'working' | 'long_term' }>();

  const sets: string[] = [];
  const values: any[] = [];

  if (body.title !== undefined) { sets.push('title = ?'); values.push(body.title); }
  if (body.content !== undefined) { sets.push('content = ?'); values.push(body.content); }
  if (body.importance !== undefined) { sets.push('importance = ?'); values.push(body.importance); }
  if (body.tier !== undefined) { sets.push('tier = ?'); values.push(body.tier); }

  if (sets.length === 0) return c.json({ error: 'Nothing to update' }, 400);

  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id, user.id);

  await c.env.DB.prepare(
    `UPDATE memory SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  return c.json({ success: true });
});

// 3. POST /review/:id/promote
router.post('/review/:id/promote', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const memoryService = new MemoryService(c.env.DB);
  await memoryService.promote(id, user.id);
  return c.json({ success: true });
});

// 4. POST /review/:id/demote
router.post('/review/:id/demote', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const memoryService = new MemoryService(c.env.DB);
  await memoryService.demote(id, user.id);
  return c.json({ success: true });
});

// 5. DELETE /review/:id
router.delete('/review/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const memoryService = new MemoryService(c.env.DB);
  await memoryService.remove(id, user.id);
  return c.json({ success: true });
});

// 6. GET /suggestions
router.get('/suggestions', async (c) => {
  const user = c.get('user')!;
  const status = c.req.query('status') || 'pending';
  const limit = parseInt(c.req.query('limit') || '50');

  const result = await c.env.DB.prepare(
    `SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?`
  ).bind(user.id, status, limit).all<MemorySuggestionRecord>();

  return c.json({ suggestions: result.results || [] });
});

// 7. POST /suggestions/:id/accept
router.post('/suggestions/:id/accept', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const suggestion = await c.env.DB.prepare(
    `SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'`
  ).bind(id, user.id).first<MemorySuggestionRecord>();

  if (!suggestion) return c.json({ error: 'Suggestion not found or already decided' }, 404);

  const memoryService = new MemoryService(c.env.DB);
  await memoryService.store(user.id, suggestion.type, suggestion.title, suggestion.content, suggestion.importance, 'long_term');

  await c.env.DB.prepare(
    `UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?`
  ).bind(id).run();

  return c.json({ success: true });
});

// 8. POST /suggestions/:id/reject
router.post('/suggestions/:id/reject', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const suggestion = await c.env.DB.prepare(
    `SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'`
  ).bind(id, user.id).first<{ id: number }>();

  if (!suggestion) return c.json({ error: 'Suggestion not found or already decided' }, 404);

  await c.env.DB.prepare(
    `UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?`
  ).bind(id).run();

  return c.json({ success: true });
});

// 9. POST /suggestions
router.post('/suggestions', async (c) => {
  const user = c.get('user')!;
  const { type, title, content, importance, source_message_id } = await c.req.json<{
    type: MemorySuggestionRecord['type'];
    title: string;
    content: string;
    importance?: number;
    source_message_id?: number;
  }>();

  if (!type || !title || !content) {
    return c.json({ error: 'type, title, and content are required' }, 400);
  }

  const result = await c.env.DB.prepare(
    `INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(user.id, type, title, content, importance ?? 5, 'pending', source_message_id || null).first<{ id: number }>();

  return c.json({ success: true, id: result?.id });
});

// 10. POST /migrate-documents-out — move bulky memory entries into document_library
router.post('/migrate-documents-out', async (c) => {
  const user = c.get('user')!;

  // Find memory entries with suspiciously large content or document-like markers.
  // Exclude protected types (preference, fact, context, decision) — these are standing
  // instructions and user context that must never be evicted from memory regardless of size.
  const candidates = await c.env.DB.prepare(`
    SELECT id, type, title, content, importance
    FROM memory
    WHERE user_id = ?
      AND type NOT IN ('preference', 'fact', 'context', 'decision')
      AND (
        length(content) > 1500
        OR (
          lower(content) LIKE '%essay%'
          OR lower(content) LIKE '%article%'
          OR lower(content) LIKE '%draft%'
          OR lower(content) LIKE '%report%'
          OR lower(content) LIKE '%chapter%'
        )
      )
    ORDER BY length(content) DESC
    LIMIT 50
  `).bind(user.id).all<{ id: number; type: string; title: string; content: string; importance: number }>();

  const rows = candidates.results || [];
  if (rows.length === 0) {
    return c.json({ migrated: 0, skipped: 0, samples: [], message: 'No oversized memory entries found.' });
  }

  let migrated = 0;
  let skipped = 0;
  const samples: Array<{ id: number; title: string; action: string }> = [];

  for (const row of rows) {
    // Guard: protected types must never be migrated, even if the SQL filter missed them
    if (['preference', 'fact', 'context', 'decision'].includes(row.type)) {
      skipped++;
      continue;
    }

    // Only migrate if content is clearly a document body (>1500 chars or has document keywords with substantial body)
    const isLarge = row.content.length > 1500;
    const hasDocMarker = /\b(essay|article|draft|report|chapter)\b/i.test(row.content) && row.content.length > 500;

    if (!isLarge && !hasDocMarker) {
      skipped++;
      continue;
    }

    try {
      // Insert into document_library as migrated document
      const summary = row.content.substring(0, 500);
      const extractedText = row.content.substring(0, 50000);

      await c.env.DB.prepare(`
        INSERT INTO document_library (user_id, source, name, summary, extracted_text, status)
        VALUES (?, 'memory_migration', ?, ?, ?, 'parsed')
      `).bind(user.id, row.title, summary, extractedText).run();

      // Replace memory entry with a short pointer stub
      const pointer = `[Migrated to Document Library] ${row.title} — content moved to Document Library. Search for it with search_library("${row.title.substring(0, 40)}").`;
      await c.env.DB.prepare(
        `UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(pointer, row.id, user.id).run();

      migrated++;
      if (samples.length < 5) {
        samples.push({ id: row.id, title: row.title, action: 'migrated to document_library, memory demoted to pointer' });
      }
    } catch {
      skipped++;
    }
  }

  return c.json({
    migrated,
    skipped,
    samples,
    message: `Moved ${migrated} bulky memory entries to Document Library. ${skipped} entries were skipped (too short or migration error).`,
  });
});

export default router;
