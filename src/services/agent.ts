// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord, SSEEvent, ContextWindow } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation, logError } from './llm/provider';
import { GoogleServices } from './google';
import { searchPlaces, getPlaceDetails, getDirections, translateText, searchYouTube, getDistanceMatrix, geocode, webSearch } from './google-apis';
import { GmailService } from './gmail';
import { conductResearch } from './research';
import { decrypt } from './crypto';
import { classifyIntentFast, getToolsForAgent, buildSubAgentPrompt, type AgentType, type RouteResult } from './router';

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
        schedule_type: { type: 'string', enum: ['interval', 'daily', 'weekly', 'once'], description: 'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")' },
        schedule_value: { type: 'string', description: 'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM' },
        action_type: { type: 'string', enum: ['reminder', 'check_mail', 'check_calendar', 'check_sheet', 'custom'], description: 'What action to perform' },
        action_description: { type: 'string', description: 'Detailed description of what the action should do' },
      },
      required: ['name', 'schedule_type', 'schedule_value', 'action_type'],
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
    description: 'Store a piece of information the user wants you to remember. Use for facts, preferences, decisions, or important context.',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['fact', 'preference', 'decision', 'context'], description: 'Category of memory' },
        title: { type: 'string', description: 'Short title/key for this memory' },
        content: { type: 'string', description: 'The information to remember' },
        importance: { type: 'number', description: 'Importance 1-10, default 5. Use 8+ for critical info that should stay in working memory.' },
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
    description: 'Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. Use this to add new entries (expenses, logs, records) to an existing sheet.',
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
    description: 'Send an email via Gmail. Uses Google OAuth directly. The email is sent immediately from the user\'s Gmail account. Use with care — confirm with the user before sending.',
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
    description: 'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject' },
        body: { type: 'string', description: 'Email body (plain text)' },
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
  // === Web Search & Research Tools ===
  {
    name: 'web_search',
    description: 'Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.',
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
    description: 'Deep web research — searches, reads up to 5 pages, and synthesizes a detailed report with sources. Use when user needs analysis, comparisons, fact-checking, thorough answers, or asks you to "research" something. Returns a compiled report with citations (~10-20s).',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")' },
        depth: { type: 'string', enum: ['quick', 'thorough'], description: 'quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick' },
        site: { type: 'string', description: 'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")' },
      },
      required: ['query'],
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
];

