// Render-only: reusable Playwright infrastructure for scripted browser flows.
//
// This file must only ever be imported from src/render/* (same rule as
// outlookPlaywright.ts): the Cloudflare Workers build never reaches it, so the
// `playwright` package stays out of the Workers bundle.
//
// Everything provider-specific (Outlook login, future sites) lives in its own
// module and consumes these primitives:
//   - openScriptedPage(): a Chromium page launched with container-safe flags
//   - SessionStore: encrypted storageState persistence per (user, provider)
//   - withScriptedSession(): the full lifecycle — restore session, run the
//     flow, persist the session on success, clear it + capture a debug
//     screenshot on failure
//   - selector helpers that tolerate AAD's hidden template elements

import { chromium } from 'playwright';
import type { Browser, BrowserContext, BrowserContextOptions, Locator, Page } from 'playwright';
import { encrypt, decrypt } from '../services/crypto';
import { createRenderDocumentsBucket } from './r2-bucket';

export type PlaywrightStorageState = NonNullable<BrowserContextOptions['storageState']>;

// Render runs the container as root with a small /dev/shm:
//   --no-sandbox            Chromium's setuid sandbox cannot start as root
//   --disable-dev-shm-usage renderer crashes ("Target crashed") on heavy pages
//                           like OWA once the default 64MB /dev/shm fills up
//
// The rest of these flags exist to survive the `starter` instance's 512MB /
// 0.5 CPU envelope, which also hosts Node (running the app through tsx). A
// Chromium rendering OWA is the single largest consumer in the container, so
// every subsystem it can be told not to start is memory that stays available
// to the web server answering /healthz.
const LAUNCH_ARGS = [
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  // One renderer process, not one per site/frame: OWA is iframe-heavy and
  // site isolation multiplies its renderer count (and therefore its RSS).
  '--renderer-process-limit=1',
  '--disable-site-isolation-trials',
  // Background machinery that a scripted, short-lived scrape never benefits
  // from but which allocates eagerly at launch.
  '--disable-extensions',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-sync',
  '--disable-translate',
  '--disable-component-update',
  '--disable-software-rasterizer',
  '--no-first-run',
  '--no-default-browser-check',
  '--mute-audio',
  // Deliberately NOT capping the renderer's V8 heap (--js-flags=
  // --max-old-space-size). OWA is a heavy SPA and a cap low enough to matter
  // on a 512MB box risks crashing its JS outright ("Target crashed"), trading
  // this failure for a harder-to-diagnose one. Memory is bounded here by
  // running one browser at a time and by dropping images/media/fonts instead.
];

// Request types that cost a lot of memory and bandwidth but contribute
// nothing to text/aria-label extraction — which is all any scripted flow here
// reads. On OWA this is a large share of the page weight (avatars, icons,
// web fonts, embedded media).
const HEAVY_RESOURCE_TYPES = new Set(['image', 'media', 'font']);

// Sites (and AAD conditional-access rules) sometimes hard-reject the
// "HeadlessChrome" token. Detect the real UA once per process and strip it.
let cachedUserAgent: string | null = null;

async function resolveUserAgent(browser: Browser): Promise<string | undefined> {
  if (cachedUserAgent) return cachedUserAgent;
  try {
    const probe = await browser.newContext();
    const page = await probe.newPage();
    const ua = String(await page.evaluate('navigator.userAgent'));
    await probe.close();
    cachedUserAgent = ua.replace(/HeadlessChrome/gi, 'Chrome');
    return cachedUserAgent ?? undefined;
  } catch {
    return undefined; // fall back to the default UA rather than failing the run
  }
}

