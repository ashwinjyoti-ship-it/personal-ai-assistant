# Handoff: `agent-memory` — a standalone memory service for LLM agents

**Audience:** a fresh Claude Code session with no prior context.
**Owner:** Ash (ashwinjyoti-ship-it).
**Status:** planned and approved. Not yet built.

Read this whole document before writing code. It is self-contained — every
formula, constant and schema you need is written out here, so you do **not**
need access to the source project to build it.

---

## 1. What we are building and why

The `personal-ai-assistant` project (codename **Karna**) contains an unusually
good agent memory system buried inside a large assistant app. We are extracting
**only the memory system** into its own standalone product.

**The goal:** a hosted service that any LLM can be pointed at, which turns that
LLM into an agent with real long-term memory. The LLM gets a set of endpoints
(REST) and/or MCP tools. Everything the agent learns over a user's life is
stored in the memory structures described below.

**Not in scope for v1** (planned for later phases, design so they can be added
without rework):
- Composio tool integration
- A skill builder
- A document database

**In scope for v1:**
1. The memory core (all nine mechanisms in §3)
2. A REST API (`/api/v1/*`) — usable by any LLM
3. An MCP endpoint (`/mcp`) — so Claude and other MCP clients connect natively
4. A simple, password-gated web UI so Ash can *see* what has been remembered
5. Deployment to `agent-memory.pages.dev`

---

## 2. Decisions already made (do not re-litigate)

| Decision | Choice |
|---|---|
| Repo | New: `ashwinjyoti-ship-it/agent-memory` |
| Storage | **Cloudflare D1** (SQLite) — approved by Ash |
| Host | Cloudflare **Pages** project named `agent-memory` → `agent-memory.pages.dev` |
| Embeddings | Cloudflare **Workers AI binding**, model `@cf/baai/bge-small-en-v1.5`, 384 dims |
| Interface | **Both** REST and MCP over one shared core. REST is the product; MCP is a thin adapter. |
| UI auth | **Yes — password-gated.** Approved by Ash. Real personal memory will live here. |
| API auth | Bearer API key per agent |
| Multi-agent | Yes, from day one. Memory is namespaced by `agent_id`, not a single user. |
| Language/stack | TypeScript + Hono (same as the source project — proven on Pages) |

**Still open — ask Ash before the deploy step:**
Deployment route. Either (a) he gives you a `CLOUDFLARE_API_TOKEN` so you can
`wrangler pages deploy` directly, or (b) you push to GitHub and he connects the
repo once in the Cloudflare dashboard, after which every push auto-deploys.
Option (b) was recommended. Build everything else first; ask at the end.

---

## 3. The memory structure to port

This is the valuable part. Nine mechanisms. Port all of them.

### 3.1 Two tiers

Every memory sits in one of two tiers:

- **`working`** — small, hot, *always injected into the system prompt*. Capped at
  **20 entries** and a **~2000 token** budget.
- **`long_term`** — the archive. Never in the prompt; retrieved on demand by search.

**Overflow rule:** when working memory exceeds 20 entries, demote the excess to
`long_term`, choosing `ORDER BY importance ASC, updated_at ASC`, and **never
demoting anything with `importance >= 8`** (those are standing rules that must
always be in the prompt).

**Task cleanup:** memories of `type='task'` with `status='done'` that have been
done for more than 7 days are auto-demoted to `long_term`.

Token estimation throughout the system uses a crude but adequate
`Math.ceil(text.length / 4)`.

### 3.2 Typed memory — eight types

```
summary | fact | preference | decision | context | task | episodic | semantic
```

The type is not decorative — it drives the decay half-life (§3.6) and the
retrieval filters. Meanings:

