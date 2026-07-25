// Render-only: take a text snapshot of any web page with a real browser.
//
// The generic consumer of playwrightCore.ts — no login, no session, just
// "load the page like a human's browser would and read its text". Used by the
// page-watch cron (routes/system.ts) through the PAGE_SNAPSHOT binding.
// Same import rule as the other src/render modules: never reachable from
// src/index.tsx, so the Workers bundle stays playwright-free.

import { BrowserSlotBusyError, openScriptedPage } from './playwrightCore';
import { normalizeSnapshotText } from '../services/pageWatch';

const NAV_TIMEOUT_MS = 45000;
// Client-rendered pages paint after domcontentloaded; a short settle captures
// them without waiting for every straggling analytics request.
const RENDER_SETTLE_MS = 3500;
const MAX_SNAPSHOT_CHARS = 30000;

export interface PageSnapshotInput {
  url: string;
  /** Optional CSS selector to scope the snapshot (defaults to the whole body). */
  selector?: string | null;
}

export interface PageSnapshotResult {
  /** 'skipped' = the single browser slot was busy; retry on the next tick. */
  status: 'completed' | 'failed' | 'skipped';
  text?: string;
  error?: string;
}

export async function snapshotPage(input: PageSnapshotInput): Promise<PageSnapshotResult> {
  let scripted;
  try {
    // waitForSlotMs: 0 — this is cron work. If a user's Outlook scrape or a
    // browser recipe holds the container's one browser slot, yield to it and
    // pick this watch up on the next tick rather than queueing (or, before
    // the slot existed, running a second Chromium and OOM-killing the box).
    scripted = await openScriptedPage({ waitForSlotMs: 0 });
  } catch (err) {
    if (err instanceof BrowserSlotBusyError) {
      return { status: 'skipped', error: err.message };
    }
    return { status: 'failed', error: `Browser launch failed: ${err instanceof Error ? err.message : String(err)}` };
  }
  const { page } = scripted;
  try {
    await page.goto(input.url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
    await page.waitForTimeout(RENDER_SETTLE_MS);

    const target = input.selector ? page.locator(input.selector).first() : page.locator('body');
    const raw = await target.innerText({ timeout: 10000 }).catch(() => '');
    const text = normalizeSnapshotText(raw);
    if (!text) {
      return {
        status: 'failed',
        error: input.selector
          ? `Nothing readable matched selector "${input.selector}" on ${input.url}`
          : `Page at ${input.url} rendered no readable text`,
      };
    }
    return { status: 'completed', text: text.slice(0, MAX_SNAPSHOT_CHARS) };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { status: 'failed', error: `${detail} (URL: ${input.url})` };
  } finally {
    await scripted.close().catch(() => {});
  }
}
