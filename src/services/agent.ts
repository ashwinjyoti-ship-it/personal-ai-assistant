// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation, logError } from './llm/provider';
import { BrowserActions } from './browser';
import { GoogleServices } from './google';
import { searchPlaces, getPlaceDetails, getDirections, translateText, searchYouTube, getDistanceMatrix, geocode, webSearch } from './google-apis';
import { GmailService } from './gmail';
import { conductResearch } from './research';
import { decrypt } from './crypto';

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
        schedule_type: { type: 'string', enum: ['interval', 'daily'], description: 'interval = every N minutes, daily = at a specific time' },
        schedule_value: { type: 'string', description: 'For interval: number of minutes (e.g. "30"). For daily: time in HH:MM format (e.g. "08:00")' },
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
    description: 'Read data from a Google Sheet. Requires Google account to be connected via OAuth. Returns cell values as rows.',
    parameters: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)' },
        range: { type: 'string', description: 'Cell range in A1 notation (e.g., "Sheet1!A1:D10", "Sheet1!A:A")' },
      },
      required: ['spreadsheet_id', 'range'],
    },
  },
  {
    name: 'write_sheet',
    description: 'Write or update data in a Google Sheet. Overwrites the specified range.',
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
    description: 'Append new rows to the end of a Google Sheet. Data is added after the last row with content.',
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
    description: 'Create a new Google Spreadsheet in the user\'s Google Drive. Returns the spreadsheet ID and URL. Requires Google account to be connected via OAuth.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Name of the new spreadsheet' },
        sheet_names: { type: 'array', description: 'Tab names (e.g., ["Data", "Summary", "Errors"])', items: { type: 'string' } },
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
    description: 'Create a new Google Document in the user\'s Google Drive. Requires Google account to be connected via OAuth.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Document title' },
        content: { type: 'string', description: 'Initial text content to write into the document' },
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
  // === Browser Automation Tools (Phase 3) ===
  // Gmail tools
  {
    name: 'check_gmail',
    description: 'Check Gmail inbox for recent emails. Uses browser automation (Steel + Browser Use) to access Gmail and list unread/recent emails. Requires Steel and Browser Use API keys to be configured. Note: First-time use may require the user to complete Google sign-in through the Steel session viewer.',
    parameters: {
      type: 'object',
      properties: {
        max_results: { type: 'number', description: 'Maximum number of emails to retrieve. Default: 10' },
      },
    },
  },
  {
    name: 'compose_gmail_draft',
    description: 'Compose a draft email in Gmail without sending it. The draft will be saved in Drafts for the user to review.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject line' },
        body: { type: 'string', description: 'Email body text' },
      },
      required: ['to', 'subject', 'body'],
    },
  },
  {
    name: 'search_gmail',
    description: 'Search Gmail for specific emails by query. Uses Gmail\'s search syntax (from:, to:, subject:, has:attachment, etc.).',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Gmail search query (e.g., "from:john subject:meeting", "has:attachment newer_than:7d")' },
      },
      required: ['query'],
    },
  },
  // Outlook tools — support primary and secondary accounts
  {
    name: 'check_outlook_mail',
    description: 'Check Outlook inbox for recent emails. Uses Browser Use Cloud to log into Outlook and list recent emails. Requires Browser Use API key in Settings. The user may have two Outlook accounts configured: primary (work) and secondary (personal). Default to primary unless the user specifies otherwise.',
    parameters: {
      type: 'object',
      properties: {
        account: { type: 'string', enum: ['primary', 'secondary'], description: 'Which Outlook account to check. Default: primary.' },
      },
    },
  },
  {
    name: 'compose_email_draft',
    description: 'Compose an email draft in Outlook without sending it. The draft will be saved in the Drafts folder for the user to review and send manually. Supports primary and secondary Outlook accounts.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject line' },
        body: { type: 'string', description: 'Email body text' },
        account: { type: 'string', enum: ['primary', 'secondary'], description: 'Which Outlook account to compose from. Default: primary.' },
      },
      required: ['to', 'subject', 'body'],
    },
  },
  {
    name: 'check_outlook_calendar',
    description: 'Check Outlook calendar for today and tomorrow events. Lists event title, time, location, and attendees. Supports primary and secondary Outlook accounts.',
    parameters: {
      type: 'object',
      properties: {
        account: { type: 'string', enum: ['primary', 'secondary'], description: 'Which Outlook account calendar to check. Default: primary.' },
      },
    },
  },
  {
    name: 'browse_web',
    description: 'Browse the web and interact with websites using Browser Use Cloud AI agent. Use this for any web task: reading pages, filling forms, extracting data, or navigating sites. Requires Browser Use API key in Settings.',
    parameters: {
      type: 'object',
      properties: {
        instruction: { type: 'string', description: 'Natural language instruction for what to do on the web (e.g., "Go to weather.com and get the forecast for Mumbai")' },
      },
      required: ['instruction'],
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
    name: 'drive_upload',
    description: 'Upload a file to Google Drive. The file must have been previously uploaded via the chat attachment. Specify the file_id from the attached file metadata. Optionally specify a folder name or ID.',
    parameters: {
      type: 'object',
      properties: {
        file_id: { type: 'string', description: 'The file_id of the uploaded file (from attached file metadata)' },
        folder_name: { type: 'string', description: 'Optional: Name of the Drive folder to upload into. Will search for it or create if not found.' },
        folder_id: { type: 'string', description: 'Optional: Specific Google Drive folder ID to upload into' },
      },
      required: ['file_id'],
    },
  },
  {
    name: 'parse_document',
    description: 'Parse and extract text content from an uploaded file. Supports text files, CSV, JSON, XML, and other text-based formats. For binary formats (PDF, DOCX, images), returns the base64 data and detected type. Use this to read the full contents of an attached file.',
    parameters: {
      type: 'object',
      properties: {
        file_id: { type: 'string', description: 'The file_id of the uploaded file to parse' },
      },
      required: ['file_id'],
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
    description: 'Deep web research — searches, reads multiple pages, and synthesizes a report with sources. Use when user needs analysis, comparisons, fact-checking, or thorough answers. Returns a compiled report, not links. (~10-15s)',
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
  // === Self-building / Feature suggestion tools ===
  {
    name: 'suggest_feature',
    description: 'Propose a new feature or improvement for yourself. Use this when you notice something that could make you more useful — a missing tool, a better workflow, a UI improvement, or an integration opportunity. The user can approve or reject it later.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Short, clear feature title' },
        description: { type: 'string', description: 'Detailed description of the feature — what it does, how it works' },
        rationale: { type: 'string', description: 'Why this would be valuable — what problem it solves or what it improves' },
        priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'], description: 'Suggested priority' },
        category: { type: 'string', enum: ['general', 'tool', 'ui', 'integration', 'performance', 'security'], description: 'Feature category' },
      },
      required: ['title', 'description', 'rationale'],
    },
  },
  {
    name: 'list_feature_requests',
    description: 'List all feature requests and their statuses. Use to check what improvements have been proposed, approved, or implemented.',
    parameters: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['proposed', 'approved', 'rejected', 'in_progress', 'implemented', 'deferred', 'all'], description: 'Filter by status. Default: all' },
      },
    },
  },
  {
    name: 'update_feature_request',
    description: 'Update the status or notes of a feature request. Use when the user approves, rejects, or provides feedback on a suggested feature.',
    parameters: {
      type: 'object',
      properties: {
        feature_id: { type: 'number', description: 'ID of the feature request' },
        status: { type: 'string', enum: ['proposed', 'approved', 'rejected', 'in_progress', 'implemented', 'deferred'], description: 'New status' },
        notes: { type: 'string', description: 'Implementation notes or feedback' },
      },
      required: ['feature_id'],
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
- You are a cloud-based personal assistant with memory, scheduling, Google Workspace integration (Sheets, Calendar, Docs), and browser-automation capabilities — you can check Gmail, Outlook, calendar, and browse the web.
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.
- You always check your memory before responding to provide continuity.

## Current User
- **Name**: ${user.name}
- **Username**: ${user.username}
- **Role**: ${user.role}
- **Timezone**: ${user.timezone}

${personalitySection}

${memorySection}

## How You Work — Composable Capabilities

### Core Philosophy
Your tools are **building blocks**, not isolated features. Every tool is a capability that can be chained with any other tool. When the user gives a request — even a complex one — break it into steps and execute them in sequence. Don't ask permission between steps. Just do it and present the final result.

Think of it this way:
- **Gathering** tools find information (web_search, research, read_url, gmail_list, list_calendar_events, drive_search, search_places)
- **Creating** tools produce output (create_doc, create_sheet, gmail_draft, gmail_send, create_calendar_event)
- **Writing** tools save content (create_doc, append_to_doc, write_sheet, append_sheet, drive_upload, store_memory)
- **Reading** tools retrieve content (read_doc, read_sheet, gmail_read, read_url, parse_document)

Any gathering tool can feed into any creating/writing tool. Any reading tool can feed into any other step.

### Chaining Examples
- "Research DeepSeek API and save to a doc" → research → create_doc (with full report as content)
- "What's the latest AI news? Write a summary in Google Docs" → web_search → create_doc
- "Read this article https://... and email me the key points" → read_url → gmail_send
- "Check my calendar for tomorrow and create a doc with my schedule" → list_calendar_events → create_doc
- "Find audio stores in Mumbai and make a spreadsheet" → search_places → create_sheet → write_sheet
- "What's in my inbox? Anything from John, save to a doc" → gmail_list → gmail_read → create_doc
- "Research X, then add the findings to my existing doc" → research → append_to_doc
- "Search for laptop reviews on reddit and save the best ones" → web_search (site:reddit.com) → read_url (top result) → create_doc

### Information Retrieval (4 tiers)
1. **web_search** — Quick lookup (~1s). Returns titles, URLs, snippets. Use for: facts, links, news, prices, quick answers.
2. **read_url** — Read one page (~3-5s). Fetches and extracts text from a URL. Use for: reading articles, docs, blog posts, specific pages from search results.
3. **research** — Deep analysis (~10-15s). Searches, reads 3-5 pages, synthesizes a report with citations. Use for: "research X", "is X good for Y?", "compare A vs B", complex questions.
4. **browse_web** — Interactive browser (~30s+). Fills forms, clicks, logs in. Use only when the other tools can't do the job.

**Trigger words**: "research", "look into", "investigate", "analyze", "compare" → use **research**. "Search for", "find", "what is" → use **web_search**. "Read this page/article/link" → use **read_url**.

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **drive_upload** — Upload attached files to Drive.
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.

When the user says "save this", "write to a doc", "put this in Drive" — create a Google Doc with the content. Always use a descriptive title.

### Memory & Scheduling
- store_memory — Remember important info (facts, preferences, decisions). Always check memory for context.
- search_memory — Recall previously stored info.
- create_schedule / list_schedules / toggle_schedule — Manage recurring tasks and reminders.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc
- Drive: drive_list, drive_search, drive_upload, parse_document
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.

### Email
- **Gmail API (preferred)**: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count
- **Browser fallback**: check_gmail, compose_gmail_draft, search_gmail — only if API fails
- **Outlook**: check_outlook_mail, compose_email_draft, check_outlook_calendar

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Self-Improvement
- suggest_feature, list_feature_requests, update_feature_request

### Response Style
- Be concise but human. Never robotic.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.

## Current Date & Time
${formatDateForTimezone(user.timezone)} (${user.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`;

  return basePrompt;
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
      } else {
        // daily — parse HH:MM in user's local timezone, store as UTC
        const [hours, mins] = (args.schedule_value as string).split(':').map(Number);
        // Get "now" in user's timezone
        const userNowStr = now.toLocaleString('en-US', { timeZone: tz });
        const userNow = new Date(userNowStr);
        const candidate = new Date(userNow);
        candidate.setHours(hours, mins, 0, 0);
        if (candidate <= userNow) candidate.setDate(candidate.getDate() + 1);
        // Convert back to UTC
        const utcRef = new Date(candidate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzRef = new Date(candidate.toLocaleString('en-US', { timeZone: tz }));
        const offsetMs = utcRef.getTime() - tzRef.getTime();
        nextRun = new Date(candidate.getTime() + offsetMs);
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

      return `Schedule created: "${args.name}" — ${args.schedule_type === 'interval' ? `every ${args.schedule_value} minutes` : `daily at ${args.schedule_value}`}. State: active. Next run: ${nextRun.toISOString()}`;
    }

    case 'list_schedules': {
      const result = await db.prepare(
        `SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC`
      ).bind(userId).all<CronJobRecord>();
      
      const jobs = result.results || [];
      if (jobs.length === 0) return 'No scheduled tasks found.';
      
      return jobs.map(j => 
        `[ID:${j.id}] ${j.enabled ? '▶' : '⏸'} "${j.name}" — ${j.schedule_type === 'interval' ? `every ${j.schedule_value} min` : `daily at ${j.schedule_value}`} — ${j.action_type} — state: ${j.state || 'active'} — next: ${j.next_run || 'N/A'}`
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
      
      const lastHeart = await db.prepare(
        `SELECT * FROM heartbeat_log ORDER BY created_at DESC LIMIT 1`
      ).first<{ status: string; created_at: string }>();

      // Provider usage today
      const today = new Date().toISOString().split('T')[0];
      const providerStats = await db.prepare(
        `SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?`
      ).bind(userId, today).all<{ provider: string; tokens_used: number; request_count: number }>();

      const providerLines = (providerStats.results || []).map(p => 
        `  ${p.provider}: ${p.tokens_used.toLocaleString()} tokens / ${p.request_count} requests`
      ).join('\n');

      // Error count
      const errCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0`
      ).bind(userId).first<{ cnt: number }>();

      return `System Status:
- Active schedules: ${jobCount?.cnt || 0}
- Memory: ${workingMemCount?.cnt || 0} working / ${memCount?.cnt || 0} total
- Total messages: ${msgCount?.cnt || 0}
- Unread errors: ${errCount?.cnt || 0}
- Last heartbeat: ${lastHeart?.status || 'N/A'} at ${lastHeart?.created_at || 'never'}
- Provider usage today:
${providerLines || '  No usage recorded'}`;
    }

    // === Google Workspace Tools ===

    case 'read_sheet': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const google = new GoogleServices(db, userId, pinHash, googleClientId || '', googleClientSecret || '');
        const values = await google.sheets.readRange(args.spreadsheet_id as string, args.range as string);
        if (values.length === 0) return 'No data found in the specified range.';
        // Format as readable table
        return values.map(row => row.join('\t| ')).join('\n');
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
        return `Spreadsheet created: "${args.title}"\nID: ${result.spreadsheetId}\nURL: ${result.url}`;
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
        return `Document created: "${args.title}"\nID: ${result.documentId}\nURL: ${result.url}`;
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

    case 'drive_upload': {
      if (!pinHash) return 'Authentication context unavailable.';
      try {
        const fileId = args.file_id as string;
        if (!fileId) return 'file_id is required.';

        // Fetch the file from uploaded_files table
        const fileRecord = await db.prepare(
          'SELECT * FROM uploaded_files WHERE id = ? AND user_id = ?'
        ).bind(fileId, userId).first<any>();

        if (!fileRecord) return `File not found (id: ${fileId}). It may have been deleted or expired.`;

        const { token } = await (await import('./google')).getGoogleAuth(db, userId, pinHash, googleClientId || '', googleClientSecret || '');

        // If folder_name specified, find or create it
        let targetFolderId = args.folder_id as string || undefined;
        if (!targetFolderId && args.folder_name) {
          const folderName = args.folder_name as string;
          const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const searchData = await searchRes.json() as { files: any[] };
          if (searchData.files?.length > 0) {
            targetFolderId = searchData.files[0].id;
          } else {
            // Create the folder
            const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: folderName, mimeType: 'application/vnd.google-apps.folder' }),
            });
            const createData = await createRes.json() as { id: string };
            targetFolderId = createData.id;
          }
        }

        // Upload using multipart upload
        const fileBytes = Uint8Array.from(atob(fileRecord.data_base64), c => c.charCodeAt(0));
        const metadata: any = { name: fileRecord.name };
        if (targetFolderId) metadata.parents = [targetFolderId];

        const boundary = '-------karna_upload_boundary';
        const metadataPart = JSON.stringify(metadata);
        const body = '--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + metadataPart + '\r\n--' + boundary + '\r\nContent-Type: ' + fileRecord.mime_type + '\r\nContent-Transfer-Encoding: base64\r\n\r\n' + fileRecord.data_base64 + '\r\n--' + boundary + '--';

        const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,size', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: body,
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          throw new Error(`Drive upload failed (${uploadRes.status}): ${errText}`);
        }

        const uploadData = await uploadRes.json() as { id: string; name: string; webViewLink: string };
        const folderInfo = args.folder_name ? ` in folder "${args.folder_name}"` : '';
        return `✅ Uploaded **${uploadData.name}**${folderInfo} to Google Drive.\n📎 ${uploadData.webViewLink || 'https://drive.google.com/file/d/' + uploadData.id}`;
      } catch (err: any) {
        await logError(db, userId, 'google', 'drive_upload', err.message);
        return `Drive upload error: ${err.message}`;
      }
    }

    case 'parse_document': {
      try {
        const fileId = args.file_id as string;
        if (!fileId) return 'file_id is required.';

        const fileRecord = await db.prepare(
          'SELECT id, name, mime_type, size, text_preview, data_base64 FROM uploaded_files WHERE id = ? AND user_id = ?'
        ).bind(fileId, userId).first<any>();

        if (!fileRecord) return `File not found (id: ${fileId}).`;

        const mime = fileRecord.mime_type as string;
        const name = fileRecord.name as string;

        // Text-based formats — return full text
        if (mime.startsWith('text/') || mime === 'application/json' || mime === 'application/xml' || mime === 'text/csv' || mime === 'application/csv') {
          const textDecoder = new TextDecoder();
          const bytes = Uint8Array.from(atob(fileRecord.data_base64), c => c.charCodeAt(0));
          const fullText = textDecoder.decode(bytes);
          const truncated = fullText.length > 8000 ? fullText.substring(0, 8000) + '\n\n[...truncated at 8000 chars, total: ' + fullText.length + ' chars]' : fullText;
          return `📄 **${name}** (${mime}, ${Math.round(fileRecord.size / 1024)}KB)\n\n\`\`\`\n${truncated}\n\`\`\``;
        }

        // For binary formats, return metadata and detection info
        const sizeKb = Math.round(fileRecord.size / 1024);
        let info = `📄 **${name}** (${mime}, ${sizeKb}KB)\n\n`;

        if (mime === 'application/pdf') {
          info += 'This is a PDF file. Text extraction from PDF requires external services. ';
          info += 'You can upload it to Google Drive using drive_upload, then use Google Docs to open and read it.';
        } else if (mime.includes('word') || mime.includes('document') || name.endsWith('.docx') || name.endsWith('.doc')) {
          info += 'This is a Word document. Upload it to Google Drive using drive_upload to view/edit.';
        } else if (mime.includes('spreadsheet') || mime.includes('excel') || name.endsWith('.xlsx') || name.endsWith('.xls')) {
          info += 'This is a spreadsheet. Upload it to Google Drive using drive_upload to view/edit with Google Sheets.';
        } else if (mime.startsWith('image/')) {
          info += 'This is an image file (' + mime + '). Upload it to Google Drive using drive_upload for storage.';
        } else if (mime.startsWith('audio/') || mime.startsWith('video/')) {
          info += 'This is a media file (' + mime + '). Upload it to Google Drive using drive_upload for storage.';
        } else {
          info += 'Binary file detected. Upload it to Google Drive using drive_upload.';
        }

        if (fileRecord.text_preview) {
          info += '\n\n**Partial text extracted:**\n```\n' + fileRecord.text_preview.substring(0, 2000) + '\n```';
        }

        return info;
      } catch (err: any) {
        return `Document parse error: ${err.message}`;
      }
    }

    // === Browser Automation Tools ===

    // Gmail tools
    case 'check_gmail': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const gmailBrowser = new BrowserActions(db, userId);
      return await gmailBrowser.checkGmail(pinHash);
    }

    case 'compose_gmail_draft': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const gmailCompose = new BrowserActions(db, userId);
      return await gmailCompose.composeGmailDraft(pinHash, args.to as string, args.subject as string, args.body as string);
    }

    case 'search_gmail': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const gmailSearch = new BrowserActions(db, userId);
      return await gmailSearch.searchGmail(pinHash, args.query as string);
    }

    // Outlook tools — with account selection
    case 'check_outlook_mail': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const browser = new BrowserActions(db, userId);
      const account = (args.account as 'primary' | 'secondary') || 'primary';
      return await browser.checkOutlookMail(pinHash, account);
    }

    case 'compose_email_draft': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const browser = new BrowserActions(db, userId);
      const account = (args.account as 'primary' | 'secondary') || 'primary';
      return await browser.composeDraft(
        pinHash,
        args.to as string,
        args.subject as string,
        args.body as string,
        account
      );
    }

    case 'check_outlook_calendar': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const browser = new BrowserActions(db, userId);
      const account = (args.account as 'primary' | 'secondary') || 'primary';
      return await browser.checkOutlookCalendar(pinHash, account);
    }

    case 'browse_web': {
      if (!pinHash) return 'Authentication context unavailable for browser actions.';
      const browser = new BrowserActions(db, userId);
      return await browser.browseWeb(pinHash, args.instruction as string);
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
        const result = await conductResearch(
          args.query as string,
          llmProvider,
          {
            depth: (args.depth as 'quick' | 'thorough') || 'quick',
            site: args.site as string | undefined,
          }
        );

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

    // === Self-building / Feature request tools ===
    case 'suggest_feature': {
      try {
        const title = args.title as string;
        const description = args.description as string;
        const rationale = args.rationale as string || '';
        const priority = args.priority as string || 'medium';
        const category = args.category as string || 'general';
        const proposedBy = args.proposed_by as string || 'assistant';

        await db.prepare(
          `INSERT INTO feature_requests (user_id, title, description, rationale, priority, category, proposed_by) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(userId, title, description, rationale, priority, category, proposedBy).run();

        return `Feature proposed: "${title}" (${priority} priority, ${category}). The user can review it in Settings → Features or ask to list feature requests.`;
      } catch (err: any) {
        await logError(db, userId, 'system', 'suggest_feature', err.message);
        return `Error proposing feature: ${err.message}`;
      }
    }

    case 'list_feature_requests': {
      try {
        const statusFilter = args.status as string || 'all';
        let query = 'SELECT * FROM feature_requests WHERE user_id = ?';
        const params: any[] = [userId];
        
        if (statusFilter !== 'all') {
          query += ' AND status = ?';
          params.push(statusFilter);
        }
        query += ' ORDER BY created_at DESC LIMIT 30';

        const result = await db.prepare(query).bind(...params).all<any>();
        const features = result.results || [];
        
        if (features.length === 0) {
          return statusFilter === 'all' 
            ? 'No feature requests yet. I\'ll suggest improvements as I notice opportunities.' 
            : `No feature requests with status "${statusFilter}".`;
        }

        const statusEmoji: Record<string, string> = {
          proposed: '💡', approved: '✅', rejected: '❌', in_progress: '🔧', implemented: '🎉', deferred: '⏸️'
        };

        return features.map((f: any, i: number) => {
          return `${i + 1}. ${statusEmoji[f.status] || '•'} **${f.title}** [${f.status}] (${f.priority})\n   ${f.description}\n   ${f.rationale ? 'Why: ' + f.rationale : ''}\n   Category: ${f.category} · ID: ${f.id}`;
        }).join('\n\n');
      } catch (err: any) {
        await logError(db, userId, 'system', 'list_features', err.message);
        return `Error listing features: ${err.message}`;
      }
    }

    case 'update_feature_request': {
      try {
        const featureId = args.feature_id as number;
        const updates: string[] = [];
        const values: any[] = [];
        
        if (args.status) {
          updates.push('status = ?');
          values.push(args.status);
        }
        if (args.notes) {
          updates.push('implementation_notes = ?');
          values.push(args.notes);
        }
        
        if (updates.length === 0) return 'No updates specified.';
        
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(featureId, userId);

        await db.prepare(
          `UPDATE feature_requests SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`
        ).bind(...values).run();

        return `Feature request #${featureId} updated.`;
      } catch (err: any) {
        await logError(db, userId, 'system', 'update_feature', err.message);
        return `Error updating feature: ${err.message}`;
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
  const recentMessages = await memory.getRecentConversations(user.id, 15, threadId);
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

  // Record token usage for rotation tracking
  if (rotation && totalTokens > 0) {
    await rotation.recordUsage(provider.name, totalTokens);
  }

  // Store assistant response
  await memory.storeMessage(user.id, message.channel, 'assistant', response, '{}', threadId);

  // Context window guard
  await memory.compactHistory(user.id, 30);

  return response;
}
