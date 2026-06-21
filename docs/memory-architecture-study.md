# Karna Memory Architecture: Gap Analysis & Improvement Roadmap
**Date**: 2026-06-21  
**Scope**: Internal study comparing Karna's current memory system against the 2026 cognitive memory gold standard

---

## 1. What Karna Has Today

Karna implements a **two-tier flat memory system** stored in SQLite (Cloudflare D1).

### Current Tiers

| Tier | Cap | Storage | Access |
|------|-----|---------|--------|
| Working Memory | 20 entries / ~2K tokens | SQLite rows, tier='working' | Auto-injected into every system prompt |
| Long-Term Memory | Unlimited | SQLite rows, tier='long_term' | On-demand via `search_memory()` tool or recall-pattern auto-injection |

### Current Memory Types
`preference` · `fact` · `decision` · `context` · `task` · `summary`

### Current Strengths
- **Deduplication** by `(user_id, type, title)` — re-storing updates, not duplicates
- **Capacity eviction** — overflow demotes oldest low-importance entries; importance ≥ 8 is protected
- **Recall-pattern auto-injection** — sparse working memory + keyword triggers pull long-term memory automatically
- **Hallucination guards** — system verifies claimed actions match actual tool calls (meta-cognitive loop)
- **Research metadata persistence** — prior research is remembered across turns in a thread
- **Memory suggestions** — LLM can propose memories for user approval before committing
- **Document migration** — entries > 1,500 chars migrate to Document Library to avoid memory bloat
- **Task auto-demotion** — completed tasks auto-demote after 7 days

### Current Gaps (The Honest Audit)

| Gap | Severity | Impact |
|-----|----------|--------|
| No semantic/vector search — pure LIKE matching | Critical | Miss rate on paraphrase queries; brittle retrieval |
| No episodic memory tier | Critical | Karna cannot reason about "what happened when" or learn from past decisions |
| No procedural memory tier | High | No skill-level self-knowledge; cannot track tool success rates |
| No Ebbinghaus decay — facts persist forever equally | High | Old/stale facts crowd out current ones; recall quality degrades over time |
| No typed knowledge graph | High | Relationships between entities are invisible (user → employer → team → slack channel) |
| No self-model memory | High | Karna has no persistent record of its own capabilities, current goals, or operational state |
| No reflective logs | Medium | Karna cannot review *why* it made past decisions |
| No confidence/epistemic markers | Medium | Every memory is presented as equally certain — "knows" vs "thinks" vs "guesses" |
| No memory consolidation (sleep cycle) | Medium | Episodic detail never compresses to semantic fact automatically |
| No hybrid search | Medium | No BM25 + dense vector + graph traversal combo; only keyword LIKE |
| Working memory cap is static (20 entries) | Low | No dynamic resizing based on task complexity |
| No capability registry | Low | Karna doesn't know its own tool success rates or when it last used a tool |

---

## 2. The 2026 Gold Standard (Target Architecture)

### 2.1 Five-Tier Cognitive Memory Model

```
Tier 1  SENSORY / BUFFER       Raw input, tool outputs, signals            Milliseconds   Volatile
Tier 2  WORKING MEMORY         Current task scratchpad                     Seconds–mins   Context window
Tier 3  SHORT-TERM / EPISODIC  "What happened when" — event log            Hours–days     Time-stamped embeddings
Tier 4  LONG-TERM SEMANTIC     Facts, concepts, relationships, user profile Days–permanent Vector DB + Knowledge Graph
Tier 5  PROCEDURAL             Skills, tool-use patterns, workflow scripts  Permanent      Skills library
```

**Key differentiation from naive RAG**: the explicit split between Episodic ("event log of what occurred") and Semantic ("distilled knowledge") — plus Procedural as a first-class tier.

### 2.2 Six Non-Negotiable Design Principles

