import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isSessionLimitError,
  reapActiveBrowserSessions,
  listActiveBrowserSessions,
  createBrowserSession,
} from '../browser';

function res(status: number, body: unknown): Response {
  const text = typeof body === 'string' ? body : JSON.stringify(body);
  return new Response(text, { status, headers: { 'content-type': 'application/json' } });
}

describe('isSessionLimitError', () => {
  it('matches the concurrent-session limit message', () => {
    expect(isSessionLimitError(429, 'Too many concurrent active sessions')).toBe(true);
    expect(isSessionLimitError(402, '{"detail":"maximum number of sessions reached"}')).toBe(true);
  });
  it('ignores unrelated errors', () => {
    expect(isSessionLimitError(400, 'invalid task body')).toBe(false);
    expect(isSessionLimitError(500, 'internal error')).toBe(false);
    expect(isSessionLimitError(429, 'rate limit on tasks')).toBe(false); // no "session"
  });
});

describe('session reaping', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('lists active sessions', async () => {
    const fetchMock = vi.fn(async () => res(200, { items: [{ id: 'a' }, { id: 'b' }] }));
    vi.stubGlobal('fetch', fetchMock);
    const sessions = await listActiveBrowserSessions('key');
    expect(sessions.map((s) => s.id)).toEqual(['a', 'b']);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/sessions?filterBy=active'),
      expect.anything(),
    );
  });

  it('closes all active sessions except the one in use', async () => {
    const deleted: string[] = [];
    const fetchMock = vi.fn(async (url: string, init?: any) => {
      if ((init?.method || 'GET') === 'GET') return res(200, { items: [{ id: 'a' }, { id: 'b' }, { id: 'keep' }] });
      if (init?.method === 'DELETE') {
        deleted.push(url.split('/sessions/')[1]);
        return res(200, {});
      }
      return res(200, {});
    });
    vi.stubGlobal('fetch', fetchMock);

    const closed = await reapActiveBrowserSessions('key', 'keep');
    expect(closed).toBe(2);
    expect(deleted.sort()).toEqual(['a', 'b']);
    expect(deleted).not.toContain('keep');
  });
});

describe('createBrowserSession self-heal', () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => vi.unstubAllGlobals());

  it('reaps stale sessions and retries when the limit is hit', async () => {
    let createCalls = 0;
    const deleted: string[] = [];
    const fetchMock = vi.fn(async (url: string, init?: any) => {
      const method = init?.method || 'GET';
      if (url.endsWith('/sessions') && method === 'POST') {
        createCalls++;
        if (createCalls === 1) return res(429, { detail: 'too many concurrent active sessions' });
        return res(200, { id: 'fresh-session' });
      }
      if (url.includes('/sessions?filterBy=active') && method === 'GET') {
        return res(200, { items: [{ id: 'z1' }, { id: 'z2' }] });
      }
      if (method === 'DELETE') {
        deleted.push(url.split('/sessions/')[1]);
        return res(200, {});
      }
      return res(200, {});
    });
    vi.stubGlobal('fetch', fetchMock);

    const id = await createBrowserSession('key');
    expect(id).toBe('fresh-session');
    expect(createCalls).toBe(2); // failed once, retried after reap
    expect(deleted.sort()).toEqual(['z1', 'z2']);
  });

  it('returns null on a non-limit error without reaping', async () => {
    const fetchMock = vi.fn(async () => res(400, 'bad request'));
    vi.stubGlobal('fetch', fetchMock);
    const id = await createBrowserSession('key');
    expect(id).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1); // no reap/retry
  });
});
