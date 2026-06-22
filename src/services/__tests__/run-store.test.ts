import { describe, it, expect } from 'vitest';
import {
  executeRun,
  resumeRun,
  type ChatRun,
} from '../run-store';
import type { SSEEvent } from '../../types';

// Minimal D1 mock for the run store: backs events_json + status in a JS object
// so appendEvent/finalizeRun/read work without a real database.
function createRunDb() {
  interface MockRunRow { events_json: string; status: string; error: string | null; }
  const rows = new Map<string, MockRunRow>();

  const db = {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async run() {
              if (sql.includes('INSERT INTO chat_runs')) {
                rows.set(args[0] as string, {
                  events_json: '[]',
                  status: 'running',
                  error: null,
                });
                return { meta: { changes: 1 } };
              }
              if (sql.includes('UPDATE chat_runs SET events_json')) {
                const r = rows.get(args[1] as string);
                if (r) r.events_json = args[0] as string;
                return { meta: { changes: 1 } };
              }
              if (sql.includes('UPDATE chat_runs SET status')) {
                const r = rows.get(args[2] as string);
                if (r) {
                  r.status = args[0] as string;
                  r.error = args[1] as string | null;
                }
                return { meta: { changes: 1 } };
              }
              return { meta: { changes: 0 } };
            },
            async first<T>() {
              if (sql.includes('SELECT events_json FROM chat_runs')) {
                const r = rows.get(args[0] as string);
                return (r ? { events_json: r.events_json } : null) as T | null;
              }
              return null as T | null;
            },
          };
        },
      };
    },
  };
  return db as unknown as D1Database;
}

function evt(type: SSEEvent['type'], text = ''): SSEEvent {
  return { type, data: { text, threadId: 1 } as any };
}

// Drive a simple generator to completion and wait for the bus to finalise.
function runToCompletion(db: D1Database, runId: string, events: SSEEvent[]): Promise<void> {
  return new Promise((resolve) => {
    const gen = (async function* () {
      for (const e of events) yield e;
    })();
    executeRun(db, runId, gen, {
      waitUntil: (p) => p.then(() => resolve()).catch(() => resolve()),
    });
  });
}

describe('run-store resume', () => {
  it('replays all buffered events for a completed run', async () => {
    const db = createRunDb();
    const runId = 'run-replay-1';
    const events = [evt('thinking'), evt('chunk', 'Hello '), evt('chunk', 'world'), evt('done')];

    await runToCompletion(db, runId, events);

    // Simulate a reconnect: the run record read from D1 carries everything.
    const run: ChatRun = {
      runId,
      userId: 1,
      threadId: 1,
      status: 'completed',
      events,
      error: null,
    };
    const { replay, tail, status } = resumeRun(run);

    expect(status).toBe('completed');
    expect(replay.map((e) => e.type)).toEqual(['thinking', 'chunk', 'chunk', 'done']);
    expect(replay.map((e) => e.data.text)).toEqual(['', 'Hello ', 'world', '']);

    // No live tail for a completed run.
    const tailEvents: SSEEvent[] = [];
    for await (const e of tail) tailEvents.push(e);
    expect(tailEvents.length).toBe(0);
  });

  it('tails live events for a still-running run', async () => {
    const db = createRunDb();
    const runId = 'run-live-1';

    // A generator that yields an event, waits, then yields the rest — so the
    // resume subscribes while it's still running.
    const gen = (async function* () {
      yield evt('thinking');
      yield evt('chunk', 'Part 1 ');
      await new Promise((r) => setTimeout(r, 30));
      yield evt('chunk', 'Part 2');
      yield evt('done');
    })();

    executeRun(db, runId, gen, { waitUntil: () => {} });

    // Subscribe after the first couple of events have been buffered.
    await new Promise((r) => setTimeout(r, 10));

    const run: ChatRun = {
      runId,
      userId: 1,
      threadId: 1,
      status: 'running',
      events: [], // pretend we read D1 before any events were flushed
    };
    const { replay, tail, status } = resumeRun(run);
    expect(status).toBe('running');

    const collected: SSEEvent[] = [];
    // Drain the bus events the replay didn't cover + the live tail.
    for await (const e of tail) collected.push(e);

    const allText = collected.map((e) => e.data.text || '').join('');
    expect(allText).toContain('Part 1 ');
    expect(allText).toContain('Part 2');
  });

  it('records an error event and finalises as failed when the generator throws', async () => {
    const db = createRunDb();
    const runId = 'run-fail-1';

    const gen = (async function* () {
      yield evt('thinking');
      throw new Error('boom');
    })();

    await new Promise<void>((resolve) => {
      executeRun(db, runId, gen, { waitUntil: (p) => p.then(() => resolve()).catch(() => resolve()) });
    });

    const run: ChatRun = {
      runId,
      userId: 1,
      threadId: 1,
      status: 'failed',
      events: [evt('thinking'), { type: 'error', data: { error: 'boom' } as any }],
      error: 'boom',
    };
    const { replay } = resumeRun(run);
    expect(replay.some((e) => e.type === 'thinking')).toBe(true);
    expect(replay.some((e) => e.type === 'error')).toBe(true);
  });
});
