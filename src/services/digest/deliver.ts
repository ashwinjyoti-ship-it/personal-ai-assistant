// Digest delivery: one function that pushes a digest to whichever channels the
// user has configured, and records which actually succeeded in
// `digests.delivered_channels`.
//
// This replaces the old split where evening went via sendNotification only,
// while a separate sendTelegramBriefing (with inline keyboard) was only used on
// manual resend. Now any digest with items gets the inline keyboard on
// Telegram automatically.

import { logError, logWarn } from '../../utils/logger';
import { decrypt } from '../crypto';
import { sendNotification } from '../notify';
import type { DeliveryChannel, DigestContent, DigestItem, DigestKind } from '../../types';
import { buildDigestKeyboard, formatDigestPreview, formatDigestText } from './format';

const TG_FETCH_TIMEOUT_MS = 10_000;

async function tgFetch(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TG_FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal as RequestInit['signal'] });
  } finally {
    clearTimeout(t);
  }
}

export interface DeliverOptions {
  userId: number;
  pinHash: string;
  telegramChatId?: string;
  kind: DigestKind;
  scheduleTime: string;
  channels: DeliveryChannel[];
}

export interface DeliverResult {
  deliveredChannels: DeliveryChannel[];
  digestId?: number;
}

/**
 * Deliver a digest to all configured channels. Returns the channels that
 * actually succeeded. Caller persists this into digests.delivered_channels.
 */
export async function deliverDigest(
  db: D1Database,
  content: DigestContent,
  items: DigestItem[],
  digestId: number,
  opts: DeliverOptions,
): Promise<DeliverResult> {
  const delivered: DeliveryChannel[] = [];
  const text = formatDigestText(content, { kind: opts.kind, scheduleTime: opts.scheduleTime });
  const preview = formatDigestPreview(content, {
    kind: opts.kind,
    scheduleTime: opts.scheduleTime,
  });

  // The in-app bell is always written for 'web', since sendNotification always
  // inserts a notifications row (the in-app bell) regardless of ntfy success.
  const wantsWeb = opts.channels.includes('web');
  const wantsNtfy = opts.channels.includes('ntfy');
  const wantsTelegram = opts.channels.includes('telegram');

  if (wantsWeb || wantsNtfy) {
    try {
      await sendNotification(db, opts.userId, preview, text, {
        pinHash: opts.pinHash,
        tags: ['digest', 'karna'],
      });
      if (wantsWeb) delivered.push('web');
      if (wantsNtfy) delivered.push('ntfy');
    } catch (err: any) {
      logWarn('deliverDigest: notify failed', { userId: opts.userId, error: err?.message });
      // The in-app bell row is still inserted by sendNotification even on ntfy
      // failure, so count web as delivered if it was requested.
      if (wantsWeb) delivered.push('web');
    }
  }

  if (wantsTelegram && opts.telegramChatId) {
    const ok = await sendTelegramDigest(db, opts, text, items, digestId);
    if (ok) delivered.push('telegram');
  }

  return { deliveredChannels: delivered, digestId };
}

async function sendTelegramDigest(
  db: D1Database,
  opts: DeliverOptions,
  text: string,
  items: DigestItem[],
  digestId: number,
): Promise<boolean> {
  try {
    const botTokenCred = await db
      .prepare(
        `SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`,
      )
      .bind(opts.userId)
      .first<{ encrypted_value: string; pin_hash: string }>();
    if (!botTokenCred) return false;

    const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
    if (!botToken?.trim()) {
      logWarn('sendTelegramDigest: empty bot token', { userId: opts.userId });
      return false;
    }

    const keyboard = buildDigestKeyboard(items, digestId);
    const body: Record<string, unknown> = {
      chat_id: opts.telegramChatId,
      text: text.substring(0, 4000),
      parse_mode: 'Markdown',
    };
    if (keyboard.length > 0) {
      body.reply_markup = { inline_keyboard: keyboard };
    }

    const tgRes = await tgFetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const tgJson = (await tgRes.json()) as { ok: boolean; description?: string };
    if (tgJson.ok) return true;

    // Markdown parse failed — retry as plain text, stripping markdown chars.
    const retryBody: Record<string, unknown> = {
      chat_id: opts.telegramChatId,
      text: String(body.text).replace(/[_*[`\]]/g, ''),
    };
    if (keyboard.length > 0) {
      retryBody.reply_markup = { inline_keyboard: keyboard };
    }
    const tgRetry = await tgFetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(retryBody),
    });
    const retryJson = (await tgRetry.json()) as { ok: boolean; description?: string };
    if (!retryJson.ok) {
      logError('Telegram digest send failed', {
        description: retryJson.description,
        chatId: opts.telegramChatId,
      });
      return false;
    }
    return true;
  } catch (err: any) {
    logError('Telegram digest error', { error: err?.message || String(err) });
    return false;
  }
}
