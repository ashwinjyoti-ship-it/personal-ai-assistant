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
  
  // Workspace — Google services
  { pattern: /\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i, agent: 'workspace', weight: 0.85 },
  { pattern: /\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i, agent: 'workspace', weight: 0.9 },
  // Gmail-specific patterns that were previously missed
  { pattern: /\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i, agent: 'workspace', weight: 0.9 },
  { pattern: /\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i, agent: 'workspace', weight: 0.95 },
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
- scheduler: Scheduling, reminders, timers, recurring tasks, alarms
- workspace: Google Sheets/Docs/Drive/Calendar/Gmail operations, email, budget tracking, expense logging, event queries from sheets
- research: Web search, reading URLs, fact-checking, news, comparisons, YouTube, places, directions, translations
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
    'store_memory', // may need to remember schedule patterns
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
    'store_memory', // may want to save research findings
    'create_doc', 'append_to_doc', // often asked to "research X and save to doc"
  ],
  memory: [
    'store_memory', 'search_memory', 'get_system_status',
  ],
  conversation: [], // No tools — pure chat
};

// === Sub-Agent System Prompts ===
// Focused, shorter prompts that only cover the sub-agent's domain

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

## Your Job
Create, list, modify, and delete scheduled tasks. You handle:
- **Reminders**: "Remind me to..." → create_schedule with action_type 'reminder'
- **Recurring checks**: "Check my email every 2 hours" → create_schedule with action_type 'check_mail', interval
- **One-time alerts**: "Alert me on March 15 at 3pm" → create_schedule with schedule_type 'once'
- **Management**: List, enable/disable, pause, complete, or delete schedules

### Schedule Types
- **interval**: Every N minutes. schedule_value = "30" (minutes)
- **daily**: At a specific time. schedule_value = "09:00" (24h format, user's timezone)
- **weekly**: Day + time. schedule_value = "Friday 17:00"
- **once**: Specific date. schedule_value = "2026-03-15 14:30"

### Rules
- Always confirm what you created: name, type, time, action
- If user says "stop" or "done" for a reminder, use update_schedule_state → completed
- Convert user's timezone to schedule correctly
- Be concise — confirm the schedule and move on`;

    case 'workspace':
      return `You are ${name}, handling Google Workspace operations for the user.

${userBlock}${personality}${memoryBlock}

## Your Job
Manage Google Sheets, Docs, Drive, Calendar, and Gmail. You handle:

### Sheets
- **read_sheet**: Read data. Use plain range "A1:Z500". Response includes ALL tab names for multi-tab navigation.
- **write_sheet / append_sheet**: Write data. Supports formulas (=SUM, =SUMIF, etc.)
- **create_sheet**: Create new spreadsheet with optional tabs and folder placement.
- Multi-tab: If data spans tabs (e.g., monthly), read the first tab to discover all tabs, then read the correct one.

### Docs & Drive
- **create_doc / read_doc / append_to_doc**: Full document management.
- **drive_list / drive_search**: Find files.
- Auto-remember created docs/sheets (store_memory with ID + URL, importance 7).

### Calendar
- **list_calendar_events**: Check schedule. Default: next 7 days.
- **create_calendar_event**: Create events with attendees.

### Gmail
- **gmail_list / gmail_read / gmail_search**: Read and search mail.
- **gmail_send / gmail_draft**: Compose. Prefer drafts for safety.
- **gmail_modify**: Archive, trash, star, mark read/unread.

### Expense / Data Entry Patterns
When user sends short entries (e.g., "Uber 700", "Groceries 1200"):
- Check memory for an existing pattern (e.g., "expenses go to Monthly Budget sheet ID: xyz")
- If pattern exists: append_sheet directly (HIGH confidence)
- If no pattern: ask once, then store_memory to remember the pattern

### Rules
- **CRITICAL: ALWAYS call the appropriate tool immediately.** Never say "Let me check" or "I'll look into that" as a standalone response. Use the tool FIRST, then respond with the results.
- If the user asks to check Gmail, call gmail_list or gmail_search RIGHT NOW. Do NOT respond with text saying you will check — just do it.
- Check memory FIRST for sheet/doc IDs — never ask user for IDs you already know
- If a tool returns an error about Google connection expired, tell the user clearly: "Your Google connection has expired. Please reconnect in Settings → Keys → Google Workspace."
- If Google not connected: tell user to go to Settings → Keys → Google Workspace
- Chain actions: "research X and save to doc" → use research tool then create_doc
- Be concise — show results, don't narrate process`;

    case 'research':
      return `You are ${name}, handling information retrieval for the user.

${userBlock}${personality}${memoryBlock}

## Your Job
Find information from the web, analyze it, and present clear answers.

### 3 Tiers
1. **web_search** (~1s) — Quick facts, news, prices, verification. DEFAULT choice.
2. **read_url** (~3-5s) — Read a specific page when user provides a URL or you need full article text.
3. **research** (~10-20s) — Deep analysis: "research X", "compare A vs B". Reads 3-5 pages and synthesizes a report.

### Google APIs (require API key)
- **search_places / get_place_details**: Find businesses, restaurants, venues. Returns ratings, hours, reviews.
- **get_directions / get_travel_time**: Navigation and distance.
- **translate_text**: 100+ languages. Auto-detects source.
- **search_youtube**: Videos, tutorials, reviews.
- **geocode_address**: Address ↔ coordinates.

### Rules
- **CRITICAL: ALWAYS call a search tool immediately.** Never respond with just "Let me look that up" — call web_search or research tool FIRST, then present the results.
- **Default to web_search** unless user explicitly asks for deep research
- For "is this true/fake/real?" → web_search (fast fact-check)
- For "research X thoroughly" → research tool
- If asked to save findings: use create_doc or append_to_doc
- If asked to save to memory: use store_memory
- Cite sources when using research tool
- Be direct — answer first, details second`;

    case 'memory':
      return `You are ${name}, managing the user's memory and system status.

${userBlock}${personality}${memoryBlock}

## Your Job
Store and recall information the user wants to remember.

### Tools
- **store_memory**: Save facts, preferences, decisions, context. Parameters:
  - type: fact | preference | decision | context
  - title: Short key (e.g., "Budget Sheet ID", "Preferred Email")
  - content: The information
  - importance: 1-10. Use 7+ for working memory (always in prompt). Use 5- for long-term archive.
- **search_memory**: Find previously stored info by keyword.
- **get_system_status**: Active schedules, memory count, messages, errors.

### Rules
- Working memory (importance 7+): Always visible in every conversation. Use for sheet/doc IDs, preferences, patterns.
- Long-term memory (importance <7): Searched on demand. Use for one-off facts, notes.
- Deduplicate: If updating existing info, use the same title — it updates in place.
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
- If the user seems to want a tool action (search, sheet, schedule, etc.), suggest it: "Would you like me to search for that?" or "I can set a reminder for that — want me to?"
- Keep it natural and concise
- Time-aware: reference current date/time when relevant`;

    default:
      return ''; // multi → uses full system prompt from buildSystemPrompt
  }
}
