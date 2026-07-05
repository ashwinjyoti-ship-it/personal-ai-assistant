export type VoiceMode = 'quick' | 'work' | 'commute' | 'operator';

/** Read-only tools. */
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
  'research',
]);

/** Unified Docs / Tandem (UDM) — read tools. */
export const VOICE_UDM_READ_TOOLS = new Set([
  'udm_list_pages',
  'udm_read_page',
  'udm_search',
  'udm_list_comments',
  'udm_read_page_with_comments',
  'udm_list_agent_comments',
  'udm_read_database',
]);

/** Write tools — confirmation required by default on voice. */
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
  'create_schedule',
]);

/** Unified Docs / Tandem (UDM) — write tools. */
export const VOICE_UDM_WRITE_TOOLS = new Set([
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

/** Browser automation tools. */
export const VOICE_OPERATOR_TOOLS = new Set([
  'vault_lookup',
  'browser_task',
  'browser_task_status',
]);

/** @deprecated Legacy quick allowlist — unified voice includes these. */
export const VOICE_QUICK_TOOLS = new Set([
  'create_schedule',
  'list_schedules',
  'search_memory',
]);

export const VOICE_REASONING_BY_MODE: Record<VoiceMode, string> = {
  quick: 'minimal',
  commute: 'low',
  work: 'low',
  operator: 'medium',
};

/**
 * Tools whose output is long-form written work (research reports, essays,
 * emails, documents, spreadsheets) rather than a fact spoken back to the
 * user. Voice hands these off to a chat thread instead of running them
 * inline and speaking the result — see `heavy task handoff` in voice.ts.
 */
export const VOICE_HEAVY_TASK_TOOLS = new Set([
  'research',
  'create_doc',
  'gmail_draft',
  'write_sheet',
  'udm_create_page',
  'udm_write_page',
]);

/** Intersect the heavy-task tool set with whatever this session actually allows. */
export function getHeavyTaskToolNames(allowedToolNames: Iterable<string>): string[] {
  return [...allowedToolNames].filter((name) => VOICE_HEAVY_TASK_TOOLS.has(name));
}

/** Full tool set for the single default voice experience. */
export function getUnifiedVoiceToolNames(): Set<string> {
  return new Set([
    ...VOICE_READ_TOOLS,
    ...VOICE_UDM_READ_TOOLS,
    ...VOICE_WRITE_TOOLS,
    ...VOICE_UDM_WRITE_TOOLS,
    ...VOICE_OPERATOR_TOOLS,
  ]);
}

export function getAllowedToolNames(
  _mode: VoiceMode = 'work',
  _phase: 'read' | 'full' = 'full',
  _desktop = true,
): Set<string> {
  return getUnifiedVoiceToolNames();
}

export function isToolAllowed(
  mode: VoiceMode,
  toolName: string,
  phase: 'read' | 'full' = 'full',
  desktop = true,
): boolean {
  return getAllowedToolNames(mode, phase, desktop).has(toolName);
}

/** Voice always runs with full tool access; user opts in by pressing the mic. */
export function resolveVoicePhase(
  _mode: VoiceMode = 'work',
  _desktop = true,
  requested?: 'read' | 'full',
): 'read' | 'full' {
  if (requested === 'read') return 'read';
  return 'full';
}
