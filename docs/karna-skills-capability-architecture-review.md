# Karna Skills & Capability Architecture Review

**Date**: 2026-07-01
**Method**: Full-repo inspection (routes, services, migrations, prompts, frontend) — no assumptions, every claim below is grounded in the current codebase as of this branch.

---

## 0. Answering the opening question first

> "Should Karna not be able to build and store skills on its own — not only as standalone skills but as part of memory architecture, where repeated behavior becomes a skill?"

**It already does.** This isn't a gap — it's arguably Karna's most sophisticated subsystem, and it's more complete than the LinkedIn-post conversation gave it credit for. `src/services/skills.ts` implements a full closed loop:

1. Every multi-tool agent run (≥3 non-trivial tools) is fingerprinted as a `tool_signature` and logged to `skill_patterns`.
2. After the same signature repeats **3 times**, an LLM pass auto-writes a NAME/DESCRIPTION/INSTRUCTIONS skill into `user_skills` with `source='auto'`.
3. Every further match triggers up to 5 rounds of refinement.
4. A rolling 20-run success rate feeds a **confidence score**; skills that fall below 0.4 after 5+ uses are auto-disabled and the user is notified.
5. A weekly cron reviews low-confidence auto-skills and either rewrites or permanently retires them.
6. Enabled auto-skills are injected into every system prompt as "Proven Procedures (Auto-Learned)" — the LLM follows them implicitly, the user never invokes them by name.
7. Settings → Skills gives visibility: usage count, refinement count, a confidence bar, and a "Promote to Manual" action that converts an auto-skill into a permanent user-owned one.

So the architecture already treats skill-formation as a **memory-adjacent, usage-driven process**, not a static tool list. What's missing is not the mechanism — it's **cross-pollination with the rest of memory** (see §7) and **surfacing this to the user in normal conversation** (the app in the screenshot had no way to know this exists, which is a UX gap, not an architecture gap).

---

## 1. Capability Audit

Grouped by what actually exists in code today (76 LLM-facing tools + several internal subsystems):

| Group | Tools / Mechanism | Notes |
|---|---|---|
| **Google Workspace** | Gmail (7), Calendar (2), Sheets (5), Docs (5), Drive (5) = 24 tools | Real OAuth, real APIs. Largest single capability cluster. |
| **Scheduling / Reminders** | `create/list/toggle/update/delete_schedule` + regex fallback parser + cron executor | Solid, has a state machine (`created→active→reminding→paused→completed`). |
| **Memory** | `store/search/delete/update_memory` + typed/bitemporal storage, decay, embeddings, hybrid search, confidence tiers | Genuinely advanced — vector + keyword + decay scoring already implemented (migrations 0048–0052). The standalone `memory-architecture-study.md` in `docs/` is largely **stale**: it lists "no semantic/vector search," "no episodic tier," "no decay," "no confidence markers" as gaps — all four have since been built. |
| **Skills (auto + manual)** | `create_skill`, `list_skills`, auto-learning flywheel (§0) | Two parallel concepts under one name: user-authored skills and auto-learned skills. Same table, different `source`. |
| **Research / Web** | `web_search`, `read_url`, `research` | Exa-based search + Claude synthesis. |
| **Document handling** | `parse_document`, `search_library`, `read_library_file`, upload endpoint, chunking + Vectorize embeddings, `docx.ts` | Real but split across 3+ tools and 2 storage paths (R2 vs D1 fallback). See §4. |
| **Notes** | `save/search/list/delete_note` | A lightweight, mostly-overlapping sibling of Memory + Document Library (see §6). |
| **Browser automation** | `browser_task`, `browser_task_status`, `vault_lookup` | Browser Use Cloud, with credential vault lookup baked into the flow. |
| **Places/Maps/Translate/YouTube** | 6 tools | Thin, single-purpose Google Public API wrappers. |
| **UDM (Unified Docs)** | 16 tools (`udm_*`) | This is a call-out to an **entirely separate external SaaS product** (`ash-doc.pages.dev`), not a Karna-native feature. It's ~20% of the entire tool surface. |
| **Federation ("Eddy")** | `federation.ts`, `eddy-client.ts` | Separate external service for a specific domain (sound/production/gear). Confidence-gated fallback when Karna's own memory is low-confidence. |
| **Digests** | Morning/evening/weekly summaries | Proactive, not tool-invoked — separate cron-driven subsystem, related to but distinct from scheduling. |
| **Multi-provider LLM routing** | 7 providers with failover | Infrastructure, not user-facing. |

