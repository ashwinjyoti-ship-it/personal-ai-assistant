// The total-budget guarantee for scripted browser flows.
//
// This is the failure these tests exist to prevent: browser_task races the
// Outlook scrape at 310s, and the run's own budgets summed past that (60s slot
// wait + 45s navigation + 240s flow = 345s). The tool timeout won, threw "Tool
// timed out", and walked away — leaving a Chromium running to its own
// deadline, still holding the container's one browser slot and its several
// hundred MB on a 512MB instance. The service then took a SIGTERM mid-scrape.
//
// So two properties matter and are asserted here: the run reports back inside
// its budget, and hitting the budget CLOSES the browser (a real cancellation)
// rather than abandoning it.

import { describe, it, expect, beforeEach, vi } from 'vitest';

const launch = vi.hoisted(() => vi.fn());
vi.mock('playwright', () => ({ chromium: { launch } }));
// R2 is not configured under test; keep the failure screenshot path inert.
vi.mock('../r2-bucket', () => ({ createRenderDocumentsBucket: () => null }));

import {
  withScriptedSession,
  ScriptedRunTimeoutError,
  isBrowserSlotBusy,
  acquireBrowserSlot,
  clampToDeadline,
  __resetBrowserSlotForTests,
} from '../playwrightCore';

/** A Chromium stand-in that records whether it was closed. */
function fakeBrowser() {
  const state = { closed: false, gotoUrl: '', gotoTimeout: 0 };
  const page = {
    goto: vi.fn(async (url: string, opts: { timeout: number }) => {
      state.gotoUrl = url;
      state.gotoTimeout = opts.timeout;
    }),
    url: () => state.gotoUrl || 'about:blank',
    screenshot: vi.fn(async () => Buffer.from('')),
  };
  const context = {
    route: vi.fn(async () => {}),
    newPage: vi.fn(async () => page),
    storageState: vi.fn(async () => ({ cookies: [], origins: [] })),
    close: vi.fn(async () => {}),
  };
  const browser = {
    newContext: vi.fn(async () => context),
    close: vi.fn(async () => {
      state.closed = true;
    }),
  };
  return { browser, context, page, state };
}

// No stored session, and saves/clears are no-ops.
const db = {
  prepare: () => ({
    bind: () => ({
      first: async () => null,
      run: async () => ({}),
    }),
  }),
} as unknown as D1Database;

const input = {
  db,
  userId: 1,
  pinHash: 'pin',
  provider: 'outlook',
  startUrl: 'https://outlook.office.com/mail/',
};

describe('withScriptedSession budget', () => {
  beforeEach(() => {
    __resetBrowserSlotForTests();
    launch.mockReset();
  });

  it('cancels the run and closes the browser when the budget expires', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    const result = await withScriptedSession({ ...input, budgetMs: 150 }, async () => {
      // A flow that ignores its deadline — exactly what an OWA page stuck on
      // a re-rendering message list looks like.
      await new Promise((r) => setTimeout(r, 5000));
      return ['never'];
    });

    expect(result.status).toBe('failed');
    expect(result.status === 'failed' && result.error).toMatch(/did not finish within its 0s budget/);
    // The point of the whole exercise: no orphaned Chromium.
    expect(fake.state.closed).toBe(true);
  });

  it('releases the browser slot on cancellation so the next run can start', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    await withScriptedSession({ ...input, budgetMs: 100 }, async () => {
      await new Promise((r) => setTimeout(r, 5000));
      return 'never';
    });

    expect(isBrowserSlotBusy()).toBe(false);
    const next = await acquireBrowserSlot(0);
    expect(next).not.toBeNull();
    next!();
  });

  it('returns well inside its budget rather than running to the caller\'s cap', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    const started = Date.now();
    await withScriptedSession({ ...input, budgetMs: 200 }, async () => {
      await new Promise((r) => setTimeout(r, 10_000));
      return 'never';
    });

    // Generous bound — the assertion is "bounded by the budget", not "fast".
    expect(Date.now() - started).toBeLessThan(3000);
  });

  it('hands the flow a deadline derived from the budget', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    let seen = 0;
    const result = await withScriptedSession({ ...input, budgetMs: 60_000 }, async (_page, deadline) => {
      seen = deadline;
      return 'ok';
    });

    expect(result).toEqual({ status: 'completed', value: 'ok' });
    // Roughly now + 60s, allowing for the session load and browser launch.
    expect(seen).toBeGreaterThan(Date.now() + 50_000);
    expect(seen).toBeLessThanOrEqual(Date.now() + 60_000);
    expect(fake.state.closed).toBe(true); // closed on the success path too
  });

  it('bounds the opening navigation by the remaining budget', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    await withScriptedSession({ ...input, budgetMs: 20_000 }, async () => 'ok');

    // 20s left, so the 45s preferred nav timeout must have been clamped down.
    expect(fake.state.gotoTimeout).toBeLessThanOrEqual(20_000);
    expect(fake.state.gotoTimeout).toBeGreaterThan(0);
  });

  it('does not queue for the slot when too little budget remains to use it', async () => {
    const fake = fakeBrowser();
    launch.mockResolvedValue(fake.browser);

    // A user's scrape holds the slot.
    const held = await acquireBrowserSlot(0);
    expect(held).not.toBeNull();

    const started = Date.now();
    const result = await withScriptedSession({ ...input, budgetMs: 30_000 }, async () => 'ok');

    // Fails fast and says why, instead of burning the budget in the queue and
    // then having no time left to do the work.
    expect(result.status).toBe('failed');
    expect(result.status === 'failed' && result.error).toMatch(/already running/);
    expect(Date.now() - started).toBeLessThan(1000);
    held!();
  });
});

describe('clampToDeadline', () => {
  it('prefers the requested timeout when there is room', () => {
    expect(clampToDeadline(Date.now() + 120_000, 45_000)).toBe(45_000);
  });

  it('shrinks to the time actually left', () => {
    const clamped = clampToDeadline(Date.now() + 20_000, 45_000);
    expect(clamped).toBeLessThanOrEqual(20_000);
    expect(clamped).toBeGreaterThan(15_000);
  });

  it('never returns a non-positive timeout — Playwright reads 0 as "no timeout"', () => {
    expect(clampToDeadline(Date.now() - 60_000, 45_000)).toBe(5_000);
  });
});
