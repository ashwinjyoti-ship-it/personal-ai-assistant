// Intent Classifier & Conversation Prompt Builder
// Classifies user intent → 'conversation' (no tools) or 'multi' (full agent)

import type { UserRecord } from '../types';

// === Agent Types ===
export type AgentType =
  | 'conversation'  // General chat, creative, personality — no tools
  | 'multi'         // Anything requiring tools — full agent
  ;

export interface RouteResult {
  agent: AgentType;
  confidence: number; // 0-1
  reasoning: string;
}

// === Fast Intent Classifier ===
// Uses keyword heuristics FIRST (zero LLM cost), falls back to LLM only when ambiguous
// Returns agent type in <5ms for 80% of queries

const KEYWORD_RULES: { pattern: RegExp; weight: number }[] = [
  // Scheduler — high confidence triggers
  { pattern: /\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i, weight: 0.9 },
  // Typo-tolerant: catches "reminf me", "remid me", "remnd me", etc.
  { pattern: /\bremi[a-z]{0,5}\s+(me|us)\b/i, weight: 0.9 },
  // "[action]. Task" or "[action] as a task" — user explicitly wants it stored, not executed
  { pattern: /[.!]\s*[Tt]ask\s*$/, weight: 0.95 },
  { pattern: /\bas\s+a\s+task\s*$/i, weight: 0.95 },
  { pattern: /^[Tt]ask:\s*/, weight: 0.95 },
  { pattern: /\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i, weight: 0.9 },
  // Reminder update/reschedule — "change time", "update reminder", "move it to", "reschedule", "cancel reminder"
  { pattern: /\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i, weight: 0.9 },
  // Listing / querying reminders — "show me my reminders", "what reminders do I have", "any upcoming reminders"
  { pattern: /\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i, weight: 0.9 },
  // Stop / turn off / disable reminder (generic disable language)
  { pattern: /\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i, weight: 0.9 },
  // Snooze / delay / push back
  { pattern: /\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i, weight: 0.9 },
  // Generic "change/move/shift it to [time]" — follow-up edits in schedule context
  { pattern: /\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i, weight: 0.85 },
  // "set it for [time]" — user specifying new time without "remind" keyword
  { pattern: /\bset\s+it\s+(for|at|to)\b/i, weight: 0.85 },
  // Natural time queries about an existing reminder
  { pattern: /\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i, weight: 0.9 },
  // "tell me in X", "notify me in X", "alert me in X" — natural scheduling language
  { pattern: /\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i, weight: 0.9 },
  // "notify me at 3pm", "tell me at 9:30", "alert me at 5" — absolute time with verb
  { pattern: /\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i, weight: 0.9 },
  // "in X minutes/hours" as standalone time reference (strong scheduling intent)
  { pattern: /\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i, weight: 0.85 },
  // Deferred action patterns: "check X in 48 hours", "after 2 days check Y"
  { pattern: /\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i, weight: 0.9 },
  { pattern: /\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i, weight: 0.9 },
  { pattern: /\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i, weight: 0.9 },

  // Workspace — Google services
  { pattern: /\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i, weight: 0.85 },
  { pattern: /\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i, weight: 0.9 },
  // Sheets gaps: "update cell", "delete row", "create tab", "what's in column", "sum of", "total in"
  { pattern: /\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i, weight: 0.9 },
  // Gmail gaps: "forward email", "reply to email", "mark as", "got an email from"
  { pattern: /\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i, weight: 0.85 },
  // Calendar gaps: "cancel event/meeting", "reschedule meeting", "delete from calendar"
  { pattern: /\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i, weight: 0.9 },
  { pattern: /\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i, weight: 0.9 },
  // Gmail-specific patterns that were previously missed
  { pattern: /\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i, weight: 0.9 },
  { pattern: /\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i, weight: 0.9 },
  { pattern: /\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i, weight: 0.95 },
  // Calendar queries that don't say "calendar" explicitly
  { pattern: /\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i, weight: 0.9 },
  { pattern: /\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i, weight: 0.9 },
  { pattern: /\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i, weight: 0.9 },
  { pattern: /\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i, weight: 0.85 },
  // Short expense patterns like "uber 700", "groceries 1200"
  { pattern: /^\s*\w+\s+\d{2,}\s*$/i, weight: 0.7 },

  // Research — web queries
  { pattern: /\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i, weight: 0.8 },
  { pattern: /\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i, weight: 0.85 },
  { pattern: /\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i, weight: 0.75 },
  { pattern: /\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i, weight: 0.8 },
  // Current events / news-adjacent questions that need web search
  { pattern: /\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i, weight: 0.85 },
  { pattern: /\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i, weight: 0.85 },
  { pattern: /\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i, weight: 0.85 },
  { pattern: /\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i, weight: 0.85 },
  { pattern: /\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i, weight: 0.8 },
  { pattern: /\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i, weight: 0.75 },
  // Delivery / order tracking — needs web search
  { pattern: /\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i, weight: 0.85 },
  { pattern: /\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i, weight: 0.85 },
  // How-to / learning queries
  { pattern: /\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i, weight: 0.7 },

  // Memory — store/recall
  { pattern: /\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i, weight: 0.9 },
  { pattern: /\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i, weight: 0.9 },
  // Memory gaps: "keep in mind", "always prefer", "delete/update memory", "what did I tell you about"
  { pattern: /\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i, weight: 0.9 },
  // Task capture
  { pattern: /\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i, weight: 0.88 },
  { pattern: /\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i, weight: 0.9 },
];

