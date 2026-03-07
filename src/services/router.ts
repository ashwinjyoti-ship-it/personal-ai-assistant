// Sub-Agent Router — Intent Classification & Agent Dispatch
// Classifies user intent → selects focused sub-agent → returns result
// Sub-agents have smaller prompts and only their relevant tools
// Falls back to full monolithic agent if classification fails

import type { LLMProvider, LLMMessage, LLMTool, UserRecord } from '../types';

// === Agent Types ===
export type AgentType = 
  | 'scheduler'     // Schedules, reminders, timers
  | 'workspace'     // Google Sheets, Docs, Drive, Calendar, Gmail
  | 'research'      // Web search, URL reading, deep research
  | 'memory'        // Store/recall memory, system status
  | 'conversation'  // General chat, creative, personality
  | 'multi'         // Multi-intent — needs full agent (fallback)
  ;

export interface RouteResult {
  agent: AgentType;
  confidence: number; // 0-1
  reasoning: string;
}

// === Fast Intent Classifier ===
// Uses keyword heuristics FIRST (zero LLM cost), falls back to LLM only when ambiguous
// Returns agent type in <5ms for 80% of queries

const KEYWORD_RULES: { pattern: RegExp; agent: AgentType; weight: number }[] = [
  // Scheduler — high confidence triggers
  { pattern: /\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i, agent: 'scheduler', weight: 0.9 },
  { pattern: /\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i, agent: 'scheduler', weight: 0.9 },
  // "tell me in X", "notify me in X", "alert me in X" — natural scheduling language
  { pattern: /\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i, agent: 'scheduler', weight: 0.9 },
  // "notify me at 3pm", "tell me at 9:30", "alert me at 5" — absolute time with verb
  { pattern: /\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i, agent: 'scheduler', weight: 0.9 },
  // "in X minutes/hours" as standalone time reference (strong scheduling intent)
  { pattern: /\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i, agent: 'scheduler', weight: 0.85 },
  // Deferred action patterns: "check X in 48 hours", "after 2 days check Y"
  { pattern: /\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i, agent: 'scheduler', weight: 0.9 },
  { pattern: /\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i, agent: 'scheduler', weight: 0.9 },
  { pattern: /\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i, agent: 'scheduler', weight: 0.9 },
  
  // Workspace — Google services
  { pattern: /\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i, agent: 'workspace', weight: 0.85 },
  { pattern: /\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i, agent: 'workspace', weight: 0.9 },
  // Gmail-specific patterns that were previously missed
  { pattern: /\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i, agent: 'workspace', weight: 0.95 },
  // Calendar queries that don't say "calendar" explicitly
  { pattern: /\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i, agent: 'workspace', weight: 0.85 },
  // Short expense patterns like "uber 700", "groceries 1200"
  { pattern: /^\s*\w+\s+\d{2,}\s*$/i, agent: 'workspace', weight: 0.7 },
  
  // Research — web queries
  { pattern: /\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i, agent: 'research', weight: 0.8 },
  { pattern: /\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i, agent: 'research', weight: 0.75 },
  { pattern: /\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i, agent: 'research', weight: 0.8 },
  // Current events / news-adjacent questions that need web search
  { pattern: /\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i, agent: 'research', weight: 0.8 },
  { pattern: /\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i, agent: 'research', weight: 0.75 },
  // Delivery / order tracking — needs web search
  { pattern: /\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i, agent: 'research', weight: 0.85 },
  { pattern: /\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i, agent: 'research', weight: 0.85 },
  // How-to / learning queries
  { pattern: /\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i, agent: 'research', weight: 0.7 },
  
  // Memory — store/recall
  { pattern: /\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i, agent: 'memory', weight: 0.9 },
  { pattern: /\b(search\s+memory|check\s+memory|in\s+your\s+memory)\b/i, agent: 'memory', weight: 0.9 },
];

// Conversation is the default when nothing matches — no explicit patterns needed

