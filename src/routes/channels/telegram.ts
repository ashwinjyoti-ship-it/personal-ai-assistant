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

// Send a text message via Telegram Bot API with retry logic
// Returns { success: boolean, errors: string[] }
async function sendTelegramMessage(botToken: string, chatId: string, text: string, parseMode: string = 'Markdown', db?: D1Database, userId?: number): Promise<{ success: boolean; errors: string[] }> {
  const chunks = splitMessage(text, TG_MAX_LENGTH);
  const errors: string[] = [];
  let allSent = true; // tracks whether EVERY chunk was delivered successfully

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    let sent = false;
    let lastError = '';

    // Retry up to 3 times with exponential backoff for transient failures
    for (let attempt = 0; attempt < 3; attempt++) {
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

        if (res.ok) {
          sent = true;
          break;
        }

        // If Markdown fails (e.g. unmatched formatting), retry as plain text
        const err = await res.json().catch(() => null) as any;
        lastError = `HTTP ${res.status}: ${err?.description || 'Unknown error'}`;

        if (err?.description?.includes('parse') || err?.description?.includes('entities')) {
          // Retry with plain text (no parse mode)
          const plainRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: chunk }),
          });
          if (plainRes.ok) {
            sent = true;
            break;
          }
          lastError += ' (plain-text retry also failed)';
        }

        // Transient error (rate limit, timeout) — wait before retry
        if (res.status === 429 || res.status >= 500) {
          const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        // Non-transient error — don't retry
        break;
      } catch (e: any) {
        lastError = `Network error: ${e.message}`;
        // Network errors are transient — retry
        if (attempt < 2) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
      }
    }

    if (!sent) {
      allSent = false;
      errors.push(`Chunk ${i + 1}/${chunks.length}: ${lastError}`);
    }
  }

  // Log any send failures (partial or total) to error log if database available
  if (!allSent && db && userId && errors.length > 0) {
    try {
      const { logError } = await import('../../services/llm/provider');
      await logError(db, userId, 'telegram', 'send_failed', errors.join(' | '));
    } catch (_) {}
  }

  return { success: allSent, errors };
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
        `/tasks — Show open tasks\n` +
        `/new — Start a fresh conversation\n\n` +
        `Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.` +
        (user ? '' : `\n\n⚠️ Your Telegram chat ID is *${chatId}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);
      const result = await sendTelegramMessage(botToken, chatId, msg, 'Markdown', db, user?.id);
      if (!result.success && result.errors.length > 0) {
        console.warn(`[/start] Failed to send message: ${result.errors.join(' | ')}`);
      }
      return true;
    }
    
    case '/help': {
      const hName = user?.assistant_name || 'Karna';
      const msg = `🛠 *${hName} — Commands*\n\n` +
        `/start — Welcome message\n` +
        `/help — This help text\n` +
        `/status — System status & stats\n` +
        `/tasks — Show open tasks as checklist\n` +
        `/new — Start new conversation thread\n\n` +
        `*What I can do:*\n` +
        `• Manage your schedule and reminders\n` +
        `• Track tasks (say "I need to..." or "note to do...")\n` +
        `• Read and send Gmail\n` +
        `• Google Sheets, Calendar, Docs, Drive\n` +
        `• Check Outlook mail\n` +
        `• Search places, get directions\n` +
        `• Translate text, search YouTube\n` +
        `• Browse the web\n` +
        `• Remember important things about you\n\n` +
        `Just type naturally — I'll figure out the rest.`;
      const result = await sendTelegramMessage(botToken, chatId, msg, 'Markdown', db, user?.id);
      if (!result.success && result.errors.length > 0) {
        console.warn(`[/help] Failed to send message: ${result.errors.join(' | ')}`);
      }
      return true;
    }
    
    case '/status': {
      if (!user) {
        const result = await sendTelegramMessage(botToken, chatId, '⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.', 'Markdown', db);
        if (!result.success) console.warn(`[/status] Failed to send message: ${result.errors.join(' | ')}`);
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
        const result = await sendTelegramMessage(botToken, chatId, msg, 'Markdown', db, user.id);
        if (!result.success) console.warn(`[/status] Failed to send message: ${result.errors.join(' | ')}`);
      } catch (e: any) {
        const result = await sendTelegramMessage(botToken, chatId, '✅ Online — but had trouble fetching stats.', 'Markdown', db, user?.id);
        if (!result.success) console.warn(`[/status error] Failed to send message: ${result.errors.join(' | ')}`);
      }
      return true;
    }
    
    case '/new': {
      if (!user) {
        const result = await sendTelegramMessage(botToken, chatId, '⚠️ Account not linked.', 'Markdown', db);
        if (!result.success) console.warn(`[/new] Failed to send message: ${result.errors.join(' | ')}`);
        return true;
      }
      // Archive current Telegram thread so a new one is created on next message
      await db.prepare(
        `UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0`
      ).bind(user.id).run();
      const result = await sendTelegramMessage(botToken, chatId, '🆕 Starting fresh conversation. Your next message begins a new thread.', 'Markdown', db, user.id);
      if (!result.success) console.warn(`[/new] Failed to send message: ${result.errors.join(' | ')}`);
      return true;
    }

    case '/tasks':
    case '/task': {
      if (!user) {
        const result = await sendTelegramMessage(botToken, chatId, '⚠️ Account not linked.', 'Markdown', db);
        if (!result.success) console.warn(`[/tasks] Failed to send message: ${result.errors.join(' | ')}`);
        return true;
      }
      try {
        const tasks = await db.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(user.id).all<{ title: string; content: string; due_date: string | null; status: string }>();

        const rows = tasks.results || [];
        if (rows.length === 0) {
          const result = await sendTelegramMessage(botToken, chatId, '✅ No open tasks. You\'re all clear.', 'Markdown', db, user.id);
          if (!result.success) console.warn(`[/tasks] Failed to send message: ${result.errors.join(' | ')}`);
          return true;
        }

        const now = new Date();
        // Use today/tomorrow as date-only strings for stable comparison (avoids UTC offset issues)
        const todayStr = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const tomorrowDate = new Date(now);
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const tomorrowStr = tomorrowDate.toISOString().slice(0, 10);

        const lines: string[] = [`📋 *Open Tasks (${rows.length})*\n`];
        for (const t of rows) {
          let dueLabel = '';
          if (t.due_date) {
            const dueDateStr = t.due_date.slice(0, 10); // normalize to YYYY-MM-DD
            if (dueDateStr < todayStr) {
              dueLabel = ' ⚠️ _overdue_';
            } else if (dueDateStr === todayStr) {
              dueLabel = ' 🔴 _due today_';
            } else if (dueDateStr === tomorrowStr) {
              dueLabel = ' 🟡 _due tomorrow_';
            } else {
              const d = new Date(t.due_date);
              dueLabel = ` _${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}_`;
            }
          }
          lines.push(`☐ ${t.title}${dueLabel}`);
        }
        lines.push('\n_Say "mark [task] as done" to close a task._');
        const result = await sendTelegramMessage(botToken, chatId, lines.join('\n'), 'Markdown', db, user.id);
        if (!result.success) console.warn(`[/tasks] Failed to send message: ${result.errors.join(' | ')}`);
      } catch (err: any) {
        const result = await sendTelegramMessage(botToken, chatId, '❌ Could not fetch tasks: ' + err.message, 'Markdown', db, user?.id);
        if (!result.success) console.warn(`[/tasks error] Failed to send message: ${result.errors.join(' | ')}`);
      }
      return true;
    }
    
    default:
      return false; // Not a recognized command
  }
}