// ── Single-Chromium guard ───────────────────────────────────────────────────
// Three independent subsystems launch browsers — the Outlook scrape
// (user-triggered), browser recipes (user-triggered), and the page-watch cron
// (every 5 minutes). Nothing used to coordinate them, so a cron snapshot could
// (and did) run a second Chromium alongside a user's Outlook scrape. On the
// 512MB starter instance that is an out-of-memory kill: Render SIGTERMs the
// container, the in-flight request dies as "Connection lost", and the API is
// down until the instance restarts.
//
// Observed on 2026-07-24: an Outlook scrape started at 17:30:33Z, on the same
// minute boundary the page-watch cron fired (23:00 IST — `istMinute % 5 === 0`).
// At 17:34:03Z the cron logged "previous tick still running", and five seconds
// later the process took a SIGTERM and restarted.
//
// So: at most one Chromium per container, enforced here rather than in each
// caller. Background callers pass waitMs: 0 and skip their turn instead of
// queueing, because deferring a page snapshot to the next tick is free while
// making a user wait behind one is not.
// FIFO queue tail. Each waiter chains its own ticket onto the tail and waits
// for everything ahead of it; releasing resolves the ticket so the next waiter
// runs. `activeHolders` is only ever touched by a caller that actually
// acquired, so a waiter that gives up can never clear the real holder's state.
let queueTail: Promise<void> = Promise.resolve();
let activeHolders = 0;

export function isBrowserSlotBusy(): boolean {
  return activeHolders > 0;
}

/** Test seam: reset the queue between cases. */
export function __resetBrowserSlotForTests(): void {
  queueTail = Promise.resolve();
  activeHolders = 0;
}

/**
 * Acquire the right to run the container's one Chromium. Resolves to a
 * release function, or null when the slot did not come free within `waitMs`.
 *
 * waitMs === 0 means "only if free right now": the 0ms timer resolves on the
 * next macrotask, so an already-settled queue (nothing holding the slot) wins
 * the race via its microtask, while a held slot loses it and yields null.
 */
export async function acquireBrowserSlot(waitMs: number): Promise<(() => void) | null> {
  let releaseTicket!: () => void;
  const ticket = new Promise<void>((resolve) => {
    releaseTicket = resolve;
  });

  const waitFor = queueTail;
  queueTail = waitFor.then(() => ticket);

  let timer: NodeJS.Timeout | undefined;
  const acquired = await Promise.race([
    waitFor.then(() => true),
    new Promise<boolean>((resolve) => {
      timer = setTimeout(() => resolve(false), Math.max(0, waitMs));
    }),
  ]);
  if (timer) clearTimeout(timer);

  if (!acquired) {
    // Give up our place in line so the queue doesn't stall behind a ticket
    // nobody is holding. Note this does NOT touch activeHolders — we never
    // acquired, and the real holder's state must be left alone.
    releaseTicket();
    return null;
  }

  activeHolders++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeHolders--;
    releaseTicket();
  };
}

export interface ScriptedPage {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  /**
   * Close the browser AND release the container's browser slot. Always use
   * this instead of `browser.close()` — a missed release blocks every later
   * browser run in the process.
   */
  close: () => Promise<void>;
}

export interface OpenScriptedPageOptions {
  storageState?: PlaywrightStorageState | null;
  /**
   * How long to wait for the single browser slot. Background/cron callers
   * should pass 0 to skip their turn rather than queue behind a user.
   *
   * Default 60s. When `deadline` is also given the wait is capped much
   * tighter (see resolveSlotWait) — queueing must not eat the budget the
   * flow itself needs.
   */
  waitForSlotMs?: number;
  /**
   * Absolute wall-clock deadline (a Date.now() value) for the whole run this
   * page belongs to. Supplying it is what stops the slot wait from stacking
   * on top of the flow's own budget: without it, 60s of queueing + a 45s
   * navigation + a 240s flow summed to 345s and blew the caller's 310s tool
   * cap every time the slot was contended.
   */
  deadline?: number;
  /** Block images/media/fonts (default true — nothing here reads them). */
  blockHeavyResources?: boolean;
}

const DEFAULT_SLOT_WAIT_MS = 60_000;
// With a deadline in play, queueing is capped hard: 30s of waiting still
// leaves the great majority of a 270s budget for the run that follows.
const DEADLINE_SLOT_WAIT_CAP_MS = 30_000;
// Below this much remaining budget there is no point queueing at all —
// launch plus the first navigation would consume most of it. Take the slot
// only if it is free right now, otherwise fail fast and say so.
const MIN_WORK_BUDGET_MS = 90_000;

