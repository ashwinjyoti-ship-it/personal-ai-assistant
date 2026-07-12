import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, SessionUserRow, UserRecord } from '../types';
import { executeToolWithLogging, parseReminderFromText, REMINDER_CLAIM_PATTERN } from '../services/agent';
import { logError } from '../services/llm/provider';
import { MemoryService } from '../services/memory';
import { decrypt } from '../services/crypto';
import { stopBrowserTask } from '../services/browser';
import {
  resolveOpenAiVoiceConfig,
  voiceConfigErrorMessage,
} from '../services/voice/resolve-openai-voice';
import type { VoiceMode } from '../services/voice/allowlist';
import {
  getHeavyTaskToolNames,
  resolveVoicePhase,
} from '../services/voice/allowlist';
import { voiceDefaultTransactionMode } from '../services/voice/policy';
import {
  endVoiceSession,
  getVoiceSession,
  getVoiceBrowserTask,
  mintVoiceSession,
  setVoiceBrowserTask,
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

function parseMode(_raw: unknown, _desktop: boolean): VoiceMode {
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

async function resolveBrowserUseApiKey(
  db: D1Database,
  userId: number,
  pinHash: string,
): Promise<string | null> {
  const cred = await db
    .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
    .bind(userId, 'browser_use_api_key')
    .first<{ encrypted_value: string }>();
  if (!cred) return null;
  try {
    return (await decrypt(cred.encrypted_value, pinHash)).trim();
  } catch {
    return null;
  }
}

/** Mint ephemeral OpenAI Realtime client secret + Karna voice session. */
voice.post('/session', async (c) => {
  const user = c.get('user')!;
  const body = await c.req
    .json<{
      thread_id?: number;
      mode?: VoiceMode;
      phase?: 'read' | 'full';
      platform?: 'mobile' | 'desktop';
    }>()
    .catch(() => ({}));

  const desktop = body.platform === 'desktop';
  const mode = parseMode(body.mode, desktop);
  const phase = resolveVoicePhase(mode, desktop, body.phase);

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
      desktop,
    });
    const toolNames = session.tools.map((t) => t.name);
    return c.json({
      session_id: session.sessionId,
      client_secret: session.clientSecret,
      expires_at: session.expiresAt,
      model: session.model,
      mode: session.mode,
      phase,
      thread_id: threadId,
      tools: toolNames,
      heavy_tools: getHeavyTaskToolNames(toolNames),
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

  let args: Record<string, unknown> = {};
  try {
    args =
      typeof body.arguments === 'string'
        ? (JSON.parse(body.arguments || '{}') as Record<string, unknown>)
        : body.arguments || {};
  } catch {
    return c.json({ error: 'Invalid tool arguments JSON' }, 400);
  }

  const txMode = voiceDefaultTransactionMode(
    body.name,
    session.phase,
    session.mode,
    body.transaction_mode ?? (args.transaction_mode as string | undefined),
  );
  if (txMode) args.transaction_mode = txMode;

  if (body.name === 'browser_task') {
    setVoiceBrowserTask(body.session_id, 'pending');
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
    { ai: c.env.AI, vectorize: c.env.VECTORIZE, outlookPlaywright: c.env.OUTLOOK_PLAYWRIGHT },
  );

  if (body.name === 'browser_task') {
    const taskIdMatch = result.match(/task[_\s]?id[:\s]+([a-f0-9-]{36})/i);
    if (taskIdMatch) setVoiceBrowserTask(body.session_id, taskIdMatch[1]);
    else setVoiceBrowserTask(body.session_id, null);
  }

  const needsConfirmation = result.startsWith('CONFIRMATION REQUIRED:');

  return c.json({
    call_id: body.call_id,
    output: result,
    pending_confirmation: needsConfirmation,
    browser_active: body.name === 'browser_task' || body.name === 'browser_task_status',
  });
});

/** Abort in-flight browser automation for a voice session. */
voice.post('/abort-browser', async (c) => {
  const user = c.get('user')!;
  const body = await c.req
    .json<{ session_id?: string; task_id?: string }>()
    .catch(() => ({}));

  const apiKey = await resolveBrowserUseApiKey(c.env.DB, user.id, user.pin_hash);
  if (!apiKey) {
    return c.json({ error: 'Browser Use API key not configured' }, 400);
  }

  let taskId = body.task_id?.trim() || null;
  if (!taskId && body.session_id) {
    taskId = getVoiceBrowserTask(body.session_id);
  }
  if (!taskId) {
    const pending = await c.env.DB.prepare(
      `SELECT task_id FROM pending_browser_tasks
       WHERE user_id = ? AND channel = 'voice' AND notified = 0
       ORDER BY created_at DESC LIMIT 1`,
    )
      .bind(user.id)
      .first<{ task_id: string }>();
    taskId = pending?.task_id ?? null;
  }

  if (!taskId || taskId === 'pending') {
    return c.json({ error: 'No active browser task to abort' }, 404);
  }

  const stopped = await stopBrowserTask(taskId, apiKey);
  if (body.session_id) setVoiceBrowserTask(body.session_id, null);

  await c.env.DB.prepare(
    `UPDATE pending_browser_tasks SET notified = 1 WHERE user_id = ? AND task_id = ?`,
  )
    .bind(user.id, taskId)
    .run()
    .catch(() => {});

  return c.json({
    ok: stopped,
    task_id: taskId,
    message: stopped ? 'Browser automation aborted.' : 'Abort requested but Browser Use did not confirm stop.',
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

  // Voice has no retry loop like text/telegram — by the time this transcript lands,
  // the model has already spoken its response, so we can't re-prompt it to call the
  // tool. If it claimed a reminder was set but never called create_schedule/update_schedule,
  // recover deterministically from the user's own words so the reminder still exists
  // and shows up in the schedule section, instead of silently vanishing.
  let recoveredReminder = false;
  const toolsUsed = body.tools_used || [];
  if (
    body.assistant_text?.trim() &&
    REMINDER_CLAIM_PATTERN.test(body.assistant_text) &&
    !toolsUsed.includes('create_schedule') &&
    !toolsUsed.includes('update_schedule')
  ) {
    const parsed = parseReminderFromText(body.user_text);
    if (parsed) {
      try {
        await executeToolWithLogging(
          'create_schedule',
          parsed.args,
          c.env.DB,
          user.id,
          { channel: 'voice', traceId: body.session_id, isEnforcementRetry: true },
          user.pin_hash,
          undefined, undefined, undefined, undefined,
          user.timezone,
        );
        recoveredReminder = true;
      } catch {
        // Best-effort — still logged below so the miss is visible even if recovery fails.
      }
    }
    await logError(c.env.DB, user.id, 'llm', 'schedule_hallucination',
      'Voice claimed a reminder was set without calling create_schedule', {
        assistant_text: body.assistant_text.slice(0, 200),
        recovered: recoveredReminder,
      });
  }

  return c.json({ ok: true, recovered_reminder: recoveredReminder });
});

voice.post('/end', async (c) => {
  const body = await c.req.json<{ session_id: string }>().catch(() => ({ session_id: '' }));
  if (body.session_id) endVoiceSession(body.session_id);
  return c.json({ ok: true });
});

export default voice;