- `fact` — a permanent fact about the user
- `preference` — how the user wants things done
- `decision` — a choice that was made, and why
- `context` — a resource/reference used repeatedly (a sheet ID, a doc ID)
- `task` — something to do; has `status` (`open`/`done`) and `due_date`
- `episodic` — a specific event that happened at a specific time
- `semantic` — general knowledge distilled from experience
- `summary` — a compaction artifact (§3.7); usually written by the system, not the agent

### 3.3 Bi-temporal tracking

Three separate time axes. This is what lets the agent answer "what did I believe
in March?"

- `created_at` — when the system **learned** it
- `occurred_at` — when the thing **actually happened** (may be long before)
- `valid_until` — when it **stopped being true**. `NULL` means still true.

**The critical rule: memories are superseded, never deleted.** To "forget"
something, set `valid_until = now`. All normal retrieval filters on
`valid_until IS NULL`. Point-in-time recall filters on
`(valid_until IS NULL OR valid_until > :as_of) AND created_at <= :as_of`.

Provide a hard `DELETE` in the API for GDPR-style erasure, but document it as
discouraged and never call it from the agent-facing tools.

### 3.4 Signals — the short-term layer

Every message the agent sees is parsed into a structured **signal** record
before any memory decision is made. A signal captures:

| Field | Values |
|---|---|
| `intent` | `question` \| `command` \| `statement` \| `tool_call` \| `reflection` \| `greeting` \| `meta` |
| `entities` | JSON array, max 20 |
| `topic` | short lowercase phrase |
| `importance` | REAL 0.0–1.0 |
| `emotional_tone` | `neutral` \| `frustrated` \| `excited` \| `uncertain` \| NULL |
| `ref` | free-form caller-supplied reference (thread/message id) |
| `occurred_at` | timestamp |

Extraction is **pure functions, no LLM call, no DB access** — fast and cheap.
Port these exactly:

```ts
export function classifyIntent(text: string): SignalIntent {
  const t = text.trim();
  if (/\b(call|invoke|execute|run)\s+\w+[\s(]/.test(t) || t.startsWith('> ') || /\$\w+/.test(t)) return 'tool_call';
  // greetings before '?' so "Hi, how are you?" is a greeting
  if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))\b/i.test(t)) return 'greeting';
  if (t.endsWith('?')) return 'question';
  if (/^(do|make|run|build|create|delete|update|fix|check|show|list|get|find|search|tell|explain|write|call|send)\s/i.test(t)) return 'command';
  if (/^(wait|actually|oh|i mean|sorry|nevermind|ignore|forget|let me|i'll|i am|i'm)[,\s]/i.test(t)) return 'meta';
  if (/\b(I think|I believe|it seems|maybe|perhaps|I wonder)/i.test(t)) return 'reflection';
  return 'statement';
}

export function extractEntities(text: string): string[] {
  const e = new Set<string>();
  for (const m of text.match(/[a-z]+[A-Z][a-zA-Z]*/g) ?? []) e.add(m);                       // camelCase
  for (const m of text.match(/[A-Z][a-z0-9_]+[A-Z]|[A-Z_]{2,}/g) ?? []) e.add(m);            // SCREAMING_SNAKE
  for (const m of text.match(/\b[\w.]+::\w+|\b\w+\.\w+\b/g) ?? []) e.add(m);                 // namespaced
  const stop = new Set(['The','This','That','These','Those','When','Then','Also','Some','More']);
  for (const m of text.match(/\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})*\b/g) ?? []) if (!stop.has(m)) e.add(m);
  for (const m of text.match(/"([^"]{2,50})"|'([^']{2,50})'/g) ?? []) e.add(m.slice(1, -1)); // quoted
  for (const m of text.match(/#[a-zA-Z]\w*|@[a-zA-Z]\w*/g) ?? []) e.add(m);                  // tags/mentions
  for (const m of text.match(/\bv?\d+\.\d+(?:\.\d+)?|\b\d+\.\d+\.\d+\.\d+\b/g) ?? []) e.add(m);
  for (const m of text.match(/\/\w+(?:\/\w+)+(?:\.\w+)?|\w+\/\w+\.\w+/g) ?? []) e.add(m);    // paths
  return Array.from(e).slice(0, 20);
}

export function computeImportance(text: string): number {
  let score = 0.5;
  const words = text.split(/\s+/).length;
  if (words >= 10 && words <= 50) score += 0.2;
  else if (words > 50) score += 0.1;
  else if (words < 5) score -= 0.15;
  if (text.includes('?')) score += 0.1;
  if (text.includes('!')) score += 0.1;
  if (/```|`/.test(text)) score += 0.1;
  if (/https?:\/\/|www\./.test(text)) score += 0.05;
  if (/\/\w+(\/\w+)*\.\w+/.test(text)) score += 0.05;
  return Math.min(1, Math.max(0, score));
}

export function detectEmotionalTone(text: string) {
  if (/\b(hate|stuck|broken|terrible|awful|annoying|frustrated|can't|cannot|impossible|wrong|bug|issue|problem)\b/i.test(text)) return 'frustrated';
  if (/\b(love|amazing|awesome|perfect|great|excellent|fantastic|excited|yay|wow|incredible)\b/i.test(text)) return 'excited';
  if (/\b(maybe|perhaps|I think|I believe|I guess|not sure|not certain|might|could be|possibly)\b/i.test(text)) return 'uncertain';
  return undefined;
}
```

