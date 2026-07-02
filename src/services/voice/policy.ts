/** Risky write tools — mirror agent.ts RISKY_WRITE_TOOLS for voice policy. */
export const VOICE_RISKY_WRITE_TOOLS = new Set([
  'write_sheet',
  'append_sheet',
  'gmail_send',
  'create_calendar_event',
  'update_schedule',
  'delete_schedule',
  'delete_memory',
  'browser_task',
  'udm_create_page',
  'udm_write_page',
  'udm_delete_page',
  'udm_add_comment',
  'udm_apply_comment',
  'udm_create_database',
  'udm_add_row',
  'udm_update_row',
  'udm_delete_row',
  'udm_add_property',
  'udm_edit_section',
  'udm_resolve_comment',
]);

export function voiceDefaultTransactionMode(
  toolName: string,
  phase: 'read' | 'full',
  mode: string,
  explicit?: string,
): 'dry_run' | 'confirm_required' | 'execute' | undefined {
  if (explicit === 'dry_run' || explicit === 'confirm_required' || explicit === 'execute') {
    return explicit;
  }
  if (phase === 'read' || mode === 'commute') return 'dry_run';
  if (VOICE_RISKY_WRITE_TOOLS.has(toolName)) return 'confirm_required';
  if (phase === 'full' && mode !== 'commute') return 'execute';
  return undefined;
}