// Webhook endpoint — Telegram sends updates here
telegram.post('/webhook', async (c) => {
  // Parse body synchronously first
  let update: any;
  try {
    update = await c.req.json();
  } catch {
    return c.json({ ok: true });
  }

  // Capture env bindings for use inside waitUntil closure
  const db = c.env.DB;
  const envVars = {
    GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
    GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
  };

  // ── RESPOND IMMEDIATELY — Telegram requires 200 within 5s ────────────────
  // All processing happens inside waitUntil so the Worker stays alive.
  const processUpdate = async () => {
  try {
    // Handle callback queries (inline keyboard button presses)
    if (update.callback_query) {
      await handleCallbackQuery(db, update.callback_query);
      return;
    }

    // Handle text and voice messages, documents, photos
    const message = update.message;
    if (!message) return;

    // Skip if there's nothing we can handle
    const hasText = !!message.text;
    const hasVoice = !!message.voice;
    const hasDocument = !!message.document;
    const hasPhoto = !!message.photo;
    const hasCaption = !!message.caption;

    if (!hasText && !hasVoice && !hasDocument && !hasPhoto) return;

    const chatId = String(message.chat.id);
    let text = message.text || '';

    // Find user by telegram_chat_id
    const user = await db.prepare(
      'SELECT * FROM users WHERE telegram_chat_id = ?'
    ).bind(chatId).first<UserRecord>();

    // Get bot token — try from user's credentials first, then from any user
    let botToken: string | null = null;

    if (user) {
      const botTokenCred = await db.prepare(
        'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
      ).bind(user.id, 'telegram_bot_token').first<{ encrypted_value: string }>();
      if (botTokenCred) {
        botToken = await decrypt(botTokenCred.encrypted_value, user.pin_hash);
      }
    }

    if (!botToken) {
      // Try finding any bot token (for /start command from unlinked users)
      const anyToken = await db.prepare(
        `SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`
      ).first<{ encrypted_value: string; pin_hash: string }>();
      if (anyToken) {
        botToken = await decrypt(anyToken.encrypted_value, anyToken.pin_hash);
      }
    }

    if (!botToken) return; // No token — nothing to do

    // Handle commands first
    if (text.startsWith('/')) {
      const handled = await handleCommand(text, chatId, botToken, user, db);
      if (handled) return;
    }

    // Non-command message requires linked account
    if (!user) {
      const result = await sendTelegramMessage(botToken, chatId,
        `⚠️ Your account isn't linked yet.\n\nYour Telegram Chat ID is: \`${chatId}\`\n\nGo to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,
        'Markdown', db
      );
      if (!result.success) {
        console.warn(`Failed to send unlinked account message: ${result.errors.join(' | ')}`);
      }
      return;
    }

    // Handle Voice Messages
    if (message.voice && botToken && user) {
      try {
        const voiceResult = await sendTelegramMessage(botToken, chatId, '🎤 Processing voice note...', 'Markdown', db, user.id);
        if (!voiceResult.success) console.warn(`[voice start] Failed to send message: ${voiceResult.errors.join(' | ')}`);
        
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
            const result = await sendTelegramMessage(botToken, chatId, '⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).', 'Markdown', db, user.id);
            if (!result.success) console.warn(`[voice no stt] Failed to send message: ${result.errors.join(' | ')}`);
            return;
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
             const result = await sendTelegramMessage(botToken, chatId, `⚠️ Transcription failed: ${sttRes.status} ${e}`, 'Markdown', db, user.id);
             if (!result.success) console.warn(`[voice transcription error] Failed to send message: ${result.errors.join(' | ')}`);
             return;
          }
          
          const transcript = await sttRes.json() as any;
          text = transcript.text;
          
          // Send back the transcription so the user knows what was heard
          const transcriptResult = await sendTelegramMessage(botToken, chatId, `🗣️ *You said:* ${text}`, 'Markdown', db, user.id);
          if (!transcriptResult.success) console.warn(`[voice transcript echo] Failed to send message: ${transcriptResult.errors.join(' | ')}`);
        }
      } catch (e: any) {
         const result = await sendTelegramMessage(botToken, chatId, `⚠️ Failed to process voice note: ${e.message}`, 'Markdown', db, user?.id);
         if (!result.success) console.warn(`[voice processing error] Failed to send message: ${result.errors.join(' | ')}`);
         return;
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
          const result = await sendTelegramMessage(botToken, chatId, `⚠️ Received your file but couldn't process it: ${e.message}`, 'Markdown', db, user?.id);
          if (!result.success) console.warn(`[file processing error] Failed to send message: ${result.errors.join(' | ')}`);
          return;
        }
      }
    }

    // If still no text bail
    if (!text) return;

    // Send typing indicator (non-blocking best-effort)
    sendTypingAction(botToken, chatId).catch(() => {});

    // Get or create a persistent Telegram thread for this user
    let telegramThread = await db.prepare(
      `SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1`
    ).bind(user.id).first<{ id: number }>();

    if (!telegramThread) {
      const res = await db.prepare(
        `INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')`
      ).bind(user.id).run();
      telegramThread = { id: res.meta.last_row_id as number };
    } else {
      await db.prepare(
        `UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(telegramThread.id).run();
    }

    // Normalize the message — attach the persistent thread
    const normalized = normalizeTelegramMessage(user.id, user.username, text, chatId);
    normalized.metadata = { thread_id: telegramThread.id };

    // Create rotating LLM provider and run agent
    let provider: any, rotation: any;
    try {
      const result = await createRotatingProvider(db, user.id, user.pin_hash);
      provider = result.provider;
      rotation = result.rotation;
    } catch (provErr: any) {
      console.error('Telegram provider setup error:', provErr);
      const errMsg = provErr.message?.includes('No LLM provider')
        ? '⚠️ No AI provider configured yet.\n\nGo to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).'
        : provErr.message?.includes('Daily usage limit')
          ? '⚠️ Daily usage limit reached. Your limit resets at midnight.'
          : `⚠️ AI provider error: ${provErr.message || 'Unknown error'}`;
      const result = await sendTelegramMessage(botToken!, chatId, errMsg, 'Markdown', db, user.id);
      if (!result.success) console.warn(`[provider error] Failed to send message: ${result.errors.join(' | ')}`);
      return;
    }

    // Pre-classify to decide if an early ack is needed. 'multi' queries use tools
    // (web search, calendar, research, etc.) which take 5–30s — longer than Telegram's
    // 5s typing indicator. Sending "On it…" first ensures the user gets feedback even
    // if the worker is killed externally before the agent completes.
    const { classifyIntentFast } = await import('../../services/router');
    if (classifyIntentFast(text).agent === 'multi') {
      const ackResult = await sendTelegramMessage(botToken!, chatId, '🔍 On it\u2026', 'Markdown', db, user.id);
      if (!ackResult.success) console.warn(`[ack] Failed to send: ${ackResult.errors.join(' | ')}`);
    }

    // Wrap agent in a 90-second timeout. Cloudflare Pages Functions extend worker
    // lifetime via waitUntil() on the paid plan; 90s covers multi-step research +
    // calendar chains. If externally killed before this fires, the early ack above
    // ensures the user at least saw the request was received.
    const TELEGRAM_TIMEOUT_MS = 90000;
    let responseSent = false;
    try {
      const response = await Promise.race([
        runAgentRouted(normalized, db, provider, user, rotation, envVars),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('TELEGRAM_TIMEOUT')), TELEGRAM_TIMEOUT_MS)
        ),
      ]);
      const reply = formatResponse(response, 'telegram');
      const sendResult = await sendTelegramMessage(botToken!, chatId, reply || '(empty response)', 'Markdown', db, user.id);
      
      // CRITICAL: Track if response was actually sent successfully
      responseSent = sendResult.success;
      if (!sendResult.success) {
        console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${user.id}:`, sendResult.errors);
        // Log this critical failure
        try {
          const { logError } = await import('../../services/llm/provider');
          await logError(db, user.id, 'telegram', 'response_send_failed', `Failed to deliver response: ${sendResult.errors.join(' | ')}`);
        } catch (_) {}
      }
    } catch (agentErr: any) {
      console.error('Telegram agent error:', agentErr);
      const isTelegramTimeout = agentErr.message === 'TELEGRAM_TIMEOUT';
      const userFacingMsg = isTelegramTimeout
        ? `⏱️ This took longer than Telegram allows (25s limit).\n\nFor long essays, please use the web app — it handles long generation without time limits.`
        : agentErr.message?.includes('API error')
          ? `⚠️ AI provider returned an error. The provider (${provider.name}) may be temporarily unavailable. Your message was saved — try again shortly.`
          : `⚠️ Something went wrong processing your message. Error: ${(agentErr.message || 'Unknown').substring(0, 200)}`;
      
      const errorSendResult = await sendTelegramMessage(botToken!, chatId, userFacingMsg, 'Markdown', db, user.id);
      responseSent = errorSendResult.success;
      
      if (!errorSendResult.success) {
        console.error(`[CRITICAL] Error message failed to send to Telegram for user ${user.id}:`, errorSendResult.errors);
      }
      
      try {
        const { logError } = await import('../../services/llm/provider');
        await logError(db, user.id, 'telegram', isTelegramTimeout ? 'timeout' : 'agent_error', agentErr.message || 'Agent error', { provider: provider.name });
      } catch (_) {}
    }
  } catch (err: any) {
    console.error('Telegram webhook error:', err);
    try {
      const { logError } = await import('../../services/llm/provider');
      await logError(db, null, 'telegram', 'webhook_error', err.message || 'Unknown telegram error');
    } catch (_) {}
  }
  }; // end processUpdate

  c.executionCtx.waitUntil(processUpdate());
  return c.json({ ok: true });
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
  
  // Answer the callback query with proper error handling
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: queryId,
        text: newChecked ? '✅ Checked!' : '☐ Unchecked',
      }),
    });
    if (!res.ok) {
      console.warn(`[callback answer] Failed to answer callback: HTTP ${res.status}`);
    }
  } catch (e: any) {
    console.warn(`[callback answer] Error answering callback: ${e.message}`);
  }
  
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