`extractTopic` — strip leading filler (`hi|hello|hey|so|okay|ok|um|uh|well`) and
trailing `?!.`, then prefer the first capitalised noun phrase (up to 3 words),
lowercased. Otherwise take the first 3 words longer than 2 chars that are not
stopwords. Fall back to `'unknown'`.

### 3.5 Semantic compression of signals

When the accumulated signal window exceeds **4000 tokens**:

1. Keep the **5 most recent** signals untouched.
2. Cluster the rest greedily by topic similarity.
   Similarity = token-overlap Jaccard over `topic.split(/\s+/) ∪ entities`,
   computed as `intersection / max(setA.size, setB.size)`. **Threshold 0.3.**
3. For each cluster with **2 or more** members, write one `episodic` memory:
   - title = most frequent entity in the cluster, else the first signal's topic
   - content = one line per signal + `"[N similar messages compressed into this summary]"`
   - `occurred_at` = the **oldest** signal in the cluster
   - `source = 'inferred:compression'`
   - entities = unique union, capped at 10
   - tier = `long_term`
4. Mark the source signals as compressed (`compressed_into = <memory id>`).

### 3.6 Ebbinghaus decay

Memory fades. Port this file essentially verbatim — it is pure, no DB, easy to unit test.

```ts
export const HALF_LIFE_DAYS: Record<string, number> = {
  episodic: 30,  semantic: 365, procedural: 180, summary: 90, fact: 365,
  preference: 180, decision: 365, context: 30, task: 60,
};
const DEFAULT_HALF_LIFE = 90;
const MS_PER_DAY = 86_400_000;

export function daysSince(when: string | Date, asOf?: Date): number {
  const fromMs = typeof when === 'string' ? new Date(when).getTime() : when.getTime();
  return Math.max(0, ((asOf ?? new Date()).getTime() - fromMs) / MS_PER_DAY);
}

/** Ebbinghaus decay in [0,1]:  e^(-days / half_life) * (importance / 10) */
export function decayScore(type: string, importance: number, lastAccessedAt: string | Date, asOf?: Date): number {
  const halfLife = HALF_LIFE_DAYS[type] ?? DEFAULT_HALF_LIFE;
  const raw = Math.exp(-daysSince(lastAccessedAt, asOf) / halfLife) * (importance / 10);
  return Math.min(1, Math.max(0, raw));
}
```

Notes:
- `importance` acts as a **permanent ceiling** — an importance-5 memory can never
  score above 0.5, no matter how fresh.
