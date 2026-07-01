// Chat routes — thread-aware conversations with LLM integration + provider rotation

import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, NormalizedMessage, SSEEvent, SessionUserRow} from '../types';
import { createRotatingProvider } from '../services/llm/provider';
import { runAgent, runAgentStreaming, runAgentRouted, runAgentStreamingRouted } from '../services/agent';
import {
  createRun,
  executeRun,
  resumeRun,
  getRun,
  getLatestRunForThread,
  runBelongsToUser,
} from '../services/run-store';
import { GmailService } from '../services/gmail';

const chat = new Hono<AppEnv>();

// Auth middleware for chat routes
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

chat.use('/*', requireAuth);

// ==========================================
// Thread Management
// ==========================================

// List all threads for the user
chat.get('/threads', async (c) => {
  const user = c.get('user')!;
  const archived = c.req.query('archived') === '1';
  const limit = parseInt(c.req.query('limit') || '30');

  const result = await c.env.DB.prepare(
    `SELECT
      t.id, t.user_id, t.title, t.summary, t.is_archived, t.is_pinned, t.channel,
      t.created_at, t.updated_at,
      (SELECT COUNT(*) FROM conversations WHERE thread_id = t.id) as message_count,
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
      ORDER BY t.is_pinned DESC, t.updated_at DESC
      LIMIT ?`
  ).bind(user.id, archived ? 1 : 0, limit).all<any>();

  return c.json({ threads: result.results || [] });
});

// Create a new thread
chat.post('/threads', async (c) => {
  const user = c.get('user')!;
  const { title } = await c.req.json<{ title?: string }>();

  const result = await c.env.DB.prepare(
    `INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *`
  ).bind(user.id, title || 'New conversation').first<any>();

  return c.json({ thread: result });
});