### Duplication / overlap found
- **Notes vs Memory vs Document Library**: three different "write something down" paths with overlapping intent (a note is functionally a low-importance memory with no type system; a large note becomes a document). Users and the LLM both have to guess which one applies.
- **`parse_document` vs `search_library` vs `read_library_file`**: three tools for what is conceptually one job — "understand a file the user gave you." The LLM has to pick the right one per situation; there's no single entry point.
- **UDM (16 tools) vs Docs/Sheets (10 tools)**: two different "create/edit/read a structured document" systems that the LLM must disambiguate between (the system prompt has an explicit, brittle "rewrite vs create" disambiguation section for this, agent.ts:1342-1394 — that's a sign the two systems shouldn't coexist as separately-modeled tools).
- **Skills (manual, `create_skill`) vs Auto-Skills**: same underlying table and injection mechanism, but manual skill creation is user-facing while auto-skills are invisible until surfaced in Settings. This is fine as an internal split, but there's no user-facing "why did you do it that way" moment that would make the auto-learning legible to a non-technical user (exactly the scenario in the screenshot).

### Gaps found
- No cross-linking between "this skill was learned" and "this fact is remembered" — they're separate tables with no shared entity graph.
- No document-comparison / version-diff capability.
- No structured entity/relationship extraction from memory (flat rows only, no graph).
- No user-visible explanation of *why* Karna chose a given tool path (no "reasoning trace" UX, even though the agent loop internally has this information).

---

## 2. Recommended Default Skills

Collapsing 76 tools and ~12 subsystems into a small set of **broad, planner-invoked capabilities**. These are not new tools to add — they're a reorganization of what exists, with the planner (not the user) choosing which underlying tool(s) fire.

### 1. **Workspace** (merges Gmail + Calendar + Sheets + Docs + Drive — 24 tools → 1 capability)
- **Purpose**: Read, write, organize anything living in the user's Google account.
- **Responsibilities**: email triage/send/draft, calendar read/write, spreadsheet read/write, document read/write, file search/move/delete.
- **Should NOT do**: make judgment calls about what to send without confirmation on send-type actions; invent file locations.
- **Orchestrates**: existing `gmail.ts`, `google-apis.ts`, `google.ts` clients — no new code, just presented as one mental capability instead of five.
- **Why it deserves to exist**: users think "handle my email/calendar/docs," not "which of 24 tools." The LLM already treats these as freely composable (per the "tool composability table" in the system prompt) — this just makes that the *primary* framing instead of an internal implementation detail.

