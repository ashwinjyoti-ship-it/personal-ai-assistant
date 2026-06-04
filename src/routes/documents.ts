import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, DocumentLibraryRecord, SessionUserRow} from '../types';
import { createRotatingProvider } from '../services/llm/provider';

const documents = new Hono<AppEnv>();


function sanitizeRetrievedChunk(text: string): string {
  return text
    .split('\n')
    .filter(line => !/^(system:|assistant:|ignore previous|follow these instructions|tool:)/i.test(line.trim()))
    .join('\n')
    .slice(0, 4000);
}


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

// POST /api/documents/upload — Upload a file and create a document_library entry
documents.post('/upload', async (c) => {
  const user = c.get('user')!;

  const hasR2 = !!c.env.DOCUMENTS_BUCKET;
  const MAX_FILE_BYTES = hasR2 ? 100 * 1024 * 1024 : 700 * 1024;

  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return c.json({ error: 'No file provided.' }, 400);

    const fileName = file.name;
    const fileType = file.type || 'application/octet-stream';
    const fileSize = file.size;

    if (fileSize > MAX_FILE_BYTES) {
      return c.json({ error: `File too large (max ${hasR2 ? '100 MB' : '700 KB'}). Try sharing a Google Drive link instead.` }, 400);
    }

    const rawBuffer = await file.arrayBuffer();
    const fileId = crypto.randomUUID();

    let storedFileData: string;

    if (hasR2) {
      await c.env.DOCUMENTS_BUCKET!.put(fileId, rawBuffer, {
        httpMetadata: { contentType: fileType },
        customMetadata: { fileName, userId: String(user.id) },
      });
      storedFileData = 'r2';
    } else {
      storedFileData = Buffer.from(rawBuffer).toString('base64');
    }

    await c.env.DB.prepare(
      'INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(fileId, user.id, fileName, fileType, storedFileData, fileSize).run();

    await c.env.DB.prepare(
      'INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, fileId, 'upload', fileName, fileType, fileSize, 'uploaded').run();

    // DOCX: extract text immediately
    const isDocx = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || fileName.toLowerCase().endsWith('.docx');

    if (isDocx) {
      try {
        const { extractDocxTextFromBuffer } = await import('../services/docx');
        const text = await extractDocxTextFromBuffer(Buffer.from(rawBuffer));
        if (text.length > 50) {
          await c.env.DB.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ?')
            .bind(text, fileId).run();
          const summary = text.substring(0, 600);
          await c.env.DB.prepare(
            `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?`
          ).bind(summary, text.substring(0, 50000), fileId, user.id).run();

          // Generate embeddings in the background so the upload response stays fast
          const embEnv = c.env;
          const embUserId = user.id;
          const embText = text;
          const embFileId = fileId;
          const embTask = (async () => {
            try {
              const docRow = await embEnv.DB.prepare(
                'SELECT id FROM document_library WHERE file_id = ? AND user_id = ?'
              ).bind(embFileId, embUserId).first<{ id: number }>();
              if (docRow) {
                const { indexDocumentChunks } = await import('../services/embeddings');
                await indexDocumentChunks(
                  { DB: embEnv.DB, AI: (embEnv as any).AI, VECTORIZE: (embEnv as any).VECTORIZE },
                  embUserId, docRow.id, embText
                );
              }
            } catch { /* non-critical */ }
          })();
          try { c.executionCtx.waitUntil(embTask); } catch { /* not available in dev */ }
        }
      } catch { /* non-critical */ }
    }

    // PDF: kick off background text extraction if user has an Anthropic key
    const isPdf = fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
    if (isPdf && user.pin_hash) {
      const pdfBase64 = Buffer.from(rawBuffer).toString('base64');
      const pinHash = user.pin_hash;
      const userId = user.id;
      const db = c.env.DB;
      const bucket = c.env.DOCUMENTS_BUCKET;
      const pdfEnv = c.env;

      const extractionTask = (async () => {
        try {
          let anthropicKey: string | null = null;
          let anthropicModel = 'claude-haiku-4-5-20251001';
          const { decrypt } = await import('../services/crypto');
          for (const slot of ['llm_slot_1', 'llm_slot_2', 'llm_slot_3']) {
            try {
              const cred = await db.prepare(
                'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
              ).bind(userId, slot).first<{ encrypted_value: string }>();
              if (cred) {
                const val = await decrypt(cred.encrypted_value, pinHash);
                const slotData = JSON.parse(val) as { provider: string; apiKey: string; model?: string };
                if (slotData.provider === 'anthropic') {
                  anthropicKey = slotData.apiKey;
                  if (slotData.model) anthropicModel = slotData.model;
                  break;
                }
              }
            } catch { /* try next slot */ }
          }
          if (!anthropicKey) return;

          let base64: string = pdfBase64;
          if (storedFileData === 'r2' && bucket) {
            const obj = await bucket.get(fileId);
            if (!obj) return;
            base64 = Buffer.from(await obj.arrayBuffer()).toString('base64');
          }

          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01',
              'anthropic-beta': 'pdfs-2024-09-25',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: anthropicModel,
              max_tokens: 8192,
              messages: [{
                role: 'user',
                content: [
                  { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
                  { type: 'text', text: 'Extract all readable text from this document. Preserve tables, lists, and structure.' },
                ],
              }],
            }),
          });
          if (!res.ok) return;
          const data = await res.json() as any;
          const extracted = data.content?.[0]?.text || '';
          if (extracted) {
            await db.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ?')
              .bind(extracted, fileId).run();
            const summary = extracted.substring(0, 600);
            await db.prepare(
              `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?`
            ).bind(summary, extracted.substring(0, 50000), fileId, userId).run();

            // Generate semantic embeddings after text is stored
            try {
              const docRow = await db.prepare(
                'SELECT id FROM document_library WHERE file_id = ? AND user_id = ?'
              ).bind(fileId, userId).first<{ id: number }>();
              if (docRow) {
                const { indexDocumentChunks } = await import('../services/embeddings');
                await indexDocumentChunks(
                  { DB: db, AI: (pdfEnv as any).AI, VECTORIZE: (pdfEnv as any).VECTORIZE },
                  userId, docRow.id, extracted
                );
              }
            } catch { /* non-critical */ }
          }
        } catch { /* non-critical */ }
      })();

      try { c.executionCtx.waitUntil(extractionTask); } catch { /* not available in dev */ }
    }

    return c.json({
      file_id: fileId,
      name: fileName,
      type: fileType,
      size: fileSize,
      storage: hasR2 ? 'r2' : 'd1',
      extracting: isPdf && !isDocx,
    });
  } catch (err: any) {
    console.error('Document upload error:', err);
    return c.json({ error: `Upload failed: ${err.message || 'Unknown error'}` }, 500);
  }
});