// Update a thread (rename, archive)
chat.put('/threads/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const updates = await c.req.json<{ title?: string; is_archived?: boolean; is_pinned?: boolean }>();

  const sets: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) { sets.push('title = ?'); values.push(updates.title); }
  if (updates.is_archived !== undefined) { sets.push('is_archived = ?'); values.push(updates.is_archived ? 1 : 0); }
  if (updates.is_pinned !== undefined) { sets.push('is_pinned = ?'); values.push(updates.is_pinned ? 1 : 0); }
  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id, user.id);

  if (sets.length <= 1) return c.json({ error: 'Nothing to update' }, 400);

  await c.env.DB.prepare(
    `UPDATE threads SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  return c.json({ success: true });
});

// Delete a thread and its messages
chat.delete('/threads/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));

  // Delete messages first, then the thread
  await c.env.DB.prepare(
    'DELETE FROM conversations WHERE thread_id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  await c.env.DB.prepare(
    'DELETE FROM threads WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

// ==========================================
// File Upload
// ==========================================

chat.post('/upload', async (c) => {
  const user = c.get('user')!;

  // D1 column limit ~1 MB (base64 adds ~33% overhead → 700 KB raw).
  // If R2 bucket is bound, there is no size limit — files go to R2, D1 stores 'r2' sentinel.
  const hasR2 = !!c.env.DOCUMENTS_BUCKET;
  const MAX_FILE_BYTES = hasR2 ? 100 * 1024 * 1024 : 700 * 1024; // 100 MB with R2, 700 KB without

  let fileName: string;
  let fileType: string;
  let fileSize: number;
  let rawBuffer: ArrayBuffer | null = null;
  let base64Data: string | null = null; // only used for D1 path

  try {
    const contentType = c.req.header('Content-Type') || '';

    if (contentType.includes('multipart/form-data')) {
      // FormData upload from browser
      const formData = await c.req.formData();
      const file = formData.get('file') as File | null;
      if (!file) return c.json({ error: 'No file provided.' }, 400);

      fileName = file.name;
      fileType = file.type || 'application/octet-stream';
      fileSize = file.size;

      if (fileSize > MAX_FILE_BYTES) {
        return c.json({ error: `File too large (max ${hasR2 ? '100 MB' : '700 KB'}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.` }, 400);
      }

      rawBuffer = await file.arrayBuffer();
    } else {
      // JSON upload with base64 data
      const body = await c.req.json<{ file_name?: string; file_type?: string; file_data?: string; file_size?: number }>();
      if (!body.file_name || !body.file_data) return c.json({ error: 'file_name and file_data are required.' }, 400);
      fileName = body.file_name;
      fileType = body.file_type || 'application/octet-stream';
      base64Data = body.file_data;
      fileSize = body.file_size || Math.round(base64Data.length * 0.75);

      if (fileSize > MAX_FILE_BYTES) {
        return c.json({ error: `File too large (max ${hasR2 ? '100 MB' : '700 KB'}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.` }, 400);
      }

      // Decode base64 to raw buffer so we can upload to R2 if needed
      if (hasR2) {
        const binary = atob(base64Data);
        rawBuffer = new ArrayBuffer(binary.length);
        const view = new Uint8Array(rawBuffer);
        for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
      }
    }

    // Generate a UUID for the file
    const fileId = crypto.randomUUID();

    let storedFileData: string;

    if (hasR2 && rawBuffer) {
      // Upload raw bytes to R2; store only the sentinel in D1
      await c.env.DOCUMENTS_BUCKET!.put(fileId, rawBuffer, {
        httpMetadata: { contentType: fileType },
        customMetadata: { fileName, userId: String(user.id) },
      });
      storedFileData = 'r2';
    } else {
      // Fall back to D1 base64 storage
      storedFileData = base64Data || (rawBuffer ? Buffer.from(rawBuffer).toString('base64') : '');
    }

    await c.env.DB.prepare(
      'INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(fileId, user.id, fileName, fileType, storedFileData, fileSize).run();

    await c.env.DB.prepare(
      'INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, fileId, 'upload', fileName, fileType, fileSize, 'uploaded').run();

    // For PDFs: kick off text extraction in the background (via waitUntil) so that
    // when parse_document runs later it can return the text instantly rather than
    // making a 34-second Anthropic API call inside the agent loop.
    const isPdf = fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
    const isDocx = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || fileName.toLowerCase().endsWith('.docx');

    // DOCX: extract text immediately via ZIP (no API call, no wait needed)
    if (isDocx) {
      try {
        const { extractDocxTextFromBuffer } = await import('../services/docx');
        const docxBytes = base64Data
          ? Buffer.from(base64Data, 'base64')
          : rawBuffer ? Buffer.from(rawBuffer) : null;
        if (docxBytes) {
          const text = await extractDocxTextFromBuffer(docxBytes);
          if (text.length > 50) {
            await c.env.DB.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ?')
              .bind(text, fileId).run();
            // Write a 600-char summary and extracted_text into document_library for search_library
            const summary = text.substring(0, 600);
            await c.env.DB.prepare(
              `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?`
            ).bind(summary, text.substring(0, 50000), fileId, user.id).run();
          }
        }
      } catch { /* non-critical */ }
    }

    if (isPdf && user.pin_hash) {
      const pdfBase64 = base64Data || (rawBuffer ? Buffer.from(rawBuffer).toString('base64') : null);
      const pinHash = user.pin_hash;
      const userId = user.id;
      const db = c.env.DB;
      const bucket = c.env.DOCUMENTS_BUCKET;

      const extractionTask = (async () => {
        try {
          // Find an Anthropic key in user's credential slots
          let anthropicKey: string | null = null;
          let anthropicModel = 'claude-sonnet-5';
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

          // Get PDF bytes — from R2 if stored there, else use the in-memory base64
          let base64: string;
          if (storedFileData === 'r2' && bucket) {
            const obj = await bucket.get(fileId);
            if (!obj) return;
            base64 = Buffer.from(await obj.arrayBuffer()).toString('base64');
          } else if (pdfBase64) {
            base64 = pdfBase64;
          } else {
            return;
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
            // Mirror extracted text + 600-char summary into document_library for search_library
            const summary = extracted.substring(0, 600);
            await db.prepare(
              `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?`
            ).bind(summary, extracted.substring(0, 50000), fileId, userId).run();
          }
        } catch { /* non-critical — parse_document will fall back to inline extraction */ }
      })();

      try { c.executionCtx.waitUntil(extractionTask); } catch { /* executionCtx not available in dev */ }
    }

    // Build a text preview for text files
    let textPreview = '';
    if (fileType.startsWith('text/')) {
      try {
        const src = base64Data || (rawBuffer ? Buffer.from(rawBuffer).toString('base64') : '');
        textPreview = Buffer.from(src, 'base64').toString('utf-8').substring(0, 500);
      } catch { /* ignore */ }
    }

    return c.json({
      file_id: fileId,
      name: fileName,
      type: fileType,
      size: fileSize,
      text_preview: textPreview,
      storage: hasR2 ? 'r2' : 'd1',
      // true when a background PDF extraction is in flight — tell user to wait ~30s
      extracting: isPdf && !isDocx,
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    try {
      const { logError } = await import('../services/llm/provider');
      await logError(c.env.DB, user.id, 'upload', 'upload_error', err.message || 'Unknown upload error');
    } catch (_) {}
    return c.json({ error: `Upload failed: ${err.message || 'Unknown error'}` }, 500);
  }
});

// ==========================================
// Send message (thread-aware)
// ==========================================

chat.post('/send', async (c) => {
  const user = c.get('user')!;
  const { message, channel = 'web', thread_id, files } = await c.req.json();

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return c.json({ error: 'Message is required' }, 400);
  }

  // Build file context if files were attached
  let fileContext = '';
  if (files && Array.isArray(files) && files.length > 0) {
    fileContext = '\n\n[Attached files:\n';
    for (const f of files) {
      fileContext += `- ${f.name} (${f.type}, ${Math.round(f.size / 1024)}KB, file_id: ${f.file_id})`;
      if (f.text_preview) fileContext += `\n  Preview: ${f.text_preview.substring(0, 300)}...`;
      fileContext += '\n';
    }
    fileContext += 'Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]';
  }

  let activeThreadId = thread_id;

  // Auto-create thread if none provided
  if (!activeThreadId) {
    const newThread = await c.env.DB.prepare(
      `INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *`
    ).bind(user.id, message.trim().substring(0, 60) + (message.trim().length > 60 ? '...' : '')).first<any>();
    activeThreadId = newThread?.id;
  }

  // Normalize the message
  const normalized: NormalizedMessage = {
    userId: user.id,
    username: user.username,
    channel: channel as 'web' | 'telegram',
    text: message.trim() + fileContext,
    sessionId: c.get('sessionId')!,
    timestamp: new Date().toISOString(),
    metadata: { thread_id: activeThreadId },
  };

  try {
    const { provider, rotation } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
    
    const response = await runAgentRouted(normalized, c.env.DB, provider, user, rotation, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
      GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
      DOCUMENTS_BUCKET: c.env.DOCUMENTS_BUCKET,
    });

    // Update thread title from first user message if it's a new thread (auto-title)
    if (!thread_id && activeThreadId) {
      // Use the first ~60 chars of the user message as title
      await c.env.DB.prepare(
        `UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(activeThreadId).run();
    } else if (activeThreadId) {
      await c.env.DB.prepare(
        `UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(activeThreadId).run();
    }

    return c.json({ 
      response, 
      timestamp: new Date().toISOString(),
      channel: normalized.channel,
      provider: provider.name,
      thread_id: activeThreadId,
    });
  } catch (err: any) {
    console.error('Chat error:', err);
    const msg = err.message || '';
    
    if (msg.includes('No LLM provider configured')) {
      return c.json({ 
        error: 'No AI provider configured. Please add at least one API key in Settings \u2192 Keys.',
        type: 'no_provider',
        thread_id: activeThreadId,
      }, 400);
    }

    if (msg.includes('All LLM providers failed')) {
      return c.json({ 
        error: msg,
        type: 'no_provider',
        thread_id: activeThreadId,
      }, 400);
    }

    if (msg.includes('429') || msg.includes('limit reached') || msg.includes('rate limit') || msg.includes('Too Many Requests')) {
      return c.json({
        error: 'Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.',
        type: 'rate_limit',
        thread_id: activeThreadId,
      }, 429);
    }

    const isAuthError = msg.includes('401') || msg.includes('403')
      || msg.includes('authentication') || msg.includes('credit balance')
      || msg.includes('invalid') && msg.includes('key');

    try {
      const { logError } = await import('../services/llm/provider');
      await logError(c.env.DB, user.id, 'llm', 'chat_error', msg);
    } catch (_) {}

    return c.json({ 
      error: isAuthError 
        ? 'API key error \u2014 your provider returned an authentication or billing error. Check Settings \u2192 Keys to verify your API keys are valid.'
        : 'Something went wrong. I\'ll be back in a moment.',
      details: msg,
      type: isAuthError ? 'no_provider' : undefined,
      thread_id: activeThreadId,
    }, isAuthError ? 400 : 500);
  }
});

// ==========================================
// SSE Streaming Chat Endpoint
// ==========================================

// Helper function to format SSE events
function formatSSE(event: SSEEvent): string {
  return `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\n\n`;
}

chat.post('/stream', async (c) => {
  const user = c.get('user')!;
  const { message, channel = 'web', thread_id, files } = await c.req.json();

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return c.json({ error: 'Message is required' }, 400);
  }

  // Build file context if files were attached
  let fileContext = '';
  if (files && Array.isArray(files) && files.length > 0) {
    fileContext = '\n\n[Attached files:\n';
    for (const f of files) {
      fileContext += `- ${f.name} (${f.type}, ${Math.round(f.size / 1024)}KB, file_id: ${f.file_id})`;
      if (f.text_preview) fileContext += `\n  Preview: ${f.text_preview.substring(0, 300)}...`;
      fileContext += '\n';
    }
    fileContext += 'Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]';
  }

  let activeThreadId = thread_id;

  // Auto-create thread if none provided
  if (!activeThreadId) {
    const newThread = await c.env.DB.prepare(
      `INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *`
    ).bind(user.id, message.trim().substring(0, 60) + (message.trim().length > 60 ? '...' : '')).first<any>();
    activeThreadId = newThread?.id;
  }

  // Normalize the message
  const normalized: NormalizedMessage = {
    userId: user.id,
    username: user.username,
    channel: channel as 'web' | 'telegram',
    text: message.trim() + fileContext,
    sessionId: c.get('sessionId')!,
    timestamp: new Date().toISOString(),
    metadata: { thread_id: activeThreadId },
  };

  try {
    const { provider, rotation } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);

    // Build the generator. Each event gets the thread id stamped before it's
    // published so reconnecting clients see consistent data.
    const rawGenerator = runAgentStreamingRouted(normalized, c.env.DB, provider, user, rotation, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
      GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
      DOCUMENTS_BUCKET: c.env.DOCUMENTS_BUCKET,
    });

    // Stamp threadId on every event.
    const stampedGenerator = (async function* () {
      for await (const event of rawGenerator) {
        if (!event.data.threadId) event.data.threadId = activeThreadId;
        yield event;
      }
    })();

    // === Run store: decouple the agent run from this request ===
    // The run keeps executing on the backend (via waitUntil / the event loop)
    // even if the client disconnects. The originating request and any later
    // reconnect both stream from the same in-memory bus + D1 buffer.
    //
    // The run store is an enhancement — if it's unavailable (e.g. the chat_runs
    // table doesn't exist yet because migration 0046 hasn't been applied to this
    // D1), createRun returns null and we fall back to direct streaming so chat
    // keeps working instead of throwing "Something went wrong setting up the stream."
    const runId = await createRun(c.env.DB, user.id, activeThreadId as number | null);

    const waitUntil = (p: Promise<unknown>) => {
      try {
        c.executionCtx.waitUntil(p);
      } catch {
        /* native Render: the promise lives on the event loop regardless */
      }
    };

    // --- Run store available: drive the run decoupled + stream from the bus ---
    if (runId) {
      executeRun(c.env.DB, runId, stampedGenerator, {
        waitUntil,
        threadId: activeThreadId as number | null,
      });

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const run = await getRun(c.env.DB, runId);
          if (!run) {
            controller.enqueue(encoder.encode(formatSSE({ type: 'error', data: { error: 'Run not found' } })));
            controller.close();
            return;
          }

          const { replay, tail, status } = resumeRun(run);

          for (const event of replay) {
            controller.enqueue(encoder.encode(formatSSE(event)));
          }

          if (status !== 'running') {
            controller.close();
            return;
          }

          try {
            for await (const event of tail) {
              controller.enqueue(encoder.encode(formatSSE(event)));
            }
          } catch {
            /* client disconnected — the run keeps going in the background */
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Thread-Id': String(activeThreadId || ''),
          'X-Run-Id': String(runId),
        },
      });
    }

    // --- Fallback: run store unavailable — stream directly off the generator ---
    // No resume on disconnect, but chat works. This is the original behaviour
    // and guarantees chat never breaks because of the run store.
    const directStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stampedGenerator) {
            controller.enqueue(encoder.encode(formatSSE(event)));
          }
          if (activeThreadId) {
            await c.env.DB.prepare(
              `UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
            ).bind(activeThreadId).run();
          }
          controller.close();
        } catch (err: any) {
          controller.enqueue(encoder.encode(formatSSE({
            type: 'error',
            data: { error: err.message || 'An error occurred', threadId: activeThreadId },
          })));
          controller.close();
        }
      },
    });

    return new Response(directStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Thread-Id': String(activeThreadId || ''),
      },
    });
  } catch (err: any) {
    console.error('Stream setup error:', err);
    const msg = err.message || '';

    if (msg.includes('No LLM provider configured')) {
      return c.json({ 
        error: 'No AI provider configured. Please add at least one API key in Settings \u2192 Keys.',
        type: 'no_provider',
        thread_id: activeThreadId,
      }, 400);
    }

    if (msg.includes('429') || msg.includes('limit reached') || msg.includes('rate limit') || msg.includes('Too Many Requests')) {
      return c.json({
        error: 'Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.',
        type: 'rate_limit',
        thread_id: activeThreadId,
      }, 429);
    }

    return c.json({
      error: 'Something went wrong setting up the stream.',
      details: msg,
      thread_id: activeThreadId,
    }, 500);
  }
});

