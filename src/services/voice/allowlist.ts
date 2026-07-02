export type VoiceMode = 'quick' | 'work' | 'commute' | 'operator';

/** Read-only tools for work and commute modes. */
export const VOICE_READ_TOOLS = new Set([
  'list_schedules',
  'search_memory',
  'list_calendar_events',
  'gmail_list',
  'gmail_search',
  'gmail_read',
  'gmail_unread_count',
  'read_sheet',
  'drive_list',
  'drive_search',
  'drive_read_file',
  'read_doc',
  'web_search',
  'read_url',
]);

/** Quick mode: reminders + memory only. */
export const VOICE_QUICK_TOOLS = new Set([
  'create_schedule',
  'list_schedules',
  'search_memory',
]);

/** Write tools (Phase 2 — confirmation required by default). */
export const VOICE_WRITE_TOOLS = new Set([
  'write_sheet',
  'append_sheet',
  'gmail_send',
  'gmail_draft',
  'create_calendar_event',
  'create_doc',
  'update_schedule',
  'delete_schedule',
  'store_memory',
  'update_memory',
  'delete_memory',
]);

/** Desktop operator mode: browser automation. */
export const VOICE_OPERATOR_TOOLS = new Set([
  'vault_lookup',
  'browser_task',
  'browser_task_status',
]);

export const VOICE_REASONING_BY_MODE: Record<VoiceMode, string> = {
  quick: 'minimal',
  commute: 'low',
  work: 'low',
  operator: 'medium',
};

export function getAllowedToolNames(
  mode: VoiceMode,
  phase: 'read' | 'full' = 'read',
  desktop = false,
): Set<string> {
  if (mode === 'quick') return new Set(VOICE_QUICK_TOOLS);
  if (mode === 'commute') return new Set(VOICE_READ_TOOLS);
  if (mode === 'operator') {
    if (!desktop) return new Set(VOICE_READ_TOOLS);
    const base = new Set([...VOICE_READ_TOOLS, ...VOICE_OPERATOR_TOOLS]);
    if (phase === 'full') {
      for (const t of VOICE_WRITE_TOOLS) base.add(t);
    }
    return base;
  }
  // work
  if (phase === 'read') return new Set(VOICE_READ_TOOLS);
  return new Set([...VOICE_READ_TOOLS, ...VOICE_WRITE_TOOLS]);
}

export function isToolAllowed(
  mode: VoiceMode,
  toolName: string,
  phase: 'read' | 'full' = 'read',
  desktop = false,
): boolean {
  return getAllowedToolNames(mode, phase, desktop).has(toolName);
}

export function resolveVoicePhase(
  mode: VoiceMode,
  desktop: boolean,
  requested?: 'read' | 'full',
): 'read' | 'full' {
  if (requested === 'read') return 'read';
  if (mode === 'quick' || mode === 'commute') return 'read';
  if (!desktop) return 'read';
  if (mode === 'operator' || mode === 'work') return 'full';
  return requested === 'full' ? 'full' : 'read';
}
