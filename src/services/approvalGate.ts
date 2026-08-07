/**
 * Approval-gate helpers for irreversible tools (gmail_send, etc.).
 *
 * Holds are logged as success=0 (see executeToolWithLogging). Older builds
 * incorrectly logged them as success=1, which poisoned the idempotency cache:
 * Approve / retries replayed "HELD FOR APPROVAL…" instead of executing.
 */

/** Results that must never satisfy the side-effect idempotency cache. */
export function isNonExecutableToolResult(result: string | null | undefined): boolean {
  const text = String(result || '').trim();
  if (!text) return false;
  return /^(HELD FOR APPROVAL|POLICY BLOCKED|DRY RUN:|CONFIRMATION REQUIRED:)/i.test(text);
}

/** Short chat replies that mean "approve the pending gate", not a new ask. */
export function looksLikeApprovalConfirmation(text: string): boolean {
  const t = text.trim();
  if (!t || t.length > 120) return false;
  return /^(yes|yep|yeah|yup|ok|okay|sure|approve|approved|confirm|confirmed|go ahead|send it|send now|do it|please send|send the email)([\s!.]*)$/i.test(t);
}

export type PendingActionRow = {
  id: string;
  user_id: number;
  thread_id: number | null;
  tool_name: string;
  args_json: string;
  channel: string | null;
  status: string;
};

export async function loadLatestPendingForThread(
  db: D1Database,
  userId: number,
  threadId: number,
): Promise<PendingActionRow | null> {
  return db.prepare(
    `SELECT id, user_id, thread_id, tool_name, args_json, channel, status
     FROM pending_actions
     WHERE user_id = ? AND thread_id = ? AND status = 'pending'
     ORDER BY created_at DESC
     LIMIT 1`,
  ).bind(userId, threadId).first<PendingActionRow>();
}
