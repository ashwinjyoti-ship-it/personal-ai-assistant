# Karna — Personal AI Assistant
## Complete Project Context & Implementation Guide

**Last Updated**: April 26, 2026
**Version**: 4.2.0
**Production URL**: https://karna-5xs.pages.dev
**GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

---

## What It Is

Karna is a **serverless personal AI assistant** built entirely on Cloudflare infrastructure. It combines conversational AI, deep Google Workspace integration, proactive scheduling, memory management, and multi-channel communication into a single deployable unit.

Key differentiators:
- **Intent router** classifies requests in <5ms, routes to specialized sub-agents
- **Integrity layer** enforces tool execution, prevents hallucinations, validates workspace writes
- **Multi-provider LLM** with automatic failover and cost guards
- **Async browser automation** via Browser Use Cloud for real web tasks
- **Encrypted credential vault** (AES-GCM per-user, per-service)
- **Two-tier memory** (working + long-term with smart compaction)
- **Telegram bot** with voice notes and proactive briefings
- **PWA installable** on iOS home screen

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Hosting** | Cloudflare Pages (edge-deployed) |
| **Database** | Cloudflare D1 (SQLite) |
| **Scheduled jobs** | Cloudflare Workers (separate cron-worker service) |
| **HTTP framework** | Hono 4.x (TypeScript + JSX) |
| **Frontend** | Vanilla JS/HTML embedded SPA (src/frontend.ts) |
| **Build tool** | Vite + Wrangler |
| **LLM providers** | Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus AI |
| **External APIs** | Google Workspace, Telegram Bot, Browser Use Cloud, Google Public APIs |
| **Encryption** | Web Crypto API (AES-GCM for credential storage) |
| **Testing** | Vitest |

---

## Implemented Features

### Core Chat & Authentication
✅ **Multi-user PIN authentication** with forgot-credentials recovery  
✅ **Conversation threads** with sidebar (Today/Yesterday/Older grouping)  
✅ **Real-time SSE streaming** with persistent early storage (survives worker timeout)  
✅ **Message search** across conversations  
✅ **Thread management** (archive, delete, rename)  
✅ **Notifications system** (bell icon, individual dismiss, mark all done)  
✅ **Session management** (30-day expiry, auto-refresh)  
✅ **Dark theme UI** (Paper & Circuit design system)  

### LLM & Provider Management
✅ **Multi-provider rotation** (Anthropic → OpenAI → Grok → DeepSeek → Gemini → OpenRouter → Abacus)  
✅ **Per-user credential vault** (users supply their own API keys)  
✅ **Automatic failover** on provider errors  
✅ **Cost guards** (track spend per provider, alert on threshold)  
✅ **Credit alerts** (notify user when balance low)  
✅ **Rate limit handling** (consistent 429 error messaging across streaming/non-streaming)  
✅ **Tool use enforcement** (5-turn loop forces execution vs. narration)  
✅ **Max-turn fallback** (graceful degradation after tool loop exhaustion)  

### Intent Router & Sub-Agents
✅ **Keyword-based classifier** (~80% accuracy, <5ms latency)  
✅ **Fallback LLM classification** when keywords ambiguous  
✅ **Sub-agent specialization**:
- Scheduler Agent → reminders, tasks, recurring events
- Workspace Agent → Sheets, Docs, Calendar, Drive, Gmail
- Research Agent → web search, news, fact-checking
- Conversation Agent → general chat
- Multi-agent → complex requests

### Google Workspace Integration (OAuth 2.0)
✅ **Google Sheets**:
- Read sheets (auto-parsed to JSON array)
- Create sheets with multiple tabs
- Write to range with auto-column-cleanup (4 extra cols cleared)
- Append rows
- Verify-after-write pattern (read after every write)

✅ **Google Docs**:
- Create documents
- Read documents (export as text/plain)
- Append text with correct insert index handling
- Partial-success error handling (orphaned doc recovery)
- Folder organization

✅ **Google Calendar**:
- List upcoming events
- Create events with attendees, timezone, repeat patterns
- Integration with briefings

✅ **Google Drive**:
- List files (with folder filtering)
- Full-text search
- Read files (Docs, Sheets, PDFs, text) with appropriate conversions
- Delete files to trash (30-day recovery)
- Organize (move, rename, create folders)
- Parse Drive URLs (multiple formats: `/file/d/`, `/document/d/`, `?id=`, bare ID)

✅ **Gmail**:
- List messages
- Read message content
- Search inbox
- Send emails (with CC/BCC)
- Draft emails (with CC, recoverable)
- Modify labels
- Unread count
- Mandatory recipient lookup before send

✅ **Google Public APIs**:
- Places (nearby search, details)
- Directions
- Translate
- YouTube search
- Geocoding

### Memory System
✅ **Two-tier memory**:
- Working memory (importance ≥7, injected into every prompt)
- Long-term memory (compacted summaries, facts, preferences)

✅ **Memory tools** (agent access):
- `store_memory` (save permanent rules/preferences, importance 1–10)
- `search_memory` (lookup with `[id:N]` format for delete/update)
- `delete_memory` (remove entry by ID)
- `update_memory` (replace content by ID)