- Every retrieval **touches** the memories it returns: set
  `last_accessed_at = CURRENT_TIMESTAMP`. Recall is what keeps memory alive. This
  is the single most important behaviour to get right.

### 3.7 Compaction

Nightly, for each agent: find all memories with `decay_score < 0.1` and
`valid_until IS NULL`. Group them **by type**. For each group:

- insert one new memory: `type='summary'`, `tier='long_term'`,
  `source='compaction'`, `decay_score=1.0`,
  `importance = max(importance of group)`,
  title `"Compacted {type} memories (N entries)"`,
  content = `"• {title}: {content truncated to 200 chars}"` per member, newline-joined
- set `valid_until = now` on every original

Nothing is lost — memory just gets coarser over time, like a human's.

### 3.8 Hybrid retrieval

Embeddings: `@cf/baai/bge-small-en-v1.5`, 384 dims, stored as a JSON string in
the `embedding` column. Generate on write from `"{title} {content}"`.
**Embedding failure must never block a write** — wrap in try/catch, store the
memory anyway, and let the nightly backfill fill it in.

Search is two-pass:

1. **Candidate fetch.** SQL `LIKE` pre-filter on title/content, ordered by
   `decay_score DESC`, limit `max(limit * 5, 50)`.
2. **Supplement.** If pass 1 returns fewer than half the candidate limit, top up
   with the highest-`decay_score` rows regardless of keyword match — so purely
   semantic queries still surface results.
3. **Re-rank in JS:**

```
finalScore = (0.55 * cosineSimilarity + 0.25 * keywordOverlap + 0.20 * decayScore)
             * (importance / 10)
```

where `keywordOverlap` = fraction of query tokens (length > 2, lowercased) found
as substrings in `"{title} {content}"`, **but** forced to `1.0` if the query is a
substring of the title.

Also expose a **pure semantic** mode that ignores keywords:
`finalScore = cosineSimilarity * (importance / 10)`, over rows where
`embedding IS NOT NULL`.

Always filter `valid_until IS NULL` unless doing point-in-time recall.

### 3.9 Confidence — the differentiator

Every recall result carries a confidence score and a plain-English reason. This
is what stops the agent confabulating.

```
confidence = 0.40 * retrieval_similarity
           + 0.25 * decay_score
           + 0.20 * source_trust
           + 0.15 * corroboration_normalized
```

- `retrieval_similarity = vectorScore * 0.55 + keywordScore * 0.25`
- `source_trust` lookup:
  | source | trust |
  |---|---|
  | `user` | 1.00 |
  | `tool:*` | 0.85 |
  | `inferred:compression` | 0.70 |
  | `inferred` | 0.50 |
  | *(anything else / unset)* | 0.70 |
- `corroboration_count` = number of *other* valid memories sharing at least one
  entity, **capped at 5**. `corroboration_normalized = count / 5`.

**Tiers:** `>= 0.80` high · `>= 0.40` medium · else low.

Build a human-readable `reasoning` string, e.g.
`"72% confidence: moderate semantic match; recently accessed; from user direct input; 3 corroborating memories."`

Return a **prompt suffix** the calling agent can paste straight into its system
prompt:

| tier | suffix |
|---|---|
| high | `[Memory confidence: high — answer directly]` |
| medium | `[Memory confidence: medium — acknowledge uncertainty in your response]` |
| low | `[Memory confidence: low — indicate you don't have reliable information. Suggest how to find out.]` |

Record every confidence computation into `memory_confidence_history` so we can
later see how confidence in a given memory has drifted. Keep the most recent 30
rows per memory; prune the rest nightly.

### 3.10 Review queue

The agent can *propose* a memory rather than writing it. Proposals land in
`memory_suggestions` with `status='pending'` and appear in the UI for Ash to
accept (→ becomes a real memory) or reject. This is the human-in-the-loop valve.

---

## 4. Database schema (D1 / SQLite)