### 2. **Memory** (existing, keep as-is, but extend ownership)
- **Purpose**: Everything Karna knows and remembers about the user, persistently.
- **Responsibilities**: store/recall preferences, facts, decisions, episodic events; typed + bitemporal storage; decay/confidence.
- **Should NOT do**: store large documents inline (route to Document Library instead — already implemented via the 1,500-char migration rule); act as a task/reminder system (that's Scheduling).
- **Orchestrates**: `memory.ts`, `retrieval.ts`, `decay.ts`, `confidence-queries.ts`, `signals.ts`, `short-term.ts`.
- **Why it deserves to exist**: this is the substrate everything else should read from — and, per §0, is also where skill-learning conceptually belongs (procedural memory), even if implemented in a separate table today.

### 3. **Skills / Procedural Memory** (merge manual + auto-learned, make it visibly one thing)
- **Purpose**: What Karna has learned to *do*, as opposed to what it *knows*.
- **Responsibilities**: detect repeated tool sequences, propose/generate a skill, refine it, retire it on low confidence, let users promote/edit/delete.
- **Should NOT do**: store facts (that's Memory) or one-off task state (that's Scheduling).
- **Orchestrates**: `skills.ts` end-to-end (already built).
- **Why it deserves to exist**: this is Karna's differentiator — "gets better at helping *you* specifically the more you use it." It should be marketed as a first-class capability, not buried in Settings.

### 4. **Scheduling & Proactivity** (merge Scheduling + Digests)
- **Purpose**: Anything time-based — reminders, recurring checks, daily/weekly summaries.
- **Responsibilities**: one-off and recurring reminders, cron-driven checks (mail/calendar/sheet), digest generation and delivery.
- **Should NOT do**: perform the underlying action itself if it's a Workspace action — it should delegate to Workspace/Research/Memory and just own the *timing*.
- **Orchestrates**: `system.ts` cron executor, `digest/*`, `render/cron.ts`.
- **Why it deserves to exist**: digests and reminders are both "do X later/regularly," and today they're implemented as separate systems with separate tables — worth merging conceptually even if the DB schemas stay split for now.

### 5. **Research** (existing, keep, generalize the entry point)
- **Purpose**: Answer questions that require current, external, or deep information beyond what's in memory.
- **Responsibilities**: web search, page reads, synthesis; browser automation for anything requiring a live session/login.
- **Should NOT do**: guess/hallucinate when it can't complete a browser flow (anti-fabrication rule already in the prompt, agent.ts:1431-1439 — keep it strict).
- **Orchestrates**: `research.ts`, `browser.ts`, `vault` lookups.
- **Why it deserves to exist**: "find out X for me" is one job whether the answer comes from a search engine or a logged-in browser session — the user shouldn't need to know which.

### 6. **Documents** (see full treatment in §4 — recommended as a first-class capability)

These six replace the current mental model of "76 tools" with six things a user would actually describe Karna as being able to do. Everything else (Places/Maps/Translate/YouTube, UDM, Eddy federation) either folds into Research/Workspace as an implementation detail, or — in UDM's case — is arguably out of scope for Karna's own architecture (see §6, Skills to Remove).

---

## 3. Internal vs. User-Facing

**User-facing** (the 6 capabilities above — what a user would say Karna "can do"):
Workspace · Memory · Skills/Procedural · Scheduling & Proactivity · Research · Documents

**Internal** (should stay invisible, several already are):
- Intent routing (`router.ts` fast-classify + deterministic Tier-1/2 shortcuts) — already invisible, correctly so.
- The agent tool-call loop, forced-tool-execution retry, post-write verification — invisible.
- Memory retrieval mechanics: decay scoring, embedding search, hybrid ranking, confidence tiers — the *existence* of memory is user-facing ("Karna remembers X"), the *mechanics* should never surface.
- Multi-provider LLM failover — pure infrastructure.
- Chunking/embeddings for document search — implementation detail of "Documents."
- Federation to Eddy — currently invisible to the user (answers get folded into memory silently). This is correct *if* Eddy is meant to feel like Karna's own knowledge; worth confirming that's the intent, since right now a user has no way to know an answer came from an external, domain-specific service with its own confidence characteristics.
- Auto-skill generation *mechanics* (pattern counting, confidence math) — internal; the *existence* of a learned skill and a lightweight "I noticed you always do X, want me to handle it automatically next time?" moment is user-facing and currently missing (see §7).

One clear miscalibration today: the **UDM disambiguation logic** (16 tools, explicit rewrite-vs-create rules in the prompt) is being treated as if it should be user-visible/tool-visible, when it's really "Documents, but for one specific backing store." It should be internal-only, chosen by the planner the same way it'd choose between Sheets and Docs — not a parallel universe of tools the LLM has to reason about explicitly.

---

## 4. Document Intelligence Review

**Verdict: yes, but as a merge of what exists, not a new build.** Karna already has real capability here — Anthropic-native PDF understanding, CSV/Sheet parsing, chunking, Vectorize-backed semantic search, DOCX support — spread across `parse_document`, `search_library`, `read_library_file`, and the upload/library endpoints. The problem isn't missing capability; it's that it's **presented as three tools instead of one capability**, and the user has no visibility into it at all today (no "Documents" nav item was found handling this specifically — uploads exist but there's no evidence of a unified document-intelligence UX).

### User-facing experience (what it should feel like)
"Give me a file (or point me at one in Drive), ask me anything about it." One capability, one mental model — upload, ask, compare, summarize. No decision required between "search my library" vs. "read this specific file" vs. "parse this document" — the planner decides based on whether the user named a file, asked a cross-document question, or asked about something already indexed.

