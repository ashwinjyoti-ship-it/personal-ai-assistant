// Gmail API Service — Native Gmail integration via Google OAuth
// No browser automation needed — direct REST API calls
// Scopes already included in google.ts OAuth flow:
//   gmail.readonly, gmail.send, gmail.compose, gmail.modify

import { getGoogleAuth } from './google';

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

function formatGmailDate(dateHeader: string, internalDate?: string): string {
  if (dateHeader) return dateHeader;
  const ms = internalDate ? parseInt(internalDate, 10) : NaN;
  if (!Number.isNaN(ms) && ms > 0) return new Date(ms).toISOString();
  return '';
}

function gmailAccessErrorMessage(status: number, errBody: string): string {
  if (status === 403) {
    return 'Gmail access denied (403). Reconnect your Google account in Settings → Keys → Google Workspace to grant Gmail permissions.';
  }
  return `Gmail list failed (${status}): ${errBody.substring(0, 200)}`;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  isUnread: boolean;
  labels: string[];
  body?: string;
}

export interface GmailSendResult {
  id: string;
  threadId: string;
  labelIds: string[];
}

/** Binary attachment for gmail_send / gmail_draft (from uploaded_files). */
export interface GmailAttachment {
  filename: string;
  mimeType: string;
  data: Uint8Array;
}

/**
 * Raw attachment budget. Gmail allows ~25MB encoded; MIME + base64url + JSON
 * multiplies memory (~4×), so stay well under a 128MB Worker isolate.
 */
export const GMAIL_MAX_ATTACHMENT_BYTES = 12 * 1024 * 1024;

export class GmailService {
  constructor(
    private db: D1Database,
    private userId: number,
    private pinHash: string,
    private clientId: string,
    private clientSecret: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash, this.clientId, this.clientSecret);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // List messages from inbox
  async listMessages(options: {
    query?: string;
    maxResults?: number;
    labelIds?: string[];
  } = {}): Promise<GmailMessage[]> {
    const headers = await this.authHeaders();
    const params = new URLSearchParams();
    
    params.set('maxResults', String(options.maxResults || 10));
    if (options.query) params.set('q', options.query);
    if (options.labelIds?.length) {
      for (const label of options.labelIds) {
        params.append('labelIds', label);
      }
    }

    const res = await fetch(`${GMAIL_BASE}/messages?${params}`, { headers });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(gmailAccessErrorMessage(res.status, err));
    }

    const data = await res.json() as { messages?: { id: string; threadId: string }[]; resultSizeEstimate?: number };
    if (!data.messages || data.messages.length === 0) return [];

    // Fetch full details for each message (batch)
    const messages: GmailMessage[] = [];
    let metadataFailures = 0;
    for (const msg of data.messages.slice(0, options.maxResults || 10)) {
      try {
        const detail = await this.getMessage(msg.id, headers);
        if (detail) messages.push(detail);
        else metadataFailures++;
      } catch {
        metadataFailures++;
        // Skip messages that fail to load
      }
    }
    if (messages.length === 0 && metadataFailures > 0) {
      throw new Error(
        `Gmail found ${data.messages.length} matching message(s) but could not read message details (${metadataFailures} metadata fetch failure(s)). ` +
        'Reconnect Google in Settings → Keys → Google Workspace to refresh Gmail permissions, then try again.'
      );
    }