Write as numbered migrations in `migrations/`. Do **not** recreate the source
project's 61-migration history — start clean with `0001_initial.sql`.

```sql
-- Agents = API key holders. Memory is namespaced by agent.
CREATE TABLE agents (
  id           TEXT PRIMARY KEY,               -- uuid
  name         TEXT NOT NULL,
  key_hash     TEXT NOT NULL UNIQUE,           -- SHA-256 of the API key; never store the key
  key_prefix   TEXT NOT NULL,                  -- e.g. 'am_live_a1b2' for display only
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME
);

CREATE TABLE memory (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id      TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK(type IN
                  ('summary','fact','preference','decision','context','task','episodic','semantic')),
  tier          TEXT NOT NULL DEFAULT 'working' CHECK(tier IN ('working','long_term')),
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  importance    INTEGER NOT NULL DEFAULT 5,
  status        TEXT DEFAULT 'open' CHECK(status IN ('open','done')),
  due_date      DATETIME,
  occurred_at   DATETIME,                      -- when it happened
  valid_until   DATETIME,                      -- NULL = still true
  source        TEXT NOT NULL DEFAULT 'user',
  entities      TEXT NOT NULL DEFAULT '[]',    -- JSON array
  decay_score   REAL NOT NULL DEFAULT 1.0,
  last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  embedding     TEXT,                          -- JSON array, 384 floats
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_memory_agent_type     ON memory(agent_id, type);
CREATE INDEX idx_memory_agent_tier     ON memory(agent_id, tier);
CREATE INDEX idx_memory_decay          ON memory(agent_id, decay_score);
CREATE INDEX idx_memory_occurred       ON memory(agent_id, occurred_at);
CREATE INDEX idx_memory_valid          ON memory(agent_id, valid_until);
CREATE INDEX idx_memory_last_accessed  ON memory(agent_id, last_accessed_at);
CREATE INDEX idx_memory_tasks          ON memory(agent_id, type, status);
CREATE INDEX idx_memory_has_embedding  ON memory(agent_id) WHERE embedding IS NOT NULL;

-- Short-term layer. NOTE: the source project FKs this to a conversations table.
-- We have no conversations here — the caller supplies a free-form `ref` instead.
CREATE TABLE signals (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id       TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  ref            TEXT NOT NULL DEFAULT '',     -- caller's thread/message id, opaque to us
  role           TEXT NOT NULL CHECK(role IN ('user','assistant')),
  intent         TEXT NOT NULL CHECK(intent IN
                   ('question','command','statement','tool_call','reflection','greeting','meta')),
  entities       TEXT NOT NULL DEFAULT '[]',
  topic          TEXT NOT NULL DEFAULT 'unknown',
  importance     REAL NOT NULL DEFAULT 0.5,
  emotional_tone TEXT CHECK(emotional_tone IN ('neutral','frustrated','excited','uncertain')),
  raw_text       TEXT,                          -- truncated to 1000 chars
  occurred_at    DATETIME NOT NULL,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  compressed_into INTEGER REFERENCES memory(id) ON DELETE SET NULL
);

CREATE INDEX idx_signals_agent      ON signals(agent_id, occurred_at DESC);
CREATE INDEX idx_signals_topic      ON signals(agent_id, topic);
CREATE INDEX idx_signals_compressed ON signals(agent_id, compressed_into);

CREATE TABLE memory_suggestions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id    TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  importance  INTEGER DEFAULT 5,
  reason      TEXT,                              -- why the agent thinks this matters
  status      TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  decided_at  DATETIME
);

CREATE INDEX idx_suggestions_agent_status ON memory_suggestions(agent_id, status);

CREATE TABLE memory_confidence_history (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  memory_id   INTEGER NOT NULL REFERENCES memory(id) ON DELETE CASCADE,
  confidence  REAL NOT NULL,
  query_used  TEXT,
  occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conf_hist_memory ON memory_confidence_history(memory_id, occurred_at DESC);
```

