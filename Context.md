# Karna — Personal AI Assistant
## Project Context (Condensed for AI Sessions)

**Version**: 4.7.0 | **URL**: https://karna-5xs.pages.dev (frontend) · backend: https://karna-background-worker.onrender.com | **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

---

## What It Is
Serverless personal AI assistant on Cloudflare. Multi-user, encrypted, intent-routing agent with Google Workspace integration, scheduling, memory, browser automation, and Telegram bot.

**Key Features**: PIN auth, two-tier memory, LLM provider rotation, tool enforcement loop, R2 file storage, unified digests, browser automation (Browser Use Cloud + Render Playwright for Outlook inbox reads), semantic document search, 50+ agent tools.

---

## Tech Stack
| Layer | Tech |
|-------|------|
| **Frontend hosting** | Cloudflare Pages (serves SPA HTML + Google OAuth callback) |
| **Backend (live)** | **Render web service `karna-background-worker`** runs the full Hono API natively. Cloudflare Pages serves the frontend only; browser and Telegram call Render directly via `API_BASE_URL`. |
| **Database** | Cloudflare D1 (SQLite) — Render reads/writes it via the **D1 REST API** (`src/render/d1.ts`) |
| **Framework** | Hono 4.x (TypeScript) |
| **Frontend** | Embedded SPA (src/frontend/*) |
| **LLMs** | Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus |
| **Cron** | In-process scheduler on Render (`src/render/cron.ts`, every 60s) — replaces the Cloudflare cron worker |
| **Storage** | R2 bucket for files (Render uses S3-compatible shim) |
| **External** | Google Workspace, Telegram, Browser Use Cloud, Render Playwright for Outlook |
| **Cloudflare-only** | `AI` + `VECTORIZE` (document semantic search) remain on Cloudflare |

---

## Repository Structure
```
src/
├── index.tsx                    # Entry point, routes
├── frontend.ts                  # Embedded SPA
├── types/index.ts              # Shared types
├── routes/
│   ├── auth.ts, chat.ts, settings.ts, system.ts, digests.ts
│   └── channels/telegram.ts
├── render/
│   ├── server.ts, env.ts         # Render native server + binding wiring
│   └── outlookPlaywright.ts      # Scripted Outlook inbox scraper
└── services/
    ├── agent.ts                 # Core agentic loop (~3k lines)
    ├── router.ts                # Intent classification
    ├── memory.ts                # Two-tier memory
    ├── embeddings.ts            # Chunking, Vectorize indexing, semantic search
    ├── google.ts, gmail.ts      # Google APIs
    ├── digest/                  # Unified morning/evening/weekly/email digests
    ├── outlookAccount.ts        # Microsoft account-picker matching helpers
    ├── research.ts             # Research + news fetching
    ├── browser.ts               # Browser Use Cloud client
    ├── llm/provider.ts          # Multi-provider LLM
    ├── skills.ts                # Auto skill generation & refinement (self-improving flywheel)
    └── crypto.ts                # AES-GCM encryption
migrations/                      # D1 SQL migrations through 0057
public/manifest.json            # PWA config
```

---

## Database (D1 SQLite)
**Key Tables**: users, sessions, conversations, threads, memory, credentials (encrypted), cron_jobs, cron_execution_log, uploaded_files, document_library, document_chunks, site_credentials (Secret Vault), browser_sessions (encrypted Playwright state), digest_configs, digests, digest_items, tool_execution_log, error_log, heartbeat_log, user_skills, skill_patterns

---

## API Routes (Condensed)
```
AUTH:     GET /api/auth/check, POST /api/auth/setup, /login, /reset-pin
CHAT:     POST /send (+ SSE), GET/POST /threads, GET /threads/:id/messages
SETTINGS: GET/PUT /profile, /credentials, /memory, /schedules, /google/*
SYSTEM:   GET /health, POST /heartbeat, /cron/execute, /cron/run-task/:id
DIGESTS:  GET/POST /api/digests, /configs, /generate, /resend, /items/:id/toggle, /cron/tick
PROACTIVE: unified digests via /api/digests
TELEGRAM: POST /webhook, POST /setup-webhook
```

---

## Agent Tools (50+)

### Memory (4 tools)
`store_memory(type, title, content, importance)` | `search_memory(query)` | `delete_memory(id)` | `update_memory(id, content)`

### Sheets (4)
`read_sheet(id, range)` → JSON array | `write_sheet(id, range, values)` | `append_sheet(id, range, values)` | `create_sheet(title, sheet_names, folder)`

### Docs (3)
`create_doc(title, content, folder)` | `append_to_doc(id, content)` | `read_doc(id)`

### Calendar (2)
`list_calendar_events(days_ahead)` | `create_calendar_event(summary, start, end, description, location, attendees)`

### Gmail (7)
`gmail_list(label, max)` | `gmail_read(id)` | `gmail_search(query)` | `gmail_send(to, subject, body, cc)` | `gmail_draft(to, subject, body, cc)` | `gmail_modify(id, add_labels, remove_labels)` | `gmail_unread_count()`

### Drive (5)
`drive_list(query, folder_id)` | `drive_search(query)` | `drive_read_file(url_or_id)` → auto-converts Docs/Sheets/PDFs | `drive_delete_file(url_or_id)` | `drive_organise(url_or_id, folder, name)`

### Scheduling (3)
`create_schedule(action, due_datetime, repeat_type)` | `get_schedules()` | `delete_schedule(id)`

### Document Library (2)
`search_library(query)` → semantic vector search across uploaded docs | `read_library_file(id_or_name)` → full extracted text (20k char cap)

### Research & Utilities (6)
`research(query)` → web search (20s timeout) | `parse_document(uuid)` | `google_places_search()` | `google_directions()` | `google_translate()` | `google_geocode()`

### Browser (3)
`browser_task(task, site_name)` → 5 min timeout (300s, configurable), stores ID in memory on timeout | `browser_task_status(task_id)` → check timed-out tasks | `vault_lookup(site_name)` → find saved credentials

Read-only Outlook inbox requests are a special case: `isOutlookReadOnlyBrowserTask()` routes them to `OUTLOOK_PLAYWRIGHT` on Render instead of Browser Use. Write/search/delete/reply Outlook tasks still use Browser Use.

---

## Core Architecture

### Agent Loop (`src/services/agent.ts`)
1. LLM → tool calls
2. Execute tools in parallel (`Promise.all`)
3. Feed results back → repeat until final response
4. **Tool enforcement** (5-turn mini-loop): Force execution if LLM narrates instead of acting
5. **Post-write verification**: Always `read_sheet` after `write_sheet`
6. **Server-side date injection**: Prevent hallucinated dates
7. **Early persistence**: Store message before streaming (survives Cloudflare timeout)

### Intent Router (`src/services/router.ts`)
**Fast classifier** (<5ms, ~80% accuracy):
- Keyword heuristics → route to: Scheduler, Workspace, Research, Conversation, or Multi-agent
- LLM fallback for ambiguous cases

### Memory System (`src/services/memory.ts`)
**Working tier** (importance ≥7): Injected into every prompt, survives history trimming (12k char threshold)
**Long-term tier** (importance <7): Persistent storage, compacted summaries

### LLM Provider (`src/services/llm/provider.ts`)
Abstracts all providers with automatic failover. Per-user credential vaults (BYOK). Cost tracking + credit alerts.

### Unified Digests (`src/routes/digests.ts`, `src/services/digest/*`)
Digests are the current proactive-intelligence path for morning, evening, weekly, and email summaries. Defaults are morning 08:00, evening 20:00, weekly Sunday 20:00, and email 12:00 disabled. Scheduling uses the user's timezone with a five-minute catch-up window and a one-digest-per `(user, kind, local_date)` guard. Render cron calls `/api/digests/cron/tick` every minute and `/api/digests/cron/meeting-reminders` on its meeting-reminder cadence. See `docs/digests.md` before changing digest config, cron, sections, or delivery.

---

## Key Behaviors & Patterns

### Scheduling Rules
- **"remind me to X"** → Call `create_schedule` immediately with exact wording (no clarification on content)
- **No time specified** → Default to 9 AM next workday, state explicitly: "Reminder set for [date+time]. Reply 'change time' to adjust."

### Resumable Google Writes (Temp Memory)
When Google unavailable, save pending payload to working memory (importance 9):
- `Pending Google Doc save: "{title}"` | `Pending email: "{subject}"` | `Pending sheet write: {id} — {range}` | etc.
- On user retry ("try again"), recover from memory and retry
- Dedup by `(user_id, type, title)` — repeated failures update existing entry

### Sheet Population from Documents
- **Multi-tab sheets**: Create one tab per document section, write to **ALL tabs** before replying
- **Drive → Sheet**: `drive_read_file` returns JSON array → pass directly to `write_sheet` (no re-parse)
- **PDF → Sheets**: Extract text → identify sections → write each to tab

### Document Merge Fixes
1. **Partial success**: If `appendText` fails after `create_doc` succeeds, return doc URL + recovery instructions (don't hide it)
2. **Result capping**: `parse_document` & `drive_read_file` capped at 20k chars (others: 8k)
3. **Empty doc insert index**: Use `Math.max(1, insertIndex)` to prevent Google Docs API rejection

### Multi-Step Completion Rule
**Every multi-step action MUST end with explicit completion reply:**
- Success: Confirm what was done + include links
- Failure: State what failed + what completed + what user should do next

### Tool Call Placeholder Format
`[calling: create_doc(title="X", folder_name="Y")]` with key args (excludes large fields like `content`, `values`)
- Prevents LLM from repeating already-called tools
- `toolsCalledList` must be declared in both `runAgent` and `runAgentStreaming`

### Error Handling — 429 Rate Limits
Detect `'429'`, `'rate limit'`, `'Too Many Requests'` → Return: *"Rate limit reached — AI provider throttling. Wait a moment and try again."*

### Folder Move Failures
If `create_doc`/`create_sheet` succeeds but `moveFileToFolder()` fails → Return:
```
Note: document saved to Drive root — could not place in folder "writings": <error>
```
(Prevents LLM from misreading as full failure and retrying)

### Research Caching
After successful `research` call, store 600-char summary to long-term memory (importance 6, title `Research: {query}`). Allows follow-up questions without re-searching.

### Browser Task Pattern
- **First task**: Authenticate → save `sessionId` → ~1-2 min
- **Repeat tasks**: Reuse `sessionId` → skip login → ~10-20s
- **Timeout** (>5 min): Store task ID in memory → user follows up in 2–3 min
- **Failure**: Delete stale `sessionId` → restart fresh next attempt

### Outlook read-only inbox path (Playwright on Render)
- Routes through `browser_task` only when the site/text is Outlook or Microsoft 365 and the task has no action verb.
- Uses `OUTLOOK_PLAYWRIGHT` → `src/render/outlookPlaywright.ts`; Cloudflare Workers cannot run this path because they cannot launch Chromium.
- Requires one Secret Vault entry with Microsoft username and password. Account-picker tiles are selected only when their text exactly matches the saved username; otherwise the script clicks "Use another account" and types the saved username.
- Stores encrypted Playwright `storageState` in `browser_sessions` (`0057_browser_sessions.sql`) only after the inbox renders; failed runs clear the state to avoid poisoned half-login loops.
- MFA, app approval, security keys, or Conditional Access produce an explicit failure. Use Browser Use for those accounts or disable MFA on the scripted account.

### Mobile wake lock
- `src/frontend/core.ts` uses the Screen Wake Lock API plus a muted canvas-video fallback for iOS PWAs.
- It is reference-counted across the app: streaming chat, active voice, and API calls still pending after 400 ms hold the screen awake, then release after a short debounce.

---

## Settings & Configuration

### Profile Fields
- **Name**: Display name
- **Role**: Professional context (e.g. "Founder", "Engineer") — injected into every prompt
- **Assistant Name**: What it calls itself (default: Karna)
- **Telegram Chat ID**: For proactive notifications + briefing delivery
- **Timezone**: Scheduling defaults + time-aware responses

### Credentials Vault
AES-GCM encrypted, per-user per-service. Supports:
- API keys (all LLM providers, Google, etc.)
- **Secret Vault** for site credentials (username, password, notes) — injected into browser tasks

---

## Streaming & Persistence
- **Message stored in D1 BEFORE SSE chunks yielded** (survives Cloudflare worker timeout)
- **Storage order**: `storeMessage` → chunk loop → done event
- Same pattern for max-turn fallback

## Notifications
- **Individual dismiss**: Delete single notification immediately
- **Mark all done**: Confirm → `DELETE /api/chat/notifications/all`
- **Route order**: Register `DELETE /notifications/all` **before** `DELETE /notifications/:id` (prevent "all" captured as param)

---

## File Storage

### R2 Integration
- Bucket: `karna-documents` (ENAM region)
- Binding: `DOCUMENTS_BUCKET` in `wrangler.jsonc`
- **Upload**: Raw bytes → R2 by UUID, D1 stores sentinel `'r2'` (100 MB cap)
- **Fallback**: Base64 in D1 if R2 not bound (700 KB limit)
- **Parse**: Detect `'r2'` sentinel → fetch from R2 → convert to base64 → extract

### Document Format Handling
- **Google Docs**: Export as `text/plain`
- **Google Sheets**: Export as `text/csv` → parse to `string[][]` JSON
- **PDFs**: Download bytes → Anthropic document API
- **Text**: Raw text

---

## Development & Deployment

### Local Development
```bash
npm run dev              # Vite dev server
npm run dev:sandbox      # With D1 emulation
npm run build            # Production build
npm run test             # Vitest
npm run db:migrate:local # Apply migrations
```

### Environment Variables
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_API_KEY`, `GOOGLE_CSE_ID`, `CRON_SECRET`, `TELEGRAM_BOT_TOKEN`

### Deployment
- **Frontend**: Cloudflare Pages — https://karna-5xs.pages.dev (auto-deploy on push to `main`)
- **Backend**: Render web service `karna-background-worker` — auto-deploys `main`, runs `npm run render:worker`, health `/healthz`. Env vars in `render.yaml`.
- **CI/CD**: Auto-deploy on push to `main` (`.github/workflows/deploy.yml` for Pages; Render auto-deploys from GitHub)
- **One-time setup**: `.github/workflows/setup-infrastructure.yml` (manual dispatch) — creates Vectorize index + applies D1 migrations
- **Cron**: `src/render/cron.ts` runs an in-process `setInterval(60s)` scheduler inside the Render web service — calls `/api/system/cron/execute`, `/api/system/cron/run-task/:id`, `/api/digests/cron/tick`, and the digest meeting-reminder route. No external cron service (cron-job.org, Cloudflare cron trigger, or separate `cron-worker/`) is used. Set `RENDER_DISABLE_CRON=true` to turn it off.

### Cloudflare API Token (GitHub secret: `CLOUDFLARE_API_TOKEN`)
Required permissions: Cloudflare Pages Edit, Workers Scripts Edit, D1 Edit, R2 Edit, Vectorize Read+Write, Workers AI Edit, Account Settings Edit
- `account_id` must NOT be set in `wrangler.jsonc` for Pages projects — pass via `CLOUDFLARE_ACCOUNT_ID` GitHub secret instead
- Vectorize index `document-chunks`: 1024 dimensions, cosine metric (created by setup workflow)

---

## UI & UX

### Design System
**Paper & Circuit** theme:
- Headings: Cormorant Garamond (serif)
- Body: Inter (sans-serif)
- Code: DM Mono
- Assistant text: Courier Prime (15px, 1.75 line-height, `#1a1410`)

### Features
- Dark theme (primary)
- Thread sidebar (Today/Yesterday/Older)
- Real-time SSE streaming
- Attachment button (bottom-left of textarea, `padding-bottom:40px`)
- Google disconnect warning banner (amber, dismissible)
- PWA installable on iOS (fullscreen, black status bar)

---

## Known Limits & Notes
- **Research timeout**: 90s (quick) / 300s (thorough) inner race; 310s outer hard cap. On timeout falls back to raw search links.
- **Browser timeout**: 5 min (300s, set by `DEFAULT_TIMEOUT_MS` in `browser.ts`, no Render platform limit)
  - Can increase to ~10 min if Outlook tasks need it (Render background worker limit)
  - Browser Use API limit: 10-15 min per task (check their docs for current limits)
- **Outlook Playwright**: Render-only, read-only inbox scrape; repeat runs reuse encrypted `browser_sessions`, but MFA/Conditional Access cannot be scripted.
- **D1 row size**: ~1 MB (encrypted credentials fit)
- **429 rate limits**: Caught and reported to user
- **Session expiry**: 30-day auto-expire
- **No external cron service**: cron-job.org, Cloudflare Pages cron triggers, and the previous standalone `cron-worker/` worker have all been removed. Scheduling is fully handled by the in-process Render scheduler (`src/render/cron.ts`). The endpoints still validate the `X-Cron-Secret` header for safety / manual testing.
- **Exactly one Render service should exist.** `render.yaml` declares a single `type: web` service named `karna-background-worker`. A Render service's *type* cannot be changed in place, so the original background **worker** (created before render.yaml existed) was not replaced when the blueprint introduced the web service — it was left running in parallel under the same name, on its own Starter plan. Because the Cloudflare/Google env vars are declared `sync: false`, they were only ever set on the web service, so the orphan logged `Missing required Render env var: CLOUDFLARE_ACCOUNT_ID` twice a minute indefinitely and billed a second Starter instance. `src/render/server.ts` now validates the environment once at startup and declines to start the scheduler instead of failing every tick, but **the duplicate service still has to be deleted in the Render dashboard** — check the service list before assuming there is only one. Two configured instances would also mean two cron schedulers firing the same jobs.

---

## Character Identity (Hardcoded in `buildSystemPrompt()`)

**Archetype:** JARVIS + Alfred + Pepper Potts — operational executor, not a chatbot.

- **JARVIS** — tool-native by reflex, no ego, operational precision
- **Alfred** — knows the person's history cold, never needs the same thing explained twice, occasionally dry
- **Pepper Potts** — pragmatic, flags contradictions without apology, doesn't perform enthusiasm

**Operating mode:**
- Clear request → act, state what was done in one line
- Ambiguous request where wrong path wastes real effort → one focused clarifying question, then execute
- Second-order problem spotted → flag once after solving the immediate one, only when the pattern is established
- Current data needed → search first; facts are retrieved, not generated
- Constraint hit → one sentence why, one sentence on the closest alternative
- Contradicts past recommendation → flag it

**Wit:** Observational, understated, context-dependent. Fires when the situation earns it — not as a reflex. One line, before the solve, never instead of it. If nothing is genuinely absurd, say nothing absurd.

**What doesn't happen (built into the character, not stated as rules):** hollow affirmations, pre-tool narration, phantom confirmations, verbose completions, asking unnecessary questions.

The previous rule-list approach (12-row disambiguation confidence table, explicit banned-opener lists, verbose Core Principles/Communication Style sections) was replaced in v4.7.0 — those behaviors are now ruled out by character rather than instruction. The 16-rule post-loop enforcement system in `agent.ts` is untouched (code-level, character-independent).

---

## Architecture Iterations Roadmap

### Planned Iterations (Prioritized)

1. **Reliability + Tool Contract Hardening** (highest priority)
   - Single tool execution wrapper (timeouts, retries with exponential backoff, idempotency keys)
   - Strict contract registry (Zod/JSON Schema validators) for all tool parameters
   - Transaction safety modes: `dry_run`, `confirm_required`, `execute`
   - Normalized error codes + structured error handling

2. **Retrieval Engineering Upgrade**
   - Deterministic chunking strategy (semantic + token window)
   - Embedding versioning + re-embedding jobs for docs
   - Hybrid retrieval (keyword + vector) with re-ranking
   - Citation-first responses for document Q&A (source snippets visible)

3. **Observability + Evaluation Layer**
   - End-to-end trace IDs (request → router → tools → answer)
   - Step-level metrics: tool success/failure, retries, latency per provider
   - Weekly scorecard: task success rate, groundedness rate, p95 latency, fallback frequency

4. **Security & Safety Policy Engine**
   - Explicit policy gates by tool category (read-only, write, external side effects)
   - Prompt-injection defenses (content sandboxing, instruction stripping for uploaded docs)
   - Least-privilege credentials + scoped tokens (email, calendar, send actions)

---

## Recent Changes

### v4.7.1 — Outlook Playwright routing + mobile wake lock
- Read-only Outlook inbox tasks route to Render Playwright (`OUTLOOK_PLAYWRIGHT`) and no longer silently fall through to Browser Use when deterministic scraping is expected.
- Microsoft/corporate sign-in handles account-picker screens by exact saved-username matching; missing exact matches use "Use another account".
- `browser_sessions` stores encrypted Playwright state per user/provider and is saved only after inbox render, then cleared on failed login/scrape.
- Frontend wake lock keeps mobile/PWA screens awake during streaming chat, voice sessions, and long in-flight API work.

### v4.7.0 — Character-first system prompt rewrite
- Replaced rule-list `buildSystemPrompt` with character-anchored foundation (JARVIS + Alfred + Pepper Potts)
- 12-row disambiguation confidence table replaced by a single judgment test: "would a sharp assistant who knows this person ask this, or just handle it?"
- Explicit banned-opener lists, pre-tool narration rules, and verbose personality section replaced by character identity section
- Added `todayShortDate` computation to `buildSystemPrompt` (was previously only in `buildSubAgentPrompt` in router.ts) — fixes date context for sheet ops on the web path
- Added `username` and `Today's date for sheets` to Current User block in prompt
- Net: `-325 lines, +146 lines` on `src/services/agent.ts` — same structural coverage, more robust under context pressure
- 16-rule post-loop enforcement system untouched (code-level, character-independent)

### v4.6.0 — Backend migrated to Render
**Goal**: run the heavy backend on Render (Node) instead of Cloudflare Workers.
- **Render entrypoint**: `src/render/server.ts` mounts the full Hono app from `src/index.tsx` with `createRenderEnv()` bindings (D1 REST + R2 S3).
- **Routing**: Browser and Telegram call Render directly (`API_BASE_URL`). Cloudflare Pages serves frontend + OAuth callback only.
- **Telegram (Phase D)**: Settings → Telegram registers webhook on Render via `getTelegramWebhookUrl()`.
- **Cron (Phase C)**: in-process scheduler in `src/render/cron.ts`.
- **Tier 3**: removed CF→Render proxy (`proxyToRender`) and Render→CF proxy mode.
- **Not on Render**: `search_library` semantic search (Workers AI + Vectorize) — keyword fallback on Render.
- **Voice**: `/api/voice` (GPT Realtime) runs on Render; browser calls it via `API_BASE_URL`.

### v4.5.0 — Skills UI + Marketplace (Phase 2)
- **Skills UI**: Settings → Skills now shows two sections: "Your Skills" (manual) and "Auto-Learned Skills" (is_auto=1)
- **Auto-Learned skill cards**: display name, description, usage_count, refinement_count, confidence bar, last_used_at
- **Actions on auto-skills**: enable/disable toggle, expandable/editable instructions textarea, "Promote to Manual" (sets is_auto=0, source='user'), delete
- **Confidence scoring**: `confidence_score REAL` column on user_skills; updated as rolling avg of `AVG(succeeded)` over last 20 invocations
- **Auto-disable**: skills below confidence 0.4 after 5+ uses get disabled with a notification (Settings → Skills shows badge)
- **Feedback loop**: `recordAndEvaluatePattern` now accepts `succeeded` boolean; agent passes `toolErrorCount === 0`; stored in `skill_patterns.succeeded`
- **GET /api/skills**: now returns `{ skills: [], auto_skills: [] }` grouped (backward-compat: `skills` = manual only)
- **PUT /api/skills/:id**: new `promote: true` field → sets is_auto=0, source='user'
- **DELETE /api/skills/:id**: unchanged; ON DELETE SET NULL cascade handles skill_patterns unlink
- **POST /api/skills/cron/review-low-confidence**: iterates users with stale skills, rewrites or disables (cron-secret guarded)
- **Weekly cron**: Mondays 02:00–02:05 IST, the Render in-process scheduler calls the review endpoint
- New migration: `0036_skill_confidence.sql` — `confidence_score` on user_skills, `succeeded` on skill_patterns

### v4.4.0 — Self-Improving Skill Flywheel (Phase 1)
- **Auto skill generation**: After every multi-tool task (3+ tools), Karna records the tool sequence in `skill_patterns` table
- **Threshold trigger**: When the same tool-set signature appears 3+ times, a lightweight LLM pass auto-generates a named skill with step-by-step procedure
- **Auto refinement**: On each subsequent repeat of a known pattern, Karna runs a refinement pass — updates the skill instructions if a genuine improvement is found (max 5 refinements per skill)
- **System prompt injection**: Auto-generated skills appear as "Proven Procedures" in every system prompt, so Karna follows them instead of re-reasoning from scratch
- New service: `src/services/skills.ts` — `recordAndEvaluatePattern`, `getAutoSkillsContext`
- New migration: `0035_skill_patterns.sql` — `skill_patterns` table + `is_auto`, `refinement_count`, `source` columns on `user_skills`
- Hook added to both `runAgent` and `runAgentStreaming` (fire-and-forget, 6s timeout, never blocks response)
- `buildSystemPrompt` gains optional 5th param `autoSkillsContext`

### v4.3.0
- Semantic document search: Cloudflare Vectorize (`document-chunks` index, 1024-dim cosine) + Workers AI embeddings
- `src/services/embeddings.ts`: chunking (~1800 chars, 200-char overlap), `indexDocumentChunks`, `semanticDocumentSearch`
- `document_chunks` D1 table stores chunk text + `vector_id` (migration 0033)
- Agent tools: `search_library(query)` (semantic), `read_library_file(id_or_name)` (full text)
- Documents route: semantic search endpoint + document Q&A via retrieved chunks as context
- Setup workflow (`.github/workflows/setup-infrastructure.yml`) for one-time Vectorize + D1 setup

### v4.2.0
- Browser Use Cloud integration (async polling with session reuse, 5-min timeout)
- Tool enforcement loop (5-turn mini-loop)
- Workspace write validation (detect read-without-write)
- Hallucination guard (placeholder tracking)
- Research caching (600-char summaries in memory)
- Resumable Google writes (pending payloads in working memory)
- R2 file storage (fallback to base64)
- Multi-provider failover with cost guards
- Telegram voice note transcription
- Unified digests (morning/evening/weekly/email)

---

**For detailed implementation specifics, refer to code comments in `src/services/agent.ts` and individual service files.**
