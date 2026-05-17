// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord, SSEEvent, ContextWindow, ConversationRecord } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation, logError } from './llm/provider';
import { GoogleServices } from './google';
import { searchPlaces, getPlaceDetails, getDirections, translateText, searchYouTube, getDistanceMatrix, geocode, webSearch } from './google-apis';
import { GmailService } from './gmail';
import { conductResearch } from './research';
import { runBrowserTask, getBrowserTaskStatus, buildBlueDartTrackingTask, createBrowserSession, closeBrowserSession } from './browser';
import { decrypt, encrypt } from './crypto';
import { extractDocxTextFromBuffer as extractDocxText } from './docx';
import { classifyIntentFast, buildSubAgentPrompt, detectDeterministicOp, detectTierTwoOp } from './router';
import { recordAndEvaluatePattern, getAutoSkillsContext } from './skills';

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
        schedule_type: { type: 'string', enum: ['interval', 'daily', 'weekly', 'once'], description: 'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily).' },
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
    description: 'Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.',
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
    description: 'Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")' },
        max_results: { type: 'number', description: 'Number of results (1-20). Default: 10' },
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
    description: 'Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Default search tool — use whenever your training knowledge might be stale, uncertain, or high-stakes. Covers: weather, travel, recommendations, comparisons, product questions, reviews, current data, anything needing a verified or up-to-date answer. Only skip this in favor of web_search when user wants raw links or real-time scores.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")' },
        depth: { type: 'string', enum: ['quick', 'thorough'], description: 'quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick' },
        site: { type: 'string', description: 'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")' },
      },
      required: ['query'],
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
    description: 'Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.',
    parameters: {
      type: 'object',
      properties: {
        site_name: { type: 'string', description: 'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.' },
      },
      required: ['site_name'],
    },
  },
  // === Google Public APIs (API Key-based) ===
  {
    name: 'search_places',
    description: 'Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")' },
        type: { type: 'string', description: 'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_place_details',
    description: 'Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.',
    parameters: {
      type: 'object',
      properties: {
        place_id: { type: 'string', description: 'The place_id from a search_places result' },
      },
      required: ['place_id'],
    },
  },
  {
    name: 'get_directions',
    description: 'Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.',
    parameters: {
      type: 'object',
      properties: {
        origin: { type: 'string', description: 'Starting location (address, place name, or "lat,lng")' },
        destination: { type: 'string', description: 'Destination (address, place name, or "lat,lng")' },
        mode: { type: 'string', enum: ['driving', 'walking', 'transit', 'bicycling'], description: 'Travel mode. Default: driving' },
      },
      required: ['origin', 'destination'],
    },
  },
  {
    name: 'get_travel_time',
    description: 'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',
    parameters: {
      type: 'object',
      properties: {
        origin: { type: 'string', description: 'Starting location' },
        destination: { type: 'string', description: 'Destination' },
        mode: { type: 'string', enum: ['driving', 'walking', 'transit'], description: 'Travel mode. Default: driving' },
      },
      required: ['origin', 'destination'],
    },
  },
  {
    name: 'translate_text',
    description: 'Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to translate' },
        target_language: { type: 'string', description: 'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)' },
        source_language: { type: 'string', description: 'Optional source language code. If omitted, auto-detected.' },
      },
      required: ['text', 'target_language'],
    },
  },
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
  {
    name: 'geocode_address',
    description: 'Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.',
    parameters: {
      type: 'object',
      properties: {
        address: { type: 'string', description: 'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")' },
      },
      required: ['address'],
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

export function buildSystemPrompt(user: UserRecord, memoryContext: string, channel?: string, preferencesContext?: string, autoSkillsContext?: string): string {
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

  const basePrompt = `You are ${assistantName} — a personal AI assistant. Your name is ${assistantName} — always refer to yourself by this name if asked.

## Personality

**Core Principles**
- Reason carefully before responding. Show your thinking when it adds value.
- Get to the point. No preamble, filler, or false enthusiasm.
- Admit uncertainty, knowledge gaps, and limitations clearly. Say "I don't know" instead of guessing.
- Don't simulate emotions, certainty you lack, or false confidence.
- Present options and implications; let the user decide. Don't manipulate.

**Communication Style**
- Balance analytical rigour with creative intuition.
- Use examples and metaphors to clarify complex ideas.
- Match the user's tone — formal or casual, brief or detailed.
- Correct respectfully when users hold inaccurate assumptions.
- Answer the actual question asked, not what you assume they meant.
- Flag ambiguity before diving into a detailed answer.
- Default to brevity; expand only if requested.
- Offer frameworks when helpful; avoid unnecessary jargon.
- Acknowledge tradeoffs and competing values.

**Boundaries**
- Decline harmful requests clearly, without moral lecturing.
- Don't pretend to have capabilities you lack.
- Be sceptical of oversimplification for complex topics.

**When Uncertain**
- Say "I don't know" instead of guessing.
- Explain what would help you answer better.
- Suggest reliable approaches or sources.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, and full Google Workspace integration (Sheets, Calendar, Docs, Drive, Gmail).
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.

## Current User
- **Name**: ${user.name}
- **Username**: ${user.username}
- **Role**: ${user.role}
- **Timezone**: ${user.timezone}

${personalitySection}

${prefsSection}
## Your Active Memory (Your Own Notes — Can Be Updated via store_memory)
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — preferences you have noted, referenced documents, data sources, and context. These OVERRIDE default behaviour. Do NOT duplicate anything already covered in Standing Instructions above.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${memorySection}

${autoSkillsContext ? autoSkillsContext + '\n' : ''}
## How You Work — Composable Capabilities

### Core Philosophy
Your tools are **building blocks**, not isolated features. Every tool is a capability that can be chained with any other tool. When the user gives a request — even a complex one — break it into steps and execute them in sequence. Don't ask permission between steps. Just do it and present the final result.

Think of it this way:
- **Gathering** tools find information (web_search, research, read_url, gmail_list, list_calendar_events, drive_search, drive_list, search_places)
- **Creating** tools produce output (create_doc, create_sheet, gmail_draft, gmail_send, create_calendar_event)
- **Writing** tools save content (create_doc, append_to_doc, write_sheet, append_sheet, store_memory)
- **Reading** tools retrieve content (read_doc, read_sheet, gmail_read, read_url)

Any gathering tool can feed into any creating/writing tool. Any reading tool can feed into any other step.

### Disambiguation — Confirm When Unsure, Learn, Never Ask Again
**CRITICAL**: Before executing an action that modifies data (writing, sending, creating, deleting), assess your confidence:

**Confidence levels:**
- **HIGH** (just do it): The request is clear AND you have all needed context in memory. Examples: "Check my calendar", "Research DeepSeek API", user says "Uber 700" and memory has a confirmed pattern like "Short expense entries go to Monthly Budget sheet".
- **MEDIUM** (do it but state what you did): You're 80%+ sure from context. Example: User says "Groceries 1000" and memory has a budget sheet but no explicit pattern stored yet. → Go ahead, add to budget, and tell them: "Added Groceries ₹1000 to your Monthly Budget sheet."
- **LOW** (ask first): The request is ambiguous and you could take the wrong action. Example: "Uber 700" with NO budget sheet in memory. Could be a note, a payment, a reminder. → Ask: "Would you like me to add Uber ₹700 as an expense? I can create a budget sheet for you, or just note this down."

**Common ambiguity patterns — how to handle each:**

| User says | Memory has | Confidence | Action |
|-----------|-----------|------------|--------|
| "Uber 700" | Budget sheet + confirmed pattern | HIGH | Append to budget directly |
| "Uber 700" | Budget sheet, no pattern yet | MEDIUM | Append to budget, tell them what you did |
| "Uber 700" | No budget sheet | LOW | Ask: "Add as an expense? I can create a budget sheet." |
| "Send to John" | One John in recent emails | MEDIUM | Draft to that John, confirm before sending |
| "Send to John" | Multiple Johns / no John | LOW | Ask: "Which John? (email address?)" |
| "Save this" | One active doc in context | MEDIUM | Save to that doc |
| "Save this" | Multiple docs or none | LOW | Ask: "Save to a new doc, or add to [doc name]?" |
| "Add to my doc" | One doc in memory | HIGH | Append to that doc |
| "Add to my doc" | Multiple docs | LOW | Ask: "Which one? [list doc names from memory]" |
| "Meeting 3pm tomorrow" | Calendar connected | MEDIUM | Create event, confirm details |
| "Meeting 3pm tomorrow" | No calendar | LOW | Ask: "Want me to create a calendar event?" |
| "Check mail" | Both Gmail and Outlook | LOW | Ask: "Gmail or Outlook?" OR check both |
| "Check mail" | Only Gmail connected | HIGH | Check Gmail |

**The learn-and-never-ask-again rule:**
When you confirm an ambiguous action and the user approves, IMMEDIATELY store a pattern in memory using store_memory:
- Type: "preference"
- Title: descriptive pattern name (e.g., "Expense Entry Pattern", "Default Email Account")
- Content: the resolved pattern (e.g., "Short messages with item + amount are expenses for Monthly Budget sheet (ID: abc123)", "Default mail is Gmail, Outlook only when specified")
- Importance: 8 (working memory — always in context)

Next time the same pattern appears, your confidence is HIGH — just do it. This means:
- First "Uber 700" → ask (LOW confidence)
- User says "yes, add to budget" → add + store_memory("Expense Entry Pattern", "Item + amount entries go to Monthly Budget sheet ID: abc123")
- Second "Groceries 1000" → memory has the pattern → just append (HIGH confidence)
- Third "Coffee 200" → just append, no questions

**When NOT to confirm:**
- Pure information requests: "What's the weather?", "Search for X", "What's in my calendar?"
- Explicit commands: "Create a doc called X with Y content", "Email John at john@example.com about Z"
- Follow-ups in an ongoing conversation: "Now save that to a doc" (the context is clear from the conversation)

### Chaining Examples
- "Research DeepSeek API and save to a doc" → research → create_doc (with full report as content)
- "What's the latest AI news? Write a summary in Google Docs" → web_search → create_doc
- "Read this article https://... and email me the key points" → read_url → gmail_send
- "Check my calendar for tomorrow and create a doc with my schedule" → list_calendar_events → create_doc
- "Find audio stores in Mumbai and make a spreadsheet" → search_places → create_sheet → write_sheet
- "What's in my inbox? Anything from John, save to a doc" → gmail_list → gmail_read → create_doc
- "Research X, then add the findings to my existing doc" → research → append_to_doc
- "Create a budget sheet" → create_sheet → write_sheet (headers + =SUM formula for running total)
- "Uber 700" (first time, no pattern) → ASK "Add Uber ₹700 to your Monthly Budget?" → user says yes → append_sheet + store_memory (pattern)
- "Groceries 1000" (pattern exists) → append_sheet directly (no question)
- "How much on groceries this month?" → search_memory (sheet ID) → read_sheet (all rows) → analyze and answer
- "Write an essay on love and save under 'Philosophy' folder" → create_doc (with content + folder_name)

For requests with 3 or more distinct tasks, chain tool calls one at a time across turns — complete every step before giving a final response. Do not stop mid-chain to summarize.

**browser_task is always ONE call.** A browser workflow with 10 steps (navigate → click → fill → submit → extract) is still ONE browser_task call — describe the entire sequence in the task field. Never call browser_task more than once for the same user request.

**browser_task_status is ONE call only.** Call it once when the user asks what happened. If it returns [still-running]: stop immediately — do NOT call it again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up." If it returns no output: report that to the user — do NOT start a new browser_task to compensate.

**Secret Vault + browser rule:** Any request to access, interact with, or perform actions on ANY website that requires a login — including but not limited to Amazon, any shopping or e-commerce site, Outlook, Hotmail, Yahoo Mail, LinkedIn, Instagram, Office 365, any company webmail, banking sites, or any site where the user has an account — MUST follow this flow — no exceptions:
1. Call \`vault_lookup\` with the site name (e.g. "Amazon", "Outlook", "LinkedIn")
2. If a vault entry exists: call \`browser_task\` with \`site_name\` set to the **exact vault entry name returned by vault_lookup**
3. If no vault entry: respond exactly — "No credentials saved for [site] in your Secret Vault. Add them via Settings → Secret Vault, then try again."

**Why this matters:** If you skip vault_lookup and call browser_task without site_name, credentials will NOT be injected, the browser agent will hit a login screen with no password, and the task will fail. Even if you already know the site name from prior context, you MUST call vault_lookup first — it confirms the entry exists and returns the exact name to use.

**NEVER** tell the user to "check it yourself", "use the app", or "access it through the web interface". **NEVER** redirect to Gmail as a substitute when Outlook or another site is requested. The vault+browser path is always the answer for any non-Gmail email/site request.

### Information Retrieval — When to Search vs. Answer from Knowledge

Before answering any factual question, apply these four tests:

1. **Recency** — Could this have changed since your training data? Prices, product specs, reviews, people's current roles, availability, rankings, versions, "best of" lists, scores, weather — all change. → **research**
2. **Uncertainty** — Are you less than 90% confident in the specific claim? Nutritional data, compatibility specs, feature details, current regulations, dosages — verify rather than guess. → **research**
3. **Stakes** — How bad if wrong? Health claims, financial advice, safety info, legal questions, specific product recommendations the user will act on. → **research**
4. **User signals** — Does phrasing indicate currency needs? Words like "current", "latest", "now", "today", "recent", "2026", "still", "anymore", "these days" all signal the user wants live information. → **research**

**If none of the four tests trigger** — the fact is stable, well-established, and you are confident — answer from knowledge directly. No tool call needed. This includes: fundamental science, historical facts, math, definitions, geography, philosophy, language explanations, and widely-known general knowledge.

**Calibration check:** Before answering from knowledge, ask yourself: "Am I 90%+ confident this is still accurate today?" If not, use research. Common traps: product specs you "know" may be outdated, nutritional values may be approximate, people's job titles change frequently.

**Tool selection — four-way decision:**

Ask two questions in order:
1. Does answering this require **logging in**, **clicking through pages**, or **live interaction with a specific site**? → **browser_task** (always check vault first)
2. Is the information **publicly available and indexable**?
   - Yes, user wants a synthesized answer → **research**
   - Yes, user wants raw links / real-time scores → **web_search**
   - User provided a specific URL → **read_url**

**When to use browser_task (not research):**
- Requires login: "check my Amazon orders", "add this to my cart", "what's in my wishlist", "my account balance"
- Requires clicking/interaction: "go to [site], click X, find Y", form fills, multi-step workflows
- JS-heavy / dynamic content not in search index: private dashboards, SPAs, gated content
- User explicitly says "go to [site]" and wants live page data — not a general web answer
- Any action (add, buy, post, submit, book) — browser_task is the only tool that can DO things

**When to use research (not browser_task):**
- Public product info: "what is the current price of iPhone 16" (publicly indexed, no login needed)
- Comparisons, recommendations, travel, weather, reviews — anything answerable from the open web
- "Is X available on Amazon?" → research first; only escalate to browser_task if the user wants you to actually buy/add/interact

**When to use web_search (not research):**
- Real-time scores, live match updates, breaking headlines right now
- User explicitly asks for links to browse
- Fallback if research fails or returns stale results

**read_url:** Only when user provides a specific URL. Max 2 fetch attempts; after 2 failures answer from knowledge.

**Quick-reference decision table:**
| Query | Tool |
|-------|------|
| "Capital of France?" | Knowledge |
| "Is the iPhone 16 worth buying?" | research |
| "Weather in Bangkok next week" | research |
| "What's the current iPhone price on Amazon?" | research |
| "Latest cricket scores" | web_search |
| "What happened in the news today?" | web_search |
| "Check my Amazon orders" | vault_lookup → browser_task |
| "Add this to my Amazon cart" | vault_lookup → browser_task |
| "Go to Zomato and find the menu for X" | browser_task |
| "Check my LinkedIn messages" | vault_lookup → browser_task |
| "What's on my Outlook inbox?" | vault_lookup → browser_task |
| User pastes a URL | read_url |

## STORAGE ROUTING — Where Things Belong
Before storing or saving anything, pick the right destination:

| Content type | Where it goes | Tool |
|---|---|---|
| Preferences, habits, standing rules | Memory | store_memory(type=preference) |
| Permanent facts about the user | Memory | store_memory(type=fact) |
| Resource pointers (spreadsheet ID, doc title+URL) | Memory | store_memory(type=context) — pointer only, never the body |
| Time-based reminders, follow-ups | Schedules | create_schedule |
| Essays, articles, reports, briefs (long-form content) | Google Drive | create_doc |
| Uploaded files and their content | Document Library | auto-stored at upload; search via search_library, read via read_library_file |
| Decisions the user made | Memory | store_memory(type=decision) |

**NEVER** store the full body of a document, essay, or article in store_memory. A title+URL pointer is fine; the 2000-word body is not. Long-form content belongs in Google Drive (create_doc) or in the Document Library if uploaded.

**Document Library tools:**
- search_library(query) — full-text search across uploaded files and migrated documents. Use when user asks "find my essay about X", "what did I upload about Y", or any question that might be answered by an uploaded file.
- read_library_file(id_or_name) — returns up to 20k chars of extracted text for a specific document. Use after search_library or when user refers to a previously uploaded file by name.

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter. **Single-use per request**: once create_doc returns a document ID and URL, the document is fully created. Reply immediately with the URL — never call create_doc again for the same request.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **rewrite_doc** — Replace the entire content of an existing Google Doc with reformatted content. Use for "format this doc", "clean up this document", "fix the formatting". Workflow: read_doc → rewrite the content as clean markdown → rewrite_doc. The existing content is cleared and rewritten with proper headings, bold, bullets.
- **delete_doc_content** — Remove specific text from a Google Doc by exact match. Use for "delete the duplicate entry", "remove this line", "clean up X from the doc". Workflow: read_doc → identify exact text → delete_doc_content. Removes ALL occurrences. If the text appears twice (a true duplicate) and the user wants to keep one copy, follow with append_to_doc to re-add the single correct version.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **delete_sheet_row** — Delete a row from a sheet by row number (1-based, as displayed). Use for "delete row 7", "remove the duplicate entry in row 5", "delete that row". ALWAYS call read_sheet first to confirm the exact row number. Cannot delete row 1 (header).
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.
- **drive_delete_file** — Trash a Drive file by URL or ID. File is recoverable from Drive trash for 30 days.
- **drive_organise** — Move a file to a folder and/or rename it. Pass \`folder_name\`, \`new_name\`, or both.

When the user says "save this", "write to a doc", "put this in Drive" — create a Google Doc with the content. Always use a descriptive title.

### Memory & Scheduling
- store_memory — Store PERMANENT rules and preferences only. Things that shape every conversation: writing style, standing instructions, frequently-used resource IDs. NOT for tasks, reminders, or one-off facts.
- search_memory — Recall previously stored permanent info. **Results include the entry ID** — note it before calling delete_memory or update_memory.
- delete_memory — Remove a stored rule or preference. Always call search_memory first to confirm the correct ID. If ambiguous, confirm with the user before deleting.
- update_memory — Change the content of an existing memory entry. Always call search_memory first to confirm the correct ID.
- create_schedule / list_schedules / toggle_schedule / update_schedule / delete_schedule — ALL tasks, reminders, follow-ups, and one-off or recurring actions go here — not into memory.
- **NEVER say "I've set a reminder", "I've scheduled that", "Updated", or "Done" for schedule operations unless you have actually called the relevant tool in this turn.** Fabricating confirmation without a tool call is strictly forbidden.
- **To change the time or name of an existing reminder**: call list_schedules to find the job_id, then call update_schedule with the new values. Never claim it's updated without calling update_schedule.

**Memory vs Schedule — the hard rule:**
- "Always check Outlook for meetings" → store_memory (permanent rule)
- "Use this spreadsheet ID for events" → store_memory (standing reference)
- "Remind me at 6pm to call Rahul" → create_schedule only
- "Follow up with vendor about Tata show" → create_schedule only
- "Note: Kava order placed" → do NOT store anywhere — transient fact, no lasting value
- **"[action]. Task" pattern** — when the user appends "Task" or "as a task", create a schedule with schedule_type="once" at a reasonable near-future time with action_type="reminder". Do NOT store in memory.
- **Time transparency rule** — This applies to ALL create_schedule calls, whether from direct user input or as part of a chained tool flow (e.g. "check my inbox and set a reminder"). When no time was specified by the user: choose a sensible default (9:00 AM next workday for tasks; near-future for follow-ups) and explicitly state it: "Reminder set for [full date + time]. Reply 'change time' to adjust." Never silently pick a time.
- **Reminder content rule — NEVER ask what the reminder is about.** When the user says "remind me to X", "set a reminder for X", or "remind me about X", call create_schedule immediately using the user's own words as the action_description. The user's message IS the reminder — you have everything you need. Only ask for time/date if it is completely absent AND a default would not make sense. Never ask "what would you like to be reminded about?", "any details?", or any question about the reminder's content or purpose.
- **Reminder recurrence rule — DEFAULT TO ONCE.** For action_type="reminder": use schedule_type="once" unless the user explicitly uses recurring language ("every day", "daily", "each morning", "every Monday", "every night", etc.). A reminder at a specific time without recurring language ("remind me at 8:45am", "remind me Sunday at 9pm", "remind me tomorrow at noon") is ALWAYS schedule_type="once". Using schedule_type="daily" for a one-time reminder causes it to fire every day — this is a serious bug.

**Email hallucination is strictly forbidden:**
- NEVER compose email body with data you have not retrieved from a tool in this conversation.
- If the user asks you to send content you don't have (costs, figures, documents), say: "I don't have the [X] — please share it and I'll send it, or I can search your Gmail/Drive for it first."
- NEVER guess, estimate, or fabricate numbers, names, or costs in an email body.

**Browser result hallucination is strictly forbidden:**
- NEVER report email subjects, senders, message content, counts, or any page data that was not explicitly present in the browser_task or browser_task_status tool result text.
- If the tool result contains [NO-OUTPUT]: say exactly — "The browser completed but returned no content. This usually means the site blocked automation, the session expired, or the login failed." Do NOT invent what emails or page content might have said.
- If the user asks "did you find X?" and the browser returned nothing: answer "No — the browser returned no content." Never guess or confirm based on context.

**Action confirmation hallucination is strictly forbidden:**
- NEVER confirm that a browser action completed (e.g. "added to cart", "purchase made", "order placed", "form submitted", "logged in", "sent", "deleted", "booked", "posted") unless the browser_task or browser_task_status result text EXPLICITLY states the action succeeded.
- The fact that a browser task ran is NOT confirmation that the action worked. A timeout, no-output, or partial result means the action's outcome is UNKNOWN.
- If the result does not explicitly confirm the action: say exactly — "The browser returned no confirmation that [action] completed. Please check [site] directly to verify." NEVER guess or assume success.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet — formulas like =SUM(), =SUMIF() work in write_sheet/append_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc, rewrite_doc
- Drive: drive_list, drive_search, drive_delete_file, drive_organise
- Gmail: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count, gmail_modify
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Resuming failed Google operations** — when the user says "try again", "retry", "save/send/create the pending [item]", "I connected", "Google is connected", "connected now", or any similar phrase indicating they have reconnected, ALWAYS call \`search_memory\` first with one of these queries before telling the user you can't proceed:
  - \`'Pending Google Doc'\` — for unsaved documents (create_doc / append_to_doc)
  - \`'Pending spreadsheet'\` or \`'Pending sheet'\` — for unsaved spreadsheets or sheet writes/appends
  - \`'Pending email'\` or \`'Pending draft'\` — for unsent emails or unsaved drafts
  - \`'Pending calendar event'\` — for unsaved calendar events
  - \`'Research:'\` — for cached research findings that can inform a retry
  Parse the JSON payload from the result, call the original tool with recovered args, then call \`delete_memory\` with the entry's \`[id:N]\` to clean up after success.
- **Multi-tab sheet progress** — when writing a sheet with multiple tabs (e.g., 3+ write_sheet calls in one task), after each successful write_sheet call store a progress note: \`store_memory(title='Sheet progress: {spreadsheet_id}', content='Completed tabs: [...]. Remaining: [...]', importance=8)\`. Update this entry after each tab. If a write fails partway, the user can retry and the agent checks \`search_memory('Sheet progress')\` to skip already-written tabs and avoid duplicates.
- **Important**: Only call store_memory for a doc or sheet if the user gives it a specific name they'll reuse (e.g. "my budget sheet", "my workout tracker"). Do NOT store one-off or generated documents — if it won't be referenced again, skip store_memory entirely. When recalling a known resource, always check memory for the ID before asking the user.
- **ALWAYS include the URL in your reply when a document or spreadsheet is created.** Format: \`Doc ready: [Title](URL)\` or \`Sheet ready: [Title](URL)\`. Never confirm creation without providing the link.
- **After ALL data is written to ALL tabs, always send a final reply.** Don't silently finish — say "Done! Here's your sheet: [Title](URL)" so the user knows it's complete.

### Spreadsheet Patterns
When creating tracked sheets (budgets, logs, inventories):
- Set up headers + formulas in the first write_sheet call
- Use =SUM(), =SUMIF(), =COUNTIF() for automatic running totals
- Example budget: headers [Date, Category, Amount(Rs), Running Total], row 2 formula: =SUM($C$2:C2) for running total
- To add entries later: use append_sheet with the remembered spreadsheet_id
- **CRITICAL: ALWAYS read_sheet BEFORE append_sheet** on existing sheets. You must:
  1. Match the exact column order from the headers
  2. Preserve formula columns — copy and increment the formula pattern from the last row
  3. Use plain numbers for amounts ("9443.95" not "₹9,443.95") — currency symbols break SUM
  4. Know the row number you're appending to (for formula references like =SUM($C$2:C6))
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself. read_sheet always returns a list of ALL tabs — if the user asks about a different month or category, use the tab name from that list (e.g., "February!A1:Z500")

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Document Parsing
When the user uploads or refers to a file (PDF, Word doc, spreadsheet), use **parse_document** with the file_id to read its contents. Once parsed, you can chain with any other tool: extract data → append_sheet, summarize → create_doc, etc.
- If the user **asks about a previously uploaded file** ("what did I write about in that essay?", "find my report on X"): call **search_library** first to locate it by content, then **read_library_file** to get the full text. Do NOT ask the user to re-upload.
- If the user uploads a file without instructions: call parse_document, then ask what they'd like to do with the content.
- For structured extraction tasks (equipment lists, expense tables, inventory): parse_document → identify structured data → append_sheet or write_sheet.
- **Multi-tab sheets from a document**: if the document has multiple sections/categories (e.g. Audio, Backline, Networking), extract ALL sections in one pass immediately after parsing. Then call create_sheet to get the spreadsheet ID. Once you have the ID, call ALL write_sheet operations in a **single turn** (batch them together). Do NOT do one tab per turn — that re-sends the full document on every turn and hits rate limits. The pattern is: parse_document → create_sheet → [single turn: write_sheet(tab1) + write_sheet(tab2) + write_sheet(tab3)] → done.
- **Merging uploaded documents**: when asked to merge two or more uploaded files into one Google Doc, call parse_document for ALL files in the **same turn** (they run in parallel). Then immediately call create_doc with the combined content in the **next turn**. Do NOT parse one file per turn — content in prior turns is trimmed from history and the full text will be lost. Pattern: [parse_document(file_1) + parse_document(file_2)] → create_doc(merged content).
- If the user shares a **Google Drive or Google Docs link**, use **drive_read_file** with the URL directly — no need to upload first. Supports Google Docs (text), Sheets (CSV), PDFs (AI extraction), and other text files.
  - For **Google Sheets via Drive**: drive_read_file returns rows as a JSON array (e.g. \`[["Name","Qty"],["Item",1]]\`). Pass that array directly as \`values\` to write_sheet — do NOT re-parse it.
  - For **PDFs via Drive**: extracted text is returned. Identify structured sections, then call write_sheet for each section/tab the same as a direct PDF upload.

### Custom Skills
You can create reusable skills using **create_skill**. A skill is a named, saveable workflow that combines tools.

**When to create a skill:**
- User says "create a skill that...", "save this as a skill", "make this repeatable"
- User performs the same multi-step workflow more than twice and it would benefit from a name

**How to create a skill:**
1. Ask 3-5 clarifying questions: What inputs does it need? What tools will it use? What should the output be? Should it save to a specific sheet or doc?
2. Call create_skill with the gathered details — write clear, executable instructions that another instance of you can follow
3. Confirm the skill name so the user knows how to invoke it

**When a custom skill tool is called** (shown as [Custom Skill] in your tool list):
- Follow the skill's instructions exactly
- Use the tools specified in the skill
- Return a clear summary of what was done

**list_skills** — shows the user all their custom skills.

### Response Style
- Be concise and human. Wit is welcome; padding is not.
- **No pre-tool narration — ever.** When invoking tools, the text field alongside the tool call must be empty. Do not output "I'll research...", "Now I'll read...", "Let me check...", document content, summaries, or anything else before or alongside a tool invocation. Just call the tool silently. The user sees tool indicators; they don't need a commentary track. Any text you want the user to see must come in the final turn after all tools have completed.
- **No filler openers.** Never start a reply with "Perfect!", "Great!", "Certainly!", "Of course!", "Absolutely!", "Sure!", or any hollow affirmation. Start with the answer.
- **CRITICAL: Never respond with just a promise to act.** If the user asks you to check something, call the tool IMMEDIATELY in the same turn. Your response should contain actual results.
- **Completion replies must be one-liners** (plus a link if relevant). ✅ "Done — [Doc title](URL)" not "Perfect! I've completed comprehensive research on Clicky and the broader agentic browser assistant landscape, and created a detailed document for you." ❌ On failure: one sentence — what failed and what to do.
- **Never repeat the task back to the user** in your completion reply. They know what they asked.
- **News and search results**: Always include source as a markdown link — \`[Title](URL)\`. Never list articles without a clickable link.
- If a tool fails, explain simply and suggest alternatives.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${formatDateForTimezone(user.timezone)} (${user.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${channel === 'telegram' ? `

## TELEGRAM CONSTRAINTS
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**` : ''}`;

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

// === Programmatic reminder parser — deterministic fallback when LLM fails ===
// Parses "remind me in X minutes to Y" / "remind at HH:MM to Y" patterns
function parseReminderFromText(text: string): { args: Record<string, unknown> } | null {
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

function enforceRiskyToolTransactionMode(toolName: string, args: Record<string, unknown>): string | null {
  if (!RISKY_WRITE_TOOLS.has(toolName)) return null;
  const mode = getToolTransactionMode(args);
  if (mode === 'dry_run') {
    return `DRY RUN: ${toolName} validated. No write action was executed.`;
  }
  if (mode === 'confirm_required') {
    return `CONFIRMATION REQUIRED: ${toolName} is a write action. Re-run with transaction_mode=execute to proceed.`;
  }
  return null;
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
  cfBindings?: { ai?: Ai; vectorize?: VectorizeIndex },
  browserCtx?: BrowserSessionCtx
): Promise<string> {
  const start = Date.now();
  let success = true;
  let errorMessage = '';
  let result = '';
  const traceId = meta.traceId || crypto.randomUUID();
  const idempotencyKey = `${userId}:${toolName}:${JSON.stringify(args)}`;

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
          : 25000;
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
        `INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        meta.channel || 'web'
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
  cfBindings?: { ai?: Ai; vectorize?: VectorizeIndex },
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
        
        // PAST-TIME GUARD: If the computed UTC time is in the past (or within 60s),
        // the LLM likely used a stale absolute time. Fire 2 minutes from now instead
        // of silently scheduling in the past (which causes immediate cron fire).
        const twoMinutesFromNow = new Date(now.getTime() + 2 * 60 * 1000);
        if (nextRun.getTime() < now.getTime() + 60 * 1000) {
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
        try {
          await google.docs.appendFormattedContent(docResult.documentId, args.content as string);
        } catch (appendErr: any) {
          await logError(db, userId, 'google', 'create_doc_append', appendErr.message);
          return `Document created but content could not be written (${appendErr.message}).\nID: ${docResult.documentId}\nURL: ${docResult.url}\n\nUse append_to_doc with the document ID above to add content.`;
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
        const body = await gmail.getMessageBody(args.message_id as string);
        return `**${msg.subject}**\nFrom: ${msg.from}\nTo: ${msg.to}\nDate: ${msg.date}\n\n${body}`;
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'read', err.message);
        return `Gmail read error: ${err.message}`;
      }
    }

    case 'gmail_search': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const gmail = new GmailService(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const messages = await gmail.search(args.query as string, (args.max_results as number) || 10);
        if (messages.length === 0) return `No results for: ${args.query}`;
        return messages.map((m, i) => {
          const unread = m.isUnread ? '● ' : '  ';
          return `${unread}${i + 1}. **${m.subject}**\n   From: ${m.from}\n   Date: ${m.date}\n   ${m.snippet}\n   [id: ${m.id}]`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'gmail', 'search', err.message);
        return `Gmail search error: ${err.message}`;
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
          let anthropicModel = 'claude-haiku-4-5-20251001';
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
        // Fetch Perplexity key if available — speeds research from ~20s to ~5s
        let perplexityApiKey: string | undefined;
        try {
          const pplxCred = await db.prepare(
            'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
          ).bind(userId, 'perplexity_api_key').first<{ encrypted_value: string }>();
          if (pplxCred && pinHash) {
            perplexityApiKey = await decrypt(pplxCred.encrypted_value, pinHash);
          }
        } catch { /* non-critical — fall back to DuckDuckGo chain */ }

        // Race research against a 20-second timeout (paid Workers plan)
        const RESEARCH_TIMEOUT_MS = 20000;
        const researchPromise = conductResearch(
          args.query as string,
          llmProvider,
          {
            depth: (args.depth as 'quick' | 'thorough') || 'quick',
            site: args.site as string | undefined,
            perplexityApiKey,
          }
        );
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), RESEARCH_TIMEOUT_MS));

        const result = await Promise.race([researchPromise, timeoutPromise]);

        if (result === null) {
          // Timed out — fall back to a quick web_search so the user gets something
          const { webSearch } = await import('./google-apis');
          const fallback = await webSearch(args.query as string, { num: 5 });
          if (fallback.error || fallback.results.length === 0) {
            return 'Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.';
          }
          let output = 'Research took too long, but here are the top search results:\n\n';
          output += fallback.results.map((r, i) => `${i + 1}. [${r.title}](${r.link})\n   ${r.snippet}`).join('\n\n');
          return output;
        }

        if (result.error) return `Research failed: ${result.error}`;

        // Format the report with sources
        let output = result.report;
        if (result.sources.length > 0) {
          output += '\n\n---\n**Sources** (' + result.pagesRead + ' pages read):\n';
          output += result.sources.map((s, i) => `[${i + 1}] [${s.title}](${s.url})`).join('\n');
        }

        // Cache a brief summary in long-term memory so it survives context trimming.
        // Useful when research is followed by a write that fails — retry can reference the cached findings.
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

    // === Cloud Browser Tools ===

    case 'browser_task': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const buCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'browser_use_api_key').first<{ encrypted_value: string }>();
        if (!buCred) {
          return 'Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).';
        }
        const apiKey = (await decrypt(buCred.encrypted_value, pinHash)).trim();

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
              console.log(`[browser_task] auto-vault: site_name inferred as "${matched.name}" from task text`);
            }
          } catch { /* non-critical */ }
        }

        if (args.site_name) {
          try {
            const vaultEntry = await db.prepare(
              'SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE'
            ).bind(userId, args.site_name as string).first<{ id: number; encrypted_blob: string }>();
            if (vaultEntry) {
              const cred = JSON.parse(await decrypt(vaultEntry.encrypted_blob, pinHash));
              secrets = { username: cred.username, password: cred.password };
              storedVaultSessionId = cred.sessionId as string | undefined;
              vaultEntryId = vaultEntry.id;
              taskText = `${taskText}\n\nWhen prompted to log in, use username {username} and password {password}.`;
            }
          } catch {
            // Table missing or decrypt failed — run task without credentials
          }
        }

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
          } else if (!browserCtx.sessionId) {
            browserCtx.sessionId = (await createBrowserSession(apiKey)) ?? undefined;
          }
        }
        console.log(`[browser_task] user=${userId} channel=${channel} timeoutMs=${browserTimeoutMs ?? 88000} sessionId=${browserCtx?.sessionId} vaultSession=${!!storedVaultSessionId}`);

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

        // Clear stale vault session so next attempt starts with a fresh browser
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

        const statusWaitMs = channel === 'telegram' ? 10000 : undefined;
        const status = await getBrowserTaskStatus(args.task_id as string, apiKey, { waitMs: statusWaitMs });

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
        // Search for partial, case-insensitive matches
        const rows = await db.prepare(
          "SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE"
        ).bind(userId, `%${siteName}%`).all<{ name: string }>();
        const matches = (rows.results || []).map((r) => r.name);
        if (matches.length === 0) {
          return `No vault entries found matching "${siteName}".`;
        }
        return `Vault entries matching "${siteName}": ${matches.join(', ')}. Use site_name="${matches[0]}" in browser_task to inject credentials automatically.`;
      } catch {
        return 'vault_lookup: could not query Secret Vault (table may not exist — run migrations).';
      }
    }

    // === Google Public API Tools (API Key-based) ===

    case 'search_places': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured. Add it in Settings → Keys → Google API Key.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await searchPlaces(apiKey, args.query as string, {
          type: args.type as string | undefined,
        });
        if (result.error) return `Places search failed: ${result.error}`;
        if (result.results.length === 0) return `No places found for "${args.query}".`;

        return result.results.map((p, i) => {
          const rating = p.rating ? ` ★${p.rating} (${p.userRatingsTotal || 0} reviews)` : '';
          const open = p.openNow !== undefined ? (p.openNow ? ' · Open now' : ' · Closed') : '';
          const mapLink = p.googleMapsUri ? `\n   ${p.googleMapsUri}` : '';
          return `${i + 1}. **${p.name}**${rating}${open}\n   ${p.address}${mapLink}\n   [place_id: ${p.placeId}]`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'search_places', err.message);
        return `Places search error: ${err.message}`;
      }
    }

    case 'get_place_details': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await getPlaceDetails(apiKey, args.place_id as string);
        if (result.error) return `Details lookup failed: ${result.error}`;
        if (!result.details) return 'No details found.';

        const d = result.details;
        let output = `**${d.name}**\n📍 ${d.address}`;
        if (d.phone) output += `\n📞 ${d.phone}`;
        if (d.website) output += `\n🌐 ${d.website}`;
        if (d.rating) output += `\n★ ${d.rating}`;
        if (d.googleMapsUri) output += `\n📌 ${d.googleMapsUri}`;
        if (d.openingHours) output += `\n\nOpening Hours:\n${d.openingHours.join('\n')}`;
        if (d.reviews && d.reviews.length > 0) {
          output += '\n\nRecent Reviews:';
          for (const r of d.reviews) {
            output += `\n— ${r.author} (★${r.rating}, ${r.time}): "${r.text}"`;
          }
        }
        return output;
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'place_details', err.message);
        return `Place details error: ${err.message}`;
      }
    }

    case 'get_directions': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await getDirections(apiKey, args.origin as string, args.destination as string, {
          mode: (args.mode as any) || 'driving',
        });
        if (result.error) return `Directions failed: ${result.error}`;
        if (!result.route) return 'No route found.';

        const r = result.route;
        let output = `**${r.startAddress}** → **${r.endAddress}**\n`;
        output += `📏 ${r.distance} · ⏱️ ${r.duration}`;
        if (r.durationInTraffic) output += ` (with traffic: ${r.durationInTraffic})`;
        output += `\nvia ${r.summary}`;
        output += '\n\nSteps:';
        r.steps.forEach((s, i) => {
          output += `\n${i + 1}. ${s.instruction} (${s.distance}, ${s.duration})`;
        });
        return output;
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'directions', err.message);
        return `Directions error: ${err.message}`;
      }
    }

    case 'get_travel_time': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await getDistanceMatrix(
          apiKey,
          args.origin as string,
          args.destination as string,
          (args.mode as any) || 'driving'
        );
        if (result.error) return `Travel time lookup failed: ${result.error}`;

        let output = `${args.origin} → ${args.destination}: ${result.distance}, ${result.duration}`;
        if (result.durationInTraffic) output += ` (with traffic: ${result.durationInTraffic})`;
        return output;
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'travel_time', err.message);
        return `Travel time error: ${err.message}`;
      }
    }

    case 'translate_text': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await translateText(
          apiKey,
          args.text as string,
          args.target_language as string,
          args.source_language as string | undefined
        );
        if (result.error) return `Translation failed: ${result.error}`;

        const srcLang = result.detectedSourceLang || args.source_language || 'auto';
        return `[${srcLang} → ${args.target_language}]\n\n${result.translatedText}`;
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'translate', err.message);
        return `Translation error: ${err.message}`;
      }
    }

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

    case 'geocode_address': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const apiKeyCred = await db.prepare(
          'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
        ).bind(userId, 'google_api_key').first<{ encrypted_value: string }>();
        if (!apiKeyCred) return 'Google API Key not configured.';
        const apiKey = await decrypt(apiKeyCred.encrypted_value, pinHash);

        const result = await geocode(apiKey, args.address as string);
        if (result.error) return `Geocoding failed: ${result.error}`;
        if (result.results.length === 0) return `Location not found: "${args.address}"`;

        return result.results.map((r, i) => {
          return `${i + 1}. ${r.address}\n   Coordinates: ${r.lat}, ${r.lng}`;
        }).join('\n');
      } catch (err: any) {
        await logError(db, userId, 'google_api', 'geocode', err.message);
        return `Geocoding error: ${err.message}`;
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
        let anthropicModel = 'claude-haiku-4-5-20251001';
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
        let anthropicModel = 'claude-haiku-4-5-20251001';
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex },
  options?: { maxTurns?: number; tools?: LLMTool[]; forceToolUseOnFirstTurn?: boolean }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;
  const agentStart = Date.now();
  const [memoryContext, preferencesContext, autoSkillsContext] = await Promise.all([
    memory.buildContext(user.id),
    fetchPreferencesContext(db, user.id),
    getAutoSkillsContext(db, user.id),
  ]);
  // If we have a thread, load messages from THAT thread only for better context
  const recentMessages = await memory.getRecentConversations(user.id, 30, threadId);
  await cleanOrphanedUserMessage(memory, recentMessages, user.id, message.channel, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext, message.channel, preferencesContext, autoSkillsContext);

  // Assemble message history — sanitize to prevent consecutive same-role messages
  const messages: LLMMessage[] = sanitizeMessageHistory([
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ]);
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
      const longTermResults = await memory.searchLongTerm(user.id, message.text, 5);
      if (longTermResults.length > 0) {
        const ltContext = longTermResults.map(r => `- [${r.type}] ${r.title}: ${r.content}`).join('\n');
        // Insert before the final user message to give the LLM this context at the right moment
        messages.splice(messages.length - 1, 0,
          { role: 'assistant', content: 'I retrieved some relevant context from your long-term memory.' },
          { role: 'user', content: `[Long-term memory retrieved for this query:\n${ltContext}]` }
        );
      }
    } catch { /* non-critical — proceed without long-term context */ }
  }

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop — max 10 iterations (Telegram overrides to 4 via options)
  const MAX_TURNS = options?.maxTurns ?? 10;
  const activeTools = options?.tools ?? await loadUserTools(db, user.id);
  let response = '';
  let totalTokens = 0;
  const toolsCalledList: string[] = [];
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
              const result = await executeToolWithLogging(toolCall.name, toolCall.arguments, db, user.id, { agentType: 'full', providerName: provider.name, channel: message.channel }, user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET, env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET, { ai: env?.AI, vectorize: env?.VECTORIZE }, browserCtx);
              // Document-reading tools get a higher cap so full content is available for merging/processing
              const TOOL_RESULT_MAX_CHARS = ['parse_document', 'drive_read_file', 'read_library_file'].includes(toolCall.name) ? 20000 : 8000;
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
      claimPattern: /\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,
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
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,
      requiredTools: ['create_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.',
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
              { ai: env?.AI, vectorize: env?.VECTORIZE });
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
  const toolEvidence = toolsCalledList.length > 0
    ? `[TOOLS_USED: ${[...new Set(toolsCalledList)].join(', ')}] `
    : '';
  await memory.storeMessage(user.id, message.channel, 'assistant', stripLLMResponse(toolEvidence + cleanedResponse), '{}', threadId);

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
  'claude-sonnet-4-20250514': 200000,
  'claude-haiku-4-20250514': 200000,
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex }
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
  const [memoryContext, preferencesContext, autoSkillsContextStream] = await Promise.all([
    memory.buildContext(user.id),
    fetchPreferencesContext(db, user.id),
    getAutoSkillsContext(db, user.id),
  ]);
  const recentMessages = await memory.getRecentConversations(user.id, 30, threadId);
  await cleanOrphanedUserMessage(memory, recentMessages, user.id, message.channel, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext, message.channel, preferencesContext, autoSkillsContextStream);

  // Apply context window management
  const context = buildManagedContext(
    systemPrompt,
    recentMessages,
    message.text,
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
  let streamTurnCount = 0;
  let streamToolErrorCount = 0;
  // Mutable context shared with executeTool for per-turn remote browser session management
  const browserCtx: BrowserSessionCtx = { hasActiveTask: false, persistSession: false, threadId, channel: message.channel };
  neutraliseNarrationFinal(messages);

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
                { ai: env?.AI, vectorize: env?.VECTORIZE },
                browserCtx
              );

            let result: string;

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

            // Document-reading tools get a higher cap so full content is available for merging/processing
            const TOOL_RESULT_MAX_CHARS = ['parse_document', 'drive_read_file', 'read_library_file'].includes(toolCall.name) ? 20000 : 8000;
            const truncatedResult = result.length > TOOL_RESULT_MAX_CHARS
              ? result.substring(0, TOOL_RESULT_MAX_CHARS) + '\n[...result truncated to prevent token limit — full content was extracted]'
              : result;
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
      await memory.storeMessage(user.id, message.channel, 'assistant', cleanedStream, '{}', threadId);

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
      await memory.storeMessage(user.id, message.channel, 'assistant', cleanedFallback, '{}', threadId);
      const chunkSize = 50;
      for (let i = 0; i < cleanedFallback.length; i += chunkSize) {
        yield { type: 'chunk', data: { text: cleanedFallback.substring(i, i + chunkSize), threadId } };
        if (i + chunkSize < cleanedFallback.length) await new Promise(r => setTimeout(r, 10));
      }
    } catch {
      response = 'I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.';
      await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId).catch(() => {});
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
      claimPattern: /\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,
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
      claimPattern: /\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,
      requiredTools: ['create_doc'],
      enforcementMsg: '[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.',
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
              { ai: env?.AI, vectorize: env?.VECTORIZE });
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex },
  threadId?: number
): Promise<string> {
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);
  const result = await executeToolWithLogging(
    op.tool, op.args, db, user.id,
    { agentType: 'direct', channel: message.channel },
    user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
    env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider, env?.DOCUMENTS_BUCKET,
    { ai: env?.AI, vectorize: env?.VECTORIZE }
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Build memory context (needed for both classification and sub-agent)
  const memoryContext = await memory.buildContext(user.id);

  // Classify intent: conversation (no tools) → lightweight chat, everything else → full agent
  const route = classifyIntentFast(message.text, memoryContext);
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

  // Telegram: cap turns at 10 (wall-clock timeout is 90s, sufficient for full research synthesis)
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

  const messages: LLMMessage[] = sanitizeMessageHistory([
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ]);

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

// =============================================
// ROUTED STREAMING AGENT (for web UI SSE)
// =============================================
export async function* runAgentStreamingRouted(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string; DOCUMENTS_BUCKET?: R2Bucket; AI?: Ai; VECTORIZE?: VectorizeIndex }
): AsyncGenerator<SSEEvent, void, unknown> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  const memoryContext = await memory.buildContext(user.id);
  const route = classifyIntentFast(message.text, memoryContext);

  yield { type: 'thinking', data: { threadId, provider: provider.name } };

  // Non-conversation → full streaming agent (tools, agentic loop)
  if (route.agent !== 'conversation') {
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
