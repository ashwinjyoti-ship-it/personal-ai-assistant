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
import type { BrowserContextOptions, Page } from 'playwright';
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
const LOGIN_TIMEOUT_MS = 60000;
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

async function clearStoredState(db: D1Database, userId: number): Promise<void> {
  await db
    .prepare('DELETE FROM browser_sessions WHERE user_id = ? AND provider = ?')
    .bind(userId, 'outlook')
    .run();
}

/**
 * Log into OWA (driving through whatever AAD screens appear) and scrape the
 * most recent inbox messages.
 *
 * Login selectors use Microsoft's long-stable AAD element ids (i0116 email /
 * i0118 password / idSIButton9 primary button) rather than generic
 * input[type=...] selectors, since AAD has carried those ids for years across
 * tenant branding changes. ensureLoggedIn() is a screen-detecting loop rather
 * than a fixed sequence, because AAD interleaves optional screens (account
 * picker, "stay signed in?", first-run mailbox setup) unpredictably.
 *
 * A session is persisted ONLY after the inbox is confirmed to have rendered —
 * never mid-login — so a half-authenticated cookie set can't be saved and then
 * poison the next run (which surfaced as the AAD account-picker on retry). Any
 * failure that never reaches the inbox clears the stored session so the next
 * run starts clean.
 */
export async function scrapeOutlookInbox(
  input: OutlookPlaywrightInput,
): Promise<OutlookPlaywrightResult> {
  const { db, userId, pinHash, username, password } = input;
  const storedState = await loadStoredState(db, userId, pinHash);

  const browser = await chromium.launch({ headless: true });
  let page: Page | undefined;
  try {
    const context = await browser.newContext(storedState ? { storageState: storedState } : {});
    page = await context.newPage();
    page.setDefaultTimeout(NAV_TIMEOUT_MS);

    await page.goto(OWA_INBOX_URL, { waitUntil: 'domcontentloaded' });

    await ensureLoggedIn(page, username, password);

    const emails = await extractEmails(page);

    // Inbox confirmed rendered — only now is the session known-good and safe
    // to persist for the next run.
    await saveStoredState(db, userId, pinHash, await context.storageState());

    return { status: 'completed', emails };
  } catch (err) {
    // Never keep a session behind a failed run — a stale/partial one is exactly
    // what makes AAD bounce to the account-picker next time.
    await clearStoredState(db, userId).catch(() => {});
    const detail = err instanceof Error ? err.message : String(err);
    const where = page ? ` | URL at failure: ${page.url()}` : '';
    return { status: 'failed', error: detail + where };
  } finally {
    await browser.close();
  }
}

async function isVisible(page: Page, selector: string, timeout = 500): Promise<boolean> {
  return page.locator(selector).first().isVisible({ timeout }).catch(() => false);
}

async function clickPrimary(page: Page): Promise<void> {
  await page.locator('#idSIButton9, input[type="submit"], button[type="submit"]').first()
    .click({ timeout: 3000 })
    .catch(() => {});
}

