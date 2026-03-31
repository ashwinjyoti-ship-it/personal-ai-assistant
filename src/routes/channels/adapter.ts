// Channel Adapter — Normalizes messages from different sources
// Following Cloudbot's Adapter Pattern

import type { NormalizedMessage } from '../../types';

// Normalize a web chat message
export function normalizeWebMessage(
  userId: number,
  username: string,
  text: string,
  sessionId: string
): NormalizedMessage {
  return {
    userId,
    username,
    channel: 'web',
    text,
    sessionId,
    timestamp: new Date().toISOString(),
  };
}

// Normalize a Telegram message
export function normalizeTelegramMessage(
  userId: number,
  username: string,
  text: string,
  telegramChatId: string
): NormalizedMessage {
  return {
    userId,
    username,
    channel: 'telegram',
    text,
    sessionId: `telegram-${telegramChatId}`,
    timestamp: new Date().toISOString(),
  };
}

// Format a response for a specific channel
export function formatResponse(text: string, channel: 'web' | 'telegram'): string {
  if (channel === 'telegram') {
    // Convert standard markdown to Telegram legacy Markdown.
    // Order matters: process block-level elements before inline.
    return text
      .replace(/\*\*(.*?)\*\*/gs, '*$1*')          // **bold** → *bold*
      .replace(/^#{1,3}\s+(.+)$/gm, '*$1*')         // ## Heading → *Heading* (was missing closing *)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')       // [text](url) → text (unsupported in legacy Markdown)
      .replace(/```(\w*)\n([\s\S]*?)```/g, '```$2```'); // strip language tag from code blocks
  }
  // Web — return as-is (frontend handles markdown rendering)
  return text;
}
