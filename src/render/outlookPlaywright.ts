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
// runs skip the login flow entirely. Browser launch, session persistence, and
// failure screenshots are shared infrastructure in playwrightCore.ts — new
// scripted sites should build on that module the same way this one does.

import type { Locator, Page } from 'playwright';
import { accountTileMatchesUsername, isOutlookInboxUrl } from '../services/outlookAccount';
import {
  clickFirstVisible,
  fillFirstVisible,
  isVisible,
  withScriptedSession,
} from './playwrightCore';

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
// Everything after the initial page load (login + message extraction,
// including the one re-login retry) shares this budget. The browser_task tool
// kills the run at 310s; launch + goto can eat tens of seconds on the starter
// instance, so 240s here keeps the whole run under the tool cap.
const OVERALL_BUDGET_MS = 240000;
// Two minutes, not one: AAD → (optional) federated IdP → AAD → OWA boot is a
// long redirect chain, and Render's starter instance has half a CPU. The
// browser_task tool budget is 310s, so 45s goto + 120s login + 45s message
// wait still fits comfortably.
const LOGIN_TIMEOUT_MS = 120000;
const MAX_EMAILS = 10;

// Microsoft-hosted and federated corporate sign-in pages do not all use the
// same markup. Keep the stable AAD ids first, then support the common generic
// names used by branded identity-provider pages (ADFS uses #userNameInput /
// #passwordInput, which the substring id selectors cover).
const EMAIL_INPUT_SELECTORS = [
  '#i0116',
  'input[name="loginfmt"]',
  'input[autocomplete="username"]',
  'input[type="email"]',
  'input[name="username"]',
  'input[id*="username" i]',
];
const PASSWORD_INPUT_SELECTORS = [
  '#i0118',
  'input[name="passwd"]',
  'input[autocomplete="current-password"]',
  'input[type="password"]',
  'input[name="password"]',
  'input[id*="password" i]',
];
const PRIMARY_BUTTON_SELECTORS = [
  '#idSIButton9',
  '#submitButton',
  '#next',
  'input[type="submit"]',
  'button[type="submit"]',
  'button:has-text("Sign in")',
  'button:has-text("Next")',
  'button:has-text("Continue")',
  'button:has-text("Yes")',
];

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
 * Session handling (in withScriptedSession): the session is persisted ONLY
 * after the inbox is confirmed to have rendered — never mid-login — so a
 * half-authenticated cookie set can't be saved and then poison the next run.
 * Any failure clears the stored session and captures a screenshot of the
 * stuck page to R2 for diagnosis.
 */
export async function scrapeOutlookInbox(
  input: OutlookPlaywrightInput,
): Promise<OutlookPlaywrightResult> {
  const result = await withScriptedSession(
    {
      db: input.db,
      userId: input.userId,
      pinHash: input.pinHash,
      provider: 'outlook',
      startUrl: OWA_INBOX_URL,
    },
    async (page) => {
      page.setDefaultTimeout(NAV_TIMEOUT_MS);
      const overallDeadline = Date.now() + OVERALL_BUDGET_MS;
      await ensureLoggedIn(page, input.username, input.password, overallDeadline);
      try {
        return await extractEmails(page, overallDeadline);
      } catch (err) {
        // OWA serves its /mail/ shell before deciding the user is
        // unauthenticated, so the page can bounce to the AAD sign-in screen
        // AFTER login looked complete. If that's where extraction died,
        // the login never really happened — drive it once more and
        // re-extract within the same overall budget.
        if (await onLoginScreen(page)) {
          await ensureLoggedIn(page, input.username, input.password, overallDeadline);
          return extractEmails(page, overallDeadline);
        }
        throw err;
      }
    },
  );

  if (result.status === 'completed') return { status: 'completed', emails: result.value };
  return { status: 'failed', error: result.error };
}

function hostnameOf(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return rawUrl;
  }
}

// Is the page currently showing a Microsoft/corporate sign-in surface?
// Used to detect OWA bouncing back to auth after the URL briefly looked
// signed-in. Never true while on a real mailbox URL, so OWA's own inputs
// (search box etc.) can't false-positive.
async function onLoginScreen(page: Page): Promise<boolean> {
  const url = page.url();
  if (isOutlookInboxUrl(url)) return false;
  const host = hostnameOf(url);
  if (host === 'login.microsoftonline.com' || host === 'login.live.com') return true;
  return (await isVisible(page, EMAIL_INPUT_SELECTORS.join(', ')))
    || (await isVisible(page, PASSWORD_INPUT_SELECTORS.join(', ')));
}

async function clickPrimary(page: Page): Promise<boolean> {
  if (await clickFirstVisible(page, PRIMARY_BUTTON_SELECTORS)) return true;
  // Some branded corporate forms submit on Enter without exposing a button
  // that matches the standard AAD selectors.
  return page.keyboard.press('Enter').then(() => true).catch(() => false);
}