    return messages;
  }

  // Get a single message by ID
  async getMessage(messageId: string, existingHeaders?: Record<string, string>): Promise<GmailMessage | null> {
    const headers = existingHeaders || await this.authHeaders();
    
    const res = await fetch(
      `${GMAIL_BASE}/messages/${messageId}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
      { headers }
    );

    if (!res.ok) return null;

    const data = await res.json() as {
      id: string;
      threadId: string;
      snippet: string;
      labelIds: string[];
      payload: {
        headers: { name: string; value: string }[];
      };
      internalDate: string;
    };

    const getHeader = (name: string) => 
      data.payload?.headers?.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    return {
      id: data.id,
      threadId: data.threadId,
      snippet: data.snippet || '',
      subject: getHeader('Subject') || '(no subject)',
      from: getHeader('From'),
      to: getHeader('To'),
      date: formatGmailDate(getHeader('Date'), data.internalDate),
      isUnread: (data.labelIds || []).includes('UNREAD'),
      labels: data.labelIds || [],
    };
  }

  // Get full message body (text/plain or text/html decoded)
  async getMessageBody(messageId: string): Promise<string> {
    const headers = await this.authHeaders();
    
    const res = await fetch(
      `${GMAIL_BASE}/messages/${messageId}?format=full`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail message body failed (${res.status}): ${err.substring(0, 200)}`);
    }

    const data = await res.json() as any;
    return extractBody(data.payload);
  }

  // Search Gmail with query
  async search(query: string, maxResults = 10): Promise<GmailMessage[]> {
    return this.listMessages({ query, maxResults });
  }

  // Send an email (optional attachments via uploaded file bytes)
  async send(to: string, subject: string, body: string, options: {
    cc?: string;
    bcc?: string;
    replyToMessageId?: string;
    threadId?: string;
    attachments?: GmailAttachment[];
  } = {}): Promise<GmailSendResult> {
    const headers = await this.authHeaders();

    const rawMessage = buildRawMimeMessage(to, subject, body, {
      cc: options.cc,
      bcc: options.bcc,
      replyToMessageId: options.replyToMessageId,
      attachments: options.attachments,
    });
    const encoded = encodeBase64Url(rawMessage);

    const sendBody: Record<string, string> = { raw: encoded };
    if (options.threadId) sendBody.threadId = options.threadId;

    const res = await fetch(`${GMAIL_BASE}/messages/send`, {
      method: 'POST',
      headers,
      body: JSON.stringify(sendBody),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail send failed (${res.status}): ${err.substring(0, 200)}`);
    }

    return await res.json() as GmailSendResult;
  }

  // Create a draft (optional attachments via uploaded file bytes)
  async createDraft(to: string, subject: string, body: string, options: {
    cc?: string;
    attachments?: GmailAttachment[];
  } = {}): Promise<{ id: string; message: { id: string } }> {
    const headers = await this.authHeaders();

    const rawMessage = buildRawMimeMessage(to, subject, body, {
      cc: options.cc,
      attachments: options.attachments,
    });
    const encoded = encodeBase64Url(rawMessage);

    const res = await fetch(`${GMAIL_BASE}/drafts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: { raw: encoded } }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail draft failed (${res.status}): ${err.substring(0, 200)}`);
    }

    return await res.json() as { id: string; message: { id: string } };
  }

  // Mark message as read
  async markAsRead(messageId: string): Promise<void> {
    const headers = await this.authHeaders();
    await fetch(`${GMAIL_BASE}/messages/${messageId}/modify`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ removeLabelIds: ['UNREAD'] }),
    });
  }

  // Modify message labels (archive, trash, mark read)
  async modifyMessage(messageId: string, action: 'archive' | 'trash' | 'read' | 'unread' | 'star' | 'unstar'): Promise<boolean> {
    const headers = await this.authHeaders();
    let body = {};
    
    switch (action) {
      case 'archive':
        body = { removeLabelIds: ['INBOX'] };
        break;
      case 'trash':
        body = { addLabelIds: ['TRASH'] };
        break;
      case 'read':
        body = { removeLabelIds: ['UNREAD'] };
        break;
      case 'unread':
        body = { addLabelIds: ['UNREAD'] };
        break;
      case 'star':
        body = { addLabelIds: ['STARRED'] };
        break;
      case 'unstar':
        body = { removeLabelIds: ['STARRED'] };
        break;
    }

    const res = await fetch(`${GMAIL_BASE}/messages/${messageId}/modify`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to modify message: ${err}`);
    }
    return true;
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const headers = await this.authHeaders();
    const res = await fetch(`${GMAIL_BASE}/labels/INBOX`, { headers });
    if (!res.ok) return 0;
    const data = await res.json() as { messagesUnread?: number };
    return data.messagesUnread || 0;
  }

  // Get user's email address  
  async getProfile(): Promise<{ email: string; messagesTotal: number; threadsTotal: number }> {
    const headers = await this.authHeaders();
    const res = await fetch(`${GMAIL_BASE}/profile`, { headers });
    if (!res.ok) throw new Error('Failed to get Gmail profile');
    return await res.json() as { email: string; messagesTotal: number; threadsTotal: number };
  }
}

