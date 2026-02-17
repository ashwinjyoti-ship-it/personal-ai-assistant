// Telegram Channel — Webhook handler for Telegram Bot API
// Receives messages, normalizes via adapter, runs through agent, sends response
// v3.1: /start, /help, /status commands, typing indicator, long-message splitting

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../../types';
import { normalizeTelegramMessage, formatResponse } from './adapter';
import { createRotatingProvider } from '../../services/llm/provider';
import { runAgent } from '../../services/agent';
import { decrypt } from '../../services/crypto';

const telegram = new Hono<AppEnv>();

// Max Telegram message length
const TG_MAX_LENGTH = 4000;

// Send a text message via Telegram Bot API
async function sendTelegramMessage(botToken: string, chatId: string, text: string, parseMode: string = 'Markdown'): Promise<void> {
  // Split long messages
  const chunks = splitMessage(text, TG_MAX_LENGTH);
  for (const chunk of chunks) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: chunk,
          parse_mode: parseMode,
          disable_web_page_preview: false,
        }),
      });
      // If Markdown fails (e.g. unmatched formatting), retry as plain text
      if (!res.ok) {
        const err = await res.json().catch(() => null) as any;
        if (err?.description?.includes('parse') || err?.description?.includes('entities')) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: chunk }),
          });
        }
      }
    } catch (_) {
      // Silent fail for individual chunks — don't break the loop
    }
  }
}

// Send "typing..." indicator
async function sendTypingAction(botToken: string, chatId: string): Promise<void> {
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });
  } catch (_) {}
}

// Split long text into Telegram-safe chunks at natural breakpoints
function splitMessage(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    // Find last newline within limit
    let splitAt = remaining.lastIndexOf('\n', maxLen);
    if (splitAt < maxLen * 0.3) {
      // No good newline — try space
      splitAt = remaining.lastIndexOf(' ', maxLen);
    }
    if (splitAt < maxLen * 0.3) {
      // Forced split
      splitAt = maxLen;
    }
    chunks.push(remaining.substring(0, splitAt));
    remaining = remaining.substring(splitAt).trimStart();
  }
  return chunks;
}

// Handle bot commands (/start, /help, /status)
async function handleCommand(
  command: string,
  chatId: string,
  botToken: string,
  user: UserRecord | null,
  db: D1Database
): Promise<boolean> {
  const cmd = command.split('@')[0].toLowerCase(); // strip @botname suffix
  
  switch (cmd) {
    case '/start': {
      const name = user?.name || 'there';
      const msg = `👋 *Hello, ${name}!*\n\nI'm your personal AI assistant. You can talk to me just like you would on the web interface.\n\n` +
        `*Available commands:*\n` +
        `/help — Show available commands\n` +
        `/status — Check system status\n` +
        `/new — Start a fresh conversation\n\n` +
        `Just type normally to chat. Everything works — schedules, memory, Gmail, Google Workspace, and more.` +
        (user ? '' : `\n\n⚠️ Your Telegram chat ID is *${chatId}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);
      await sendTelegramMessage(botToken, chatId, msg);
      return true;
    }
    
    case '/help': {
      const msg = `🛠 *Commands*\n\n` +
        `/start — Welcome message\n` +
        `/help — This help text\n` +
        `/status — System status & stats\n` +
        `/new — Start new conversation thread\n\n` +
        `*What I can do:*\n` +
        `• Manage your schedule and reminders\n` +
        `• Read and send Gmail\n` +
        `• Google Sheets, Calendar, Docs, Drive\n` +
        `• Check Outlook mail\n` +
        `• Search places, get directions\n` +
        `• Translate text, search YouTube\n` +
        `• Browse the web\n` +
        `• Remember important things about you\n\n` +
        `Just type naturally — I'll figure out the rest.`;
      await sendTelegramMessage(botToken, chatId, msg);
      return true;
    }
    
    case '/status': {
      if (!user) {
        await sendTelegramMessage(botToken, chatId, '⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.');
        return true;
      }
      try {
        const [schedules, memories, threads, errors] = await Promise.all([
          db.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0').bind(user.id).first<{cnt:number}>(),
        ]);
        const msg = `📊 *System Status*\n\n` +
          `Active tasks: ${schedules?.cnt || 0}\n` +
          `Memories: ${memories?.cnt || 0}\n` +
          `Conversations: ${threads?.cnt || 0}\n` +
          `Unresolved errors: ${errors?.cnt || 0}\n` +
          `\nStatus: ✅ Online`;
        await sendTelegramMessage(botToken, chatId, msg);
      } catch (_) {
        await sendTelegramMessage(botToken, chatId, '✅ Online — but had trouble fetching stats.');
      }
      return true;
    }
    
    case '/new': {
      if (!user) {
        await sendTelegramMessage(botToken, chatId, '⚠️ Account not linked.');
        return true;
      }
      await sendTelegramMessage(botToken, chatId, '🆕 Starting fresh conversation. Your next message begins a new thread.');
      return true;
    }
    
    default:
      return false; // Not a recognized command
  }
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

    // Get bot token — try from user's credentials first, then from any user
    let botToken: string | null = null;
    
    if (user) {
      const botTokenCred = await c.env.DB.prepare(
        'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
      ).bind(user.id, 'telegram_bot_token').first<{ encrypted_value: string }>();
      if (botTokenCred) {
        botToken = await decrypt(botTokenCred.encrypted_value, user.pin_hash);
      }
    }
    
    if (!botToken) {
      // Try finding any bot token (for /start command from unlinked users)
      const anyToken = await c.env.DB.prepare(
        `SELECT c.encrypted_value, u.pin_hash FROM credentials c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.service = 'telegram_bot_token' LIMIT 1`
      ).first<{ encrypted_value: string; pin_hash: string }>();
      if (anyToken) {
        botToken = await decrypt(anyToken.encrypted_value, anyToken.pin_hash);
      }
    }
    
    if (!botToken) {
      return c.json({ ok: true, message: 'Bot token not configured' });
    }

    // Handle commands first
    if (text.startsWith('/')) {
      const handled = await handleCommand(text, chatId, botToken, user, c.env.DB);
      if (handled) return c.json({ ok: true });
    }

    // Non-command message requires linked account
    if (!user) {
      await sendTelegramMessage(botToken, chatId, 
        `⚠️ Your account isn't linked yet.\n\nYour Telegram Chat ID is: \`${chatId}\`\n\nGo to the web app → Settings → Profile → set your Telegram Chat ID to this value.`
      );
      return c.json({ ok: true });
    }

    // Send typing indicator
    await sendTypingAction(botToken, chatId);

    // Normalize the message
    const normalized = normalizeTelegramMessage(user.id, user.username, text, chatId);

    // Create rotating LLM provider and run agent
    const { provider, rotation } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
    const response = await runAgent(normalized, c.env.DB, provider, user, rotation, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
    });

    // Send response back via Telegram
    await sendTelegramMessage(botToken, chatId, formatResponse(response, 'telegram'));

    return c.json({ ok: true });
  } catch (err: any) {
    console.error('Telegram webhook error:', err);
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
    body: JSON.stringify({ 
      url: webhook_url,
      allowed_updates: ['message'],
      drop_pending_updates: false,
    }),
  });

  const result = await res.json();
  return c.json(result);
});