async function findMatchingAccountTile(page: Page, username: string): Promise<Locator | null> {
  const selectors = [
    '#tilesHolder .tile',
    '#tilesHolder [role="button"]',
    '[data-test-id="accountList"] [role="option"]',
    '[data-test-id="accountList"] [role="button"]',
  ];

  for (const selector of selectors) {
    const candidates = page.locator(selector);
    const count = await candidates.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      const candidate = candidates.nth(i);
      if (!(await candidate.isVisible({ timeout: 300 }).catch(() => false))) continue;
      const text = await candidate.innerText({ timeout: 500 }).catch(() => '');
      if (accountTileMatchesUsername(text, username)) return candidate;
    }
  }
  return null;
}

// Drive the AAD sign-in flow to the inbox. AAD does not present a fixed
// sequence: a returning cookie may open the "pick an account" tiles, a first
// login goes email → password → "stay signed in?", and any of those screens
// can be skipped — or detoured through a federated corporate IdP on its own
// host, which asks for the username AGAIN. So detect the current screen each
// tick and act, and track credential entry PER HOST rather than once
// globally: a one-shot "already typed the email" flag deadlocks exactly at
// that federated hop. MFA and rejected credentials throw clear, actionable
// errors since a script cannot get past them.
async function ensureLoggedIn(
  page: Page,
  username: string,
  password: string,
  overallDeadline: number,
): Promise<void> {
  const deadline = Math.min(Date.now() + LOGIN_TIMEOUT_MS, overallDeadline);
  const emailFilledOnHosts = new Set<string>();
  const passwordFilledOnHosts = new Set<string>();
  let accountPickerActions = 0;
  let landingSignInClicks = 0;

  while (Date.now() < deadline) {
    const url = page.url();

    // Success: a signed-in Outlook mailbox URL (host allowlist, path-only
    // veto — see isOutlookInboxUrl for why the query string must not count).
    //
    // The URL alone is NOT proof of login: OWA serves a 200 shell at /mail/
    // and only afterwards does its JS bounce an unauthenticated user to AAD.
    // Trusting the first sighting made this loop exit before typing anything
    // — the run then died at "Message list did not appear" with the AAD
    // sign-in screen visible. Require the URL to survive a settle delay.
    if (isOutlookInboxUrl(url)) {
      await page.waitForTimeout(2500);
      if (isOutlookInboxUrl(page.url())) return;
      continue; // bounced to auth during the settle — keep driving the login
    }
    const host = hostnameOf(url);

    // MFA / verification code / "approve sign-in" — unscriptable.
    const pageText = (await page.locator('body').innerText().catch(() => ''))
      .replace(/\s+/g, ' ')
      .trim();
    if (
      await isVisible(page, '#idDiv_SAOTCS_Proofs, #idTxtBx_SAOTCC_OTC, #idRemoteNGC_DisplaySign, [data-bind*="verificationCode"]')
      || /verification code|approve sign-in|microsoft authenticator|security key|conditional access/i.test(pageText)
    ) {
      throw new Error(
        'Outlook is asking for multi-factor authentication (a verification code or app approval), which scripted login cannot complete. Disable MFA for this account, or use the Browser Use path for Outlook.',
      );
    }

    // Rejected credentials — surface the AAD message and stop retrying blindly.
    const errText = await page.locator('#usernameError, #passwordError, .alert-error, #idTD_Error, #errorText')
      .first().innerText({ timeout: 300 }).catch(() => '');
    if (errText && errText.trim()) {
      throw new Error(
        `Outlook rejected the saved credentials ("${errText.trim().slice(0, 120)}"). Update the Outlook entry in the Secret Vault.`,
      );
    }

    // "Pick an account" tiles (shown when a cookie half-identifies the user).
    // Select only the tile matching the saved username. If it is not present,
    // use Microsoft's explicit "Use another account" route and type the exact
    // username. Never select an account by position.
    if (await isVisible(page, '#otherTile, #tilesHolder, [data-test-id="accountList"]')) {
      accountPickerActions++;
      if (accountPickerActions > 3) {
        throw new Error(`Microsoft account picker did not resolve the saved account "${username}".`);
      }

      const matchingTile = await findMatchingAccountTile(page, username);
      if (matchingTile) {
        await matchingTile.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(800);
        continue;
      }

      const clickedAnother = await clickFirstVisible(page, [
        '#otherTile',
        '[data-test-id="use-another-account"]',
        '[role="button"]:has-text("Use another account")',
        '[role="option"]:has-text("Use another account")',
      ]);
      if (clickedAnother) {
        await page.waitForTimeout(800);
        continue;
      }

      const pickerText = pageText.slice(0, 300);
      throw new Error(
        `Microsoft account picker did not show "${username}" and did not expose "Use another account". Visible text: "${pickerText}"`,
      );
    }

    // Email/username screen. Standard AAD plus branded corporate/federated
    // sign-in pages — each host gets one chance to receive the username, so
    // AAD's screen and a federated IdP's screen both get filled.
    if (!emailFilledOnHosts.has(host) && await fillFirstVisible(page, EMAIL_INPUT_SELECTORS, username)) {
      emailFilledOnHosts.add(host);
      // Combined username+password forms (typical of ADFS and other branded
      // IdPs) must have both fields filled before submitting once.
      if (await fillFirstVisible(page, PASSWORD_INPUT_SELECTORS, password)) {
        passwordFilledOnHosts.add(host);
      }
      if (!(await clickPrimary(page))) throw new Error('Outlook username field was filled but the sign-in form could not be submitted.');
      await page.waitForTimeout(1000);
      continue;
    }

    // Password screen — same per-host rule as the username.
    if (!passwordFilledOnHosts.has(host) && await fillFirstVisible(page, PASSWORD_INPUT_SELECTORS, password)) {
      if (!(await clickPrimary(page))) throw new Error('Outlook password field was filled but the sign-in form could not be submitted.');
      passwordFilledOnHosts.add(host);
      await page.waitForTimeout(1000);
      continue;
    }

    // "Stay signed in?" (KMSI) — click Yes so the session cookie persists.
    // Detect by the stable checkbox id or by the prompt text, since some
    // tenants render KMSI without the classic checkbox markup.
    if (await isVisible(page, '#KmsiCheckboxField') || /stay signed in\?/i.test(pageText)) {
      await clickPrimary(page);
      await page.waitForTimeout(800);
      continue;
    }

    // A lone primary button with no recognised input (interstitial "Next"/
    // "Continue") — nudge it forward once the credentials are already in.
    if (
      passwordFilledOnHosts.size > 0
      && await isVisible(page, PRIMARY_BUTTON_SELECTORS.join(', '))
      && !(await isVisible(page, EMAIL_INPUT_SELECTORS.join(', ')))
      && !(await isVisible(page, PASSWORD_INPUT_SELECTORS.join(', ')))
    ) {
      await clickPrimary(page);
      await page.waitForTimeout(800);
      continue;
    }

    // Passwordless sign-in screens: after the username, tenants increasingly
    // default to "we'll send a code to your email/Authenticator" instead of a
    // password box. A password IS available — behind an explicit "Use your
    // password" / "Other ways to sign in" link — so click through to it.
    if (
      await clickFirstVisible(page, [
        '#idA_PWD_SwitchToPassword',
        'a:has-text("Use your password")',
        'button:has-text("Use your password")',
        'a:has-text("Use my password")',
        'a:has-text("Other ways to sign in")',
        'a:has-text("Sign in another way")',
      ])
    ) {
      await page.waitForTimeout(1000);
      continue;
    }

    // Unauthenticated landing pages (outlook.office.com / outlook.live.com
    // marketing page): no login form exists until a lone "Sign in" button or
    // link is clicked. Only when NO email/password field is on screen — on
    // real AAD forms the fill branches above run first — and capped, so a
    // click that goes nowhere can't loop for the whole budget.
    if (
      landingSignInClicks < 3
      && !(await isVisible(page, EMAIL_INPUT_SELECTORS.join(', ')))
      && !(await isVisible(page, PASSWORD_INPUT_SELECTORS.join(', ')))
      && await clickFirstVisible(page, [
        'a[data-task="signin"]',
        'a:has-text("Sign in")',
        'button:has-text("Sign in")',
      ])
    ) {
      landingSignInClicks++;
      await page.waitForTimeout(1500);
      continue;
    }

    await page.waitForTimeout(600);
  }

  const bodyText = (await page.locator('body').innerText().catch(() => ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
  const title = await page.title().catch(() => '');
  const progress = `email filled on [${[...emailFilledOnHosts].join(', ') || 'none'}], `
    + `password filled on [${[...passwordFilledOnHosts].join(', ') || 'none'}], `
    + `account-picker actions: ${accountPickerActions}, landing sign-in clicks: ${landingSignInClicks}`;
  throw new Error(
    `Login did not reach the inbox within ${LOGIN_TIMEOUT_MS}ms (last URL: ${page.url()}; title: "${title}"; visible: "${bodyText}"; progress: ${progress}). Supported Microsoft/corporate login fields were not completed.`,
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

async function waitForMessageRows(page: Page, overallDeadline: number) {
  const deadline = Math.min(Date.now() + NAV_TIMEOUT_MS, overallDeadline);
  while (Date.now() < deadline) {
    // OWA bounced back to sign-in mid-wait: no message list is coming, and
    // the AAD account picker's role="option" tiles must never be scraped as
    // "emails" by the generic row fallback below. Fail fast so the caller's
    // re-login retry gets the remaining time budget.
    if (await onLoginScreen(page)) {
      throw new Error(
        'OWA returned to the Microsoft sign-in flow while waiting for the message list — the session was not actually signed in.',
      );
    }
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

async function extractEmails(page: Page, overallDeadline: number): Promise<OutlookEmailSummary[]> {
  const rows = await waitForMessageRows(page, overallDeadline);
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