### Internal technologies it should orchestrate (already built, don't rebuild)
- PDF understanding — Anthropic document API (already in use, no separate OCR library needed for born-digital PDFs).
- CSV/Sheets — existing CSV export + `string[][]` parsing.
- Chunking — existing 1800-char/200-overlap paragraph-aware chunker.
- Embeddings/semantic search — existing Vectorize + Workers AI (`bge-large-en-v1.5`) pipeline — **note this is Cloudflare-only and silently no-ops on the Render runtime**; that's a real gap to fix regardless of this review, since it means semantic document search may already be broken/degraded depending on which runtime serves a given request.
- DOCX — `docx.ts`, present but not audited in depth.

### Genuine gaps worth closing
- **Scanned/image-only PDFs**: no OCR fallback exists. Anthropic's document API handles typical PDFs but a scanned/handwritten doc with no text layer would degrade silently. Worth a targeted OCR fallback only if users actually hit this (don't build ahead of evidence).
- **Document comparison / version diff**: not present anywhere. This is a legitimately high-value, broad capability (compare two contracts, compare two proposal drafts, "what changed between v1 and v2") and is missing entirely.
- **Table extraction as structured data**: sheets are parsed as arrays; no general "extract this table from a PDF into structured JSON" capability outside the sheet-specific path.

### Recommendation
Merge `parse_document` + `search_library` + `read_library_file` into a single planner-facing `documents` capability (internally still three code paths, chosen by the planner based on whether a specific file, a corpus, or a named library item was referenced). Add document comparison as the one genuinely new tool. Don't build OCR speculatively.

---

## 5. Orchestration Flows

Illustrating how the 6 user-facing capabilities (plus internal planning/memory) collaborate — this is the shape Karna should be described in, not a tool list.

**Research a company**
Memory (have we discussed this before?) → Research (web search + synthesis) → Memory (store durable facts found) → optionally Documents (save full report to Drive via Workspace).

**Analyze a contract**
Documents (parse PDF/DOCX) → Memory (recall prior context: "this is the vendor we flagged last month") → Research (only if external verification needed, e.g. company legitimacy) → Documents (structured extraction: obligations, dates, parties) → Workspace (save summary to Drive/Sheet if requested).

**Parse a technical rider**
Documents (parse + extract entity/requirement list) → Memory (compare against past riders/venues if repeat client) → Workspace (turn into a checklist in Sheets/Docs) → Scheduling (set reminders for load-in/load-out if dates are present).

**Plan a trip**
Research (destinations, options) → Workspace (Calendar for dates, Sheets for budget/itinerary) → Scheduling (reminders for booking deadlines) → Memory (store preferences: "always books aisle seats").

**Compare AI models**
Research (current pricing/capabilities) → Memory (recall past stated priorities: cost vs. quality) → Documents (produce a comparison doc/table via Workspace).

**Write a proposal**
Memory (recall client history, past proposal style) → Research (if new domain knowledge needed) → Workspace (draft in Docs) → Skills (if this is the 3rd+ proposal following the same structure, this becomes an auto-learned procedure).

**Debug software**
This one is notably **absent from Karna's actual capability set** — there's no code-execution, repo-inspection, or dev-tool integration anywhere in the codebase. Karna today could only "debug software" via Research (search error messages) — it has no way to look at the user's actual code. Flagging this because the prompt explicitly asked to illustrate it, but the honest answer is: not supported today, and possibly out of scope for a *personal* assistant vs. a *coding* assistant — worth a deliberate decision rather than silent gap.

**Review a design system**
Similarly no native support — would rely entirely on Research (if public) or Documents (if the user uploads design specs/screenshots). No dedicated capability, and probably shouldn't be one — this is served fine by Documents + Research composition.

---

## 6. Skills to Remove (or fold in)

