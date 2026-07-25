// In-process cron scheduler for the native Render backend.
//
// Replaces the separate Cloudflare cron worker (cron-worker/worker.js), which
// fired every minute and hopped CF cron -> Pages -> proxy -> Render. Running the
// scheduler inside the always-on Render web service removes those network hops
// and the Cloudflare Workers time limits that made cron flaky.
//
// It calls the SAME endpoints with the SAME schedule as the old worker, so
// behaviour is identical. The endpoints already guard against double-firing
// (cron_jobs.last_run 90s window + per-feature dedup), so this is safe to run
// even if the old Cloudflare worker is still active during cutover.

import { logInfo, logWarn, logError } from '../utils/logger';

/** Performs one HTTP-style call into the local app for a cron endpoint. */
export type CronCall = (path: string) => Promise<Response>;

// Phase 1 is the only awaited call in a tick, so it is the only one that can
// wedge the scheduler's re-entrancy guard — and a wedged guard means every
// later minute logs "previous tick still running" and does nothing at all.
// It is documented as a fast DB pass, so a generous cap costs nothing and
// guarantees the tick ends. The fire-and-forget calls are deliberately NOT
// bounded here: run-task runs a full agent turn and legitimately takes
// minutes, and nothing waits on it.
const EXECUTE_CALL_TIMEOUT_MS = 45_000;

function withTimeout(promise: Promise<Response>, timeoutMs: number, label: string): Promise<Response> {
  let timer: NodeJS.Timeout | undefined;
  const expiry = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} did not respond within ${timeoutMs}ms`)), timeoutMs);
  });
  return Promise.race([promise, expiry]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

async function readJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** Run a single cron tick: dispatch due jobs + fire time-gated proactive endpoints. */
export async function runCronTick(call: CronCall, now: Date = new Date()): Promise<void> {
  // IST is used for the proactive schedule windows (matches the legacy worker).
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const istHour = ist.getHours();
  const istMinute = ist.getMinutes();

  // Fire-and-forget helper for endpoints whose result we don't need to await.
  const fire = (path: string) => {
    call(path)
      .then(readJson)
      .catch((err) => logError('render cron endpoint failed', { path, error: err?.message || String(err) }));
  };

  // === Phase 1: dispatch due cron jobs (await — it's a fast DB pass) ===
  let dispatched: any[] = [];
  try {
    const res = await withTimeout(
      Promise.resolve(call('/api/system/cron/execute')),
      EXECUTE_CALL_TIMEOUT_MS,
      'render cron cron/execute',
    );
    const data = await readJson(res);
    dispatched = ((data && data.results) || []).filter((r: any) => r.status === 'dispatched');
    if (dispatched.length > 0) {
      logInfo('render cron dispatched jobs', { count: dispatched.length });
    }
  } catch (err: any) {
    logError('render cron cron/execute failed', { error: err?.message || String(err) });
  }

  // === Phase 2: run the agent for each dispatched job (background) ===
  for (const job of dispatched) {
    fire(`/api/system/cron/run-task/${job.job_id}`);
  }

  // === Phase 3: proactive intelligence (unified Digests) ===
  // One endpoint evaluates every user's schedule (morning/evening/weekly/email)
  // and fires whichever are due, each with a per-day idempotency guard. Replaces
  // the five separate proactive cron endpoints.
  fire('/api/digests/cron/tick');
  // Meeting reminders are still time-gated by event start, not user schedule,
  // so they keep their own per-5-minute endpoint.
  if (istMinute % 5 < 2) fire('/api/digests/cron/meeting-reminders');
  fire('/api/system/cron/check-browser-tasks');

  // Page watches — re-snapshot watched URLs and notify on change. Every 5
  // minutes; each watch's own check_interval_minutes gates actual work, so
  // this just bounds how often the due-scan runs.
  if (istMinute % 5 === 0) fire('/api/system/cron/page-watches');

  // Weekly skill confidence review — Mondays 02:00–02:05 IST
  if (now.getDay() === 1 && istHour === 2 && istMinute < 5) {
    fire('/api/skills/cron/review-low-confidence');
  }

  // Daily decay recomputation — 03:00–03:02 IST every day
  if (istHour === 3 && istMinute < 2) {
    fire('/api/system/cron/recompute-decay-scores');
  }
}

/**
 * Start the minute-by-minute scheduler. Returns the handle of the next
 * scheduled timer.
 *
 * Unlike a fixed `setInterval(tick, 60_000)`, each tick is re-aligned to the
 * next wall-clock minute boundary (`:00`). A plain interval drifts with
 * event-loop lag, so over time ticks can straddle a minute (e.g. fire at
 * 19:59:58 then 20:01:00) and never land inside the briefing's target minute.
 * Aligning to the boundary keeps ticks at the start of every minute.
 *
 * A re-entrancy guard skips a tick if the previous one is still resolving; the
 * briefing catch-up window + per-day idempotency guard make an occasional
 * skipped minute non-fatal.
 */
export function startRenderCron(call: CronCall, intervalMs = 60_000): NodeJS.Timeout {
  let running = false;
  const tick = async () => {
    if (running) {
      logWarn('render cron: previous tick still running — skipping this minute');
      return;
    }
    running = true;
    try {
      await runCronTick(call);
    } catch (err: any) {
      logError('render cron tick error', { error: err?.message || String(err) });
    } finally {
      running = false;
    }
  };

  // Reschedule each tick to the next minute boundary so ticks don't drift.
  let handle: NodeJS.Timeout;
  const scheduleNextMinute = () => {
    const msToNextMinute = intervalMs - (Date.now() % intervalMs);
    handle = setTimeout(() => {
      // Fire-and-forget; tick has its own try/finally and re-entrancy guard.
      void tick();
      scheduleNextMinute();
    }, msToNextMinute);
  };

  // Small delay so the server is fully listening before the first tick, then
  // align all subsequent ticks to wall-clock minute boundaries.
  handle = setTimeout(() => {
    void tick();
    scheduleNextMinute();
  }, 5_000);

  return handle;
}