function collectMimeParts(payload: any): { plain: string; html: string } {
  let plain = '';
  let html = '';

  function walk(part: any): void {
    if (!part) return;
    if (part.mimeType === 'text/plain' && part.body?.data) {
      plain += decodeBase64Url(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      html += decodeBase64Url(part.body.data);
    } else if (part.parts?.length) {
      for (const child of part.parts) walk(child);
    } else if (part.body?.data && !part.parts) {
      const raw = decodeBase64Url(part.body.data);
      if (part.mimeType === 'text/html') html += raw;
      else plain += raw;
    }
  }

  walk(payload);
  return { plain: plain.trim(), html: html.trim() };
}

/** Exported for unit tests — extracts readable text from a Gmail API message payload. */
export function extractEmailBody(payload: unknown): string {
  return extractBody(payload as any);
}

// Helper: extract text body from Gmail message payload
function extractBody(payload: any): string {
  if (!payload) return '';

  if (payload.body?.data && !payload.parts?.length) {
    const raw = decodeBase64Url(payload.body.data);
    return payload.mimeType === 'text/html' ? stripHtml(raw) : raw;
  }

  const { plain, html } = collectMimeParts(payload);
  const htmlText = html ? stripHtml(html) : '';

  if (plain && htmlText) {
    // Retailer emails (Amazon, etc.) often ship a sparse text/plain part and
    // put product names in the HTML (tables, image alt text).
    if (plain.length < 200 && htmlText.length > plain.length) return htmlText;
    return plain.length >= htmlText.length ? plain : htmlText;
  }

  return plain || htmlText || payload.snippet || '';
}

function sanitizeMimeFilename(name: string): string {
  const cleaned = String(name || 'attachment')
    .replace(/[\r\n"\\]/g, '_')
    .replace(/[^\x20-\x7E]/g, '_')
    .trim();
  return cleaned.slice(0, 180) || 'attachment';
}

function bytesToBinaryString(bytes: Uint8Array): string {
  // Avoid String.fromCharCode(...spread) — large spreads blow the call stack.
  const CHUNK = 0x8000;
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, i + CHUNK);
    let part = '';
    for (let j = 0; j < slice.length; j++) part += String.fromCharCode(slice[j]);
    parts.push(part);
  }
  return parts.join('');
}

function encodeBase64Lines(bytes: Uint8Array): string {
  const b64 = typeof Buffer !== 'undefined'
    ? Buffer.from(bytes).toString('base64')
    : btoa(bytesToBinaryString(bytes));
  const lines: string[] = [];
  for (let i = 0; i < b64.length; i += 76) {
    lines.push(b64.slice(i, i + 76));
  }
  return lines.join('\r\n');
}

/**
 * Build an RFC 2822 raw message. With attachments uses multipart/mixed;
 * without attachments keeps the previous single-part HTML shape.
 */
export function buildRawMimeMessage(
  to: string,
  subject: string,
  body: string,
  options: {
    cc?: string;
    bcc?: string;
    replyToMessageId?: string;
    attachments?: GmailAttachment[];
  } = {}
): string {
  const attachments = options.attachments || [];
  const totalBytes = attachments.reduce((n, a) => n + (a.data?.byteLength || 0), 0);
  if (totalBytes > GMAIL_MAX_ATTACHMENT_BYTES) {
    const mb = Math.max(1, Math.round(totalBytes / (1024 * 1024)));
    throw new Error(
      `Attachments total ~${mb}MB — keep under ${Math.round(GMAIL_MAX_ATTACHMENT_BYTES / (1024 * 1024))}MB (Gmail encoded limit ~25MB). Remove or shrink files, or share a Drive link.`
    );
  }

  const html = convertBodyToHtml(body);
  const headerLines: string[] = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
  ];
  if (options.cc) headerLines.push(`Cc: ${options.cc}`);
  if (options.bcc) headerLines.push(`Bcc: ${options.bcc}`);
  if (options.replyToMessageId) {
    headerLines.push(`In-Reply-To: ${options.replyToMessageId}`);
    headerLines.push(`References: ${options.replyToMessageId}`);
  }

  if (attachments.length === 0) {
    headerLines.push('Content-Type: text/html; charset=UTF-8');
    return [...headerLines, '', html].join('\r\n');
  }

  const boundary = `karna_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  headerLines.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

  const parts: string[] = [];
  parts.push(headerLines.join('\r\n'));
  parts.push('');
  parts.push(`--${boundary}`);
  parts.push('Content-Type: text/html; charset=UTF-8');
  parts.push('Content-Transfer-Encoding: base64');
  parts.push('');
  parts.push(encodeBase64Lines(new TextEncoder().encode(html)));

  for (const att of attachments) {
    const filename = sanitizeMimeFilename(att.filename);
    const mimeType = (att.mimeType || 'application/octet-stream').replace(/[\r\n]/g, '');
    parts.push(`--${boundary}`);
    parts.push(`Content-Type: ${mimeType}; name="${filename}"`);
    parts.push(`Content-Disposition: attachment; filename="${filename}"`);
    parts.push('Content-Transfer-Encoding: base64');
    parts.push('');
    parts.push(encodeBase64Lines(att.data));
  }

  parts.push(`--${boundary}--`);
  return parts.join('\r\n');
}

// Convert a plain-text/markdown-style email body to HTML for proper rendering in email clients.
function convertBodyToHtml(text: string): string {
  // LLMs sometimes emit literal \n escape sequences instead of real newlines
  text = text.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

  // Escape HTML special characters first
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold: **text** → <strong>text</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* → <em>text</em> (single asterisk, not double)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Split into blocks on double newlines
  const paragraphs = html.split(/\n\n+/);
  const htmlParts = paragraphs.map(para => {
    const lines = para.split('\n');

    // Detect unordered list block (every non-empty line starts with - or *)
    if (lines.every(l => /^\s*[-*]\s/.test(l) || l.trim() === '')) {
      const items = lines
        .filter(l => l.trim())
        .map(l => `<li>${l.replace(/^\s*[-*]\s+/, '')}</li>`)
        .join('');
      return `<ul>${items}</ul>`;
    }

    // Detect ordered list block (every non-empty line starts with N.)
    if (lines.every(l => /^\s*\d+\.\s/.test(l) || l.trim() === '')) {
      const items = lines
        .filter(l => l.trim())
        .map(l => `<li>${l.replace(/^\s*\d+\.\s+/, '')}</li>`)
        .join('');
      return `<ol>${items}</ol>`;
    }

    // Regular paragraph — join soft line breaks with <br>
    return `<p>${lines.join('<br>')}</p>`;
  });

  return `<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${htmlParts.join('')}</body></html>`;
}

// Encode a UTF-8 string as base64url (RFC 4648 §5).
function encodeBase64Url(text: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(text, 'utf8').toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  const bytes = new TextEncoder().encode(text);
  return btoa(bytesToBinaryString(bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodeBase64Url(data: string): string {
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  try {
    return decodeURIComponent(escape(atob(base64)));
  } catch {
    return atob(base64);
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi, '\n$1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/t[dh]>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function scorePurchaseEmailMatch(m: GmailMessage, product: string): number {
  const hay = `${m.subject} ${m.snippet} ${m.from}`.toLowerCase();
  const needle = product.toLowerCase();
  let score = 0;
  if (hay.includes(needle)) score += 10;
  for (const w of needle.split(/\s+/)) {
    if (w.length > 2 && hay.includes(w)) score += 3;
  }
  if (/\b(order|ordered|confirmation|invoice|receipt|thank you for your order)\b/i.test(`${m.subject} ${m.snippet}`)) {
    score += 6;
  }
  if (/\b(delivered|delivery|out for delivery|shipped|dispatch|dispatched|arriving)\b/i.test(m.subject)) {
    score -= 4;
  }
  return score;
}

function formatGmailSearchList(messages: GmailMessage[]): string {
  return messages.map((m, i) => {
    const unread = m.isUnread ? '● ' : '  ';
    return `${unread}${i + 1}. **${m.subject}**\n   From: ${m.from}\n   Date: ${m.date}\n   ${m.snippet}\n   [id: ${m.id}]`;
  }).join('\n\n');
}

/** Rank order confirmations above delivery notices for purchase lookups. */
export function formatPurchaseGmailSearchResponse(
  messages: GmailMessage[],
  product: string,
  searchQuery: string
): string {
  if (messages.length === 0) {
    return `No purchase-related emails found for "${product}" (query: ${searchQuery}).`;
  }
  const ranked = [...messages].sort(
    (a, b) => scorePurchaseEmailMatch(b, product) - scorePurchaseEmailMatch(a, product)
  );
  const best = ranked[0];
  const bestScore = scorePurchaseEmailMatch(best, product);

  if (bestScore > 0) {
    const header =
      `**Purchase email for "${product}"**\n\n` +
      `**${best.subject}**\n` +
      `Date received: ${best.date}\n` +
      `From: ${best.from}\n` +
      `Preview: ${best.snippet}\n\n`;
    const others = ranked.length > 1
      ? `Other related messages:\n\n${formatGmailSearchList(ranked.slice(1, 6))}`
      : '';
    return header + others;
  }

  return `No clear purchase confirmation for "${product}". Closest matches:\n\n${formatGmailSearchList(ranked.slice(0, 8))}`;
}
