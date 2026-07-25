import { describe, it, expect, vi } from 'vitest';
import { runCronTick } from '../cron';

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

describe('runCronTick', () => {
  it('always dispatches jobs and fires the per-minute proactive endpoints', async () => {
    const paths: string[] = [];
    const call = vi.fn(async (path: string) => {
      paths.push(path);
      if (path === '/api/system/cron/execute') return jsonResponse({ results: [] });
      return jsonResponse({ ok: true });
    });

    await runCronTick(call, new Date());

    expect(paths).toContain('/api/system/cron/execute');
    // The five old proactive endpoints were replaced by a single digests tick.
    expect(paths).toContain('/api/digests/cron/tick');
    expect(paths).toContain('/api/system/cron/check-browser-tasks');
  });

  it('runs the agent for each dispatched job', async () => {
    const paths: string[] = [];
    const call = vi.fn(async (path: string) => {
      paths.push(path);
      if (path === '/api/system/cron/execute') {
        return jsonResponse({
          results: [
            { status: 'dispatched', job_id: 7 },
            { status: 'dispatched', job_id: 9 },
            { status: 'error', job_id: 11 },
          ],
        });
      }
      return jsonResponse({ ok: true });
    });

    await runCronTick(call, new Date());

    expect(paths).toContain('/api/system/cron/run-task/7');
    expect(paths).toContain('/api/system/cron/run-task/9');
    expect(paths).not.toContain('/api/system/cron/run-task/11');
  });

  it('does not throw if cron/execute fails', async () => {
    const call = vi.fn(async (path: string) => {
      if (path === '/api/system/cron/execute') throw new Error('boom');
      return jsonResponse({ ok: true });
    });

    await expect(runCronTick(call, new Date())).resolves.toBeUndefined();
    // Proactive endpoints still fire even when job dispatch fails.
    expect(call).toHaveBeenCalledWith('/api/system/cron/check-browser-tasks');
  });

  it('gives up on a wedged cron/execute instead of hanging the tick forever', async () => {
    // The scheduler's re-entrancy guard stays set until the tick resolves, so
    // a cron/execute that never answers silences every later minute with
    // "previous tick still running" — which is what the logs showed right
    // before the instance went down.
    vi.useFakeTimers();
    try {
      const call = vi.fn((path: string) => {
        if (path === '/api/system/cron/execute') return new Promise<Response>(() => {});
        return Promise.resolve(jsonResponse({ ok: true }));
      });

      const tick = runCronTick(call, new Date());
      await vi.advanceTimersByTimeAsync(60_000);

      await expect(tick).resolves.toBeUndefined();
      // The rest of the tick still ran.
      expect(call).toHaveBeenCalledWith('/api/digests/cron/tick');
    } finally {
      vi.useRealTimers();
    }
  });

  it('fires the digest tick every minute (schedules are evaluated inside it)', async () => {
    const paths: string[] = [];
    const call = vi.fn(async (path: string) => {
      paths.push(path);
      if (path === '/api/system/cron/execute') return jsonResponse({ results: [] });
      return jsonResponse({ ok: true });
    });

    // The unified tick runs every minute regardless of IST minute; per-kind
    // scheduling + idempotency is decided inside the endpoint, not here.
    await runCronTick(call, new Date('2026-06-02T00:30:00Z'));
    expect(paths).toContain('/api/digests/cron/tick');
    await runCronTick(call, new Date('2026-06-02T00:31:00Z'));
    expect(paths.filter((p) => p === '/api/digests/cron/tick').length).toBe(2);
  });
});