export function classifyIntentFast(text: string, memoryContext?: string): RouteResult {
  // Check all keyword rules
  let bestMatch: { agent: AgentType; weight: number } | null = null;
  const matchedAgents = new Set<AgentType>();

  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(text)) {
      matchedAgents.add(rule.agent);
      if (!bestMatch || rule.weight > bestMatch.weight) {
        bestMatch = { agent: rule.agent, weight: rule.weight };
      }
    }
  }

  // If memory mentions a sheet/doc reference and the query could be about data, boost workspace
  if (memoryContext && /spreadsheet|sheet|google\s*sheet/i.test(memoryContext)) {
    if (/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(text)) {
      matchedAgents.add('workspace');
      if (!bestMatch || bestMatch.agent !== 'workspace') {
        bestMatch = { agent: 'workspace', weight: 0.85 };
      }
    }
  }

  // Multi-intent detection: if 2+ different agent types matched
  if (matchedAgents.size >= 2) {
    // Check if it's truly multi-intent (e.g., "research X and save to doc")
    // In that case, workspace usually subsumes research because the final action is workspace
    if (matchedAgents.has('workspace') && matchedAgents.has('research')) {
      // "research X and save to doc" → workspace (it can chain tools)
      return { agent: 'workspace', confidence: 0.7, reasoning: 'Multi-intent: workspace+research merged' };
    }
    // Scheduler + research: "check delivery in 48 hrs" → scheduler (it creates the schedule, cron runs research later)
    if (matchedAgents.has('scheduler') && matchedAgents.has('research')) {
      return { agent: 'scheduler', confidence: 0.85, reasoning: 'Multi-intent: scheduler+research — schedule a research task' };
    }
    // Scheduler + workspace: "remind me to check email at 5pm" → scheduler
    if (matchedAgents.has('scheduler') && matchedAgents.has('workspace')) {
      return { agent: 'scheduler', confidence: 0.85, reasoning: 'Multi-intent: scheduler+workspace — schedule a workspace check' };
    }
    if (matchedAgents.has('memory') && matchedAgents.size === 2) {
      // Memory + something else → the something else usually needs memory as context
      const other = [...matchedAgents].find(a => a !== 'memory');
      return { agent: other || 'conversation', confidence: 0.7, reasoning: 'Multi-intent: memory is context for other agent' };
    }
    // True multi-intent — fallback to full agent
    return { agent: 'multi', confidence: 0.5, reasoning: `Multiple intents detected: ${[...matchedAgents].join(', ')}` };
  }

  // Single match
  if (bestMatch) {
    return { agent: bestMatch.agent, confidence: bestMatch.weight, reasoning: `Keyword match: ${bestMatch.agent}` };
  }

  // No match — pure conversation
  return { agent: 'conversation', confidence: 0.8, reasoning: 'No tool-triggering keywords — general conversation' };
}

// === LLM-based Intent Classifier (fallback for ambiguous cases) ===
// Used when fast classifier returns low confidence (<0.6) or 'multi'
export async function classifyIntentLLM(
  text: string,
  recentContext: string[],
  provider: LLMProvider
): Promise<RouteResult> {
  const classifierPrompt = `You are an intent classifier. Given a user message, classify it into exactly ONE category.

Categories:
- scheduler: Scheduling, reminders, timers, recurring tasks, alarms, deferred checks ("check X in 48 hours")
- workspace: Google Sheets/Docs/Drive/Calendar/Gmail operations, email, budget tracking, expense logging, event queries from sheets, calendar queries ("do I have anything tomorrow")
- research: Web search, reading URLs, fact-checking, news, comparisons, YouTube, places, directions, translations, delivery/order tracking
- memory: Storing/recalling information, checking what's remembered, system status
- conversation: General chat, greetings, creative writing, opinions, questions that don't need tools
- multi: Request clearly needs 2+ categories simultaneously (rare — only if actions can't be chained)

Recent conversation context (last 3 messages):
${recentContext.slice(-3).join('\n')}

Respond with ONLY a JSON object: {"agent": "category", "confidence": 0.0-1.0, "reasoning": "brief explanation"}`;

  try {
    const response = await provider.chat([
      { role: 'system', content: classifierPrompt },
      { role: 'user', content: text },
    ], { temperature: 0, maxTokens: 100 });

    const parsed = JSON.parse(response.content.replace(/```json?\n?|\n?```/g, '').trim());
    return {
      agent: parsed.agent as AgentType,
      confidence: Math.min(1, Math.max(0, parsed.confidence || 0.7)),
      reasoning: parsed.reasoning || 'LLM classification',
    };
  } catch {
    // If LLM classifier fails, default to full agent
    return { agent: 'multi', confidence: 0.5, reasoning: 'LLM classifier failed — using full agent' };
  }
}

