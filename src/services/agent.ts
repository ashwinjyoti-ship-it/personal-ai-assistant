// Agent Runner — Assembles system prompt, manages tools, runs agentic loop
// Core intelligence layer following Cloudbot's Agent Runner pattern

import type { LLMProvider, LLMMessage, LLMTool, NormalizedMessage, UserRecord, CronJobRecord } from '../types';
import { MemoryService } from './memory';
import { ProviderRotation } from './llm/provider';

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
    description: 'List all scheduled tasks for the current user. Shows active and paused tasks.',
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
        importance: { type: 'number', description: 'Importance 1-10, default 5' },
      },
      required: ['type', 'title', 'content'],
    },
  },
  {
    name: 'search_memory',
    description: 'Search your memory for previously stored information about the user.',
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
    description: 'Get current system status including active schedules, memory stats, and health.',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];

// Build the system prompt with personality, memory, and tool instructions
function buildSystemPrompt(user: UserRecord, memoryContext: string): string {
  const assistantName = (user as any).assistant_name || 'Karna';
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

${user.personality_prompt ? `## Personality Instructions\n${user.personality_prompt}\n` : ''}

${memoryContext}

## How You Work
- When the user asks you to remind them or schedule something, use the create_schedule tool.
- When asked about your tasks or schedules, use list_schedules.
- When the user tells you something important about themselves, store it using store_memory.
- When you need context about the user, search your memory first.
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
        `INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
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

      return `Schedule created: "${args.name}" — ${args.schedule_type === 'interval' ? `every ${args.schedule_value} minutes` : `daily at ${args.schedule_value}`}. Next run: ${nextRun.toISOString()}`;
    }

    case 'list_schedules': {
      const result = await db.prepare(
        `SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC`
      ).bind(userId).all<CronJobRecord>();
      
      const jobs = result.results || [];
      if (jobs.length === 0) return 'No scheduled tasks found.';
      
      return jobs.map(j => 
        `[ID:${j.id}] ${j.enabled ? '▶' : '⏸'} "${j.name}" — ${j.schedule_type === 'interval' ? `every ${j.schedule_value} min` : `daily at ${j.schedule_value}`} — ${j.action_type} — next: ${j.next_run || 'N/A'}`
      ).join('\n');
    }

    case 'toggle_schedule': {
      const enabled = args.enabled ? 1 : 0;
      await db.prepare(
        `UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(enabled, args.job_id as number, userId).run();
      return `Schedule ${args.job_id} ${enabled ? 'enabled' : 'paused'}.`;
    }

    case 'delete_schedule': {
      await db.prepare(
        `DELETE FROM cron_jobs WHERE id = ? AND user_id = ?`
      ).bind(args.job_id as number, userId).run();
      return `Schedule ${args.job_id} deleted.`;
    }

    case 'store_memory': {
      await memory.store(
        userId,
        args.type as MemoryRecord['type'],
        args.title as string,
        args.content as string,
        (args.importance as number) || 5
      );
      return `Stored in memory: [${args.type}] ${args.title}`;
    }

    case 'search_memory': {
      const results = await memory.search(userId, args.query as string);
      if (results.length === 0) return 'No matching memories found.';
      return results.map(m => `[${m.type}] **${m.title}**: ${m.content}`).join('\n');
    }

    case 'get_system_status': {
      const jobCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1`
      ).bind(userId).first<{ cnt: number }>();
      
      const memCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?`
      ).bind(userId).first<{ cnt: number }>();
      
      const msgCount = await db.prepare(
        `SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?`
      ).bind(userId).first<{ cnt: number }>();
      
      const lastHeart = await db.prepare(
        `SELECT * FROM heartbeat_log ORDER BY created_at DESC LIMIT 1`
      ).first<{ status: string; created_at: string }>();

      return `System Status:
- Active schedules: ${jobCount?.cnt || 0}
- Memory entries: ${memCount?.cnt || 0}
- Total messages: ${msgCount?.cnt || 0}
- Last heartbeat: ${lastHeart?.status || 'N/A'} at ${lastHeart?.created_at || 'never'}`;
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

  // Build context
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
          const result = await executeTool(toolCall.name, toolCall.arguments, db, user.id);
          messages.push({ role: 'user', content: `[Tool Result for ${toolCall.name}]: ${result}` });
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
