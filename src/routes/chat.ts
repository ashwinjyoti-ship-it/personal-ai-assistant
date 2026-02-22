// Chat routes — thread-aware conversations with LLM integration + provider rotation

import { Hono } from 'hono';
import type { AppEnv, UserRecord, NormalizedMessage, SSEEvent } from '../types';
import { createRotatingProvider } from '../services/llm/provider';
import { runAgent, runAgentStreaming } from '../services/agent';
import { GmailService } from '../services/gmail';

const chat = new Hono<AppEnv>();

// Auth middleware for chat routes
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
    `SELECT t.*,
      (SELECT content FROM conversations
       WHERE thread_id = t.id AND role = 'user'
       ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
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
  const updates = await c.req.json<{ title?: string; is_archived?: boolean }>();

  const sets: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) { sets.push('title = ?'); values.push(updates.title); }
  if (updates.is_archived !== undefined) { sets.push('is_archived = ?'); values.push(updates.is_archived ? 1 : 0); }
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
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    if (!file) return c.json({ error: 'No file provided' }, 400);

    // Size limit: 5MB (D1 has row size limits)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File too large. Maximum size is 5MB.' }, 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const fileId = crypto.randomUUID();

    // Extract text preview for parseable formats
    let textPreview = '';
    const mimeType = file.type || 'application/octet-stream';

    if (mimeType.startsWith('text/') || mimeType === 'application/json' || mimeType === 'application/xml' || mimeType === 'text/csv') {
      const textDecoder = new TextDecoder();
      const fullText = textDecoder.decode(arrayBuffer);
      textPreview = fullText.substring(0, 2000);
    }

    // Store file metadata + data in D1
    await c.env.DB.prepare(
      `INSERT INTO uploaded_files (id, user_id, name, mime_type, size, data_base64, text_preview, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
    ).bind(fileId, user.id, file.name, mimeType, file.size, base64, textPreview).run();

    return c.json({
      file_id: fileId,
      name: file.name,
      type: mimeType,
      size: file.size,
      text_preview: textPreview ? textPreview.substring(0, 500) : '',
    });
  } catch (err: any) {
    return c.json({ error: `Upload failed: ${err.message}` }, 500);
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
    const { provider, rotation, costGuard } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
    
    const response = await runAgent(normalized, c.env.DB, provider, user, rotation, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
      GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
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

    if (msg.includes('limit reached')) {
      return c.json({
        error: msg,
        type: 'cost_limit',
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

    // Create a readable stream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          // Run the streaming agent
          const eventGenerator = runAgentStreaming(normalized, c.env.DB, provider, user, rotation, {
            GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
            GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
            GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
          });

          // Yield events as SSE
          for await (const event of eventGenerator) {
            // Ensure threadId is always included
            if (!event.data.threadId) {
              event.data.threadId = activeThreadId;
            }
            controller.enqueue(encoder.encode(formatSSE(event)));
          }

          // Update thread message count
          if (activeThreadId) {
            await c.env.DB.prepare(
              `UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
            ).bind(activeThreadId).run();
          }

          controller.close();
        } catch (err: any) {
          // Send error event and close
          const errorEvent: SSEEvent = {
            type: 'error',
            data: { error: err.message || 'An error occurred', threadId: activeThreadId },
          };
          controller.enqueue(encoder.encode(formatSSE(errorEvent)));
          controller.close();
        }
      },
    });

    // Return SSE response
    return new Response(stream, {
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

    if (msg.includes('limit reached')) {
      return c.json({
        error: msg,
        type: 'cost_limit',
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
  const today = new Date().toISOString().split('T')[0];

  // Run all queries in parallel
  const [
    threadCountResult,
    activeSchedulesResult,
    memoryCountResult,
    recentThreadsResult,
    providerUsageResult,
    notificationsResult,
    errorCountResult
  ] = await Promise.all([
    // Total threads
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0').bind(user.id).first<{ cnt: number }>(),
    // Active schedules
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(user.id).first<{ cnt: number }>(),
    // Memory count
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(user.id).first<{ cnt: number }>(),
    // Recent threads (last 5)
    c.env.DB.prepare(
      `SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`
    ).bind(user.id).all<any>(),
    // Provider usage today
    c.env.DB.prepare(
      'SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?'
    ).bind(user.id, today).all<any>(),
    // Unread notifications
    c.env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0'
    ).bind(user.id).first<{ cnt: number }>(),
    // Error count
    c.env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0'
    ).bind(user.id).first<{ cnt: number }>(),
  ]);

  return c.json({
    threads: threadCountResult?.cnt || 0,
    active_schedules: activeSchedulesResult?.cnt || 0,
    memories: memoryCountResult?.cnt || 0,
    recent_threads: recentThreadsResult.results || [],
    provider_usage: providerUsageResult.results || [],
    unread_notifications: notificationsResult?.cnt || 0,
    errors: errorCountResult?.cnt || 0,
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
  const user = c.get('user')!;
  const { ProviderRotation } = await import('../services/llm/provider');
  const rotation = new ProviderRotation(c.env.DB, user.id);
  const stats = await rotation.getUsageStats();
  const statusText = await rotation.getStatusText();
  return c.json({ stats, statusText });
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
    `SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
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

// Delete old notifications (cleanup)
chat.delete('/notifications', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'DELETE FROM notifications WHERE user_id = ? AND is_read = 1'
  ).bind(user.id).run();
  return c.json({ success: true });
});

export default chat;