1. **Self-editing memory** — the agent edits its own memory (MemGPT/Letta pattern), not passive extraction
2. **Typed memories** — separate stores for facts, events, skills, preferences; no flat blob
3. **Typed knowledge graph** — entities + relationships + bi-temporal edges (Zep/Graphiti pattern)
4. **Hybrid search** — dense vector embeddings + BM25/sparse + graph traversal
5. **Active forgetting** — Ebbinghaus decay, TTL, importance scoring
6. **Memory consolidation** — periodic "sleep" cycles compress episodic → semantic

### 2.3 Self-Awareness Layer (The Missing Piece in Karna)

The document identifies four components of true agent self-awareness:

| Component | What It Is | Karna's Current State |
|-----------|------------|----------------------|
| **Self-Model Memory** | Persistent record of persona, capabilities, limits, current goals, operational state | Absent — Karna has no stored self-model |
| **Reflective Logs** | Episodic traces of *why* it decided what it decided, compressed to rationale | Absent — decisions are not logged |
| **Confidence/Epistemic Markers** | Uncertainty scores alongside facts ("knows" vs "thinks" vs "guesses") | Absent — all memories treated as equally certain |
| **Capability Registry** | What tools/skills it has, success rates per skill, when last used | Partial — tool calls are tracked per-conversation but not persisted |
| **Metacognitive Prompts** | Periodic self-checks: "Do I have enough context to answer confidently?" | Partial — recall-pattern detection is a weak version of this |

---

## 3. Gap-by-Gap Improvement Plan

### GAP 1: No Semantic Search → Add Hybrid Retrieval

**Current**: Two-pass LIKE matching — `title LIKE '%query%' OR content LIKE '%query%'`  
**Problem**: Paraphrase queries fail. "budget planning" misses "financial forecast." Entire retrieval is brittle.

**Fix**: Add embedding-based semantic search as a parallel retrieval path.

```
Proposed retrieval stack (ordered by cost):
  1. Exact LIKE match (current — fast, free, high precision)
  2. BM25/FTS5 full-text index (SQLite FTS5 extension — low cost)
  3. Dense vector similarity (embedding column + cosine similarity — medium cost)
  4. Knowledge graph traversal (entity-relationship walk — for structured queries)

Merge results with Reciprocal Rank Fusion (RRF) before returning to LLM.
```

**Implementation path for Karna**:
- Add `embedding BLOB` column to `memory` table
- On each `store_memory`, generate embedding via Claude API (`claude-haiku-4-5` for cost efficiency)
- Add SQLite FTS5 virtual table: `CREATE VIRTUAL TABLE memory_fts USING fts5(title, content, content=memory)`
- Modify `search_memory` to run all three passes and merge

**Effort**: Medium. The FTS5 index alone is a 2-day win that eliminates most LIKE failures.

---

### GAP 2: No Episodic Memory → Add Event Log Tier

**Current**: Memories are timeless facts. Karna cannot answer "what did we decide last week about the project timeline?"  
**Problem**: No temporal context = no learning from past; no "what happened when" reasoning.

**Fix**: Add a dedicated episodic memory tier — a time-stamped event log with compression.