// ==========================================
// Resume a run after a dropped connection (app backgrounded, phone sleep, reload)
// ==========================================

// Replay buffered events + tail any still-running generator. The client calls
// this after a network error mid-stream, or on page load if a run is in flight.
chat.get('/runs/:id/resume', async (c) => {
  const user = c.get('user')!;
  const runId = c.req.param('id');
  if (!runId) return c.json({ error: 'Run id required' }, 400);

  const owned = await runBelongsToUser(c.env.DB, runId, user.id);
  if (!owned) return c.json({ error: 'Run not found' }, 404);

  const run = await getRun(c.env.DB, runId);
  if (!run) return c.json({ error: 'Run not found' }, 404);

  const fromParam = parseInt(c.req.query('from') || '0', 10);
  const fromEvent = Number.isFinite(fromParam) && fromParam >= 0 ? fromParam : 0;
  const { replay, tail, status } = resumeRun(run, fromEvent);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // Replay events the client has not seen yet (from cursor onward). On a
      // fresh reconnect from=0 yields the full log; mid-stream resume skips
      // already-rendered chunks and avoids doubled/garbled text.
      for (const event of replay) {
        controller.enqueue(encoder.encode(formatSSE(event)));
      }

      if (status !== 'running') {
        controller.close();
        return;
      }

      try {
        for await (const event of tail) {
          controller.enqueue(encoder.encode(formatSSE(event)));
        }
      } catch {
        /* client gone again — they can resume once more */
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Thread-Id': String(run.threadId || ''),
      'X-Run-Id': String(runId),
    },
  });
});