✅ **Research caching** (600-char summary stored after successful lookup, importance 6)  
✅ **Automatic compaction** (trim large history, preserve high-importance entries)  
✅ **Deduplication** (`user_id + type + title` unique constraint)  

### Scheduling & Reminders
✅ **Natural language schedule creation** ("remind me to X at time Y")  
✅ **Reminder defaults** (9 AM next workday if no time specified)  
✅ **Recurring tasks** (daily, weekly, interval, once)  
✅ **Cron job engine** with heartbeat monitoring  
✅ **Resumable writes** (pending Google ops saved to working memory during disconnects)  
✅ **Task conflict detection** (prevent duplicate scheduling)  
✅ **Three-phase cron-worker** (job dispatch → agent tasks → proactive triggers)  

### Proactive Features
✅ **Evening briefings** (calendar events + Gmail digest + tasks + news)  
✅ **Meeting reminders** (30/10 min before events)  
✅ **News deduplication** (prevent repeated stories)  
✅ **Briefing preferences** (per-user delivery time, sources)  
✅ **Telegram delivery** (proactive notifications)  
✅ **Trigger evaluation** (scheduled custom rules)  
✅ **Cron.org not needed** (Cloudflare Cron Triggers handle all scheduling)  

### Browser Automation
✅ **Browser Use Cloud integration** (real browser automation in plain English)  
✅ **Async polling** (88s Cloudflare wall-clock budget, 30s retry polling)  
✅ **Session reuse** (persistent `sessionId` for repeat visits, 15-min timeout)  
✅ **Timeout memory** (store task ID → user can follow up, task completes in background)  
✅ **Failure recovery** (delete stale session on task failure, restart fresh)  
✅ **Vault credential injection** (seamless login via Secret Vault)  
✅ **Browser task status** polling (check timed-out tasks)  

### Document Management
✅ **File upload** (via UI, stored in R2 or D1 base64)  
✅ **Multi-format parsing**:
- PDFs (via Anthropic document API)
- Google Sheets (CSV parsed to JSON array)
- Google Docs (plain text export)
- Text files (raw)
- Images (OCR via Anthropic)

✅ **R2 integration** (100 MB cap, R2 ID in D1 sentinel 'r2')  
✅ **Document merge** (multi-step completion rule, partial-success handling)  
✅ **Result capping** (parse_document/drive_read_file: 20k chars; others: 8k)  

### Telegram Integration
✅ **Webhook-based receiver** (POST `/api/telegram/webhook`)  
✅ **Text messages** (parsed and routed to agent)  
✅ **Voice notes** (transcribed via Anthropic API)  
✅ **Briefing delivery** (evening summaries sent proactively)  
✅ **Webhook setup** (automatic registration)  
✅ **Rate limiting** (throttle per user/channel)  

### Security & Encryption
✅ **AES-GCM encryption** (Web Crypto API, per-user per-service)  
✅ **PIN + SHA-256 hashing** (never store plaintext)  
✅ **30-day session tokens** (auto-expiry, refresh on login)  
✅ **Secret Vault** (`site_credentials` table, encrypted JSON blob)  
✅ **Credential separation** (users can supply own API keys for all providers)  
✅ **No hardcoded secrets** (all via Cloudflare secrets / `.dev.vars`)  
✅ **Tool execution audit** (all calls logged in `tool_execution_log`)  
✅ **Error categorization** (error_log tracks issue types)  

### Dashboard & Analytics
✅ **Status cards** (system health, usage, costs)  
✅ **Chat statistics** (message count, active threads)  
✅ **Export feature** (download conversation history)  
✅ **Cron job status** (execution history, next run)  
✅ **Provider spending** (per-LLM cost tracking)  
✅ **Heartbeat monitoring** (system uptime)  

### UI/UX Enhancements
✅ **Embedded SPA** (no separate frontend deployment)  
✅ **PWA installable** (iOS home screen, fullscreen mode, black status bar)  
✅ **Dark theme** (Paper & Circuit: Cormorant Garamond headings, Inter body, DM Mono code, Courier Prime assistant text)  
✅ **Responsive design** (mobile-first, tested on iPhone/iPad)  
✅ **Real-time notifications** (bell icon, persistent banners)  
✅ **Google disconnect warning** (amber banner, auto-dismiss on reconnect)  
✅ **Attachment button** (bottom-left of textarea, 40px padding)  
✅ **Thread sidebar** (grouping by date, Today/Yesterday/Older)  
✅ **Message timestamps** (relative time display)  
✅ **Typing indicators** (for Telegram, long-running tasks)  

### System Reliability
✅ **Heartbeat logging** (periodic health checks)  
✅ **Error categorization** (track failure patterns)  
✅ **Cron lock mechanism** (prevent overlapping job execution)  
✅ **State machine** (cron execution with phase tracking)  
✅ **Worker timeout resilience** (early message persistence before streaming)  
✅ **Graceful degradation** (fallback providers, memory trimming)  
✅ **Rate limit retries** (exponential backoff for Anthropic 429s)  