```sql
CREATE TABLE episodic_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  event_type TEXT NOT NULL CHECK(event_type IN (
    'decision', 'action', 'error', 'learning', 'conversation_summary', 'goal_set', 'goal_achieved'
  )),
  title TEXT NOT NULL,
  what TEXT NOT NULL,           -- What happened
  why TEXT,                     -- Why (rationale, if captured)
  outcome TEXT,                 -- What resulted
  confidence REAL DEFAULT 1.0,  -- 0.0-1.0 epistemic marker
  related_entities TEXT,        -- JSON array: ["project-x", "user", "google-sheets"]
  importance INTEGER DEFAULT 5,
  decay_score REAL DEFAULT 1.0, -- Ebbinghaus: decreases over time unless reinforced
  last_reinforced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Episodic memory lifecycle**:
1. Agent calls `log_episode(event_type, title, what, why, outcome)` after significant actions
2. Episodes stored with full temporal context
3. Retrieval: "What happened with X?" → search episodic log by entity + recency
4. Consolidation (see GAP 6): Old episodes compress into semantic facts via nightly job

**Self-awareness benefit**: Karna can reason — "Last time I tried to schedule a meeting with this user, the calendar tool failed. I should try a different approach."

---

### GAP 3: No Procedural Memory → Add Capability Registry

**Current**: Tool success rates tracked per-conversation only; not persisted.  
**Problem**: Karna cannot learn which tools work reliably, which fail, or when to prefer alternatives.

**Fix**: Add a procedural memory / capability registry.

```sql
CREATE TABLE capability_registry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tool_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  call_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  last_used_at DATETIME,
  last_failed_at DATETIME,
  avg_latency_ms INTEGER,
  notes TEXT,                   -- Agent's own observations about this tool
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, tool_name),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Procedural memory lifecycle**:
- After every tool call: increment `call_count`, `success_count` or `failure_count`, update `last_used_at`
- Inject into system prompt: "Your tool success rates: gmail (98%), google_sheets (94%), calendar (71% — tends to fail on multi-day events)"
- Agent uses this to prefer reliable tools or adjust approach

**Self-awareness benefit**: Karna develops a real model of its own capabilities. It can say "I know this tool is unreliable for this use case" rather than blindly calling it.

---

### GAP 4: No Decay → Add Ebbinghaus-Style Scoring

**Current**: Preferences, facts, and decisions persist indefinitely with equal weight.  
**Problem**: A fact from 18 months ago gets the same weight as a fact from yesterday. Stale memories pollute context.

**Fix**: Add decay scoring to all memory entries.

```sql
-- Add to existing memory table
ALTER TABLE memory ADD COLUMN decay_score REAL DEFAULT 1.0;
ALTER TABLE memory ADD COLUMN last_reinforced_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE memory ADD COLUMN ttl_days INTEGER DEFAULT NULL;  -- NULL = no expiry
```

**Decay formula** (Ebbinghaus-inspired):
```
decay_score = e^(-decay_rate * days_since_reinforced)

Where decay_rate depends on type:
  'preference'  → 0.001  (very slow — preferences are stable)
  'fact'        → 0.002  (slow — facts change but not quickly)
  'decision'    → 0.005  (medium — decisions get revisited)
  'context'     → 0.01   (faster — resource pointers go stale)
  'task'        → 0.05   (fast — tasks are time-bound)
```

**Reinforcement**: Each time a memory is accessed (retrieved and used), `last_reinforced_at` resets → decay_score recovers toward 1.0.

**Active forgetting policy**:
```
Nightly job:
  - Recalculate decay_score for all entries
  - decay_score < 0.1 AND importance < 6 → auto-demote to long_term
  - decay_score < 0.05 AND importance < 4 → flag for user review / auto-delete
  - decay_score < 0.05 AND importance >= 8 → never auto-delete, but flag as "stale"
```

**Self-awareness benefit**: Karna's working memory stays fresh. Old data naturally fades unless it proves itself relevant through repeated use.

---

### GAP 5: No Knowledge Graph → Add Entity-Relationship Layer

**Current**: Memories are isolated flat strings. Karna knows "Slack Channel: #projects" and "Team: Product" but doesn't know they're related.  
**Problem**: No relational reasoning. "Who is on my team?" cannot traverse team → members without manually searching each fact.

**Fix**: Add a lightweight typed knowledge graph on top of existing memory.

```sql
CREATE TABLE knowledge_entities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK(entity_type IN (
    'person', 'project', 'organization', 'tool', 'document', 'location', 'concept', 'goal'
  )),
  description TEXT,
  attributes TEXT,              -- JSON: {"role": "PM", "timezone": "IST"}
  importance INTEGER DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name, entity_type),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE knowledge_edges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  from_entity_id INTEGER NOT NULL,
  relationship TEXT NOT NULL,   -- "works_with", "manages", "uses", "owns", "part_of"
  to_entity_id INTEGER NOT NULL,
  confidence REAL DEFAULT 1.0,
  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME DEFAULT NULL,  -- Bi-temporal: null = still valid
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_entity_id) REFERENCES knowledge_entities(id) ON DELETE CASCADE,
  FOREIGN KEY (to_entity_id) REFERENCES knowledge_entities(id) ON DELETE CASCADE
);
```

