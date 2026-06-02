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

/** Performs one HTTP-style call into the local app for a cron endpoint. */
export type CronCall = (path: string) => Promise<Response>;

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
      .catch((err) => console.error(`[render cron] ${path} failed:`, err?.message || err));
  };

  // === Phase 1: dispatch due cron jobs (await — it's a fast DB pass) ===
  let dispatched: any[] = [];
  try {
    const res = await call('/api/system/cron/execute');
    const data = await readJson(res);
    dispatched = ((data && data.results) || []).filter((r: any) => r.status === 'dispatched');
    if (dispatched.length > 0) {
      console.log(`[render cron] dispatched ${dispatched.length} job(s)`);
    }
  } catch (err: any) {
    console.error('[render cron] cron/execute failed:', err?.message || err);
  }

  // === Phase 2: run the agent for each dispatched job (background) ===
  for (const job of dispatched) {
    fire(`/api/system/cron/run-task/${job.job_id}`);
  }

  // === Phase 3: proactive intelligence (time-gated, same windows as before) ===
  fire('/api/proactive/cron/evening-briefing'); // endpoint checks each user's time
  fire('/api/proactive/cron/morning-briefing');
  if (istMinute % 30 < 2) fire('/api/proactive/cron/email-digest');
  if (istMinute < 5) fire('/api/proactive/cron/weekly-review');
  if (istMinute % 15 < 2) fire('/api/proactive/cron/evaluate-triggers');
  if (istMinute % 5 < 2) fire('/api/proactive/cron/meeting-reminders');
  fire('/api/system/cron/check-browser-tasks');

  // Weekly skill confidence review — Mondays 02:00–02:05 IST
  if (now.getDay() === 1 && istHour === 2 && istMinute < 5) {
    fire('/api/skills/cron/review-low-confidence');
  }
}

/**
 * Start the minute-by-minute scheduler. Returns the interval handle.
 * A re-entrancy guard skips a tick if the previous one is still resolving.
 */
export function startRenderCron(call: CronCall, intervalMs = 60_000): NodeJS.Timeout {
  let running = false;
  const tick = async () => {
    if (running) {
      console.warn('[render cron] previous tick still running — skipping this minute');
      return;
    }
    running = true;
    try {
      await runCronTick(call);
    } catch (err: any) {
      console.error('[render cron] tick error:', err?.message || err);
    } finally {
      running = false;
    }
  };

  // Small delay so the server is fully listening before the first tick.
  setTimeout(tick, 5_000);
  return setInterval(tick, intervalMs);
}