// Look up the latest run for the active thread (used by the frontend on page
// load to decide whether to resume an in-flight run).
chat.get('/threads/:id/active-run', async (c) => {
  const user = c.get('user')!;
  const threadId = parseInt(c.req.param('id'));
  if (!Number.isFinite(threadId)) return c.json({ error: 'Invalid thread id' }, 400);

  const run = await getLatestRunForThread(c.env.DB, user.id, threadId);
  if (!run) return c.json({ run: null });
  return c.json({ run: { runId: run.runId, status: run.status, threadId: run.threadId } });
});

// ==========================================
// Thread-aware History
// ==========================================

// Get messages for a specific thread
chat.get('/threads/:id/messages', async (c) => {
  const user = c.get('user')!;
  const threadId = parseInt(c.req.param('id'));
  const limit = parseInt(c.req.query('limit') || '50');

  const result = await c.env.DB.prepare(
    `SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`
  ).bind(user.id, threadId, limit).all<any>();

  return c.json({ 
    messages: (result.results || []).reverse(),
    total: result.results?.length || 0 
  });
});

// Legacy: get all conversation history (backward compatible)
chat.get('/history', async (c) => {
  const user = c.get('user')!;
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');
  const threadId = c.req.query('thread_id');

  let query: string;
  let bindings: any[];

  if (threadId) {
    query = `SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    bindings = [user.id, parseInt(threadId), limit, offset];
  } else {
    query = `SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    bindings = [user.id, limit, offset];
  }

  const result = await c.env.DB.prepare(query).bind(...bindings).all<any>();

  return c.json({ 
    messages: (result.results || []).reverse(),
    total: result.results?.length || 0 
  });
});

