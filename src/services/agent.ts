// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation, logError } from './llm/provider';
import { BrowserActions } from './browser';
import { GoogleServices } from './google';
import { searchPlaces, getPlaceDetails, getDirections, translateText, searchYouTube, getDistanceMatrix, geocode } from './google-apis';
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
      properties: {},
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
      properties: {},
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
  // === Browser Automation Tools (Phase 3) ===
  // Gmail tools
  {
    name: 'check_gmail',
    description: 'Check Gmail inbox for recent emails. Uses browser automation (Steel + Browser Use) to access Gmail and list unread/recent emails. Requires Steel and Browser Use API keys to be configured. Note: First-time use may require the user to complete Google sign-in through the Steel session viewer.',
    parameters: {
      type: 'object',
      properties: {},
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
    description: 'Check Outlook inbox for recent emails. Uses browser automation (Steel + Browser Use) to log into Outlook and list unread/recent emails. The user may have two Outlook accounts configured: primary (work) and secondary (personal). Default to primary unless the user specifies otherwise.',
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
    description: 'Browse the web and interact with websites using AI-driven browser automation. Use this for any web task: reading pages, filling forms, extracting data, or navigating sites. Describe what you need done in natural language.',
    parameters: {
      type: 'object',
      properties: {
        instruction: { type: 'string', description: 'Natural language instruction for what to do on the web (e.g., "Go to weather.com and get the forecast for Mumbai")' },
      },
      required: ['instruction'],
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

## How You Work
- When the user asks you to remind them or schedule something, use the create_schedule tool.
- When asked about your tasks or schedules, use list_schedules.
- When the user tells you something important about themselves, store it using store_memory.
- When you need context about the user, search your memory first.
- When the user says a task/reminder is done, use update_schedule_state to mark it completed.
- For Google Sheets: use read_sheet, write_sheet, append_sheet for existing sheets. Use create_sheet to make new spreadsheets. All operations use the user's own Google account via OAuth.
- For Google Calendar: use list_calendar_events to check upcoming events, create_calendar_event to add events. Uses the user's actual calendar (primary).
- For Google Docs: use create_doc to make documents, read_doc to read them.
- If Google is not connected, tell the user to go to Settings → Keys → Google Workspace and click "Connect Google Account".
- For email: use check_gmail or check_outlook_mail for inbox, compose_gmail_draft or compose_email_draft for drafts.
- The user may have two Outlook accounts: primary (typically work) and secondary (typically personal). Always ask which account if the context is ambiguous. Default to primary.
- For location/place queries: use search_places to find businesses, restaurants, etc. Use get_place_details for phone/hours/website of a specific place.
- For directions and travel time: use get_directions for step-by-step navigation, get_travel_time for quick distance/duration checks, geocode_address to resolve addresses to coordinates.
- For translation: use translate_text. It auto-detects the source language.
- For YouTube: use search_youtube to find videos, performances, tutorials.
- For general web tasks: use browse_web with a natural language instruction.
- If the Google API Key is not set, tell the user to add it in Settings → Keys → Google API Key.
- Keep responses concise but not terse. Be human.
- Format responses in clean text. Use markdown sparingly — only for lists and emphasis.
- When showing schedules or structured data, respond naturally first, then the data follows.

## Tool Usage
- You have tools available. Use them when the conversation naturally calls for it.
- Don't announce tool usage — just do it and present the result naturally.
- If a tool call fails, explain what happened simply and suggest alternatives.

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
  googleCseId?: string
): Promise<string> {
  const memory = new MemoryService(db);

  switch (toolName) {
    case 'create_schedule': {
      const now = new Date();
      let nextRun: Date;
      
      if (args.schedule_type === 'interval') {
        const minutes = parseInt(args.schedule_value as string, 10);
        nextRun = new Date(now.getTime() + minutes * 60 * 1000);
      } else {
        // daily — parse HH:MM
        const [hours, mins] = (args.schedule_value as string).split(':').map(Number);
        nextRun = new Date(now);
        nextRun.setUTCHours(hours, mins, 0, 0);
        if (nextRun <= now) nextRun.setDate(nextRun.getDate() + 1);
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
          return `${i + 1}. **${p.name}**${rating}${open}\n   ${p.address}\n   [place_id: ${p.placeId}]`;
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

  // Build context with token budget enforcement
  const memoryContext = await memory.buildContext(user.id);
  const recentMessages = await memory.getRecentConversations(user.id, 15);
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
  await memory.storeMessage(user.id, message.channel, 'user', message.text);

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
            const result = await executeTool(toolCall.name, toolCall.arguments, db, user.id, user.pin_hash, env?.GOOGLE_CLIENT_ID, env?.GOOGLE_CLIENT_SECRET, env?.GOOGLE_API_KEY, env?.GOOGLE_CSE_ID);
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
        const cooldownMins = err.message?.includes('429') ? 10 : 5;
        await rotation.recordError(provider.name, err.message || 'Unknown error', cooldownMins);
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
  await memory.storeMessage(user.id, message.channel, 'assistant', response);

  // Context window guard
  await memory.compactHistory(user.id, 30);

  return response;
}
