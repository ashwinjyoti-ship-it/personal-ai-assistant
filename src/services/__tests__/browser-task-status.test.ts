// browser_task_status must only ever answer for a task THIS account actually
// started and left running.
//
// The bug this guards: asked to "list latest 5 mails in outlook", the assistant
// ran the scripted Outlook scrape, did not get a result in time, then called
// browser_task_status with a task ID it had scavenged from conversation history
// — and reported that unrelated, hours-old lookup as the answer. The scripted
// Outlook path never creates a Browser Use task at all, so after an Outlook run
// every ID in context is stale by construction.

import { describe, it, expect, vi } from 'vitest';
import { executeToolWithLogging } from '../agent';

interface Query {
  sql: string;
  args: unknown[];
}

/**
 * Minimal D1 stand-in. `pendingTaskIds` is the set of IDs the guard should
 * consider live; everything else (credential lookup, the tool_execution_log
 * insert) returns empty/ok.
 */
function fakeDb(pendingTaskIds: string[], queries: Query[] = []) {
  const db = {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          queries.push({ sql, args });
          return {
            async first() {
              if (sql.includes('FROM pending_browser_tasks')) {
                return pendingTaskIds.includes(String(args[1])) ? { ok: 1 } : null;
              }
              return null; // no Browser Use API key configured
            },
            async run() {
              return {};
            },
            async all() {
              return { results: [] };
            },
          };
        },
      };
    },
  } as unknown as D1Database;
  return { db, queries };
}

const meta = { agentType: 'full', channel: 'web' };

describe('browser_task_status stale-ID guard', () => {
  it('refuses an ID that was never started on this account', async () => {
    const { db } = fakeDb([]);

    const result = await executeToolWithLogging(
      'browser_task_status',
      { task_id: 'task-from-an-old-conversation' },
      db,
      1,
      meta,
      'pin',
    );

    expect(result).toMatch(/^\[stale-task-id\]/);
    // The instruction that actually prevents the wrong answer being spoken.
    expect(result).toMatch(/must not be reported/i);
  });

  it('never reaches Browser Use for a stale ID', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    try {
      const { db } = fakeDb([]);
      await executeToolWithLogging('browser_task_status', { task_id: 'stale' }, db, 1, meta, 'pin');
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('scopes the lookup to the calling user', async () => {
    const { db, queries } = fakeDb(['live-task']);

    await executeToolWithLogging('browser_task_status', { task_id: 'live-task' }, db, 42, meta, 'pin');

    const guard = queries.find((q) => q.sql.includes('FROM pending_browser_tasks'));
    expect(guard).toBeDefined();
    expect(guard!.args).toEqual([42, 'live-task']);
  });

  it('lets a genuinely in-flight task through to the real status check', async () => {
    const { db } = fakeDb(['live-task']);

    const result = await executeToolWithLogging(
      'browser_task_status',
      { task_id: 'live-task' },
      db,
      1,
      meta,
      'pin',
    );

    // Past the guard: it got as far as needing the Browser Use credential,
    // which this fixture does not provide.
    expect(result).not.toMatch(/stale-task-id/);
    expect(result).toMatch(/API key not configured/i);
  });

  it('rejects a blank task_id before touching the database', async () => {
    const { db, queries } = fakeDb([]);

    const result = await executeToolWithLogging(
      'browser_task_status',
      { task_id: '   ' },
      db,
      1,
      meta,
      'pin',
    );

    expect(result).toBe('No task_id provided.');
    expect(queries.some((q) => q.sql.includes('FROM pending_browser_tasks'))).toBe(false);
  });
});
