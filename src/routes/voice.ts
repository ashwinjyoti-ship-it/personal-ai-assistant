import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, SessionUserRow, UserRecord } from '../types';
import { executeToolWithLogging } from '../services/agent';
import { MemoryService } from '../services/memory';
import {
  resolveOpenAiVoiceConfig,
  voiceConfigErrorMessage,
} from '../services/voice/resolve-openai-voice';
import type { VoiceMode } from '../services/voice/allowlist';
import { isToolAllowed } from '../services/voice/allowlist';
import {
  endVoiceSession,
  getVoiceSession,
  mintVoiceSession,
} from '../services/voice/realtime-session';

const voice = new Hono<AppEnv>();

async function requireAuth(c: Context<AppEnv>, next: Next) {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`,
  )
    .bind(sessionId)
    .first<SessionUserRow>();

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

voice.use('/*', requireAuth);

function parseMode(raw: unknown): VoiceMode {
  if (raw === 'quick' || raw === 'commute' || raw === 'work') return raw;
  return 'work';
}

async function resolveOrCreateVoiceThread(
  db: D1Database,
  userId: number,
  threadId?: number,
): Promise<number> {
  if (threadId) {
    const existing = await db
      .prepare('SELECT id FROM threads WHERE id = ? AND user_id = ?')
      .bind(threadId, userId)
      .first<{ id: number }>();
    if (existing) return existing.id;
  }

  const res = await db
    .prepare(`INSERT INTO threads (user_id, title, channel) VALUES (?, 'Voice', 'voice')`)
    .bind(userId)
    .run();
  return res.meta?.last_row_id as number;
}

/** Mint ephemeral OpenAI Realtime client secret + Karna voice session. */
voice.post('/session', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{ thread_id?: number; mode?: VoiceMode; phase?: 'read' | 'full' }>().catch(() => ({}));
  const mode = parseMode(body.mode);
  const phase = body.phase === 'full' ? 'full' : 'read';

  const voiceConfig = await resolveOpenAiVoiceConfig(c.env.DB, user.id, user.pin_hash);
  if (!voiceConfig) {
    return c.json({ error: voiceConfigErrorMessage() }, 400);
  }

  const threadId = await resolveOrCreateVoiceThread(c.env.DB, user.id, body.thread_id);

  try {
    const session = await mintVoiceSession(c.env.DB, user, voiceConfig, {
      threadId,
      mode,
      phase,
    });
    return c.json({
      session_id: session.sessionId,
      client_secret: session.clientSecret,
      expires_at: session.expiresAt,
      model: session.model,
      mode: session.mode,
      thread_id: threadId,
      tools: session.tools.map((t) => t.name),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[voice/session]', msg);
    return c.json({ error: msg }, 502);
  }
});

/** Execute a Realtime function call server-side (integrity layer intact). */
voice.post('/tool', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    session_id: string;
    call_id: string;
    name: string;
    arguments: string | Record<string, unknown>;
    transaction_mode?: 'dry_run' | 'confirm_required' | 'execute';
  }>();

  if (!body.session_id || !body.name) {
    return c.json({ error: 'session_id and name are required' }, 400);
  }

  const session = getVoiceSession(body.session_id);
  if (!session || session.userId !== user.id) {
    return c.json({ error: 'Invalid or expired voice session' }, 404);
  }

  if (!session.allowedTools.has(body.name)) {
    return c.json({ error: `Tool not allowed in ${session.mode} mode: ${body.name}` }, 403);
  }

  if (!isToolAllowed(session.mode, body.name, session.phase)) {
    return c.json({ error: `Tool not allowed: ${body.name}` }, 403);
  }

  let args: Record<string, unknown> = {};
  try {
    args =
      typeof body.arguments === 'string'
        ? (JSON.parse(body.arguments || '{}') as Record<string, unknown>)
        : body.arguments || {};
  } catch {
    return c.json({ error: 'Invalid tool arguments JSON' }, 400);
  }

  // Voice channel: default risky writes to confirm unless explicitly execute
  if (body.transaction_mode) {
    args.transaction_mode = body.transaction_mode;
  } else if (session.phase === 'read') {
    args.transaction_mode = 'dry_run';
  }

  const result = await executeToolWithLogging(
    body.name,
    args,
    c.env.DB,
    user.id,
    { channel: 'voice', traceId: body.call_id },
    user.pin_hash,
    c.env.GOOGLE_CLIENT_ID,
    c.env.GOOGLE_CLIENT_SECRET,
    c.env.GOOGLE_API_KEY,
    c.env.GOOGLE_CSE_ID,
    user.timezone,
    undefined,
    c.env.DOCUMENTS_BUCKET,
    { ai: c.env.AI, vectorize: c.env.VECTORIZE },
  );

  const needsConfirmation = result.startsWith('CONFIRMATION REQUIRED:');

  return c.json({
    call_id: body.call_id,
    output: result,
    pending_confirmation: needsConfirmation,
  });
});

/** Persist text transcript for one push-to-talk turn (no audio). */
voice.post('/turn', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    session_id?: string;
    thread_id: number;
    user_text: string;
    assistant_text: string;
    tools_used?: string[];
    attachment?: { filename?: string; url?: string; document_id?: number };
  }>();

  if (!body.thread_id || !body.user_text?.trim()) {
    return c.json({ error: 'thread_id and user_text are required' }, 400);
  }

  const thread = await c.env.DB.prepare('SELECT id FROM threads WHERE id = ? AND user_id = ?')
    .bind(body.thread_id, user.id)
    .first<{ id: number }>();
  if (!thread) return c.json({ error: 'Thread not found' }, 404);

  const memory = new MemoryService(c.env.DB);
  const meta = JSON.stringify({
    voice: true,
    session_id: body.session_id,
    tools_used: body.tools_used || [],
    attachment: body.attachment,
  });

  await memory.storeMessage(user.id, 'voice', 'user', body.user_text.trim(), meta, body.thread_id);
  if (body.assistant_text?.trim()) {
    await memory.storeMessage(user.id, 'voice', 'assistant', body.assistant_text.trim(), meta, body.thread_id);
  }

  await c.env.DB.prepare(
    `UPDATE threads SET message_count = message_count + ?, updated_at = CURRENT_TIMESTAMP, channel = 'voice' WHERE id = ?`,
  )
    .bind(body.assistant_text?.trim() ? 2 : 1, body.thread_id)
    .run();

  return c.json({ ok: true });
});

voice.post('/end', async (c) => {
  const body = await c.req.json<{ session_id: string }>().catch(() => ({ session_id: '' }));
  if (body.session_id) endVoiceSession(body.session_id);
  return c.json({ ok: true });
});

export default voice;