**Graph traversal example**:
```
User asks: "Who else uses the budget spreadsheet?"
  1. Entity lookup: "budget spreadsheet" → entity_type='document', id=42
  2. Edge traversal: SELECT * FROM knowledge_edges WHERE to_entity_id=42 AND relationship='uses'
  3. Return: [user, Finance Team, Ashwin] → all entities with 'uses' edge to that doc
```

**Implementation note**: This doesn't need a full graph DB. SQLite edge tables + recursive CTEs handle 90% of personal-assistant graph queries. Reserve a graph DB (Neo4j, Graphiti) for when entity count exceeds ~10K.

---

### GAP 6: No Memory Consolidation → Add Nightly Sleep Cycle

**Current**: Episodic events (once added) are never compressed. Semantic facts are never derived automatically.  
**Problem**: Episodic memory grows unbounded; the system never "learns" from patterns in events.

**Fix**: Nightly consolidation job that compresses episodic → semantic.

```typescript
// Pseudocode for memory consolidation job
async function runMemoryConsolidation(userId: number): Promise<void> {
  // 1. Fetch unprocessed episodic events from last 24h
  const recentEpisodes = await getEpisodicEvents(userId, { since: '24h', consolidated: false });
  
  // 2. Group by entity / topic
  const grouped = groupByEntity(recentEpisodes);
  
  // 3. For each group with >= 3 episodes on same topic:
  //    → Call LLM to synthesize into a semantic fact
  //    → Store synthesized fact in long-term semantic memory
  //    → Mark source episodes as consolidated=true
  for (const [entity, episodes] of grouped) {
    if (episodes.length >= 3) {
      const synthesized = await llm.synthesize(episodes);
      await memory.store(userId, 'fact', synthesized.title, synthesized.content, synthesized.importance);
      await markEpisodesConsolidated(episodes.map(e => e.id));
    }
  }
  
  // 4. Run decay recalculation
  await recalculateDecayScores(userId);
  
  // 5. Prune low-decay, low-importance long-term entries (active forgetting)
  await pruneStaleMemories(userId);
}
```

**Consolidation example**:
```
3 episodic events:
  - "Tried to export Google Sheet as PDF — failed, Drive permission error"
  - "Tried PDF export again — failed"
  - "Used CSV export instead — succeeded"

→ Consolidates to semantic fact:
  type: 'preference', importance: 8
  title: "Google Sheet Export Format"
  content: "PDF export fails due to Drive permissions. Use CSV export instead."
```

**Self-awareness benefit**: Karna doesn't just remember events — it *learns* from them. Repeated patterns become standing knowledge without user intervention.

---

### GAP 7: No Self-Model Memory → Add Agent Self-Description

**Current**: Karna has no stored record of who it is, what its goals are, or what state it's in.  
**Problem**: Every conversation starts from a static system prompt. No persistent self-model evolves.

**Fix**: A dedicated `self_model` table that the agent can read and update.