- **UDM's 16 tools as a separate mental category** — not because UDM itself is bad, but because exposing it as 16 distinct, LLM-visible tools *parallel* to Docs/Sheets, requiring an explicit disambiguation section in the system prompt, is exactly the "cognitive overlap" this review is meant to catch. Recommendation: either (a) fold UDM into the "Documents/Workspace" capability internally with the planner choosing UDM vs. native Docs based on context Karna already tracks (which system a given project lives in), or (b) if UDM is meant to fully replace Google Docs long-term, deprecate the Google Docs tools instead of running both. Running both permanently, with the LLM guessing per-request, is the worst of both options and is already showing symptoms (the brittle rewrite-vs-create prompt rules).
- **Notes as a separate tool family from Memory** — a "note" and a "memory" are the same concept (small persisted text) with two different code paths, two tables, two tool families. Fold `save/search/list/delete_note` into Memory's `context`/`fact` types, or at minimum make Notes a thin UI-only view over Memory rather than a separate backend.
- **Places/Directions/Travel-time/Geocode/Translate/YouTube as 6 distinct top-level tools** — these are legitimate but should be internal implementation details of "Research," not 6 separate LLM-visible tools with independent descriptions to disambiguate between. Collapse to fewer, broader entry points (e.g., one `local_info` tool internally routing to the right Google Places sub-call) if tool-count/latency becomes a concern; low priority since they don't overlap with each other.

---

## 7. Missing High-Value Capabilities

Kept deliberately short — only additions that solve many problems, not niche ones:

1. **Skill/memory legibility moment** — when Karna notices a repeated pattern (which it already detects internally via `skill_patterns`), surface it conversationally the *first* time it crosses the threshold: "You've asked me to do X this way three times — want me to just handle it like that from now on?" This directly answers the screenshot conversation: the user assumed this didn't exist because nothing ever told them it does. This is a UX addition, not a new subsystem — the detection already fires today, silently.
2. **Document comparison/diff** (§4) — broad, high-value, currently absent.
3. **A single unified "save this" verb** — collapsing Notes/Memory/Documents' overlapping entry points (§6) into one decision the planner makes invisibly, rather than the user or LLM guessing between three tools.
4. **Cross-runtime consistency for semantic search** — not a new capability, but a correctness fix: document semantic search silently degrades on the Render runtime (no `AI`/`VECTORIZE` bindings). Given the split-architecture is now primary, this is a real gap affecting an existing capability, worth prioritizing over any new build.

Explicitly **not** recommending: a knowledge graph, a "self-model" memory tier, or a reflective-logging tier (all raised in `docs/memory-architecture-study.md`). These are real ideas but fail the "solves many problems, not one" test right now — they're infrastructure bets without a concrete user-facing scenario pulling for them yet. Revisit if/when a specific recurring failure mode (e.g., "Karna keeps forgetting how entities relate to each other") shows up in practice.

---

## 8. Roadmap

