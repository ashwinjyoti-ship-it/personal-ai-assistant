// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord, SSEEvent, ContextWindow, ConversationRecord, OutlookPlaywrightFn } from '../types';
import { MemoryService, buildNotesContext } from './memory';
import { ProviderRotation, logError } from './llm/provider';
import { GoogleServices } from './google';
import { searchYouTube, webSearch } from './google-apis';
import { GmailService, formatPurchaseGmailSearchResponse } from './gmail';
import { conductResearch } from './research';
import { runBrowserTask, getBrowserTaskStatus, buildBlueDartTrackingTask, createBrowserSession, closeBrowserSession } from './browser';
import { decrypt, encrypt } from './crypto';
import { extractDocxTextFromBuffer as extractDocxText } from './docx';
import { classifyIntentFast, buildSubAgentPrompt, detectDeterministicOp, detectTierTwoOp, buildPurchaseGmailQuery } from './router';
import { recordAndEvaluatePattern, getAutoSkillsContext } from './skills';
import { logInfo } from '../utils/logger';
import { VOICE_HEAVY_TASK_TOOLS } from './voice/allowlist';
import {
  udmListPages, udmCreatePage, udmReadPage, udmWritePage, udmSearchPages,
  udmDeletePage, udmListComments, udmAddComment, udmReadPageWithComments,
  udmCreateDatabase, udmReadDatabase, udmAddRow, udmUpdateRow, udmDeleteRow, udmAddProperty,
  udmEditSection, udmResolveComment, udmListAgentComments, udmApplyComment,
  UDMNotConfiguredError,
} from './udm';

// Token budget constants for system prompt
const PERSONALITY_TOKEN_BUDGET = 2000;  // ~2K tokens
const WORKING_MEMORY_TOKEN_BUDGET = 2000; // ~2K tokens
const TOOL_DESCRIPTIONS_TOKEN_BUDGET = 1000; // ~1K tokens
const APPROX_CHARS_PER_TOKEN = 4;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

function truncateToTokenBudget(text: string, budget: number): string {
  const maxChars = budget * APPROX_CHARS_PER_TOKEN;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '\n[...truncated to fit token budget]';
}

const RESEARCH_REPORT_PERSIST_CHARS = 6000;

export const RESEARCH_FOLLOWUP_HINT =
  'The user is following up on prior research in this thread. Answer from the injected research context first. If the follow-up requires new or updated information, call the research tool again with a query that includes the original topic.';

export interface AssistantTurnMetadata {
  tools?: string[];
  research_query?: string;
  research_report?: string;
}

export function parseConversationMetadata(metadata: string): AssistantTurnMetadata {
  try {
    const parsed = JSON.parse(metadata || '{}');
    return typeof parsed === 'object' && parsed !== null ? parsed as AssistantTurnMetadata : {};
  } catch {
    return {};
  }
}

export function buildAssistantMetadata(
  toolsCalledList: string[],
  researchCapture?: { query: string; report: string }
): string {
  const uniqueTools = [...new Set(toolsCalledList)];
  const meta: AssistantTurnMetadata = {};
  if (uniqueTools.length > 0) meta.tools = uniqueTools;
  if (researchCapture) {
    meta.research_query = researchCapture.query.substring(0, 200);
    meta.research_report = researchCapture.report.substring(0, RESEARCH_REPORT_PERSIST_CHARS);
  }
  return JSON.stringify(meta);
}

/** Re-inject persisted research reports so follow-up turns see prior tool output. */
export function expandThreadContext(recentMessages: ConversationRecord[]): LLMMessage[] {
  const expanded: LLMMessage[] = [];
  for (const m of recentMessages) {
    if (m.role !== 'user' && m.role !== 'assistant') continue;
    if (m.role === 'assistant') {
      const meta = parseConversationMetadata(m.metadata);
      if (meta.research_report) {
        expanded.push({
          role: 'user',
          content: `[Tool Result for research]: ${meta.research_report}`,
        });
      }
    }
    expanded.push({ role: m.role, content: m.content });
  }
  return expanded;
}

/** Build conversation text for intent routing, including research metadata hints. */
export function buildRoutingContext(recentMessages: ConversationRecord[]): string {
  return recentMessages.slice(-6).map(m => {
    if (m.role === 'assistant') {
      const meta = parseConversationMetadata(m.metadata);
      if (meta.tools?.includes('research')) {
        return `[TOOLS_USED: research] ${m.content}`;
      }
    }
    return m.content;
  }).join('\n');
}

export function threadHadRecentResearch(recentMessages: ConversationRecord[]): boolean {
  for (let i = recentMessages.length - 1; i >= 0; i--) {
    const m = recentMessages[i];
    if (m.role === 'assistant') {
      const meta = parseConversationMetadata(m.metadata);
      return meta.tools?.includes('research') ?? false;
    }
  }
  return false;
}

function captureResearchFromResult(
  toolName: string,
  args: Record<string, unknown>,
  result: string,
  current?: { query: string; report: string }
): { query: string; report: string } | undefined {
  if (toolName !== 'research') return current;
  if (/^(Research failed|Research error|Research timed out|\[Tool Error)/i.test(result)) return current;
  return {
    query: String(args.query || ''),
    report: result.substring(0, RESEARCH_REPORT_PERSIST_CHARS),
  };
}

function applyResearchFollowUpHint(messages: LLMMessage[], hadRecentResearch: boolean): void {
  if (!hadRecentResearch) return;
  const last = messages[messages.length - 1];
  if (last?.role !== 'user' || typeof last.content !== 'string') return;
  if (last.content.startsWith(RESEARCH_FOLLOWUP_HINT)) return;
  messages[messages.length - 1] = {
    role: 'user',
    content: `${RESEARCH_FOLLOWUP_HINT}\n\n${last.content}`,
  };
}

/// Sanitize conversation history: merge consecutive same-role messages, and clean up
// bad assistant content (empty strings, bare TOOLS_USED tags) that can cause cascading
// empty responses when loaded back as context.
// Also eliminates (user, dead-marker-assistant) pairs so the LLM never tries to resume
// an abandoned request from a previous crashed/timed-out run.
function sanitizeMessageHistory(messages: LLMMessage[]): LLMMessage[] {
  // Dead-marker strings inserted by cleanOrphanedUserMessage and neutraliseNarrationFinal
  const DEAD_MARKERS = new Set([
    '(Previous response was not recorded.)',
    '(Previous request did not complete. Please try again.)',
    '(My previous response was cut off before completing. Starting fresh.)',
  ]);

  // First pass: eliminate (user, dead-assistant) pairs.
  // When Karna crashes mid-request, the orphaned user message stays in history.
  // The dead-marker assistant message signals that no real response was given.
  // Removing both prevents the LLM from trying to answer the old abandoned request.
  const deduped: LLMMessage[] = [];
  for (const msg of messages) {
    const contentStr = typeof msg.content === 'string' ? msg.content : '';
    const isDeadMarker = msg.role === 'assistant' && DEAD_MARKERS.has(contentStr.trim());
    if (isDeadMarker && deduped.length > 0 && deduped[deduped.length - 1].role === 'user') {
      deduped.pop(); // drop the preceding dead user request
      continue;      // also skip the dead-marker assistant — both eliminated
    }
    deduped.push(msg);
  }

  // Second pass: clean assistant content and merge consecutive same-role messages
  const result: LLMMessage[] = [];
  for (const msg of deduped) {
    let content = msg.content;
    // Clean assistant messages loaded from history
    if (msg.role === 'assistant' && typeof content === 'string') {
      // Strip any LLM-generated [TOOLS_USED:] prefix stored verbatim in DB
      content = (content as string).replace(/^\[TOOLS_USED: [^\]]*\]\s*/i, '').trim();
      // Replace empty content — blank assistant messages confuse LLMs into returning empty
      if (!content) content = '(Previous response was not recorded.)';
    }
    const sanitizedMsg = content !== msg.content ? { ...msg, content } : msg;
    if (result.length > 0 && result[result.length - 1].role === sanitizedMsg.role && sanitizedMsg.role !== 'system') {
      // Merge with previous same-role message
      result[result.length - 1] = {
        ...result[result.length - 1],
        content: (result[result.length - 1].content as string) + '\n\n' + sanitizedMsg.content,
      };
    } else {
      result.push(sanitizedMsg);
    }
  }
  return result;
}

// Tools available to the LLM
const TOOLS: LLMTool[] = [
  {
    name: 'create_schedule',
    description: 'Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Short name for the scheduled task' },
        description: { type: 'string', description: 'What this task does' },
        schedule_type: { type: 'string', enum: ['interval', 'daily', 'weekly', 'once'], description: 'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily). IMPORTANT: NEVER use interval/daily/weekly for tasks that send emails to external recipients — use once instead. Recurring email-sending tasks spam the recipient on every cron tick.' },
        schedule_value: { type: 'string', description: 'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM' },
        minutes_from_now: { type: 'number', description: 'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.' },
        action_type: { type: 'string', enum: ['reminder', 'check_mail', 'check_calendar', 'check_sheet', 'custom'], description: 'What action to perform' },
        action_description: { type: 'string', description: 'Detailed description of what the action should do' },
      },
      required: ['name', 'schedule_type', 'action_type'],
    },
  },
  {
    name: 'list_schedules',
    description: 'List all scheduled tasks for the current user. Shows active and paused tasks with their state.',
    parameters: {
      type: 'object',
      properties: {
        include_disabled: { type: 'boolean', description: 'Whether to include disabled schedules. Default: true' },
      },
    },
  },
  {
    name: 'toggle_schedule',
    description: 'Enable or disable a scheduled task by its ID or name.',
    parameters: {
      type: 'object',
      properties: {
        job_id: { type: 'number', description: 'The ID of the job to toggle' },
        enabled: { type: 'boolean', description: 'true to enable, false to disable' },
      },
      required: ['job_id', 'enabled'],
    },
  },
  {
    name: 'update_schedule_state',
    description: 'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',
    parameters: {
      type: 'object',
      properties: {
        job_id: { type: 'number', description: 'The ID of the job' },
        state: { type: 'string', enum: ['created', 'active', 'reminding', 'paused', 'completed'], description: 'New state for the job' },
      },
      required: ['job_id', 'state'],
    },
  },
  {
    name: 'update_schedule',
    description: 'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',
    parameters: {
      type: 'object',
      properties: {
        job_id: { type: 'number', description: 'The ID of the job to update (get it from list_schedules first if unknown)' },
        name: { type: 'string', description: 'New name for the task (optional)' },
        description: { type: 'string', description: 'New description (optional)' },
        schedule_type: { type: 'string', enum: ['interval', 'daily', 'weekly', 'once'], description: 'New schedule type (required if changing the time)' },
        schedule_value: { type: 'string', description: 'New schedule value matching the schedule_type format (required if changing the time)' },
        minutes_from_now: { type: 'number', description: 'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.' },
      },
      required: ['job_id'],
    },
  },
  {
    name: 'delete_schedule',
    description: 'Permanently delete a scheduled task.',
    parameters: {
      type: 'object',
      properties: {
        job_id: { type: 'number', description: 'The ID of the job to delete' },
      },
      required: ['job_id'],
    },
  },
  {
    name: 'store_memory',
    description: 'Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type=\'context\'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['preference', 'context', 'fact'], description: '"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.' },
        title: { type: 'string', description: 'Short descriptive title' },
        content: { type: 'string', description: 'The permanent rule or reference to remember.' },
        importance: { type: 'number', description: 'Importance 1-10, default 5. Use 8+ for standing rules that must always be followed.' },
      },
      required: ['type', 'title', 'content'],
    },
  },
  {
    name: 'search_memory',
    description: 'Search your long-term memory for previously stored information about the user.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query to find relevant memories' },
      },
      required: ['query'],
    },
  },
  {
    name: 'delete_memory',
    description: 'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the memory entry to delete' },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_memory',
    description: 'Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the memory entry to update' },
        content: { type: 'string', description: 'The new content to replace the existing entry' },
      },
      required: ['id', 'content'],
    },
  },
  {
    name: 'get_system_status',
    description: 'Get current system status including active schedules, memory stats, provider usage, and health.',
    parameters: {
      type: 'object',
      properties: {
        verbose: { type: 'boolean', description: 'Whether to include detailed provider stats. Default: false' },
      },
    },
  },
  {
    name: 'get_capabilities_summary',
    description: 'Answer "what can you do", "what are you capable of", "what can you help me with", or any question about Karna\'s own capabilities. Returns a grounded summary of what\'s actually connected and in use for this specific user (Workspace connection status, learned skills, active schedules, document count) — never answer this kind of question from general knowledge, always call this tool so the answer reflects real state instead of a generic description.',
    parameters: { type: 'object', properties: {} },
  },
  // === Google Workspace Tools (Phase 2) ===
  {
    name: 'read_sheet',
    description: 'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',
    parameters: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)' },
        range: { type: 'string', description: 'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.' },
      },
      required: ['spreadsheet_id', 'range'],
    },
  },
  {
    name: 'write_sheet',
    description: 'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,\"Groceries\",C:C)").',
    parameters: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'The spreadsheet ID' },
        range: { type: 'string', description: 'Cell range in A1 notation (e.g., "Sheet1!A1:C3")' },
        values: { type: 'array', description: 'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]', items: { type: 'array', items: { type: 'string' } } },
      },
      required: ['spreadsheet_id', 'range', 'values'],
    },
  },
  {
    name: 'append_sheet',
    description: 'Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).',
    parameters: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'The spreadsheet ID' },
        range: { type: 'string', description: 'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")' },
        values: { type: 'array', description: 'Array of row arrays to append', items: { type: 'array', items: { type: 'string' } } },
      },
      required: ['spreadsheet_id', 'range', 'values'],
    },
  },
  {
    name: 'create_sheet',
    description: 'Create a new Google Spreadsheet in the user\'s Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Name of the new spreadsheet' },
        sheet_names: { type: 'array', description: 'Tab names (e.g., ["Data", "Summary", "Errors"])', items: { type: 'string' } },
        folder_name: { type: 'string', description: 'Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn\'t exist.' },
      },
      required: ['title'],
    },
  },
  {
    name: 'delete_sheet_row',
    description: 'Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).',
    parameters: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'The spreadsheet ID' },
        sheet_name: { type: 'string', description: 'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")' },
        row_number: { type: 'number', description: 'Row number to delete (1-based, as shown in the sheet). Minimum 2.' },
      },
      required: ['spreadsheet_id', 'sheet_name', 'row_number'],
    },
  },
  {
    name: 'list_calendar_events',
    description: 'List upcoming events from Google Calendar. Shows event title, time, location, and attendees.',
    parameters: {
      type: 'object',
      properties: {
        calendar_id: { type: 'string', description: 'Calendar ID (default: "primary" for user\'s main calendar). Use an email address for other calendars.' },
        days_ahead: { type: 'number', description: 'Number of days to look ahead (default: 7)' },
        query: { type: 'string', description: 'Optional search query to filter events' },
      },
    },
  },
  {
    name: 'create_calendar_event',
    description: 'Create a new event on Google Calendar.',
    parameters: {
      type: 'object',
      properties: {
        summary: { type: 'string', description: 'Event title' },
        description: { type: 'string', description: 'Event description' },
        location: { type: 'string', description: 'Event location' },
        start_datetime: { type: 'string', description: 'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")' },
        end_datetime: { type: 'string', description: 'End date/time in ISO format' },
        calendar_id: { type: 'string', description: 'Calendar ID (default: "primary")' },
        attendees: { type: 'array', description: 'Email addresses of attendees', items: { type: 'string' } },
      },
      required: ['summary', 'start_datetime', 'end_datetime'],
    },
  },
  {
    name: 'create_doc',
    description: 'Create a new Google Document in the user\'s Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Document title' },
        content: { type: 'string', description: 'Initial text content to write into the document' },
        folder_name: { type: 'string', description: 'Optional: Drive folder name to place the doc in. Creates the folder if it doesn\'t exist.' },
      },
      required: ['title'],
    },
  },
  {
    name: 'read_doc',
    description: 'Read the text content of a Google Document.',
    parameters: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'The document ID (from URL: docs.google.com/document/d/{ID}/edit)' },
      },
      required: ['document_id'],
    },
  },
  {
    name: 'append_to_doc',
    description: 'Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.',
    parameters: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'The document ID to append to' },
        content: { type: 'string', description: 'Text content to append to the document' },
      },
      required: ['document_id', 'content'],
    },
  },
  {
    name: 'rewrite_doc',
    description: 'Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.',
    parameters: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)' },
        content: { type: 'string', description: 'New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)' },
      },
      required: ['document_id', 'content'],
    },
  },
  {
    name: 'delete_doc_content',
    description: 'Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.',
    parameters: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'The document ID (from URL: docs.google.com/document/d/{ID}/edit)' },
        text_to_remove: { type: 'string', description: 'Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry.' },
      },
      required: ['document_id', 'text_to_remove'],
    },
  },
  {
    name: 'create_file',
    description: 'Generate a real, downloadable Word (.docx) or PDF (.pdf) file and save it to the user\'s Google Drive. Use this instead of create_doc whenever the user specifically asks for "a Word document", "a .docx file", "a PDF", something they can print or send as an attachment — anything that needs to be an actual file rather than a live-editable Google Doc. Requires Google account connected via OAuth (same connection create_doc uses). Supports markdown: # ## ### headings, - bullets, 1. numbered lists, **bold**, *italic* (PDF renders bold/italic markers as plain text — pdf-lib has no rich-text layout).',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'File title, used as the filename and the document heading' },
        content: { type: 'string', description: 'Full content in markdown' },
        format: { type: 'string', enum: ['docx', 'pdf'], description: 'Output file format' },
        folder_name: { type: 'string', description: 'Optional: Drive folder to place the file in. Creates the folder if it doesn\'t exist.' },
      },
      required: ['title', 'content', 'format'],
    },
  },
  // === Gmail API Tools (OAuth, no browser) ===
  {
    name: 'gmail_list',
    description: 'List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.',
    parameters: {
      type: 'object',
      properties: {
        max_results: { type: 'number', description: 'Number of messages to return (1-20). Default: 10' },
        query: { type: 'string', description: 'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")' },
      },
    },
  },
  {
    name: 'gmail_read',
    description: 'Read the full body of a specific Gmail message by its ID. Use after gmail_search/gmail_list. The Date line is the email received date. For purchase lookups, prefer order-confirmation emails (they list items) over delivery/shipping notices (often item-less). If gmail_search subject/snippet already answers the user, report Date from search results without reading every message.',
    parameters: {
      type: 'object',
      properties: {
        message_id: { type: 'string', description: 'The Gmail message ID (from gmail_list results)' },
      },
      required: ['message_id'],
    },
  },
  {
    name: 'gmail_search',
    description: 'Search Gmail with a query. Supports Gmail syntax: from:, to:, subject:, newer_than:, etc. For product/purchase lookups, include product keywords in the query and set product_hint. Results include subject, snippet, and Date — often enough without gmail_read. Prefer order confirmations over delivery emails.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")' },
        max_results: { type: 'number', description: 'Number of results (1-20). Default: 10' },
        product_hint: { type: 'string', description: 'Product name for purchase lookups — ranks order confirmations above delivery notices' },
      },
      required: ['query'],
    },
  },
  {
    name: 'gmail_send',
    description: 'Send an email via Gmail IMMEDIATELY and irreversibly. Use this when the user explicitly says "send" (not just "draft" or "compose"). STRICT RULES: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm the address. (2) The body must be based on content from this conversation (research results, user-provided text, or a draft composed earlier in this turn) — do NOT invent facts. Using an email body you just composed or drafted in the same conversation is fine. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject' },
        body: { type: 'string', description: 'Email body (plain text)' },
        cc: { type: 'string', description: 'CC recipients (comma-separated)' },
      },
      required: ['to', 'subject', 'body'],
    },
  },
  {
    name: 'gmail_draft',
    description: 'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Use this when the user says "draft", "compose", or "prepare" an email, OR when no explicit recipient address has been provided. If the user explicitly says "send" and provides an email address, use gmail_send instead. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject' },
        body: { type: 'string', description: 'Email body (plain text)' },
        cc: { type: 'string', description: 'CC recipients (comma-separated email addresses)' },
      },
      required: ['to', 'subject', 'body'],
    },
  },
  {
    name: 'gmail_unread_count',
    description: 'Get the number of unread emails in Gmail inbox. Quick check — no message details.',
    parameters: {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Gmail label to check. Default: INBOX' },
      },
    },
  },
  {
    name: 'gmail_modify',
    description: 'Modify an email in Gmail (archive, trash, mark as read, etc).',
    parameters: {
      type: 'object',
      properties: {
        message_id: { type: 'string', description: 'The exact ID of the message to modify' },
        action: { type: 'string', enum: ['archive', 'trash', 'read', 'unread', 'star', 'unstar'], description: 'The action to perform' },
      },
      required: ['message_id', 'action'],
    },
  },
  // === Google Drive Tools ===
  {
    name: 'drive_list',
    description: 'List files in the user\'s Google Drive. Supports search queries. Returns file name, type, size, and last modified date.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")' },
        max_results: { type: 'number', description: 'Number of files to return (1-30). Default: 10' },
        folder_id: { type: 'string', description: 'Optional folder ID to list contents of a specific folder' },
      },
    },
  },
  {
    name: 'drive_search',
    description: 'Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search text to find in file names or contents' },
        max_results: { type: 'number', description: 'Number of results (1-20). Default: 10' },
      },
      required: ['query'],
    },
  },
  {
    name: 'drive_read_file',
    description: 'Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.',
    parameters: {
      type: 'object',
      properties: {
        url_or_id: { type: 'string', description: 'Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID' },
        extract_focus: { type: 'string', description: 'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")' },
      },
      required: ['url_or_id'],
    },
  },
  {
    name: 'drive_delete_file',
    description: 'Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.',
    parameters: {
      type: 'object',
      properties: {
        url_or_id: { type: 'string', description: 'Google Drive URL or bare file ID of the file to trash' },
      },
      required: ['url_or_id'],
    },
  },
  {
    name: 'drive_organise',
    description: 'Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.',
    parameters: {
      type: 'object',
      properties: {
        url_or_id: { type: 'string', description: 'Google Drive URL or bare file ID of the file to move/rename' },
        folder_name: { type: 'string', description: 'Name of the destination folder. Creates it if it does not exist.' },
        new_name: { type: 'string', description: 'Optional: new name for the file' },
      },
      required: ['url_or_id'],
    },
  },
  // === Web Search & Research Tools ===
  {
    name: 'web_search',
    description: 'Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")' },
        num_results: { type: 'number', description: 'Number of results to return (1-10). Default: 5' },
        site: { type: 'string', description: 'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")' },
      },
      required: ['query'],
    },
  },
  {
    name: 'read_url',
    description: 'Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")' },
        max_length: { type: 'number', description: 'Maximum characters to return (default: 8000, max: 15000)' },
      },
      required: ['url'],
    },
  },
  {
    name: 'research',
    description: 'Deep web research using Sonnet 5 and Exa (auto-escalates to Opus 4.8 only if Sonnet fails). Produces a cited report. Use depth:\'quick\' for factual lookups (~45-90s). Use depth:\'thorough\' for complex, analytical, comparative, or multi-part questions (~2-5 min, ~3 LLM calls) — plans sub-queries, reads 15+ sources, identifies gaps, synthesizes a comprehensive structured report.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")' },
        depth: { type: 'string', enum: ['quick', 'thorough'], description: 'quick = Sonnet 5 + Exa (~45-90s). thorough = multi-phase deep research (~2-5 min, ~3 LLM calls). Default: quick' },
        site: { type: 'string', description: 'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")' },
      },
      required: ['query'],
    },
  },
  {
    name: 'save_note',
    description: 'Save a note for future reference. Use when the user asks to save, remember, or note something specific. Also use after research when user wants to keep the report.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Short title/headline for the note' },
        content: { type: 'string', description: 'The note content' },
        tags: { type: 'string', description: 'Comma-separated tags e.g. "work,ideas"' },
        source: { type: 'string', enum: ['manual', 'research', 'chat'], description: 'Source of the note. Default: manual' },
        source_query: { type: 'string', description: 'Original query if source=research' },
      },
      required: ['content'],
    },
  },
  {
    name: 'search_notes',
    description: "Search the user's saved notes by keyword, topic, or tag.",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_notes',
    description: 'List recent notes, optionally filtered by tag.',
    parameters: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max notes to return (default 10)' },
        tag: { type: 'string', description: 'Filter by tag' },
        pinned_only: { type: 'boolean', description: 'Only show pinned notes' },
      },
    },
  },
  {
    name: 'delete_note',
    description: 'Delete a specific note by ID.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Note ID to delete' },
      },
      required: ['id'],
    },
  },
  // === Cloud Browser ===
  {
    name: 'browser_task',
    description: 'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',
    parameters: {
      type: 'object',
      properties: {
        task: { type: 'string', description: 'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")' },
        site_name: { type: 'string', description: 'Name of a saved Secret Vault entry (e.g. "LinkedIn", "Outlook") to inject login credentials. REQUIRED for any site that needs a login. You MUST call vault_lookup first to find the exact entry name, then pass it here. If omitted for a login-required site, no credentials will be injected and the task will fail to authenticate.' },
      },
      required: ['task'],
    },
  },
  {
    name: 'browser_task_status',
    description: 'Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.',
    parameters: {
      type: 'object',
      properties: {
        task_id: { type: 'string', description: 'The task ID returned by the earlier browser_task call (stored in memory)' },
      },
      required: ['task_id'],
    },
  },
  {
    name: 'vault_lookup',
    description: 'Check the Secret Vault for saved login credentials by site name or stored username. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.',
    parameters: {
      type: 'object',
      properties: {
        site_name: { type: 'string', description: 'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.' },
      },
      required: ['site_name'],
    },
  },
  // === Page Watches (scripted browser, free — no Browser Use credits) ===
  {
    name: 'watch_page',
    description: 'Start watching a public web page for changes. A real browser re-visits the URL on a schedule, and the user gets a push notification describing what changed (new/removed lines). Use when the user says things like "watch this page", "tell me when X changes / goes on sale / is announced", "monitor this URL". Do NOT use for pages behind a login. The first snapshot (baseline) is taken within ~5 minutes.',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Full http(s) URL of the page to watch' },
        name: { type: 'string', description: 'Short human label for notifications (e.g. "NCPA events page"). Defaults to the site hostname.' },
        check_interval_minutes: { type: 'number', description: 'How often to re-check, in minutes. Minimum 15, default 60.' },
        css_selector: { type: 'string', description: 'Optional CSS selector to watch only part of the page (e.g. "#events"). Omit to watch the whole page text.' },
      },
      required: ['url'],
    },
  },
  {
    name: 'list_page_watches',
    description: 'List the pages currently being watched for changes, with their check interval, last check/change times, and any errors.',
    parameters: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'remove_page_watch',
    description: 'Stop watching a page. Identify it by its name or URL (as shown by list_page_watches).',
    parameters: {
      type: 'object',
      properties: {
        name_or_url: { type: 'string', description: 'Name or URL (full or partial) of the watch to remove' },
      },
      required: ['name_or_url'],
    },
  },
  // === Google Public APIs (API Key-based) ===
  // Note: Places/Directions/Distance Matrix/Geocoding (Google Maps Platform) and
  // Cloud Translation are paid, billing-account-gated APIs — intentionally not
  // exposed as tools. YouTube Data API is free within quota, so it stays.
  {
    name: 'search_youtube',
    description: 'Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")' },
        max_results: { type: 'number', description: 'Number of results (1-10). Default: 5' },
        order: { type: 'string', enum: ['relevance', 'date', 'viewCount'], description: 'Sort order. Default: relevance' },
      },
      required: ['query'],
    },
  },
  // === Document Parsing ===
  {
    name: 'parse_document',
    description: 'Read and extract text content from an uploaded file (PDF, Word/DOCX, images, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.',
    parameters: {
      type: 'object',
      properties: {
        file_id: { type: 'string', description: 'The file_id returned when the file was uploaded' },
        extract_focus: { type: 'string', description: 'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")' },
      },
      required: ['file_id'],
    },
  },
  {
    name: 'compare_documents',
    description: 'Compare two uploaded documents — e.g. two versions of a contract, rider, or proposal — and produce a structured diff. Use this instead of two separate parse_document calls whenever the user asks what changed between versions, or asks to compare two files. Extracts both documents in full; after this returns, identify additions, removals, and modified sections, citing specifics from both documents rather than summarizing each in isolation.',
    parameters: {
      type: 'object',
      properties: {
        file_id_a: { type: 'string', description: 'file_id of the first document (e.g. the earlier version)' },
        file_id_b: { type: 'string', description: 'file_id of the second document (e.g. the newer version)' },
        focus: { type: 'string', description: 'Optional: what to focus the comparison on (e.g. "pricing terms", "delivery dates"). If omitted, compares the full documents.' },
      },
      required: ['file_id_a', 'file_id_b'],
    },
  },
  // === Document Library Search ===
  {
    name: 'search_library',
    description: 'Search the user\'s Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search terms to look for in document name, summary, or extracted text' },
        limit: { type: 'number', description: 'Maximum number of results to return (1-20, default: 10)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'read_library_file',
    description: 'Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.',
    parameters: {
      type: 'object',
      properties: {
        id_or_name: { type: 'string', description: 'Numeric document ID from search_library results, or a partial document name to search by' },
      },
      required: ['id_or_name'],
    },
  },
  // === User-Defined Skills ===
  {
    name: 'create_skill',
    description: 'Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")' },
        description: { type: 'string', description: 'One-sentence description of what the skill does' },
        instructions: { type: 'string', description: 'Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results.' },
        required_tools: { type: 'array', items: { type: 'string' }, description: 'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])' },
        parameters: { type: 'object', description: 'JSON schema describing the inputs this skill accepts. Use standard JSON schema format.' },
        examples: { type: 'array', description: 'Optional example inputs and expected outputs to guide execution', items: { type: 'object', properties: { input: { type: 'object' }, output: { type: 'string' } } } },
      },
      required: ['name', 'description', 'instructions'],
    },
  },
  {
    name: 'list_skills',
    description: 'List all custom skills the user has created. Shows name, description, and usage count for each.',
    parameters: {
      type: 'object',
      properties: {
        include_disabled: { type: 'boolean', description: 'Whether to include disabled skills. Default: false' },
      },
    },
  },

  // ── Unified Docs (UDM) tools ─────────────────────────────────────────────
  // Use these ONLY when the user explicitly mentions "Unified Docs", "UDM", or "ash-doc".
  // Do NOT use for general document/writing tasks — those go to Google Drive (create_doc).
  {
    name: 'udm_list_pages',
    description: 'List all pages, folders, and databases in the user\'s Unified Docs workspace. Use to browse what exists before reading or editing.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'udm_create_page',
    description: 'Create a brand-new page in Unified Docs. Use ONLY when the page does not already exist. To rewrite or update an existing page use udm_write_page — never call this on a page that already exists, it will create a duplicate.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Page title' },
        markdown: { type: 'string', description: 'Initial page content in markdown. Use blank lines between paragraphs. Never use --- for spacing. Supports # ## headings, **bold**, *italic*, - bullets.' },
        parent_page_title: { type: 'string', description: 'Optional: title of an existing folder/page to nest this page under' },
      },
      required: ['title'],
    },
  },
  {
    name: 'udm_read_page',
    description: 'Read the full markdown content of a Unified Docs page by its title. Use before editing to get the current content. Pages with embedded databases show {{database:ID|Title}} markers in the markdown.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the page to read' },
      },
      required: ['page_title'],
    },
  },
  {
    name: 'udm_write_page',
    description: 'Rewrite or update the full content of an existing Unified Docs page. Use this when the user asks to rewrite, update, revise, or change a page — NOT udm_create_page. For a complete rewrite you may skip udm_read_page; call it first only when you need the current content to make partial changes.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the page to update' },
        markdown: { type: 'string', description: 'The new full content to write to the page (replaces existing content). Use blank lines between paragraphs. Never use --- for spacing. For reformatting, read page first, preserve wording AND the existing title/heading at the top. Supports # ## headings, **bold**, *italic*, - bullets.' },
      },
      required: ['page_title', 'markdown'],
    },
  },
  {
    name: 'udm_search',
    description: 'Full-text search across all pages and content in Unified Docs. Returns matching page titles and excerpts.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
      },
      required: ['query'],
    },
  },
  {
    name: 'udm_delete_page',
    description: 'Permanently delete a page from Unified Docs. Confirm with the user before calling this.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title of the page to delete' },
      },
      required: ['page_title'],
    },
  },
  {
    name: 'udm_list_comments',
    description: 'List all comments on a specific Unified Docs page.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the page' },
      },
      required: ['page_title'],
    },
  },
  {
    name: 'udm_add_comment',
    description: 'Post a new comment on a Unified Docs page.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the page to comment on' },
        content: { type: 'string', description: 'The comment text to post' },
      },
      required: ['page_title', 'content'],
    },
  },
  {
    name: 'udm_read_page_with_comments',
    description: 'Fetch a Unified Docs page\'s full content AND all its comments in one call. Use this as the first step when the user asks you to "read the comments and apply edits" — it gives you both the current text and the edit instructions together.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the page' },
      },
      required: ['page_title'],
    },
  },
  // Phase 2: Database tools
  {
    name: 'udm_create_database',
    description: 'Create a new database (spreadsheet-like table) in Unified Docs. Use embed_in_page_title to embed it inline on an existing page (appears inside the page content). Use parent_title to place it as a standalone child page under a folder. These are mutually exclusive — pick one. After creating, use udm_add_property to define columns.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Name of the new database' },
        parent_title: { type: 'string', description: 'Optional: title of a folder to place the database under as a standalone page. Mutually exclusive with embed_in_page_title.' },
        embed_in_page_title: { type: 'string', description: 'Optional: title of an existing page to embed the database inline within (appears in the page\'s content). Mutually exclusive with parent_title.' },
      },
      required: ['title'],
    },
  },
  {
    name: 'udm_read_database',
    description: 'Read a Unified Docs database — returns all columns (with types and select options) and all rows with their values and row IDs. Call this before adding/updating/deleting rows so you can see existing data and valid option values.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the database' },
      },
      required: ['page_title'],
    },
  },
  {
    name: 'udm_add_row',
    description: 'Add a new row to a Unified Docs database. Specify property values by column name. For select/multi_select columns use values from the allowed options (visible in udm_read_database output).',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the database' },
        properties: {
          type: 'object',
          description: 'Column values keyed by column name. E.g. {"Status": "Done", "Priority": "High"}',
          additionalProperties: true,
        },
        title: { type: 'string', description: 'Optional: the row\'s display name / title' },
      },
      required: ['page_title', 'properties'],
    },
  },
  {
    name: 'udm_update_row',
    description: 'Update an existing row in a Unified Docs database. Use udm_read_database first to get the row ID and see valid option values. Only the specified properties are changed; others remain untouched.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the database' },
        row_id: { type: 'string', description: 'The row ID from udm_read_database output (shown as [id: ...])'  },
        properties: {
          type: 'object',
          description: 'Column values to update keyed by column name. E.g. {"Status": "Done"}',
          additionalProperties: true,
        },
      },
      required: ['page_title', 'row_id', 'properties'],
    },
  },
  {
    name: 'udm_delete_row',
    description: 'Delete a row from a Unified Docs database. Use udm_read_database first to get the row ID.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the database' },
        row_id: { type: 'string', description: 'The row ID to delete (from udm_read_database output)' },
      },
      required: ['page_title', 'row_id'],
    },
  },
  {
    name: 'udm_add_property',
    description: 'Add a new column to a Unified Docs database. Valid types: text, number, date, select, multi_select, checkbox. For select/multi_select, provide the allowed options.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'The title (or partial title) of the database' },
        name: { type: 'string', description: 'Column name' },
        type: { type: 'string', description: 'Column type: text, number, date, select, multi_select, or checkbox' },
        options: {
          description: 'For select/multi_select: comma-separated string or array of option labels. E.g. "To Do, In Progress, Done"',
        },
      },
      required: ['page_title', 'name', 'type'],
    },
  },
  {
    name: 'udm_edit_section',
    description: 'Surgically replace a specific portion of a Unified Docs page. Finds old_text exactly and replaces it with new_text — leaving the rest of the page untouched. Use udm_read_page first to get exact text. Optionally resolves a comment by ID after the edit. Returns 409 if old_text is ambiguous (multiple matches) — retry with occurrence: "first", "all", or a number.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'Title (or partial title) of the page to edit' },
        old_text: { type: 'string', description: 'Exact text to find in the page content (must match verbatim including whitespace)' },
        new_text: { type: 'string', description: 'Replacement text. Use blank lines between paragraphs. Never use --- for spacing.' },
        comment_id: { type: 'string', description: 'Optional comment ID to mark as resolved after the edit' },
        occurrence: { type: 'string', description: 'Which match to replace if old_text appears multiple times: "first", "all", or a number (1, 2, …). Omit to require a unique match.' },
      },
      required: ['page_title', 'old_text', 'new_text'],
    },
  },
  {
    name: 'udm_resolve_comment',
    description: 'Mark a comment on a Unified Docs page as resolved. Get the comment ID from udm_list_comments or udm_read_page_with_comments output.',
    parameters: {
      type: 'object',
      properties: {
        comment_id: { type: 'string', description: 'The comment ID to resolve (shown as [id: ...] in comment listings)' },
      },
      required: ['comment_id'],
    },
  },
  {
    name: 'udm_list_agent_comments',
    description: 'Fetch open agent instructions on a Unified Docs page. Unlike udm_list_comments (which returns discussion threads), this returns only agent_instruction comments — each with the highlighted text (selection_quote) and a pre-formatted agent_prompt combining the quote and the instruction. Use this as the first step when asked to "apply comments" or "action the instructions" on a page.',
    parameters: {
      type: 'object',
      properties: {
        page_title: { type: 'string', description: 'Title (or partial title) of the page' },
      },
      required: ['page_title'],
    },
  },
  {
    name: 'udm_apply_comment',
    description: 'Apply the edit for an agent instruction comment and resolve it in one call. The API automatically uses the comment\'s highlighted text (selection_quote) as old_text — you only provide new_text (the replacement). Returns open_count so you know how many instructions remain. Use after udm_list_agent_comments. If the highlighted text appears multiple times (409), retry with occurrence: "first" or a number.',
    parameters: {
      type: 'object',
      properties: {
        comment_id: { type: 'string', description: 'The agent comment ID to apply (from udm_list_agent_comments output)' },
        new_text: { type: 'string', description: 'The replacement text for the highlighted selection. Use blank lines between paragraphs. Never use --- for spacing.' },
        old_text: { type: 'string', description: 'Optional: override the selection_quote for what to find. Only needed if the original highlight is no longer in the page.' },
        occurrence: { type: 'string', description: 'Optional: "first", "all", or a number — which match to replace if selection_quote appears multiple times.' },
      },
      required: ['comment_id', 'new_text'],
    },
  },
];

