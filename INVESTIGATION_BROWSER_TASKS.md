# Investigation: Blue Dart tracking via Browser Use

## Why Karna can fail gracefully on package tracking

From current code behavior:

1. **Tracking queries are routed to the full agent, usually via web/research flow first**
   - Delivery/tracking phrases are matched as research/tool intents.
2. **Browser tasks are hard-capped by serverless timeout windows**
   - Browser task execution polls up to ~88s and returns timeout if not finished.
3. **On timeout, Karna intentionally returns a safe in-progress state**
   - It does one automatic follow-up status check.
   - If still running, it stores the task as pending and stops (no looping).
4. **If browser provider returns `stopped` or no output, Karna reports failure instead of hallucinating results**
   - This is intentional “fail gracefully” behavior.

## Most likely reasons Blue Dart could not complete

- Blue Dart page introduced a blocker (captcha/challenge/anti-bot or dynamic step).
- Tracking workflow exceeded 88s budget in web channel (or 25s in Telegram).
- Browser Use task ended as `stopped` upstream.
- Browser session/auth state not reusable for that task and restart took too long.

## About “Remote Browser” in Browser Use website

Remote Browser is the hosted cloud browser session provided by Browser Use (a real browser running remotely). It can be useful for Karna because:

- Karna can run complex multi-step web flows on JS-heavy websites.
- It can keep session/profile state and potentially reduce repeat login friction.
- You can inspect tasks/sessions in Browser Use dashboard when a task fails.

## Practical recommendation for Blue Dart tracking

- Prefer direct tracking URL with tracking number in one prompt step.
- Ask Karna to run as a **single browser_task** with full steps (open Blue Dart tracking page, enter AWB, submit, extract latest status, location, timestamp).
- If it times out, use `browser_task_status` once (already built-in) and wait for notification.
