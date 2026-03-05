// Telegram Channel — Webhook handler for Telegram Bot API
// Receives messages, normalizes via adapter, runs through agent, sends response
// v3.1: /start, /help, /status commands, typing indicator, long-message splitting

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../../types';
import { normalizeTelegramMessage, formatResponse } from './adapter';
import { createRotatingProvider } from '../../services/llm/provider';
import { runAgentRouted } from '../../services/agent';
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
      const aName = user?.assistant_name || 'Karna';
      const msg = `👋 *Hello, ${name}!*\n\nI'm ${aName}, your personal AI assistant. You can talk to me just like you would on the web interface.\n\n` +
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
      const hName = user?.assistant_name || 'Karna';
      const msg = `🛠 *${hName} — Commands*\n\n` +
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
        const [schedules, memories, conversations, errors] = await Promise.all([
          db.prepare('SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?').bind(user.id).first<{cnt:number}>(),
          db.prepare('SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0').bind(user.id).first<{cnt:number}>(),
        ]);
        const msg = `📊 *System Status*\n\n` +
          `Active tasks: ${schedules?.cnt || 0}\n` +
          `Memories: ${memories?.cnt || 0}\n` +
          `Conversation days: ${conversations?.cnt || 0}\n` +
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
      // Archive current Telegram thread so a new one is created on next message
      await db.prepare(
        `UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0`
      ).bind(user.id).run();
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
    
    // Handle callback queries (inline keyboard button presses)
    if (update.callback_query) {
      await handleCallbackQuery(c.env.DB, update.callback_query);
      return c.json({ ok: true });
    }
    
    // Handle text and voice messages, documents, photos
    const message = update.message;
    if (!message) return c.json({ ok: true });
    
    // Skip if there's nothing we can handle
    const hasText = !!message.text;
    const hasVoice = !!message.voice;
    const hasDocument = !!message.document;
    const hasPhoto = !!message.photo;
    const hasCaption = !!message.caption;
    
    if (!hasText && !hasVoice && !hasDocument && !hasPhoto) return c.json({ ok: true });

    const chatId = String(message.chat.id);
    let text = message.text || '';

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

    // Handle Voice Messages
    if (message.voice && botToken && user) {
      try {
        await sendTelegramMessage(botToken, chatId, '🎤 Processing voice note...');
        
        const fileRes = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${message.voice.file_id}`);
        const fileData = await fileRes.json() as any;
        
        if (fileData.ok && fileData.result?.file_path) {
          const dlRes = await fetch(`https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`);
          const blob = await dlRes.blob();
          
          let sttUrl = '';
          let sttKey = '';
          let sttModel = 'whisper-1';
          
          // Find OpenAI or Groq key for transcription
          const allCreds = await c.env.DB.prepare(
            `SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))`
          ).bind(user.id).all<{ service: string; encrypted_value: string }>();
          
          for (const cred of allCreds.results) {
            const raw = await decrypt(cred.encrypted_value, user.pin_hash);
            if (cred.service === 'openai') {
              sttUrl = 'https://api.openai.com/v1/audio/transcriptions';
              sttKey = raw;
              break;
            } else if (cred.service.startsWith('llm_slot_')) {
              try {
                const conf = JSON.parse(raw);
                if (conf.provider === 'openai') {
                  sttUrl = 'https://api.openai.com/v1/audio/transcriptions';
                  sttKey = conf.apiKey;
                  break;
                } else if (conf.provider === 'groq') {
                  sttUrl = 'https://api.groq.com/openai/v1/audio/transcriptions';
                  sttKey = conf.apiKey;
                  sttModel = 'whisper-large-v3';
                  break;
                }
              } catch {}
            }
          }
          
          if (!sttUrl) {
            await sendTelegramMessage(botToken, chatId, '⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).');
            return c.json({ ok: true });
          }
          
          const formData = new FormData();
          formData.append('file', blob, 'voice.ogg');
          formData.append('model', sttModel);
          // CRITICAL: Force English transcription. Without this, Whisper auto-detects
          // language and often misidentifies short English voice notes as Arabic/Farsi/Hindi.
          formData.append('language', 'en');
          
          const sttRes = await fetch(sttUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${sttKey}` },
            body: formData
          });
          
          if (!sttRes.ok) {
             const e = await sttRes.text();
             await sendTelegramMessage(botToken, chatId, `⚠️ Transcription failed: ${sttRes.status} ${e}`);
             return c.json({ ok: true });
          }
          
          const transcript = await sttRes.json() as any;
          text = transcript.text;
          
          // Send back the transcription so the user knows what was heard
          await sendTelegramMessage(botToken, chatId, `🗣️ *You said:* ${text}`);
        }
      } catch (e: any) {
         await sendTelegramMessage(botToken, chatId, `⚠️ Failed to process voice note: ${e.message}`);
         return c.json({ ok: true });
      }
    }

    // Handle Documents (PDF, Word, CSV, TXT, etc.)
    if ((hasDocument || hasPhoto) && botToken && user) {
      try {
        let fileId: string | undefined;
        let fileName = 'unknown';
        let mimeType = 'unknown';
        let fileSize = 0;

        if (hasDocument) {
          fileId = message.document.file_id;
          fileName = message.document.file_name || 'document';
          mimeType = message.document.mime_type || 'unknown';
          fileSize = message.document.file_size || 0;
        } else if (hasPhoto) {
          // Photos come as an array of sizes — pick the largest
          const photo = message.photo[message.photo.length - 1];
          fileId = photo.file_id;
          fileName = 'photo.jpg';
          mimeType = 'image/jpeg';
          fileSize = photo.file_size || 0;
        }

        if (fileId) {
          // Try to download and read text-based files
          const fileRes = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
          const fileData = await fileRes.json() as any;
          let fileContent = '';

          if (fileData.ok && fileData.result?.file_path) {
            const isTextFile = /\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(fileName)
              || /^text\/|application\/json|application\/xml|application\/csv/i.test(mimeType);

            if (isTextFile && fileSize < 50000) { // Only read text files under 50KB
              try {
                const dlRes = await fetch(`https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`);
                fileContent = await dlRes.text();
              } catch (_) {}
            }
          }

          // Build context for the agent
          const caption = message.caption || '';
          const fileMeta = `[Telegram file received: "${fileName}" (${mimeType}, ${Math.round(fileSize/1024)}KB)]`;

          if (fileContent) {
            text = `${caption ? caption + '\n\n' : ''}${fileMeta}\nFile contents:\n${fileContent.substring(0, 8000)}${fileContent.length > 8000 ? '\n[...truncated]' : ''}`;
          } else {
            text = `${caption ? caption + '\n\n' : ''}${fileMeta}\nNote: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`;
          }
        }
      } catch (e: any) {
        // If file handling fails, still process the caption if present
        if (hasCaption && message.caption) {
          text = message.caption;
        } else {
          await sendTelegramMessage(botToken, chatId, `⚠️ Received your file but couldn't process it: ${e.message}`);
          return c.json({ ok: true });
        }
      }
    }

    // If still no text (e.g. photo without caption and download failed), bail
    if (!text) return c.json({ ok: true });

    // Send typing indicator
    await sendTypingAction(botToken, chatId);

    // Get or create a persistent Telegram thread for this user
    // This ensures conversation context carries across messages
    let telegramThread = await c.env.DB.prepare(
      `SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1`
    ).bind(user.id).first<{ id: number }>();

    if (!telegramThread) {
      const res = await c.env.DB.prepare(
        `INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')`
      ).bind(user.id).run();
      telegramThread = { id: res.meta.last_row_id as number };
    } else {
      // Touch the thread so it stays recent
      await c.env.DB.prepare(
        `UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(telegramThread.id).run();
    }

    // Normalize the message — attach the persistent thread
    const normalized = normalizeTelegramMessage(user.id, user.username, text, chatId);
    normalized.metadata = { thread_id: telegramThread.id };

    // Create rotating LLM provider and run agent
    let provider, rotation;
    try {
      const result = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
      provider = result.provider;
      rotation = result.rotation;
    } catch (provErr: any) {
      console.error('Telegram provider setup error:', provErr);
      const errMsg = provErr.message?.includes('No LLM provider')
        ? '⚠️ No AI provider configured yet.\n\nGo to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).'
        : provErr.message?.includes('Daily usage limit')
          ? '⚠️ Daily usage limit reached. Your limit resets at midnight.'
          : `⚠️ AI provider error: ${provErr.message || 'Unknown error'}`;
      await sendTelegramMessage(botToken, chatId, errMsg);
      return c.json({ ok: true });
    }

    try {
      const response = await runAgentRouted(normalized, c.env.DB, provider, user, rotation, {
        GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
        GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
      });

      // Send response back via Telegram
      const reply = formatResponse(response, 'telegram');
      await sendTelegramMessage(botToken, chatId, reply || '(empty response)');
    } catch (agentErr: any) {
      console.error('Telegram agent error:', agentErr);
      // Notify user about the error instead of silent failure
      const userFacingMsg = agentErr.message?.includes('API error')
        ? `⚠️ AI provider returned an error. The provider (${provider.name}) may be temporarily unavailable. Your message was saved — try again shortly.`
        : `⚠️ Something went wrong processing your message. Error: ${(agentErr.message || 'Unknown').substring(0, 200)}`;
      await sendTelegramMessage(botToken, chatId, userFacingMsg);
      try {
        const { logError } = await import('../../services/llm/provider');
        await logError(c.env.DB, user.id, 'telegram', 'agent_error', agentErr.message || 'Agent error', { provider: provider.name });
      } catch (_) {}
    }

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

  // Get bot token
  const botTokenCred = await c.env.DB.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(session.user_id, 'telegram_bot_token').first<{ encrypted_value: string }>();

  if (!botTokenCred) {
    return c.json({ error: 'Telegram bot token not configured in Settings' }, 400);
  }

  const botToken = await decrypt(botTokenCred.encrypted_value, session.pin_hash);

  // If empty webhook_url, remove the webhook instead of setting one
  if (!webhook_url) {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drop_pending_updates: false }),
    });
    const result = await res.json();
    return c.json(result);
  }

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

// === Callback Query Handler for Interactive Briefings ===

async function handleCallbackQuery(db: D1Database, callbackQuery: any): Promise<void> {
  const { id: queryId, data, message, from } = callbackQuery;
  
  if (!data || !message) return;
  
  // Parse callback data: briefing_toggle:item_key:briefing_id
  const parts = data.split(':');
  if (parts[0] !== 'briefing_toggle' || parts.length < 3) {
    return;
  }
  
  const itemKey = parts[1];
  const briefingId = parseInt(parts[2]);
  
  if (!briefingId || !itemKey) return;
  
  // Find user by chat ID
  const chatId = String(message.chat.id);
  const user = await db.prepare(
    'SELECT * FROM users WHERE telegram_chat_id = ?'
  ).bind(chatId).first<any>();
  
  if (!user) return;
  
  // Find the briefing item
  const item = await db.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(user.id, briefingId, itemKey).first<any>();
  
  if (!item) return;
  
  // Toggle the item
  const newChecked = item.checked ? 0 : 1;
  await db.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(newChecked, newChecked, item.id).run();
  
  // Get bot token to answer callback and update message
  const botTokenCred = await db.prepare(
    `SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`
  ).bind(user.id).first<{ encrypted_value: string; pin_hash: string }>();
  
  if (!botTokenCred) return;
  
  const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
  
  // Answer the callback query
  await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: queryId,
      text: newChecked ? '✅ Checked!' : '☐ Unchecked',
    }),
  });
  
  // Update the inline keyboard to reflect new state
  if (message.reply_markup?.inline_keyboard) {
    const updatedKeyboard = message.reply_markup.inline_keyboard.map((row: any[]) =>
      row.map((btn: any) => {
        if (btn.callback_data?.includes(itemKey)) {
          const emoji = newChecked ? '✅' : '☐';
          const textWithoutEmoji = btn.text.replace(/^[☐✅]\s*/, '');
          return { ...btn, text: `${emoji} ${textWithoutEmoji}` };
        }
        return btn;
      })
    );
    
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/editMessageReplyMarkup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: message.message_id,
          reply_markup: { inline_keyboard: updatedKeyboard },
        }),
      });
    } catch (_) {
      // Ignore edit errors (message may be too old)
    }
  }
}

export default telegram;