function resolveSlotWait(opts: OpenScriptedPageOptions): number {
  const requested = opts.waitForSlotMs ?? DEFAULT_SLOT_WAIT_MS;
  if (opts.deadline === undefined) return requested;
  const spare = opts.deadline - Date.now() - MIN_WORK_BUDGET_MS;
  return Math.max(0, Math.min(requested, DEADLINE_SLOT_WAIT_CAP_MS, spare));
}

/** Clamp a preferred Playwright timeout so it can never outlive `deadline`. */
export function clampToDeadline(deadline: number, preferredMs: number, minMs = 5_000): number {
  return Math.max(minMs, Math.min(preferredMs, deadline - Date.now()));
}

/** Thrown when the container's single browser slot never came free. */
export class BrowserSlotBusyError extends Error {
  constructor(waitMs: number) {
    super(
      waitMs > 0
        ? `Another browser automation was still running after ${Math.round(waitMs / 1000)}s. Only one browser runs at a time on this instance; try again in a minute.`
        : 'Another browser automation is already running; skipping this turn.',
    );
    this.name = 'BrowserSlotBusyError';
  }
}

export async function openScriptedPage(
  options: PlaywrightStorageState | null | OpenScriptedPageOptions = {},
): Promise<ScriptedPage> {
  // Back-compat: earlier callers passed a bare storageState (or null).
  const opts: OpenScriptedPageOptions =
    options && typeof options === 'object' && !('cookies' in options) && !('origins' in options)
      ? (options as OpenScriptedPageOptions)
      : { storageState: options as PlaywrightStorageState | null };

  const waitForSlotMs = resolveSlotWait(opts);
  const releaseSlot = await acquireBrowserSlot(waitForSlotMs);
  if (!releaseSlot) throw new BrowserSlotBusyError(waitForSlotMs);

  let browser: Browser;
  try {
    browser = await chromium.launch({ headless: true, args: LAUNCH_ARGS });
  } catch (err) {
    releaseSlot();
    throw err;
  }

  try {
    const userAgent = await resolveUserAgent(browser);
    const context = await browser.newContext({
      ...(opts.storageState ? { storageState: opts.storageState } : {}),
      ...(userAgent ? { userAgent } : {}),
      // Smaller than a desktop window: fewer rendered pixels is directly less
      // renderer memory, and OWA still lays out its message list normally.
      viewport: { width: 1280, height: 800 },
    });

    if (opts.blockHeavyResources !== false) {
      await context.route('**/*', (route) => {
        if (HEAVY_RESOURCE_TYPES.has(route.request().resourceType())) {
          route.abort().catch(() => {});
          return;
        }
        route.continue().catch(() => {});
      });
    }

    const page = await context.newPage();
    let closed = false;
    const close = async () => {
      if (closed) return;
      closed = true;
      try {
        await browser.close();
      } finally {
        releaseSlot();
      }
    };
    return { browser, context, page, close };
  } catch (err) {
    await browser.close().catch(() => {});
    releaseSlot();
    throw err;
  }
}

/**
 * Encrypted Playwright storageState persistence, keyed by (user, provider) in
 * the browser_sessions table. Every method is best-effort: a missing table or
 * a corrupt/undecryptable blob degrades to "no stored session" instead of
 * failing the whole browser run.
 */
export class SessionStore {
  constructor(
    private db: D1Database,
    private userId: number,
    private pinHash: string,
    private provider: string,
  ) {}

  async load(): Promise<PlaywrightStorageState | null> {
    try {
      const row = await this.db
        .prepare('SELECT encrypted_state FROM browser_sessions WHERE user_id = ? AND provider = ?')
        .bind(this.userId, this.provider)
        .first<{ encrypted_state: string }>();
      if (!row) return null;
      return JSON.parse(await decrypt(row.encrypted_state, this.pinHash));
    } catch {
      return null;
    }
  }