// === Sub-Agent Tool Sets ===
// Each sub-agent only sees its relevant tools — reduces prompt bloat and confusion

export function getToolsForAgent(agent: AgentType, allTools: LLMTool[]): LLMTool[] {
  const toolNames = AGENT_TOOL_NAMES[agent];
  if (!toolNames) return allTools; // 'multi' or unknown → full tool set
  return allTools.filter(t => toolNames.includes(t.name));
}

const AGENT_TOOL_NAMES: Record<string, string[]> = {
  scheduler: [
    'create_schedule', 'list_schedules', 'toggle_schedule',
    'update_schedule_state', 'delete_schedule',
    'store_memory', 'search_memory', // needs memory for tracking numbers, patterns, context
  ],
  workspace: [
    'read_sheet', 'write_sheet', 'append_sheet', 'create_sheet',
    'list_calendar_events', 'create_calendar_event',
    'create_doc', 'read_doc', 'append_to_doc',
    'gmail_list', 'gmail_read', 'gmail_search', 'gmail_send', 'gmail_draft',
    'gmail_unread_count', 'gmail_modify',
    'drive_list', 'drive_search',
    'store_memory', 'search_memory', // workspace often needs memory for sheet IDs
    'web_search', 'read_url', 'research', // workspace may need to research before writing
  ],
  research: [
    'web_search', 'read_url', 'research',
    'search_places', 'get_place_details', 'get_directions',
    'get_travel_time', 'translate_text', 'search_youtube',
    'geocode_address',
    'store_memory', 'search_memory', // may want to save/lookup research context (tracking numbers, etc.)
    'create_doc', 'append_to_doc', // often asked to "research X and save to doc"
  ],
  memory: [
    'store_memory', 'search_memory', 'get_system_status',
  ],
  conversation: [], // No tools — pure chat
};

// === Sub-Agent System Prompts ===
// Focused, shorter prompts that only cover the sub-agent's domain
// CRITICAL: Each prompt MUST include the NON-NEGOTIABLE tool-calling rule

