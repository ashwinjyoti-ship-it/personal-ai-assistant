# Prompt for Developer: Integrate Browser Use Remote Browser for Blue Dart Tracking

Use this prompt directly with your developer/agent:

---
You are working in repo: `personal-ai-assistant`.

Goal: Improve reliability of Blue Dart tracking automation by integrating Browser Use **Remote Browser/session reuse flow** so tasks that exceed current runtime windows still complete and can be resumed/checked.

## Current behavior to preserve
- Keep graceful failure behavior (no hallucinations).
- If output is empty, return explicit `[NO-OUTPUT]` style message.
- If still running, return a clear wait message and notify user when done.

## Problem context (Blue Dart example)
- Request example: “Track Blue Dart AWB 12345678901 and return latest status, location, timestamp, expected delivery.”
- Today this can fail due to anti-bot/captcha, page load latency, or Render backend timeout (5 min default, ~10 min max).
- We want better task continuity using remote browser session tracking and stronger status retrieval.

## Implementation requirements
1. **Confirm Browser Use v2 session reuse contract**
   - Verify exact request field for reusing an existing session (currently code stores `sessionId` but does not send reuse param).
   - Update `runBrowserTask()` to pass correct session reuse field only when valid.

2. **Remote-browser/session persistence**
   - Continue saving returned `sessionId` per vault/site entry.
   - Reuse stored session for follow-up tracking requests on same site.
   - Clear stale session on hard failures (`stopped`/auth errors) and retry once with fresh session.

3. **Blue Dart specialized task template**
   - Add a deterministic task builder for courier tracking:
     - open Blue Dart tracking page
     - input AWB
     - submit
     - wait for result container
     - extract: status, location, event time, expected delivery
   - Return strict JSON block in output (plus short human summary).

4. **Long-running workflow handling**
   - Keep timeout return + pending task insert.
   - Improve `browser_task_status` final fetch robustness:
     - if `/status` done but output null, fetch full task view + steps + last extraction text.

5. **Observability**
   - Add structured logs with: taskId, sessionId, site, timeoutMs, final status, output length.
   - Add one-line operator hint in failure response: “Check Browser Use dashboard taskId=...”.

6. **Safety/UX rules**
   - Never invent tracking info if extraction failed.
   - If captcha detected, return explicit “manual verification needed” status.

## Acceptance criteria
- Given a valid Blue Dart AWB, assistant returns parsed status JSON when task succeeds.
- On timeout, assistant stores pending task and later status check can retrieve final output.
- On no-output or stopped task, assistant responds clearly without fabricated data.
- Session reuse measurably reduces repeat login/startup overhead.

## Files likely involved
- `src/services/browser.ts`
- `src/services/agent.ts`
- `src/routes/system.ts` (pending-task notifier path)
- optional tests in `src/services/__tests__/`

## Deliverables
- Code changes + migration only if schema changes are needed.
- Short test plan with at least:
  - successful mock run
  - timeout + later completion path
  - stopped/no-output path
- Update docs with a “Blue Dart tracking reliability” section.
---
