// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord, MemoryRecord } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation, logError } from './llm/provider';

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
- You are a cloud-based personal assistant with memory, scheduling capabilities, and (soon) access to email, calendar, and documents.
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
- Keep responses concise but not terse. Be human.
- Format responses in clean text. Use markdown sparingly — only for lists and emphasis.
- When showing schedules or structured data, respond naturally first, then the data follows.

## Tool Usage
- You have tools available. Use them when the conversation naturally calls for it.
- Don't announce tool usage — just do it and present the result naturally.
- If a tool call fails, explain what happened simply and suggest alternatives.

## Current Date & Time
${new Date().toISOString()} (${user.timezone})`;

  return basePrompt;
}

// Execute tool calls
async function executeTool(
  toolName: string,
  args: Record<string, unknown>,
  db: D1Database,
  userId: number
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
  rotation?: ProviderRotation
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
            const result = await executeTool(toolCall.name, toolCall.arguments, db, user.id);
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
