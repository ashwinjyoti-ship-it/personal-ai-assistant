# Browser Task Timeout Audit (2026-05-18)

## Current State
- **Browser task timeout**: 5 minutes (300,000 ms)
- **Location**: `src/services/browser.ts:17` (`DEFAULT_TIMEOUT_MS`)
- **Platform**: Render background worker (no serverless wall-clock limit)
- **Primary use case**: Outlook (stateful, multi-step, persistent session reuse)

## Render Limits
- **Starter plan (current)**: Background workers can run up to ~10 minutes
- **No hard platform constraint** on Render for `/api/*` proxied routes through Render backend
- **Render service timeout**: Typically 10-15 minutes for background jobs (not enforced for agent tasks)

## Browser Use API Limits
- **Per-task timeout**: 10-15 minutes (confirm with Browser Use API docs)
- **Session persistence**: 15-minute idle timeout (sessions auto-close)
- **Currently using**: Browser Use Cloud remote browser (Steel.dev integration)

## Recommendation: Leave at 5 Minutes
**Why 5 minutes is optimal for Outlook:**
1. **Most Outlook workflows complete in 1-2 minutes**: login + search/read + reply
2. **Session reuse avoids repeat logins**: First task ~1-2 min, repeat tasks ~10-20s
3. **Safe margin**: 5 min leaves headroom for network latency, anti-bot delays
4. **Cost-effective**: Shorter timeout = fewer stalled tasks consuming resources
5. **User experience**: Clear timeout message within 5 min is better than silent hangs

## If You Need to Increase
**To extend to 10 minutes:**
```typescript
// src/services/browser.ts:17
const DEFAULT_TIMEOUT_MS = 600000; // 10 minutes
```

**Also update in agent.ts:**
```typescript
// src/services/agent.ts (~line 1850)
timeoutMs: toolName === 'browser_task' ? 610000  // 10m10s — matches DEFAULT_TIMEOUT_MS + headroom
```

## Outdated Documentation (Fixed)
| File | Changes |
|------|---------|
| Context.md | Removed 88s refs, updated to "5 min (300s), configurable" |
| INVESTIGATION_BROWSER_TASKS.md | Updated "~88s" → "5 min (300s)" |
| DEVELOPER_PROMPT_REMOTE_BROWSER.md | Updated "~88s" → "5 min" |

## Next Steps
- Monitor Outlook task completion times in production
- If > 5 min tasks occur, log them and consider gradual increase to 7-10 min
- Verify Browser Use API max timeout with their current documentation