// Conversation is the default when nothing matches — no explicit patterns needed

export function classifyIntentFast(text: string, memoryContext?: string): RouteResult {
  // Any keyword match → needs tools → full agent
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(text)) {
      return { agent: 'multi', confidence: rule.weight, reasoning: 'Keyword match — full agent' };
    }
  }

  // Context-aware routing: short follow-up messages in an active tool session route to full agent.
  // Covers: "change time", "stop that", "so now?", "what about X?", "and flights?",
  // and continuations like "Give me." / "Do it." after a pending research promise.
  if (memoryContext && text.trim().length < 80) {
    const recentLines = memoryContext.split('\n').slice(-16); // last ~8 turns
    // Any active tool session — schedule, research, email, sheets, etc.
    // Also catch assistant messages that promised to do something ("I'll search…", "On it…")
    // so that a follow-up like "Give me." or "Go ahead." routes to the full agent.
    const hasToolContext = recentLines.some(line =>
      /\[TOOLS_USED:/i.test(line) ||
      /\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(line) ||
      /\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(line)
    );
    if (hasToolContext) {
      return { agent: 'multi', confidence: 0.8, reasoning: 'Active tool session follow-up — full agent' };
    }
  }

  // Memory context: if user has a sheet and message could reference it → full agent
  if (memoryContext && /spreadsheet|sheet|google\s*sheet/i.test(memoryContext)) {
    if (/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(text)) {
      return { agent: 'multi', confidence: 0.85, reasoning: 'Memory context — full agent' };
    }
  }

  // No keyword match → pure conversation
  return { agent: 'conversation', confidence: 0.8, reasoning: 'No tool-triggering keywords — general conversation' };
}

// === Tier 1 & 2 Deterministic Dispatch ===
// Bypasses the LLM for single-tool operations where params are known.
// The LLM never decides to call the tool — the code calls it directly.
// This eliminates hallucinations for covered operations entirely.

export interface DeterministicOp {
  tool: string;
  args: Record<string, unknown>;
}

/**
 * Tier 1: detect operations where intent + ALL params are present in the user message.
 * Returns {tool, args} for direct dispatch, or null to fall through to Tier 2 / full agent.
 */
