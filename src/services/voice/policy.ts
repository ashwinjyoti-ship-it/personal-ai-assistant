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
