// Signal extraction — pure functions, no DB access.
// Extracts structured signal records from raw conversation text via regex + heuristics.

import type { Signal, SignalIntent } from '../types';

export function classifyIntent(text: string): SignalIntent {
  const t = text.trim();

  if (/\b(call|invoke|execute|run)\s+\w+[\s(]/.test(t) || t.startsWith('> ') || /\$\w+/.test(t)) {
    return 'tool_call';
  }
  // Greetings checked before '?' so "Hi, how are you?" is a greeting
  if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))\b/i.test(t)) {
    return 'greeting';
  }
  if (t.endsWith('?')) return 'question';
  if (/^(do|make|run|build|create|delete|update|fix|check|show|list|get|find|search|tell|explain|write|call|send)\s/i.test(t)) {
    return 'command';
  }
  // Allow comma/punctuation after the trigger word (e.g. "Wait, I meant...")
  if (/^(wait|actually|oh|i mean|sorry|nevermind|ignore|forget|let me|i'll|i am|i'm)[,\s]/i.test(t)) {
    return 'meta';
  }
  if (/\b(I think|I believe|it seems|maybe|perhaps|I wonder)/i.test(t)) {
    return 'reflection';
  }
  return 'statement';
}

export function extractEntities(text: string): string[] {
  const entities = new Set<string>();

  // CamelCase identifiers
  for (const m of text.match(/[a-z]+[A-Z][a-zA-Z]*/g) ?? []) entities.add(m);

  // SCREAMING_SNAKE
  for (const m of text.match(/[A-Z][a-z0-9_]+[A-Z]|[A-Z_]{2,}/g) ?? []) entities.add(m);

  // Namespaced identifiers
  for (const m of text.match(/\b[\w.]+::\w+|\b\w+\.\w+\b/g) ?? []) entities.add(m);

  // Capitalized proper nouns / project names
  const stopWords = new Set(['The', 'This', 'That', 'These', 'Those', 'When', 'Then', 'Also', 'Some', 'More']);
  for (const m of text.match(/\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})*\b/g) ?? []) {
    if (!stopWords.has(m)) entities.add(m);
  }

  // Quoted strings
  for (const m of text.match(/"([^"]{2,50})"|'([^']{2,50})'/g) ?? []) {
    entities.add(m.slice(1, -1));
  }

  // Hashtags and @mentions
  for (const m of text.match(/#[a-zA-Z]\w*|@[a-zA-Z]\w*/g) ?? []) entities.add(m);

  // Version numbers
  for (const m of text.match(/\bv?\d+\.\d+(?:\.\d+)?|\b\d+\.\d+\.\d+\.\d+\b/g) ?? []) entities.add(m);

  // File paths (simple heuristic: /word/word or word/word.ext)
  for (const m of text.match(/\/\w+(?:\/\w+)+(?:\.\w+)?|\w+\/\w+\.\w+/g) ?? []) entities.add(m);

  return Array.from(entities).slice(0, 20);
}

export function extractTopic(text: string): string {
  const cleaned = text
    .trim()
    .replace(/^(hi|hello|hey|so |okay |ok |um |uh |well )+/i, '')
    .replace(/[?!.]$/, '');

  // Prefer capitalized noun phrase
  const nounMatch = cleaned.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/);
  if (nounMatch) return nounMatch[1].toLowerCase();

  const stopWords = /^(the|a|an|to|for|with|of|in|on|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|should|could|can|may|might|must)$/i;
  const words = cleaned.split(/\s+/).filter(w => w.length > 2 && !stopWords.test(w));
  return words.slice(0, 3).join(' ').toLowerCase() || 'unknown';
}

export function computeImportance(text: string, _position = 0): number {
  let score = 0.5;
  const words = text.split(/\s+/).length;
  if (words >= 10 && words <= 50) score += 0.2;
  else if (words > 50) score += 0.1;
  else if (words < 5) score -= 0.15;

  if (text.includes('?')) score += 0.1;
  if (text.includes('!')) score += 0.1;
  if (/```|`/.test(text)) score += 0.1;
  if (/https?:\/\/|www\./.test(text)) score += 0.05;
  if (/\/\w+(\/\w+)*\.\w+/.test(text)) score += 0.05;

  return Math.min(1.0, Math.max(0.0, score));
}

export function detectEmotionalTone(text: string): 'neutral' | 'frustrated' | 'excited' | 'uncertain' | undefined {
  if (/\b(hate|stuck|broken|terrible|awful|annoying|frustrated|can't|cannot|impossible|wrong|bug|issue|problem)\b/i.test(text)) return 'frustrated';
  if (/\b(love|amazing|awesome|perfect|great|excellent|fantastic|excited|yay|wow|incredible)\b/i.test(text)) return 'excited';
  if (/\b(maybe|perhaps|I think|I believe|I guess|not sure|not certain|might|could be|possibly)\b/i.test(text)) return 'uncertain';
  return undefined;
}

export function extractSignal(
  userId: number,
  conversationId: number,
  role: 'user' | 'assistant',
  text: string,
  messageId: number,
  occurredAt: string
): Omit<Signal, 'id'> {
  return {
    user_id: userId,
    conversation_id: conversationId,
    role,
    intent: classifyIntent(text),
    entities: extractEntities(text),
    topic: extractTopic(text),
    importance: computeImportance(text, 0),
    emotional_tone: detectEmotionalTone(text),
    raw_ref: `conv:${conversationId}:msg:${messageId}`,
    occurred_at: occurredAt,
    created_at: new Date().toISOString(),
  };
}