**Deduplication on write:** if a memory with the same
`(agent_id, type, title)` already exists, **update** it rather than inserting a
duplicate. This is how the source project keeps memory from bloating.

---

## 5. REST API

Base: `https://agent-memory.pages.dev/api/v1`
Auth: `Authorization: Bearer am_live_...` on every call. Resolve to `agent_id`
by SHA-256 hashing the key and looking up `agents.key_hash`. Update
`last_used_at`. Return `401` with a clear JSON error on failure.

All responses are JSON. Errors: `{ "error": { "code": "...", "message": "..." } }`.

### Write

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/remember` | `{type, title, content, importance?, tier?, occurred_at?, source?, entities?, due_date?}` | Dedupes on (type,title). Embeds. Enforces working cap. Returns the stored memory. |
| POST | `/observe` | `{text, role, ref?, occurred_at?}` | Extracts a signal (§3.4) and stores it. Triggers compression if over budget. Returns the extracted signal so the caller can see what was understood. |
| POST | `/suggest` | `{type, title, content, importance?, reason?}` | Queues for human approval. Does **not** create a memory. |

### Read

| Method | Path | Query / body | Notes |
|---|---|---|---|
| POST | `/recall` | `{query, limit?, type?, mode?, min_confidence?}` | `mode` = `hybrid` (default) \| `semantic`. **Returns memories with confidence + reasoning + prompt suffix.** Touches `last_accessed_at`. |
| GET | `/context` | `?token_budget=2000` | The ready-made system-prompt block: working memory, importance-ordered, token-budgeted. This is what an agent injects every turn. |
| GET | `/recall-at` | `?query=&as_of=ISO8601` | Point-in-time. What was true then. |
| GET | `/timeline` | `?from=&to=&type=episodic` | Events in a date range, ordered by `occurred_at`. |
| GET | `/memories` | `?type=&tier=&status=&include_superseded=&limit=&offset=` | Plain listing for the UI. |
| GET | `/memories/:id` | | Includes confidence history. |
| GET | `/signals` | `?limit=20` | Recent short-term signals, chronological. |
| GET | `/suggestions` | `?status=pending` | |
| GET | `/stats` | | Counts by type and tier, decay distribution, embedding coverage, last maintenance run. Powers the UI header. |

### Modify

| Method | Path | Notes |
|---|---|---|
| PATCH | `/memories/:id` | Update content / importance / status / due_date. Re-embeds if content changed. |
| POST | `/memories/:id/supersede` | `{valid_until?}` — the **correct** way to forget. Default now. |
| POST | `/memories/:id/promote` | → `working` |
| POST | `/memories/:id/demote` | → `long_term` |
| DELETE | `/memories/:id` | Hard delete. Document as discouraged; do not expose as an agent tool. |
| POST | `/suggestions/:id/accept` | Creates the real memory. |
| POST | `/suggestions/:id/reject` | |

### Maintenance

| Method | Path | Notes |
|---|---|---|
| POST | `/maintenance/run` | Recompute all decay scores → compact below 0.1 → compress signals → backfill missing embeddings → prune confidence history. Idempotent. Returns a summary of what changed. |

---

## 6. MCP endpoint

Expose the same core at `POST /mcp` using **Streamable HTTP**, stateless.

Implement JSON-RPC 2.0 directly — handle `initialize`, `tools/list`,
`tools/call`, and `notifications/initialized`. This is roughly 150 lines and
avoids SDK/Workers-runtime friction. (Alternative if you hit trouble:
`@modelcontextprotocol/sdk`'s `StreamableHTTPServerTransport`, or Cloudflare's
`agents` package `McpAgent`. Manual is recommended.)

Auth: the same `Authorization: Bearer` header.

**Tools to expose** (names matter — they are what the LLM sees):

| Tool | Maps to |
|---|---|
| `remember` | POST /remember |
| `recall` | POST /recall |
| `recall_at` | GET /recall-at |
| `get_context` | GET /context |
| `timeline` | GET /timeline |
| `observe` | POST /observe |
| `forget` | POST /memories/:id/supersede |
| `update_memory` | PATCH /memories/:id |
| `suggest_memory` | POST /suggest |
| `memory_stats` | GET /stats |

Write the tool **descriptions** carefully — they are the actual interface an LLM
reasons over. Say explicitly:
- what `remember` is for (permanent rules, preferences, standing facts) and what
  it is **not** for (one-off tasks, whole documents, transient chatter)
- that `forget` supersedes rather than destroys
- that `recall` returns confidence and the agent should modulate its wording accordingly

Verify with MCP Inspector, and by adding the URL as a custom connector in Claude.

---

## 7. The UI

Password-gated. One env var `UI_PASSWORD`; on successful login set a signed,
`HttpOnly`, `Secure`, `SameSite=Strict` cookie. Everything under `/` except the
login page requires it. The UI talks to the same `/api/v1` endpoints using a
server-side session, **not** an API key in the browser.

Keep it genuinely simple — server-rendered HTML from Hono plus a little vanilla
JS. No React, no build complexity. Ash's aesthetic is minimalist/brutalist
(Teenage Engineering): monospace, flat, high contrast, generous whitespace, no
gradients or shadows. Must work on iPad.

Screens:

1. **Memories** — the main table. Columns: type badge, title, tier, importance,
   **decay as a small horizontal bar**, age, source. Filter by type / tier /
   superseded. Click a row to expand full content, entities, all three
   timestamps, and confidence history.
2. **Search** — a query box that runs `/recall` and shows each result with its
   confidence percentage, tier colour (high/medium/low) and the reasoning
   sentence. This is the demo screen; make it the most polished.
3. **Signals** — the recent short-term stream: intent, topic, entities, tone.
   Shows what the agent is noticing in real time.
4. **Review queue** — pending suggestions with Accept / Reject buttons.
5. **Agents** — create an agent, see its key **once** at creation, revoke it.
6. **Stats strip** in the header — total memories, working/long-term split,
   embedding coverage, last maintenance run, plus a "Run maintenance now" button.

---

## 8. Build order

| Phase | Deliverable | Done when |
|---|---|---|
| **1** | Repo scaffold, D1 schema, migrations, agent/API-key auth | `wrangler d1 migrations apply` runs clean locally; a key authenticates |
| **2** | Memory core: decay, embeddings, hybrid retrieval, confidence, compaction, signals, compression | **Unit tests pass** on all pure functions (see §9) |
| **3** | REST API, all endpoints in §5 | Full round-trip by curl: remember → recall → supersede → recall-at |
| **4** | MCP endpoint | Claude connects as a custom connector and calls `remember`/`recall` successfully |
| **5** | UI, all six screens | Ash can log in and see memory |
| **6** | Maintenance scheduling + deploy | Live at `agent-memory.pages.dev` |
| *Later* | Composio tools, skill builder, document DB | — |

---

## 9. Testing

Use `vitest`. The pure functions are the crown jewels — test them hard, they
need no DB:

- `decayScore` — importance 10 freshly accessed → `1.0`; one half-life later → `~0.5`;
  importance 5 never exceeds `0.5`; unknown type falls back to 90 days
- `keywordOverlap` — ignores tokens ≤ 2 chars; exact title match forces `1.0`
- `cosineSimilarity` — identical vectors → `1.0`; orthogonal → `0`; mismatched lengths → `0`
- `computeConfidence` — the four weights sum correctly; tier boundaries at exactly 0.80 and 0.40
- `classifyIntent` — `"Hi, how are you?"` → `greeting` (not `question`); `"Wait, I meant..."` → `meta`
- `clusterSignals` — threshold 0.3 behaviour; singletons are not compressed
- Bi-temporal — a superseded memory disappears from `recall` but reappears in
  `recall_at` with an `as_of` before its `valid_until`

Integration smoke test against a local D1: remember 20 memories → confirm the
21st demotes something → recall → confirm `last_accessed_at` moved.

---

## 10. Gotchas — read these before you hit them

1. **Cloudflare Pages has no cron triggers.** Pages Functions cannot run
   scheduled events. So `/maintenance/run` must be called from outside. Use a
   **GitHub Actions scheduled workflow** (nightly, `curl` with a secret key) —
   simplest and free. Alternative: a tiny separate Worker with a cron trigger
   that hits the endpoint. Do not plan on a Pages cron; it does not exist.
2. **Workers AI binding vs REST.** The source project calls the Cloudflare AI
   **REST API** with an account ID and token, because it runs on Render. We are
   on Cloudflare, so use the **`ai` binding** directly (`env.AI.run(...)`) —
   faster, cheaper, no secrets to manage. Do not copy the REST client.
3. **Embeddings must be non-fatal.** If the AI call fails, still write the
   memory. The nightly backfill fills gaps. Never let a memory write fail
   because of an embedding.
4. **`valid_until IS NULL` on every read path.** Forgetting this filter is the
   most likely bug: superseded memories leaking back into recall.
5. **Touch on read.** Retrieval must update `last_accessed_at`. Without it,
   everything decays regardless of use and compaction eats live memories.
6. **D1 has no vector index.** We fetch candidates by SQL then re-rank in JS.
   This is fine to roughly the low tens of thousands of memories per agent. If
   it ever gets slow, move vectors to Cloudflare Vectorize — the code is already
   structured so only the candidate-fetch step changes.
7. **SQLite `ALTER TABLE` is limited.** Get the schema right in `0001` rather
   than planning to alter it; the source project needed a full table rebuild to
   widen one CHECK constraint.
8. **Never log API keys or memory content.** Memory content is personal by
   definition. Log IDs and counts only.
9. **Do not copy Karna-specific naming.** The source has references to Karna,
   Eddy, NCPA, Gmail and so on. This service is generic and knows nothing about
   any particular agent's domain.

---

## 11. Source reference

If the builder session has access to `ashwinjyoti-ship-it/personal-ai-assistant`,
these are the files worth reading. **Everything essential is already reproduced
above, so this is optional.**

| File | Contains |
|---|---|
| `src/services/memory.ts` | `MemoryService` — tiers, store/dedupe, context building |
| `src/services/decay.ts` | Ebbinghaus decay (port near-verbatim) |
| `src/services/retrieval.ts` | Hybrid search and the scoring weights |
| `src/services/confidence.ts` | Confidence model, source trust, reasoning strings |
| `src/services/compaction.ts` | Low-decay compaction |
| `src/services/short-term.ts` | Signal clustering and semantic compression |
| `src/services/signals.ts` | Signal extraction (pure functions) |
| `src/services/memory-embeddings.ts` | Embeddings + cosine similarity |
| `src/types/index.ts` (lines ~137–215) | `MemoryRecord`, `Signal`, `ConfidenceResult` |
| `migrations/0048`–`0052` | The memory schema evolution |
| `src/routes/memory-review.ts` | The review-queue API shape |

**Do not** port: `federation.ts` (Karna↔Eddy specific), `agent.ts` (a 378 KB
assistant), or anything touching Gmail, Google, Telegram, browser automation or
documents.

---

## 12. First message for the builder session

> Read `AGENT_MEMORY_HANDOFF.md` in full. Create a new repo
> `ashwinjyoti-ship-it/agent-memory` and build phases 1–5 as specified. Stack is
> TypeScript + Hono on Cloudflare Pages with D1 and the Workers AI binding.
> Write unit tests for every pure function as you go. Ask me before the deploy
> step — we need to settle how the Cloudflare token is provided.