---

## Repository Structure

```
personal-ai-assistant/
├── src/
│   ├── index.tsx                          # App entry point, Hono route registration
│   ├── frontend.ts                        # Embedded SPA (HTML + CSS + JS)
│   ├── types/index.ts                     # Shared TypeScript interfaces
│   ├── routes/
│   │   ├── auth.ts                        # PIN auth, registration, session mgmt
│   │   ├── chat.ts                        # Chat API, SSE streaming, thread mgmt
│   │   ├── settings.ts                    # Profile, credentials, memory, schedules, Google OAuth
│   │   ├── system.ts                      # Health, heartbeat, cron execution
│   │   ├── proactive.ts                   # Briefings, meeting reminders, triggers
│   │   ├── notifications.ts               # Notification management
│   │   ├── memory-review.ts               # Memory inspection & editing
│   │   ├── documents.ts                   # Document management (if separate)
│   │   ├── action-center.ts               # Pending action recovery
│   │   ├── skills.ts                      # Feature system
│   │   └── channels/
│   │       ├── telegram.ts                # Telegram webhook receiver
│   │       └── adapter.ts                 # Channel message normalization
│   └── services/
│       ├── agent.ts                       # Core LLM agent loop (~3k+ lines)
│       ├── router.ts                      # Intent classifier + sub-agent routing
│       ├── memory.ts                      # Two-tier memory management
│       ├── google.ts                      # Google OAuth 2.0 + Workspace APIs
│       ├── gmail.ts                       # Gmail service layer
│       ├── google-apis.ts                 # Public APIs (Places, Directions, etc.)
│       ├── briefing.ts                    # Evening briefing generation
│       ├── research.ts                    # Web research service
│       ├── browser.ts                     # Browser Use Cloud client
│       ├── crypto.ts                      # AES-GCM encryption helpers
│       ├── docx.ts                        # Document export helpers
│       ├── llm/provider.ts                # Multi-provider LLM abstraction
│       └── __tests__/agent.test.ts        # Unit tests
├── migrations/                            # 18 D1 SQL migrations
├── cron-worker/
│   ├── worker.js                          # Three-phase cron orchestrator
│   └── wrangler.json                      # Cron Worker config
├── public/
│   ├── static/karna.css                   # Design system + theme
│   ├── manifest.json                      # PWA manifest
│   ├── icon-192.png & icon-512.png        # PWA home screen icons
│   └── [images]                           # Static assets
├── dist/                                  # Build output (Vite)
├── wrangler.jsonc                         # Cloudflare Pages config, D1 binding
├── vite.config.ts                         # Vite build configuration
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Dependencies + scripts
├── Context.md                             # This file
├── README.md                              # Quick overview
└── .github/workflows/deploy.yml           # CI/CD auto-deploy
```

---

## Core Services Deep Dive

### `src/services/agent.ts` — The Heart
**3,000+ lines**, runs the agentic loop:

1. **Tool enforcement** (5-turn mini-loop): If LLM narrates instead of executing tools, force execution
2. **Parallel tool execution** (`Promise.all`): All tool calls in a turn run concurrently
3. **Post-write verification**: After `write_sheet`, must call `read_sheet` to confirm
4. **Server-side date injection**: Prevents hallucinated dates
5. **Workspace write validation**: Detects read-without-write on updates
6. **Streaming persistence**: Message stored **before** SSE chunks yielded (timeout-safe)
7. **Tool result capping**: 20k chars for documents, 8k for others
8. **Hallucination guard**: Prevents duplicate tool calls via placeholder tracking
9. **Research timeout**: 20s cap on web lookups

**Sub-agents available**: Scheduler, Workspace, Research, Conversation, Multi  
**Tool count**: 50+ (sheets, docs, calendar, drive, gmail, memory, schedule, research, browser, etc.)  

### `src/services/router.ts` — Intent Classification
**Fast classifier** (<5ms):
- Keyword heuristics (~80% accuracy)
- LLM fallback for ambiguous cases
- Routes to specialized sub-agents
- Reduces load on main agent loop

### `src/services/memory.ts` — Two-Tier Storage
**Working tier** (importance ≥7):
- Injected into every system prompt
- Survives history trimming at 12k char threshold
- Used for high-priority rules, preferences, pending tasks

**Long-term tier** (importance <7):
- Persistent storage for facts, research, decisions
- Compacted summaries reduce token overhead
- Searched via `search_memory` tool

### `src/services/google.ts` + `gmail.ts`
**OAuth 2.0 flow**:
- User authorizes → code exchange → token stored (encrypted)
- Automatic refresh on expiry
- Full Workspace API coverage (Sheets, Docs, Calendar, Drive, Gmail)
- Partial-success handling (doc created but folder move failed)
- Folder creation on-demand

### `src/services/browser.ts` — Browser Use Cloud Client
**Thin REST wrapper** over `https://api.browser-use.com/api/v2`:
- `runBrowserTask(task, apiKey, opts?)` → create + poll (88s timeout)
- `getBrowserTaskStatus(taskId, apiKey)` → check running task
- Session persistence (sessionId stored in vault)
- Stale session cleanup on failure

