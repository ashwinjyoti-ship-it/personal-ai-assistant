/**
 * Approval-gate helpers for irreversible tools (gmail_send, etc.).
 *
 * Holds are logged as success=0 (see executeToolWithLogging). Older builds
 * incorrectly logged them as success=1, which poisoned the idempotency cache:
 * Approve / retries replayed "HELD FOR APPROVAL…" instead of executing.
 *
 * Soft failures (Google disconnected, Gmail API errors) must also stay out of
 * the success cache and must NOT clear pending_actions — otherwise Approve
 * looks resolved while nothing was sent, and the next ask hits the gate again.
 */

/** Results that must never satisfy the side-effect idempotency cache. */
export function isNonExecutableToolResult(result: string | null | undefined): boolean {
  const text = String(result || '').trim();
  if (!text) return false;
  return /^(HELD FOR APPROVAL|POLICY BLOCKED|DRY RUN:|CONFIRMATION REQUIRED:)/i.test(text);
}

/** Soft failures / non-completions that look like normal tool strings but are not side effects. */
export function isFailedSideEffectResult(result: string | null | undefined): boolean {
  const text = String(result || '').trim();
  if (!text) return true;
  if (isNonExecutableToolResult(text)) return true;
  if (/^Google account not connected/i.test(text)) return true;
  if (/^Authentication context unavailable/i.test(text)) return true;
  if (/^(Gmail send error|Gmail draft error|Gmail .* error)\b/i.test(text)) return true;
  if (/^Validation failed:/i.test(text)) return true;
  if (/^Tool timed out/i.test(text)) return true;
  if (/^\[Tool Error/i.test(text)) return true;
  // Generic "… error:" prefixes used across Google write tools
  if (/^[A-Za-z0-9 _-]{0,40}error:/i.test(text) && !/\bsuccessfully\b/i.test(text)) return true;
  return false;
}

/**
 * True only when the tool result indicates the irreversible side effect completed.
 * Used by Approve / chat confirmation so a soft-fail cannot clear the gate.
 */
export function isSuccessfulSideEffectResult(
  toolName: string,
  result: string | null | undefined,
): boolean {
  const text = String(result || '').trim();
  if (!text || isFailedSideEffectResult(text)) return false;

  switch (toolName) {
    case 'gmail_send':
      return /^Email sent successfully\b/i.test(text);
    case 'gmail_draft':
      return /^Draft created\b/i.test(text);
    case 'create_calendar_event':
    case 'create_event':
      return /calendar event (created|added)|event created/i.test(text);
    case 'write_sheet':
    case 'append_sheet':
      return /\b(updated|appended|wrote|written)\b/i.test(text);
    case 'create_sheet':
    case 'create_doc':
    case 'create_file':
    case 'drive_create':
      return /\b(created|ready)\b/i.test(text);
    case 'append_to_doc':
    case 'docs_append':
      return /\bappended\b/i.test(text);
    case 'delete_schedule':
    case 'schedule_delete':
    case 'delete_memory':
    case 'memory_delete':
    case 'drive_delete_file':
    case 'delete_sheet_row':
    case 'udm_delete_page':
    case 'udm_delete_row':
      return /\b(deleted|removed|trashed)\b/i.test(text);
    default:
      // Fail closed for unknown irreversible tools — require an explicit success word.
      return /\b(success|successfully|completed|done|created|updated|deleted|sent)\b/i.test(text);
  }
}

/** Short chat replies that mean "approve the pending gate", not a new ask. */
export function looksLikeApprovalConfirmation(text: string): boolean {
  const t = text.trim();
  if (!t || t.length > 120) return false;
  return /^(yes|yep|yeah|yup|ok|okay|sure|approve|approved|confirm|confirmed|go ahead|send it|send now|do it|please send|send the email|send it now|please send it|go ahead and send( it)?)([\s!.]*)$/i.test(t);
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

/** Find an existing pending gate for the same user/tool/args (dedupe re-holds). */
export async function findExistingPendingAction(
  db: D1Database,
  userId: number,
  toolName: string,
  argsJson: string,
): Promise<{ id: string } | null> {
  return db.prepare(
    `SELECT id FROM pending_actions
     WHERE user_id = ? AND tool_name = ? AND args_json = ? AND status = 'pending'
     ORDER BY created_at DESC
     LIMIT 1`,
  ).bind(userId, toolName, argsJson).first<{ id: string }>();
}