```sql
CREATE TABLE self_model (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN (
    'persona', 'capability', 'limit', 'current_goal', 'operational_state', 'learning'
  )),
  confidence REAL DEFAULT 1.0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, key),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Seeded self-model entries** (initial values Karna writes about itself):
```
persona:        "I am Karna, a personal AI assistant for Ashwin..."
capability:     "I can manage Google Calendar, Gmail, Sheets, Drive..."
limit:          "I cannot browse arbitrary URLs unless given a tool. I cannot make phone calls."
current_goal:   "Help Ashwin ship the personal-ai-assistant project."
operational_state: "Active. Last full context loaded 2026-06-21."
learning:       "User prefers bullet-point summaries over prose. User timezone: IST."
```

**Injection into system prompt** (alongside working memory):
```
## My Self-Model
- **Persona**: Karna — personal AI assistant for Ashwin
- **Current Goal**: Helping ship personal-ai-assistant project
- **Known Limits**: Cannot browse URLs without web_fetch tool; no phone capability
- **Operational State**: Active, last calibrated 2026-06-21
- **Key Learning**: User prefers bullet-point format; responds well to IST-aware scheduling
```

**Agent can update its self-model** by calling `update_self_model(key, value, category)` when it learns something new about itself.

---

### GAP 8: No Confidence Markers → Add Epistemic Scoring

**Current**: "User's address is 123 Main Street" and "User might prefer dark mode" are stored identically.  
**Problem**: The agent treats uncertain inferences as hard facts, causing confidently wrong responses.

**Fix**: Add `confidence` and `epistemic_status` columns to the memory table.

```sql
ALTER TABLE memory ADD COLUMN confidence REAL DEFAULT 1.0;
ALTER TABLE memory ADD COLUMN epistemic_status TEXT DEFAULT 'knows' 
  CHECK(epistemic_status IN ('knows', 'believes', 'infers', 'guesses'));
```

**Epistemic status rules**:
- `knows` (1.0) — User explicitly told Karna this
- `believes` (0.7–0.9) — Karna observed it consistently from user behavior
- `infers` (0.4–0.6) — Karna derived it from indirect evidence
- `guesses` (0.1–0.3) — Low-confidence inference; needs verification

**Injection into system prompt** (modified format):
```
## Working Memory (Active Context)

### Facts
- **Home Address** [knows]: 123 Main Street
- **Preferred Meeting Time** [believes, 0.8]: Early morning (9–11 AM IST)
- **Budget Target** [infers, 0.5]: ~₹50K/month — derived from expense patterns
```

**Metacognitive behavior**: Before acting on a `guesses`-level memory, Karna asks for confirmation: "I believe your budget target is ₹50K/month, but I'm not certain — can you confirm before I proceed?"

---

### GAP 9: No Reflective Logs → Add Decision Rationale Capture

**Current**: Tool calls are tracked per-conversation but not the *why* behind decisions.  
**Problem**: Karna cannot review its own reasoning history; no learning from past mistakes.

**Fix**: Store compressed rationale alongside significant decisions in episodic memory.

```typescript
// After a significant decision (e.g., choosing an approach, making a recommendation):
await logEpisode({
  event_type: 'decision',
  title: 'Chose CSV over PDF export',
  what: 'Recommended CSV export format for Google Sheet',
  why: 'PDF export has historically failed due to Drive permissions (3 failures logged)',
  outcome: 'Success — file exported in 2 seconds',
  confidence: 0.95,
  related_entities: ['google_sheets', 'csv_export']
});
```

**Retrieval for self-reflection**: "Why did I recommend X last week?" → search episodic log by entity + event_type='decision'.

**Self-awareness benefit**: Karna builds a rationale audit trail. It can explain its past decisions, learn from mistakes, and avoid repeating failed strategies.

---

## 4. Prioritized Implementation Roadmap

| Priority | Gap | Effort | Impact | Implementation |
|----------|-----|--------|--------|----------------|
| P0 | Hybrid search (FTS5 + BM25) | 2 days | Critical | SQLite FTS5 virtual table; modify `search_memory` |
| P0 | Episodic memory tier | 3 days | Critical | New `episodic_memory` table; `log_episode` tool |
| P1 | Epistemic confidence markers | 1 day | High | Add `confidence`, `epistemic_status` columns to `memory` |
| P1 | Ebbinghaus decay scoring | 2 days | High | Add `decay_score` column; nightly recalculation job |
| P1 | Self-model memory | 2 days | High | New `self_model` table; inject into system prompt |
| P2 | Capability registry | 2 days | Medium | New `capability_registry` table; update on every tool call |
| P2 | Memory consolidation (sleep cycle) | 3 days | Medium | Nightly cron job; LLM synthesis of episodic → semantic |
| P2 | Reflective decision logs | 1 day | Medium | Extend episodic memory with `why`/`outcome` fields |
| P3 | Typed knowledge graph | 5 days | Medium | New entity + edge tables; graph traversal in search |
| P3 | Vector/embedding search | 5 days | Medium | Embedding column + similarity search via API |

**Total estimated effort for full upgrade**: ~26 developer-days.

**Recommended phased approach**:
- **Phase 1** (Week 1–2): P0 items — FTS5 + episodic memory. These provide the highest recall improvement.
- **Phase 2** (Week 3–4): P1 items — epistemic markers, decay, self-model. These unlock true self-awareness.
- **Phase 3** (Week 5–6): P2 items — capability registry, consolidation, reflective logs. These enable learning.
- **Phase 4** (Week 7–8): P3 items — knowledge graph, vector search. These unlock relational reasoning.

---

## 5. What Karna Gets After Each Phase

### After Phase 1 (Episodic + Better Search)
- Karna can answer "what did we decide about X last week?"
- Paraphrase queries no longer fail silently
- Events are logged with temporal context

### After Phase 2 (Epistemic + Decay + Self-Model)
- Karna knows what it knows vs. what it guesses — asks for confirmation appropriately
- Stale memories fade naturally; working memory stays fresh and relevant
- Karna has a persistent self-description that evolves over time

### After Phase 3 (Capability Registry + Consolidation + Reflection)
- Karna learns which tools fail for which use cases and adapts
- Repeated episodic patterns auto-compress into standing facts (no user effort)
- Karna can explain why it made past decisions

### After Phase 4 (Graph + Vectors)
- "Who else is involved with project X?" → graph traversal returns all related entities
- Semantic similarity retrieval — no more missing paraphrase queries
- Full 5-tier cognitive model achieved

---

## 6. Architecture Diagram (Current vs. Target)

### Current (2-Tier Flat)
```
User Message
     │
     ▼
