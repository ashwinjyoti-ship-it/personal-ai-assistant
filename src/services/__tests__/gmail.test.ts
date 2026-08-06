import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GmailService,
  extractEmailBody,
  formatPurchaseGmailSearchResponse,
  buildRawMimeMessage,
  GMAIL_MAX_ATTACHMENT_BYTES,
  type GmailMessage,
} from '../gmail';

function b64url(text: string): string {
  return btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

vi.mock('../google', () => ({
  getGoogleAuth: vi.fn().mockResolvedValue({ token: 'test-token', email: 'user@example.com' }),
}));

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

function mockDb(): D1Database {
  return {} as D1Database;
}

describe('extractEmailBody', () => {
  it('prefers HTML product details when plain text is sparse (retailer emails)', () => {
    const payload = {
      mimeType: 'multipart/alternative',
      parts: [
        {
          mimeType: 'text/plain',
          body: { data: b64url('Your Amazon package was delivered. Track at amazon.in') },
        },
        {
          mimeType: 'text/html',
          body: {
            data: b64url(
              '<html><body><p>Your package was delivered.</p>' +
              '<img alt="ACME Reading Glasses +2.00" />' +
              '<table><tr><td>Reading Glasses</td><td>Qty 1</td></tr></table></body></html>'
            ),
          },
        },
      ],
    };

    const text = extractEmailBody(payload);
    expect(text).toContain('Reading Glasses');
    expect(text).toContain('ACME Reading Glasses +2.00');
  });
});

describe('GmailService.listMessages', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('throws when list finds messages but all metadata fetches fail', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith(`${GMAIL_BASE}/messages?`)) {
        return new Response(JSON.stringify({
          messages: [{ id: 'msg-1', threadId: 'thr-1' }, { id: 'msg-2', threadId: 'thr-1' }],
          resultSizeEstimate: 2,
        }), { status: 200 });
      }
      if (url.includes('/messages/msg-')) {
        return new Response('{"error":{"code":403,"message":"Insufficient Permission"}}', { status: 403 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const gmail = new GmailService(mockDb(), 1, 'pin-hash', 'client-id', 'client-secret');

    await expect(gmail.listMessages({ query: 'from:boss', maxResults: 10 })).rejects.toThrow(
      /could not read message details/i
    );
  });

  it('returns messages with received date from internalDate when Date header missing', async () => {
    const internalDate = '1717200000000'; // 2024-06-01T00:00:00.000Z

    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith(`${GMAIL_BASE}/messages?`)) {
        return new Response(JSON.stringify({
          messages: [{ id: 'msg-1', threadId: 'thr-1' }],
          resultSizeEstimate: 1,
        }), { status: 200 });
      }
      if (url.includes('/messages/msg-1')) {
        return new Response(JSON.stringify({
          id: 'msg-1',
          threadId: 'thr-1',
          snippet: 'Hello',
          labelIds: ['INBOX'],
          internalDate,
          payload: { headers: [{ name: 'Subject', value: 'Test' }, { name: 'From', value: 'a@b.com' }] },
        }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const gmail = new GmailService(mockDb(), 1, 'pin-hash', 'client-id', 'client-secret');
    const messages = await gmail.listMessages({ query: 'subject:Test' });

    expect(messages).toHaveLength(1);
    expect(messages[0].date).toBe(new Date(Number(internalDate)).toISOString());
    expect(messages[0].subject).toBe('Test');
  });
});

describe('buildRawMimeMessage', () => {
  it('builds single-part HTML when there are no attachments', () => {
    const raw = buildRawMimeMessage('a@b.com', 'Hello', 'Hi **there**');
    expect(raw).toContain('To: a@b.com');
    expect(raw).toContain('Subject: Hello');
    expect(raw).toContain('Content-Type: text/html; charset=UTF-8');
    expect(raw).not.toContain('multipart/mixed');
    expect(raw).toContain('<strong>there</strong>');
  });

  it('builds multipart/mixed with base64 attachment parts', () => {
    const bytes = new TextEncoder().encode('PDF-BYTES');
    const raw = buildRawMimeMessage('a@b.com', 'Report', 'See attached', {
      cc: 'c@d.com',
      attachments: [{ filename: 'report.pdf', mimeType: 'application/pdf', data: bytes }],
    });
    expect(raw).toContain('multipart/mixed; boundary=');
    expect(raw).toContain('Cc: c@d.com');
    expect(raw).toContain('Content-Disposition: attachment; filename="report.pdf"');
    expect(raw).toContain('Content-Type: application/pdf; name="report.pdf"');
    expect(raw).toContain('Content-Transfer-Encoding: base64');
    expect(raw).toContain(btoa('PDF-BYTES').slice(0, 8));
    expect(raw).toMatch(/--karna_[\w]+--/);
  });

  it('rejects oversized attachments with a clear error', () => {
    const huge = new Uint8Array(GMAIL_MAX_ATTACHMENT_BYTES + 1);
    expect(() =>
      buildRawMimeMessage('a@b.com', 'Big', 'body', {
        attachments: [{ filename: 'big.bin', mimeType: 'application/octet-stream', data: huge }],
      })
    ).toThrow(/Attachments total|under ~12MB|Drive link/i);
  });

  it('encodes multi-kilobyte attachments without throwing', () => {
    const bytes = new Uint8Array(64 * 1024);
    for (let i = 0; i < bytes.length; i++) bytes[i] = i % 256;
    const raw = buildRawMimeMessage('a@b.com', 'Bulk', 'body', {
      attachments: [{ filename: 'chunk.bin', mimeType: 'application/octet-stream', data: bytes }],
    });
    expect(raw).toContain('filename="chunk.bin"');
    expect(raw.length).toBeGreaterThan(80_000);
  });

  it('sanitizes unsafe filenames', () => {
    const raw = buildRawMimeMessage('a@b.com', 'F', 'b', {
      attachments: [{
        filename: 'evil\r\n"name".pdf',
        mimeType: 'application/pdf',
        data: new Uint8Array([1, 2, 3]),
      }],
    });
    expect(raw).toContain('filename="evil___name_.pdf"');
    expect(raw).not.toContain('evil\r\n');
  });
});

describe('GmailService.send with attachments', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('posts multipart raw payload to messages/send', async () => {
    let sentBody: any = null;
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/messages/send')) {
        sentBody = JSON.parse(String(init?.body || '{}'));
        return new Response(JSON.stringify({ id: 'm1', threadId: 't1', labelIds: ['SENT'] }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const gmail = new GmailService(mockDb(), 1, 'pin-hash', 'client-id', 'client-secret');
    const result = await gmail.send('to@x.com', 'Subj', 'Body text', {
      attachments: [{ filename: 'note.txt', mimeType: 'text/plain', data: new TextEncoder().encode('hi') }],
    });

    expect(result.id).toBe('m1');
    expect(sentBody.raw).toBeTruthy();
    const decoded = atob(sentBody.raw.replace(/-/g, '+').replace(/_/g, '/'));
    expect(decoded).toContain('multipart/mixed');
    expect(decoded).toContain('filename="note.txt"');
  });
});

describe('formatPurchaseGmailSearchResponse', () => {
  const base = (overrides: Partial<GmailMessage>): GmailMessage => ({
    id: '1',
    threadId: 't1',
    snippet: '',
    subject: '',
    from: 'shop@example.com',
    to: 'me@example.com',
    date: 'Mon, 3 Jun 2024 10:00:00 +0000',
    isUnread: false,
    labels: [],
    ...overrides,
  });

  it('prioritizes order confirmation over delivery email', () => {
    const messages = [
      base({
        id: 'del',
        subject: 'Your package was delivered',
        snippet: 'Delivered to your door',
      }),
      base({
        id: 'ord',
        subject: 'Your Amazon.in order of Reading Glasses',
        snippet: 'Thank you for your order. Reading Glasses qty 1',
      }),
    ];
    const text = formatPurchaseGmailSearchResponse(messages, 'reading glasses', 'test query');
    expect(text).toContain('Date received: Mon, 3 Jun 2024');
    expect(text).toContain('Reading Glasses');
    expect(text.indexOf('Reading Glasses')).toBeLessThan(text.indexOf('delivered'));
  });
});
