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
    expect(paths).toContain('/api/proactive/cron/evening-briefing');
    expect(paths).toContain('/api/proactive/cron/morning-briefing');
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

  it('fires the email digest at the top of the 30-minute window', async () => {
    const paths: string[] = [];
    const call = vi.fn(async (path: string) => {
      paths.push(path);
      if (path === '/api/system/cron/execute') return jsonResponse({ results: [] });
      return jsonResponse({ ok: true });
    });

    // 00:30 UTC -> 06:00 IST (minute 0 -> email-digest window 0 % 30 < 2).
    await runCronTick(call, new Date('2026-06-02T00:30:00Z'));
    expect(paths).toContain('/api/proactive/cron/email-digest');
  });
});
