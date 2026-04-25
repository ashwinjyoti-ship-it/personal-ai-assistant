import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';
import { createRotatingProvider } from '../services/llm/provider';

const documents = new Hono<AppEnv>();

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

documents.use('/*', requireAuth);

documents.get('/', async (c) => {
  const user = c.get('user')!;
  const rows = await c.env.DB.prepare(
    `SELECT * FROM document_library WHERE user_id = ? ORDER BY updated_at DESC LIMIT 100`
  ).bind(user.id).all<any>().catch(() => ({ results: [] }));
  return c.json({ documents: rows.results || [] });
});

documents.post('/:id/summarize', async (c) => {
  const user = c.get('user')!;
  const id = Number(c.req.param('id'));
  const row = await c.env.DB.prepare(
    `SELECT dl.*, uf.extracted_text, uf.file_data, uf.file_type, uf.file_name
     FROM document_library dl
     LEFT JOIN uploaded_files uf ON dl.file_id = uf.id
     WHERE dl.id = ? AND dl.user_id = ?`
  ).bind(id, user.id).first<any>();
  if (!row) return c.json({ error: 'Document not found' }, 404);

  let text = row.extracted_text || '';
  if (!text && row.file_data && row.file_data !== 'r2' && String(row.file_type || '').startsWith('text/')) {
    try { text = Buffer.from(row.file_data, 'base64').toString('utf-8'); } catch { text = ''; }
  }
  if (!text || text.trim().length < 30) {
    await c.env.DB.prepare(
      `UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(id, user.id).run();
    return c.json({ success: false, status: 'parsed', message: 'No extracted text is available yet. Ask Karna to parse the document first, or retry after PDF extraction finishes.' });
  }

  try {
    const { provider } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
    const prompt = `Summarize this document for a personal command center. Return JSON only with keys: summary (short paragraph), key_points (array), dates (array), people_orgs (array), money_amounts (array), action_items (array), risks_unknowns (array).\n\nDocument: ${row.name}\n\n${text.slice(0, 24000)}`;
    const response = await provider.chat([{ role: 'user', content: prompt }], { tools: [], maxTokens: 1600 });
    const parsed = parseSummary(response.content || '');
    await c.env.DB.prepare(
      `UPDATE document_library SET summary = ?, key_points = ?, action_items_json = ?, status = 'summarized', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(parsed.summary, JSON.stringify(parsed.key_points), JSON.stringify(parsed.action_items), id, user.id).run();

    for (const item of parsed.action_items.slice(0, 8)) {
      await c.env.DB.prepare(
        `INSERT INTO action_items (user_id, type, title, body, status, priority, source, source_id)
         VALUES (?, 'document_summary', ?, ?, 'pending', 'normal', 'document_library', ?)`
      ).bind(user.id, String(item).slice(0, 160), `From ${row.name}`, String(id)).run().catch(() => null);
    }

    return c.json({ success: true, summary: parsed });
  } catch (err: any) {
    await c.env.DB.prepare(
      `UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(id, user.id).run().catch(() => null);
    return c.json({ success: false, message: err.message?.includes('No LLM provider') ? 'No AI provider configured. The document is stored; summary is pending.' : err.message });
  }
});

documents.delete('/:id', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    `DELETE FROM document_library WHERE id = ? AND user_id = ?`
  ).bind(Number(c.req.param('id')), user.id).run();
  return c.json({ success: true });
});

function parseSummary(text: string): { summary: string; key_points: string[]; action_items: string[] } {
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  try {
    const data = JSON.parse(cleaned);
    return {
      summary: String(data.summary || '').slice(0, 2000),
      key_points: Array.isArray(data.key_points) ? data.key_points.map(String) : [],
      action_items: Array.isArray(data.action_items) ? data.action_items.map(String) : [],
    };
  } catch {
    return { summary: cleaned.slice(0, 2000), key_points: [], action_items: [] };
  }
}

export default documents;
