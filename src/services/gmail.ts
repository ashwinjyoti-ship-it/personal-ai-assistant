// Gmail API Service — Native Gmail integration via Google OAuth
// No browser automation needed — direct REST API calls
// Scopes already included in google.ts OAuth flow:
//   gmail.readonly, gmail.send, gmail.compose, gmail.modify

import { getGoogleAuth } from './google';

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

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
      throw new Error(`Gmail list failed (${res.status}): ${err.substring(0, 200)}`);
    }

    const data = await res.json() as { messages?: { id: string; threadId: string }[]; resultSizeEstimate?: number };
    if (!data.messages || data.messages.length === 0) return [];

    // Fetch full details for each message (batch)
    const messages: GmailMessage[] = [];
    for (const msg of data.messages.slice(0, options.maxResults || 10)) {
      try {
        const detail = await this.getMessage(msg.id, headers);
        if (detail) messages.push(detail);
      } catch {
        // Skip messages that fail to load
      }
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
      date: getHeader('Date') || new Date(parseInt(data.internalDate)).toISOString(),
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

  // Send an email
  async send(to: string, subject: string, body: string, options: {
    cc?: string;
    bcc?: string;
    replyToMessageId?: string;
    threadId?: string;
  } = {}): Promise<GmailSendResult> {
    const headers = await this.authHeaders();

    // Build RFC 2822 email
    const lines: string[] = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
    ];
    if (options.cc) lines.push(`Cc: ${options.cc}`);
    if (options.bcc) lines.push(`Bcc: ${options.bcc}`);
    if (options.replyToMessageId) {
      lines.push(`In-Reply-To: ${options.replyToMessageId}`);
      lines.push(`References: ${options.replyToMessageId}`);
    }
    lines.push('', body);

    const rawMessage = lines.join('\r\n');
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

  // Create a draft
  async createDraft(to: string, subject: string, body: string, options: {
    cc?: string;
  } = {}): Promise<{ id: string; message: { id: string } }> {
    const headers = await this.authHeaders();

    const lines: string[] = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
    ];
    if (options.cc) lines.push(`Cc: ${options.cc}`);
    lines.push('', body);

    const rawMessage = lines.join('\r\n');
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

// Helper: extract text body from Gmail message payload
function extractBody(payload: any): string {
  if (!payload) return '';

  // Direct body (simple messages)
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  // Multipart — look for text/plain first, then text/html
  if (payload.parts) {
    // Try text/plain first
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    // Fallback to text/html (strip tags)
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        const html = decodeBase64Url(part.body.data);
        return stripHtml(html);
      }
    }
    // Nested multipart
    for (const part of payload.parts) {
      if (part.parts) {
        const nested = extractBody(part);
        if (nested) return nested;
      }
    }
  }

  return payload.snippet || '';
}

// Encode a UTF-8 string as base64url (RFC 4648 §5).
// Uses TextEncoder so it handles the full Unicode range without btoa() limitations.
function encodeBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
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
    .replace(/<br\s*\/?>/gi, '\n')
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
