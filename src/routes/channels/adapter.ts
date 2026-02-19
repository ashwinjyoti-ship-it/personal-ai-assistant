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
    // Telegram uses its own markdown flavor
    // Convert standard markdown to Telegram-compatible
    return text
      .replace(/\*\*(.*?)\*\*/g, '*$1*')  // Bold
      .replace(/#{1,3}\s/g, '*')            // Headers to bold
      .replace(/```(\w*)\n([\s\S]*?)```/g, '```$2```'); // Code blocks
  }
  // Web — return as-is (frontend handles markdown rendering)
  return text;
}
