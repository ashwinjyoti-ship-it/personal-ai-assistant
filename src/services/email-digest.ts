import type { UserRecord } from '../types';
import { GmailService } from './gmail';
import { decrypt } from './crypto';
import { runBrowserTask } from './browser';

export interface EmailDigestResult {
  gmail: string[];
  outlook: string[];
  outlookStatus: 'ok' | 'not_configured' | 'no_api_key' | 'no_content' | 'timeout' | 'error';
  outlookTaskId?: string;
}

export async function buildEmailDigest(
  db: D1Database,
  user: UserRecord,
  env: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string }
): Promise<EmailDigestResult> {
  const gmail: string[] = [];
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    try {
      const service = new GmailService(db, user.id, user.pin_hash, env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
      const messages = await service.listMessages({ query: 'newer_than:7d (is:unread OR is:important)', maxResults: 8 });
      for (const m of messages) {
        gmail.push(`${m.from || 'Unknown'} — ${m.subject || '(no subject)'}${m.snippet ? ': ' + m.snippet : ''}`);
      }
      if (messages.length === 0) gmail.push('No unread or important Gmail messages found.');
    } catch (err: any) {
      gmail.push(`Gmail unavailable: ${err.message || 'connect Google in Settings.'}`);
    }
  } else {
    gmail.push('Gmail unavailable: Google OAuth is not configured.');
  }

  const outlook = await buildOutlookDigest(db, user);
  return { gmail, ...outlook };
}

export async function buildOutlookDigest(
  db: D1Database,
  user: UserRecord
): Promise<Omit<EmailDigestResult, 'gmail'>> {
  const buCred = await db.prepare(
    `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'`
  ).bind(user.id).first<{ encrypted_value: string }>().catch(() => null);
  if (!buCred) {
    return { outlook: ['No Browser Use API key configured. Add it in Settings -> API Keys.'], outlookStatus: 'no_api_key' };
  }

  const vault = await findOutlookVaultEntry(db, user);
  if (!vault) {
    return { outlook: ['No Outlook credentials saved in Secret Vault. Add them in Settings -> Secret Vault.'], outlookStatus: 'not_configured' };
  }

  try {
    const apiKey = (await decrypt(buCred.encrypted_value, user.pin_hash)).trim();
    const cred = JSON.parse(await decrypt(vault.encrypted_blob, user.pin_hash));
    const task = buildOutlookDigestTask();
    const result = await runBrowserTask(task, apiKey, {
      secrets: { username: cred.username, password: cred.password },
      sessionId: cred.sessionId,
      timeoutMs: 88000,
    });
    if (result.sessionId) await saveVaultSession(db, user, vault.id, result.sessionId);
    if (result.status === 'timeout') {
      return { outlook: [`Outlook browser task is still running. Task ID: ${result.taskId}`], outlookStatus: 'timeout', outlookTaskId: result.taskId };
    }
    if (result.status !== 'completed') {
      return { outlook: [`Outlook browser task failed: ${result.error || 'no details returned.'}`], outlookStatus: 'error', outlookTaskId: result.taskId };
    }
    if (!result.output?.trim()) {
      return { outlook: ['Outlook returned no content.'], outlookStatus: 'no_content', outlookTaskId: result.taskId };
    }
    return { outlook: result.output.split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 12), outlookStatus: 'ok', outlookTaskId: result.taskId };
  } catch (err: any) {
    return { outlook: [`Outlook digest error: ${err.message || 'unknown error'}`], outlookStatus: 'error' };
  }
}

export function buildOutlookDigestTask(): string {
  return `Open Outlook on the web at https://outlook.office.com/mail/. This is one complete workflow. If login is requested, use username {username} and password {password}. Inspect the recent and unread Inbox messages only. Return structured plain text lines with sender, subject, date if visible, short snippet, action_needed yes/no, and priority low/normal/high. Do not guess. If no messages or no readable content is visible, return exactly: Outlook returned no content.`;
}

async function findOutlookVaultEntry(db: D1Database, user: UserRecord): Promise<{ id: number; name: string; encrypted_blob: string } | null> {
  const names = ['Outlook', 'Microsoft', 'Office 365', 'Office365'];
  for (const name of names) {
    const row = await db.prepare(
      `SELECT id, name, encrypted_blob FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE ORDER BY updated_at DESC LIMIT 1`
    ).bind(user.id, `%${name}%`).first<{ id: number; name: string; encrypted_blob: string }>().catch(() => null);
    if (row) return row;
  }
  return null;
}

async function saveVaultSession(db: D1Database, user: UserRecord, vaultId: number, sessionId: string): Promise<void> {
  try {
    const { encrypt } = await import('./crypto');
    const row = await db.prepare(
      `SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?`
    ).bind(vaultId, user.id).first<{ encrypted_blob: string }>();
    if (!row) return;
    const data = JSON.parse(await decrypt(row.encrypted_blob, user.pin_hash));
    data.sessionId = sessionId;
    const encrypted = await encrypt(JSON.stringify(data), user.pin_hash);
    await db.prepare(`UPDATE site_credentials SET encrypted_blob = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`)
      .bind(encrypted, vaultId, user.id).run();
  } catch { /* non-critical */ }
}