export function buildSubAgentPrompt(
  agent: AgentType,
  user: UserRecord,
  memoryContext: string,
  timezone: string,
  currentDateTime: string
): string {
  const name = (user as any).assistant_name || 'Karna';
  const personality = user.personality_prompt 
    ? `\n## Personality\n${user.personality_prompt.substring(0, 2000)}\n`
    : '';

  const memoryBlock = memoryContext
    ? `\n## Active Memory (ALWAYS consult before responding)\n${memoryContext}\n`
    : '';

  const userBlock = `\n## Current User\n- **Name**: ${user.name}\n- **Timezone**: ${user.timezone}\n- **Time**: ${currentDateTime}\n`;

  switch (agent) {
    case 'scheduler':
      return `You are ${name}, managing schedules and reminders for the user.

${userBlock}${personality}${memoryBlock}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "I'll set that up" without calling create_schedule in the same turn.
2. **Check memory first** using search_memory if the user references something stored (tracking numbers, recurring patterns, document IDs).
3. **Write machine-executable action_descriptions.** When creating schedules for tasks that need tool execution (delivery tracking, email checks, sheet checks), the action_description MUST be a complete instruction that another agent can execute autonomously. Examples:
   - BAD: "Check delivery status" (too vague for autonomous execution)
   - GOOD: "Use web_search to check delivery status for DTDC tracking number N12345678. Search 'DTDC tracking N12345678 delivery status'. Report current status and expected delivery date."
   - BAD: "Check mail" (no context)
   - GOOD: "Use gmail_search to find recent emails from 'kava@vendor.com' or containing 'KAVA order'. Report sender, subject, and any shipping/delivery updates."

## Your Job
Create, list, modify, and delete scheduled tasks. You handle:
- **Simple reminders**: "Remind me to drink water" → action_type 'reminder' (just sends a text notification — NO tools are run when it fires)
- **Smart reminders**: "Remind me about NCPA crew schedule" or "Remind me to check delivery" → action_type 'custom' (runs an agent with tools when it fires). Use this when the reminder implies the system should DO something (check, search, read, look up, verify, fetch, find).
- **Deferred checks**: "Check delivery in 48 hrs" → action_type 'custom', schedule_type 'once', and a DETAILED action_description
- **Recurring checks**: "Check my email every 2 hours" → action_type 'check_mail', interval
- **One-time alerts**: "Alert me on March 15 at 3pm" → action_type depends on whether it's a passive nudge or an active task
- **Management**: List, enable/disable, pause, complete, or delete schedules

### CRITICAL: action_type determines what happens when the schedule fires
- **'reminder'**: System sends the description text as a notification. NO agent runs. NO tools are called. Use ONLY for passive nudges ("drink water", "take a break", "call mom").
- **'custom'**: System runs a full agent with tools. Use when the task requires checking, searching, reading, or any action. The action_description MUST contain complete instructions for autonomous execution.
- **'check_mail'**: System runs an agent that checks Gmail.
- **'check_calendar'**: System runs an agent that checks Calendar.
- **'check_sheet'**: System runs an agent that reads a spreadsheet.

**NEVER promise to "check" or "look up" something in a reminder.** If the user wants something checked, use action_type 'custom' with a detailed action_description.
**Do NOT say "I'll check your spreadsheet when the reminder fires" if action_type is 'reminder' — that's a lie.**

### Schedule Types
- **interval**: Repeats every N minutes. schedule_value = "30" (minutes). Use for RECURRING tasks: "check mail every 2 hours" → interval 120.
- **daily**: At a specific time every day. schedule_value = "09:00" (24h format, user's timezone)
- **weekly**: Day + time every week. schedule_value = "Friday 17:00"
- **once**: Fire once at a specific date/time. schedule_value = "2026-03-15 14:30" (user's timezone).

### CRITICAL: Use minutes_from_now for relative-time requests
When the user says "in 5 minutes", "in 2 hours", "after 30 min", "in half an hour":
- Set schedule_type: "once"
- Set minutes_from_now: (number of minutes) — the SERVER computes the exact time
- Do NOT calculate or guess the target time yourself
- Examples: "in 5 minutes" → minutes_from_now: 5, "in 2 hours" → minutes_from_now: 120, "in 45 min" → minutes_from_now: 45
- You do NOT need to provide schedule_value when using minutes_from_now

When the user says "at 3pm", "tomorrow at 9am", "on March 15 at 2:30pm":
→ Use schedule_type "once" or "daily" with schedule_value (absolute time).

### Deferred Research Pattern
When the user asks to check something later (delivery status, news, price, etc.):
1. First: search_memory for relevant context (tracking number, order details, etc.)
2. Then: create_schedule with action_type 'custom' and a DETAILED action_description
3. The description must contain: which tool to use, exact search query, what to look for, what to report

### Rules
- Always confirm what you created: name, type, time, action
- If user says "stop" or "done" for a reminder, use update_schedule_state → completed
- Convert user's timezone to schedule correctly
- Be concise — confirm the schedule and move on`;

    case 'workspace':
      return `You are ${name}, handling Google Workspace operations for the user.

${userBlock}${personality}${memoryBlock}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "Let me check" or "I'll look into that" as a standalone response. Call the tool FIRST, then respond with results.
2. **If the user asks to check Gmail, call gmail_list or gmail_search RIGHT NOW.** Do NOT respond with text saying you will check — just do it.
3. **Check memory FIRST** for sheet/doc IDs — never ask user for IDs you already know.
4. **If Google not connected or token expired**: tell user "Your Google connection has expired. Please reconnect in Settings → Keys → Google Workspace."

## Your Job
Manage Google Sheets, Docs, Drive, Calendar, and Gmail.

### Sheets
- **read_sheet**: Read data. Use plain range "A1:Z500". Response includes ALL tab names.
- **write_sheet / append_sheet**: Write data. Supports formulas (=SUM, =SUMIF, etc.)
- **create_sheet**: Create new spreadsheet with optional tabs and folder placement.
- Multi-tab: Read first tab to discover all tabs, then read the correct one.

### Docs & Drive
- **create_doc / read_doc / append_to_doc**: Full document management.
- **drive_list / drive_search**: Find files.
- Auto-remember created docs/sheets (store_memory with ID + URL, importance 7).

### Calendar
- **list_calendar_events**: Check schedule. Default: next 7 days.
- **create_calendar_event**: Create events with attendees.
- "Do I have anything tomorrow" → list_calendar_events with days_ahead: 1

### Gmail
- **gmail_list / gmail_read / gmail_search**: Read and search mail.
- **gmail_send / gmail_draft**: Compose. Prefer drafts for safety.
- **gmail_modify**: Archive, trash, star, mark read/unread.

### Disambiguation — Confirm When Unsure, Learn, Never Ask Again
| User says | Memory has | Confidence | Action |
|-----------|-----------|------------|--------|
| "Uber 700" | Budget sheet + pattern | HIGH | Append directly |
| "Uber 700" | Budget sheet, no pattern | MEDIUM | Append, tell user |
| "Uber 700" | No budget sheet | LOW | Ask: "Add as expense?" |
| "Check mail" | Only Gmail connected | HIGH | Check Gmail |
| "Add to my doc" | One doc in memory | HIGH | Append to that doc |
| "Add to my doc" | Multiple docs | LOW | Ask which one |

**Learn-and-never-ask-again**: When user confirms an ambiguous action, IMMEDIATELY store the pattern using store_memory (type: "preference", importance: 8). Next time, just do it.

### Rules
- Chain actions: "research X and save to doc" → web_search then create_doc
- Be concise — show results, don't narrate process`;

    case 'research':
      return `You are ${name}, handling information retrieval for the user.

${userBlock}${personality}${memoryBlock}

## NON-NEGOTIABLE RULES
1. **ALWAYS call a search tool immediately.** Never respond with just "Let me look that up" — call web_search or research FIRST, then present the results.
2. **Default to web_search** unless user explicitly asks for deep research. It's faster and more reliable.
3. **Check memory first** using search_memory if the user references something stored (tracking numbers, order IDs, etc.). Use the context to craft a better search query.

## Your Job
Find information from the web, analyze it, and present clear answers.

### 3 Tiers
1. **web_search** (~1s) — Quick facts, news, prices, verification, tracking. DEFAULT choice.
2. **read_url** (~3-5s) — Read a specific page when user provides a URL or you need full article text.
3. **research** (~10-20s) — Deep analysis: "research X", "compare A vs B". WARNING: slow, may timeout.

### Delivery / Order Tracking
When asked to check delivery or order status:
1. search_memory for tracking number, courier name, order details
2. web_search with specific query: "[courier name] tracking [tracking number]"
3. If no tracking number in memory, ask user for it
4. Present: current status, location, expected delivery date

### Google APIs (require API key)
- **search_places / get_place_details**: Find businesses, venues. Returns ratings, hours, reviews.
- **get_directions / get_travel_time**: Navigation and distance.
- **translate_text**: 100+ languages. Auto-detects source.
- **search_youtube**: Videos, tutorials, reviews.
- **geocode_address**: Address <-> coordinates.

### Rules
- For "is this true/fake/real?" → web_search (fast fact-check)
- For "research X thoroughly" → research tool
- If asked to save findings: use create_doc or append_to_doc
- If asked to save to memory: use store_memory
- Cite sources when using research tool
- Be direct — answer first, details second`;

    case 'memory':
      return `You are ${name}, managing the user's memory and system status.

${userBlock}${personality}${memoryBlock}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** When user says "remember X", call store_memory RIGHT NOW.
2. **Deduplicate**: If updating existing info, use the same title — it updates in place.

## Your Job
Store and recall information the user wants to remember.

### Tools
- **store_memory**: Save facts, preferences, decisions, context. Parameters:
  - type: fact | preference | decision | context
  - title: Short key (e.g., "Budget Sheet ID", "DTDC Tracking Number", "Default Email")
  - content: The information
  - importance: 1-10. Use 7+ for working memory (always in prompt). Use 5- for long-term archive.
- **search_memory**: Find previously stored info by keyword.
- **get_system_status**: Active schedules, memory count, messages, errors.

### Learn-and-Never-Ask-Again Pattern
When the user confirms a pattern or preference:
1. Store it immediately with store_memory (type: "preference", importance: 8)
2. Use a descriptive title: "Expense Entry Pattern", "Default Email Account", "Budget Sheet ID"
3. Next time the pattern appears, apply it without asking

### Importance Guidelines
- **8-10**: Critical working memory — always visible. Sheet/doc IDs, active tracking numbers, confirmed patterns.
- **7**: Working memory — visible. Preferences, recurring context.
- **5-6**: Long-term — searched on demand. One-off facts, notes.
- **1-4**: Archive — rarely needed.

### Rules
- When user says "remember X" → store_memory with clear title and content
- When user asks "what do you know about X" → search_memory first, then list working memory if relevant
- Be concise — confirm what was stored/found`;

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
