// Telegram Channel — HTTP routes for Telegram Bot API (webhook setup, status)
// Update processing lives in telegram-processor.ts (shared with Render in Phase 3+)

import { Hono } from 'hono';
import type { AppEnv } from '../../types';
import { decrypt } from '../../services/crypto';
import {
  processTelegramUpdate,
  TELEGRAM_WEBHOOK_ALLOWED_UPDATES,
} from './telegram-processor';

const telegram = new Hono<AppEnv>();

/** Recommended webhook URL for the active backend (Render in split-architecture). */
export function resolveTelegramWebhookUrl(
  env: AppEnv['Bindings'],
  requestOrigin?: string,
): string {
  const base = (env.TELEGRAM_WEBHOOK_BASE_URL || env.API_BASE_URL || requestOrigin || '')
    .trim()
    .replace(/\/$/, '');
  if (!base) return '';
  return `${base}/api/telegram/webhook`;
}

function buildProcessorEnv(c: { env: AppEnv['Bindings'] }) {
  return {
    GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_API_KEY: c.env.GOOGLE_API_KEY,
    GOOGLE_CSE_ID: c.env.GOOGLE_CSE_ID,
    DOCUMENTS_BUCKET: c.env.DOCUMENTS_BUCKET,
    AI: c.env.AI,
    VECTORIZE: c.env.VECTORIZE,
    OUTLOOK_PLAYWRIGHT: c.env.OUTLOOK_PLAYWRIGHT,
  };
}

// Webhook endpoint — Telegram sends updates here
telegram.post('/webhook', async (c) => {
  let update: any;
  try {
    update = await c.req.json();
  } catch {
    return c.json({ ok: true });
  }

  const db = c.env.DB;
  const processorCtx = { db, env: buildProcessorEnv(c) };

  // Respond immediately; processing runs in waitUntil (Worker stays alive)
  c.executionCtx.waitUntil(processTelegramUpdate(update, processorCtx));
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

  const body = await c.req.json().catch(() => ({} as { webhook_url?: string; use_recommended?: boolean }));
  let webhook_url = body.webhook_url;
  if (body.use_recommended || webhook_url === 'recommended') {
    webhook_url = resolveTelegramWebhookUrl(c.env, new URL(c.req.url).origin);
    if (!webhook_url) {
      return c.json({ error: 'Backend webhook URL is not configured (set API_BASE_URL on Cloudflare Pages)' }, 400);
    }
  }

  const botTokenCred = await c.env.DB.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(session.user_id, 'telegram_bot_token').first<{ encrypted_value: string }>();

  if (!botTokenCred) {
    return c.json({ error: 'Telegram bot token not configured in Settings' }, 400);
  }

  const botToken = await decrypt(botTokenCred.encrypted_value, session.pin_hash);

  if (!webhook_url) {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drop_pending_updates: false }),
    });
    const result = await res.json();
    return c.json(result);
  }

  const res = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhook_url,
      allowed_updates: [...TELEGRAM_WEBHOOK_ALLOWED_UPDATES],
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
    const webhook_url = data.result?.url || '';
    const recommended_webhook_url = resolveTelegramWebhookUrl(c.env, new URL(c.req.url).origin);
    const normalizedCurrent = webhook_url.replace(/\/$/, '');
    const normalizedRecommended = recommended_webhook_url.replace(/\/$/, '');
    const needs_migration = Boolean(
      normalizedRecommended &&
      normalizedCurrent &&
      normalizedCurrent !== normalizedRecommended,
    );
    return c.json({
      configured: true,
      webhook_url,
      recommended_webhook_url,
      needs_migration,
      has_webhook: !!webhook_url,
      pending_updates: data.result?.pending_update_count || 0,
      last_error: data.result?.last_error_message || '',
      last_error_date: data.result?.last_error_date || null,
    });
  } catch (err: any) {
    return c.json({ configured: true, error: err.message });
  }
});

// Detect Chat ID — temporarily removes webhook, polls getUpdates, restores webhook
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
    const webhookInfoRes = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
    const webhookInfo = await webhookInfoRes.json() as any;
    const savedWebhookUrl = webhookInfo.result?.url || '';

    await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drop_pending_updates: false }),
    });

    await new Promise(r => setTimeout(r, 500));

    const updatesRes = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?limit=10&timeout=0`);
    const updatesData = await updatesRes.json() as any;

    if (savedWebhookUrl) {
      await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: savedWebhookUrl,
          allowed_updates: [...TELEGRAM_WEBHOOK_ALLOWED_UPDATES],
        }),
      });
    }

    const updates = updatesData.result || [];
    if (updates.length === 0) {
      return c.json({
        found: false,
        message: 'No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds.',
      });
    }

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
