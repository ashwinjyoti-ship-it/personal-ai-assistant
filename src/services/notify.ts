// Outbound push notifications via Ntfy (+ always in-app bell)

import { decrypt } from './crypto';

const NTFY_TIMEOUT_MS = 15_000;

const PRIORITY_MAP: Record<string, string> = {
  urgent: '5',
  high: '4',
  default: '3',
  low: '2',
  min: '1',
};

export async function sendNotification(
  db: D1Database,
  userId: number,
  title: string,
  body: string,
  options?: {
    priority?: 'urgent' | 'high' | 'default' | 'low' | 'min';
    tags?: string[];
    pinHash?: string;
    /** Links bell notifications to a cron job (e.g. `cron:42`) for Done/Snooze actions */
    source?: string;
    type?: 'info' | 'reminder' | 'mail' | 'calendar' | 'error' | 'system';
  }
): Promise<{ sent: boolean; channel: string }> {
  const notifType = options?.type || 'info';
  const notifSource = options?.source || 'ntfy';
  try {
    await db.prepare(
      `INSERT INTO notifications (user_id, type, title, body, source, is_read)
       VALUES (?, ?, ?, ?, ?, 0)`
    ).bind(userId, notifType, title, body, notifSource).run();
  } catch (err: any) {
    console.warn('[sendNotification] in-app insert failed:', userId, err?.message);
  }

  let pinHash = options?.pinHash;
  if (!pinHash) {
    const userRow = await db.prepare(
      'SELECT pin_hash FROM users WHERE id = ?'
    ).bind(userId).first<{ pin_hash: string }>();
    pinHash = userRow?.pin_hash;
  }
  if (!pinHash) {
    return { sent: true, channel: 'in-app' };
  }

  let ntfyUrl: string | undefined;
  let ntfyToken: string | undefined;

  try {
    const urlCred = await db.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(userId, 'ntfy_url').first<{ encrypted_value: string }>();
    if (urlCred) {
      const raw = (await decrypt(urlCred.encrypted_value, pinHash)).trim();
      ntfyUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    }

    const tokenCred = await db.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(userId, 'ntfy_token').first<{ encrypted_value: string }>();
    if (tokenCred) {
      ntfyToken = (await decrypt(tokenCred.encrypted_value, pinHash)).trim();
    }
  } catch (err: any) {
    console.warn('[sendNotification] credential decrypt failed:', userId, err?.message);
    return { sent: true, channel: 'in-app' };
  }

  if (!ntfyUrl) {
    return { sent: true, channel: 'in-app' };
  }

  const priority = PRIORITY_MAP[options?.priority || 'default'] || '3';
  const tags = (options?.tags || ['bell', 'karna']).join(',');

  // HTTP headers require Latin-1 (byte range 0–255); emoji/wide Unicode in
  // the Title header throws a ByteString error in fetch.  Strip them here —
  // the full title (with emoji) is already in the message body.
  const headerTitle = title.replace(/[^\x00-\xff]/g, '').trim() || 'Karna Notification';

  const headers: Record<string, string> = {
    Title: headerTitle,
    Priority: priority,
    Tags: tags,
    'Content-Type': 'text/plain',
  };
  if (ntfyToken) {
    headers.Authorization = `Bearer ${ntfyToken}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NTFY_TIMEOUT_MS);

  try {
    const res = await fetch(ntfyUrl, {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const detail = `HTTP ${res.status} from ${ntfyUrl}`;
      console.warn(`[sendNotification] ntfy ${detail} for user ${userId} — check ntfy_url/ntfy_token credentials`);
      return { sent: true, channel: 'ntfy-failed', error: detail };
    }
    return { sent: true, channel: 'ntfy' };
  } catch (err: any) {
    clearTimeout(timer);
    const detail = err?.message || String(err);
    console.warn(`[sendNotification] ntfy push failed for user ${userId}: ${detail}`);
    return { sent: true, channel: 'ntfy-failed', error: detail };
  }
}
