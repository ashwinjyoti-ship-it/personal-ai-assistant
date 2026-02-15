// Telegram Channel — Webhook handler for Telegram Bot API
// Receives messages, normalizes via adapter, runs through agent, sends response

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../../types';
import { normalizeTelegramMessage, formatResponse } from './adapter';
import { createRotatingProvider } from '../../services/llm/provider';
import { runAgent } from '../../services/agent';
import { decrypt } from '../../services/crypto';

const telegram = new Hono<AppEnv>();

// Send a message via Telegram Bot API
async function sendTelegramMessage(botToken: string, chatId: string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatResponse(text, 'telegram'),
      parse_mode: 'Markdown',
    }),
  });
}

// Webhook endpoint — Telegram sends updates here
telegram.post('/webhook', async (c) => {
  try {
    const update = await c.req.json();
    
    // Only handle text messages
    const message = update.message;
    if (!message?.text) return c.json({ ok: true });

    const chatId = String(message.chat.id);
    const text = message.text;

    // Find user by telegram_chat_id
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE telegram_chat_id = ?'
    ).bind(chatId).first<UserRecord>();

    if (!user) {
      // Unknown chat — try to find a bot token from any user to respond
      // For now, just acknowledge
      return c.json({ ok: true, message: 'User not linked. Set your Telegram Chat ID in Settings.' });
    }

    // Get bot token from credentials
    const botTokenCred = await c.env.DB.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(user.id, 'telegram_bot_token').first<{ encrypted_value: string }>();

    if (!botTokenCred) {
      return c.json({ ok: true, message: 'Bot token not configured' });
    }

    const botToken = await decrypt(botTokenCred.encrypted_value, user.pin_hash);

    // Normalize the message
    const normalized = normalizeTelegramMessage(user.id, user.username, text, chatId);

    // Create rotating LLM provider and run agent
    const { provider, rotation } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
    const response = await runAgent(normalized, c.env.DB, provider, user, rotation);

    // Send response back via Telegram
    await sendTelegramMessage(botToken, chatId, response);

    return c.json({ ok: true });
  } catch (err: any) {
    console.error('Telegram webhook error:', err);
    // Log errors for telegram channel
    try {
      const { logError } = await import('../../services/llm/provider');
      await logError(c.env.DB, null, 'telegram', 'webhook_error', err.message || 'Unknown telegram error');
    } catch (_) {}
    return c.json({ ok: true, error: err.message });
  }
});

// Setup webhook URL (called once during deployment)
telegram.post('/setup-webhook', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Auth required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number; pin_hash: string }>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  const { webhook_url } = await c.req.json();
  if (!webhook_url) return c.json({ error: 'webhook_url required' }, 400);

  // Get bot token
  const botTokenCred = await c.env.DB.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(session.user_id, 'telegram_bot_token').first<{ encrypted_value: string }>();

  if (!botTokenCred) {
    return c.json({ error: 'Telegram bot token not configured in Settings' }, 400);
  }

  const botToken = await decrypt(botTokenCred.encrypted_value, session.pin_hash);

  // Register webhook with Telegram
  const res = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhook_url }),
  });

  const result = await res.json();
  return c.json(result);
});

export default telegram;
