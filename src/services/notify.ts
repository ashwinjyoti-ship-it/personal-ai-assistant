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
  }
): Promise<{ sent: boolean; channel: string }> {
  try {
    await db.prepare(
      `INSERT INTO notifications (user_id, type, title, body, source)
       VALUES (?, 'info', ?, ?, 'ntfy')`
    ).bind(userId, title, body).run();
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
      ntfyUrl = (await decrypt(urlCred.encrypted_value, pinHash)).trim();
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

  const headers: Record<string, string> = {
    Title: title,
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
      console.warn(`[sendNotification] ntfy HTTP ${res.status} for user ${userId} — check ntfy_url/ntfy_token credentials`);
      return { sent: true, channel: 'ntfy-failed' };
    }
    return { sent: true, channel: 'ntfy' };
  } catch (err: any) {
    clearTimeout(timer);
    console.warn(`[sendNotification] ntfy push failed for user ${userId}: ${err?.message || String(err)}`);
    return { sent: true, channel: 'ntfy-failed' };
  }
}
