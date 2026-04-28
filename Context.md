# Karna — Personal AI Assistant
## Project Context (Condensed for AI Sessions)

**Version**: 4.3.0 | **URL**: https://karna-5xs.pages.dev | **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

---

## What It Is
Serverless personal AI assistant on Cloudflare. Multi-user, encrypted, intent-routing agent with Google Workspace integration, scheduling, memory, browser automation, and Telegram bot.

**Key Features**: PIN auth, two-tier memory, LLM provider rotation, tool enforcement loop, R2 file storage, proactive briefings, browser automation (Browser Use Cloud), semantic document search, 50+ agent tools.

---

## Tech Stack
| Layer | Tech |
|-------|------|
| **Hosting** | Cloudflare Pages + D1 (SQLite) + Vectorize |
| **Framework** | Hono 4.x (TypeScript) |
| **Frontend** | Embedded SPA (src/frontend.ts) |
| **LLMs** | Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus |
| **Cron** | Cloudflare Workers (cron-worker/) |
| **Storage** | R2 bucket for files |
| **External** | Google Workspace, Telegram, Browser Use Cloud |

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
    └── crypto.ts                # AES-GCM encryption
migrations/                      # 33 D1 SQL migrations
cron-worker/worker.js           # Scheduled jobs (separate service)
public/manifest.json            # PWA config
```

---

## Database (D1 SQLite)
**Key Tables**: users, sessions, conversations, threads, memory, credentials (encrypted), cron_jobs, cron_execution_log, uploaded_files, document_library, document_chunks, site_credentials (Secret Vault), briefings, briefing_preferences, tool_execution_log, error_log, heartbeat_log

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
`browser_task(task, site_name)` → 88s timeout, stores ID in memory on timeout | `browser_task_status(task_id)` → check timed-out tasks | `vault_lookup(site_name)` → find saved credentials

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
- **First task**: Authenticate → save `sessionId` → ~60-90s
- **Repeat tasks**: Reuse `sessionId` → skip login → ~10-20s
- **Timeout** (>88s wall-clock): Store task ID in memory → user follows up in 2–3 min
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
- **Platform**: Cloudflare Pages
- **URL**: https://karna-5xs.pages.dev
- **CI/CD**: Auto-deploy on push to `main` (`.github/workflows/deploy.yml`)
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
- **Browser timeout**: 88s wall-clock budget (Cloudflare limit)
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

## Recent Changes

### v4.3.0
- Semantic document search: Cloudflare Vectorize (`document-chunks` index, 1024-dim cosine) + Workers AI embeddings
- `src/services/embeddings.ts`: chunking (~1800 chars, 200-char overlap), `indexDocumentChunks`, `semanticDocumentSearch`
- `document_chunks` D1 table stores chunk text + `vector_id` (migration 0033)
- Agent tools: `search_library(query)` (semantic), `read_library_file(id_or_name)` (full text)
- Documents route: semantic search endpoint + document Q&A via retrieved chunks as context
- Setup workflow (`.github/workflows/setup-infrastructure.yml`) for one-time Vectorize + D1 setup

### v4.2.0
- Browser Use Cloud integration (async 88s polling, session reuse)
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