### `src/services/briefing.ts` — Proactive Summaries
**Generates evening briefings**:
- Calendar events (next 7 days)
- Gmail digest (recent emails, VIPs)
- Task list (active reminders)
- News summary (deduped across runs)
- Delivered via Telegram

### `src/services/llm/provider.ts` — Provider Abstraction
**Supports all major LLMs**:
- Anthropic (primary)
- OpenAI (GPT-4, GPT-4o)
- Grok
- DeepSeek
- Gemini
- OpenRouter (proxy)
- Abacus AI (research)

**Features**:
- Per-user credential vault (BYOK — bring your own key)
- Automatic failover chain
- Cost tracking
- Credit alerts
- Streaming support

---

## Database Schema (D1 SQLite)

| Table | Purpose |
|-------|---------|
| `users` | Username, PIN hash, timezone, role, personality, Telegram ID |
| `sessions` | Auth tokens, 30-day expiry |
| `conversations` | Message history (user_id, thread_id, role, content, created_at) |
| `threads` | Conversation grouping (title, archived, created_at) |
| `memory` | Two-tier entries (type, title, content, importance, user_id) |
| `credentials` | Encrypted API keys/tokens (service_name, encrypted_data) |
| `cron_jobs` | Scheduled tasks (action, interval/daily/weekly/once, next_run, active) |
| `cron_execution_log` | Execution history (status, error, started_at, completed_at) |
| `briefings` | Generated briefing snapshots (user_id, content, created_at) |
| `briefing_preferences` | Per-user config (delivery_time, sources, enabled) |
| `briefing_seen_news` | Deduplication (news_id, user_id, created_at) |
| `tool_execution_log` | Audit trail (user_id, tool_name, args, result, duration) |
| `error_log` | Categorized errors (category, message, context, created_at) |
| `heartbeat_log` | System health (user_id, status, response_time, created_at) |
| `uploaded_files` | File metadata (uuid, filename, file_data or 'r2', size, mime_type) |
| `site_credentials` | Secret Vault (username, password, notes, sessionId — all encrypted) |
| `notifications` | User alerts (type, message, read, created_at) |

---

## API Surface

### Authentication (`/api/auth`)
```
GET    /api/auth/check              # Check if users exist
POST   /api/auth/setup              # First-time registration
POST   /api/auth/login              # PIN-based login
GET    /api/auth/me                 # Validate session
POST   /api/auth/reset-pin          # PIN recovery
GET    /auth/google/callback        # OAuth callback
```

### Chat & Threads (`/api/chat`)
```
POST   /api/chat/send               # Send message (with SSE streaming option)
GET    /api/chat/threads            # List threads
POST   /api/chat/threads            # Create thread
PUT    /api/chat/threads/:id        # Update thread (title, archive)
DELETE /api/chat/threads/:id        # Delete thread
GET    /api/chat/threads/:id/messages # Get messages in thread
GET    /api/chat/dashboard          # Dashboard stats
POST   /api/chat/upload             # Upload file (R2 or base64)
DELETE /api/chat/notifications/:id  # Delete single notification
DELETE /api/chat/notifications/all  # Clear all notifications
```

### Settings (`/api/settings`)
```
GET/PUT /api/settings/profile       # Name, role, timezone, Telegram ID
GET/PUT /api/settings/credentials   # Credential vault (CRUD)
GET/POST/DELETE /api/settings/memory # Memory entries (CRUD)
GET/PUT/DELETE /api/settings/schedules # Cron jobs (CRUD)
GET     /api/settings/google/status # OAuth connection status
GET     /api/settings/google/auth-url # Get authorization URL
POST    /api/settings/google/disconnect # Revoke OAuth
GET     /api/settings/google/test   # Test API connectivity
```

### System (`/api/system`)
```
GET     /api/system/health          # Health check
POST    /api/system/heartbeat       # Log heartbeat
GET     /api/system/status          # System status
POST    /api/system/cron/execute    # Trigger cron phases
POST    /api/system/cron/run-task/:id # Run specific task
```

### Proactive (`/api/proactive`)
```
POST    /api/proactive/cron/evening-briefing    # Generate briefing
POST    /api/proactive/cron/evaluate-triggers   # Evaluate custom rules
POST    /api/proactive/cron/meeting-reminders   # Send meeting alerts
```

### Telegram (`/api/telegram`)
```
POST    /api/telegram/webhook       # Receive messages (text + voice)
POST    /api/telegram/setup-webhook # Register webhook URL
```

---

## Agent Tool Catalog

### Memory Tools
- `store_memory(type, title, content, importance)` → Save permanent entry
- `search_memory(query)` → Lookup with `[id:N]` format
- `delete_memory(id)` → Remove entry
- `update_memory(id, content)` → Replace content

### Scheduling
- `create_schedule(action_description, due_datetime, repeat_type)` → Add reminder/task
- `get_schedules()` → List all cron jobs
- `delete_schedule(id)` → Remove task