// Drive the AAD sign-in flow to the inbox. AAD does not present a fixed
// sequence: a returning cookie may open the "pick an account" tiles, a first
// login goes email → password → "stay signed in?", and any of those screens
// can be skipped. So detect the current screen each tick and act, rather than
// assuming an order. Reaching outlook.office.com (off any /login path) is the
// success condition; MFA and rejected credentials throw clear, actionable
// errors since a script cannot get past them.
async function ensureLoggedIn(page: Page, username: string, password: string): Promise<void> {
  const deadline = Date.now() + LOGIN_TIMEOUT_MS;
  let emailSubmitted = false;
  let passwordSubmitted = false;

  while (Date.now() < deadline) {
    const url = page.url();

    // Success: on an Outlook host and no longer on a login/auth redirect.
    if (/outlook\.office\.com/.test(url) && !/\/login|logout|auth/i.test(url)) {
      return;
    }

    // MFA / verification code / "approve sign-in" — unscriptable.
    if (await isVisible(page, '#idDiv_SAOTCS_Proofs, #idTxtBx_SAOTCC_OTC, #idRemoteNGC_DisplaySign, [data-bind*="verificationCode"]')) {
      throw new Error(
        'Outlook is asking for multi-factor authentication (a verification code or app approval), which scripted login cannot complete. Disable MFA for this account, or use the Browser Use path for Outlook.',
      );
    }

    // Rejected credentials — surface the AAD message and stop retrying blindly.
    const errText = await page.locator('#usernameError, #passwordError, .alert-error, #idTD_Error')
      .first().innerText({ timeout: 300 }).catch(() => '');
    if (errText && errText.trim()) {
      throw new Error(
        `Outlook rejected the saved credentials ("${errText.trim().slice(0, 120)}"). Update the Outlook entry in the Secret Vault.`,
      );
    }

    // "Pick an account" tiles (shown when a cookie half-identifies the user).
    // Force a clean email entry via "Use another account".
    if (await isVisible(page, '#otherTile, #tilesHolder, [data-test-id="accountList"]')) {
      const another = page.locator(
        '#otherTile, [data-test-id="use-another-account"], [role="button"]:has-text("Use another account")',
      ).first();
      if ((await another.count().catch(() => 0)) > 0) {
        await another.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(800);
        continue;
      }
    }

    // Email screen.
    if (!emailSubmitted && await isVisible(page, '#i0116')) {
      await page.fill('#i0116', username);
      await clickPrimary(page);
      emailSubmitted = true;
      await page.waitForTimeout(1000);
      continue;
    }

    // Password screen.
    if (!passwordSubmitted && await isVisible(page, '#i0118')) {
      await page.fill('#i0118', password);
      await clickPrimary(page);
      passwordSubmitted = true;
      await page.waitForTimeout(1000);
      continue;
    }

    // "Stay signed in?" (KMSI) — click Yes so the session cookie persists.
    if (await isVisible(page, '#KmsiCheckboxField')) {
      await clickPrimary(page);
      await page.waitForTimeout(800);
      continue;
    }

    // A lone primary button with no recognised input (interstitial "Next"/
    // "Continue") — nudge it forward once the credentials are already in.
    if (passwordSubmitted && await isVisible(page, '#idSIButton9')
        && !(await isVisible(page, '#i0116')) && !(await isVisible(page, '#i0118'))) {
      await clickPrimary(page);
      await page.waitForTimeout(800);
      continue;
    }

    await page.waitForTimeout(600);
  }

  const bodyText = (await page.locator('body').innerText().catch(() => ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
  throw new Error(
    `Login did not reach the inbox within ${LOGIN_TIMEOUT_MS}ms (last URL: ${page.url()}; visible: "${bodyText}").`,
  );
}

// OWA can interpose one-time screens between login and the inbox: the
// new-mailbox language/time-zone setup form, and assorted "welcome" /
// feature-tour dialogs. Best-effort dismissal of the known ones — every
// check is cheap and silently skipped when the screen isn't there.
async function dismissBlockers(page: Page): Promise<void> {
  // First-run mailbox setup: a form asking for display language + time zone.
  // The defaults are fine; just submit it.
  const tzSelect = page.locator('select[name="tzid"], select#tzid');
  if ((await tzSelect.count().catch(() => 0)) > 0) {
    const save = page.getByRole('button', { name: /save|continue/i }).first();
    await save.click({ timeout: 2000 }).catch(() => {});
    return;
  }
  // Dismissable dialogs (feature tours, "get the mobile app", ...).
  const dialogButton = page
    .locator('[role="dialog"]')
    .getByRole('button', { name: /^(close|got it|no,? thanks|maybe later|not now|skip( for now)?|dismiss|ok(ay)?)$/i })
    .first();
  await dialogButton.click({ timeout: 1500 }).catch(() => {});
}

// Row locator candidates, most specific first. OWA's obfuscated CSS classes
// churn constantly; these hooks are the stable ones — the ARIA message list,
// any listbox of options, and the per-conversation data-convid attribute.
function messageRowCandidates(page: Page) {
  return [
    page.getByRole('listbox', { name: /message list/i }).getByRole('option'),
    page.locator('[role="listbox"] [role="option"]'),
    page.locator('[data-convid]'),
    page.getByRole('option'),
  ];
}

async function waitForMessageRows(page: Page) {
  const deadline = Date.now() + NAV_TIMEOUT_MS;
  while (Date.now() < deadline) {
    await dismissBlockers(page);
    for (const rows of messageRowCandidates(page)) {
      if ((await rows.count().catch(() => 0)) > 0) return rows;
    }
    await page.waitForTimeout(1000);
  }
  // Include what the page actually shows so the failure is diagnosable from
  // the tool log without a screenshot.
  const bodyText = (await page.locator('body').innerText().catch(() => ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
  throw new Error(
    `Message list did not appear within ${NAV_TIMEOUT_MS}ms. Visible page text: "${bodyText}"`,
  );
}

async function extractEmails(page: Page): Promise<OutlookEmailSummary[]> {
  const rows = await waitForMessageRows(page);
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
