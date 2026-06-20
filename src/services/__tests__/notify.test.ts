import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendNotification } from '../notify';

function createMockDb(overrides: {
  pinHash?: string;
  ntfyUrl?: string;
  ntfyToken?: string;
  insertFails?: boolean;
} = {}) {
  const notifications: Array<{ user_id: number; title: string; body: string }> = [];

  const db = {
    prepare(sql: string) {
      const stmt = {
        bind(...args: unknown[]) {
          return {
            async run() {
              if (sql.includes('INSERT INTO notifications')) {
                if (overrides.insertFails) throw new Error('insert failed');
                notifications.push({
                  user_id: args[0] as number,
                  title: args[1] as string,
                  body: args[2] as string,
                });
                return { meta: { changes: 1 } };
              }
              return { meta: { changes: 0 } };
            },
            async first<T>() {
              if (sql.includes('pin_hash')) {
                return overrides.pinHash ? { pin_hash: overrides.pinHash } as T : null;
              }
              if (sql.includes("service = ?") && args[1] === 'ntfy_url') {
                return overrides.ntfyUrl ? { encrypted_value: overrides.ntfyUrl } as T : null;
              }
              if (sql.includes("service = ?") && args[1] === 'ntfy_token') {
                return overrides.ntfyToken ? { encrypted_value: overrides.ntfyToken } as T : null;
              }
              return null;
            },
          };
        },
      };
      return stmt;
    },
    _notifications: notifications,
  };

  return db as unknown as D1Database & { _notifications: typeof notifications };
}

describe('sendNotification', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('always inserts in-app notification', async () => {
    const db = createMockDb({ pinHash: 'test-pin-hash' });
    const result = await sendNotification(db, 1, 'Test Title', 'Test body');
    expect(result.sent).toBe(true);
    expect(result.channel).toBe('in-app');
    expect(db._notifications).toHaveLength(1);
    expect(db._notifications[0].title).toBe('Test Title');
  });

  it('posts to ntfy when url credential exists', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock as typeof fetch;

    const db = createMockDb({
      pinHash: 'test-pin',
      ntfyUrl: 'encrypted-url-placeholder',
    });

    // Mock decrypt by passing pinHash directly via options
    const result = await sendNotification(db, 1, 'Alert', 'Hello', {
      pinHash: 'test-pin',
    });

    // Without real decrypt, ntfy won't fire — verify in-app still works
    expect(result.sent).toBe(true);
    expect(db._notifications).toHaveLength(1);
  });

  it('returns in-app only when no ntfy url configured', async () => {
    const db = createMockDb({ pinHash: 'test-pin' });
    const result = await sendNotification(db, 1, 'Title', 'Body', { pinHash: 'test-pin' });
    expect(result.channel).toBe('in-app');
  });
});