### Sheets
- `read_sheet(spreadsheet_id, range)` → Query range (returns JSON array)
- `write_sheet(spreadsheet_id, range, values)` → Write (auto-clears 4 extra cols)
- `append_sheet(spreadsheet_id, range, values)` → Append rows
- `create_sheet(title, sheet_names, folder_name)` → New spreadsheet

### Docs
- `create_doc(title, content, folder_name)` → New document
- `append_to_doc(document_id, content)` → Add text
- `read_doc(document_id)` → Get content (export as plain text)

### Calendar
- `list_calendar_events(days_ahead)` → Upcoming events
- `create_calendar_event(summary, start_datetime, end_datetime, description, location, attendees)` → New event

### Drive
- `drive_list(query, folder_id)` → List files (with optional filter)
- `drive_search(query)` → Full-text search
- `drive_read_file(file_url_or_id)` → Read content (auto-format conversion)
- `drive_delete_file(file_url_or_id)` → Trash file
- `drive_organise(file_url_or_id, folder_name, new_name)` → Move & rename

### Gmail
- `gmail_list(label, max_results)` → List messages
- `gmail_read(message_id)` → Get message content
- `gmail_search(query)` → Search inbox
- `gmail_send(to, subject, body, cc)` → Send email
- `gmail_draft(to, subject, body, cc)` → Create draft
- `gmail_modify(message_id, add_labels, remove_labels)` → Modify labels
- `gmail_unread_count()` → Get unread count

### Research
- `research(query)` → Web search + synthesis (20s timeout, results cached in memory)

### Browser Automation
- `browser_task(task, site_name)` → Run browser task (88s timeout, stores task ID on timeout)
- `browser_task_status(task_id)` → Check timed-out task status
- `vault_lookup(site_name)` → Find saved credentials

### Utilities
- `parse_document(file_uuid)` → Extract text/data from uploaded file
- `google_places_search(query, location, radius)` → Local search
- `google_directions(origin, destination, mode)` → Get directions
- `google_translate(text, source_language, target_language)` → Translate text
- `google_geocode(location)` → Lat/lng lookup
- `youtube_search(query, max_results)` → Video search

---

## Agent Behavior Rules

### Scheduling Principles
- **Reminder rule**: When user says "remind me to X", call `create_schedule` immediately with exact words
- **Time transparency**: If no time given, pick sensible default (9 AM next workday) and state it explicitly
- **No clarification** for reminder content (only for missing/ambiguous times)

### Google Workspace Rules
- **Verify-after-write**: After `write_sheet`, must call `read_sheet` to confirm
- **Partial success handling**: If doc created but folder move fails, state "document saved to Drive root"
- **Multi-tab sheets**: Create one tab per section, write to every tab before replying
- **Don't ask before sending**: If recipient found via `gmail_search`, send immediately (no confirmation)

### Document Rules
- **Sheet from Drive**: `drive_read_file` on Google Sheet returns JSON array → pass directly to `write_sheet`
- **PDF parsing**: `parse_document` returns extracted text → identify sections → write each to tab
- **Result capping**: Documents capped at 20k chars, other tools at 8k

### Multi-Step Completion
- **Every multi-step action MUST end with explicit completion reply**
- Success: confirm what was done + include relevant links
- Failure: state what failed, what completed, what user should do next

### Tool Call Tracking
- **Placeholder format**: `[calling: tool_name(arg1="value", arg2="value")]` (excludes large fields)
- **Prevents re-calling**: LLM can see which tools it already called
- **Single-use markers**: `create_doc` marked single-use per request
- **Tool call list declaration**: Must be declared in both `runAgent` and `runAgentStreaming` to avoid `ReferenceError` in hallucination guard
- **Partial tool call args**: Excludes large fields like `content`, `values`, `body` to keep history compact

### Personality (Hardcoded)
- **Directness**: No preamble, no unnecessary elaboration
- **Uncertainty**: Admit what you don't know
- **No emotion**: Never simulate feelings or sentimentality
- **User autonomy**: Respect user decisions, don't push
- **Match tone**: Adapt to user's style
- **Brevity default**: Short replies preferred
- **Flag ambiguity**: Ask clarifying questions early
- **Avoid jargon**: Explain technical concepts simply

---

## Detailed Agent Behavior & Implementation Patterns

### Scheduling Rules (Documented in `buildSystemPrompt()`)
- **Reminder content rule**: When user says "remind me to X", call `create_schedule` immediately with exact user words as `action_description`. Never ask clarifying questions about content.
- **Time transparency rule**: If no time specified, pick sensible default (9 AM next workday) and state it explicitly: "Reminder set for [date + time]. Reply 'change time' to adjust."
- **No content clarification**: Only clarify if time/date is completely absent and no sensible default exists.

### Profile Fields in Settings
| Field | Purpose |
|-------|---------|
| Name | Display name |
| Role | Professional context injected into every system prompt (e.g. "Founder", "Software Engineer"). Helps Karna tailor responses. |
| Assistant Name | What the assistant calls itself (default: Karna) |
| Telegram Chat ID | For proactive notifications and briefing delivery |
| Timezone | Used for scheduling defaults and time-aware responses |