// Clear conversation history (specific thread or all)
chat.delete('/history', async (c) => {
  const user = c.get('user')!;
  const threadId = c.req.query('thread_id');

  if (threadId) {
    await c.env.DB.prepare(
      'DELETE FROM conversations WHERE user_id = ? AND thread_id = ?'
    ).bind(user.id, parseInt(threadId)).run();
  } else {
    await c.env.DB.prepare(
      'DELETE FROM conversations WHERE user_id = ?'
    ).bind(user.id).run();
  }
  return c.json({ success: true });
});

// ==========================================
// Dashboard data endpoint
// ==========================================

chat.get('/dashboard', async (c) => {
  const user = c.get('user')!;

  // Run all queries in parallel; guard each optional table individually
  const [
    threadCountResult,
    activeSchedulesResult,
    memoryCountResult,
    recentThreadsResult,
    notificationsResult,
    errorCountResult,
    skillsCountResult,
    preferencesCountResult,
    pendingActionsResult,
    runningBrowserTasksResult,
    failedActionsResult,
    memorySuggestionsResult,
    documentsCountResult,
    recentDocumentsResult,
    todaysRemindersResult,
  ] = await Promise.all([
    // Total threads
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Active schedules
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Memory count
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Recent threads (last 5)
    c.env.DB.prepare(
      `SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`
    ).bind(user.id).all<any>().catch(() => ({ results: [] })),
    // Unread notifications
    c.env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0'
    ).bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Error count
    c.env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0'
    ).bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Skills count (enabled) — requires migration 0019
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Preferences count
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Pending actions
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Running browser tasks
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Failed actions
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Memory suggestions
    c.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Documents count
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?').bind(user.id).first<{ cnt: number }>().catch(() => null),
    // Recent documents (last 5, lightweight columns only)
    c.env.DB.prepare(
      'SELECT id, name, mime_type, size, status, source, created_at FROM document_library WHERE user_id = ? ORDER BY created_at DESC LIMIT 5'
    ).bind(user.id).all<any>().catch(() => ({ results: [] })),
    // Today's reminders
    c.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(user.id).all<any>().catch(() => ({ results: [] })),
  ]);

  return c.json({
    threads: threadCountResult?.cnt || 0,
    active_schedules: activeSchedulesResult?.cnt || 0,
    memories: memoryCountResult?.cnt || 0,
    recent_threads: recentThreadsResult.results || [],
    provider_usage: [],
    unread_notifications: notificationsResult?.cnt || 0,
    errors: errorCountResult?.cnt || 0,
    skills_count: skillsCountResult?.cnt || 0,
    preferences_count: preferencesCountResult?.cnt || 0,
    pending_actions: pendingActionsResult?.cnt || 0,
    running_browser_tasks: runningBrowserTasksResult?.cnt || 0,
    failed_actions: failedActionsResult?.cnt || 0,
    memory_suggestions: memorySuggestionsResult?.cnt || 0,
    documents_count: documentsCountResult?.cnt || 0,
    recent_documents: recentDocumentsResult.results || [],
    todays_reminders: todaysRemindersResult.results || [],
  });
});

