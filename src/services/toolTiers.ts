/**
 * Tool blast-radius classification for approval gates.
 *
 * APPROVAL_GATES_ENABLED is currently false: irreversible tools (gmail_send,
 * sheet writes, deletes, …) execute immediately again. Flip to true to restore
 * Approve / Send-now / Save-as-draft gate cards. The gate code paths remain
 * in place so re-enabling does not require a rewrite.
 */

/** Kill switch for Phase-3 Approve/Send-now gates. */
export const APPROVAL_GATES_ENABLED = false;

export const IRREVERSIBLE_TOOLS = new Set([
  'gmail_send',
  'write_sheet',
  'append_sheet',
  'create_sheet',
  'create_calendar_event',
  'create_event',
  'drive_create',
  'create_file',
  'create_doc',
  'append_to_doc',
  'docs_append',
  'delete_schedule',
  'schedule_delete',
  'delete_memory',
  'memory_delete',
  'drive_delete_file',
  'delete_sheet_row',
  'delete_doc_content',
  'delete_note',
  'udm_delete_page',
  'udm_delete_row',
]);

/** Safe substitute tool when the user picks the primary (safe) action. */
export const SAFE_SUBSTITUTES: Record<string, string> = {
  gmail_send: 'gmail_draft',
};

export function isIrreversibleTool(toolName: string): boolean {
  // Gates off → treat nothing as irreversible so executeToolWithLogging runs.
  if (!APPROVAL_GATES_ENABLED) return false;
  if (!toolName) return true;
  if (IRREVERSIBLE_TOOLS.has(toolName)) return true;
  // Fail closed for unknown mutating-looking names
  if (/^(delete_|remove_|destroy_)/i.test(toolName)) return true;
  // Known reversible reads/search stay open
  return false;
}

export function gateConsequence(toolName: string): string {
  switch (toolName) {
    case 'gmail_send':
      return "This leaves your machine and can't be recalled. Saving as a draft keeps it in Gmail for you to send yourself.";
    case 'write_sheet':
    case 'append_sheet':
      return 'This writes to your spreadsheet and overwrites or appends cells. It cannot be undone automatically.';
    case 'create_sheet':
    case 'create_doc':
    case 'create_file':
    case 'drive_create':
      return 'This creates a new file in your Google account.';
    case 'create_calendar_event':
    case 'create_event':
      return 'This creates a calendar event that others may see.';
    case 'delete_schedule':
    case 'schedule_delete':
      return 'This permanently removes a scheduled job.';
    case 'delete_memory':
    case 'memory_delete':
      return 'This permanently deletes a memory fact.';
    default:
      return 'This action cannot be undone automatically and needs your approval.';
  }
}

export function safePrimaryLabel(toolName: string): string | null {
  if (toolName === 'gmail_send') return 'Save as draft';
  return null;
}