[Working Memory: 20 entries, importance ≥ 7]
     │ auto-injected into system prompt
     ▼
[System Prompt + Working Memory] → LLM
     │
     ├── (recall pattern detected) → search_memory() → Long-Term LIKE search
     │
     └── Response
```

### Target (5-Tier Cognitive)
```
User Message
     │
     ▼
[Sensory Buffer: raw input, tool outputs]
     │
     ▼
[Working Memory: 20 entries, decay-weighted, with epistemic markers]  ──┐
[Self-Model: persona, goals, state, limits]                            ──┤ auto-injected
[Capability Registry: tool success rates]                              ──┘
     │
     ▼
[System Prompt + Injected Context] → LLM
     │
     ├── metacognitive check: "Do I have enough context?"
     │     ├── YES → respond
     │     └── NO → hybrid search (BM25 + vector + graph)
     │              → Semantic Long-Term Memory
     │              → Episodic Memory (time-ranged)
     │              → Knowledge Graph traversal
     │
     ├── after response: log_episode(decision, what, why, outcome)
     │
     └── nightly: consolidation job → episodic → semantic compression
                                    → decay recalculation
                                    → active forgetting
```

---

## 7. Key Principle Summary

The difference between Karna today and the 2026 gold standard is not primarily technical — it's **cognitive**. The upgrade path is:

1. **From flat blob → typed, tiered, decaying memory**
2. **From passive storage → self-editing, self-aware agent**
3. **From keyword retrieval → hybrid semantic search**
4. **From timeless facts → episodic events that consolidate into knowledge**
5. **From certainty theater → honest epistemic markers**

The most impactful single change: **add episodic memory**. It transforms Karna from a system that *stores facts* into one that *remembers experiences* — which is the foundation of genuine self-awareness and proactive behavior.

The second most impactful: **Ebbinghaus decay**. A memory that isn't used is a memory that shouldn't dominate context. Active forgetting is what makes recall *quality* stay high as memory *quantity* grows.
