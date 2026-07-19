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
const LAUNCH_ARGS = ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'];

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

export interface ScriptedPage {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export async function openScriptedPage(
  storageState?: PlaywrightStorageState | null,
): Promise<ScriptedPage> {
  const browser = await chromium.launch({ headless: true, args: LAUNCH_ARGS });
  try {
    const userAgent = await resolveUserAgent(browser);
    const context = await browser.newContext({
      ...(storageState ? { storageState } : {}),
      ...(userAgent ? { userAgent } : {}),
      viewport: { width: 1366, height: 900 },
    });
    const page = await context.newPage();
    return { browser, context, page };
  } catch (err) {
    await browser.close().catch(() => {});
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
 */
export async function withScriptedSession<T>(
  input: ScriptedSessionInput,
  run: (page: Page) => Promise<T>,
): Promise<ScriptedSessionResult<T>> {
  const store = new SessionStore(input.db, input.userId, input.pinHash, input.provider);
  const storedState = await store.load();

  let scripted: ScriptedPage | undefined;
  try {
    scripted = await openScriptedPage(storedState);
    const { context, page } = scripted;
    await page.goto(input.startUrl, { waitUntil: 'domcontentloaded' });

    const value = await run(page);

    // The flow completed — only now is the session known-good and safe to keep.
    await store.save(await context.storageState());
    return { status: 'completed', value };
  } catch (err) {
    await store.clear();
    const detail = err instanceof Error ? err.message : String(err);
    let where = '';
    if (scripted?.page) {
      where = ` | URL at failure: ${scripted.page.url()}`;
      const key = debugScreenshotKey(input.provider, input.userId);
      if (await saveDebugScreenshot(scripted.page, key)) {
        where += ` | A screenshot of the stuck page was saved (GET /api/system/debug/browser-screenshot?provider=${input.provider}).`;
      }
    }
    return { status: 'failed', error: detail + where };
  } finally {
    if (scripted) await scripted.browser.close().catch(() => {});
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