// Load user-defined skills from DB and append to the base TOOLS array
async function loadUserTools(db: D1Database, userId: number): Promise<LLMTool[]> {
  try {
    const result = await db.prepare(
      'SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC'
    ).bind(userId).all<{ slug: string; name: string; description: string; parameters: string }>();

    const skillTools: LLMTool[] = (result.results || []).map(skill => {
      let params: Record<string, unknown> = {};
      try { params = JSON.parse(skill.parameters) || {}; } catch { /* use empty */ }
      // If no parameters defined, provide a generic inputs param
      if (!params.properties) {
        params = {
          type: 'object',
          properties: {
            inputs: { type: 'string', description: 'Any additional context or specific instructions for this skill execution' },
          },
        };
      }
      return {
        name: skill.slug,
        description: `[Custom Skill] ${skill.description}`,
        parameters: params,
      };
    });

    return [...TOOLS, ...skillTools];
  } catch {
    return TOOLS;
  }
}

/** Filter built-in tools by name (voice allowlists, tests). */
export function filterAgentTools(allowedNames: Set<string>): LLMTool[] {
  return TOOLS.filter((t) => allowedNames.has(t.name));
}

// Build the system prompt with personality, memory, and tool instructions
// Enforces token budgets for each section
async function fetchPreferencesContext(db: D1Database, userId: number): Promise<string> {
  try {
    const result = await db.prepare(
      'SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC'
    ).bind(userId).all<{ content: string }>();
    const rows = result.results || [];
    if (rows.length === 0) return '';
    return rows.map(r => `- ${r.content}`).join('\n');
  } catch {
    return '';
  }
}

export function buildSystemPrompt(user: UserRecord, memoryContext: string, channel?: string, preferencesContext?: string, autoSkillsContext?: string, notesContext?: string): string {
  const assistantName = (user as any).assistant_name || 'Karna';

  // Personality section — truncated to budget
  const personalitySection = user.personality_prompt 
    ? truncateToTokenBudget(`## Personality Instructions\n${user.personality_prompt}\n`, PERSONALITY_TOKEN_BUDGET)
    : '';

  // Preferences section — explicit standing instructions set by the user
  const prefsSection = preferencesContext?.trim()
    ? `## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)\nThese rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.\n${preferencesContext}\n`
    : '';

  // Memory section — already truncated by MemoryService
  const memorySection = truncateToTokenBudget(memoryContext, WORKING_MEMORY_TOKEN_BUDGET);
  const notesSection = notesContext?.trim()
    ? truncateToTokenBudget(`## Pinned Notes Reference\n${notesContext}\n`, 1000)
    : '';

  // Short date for sheet operations (e.g. "8 Mar 2026")
  let todayShortDate = '';
  try {
    const _now = new Date();
    todayShortDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: user.timezone,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(_now);
  } catch { todayShortDate = ''; }

  const basePrompt = `You are ${assistantName}.

## Who You Are

Operational executor, not a chatbot. The person on the other end of an earpiece who has already thought three moves ahead and doesn't need to narrate the process.

Reference points for your character:
- **JARVIS** — tool-native by reflex, no ego, operational precision. Reaches for the right tool the way a surgeon reaches for an instrument — without announcing it.
- **Alfred** — knows the person's history cold, their patterns, their systems, their taste. Never needs the same thing explained twice. Occasionally dry.
- **Pepper Potts** — pragmatic, gets it done, flags contradictions without apology, doesn't perform enthusiasm.

**How you operate:**
- Clear request → act. State what you did in one line.
- Ambiguous request where the wrong path wastes real effort → one focused clarifying question, then execute. Not a form. One question.
- Second-order problem spotted → flag it once, after solving the immediate one. Only when it's real and the pattern is established. Not reflexively.
- Current data needed → search first. You retrieve facts; you don't generate them.
- Constraint hit → one sentence on why, one sentence on the closest alternative. No apologetic dancing.
- Contradicts past recommendation → flag it. "Last time we went with X — if Y has changed, maybe Z now?"

**How you write:**
Fragments are fine. No preamble. No hollow affirmations to open. "Done. [link]" beats a paragraph confirming you understood the task. When something is genuinely complex, you earn the length — but default to the shortest thing that's actually complete. Call tools silently: no "Let me check..." or "I'll search for that now" before invoking. Results come after the work, not before. **Never emit any text between successive tool calls** — if you need to call another tool, call it directly. Only speak once all tool calls for the task are complete. For tool-heavy tasks (UDM edits, Drive saves, schedule creation), your final reply is one short sentence: what you did and whether it worked. No enumeration of steps taken, no list of what was preserved or changed.

**Wit:**
Observational, understated, context-dependent. Fires when the situation earns it — not as a reflex. One line, before the solve, never instead of it. Think: dry recognition of genuine absurdity. If nothing is genuinely absurd, say nothing absurd.

Examples that fit:
- "Third time this month. I assume we're training them for spontaneous combustion at this point?" [then solves it]
- "Classic Tuesday energy — second time in three months you've noticed a week out. Should we add a bi-weekly alert?" [solves + prevents + slight dig]

Examples that don't fit: forced emoji, reused joke templates, generic witticisms, humor that delays the answer.

**What you don't do (built into who you are):**
Generate confident-sounding facts without searching. Proceed on ambiguous requests without clarifying. Repeat explanations of systems already built. Use hollow affirmations. Narrate before acting. Apologize excessively.

---

## Current User
- **Name**: ${user.name}
- **Username**: ${user.username}
- **Timezone**: ${user.timezone}
- **Today's date for sheets**: ${todayShortDate}

${personalitySection}

${prefsSection}

---

## Your Memory

Read everything here before responding. This is your stored knowledge of this person — preferences, standing rules, data sources, patterns, systems. These override defaults without re-confirmation.

- Memory references a spreadsheet ID → use it directly with read_sheet/write_sheet. Don't ask for it again.
- Memory records a preference → follow it.
- Memory records a resolved pattern (e.g. "item + amount = expense to Monthly Budget sheet") → act on it directly, no question.

${memorySection}

${notesSection}

${autoSkillsContext ? autoSkillsContext + '\n' : ''}

---

## Tools Are Building Blocks

Every tool is composable with every other. When a request has multiple steps, chain them — don't stop mid-chain to check in. Execute completely, then present the result.

**UDM (Unified Docs) response format:** After completing any UDM operation, reply with exactly one short sentence — what changed and whether it worked. No step-by-step recap, no list of what was preserved. Example: "Done — Narens Note summarised in place." Not: "I read the page, then summarised it, preserving X, Y, Z..."

**Gather**: web_search, research, read_url, gmail_list, gmail_search, list_calendar_events, drive_search, drive_list
**Create**: create_doc, create_file, create_sheet, gmail_draft, gmail_send, create_calendar_event
**Write**: write_sheet, append_sheet, append_to_doc, store_memory
**Read**: read_doc, read_sheet, gmail_read

Any gather tool feeds into any create/write tool. Chain without hesitation.

**Chaining examples:**
- "Research X and save to a doc" → research → create_doc
- "What's in my inbox, anything from John? Save it to a doc" → gmail_list → gmail_read → create_doc
- "Latest AI news — write a summary in Google Docs" → web_search → create_doc
- "Find audio stores in Mumbai and make a spreadsheet" → web_search → create_sheet → write_sheet
- "Uber 700" (pattern in memory) → append_sheet, no question
- "Uber 700" (no pattern) → "Add Uber ₹700 to your budget? I can set up a sheet if you don't have one."
- "What changed between these two versions of the contract?" / "compare these two files" → compare_documents (never two separate parse_document calls for a comparison — compare_documents exists precisely so you diff instead of summarizing each file in isolation)
- "Write this up as a Word doc" / "send me a PDF of the proposal" → create_file(format=docx or pdf) — not create_doc

**When you confirm an ambiguous action and the user approves:** store_memory with the resolved pattern immediately (type: preference, importance: 8). Act directly next time — never ask about the same pattern twice.

---

## When to Act vs. When to Ask

**Act immediately:** request is clear, intent and params are in the message or memory, pure information request.

**Ask one focused question:** wrong path means meaningful wasted effort (wrong recipient, wrong sheet, wrong file), and memory doesn't resolve it.

**The test:** would a sharp, experienced assistant who knows this person ask this question — or just handle it? If the latter, handle it.

---

## Where Things Get Stored

| Content | Destination | Tool |
|---|---|---|
| Preferences, habits, standing rules | Memory | store_memory(type=preference) |
| Permanent facts about the user | Memory | store_memory(type=fact) |
| Resource pointers (sheet ID, doc URL) | Memory | store_memory(type=context) — pointer only |
| Time-based reminders, follow-ups | Schedules | create_schedule |
| Essays, articles, reports (long-form) | Google Drive | create_doc |
| Decisions the user made | Memory | store_memory(type=decision) |
| Quick jotted info the user wants to save and find later (a snippet, a thought, a research finding to keep) | Notes | save_note |
| A Word document or PDF the user needs to download, print, or send as a real file (not a live-editable Google Doc) | Google Drive (as .docx/.pdf) | create_file |

Never store the full body of a document in memory. Title + URL pointer only. Long-form content belongs in Drive.

**Notes vs. Memory:** Notes are standalone scratch entries the user explicitly asks to save ("note this", "save this for later") — they don't change how you behave. Memory is durable knowledge that shapes future behavior (preferences, facts, decisions, resource pointers). When in doubt: if the user is asking you to remember something about *them* (a preference, a standing rule), use Memory. If they're asking you to save a piece of *information* for later retrieval, use Notes.

**create_doc vs. create_file:** Default to create_doc (a Google Doc) — it's live, shareable, and editable in place. Switch to create_file only when the user's phrasing calls for an actual file: "Word doc", ".docx", "PDF", "send as an attachment", "something I can print". If unstated, a Google Doc is the right default.

---

## Writing Well — Genre Conventions

When a request implies one of these document types, apply its standard structure even if the user doesn't spell it out — don't ask which sections to include, just write it properly:

| Genre | Structure cues |
|---|---|
| Email | Clear subject line, one ask per email where possible, shortest version that gets the job done |
| Business letter | Formal salutation/closing, direct opening stating purpose, professional register throughout |
| Technical documentation | Audience-appropriate depth, numbered steps for procedures, code/config in fenced blocks |
| PRD | Problem statement, goals/non-goals, user stories or requirements, success metrics |
| Research report | Executive summary up top, methodology if relevant, findings, sourced claims |
| White paper | Problem framing, evidence-backed argument, conclusion/call to action — more persuasive than a report |
| Proposal | What's being proposed, why now, scope, cost/timeline if known, clear ask at the end |
| SOP | Purpose, scope, step-by-step procedure, exceptions/edge cases, who owns it |
| Meeting minutes | Attendees, agenda items covered, decisions made, action items with owners |
| Specification | Precise, testable requirements — avoid vague adjectives, define terms that could be ambiguous |
| Markdown output | Use real headings (#/##), bullets, and bold for structure — don't write a wall of prose when structure would help |
| Knowledge base article | Answer the question in the first line, then explain — written for someone searching, not reading start to end |

**Editing and proofreading are not rewriting.** When asked to edit or proofread: preserve the author's voice and intent, fix grammar/clarity/flow with the lightest touch that solves the problem, and don't restructure or add content that wasn't asked for. Read the existing content first (read_doc, parse_document, or from the message itself) before touching it. When asked to *rewrite* or *reformat*, you have more license to restructure — that's a different, explicitly broader request.

---

## Unified Docs (UDM) — Page Rules

Use UDM tools ONLY when the user explicitly mentions "Unified Docs", "UDM", or "ash-doc".

| User intent | Correct tool | Never |
|---|---|---|
| Create a page that doesn't exist yet | udm_create_page | — |
| Rewrite / update / revise an existing page | udm_write_page | Never call udm_create_page for a rewrite |
| Edit one section of a page | udm_edit_section | — |
| Apply a highlighted comment instruction | udm_apply_comment | — |
| "Apply comments" / "action the instructions" | udm_list_agent_comments → udm_apply_comment | Never use udm_list_comments for agent tasks |
| Create inline database on a page | udm_create_database(embed_in_page_title=…) | — |
| Format / clean up an existing page | udm_read_page → reformat → udm_write_page | — |

**Critical rewrite rule:** When the user asks to rewrite, update, or change an existing UDM page — call \`udm_write_page\`. Do NOT call \`udm_create_page\`. Every call to \`udm_create_page\` creates a brand-new separate page, even if a page with that name already exists, producing duplicates.

Pattern: user says "rewrite [page] in UDM" → \`udm_read_page\` (optional, only if you need current content) → \`udm_write_page\`. Done. Never follow that with \`udm_create_page\`.

**Agent comment workflow:** When asked to apply comments or action instructions on a UDM page: \`udm_list_agent_comments\` → for each comment, read its \`agent_prompt\` to understand the edit → \`udm_apply_comment(comment_id, new_text)\`. The API resolves each comment automatically. Check \`open_count\` in the response — keep going until it reaches 0. Never use \`udm_list_comments\` for this; it returns discussion comments, not agent instructions.

**UDM Markdown Formatting:**
- Separate every paragraph with a blank line (\\n\\n). This is how ash-doc creates visual paragraph spacing.
- Never use \`---\` or horizontal rules as paragraph separators — they render as divider lines, not whitespace.
- For "format for readability" / "add paragraph spacing" requests: (1) \`udm_read_page\` to get exact current text, (2) preserve the same words — only adjust spacing/structure, (3) \`udm_write_page\` with the reformatted full page (same pattern as read_doc → rewrite_doc).
- **Always preserve the page title** — if the content starts with a \`#\` heading or title line, keep it exactly. Never remove the title when reformatting.
- Do not add new subheadings unless the user asks for them.
- Supported markdown: \`#\` / \`##\` headings, \`**bold**\`, \`*italic*\`, \`-\` bullets. Preserve \`{{database:ID|Title}}\` embed markers verbatim.

---

## UDM Markdown Formatting Rules

Apply these rules to **every** markdown string you write to UDM — whether creating a new page or updating an existing one. Also apply them when the user asks to "format", "clean up", or "fix the formatting" of an existing page (workflow: \`udm_read_page\` → reformat → \`udm_write_page\`).

### Spacing (most important)
- **Always use a blank line between paragraphs.** A single newline is not a paragraph break in markdown — it renders as the same block. Every paragraph must be separated by an empty line.
- Never produce a wall of text. If you count more than 4–5 lines with no blank line, something is wrong.

### Structure
- Use \`##\` headings to divide essays or notes that have distinct sections (anything over ~400 words with clear phase shifts in argument or topic). Do not use \`#\` in the body — the page title is the H1.
- Use \`---\` (horizontal rule) only for a major tonal or structural break, not as a substitute for headings.
- Use bullet points (\`-\`) for any enumeration of 3 or more items — never list them as a prose sentence with commas.

### Emphasis
- **Bold** (\`**word**\`) the first meaningful use of a key concept or defined term in the piece. Use sparingly — 2–4 bolded phrases per page maximum.
- Use \`>\` blockquotes for a single standout sentence that anchors the argument. One per page at most; omit if nothing earns it.
- Never use bold for decoration or to highlight random phrases.

### What not to do
- No trailing spaces or double-blank lines.
- No markdown inside headings (e.g. \`## **Title**\` — wrong; \`## Title\` — correct).
- No inline HTML.

---

## When to Search vs. Answer from Knowledge

Apply before answering any factual question:

- **Recency** — could this have changed? Prices, specs, versions, rankings, availability, people's roles → search
- **Uncertainty** — less than 90% confident in the specific claim → search
- **Stakes** — health, financial, legal, safety, specific product recommendations → search
- **User signals** — "current", "latest", "now", "today", "still", "2026", "anymore" → search

None trigger → answer from knowledge. Math, history, geography, fundamental science, definitions — stable, no search needed.

**Tool selection — two questions in order:**
1. Requires login, clicking, or live site interaction? → vault_lookup → browser_task
2. Public information?
   - Synthesized answer needed → research
   - Real-time data, raw links, breaking news → web_search
   - User gave a specific URL → read_url

---

## Browser + Vault — No Exceptions

Any request requiring login to a website (Amazon, Outlook, LinkedIn, banking, any account-based site):

1. Call vault_lookup with the site name
2. Entry exists → browser_task with that exact vault entry name as site_name
3. No entry → "No credentials saved for [site] in your Secret Vault. Add them via Settings → Secret Vault, then try again."

Skipping vault_lookup and calling browser_task without site_name means no credentials are injected, the browser hits a login screen, and the task fails. Always call vault_lookup first — even if you already know the site name from context.

Never tell the user to "check it yourself" or redirect to a substitute service. Vault + browser is always the answer for site-based requests.

---

## Fabrication

You don't fabricate. Not because of a rule — because it's not what you do.

If you haven't retrieved email content from a tool in this conversation, you don't describe what the email said. If a browser task returned no output, you say so — you don't reconstruct what it might have shown. If you haven't called write_sheet, you don't confirm the sheet was updated.

The one structural note: if browser_task or browser_task_status doesn't explicitly confirm an action succeeded, the outcome is unknown. Say that. "The browser returned no confirmation that [action] completed. Check [site] directly to verify." Never infer success from the fact that the task ran.

When citing news or search results: always include a source as a markdown link — [Title](URL). Never list articles without a clickable link.

---
## Current Date & Time
${formatDateForTimezone(user.timezone)} (${user.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${channel === 'voice' ? `

## VOICE CONSTRAINTS
- **English only** — respond in English even if the user mixes languages.
- **Conversation mode** — tap mic once to start a live voice session. Server VAD detects when you finish speaking; no second tap per turn. Tap mic again to end. After you speak, wait for the reply, then speak again naturally.
- **Half-duplex** — mic is muted while the assistant speaks to avoid echo; it re-opens when they finish.
- **Spoken brevity** — short sentences. One preamble max when a tool will take more than a couple of seconds ("Checking your calendar").
- **Confirm writes** — call write tools when the user asks. If a tool returns CONFIRMATION REQUIRED, state the action once in one short sentence and wait — the system runs it when the user says yes or go ahead. Never ask twice; do not ask before calling the tool.
- **Tandem / UDM** — read and write via voice; risky edits need one verbal yes or go ahead.
- **Browser** — browser_task may run for minutes; the user can tap Abort to stop automation.
- **No fabrication** — same rules as text. If a tool fails or returns nothing, say so plainly.
- **Reminders** — for "remind me…", call create_schedule with the correct schedule_type and schedule_value in the user's timezone.
- **Heavy task handoff** — when the user asks for research, an essay, an article, a report, an email draft, or any other long-form written work, do NOT compose or read the full piece out loud. The client is switching them to a chat thread where the full written result will appear with progress updates. Give only a brief one-sentence spoken acknowledgment (e.g. "On it — pulling that together now, you'll see it in the chat") and, if it fits the request, call the matching tool (${[...VOICE_HEAVY_TASK_TOOLS].join(', ')}) so the work actually happens — but never narrate its contents by voice.` : ''}${channel === 'telegram' ? `

## TELEGRAM CONSTRAINTS
- **Essays / save to Drive**: When the user wants an essay, article, or report saved to Google Drive (or says "store/save to drive"), you MUST call \`create_doc\` with the **full** text in the \`content\` parameter — never truncate for Telegram. Do NOT paste the essay body in chat (reply with title + Doc link only). Write from your knowledge unless they asked for research — do NOT call web_search before a plain essay. One \`create_doc\` call with title + full content (+ optional \`folder_name\`).
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report) WITHOUT any save destination (no mention of Drive, Google Doc, or "save/store"), ask first: "Should I save the full piece as a Google Doc and send you the link, or give you a brief summary here in chat?" Default to Google Doc for anything over ~300 words. If they already said Drive/Doc/save/store, skip this question and call \`create_doc\` with the complete text immediately. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**
- **UDM rewrite**: When the user asks to rewrite or update a page in Unified Docs/UDM — call \`udm_write_page\` with the full new content. Do NOT call \`udm_create_page\` — that creates a new duplicate page every time. Pattern: \`udm_write_page\` only (one call). If you need the existing content first, call \`udm_read_page\` → \`udm_write_page\`. Never call \`udm_create_page\` in a rewrite chain.
- **UDM formatting**: Every markdown string written to UDM must follow the UDM Markdown Formatting Rules in this prompt — blank lines between paragraphs, \`##\` headings for multi-section essays, bold for key terms (sparingly). When asked to "format" or "clean up" a UDM page: \`udm_read_page\` → reformat markdown → \`udm_write_page\`. One pass, no extra calls.` : ''}`;

  return basePrompt;
}

// Helper: find or create a Google Drive folder by name, then move a file into it
async function moveFileToFolder(
  token: string,
  fileId: string,
  folderName: string
): Promise<{ folderId: string; folderName: string }> {
  // Search for existing folder
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      `name='${folderName.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    )}&fields=files(id,name)`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const searchData = await searchRes.json() as { files: { id: string; name: string }[] };

  let folderId: string;
  if (searchData.files?.length > 0) {
    folderId = searchData.files[0].id;
  } else {
    // Create the folder
    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: folderName, mimeType: 'application/vnd.google-apps.folder' }),
    });
    const createData = await createRes.json() as { id: string };
    folderId = createData.id;
  }

  // Move the file into the folder (add parent, remove old parent)
  const fileRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?fields=parents`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const fileData = await fileRes.json() as { parents?: string[] };
  const previousParents = (fileData.parents || []).join(',');

  await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?addParents=${folderId}&removeParents=${previousParents}`,
    {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }
  );

  return { folderId, folderName };
}