  async save(state: unknown): Promise<void> {
    try {
      const encrypted = await encrypt(JSON.stringify(state), this.pinHash);
      await this.db
        .prepare(
          `INSERT INTO browser_sessions (user_id, provider, encrypted_state)
           VALUES (?, ?, ?)
           ON CONFLICT(user_id, provider) DO UPDATE SET
             encrypted_state = excluded.encrypted_state,
             updated_at = CURRENT_TIMESTAMP`,
        )
        .bind(this.userId, this.provider, encrypted)
        .run();
    } catch {
      // Session reuse is an optimisation — never fail a successful run over it.
    }
  }

  async clear(): Promise<void> {
    try {
      await this.db
        .prepare('DELETE FROM browser_sessions WHERE user_id = ? AND provider = ?')
        .bind(this.userId, this.provider)
        .run();
    } catch {
      // ignore
    }
  }
}

/** R2 key where the latest failure screenshot for a provider flow is kept. */
export function debugScreenshotKey(provider: string, userId: number): string {
  return `debug/${provider}-login-${userId}.jpg`;
}

/**
 * Capture what the page looked like when a scripted flow failed and store it
 * in R2 (if configured). Returns true when a screenshot was saved. This is
 * the difference between "Login did not reach the inbox" and actually seeing
 * which screen the flow was stuck on.
 */
export async function saveDebugScreenshot(page: Page, key: string): Promise<boolean> {
  try {
    const bucket = createRenderDocumentsBucket();
    if (!bucket) return false;
    const shot = await page.screenshot({ type: 'jpeg', quality: 55, timeout: 5000 });
    await bucket.put(key, shot, { httpMetadata: { contentType: 'image/jpeg' } });
    return true;
  } catch {
    return false;
  }
}

export interface ScriptedSessionInput {
  db: D1Database;
  userId: number;
  pinHash: string;
  /** browser_sessions.provider key, e.g. "outlook". */
  provider: string;
  /** First URL to open (with the restored session, if any). */
  startUrl: string;
  /**
   * Wall-clock budget for the ENTIRE call: queueing for the browser slot,
   * launching Chromium, the first navigation, and the flow itself. Set it
   * from the caller's own hard limit (for browser_task that is the 310s tool
   * cap) so this function always returns a diagnosable result before that
   * limit fires. See DEFAULT_SCRIPTED_BUDGET_MS.
   */
  budgetMs?: number;
}

/**
 * Default total budget for a scripted flow.
 *
 * The browser_task tool races the whole call at 310s. When that race won, the
 * Playwright promise was simply abandoned: Chromium kept running to its own
 * deadline, kept holding the container's single browser slot, and kept its
 * several hundred MB of RSS on a 512MB instance — which is what took the
 * Render service down with a SIGTERM mid-scrape and made the user's request
 * come back as "still running" forever. 270s finishes and reports inside the
 * tool cap with headroom to spare.
 */
export const DEFAULT_SCRIPTED_BUDGET_MS = 270_000;

/** Preferred timeout for the flow's opening navigation. */
const START_NAV_TIMEOUT_MS = 45_000;

/** Thrown when a scripted flow exhausted its total budget and was cancelled. */
export class ScriptedRunTimeoutError extends Error {
  constructor(public readonly budgetMs: number) {
    super(
      `The scripted browser run did not finish within its ${Math.round(budgetMs / 1000)}s budget and was cancelled.`,
    );
    this.name = 'ScriptedRunTimeoutError';
  }
}

export type ScriptedSessionResult<T> =
  | { status: 'completed'; value: T }
  | { status: 'failed'; error: string };

/**
 * Full lifecycle for a scripted, session-persisting browser flow:
 * restore stored cookies → open the start URL → run the provider flow →
 * persist the (now known-good) session. On any failure the stored session is
 * cleared — a half-authenticated cookie set poisons the next run — and a
 * debug screenshot of the stuck page is saved to R2.
 *
 * The whole thing is bounded by `budgetMs`, enforced by closing the browser
 * when the deadline passes. Closing is what makes this a real cancellation
 * rather than a race the caller walks away from: every in-flight Playwright
 * call rejects at once, so the run settles, the slot is released for the next
 * request, and the memory comes back.
 *
 * `run` receives that deadline and must respect it too — the watchdog is the
 * backstop, not the plan.
 */
