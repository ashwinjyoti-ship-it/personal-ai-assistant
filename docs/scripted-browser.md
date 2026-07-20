# Scripted browser automation (Playwright on Render)

Karna runs deterministic Playwright flows on the Render backend for sites that
have no API (Outlook OWA behind organisational AAD auth is the first one).
This is free and fast compared to Browser Use Cloud, but each site needs a
scripted flow.

## Architecture

```
src/render/playwrightCore.ts    ← reusable infrastructure (site-agnostic)
src/render/outlookPlaywright.ts ← the Outlook flow, built on the core
src/render/env.ts               ← wires flows into Bindings (OUTLOOK_PLAYWRIGHT)
src/services/agent.ts           ← browser_task routes eligible asks to the flow
```

`playwrightCore.ts` provides everything a new scripted site needs:

- **`openScriptedPage(storageState?)`** — Chromium launched with
  container-safe flags (`--no-sandbox`, `--disable-dev-shm-usage`; Render runs
  the container as root with a tiny `/dev/shm`) and with the `HeadlessChrome`
  user-agent token stripped, which some login providers hard-reject.
- **`SessionStore`** — encrypted (AES-GCM, keyed by the user's PIN hash)
  Playwright `storageState` persistence in the `browser_sessions` table,
  keyed by `(user_id, provider)`. All methods are best-effort: a missing
  table or corrupt blob degrades to "no stored session", never a failed run.
- **`withScriptedSession(input, run)`** — the full lifecycle: restore stored
  cookies → open the start URL → run your flow → persist the session *only
  after the flow succeeded* (a half-authenticated cookie set poisons the next
  run). On failure it clears the stored session and captures a JPEG
  screenshot of the stuck page to R2.
- **Selector helpers** (`isVisible`, `clickFirstVisible`, `fillFirstVisible`,
  `firstVisibleLocator`) — always operate on the first *visible* match,
  because AAD-style pages leave hidden template copies of elements in the DOM.

## Adding a new scripted site

1. Create `src/render/<site>Playwright.ts`; import the core and call
   `withScriptedSession({ db, userId, pinHash, provider: '<site>', startUrl }, run)`.
2. Keep provider-specific selectors and screen-detection logic in that file.
   Prefer a screen-detecting loop over a fixed click sequence — login
   providers interleave optional screens unpredictably.
3. Expose the flow as a binding in `src/render/env.ts` (like
   `OUTLOOK_PLAYWRIGHT`) and thread it through the routes that need it.
   Never import `src/render/*` from code reachable from `src/index.tsx` —
   the Cloudflare Workers bundle must not touch the `playwright` package.
4. Route to it from `browser_task` in `src/services/agent.ts` with an
   explicit eligibility gate, the way `isOutlookReadOnlyBrowserTask` does.

## Page watches (first generic consumer)

"Watch this page and tell me when it changes." The agent tools `watch_page`,
`list_page_watches`, and `remove_page_watch` manage rows in `page_watches`
(created on demand — production D1 gets no migrations from the deploy
pipeline). Every 5 minutes the Render cron hits
`POST /api/system/cron/page-watches`, which snapshots due URLs via the
`PAGE_SNAPSHOT` binding (`src/render/pageWatch.ts`), hashes the normalised
text, and on change sends a push notification listing added/removed lines.
The first snapshot is the baseline and notifies once so the user knows the
watch is armed. Public pages only — no login support by design; failures are
recorded per-watch in `last_error` and retried on the next due tick.

## Browser recipes (self-authoring automations)

The agent can turn a plain-language request ("make me a script that grabs
the top Hacker News headlines") into a stored, replayable automation without
developer involvement. `create_browser_recipe` saves a JSON step list in a
small DSL (goto / click / fill / press / wait / extract_text / extract_list —
validated by `services/browserRecipes.ts`, max 30 steps, http(s) only, at
least one extract). `run_browser_recipe` executes it on Render
(`src/render/browserRecipe.ts` via the `BROWSER_RECIPE` binding) with
per-step timeouts and a 120s budget; `{username}`/`{password}` placeholders
in fill values are resolved from the Secret Vault entry named by the
recipe's `site_name`. Failures name the failing step and carry the page URL,
visible text, and a debug screenshot (`?provider=recipe`), so the model can
revise the steps conversationally and re-save under the same name.

## Outlook calendar

`browser_task` routes read-only Outlook *calendar* asks ("do I have meetings
today?") to the same scripted login with `target: 'calendar'`
(`isOutlookCalendarBrowserTask`). The flow opens OWA's day view and returns
the aria-labels of today's events; the login session is shared with the
inbox scrape (same `browser_sessions` row).

## Debugging a failed flow

Every failure message includes the URL at failure plus the page title and
visible text. When R2 is configured, a screenshot of the exact screen the
flow was stuck on is saved and served (authenticated) at:

```
GET /api/system/debug/browser-screenshot?provider=outlook&session=<session-id>
```

Open it in a browser tab (the `session` query param is accepted precisely so
the link works outside the SPA), or fetch it with the `Authorization: Bearer`
header. The screenshot is overwritten by each subsequent failure, so it always
shows the most recent one.

## Outlook flow specifics

- A mailbox URL is only trusted after it survives a settle delay: OWA serves
  a 200 shell at `/mail/` *before* its JS bounces an unauthenticated user to
  AAD, so the first URL sighting proves nothing. If the page bounces to a
  sign-in screen while waiting for the message list, the flow fails fast and
  re-runs the login once within the same overall budget.
- Success = any signed-in Outlook mailbox URL. The host allowlist covers
  `outlook.office.com`, `outlook.office365.com`, `outlook.live.com`, and
  `outlook.cloud.microsoft`; only the URL *path* can veto success, because
  OWA's normal post-login landing URL is `/mail/?authRedirect=true…`.
- Username/password entry is tracked **per host**, so federated corporate
  IdPs (ADFS etc.) that ask for the username a second time on their own
  domain are handled; combined username+password forms are filled fully
  before submitting.
- MFA prompts and rejected credentials throw immediately with actionable
  messages — a script cannot get past either.
- Login budget is 120s inside the `browser_task` tool budget of 310s.