// POST /api/documents/search — Semantic vector search across document chunks
documents.post('/search', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{ query: string; limit?: number }>();
  if (!body.query) return c.json({ error: 'query is required' }, 400);
  const { semanticDocumentSearch } = await import('../services/embeddings');
  const results = await semanticDocumentSearch(
    { DB: c.env.DB, AI: (c.env as any).AI, VECTORIZE: (c.env as any).VECTORIZE },
    user.id, body.query, Math.min(body.limit || 5, 20)
  );
  return c.json({ results });
});

// POST /api/documents/chat — Document Q&A using semantically retrieved chunks as context
documents.post('/chat', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    question?: string;
    query?: string;
    document_ids?: number[];
    session_id?: string;
  }>();
  const question = (body.question || body.query || '').trim();
  if (!question) return c.json({ error: 'question is required' }, 400);

  const { semanticDocumentSearch } = await import('../services/embeddings');
  const chunks = await semanticDocumentSearch(
    { DB: c.env.DB, AI: (c.env as any).AI, VECTORIZE: (c.env as any).VECTORIZE },
    user.id, question, 6
  );

  let answer: string;
  if (chunks.length === 0) {
    answer = 'No relevant document content found for your question. Make sure your documents have been uploaded and processed first.';
  } else {
    const context = chunks.map((r, i) => `[Source ${i + 1}: ${r.filename} | chunk ${r.chunk_index}]\n${sanitizeRetrievedChunk(r.chunk)}`).join('\n\n---\n\n');
    try {
      const { provider } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
      const resp = await provider.chat([
        {
          role: 'system',
          content: 'Answer using only the provided excerpts. For every key statement, cite sources as [S1], [S2], etc. Do not fabricate citations.',
        },
        {
          role: 'user',
          content: `Document excerpts:\n\n${context}\n\nQuestion: ${question}`,
        },
      ], { maxTokens: 1024 });
      answer = resp.content?.trim() || 'Could not generate an answer.';
    } catch {
      answer = 'Unable to generate an answer at this time. Please try again.';
    }
  }

  return c.json({
    answer,
    session_id: body.session_id || crypto.randomUUID(),
    sources: chunks.map((r, i) => ({ source_id: `S${i + 1}`, filename: r.filename, chunk_index: r.chunk_index, relevance_score: r.relevance_score, retrieval_method: r.retrieval_method })),
  });
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
