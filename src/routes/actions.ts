// Approval gates — pending irreversible tool actions
import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, SessionUserRow, Bindings } from '../types';
import { executeToolWithLogging } from '../services/agent';
import { SAFE_SUBSTITUTES, gateConsequence, safePrimaryLabel } from '../services/toolTiers';
import { isNonExecutableToolResult } from '../services/approvalGate';
import { MemoryService } from '../services/memory';

const actions = new Hono<AppEnv>();

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

actions.use('*', requireAuth);

actions.get('/pending', async (c) => {
  const user = c.get('user')!;
  const threadId = c.req.query('thread_id');
  let rows;
  if (threadId) {
    rows = await c.env.DB.prepare(
      `SELECT id, thread_id, message_id, tool_name, args_json, status, channel, consequence, created_at, resolved_at
       FROM pending_actions WHERE user_id = ? AND status = 'pending' AND thread_id = ?
       ORDER BY created_at DESC LIMIT 50`
    ).bind(user.id, parseInt(threadId, 10)).all();
  } else {
    rows = await c.env.DB.prepare(
      `SELECT id, thread_id, message_id, tool_name, args_json, status, channel, consequence, created_at, resolved_at
       FROM pending_actions WHERE user_id = ? AND status = 'pending'
       ORDER BY created_at DESC LIMIT 50`
    ).bind(user.id).all();
  }

  const items = (rows.results || []).map((r: any) => {
    let args = {};
    try { args = JSON.parse(r.args_json || '{}'); } catch { /* */ }
    return {
      id: r.id,
      thread_id: r.thread_id,
      message_id: r.message_id,
      tool_name: r.tool_name,
      args,
      status: r.status,
      channel: r.channel,
      consequence: r.consequence || gateConsequence(r.tool_name),
      safe_primary: safePrimaryLabel(r.tool_name),
      substitute: SAFE_SUBSTITUTES[r.tool_name] || null,
      created_at: r.created_at,
    };
  });

  return c.json({ actions: items });
});

async function loadPending(db: D1Database, userId: number, id: string) {
  return db.prepare(
    `SELECT * FROM pending_actions WHERE id = ? AND user_id = ? AND status = 'pending'`
  ).bind(id, userId).first<any>();
}

/** Shared execute path for Approve / Substitute / chat confirmation. */
export async function runPendingToolExecution(
  env: Bindings,
  user: UserRecord,
  row: { tool_name: string; args_json?: string; channel?: string | null; thread_id?: number | null },
  toolName: string,
): Promise<string> {
  let args: Record<string, unknown> = {};
  try { args = JSON.parse(row.args_json || '{}'); } catch { /* */ }

  return executeToolWithLogging(
    toolName,
    args,
    env.DB,
    user.id,
    {
      agentType: 'approval',
      channel: row.channel || 'web',
      threadId: row.thread_id,
      skipApproval: true,
    },
    user.pin_hash,
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_API_KEY,
    env.GOOGLE_CSE_ID,
    user.timezone,
    undefined,
    env.DOCUMENTS_BUCKET,
    { ai: env.AI, vectorize: env.VECTORIZE, outlookPlaywright: env.OUTLOOK_PLAYWRIGHT, browserRecipe: env.BROWSER_RECIPE },
  );
}

actions.post('/:id/approve', async (c) => {
  const user = c.get('user')!;
  const id = c.req.param('id');
  const row = await loadPending(c.env.DB, user.id, id);
  if (!row) return c.json({ error: 'Pending action not found' }, 404);

  const result = await runPendingToolExecution(c.env, user, row, row.tool_name);

  // Never mark approved if we still got a hold / gate text (poisoned cache or
  // another gate failure) — otherwise the UI clears and the email never sends.
  if (isNonExecutableToolResult(result)) {
    return c.json({
      error: 'Approval did not execute — the action is still blocked. Try Approve again, or reconnect Google and retry.',
      result,
      status: 'pending',
    }, 409);
  }

  await c.env.DB.prepare(
    `UPDATE pending_actions SET status = 'approved', resolved_at = ? WHERE id = ?`
  ).bind(Date.now(), id).run();

  // Persist outcome in the thread so reload shows what actually happened.
  if (row.thread_id) {
    try {
      const memory = new MemoryService(c.env.DB);
      await memory.storeMessage(
        user.id,
        (row.channel || 'web') as any,
        'assistant',
        `Approved **${row.tool_name}**.\n\n${result}`,
        '{}',
        row.thread_id,
      );
    } catch { /* non-critical */ }
  }

  return c.json({ success: true, status: 'approved', result });
});

actions.post('/:id/reject', async (c) => {
  const user = c.get('user')!;
  const id = c.req.param('id');
  const row = await loadPending(c.env.DB, user.id, id);
  if (!row) return c.json({ error: 'Pending action not found' }, 404);

  await c.env.DB.prepare(
    `UPDATE pending_actions SET status = 'rejected', resolved_at = ? WHERE id = ?`
  ).bind(Date.now(), id).run();

  return c.json({ success: true, status: 'rejected' });
});

actions.post('/:id/substitute', async (c) => {
  const user = c.get('user')!;
  const id = c.req.param('id');
  const row = await loadPending(c.env.DB, user.id, id);
  if (!row) return c.json({ error: 'Pending action not found' }, 404);

  const substitute = SAFE_SUBSTITUTES[row.tool_name];
  if (!substitute) {
    return c.json({ error: 'No safe substitute for ' + row.tool_name }, 400);
  }

  const result = await runPendingToolExecution(c.env, user, row, substitute);

  if (isNonExecutableToolResult(result)) {
    return c.json({
      error: 'Substitute did not execute — still blocked by a gate.',
      result,
      status: 'pending',
    }, 409);
  }

  await c.env.DB.prepare(
    `UPDATE pending_actions SET status = 'substituted', resolved_at = ? WHERE id = ?`
  ).bind(Date.now(), id).run();

  if (row.thread_id) {
    try {
      const memory = new MemoryService(c.env.DB);
      await memory.storeMessage(
        user.id,
        (row.channel || 'web') as any,
        'assistant',
        `Saved as **${substitute}** instead of ${row.tool_name}.\n\n${result}`,
        '{}',
        row.thread_id,
      );
    } catch { /* non-critical */ }
  }

  return c.json({ success: true, status: 'substituted', tool: substitute, result });
});

export default actions;