### Streaming Persistence Pattern
In `src/services/agent.ts` → `runAgentStreaming()`:
- Assistant message is stored in D1 **before** SSE chunks are yielded to the client
- Ensures reply is persisted even if Cloudflare worker is killed after streaming begins (e.g., timeout on long tool-heavy requests)
- Storage order: `storeMessage` → chunk loop → hallucination guard → `done` event
- Same early-persist pattern applied to fallback path (max turns exhausted)

### Notifications (Bell Icon)
- **Individual ok button**: Deletes that single notification immediately
- **Mark all done button**: Shows `window.confirm` then calls `DELETE /api/chat/notifications/all`
- **Route ordering**: `DELETE /notifications/all` registered **before** `DELETE /notifications/:id` to prevent Hono capturing "all" as param

### File Storage — R2 Integration
Cloudflare R2 bucket `karna-documents` (account `cf39f049784caf415803b1a54fea336c`, region ENAM) bound as `DOCUMENTS_BUCKET` in `wrangler.jsonc`.

**Upload flow** (`src/routes/chat.ts` → `POST /api/chat/upload`):
- If `DOCUMENTS_BUCKET` bound: raw bytes → R2 under file UUID key; D1 `uploaded_files.file_data` stores sentinel `'r2'`. No app-level size limit (100 MB cap in code).
- If `DOCUMENTS_BUCKET` not bound: fallback to base64 in D1 (700 KB raw file limit).

**Parse flow** (`src/services/agent.ts` → `parse_document` case):
- Reads `file_data` from D1; if `'r2'`, fetch object from R2 by file UUID, convert to base64, continue extraction
- Result capped at 20k chars (vs 8k for other tools)

**Error UX**: File-too-large error instructs user to paste Google Drive link as workaround.

### Google Drive Tools (Five Available)
| Tool | Purpose |
|------|---------|
| `drive_list` | List files, optionally filtered by folder or query |
| `drive_search` | Full-text search across Drive |
| `drive_read_file` | Read content (Docs, Sheets, PDFs, text) with format conversion |
| `drive_delete_file` | Move file to trash by URL or ID (30-day recovery window) |
| `drive_organise` | Move file to named folder and/or rename; creates folder if needed |

All tools accept Google Drive URLs (`/file/d/`, `/document/d/`, `/spreadsheets/d/`) or bare file IDs.

### `drive_read_file` Tool — Format Handling
| File type | Method |
|-----------|--------|
| Google Docs | Export via Drive API as `text/plain` |
| Google Sheets | Export as `text/csv` → parsed to `string[][]` JSON by `parseCsvToRows()` (RFC 4180 compliant) |
| Google Presentations | Export as `text/plain` |
| PDFs | Download bytes → extract via Anthropic document API (`pdfs-2024-09-25` beta) |
| Other files | Download and return as plain text |

**Sheet return format**: Rows embedded as JSON array in tool result so LLM can pass directly to `write_sheet`/`append_sheet` without re-parsing.

System prompt: If user pastes Drive link, use `drive_read_file` directly — no upload needed.

### Document Merge — Bug Fixes (Three Critical Fixes)

**1. `create_doc` Partial-Success Error**
- Previously: `createDocument` and `appendText` shared single try/catch. If doc created but `appendText` failed, error said "Failed to create document" — hiding doc URL, leaving orphaned file.
- Fixed: Split into two independent try/catch blocks. On `appendText` failure, returns partial-success message with doc URL + instructions to use `append_to_doc`.

**2. Tool Result Cap Too Low for Documents**
- Previously: All tool results uniformly capped at 8000 chars. `parse_document` on long PDF would truncate content, causing incomplete merged documents.
- Fixed: `parse_document` and `drive_read_file` now capped at 20000 chars; all others remain at 8000.

**3. `appendText` Invalid Insert Index for Empty Docs**
- Previously: `appendText` computed `insertIndex = lastElement.endIndex - 1`. For edge-case empty document, could yield 0, which Google Docs API rejects (valid range starts at 1).
- Fixed: `Math.max(1, ...)` guard ensures index always ≥ 1.

### Resumable Google Writes — Temp Memory Pattern

All Google write tools save pending payload to working memory (importance 9) when Google is not connected. This allows operation resumption without re-doing expensive upstream work (document parsing, research, etc.).

**Tools and Memory Entry Titles**:
| Tool | Memory Title | Payload Fields |
|------|-------------|----------------|
| `create_doc` | `Pending Google Doc save: "{title}"` | tool, title, content, folder_name |
| `append_to_doc` | `Pending append to doc: "{document_id}"` | tool, document_id, content |
| `create_sheet` | `Pending spreadsheet create: "{title}"` | tool, title, sheet_names, folder_name |
| `write_sheet` | `Pending sheet write: {id} — {range}` | tool, spreadsheet_id, range, values (capped 15k chars) |
| `append_sheet` | `Pending sheet append: {id} — {range}` | tool, spreadsheet_id, range, values |
| `gmail_send` | `Pending email: "{subject}"` | tool, to, subject, body, cc |
| `gmail_draft` | `Pending draft: "{subject}"` | tool, to, subject, body, cc |
| `create_calendar_event` | `Pending calendar event: "{summary}"` | tool, summary, start/end_datetime, description, location, attendees, calendar_id |

