# Architecture Iteration Review (based on current repo)

## 1) Reliability + Tool Contract hardening (highest priority)
- Create a **single tool execution wrapper** (timeouts, retries with backoff, idempotency key, normalized error codes) used by all tool calls.
- Move from loosely-typed parameter handling to a **strict contract registry** (e.g., Zod/JSON Schema validators) for every tool before execution.
- Add **transaction safety modes** for risky tools (send email, calendar writes, sheet writes): `dry_run`, `confirm_required`, `execute`.

## 2) Retrieval Engineering upgrade for document workflows
- Today extraction exists, but retrieval quality can improve with a full RAG pipeline:
  - deterministic chunking strategy (semantic + token window)
  - embedding versioning + re-embedding jobs
  - hybrid retrieval (keyword + vector) and re-ranking
- Add citation-first responses for document Q&A so user can inspect source snippets.

## 3) Observability + Evaluation layer
- Add end-to-end **trace IDs** from request → router decision → tool calls → final answer.
- Persist step-level metrics: tool success/failure, retries, latency per provider, hallucination guard activations.
- Define weekly scorecard: task success rate, groundedness rate (with citations), p95 latency, fallback frequency.

## 4) Security & Safety policy engine
- Add explicit **policy gates** by tool category (read-only vs write vs external side effects).
- Strengthen prompt-injection defenses for uploaded docs/URLs by content sandboxing and instruction stripping.
- Add least-privilege credentials + scoped tokens where possible (especially email/calendar/send actions).

