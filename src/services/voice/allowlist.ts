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

/** Unified Docs / Tandem (UDM) — read tools for Work mode. */
export const VOICE_UDM_READ_TOOLS = new Set([
  'udm_list_pages',
  'udm_read_page',
  'udm_search',
  'udm_list_comments',
  'udm_read_page_with_comments',
  'udm_list_agent_comments',
  'udm_read_database',
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

/** Unified Docs / Tandem (UDM) — write tools for Work mode (desktop, confirmed). */
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

function workToolSet(phase: 'read' | 'full'): Set<string> {
  const base = new Set([...VOICE_READ_TOOLS, ...VOICE_UDM_READ_TOOLS]);
  if (phase === 'read') return base;
  return new Set([...base, ...VOICE_WRITE_TOOLS, ...VOICE_UDM_WRITE_TOOLS]);
}

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
  // work — includes Unified Docs / Tandem (UDM)
  return workToolSet(phase);
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