// ==========================================
// Gmail Unread Count (for dashboard card)
// ==========================================

chat.get('/gmail/unread', async (c) => {
  const user = c.get('user')!;
  try {
    const clientId = c.env.GOOGLE_CLIENT_ID;
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return c.json({ count: null, reason: 'google_not_configured' });
    }
    const gmail = new GmailService(c.env.DB, user.id, user.pin_hash, clientId, clientSecret);
    const count = await gmail.getUnreadCount();
    return c.json({ count });
  } catch (err: any) {
    // If Google not connected or tokens expired, return null gracefully
    return c.json({ count: null, reason: err.message });
  }
});

// ==========================================
// Provider Status
// ==========================================

chat.get('/providers', async (c) => {
  // Provider rotation is now in-memory; return static status
  return c.json({ stats: [], statusText: 'Provider rotation active (in-memory).' });
});

// ==========================================
// Notifications (powers the bell icon)
// ==========================================

// Get notification count (lightweight — for badge polling)
chat.get('/notifications/count', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0'
  ).bind(user.id).first<{ cnt: number }>();
  return c.json({ count: result?.cnt || 0 });
});

// List recent notifications
chat.get('/notifications', async (c) => {
  const user = c.get('user')!;
  const limit = parseInt(c.req.query('limit') || '20');
  const result = await c.env.DB.prepare(
    `SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`
  ).bind(user.id, limit).all<any>();
  return c.json({ notifications: result.results || [] });
});

// Mark single notification as read
chat.put('/notifications/:id/read', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  await c.env.DB.prepare(
    'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

// Mark all notifications as read
chat.put('/notifications/read-all', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0'
  ).bind(user.id).run();
  return c.json({ success: true });
});

// Delete ALL notifications for the user (triggered by "Mark all done")
// Must be registered BEFORE /notifications/:id so 'all' isn't captured as an id param
chat.delete('/notifications/all', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE user_id = ?'
  ).bind(user.id).run();
  return c.json({ success: true });
});

// Delete old notifications (cleanup)
chat.delete('/notifications/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

chat.delete('/notifications', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE user_id = ? AND is_read = 1'
  ).bind(user.id).run();
  return c.json({ success: true });
});

export default chat;