**Importance & Survival**:
- Importance 9 → working tier → injected into every prompt
- Survives `trimLargeHistoryMessages()` (12k char trim threshold)
- `memory.store()` deduplicates by `(user_id, type, title)` — repeated failures update existing entry

**Research Caching**:
After successful `research` tool call, store 600-char summary to long-term memory (importance 6, title `Research: {query}`). Allows agent to reference findings in follow-up turns even after full result trimmed from history.

**Recovery Pattern**:
On user retry phrases ("try again", "send the pending email", "create the pending event"):
1. Call `search_memory` with relevant prefix (`'Pending Google Doc'`, `'Pending email'`, etc.)
2. Parse JSON payload
3. Call original tool with recovered args
4. Call `delete_memory [id:N]` to clean up after success

**Multi-Tab Sheet Progress Tracking**:
When writing multi-tab spreadsheet, after each successful `write_sheet`, agent calls `store_memory` to record which tabs are done (title: `Sheet progress: {spreadsheet_id}`). On failure mid-sequence, retry reads progress and skips already-written tabs to avoid duplicates.

### Sheet Population from Documents (System Prompt Rules)
- **Multi-tab sheets**: If document has multiple sections (e.g. Audio, Backline, Networking), create one tab per section. Call `write_sheet` for **EVERY tab** before replying — do not stop after first.
- **Drive → Sheet**: `drive_read_file` on Google Sheet returns JSON array; pass directly to `write_sheet` as `values` — do not re-parse.
- **Drive → PDF**: Extracted text returned; identify structured sections, then write each to its own tab.

### Error Handling — 429 Rate Limit Consistency
- Previously: Streaming path (desktop) showed raw Anthropic error text; non-streaming path (mobile) showed generic fallback.
- Fixed: Both `/send` and `/stream` error handlers detect `'429'`, `'rate limit'`, `'Too Many Requests'` and return consistent message:
  - *"Rate limit reached — the AI provider is temporarily throttling requests. Please wait a moment and try again."*
- Streaming path converts raw error before yielding SSE error event.

### UI — Attachment Button Position
Clip (📎) button moved from `input-actions` (right of textarea) to **bottom-left corner** of textarea:
- Absolute positioned at `bottom:4px left:4px` inside `position:relative` wrapper
- Textarea gets `padding-bottom:40px` to prevent typed text hiding behind button

### Folder Move Failure Clarity
When `create_doc` or `create_sheet` successfully creates file but `moveFileToFolder()` fails (folder not found, API error), error message now explicitly states file **is saved** to Drive root:
```
Note: document saved to Drive root — could not place in folder "writings": <error>
```
Previously: `Could not move to folder "writings": <error>` — LLM misread as full save failure and retried, creating duplicates.

### Google Disconnected Warning Banner
`src/frontend.ts` includes persistent amber banner (fixed bottom, dismissible) shown when `/api/settings/google/status` returns `{ connected: false, oauth_client_configured: true }`.

**Implementation**:
- **`checkGoogleConnectionBanner()`**: Fetches status, creates/removes banner element (`id="googleDisconnectedBanner"`)
- **Called on**: Page load + polled every 5 minutes via `setInterval`
- **Also called immediately on**: Explicit connect (dismisses banner) or disconnect (shows banner) — no poll wait
- **"Connect in Settings →" link**: Navigates to `state.settingsSection = 'credentials'` (API Keys section with Google OAuth block)
- **Dismiss X**: Removes element; reappears on next poll if still disconnected
- **Not shown when**: `oauth_client_configured: false` (deployments without Google OAuth)

---

## Development

