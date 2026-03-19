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
  // "[action]. Task" or "[action] as a task" — user explicitly wants it stored, not executed
  { pattern: /[.!]\s*[Tt]ask\s*$/, weight: 0.95 },
  { pattern: /\bas\s+a\s+task\s*$/i, weight: 0.95 },
  { pattern: /^[Tt]ask:\s*/, weight: 0.95 },
  { pattern: /\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i, weight: 0.9 },
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

  // Memory context: if user has a sheet and message could reference it → full agent
  if (memoryContext && /spreadsheet|sheet|google\s*sheet/i.test(memoryContext)) {
    if (/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(text)) {
      return { agent: 'multi', confidence: 0.85, reasoning: 'Memory context — full agent' };
    }
  }

  // No keyword match → pure conversation
  return { agent: 'conversation', confidence: 0.8, reasoning: 'No tool-triggering keywords — general conversation' };
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
- Time-aware: reference current date/time when relevant`;

    default:
      return ''; // multi → uses full system prompt from buildSystemPrompt

  }
}