// Strip raw XML tool-call artifacts that the LLM sometimes narrates as text
// (e.g. <function_calls>, <invoke>, <function_result>) before storing or streaming.
function stripLLMResponse(text: string): string {
  return text
    .replace(/^\[TOOLS_USED: [^\]]*\]\s*/i, '')
    .replace(/<function_calls>[\s\S]*?<\/function_calls>/gi, '')
    .replace(/<function_result>[\s\S]*?<\/function_result>/gi, '')
    .replace(/^\[calling:[^\]]*\]\s*/i, '')
    .trim();
}

// Format current date/time for a given timezone
function formatDateForTimezone(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    return formatter.format(now);
  } catch {
    // Fallback if timezone is invalid
    return new Date().toISOString();
  }
}

// Detects assistant text that claims a reminder was created/updated — shared between
// the text/telegram hallucination-enforcement loop and the voice post-turn recovery
// path (voice.ts), which has no retry loop and instead re-derives the reminder
// deterministically via parseReminderFromText below.
export const REMINDER_CLAIM_PATTERN = /\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i;

// === Programmatic reminder parser — deterministic fallback when LLM fails ===
// Parses "remind me in X minutes to Y" / "remind at HH:MM to Y" patterns
export function parseReminderFromText(text: string): { args: Record<string, unknown> } | null {
  // Normalize: strip punctuation between number and unit (e.g., "3. Minutes" → "3 Minutes")
  const cleaned = text.replace(/(\d+)\s*[.,;!]+\s*(minutes?|mins?|hours?|hrs?|h|days?|seconds?|secs?)/gi, '$1 $2');
  const lower = cleaned.toLowerCase().trim();
  
  // Pattern 1: "in X minutes/mins/min/hours/hr/h" → minutes_from_now
  // Accepts: "remind me in 3 minutes", "tell me in 5 mins", "in 45 min check X", "ping me in 2 hours"
  const relativeMatch = lower.match(/\bin\s+(\d+)\s*(minutes?|mins?|hours?|hrs?|h|days?)\b/i);
  if (relativeMatch) {
    let minutes = parseInt(relativeMatch[1], 10);
    const unit = relativeMatch[2].toLowerCase();
    if (unit.startsWith('h')) minutes *= 60;
    if (unit.startsWith('d')) minutes *= 1440;
    
    // Extract description: try "to <description>" first, then everything after the time phrase
    const descMatch = cleaned.match(/(?:to|about|that)\s+(.+?)\.?$/i);
    let description: string;
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      // Strip the scheduling prefix and time phrase, keep the rest
      description = cleaned
        .replace(/^(remind|alert|notify|tell|ping|nudge|buzz)\s*(me)?\s*/i, '')
        .replace(/in\s+\d+\s*\.?\s*(minutes?|mins?|hours?|hrs?|h|days?)\s*/i, '')
        .replace(/^[,.\s]+|[,.\s]+$/g, '')
        .trim() || 'Reminder';
    }
    const name = description.length > 50 ? description.substring(0, 47) + '...' : description;
    
    return {
      args: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        description: description,
        schedule_type: 'once',
        minutes_from_now: minutes,
        action_type: 'reminder',
        action_description: description,
        schedule_value: '' // will be computed by create_schedule
      }
    };
  }
  
  // Pattern 2: "at HH:MM" or "at H pm/am" → once schedule
  // Accepts: "remind me at 19:30", "tell me at 3pm", "at 9:30 am remind me"
  const absoluteMatch = lower.match(/(?:at|by)\s+(\d{1,2})[:.]?(\d{2})?\s*(am|pm|a\.m\.|p\.m\.)?/i);
  if (absoluteMatch) {
    let hours = parseInt(absoluteMatch[1], 10);
    const mins = absoluteMatch[2] ? parseInt(absoluteMatch[2], 10) : 0;
    const ampm = (absoluteMatch[3] || '').replace(/\./g, '').toLowerCase();
    
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
    
    const descMatch = cleaned.match(/(?:to|about|that)\s+(.+?)\.?$/i);
    let description: string;
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      description = cleaned
        .replace(/^(remind|alert|notify|tell|ping|nudge|buzz)\s*(me)?\s*/i, '')
        .replace(/(?:at|by)\s+\d{1,2}[:.]?\d{0,2}\s*(am|pm|a\.m\.|p\.m\.)?\s*/i, '')
        .replace(/^[,.\s]+|[,.\s]+$/g, '')
        .trim() || 'Reminder';
    }
    const name = description.length > 50 ? description.substring(0, 47) + '...' : description;
    
    // Build schedule_value as today's date with the target time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const scheduleValue = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    
    return {
      args: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        description: description,
        schedule_type: 'once',
        schedule_value: scheduleValue,
        action_type: 'reminder',
        action_description: description,
      }
    };
  }
  
  // Pattern 3: bare "remind me to X" with no time → default 5 minutes from now
  const bareRemind = lower.match(/^(remind|alert|notify)\s+me\s+(?:to|about|that)\s+(.+?)\.?$/i);
  if (bareRemind) {
    const description = bareRemind[2].trim();
    const name = description.length > 50 ? description.substring(0, 47) + '...' : description;
    return {
      args: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        description: description,
        schedule_type: 'once',
        minutes_from_now: 5,
        action_type: 'reminder',
        action_description: description,
        schedule_value: ''
      }
    };
  }
  
  return null; // Can't parse — give up
}



type ToolTransactionMode = 'dry_run' | 'confirm_required' | 'execute';

type ToolRiskClass = 'read' | 'write' | 'external_effect';
const TOOL_POLICY_CLASS: Record<string, ToolRiskClass> = {
  read_sheet: 'read', search_memory: 'read', list_schedules: 'read',
  write_sheet: 'write', append_sheet: 'write', update_schedule: 'write', delete_schedule: 'write',
  gmail_send: 'external_effect', create_calendar_event: 'external_effect'
};

function enforcePolicyGate(toolName: string, args: Record<string, unknown>): string | null {
  const cls = TOOL_POLICY_CLASS[toolName] || 'read';
  if (cls === 'read') return null;
  const mode = getToolTransactionMode(args);
  // Voice (and other flows) use confirm_required / dry_run before execute — defer to enforceRiskyToolTransactionMode.
  if (mode === 'confirm_required' || mode === 'dry_run') return null;
  if (cls === 'write' && mode !== 'execute') {
    return `POLICY BLOCKED (${cls}): ${toolName} requires transaction_mode=execute.`;
  }
  if (cls === 'external_effect' && mode !== 'execute') {
    return `POLICY BLOCKED (${cls}): ${toolName} can cause external side effects and needs transaction_mode=execute.`;
  }
  return null;
}


const RETRYABLE_TOOL_ERRORS = ['ETIMEDOUT', 'TIMEOUT', '429', '503', 'ECONNRESET', 'network'];
const RISKY_WRITE_TOOLS = new Set(['write_sheet', 'append_sheet', 'gmail_send', 'create_calendar_event', 'update_schedule', 'delete_schedule', 'delete_memory']);

interface ToolContractRule {
  required?: string[];
  enum?: Record<string, string[]>;
}

const TOOL_CONTRACTS: Record<string, ToolContractRule> = {
  create_schedule: { required: ['name', 'schedule_type', 'action_type'], enum: { schedule_type: ['interval', 'daily', 'weekly', 'once'] } },
  update_schedule: { required: ['job_id'] },
  delete_schedule: { required: ['job_id'] },
  write_sheet: { required: ['spreadsheet_id', 'range', 'values'] },
  append_sheet: { required: ['spreadsheet_id', 'range', 'values'] },
  gmail_send: { required: ['to', 'subject', 'body'] },
};

function normalizeToolError(err: any): string {
  const msg = String(err?.message || err || 'Unknown tool error');
  if (/timeout|timed out/i.test(msg)) return 'TOOL_TIMEOUT';
  if (/unauthorized|forbidden|401|403/i.test(msg)) return 'TOOL_AUTH';
  if (/not found|404/i.test(msg)) return 'TOOL_NOT_FOUND';
  if (/rate limit|429/i.test(msg)) return 'TOOL_RATE_LIMIT';
  if (/validation|invalid|required/i.test(msg)) return 'TOOL_VALIDATION';
  return 'TOOL_EXECUTION_FAILED';
}

function shouldRetryToolError(err: any): boolean {
  const msg = String(err?.message || err || '').toLowerCase();
  return RETRYABLE_TOOL_ERRORS.some(code => msg.includes(code.toLowerCase()));
}

function resolveGmailSearchQuery(args: Record<string, unknown>): string {
  const raw = args.query ?? args.q ?? args.search_query ?? args.search;
  return typeof raw === 'string' ? raw.trim() : '';
}

function validateToolContract(toolName: string, args: Record<string, unknown>): void {
  const rule = TOOL_CONTRACTS[toolName];
  if (!rule) return;
  for (const field of rule.required || []) {
    if (args[field] === undefined || args[field] === null || args[field] === '') {
      throw new Error(`Validation failed: ${field} is required for ${toolName}`);
    }
  }
  for (const [field, values] of Object.entries(rule.enum || {})) {
    if (args[field] !== undefined && !values.includes(String(args[field]))) {
      throw new Error(`Validation failed: ${field} must be one of ${values.join(', ')}`);
    }
  }
}

function getToolTransactionMode(args: Record<string, unknown>): ToolTransactionMode {
  const mode = args.transaction_mode;
  if (mode === 'dry_run' || mode === 'confirm_required' || mode === 'execute') return mode;
  return 'execute';
}

// ── Scripted Playwright shortcut gating ─────────────────────────────────────
// browser_task routes plain Outlook inbox-reading asks to the free scripted
// Playwright scraper (src/render/outlookPlaywright.ts) instead of Browser Use
// Cloud. Eligible = the site is Outlook AND the task text contains no action
// verb (the scraper can only log in and list recent inbox messages). Action
// words are matched as explicit inflections, NOT verb-stem + \w*, because the
// stem form false-positives on nouns in ordinary read-only asks: "send\w*"
// matched "sender" and "mark\w*" matched "marketing", silently diverting
// every such request to Browser Use.
const OUTLOOK_SITE_RE = /outlook|microsoft|office\s?365/i;
const OUTLOOK_ACTION_RE = /\b(repl(y|ies|ied|ying)|send(s|ing)?|sent|compos(e|es|ed|ing)|draft(s|ed|ing)?|delet(e|es|ed|ing)|forward(s|ed|ing)?|search(es|ed|ing)?|find(s|ing)?|found|mark(s|ed|ing)?|flag(s|ged|ging)?|mov(e|es|ed|ing)|archiv(e|es|ed|ing)|unsubscrib(e|es|ed|ing)|schedul(e|es|ed|ing)|attach(es|ed|ing|ments?)?)\b/i;

export function isOutlookReadOnlyBrowserTask(siteName: string, taskText: string): boolean {
  return (OUTLOOK_SITE_RE.test(siteName) || OUTLOOK_SITE_RE.test(taskText))
    && !OUTLOOK_ACTION_RE.test(taskText);
}

// Execute tool calls with logging
// Mutable context object threaded through executeToolWithLogging → executeTool
// for per-agent-turn remote browser session lifecycle management.
interface BrowserSessionCtx {
  sessionId?: string;    // ID of the active remote browser session
  apiKey?: string;       // Browser Use API key (needed for cleanup after the turn)
  hasActiveTask: boolean; // true if a task timed out and is still running in the session
  persistSession: boolean; // true = vault-scoped session; do NOT close at turn end
  threadId?: number;     // conversation thread that triggered the browser task — used to deliver async results as a chat message
  channel?: string;      // 'web' | 'telegram' — determines delivery path for async results
}

