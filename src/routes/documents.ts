import { Hono } from 'hono';
import type { AppEnv, UserRecord, DocumentLibraryRecord } from '../types';
import { createRotatingProvider } from '../services/llm/provider';

const documents = new Hono<AppEnv>();

// Auth middleware — exact pattern from src/routes/chat.ts
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

documents.use('/*', requireAuth);

// GET /api/documents — List all documents for the user
documents.get('/', async (c) => {
  const user = c.get('user')!;
  const status = c.req.query('status');
  const search = c.req.query('search');

  const conditions: string[] = ['user_id = ?'];
  const values: any[] = [user.id];

  if (status) {
    conditions.push("status = ?");
    values.push(status);
  }

  if (search) {
    conditions.push("(name LIKE ? OR summary LIKE ?)");
    values.push(`%${search}%`, `%${search}%`);
  }

  const query = `SELECT * FROM document_library WHERE ${conditions.join(' AND ')} ORDER BY created_at DESC`;
  const result = await c.env.DB.prepare(query).bind(...values).all<DocumentLibraryRecord>();

  return c.json({ documents: result.results || [] });
});

// GET /api/documents/:id — Get a single document
documents.get('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const row = await c.env.DB.prepare(
    'SELECT * FROM document_library WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<DocumentLibraryRecord>();

  if (!row) return c.json({ error: 'Document not found' }, 404);

  return c.json({ document: row });
});

// POST /api/documents — Create a new document entry
documents.post('/', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    name: string;
    source?: string;
    file_id?: string;
    drive_file_id?: string;
    mime_type?: string;
    size?: number;
  }>();

  if (!body.name || typeof body.name !== 'string') {
    return c.json({ error: 'name is required' }, 400);
  }

  const source = body.source || 'upload';
  const mimeType = body.mime_type || 'application/octet-stream';
  const size = typeof body.size === 'number' ? body.size : 0;

  const row = await c.env.DB.prepare(
    `INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    user.id,
    body.name,
    source,
    body.file_id || null,
    body.drive_file_id || null,
    mimeType,
    size,
    'uploaded'
  ).first<DocumentLibraryRecord>();

  return c.json({ success: true, document: row });
});

// POST /api/documents/:id/summarize — Trigger document summarization
documents.post('/:id/summarize', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  const doc = await c.env.DB.prepare(
    'SELECT * FROM document_library WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<DocumentLibraryRecord>();

  if (!doc) return c.json({ error: 'Document not found' }, 404);

  let extractedText: string | null = null;

  if (doc.file_id) {
    const fileRow = await c.env.DB.prepare(
      'SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?'
    ).bind(doc.file_id, user.id).first<{ extracted_text: string | null }>();
    extractedText = fileRow?.extracted_text || null;
  }

  let summary: string | null = null;

  if (extractedText) {
    try {
      const { provider } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
      const response = await provider.chat([
        { role: 'system', content: 'You are a helpful assistant that summarizes documents concisely.' },
        { role: 'user', content: `Summarize the following document in a few paragraphs:\n\n${extractedText.substring(0, 8000)}` },
      ], { maxTokens: 1024 });
      summary = response.content?.trim() || null;
    } catch {
      summary = null;
    }
  }

  const finalSummary = summary || 'Summary not yet generated. Ask Karna in chat to summarize this document.';
  const finalStatus: DocumentLibraryRecord['status'] = 'summarized';

  await c.env.DB.prepare(
    `UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind(finalStatus, finalSummary, id, user.id).run();

  const updatedRow = await c.env.DB.prepare(
    'SELECT * FROM document_library WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<DocumentLibraryRecord>();

  return c.json({ success: true, document: updatedRow });
});

// DELETE /api/documents/:id — Delete a document
documents.delete('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    'DELETE FROM document_library WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// POST /api/documents/:id/parse — Mark document as parsed
documents.post('/:id/parse', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  await c.env.DB.prepare(
    `UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
  ).bind('parsed', id, user.id).run();

  const updatedRow = await c.env.DB.prepare(
    'SELECT * FROM document_library WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<DocumentLibraryRecord>();

  return c.json({ success: true, document: updatedRow });
});

export default documents;