export async function withScriptedSession<T>(
  input: ScriptedSessionInput,
  run: (page: Page, deadline: number) => Promise<T>,
): Promise<ScriptedSessionResult<T>> {
  const budgetMs = input.budgetMs ?? DEFAULT_SCRIPTED_BUDGET_MS;
  const deadline = Date.now() + budgetMs;
  const store = new SessionStore(input.db, input.userId, input.pinHash, input.provider);
  const storedState = await store.load();

  let scripted: ScriptedPage | undefined;
  let watchdog: NodeJS.Timeout | undefined;
  let cancelled = false;
  try {
    scripted = await openScriptedPage({ storageState: storedState, deadline });
    const { context, page } = scripted;
    const opened = scripted;

    const work = (async () => {
      await page.goto(input.startUrl, {
        waitUntil: 'domcontentloaded',
        timeout: clampToDeadline(deadline, START_NAV_TIMEOUT_MS),
      });
      const value = await run(page, deadline);
      // Read the session state here, inside the raced work — after the race
      // resolves the watchdog may already have closed the browser.
      return { value, state: await context.storageState() };
    })();

    const expiry = new Promise<never>((_, reject) => {
      watchdog = setTimeout(() => {
        cancelled = true;
        void opened.close().catch(() => {});
        reject(new ScriptedRunTimeoutError(budgetMs));
      }, Math.max(0, deadline - Date.now()));
    });

    const { value, state } = await Promise.race([work, expiry]);
    // The flow completed — only now is the session known-good and safe to keep.
    await store.save(state);
    return { status: 'completed', value };
  } catch (err) {
    await store.clear();
    const detail = err instanceof Error ? err.message : String(err);
    let where = '';
    if (scripted?.page) {
      // page.url() is served from Playwright's cached frame state, so it is
      // still readable after a cancellation closed the browser.
      where = ` | URL at failure: ${scripted.page.url()}`;
      // A cancelled run has no live page left to photograph, and the attempt
      // would just burn the screenshot timeout.
      if (!cancelled) {
        const key = debugScreenshotKey(input.provider, input.userId);
        if (await saveDebugScreenshot(scripted.page, key)) {
          where += ` | A screenshot of the stuck page was saved (GET /api/system/debug/browser-screenshot?provider=${input.provider}).`;
        }
      }
    }
    return { status: 'failed', error: detail + where };
  } finally {
    if (watchdog) clearTimeout(watchdog);
    if (scripted) await scripted.close().catch(() => {});
  }
}

// ── Selector helpers ────────────────────────────────────────────────────────
// AAD (and many corporate IdPs) leave hidden template copies of elements in
// the DOM, so "first match" strategies pick invisible nodes. These helpers
// always scan for the first *visible* element.

export async function isVisible(page: Page, selector: string, timeout = 500): Promise<boolean> {
  for (const part of selector.split(',').map((value) => value.trim()).filter(Boolean)) {
    const candidates = page.locator(part);
    const count = await candidates.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      if (await candidates.nth(i).isVisible({ timeout }).catch(() => false)) return true;
    }
  }
  return false;
}

export async function clickFirstVisible(page: Page, selectors: string[]): Promise<boolean> {
  for (const selector of selectors) {
    const candidates = page.locator(selector);
    const count = await candidates.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      const candidate = candidates.nth(i);
      if (!(await candidate.isVisible({ timeout: 300 }).catch(() => false))) continue;
      if (await candidate.click({ timeout: 3000 }).then(() => true).catch(() => false)) return true;
    }
  }
  return false;
}

export async function firstVisibleLocator(
  page: Page,
  selectors: string[],
): Promise<Locator | null> {
  for (const selector of selectors) {
    const candidates = page.locator(selector);
    const count = await candidates.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      const candidate = candidates.nth(i);
      if (await candidate.isVisible({ timeout: 300 }).catch(() => false)) return candidate;
    }
  }
  return null;
}

export async function fillFirstVisible(
  page: Page,
  selectors: string[],
  value: string,
): Promise<boolean> {
  const field = await firstVisibleLocator(page, selectors);
  if (!field) return false;
  return field.fill(value).then(() => true).catch(() => false);
}