export function detectDeterministicOp(text: string): DeterministicOp | null {
  // drive_delete_file: Drive URL present + delete/trash/remove keyword
  const driveUrl = text.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);
  if (driveUrl && /\b(delete|trash|remove)\b/i.test(text)) {
    return { tool: 'drive_delete_file', args: { url_or_id: driveUrl[0].replace(/[.,;)]$/, '') } };
  }

  // drive_list: list/show drive files — no params needed
  if (/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(text)) {
    return { tool: 'drive_list', args: {} };
  }

  // drive_search: "search drive for X" — extract query from message
  const driveSearchMatch = text.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);
  if (driveSearchMatch) {
    return { tool: 'drive_search', args: { query: driveSearchMatch[1].trim() } };
  }

  // gmail_unread_count: how many unread emails
  if (/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(text)) {
    return { tool: 'gmail_unread_count', args: {} };
  }

  // list_calendar_events: list upcoming events — only when no specific date in message
  // (date-specific queries need LLM to resolve the date correctly)
  if (/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(text) &&
      !/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(text)) {
    return { tool: 'list_calendar_events', args: {} };
  }

  // list_schedules: list reminders/schedules
  if (/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(text)) {
    return { tool: 'list_schedules', args: {} };
  }

  return null;
}

/**
 * Tier 2: intent is clear from message, but params need context resolution.
 * Extracts params from recent conversation text (regex, no LLM cost).
 * Returns {tool, args} if resolvable, or null to fall through to full agent.
 */
export function detectTierTwoOp(text: string, recentConversationText: string): DeterministicOp | null {
  // drive_delete_file: delete intent but no URL in message — look for URL in recent context
  if (/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(text)) {
    const urlInContext = recentConversationText.match(
      /https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/
    );
    if (urlInContext) {
      return { tool: 'drive_delete_file', args: { url_or_id: urlInContext[0].replace(/[.,;)]$/, '') } };
    }
  }

  // drive_organise: move/rename intent + URL in context + destination in message
  if (/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(text)) {
    const urlInContext = recentConversationText.match(
      /https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/
    );
    if (urlInContext) {
      const args: Record<string, unknown> = { url_or_id: urlInContext[0].replace(/[.,;)]$/, '') };
      const folderMatch = text.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i);
      const renameMatch = text.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);
      if (folderMatch) args.folder_name = folderMatch[1].trim();
      if (renameMatch) args.new_name = renameMatch[1].trim();
      if (args.folder_name || args.new_name) {
        return { tool: 'drive_organise', args };
      }
    }
  }

  return null;
}

// === Conversation Prompt Builder ===

export function buildSubAgentPrompt(
  agent: AgentType,
  user: UserRecord,
  memoryContext: string,
  timezone: string,
  currentDateTime: string,
  channel?: string
): string {
  const name = (user as any).assistant_name || 'Karna';
  const personality = user.personality_prompt 
    ? `\n## Personality\n${user.personality_prompt.substring(0, 2000)}\n`
    : '';

  const memoryBlock = memoryContext
    ? `\n## Active Memory (ALWAYS consult before responding)\n${memoryContext}\n`
    : '';

  // Extract just the date for sheet operations (e.g., "8 Mar 2026")
  let todayShortDate = '';
  try {
    const now = new Date();
    todayShortDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: user.timezone,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(now);
  } catch { todayShortDate = ''; }

  const userBlock = `\n## Current User\n- **Name**: ${user.name}\n- **Timezone**: ${user.timezone}\n- **Time**: ${currentDateTime}\n- **Today's date for sheets**: ${todayShortDate}\n`;

  switch (agent) {
    case 'conversation':
      return `You are ${name} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${userBlock}${personality}${memoryBlock}

## Your Job
Engage in natural conversation. You handle:
- Greetings and casual chat
- Opinions and creative discussion
- Questions that don't require tools (general knowledge)
- Emotional support and thoughtful responses

### Rules
- Be yourself — use your personality
- Reference memory when relevant (user's preferences, past conversations)
- **IMPORTANT**: If the user's message implies they want a tool action, redirect proactively:
  - "My package hasn't arrived" → "I can check the tracking status. Do you have a tracking number, or should I search your memory/Gmail for it?"
  - "I need to budget" → "I can set up a budget spreadsheet for you. Want me to create one?"
  - "That meeting tomorrow..." → "Want me to check your calendar for tomorrow's events?"
  - "I wonder what the news is" → "I can search for that — any specific topic?"
- Keep it natural and concise
- Time-aware: reference current date/time when relevant
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;

    default:
      return ''; // multi → uses full system prompt from buildSystemPrompt

  }
}
