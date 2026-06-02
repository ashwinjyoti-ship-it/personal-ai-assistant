# Karna — Personal AI Assistant
## Project Context (Condensed for AI Sessions)

**Version**: 4.6.0 | **URL**: https://karna-5xs.pages.dev (frontend) · backend: https://karna-background-worker.onrender.com | **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

---

## What It Is
Serverless personal AI assistant on Cloudflare. Multi-user, encrypted, intent-routing agent with Google Workspace integration, scheduling, memory, browser automation, and Telegram bot.

**Key Features**: PIN auth, two-tier memory, LLM provider rotation, tool enforcement loop, R2 file storage, proactive briefings, browser automation (Browser Use Cloud), semantic document search, 50+ agent tools.

---

## Tech Stack
| Layer | Tech |
|-------|------|
| **Frontend hosting** | Cloudflare Pages (serves SPA HTML + Google OAuth callback) |
| **Backend (live)** | **Render web service `karna-background-worker`** runs the full Hono API natively (`RENDER_RUN_NATIVE_APP=true`). Cloudflare proxies `/api/*` to it. |
| **Database** | Cloudflare D1 (SQLite) — Render reads/writes it via the **D1 REST API** (`src/render/d1.ts`) |
| **Framework** | Hono 4.x (TypeScript) |
| **Frontend** | Embedded SPA (src/frontend/*) |
| **LLMs** | Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus |
| **Cron** | Cloudflare Workers cron trigger → endpoints (proxied to Render) |
| **Storage** | R2 bucket for files (Render uses S3-compatible shim) |
| **External** | Google Workspace, Telegram, Browser Use Cloud |
| **Cloudflare-only** | `AI` + `VECTORIZE` (document semantic search) remain on Cloudflare |

---

## Repository Structure
```
src/
├── index.tsx                    # Entry point, routes
├── frontend.ts                  # Embedded SPA
├── types/index.ts              # Shared types
├── routes/
│   ├── auth.ts, chat.ts, settings.ts, system.ts, proactive.ts
│   └── channels/telegram.ts
└── services/
    ├── agent.ts                 # Core agentic loop (~3k lines)
    ├── router.ts                # Intent classification
    ├── memory.ts                # Two-tier memory
    ├── embeddings.ts            # Chunking, Vectorize indexing, semantic search
    ├── google.ts, gmail.ts      # Google APIs
    ├── briefing.ts, research.ts # Proactive features
    ├── browser.ts               # Browser Use Cloud client
    ├── llm/provider.ts          # Multi-provider LLM
    ├── skills.ts                # Auto skill generation & refinement (self-improving flywheel)
    └── crypto.ts                # AES-GCM encryption
migrations/                      # 33 D1 SQL migrations
cron-worker/worker.js           # Scheduled jobs (separate service)
public/manifest.json            # PWA config
```

---

## Database (D1 SQLite)
**Key Tables**: users, sessions, conversations, threads, memory, credentials (encrypted), cron_jobs, cron_execution_log, uploaded_files, document_library, document_chunks, site_credentials (Secret Vault), briefings, briefing_preferences, tool_execution_log, error_log, heartbeat_log, user_skills, skill_patterns

---

## API Routes (Condensed)
```
AUTH:     GET /api/auth/check, POST /api/auth/setup, /login, /reset-pin
CHAT:     POST /send (+ SSE), GET/POST /threads, GET /threads/:id/messages
SETTINGS: GET/PUT /profile, /credentials, /memory, /schedules, /google/*
SYSTEM:   GET /health, POST /heartbeat, /cron/execute, /cron/run-task/:id
PROACTIVE: POST /cron/{evening-briefing, evaluate-triggers, meeting-reminders}
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
- **Backend**: Render web service `karna-background-worker` (`srv-d81lgebtqb8s73bgqj9g`) — auto-deploys `main`, runs `npm run render:worker`, health `/healthz`. Native mode via `RENDER_RUN_NATIVE_APP=true`. Env vars set in Render dashboard / `render.yaml`.
- **CI/CD**: Auto-deploy on push to `main` (`.github/workflows/deploy.yml` for Pages; Render auto-deploys from GitHub)
- **One-time setup**: `.github/workflows/setup-infrastructure.yml` (manual dispatch) — creates Vectorize index + applies D1 migrations
- **Cron**: Separate `cron-worker/worker.js` runs every minute (job dispatch → agent tasks → proactive)

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
- **Research timeout**: 20s hard cap (prevents hangs)
- **Browser timeout**: 5 min (300s, set by `DEFAULT_TIMEOUT_MS` in `browser.ts`, no Render platform limit)
  - Can increase to ~10 min if Outlook tasks need it (Render background worker limit)
  - Browser Use API limit: 10-15 min per task (check their docs for current limits)
- **D1 row size**: ~1 MB (encrypted credentials fit)
- **429 rate limits**: Caught and reported to user
- **Session expiry**: 30-day auto-expire
- **Cron.org not needed**: Cloudflare Cron Triggers handle all scheduling

---

## Personality (Hardcoded in `buildSystemPrompt()`)
- **Directness**: No preamble, no elaboration beyond necessary
- **Uncertainty**: Admit what you don't know
- **No emotion**: Never simulate feelings or sentimentality
- **User autonomy**: Respect user decisions, don't push
- **Match tone**: Adapt to user's style
- **Brevity**: Short replies preferred
- **Flag ambiguity**: Ask clarifying questions early
- **Avoid jargon**: Explain technical concepts simply

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

### v4.6.0 — Backend migrated to Render (native mode)
**Goal**: run the heavy backend (agent, chat, Telegram, long tool chains) on Render (Node) instead of Cloudflare Workers, to escape Worker CPU/wall-clock limits. Cloudflare keeps the frontend, D1, R2, and AI/Vectorize.
- **Native mode**: `RENDER_RUN_NATIVE_APP=true` makes `src/render/server.ts` mount the full Hono app exported from `src/index.tsx`, injecting Cloudflare-compatible bindings per request via `createRenderEnv()`. Flag-gated and reversible (unset → legacy proxy mode).
- **D1 over HTTP (critical fix)**: `src/render/d1.ts` now uses the Cloudflare **D1 REST API** (`POST /client/v4/accounts/{acct}/d1/database/{db}/query`). The earlier libsql host (`{acct}-{db}.d1.d1.cloudflare.com`) does **not** exist (ENOTFOUND) — D1 has no public libsql endpoint. `file:` URLs still use `@libsql/client` for local dev/tests (`RENDER_D1_LIBSQL_URL`). Adapter surfaces `last_row_id`.
- **Render service**: `karna-background-worker` is a **web service** at `https://karna-background-worker.onrender.com`; `render.yaml` updated (web + `healthCheckPath: /healthz`). Env vars: `RENDER_RUN_NATIVE_APP`, `CLOUDFLARE_ACCOUNT_ID/_D1_DATABASE_ID/_D1_API_TOKEN`, `GOOGLE_CLIENT_ID/_SECRET`, `CLOUDFLARE_R2_*`.
- **Routing today**: Cloudflare still proxies `/api/*` to Render (the end-user path), so flipping native mode completed the backend cutover without touching the live frontend. The Telegram webhook is still registered to the Cloudflare URL (proxied to Render).
- **Frontend (optional, Phase B)**: `API_BASE_URL` binding injects `window.__KARNA_API_BASE__` so the SPA can call Render directly and drop the proxy hop later; Google `auth-url` accepts an `origin` param so OAuth callback stays on the Cloudflare origin. Default unset = same-origin.
- **Not on Render**: `search_library` (Workers AI embeddings + Vectorize) — Cloudflare-only; no-ops on Render unless a CF shim is added.
- **Rollback**: set `RENDER_RUN_NATIVE_APP=false` (back to proxy) and/or point Telegram webhook + UI back at Cloudflare.

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
- **Weekly cron**: Mondays 02:00–02:05 IST in cron-worker calls the review endpoint
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
- Evening briefings (calendar + Gmail + news)

---

**For detailed implementation specifics, refer to code comments in `src/services/agent.ts` and individual service files.**