// Get webhook status
telegram.get('/webhook-status', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Auth required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number; pin_hash: string }>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  const botTokenCred = await c.env.DB.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(session.user_id, 'telegram_bot_token').first<{ encrypted_value: string }>();

  if (!botTokenCred) {
    return c.json({ configured: false, error: 'Bot token not set' });
  }

  const botToken = await decrypt(botTokenCred.encrypted_value, session.pin_hash);

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
    const data = await res.json() as any;
    return c.json({
      configured: true,
      webhook_url: data.result?.url || '',
      has_webhook: !!(data.result?.url),
      pending_updates: data.result?.pending_update_count || 0,
      last_error: data.result?.last_error_message || '',
      last_error_date: data.result?.last_error_date || null,
    });
  } catch (err: any) {
    return c.json({ configured: true, error: err.message });
  }
});

// Detect Chat ID — temporarily removes webhook, polls getUpdates, restores webhook
// User should send ANY message to the bot right before clicking this
telegram.post('/detect-chat-id', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Auth required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<{ user_id: number; pin_hash: string }>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  const botTokenCred = await c.env.DB.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(session.user_id, 'telegram_bot_token').first<{ encrypted_value: string }>();

  if (!botTokenCred) {
    return c.json({ error: 'Bot token not configured' }, 400);
  }

  const botToken = await decrypt(botTokenCred.encrypted_value, session.pin_hash);

  try {
    // 1. Get current webhook URL so we can restore it
    const webhookInfoRes = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
    const webhookInfo = await webhookInfoRes.json() as any;
    const savedWebhookUrl = webhookInfo.result?.url || '';

    // 2. Temporarily remove webhook (getUpdates won't work with webhook active)
    await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drop_pending_updates: false }),
    });

    // 3. Small delay to let Telegram process the webhook removal
    await new Promise(r => setTimeout(r, 500));

    // 4. Call getUpdates to fetch recent messages
    const updatesRes = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?limit=10&timeout=0`);
    const updatesData = await updatesRes.json() as any;

    // 5. Restore webhook immediately
    if (savedWebhookUrl) {
      await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: savedWebhookUrl, allowed_updates: ['message'] }),
      });
    }

    // 6. Extract chat IDs from updates
    const updates = updatesData.result || [];
    if (updates.length === 0) {
      return c.json({ 
        found: false, 
        message: 'No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds.' 
      });
    }

    // Find the most recent message with a chat ID
    const chatIds: Array<{ chat_id: string; name: string; username: string; date: string }> = [];
    const seen = new Set<string>();
    for (let i = updates.length - 1; i >= 0; i--) {
      const msg = updates[i].message;
      if (msg && msg.chat) {
        const cid = String(msg.chat.id);
        if (!seen.has(cid)) {
          seen.add(cid);
          chatIds.push({
            chat_id: cid,
            name: [msg.chat.first_name, msg.chat.last_name].filter(Boolean).join(' ') || msg.chat.title || 'Unknown',
            username: msg.chat.username || '',
            date: new Date((msg.date || 0) * 1000).toISOString(),
          });
        }
      }
    }

    if (chatIds.length === 0) {
      return c.json({ found: false, message: 'No chat messages found in updates. Try sending a message to the bot and click detect again.' });
    }

    // Auto-save the first (most recent) chat ID to user profile
    const primaryChatId = chatIds[0].chat_id;
    await c.env.DB.prepare(
      'UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(primaryChatId, session.user_id).run();

    return c.json({ 
      found: true, 
      chat_id: primaryChatId,
      name: chatIds[0].name,
      all_chats: chatIds,
      message: `Chat ID ${primaryChatId} detected and saved to your profile.`,
    });

  } catch (err: any) {
    return c.json({ error: `Detection failed: ${err.message}` }, 500);
  }
});

export default telegram;
