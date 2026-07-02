export type VoiceMode = 'quick' | 'work' | 'commute';

/** Read-only tools for work and commute modes (Phase 1). */
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

/** Write tools enabled in work mode Phase B (with confirmation). */
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
  'browser_task',
]);

export const VOICE_REASONING_BY_MODE: Record<VoiceMode, string> = {
  quick: 'minimal',
  commute: 'low',
  work: 'low',
};

export function getAllowedToolNames(mode: VoiceMode, phase: 'read' | 'full' = 'read'): Set<string> {
  if (mode === 'quick') return new Set(VOICE_QUICK_TOOLS);
  if (mode === 'commute') return new Set(VOICE_READ_TOOLS);
  // work
  if (phase === 'read') return new Set(VOICE_READ_TOOLS);
  return new Set([...VOICE_READ_TOOLS, ...VOICE_WRITE_TOOLS]);
}

export function isToolAllowed(mode: VoiceMode, toolName: string, phase: 'read' | 'full' = 'read'): boolean {
  return getAllowedToolNames(mode, phase).has(toolName);
}