**Essential for v1**
- Skill/memory legibility moment (#1 above) — cheap, directly fixes the trust gap visible in the screenshot, uses existing detection.
- Fix Render-runtime semantic search gap (#4) — correctness, not new scope.
- Reframe the 76 tools around the 6 user-facing capabilities in the system prompt and Settings UI (no backend change — just collapsing the mental model users and the LLM operate on).

**Valuable for v2**
- Merge Notes into Memory (backend consolidation, not just UI).
- Resolve UDM vs. native Docs overlap — a deliberate choice (§6), not a code change to rush.
- Document comparison/diff capability.

**Experimental**
- OCR fallback for scanned documents — only if real usage shows it's needed.
- Collapsing the 6 Places/Maps/Translate tools into one internal `local_info` dispatcher.

**Not worth building**
- Knowledge graph / entity-relationship tier — no concrete pull yet.
- Self-model / reflective-log memory tier — same reasoning.
- Native "debug software" or "review a design system" capabilities — outside a personal assistant's core value; better served by composition of Research + Documents than a dedicated build.

---

## Summary

Karna's actual capability set is broader and more sophisticated than either the LinkedIn-post conversation or a first glance at "76 tools" suggests — real OAuth-backed Workspace integration, a genuinely advanced typed/bitemporal/decayed/embedded memory system, and a working closed-loop skill-learning flywheel that most personal-AI products don't have at all. The opportunity isn't to add capability; it's to **stop presenting 76 tools and a dozen subsystems as flat, disconnected surface area**, collapse them into the six capabilities above, and make the one differentiating thing Karna already does — learning your patterns — visible instead of silent.

---

## Addendum (2026-07-01): Implementation status, deepened orchestration flows, Document Intelligence, and missing capabilities

Since the original review, the following items shipped: the routing bug that caused "I can't build a skill" responses (#359), a Settings notification for auto-learned skills (#359), removal of the six paid Google API tools — Places, Directions, Distance Matrix, Geocoding, Cloud Translation (#360), a Notes-vs-Memory clarification in the system prompt (#360), a conversational "legibility moment" announcing newly learned skills in chat instead of only in Settings (#361), and the Render-runtime document-search fix below (#362). The user explicitly deferred the UDM-vs-native-Docs decision and rejected merging Notes into Memory (Notes stays standalone by design). This addendum deepens three sections at the user's request.

### 5 (expanded). Orchestration Flows

These are updated against the *current* tool set — six Places/Maps/Translate tools no longer exist; requests that would have used them now compose through Research (`web_search`/`research`) instead, which is graceful degradation, not a broken path.

**Research a company**
`search_memory` (has this come up before?) → `research` (Exa search + synthesis) → `store_memory(type=fact)` for durable findings → optionally `create_doc` if the user wants a saved report. If a follow-up asks "how do I get in touch with them" or "where are they based," this now resolves through `research`/`web_search` rather than a dedicated Places lookup — slightly less structured (no star ratings/open-hours), but no dead end.

**Analyze a contract**
`parse_document` (PDF/DOCX → text, via Anthropic's document API) → `search_memory` (recall: "is this the vendor flagged last month?") → `research` only if external verification is needed (company legitimacy, past disputes) → present obligations/dates/parties as structured prose (there is no dedicated structured-extraction tool today — see Document Intelligence below) → `create_doc` or `write_sheet` if the user wants it saved.

**Parse a technical rider**
`parse_document` → extract equipment/requirement list conversationally → `search_memory` (repeat venue/client? pull prior rider context) → `create_sheet`/`write_sheet` for a checklist → `create_schedule` for load-in/load-out reminders if dates are present. This is exactly the kind of multi-tool chain (`parse_document` → `create_sheet` → `write_sheet` → `create_schedule`) that the auto-skill flywheel (`skills.ts`) will pick up after 3 occurrences and turn into a named procedure — this flow is a live candidate for auto-learning, not just a one-off.

**Plan a trip**
`research` (destinations, options — via web search, since dedicated Places/Directions tools are gone) → `create_calendar_event` for dates → `create_sheet`/`write_sheet` for budget/itinerary → `create_schedule` for booking-deadline reminders → `store_memory(type=preference)` for durable travel preferences ("always books aisle seats"). Note: this flow is measurably weaker post-#360 than before — no structured place search, no turn-by-turn directions, no travel-time lookups. That's an accepted tradeoff for the paid-API decision, but worth naming explicitly (see "Reconsidering the paid-API cut" below).

**Compare AI models**
`research` (current pricing/capabilities) → `search_memory` (recall stated priorities: cost vs. quality) → present as prose or a comparison table via `create_doc`.

**Write a proposal**
`search_memory` (client history, past proposal style) → `research` if new domain knowledge is needed → `create_doc` to draft. If this is the 3rd+ proposal following the same structure, the auto-skill flywheel should already have turned it into a "Proven Procedure" — this is the flow the review's §0 answer was about.

**Debug software** — still not supported. No code-execution, repo-inspection, or dev-tool integration exists anywhere in the codebase. The only path is `research` (search error messages), which cannot see the user's actual code. This is a deliberate scope boundary for a *personal* assistant, not an oversight — flagged again here because the brief asks for it explicitly, and the honest answer hasn't changed.

**Review a design system** — same as before: no dedicated capability, served adequately by `research` (if public) + `parse_document` (if the user uploads specs/screenshots). Composition, not a new build.

### 4 (expanded). Document Intelligence Review

The original verdict stands: **merge the existing three tools into one mental capability, don't build new infrastructure** — Karna already has real document understanding (Anthropic-native PDF parsing, CSV/Sheet parsing, DOCX support, chunking, and — as of #362 — semantic search that actually works on both runtimes instead of silently degrading on Render).

Deepening the "what's genuinely missing" list, ranked by leverage:

1. **Document comparison / version diff** — still the single highest-value gap. "What changed between v1 and v2 of this contract/rider/proposal" is a broad, recurring need across contracts, proposals, riders, and drafts — it isn't niche to one document type. Concretely: this doesn't need new parsing infrastructure, just a new orchestration — `parse_document` (both versions) → structured diff prompt → present as a change list. This is a prompt-engineering + one-tool problem, not an infrastructure problem. **Recommend building this next**, ahead of anything else in this section.
2. **Structured extraction as a distinct output mode** — today, `parse_document` returns raw text; anything "structured" (a table of obligations, a list of extracted entities) happens ad hoc in the model's prose response. A `parse_document` mode flag (`extract_focus` already exists per the tool schema — confirm it's actually being used for structured asks, not just free-text emphasis) or a lightweight follow-up "structure this as JSON" pattern would make Document Intelligence meaningfully more reusable for anything downstream (writing to a Sheet, feeding another tool). Medium leverage — worth doing once comparison ships, not before.
3. **OCR for scanned/image-only documents** — still no fallback beyond Anthropic's native PDF handling, which works for born-digital PDFs but not scanned/handwritten ones. **Still not worth building speculatively** — there's no evidence in the repo of users hitting this. If it comes up, the fix is bounded (route image-only PDFs through Workers AI's vision models or a dedicated OCR call) but shouldn't be built ahead of a real failure.
4. **Table extraction as structured JSON outside the Sheets-specific path** — sheets already parse into `string[][]`; there's no equivalent for "extract the table on page 4 of this PDF." Low leverage on its own — likely subsumed by item 2 once that exists.

**Reconsidering the paid-API cut, briefly**: the Places/Directions/Geocoding removal (#360) was executed exactly as instructed, but it's worth flagging one real cost now that the trip-planning and local-info flows above show the gap concretely — "find restaurants near X," "how far is Y," and "directions to Z" all now degrade to unstructured web search instead of structured, accurate results. If that tradeoff turns out to bite in practice, the fix is cheap to reverse (the underlying `google-apis.ts` client functions were left intact, unexported from the tool registry) — re-enabling is a re-add of the tool schema/case handlers, not a rebuild. Not recommending reversal now, just noting the door is still open.

### 7 (expanded). Missing High-Value Capabilities

Beyond document comparison (above) and the Render search fix (shipped), holding to the "solves many problems, not one" bar:

1. **Document comparison/diff** (repeated from above — this is the single most concrete, highest-leverage gap across the whole capability set, not just Documents).
2. **A genuine "what can you do" moment** — closely related to the skill-legibility fix already shipped, but broader: there's still no single place where a new or returning user can ask "what can you actually do for me" and get an accurate, current answer grounded in what's really wired up (not a generic LLM answer about "I can help with many things"). This is cheap (a well-crafted response to a detected "what can you do" intent, grounded in the current tool registry) and directly prevents the exact failure mode that started this whole conversation — Karna not knowing its own capabilities well enough to tell the user about them.
3. **Cross-session task continuity** — today, if a multi-step task (research → draft → save) spans more than one conversation session, there's no explicit "resume where I left off" mechanic beyond whatever memory happens to retain. Worth watching for, not building yet — no concrete evidence in the repo of this failing in practice, and Memory's existing context injection may already cover it well enough.

**Explicitly not recommending** (unchanged from the original review, reaffirmed): a knowledge graph, a self-model memory tier, a reflective-logging tier, code-execution/dev-tool integration for "debug software." All fail the "solves many problems, not one" test today, or are out of scope for what a personal assistant (as opposed to a coding agent) should do.

### Updated Roadmap

**Essential for v1** — all shipped: skill legibility (#359, #361), tool-count reduction via paid-API removal (#360), Notes/Memory clarity (#360), Render search-parity fix (#362).

**Valuable for v2**:
- Document comparison/diff (highest remaining leverage in the whole review).
- A grounded "what can you do" response.
- Reframe the system prompt/Settings UI around the six user-facing capabilities more holistically (only the tool-count part has shipped so far; the framing/UX pass hasn't).

**Experimental**: OCR fallback (only if evidenced), structured-extraction output mode for `parse_document`, cross-session task continuity (only if evidenced).

**Not worth building**: knowledge graph, self-model memory, reflective-logging tier, native code-execution/"debug software" support, reversing the paid-API cut (unless the trip-planning/local-info degradation turns out to matter in practice).

**Correction (2026-07-01)**: the original review and this addendum both framed "UDM vs. native Google Docs" as an overlap requiring a decision. That framing was wrong — per the user, UDM and Google Workspace are two genuinely different systems serving different purposes, not two competing implementations of the same capability. Retracting that item entirely: there is no overlap to resolve, and the prior "deferred decision" status is closed, not open. The one piece of that finding that still stands on its own merits is narrower: the brittle rewrite-vs-create disambiguation rules in the system prompt exist because the LLM has to choose between two tool families for document work — that's a UX/prompt-clarity concern, not a "pick a winner" architecture decision.

### Addendum 2 (2026-07-01): Professional writing capability

User requested reliable output for 15 document types: emails, business letters, technical documentation, PRDs, research reports, white papers, proposals, SOPs, meeting minutes, specifications, markdown, knowledge base articles, editing, and proofreading, plus Word/PDF file generation.

Applying "generalize instead of specialize": this split into three problems, not fifteen skills.

1. **Genre structure** (11 of the 15 items) — not a capability gap at all; the underlying model already knows how to write each of these well. What was missing was consistency. Fixed with a compact "Writing Well — Genre Conventions" reference table added to the system prompt (one line of structural cues per genre) rather than a tool or a skill per genre.
2. **Output format** (Word/PDF/Markdown) — a genuine, previously-missing capability. Karna could only produce Google Docs, Gmail drafts, and UDM pages — no actual downloadable file, and no PDF generation at all. Added one new tool, `create_file`, covering both `.docx` and `.pdf` via the `docx` and `pdf-lib` npm packages (both pure-JS, no native deps, Workers/Render-compatible) — not two tools, and not fifteen. Delivery reuses the existing Google Drive OAuth connection (a new `uploadFileToDrive` function in `google.ts`) rather than building a new file-hosting/download route from scratch, since none exists in this app today.
3. **Editing/proofreading** — already composable from existing tools (read → edit → write); the gap was just prompt discipline. Added explicit guidance distinguishing "edit/proofread" (preserve voice, minimal-touch fixes) from "rewrite" (more license to restructure).

Net addition: one tool, two dependencies, one prompt section. No per-genre tooling.

### Addendum 3 (2026-07-01): Settings UI reframing around the six capabilities

Closed the last open v2 item: the Settings navigation previously grouped by internal category ("Account", "Integrations", "Automations", "System") rather than by the six user-facing capabilities identified in the review. Also found and fixed two capabilities that were fully built but effectively unreachable — `renderMemoryReview` (Memory) and `renderDocumentLibrary` (Documents) existed as complete, working pages with no navigation path to them anywhere in the app.

- `src/frontend/settings.ts`: `settingsSections` regrouped into **Workspace, Memory, Skills, Scheduling & Proactivity, Research, Documents, Account, System** — the first six map directly to the capability model; Account/System hold what's genuinely cross-cutting (profile, channel config, health/errors). Generalized the old `_skills_link` special-case into a `view` property so any settings row can link out to a full-page view, not just Skills.
- `src/frontend/main.ts`: the thread-sidebar nav-pill (previously Skills + Digests only) now also includes Memory and Documents, giving all four a single consistent, always-reachable entry point outside Settings.
- No backend changes — this is presentation-layer only, restructuring existing working views/tabs rather than building new ones.

**Note on Documents specifically**: two separate document-browsing views exist in the codebase (`documents.ts`'s upload-and-search page vs. `doclib.ts`'s lighter list view) — a real, minor duplication this reframing surfaced but didn't resolve. Linked the new nav entries to the `doclib.ts` view (`document-library`) since it matches the chat-based upload flow already in use; reconciling the two is a follow-up, not done here.

**Verified in-browser** (not just typechecked): ran the documented local-dev recipe (`wrangler-local.jsonc` swap, D1 migrate+seed, `wrangler pages dev`), signed up a test user, and drove the actual UI with Playwright — confirmed the Settings sidebar renders the eight groups in the right order, clicking "Memory Review" and "Document Library" rows correctly navigates to those pages (verified via page title), and the nav-pill's four buttons (Skills/Memory/Documents/Digests) all render and route correctly. Zero new console errors (two pre-existing CDN font-load failures are a sandbox network restriction, confirmed unrelated by checking the failed request URLs).

A rollback branch, `stable-2026-07-01-pre-ui-reframe`, points at the last commit before this change in case the reframe needs to be reverted.
