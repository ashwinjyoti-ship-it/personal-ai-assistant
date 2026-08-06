/**
 * Context panel — assemble named sources, char counts, secret scan, exact payload.
 */
import type { D1Database } from '@cloudflare/workers-types';
import { MemoryService } from './memory';
import { UI_VISIBLE_MESSAGE_CHANNEL_SQL } from './chat-ui-filter';

export type ContextSource = {
  id: string;
  label: string;
  detail: string;
  chars: number;
  included: boolean;
  text: string;
};

const SECRET_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: 'api_key', re: /\b(sk-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{20,}|ghp_[A-Za-z0-9]{30,})\b/g },
  { name: 'bearer', re: /\bBearer\s+[A-Za-z0-9._\-+/=]{20,}\b/gi },
  { name: 'password', re: /\b(password|passwd|pwd)\s*[:=]\s*\S+/gi },
  { name: 'private_key', re: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC )?PRIVATE KEY-----/g },
];

export function scanAndMask(text: string): { text: string; masked: string[] } {
  const masked: string[] = [];
  let out = text;
  for (const { name, re } of SECRET_PATTERNS) {
    out = out.replace(re, (match) => {
      const token = `[masked:${name}]`;
      if (!masked.includes(token)) masked.push(token);
      return token;
    });
  }
  return { text: out, masked };
}

export async function assembleContextSources(
  db: D1Database,
  userId: number,
  threadId: number,
): Promise<{ sources: ContextSource[]; exclude: string[] }> {
  const thread = await db.prepare(
    'SELECT context_exclude FROM threads WHERE id = ? AND user_id = ?'
  ).bind(threadId, userId).first<{ context_exclude: string }>();

  let exclude: string[] = [];
  try { exclude = JSON.parse(thread?.context_exclude || '[]'); } catch { exclude = []; }
  if (!Array.isArray(exclude)) exclude = [];

  const sources: ContextSource[] = [];

  const msgs = await db.prepare(
    `SELECT role, content FROM conversations
     WHERE user_id = ? AND thread_id = ? AND ${UI_VISIBLE_MESSAGE_CHANNEL_SQL}
     ORDER BY created_at ASC LIMIT 80`
  ).bind(userId, threadId).all<{ role: string; content: string }>();

  const historyLines = (msgs.results || []).map((m) => `${m.role}: ${m.content || ''}`);
  const historyText = historyLines.join('\n\n');
  sources.push({
    id: 'thread_history',
    label: 'Thread history',
    detail: `${historyLines.length} turns · ${historyText.length.toLocaleString()} ch`,
    chars: historyText.length,
    included: !exclude.includes('thread_history'),
    text: historyText,
  });

  try {
    const memory = new MemoryService(db);
    const facts = await memory.getWorkingMemory(userId);
    const memText = facts.map((f) => `- ${f.title}: ${f.content}`).join('\n');
    sources.push({
      id: 'memory',
      label: 'Memory',
      detail: facts.length ? `${facts.length} facts · ${memText.length.toLocaleString()} ch` : 'not included',
      chars: memText.length,
      included: !exclude.includes('memory') && facts.length > 0,
      text: memText,
    });
  } catch {
    sources.push({
      id: 'memory',
      label: 'Memory',
      detail: 'unavailable',
      chars: 0,
      included: false,
      text: '',
    });
  }

  // Lightweight placeholders — full Gmail/Drive/Calendar bodies arrive via tools;
  // expose presence from recent tool metadata in this thread.
  const toolMeta = await db.prepare(
    `SELECT metadata FROM conversations
     WHERE user_id = ? AND thread_id = ? AND role = 'assistant'
     ORDER BY created_at DESC LIMIT 20`
  ).bind(userId, threadId).all<{ metadata: string }>();

  const toolNames = new Set<string>();
  for (const row of toolMeta.results || []) {
    try {
      const meta = JSON.parse(row.metadata || '{}');
      for (const t of meta.tools || []) toolNames.add(t);
    } catch { /* */ }
  }

  const gmailUsed = [...toolNames].some((t) => t.startsWith('gmail_'));
  sources.push({
    id: 'gmail',
    label: 'Gmail (from this thread)',
    detail: gmailUsed ? 'tool results already in history' : 'not included',
    chars: 0,
    included: gmailUsed && !exclude.includes('gmail'),
    text: gmailUsed ? '(Gmail tool results are part of thread history above.)' : '',
  });

  const driveUsed = [...toolNames].some((t) => t.startsWith('drive_') || t.includes('doc'));
  sources.push({
    id: 'drive',
    label: 'Drive / Docs',
    detail: driveUsed ? 'tool results already in history' : 'not included',
    chars: 0,
    included: driveUsed && !exclude.includes('drive'),
    text: driveUsed ? '(Drive/Docs tool results are part of thread history above.)' : '',
  });

  return { sources, exclude };
}

export function buildPayload(sources: ContextSource[], include: string[]): {
  payload: string;
  chars: number;
  masked: string[];
  used: string[];
} {
  const includeSet = new Set(include);
  const parts: string[] = [];
  const used: string[] = [];
  for (const s of sources) {
    if (!includeSet.has(s.id)) continue;
    if (!s.text) continue;
    used.push(s.id);
    parts.push(`## ${s.label}\n${s.text}`);
  }
  const joined = parts.join('\n\n---\n\n');
  const { text, masked } = scanAndMask(joined);
  return { payload: text, chars: text.length, masked, used };
}

export async function saveContextExclude(
  db: D1Database,
  userId: number,
  threadId: number,
  exclude: string[],
): Promise<void> {
  await db.prepare(
    `UPDATE threads SET context_exclude = ? WHERE id = ? AND user_id = ?`
  ).bind(JSON.stringify(exclude), threadId, userId).run();
}