### Local Setup
```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Dev with D1 emulation (Wrangler)
npm run dev:sandbox

# Apply DB migrations locally
npm run db:migrate:local

# Seed test data
npm run db:seed

# Run unit tests
npm run test

# Watch tests
npm run test:watch

# Production build
npm run build

# Preview build
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

### Environment Variables
Set via `wrangler secret put <name>` or `.dev.vars`:
```
GOOGLE_CLIENT_ID              # OAuth app ID
GOOGLE_CLIENT_SECRET          # OAuth app secret
GOOGLE_API_KEY                # Public API key (Places, Directions, etc.)
GOOGLE_CSE_ID                 # Custom Search Engine ID
CRON_SECRET                   # Shared secret between main app + cron-worker
TELEGRAM_BOT_TOKEN            # Bot token for Telegram integration
BROWSER_USE_API_KEY           # Browser Use Cloud API key (optional)
```

### Database Migrations
- Located in `migrations/` (numbered 0001–0018)
- Applied on deploy via Cloudflare D1
- Local testing: `npm run db:migrate:local`

---

## Deployment

### Production
- **Platform**: Cloudflare Pages
- **URL**: https://karna-5xs.pages.dev
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger**: Auto-deploy on push to `main` branch
- **Database**: Cloudflare D1 (production binding)

### Cron Worker
- **Separate service**: `cron-worker/worker.js`
- **Trigger**: Cloudflare Cron (every minute)
- **Phases**: Job dispatch → Agent tasks → Proactive evaluation
- **Auth**: Shared `CRON_SECRET` header

### R2 Storage
- **Bucket**: `karna-documents`
- **Account**: `cf39f049784caf415803b1a54fea336c`
- **Region**: ENAM
- **Binding**: `DOCUMENTS_BUCKET` in `wrangler.jsonc`
- **Usage**: Store uploaded files (100 MB cap)

---

## PWA / iOS Installation

Karna is installable on iOS via Safari "Add to Home Screen":

1. Open https://karna-5xs.pages.dev in Safari
2. Tap Share → "Add to Home Screen"
3. App launches fullscreen with black status bar

**Manifest & Icons**:
- `public/manifest.json` (fullscreen, black theme)
- `public/icon-192.png` (home screen icon)
- `public/icon-512.png` (splash screen)

---

## Design System

### Typography (Paper & Circuit)
| Token | Font | Usage |
|-------|------|-------|
| `--font-heading` | Cormorant Garamond, Georgia, serif | UI headings, section titles |
| `--font-body` | Inter, system sans-serif | General UI, labels, buttons |
| `--font-mono` | DM Mono, JetBrains Mono | Code blocks, inline code |
| `--font-typewriter` | Courier Prime, Courier New | Assistant reply text (15px, 1.75 line-height) |

### Color Palette
- **Dark mode** (primary)
- **Accent colors**: Warm parchment, circuit board patterns
- **Text**: `#1a1410` for maximum contrast

### Responsive Design
- **Mobile-first** approach
- **iOS-optimized** (tested on iPhone/iPad)
- **Touch targets**: 44px minimum
- **Fullscreen PWA**: Works offline-read-only

---

## Known Limitations & Notes

1. **Cron.org not needed**: Cloudflare Cron Triggers handle all scheduling. Delete any Cron.org jobs.
2. **No offline caching**: Service worker not implemented (not useful for this app).
3. **Research timeout**: 20s hard limit (prevents long-running hangs).
4. **Browser timeout**: 88s wall-clock budget (Cloudflare limit), tasks > 88s go to memory for follow-up.
5. **D1 limits**: SQLite row size ~1 MB (encrypted credentials don't exceed this).
6. **Rate limiting**: 429 errors from providers caught and reported to user.
7. **Session expiry**: 30-day auto-expire, manual refresh on new login.

---

## Common Patterns

### Resumable Operations
If a Google write fails (network, rate limit):
1. Payload saved to working memory (importance 9)
2. User retries ("try again", "send the email")
3. Agent searches memory, recovers payload, retries
4. On success, memory entry deleted

### Sheet Progress Tracking
For multi-tab sheets:
1. After each successful `write_sheet`, agent stores progress (tab name, status)
2. On failure, retry reads progress, skips already-written tabs
3. Prevents duplicate data on retry

### Browser Session Reuse
- First task: authenticate, save sessionId → ~60–90s
- Repeat tasks: reuse sessionId → ~10–20s
- On failure: delete sessionId, restart fresh on next attempt

### Research Caching
- After successful lookup, store 600-char summary (importance 6)
- Allows follow-up questions without re-searching
- Summary survives history trimming (12k char threshold)

---

## Testing

### Unit Tests
Located in `src/services/__tests__/`. Run with:
```bash
npm run test           # One-time run
npm run test:watch    # Watch mode
```

### Manual Testing
- **Local**: `npm run dev:sandbox` (with D1 emulation)
- **Staging**: Deploy branch to Cloudflare Pages (preview URL)
- **Production**: Deploy to `main` branch

---

## Support & Debugging

### Logs
- **D1 errors**: Check `error_log` table
- **Cron history**: Check `cron_execution_log` table
- **Tool calls**: Check `tool_execution_log` table
- **System health**: Check `heartbeat_log` table

### Common Issues
1. **Google connection fails**: Check OAuth client ID/secret in Cloudflare secrets
2. **Briefings not sent**: Check Telegram chat ID in user profile + bot token
3. **Cron tasks not running**: Check `CRON_SECRET` matches between main app + cron-worker
4. **Rate limits**: Wait 60s, retry. Check provider balance via `/api/chat/dashboard`

### Feature Requests
GitHub Issues: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant/issues

---

## Version History

- **v4.2.0** (2026-04): Browser automation, refined memory, dashboard stats
- **v4.1.0** (2026-03): Tool enforcement loop, workspace validation, hallucination guard
- **v4.0.0** (2026-02): Intent router, sub-agents, multi-provider LLM
- **v3.x** (2025): Google Workspace integration, Telegram bot
- **v2.x** (2024): Core chat, memory system, cron engine
- **v1.0** (2023): Initial release

---

## Contributing

Pull requests welcome! Please:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Test locally: `npm run test && npm run build`
3. Push to GitHub
4. Create PR with clear description

---

**Maintained by**: Ashwin Jyoti  
**License**: See LICENSE file in repo  
**Last Updated**: April 26, 2026