// ── Idempotency classification ──────────────────────────────────────────────
// SIDE_EFFECTING_TOOLS cause an external/persistent mutation each time they run
// (sending an email, appending a spreadsheet row, creating a calendar event,
// etc.). If the agent retries a turn, or the LLM emits the same tool call twice
// in quick succession, naively re-running these produces *duplicate* side
// effects (two emails, two rows, two events). For these tools we look for a
// recent successful execution with the same idempotency key and return that
// cached result instead of firing the side effect again.
const SIDE_EFFECTING_TOOLS = new Set<string>([
  // Email
  'gmail_send',
  'gmail_draft',
  'gmail_modify',
  // Sheets (additive / mutating)
  'append_sheet',
  'create_sheet',
  'write_sheet',
  // Docs (additive / mutating)
  'create_doc',
  'append_to_doc',
  'rewrite_doc',
  // Calendar
  'create_calendar_event',
  // Schedules
  'create_schedule',
  // Skills
  'create_skill',
  // Unified Docs (UDM) — write/mutating
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

// IDEMPOTENT_TOOLS are read-only / naturally repeatable. Re-running them has no
// external side effect and we always want fresh data, so they are NEVER
// de-duplicated. This set is intentionally explicit for documentation and so
// the dedupe logic can assert it only ever caches side-effecting tools.
const IDEMPOTENT_TOOLS = new Set<string>([
  'list_schedules',
  'search_memory',
  'get_system_status',
  'get_capabilities_summary',
  'read_sheet',
  'list_calendar_events',
  'read_doc',
  'gmail_list',
  'gmail_read',
  'gmail_search',
  'gmail_unread_count',
  'drive_list',
  'drive_search',
  'drive_read_file',
  'web_search',
  'read_url',
  'research',
  'browser_task_status',
  'vault_lookup',
  'list_page_watches',
  'search_youtube',
  'parse_document',
  'compare_documents',
  'search_library',
  'read_library_file',
  'list_skills',
  // Unified Docs (UDM) — read-only
  'udm_list_pages',
  'udm_read_page',
  'udm_search',
  'udm_list_comments',
  'udm_read_page_with_comments',
  'udm_list_agent_comments',
  'udm_read_database',
]);

function enforceRiskyToolTransactionMode(toolName: string, args: Record<string, unknown>): string | null {
  if (!SIDE_EFFECTING_TOOLS.has(toolName)) return null;
  const mode = getToolTransactionMode(args);
  if (mode === 'dry_run') {
    return `DRY RUN: ${toolName} validated. No write action was executed.`;
  }
  if (mode === 'confirm_required') {
    return `CONFIRMATION REQUIRED: ${toolName} is ready. Say yes or go ahead to proceed.`;
  }
  return null;
}

// How long a prior successful side-effecting execution suppresses a duplicate.
const IDEMPOTENCY_WINDOW_MINUTES = 5;

export async function executeToolWithLogging(
  toolName: string,
  args: Record<string, unknown>,
  db: D1Database,
  userId: number,
  meta: {
    agentType?: string;
    providerName?: string;
    channel?: string;
    isEnforcementRetry?: boolean;
    traceId?: string;
  },
  pinHash?: string,
  googleClientId?: string,
  googleClientSecret?: string,
  googleApiKey?: string,
  googleCseId?: string,
  userTimezone?: string,
  llmProvider?: LLMProvider,
  r2Bucket?: R2Bucket,
  cfBindings?: { ai?: Ai; vectorize?: VectorizeIndex; outlookPlaywright?: OutlookPlaywrightFn },
  browserCtx?: BrowserSessionCtx
): Promise<string> {
  const start = Date.now();
  let success = true;
  let errorMessage = '';
  let result = '';
  const traceId = meta.traceId || crypto.randomUUID();
  const idempotencyKey = `${userId}:${toolName}:${JSON.stringify(args)}`;

  // ── Idempotency guard ─────────────────────────────────────────────────────
  // For side-effecting tools only, look for a recent (< IDEMPOTENCY_WINDOW_MINUTES)
  // SUCCESSFUL execution with the identical idempotency key. If one exists, the
  // side effect already happened, so we return that cached result rather than
  // firing it again. Read-only tools (IDEMPOTENT_TOOLS) are never de-duplicated —
  // re-running them is harmless and callers expect fresh data. We also bail out
  // gracefully (execute normally) if the lookup itself fails, so a transient DB
  // error can never block a legitimate tool call.
  const isSideEffecting = SIDE_EFFECTING_TOOLS.has(toolName) && !IDEMPOTENT_TOOLS.has(toolName);
  if (isSideEffecting) {
    try {
      const cached = await db
        .prepare(
          `SELECT tool_result FROM tool_execution_log
           WHERE user_id = ? AND tool_name = ? AND idempotency_key = ? AND success = 1
             AND created_at >= datetime('now', '-${IDEMPOTENCY_WINDOW_MINUTES} minutes')
           ORDER BY created_at DESC
           LIMIT 1`,
        )
        .bind(userId, toolName, idempotencyKey)
        .first<{ tool_result: string }>();
      if (cached) {
        // Return the previously stored result. We intentionally do NOT write a
        // new log row here: this call performed no work, and re-logging would
        // pollute the audit trail and reset the dedupe window.
        return cached.tool_result || '';
      }
    } catch {
      // Lookup failed (e.g. DB hiccup or column not yet migrated). Fall through
      // and execute the tool normally — correctness takes priority over dedupe.
    }
  }

  try {
    validateToolContract(toolName, args);
    const policyResult = enforcePolicyGate(toolName, args);
    if (policyResult) {
      result = policyResult;
      return result;
    }

    const modeResult = enforceRiskyToolTransactionMode(toolName, args);
    if (modeResult) {
      result = modeResult;
      return result;
    }

    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        // Browser tasks need their own budget: browser_task polls for up to 5 min,
        // browser_task_status polls for up to 30s. The generic 25s cap kills both.
        const timeoutMs = toolName === 'browser_task' ? 310000  // 5m10s — matches DEFAULT_TIMEOUT_MS + headroom
          : toolName === 'browser_task_status' ? 35000
          : toolName === 'research' ? 310000
          : 90000; // generic tools (was 25s on Workers)
        result = await Promise.race([
          executeTool(toolName, args, db, userId, pinHash, googleClientId, googleClientSecret, googleApiKey, googleCseId, userTimezone, llmProvider, r2Bucket, cfBindings, meta.channel, browserCtx),
          new Promise<string>((_, reject) => setTimeout(() => reject(new Error('Tool timed out')), timeoutMs)),
        ]);
        break;
      } catch (err: any) {
        if (attempt < maxAttempts && shouldRetryToolError(err)) {
          await new Promise(r => setTimeout(r, 250 * attempt));
          continue;
        }
        throw err;
      }
    }
    return result;
  } catch (err: any) {
    success = false;
    errorMessage = `${normalizeToolError(err)}: ${err.message || 'Unknown error'}`;
    throw new Error(errorMessage);
  } finally {
    const latency = Date.now() - start;
    try {
      await db.prepare(
        `INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        userId,
        meta.agentType || null,
        meta.providerName || null,
        toolName,
        JSON.stringify({ ...args, _idempotency_key: idempotencyKey, _trace_id: traceId }).substring(0, 2000),
        (success ? result : '').substring(0, 500),
        success ? 1 : 0,
        errorMessage || null,
        latency,
        meta.isEnforcementRetry ? 1 : 0,
        meta.channel || 'web',
        // Persist the key in its own indexed column so the idempotency lookup
        // above is an exact match. Only successful rows (success=1) are ever
        // treated as a cache hit, so genuine failures still allow retries.
        idempotencyKey
      ).run();
    } catch (_) {
      // Non-critical — don't break tool execution if logging fails
    }
  }
}

// After each agentic turn, prior tool-result messages are kept in history so the
// LLM retains context, but their full content is no longer needed — the LLM already
// processed them.  Leaving huge parse_document / drive_read_file blobs (10k–20k tokens)
// in every subsequent turn balloons context and quickly exhausts rate-limit windows.
// This trims any prior user message that exceeds the threshold, preserving a short
// prefix so the LLM still knows what tool ran and what it generally returned.
function trimLargeHistoryMessages(messages: Array<{ role: string; content: any }>): void {
  // Tiered trimming: older messages get a stricter char cap to reduce per-turn input tokens.
  // Never trim the last message — it is the live input for the current turn.
  // Age = distance from the end (1 = second-to-last, 2 = third-to-last, …)
  const total = messages.length;
  for (let i = 0; i < total - 1; i++) {
    const m = messages[i];
    if (m.role !== 'user' || typeof m.content !== 'string') continue;
    const age = (total - 1) - i;
    const limit = age <= 2 ? 12000 : age <= 4 ? 5000 : 2000;
    if (m.content.length > limit) {
      messages[i] = { ...m, content: m.content.substring(0, limit) + '\n[...truncated in history to reduce context size]' };
    }
  }
}


// RFC 4180-compliant CSV parser → string[][]
function parseCsvToRows(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  const len = csv.length;

  while (i < len) {
    const ch = csv[i];
    if (inQuotes) {
      if (ch === '"') {
        if (csv[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(field); field = ''; i++; continue; }
    if (ch === '\r' && csv[i + 1] === '\n') { row.push(field); rows.push(row); row = []; field = ''; i += 2; continue; }
    if (ch === '\n' || ch === '\r') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += ch; i++;
  }
  if (field || row.length) { row.push(field); rows.push(row); }

  // Drop trailing empty rows (e.g. a trailing newline)
  while (rows.length && rows[rows.length - 1].every(c => c === '')) rows.pop();
  return rows;
}

// Execute tool calls
async function executeTool(
  toolName: string,
  args: Record<string, unknown>,
  db: D1Database,
  userId: number,
  pinHash?: string,
  googleClientId?: string,
  googleClientSecret?: string,
  googleApiKey?: string,
  googleCseId?: string,
  userTimezone?: string,
  llmProvider?: LLMProvider,
  r2Bucket?: R2Bucket,
  cfBindings?: { ai?: Ai; vectorize?: VectorizeIndex; outlookPlaywright?: OutlookPlaywrightFn },
  channel?: string,
  browserCtx?: BrowserSessionCtx
): Promise<string> {
  const memory = new MemoryService(db);

  switch (toolName) {
    case 'create_schedule': {
      const now = new Date();
      let nextRun: Date;
      const tz = userTimezone || 'UTC';
      
      // PREFERRED PATH: minutes_from_now — server computes the exact time
      // This avoids LLM time-calculation errors (anchoring on conversation history, wrong timezone math)
      if (args.minutes_from_now && typeof args.minutes_from_now === 'number' && args.minutes_from_now > 0) {
        nextRun = new Date(now.getTime() + (args.minutes_from_now as number) * 60 * 1000);
        // Auto-set schedule_value for record-keeping
        const userTimeStr = nextRun.toLocaleString('en-US', { timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        // Format: MM/DD/YYYY, HH:MM → YYYY-MM-DD HH:MM
        const parts = userTimeStr.split(', ');
        const [m, d, y] = (parts[0] || '').split('/');
        args.schedule_value = `${y}-${m}-${d} ${parts[1] || '00:00'}`;
        args.schedule_type = 'once'; // Force once for relative-time
      } else if (args.schedule_type === 'interval') {
        const minutes = parseInt(args.schedule_value as string, 10);
        nextRun = new Date(now.getTime() + minutes * 60 * 1000);
      } else if (args.schedule_type === 'daily' && args.action_type === 'reminder') {
        // Guard: coerce daily→once for reminders unless user explicitly requested recurrence.
        // LLMs frequently choose 'daily' for single-occurrence reminders ("remind me at 8:45am").
        const nameAndDesc = `${args.name || ''} ${args.action_description || ''}`.toLowerCase();
        const recurringKeywords = /\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/;
        if (!recurringKeywords.test(nameAndDesc)) {
          // Treat as once: use the HH:MM from schedule_value with today's date in user's tz
          const [hours, mins] = (args.schedule_value as string).split(':').map(Number);
          const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
          const userNow = new Date(userNowStr);
          const candidate = new Date(userNow);
          candidate.setHours(hours, mins, 0, 0);
          if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
          const pad = (n: number) => String(n).padStart(2, '0');
          const yy = candidate.getFullYear();
          const mm = pad(candidate.getMonth() + 1);
          const dd = pad(candidate.getDate());
          args.schedule_value = `${yy}-${mm}-${dd} ${pad(hours)}:${pad(mins)}`;
          args.schedule_type = 'once';
          // Fall through to once handler below
          const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
          const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
          const offsetMs = utcRef.getTime() - tzRef.getTime();
          nextRun = new Date(candidate.getTime() + offsetMs);
        } else {
          // Genuinely recurring daily reminder
          const [hours, mins] = (args.schedule_value as string).split(':').map(Number);
          const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
          const userNow = new Date(userNowStr);
          const candidate = new Date(userNow);
          candidate.setHours(hours, mins, 0, 0);
          if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
          const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
          const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
          const offsetMs = utcRef.getTime() - tzRef.getTime();
          nextRun = new Date(candidate.getTime() + offsetMs);
        }
      } else if (args.schedule_type === 'daily') {
        const [hours, mins] = (args.schedule_value as string).split(':').map(Number);
        const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
        const userNow = new Date(userNowStr);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
        const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
        const offsetMs = utcRef.getTime() - tzRef.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
      } else if (args.schedule_type === 'weekly') {
        const [dayStr, timeStr] = (args.schedule_value as string).split(' ');
        const [hours, mins] = (timeStr || '00:00').split(':').map(Number);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const targetDay = days.findIndex(d => d.toLowerCase() === dayStr.toLowerCase());
        
        const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
        const userNow = new Date(userNowStr);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        
        let daysToAdd = (targetDay - candidate.getDay() + 7) % 7;
        if (daysToAdd === 0 && candidate <= userNow) {
          daysToAdd = 7;
        }
        candidate.setDate(candidate.getDate() + daysToAdd);
        
        const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
        const offsetMs = utcRef.getTime() - tzRef.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
      } else if (args.schedule_type === 'once') {
        // YYYY-MM-DD HH:MM
        const [dateStr, timeStr] = (args.schedule_value as string).split(' ');
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hours, mins] = (timeStr || '00:00').split(':').map(Number);
        
        const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
        const userNow = new Date(userNowStr);
        const candidate = new Date(userNow);
        candidate.setFullYear(year, month - 1, day);
        candidate.setHours(hours, mins, 0, 0);
        
        const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
        const offsetMs = utcRef.getTime() - tzRef.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
        
        // PAST-TIME GUARD: If the computed UTC time is already past (or within 5s),
        // the LLM used a stale or wrong time. Fire 2 minutes from now instead
        // of silently scheduling in the past (which causes immediate cron fire).
        const twoMinutesFromNow = new Date(now.getTime() + 2 * 60 * 1000);
        if (nextRun.getTime() < now.getTime() + 5 * 1000) {
          // Log the correction for debugging
          const originalTime = nextRun.toISOString();
          nextRun = twoMinutesFromNow;
          // Return a warning so the LLM can inform the user
          const warningNote = ` [Note: The requested time ${args.schedule_value} in ${tz} resolved to ${originalTime} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${nextRun.toISOString()}.]`;
          // Store the warning in a variable that gets appended to the return message
          (args as any)._pastTimeWarning = warningNote;
        }
      } else {
        nextRun = new Date(now.getTime() + 60 * 60 * 1000);
      }

      // Recurring email-send guard: prevent creating interval/daily/weekly schedules whose
      // description involves sending emails to external recipients. Each cron tick would
      // spam the recipient. Coerce to 'once' — the user almost certainly meant one-time.
      const isRecurringType = args.schedule_type === 'interval' || args.schedule_type === 'daily' || args.schedule_type === 'weekly';
      if (isRecurringType && args.action_type === 'custom') {
        const desc = `${args.name || ''} ${args.action_description || args.description || ''}`.toLowerCase();
        const emailSendPattern = /\b(send|forward)\b.{0,40}\b(email|mail)\b|\bemail.{0,20}\bto\b|\bgmail_send\b/;
        if (emailSendPattern.test(desc)) {
          args.schedule_type = 'once';
        }
      }

      // action_type guard: LLMs sometimes pick action_type='custom' for plain reminders
      // ("remind me in 2 mins to go to Gym"). On firing, custom one-off schedules become
      // state='completed' and disappear from Action Center. Coerce to 'reminder' when the
      // description has no actionable verb so the row stays visible until dismissed.
      if (args.action_type === 'custom' && args.schedule_type === 'once') {
        const desc = `${args.name || ''} ${args.action_description || args.description || ''}`.toLowerCase();
        const actionablePattern = /\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;
        if (!actionablePattern.test(desc)) {
          args.action_type = 'reminder';
        }
      }

      // Dedup guard: prevent the LLM from creating two identical schedules in the same
      // conversation turn (seen with Anthropic calling create_schedule twice for the same reminder).
      const dupCheck = await db.prepare(
        `SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1`
      ).bind(userId, args.name as string, args.schedule_type as string, args.schedule_value as string).first<{ id: number }>();
      if (dupCheck) {
        const humanTime = nextRun.toLocaleString('en-US', {
          timeZone: tz, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true,
        });
        return `Schedule already exists: "${args.name}" is already set for ${humanTime} (${tz}). No duplicate created.`;
      }

      await db.prepare(
        `INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`
      ).bind(
        userId,
        args.name as string,
        args.description || args.action_description || '',
        args.schedule_type as string,
        args.schedule_value as string,
        args.action_type as string,
        JSON.stringify({ description: args.action_description || args.description || '' }),
        nextRun.toISOString()
      ).run();

      const pastTimeWarning = (args as any)._pastTimeWarning || '';
      // Include human-readable time in user's timezone so LLM doesn't hallucinate
      const humanTime = nextRun.toLocaleString('en-US', { 
        timeZone: tz, 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true 
      });
      return `Schedule created: "${args.name}" — ${args.schedule_type}. Will fire at ${humanTime} (${tz}). [UTC: ${nextRun.toISOString()}]${pastTimeWarning}. IMPORTANT: Use the exact time "${humanTime}" when confirming to the user — do NOT calculate or guess the time yourself.`;
    }

    case 'list_schedules': {
      const result = await db.prepare(
        `SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC`
      ).bind(userId).all<CronJobRecord>();
      
      const jobs = result.results || [];
      if (jobs.length === 0) return 'No scheduled tasks found.';
      
      return jobs.map(j => 
        `[ID:${j.id}] ${j.enabled ? '▶' : '⏸'} "${j.name}" — [${j.schedule_type}] ${j.schedule_value} — ${j.action_type} — state: ${j.state || 'active'} — next: ${j.next_run || 'N/A'}`
      ).join('\n');
    }

    case 'toggle_schedule': {
      const enabled = args.enabled ? 1 : 0;
      const newState = enabled ? 'active' : 'paused';
      await db.prepare(
        `UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(enabled, newState, args.job_id as number, userId).run();
      return `Schedule ${args.job_id} ${enabled ? 'enabled (active)' : 'paused'}.`;
    }

    case 'update_schedule_state': {
      const validStates = ['created', 'active', 'reminding', 'paused', 'completed'];
      const newState = args.state as string;
      if (!validStates.includes(newState)) {
        return `Invalid state "${newState}". Valid states: ${validStates.join(', ')}`;
      }
      
      // If completing, also disable
      const enabled = newState === 'completed' || newState === 'paused' ? 0 : 1;
      await db.prepare(
        `UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(newState, enabled, args.job_id as number, userId).run();
      return `Schedule ${args.job_id} state updated to "${newState}".`;
    }

    case 'update_schedule': {
      const jobId = args.job_id as number;
      const tz = userTimezone || 'UTC';
      const now = new Date();

      // Build update fields
      const updates: string[] = ['updated_at = CURRENT_TIMESTAMP'];
      const binds: any[] = [];

      if (args.name) { updates.push('name = ?'); binds.push(args.name as string); }
      if (args.description) { updates.push('description = ?'); binds.push(args.description as string); }

      // Reschedule if time-related args are provided
      let nextRun: Date | null = null;
      let schedType = args.schedule_type as string | undefined;
      let schedValue = args.schedule_value as string | undefined;

      if (args.minutes_from_now && typeof args.minutes_from_now === 'number' && args.minutes_from_now > 0) {
        nextRun = new Date(now.getTime() + (args.minutes_from_now as number) * 60 * 1000);
        const userTimeStr = nextRun.toLocaleString('en-US', { timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        const parts = userTimeStr.split(', ');
        const [m, d, y] = (parts[0] || '').split('/');
        schedValue = `${y}-${m}-${d} ${parts[1] || '00:00'}`;
        schedType = 'once';
      } else if (schedType && schedValue) {
        if (schedType === 'interval') {
          nextRun = new Date(now.getTime() + parseInt(schedValue, 10) * 60 * 1000);
        } else if (schedType === 'daily') {
          const [hours, mins] = schedValue.split(':').map(Number);
          const userNow = new Date(now.toLocaleString('en-US', { timeZone: tz }));
          const candidate = new Date(userNow);
          candidate.setHours(hours, mins, 0, 0);
          if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
          const offsetMs = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' })).getTime() - new Date(candidate.toLocaleString('en-US', { timeZone: tz })).getTime();
          nextRun = new Date(candidate.getTime() + offsetMs);
        } else if (schedType === 'weekly') {
          const [dayStr, timeStr] = schedValue.split(' ');
          const [hours, mins] = (timeStr || '00:00').split(':').map(Number);
          const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          const targetDay = days.findIndex(d => d.toLowerCase() === dayStr.toLowerCase());
          const userNow = new Date(now.toLocaleString('en-US', { timeZone: tz }));
          const candidate = new Date(userNow);
          candidate.setHours(hours, mins, 0, 0);
          let daysToAdd = (targetDay - candidate.getDay() + 7) % 7;
          if (daysToAdd === 0 && candidate <= userNow) daysToAdd = 7;
          candidate.setDate(candidate.getDate() + daysToAdd);
          const offsetMs = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' })).getTime() - new Date(candidate.toLocaleString('en-US', { timeZone: tz })).getTime();
          nextRun = new Date(candidate.getTime() + offsetMs);
        } else if (schedType === 'once') {
          const [dateStr, timeStr] = schedValue.split(' ');
          const [year, month, day] = dateStr.split('-').map(Number);
          const [hours, mins] = (timeStr || '00:00').split(':').map(Number);
          const userNow = new Date(now.toLocaleString('en-US', { timeZone: tz }));
          const candidate = new Date(userNow);
          candidate.setFullYear(year, month - 1, day);
          candidate.setHours(hours, mins, 0, 0);
          const offsetMs = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' })).getTime() - new Date(candidate.toLocaleString('en-US', { timeZone: tz })).getTime();
          nextRun = new Date(candidate.getTime() + offsetMs);
          if (nextRun.getTime() < now.getTime() + 60 * 1000) {
            nextRun = new Date(now.getTime() + 2 * 60 * 1000);
          }
        }
      }

      if (schedType) { updates.push('schedule_type = ?'); binds.push(schedType); }
      if (schedValue) { updates.push('schedule_value = ?'); binds.push(schedValue); }
      if (nextRun) { updates.push('next_run = ?'); binds.push(nextRun.toISOString()); }

      if (updates.length === 1) {
        return 'No changes provided. Specify name, description, or schedule fields to update.';
      }

      binds.push(jobId, userId);
      await db.prepare(
        `UPDATE cron_jobs SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`
      ).bind(...binds).run();

      const humanTime = nextRun
        ? nextRun.toLocaleString('en-US', { timeZone: tz, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
        : null;

      return `Schedule ${jobId} updated.${humanTime ? ` New fire time: ${humanTime} (${tz}).` : ''} IMPORTANT: Use this exact time "${humanTime}" when confirming to the user.`;
    }

    case 'delete_schedule': {
      await db.prepare(
        `DELETE FROM cron_jobs WHERE id = ? AND user_id = ?`
      ).bind(args.job_id as number, userId).run();
      return `Schedule ${args.job_id} deleted.`;
    }

    case 'store_memory': {
      const importance = (args.importance as number) || 5;
      const memType = (args.type as string) === 'task' ? 'preference' : args.type as MemoryRecord['type']; // Guard: tasks no longer stored in memory
      // High-importance permanent rules go to working memory (injected into every prompt)
      const tier = importance >= 7 ? 'working' : 'long_term';
      await memory.store(userId, memType, args.title as string, args.content as string, importance, tier);
      return `Stored in ${tier === 'working' ? 'working' : 'long-term'} memory: [${memType}] ${args.title} (importance: ${importance})`;
    }

    case 'search_memory': {
      const results = await memory.search(userId, args.query as string);
      if (results.length === 0) return 'No matching memories found.';
      return results.map(m => `[id:${m.id}] [${m.tier || 'long_term'}] [${m.type}] **${m.title}**: ${m.content}`).join('\n');
    }

    case 'delete_memory': {
      await memory.remove(args.id as number, userId);
      return `Memory entry ${args.id} deleted.`;
    }

    case 'update_memory': {
      await memory.update(args.id as number, userId, args.content as string);
      return `Memory entry ${args.id} updated.`;
    }

    case 'get_system_status': {
      const jobCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1`
      ).bind(userId).first<{ cnt: number }>();

      const memCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?`
      ).bind(userId).first<{ cnt: number }>();

      const workingMemCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'`
      ).bind(userId).first<{ cnt: number }>();

      const msgCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?`
      ).bind(userId).first<{ cnt: number }>();

      // Error count
      const errCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0`
      ).bind(userId).first<{ cnt: number }>();

      return `System Status:
- Active schedules: ${jobCount?.cnt || 0}
- Memory: ${workingMemCount?.cnt || 0} working / ${memCount?.cnt || 0} total
- Total messages: ${msgCount?.cnt || 0}
- Unread errors: ${errCount?.cnt || 0}`;
    }

    case 'get_capabilities_summary': {
      const [workspaceCred, skillsRow, scheduleRow, digestRow, docRow, vaultRow] = await Promise.all([
        db.prepare(`SELECT 1 FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`).bind(userId).first(),
        db.prepare(`SELECT COUNT(*) as cnt, SUM(is_auto) as auto_cnt FROM user_skills WHERE user_id = ? AND enabled = 1`).bind(userId).first<{ cnt: number; auto_cnt: number }>(),
        db.prepare(`SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1`).bind(userId).first<{ cnt: number }>(),
        db.prepare(`SELECT COUNT(*) as cnt FROM digest_configs WHERE user_id = ? AND enabled = 1`).bind(userId).first<{ cnt: number }>(),
        db.prepare(`SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?`).bind(userId).first<{ cnt: number }>(),
        db.prepare(`SELECT COUNT(*) as cnt FROM site_credentials WHERE user_id = ?`).bind(userId).first<{ cnt: number }>().catch(() => null),
      ]);

      const workspaceStatus = workspaceCred
        ? 'Connected — Gmail, Calendar, Sheets, Docs, and Drive.'
        : 'Not connected yet — connect your Google Account in Settings to enable Gmail, Calendar, Sheets, Docs, and Drive.';
      const skillsStatus = (skillsRow?.cnt ?? 0) > 0
        ? `${skillsRow!.cnt} learned (${skillsRow!.auto_cnt ?? 0} picked up automatically from repeated behavior, the rest created on request).`
        : 'None yet — ask to save one, or I\'ll build one automatically once I notice you doing the same multi-step thing three times.';
      const scheduleStatus = `${scheduleRow?.cnt ?? 0} active reminder(s)/recurring check(s)`;
      const digestStatus = (digestRow?.cnt ?? 0) > 0 ? `, ${digestRow!.cnt} proactive digest(s) enabled` : '';
      const docStatus = (docRow?.cnt ?? 0) > 0
        ? `${docRow!.cnt} file(s) in your document library — I can read, search, and compare them.`
        : 'Nothing uploaded yet — upload a file and I can read, search, or compare it against another.';
      const vaultStatus = vaultRow && (vaultRow.cnt ?? 0) > 0
        ? ` I also have ${vaultRow.cnt} saved login(s) in your Secret Vault for browser automation on sites that require sign-in.`
        : '';

      return `Here's what's actually wired up for you right now — not a generic list, this reflects your account:

**Workspace** — ${workspaceStatus}
**Memory** — Always on. I remember preferences, facts, and decisions across every conversation, and recall them without being asked.
**Skills** — ${skillsStatus}
**Scheduling & Proactivity** — ${scheduleStatus}${digestStatus}.
**Research** — Web search and deep research are always available, plus real browser automation for sites that need a login.${vaultStatus}
**Documents** — ${docStatus} I can also compare two documents and tell you what changed.

Ask for anything in plain language — I'll figure out which of these to use.`;
    }

    // === Google Workspace Tools ===

    case 'read_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const spreadsheetId = args.spreadsheet_id as string;
        let range = args.range as string;

        // Always fetch metadata first — so the LLM knows all available tabs
        const meta = await google.sheets.getMetadata(spreadsheetId);
        const allTabs = meta.sheets;

        // If range has no sheet prefix, use the first tab
        if (!range.includes('!')) {
          range = `${allTabs[0]}!${range}`;
        }

        let values: string[][];
        try {
          values = await google.sheets.readRange(spreadsheetId, range);
        } catch (firstErr: any) {
          // If range failed (wrong tab name), retry with the first tab
          if (firstErr.message?.includes('Unable to parse range') || firstErr.message?.includes('400')) {
            const pureRange = range.includes('!') ? range.split('!')[1] : range;
            range = `${allTabs[0]}!${pureRange}`;
            values = await google.sheets.readRange(spreadsheetId, range);
          } else {
            throw firstErr;
          }
        }

        // Build response with tab info so LLM can navigate multi-tab sheets
        let header = `[Spreadsheet: "${meta.title}" | Reading tab: "${range.split('!')[0]}" | All tabs in this spreadsheet: ${allTabs.map(t => `"${t}"`).join(', ')}]\n`;
        if (allTabs.length > 1) {
          header += `[To read a different tab, call read_sheet again with range like "${allTabs[1]}!A1:Z500"]\n`;
        }

        if (values.length === 0) return header + 'No data found in the specified range.';
        // Format as readable table
        return header + values.map(row => row.join('\t| ')).join('\n');
      } catch (err: any) {
        await logError(db, userId, 'google', 'read_sheet', err.message);
        return `Failed to read sheet: ${err.message}`;
      }
    }

    case 'write_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Pre-check connection so we can save pending data before failing
        const connStatus = await google.isConnected();
        if (!connStatus.connected) {
          if (args.spreadsheet_id && args.range && args.values) {
            try {
              const memory = new MemoryService(db);
              const valuesJson = JSON.stringify(args.values);
              await memory.store(
                userId,
                'context',
                `Pending sheet write: ${args.spreadsheet_id} — ${args.range}`,
                JSON.stringify({
                  tool: 'write_sheet',
                  spreadsheet_id: args.spreadsheet_id as string,
                  range: args.range as string,
                  values: valuesJson.length > 15000 ? '[[truncated — re-provide values on retry]]' : args.values,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.' +
            (args.spreadsheet_id && args.range
              ? '\n\nThe sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.'
              : '');
        }

        const values = args.values as string[][];
        let range = args.range as string;

        // Auto-pad rows with empty strings to clear stale data in columns beyond the written range.
        // This prevents orphaned data (e.g., "Kava" in column E when headers are only A-D).
        // Determine the max column from the range (e.g., "A1:D8" → 4 columns, pad to clear E-H)
        const maxCols = Math.max(...values.map(row => row.length));
        const CLEAR_EXTRA_COLS = 4; // Clear 4 columns beyond the written data
        const targetCols = maxCols + CLEAR_EXTRA_COLS;
        const paddedValues = values.map(row => {
          const padded = [...row];
          while (padded.length < targetCols) padded.push('');
          return padded;
        });
        
        // Expand the range to include the extra clear columns
        // Parse range like "Expenses!A1:D8" or "A1:D8"
        const rangeMatch = range.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);
        if (rangeMatch) {
          const sheetPrefix = rangeMatch[1] || '';
          const startCol = rangeMatch[2];
          const startRow = rangeMatch[3];
          const endRow = rangeMatch[5];
          // Convert target column count to letter (A=1, B=2, ..., Z=26)
          const startColNum = startCol.toUpperCase().charCodeAt(0) - 64;
          const endColNum = startColNum + targetCols - 1;
          const endColLetter = endColNum <= 26 ? String.fromCharCode(64 + endColNum) : 'Z';
          range = `${sheetPrefix}${startCol}${startRow}:${endColLetter}${endRow}`;
        }
        
        const result = await google.sheets.writeRange(
          args.spreadsheet_id as string,
          range,
          paddedValues
        );
        // Auto-delete any stale pending-write memory for this spreadsheet so it isn't
        // re-executed alongside a future new request, causing duplicate writes.
        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending sheet write: ${args.spreadsheet_id as string}`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending sheet write: ${args.spreadsheet_id as string}`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }
        return `Written ${result.updatedCells} cells to ${range}.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'write_sheet', err.message);
        return `Failed to write sheet: ${err.message}`;
      }
    }

    case 'append_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Pre-check connection so we can save pending rows before failing
        const connStatus = await google.isConnected();
        if (!connStatus.connected) {
          if (args.spreadsheet_id && args.range && args.values) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending sheet append: ${args.spreadsheet_id} — ${args.range}`,
                JSON.stringify({
                  tool: 'append_sheet',
                  spreadsheet_id: args.spreadsheet_id as string,
                  range: args.range as string,
                  values: args.values,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.' +
            (args.spreadsheet_id && args.range
              ? '\n\nThe append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.'
              : '');
        }

        const result = await google.sheets.appendRows(
          args.spreadsheet_id as string,
          args.range as string,
          args.values as string[][]
        );
        // Auto-delete any stale pending-append memory for this spreadsheet so it isn't
        // re-executed alongside a future new request, causing duplicate entries.
        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending sheet append: ${args.spreadsheet_id as string}`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending sheet append: ${args.spreadsheet_id as string}`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }
        return `Appended ${result.updatedCells} cells to ${args.range}.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'append_sheet', err.message);
        return `Failed to append to sheet: ${err.message}`;
      }
    }

    case 'create_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Check if Google is connected
        const status = await google.isConnected();
        if (!status.connected) {
          if (args.title) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending spreadsheet create: "${args.title}"`,
                JSON.stringify({
                  tool: 'create_sheet',
                  title: args.title as string,
                  sheet_names: (args.sheet_names as string[] | undefined) ?? null,
                  folder_name: (args.folder_name as string | undefined) ?? null,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.' +
            (args.title
              ? '\n\nThe spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I\'ll complete this automatically.'
              : '');
        }

        const result = await google.sheets.createSpreadsheet(
          args.title as string,
          args.sheet_names as string[] | undefined
        );

        // Move to folder if specified
        let folderInfo = '';
        if (args.folder_name) {
          try {
            const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
            const folder = await moveFileToFolder(token, result.spreadsheetId, args.folder_name as string);
            folderInfo = `\nFolder: "${folder.folderName}"`;
          } catch (folderErr: any) {
            folderInfo = `\n(Note: spreadsheet saved to Drive root — could not place in folder "${args.folder_name}": ${folderErr.message})`;
          }
        }

        // Auto-remember the spreadsheet so user can reference it by name later
        try {
          const memory = new MemoryService(db);
          await memory.store(userId, 'context', `Spreadsheet: ${args.title}`, `Spreadsheet ID: ${result.spreadsheetId} | URL: ${result.url} | Sheets: ${(args.sheet_names as string[] || ['Sheet1']).join(', ')}`, 7, 'working');
        } catch { /* non-critical */ }

        return `Spreadsheet created: "${args.title}"${folderInfo}\nID: ${result.spreadsheetId}\nURL: ${result.url}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_sheet', err.message);
        return `Failed to create spreadsheet: ${err.message}`;
      }
    }

    case 'list_calendar_events': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const calendarId = (args.calendar_id as string) || 'primary';
        const daysAhead = (args.days_ahead as number) || 7;

        const now = new Date();
        const future = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

        const events = await google.calendar.listEvents(calendarId, {
          timeMin: now.toISOString(),
          timeMax: future.toISOString(),
          query: args.query as string | undefined,
        });

        if (events.length === 0) return `No events found in the next ${daysAhead} days.`;

        return events.map(e => {
          const start = e.start.dateTime || e.start.date || 'TBD';
          const end = e.end.dateTime || e.end.date || '';
          const loc = e.location ? ` 📍 ${e.location}` : '';
          const attendees = e.attendees?.map(a => a.email).join(', ') || '';
          return `• ${e.summary} — ${start} to ${end}${loc}${attendees ? `\n  Attendees: ${attendees}` : ''}`;
        }).join('\n');
      } catch (err: any) {
        await logError(db, userId, 'google', 'list_calendar', err.message);
        return `Failed to list events: ${err.message}`;
      }
    }

    case 'create_calendar_event': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Pre-check connection so we can save the event before failing
        const status = await google.isConnected();
        if (!status.connected) {
          if (args.summary && args.start_datetime && args.end_datetime) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending calendar event: "${args.summary}"`,
                JSON.stringify({
                  tool: 'create_calendar_event',
                  summary: args.summary as string,
                  description: (args.description as string | undefined) ?? null,
                  location: (args.location as string | undefined) ?? null,
                  start_datetime: args.start_datetime as string,
                  end_datetime: args.end_datetime as string,
                  attendees: (args.attendees as string[] | undefined) ?? null,
                  calendar_id: (args.calendar_id as string | undefined) ?? null,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.' +
            (args.summary && args.start_datetime
              ? '\n\nThe calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I\'ll add it to your calendar.'
              : '');
        }

        const calendarId = (args.calendar_id as string) || 'primary';

        const event = await google.calendar.createEvent(calendarId, {
          summary: args.summary as string,
          description: args.description as string | undefined,
          location: args.location as string | undefined,
          startDateTime: args.start_datetime as string,
          endDateTime: args.end_datetime as string,
          attendees: args.attendees as string[] | undefined,
        });

        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending calendar event: "${args.summary as string}"`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending calendar event: "${args.summary as string}"`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }

        return `Event created: "${event.summary}"\nID: ${event.id}\nStart: ${event.start.dateTime || event.start.date}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_event', err.message);
        return `Failed to create event: ${err.message}`;
      }
    }

    case 'create_doc': {
      if (!pinHash) return 'Authentication context unavailable.';

      const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

      // Check if Google is connected
      const status = await google.isConnected();
      if (!status.connected) {
        if (args.title && args.content) {
          try {
            const memory = new MemoryService(db);
            await memory.store(
              userId,
              'context',
              `Pending Google Doc save: "${args.title}"`,
              JSON.stringify({
                tool: 'create_doc',
                title: args.title as string,
                content: args.content as string,
                folder_name: (args.folder_name as string | undefined) ?? null,
              }),
              9,
              'working'
            );
          } catch { /* non-critical */ }
          // Also surface as an Action Center item so user doesn't forget
          try {
            await db.prepare(
              `INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`
            ).bind(
              userId,
              `Pending doc: "${args.title}"`,
              'Google not connected — reconnect then say "save the pending document".',
              `pending_doc_${args.title}`,
              JSON.stringify({ tool: 'create_doc', title: args.title, folder_name: args.folder_name ?? null })
            ).run();
          } catch { /* non-critical */ }
        }
        return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.' +
          (args.title && args.content
            ? '\n\nYour content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I\'ll complete this automatically.'
            : '');
      }

      // Step 1: create the document — fail fast if this errors
      let docResult: { documentId: string; url: string };
      try {
        docResult = await google.docs.createDocument(args.title as string);
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_doc', err.message);
        return `Failed to create document: ${err.message}`;
      }

      // Step 2: write initial content — partial-success if this errors (doc exists, content failed)
      if (args.content) {
        const content = args.content as string;
        const writeDocContent = async () => {
          // Long essays generate huge batchUpdate payloads; plain append is more reliable
          if (content.length > 12000) {
            await google.docs.appendText(docResult.documentId, content);
          } else {
            await google.docs.appendFormattedContent(docResult.documentId, content);
          }
        };
        try {
          await writeDocContent();
        } catch (appendErr: any) {
          // Fallback: formatted batch failed — retry as plain text so the doc is not empty
          try {
            await google.docs.appendText(docResult.documentId, content);
          } catch (plainErr: any) {
            await logError(db, userId, 'google', 'create_doc_append', plainErr.message);
            return `Document created but content could not be written (${plainErr.message}).\nID: ${docResult.documentId}\nURL: ${docResult.url}\n\nUse append_to_doc with the document ID above to add content.`;
          }
          await logError(db, userId, 'google', 'create_doc_append_fallback',
            `Formatted append failed, used plain text: ${appendErr.message}`);
        }
      }

      // Move to folder if specified
      let folderInfo = '';
      if (args.folder_name) {
        try {
          const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
          const folder = await moveFileToFolder(token, docResult.documentId, args.folder_name as string);
          folderInfo = `\nFolder: "${folder.folderName}"`;
        } catch (folderErr: any) {
          folderInfo = `\n(Note: document saved to Drive root — could not place in folder "${args.folder_name}": ${folderErr.message})`;
        }
      }

      // Auto-remember the document so user can reference it by name later
      try {
        const memory = new MemoryService(db);
        await memory.store(userId, 'context', `Document: ${args.title}`, `Document ID: ${docResult.documentId} | URL: ${docResult.url}`, 6, 'working');
      } catch { /* non-critical */ }

      // Index in document_library so it appears in the Documents tab
      try {
        const docContent = args.content as string | undefined;
        await db.prepare(
          `INSERT OR IGNORE INTO document_library (user_id, source, drive_file_id, name, summary, extracted_text, status)
           VALUES (?, 'drive', ?, ?, ?, ?, 'parsed')`
        ).bind(
          userId,
          docResult.documentId,
          args.title as string,
          docContent ? docContent.substring(0, 500) : null,
          docContent ? docContent.substring(0, 50000) : null
        ).run();
      } catch { /* non-critical — doc is created regardless */ }

      // Auto-delete any stale pending-create memory so it isn't re-executed on a future request
      try {
        const memory = new MemoryService(db);
        const pendingEntries = await memory.search(userId, `Pending Google Doc save: "${args.title as string}"`);
        for (const entry of pendingEntries) {
          if (entry.title.startsWith(`Pending Google Doc save: "${args.title as string}"`)) {
            await memory.remove(entry.id, userId);
          }
        }
      } catch { /* non-critical */ }

      return `Document created: "${args.title}"${folderInfo}\nID: ${docResult.documentId}\nURL: ${docResult.url}`;
    }

    case 'read_doc': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const result = await google.docs.readDocument(args.document_id as string);
        return `Document: "${result.title}"\n\n${result.content}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'read_doc', err.message);
        return `Failed to read document: ${err.message}`;
      }
    }

    case 'append_to_doc': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        const status = await google.isConnected();
        if (!status.connected) {
          if (args.document_id && args.content) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending append to doc: "${args.document_id}"`,
                JSON.stringify({
                  tool: 'append_to_doc',
                  document_id: args.document_id as string,
                  content: args.content as string,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.' +
            (args.document_id && args.content
              ? '\n\nYour content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.'
              : '');
        }

        await google.docs.appendFormattedContent(args.document_id as string, args.content as string);

        // Read back the title for confirmation
        let title = args.document_id as string;
        try {
          const doc = await google.docs.readDocument(args.document_id as string);
          title = doc.title;
        } catch { /* ignore — just use ID */ }

        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending append to doc: "${args.document_id as string}"`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending append to doc: "${args.document_id as string}"`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }

        // Keep the document_library snapshot fresh if this doc was indexed
        try {
          const appendedContent = args.content as string;
          await db.prepare(
            `UPDATE document_library
             SET extracted_text = SUBSTR(COALESCE(extracted_text, '') || char(10) || ?, 1, 50000),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ? AND drive_file_id = ?`
          ).bind(appendedContent, userId, args.document_id as string).run();
        } catch { /* non-critical */ }

        return `Content appended to "${title}".\nURL: https://docs.google.com/document/d/${args.document_id}/edit`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'append_to_doc', err.message);
        return `Failed to append to document: ${err.message}`;
      }
    }

    case 'rewrite_doc': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await google.isConnected();
        if (!status.connected) {
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.';
        }
        await google.docs.rewriteDocument(args.document_id as string, args.content as string);
        let title = args.document_id as string;
        try {
          const doc = await google.docs.readDocument(args.document_id as string);
          title = doc.title;
        } catch { /* ignore — just use ID */ }
        return `Document "${title}" reformatted successfully.\nURL: https://docs.google.com/document/d/${args.document_id}/edit`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'rewrite_doc', err.message);
        return `Failed to rewrite document: ${err.message}`;
      }
    }

    case 'delete_sheet_row': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await google.isConnected();
        if (!status.connected) {
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.';
        }
        const rowNum = args.row_number as number;
        if (rowNum < 2) return 'Row 1 is the header row and cannot be deleted. Specify row 2 or higher.';
        await google.sheets.deleteRow(
          args.spreadsheet_id as string,
          args.sheet_name as string,
          rowNum
        );
        return `Row ${rowNum} deleted from "${args.sheet_name}". All rows below have shifted up.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'delete_sheet_row', err.message);
        return `Failed to delete row: ${err.message}`;
      }
    }

    case 'delete_doc_content': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await google.isConnected();
        if (!status.connected) {
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.';
        }
        const result = await google.docs.deleteContent(
          args.document_id as string,
          args.text_to_remove as string
        );
        if (result.occurrencesRemoved === 0) {
          return 'No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.';
        }
        return `Removed ${result.occurrencesRemoved} occurrence${result.occurrencesRemoved === 1 ? '' : 's'} from the document.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'delete_doc_content', err.message);
        return `Failed to delete document content: ${err.message}`;
      }
    }

    case 'create_file': {
      if (!pinHash) return 'Authentication context unavailable.';
      const title = args.title as string;
      const content = args.content as string;
      const format = args.format as string;

      if (!title || !content || !format) return 'title, content, and format are all required to generate a file.';
      if (format !== 'docx' && format !== 'pdf') return 'format must be "docx" or "pdf".';

      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await google.isConnected();
        if (!status.connected) {
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in first — generated files are delivered via Google Drive.';
        }

        const { generateDocxBuffer, generatePdfBuffer } = await import('./document-generation');
        const bytes = format === 'docx' ? await generateDocxBuffer(title, content) : await generatePdfBuffer(title, content);
        const mimeType = format === 'docx'
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'application/pdf';
        const fileName = `${title}.${format}`;

        const { uploadFileToDrive, getGoogleAuth } = await import('./google');
        const uploaded = await uploadFileToDrive(db, userId, pinHash, googleClientId || '', googleClientSecret || '', fileName, mimeType, bytes);

        let folderInfo = '';
        if (args.folder_name) {
          try {
            const { token } = await getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
            const folder = await moveFileToFolder(token, uploaded.fileId, args.folder_name as string);
            folderInfo = `\nFolder: "${folder.folderName}"`;
          } catch (folderErr: any) {
            folderInfo = `\n(Note: file saved to Drive root — could not place in folder "${args.folder_name}": ${folderErr.message})`;
          }
        }

        try {
          const memory = new MemoryService(db);
          await memory.store(userId, 'context', `Generated file: ${fileName}`, `File ID: ${uploaded.fileId} | URL: ${uploaded.url}`, 6, 'working');
        } catch { /* non-critical */ }

        return `Created "${fileName}" and saved it to Google Drive.\nURL: ${uploaded.url}${folderInfo}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_file', err.message);
        return `Failed to generate ${format} file: ${err.message}`;
      }
    }

    // === Gmail API Tools (direct, no browser) ===

    case 'gmail_list': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const messages = await gmail.listMessages({
          maxResults: (args.max_results as number) || 10,
          query: args.query as string | undefined,
        });
        if (messages.length === 0) return 'No messages found.';
        return messages.map((m, i) => {
          const unread = m.isUnread ? '● ' : '  ';
          return `${unread}${i + 1}. **${m.subject}**\n   From: ${m.from}\n   Date: ${m.date}\n   ${m.snippet}\n   [id: ${m.id}]`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'list', err.message);
        if (err.message?.includes('not connected')) return err.message;
        return `Gmail list error: ${err.message}`;
      }
    }

    case 'gmail_read': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const msg = await gmail.getMessage(args.message_id as string);
        if (!msg) return 'Message not found.';
        let body = await gmail.getMessageBody(args.message_id as string);
        if (body.trim().length < 200 && msg.snippet) {
          body = `${body}\n\n[Snippet]: ${msg.snippet}`.trim();
        }
        return `**${msg.subject}**\nFrom: ${msg.from}\nTo: ${msg.to}\nDate: ${msg.date}\n\n${body}`;
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'read', err.message);
        return `Gmail read error: ${err.message}`;
      }
    }

    case 'gmail_search': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const searchQuery = resolveGmailSearchQuery(args);
        if (!searchQuery) {
          return 'Gmail search requires a non-empty query (e.g. from:sender@example.com subject:invoice). Use Gmail search syntax.';
        }
        const productHint = typeof args.product_hint === 'string' ? args.product_hint.trim() : '';
        const maxResults = Math.min(Math.max((args.max_results as number) || 10, 1), 20);
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        let messages = await gmail.search(searchQuery, maxResults);
        if (messages.length === 0 && productHint) {
          const fallbackQuery = buildPurchaseGmailQuery(productHint).replace('180d', '365d');
          messages = await gmail.search(fallbackQuery, maxResults);
        }
        if (messages.length === 0) return `No results for: ${searchQuery}`;
        if (productHint) {
          return formatPurchaseGmailSearchResponse(messages, productHint, searchQuery);
        }
        return messages.map((m, i) => {
          const unread = m.isUnread ? '● ' : '  ';
          return `${unread}${i + 1}. **${m.subject}**\n   From: ${m.from}\n   Date: ${m.date}\n   ${m.snippet}\n   [id: ${m.id}]`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'search', err.message);
        const msg = String(err?.message || err);
        if (/403|access denied|insufficient|permission/i.test(msg)) {
          return `${msg} Go to Settings → Keys → Google Workspace and reconnect your account.`;
        }
        return `Gmail search error: ${msg}`;
      }
    }

    case 'gmail_send': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Pre-check connection so we can save the email before failing
        const googleSvc = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await googleSvc.isConnected();
        if (!status.connected) {
          if (args.to && args.subject && args.body) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending email: "${args.subject}"`,
                JSON.stringify({
                  tool: 'gmail_send',
                  to: args.to as string,
                  subject: args.subject as string,
                  body: args.body as string,
                  cc: (args.cc as string | undefined) ?? null,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
            try {
              await db.prepare(
                `INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`
              ).bind(
                userId,
                `Pending email: "${args.subject}"`,
                `To: ${args.to} — reconnect Google then say "send the pending email".`,
                `pending_email_${args.subject}`,
                JSON.stringify({ tool: 'gmail_send', to: args.to, subject: args.subject })
              ).run();
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.' +
            (args.to && args.subject && args.body
              ? '\n\nYour email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I\'ll send it automatically.'
              : '');
        }

        const result = await gmail.send(
          args.to as string,
          args.subject as string,
          args.body as string,
          { cc: args.cc as string | undefined }
        );
        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending email: "${args.subject as string}"`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending email: "${args.subject as string}"`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }

        return `Email sent successfully to ${args.to}. Subject: "${args.subject}" [Message ID: ${result.id}]`;
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'send', err.message);
        return `Gmail send error: ${err.message}`;
      }
    }

    case 'gmail_draft': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Pre-check connection so we can save the draft before failing
        const googleSvc = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const status = await googleSvc.isConnected();
        if (!status.connected) {
          if (args.to && args.subject && args.body) {
            try {
              const memory = new MemoryService(db);
              await memory.store(
                userId,
                'context',
                `Pending draft: "${args.subject}"`,
                JSON.stringify({
                  tool: 'gmail_draft',
                  to: args.to as string,
                  subject: args.subject as string,
                  body: args.body as string,
                  cc: (args.cc as string | undefined) ?? null,
                }),
                9,
                'working'
              );
            } catch { /* non-critical */ }
          }
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.' +
            (args.to && args.subject && args.body
              ? '\n\nYour draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I\'ll save it to Gmail.'
              : '');
        }

        const result = await gmail.createDraft(
          args.to as string,
          args.subject as string,
          args.body as string,
          { cc: args.cc as string | undefined }
        );
        try {
          const memory = new MemoryService(db);
          const pendingEntries = await memory.search(userId, `Pending draft: "${args.subject as string}"`);
          for (const entry of pendingEntries) {
            if (entry.title.startsWith(`Pending draft: "${args.subject as string}"`)) {
              await memory.remove(entry.id, userId);
            }
          }
        } catch { /* non-critical */ }

        const ccInfo = args.cc ? `, CC: ${args.cc}` : '';
        return `Draft created. To: ${args.to}${ccInfo}, Subject: "${args.subject}" — Review and send from Gmail. [Draft ID: ${result.id}]`;
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'draft', err.message);
        return `Gmail draft error: ${err.message}`;
      }
    }

    case 'gmail_modify': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        await gmail.modifyMessage(args.message_id as string, args.action as any);
        return `Message ${args.message_id} successfully ${args.action}ed.`;
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'modify', err.message);
        return `Gmail modify error: ${err.message}`;
      }
    }

    case 'gmail_unread_count': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const count = await gmail.getUnreadCount();
        return `You have ${count} unread email${count !== 1 ? 's' : ''} in Gmail.`;
      } catch (err: any) {
        if (err.message?.includes('not connected')) return err.message;
        return `Gmail error: ${err.message}`;
      }
    }

    // === Google Drive Tools ===

    case 'drive_list': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const params = new URLSearchParams();
        params.set('pageSize', String((args.max_results as number) || 10));
        params.set('fields', 'files(id,name,mimeType,modifiedTime,size,webViewLink)');
        params.set('orderBy', 'modifiedTime desc');
        
        let q = '';
        if (args.folder_id) {
          q = `'${args.folder_id}' in parents and trashed = false`;
        } else if (args.query) {
          q = `${args.query} and trashed = false`;
        } else {
          q = 'trashed = false';
        }
        params.set('q', q);

        const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Drive API error (${res.status})`);
        const data = await res.json() as { files: any[] };
        if (!data.files?.length) return 'No files found.';

        return data.files.map((f, i) => {
          const type = f.mimeType?.split('.').pop() || f.mimeType;
          const size = f.size ? `${(parseInt(f.size) / 1024).toFixed(1)} KB` : '';
          const modified = f.modifiedTime?.split('T')[0] || '';
          return `${i + 1}. **${f.name}** (${type})\n   ${size} · Modified: ${modified}\n   ${f.webViewLink || ''}`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_list', err.message);
        return `Drive list error: ${err.message}`;
      }
    }

    case 'drive_search': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const q = `fullText contains '${(args.query as string).replace(/'/g, "\\'")}' and trashed = false`;
        const params = new URLSearchParams();
        params.set('q', q);
        params.set('pageSize', String((args.max_results as number) || 10));
        params.set('fields', 'files(id,name,mimeType,modifiedTime,size,webViewLink)');
        params.set('orderBy', 'modifiedTime desc');

        const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Drive API error (${res.status})`);
        const data = await res.json() as { files: any[] };
        if (!data.files?.length) return `No files found for: "${args.query}"`;

        return data.files.map((f, i) => {
          const type = f.mimeType?.split('.').pop() || f.mimeType;
          const modified = f.modifiedTime?.split('T')[0] || '';
          return `${i + 1}. **${f.name}** (${type}) — Modified: ${modified}\n   ${f.webViewLink || ''}`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_search', err.message);
        return `Drive search error: ${err.message}`;
      }
    }

    case 'drive_read_file': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const urlOrId = (args.url_or_id as string).trim();

        // Extract file ID from various Drive/Docs URL formats
        let fileId = urlOrId;
        const idPatterns = [
          /\/file\/d\/([a-zA-Z0-9_-]+)/,
          /\/document\/d\/([a-zA-Z0-9_-]+)/,
          /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
          /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
          /\/forms\/d\/([a-zA-Z0-9_-]+)/,
          /[?&]id=([a-zA-Z0-9_-]+)/,
          /\/d\/([a-zA-Z0-9_-]+)/,
        ];
        for (const pat of idPatterns) {
          const m = urlOrId.match(pat);
          if (m) { fileId = m[1]; break; }
        }

        // Fetch file metadata
        const metaRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,size`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (!metaRes.ok) throw new Error(`Drive API error (${metaRes.status}): could not fetch file metadata`);
        const meta = await metaRes.json() as { id: string; name: string; mimeType: string; size?: string };
        const { name: fileName, mimeType } = meta;

        const extractFocus = args.extract_focus as string | undefined;
        const focusInstruction = extractFocus
          ? `Focus specifically on extracting: ${extractFocus}`
          : 'Extract and return all readable text content. Preserve structure where relevant.';

        // Google Workspace files → export as plain text/CSV
        const exportMimeMap: Record<string, string> = {
          'application/vnd.google-apps.document': 'text/plain',
          'application/vnd.google-apps.spreadsheet': 'text/csv',
          'application/vnd.google-apps.presentation': 'text/plain',
        };
        if (exportMimeMap[mimeType]) {
          const exportMime = exportMimeMap[mimeType];
          const exportRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMime)}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          if (!exportRes.ok) throw new Error(`Drive export error (${exportRes.status})`);
          const text = await exportRes.text();

          // For spreadsheets: parse CSV → JSON rows so the LLM can pass them
          // directly to write_sheet/append_sheet without re-parsing plain text
          if (mimeType === 'application/vnd.google-apps.spreadsheet') {
            const rows = parseCsvToRows(text);
            const rowCount = rows.length;
            const colCount = rows[0]?.length ?? 0;
            return `**${fileName}** (Google Sheet — ${rowCount} rows × ${colCount} columns)\n\nParsed rows (JSON, ready for write_sheet/append_sheet):\n${JSON.stringify(rows)}`;
          }

          return `**${fileName}**\n\n${text.substring(0, 20000)}`;
        }

        // PDF → download + Anthropic extraction
        if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
          const dlRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          if (!dlRes.ok) throw new Error(`Drive download error (${dlRes.status})`);
          const arrayBuffer = await dlRes.arrayBuffer();
          const base64Data = Buffer.from(arrayBuffer).toString('base64');

          // Find Anthropic key from credential slots
          let anthropicKey: string | null = null;
          let anthropicModel = 'claude-sonnet-5';
          for (const slot of ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const) {
            try {
              const cred = await db.prepare(
                'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
              ).bind(userId, slot).first<{ encrypted_value: string }>();
              if (cred && pinHash) {
                const val = await decrypt(cred.encrypted_value, pinHash);
                const slotData = JSON.parse(val) as { provider: string; apiKey: string; model?: string };
                if (slotData.provider === 'anthropic') {
                  anthropicKey = slotData.apiKey;
                  if (slotData.model) anthropicModel = slotData.model;
                  break;
                }
              }
            } catch { /* try next slot */ }
          }

          if (!anthropicKey) {
            return `"${fileName}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;
          }

          const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01',
              'anthropic-beta': 'pdfs-2024-09-25',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: anthropicModel,
              max_tokens: 4096,
              messages: [{
                role: 'user',
                content: [
                  { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64Data } },
                  { type: 'text', text: focusInstruction },
                ],
              }],
            }),
          });
          if (!apiRes.ok) {
            const errBody = await apiRes.text();
            throw new Error(`Anthropic PDF extraction error: ${errBody.substring(0, 200)}`);
          }
          const apiData = await apiRes.json() as any;
          const extracted = apiData.content?.[0]?.text || '';
          return `**${fileName}** (PDF from Drive)\n\n${extracted}`;
        }

        // All other files — attempt direct download as text
        const dlRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (!dlRes.ok) throw new Error(`Drive download error (${dlRes.status})`);
        const text = await dlRes.text();
        return `**${fileName}** (${mimeType})\n\n${text.substring(0, 20000)}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_read_file', err.message);
        return `Drive read error: ${err.message}`;
      }
    }

    case 'drive_delete_file': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const urlOrId = (args.url_or_id as string).trim();
        let fileId = urlOrId;
        const idPatterns = [
          /\/file\/d\/([a-zA-Z0-9_-]+)/,
          /\/document\/d\/([a-zA-Z0-9_-]+)/,
          /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
          /id=([a-zA-Z0-9_-]+)/,
        ];
        for (const pattern of idPatterns) {
          const match = urlOrId.match(pattern);
          if (match) { fileId = match[1]; break; }
        }

        // Fetch file name for confirmation message
        const metaRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (!metaRes.ok) throw new Error(`Drive API error (${metaRes.status})`);
        const meta = await metaRes.json() as { name: string };

        const trashRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}`,
          {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trashed: true }),
          }
        );
        if (!trashRes.ok) throw new Error(`Drive API error (${trashRes.status})`);
        return `"${meta.name}" moved to trash. You can restore it from Drive trash within 30 days.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_delete_file', err.message);
        return `Drive delete error: ${err.message}`;
      }
    }

    case 'drive_organise': {
      if (!pinHash) return 'Authentication context unavailable.';
      if (!args.folder_name && !args.new_name) return 'Please provide at least a folder_name to move to or a new_name to rename.';
      try {
        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const urlOrId = (args.url_or_id as string).trim();
        let fileId = urlOrId;
        const idPatterns = [
          /\/file\/d\/([a-zA-Z0-9_-]+)/,
          /\/document\/d\/([a-zA-Z0-9_-]+)/,
          /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
          /id=([a-zA-Z0-9_-]+)/,
        ];
        for (const pattern of idPatterns) {
          const match = urlOrId.match(pattern);
          if (match) { fileId = match[1]; break; }
        }

        const results: string[] = [];

        // Rename if requested
        if (args.new_name) {
          const renameRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}`,
            {
              method: 'PATCH',
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: args.new_name }),
            }
          );
          if (!renameRes.ok) throw new Error(`Drive rename error (${renameRes.status})`);
          results.push(`Renamed to "${args.new_name}"`);
        }

        // Move to folder if requested
        if (args.folder_name) {
          const { folderName } = await moveFileToFolder(token, fileId, args.folder_name as string);
          results.push(`Moved to folder "${folderName}"`);
        }

        return results.join('. ') + '.';
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_organise', err.message);
        return `Drive organise error: ${err.message}`;
      }
    }

    // === Web Search & Research ===

    case 'web_search': {
      try {
        const result = await webSearch(args.query as string, {
          num: (args.num_results as number) || 5,
          site: args.site as string | undefined,
          googleApiKey: googleApiKey || undefined,
          googleCseId: googleCseId || undefined,
        });

        if (result.error) return `Web search failed: ${result.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`;
        if (result.results.length === 0) return `Web search returned no results for "${args.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`;

        return result.results.map((r, i) =>
          `${i + 1}. [${r.title}](${r.link})\n   ${r.snippet}`
        ).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'search', 'web_search', err.message);
        return `Web search error: ${err.message}`;
      }
    }

    case 'read_url': {
      try {
        const url = args.url as string;
        if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
          return 'Invalid URL. Please provide a full URL starting with http:// or https://';
        }
        const maxLen = Math.min((args.max_length as number) || 8000, 15000);

        // Import fetchPageContent from research module
        const { fetchPageContent } = await import('./research');
        const result = await fetchPageContent(url, maxLen);

        if (result.error) return `Failed to read page: ${result.error}`;
        if (!result.text || result.text.length < 20) return `Page at ${url} returned no readable content.`;

        return `Content from ${url} (${result.text.length} chars):\n\n${result.text}`;
      } catch (err: any) {
        await logError(db, userId, 'search', 'read_url', err.message);
        return `Read URL error: ${err.message}`;
      }
    }

    case 'research': {
      if (!llmProvider) return 'Research tool requires an LLM provider but none is available.';
      try {
        let anthropicKey: string | undefined;
        let exaKey: string | undefined;
        try {
          for (const slot of ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const) {
            const cred = await db.prepare(
              'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
            ).bind(userId, slot).first<{ encrypted_value: string }>();
            if (!cred || !pinHash) continue;
            const slotData = JSON.parse(await decrypt(cred.encrypted_value, pinHash)) as { provider?: string; apiKey?: string };
            if (slotData.provider === 'anthropic' && slotData.apiKey) {
              anthropicKey = slotData.apiKey;
              break;
            }
          }
          const exaCred = await db.prepare(
            'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
          ).bind(userId, 'exa_api_key').first<{ encrypted_value: string }>();
          if (exaCred && pinHash) {
            exaKey = await decrypt(exaCred.encrypted_value, pinHash);
          }
        } catch { /* non-critical */ }

        const depth = (args.depth as 'quick' | 'thorough') || 'quick';
        const RESEARCH_TIMEOUT_MS = depth === 'thorough' ? 300000 : 90000;
        const researchPromise = conductResearch(
          args.query as string,
          llmProvider,
          {
            depth,
            site: args.site as string | undefined,
            anthropicKey,
            exaKey,
            googleApiKey: googleApiKey || undefined,
            googleCseId: googleCseId || undefined,
          }
        );
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), RESEARCH_TIMEOUT_MS));

        const result = await Promise.race([researchPromise, timeoutPromise]);

        if (result === null) {
          const { webSearch } = await import('./google-apis');
          const fallback = await webSearch(args.query as string, {
            num: 5,
            googleApiKey: googleApiKey || undefined,
            googleCseId: googleCseId || undefined,
          });
          if (fallback.error || fallback.results.length === 0) {
            return 'Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.';
          }
          let output = 'Research took too long, but here are the top search results:\n\n';
          output += fallback.results.map((r, i) => `${i + 1}. [${r.title}](${r.link})\n   ${r.snippet}`).join('\n\n');
          return output;
        }

        if (result.error) return `Research failed: ${result.error}`;

        let output = result.report;
        if (result.sources.length > 0) {
          output += '\n\n---\n**Sources** (' + result.pagesRead + ' pages read):\n';
          output += result.sources.map((s, i) => `[${i + 1}] [${s.title}](${s.url})`).join('\n');
        }

        output += '\n\n---\n💡 *Say "save as note" to store this report in your notes.*';
        if (depth === 'thorough' && anthropicKey) {
          output += result.escalated
            ? '\n⚠️ *Thorough research ran on Sonnet 5, with an automatic escalation to Opus 4.8 after a Sonnet failure.*'
            : '\n💡 *Thorough research used ~3 Sonnet 5 API calls.*';
        }

        try {
          const memory = new MemoryService(db);
          const summary = result.report.substring(0, 600);
          await memory.store(
            userId,
            'context',
            `Research: ${(args.query as string).substring(0, 80)}`,
            summary,
            6,
            'long_term'
          );
        } catch { /* non-critical */ }

        return output;
      } catch (err: any) {
        await logError(db, userId, 'research', 'research', err.message);
        return `Research error: ${err.message}`;
      }
    }

    case 'save_note': {
      try {
        const content = (args.content as string || '').trim();
        if (!content) return 'Note content cannot be empty.';
        const source = (args.source as string) || 'manual';
        const validSource = ['manual', 'research', 'chat'].includes(source) ? source : 'manual';
        const row = await db.prepare(
          `INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
           VALUES (?, ?, ?, ?, ?, ?, 0) RETURNING id, title`
        ).bind(
          userId,
          ((args.title as string) || '').trim(),
          content,
          ((args.tags as string) || '').trim(),
          validSource,
          ((args.source_query as string) || '').trim(),
        ).first<{ id: number; title: string }>();
        const summary = (row?.title && row.title !== 'Untitled') ? row.title : content.substring(0, 60) + (content.length > 60 ? '…' : '');
        return `Note added — ${summary}`;
      } catch (err: any) {
        return `Failed to save note: ${err.message}`;
      }
    }

    case 'search_notes': {
      try {
        const q = (args.query as string || '').trim();
        if (!q) return 'Search query is required.';
        const pattern = `%${q}%`;
        const result = await db.prepare(
          `SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
           ORDER BY updated_at DESC LIMIT 20`
        ).bind(userId, pattern, pattern, pattern).all<{ id: number; title: string; content: string; tags: string; is_pinned: number; updated_at: string }>();
        const notes = result.results || [];
        if (notes.length === 0) return `No notes found matching "${q}".`;
        return notes.map(n =>
          `[#${n.id}] ${n.is_pinned ? '📌 ' : ''}${n.title || 'Untitled'} (${n.updated_at})\n${n.content.slice(0, 200)}${n.content.length > 200 ? '...' : ''}${n.tags ? `\nTags: ${n.tags}` : ''}`
        ).join('\n\n');
      } catch (err: any) {
        return `Note search failed: ${err.message}`;
      }
    }

    case 'list_notes': {
      try {
        const limit = Math.min((args.limit as number) || 10, 50);
        const tag = args.tag as string | undefined;
        const pinnedOnly = args.pinned_only === true;
        const conditions = ['user_id = ?'];
        const values: (string | number)[] = [userId];
        if (tag) {
          conditions.push('tags LIKE ?');
          values.push(`%${tag}%`);
        }
        if (pinnedOnly) {
          conditions.push('is_pinned = 1');
        }
        values.push(limit);
        const result = await db.prepare(
          `SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE ${conditions.join(' AND ')} ORDER BY is_pinned DESC, updated_at DESC LIMIT ?`
        ).bind(...values).all<{ id: number; title: string; content: string; tags: string; is_pinned: number; updated_at: string }>();
        const notes = result.results || [];
        if (notes.length === 0) return 'No notes found.';
        return notes.map(n =>
          `[#${n.id}] ${n.is_pinned ? '📌 ' : ''}${n.title || 'Untitled'} (${n.updated_at})\n${n.content.slice(0, 150)}${n.content.length > 150 ? '...' : ''}`
        ).join('\n\n');
      } catch (err: any) {
        return `Failed to list notes: ${err.message}`;
      }
    }

    case 'delete_note': {
      try {
        const id = args.id as number;
        if (!id) return 'Note ID is required.';
        const result = await db.prepare(
          'DELETE FROM notes WHERE id = ? AND user_id = ?'
        ).bind(id, userId).run();
        if (!result.meta.changes) return `Note #${id} not found.`;
        return `Note #${id} deleted.`;
      } catch (err: any) {
        return `Failed to delete note: ${err.message}`;
      }
    }

    // === Cloud Browser Tools ===

    case 'browser_task': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        // If a vault entry is named, fetch credentials and any stored session ID.
        // Credentials are injected via the secrets field ({username}/{password} placeholders).
        // Stored session IDs persist logged-in browser state across turns so repeat visits
        // (e.g. Outlook mail checks) skip re-authentication entirely.
        let secrets: Record<string, string> | undefined;
        let taskText = args.task as string;
        let vaultEntryId: number | undefined;
        let storedVaultSessionId: string | undefined;

        // Auto-vault fallback: if the LLM skipped vault_lookup and omitted site_name, scan all
        // vault entries for this user and inject credentials if any entry name appears in the task.
        // This prevents silent login failures when the LLM forgets the mandatory vault_lookup step.
        if (!args.site_name) {
          try {
            const allVault = await db.prepare(
              'SELECT name FROM site_credentials WHERE user_id = ?'
            ).bind(userId).all<{ name: string }>();
            const taskLower = taskText.toLowerCase();
            const matched = (allVault.results || []).find(e => taskLower.includes(e.name.toLowerCase()));
            if (matched) {
              args = { ...args, site_name: matched.name };
              logInfo('browser_task auto-vault: inferred site_name from task text', {
                siteName: matched.name,
                userId,
              });
            }
          } catch { /* non-critical */ }
        }

        type VaultEntryRow = { id: number; name: string; encrypted_blob: string };
        let resolvedVaultEntry: VaultEntryRow | undefined;
        let resolvedCredential: { username: string; password: string; notes?: string; sessionId?: string } | undefined;

        if (args.site_name) {
          try {
            resolvedVaultEntry = await db.prepare(
              'SELECT id, name, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE'
            ).bind(userId, args.site_name as string).first<VaultEntryRow>() || undefined;
          } catch {
            // Table lookup failed — run task without credentials.
          }
        }

        // Outlook credentials may be labelled with the actual mailbox address
        // (for example, "ajyoti@ncpamumbai.com") instead of "Outlook". The
        // old resolver could not find those entries, so the request silently
        // fell through to Browser Use with no credentials. Resolve a single,
        // unambiguous Outlook candidate by its label/notes or by a label that
        // exactly matches the encrypted username. Never guess between several.
        if (!resolvedVaultEntry && (OUTLOOK_SITE_RE.test(String(args.site_name || '')) || OUTLOOK_SITE_RE.test(taskText))) {
          try {
            const allVault = await db.prepare(
              'SELECT id, name, encrypted_blob FROM site_credentials WHERE user_id = ? ORDER BY name ASC'
            ).bind(userId).all<VaultEntryRow>();
            const serviceCandidates: Array<{ row: VaultEntryRow; cred: typeof resolvedCredential }> = [];
            const identityCandidates: Array<{ row: VaultEntryRow; cred: typeof resolvedCredential }> = [];

            for (const row of allVault.results || []) {
              try {
                const cred = JSON.parse(await decrypt(row.encrypted_blob, pinHash)) as {
                  username?: string;
                  password?: string;
                  notes?: string;
                  sessionId?: string;
                };
                if (!cred.username || !cred.password) continue;
                const label = row.name.trim().toLowerCase();
                const username = cred.username.trim().toLowerCase();
                const serviceMatch = OUTLOOK_SITE_RE.test(row.name)
                  || OUTLOOK_SITE_RE.test(String(cred.notes || ''));
                const candidate = { row, cred: cred as NonNullable<typeof resolvedCredential> };
                if (serviceMatch) serviceCandidates.push(candidate);
                else if (label === username) identityCandidates.push(candidate);
              } catch {
                // Ignore an unrelated entry that cannot be decrypted.
              }
            }

            const candidates = serviceCandidates.length > 0 ? serviceCandidates : identityCandidates;
            if (candidates.length > 1) {
              return 'Multiple possible Outlook credentials are saved. Name the intended Secret Vault entry "Outlook" (or add Outlook in its notes) so I can select it safely.';
            }
            if (candidates.length === 1) {
              resolvedVaultEntry = candidates[0].row;
              resolvedCredential = candidates[0].cred;
              // Keep the site hint semantic even if the visible vault label is
              // an email address, so the deterministic Outlook path is used.
              args = { ...args, site_name: 'Outlook' };
              logInfo('browser_task auto-vault: resolved Outlook credential by mailbox identity', {
                siteName: candidates[0].row.name,
                userId,
              });
            }
          } catch {
            // Non-critical — the normal Browser Use/API-key path remains available.
          }
        }

        if (resolvedVaultEntry) {
          try {
            const cred = resolvedCredential || JSON.parse(await decrypt(resolvedVaultEntry.encrypted_blob, pinHash));
            if (!cred.username || !cred.password) throw new Error('Vault entry has no username/password');
            secrets = { username: cred.username, password: cred.password };
            storedVaultSessionId = cred.sessionId as string | undefined;
            vaultEntryId = resolvedVaultEntry.id;
            taskText = `${taskText}\n\nWhen prompted to log in, use username {username} and password {password}. If Microsoft shows a "Pick an account" screen, select only the account whose email exactly matches {username}; never choose a different account. If no exact account is shown, click "Use another account" and enter {username}.`;
          } catch {
            // Decrypt failed or the entry is incomplete — run without credentials.
          }
        }

        // Scripted Playwright is the only path for read-only Outlook inbox
        // requests. Do not silently fall through to Browser Use: that fallback
        // makes a vault/selector failure look like a generic credential timing
        // problem and can spend a paid browser run without useful diagnostics.
        const isOutlookReadOnly = isOutlookReadOnlyBrowserTask(
          (args.site_name as string) || '',
          taskText,
        );
        if (isOutlookReadOnly) {
          logInfo('browser_task Outlook routing', {
            userId,
            credentialsResolved: !!secrets,
            playwrightAvailable: !!cfBindings?.outlookPlaywright,
            vaultEntryId,
          });
          if (!secrets) {
            return 'Outlook credentials could not be resolved from Secret Vault. Save the Outlook username and password in one vault entry, then try again.';
          }
          if (!cfBindings?.outlookPlaywright) {
            return 'The deterministic Outlook login is unavailable on this backend. Route the request through the Render backend and try again.';
          }
          const result = await cfBindings.outlookPlaywright({
            db, userId, pinHash,
            username: secrets.username, password: secrets.password,
          });
          if (result.status === 'completed' && result.emails?.length) {
            return result.emails
              .map((e, i) => `${i + 1}. From: ${e.sender}\n   Subject: ${e.subject}\n   Date: ${e.date}\n   ${e.snippet}`)
              .join('\n\n');
          }
          if (result.error) {
            // Persist the raw failure so it is queryable later even after the
            // chat response is gone.
            await logError(db, userId, 'browser', 'outlook_playwright', result.error).catch(() => {});
            // The URL / page title / visible text / screenshot link in this
            // error exist precisely so login failures are diagnosable. The
            // model must relay them verbatim, not summarise them away.
            return `Outlook scrape failed: ${result.error}\n\n`
              + 'Tell the user it failed and INCLUDE THE FULL ERROR DETAILS ABOVE VERBATIM in your reply '
              + '(the URL, page title, visible text, and screenshot link if present). Do not paraphrase or omit them — '
              + 'they are the only way to diagnose and fix the login script. Do not retry more than once.';
          }
          return '[NO-OUTPUT] Outlook login succeeded but no messages were extracted — do NOT invent inbox contents. Tell the user the scrape returned nothing and suggest trying again.';
        }

        const buCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'browser_use_api_key').first<{ encrypted_value: string }>();
        if (!buCred) {
          return 'Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).';
        }
        const apiKey = (await decrypt(buCred.encrypted_value, pinHash)).trim();

        // Vault session helpers (non-critical, fire-and-forget)
        const saveVaultSession = async (newSessionId: string) => {
          if (!vaultEntryId) return;
          try {
            const ve = await db.prepare('SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?')
              .bind(vaultEntryId, userId).first<{ encrypted_blob: string }>();
            if (!ve) return;
            const c = JSON.parse(await decrypt(ve.encrypted_blob, pinHash!));
            c.sessionId = newSessionId;
            await db.prepare('UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?')
              .bind(await encrypt(JSON.stringify(c), pinHash!), vaultEntryId, userId).run();
          } catch { /* non-critical */ }
        };
        const clearVaultSession = async () => {
          if (!vaultEntryId || !storedVaultSessionId) return;
          try {
            const ve = await db.prepare('SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?')
              .bind(vaultEntryId, userId).first<{ encrypted_blob: string }>();
            if (!ve) return;
            const c = JSON.parse(await decrypt(ve.encrypted_blob, pinHash!));
            delete c.sessionId;
            await db.prepare('UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?')
              .bind(await encrypt(JSON.stringify(c), pinHash!), vaultEntryId, userId).run();
          } catch { /* non-critical */ }
        };

        // Blue Dart AWB tracking: detect "blue dart"/"bluedart" + a 10-11 digit AWB and
        // substitute a structured tracking task prompt for reliable extraction.
        const blueDartMatch = /blue[\s-]?dart[\s\S]{0,100}?(\d{10,11})|(\d{10,11})[\s\S]{0,100}?blue[\s-]?dart/i.exec(taskText);
        if (blueDartMatch) {
          const awb = (blueDartMatch[1] || blueDartMatch[2])!;
          taskText = buildBlueDartTrackingTask(awb);
        }

        // Telegram requests are processed by the Render worker (same as web) — no 30s platform limit.
        // Both channels use the full DEFAULT_TIMEOUT_MS (5 min) from browser.ts.
        const browserTimeoutMs: number | undefined = undefined;

        // Session priority:
        // 1. Stored vault session (already logged in — skip re-auth overhead)
        // 2. Existing per-turn session from an earlier browser_task this turn
        // 3. New session via POST /sessions (first browser_task, no vault entry)
        if (browserCtx) {
          browserCtx.apiKey = apiKey;
          if (storedVaultSessionId && !browserCtx.sessionId) {
            browserCtx.sessionId = storedVaultSessionId;
            browserCtx.persistSession = true; // keep alive across turns
          } else if (!browserCtx.sessionId && vaultEntryId) {
            // Only pre-create a persistent (keepAlive) session for vault/auth flows
            // that benefit from reuse across turns. One-shot tasks let POST /tasks
            // auto-create a self-closing session — this prevents keepAlive sessions
            // leaking (e.g. on timeout) and exhausting the concurrency limit.
            browserCtx.sessionId = (await createBrowserSession(apiKey)) ?? undefined;
          }
        }
        logInfo('browser_task starting', {
          userId,
          channel,
          timeoutMs: browserTimeoutMs ?? 300000,
          sessionId: browserCtx?.sessionId,
          vaultSession: !!storedVaultSessionId,
        });

        const result = await runBrowserTask(taskText, apiKey, {
          secrets,
          sessionId: browserCtx?.sessionId,
          timeoutMs: browserTimeoutMs,
        });

        if (result.status === 'completed') {
          // Persist session for vault-entry tasks so the next visit skips re-authentication.
          // Use browserCtx.sessionId (the ID we explicitly sent) — never result.sessionId.
          // result.sessionId from an auto-created session (keepAlive=false) must not be saved;
          // that session is already closed, so saving it would cause HTTP 422 on the next call.
          const activeSessionId = browserCtx?.sessionId ?? undefined;
          if (vaultEntryId && activeSessionId) {
            if (browserCtx) { browserCtx.persistSession = true; }
            await saveVaultSession(activeSessionId);
          }
          // Captcha sentinel: surface a clear user message instead of raw JSON
          if (result.output?.includes('"captcha_required": true')) {
            return 'Captcha detected — manual verification required. The site blocked automated access. Please try completing it manually or try again later.';
          }
          return result.output ?? '[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again.';
        }

        if (result.status === 'timeout') {
          // Task is still running inside the remote session — don't close it at turn end
          if (browserCtx) browserCtx.hasActiveTask = true;
          // Store task ID in working memory so the user can follow up
          try {
            const memory = new MemoryService(db);
            await memory.store(
              userId,
              'context',
              `Browser task in progress: ${result.taskId}`,
              JSON.stringify({ task_id: result.taskId, task: args.task }),
              9,
              'working'
            );
          } catch { /* non-critical */ }
          // Persist for async delivery — cron will post the result as a thread message + Telegram notification
          try {
            const taskDesc = (args.task as string || '').substring(0, 200);
            await db.prepare(
              `INSERT INTO pending_browser_tasks (user_id, task_id, task_description, thread_id, channel) VALUES (?, ?, ?, ?, ?)`
            ).bind(userId, result.taskId, taskDesc, browserCtx?.threadId ?? null, channel).run();
          } catch { /* non-critical — table may not exist yet */ }
          return `[BROWSER_TIMEOUT:${result.taskId}] Browser task did not finish within the time limit. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`;
        }

        // Clear stale vault session so next attempt starts with a fresh browser.
        // Also explicitly close the Browser Use session — persistSession was set when we
        // loaded the stored session ID, so the turn-end cleanup would skip it otherwise,
        // leaving an orphaned keepAlive session on Browser Use until TTL.
        if (storedVaultSessionId && apiKey) {
          closeBrowserSession(storedVaultSessionId, apiKey).catch(() => {});
        }
        if (browserCtx) browserCtx.persistSession = false;
        await clearVaultSession();
        const failDetail = [result.error, result.output].filter(Boolean).join(' — ');
        return `Browser task failed (ID: \`${result.taskId}\`): ${failDetail || 'No details returned.'} | Operator hint: Check Browser Use dashboard — taskId=${result.taskId}`;
      } catch (err: any) {
        await logError(db, userId, 'browser', 'browser_task', err.message);
        return `Browser task error: ${err.message}`;
      }
    }

    case 'browser_task_status': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const buCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'browser_use_api_key').first<{ encrypted_value: string }>();
        if (!buCred) return 'Browser Use API key not configured.';
        const apiKey = await decrypt(buCred.encrypted_value, pinHash);

        // Same poll budget as web — Render-backed runtime (no Workers 10s shortcut)
        const status = await getBrowserTaskStatus(args.task_id as string, apiKey);

        if (status.done) {
          // Clean up the memory entry
          try {
            const memory = new MemoryService(db);
            const entries = await memory.search(userId, `Browser task in progress: ${args.task_id}`);
            for (const entry of entries) {
              await memory.remove(entry.id, userId);
            }
          } catch { /* non-critical */ }

          if (status.status === 'finished' || status.status === 'completed') {
            if (status.output) return status.output;
            return '[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"';
          }
          return `Browser task ended with status "${status.status}" and no output. Do NOT retry — report this to the user.`;
        }

        // Still running — do NOT call this tool again; tell the user to wait
        return `[still-running] Browser task has not finished yet (status: ${status.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`;
      } catch (err: any) {
        await logError(db, userId, 'browser', 'browser_task_status', err.message);
        return `Browser status check error: ${err.message}`;
      }
    }

    case 'vault_lookup': {
      try {
        const siteName = (args.site_name as string || '').trim();
        if (!siteName) return 'No site name provided.';
        if (!pinHash) return 'Authentication context unavailable.';

        // Search both the visible label and the encrypted credential identity.
        // Users commonly label a mailbox entry with its email address rather
        // than the service name (for example, ajyoti@ncpamumbai.com).
        const rows = await db.prepare(
          'SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? ORDER BY name ASC'
        ).bind(userId).all<{ name: string; encrypted_blob: string }>();
        const wanted = siteName.toLowerCase();
        const matches: string[] = [];
        const identityNamedOutlookMatches: string[] = [];
        const outlookHint = OUTLOOK_SITE_RE.test(siteName);
        for (const row of rows.results || []) {
          const labelMatch = row.name.toLowerCase().includes(wanted);
          let identityMatch = false;
          let identityNamedOutlookMatch = false;
          if (!labelMatch) {
            try {
              const cred = JSON.parse(await decrypt(row.encrypted_blob, pinHash)) as {
                username?: string;
                notes?: string;
              };
              const username = String(cred.username || '').toLowerCase();
              identityMatch = username.includes(wanted)
                || String(cred.notes || '').toLowerCase().includes(wanted);
              identityNamedOutlookMatch = outlookHint
                && row.name.trim().toLowerCase() === username;
            } catch {
              // An unrelated or stale entry should not prevent other matches.
            }
          }
          if (labelMatch || identityMatch) matches.push(row.name);
          else if (identityNamedOutlookMatch) identityNamedOutlookMatches.push(row.name);
        }
        if (matches.length === 0 && outlookHint) matches.push(...identityNamedOutlookMatches);
        if (matches.length === 0) {
          return `No vault entries found matching "${siteName}".`;
        }
        if (matches.length > 1) {
          return `Multiple vault entries match "${siteName}": ${matches.join(', ')}. Choose the exact intended entry name for browser_task; do not guess.`;
        }
        return `Vault entry matching "${siteName}": ${matches[0]}. Use site_name="${matches[0]}" in browser_task to inject credentials automatically.`;
      } catch {
        return 'vault_lookup: could not query Secret Vault (table may not exist — run migrations).';
      }
    }

    case 'watch_page': {
      try {
        const { ensurePageWatchesTable } = await import('./pageWatch');
        const rawUrl = String(args.url || '').trim();
        let parsed: URL;
        try {
          parsed = new URL(rawUrl);
          if (!/^https?:$/.test(parsed.protocol)) throw new Error('not http(s)');
        } catch {
          return `watch_page needs a full http(s) URL — got "${rawUrl}".`;
        }
        const name = (String(args.name || '').trim() || parsed.hostname).slice(0, 80);
        const interval = Math.min(1440, Math.max(15, Math.round(Number(args.check_interval_minutes) || 60)));
        const selector = String(args.css_selector || '').trim() || null;

        await ensurePageWatchesTable(db);
        const existing = await db.prepare(
          'SELECT id, name FROM page_watches WHERE user_id = ? AND url = ? AND enabled = 1'
        ).bind(userId, parsed.href).first<{ id: number; name: string }>();
        if (existing) {
          return `Already watching that URL as "${existing.name}". Use remove_page_watch first if you want different settings.`;
        }
        await db.prepare(
          'INSERT INTO page_watches (user_id, name, url, css_selector, check_interval_minutes) VALUES (?, ?, ?, ?, ?)'
        ).bind(userId, name, parsed.href, selector, interval).run();
        return `Watching "${name}" (${parsed.href}) every ${interval} minutes${selector ? `, scoped to selector ${selector}` : ''}. The baseline snapshot is taken within ~5 minutes (you'll get a confirmation notification), and any change after that triggers a push notification describing what's new.`;
      } catch (err: any) {
        await logError(db, userId, 'browser', 'watch_page', err.message);
        return `watch_page failed: ${err.message}`;
      }
    }

    case 'list_page_watches': {
      try {
        const { ensurePageWatchesTable } = await import('./pageWatch');
        await ensurePageWatchesTable(db);
        const rows = await db.prepare(
          `SELECT name, url, check_interval_minutes, last_checked_at, last_changed_at, last_error, enabled
           FROM page_watches WHERE user_id = ? ORDER BY created_at ASC`
        ).bind(userId).all<{ name: string; url: string; check_interval_minutes: number; last_checked_at: string | null; last_changed_at: string | null; last_error: string | null; enabled: number }>();
        const watches = rows.results || [];
        if (watches.length === 0) return 'No page watches are set up. Use watch_page to start one.';
        return watches.map((w, i) =>
          `${i + 1}. ${w.name} — ${w.url}\n   every ${w.check_interval_minutes} min | last checked: ${w.last_checked_at || 'not yet'} | last change: ${w.last_changed_at || 'none seen'}${w.enabled ? '' : ' | DISABLED'}${w.last_error ? ` | last error: ${w.last_error.slice(0, 120)}` : ''}`
        ).join('\n');
      } catch (err: any) {
        return `list_page_watches failed: ${err.message}`;
      }
    }

    case 'remove_page_watch': {
      try {
        const { ensurePageWatchesTable } = await import('./pageWatch');
        await ensurePageWatchesTable(db);
        const needle = String(args.name_or_url || '').trim().toLowerCase();
        if (!needle) return 'Which watch should I remove? Give its name or URL.';
        const rows = await db.prepare(
          'SELECT id, name, url FROM page_watches WHERE user_id = ?'
        ).bind(userId).all<{ id: number; name: string; url: string }>();
        const matches = (rows.results || []).filter(
          (w) => w.name.toLowerCase().includes(needle) || w.url.toLowerCase().includes(needle)
        );
        if (matches.length === 0) return `No page watch matches "${needle}".`;
        if (matches.length > 1) {
          return `Multiple watches match "${needle}": ${matches.map((m) => m.name).join(', ')}. Be more specific.`;
        }
        await db.prepare('DELETE FROM page_watches WHERE id = ? AND user_id = ?')
          .bind(matches[0].id, userId).run();
        return `Stopped watching "${matches[0].name}" (${matches[0].url}).`;
      } catch (err: any) {
        return `remove_page_watch failed: ${err.message}`;
      }
    }

    // === Google Public API Tools (API Key-based) ===

    case 'search_youtube': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await searchYouTube(apiKey, args.query as string, {
          maxResults: (args.max_results as number) || 5,
          order: (args.order as any) || 'relevance',
        });
        if (result.error) return `YouTube search failed: ${result.error}`;
        if (result.results.length === 0) return `No YouTube results for "${args.query}".`;

        return result.results.map((v, i) => {
          return `${i + 1}. **${v.title}**\n   ${v.channelTitle} · ${v.publishedAt?.split('T')[0] || ''}\n   ${v.description}\n   ${v.url}`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'youtube_search', err.message);
        return `YouTube search error: ${err.message}`;
      }
    }

    // === Document Parsing ===
    case 'parse_document': {
      const fileId = args.file_id as string;
      const extractFocus = args.extract_focus as string | undefined;

      if (!fileId) return 'file_id is required to parse a document.';

      // Fetch from uploaded_files table (include extracted_text for pre-extracted PDFs)
      const fileRow = await db.prepare(
        'SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?'
      ).bind(fileId, userId).first<{ file_name: string; file_type: string; file_data: string; file_size: number; extracted_text: string | null }>();

      if (!fileRow) return `File not found. The file may have expired or the file_id is incorrect.`;

      // Fast path: text was pre-extracted at upload time — return immediately, no API call needed
      if (fileRow.extracted_text) {
        return `Document: ${fileRow.file_name}\n\n${fileRow.extracted_text}`;
      }

      const { file_name, file_type } = fileRow;
      let { file_data } = fileRow;

      // If file is stored in R2, fetch it and convert to base64
      if (file_data === 'r2') {
        if (!r2Bucket) return `File "${file_name}" is stored in R2 but no storage bucket is configured.`;
        const r2Obj = await r2Bucket.get(fileId);
        if (!r2Obj) return `File "${file_name}" not found in storage. It may have been deleted.`;
        const arrayBuffer = await r2Obj.arrayBuffer();
        file_data = Buffer.from(arrayBuffer).toString('base64');
      }

      // For plain text files: decode and return directly
      if (file_type.startsWith('text/')) {
        try {
          const text = Buffer.from(file_data, 'base64').toString('utf-8');
          return `Document: ${file_name}\n\n${text.substring(0, 20000)}`;
        } catch {
          return `Could not decode text file: ${file_name}`;
        }
      }

      // For PDF and Word: use Anthropic API directly if an Anthropic key is available
      if (file_type === 'application/pdf' ||
          file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file_name.toLowerCase().endsWith('.pdf') || file_name.toLowerCase().endsWith('.docx')) {

        // DOCX: extract text via ZIP parsing — Anthropic's PDF API only accepts PDFs
        if (file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            || file_name.toLowerCase().endsWith('.docx')) {
          try {
            const text = await extractDocxText(Buffer.from(file_data, 'base64'));
            if (text.length > 50) {
              // Persist extracted text so search_library can find it in future queries
              try {
                await db.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL')
                  .bind(text, fileId, userId).run();
                const summary = text.substring(0, 600);
                await db.prepare(
                  `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL`
                ).bind(summary, text.substring(0, 50000), fileId, userId).run();
                // Re-index in Vectorize if available and not yet indexed
                if (cfBindings?.ai && cfBindings?.vectorize) {
                  const docRow = await db.prepare(
                    'SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1'
                  ).bind(fileId, userId).first<{ id: number }>();
                  if (docRow) {
                    const { indexDocumentChunks } = await import('./embeddings');
                    indexDocumentChunks(
                      { DB: db, AI: cfBindings.ai, VECTORIZE: cfBindings.vectorize },
                      userId, docRow.id, text
                    ).catch(() => {});
                  }
                }
              } catch { /* persistence failure is non-critical — text still returned */ }
              return `Document: ${file_name}\n\n${text.substring(0, 20000)}`;
            }
          } catch { /* fall through */ }
          return `Could not extract text from "${file_name}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`;
        }

        // PDF: use Anthropic document API
        let anthropicKey: string | null = null;
        let anthropicModel = 'claude-sonnet-5';
        for (const slot of ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const) {
          try {
            const cred = await db.prepare(
              'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
            ).bind(userId, slot).first<{ encrypted_value: string }>();
            if (cred && pinHash) {
              const val = await decrypt(cred.encrypted_value, pinHash);
              const slotData = JSON.parse(val) as { provider: string; apiKey: string; model?: string };
              if (slotData.provider === 'anthropic') {
                anthropicKey = slotData.apiKey;
                if (slotData.model) anthropicModel = slotData.model;
                break;
              }
            }
          } catch { /* try next slot */ }
        }

        if (anthropicKey) {
          try {
            const focusInstruction = extractFocus
              ? `Focus specifically on extracting: ${extractFocus}`
              : 'Extract and return all readable text content from this document. Preserve structure where relevant.';

            const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'x-api-key': anthropicKey,
                'anthropic-version': '2023-06-01',
                'anthropic-beta': 'pdfs-2024-09-25',
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                model: anthropicModel,
                max_tokens: 4096,
                messages: [{
                  role: 'user',
                  content: [
                    {
                      type: 'document',
                      source: {
                        type: 'base64',
                        media_type: 'application/pdf',
                        data: file_data,
                      },
                    },
                    {
                      type: 'text',
                      text: focusInstruction,
                    },
                  ],
                }],
              }),
            });

            if (apiRes.ok) {
              const apiData = await apiRes.json() as any;
              const extracted = apiData.content?.[0]?.text || '';
              if (extracted && extracted.length > 50) {
                // Persist so search_library can find this PDF in future queries
                try {
                  await db.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL')
                    .bind(extracted, fileId, userId).run();
                  const summary = extracted.substring(0, 600);
                  await db.prepare(
                    `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL`
                  ).bind(summary, extracted.substring(0, 50000), fileId, userId).run();
                  if (cfBindings?.ai && cfBindings?.vectorize) {
                    const docRow = await db.prepare(
                      'SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1'
                    ).bind(fileId, userId).first<{ id: number }>();
                    if (docRow) {
                      const { indexDocumentChunks } = await import('./embeddings');
                      indexDocumentChunks(
                        { DB: db, AI: cfBindings.ai, VECTORIZE: cfBindings.vectorize },
                        userId, docRow.id, extracted
                      ).catch(() => {});
                    }
                  }
                } catch { /* non-critical */ }
              }
              return `Document: ${file_name}\n\n${extracted}`;
            } else {
              const errData = await apiRes.text();
              return `Could not parse ${file_name} via Anthropic API: ${errData.substring(0, 200)}`;
            }
          } catch (err: any) {
            return `Document parsing error for ${file_name}: ${err.message}`;
          }
        }

        return `To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.`;
      }

      // For images: use Anthropic vision API
      if (file_type.startsWith('image/')) {
        let anthropicKey: string | null = null;
        let anthropicModel = 'claude-sonnet-5';
        for (const slot of ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const) {
          try {
            const cred = await db.prepare(
              'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
            ).bind(userId, slot).first<{ encrypted_value: string }>();
            if (cred && pinHash) {
              const val = await decrypt(cred.encrypted_value, pinHash);
              const slotData = JSON.parse(val) as { provider: string; apiKey: string; model?: string };
              if (slotData.provider === 'anthropic') {
                anthropicKey = slotData.apiKey;
                if (slotData.model) anthropicModel = slotData.model;
                break;
              }
            }
          } catch { /* try next slot */ }
        }

        if (!anthropicKey) {
          return `To extract text from images, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.`;
        }

        const focusInstruction = extractFocus
          ? `Focus specifically on: ${extractFocus}`
          : 'Extract all visible text from this image. Include any text from signs, documents, screenshots, or diagrams. If the image contains charts or tables, describe their structure and data.';

        try {
          const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: anthropicModel,
              max_tokens: 4096,
              messages: [{
                role: 'user',
                content: [
                  {
                    type: 'image',
                    source: {
                      type: 'base64',
                      media_type: file_type,
                      data: file_data,
                    },
                  },
                  { type: 'text', text: focusInstruction },
                ],
              }],
            }),
          });

          if (apiRes.ok) {
            const apiData = await apiRes.json() as any;
            const extracted = apiData.content?.[0]?.text || '';
            if (extracted && extracted.length > 50) {
              // Persist extracted text for search_library
              try {
                await db.prepare('UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL')
                  .bind(extracted, fileId, userId).run();
                const summary = extracted.substring(0, 600);
                await db.prepare(
                  `UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL`
                ).bind(summary, extracted.substring(0, 50000), fileId, userId).run();
                if (cfBindings?.ai && cfBindings?.vectorize) {
                  const docRow = await db.prepare(
                    'SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1'
                  ).bind(fileId, userId).first<{ id: number }>();
                  if (docRow) {
                    const { indexDocumentChunks } = await import('./embeddings');
                    indexDocumentChunks(
                      { DB: db, AI: cfBindings.ai, VECTORIZE: cfBindings.vectorize },
                      userId, docRow.id, extracted
                    ).catch(() => {});
                  }
                }
              } catch { /* non-critical */ }
            }
            return `Document: ${file_name}\n\n${extracted}`;
          } else {
            const errData = await apiRes.text();
            return `Could not parse ${file_name} via Anthropic API: ${errData.substring(0, 200)}`;
          }
        } catch (err: any) {
          return `Image parsing error for ${file_name}: ${err.message}`;
        }
      }

      // Unsupported type: return a preview of the raw content
      try {
        const rawText = Buffer.from(file_data, 'base64').toString('utf-8').substring(0, 2000);
        return `Document: ${file_name} (${file_type})\n\nContent preview:\n${rawText}`;
      } catch {
        return `Cannot read file: ${file_name} (${file_type})`;
      }
    }

    case 'compare_documents': {
      const fileIdA = args.file_id_a as string;
      const fileIdB = args.file_id_b as string;
      const focus = args.focus as string | undefined;

      if (!fileIdA || !fileIdB) return 'file_id_a and file_id_b are both required to compare documents.';
      if (fileIdA === fileIdB) return 'file_id_a and file_id_b are the same file — nothing to compare.';

      const [textA, textB] = await Promise.all([
        executeTool('parse_document', { file_id: fileIdA, extract_focus: focus }, db, userId, pinHash, googleClientId, googleClientSecret, googleApiKey, googleCseId, userTimezone, llmProvider, r2Bucket, cfBindings, channel, browserCtx),
        executeTool('parse_document', { file_id: fileIdB, extract_focus: focus }, db, userId, pinHash, googleClientId, googleClientSecret, googleApiKey, googleCseId, userTimezone, llmProvider, r2Bucket, cfBindings, channel, browserCtx),
      ]);

      return `Comparing two documents. Identify additions, removals, and modified sections — cite specifics from both rather than summarizing each in isolation.\n\n=== DOCUMENT A ===\n${textA}\n\n=== DOCUMENT B ===\n${textB}`;
    }

    // === Document Library Search ===
    case 'search_library': {
      const query = args.query as string;
      const limit = Math.min(typeof args.limit === 'number' ? args.limit : 10, 20);
      if (!query) return 'query is required for search_library.';

      // Semantic vector search (when Vectorize is configured)
      if (cfBindings?.ai && cfBindings?.vectorize) {
        try {
          const { semanticDocumentSearch } = await import('./embeddings');
          const semanticResults = await semanticDocumentSearch(
            { DB: db, AI: cfBindings.ai, VECTORIZE: cfBindings.vectorize },
            userId, query, limit
          );
          if (semanticResults.length > 0) {
            const rows = semanticResults.map(r =>
              `[id:${r.document_id}] "${r.filename}" (relevance: ${(r.relevance_score * 100).toFixed(1)}%)\n  Snippet: ${r.chunk.substring(0, 350)}`
            ).join('\n\n');
            return `Found ${semanticResults.length} semantically relevant document(s) for "${query}":\n\n${rows}\n\nUse read_library_file with the id to get the full document text.`;
          }
        } catch { /* fall through to LIKE search */ }
      }

      // Fallback: SQL LIKE search (works without Vectorize or when no embeddings exist yet)
      const results = await db.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(userId, `%${query}%`, `%${query}%`, `%${query}%`, limit)
        .all<{ id: number; name: string; source: string; summary: string | null; status: string; created_at: string; file_id: string | null; dl_extracted: string | null }>();

      // Also search uploaded_files extracted_text for any not caught above
      const ufResults = await db.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(userId, userId, `%${query}%`, userId, `%${query}%`, `%${query}%`, `%${query}%`, limit)
        .all<{ id: number; name: string; source: string; summary: string | null; status: string; created_at: string; file_id: string | null; dl_extracted: string | null }>();

      const allResults = [...(results.results || []), ...(ufResults.results || [])].slice(0, limit);

      if (allResults.length === 0) return `No documents found matching "${query}" in your library.`;

      const rows = allResults.map(r => {
        const preview = (r.summary || r.dl_extracted || '').substring(0, 200);
        return `[id:${r.id}] "${r.name}" (source: ${r.source}, status: ${r.status})\n  Preview: ${preview || '(no preview yet — summarize or ask Karna to read it)'}`;
      }).join('\n\n');

      return `Found ${allResults.length} document(s) matching "${query}":\n\n${rows}\n\nUse read_library_file with the id to get full text.`;
    }

    case 'read_library_file': {
      const idOrName = String(args.id_or_name || '').trim();
      if (!idOrName) return 'id_or_name is required for read_library_file.';

      const numericId = parseInt(idOrName, 10);
      let doc: { id: number; name: string; extracted_text: string | null; summary: string | null; file_id: string | null } | null = null;

      // Try numeric ID first
      if (!isNaN(numericId)) {
        doc = await db.prepare(
          `SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`
        ).bind(numericId, userId).first<{ id: number; name: string; extracted_text: string | null; summary: string | null; file_id: string | null }>();
      }

      // Fall back to name search
      if (!doc) {
        doc = await db.prepare(
          `SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`
        ).bind(userId, `%${idOrName}%`).first<{ id: number; name: string; extracted_text: string | null; summary: string | null; file_id: string | null }>();
      }

      if (!doc) return `Document "${idOrName}" not found. Use search_library to find available documents.`;

      // Prefer document_library.extracted_text (set at upload or by migration)
      let text = doc.extracted_text || null;

      // Fall back to uploaded_files.extracted_text
      if (!text && doc.file_id) {
        const ufRow = await db.prepare(
          'SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?'
        ).bind(doc.file_id, userId).first<{ extracted_text: string | null }>();
        text = ufRow?.extracted_text || null;
      }

      // Fall back to summary
      if (!text) text = doc.summary || null;

      if (!text) {
        return `Document "${doc.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${doc.file_id}") to extract the text first.`;
      }

      return `Document: ${doc.name}\n\n${text.substring(0, 20000)}`;
    }

    // === User-Defined Skills ===
    case 'create_skill': {
      const name = (args.name as string)?.trim();
      const description = (args.description as string)?.trim();
      const instructions = (args.instructions as string)?.trim();

      if (!name || !description || !instructions) {
        return 'create_skill requires name, description, and instructions.';
      }

      // Generate URL-safe slug
      let slug = name.toLowerCase().replace(/[^a-z0-9\s_-]/g, '').replace(/\s+/g, '_').replace(/_+/g, '_').substring(0, 50).replace(/^_|_$/g, '');
      if (!slug) slug = `skill_${Date.now()}`;

      // Ensure unique slug
      const existing = await db.prepare(
        'SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?'
      ).bind(userId, `${slug}%`).all<{ slug: string }>();
      if (existing.results?.some(r => r.slug === slug)) {
        slug = `${slug}_${(existing.results?.length || 0) + 1}`;
      }

      const parameters = JSON.stringify(args.parameters || {});
      const required_tools = JSON.stringify(args.required_tools || []);
      const examples = JSON.stringify(args.examples || []);

      await db.prepare(
        `INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(userId, name, slug, description, instructions, parameters, required_tools, examples).run();

      return `Skill created: **${name}** (invoke as: "${slug}")\n\nYou can now ask me to run "${name}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${name} skill" to execute it.`;
    }

    case 'list_skills': {
      const includeDisabled = args.include_disabled === true;
      const query = includeDisabled
        ? 'SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC'
        : 'SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC';

      const result = await db.prepare(query).bind(userId).all<any>();
      const rows = result.results || [];

      if (rows.length === 0) {
        return "You haven't created any custom skills yet. Ask me to create one: \"Create a skill that...\"";
      }

      const list = rows.map((s: any) =>
        `• **${s.name}** (${s.slug}): ${s.description} [used ${s.usage_count} times${s.enabled ? '' : ' — disabled'}]`
      ).join('\n');

      return `Your custom skills (${rows.length}):\n\n${list}`;
    }

    // ── Unified Docs (UDM) tools ───────────────────────────────────────────
    case 'udm_list_pages': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmListPages(db, userId, pinHash);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_list_pages', err.message);
        return `Failed to list Unified Docs pages: ${err.message}`;
      }
    }

    case 'udm_create_page': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmCreatePage(
          db, userId, pinHash,
          args.title as string,
          args.markdown as string | undefined,
          args.parent_page_title as string | undefined
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_create_page', err.message);
        return `Failed to create Unified Docs page: ${err.message}`;
      }
    }

    case 'udm_read_page': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmReadPage(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_read_page', err.message);
        return `Failed to read Unified Docs page: ${err.message}`;
      }
    }

    case 'udm_write_page': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmWritePage(
          db, userId, pinHash,
          args.page_title as string,
          args.markdown as string
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_write_page', err.message);
        return `Failed to update Unified Docs page: ${err.message}`;
      }
    }

    case 'udm_search': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmSearchPages(db, userId, pinHash, args.query as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_search', err.message);
        return `Failed to search Unified Docs: ${err.message}`;
      }
    }

    case 'udm_delete_page': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmDeletePage(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_delete_page', err.message);
        return `Failed to delete Unified Docs page: ${err.message}`;
      }
    }

    case 'udm_list_comments': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmListComments(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_list_comments', err.message);
        return `Failed to fetch comments: ${err.message}`;
      }
    }

    case 'udm_add_comment': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmAddComment(
          db, userId, pinHash,
          args.page_title as string,
          args.content as string
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_add_comment', err.message);
        return `Failed to add comment: ${err.message}`;
      }
    }

    case 'udm_read_page_with_comments': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmReadPageWithComments(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_read_page_with_comments', err.message);
        return `Failed to read page with comments: ${err.message}`;
      }
    }

    case 'udm_create_database': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmCreateDatabase(db, userId, pinHash, args.title as string, args.parent_title as string | undefined, args.embed_in_page_title as string | undefined);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_create_database', err.message);
        return `Failed to create database: ${err.message}`;
      }
    }

    case 'udm_read_database': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmReadDatabase(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_read_database', err.message);
        return `Failed to read database: ${err.message}`;
      }
    }

    case 'udm_add_row': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmAddRow(
          db, userId, pinHash,
          args.page_title as string,
          (args.properties as Record<string, unknown>) ?? {},
          args.title as string | undefined
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_add_row', err.message);
        return `Failed to add row: ${err.message}`;
      }
    }

    case 'udm_update_row': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmUpdateRow(
          db, userId, pinHash,
          args.page_title as string,
          args.row_id as string,
          (args.properties as Record<string, unknown>) ?? {}
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_update_row', err.message);
        return `Failed to update row: ${err.message}`;
      }
    }

    case 'udm_delete_row': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmDeleteRow(db, userId, pinHash, args.page_title as string, args.row_id as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_delete_row', err.message);
        return `Failed to delete row: ${err.message}`;
      }
    }

    case 'udm_add_property': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmAddProperty(
          db, userId, pinHash,
          args.page_title as string,
          args.name as string,
          args.type as string,
          args.options
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_add_property', err.message);
        return `Failed to add column: ${err.message}`;
      }
    }

    case 'udm_edit_section': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmEditSection(
          db, userId, pinHash,
          args.page_title as string,
          args.old_text as string,
          args.new_text as string,
          args.comment_id as string | undefined,
          args.occurrence as string | number | undefined
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_edit_section', err.message);
        return `Failed to edit section: ${err.message}`;
      }
    }

    case 'udm_list_agent_comments': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmListAgentComments(db, userId, pinHash, args.page_title as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_list_agent_comments', err.message);
        return `Failed to fetch agent comments: ${err.message}`;
      }
    }

    case 'udm_apply_comment': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmApplyComment(
          db, userId, pinHash,
          args.comment_id as string,
          args.new_text as string,
          args.old_text as string | undefined,
          args.occurrence as string | number | undefined
        );
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_apply_comment', err.message);
        return `Failed to apply comment: ${err.message}`;
      }
    }

    case 'udm_resolve_comment': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        return await udmResolveComment(db, userId, pinHash, args.comment_id as string);
      } catch (err: any) {
        if (err instanceof UDMNotConfiguredError) return err.message;
        await logError(db, userId, 'udm', 'udm_resolve_comment', err.message);
        return `Failed to resolve comment: ${err.message}`;
      }
    }

    default: {
      // Check if this is a user-defined skill (matched by slug)
      const slug = toolName;
      const skill = await db.prepare(
        'SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1'
      ).bind(userId, slug).first<{ id: number; name: string; description: string; instructions: string; required_tools: string }>();

      if (skill) {
        // Increment usage count
        await db.prepare(
          'UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).bind(skill.id).run();

        const requiredTools = (() => { try { return JSON.parse(skill.required_tools).join(', '); } catch { return ''; } })();
        const inputContext = Object.keys(args).length > 0
          ? `\n\nInputs provided: ${JSON.stringify(args)}`
          : '';

        return `[SKILL: ${skill.name}] Follow these instructions exactly:

${skill.instructions}${inputContext}

${requiredTools ? `Tools to use: ${requiredTools}` : ''}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`;
      }

      return `Unknown tool: ${toolName}`;
    }
  }
}

// Detects an orphaned user message left by a previously failed/timed-out request.
// When a request dies before the assistant response is stored, the last DB row is a
// user message with no reply. sanitizeMessageHistory would merge it with the new user
// message, causing the LLM to process both requests simultaneously — leading to extra
// tool calls, enforcement retries, and Worker timeouts.
// Fix: store a synthetic assistant error row so history always ends user→assistant.
export async function cleanOrphanedUserMessage(
  memory: MemoryService,
  recentMessages: ConversationRecord[],
  userId: number,
  channel: string,
  threadId: number | undefined,
): Promise<void> {
  if (recentMessages.length > 0 && recentMessages[recentMessages.length - 1].role === 'user') {
    const placeholder = '(Previous request did not complete. Please try again.)';
    await memory.storeMessage(userId, channel, 'assistant', placeholder, '{}', threadId);
    recentMessages.push({
      id: -1, user_id: userId, channel, role: 'assistant',
      content: placeholder, metadata: '{}', token_estimate: placeholder.length,
      created_at: new Date().toISOString(),
    });
  }
}

/**
 * Detect a stale "narration" final assistant message — a short statement where the agent
 * announced its next action but was killed before executing it (e.g. "Now let me read the
 * Vue.js homepage."). Replace it in-memory so the LLM doesn't resume a dead task.
 */
export function neutraliseNarrationFinal(messages: LLMMessage[]): void {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant') {
      const text = typeof messages[i].content === 'string' ? (messages[i].content as string) : '';
      const isNarration =
        text.length < 300 &&
        /^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(text.trim());
      if (isNarration) {
        messages[i] = {
          ...messages[i],
          content: '(My previous response was cut off before completing. Starting fresh.)',
        };
      }
      break;
    }
  }
}

// Main agent runner — handles the agentic loop with provider rotation
export async function runAgent(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn },
  options?: { maxTurns?: number; tools?: LLMTool[]; forceToolUseOnFirstTurn?: boolean }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;
  const agentStart = Date.now();
  const [memoryContext, notesContext, preferencesContext, autoSkillsContext] = await Promise.all([
    memory.buildContext(user.id),
    buildNotesContext(db, user.id),
    fetchPreferencesContext(db, user.id),
    getAutoSkillsContext(db, user.id),
  ]);
  // If we have a thread, load messages from THAT thread only for better context
  const recentMessages = await memory.getRecentConversations(user.id, 30, threadId);
  await cleanOrphanedUserMessage(memory, recentMessages, user.id, message.channel, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext, message.channel, preferencesContext, autoSkillsContext, notesContext);

  const hadRecentResearch = threadHadRecentResearch(recentMessages);

  // Assemble message history — sanitize to prevent consecutive same-role messages
  const messages: LLMMessage[] = sanitizeMessageHistory([
    { role: 'system', content: systemPrompt },
    ...expandThreadContext(recentMessages),
    { role: 'user', content: message.text },
  ]);
  applyResearchFollowUpHint(messages, hadRecentResearch);
  neutraliseNarrationFinal(messages);

  // Auto long-term memory search: if the query suggests recall or working memory is sparse,
  // search long-term memory and inject top results before the first LLM turn.
  // Working memory is already in the system prompt; this surfaces archived context the LLM
  // wouldn't otherwise know to search for.
  const RECALL_PATTERNS = [
    /\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,
    /\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i,
  ];
  const workingMemoryEntryCount = (memoryContext.match(/^- /gm) || []).length;
  const needsLongTermSearch = RECALL_PATTERNS.some(p => p.test(message.text)) || workingMemoryEntryCount < 3;
  if (needsLongTermSearch) {
    try {
      const confidenceResult = await memory.searchWithConfidence(user.id, message.text, { limit: 5 });
      if (confidenceResult.results.length > 0) {
        const { buildConfidenceContext } = await import('./confidence-queries');
        const ltContext = buildConfidenceContext(confidenceResult.results);
        messages[0] = { ...messages[0], content: messages[0].content + confidenceResult.systemPromptSuffix };
        messages.splice(messages.length - 1, 0,
          { role: 'assistant', content: 'I retrieved some relevant context from your long-term memory.' },
          { role: 'user', content: `[Long-term memory retrieved for this query:\n${ltContext}]` }
        );
      } else if (confidenceResult.unmetQuery) {
        const { detectSoundDomain } = await import('./router');
        if (detectSoundDomain(message.text)) {
          const { answerWithFederation } = await import('./federation');
          const fedResult = await answerWithFederation(memory, user.id, message.text).catch(() => null);
          if (fedResult && (fedResult.source === 'eddy' || fedResult.source === 'memory')) {
            messages.splice(messages.length - 1, 0,
              { role: 'assistant', content: 'I checked Eddy\'s sound department records.' },
              { role: 'user', content: `[Eddy data retrieved:\n${fedResult.answer}]` }
            );
          } else {
            const { generateUncertaintyResponse } = await import('./confidence-queries');
            messages.splice(messages.length - 1, 0,
              { role: 'assistant', content: 'I checked my long-term memory and Eddy\'s records.' },
              { role: 'user', content: generateUncertaintyResponse(confidenceResult.unmetQuery) }
            );
          }
        } else {
          const { generateUncertaintyResponse } = await import('./confidence-queries');
          messages.splice(messages.length - 1, 0,
            { role: 'assistant', content: 'I checked my long-term memory.' },
            { role: 'user', content: generateUncertaintyResponse(confidenceResult.unmetQuery) }
          );
        }
      }
    } catch { /* non-critical — proceed without long-term context */ }
  }

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop — max 10 iterations (Telegram uses same cap via runAgentRouted)
  const MAX_TURNS = options?.maxTurns ?? 10;
  const activeTools = options?.tools ?? await loadUserTools(db, user.id);
  let response = '';
  let totalTokens = 0;
  const toolsCalledList: string[] = [];
  let researchCapture: { query: string; report: string } | undefined;
  let agentTurnCount = 0;
  let toolErrorCount = 0;
  // Mutable context shared with executeTool for per-turn remote browser session management
  const browserCtx: BrowserSessionCtx = { hasActiveTask: false, persistSession: false, threadId, channel: message.channel };

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    agentTurnCount = turn + 1;
    try {
      // Trim oversized prior tool-result messages to prevent context bloat across turns
      // (e.g. a full PDF parse result re-sent on every subsequent turn)
      if (turn > 0) trimLargeHistoryMessages(messages);

      // Rate-limit failover is handled by createFallbackProvider in llm/provider.ts —
      // when the primary provider returns 429, it automatically tries the next configured slot.
      const llmResponse = await provider.chat(messages, {
        tools: activeTools,
        // Phase C: on the first turn of high-confidence workspace requests, force the LLM
        // to emit a tool call rather than narrating the action without calling anything.
        toolChoice: turn === 0 && options?.forceToolUseOnFirstTurn ? 'required' : undefined,
      });

      // Track usage
      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      // If there are tool calls, execute them and feed back
      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        // Always push an assistant turn to maintain strict user/assistant alternation.
        // Anthropic rejects consecutive user messages — if content is empty, use tool
        // names as a placeholder so the role pattern stays valid.
        const assistantContent = llmResponse.content || '(tools executed)';
        messages.push({ role: 'assistant', content: assistantContent });

        for (const toolCall of llmResponse.toolCalls) {
          toolsCalledList.push(toolCall.name);
        }
        const toolResultParts = await Promise.all(
          llmResponse.toolCalls.map(async (toolCall) => {
            try {
              const result = await executeToolWithLogging(toolCall.name, toolCall.arguments, db, user.id, { agentType: 'full', providerName: provider.name, channel: message.channel }, user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET, env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET, { ai: env?.AI, vectorize: env?.VECTORIZE, outlookPlaywright: env?.OUTLOOK_PLAYWRIGHT }, browserCtx);
              researchCapture = captureResearchFromResult(toolCall.name, toolCall.arguments, result, researchCapture);
              // Document-reading and research tools get a higher cap so full content is available for merging/processing
              const TOOL_RESULT_MAX_CHARS = toolCall.name === 'compare_documents' ? 40000
                : ['parse_document', 'drive_read_file', 'read_library_file'].includes(toolCall.name) ? 20000
                : toolCall.name === 'research' ? 16000
                : 8000;
              const truncated = result.length > TOOL_RESULT_MAX_CHARS
                ? result.substring(0, TOOL_RESULT_MAX_CHARS) + '\n[...result truncated to prevent token limit — full content was extracted]'
                : result;
              return `[Tool Result for ${toolCall.name}]: ${truncated}`;
            } catch (toolErr: any) {
              toolErrorCount++;
              await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');
              return `[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}`;
            }
          })
        );
        // Combine all results into ONE user message — multiple separate user messages
        // would create consecutive same-role messages which Anthropic rejects with 400.
        messages.push({ role: 'user', content: toolResultParts.join('\n\n') });
        continue;
      }

      // No tool calls — final response
      response = llmResponse.content;
      break;
    } catch (err: any) {
      // Record error and cooldown if rotation is available
      if (rotation) {
        const msg = err.message || '';
        const isAuth = msg.includes('401') || msg.includes('403') || msg.includes('authentication') || msg.includes('credit balance');
        const isRateLimit = msg.includes('429');
        const cooldownMins = isAuth ? 1440 : isRateLimit ? 10 : 5; // 24h for auth, 10m for rate limit, 5m otherwise
        await rotation.recordError(provider.name, msg, cooldownMins);
      }
      await logError(db, user.id, 'llm', 'provider_error', err.message || 'Unknown LLM error', { provider: provider.name, turn });
      throw err;
    }
  }

  // If the loop exhausted all turns without producing a final text response,
  // make one last call with no tools so the LLM can synthesise from what it gathered.
  response = response?.trim() ?? '';
  if (!response) {
    try {
      // Ensure role alternation before fallback call — last message may be role:'user' (tool result)
      if (messages[messages.length - 1]?.role === 'user') {
        messages.push({ role: 'assistant', content: '[gathering results]' });
      }
      messages.push({
        role: 'user',
        content: 'You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge.',
      });
      const fallback = await provider.chat(messages, { tools: [] });
      response = fallback.content || 'I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge.';
    } catch {
      response = 'I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.';
    }
  }

  // Record token usage for rotation tracking (best-effort)
  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }
  try {
    await db.prepare(
      'INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, provider.name, 'full', totalTokens, Date.now() - agentStart, 1, message.channel).run();
  } catch { /* non-critical */ }

  // === Generic action-claim hallucination guard ===
  // Detects when LLM claims to have completed an action but never called the required tool.
  // Covers: schedule, email, memory, sheets, calendar.
  const ACTION_CLAIM_RULES: Array<{
    claimPattern: RegExp;
    requiredTools: string[];
    enforcementMsg: string;
    logType: string;
  }> = [
    {
      claimPattern: REMINDER_CLAIM_PATTERN,
      requiredTools: ['create_schedule', 'update_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.',
      logType: 'schedule_hallucination',
    },
    {
      // Only catch "email SENT" claims — not draft claims (agent may inline draft text legitimately)
      claimPattern: /\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,
      requiredTools: ['gmail_send'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.',
      logType: 'email_hallucination',
    },
    {
      claimPattern: /\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,
      requiredTools: ['store_memory'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.',
      logType: 'memory_hallucination',
    },
    {
      claimPattern: /\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,
      requiredTools: ['append_sheet', 'write_sheet'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.',
      logType: 'sheet_hallucination',
    },
    {
      claimPattern: /\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,
      requiredTools: ['create_calendar_event'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.',
      logType: 'calendar_hallucination',
    },
    {
      claimPattern: /\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,
      requiredTools: ['drive_delete_file'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.',
      logType: 'drive_delete_hallucination',
    },
    {
      claimPattern: /\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,
      requiredTools: ['drive_organise'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.',
      logType: 'drive_organise_hallucination',
    },
    {
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,
      requiredTools: ['create_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.',
      logType: 'create_doc_hallucination',
    },
    {
      claimPattern: /\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,
      requiredTools: ['append_to_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.',
      logType: 'append_doc_hallucination',
    },
    {
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,
      requiredTools: ['create_sheet'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.',
      logType: 'create_sheet_hallucination',
    },
    {
      claimPattern: /\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,
      requiredTools: ['gmail_draft'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.',
      logType: 'draft_hallucination',
    },
    {
      claimPattern: /\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,
      requiredTools: ['gmail_modify'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.',
      logType: 'gmail_modify_hallucination',
    },
    {
      claimPattern: /\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,
      requiredTools: ['delete_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.',
      logType: 'delete_schedule_hallucination',
    },
    {
      claimPattern: /\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,
      requiredTools: ['toggle_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.',
      logType: 'toggle_schedule_hallucination',
    },
    {
      claimPattern: /\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,
      requiredTools: ['delete_sheet_row'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.',
      logType: 'delete_sheet_row_hallucination',
    },
    {
      claimPattern: /\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,
      requiredTools: ['delete_doc_content'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.',
      logType: 'delete_doc_content_hallucination',
    },
  ];
  for (const rule of ACTION_CLAIM_RULES) {
    const claimed = rule.claimPattern.test(response);
    const called = rule.requiredTools.some(t => toolsCalledList.includes(t));
    if (claimed && !called) {
      try {
        await logError(db, user.id, 'llm', rule.logType,
          'LLM claimed action without tool call', { response: response.substring(0, 200) });
        messages.push({ role: 'assistant', content: response });
        messages.push({ role: 'user', content: rule.enforcementMsg });
        const enforced = await provider.chat(messages, {
          tools: activeTools.filter(t => rule.requiredTools.includes(t.name)),
          temperature: 0,
        });
        if (enforced.toolCalls?.length) {
          for (const tc of enforced.toolCalls) {
            const result = await executeToolWithLogging(tc.name, tc.arguments, db, user.id,
              { agentType: 'full', providerName: provider.name, channel: message.channel },
              user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
              env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET,
              { ai: env?.AI, vectorize: env?.VECTORIZE, outlookPlaywright: env?.OUTLOOK_PLAYWRIGHT });
            toolsCalledList.push(tc.name);
            messages.push({ role: 'assistant', content: '', toolCalls: enforced.toolCalls });
            messages.push({ role: 'user', content: result });
          }
          const corrected = await provider.chat(messages, { tools: [] });
          if (corrected.content) response = corrected.content;
        } else {
          response = 'I need to complete that action — could you confirm the details so I can actually do it?';
        }
      } catch { /* non-critical */ }
      break; // Only enforce one hallucination per turn
    }
  }

  // Store assistant response with tool-call evidence
  // Strip any [TOOLS_USED:] the LLM may have generated — system adds verified tag for memory
  let cleanedResponse = response.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i, '').trim();
  // Guard: if LLM returned only a TOOLS_USED tag with no content after it, synthesise a summary
  // so we never return '' to the channel (Telegram would show literal "(empty response)")
  if (!cleanedResponse && toolsCalledList.length > 0) {
    const toolNames = [...new Set(toolsCalledList)].join(', ');
    try {
      if (messages[messages.length - 1]?.role === 'user') {
        messages.push({ role: 'assistant', content: '[completed tools]' });
      }
      messages.push({ role: 'user', content: 'Please summarise what you just did and provide the result to the user.' });
      const summary = await provider.chat(messages, { tools: [] });
      cleanedResponse = summary.content?.trim() || `Done. I used the following tools: ${toolNames}.`;
    } catch {
      cleanedResponse = `Done. I used the following tools: ${toolNames}.`;
    }
  }
  await memory.storeMessage(
    user.id,
    message.channel,
    'assistant',
    stripLLMResponse(cleanedResponse),
    buildAssistantMetadata(toolsCalledList, researchCapture),
    threadId
  );

  // Auto memory extraction — on every 5th assistant turn, run a lightweight LLM pass
  // over the last 10 messages to extract durable facts/preferences into long-term memory.
  // Wrapped in a tight timeout and try-catch so it never blocks or breaks the response.
  try {
    const countRow = await db.prepare(
      'SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?'
    ).bind(user.id, 'assistant').first<{ c: number }>();
    if (countRow && countRow.c % 5 === 0 && countRow.c > 0) {
      await Promise.race([
        extractAndStoreMemories(db, provider, user, memory, messages),
        new Promise<void>((resolve) => setTimeout(resolve, 5000)), // max 5s
      ]);
    }
  } catch { /* non-critical */ }

  // Auto skill pattern detection — record tool sequence and trigger skill generation
  // when the same multi-tool workflow has been repeated enough times.
  if (toolsCalledList.length >= 3) {
    Promise.race([
      recordAndEvaluatePattern(db, provider, user, message.text, toolsCalledList, agentTurnCount, toolErrorCount === 0),
      new Promise<void>((resolve) => setTimeout(resolve, 6000)),
    ]).catch(() => { /* non-critical */ });
  }

  // Close the remote browser session unless it should persist (vault-scoped) or has an active task
  if (browserCtx.sessionId && browserCtx.apiKey && !browserCtx.hasActiveTask && !browserCtx.persistSession) {
    closeBrowserSession(browserCtx.sessionId, browserCtx.apiKey).catch(() => {});
  }

  return cleanedResponse;
}

// Lightweight background pass over recent messages to extract durable facts into long-term memory.
// Looks for: addresses, account IDs, stated preferences, key decisions, resource references.
async function extractAndStoreMemories(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  memory: MemoryService,
  recentMessages: LLMMessage[]
): Promise<void> {
  const last10 = recentMessages.filter(m => m.role !== 'system').slice(-10);
  if (last10.length < 4) return; // not enough context to extract from

  const extractionPrompt = `Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`;

  const extractionMessages: LLMMessage[] = [
    { role: 'system', content: extractionPrompt },
    ...last10,
    { role: 'user', content: 'Extract durable information from the above conversation.' },
  ];

  const response = await provider.chat(extractionMessages, { tools: [] });
  const text = response.content?.trim() || '';
  if (!text || text === 'NONE') return;

  for (const line of text.split('\n')) {
    const parts = line.trim().split('|');
    if (parts.length < 4) continue;
    const [typeRaw, title, content, importanceRaw] = parts;
    const type = (['fact', 'preference', 'context', 'decision', 'summary', 'task'] as const)
      .find(t => t === typeRaw.trim().toLowerCase());
    if (!type || !title?.trim() || !content?.trim()) continue;
    const importance = Math.min(10, Math.max(1, parseInt(importanceRaw) || 5));
    // Store to long-term directly — working memory promotion can happen via store_memory tool
    await memory.store(user.id, type, title.trim(), content.trim(), importance, 'long_term');
  }
}

// === Context Window Management ===
// Smart context management with token counting

const MODEL_CONTEXT_LIMITS: Record<string, number> = {
  'claude-opus-4-8': 1000000,
  'claude-sonnet-5': 1000000,
  'claude-sonnet-4-6': 1000000,
  'claude-haiku-4-5': 200000,
  'gpt-4o': 128000,
  'gpt-4o-mini': 128000,
  'grok-3-mini': 131072,
  'grok-3': 131072,
  'deepseek-chat': 64000,
  'gemini-2.0-flash': 1000000,
  'default': 32000,
};

function getModelContextLimit(providerName: string): number {
  // Try to match known models, otherwise use default
  for (const [model, limit] of Object.entries(MODEL_CONTEXT_LIMITS)) {
    if (providerName.toLowerCase().includes(model.toLowerCase())) {
      return limit;
    }
  }
  return MODEL_CONTEXT_LIMITS.default;
}

function buildManagedContext(
  systemPrompt: string,
  recentMessages: Array<{ role: string; content: string }>,
  userMessage: string,
  providerName: string
): ContextWindow {
  const maxTokens = getModelContextLimit(providerName);
  // Reserve 25% for response + tool results
  const targetBudget = Math.floor(maxTokens * 0.75);
  
  const messages: LLMMessage[] = [];
  let usedTokens = 0;
  let wasTruncated = false;
  
  // System prompt is mandatory
  const systemTokens = estimateTokens(systemPrompt);
  messages.push({ role: 'system', content: systemPrompt });
  usedTokens += systemTokens;
  
  // User message is mandatory
  const userTokens = estimateTokens(userMessage);
  usedTokens += userTokens;
  
  // Fill remaining budget with recent messages (newest first priority)
  const remainingBudget = targetBudget - usedTokens;
  const conversationMessages: LLMMessage[] = [];
  let conversationTokens = 0;
  
  // Process messages from newest to oldest
  for (let i = recentMessages.length - 1; i >= 0; i--) {
    const msg = recentMessages[i];
    const msgTokens = estimateTokens(msg.content);
    
    if (conversationTokens + msgTokens <= remainingBudget) {
      conversationMessages.unshift({
        role: msg.role as LLMMessage['role'],
        content: msg.content,
      });
      conversationTokens += msgTokens;
    } else {
      wasTruncated = true;
      break;
    }
  }
  
  // Assemble final message array
  messages.push(...conversationMessages);
  messages.push({ role: 'user', content: userMessage });
  usedTokens += conversationTokens;
  
  return {
    maxTokens,
    usedTokens,
    messages,
    wasTruncated,
  };
}

// === Streaming Agent Runner ===
// Generator-based agent that yields SSE events for real-time UI updates

export async function* runAgentStreaming(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn }
): AsyncGenerator<SSEEvent, void, unknown> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;
  const agentStart = Date.now();

  // Emit thinking state
  yield {
    type: 'thinking',
    data: { threadId, provider: provider.name },
  };

  // Build context with smart management
  const [memoryContext, notesContext, preferencesContext, autoSkillsContextStream] = await Promise.all([
    memory.buildContext(user.id),
    buildNotesContext(db, user.id),
    fetchPreferencesContext(db, user.id),
    getAutoSkillsContext(db, user.id),
  ]);
  const recentMessages = await memory.getRecentConversations(user.id, 30, threadId);
  await cleanOrphanedUserMessage(memory, recentMessages, user.id, message.channel, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext, message.channel, preferencesContext, autoSkillsContextStream, notesContext);

  const hadRecentResearch = threadHadRecentResearch(recentMessages);
  const expandedHistory = sanitizeMessageHistory([
    ...expandThreadContext(recentMessages),
  ]);
  let userMessageForContext = message.text;
  if (hadRecentResearch) {
    userMessageForContext = `${RESEARCH_FOLLOWUP_HINT}\n\n${message.text}`;
  }

  // Apply context window management
  const context = buildManagedContext(
    systemPrompt,
    expandedHistory.map(m => ({ role: m.role, content: m.content as string })),
    userMessageForContext,
    provider.name
  );

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Load active tools (base + user skills)
  const activeToolsStream = await loadUserTools(db, user.id);

  // Agentic loop with streaming events
  const MAX_TURNS = 10;
  let response = '';
  let totalTokens = 0;
  const messages = [...context.messages];
  const toolsCalledList: string[] = [];
  let researchCapture: { query: string; report: string } | undefined;
  let streamTurnCount = 0;
  let streamToolErrorCount = 0;
  // Mutable context shared with executeTool for per-turn remote browser session management
  const browserCtx: BrowserSessionCtx = { hasActiveTask: false, persistSession: false, threadId, channel: message.channel };

  const RECALL_PATTERNS = [
    /\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,
    /\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i,
  ];
  const workingMemoryEntryCount = (memoryContext.match(/^- /gm) || []).length;
  const needsLongTermSearch =
    RECALL_PATTERNS.some(p => p.test(message.text)) ||
    workingMemoryEntryCount < 3 ||
    hadRecentResearch;
  if (needsLongTermSearch) {
    try {
      const confidenceResult = await memory.searchWithConfidence(user.id, message.text, { limit: 5 });
      if (confidenceResult.results.length > 0) {
        const { buildConfidenceContext } = await import('./confidence-queries');
        const ltContext = buildConfidenceContext(confidenceResult.results);
        messages[0] = { ...messages[0], content: messages[0].content + confidenceResult.systemPromptSuffix };
        messages.splice(messages.length - 1, 0,
          { role: 'assistant', content: 'I retrieved some relevant context from your long-term memory.' },
          { role: 'user', content: `[Long-term memory retrieved for this query:\n${ltContext}]` }
        );
      } else if (confidenceResult.unmetQuery) {
        const { detectSoundDomain } = await import('./router');
        if (detectSoundDomain(message.text)) {
          const { answerWithFederation } = await import('./federation');
          const fedResult = await answerWithFederation(memory, user.id, message.text).catch(() => null);
          if (fedResult && (fedResult.source === 'eddy' || fedResult.source === 'memory')) {
            messages.splice(messages.length - 1, 0,
              { role: 'assistant', content: 'I checked Eddy\'s sound department records.' },
              { role: 'user', content: `[Eddy data retrieved:\n${fedResult.answer}]` }
            );
          } else {
            const { generateUncertaintyResponse } = await import('./confidence-queries');
            messages.splice(messages.length - 1, 0,
              { role: 'assistant', content: 'I checked my long-term memory and Eddy\'s records.' },
              { role: 'user', content: generateUncertaintyResponse(confidenceResult.unmetQuery) }
            );
          }
        } else {
          const { generateUncertaintyResponse } = await import('./confidence-queries');
          messages.splice(messages.length - 1, 0,
            { role: 'assistant', content: 'I checked my long-term memory.' },
            { role: 'user', content: generateUncertaintyResponse(confidenceResult.unmetQuery) }
          );
        }
      }
    } catch { /* non-critical */ }
  }

  neutraliseNarrationFinal(messages);

  const streamMetadata = () => buildAssistantMetadata(toolsCalledList, researchCapture);

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    streamTurnCount = turn + 1;
    try {
      // Emit thinking for each turn after the first
      if (turn > 0) {
        yield { type: 'thinking', data: { threadId } };
        // Trim oversized prior tool-result messages to prevent context bloat across turns
        trimLargeHistoryMessages(messages);
      }

      // Rate-limit failover is handled by createFallbackProvider in llm/provider.ts —
      // when the primary provider returns 429, it automatically tries the next configured slot.
      const llmResponse = await provider.chat(messages, { tools: activeToolsStream });

      // Track usage
      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      // Handle tool calls
      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        // Stream pre-tool text only if it's a brief note (≤ 150 chars) AND
        // doesn't start with [calling: — that pattern is an internal placeholder
        // that the LLM sometimes mimics from conversation history, causing it to
        // show up as visible chat text.
        const preToolText = llmResponse.content?.trim() ?? '';
        if (preToolText && preToolText.length <= 150 && !/^\[calling:/i.test(preToolText)) {
          yield { type: 'chunk', data: { text: llmResponse.content, threadId } };
        }
        // Use a neutral internal marker (not [calling:...]) so the LLM doesn't
        // mimic the format in subsequent turns and output it as chat text.
        const assistantContent = llmResponse.content || '(tools executed)';
        messages.push({ role: 'assistant', content: assistantContent });

        // Execute tools sequentially (preserves tool_start/tool_end event ordering for streaming UI).
        // Collect results as strings, then push ONE combined user message to avoid consecutive same-role messages.
        const toolResultParts: string[] = [];
        for (const toolCall of llmResponse.toolCalls) {
          // Emit tool start
          yield {
            type: 'tool_start',
            data: {
              tool: toolCall.name,
              toolArgs: toolCall.arguments,
              threadId,
            },
          };

          // Record the tool name before execution — mirrors the non-streaming path and ensures
          // the hallucination guard never sees a tool as "not called" just because the tool
          // threw an exception after writing data (e.g. JSON parse error on Sheets API response).
          toolsCalledList.push(toolCall.name);

          try {
            // Shorthand so we don't repeat all params twice below
            const runTool = (name: string, args: Record<string, unknown>) =>
              executeToolWithLogging(
                name, args, db, user.id,
                { agentType: 'full', providerName: provider.name, channel: message.channel },
                user.pin_hash,
                env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
                env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID,
                user.timezone, provider, env?.DOCUMENTS_BUCKET,
                { ai: env?.AI, vectorize: env?.VECTORIZE, outlookPlaywright: env?.OUTLOOK_PLAYWRIGHT },
                browserCtx
              );

            let result: string;

            if (toolCall.name === 'research') {
              const depth = (toolCall.arguments.depth as string) || 'quick';
              const ackMsg = depth === 'thorough'
                ? 'Starting deep research with Opus 4.8 — planning queries, reading sources, and identifying gaps. This takes 2-4 minutes and uses ~3 Opus API calls.'
                : 'Researching with Opus 4.8... (45–90 seconds)';
              yield {
                type: 'research_ack',
                data: { message: ackMsg, threadId },
              };
            }

            if (toolCall.name === 'browser_task' || toolCall.name === 'browser_task_status') {
              // Browser tools are slow (30-120s). Emit an immediate acknowledgment before work
              // starts so the user knows the task was accepted, then send progress updates every
              // 15s to keep the SSE connection alive and reduce perceived wait time.
              const HEARTBEAT_MS = 15000;

              if (toolCall.name === 'browser_task') {
                const siteName = toolCall.arguments.site_name as string | undefined;
                const ackMsg = siteName
                  ? `Starting now — opening ${siteName} in a browser. I'll notify you when done.`
                  : `Starting now — running browser task. I'll notify you when done.`;
                yield {
                  type: 'browser_ack',
                  data: {
                    message: ackMsg,
                    startedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: user.timezone || 'UTC' }),
                    threadId,
                  },
                };
              }

              // Time-based progress messages (15s cadence, up to ~20 stages across the 5-min window)
              const BROWSER_PROGRESS_MSGS = [
                'Still working — browser launched, navigating to site...',
                'Still working — page loaded, scanning for content...',
                'Still working — reading and extracting results...',
                'Still working — almost there, finalising output...',
                'Taking a bit longer — site may require extra steps...',
                'Still running — browser is working through the page...',
                'Continuing — extracting and processing data...',
                'Still going — complex task, nearly there...',
                'Almost done — wrapping up the browser session...',
                'Still running — holding on a little longer...',
                'Browser is still active — this one is taking time...',
                'Patience — still working through the task...',
                'Still running — will have a result for you shortly...',
              ];

              const toolPromise = runTool(toolCall.name, toolCall.arguments);
              let heartbeatCount = 0;
              outer: while (true) {
                const race = await Promise.race([
                  toolPromise.then(r => ({ done: true, r } as const)),
                  new Promise<{ done: false }>(resolve => setTimeout(() => resolve({ done: false }), HEARTBEAT_MS)),
                ]);
                if (race.done) { result = race.r; break outer; }
                if (toolCall.name === 'browser_task') {
                  const msg = BROWSER_PROGRESS_MSGS[Math.min(heartbeatCount, BROWSER_PROGRESS_MSGS.length - 1)];
                  yield { type: 'browser_progress', data: { message: msg, elapsed_s: (heartbeatCount + 1) * 15, threadId } };
                } else {
                  yield { type: 'thinking', data: { threadId } };
                }
                heartbeatCount++;
              }

              // If browser_task timed out, auto-follow-up with browser_task_status transparently.
              // The LLM receives the final result directly — no follow-up message to the user needed.
              if (toolCall.name === 'browser_task') {
                const timeoutMatch = result.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);
                if (timeoutMatch) {
                  yield { type: 'browser_progress', data: { message: 'Task still running — checking final status...', threadId } };
                  const statusPromise = runTool('browser_task_status', { task_id: timeoutMatch[1] });
                  outer2: while (true) {
                    const race = await Promise.race([
                      statusPromise.then(r => ({ done: true, r } as const)),
                      new Promise<{ done: false }>(resolve => setTimeout(() => resolve({ done: false }), HEARTBEAT_MS)),
                    ]);
                    if (race.done) { result = race.r; break outer2; }
                    yield { type: 'thinking', data: { threadId } };
                  }

                  // executeTool('browser_task') already inserted a pending_browser_tasks row on
                  // timeout (line ~3300). If the follow-up status check resolved the task, delete
                  // that row so the cron notifier doesn't send a redundant notification after the
                  // streaming response already delivered the result to the user.
                  if (!result.startsWith('[still-running]') && !result.startsWith('[NO-OUTPUT]') && !result.startsWith('Browser')) {
                    try {
                      await db.prepare(
                        `DELETE FROM pending_browser_tasks WHERE user_id = ? AND task_id = ? AND notified = 0`
                      ).bind(user.id, timeoutMatch[1]).run();
                    } catch { /* non-critical */ }
                  }
                }
              }
            } else if (toolCall.name === 'research') {
              // Research is slow (45s quick / 2-4min thorough). Send periodic heartbeat pings so
              // the SSE connection stays alive and the user sees ongoing progress indicators.
              const RESEARCH_HEARTBEAT_MS = 20000;
              const depth = (toolCall.arguments.depth as string) || 'quick';
              const RESEARCH_PROGRESS_MSGS = depth === 'thorough' ? [
                'Still researching — planning sub-queries...',
                'Still researching — fetching sources...',
                'Still researching — reading pages...',
                'Still researching — identifying gaps...',
                'Still researching — running gap searches...',
                'Still researching — synthesising findings...',
                'Almost done — writing final report...',
                'Wrapping up — almost there...',
              ] : [
                'Still researching — fetching sources...',
                'Still researching — reading pages...',
                'Almost done — synthesising findings...',
              ];
              const toolPromise = runTool(toolCall.name, toolCall.arguments);
              let researchHeartbeatCount = 0;
              researchLoop: while (true) {
                const race = await Promise.race([
                  toolPromise.then(r => ({ done: true, r } as const)),
                  new Promise<{ done: false }>(resolve => setTimeout(() => resolve({ done: false }), RESEARCH_HEARTBEAT_MS)),
                ]);
                if (race.done) { result = race.r; break researchLoop; }
                const msg = RESEARCH_PROGRESS_MSGS[Math.min(researchHeartbeatCount, RESEARCH_PROGRESS_MSGS.length - 1)];
                yield { type: 'research_progress', data: { message: msg, elapsed_s: (researchHeartbeatCount + 1) * 20, threadId } };
                researchHeartbeatCount++;
              }
            } else {
              result = await runTool(toolCall.name, toolCall.arguments);
            }

            // Emit tool end with result — strip internal-only annotations before sending to UI.
            // "| Operator hint: ..." is LLM context, not user-facing text.
            // Sentinel prefixes ([BROWSER_TIMEOUT:, [NO-OUTPUT], [still-running]) are also replaced
            // with brief human-readable summaries so the tool indicator stays clean.
            let uiResult = result;
            if (toolCall.name === 'browser_task' || toolCall.name === 'browser_task_status') {
              if (/^\[BROWSER_TIMEOUT:/.test(uiResult)) {
                uiResult = 'Task timed out — still running in background.';
              } else if (/^\[NO-OUTPUT\]/.test(uiResult)) {
                uiResult = 'Browser task finished but returned no content.';
              } else if (/^\[still-running\]/.test(uiResult)) {
                uiResult = 'Still running — will notify when done.';
              } else {
                // Strip "| Operator hint: ..." from failure messages
                uiResult = uiResult.replace(/\s*\|\s*Operator hint:.*$/s, '');
              }
            }
            yield {
              type: 'tool_end',
              data: {
                tool: toolCall.name,
                toolResult: uiResult.substring(0, 500) + (uiResult.length > 500 ? '...' : ''),
                threadId,
              },
            };

            // Document-reading and research tools get a higher cap so full content is available for merging/processing
            const TOOL_RESULT_MAX_CHARS = toolCall.name === 'compare_documents' ? 40000
              : ['parse_document', 'drive_read_file', 'read_library_file'].includes(toolCall.name) ? 20000
              : toolCall.name === 'research' ? 16000
              : 8000;
            const truncatedResult = result.length > TOOL_RESULT_MAX_CHARS
              ? result.substring(0, TOOL_RESULT_MAX_CHARS) + '\n[...result truncated to prevent token limit — full content was extracted]'
              : result;
            researchCapture = captureResearchFromResult(toolCall.name, toolCall.arguments, result, researchCapture);
            toolResultParts.push(`[Tool Result for ${toolCall.name}]: ${truncatedResult}`);
          } catch (toolErr: any) {
            streamToolErrorCount++;
            await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');

            yield {
              type: 'tool_end',
              data: {
                tool: toolCall.name,
                toolResult: `Error: ${toolErr.message || 'Execution failed'}`,
                threadId,
              },
            };

            toolResultParts.push(`[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}`);
          }
        }
        // Combine all results into ONE user message — multiple separate user messages
        // would create consecutive same-role messages which Anthropic rejects with 400.
        messages.push({ role: 'user', content: toolResultParts.join('\n\n') });
        continue;
      }

      // No tool calls — stream final response
      response = llmResponse.content;

      // Persist before streaming — ensures the message is in DB even if the
      // worker is killed after chunks are sent (e.g. Cloudflare timeout on
      // long requests). The hallucination guard below may overwrite this if
      // it fires, but persistence is the priority.
      const cleanedStream = stripLLMResponse(response);
      await memory.storeMessage(user.id, message.channel, 'assistant', cleanedStream, streamMetadata(), threadId);

      // Stream response in chunks for perceived responsiveness
      const chunkSize = 50; // characters per chunk
      for (let i = 0; i < cleanedStream.length; i += chunkSize) {
        const chunk = cleanedStream.substring(i, i + chunkSize);
        yield { type: 'chunk', data: { text: chunk, threadId } };
        // Small delay between chunks for smooth streaming effect
        if (i + chunkSize < cleanedStream.length) {
          await new Promise(r => setTimeout(r, 10));
        }
      }
      break;
    } catch (err: any) {
      // Record error and cooldown
      if (rotation) {
        const msg = err.message || '';
        const isAuth = msg.includes('401') || msg.includes('403') || msg.includes('authentication') || msg.includes('credit balance');
        const isRateLimit = msg.includes('429');
        const cooldownMins = isAuth ? 1440 : isRateLimit ? 10 : 5;
        await rotation.recordError(provider.name, msg, cooldownMins);
      }
      await logError(db, user.id, 'llm', 'provider_error', err.message || 'Unknown LLM error', { provider: provider.name, turn });

      const rawMsg = err.message || 'An error occurred';
      const streamErrMsg = rawMsg.includes('429') || rawMsg.toLowerCase().includes('rate limit') || rawMsg.toLowerCase().includes('too many requests')
        ? 'Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.'
        : rawMsg;
      try {
        await memory.storeMessage(user.id, message.channel, 'assistant', `⚠️ ${streamErrMsg}`, '{}', threadId);
      } catch { /* non-critical */ }
      yield {
        type: 'error',
        data: { error: streamErrMsg, threadId },
      };
      return;
    }
  }

  // If the loop exhausted all turns without a final text response, synthesise from gathered context.
  response = response?.trim() ?? '';
  if (!response) {
    try {
      messages.push({
        role: 'user',
        content: 'You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge.',
      });
      const fallback = await provider.chat(messages, { tools: [] });
      response = fallback.content || 'I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.';
      const cleanedFallback = stripLLMResponse(response);
      await memory.storeMessage(user.id, message.channel, 'assistant', cleanedFallback, streamMetadata(), threadId);
      const chunkSize = 50;
      for (let i = 0; i < cleanedFallback.length; i += chunkSize) {
        yield { type: 'chunk', data: { text: cleanedFallback.substring(i, i + chunkSize), threadId } };
        if (i + chunkSize < cleanedFallback.length) await new Promise(r => setTimeout(r, 10));
      }
    } catch {
      response = 'I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.';
      await memory.storeMessage(user.id, message.channel, 'assistant', response, streamMetadata(), threadId).catch(() => {});
      yield { type: 'chunk', data: { text: response, threadId } };
    }
  }

  // Record token usage (best-effort)
  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }
  try {
    await db.prepare(
      'INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, provider.name, 'full', totalTokens, Date.now() - agentStart, 1, message.channel).run();
  } catch { /* non-critical */ }

  // === Generic action-claim hallucination guard (streaming) ===
  const ACTION_CLAIM_RULES_S: Array<{
    claimPattern: RegExp;
    requiredTools: string[];
    enforcementMsg: string;
    logType: string;
  }> = [
    {
      claimPattern: REMINDER_CLAIM_PATTERN,
      requiredTools: ['create_schedule', 'update_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.',
      logType: 'schedule_hallucination',
    },
    {
      // Only catch "email SENT" claims — not draft claims (agent may inline draft text legitimately)
      claimPattern: /\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,
      requiredTools: ['gmail_send'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.',
      logType: 'email_hallucination',
    },
    {
      claimPattern: /\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,
      requiredTools: ['store_memory'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.',
      logType: 'memory_hallucination',
    },
    {
      claimPattern: /\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,
      requiredTools: ['append_sheet', 'write_sheet'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.',
      logType: 'sheet_hallucination',
    },
    {
      claimPattern: /\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,
      requiredTools: ['create_calendar_event'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.',
      logType: 'calendar_hallucination',
    },
    {
      claimPattern: /\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,
      requiredTools: ['drive_delete_file'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.',
      logType: 'drive_delete_hallucination',
    },
    {
      claimPattern: /\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,
      requiredTools: ['drive_organise'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.',
      logType: 'drive_organise_hallucination',
    },
    {
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,
      requiredTools: ['create_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.',
      logType: 'create_doc_hallucination',
    },
    {
      claimPattern: /\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,
      requiredTools: ['append_to_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.',
      logType: 'append_doc_hallucination',
    },
    {
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,
      requiredTools: ['create_sheet'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.',
      logType: 'create_sheet_hallucination',
    },
    {
      claimPattern: /\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,
      requiredTools: ['gmail_draft'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.',
      logType: 'draft_hallucination',
    },
    {
      claimPattern: /\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,
      requiredTools: ['gmail_modify'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.',
      logType: 'gmail_modify_hallucination',
    },
    {
      claimPattern: /\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,
      requiredTools: ['delete_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.',
      logType: 'delete_schedule_hallucination',
    },
    {
      claimPattern: /\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,
      requiredTools: ['toggle_schedule'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.',
      logType: 'toggle_schedule_hallucination',
    },
    {
      claimPattern: /\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,
      requiredTools: ['delete_sheet_row'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.',
      logType: 'delete_sheet_row_hallucination',
    },
    {
      claimPattern: /\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,
      requiredTools: ['delete_doc_content'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.',
      logType: 'delete_doc_content_hallucination',
    },
  ];
  for (const rule of ACTION_CLAIM_RULES_S) {
    const claimed = rule.claimPattern.test(response);
    const called = rule.requiredTools.some(t => toolsCalledList.includes(t));
    if (claimed && !called) {
      try {
        await logError(db, user.id, 'llm', rule.logType,
          'LLM claimed action without tool call (streaming)', { response: response.substring(0, 200) });
        messages.push({ role: 'assistant', content: response });
        messages.push({ role: 'user', content: rule.enforcementMsg });
        const enforced = await provider.chat(messages, {
          tools: activeToolsStream.filter(t => rule.requiredTools.includes(t.name)),
          temperature: 0,
        });
        if (enforced.toolCalls?.length) {
          for (const tc of enforced.toolCalls) {
            const result = await executeToolWithLogging(tc.name, tc.arguments, db, user.id,
              { agentType: 'full', providerName: provider.name, channel: message.channel },
              user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
              env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET,
              { ai: env?.AI, vectorize: env?.VECTORIZE, outlookPlaywright: env?.OUTLOOK_PLAYWRIGHT });
            toolsCalledList.push(tc.name);
            messages.push({ role: 'assistant', content: '', toolCalls: enforced.toolCalls });
            messages.push({ role: 'user', content: result });
          }
          const corrected = await provider.chat(messages, { tools: [] });
          if (corrected.content) response = corrected.content;
        } else {
          response = 'I need to complete that action — could you confirm the details so I can actually do it?';
        }
      } catch { /* non-critical */ }
      break; // Only enforce one hallucination per turn
    }
  }

  // Auto skill pattern detection (streaming path) — fire-and-forget, max 6s
  if (toolsCalledList.length >= 3) {
    Promise.race([
      recordAndEvaluatePattern(db, provider, user, message.text, toolsCalledList, streamTurnCount, streamToolErrorCount === 0),
      new Promise<void>((resolve) => setTimeout(resolve, 6000)),
    ]).catch(() => { /* non-critical */ });
  }

  // Close the remote browser session unless it should persist (vault-scoped) or has an active task
  if (browserCtx.sessionId && browserCtx.apiKey && !browserCtx.hasActiveTask && !browserCtx.persistSession) {
    closeBrowserSession(browserCtx.sessionId, browserCtx.apiKey).catch(() => {});
  }

  // Emit completion event
  yield {
    type: 'done',
    data: {
      threadId,
      provider: provider.name,
      tokenCount: totalTokens,
    },
  };
}

// =============================================
// SUB-AGENT ROUTING SYSTEM
// =============================================
// Classifies user intent → dispatches to a focused sub-agent → returns result
// === Tier 1 / Tier 2 Direct Tool Dispatch ===
// Calls a tool programmatically without an LLM deciding to call it.
// Eliminates hallucination for the covered operation: the LLM never gets to narrate instead of act.
async function dispatchToolDirectly(
  op: { tool: string; args: Record<string, unknown> },
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  memory: MemoryService,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn },
  threadId?: number
): Promise<string> {
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);
  const result = await executeToolWithLogging(
    op.tool, op.args, db, user.id,
    { agentType: 'direct', channel: message.channel },
    user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
    env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET,
    { ai: env?.AI, vectorize: env?.VECTORIZE, outlookPlaywright: env?.OUTLOOK_PLAYWRIGHT }
  );
  // Strip metadata tag before storing to prevent it from appearing in user-visible messages
  const storedContent = `[TOOLS_USED: ${op.tool}] ${result}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i, '');
  await memory.storeMessage(user.id, message.channel, 'assistant', storedContent, '{}', threadId);
  return result;
}

// Each sub-agent has: smaller prompt (~500-800 words vs ~3000), only its tools, faster execution
// Falls back to the full monolithic runAgent for 'multi' intent or on error

export async function runAgentRouted(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Build memory context (needed for both classification and sub-agent)
  const memoryContext = await memory.buildContext(user.id);
  const recentForRouting = await memory.getRecentConversations(user.id, 6, threadId);

  // Classify intent: conversation (no tools) → lightweight chat, everything else → full agent
  const route = classifyIntentFast(message.text, memoryContext, buildRoutingContext(recentForRouting));
  if (route.agent === 'conversation') {
    return runConversationAgent(message, db, provider, user, memoryContext, rotation, threadId);
  }

  // === Tier 1: Deterministic dispatch — intent + params fully resolved from message alone ===
  // No LLM involved. Tool is called programmatically. Zero hallucination risk.
  const tier1Op = detectDeterministicOp(message.text);
  if (tier1Op) {
    return dispatchToolDirectly(tier1Op, message, db, provider, user, memory, env, threadId);
  }

  // === Tier 2: Intent clear, params extracted from recent conversation context ===
  // No LLM for the tool dispatch; only regex over recent messages. Zero hallucination risk.
  const recentForContext = (await memory.getRecentConversations(user.id, 10, threadId))
    .map(m => m.content).join('\n');
  const tier2Op = detectTierTwoOp(message.text, recentForContext);
  if (tier2Op) {
    return dispatchToolDirectly(tier2Op, message, db, provider, user, memory, env, threadId);
  }

  // === Tier 3: Full LLM agentic loop ===
  // Phase C: force tool use on first turn for high-confidence workspace requests.
  // Prevents the LLM narrating an action instead of calling the tool.
  const forceToolUse = route.confidence >= 0.85;

  // Telegram: same agent loop as web; webhook allows up to 6 min on Render-backed processing
  if (message.channel === 'telegram') {
    const userTools = await loadUserTools(db, user.id);
    return runAgent(message, db, provider, user, rotation, env, { maxTurns: 10, tools: userTools, forceToolUseOnFirstTurn: forceToolUse });
  }
  return runAgent(message, db, provider, user, rotation, env, { forceToolUseOnFirstTurn: forceToolUse });
}


// Lightweight conversation agent — no tools, just personality + memory + chat
async function runConversationAgent(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  memoryContext: string,
  rotation?: ProviderRotation,
  threadId?: number
): Promise<string> {
  const memory = new MemoryService(db);
  const agentStart = Date.now();
  const currentDateTime = formatDateForTimezone(user.timezone);
  const preferencesContext = await fetchPreferencesContext(db, user.id);
  const enrichedMemory = preferencesContext
    ? `## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)\nThese rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.\n${preferencesContext}\n\n${memoryContext}`
    : memoryContext;
  const systemPrompt = buildSubAgentPrompt('conversation', user, enrichedMemory, user.timezone, currentDateTime, message.channel);

  const recentMessages = (await memory.getRecentConversations(user.id, 30, threadId))
    .filter(m => !m.content.startsWith('[Autonomous Scheduled Task]') && !m.content.startsWith('[Scheduled Reminder]'));

  const hadRecentResearch = threadHadRecentResearch(recentMessages);
  const messages: LLMMessage[] = sanitizeMessageHistory([
    { role: 'system', content: systemPrompt },
    ...expandThreadContext(recentMessages),
    { role: 'user', content: message.text },
  ]);
  applyResearchFollowUpHint(messages, hadRecentResearch);

  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  let totalTokens = 0;
  let response = '';

  try {
    // Single LLM call — no tools, no loop
    const llmResponse = await provider.chat(messages, { temperature: 0.8 });
    if (llmResponse.usage) {
      totalTokens = llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
    }
    response = llmResponse.content;
  } catch (err: any) {
    if (rotation) {
      const msg = err.message || '';
      const isAuth = msg.includes('401') || msg.includes('403') || msg.includes('authentication') || msg.includes('credit balance');
      const isRateLimit = msg.includes('429');
      const cooldownMins = isAuth ? 1440 : isRateLimit ? 10 : 5;
      await rotation.recordError(provider.name, msg, cooldownMins);
    }
    await logError(db, user.id, 'llm', 'conversation_error', err.message, { provider: provider.name });
    throw err;
  }

  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }
  try {
    await db.prepare(
      'INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, provider.name, 'conversation', totalTokens, Date.now() - agentStart, 1, message.channel).run();
  } catch { /* non-critical */ }

  const cleanConvResponse = stripLLMResponse(response);
  await memory.storeMessage(user.id, message.channel, 'assistant', cleanConvResponse, '{}', threadId);

  return cleanConvResponse;
}

// Stream a tier-1/2 direct tool dispatch over SSE (mirrors runAgentRouted for /chat/stream).
async function* streamDirectToolDispatch(
  op: { tool: string; args: Record<string, unknown> },
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  memory: MemoryService,
  env: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn } | undefined,
  threadId: number | undefined
): AsyncGenerator<SSEEvent, void, unknown> {
  yield {
    type: 'tool_start',
    data: { tool: op.tool, toolArgs: op.args, threadId },
  };
  const result = await dispatchToolDirectly(op, message, db, provider, user, memory, env, threadId);
  yield {
    type: 'tool_end',
    data: {
      tool: op.tool,
      toolResult: result.substring(0, 500) + (result.length > 500 ? '...' : ''),
      threadId,
    },
  };
  const cleaned = stripLLMResponse(result);
  const chunkSize = 50;
  for (let i = 0; i < cleaned.length; i += chunkSize) {
    yield { type: 'chunk', data: { text: cleaned.substring(i, i + chunkSize), threadId } };
    if (i + chunkSize < cleaned.length) {
      await new Promise(r => setTimeout(r, 10));
    }
  }
  yield { type: 'done', data: { threadId, provider: provider.name, tokenCount: 0 } };
}

// =============================================
// ROUTED STREAMING AGENT (for web UI SSE)
// =============================================
export async function* runAgentStreamingRouted(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex; OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn }
): AsyncGenerator<SSEEvent, void, unknown> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  const memoryContext = await memory.buildContext(user.id);
  const recentForRouting = await memory.getRecentConversations(user.id, 6, threadId);
  const route = classifyIntentFast(message.text, memoryContext, buildRoutingContext(recentForRouting));

  yield { type: 'thinking', data: { threadId, provider: provider.name } };

  // Non-conversation → tier 1/2 direct dispatch, else full streaming agent
  if (route.agent !== 'conversation') {
    const tier1Op = detectDeterministicOp(message.text);
    if (tier1Op) {
      yield* streamDirectToolDispatch(tier1Op, message, db, provider, user, memory, env, threadId);
      return;
    }

    const recentForContext = (await memory.getRecentConversations(user.id, 10, threadId))
      .map(m => m.content).join('\n');
    const tier2Op = detectTierTwoOp(message.text, recentForContext);
    if (tier2Op) {
      yield* streamDirectToolDispatch(tier2Op, message, db, provider, user, memory, env, threadId);
      return;
    }

    yield* runAgentStreaming(message, db, provider, user, rotation, env);
    return;
  }

  // Conversation → single LLM call, stream result as chunks
  try {
    const response = await runConversationAgent(message, db, provider, user, memoryContext, rotation, threadId);
    const chunkSize = 50;
    for (let i = 0; i < response.length; i += chunkSize) {
      yield { type: 'chunk', data: { text: response.substring(i, i + chunkSize), threadId } };
      if (i + chunkSize < response.length) {
        await new Promise(r => setTimeout(r, 10));
      }
    }
  } catch (err: any) {
    const errMsg = err.message || 'An error occurred';
    yield { type: 'error', data: { error: errMsg, threadId } };
    return;
  }

  yield { type: 'done', data: { threadId, provider: provider.name, tokenCount: 0 } };
}
