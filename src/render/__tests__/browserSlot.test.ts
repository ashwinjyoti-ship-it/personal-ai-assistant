// The single-Chromium guard. A bug here is expensive in both directions: a
// lost release deadlocks every later browser run in the process, and a slot
// that admits two holders puts two Chromiums in a 512MB container, which is
// what was OOM-killing the Render instance mid-scrape.
//
// Imported directly from playwrightCore, which pulls in `playwright` — that is
// fine under vitest (Node), and no test here launches a browser.

import { describe, it, expect, beforeEach } from 'vitest';
import {
  acquireBrowserSlot,
  isBrowserSlotBusy,
  __resetBrowserSlotForTests,
} from '../playwrightCore';

describe('browser slot', () => {
  beforeEach(() => {
    __resetBrowserSlotForTests();
  });

  it('grants a free slot immediately', async () => {
    const release = await acquireBrowserSlot(0);
    expect(release).not.toBeNull();
    expect(isBrowserSlotBusy()).toBe(true);
    release!();
    expect(isBrowserSlotBusy()).toBe(false);
  });

  it('refuses a zero-wait caller while the slot is held', async () => {
    const held = await acquireBrowserSlot(0);
    expect(held).not.toBeNull();

    // This is the page-watch cron's path: yield rather than run a second
    // Chromium alongside the user's scrape.
    expect(await acquireBrowserSlot(0)).toBeNull();

    held!();
    expect(await acquireBrowserSlot(0)).not.toBeNull();
  });

  it('never admits two holders at once', async () => {
    let concurrent = 0;
    let maxConcurrent = 0;

    await Promise.all(
      Array.from({ length: 5 }, async () => {
        const release = await acquireBrowserSlot(5000);
        expect(release).not.toBeNull();
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise((r) => setTimeout(r, 5));
        concurrent--;
        release!();
      }),
    );

    expect(maxConcurrent).toBe(1);
    expect(isBrowserSlotBusy()).toBe(false);
  });

  it('a waiter that times out does not disturb the active holder', async () => {
    const held = await acquireBrowserSlot(0);
    expect(held).not.toBeNull();

    expect(await acquireBrowserSlot(20)).toBeNull();
    // The holder is still the holder — the abandoned ticket must not have
    // decremented the active count or freed the slot on its behalf.
    expect(isBrowserSlotBusy()).toBe(true);

    held!();
    expect(isBrowserSlotBusy()).toBe(false);
  });

  it('hands the slot to a waiter once the holder releases', async () => {
    const held = await acquireBrowserSlot(0);
    let waiterGotIt = false;

    const waiter = acquireBrowserSlot(5000).then((release) => {
      waiterGotIt = true;
      release!();
    });

    await new Promise((r) => setTimeout(r, 10));
    expect(waiterGotIt).toBe(false); // still blocked behind the holder

    held!();
    await waiter;
    expect(waiterGotIt).toBe(true);
    expect(isBrowserSlotBusy()).toBe(false);
  });

  it('does not stall the queue when a waiter gives up', async () => {
    const held = await acquireBrowserSlot(0);

    // Times out and abandons its ticket while `held` is still in place.
    expect(await acquireBrowserSlot(10)).toBeNull();

    const laterWaiter = acquireBrowserSlot(5000);
    held!();

    // If the abandoned ticket had stalled the chain, this would never resolve.
    const release = await laterWaiter;
    expect(release).not.toBeNull();
    release!();
  });

  it('release is idempotent', async () => {
    const release = await acquireBrowserSlot(0);
    release!();
    release!();
    release!();
    expect(isBrowserSlotBusy()).toBe(false);

    // A double-release must not have left a negative count that lets two
    // holders in later.
    const a = await acquireBrowserSlot(0);
    expect(a).not.toBeNull();
    expect(await acquireBrowserSlot(0)).toBeNull();
    a!();
  });
});
