// Render-only: scripted Outlook Web Access (OWA) login + inbox scrape via Playwright.
//
// This file must only ever be imported from src/render/* (wired in via env.ts).
// It is never reachable from src/index.tsx's route graph, so the Cloudflare
// Pages/Workers build (which bundles everything reachable from that entry
// point) never touches the `playwright` package — Workers can't spawn a real
// browser binary anyway. Render's backend is a normal Node process, so it can.
//
// Replaces the Browser Use Cloud AI-agent call for the common case (plain
// username/password AAD login, no MFA): a deterministic script is faster and
// has no per-run API cost. Session cookies are persisted (encrypted) so most
// runs skip the login flow entirely.

import { chromium } from 'playwright';
import type { BrowserContextOptions } from 'playwright';
import { encrypt, decrypt } from '../services/crypto';

export interface OutlookEmailSummary {
  sender: string;
  subject: string;
  date: string;
  snippet: string;
}

export interface OutlookPlaywrightResult {
  status: 'completed' | 'failed';
  emails?: OutlookEmailSummary[];
  error?: string;
}

export interface OutlookPlaywrightInput {
  db: D1Database;
  userId: number;
  pinHash: string;
  username: string;
  password: string;
}

const OWA_INBOX_URL = 'https://outlook.office.com/mail/';
const NAV_TIMEOUT_MS = 45000;
const MAX_EMAILS = 10;

type PlaywrightStorageState = NonNullable<BrowserContextOptions['storageState']>;

async function loadStoredState(
  db: D1Database,
  userId: number,
  pinHash: string,
): Promise<PlaywrightStorageState | null> {
  const row = await db
    .prepare('SELECT encrypted_state FROM browser_sessions WHERE user_id = ? AND provider = ?')
    .bind(userId, 'outlook')
    .first<{ encrypted_state: string }>();
  if (!row) return null;
  try {
    return JSON.parse(await decrypt(row.encrypted_state, pinHash));
  } catch {
    return null; // corrupt/stale — fall through to a fresh login
  }
}

async function saveStoredState(
  db: D1Database,
  userId: number,
  pinHash: string,
  state: unknown,
): Promise<void> {
  const encrypted = await encrypt(JSON.stringify(state), pinHash);
  await db
    .prepare(
      `INSERT INTO browser_sessions (user_id, provider, encrypted_state)
       VALUES (?, 'outlook', ?)
       ON CONFLICT(user_id, provider) DO UPDATE SET
         encrypted_state = excluded.encrypted_state,
         updated_at = CURRENT_TIMESTAMP`,
    )
    .bind(userId, encrypted)
    .run();
}

/**
 * Log into OWA (if the saved session has expired) and scrape the most recent
 * inbox messages.
 *
 * Login selectors use Microsoft's long-stable AAD element ids (i0116/idSIButton9/
 * i0118) rather than generic input[type=...] selectors, since AAD's login page
 * has carried those ids for years across tenant branding changes. The inbox
 * message-list extraction relies on OWA's ARIA roles (listbox "Message list" /
 * option rows), which are more stable than OWA's obfuscated CSS classes — but
 * this has not been run against a live tenant, so the row text-parsing in
 * extractEmails() is the most likely thing to need adjustment on first real run.
 */
export async function scrapeOutlookInbox(
  input: OutlookPlaywrightInput,
): Promise<OutlookPlaywrightResult> {
  const { db, userId, pinHash, username, password } = input;
  const storedState = await loadStoredState(db, userId, pinHash);

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext(storedState ? { storageState: storedState } : {});
    const page = await context.newPage();
    page.setDefaultTimeout(NAV_TIMEOUT_MS);

    await page.goto(OWA_INBOX_URL, { waitUntil: 'domcontentloaded' });

    if (/login\.microsoftonline\.com/.test(page.url())) {
      await performLogin(page, username, password);
      await page.waitForURL(/outlook\.office\.com/, { timeout: NAV_TIMEOUT_MS });
    }

    const emails = await extractEmails(page);

    // Login (or a still-valid cookie) succeeded — persist the fresh state so
    // the next run can skip the login flow.
    const newState = await context.storageState();
    await saveStoredState(db, userId, pinHash, newState);

    return { status: 'completed', emails };
  } catch (err) {
    return { status: 'failed', error: err instanceof Error ? err.message : String(err) };
  } finally {
    await browser.close();
  }
}

async function performLogin(
  page: import('playwright').Page,
  username: string,
  password: string,
): Promise<void> {
  // Email screen
  await page.fill('#i0116, input[type="email"]', username);
  await page.click('#idSIButton9, input[type="submit"]');

  // Password screen
  await page.fill('#i0118, input[type="password"]', password);
  await page.click('#idSIButton9, input[type="submit"]');

  // "Stay signed in?" — click Yes so the persisted session cookie survives.
  // Best-effort: some tenants skip this screen entirely.
  const staySignedIn = page.locator('#idSIButton9');
  if (await staySignedIn.isVisible({ timeout: 8000 }).catch(() => false)) {
    await staySignedIn.click();
  }
}

async function extractEmails(page: import('playwright').Page): Promise<OutlookEmailSummary[]> {
  const messageList = page.getByRole('listbox', { name: /message list/i });
  await messageList.waitFor({ state: 'visible', timeout: NAV_TIMEOUT_MS });

  const rows = messageList.getByRole('option');
  const count = Math.min(await rows.count(), MAX_EMAILS);
  const emails: OutlookEmailSummary[] = [];

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    // OWA sets a single descriptive aria-label on each row (sender, subject,
    // preview, date all concatenated); fall back to innerText if absent.
    const label = (await row.getAttribute('aria-label')) ?? (await row.innerText());
    const parts = label
      .split(/[\n,]/)
      .map((p) => p.trim())
      .filter(Boolean);

    emails.push({
      sender: parts[0] ?? '',
      subject: parts[1] ?? '',
      snippet: parts.slice(2, -1).join(' ').slice(0, 200),
      date: parts[parts.length - 1] ?? '',
    });
  }

  return emails;
}
