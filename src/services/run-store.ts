// Chat run store: decouples an agent run from the streaming request that
// started it, so the run keeps going when the client disconnects (app
// backgrounded, phone sleep, page reload) and a reconnecting client can resume.
//
// Two layers:
//   1. D1 durability (chat_runs table): every event is appended to events_json
//      and the row's status flips to completed/failed when the generator ends.
//      This alone lets a reconnecting client replay everything that happened,
//      and — because the final assistant message is also stored in
//      `conversations` — guarantees the answer is never lost even on a full
//      reload or a CF/Pages cold restart with no in-memory state.
//   2. In-memory event bus (module-level Map): on the long-running Render
//      native process a still-running generator publishes events here, and a
//      /resume request tails the bus for live updates. On a stateless runtime
//      (CF Pages) the bus is empty after a cold start, but the D1 layer still
//      yields the correct, complete answer — just not live-tailed.
//
// The run is driven by `executeRun`, which consumes the agent generator, pushes
// each event to the bus + appends to D1, and finalises status. It is launched
// with ctx.waitUntil so it survives the /chat/stream response being closed.

import { logError } from '../utils/logger';
import type { SSEEvent } from '../types';

export type RunStatus = 'running' | 'completed' | 'failed' | 'cancelled';

export interface ChatRunRecord {
  id: number;
  run_id: string;
  user_id: number;
  thread_id: number | null;
  status: RunStatus;
  events_json: string;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatRun {
  runId: string;
  userId: number;
  threadId: number | null;
  status: RunStatus;
  events: SSEEvent[];
  error: string | null;
}

// === In-memory event bus (live tailing on a long-running process) ===
//
// Each active run holds: the events emitted so far (for late subscribers), a
// list of pending subscribers (async iterators waiting for the next event),
// and the final status once the generator ends. A subscriber first drains the
// buffered events, then awaits new ones until the run finalises.

interface ActiveRun {
  events: SSEEvent[];
  subscribers: Array<{
    push: (event: SSEEvent) => void;
    close: () => void;
  }>;
  status: RunStatus | null; // null = still running
  error: string | null;
}

const activeRuns = new Map<string, ActiveRun>();

/** Generate an opaque run id (crypto.randomUUID where available, else fallback). */
function newRunId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return 'run_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

// === D1 access ===

export async function createRun(
  db: D1Database,
  userId: number,
  threadId: number | null
): Promise<string | null> {
  const runId = newRunId();
  try {
    await db
      .prepare(
        `INSERT INTO chat_runs (run_id, user_id, thread_id, status, events_json)
         VALUES (?, ?, ?, 'running', '[]')`
      )
      .bind(runId, userId, threadId)
      .run();
    return runId;
  } catch (err: any) {
    // Most likely cause: the chat_runs table doesn't exist yet (migration 0046
    // not applied to this D1). The run store is an enhancement — degrade to
    // direct streaming rather than breaking chat.
    logError('run-store: createRun failed, falling back to direct stream', { error: err?.message || String(err) });
    return null;
  }
}

export async function getRun(db: D1Database, runId: string): Promise<ChatRun | null> {
  let row: ChatRunRecord | null = null;
  try {
    row = await db
      .prepare('SELECT * FROM chat_runs WHERE run_id = ?')
      .bind(runId)
      .first<ChatRunRecord>();
  } catch {
    // chat_runs table missing — run store unavailable.
    return null;
  }
  if (!row) return null;
  let events: SSEEvent[] = [];
  try {
    events = JSON.parse(row.events_json || '[]') as SSEEvent[];
  } catch {
    events = [];
  }
  return {
    runId: row.run_id,
    userId: row.user_id,
    threadId: row.thread_id,
    status: row.status as RunStatus,
    events,
    error: row.error,
  };
}

/** Load the most recent run for a thread (used on page reload to resume). */
export async function getLatestRunForThread(
  db: D1Database,
  userId: number,
  threadId: number
): Promise<ChatRun | null> {
  let row: ChatRunRecord | null = null;
  try {
    row = await db
      .prepare(
        `SELECT * FROM chat_runs WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT 1`
      )
      .bind(userId, threadId)
      .first<ChatRunRecord>();
  } catch {
    // chat_runs table missing — nothing to resume.
    return null;
  }
  if (!row) return null;
  let events: SSEEvent[] = [];
  try {
    events = JSON.parse(row.events_json || '[]') as SSEEvent[];
  } catch {
    events = [];
  }
  return {
    runId: row.run_id,
    userId: row.user_id,
    threadId: row.thread_id,
    status: row.status as RunStatus,
    events,
    error: row.error,
  };
}

/** Append an event to the run's events_json (durable) + publish to the bus. */
async function appendEvent(db: D1Database, runId: string, event: SSEEvent): Promise<void> {
  // The in-memory bus publish always happens; D1 persistence is best-effort so
  // a missing chat_runs table (migration 0046 not applied) doesn't kill the run.
  try {
    // JSON_MODIFY isn't available in SQLite; read-modify-write the array. Runs
    // are single-writer (only executeRun appends), so no concurrency hazard.
    const row = await db
      .prepare('SELECT events_json FROM chat_runs WHERE run_id = ?')
      .bind(runId)
      .first<{ events_json: string }>();
    let events: SSEEvent[] = [];
    try {
      events = JSON.parse(row?.events_json || '[]') as SSEEvent[];
    } catch {
      events = [];
    }
    events.push(event);
    await db
      .prepare('UPDATE chat_runs SET events_json = ?, updated_at = CURRENT_TIMESTAMP WHERE run_id = ?')
      .bind(JSON.stringify(events), runId)
      .run();
  } catch (err: any) {
    // Non-fatal: the bus still carries the event for live subscribers.
  }

  // Publish to any live subscribers.
  const active = activeRuns.get(runId);
  if (active) {
    active.events.push(event);
    for (const sub of active.subscribers) {
      try {
        sub.push(event);
      } catch {
        /* subscriber gone — ignore */
      }
    }
  }
}

async function finalizeRun(
  db: D1Database,
  runId: string,
  status: RunStatus,
  error: string | null = null
): Promise<void> {
  try {
    await db
      .prepare(
        `UPDATE chat_runs SET status = ?, error = ?, updated_at = CURRENT_TIMESTAMP WHERE run_id = ?`
      )
      .bind(status, error, runId)
      .run();
  } catch {
    // Non-fatal: in-memory bus finalisation below still wakes subscribers.
  }

  const active = activeRuns.get(runId);
  if (active) {
    active.status = status;
    active.error = error;
    // Wake all subscribers so they observe finalisation and stop.
    for (const sub of active.subscribers) {
      try {
        sub.close();
      } catch {
        /* ignore */
      }
    }
    // Keep the entry briefly so a late resume sees the final status, then drop.
    setTimeout(() => {
      if (activeRuns.get(runId) === active) activeRuns.delete(runId);
    }, 60_000);
  }
}

/** Ownership check used by the resume endpoint. */
export async function runBelongsToUser(
  db: D1Database,
  runId: string,
  userId: number
): Promise<boolean> {
  try {
    const row = await db
      .prepare('SELECT user_id FROM chat_runs WHERE run_id = ?')
      .bind(runId)
      .first<{ user_id: number }>();
    return !!row && row.user_id === userId;
  } catch {
    // chat_runs table missing — treat as not owned (no resume).
    return false;
  }
}

// === Execute a run (decoupled from any request) ===

export interface RunExecOptions {
  /** When the run is started from a request, this keeps it alive after the response closes. */
  waitUntil?: (p: Promise<unknown>) => void;
}

/**
 * Drive an agent generator to completion in the background, persisting every
 * event to D1 and publishing to the in-memory bus. Returns immediately; the
 * work continues via waitUntil (or just on the event loop in native Render).
 */
export function executeRun(
  db: D1Database,
  runId: string,
  generator: AsyncGenerator<SSEEvent, void, unknown>,
  opts: RunExecOptions = {}
): void {
  // Register the active run for live tailing.
  activeRuns.set(runId, { events: [], subscribers: [], status: null, error: null });

  const task = (async () => {
    try {
      for await (const event of generator) {
        await appendEvent(db, runId, event);
      }
      await finalizeRun(db, runId, 'completed');
    } catch (err: any) {
      const msg = err?.message || String(err);
      // Try to emit an error event for durability, then finalise.
      try {
        await appendEvent(db, runId, { type: 'error', data: { error: msg } });
      } catch {
        /* ignore */
      }
      await finalizeRun(db, runId, 'failed', msg);
      logError('chat run failed', { runId, error: msg });
    }
  })();

  if (opts.waitUntil) {
    opts.waitUntil(task.catch(() => {}));
  }
}

// === Resume: replay buffered events + tail live ===

export interface ResumeStream {
  /** All events already persisted (replay first). */
  replay: SSEEvent[];
  /** Async iterator yielding live events as they happen, ending when the run finalises. */
  tail: AsyncIterable<SSEEvent>;
  status: RunStatus;
}

/**
 * Build a resume stream for a run. The caller first emits every `replay` event,
 * then iterates `tail` for any new live events (only available if the process
 * that started the run is still alive and the run is still running).
 */
export function resumeRun(run: ChatRun): ResumeStream {
  const replay = run.events;

  // If the run already finalised (or the in-memory bus is gone, e.g. CF cold
  // restart), there's nothing to tail — everything is in `replay`.
  const active = activeRuns.get(run.runId);
  if (!active || active.status !== null) {
    return { replay, tail: emptyAsyncIterable(), status: run.status };
  }

  // Tail: drain any bus events newer than what we replayed, then subscribe.
  const tail = makeSubscriberTail(active, replay.length);
  return { replay, tail, status: 'running' };
}

function emptyAsyncIterable(): AsyncIterable<SSEEvent> {
  return {
    [Symbol.asyncIterator]() {
      return { next: async () => ({ done: true, value: undefined as any }) };
    },
  };
}

function makeSubscriberTail(active: ActiveRun, alreadyReplayed: number): AsyncIterable<SSEEvent> {
  return {
    [Symbol.asyncIterator]() {
      // First emit any bus events the replay didn't cover.
      let i = alreadyReplayed;
      const queue: SSEEvent[] = [];
      let resolveNext: ((r: IteratorResult<SSEEvent>) => void) | null = null;

      const sub = {
        push(event: SSEEvent) {
          if (resolveNext) {
            const r = resolveNext;
            resolveNext = null;
            r({ done: false, value: event });
          } else {
            queue.push(event);
          }
        },
        close() {
          if (resolveNext) {
            const r = resolveNext;
            resolveNext = null;
            r({ done: true, value: undefined as any });
          }
        },
      };
      active.subscribers.push(sub);

      return {
        next(): Promise<IteratorResult<SSEEvent>> {
          // Drain buffered bus events first.
          while (i < active.events.length) {
            const ev = active.events[i++];
            return Promise.resolve({ done: false, value: ev });
          }
          // Then drain the subscriber queue.
          if (queue.length > 0) {
            return Promise.resolve({ done: false, value: queue.shift()! });
          }
          // Run finalised while we were waiting — stop.
          if (active.status !== null) {
            return Promise.resolve({ done: true, value: undefined as any });
          }
          // Otherwise wait for the next pushed event or close.
          return new Promise<IteratorResult<SSEEvent>>((resolve) => {
            resolveNext = resolve;
          });
        },
        return(): Promise<IteratorResult<SSEEvent>> {
          // Remove this subscriber on early termination.
          const idx = active.subscribers.indexOf(sub);
          if (idx >= 0) active.subscribers.splice(idx, 1);
          return Promise.resolve({ done: true, value: undefined as any });
        },
      };
    },
  };
}
