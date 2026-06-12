import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GmailService } from '../gmail';

vi.mock('../google', () => ({
  getGoogleAuth: vi.fn().mockResolvedValue({ token: 'test-token', email: 'user@example.com' }),
}));

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

function mockDb(): D1Database {
  return {} as D1Database;
}

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