// Build the system prompt with personality, memory, and tool instructions
// Enforces token budgets for each section
function buildSystemPrompt(user: UserRecord, memoryContext: string): string {
  const assistantName = (user as any).assistant_name || 'Karna';

  // Personality section — truncated to budget
  const personalitySection = user.personality_prompt 
    ? truncateToTokenBudget(`## Personality Instructions\n${user.personality_prompt}\n`, PERSONALITY_TOKEN_BUDGET)
    : '';

  // Memory section — already truncated by MemoryService
  const memorySection = truncateToTokenBudget(memoryContext, WORKING_MEMORY_TOKEN_BUDGET);

  const basePrompt = `You are ${assistantName} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${assistantName} — always refer to yourself by this name if asked.

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

## CRITICAL — Your Active Memory
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — their preferences, referenced documents, data sources, and explicit instructions. These OVERRIDE default behavior.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${memorySection}

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

### Information Retrieval (3 tiers)
1. **web_search** — Quick lookup (~1s). Returns titles, URLs, snippets. Use for: facts, links, news, prices, quick answers, fact-checking, "is this true/fake/real?".
2. **read_url** — Read one page (~3-5s). Fetches and extracts text from a URL. Use for: reading articles, docs, blog posts, specific pages from search results.
3. **research** — Deep analysis (~10-15s). Searches, reads 3-5 pages, synthesizes a report with citations. Use for: "research X", "is X good for Y?", "compare A vs B", complex questions needing multiple sources. WARNING: This is slow and may timeout — only use when depth is explicitly needed.

**Trigger words**: "research", "look into", "investigate" → use **research**. "Search for", "find", "what is", "is this true", "is this fake", "fact check", "latest news", "check news" → use **web_search**. "Read this page/article/link" → use **read_url**.
**IMPORTANT**: When in doubt between web_search and research, prefer web_search. It's faster and more reliable. Only use research when the user explicitly asks for deep analysis or comparison.

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.

When the user says "save this", "write to a doc", "put this in Drive" — create a Google Doc with the content. Always use a descriptive title.

### Memory & Scheduling
- store_memory — Remember important info (facts, preferences, decisions). Always check memory for context.
- search_memory — Recall previously stored info.
- create_schedule / list_schedules / toggle_schedule — Manage recurring tasks and reminders.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet — formulas like =SUM(), =SUMIF() work in write_sheet/append_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc
- Drive: drive_list, drive_search
- Gmail: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count, gmail_modify
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Important**: When you create a doc or sheet, you automatically remember its ID. So when the user later says "add to my budget sheet", check memory for the spreadsheet ID — don't ask them for it.

### Spreadsheet Patterns
When creating tracked sheets (budgets, logs, inventories):
- Set up headers + formulas in the first write_sheet call
- Use =SUM(), =SUMIF(), =COUNTIF() for automatic running totals
- Example budget: headers [Date, Category, Amount(Rs), Running Total], row 2 formula: =SUM($C$2:C2) for running total
- To add entries later: use append_sheet with the remembered spreadsheet_id
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself. read_sheet always returns a list of ALL tabs — if the user asks about a different month or category, use the tab name from that list (e.g., "February!A1:Z500")

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Response Style
- Be concise but human. Never robotic.
- **CRITICAL: Never respond with just "Let me check" or "I'll look into that" without calling a tool.** If the user asks you to check something, call the tool IMMEDIATELY in the same turn. Your response should contain the actual results, not a promise to look.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${formatDateForTimezone(user.timezone)} (${user.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`;

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
  llmProvider?: LLMProvider
): Promise<string> {
  const memory = new MemoryService(db);

  switch (toolName) {
    case 'create_schedule': {
      const now = new Date();
      let nextRun: Date;
      const tz = userTimezone || 'UTC';
      
      if (args.schedule_type === 'interval') {
        const minutes = parseInt(args.schedule_value as string, 10);
        nextRun = new Date(now.getTime() + minutes * 60 * 1000);
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
      } else {
        nextRun = new Date(now.getTime() + 60 * 60 * 1000);
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

      return `Schedule created: "${args.name}" — ${args.schedule_type} at ${args.schedule_value}. State: active. Next run: ${nextRun.toISOString()}`;
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

    case 'delete_schedule': {
      await db.prepare(
        `DELETE FROM cron_jobs WHERE id = ? AND user_id = ?`
      ).bind(args.job_id as number, userId).run();
      return `Schedule ${args.job_id} deleted.`;
    }

    case 'store_memory': {
      const importance = (args.importance as number) || 5;
      // High importance (7+) goes to working memory, lower to long-term
      const tier = importance >= 7 ? 'working' : 'long_term';
      await memory.store(
        userId,
        args.type as MemoryRecord['type'],
        args.title as string,
        args.content as string,
        importance,
        tier
      );
      return `Stored in ${tier === 'working' ? 'working' : 'long-term'} memory: [${args.type}] ${args.title} (importance: ${importance})`;
    }

    case 'search_memory': {
      const results = await memory.search(userId, args.query as string);
      if (results.length === 0) return 'No matching memories found.';
      return results.map(m => `[${m.tier || 'long_term'}] [${m.type}] **${m.title}**: ${m.content}`).join('\n');
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
        const result = await google.sheets.writeRange(
          args.spreadsheet_id as string,
          args.range as string,
          args.values as string[][]
        );
        return `Written ${result.updatedCells} cells to ${args.range}.`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'write_sheet', err.message);
        return `Failed to write sheet: ${err.message}`;
      }
    }

    case 'append_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const result = await google.sheets.appendRows(
          args.spreadsheet_id as string,
          args.range as string,
          args.values as string[][]
        );
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
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';
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
            folderInfo = `\n(Could not move to folder "${args.folder_name}": ${folderErr.message})`;
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
        const calendarId = (args.calendar_id as string) || 'primary';

        const event = await google.calendar.createEvent(calendarId, {
          summary: args.summary as string,
          description: args.description as string | undefined,
          location: args.location as string | undefined,
          startDateTime: args.start_datetime as string,
          endDateTime: args.end_datetime as string,
          attendees: args.attendees as string[] | undefined,
        });

        return `Event created: "${event.summary}"\nID: ${event.id}\nStart: ${event.start.dateTime || event.start.date}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_event', err.message);
        return `Failed to create event: ${err.message}`;
      }
    }

    case 'create_doc': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // Check if Google is connected
        const status = await google.isConnected();
        if (!status.connected) {
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';
        }

        const result = await google.docs.createDocument(args.title as string);
        if (args.content) {
          await google.docs.appendText(result.documentId, args.content as string);
        }

        // Move to folder if specified
        let folderInfo = '';
        if (args.folder_name) {
          try {
            const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
            const folder = await moveFileToFolder(token, result.documentId, args.folder_name as string);
            folderInfo = `\nFolder: "${folder.folderName}"`;
          } catch (folderErr: any) {
            folderInfo = `\n(Could not move to folder "${args.folder_name}": ${folderErr.message})`;
          }
        }

        // Auto-remember the document so user can reference it by name later
        try {
          const memory = new MemoryService(db);
          await memory.store(userId, 'context', `Document: ${args.title}`, `Document ID: ${result.documentId} | URL: ${result.url}`, 6, 'working');
        } catch { /* non-critical */ }

        return `Document created: "${args.title}"${folderInfo}\nID: ${result.documentId}\nURL: ${result.url}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'create_doc', err.message);
        return `Failed to create document: ${err.message}`;
      }
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
          return 'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';
        }

        await google.docs.appendText(args.document_id as string, args.content as string);

        // Read back the title for confirmation
        let title = args.document_id as string;
        try {
          const doc = await google.docs.readDocument(args.document_id as string);
          title = doc.title;
        } catch { /* ignore — just use ID */ }

        return `Content appended to "${title}".\nURL: https://docs.google.com/document/d/${args.document_id}/edit`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'append_to_doc', err.message);
        return `Failed to append to document: ${err.message}`;
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
        const result = await gmail.send(
          args.to as string,
          args.subject as string,
          args.body as string,
          { cc: args.cc as string | undefined }
        );
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
        const result = await gmail.createDraft(
          args.to as string,
          args.subject as string,
          args.body as string
        );
        return `Draft created. To: ${args.to}, Subject: "${args.subject}" — Review and send from Gmail. [Draft ID: ${result.id}]`;
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

    // === Web Search & Research ===

    case 'web_search': {
      try {
        const result = await webSearch(args.query as string, {
          num: (args.num_results as number) || 5,
          site: args.site as string | undefined,
        });

        if (result.error) return `Web search failed: ${result.error}`;
        if (result.results.length === 0) return `No results found for "${args.query}".`;

        return result.results.map((r, i) =>
          `${i + 1}. **${r.title}**\n   ${r.link}\n   ${r.snippet}`
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
        // Race research against a 45-second timeout (paid Workers plan)
        const RESEARCH_TIMEOUT_MS = 45000;
        const researchPromise = conductResearch(
          args.query as string,
          llmProvider,
          {
            depth: (args.depth as 'quick' | 'thorough') || 'quick',
            site: args.site as string | undefined,
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
          output += fallback.results.map((r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet}\n   ${r.link}`).join('\n\n');
          return output;
        }

        if (result.error) return `Research failed: ${result.error}`;

        // Format the report with sources
        let output = result.report;
        if (result.sources.length > 0) {
          output += '\n\n---\n**Sources** (' + result.pagesRead + ' pages read):\n';
          output += result.sources.map((s, i) => `[${i + 1}] ${s.title}\n    ${s.url}`).join('\n');
        }
        return output;
      } catch (err: any) {
        await logError(db, userId, 'research', 'research', err.message);
        return `Research error: ${err.message}`;
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

    default:
      return `Unknown tool: ${toolName}`;
  }
}

// Main agent runner — handles the agentic loop with provider rotation
export async function runAgent(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Build context with token budget enforcement
  const memoryContext = await memory.buildContext(user.id);
  // If we have a thread, load messages from THAT thread only for better context
  const recentMessages = await memory.getRecentConversations(user.id, 25, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext);

  // Assemble message history
  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ];

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop — max 10 iterations
  const MAX_TURNS = 10;
  let response = '';
  let totalTokens = 0;

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    try {
      const llmResponse = await provider.chat(messages, { tools: TOOLS });

      // Track usage
      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      // If there are tool calls, execute them and feed back
      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        if (llmResponse.content) {
          messages.push({ role: 'assistant', content: llmResponse.content });
        }
        for (const toolCall of llmResponse.toolCalls) {
          try {
            const result = await executeTool(toolCall.name, toolCall.arguments, db, user.id, user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET, env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID, user.timezone, provider);
            messages.push({ role: 'user', content: `[Tool Result for ${toolCall.name}]: ${result}` });
          } catch (toolErr: any) {
            await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');
            messages.push({ role: 'user', content: `[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}` });
          }
        }
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

  // Record token usage for rotation tracking (best-effort)
  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }

  // Store assistant response
  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);

  // Context window guard
  await memory.compactHistory(user.id, 30);

  return response;
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string }
): AsyncGenerator<SSEEvent, void, unknown> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Emit thinking state
  yield {
    type: 'thinking',
    data: { threadId, provider: provider.name },
  };

  // Build context with smart management
  const memoryContext = await memory.buildContext(user.id);
  const recentMessages = await memory.getRecentConversations(user.id, 20, threadId);
  const systemPrompt = buildSystemPrompt(user, memoryContext);
  
  // Apply context window management
  const context = buildManagedContext(
    systemPrompt,
    recentMessages,
    message.text,
    provider.name
  );

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop with streaming events
  const MAX_TURNS = 10;
  let response = '';
  let totalTokens = 0;
  const messages = [...context.messages];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    try {
      // Emit thinking for each turn after the first
      if (turn > 0) {
        yield { type: 'thinking', data: { threadId } };
      }

      const llmResponse = await provider.chat(messages, { tools: TOOLS });

      // Track usage
      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      // Handle tool calls
      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        // Stream any partial text content first
        if (llmResponse.content) {
          yield { type: 'chunk', data: { text: llmResponse.content, threadId } };
          messages.push({ role: 'assistant', content: llmResponse.content });
        }

        // Execute tools and emit events
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

          try {
            const result = await executeTool(
              toolCall.name,
              toolCall.arguments,
              db,
              user.id,
              user.pin_hash,
              env?.GOOGLE_CLIENT_ID,
              env?.GOOGLE_CLIENT_SECRET,
              env?.GOOGLE_API_KEY,
              env?.GOOGLE_CSE_ID,
              user.timezone,
              provider
            );

            // Emit tool end with result
            yield {
              type: 'tool_end',
              data: {
                tool: toolCall.name,
                toolResult: result.substring(0, 500) + (result.length > 500 ? '...' : ''),
                threadId,
              },
            };

            messages.push({ role: 'user', content: `[Tool Result for ${toolCall.name}]: ${result}` });
          } catch (toolErr: any) {
            await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');
            
            yield {
              type: 'tool_end',
              data: {
                tool: toolCall.name,
                toolResult: `Error: ${toolErr.message || 'Execution failed'}`,
                threadId,
              },
            };

            messages.push({ role: 'user', content: `[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}` });
          }
        }
        continue;
      }

      // No tool calls — stream final response
      response = llmResponse.content;
      
      // Stream response in chunks for perceived responsiveness
      const chunkSize = 50; // characters per chunk
      for (let i = 0; i < response.length; i += chunkSize) {
        const chunk = response.substring(i, i + chunkSize);
        yield { type: 'chunk', data: { text: chunk, threadId } };
        // Small delay between chunks for smooth streaming effect
        if (i + chunkSize < response.length) {
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
      
      yield {
        type: 'error',
        data: { error: err.message || 'An error occurred', threadId },
      };
      return;
    }
  }

  // Record token usage (best-effort)
  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }

  // Store assistant response
  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);

  // Context window guard
  await memory.compactHistory(user.id, 30);

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
// Each sub-agent has: smaller prompt (~500-800 words vs ~3000), only its tools, faster execution
// Falls back to the full monolithic runAgent for 'multi' intent or on error

export async function runAgentRouted(
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string }
): Promise<string> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Build memory context (needed for both classification and sub-agent)
  const memoryContext = await memory.buildContext(user.id);

  // Step 1: Classify intent using fast keyword heuristics
  const route = classifyIntentFast(message.text, memoryContext);

  // Step 2: If conversation (no tools needed) — run lightweight chat
  if (route.agent === 'conversation') {
    return runConversationAgent(message, db, provider, user, memoryContext, rotation, threadId);
  }

  // Step 3: If multi or low confidence — fall back to full agent
  if (route.agent === 'multi' || route.confidence < 0.5) {
    return runAgent(message, db, provider, user, rotation, env);
  }

  // Step 4: Run the focused sub-agent
  try {
    const result = await runSubAgent(
      route.agent,
      message,
      db,
      provider,
      user,
      memoryContext,
      rotation,
      env,
      threadId
    );
    return result;
  } catch (err: any) {
    // Sub-agent failed — fall back to full agent
    await logError(db, user.id, 'router', 'subagent_fallback', `${route.agent} failed: ${err.message}`, { route });
    return runAgent(message, db, provider, user, rotation, env);
  }
}

// Focused sub-agent runner — smaller prompt, filtered tools, same agentic loop
async function runSubAgent(
  agent: AgentType,
  message: NormalizedMessage,
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  memoryContext: string,
  rotation?: ProviderRotation,
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string },
  threadId?: number
): Promise<string> {
  const memory = new MemoryService(db);

  // Build focused system prompt (much smaller than the full one)
  const currentDateTime = formatDateForTimezone(user.timezone);
  const systemPrompt = buildSubAgentPrompt(agent, user, memoryContext, user.timezone, currentDateTime);

  // Get only the tools this sub-agent needs
  const subTools = getToolsForAgent(agent, TOOLS);

  // Load conversation history (thread-scoped)
  const recentMessages = await memory.getRecentConversations(user.id, 25, threadId);

  // Assemble messages
  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ];

  // Store user message
  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop — max 10 iterations (same as full agent)
  const MAX_TURNS = 10;
  let response = '';
  let totalTokens = 0;
  let lastIntermediateContent = ''; // Track content from turns with tool calls

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    try {
      const llmResponse = await provider.chat(messages, {
        tools: subTools.length > 0 ? subTools : undefined,
      });

      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      // Tool calls
      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        if (llmResponse.content) {
          lastIntermediateContent = llmResponse.content;
          messages.push({ role: 'assistant', content: llmResponse.content });
        }
        for (const toolCall of llmResponse.toolCalls) {
          try {
            const result = await executeTool(
              toolCall.name, toolCall.arguments, db, user.id, user.pin_hash,
              env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
              env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID,
              user.timezone, provider
            );
            messages.push({ role: 'user', content: `[Tool Result for ${toolCall.name}]: ${result}` });
          } catch (toolErr: any) {
            await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');
            messages.push({ role: 'user', content: `[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}` });
          }
        }
        continue;
      }

      // Final response
      response = llmResponse.content;
      if (!response && lastIntermediateContent) {
        // LLM returned empty final response after tool execution — shouldn't happen
        // but if it does, don't lose the intermediate content
        response = lastIntermediateContent;
      }
      break;
    } catch (err: any) {
      if (rotation) {
        const msg = err.message || '';
        const isAuth = msg.includes('401') || msg.includes('403') || msg.includes('authentication') || msg.includes('credit balance');
        const isRateLimit = msg.includes('429');
        const cooldownMins = isAuth ? 1440 : isRateLimit ? 10 : 5;
        await rotation.recordError(provider.name, msg, cooldownMins);
      }
      await logError(db, user.id, 'llm', 'subagent_error', err.message || 'Unknown error', { agent, provider: provider.name, turn });
      throw err;
    }
  }

  // Record usage
  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }

  // Store response
  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);
  await memory.compactHistory(user.id, 30);

  return response;
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
  const currentDateTime = formatDateForTimezone(user.timezone);
  const systemPrompt = buildSubAgentPrompt('conversation', user, memoryContext, user.timezone, currentDateTime);

  const recentMessages = await memory.getRecentConversations(user.id, 25, threadId);

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ];

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

  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);
  await memory.compactHistory(user.id, 30);

  return response;
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
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; GOOGLE_API_KEY?: string; GOOGLE_CSE_ID?: string }
): AsyncGenerator<SSEEvent, void, unknown> {
  const memory = new MemoryService(db);
  const threadId = message.metadata?.thread_id as number | undefined;

  // Classify intent
  const memoryContext = await memory.buildContext(user.id);
  const route = classifyIntentFast(message.text, memoryContext);

  // Emit routing info as a thinking event
  yield {
    type: 'thinking',
    data: { threadId, provider: provider.name },
  };

  // If multi/low-confidence → delegate to full streaming agent
  if (route.agent === 'multi' || route.confidence < 0.5) {
    yield* runAgentStreaming(message, db, provider, user, rotation, env);
    return;
  }

  // Build focused context
  const currentDateTime = formatDateForTimezone(user.timezone);
  const systemPrompt = route.agent === 'conversation'
    ? buildSubAgentPrompt('conversation', user, memoryContext, user.timezone, currentDateTime)
    : buildSubAgentPrompt(route.agent, user, memoryContext, user.timezone, currentDateTime);

  const subTools = getToolsForAgent(route.agent, TOOLS);
  const recentMessages = await memory.getRecentConversations(user.id, 25, threadId);

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    ...recentMessages.map(m => ({
      role: m.role as LLMMessage['role'],
      content: m.content,
    })),
    { role: 'user', content: message.text },
  ];

  await memory.storeMessage(user.id, message.channel, 'user', message.text, '{}', threadId);

  // Agentic loop with streaming events
  const MAX_TURNS = 10;
  let response = '';
  let totalTokens = 0;

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    try {
      if (turn > 0) {
        yield { type: 'thinking', data: { threadId } };
      }

      const llmResponse = await provider.chat(messages, {
        tools: subTools.length > 0 ? subTools : undefined,
      });

      if (llmResponse.usage) {
        totalTokens += llmResponse.usage.promptTokens + llmResponse.usage.completionTokens;
      }

      if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
        if (llmResponse.content) {
          yield { type: 'chunk', data: { text: llmResponse.content, threadId } };
          messages.push({ role: 'assistant', content: llmResponse.content });
        }

        for (const toolCall of llmResponse.toolCalls) {
          yield {
            type: 'tool_start',
            data: { tool: toolCall.name, toolArgs: toolCall.arguments, threadId },
          };

          try {
            const result = await executeTool(
              toolCall.name, toolCall.arguments, db, user.id, user.pin_hash,
              env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET,
              env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID,
              user.timezone, provider
            );

            yield {
              type: 'tool_end',
              data: {
                tool: toolCall.name,
                toolResult: result.substring(0, 500) + (result.length > 500 ? '...' : ''),
                threadId,
              },
            };

            messages.push({ role: 'user', content: `[Tool Result for ${toolCall.name}]: ${result}` });
          } catch (toolErr: any) {
            await logError(db, user.id, 'tool', toolCall.name, toolErr.message || 'Tool execution failed');
            yield {
              type: 'tool_end',
              data: { tool: toolCall.name, toolResult: `Error: ${toolErr.message || 'Execution failed'}`, threadId },
            };
            messages.push({ role: 'user', content: `[Tool Error for ${toolCall.name}]: ${toolErr.message || 'Execution failed'}` });
          }
        }
        continue;
      }

      // Final response — stream in chunks
      response = llmResponse.content;
      const chunkSize = 50;
      for (let i = 0; i < response.length; i += chunkSize) {
        const chunk = response.substring(i, i + chunkSize);
        yield { type: 'chunk', data: { text: chunk, threadId } };
        if (i + chunkSize < response.length) {
          await new Promise(r => setTimeout(r, 10));
        }
      }
      break;
    } catch (err: any) {
      if (rotation) {
        const msg = err.message || '';
        const isAuth = msg.includes('401') || msg.includes('403') || msg.includes('authentication') || msg.includes('credit balance');
        const isRateLimit = msg.includes('429');
        const cooldownMins = isAuth ? 1440 : isRateLimit ? 10 : 5;
        await rotation.recordError(provider.name, msg, cooldownMins);
      }
      await logError(db, user.id, 'llm', 'subagent_stream_error', err.message || 'Unknown error', { agent: route.agent, provider: provider.name, turn });

      yield { type: 'error', data: { error: err.message || 'An error occurred', threadId } };
      return;
    }
  }

  if (rotation && totalTokens > 0) {
    try { await rotation.recordUsage(provider.name, totalTokens); } catch { /* non-critical */ }
  }

  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);
  await memory.compactHistory(user.id, 30);

  yield {
    type: 'done',
    data: { threadId, provider: provider.name, tokenCount: totalTokens },
  };
}
