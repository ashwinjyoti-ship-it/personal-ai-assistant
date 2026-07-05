import type { LLMTool, UserRecord } from '../../types';
import { buildSystemPrompt, filterAgentTools } from '../agent';
import { MemoryService } from '../memory';
import { getAutoSkillsContext } from '../skills';
import type { VoiceMode } from './allowlist';
import { getAllowedToolNames, VOICE_REASONING_BY_MODE } from './allowlist';
import type { OpenAiVoiceConfig } from './resolve-openai-voice';

async function fetchPreferencesContext(db: D1Database, userId: number): Promise<string> {
  try {
    const result = await db
      .prepare('SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC')
      .bind(userId)
      .all<{ content: string }>();
    const rows = result.results || [];
    if (rows.length === 0) return '';
    return rows.map((r) => `- ${r.content}`).join('\n');
  } catch {
    return '';
  }
}

async function buildNotesContext(db: D1Database, userId: number): Promise<string> {
  try {
    const result = await db
      .prepare(
        `SELECT title, content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 8`,
      )
      .bind(userId)
      .all<{ title: string; content: string }>();
    const rows = result.results || [];
    if (rows.length === 0) return '';
    return rows.map((n) => `- **${n.title}**: ${n.content.slice(0, 200)}`).join('\n');
  } catch {
    return '';
  }
}

// Recent turns of THIS thread — a Realtime session only gets a static
// `instructions` string at mint time, so a reconnect (session timeout, dropped
// WebRTC, phone lock) that mints a fresh session otherwise starts with no idea
// what was just discussed (e.g. a research request made moments earlier in
// the same thread, including via text chat). Mirrors the recent-conversation
// context the text agent gets from getRecentConversations.
async function buildRecentThreadContext(db: D1Database, userId: number, threadId: number): Promise<string> {
  try {
    const memory = new MemoryService(db);
    const recent = await memory.getRecentConversations(userId, 20, threadId);
    if (recent.length === 0) return '';
    return recent
      .map((m) => `${m.role === 'user' ? 'User' : 'You'}: ${m.content.slice(0, 500)}`)
      .join('\n');
  } catch {
    return '';
  }
}

export function toRealtimeTools(tools: LLMTool[]): Array<{
  type: 'function';
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}> {
  return tools.map((t) => ({
    type: 'function' as const,
    name: t.name,
    description: t.description,
    parameters: t.parameters,
  }));
}

export async function buildVoiceInstructions(
  db: D1Database,
  user: UserRecord,
  threadId?: number,
): Promise<string> {
  const memory = new MemoryService(db);
  const [memoryContext, notesContext, preferencesContext, autoSkillsContext, recentThreadContext] = await Promise.all([
    memory.buildContext(user.id),
    buildNotesContext(db, user.id),
    fetchPreferencesContext(db, user.id),
    getAutoSkillsContext(db, user.id),
    threadId ? buildRecentThreadContext(db, user.id, threadId) : Promise.resolve(''),
  ]);
  const base = buildSystemPrompt(user, memoryContext, 'voice', preferencesContext, autoSkillsContext, notesContext);
  if (!recentThreadContext.trim()) return base;
  return `${base}\n\n## Recent Conversation In This Thread\nThis is what was already said in this conversation, including anything asked via text chat (e.g. a research request you or the user started). If the user asks about it, you already know this — don't say you don't remember.\n${recentThreadContext}\n`;
}

export interface VoiceSessionRecord {
  sessionId: string;
  userId: number;
  threadId: number;
  mode: VoiceMode;
  allowedTools: Set<string>;
  phase: 'read' | 'full';
  desktop: boolean;
  activeBrowserTaskId: string | null;
  createdAt: number;
  expiresAt: number;
}

const sessions = new Map<string, VoiceSessionRecord>();

export function getVoiceSession(sessionId: string): VoiceSessionRecord | undefined {
  const rec = sessions.get(sessionId);
  if (!rec) return undefined;
  if (Date.now() > rec.expiresAt) {
    sessions.delete(sessionId);
    return undefined;
  }
  return rec;
}

export function endVoiceSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export interface MintVoiceSessionResult {
  sessionId: string;
  clientSecret: string;
  expiresAt: number;
  model: string;
  tools: ReturnType<typeof toRealtimeTools>;
  mode: VoiceMode;
}

export function setVoiceBrowserTask(sessionId: string, taskId: string | null): void {
  const rec = sessions.get(sessionId);
  if (rec) rec.activeBrowserTaskId = taskId;
}

export function getVoiceBrowserTask(sessionId: string): string | null {
  return sessions.get(sessionId)?.activeBrowserTaskId ?? null;
}

export async function mintVoiceSession(
  db: D1Database,
  user: UserRecord,
  voiceConfig: OpenAiVoiceConfig,
  options: { threadId: number; mode: VoiceMode; phase?: 'read' | 'full'; desktop?: boolean },
): Promise<MintVoiceSessionResult> {
  const phase = options.phase ?? 'read';
  const desktop = options.desktop ?? false;
  const allowed = getAllowedToolNames(options.mode, phase, desktop);
  const tools = filterAgentTools(allowed);
  const instructions = await buildVoiceInstructions(db, user, options.threadId);
  const reasoningEffort = VOICE_REASONING_BY_MODE[options.mode];

  const sessionBody = {
    session: {
      type: 'realtime',
      model: voiceConfig.model,
      instructions,
      tools: toRealtimeTools(tools),
      tool_choice: 'auto',
      audio: {
        input: {
          transcription: { model: 'gpt-4o-mini-transcribe', language: 'en' },
          turn_detection: {
            type: 'server_vad',
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 700,
            create_response: true,
            interrupt_response: true,
          },
        },
        output: {
          voice: 'marin',
        },
      },
      reasoning: { effort: reasoningEffort },
    },
  };

  const res = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${voiceConfig.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionBody),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI Realtime session failed (${res.status}): ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    value?: string;
    client_secret?: { value?: string; expires_at?: number };
    expires_at?: number;
  };

  const clientSecret = data.value ?? data.client_secret?.value;
  if (!clientSecret) {
    throw new Error('OpenAI Realtime session returned no client secret');
  }

  const expiresAt =
    data.expires_at ??
    data.client_secret?.expires_at ??
    Math.floor(Date.now() / 1000) + 60;

  const sessionId = crypto.randomUUID();
  const expiresMs = typeof expiresAt === 'number' && expiresAt > 1e12 ? expiresAt : expiresAt * 1000;

  sessions.set(sessionId, {
    sessionId,
    userId: user.id,
    threadId: options.threadId,
    mode: options.mode,
    allowedTools: allowed,
    phase,
    desktop,
    activeBrowserTaskId: null,
    createdAt: Date.now(),
    expiresAt: expiresMs,
  });

  return {
    sessionId,
    clientSecret,
    expiresAt: expiresMs,
    model: voiceConfig.model,
    tools: toRealtimeTools(tools),
    mode: options.mode,
  };
}
