// Browser Use Cloud — REST client for cloud browser automation
// API base: https://api.browser-use.com/api/v2
//
// Endpoints used:
//   Sessions: POST /sessions → { id }   DELETE /sessions/{id}
//   Tasks:    POST /tasks    → { id, sessionId }
//   Poll:     GET  /tasks/{id}/status   → { id, status, output, finishedAt }
//   Full:     GET  /tasks/{id}          → full TaskView with steps
//
// Status values: 'created' | 'started' | 'finished' | 'stopped'
// Session status: 'active' | 'stopped'
// Uses raw fetch() for Cloudflare Worker compatibility (no Node.js SDK).

const BROWSER_USE_API = 'https://api.browser-use.com/api/v2';
const INITIAL_WAIT_MS = 20000;  // browser tasks can't possibly complete in under ~20s (spin-up + nav + auth)
const POLL_INTERVAL_MS = 6000;  // poll every 6s
const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes — agent runs on Render (no platform wall-clock limit); this covers the vast majority of real-world tasks

const DONE_STATUSES = new Set(['finished', 'stopped']);

// Create a persistent remote browser session. Returns the session ID, or null on failure.
// The caller is responsible for closing the session via closeBrowserSession() when done.
export async function createBrowserSession(apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(`${BROWSER_USE_API}/sessions`, {
      method: 'POST',
      headers: { 'X-Browser-Use-API-Key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      console.log(`[createBrowserSession] FAILED HTTP ${res.status}`);
      return null;
    }
    const data = (await res.json()) as { id: string };
    console.log(`[createBrowserSession] sessionId=${data.id}`);
    return data.id ?? null;
  } catch (err: any) {
    console.log(`[createBrowserSession] ERROR ${err.message}`);
    return null;
  }
}

// Close a remote browser session. Best-effort — failures are silently ignored
// since Browser Use sessions also expire on their own via TTL.
export async function closeBrowserSession(sessionId: string, apiKey: string): Promise<void> {
  try {
    await fetch(`${BROWSER_USE_API}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: { 'X-Browser-Use-API-Key': apiKey },
    });
    console.log(`[closeBrowserSession] closed sessionId=${sessionId}`);
  } catch { /* best effort */ }
}

interface TaskCreatedResponse {
  id: string;
  sessionId: string;
}

interface TaskStatusView {
  id: string;
  status: string;
  output?: string | null;
  finishedAt?: string | null;
  isSuccess?: boolean | null;
}

export interface BrowserTaskResult {
  output: string | null;
  taskId: string;
  sessionId?: string; // browser session — reuse on follow-up tasks to skip re-authentication
  status: 'completed' | 'failed' | 'timeout';
  error?: string;
}

export interface BrowserTaskStatus {
  status: string;
  output: string | null;
  done: boolean;
}

// Create a task and poll until completion or timeout.
// On timeout, returns { status: 'timeout', taskId } so the caller can
// store the taskId and check later via getBrowserTaskStatus().
export interface BrowserSecret {
  username: string;
  password: string;
  // Referenced in task text as {username} / {password} — passed via sensitive_data field
}

export async function runBrowserTask(
  task: string,
  apiKey: string,
  opts?: { timeoutMs?: number; secrets?: Record<string, string>; sessionId?: string }
): Promise<BrowserTaskResult> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  console.log(`[runBrowserTask] starting taskLen=${task.length} timeoutMs=${timeoutMs} hasSecrets=${!!opts?.secrets} reuseSession=${!!opts?.sessionId}`);

  // 1. Create the task — POST /tasks
  let taskId: string;
  let sessionId: string | undefined;
  try {
    const body: Record<string, unknown> = { task };
    if (opts?.secrets && Object.keys(opts.secrets).length > 0) {
      // Browser Use Cloud v2 API field is `secrets` (confirmed from /api/v2/openapi.json)
      // Keys are injected as {key} placeholders in the task text
      body.secrets = opts.secrets;
    }
    // Session reuse: confirmed from Browser Use v2 OpenAPI spec — request body field is `sessionId`.
    // Passing an existing sessionId skips browser spin-up and re-authentication on follow-up tasks.
    if (opts?.sessionId) body.sessionId = opts.sessionId;
    const res = await fetch(`${BROWSER_USE_API}/tasks`, {
      method: 'POST',
      headers: {
        'X-Browser-Use-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.log(`[runBrowserTask] CREATE_FAILED HTTP ${res.status}: ${body}`);
      return { output: null, taskId: '', status: 'failed', error: `HTTP ${res.status}: ${body}` };
    }

    const data = (await res.json()) as TaskCreatedResponse;
    taskId = data.id;
    sessionId = data.sessionId || undefined;
    console.log(`[runBrowserTask] CREATED taskId=${taskId} sessionId=${sessionId}`);
    if (!taskId) {
      return { output: null, taskId: '', status: 'failed', error: 'No id in create response' };
    }
  } catch (err: any) {
    return { output: null, taskId: '', status: 'failed', error: err.message };
  }

  // 2. Poll via lightweight /status endpoint until done or timeout
  // Wait before the first poll — no browser task can complete in under ~20s
  // (browser spin-up + navigation + authentication alone takes that long).
  // This avoids several guaranteed-miss API calls at the start.
  await new Promise<void>((r) => setTimeout(r, INITIAL_WAIT_MS));
  const deadline = Date.now() + (timeoutMs - INITIAL_WAIT_MS);

  while (Date.now() < deadline) {
    try {
      const statusRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}/status`, {
        headers: { 'X-Browser-Use-API-Key': apiKey },
      });

      if (statusRes.ok) {
        const data = (await statusRes.json()) as TaskStatusView;

        if (DONE_STATUSES.has(data.status)) {
          if (data.status === 'finished') {
            // /status output is unreliable — fetch full task view as fallback (same as getBrowserTaskStatus)
            let output = data.output ?? null;
            if (!output) {
              try {
                const fullRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}`, {
                  headers: { 'X-Browser-Use-API-Key': apiKey },
                });
                if (fullRes.ok) {
                  const fullData = (await fullRes.json()) as TaskFullView;
                  output = fullData.output ?? null;
                  if (!output && fullData.steps?.length) {
                    const lastStep = fullData.steps[fullData.steps.length - 1];
                    output = lastStep.extracted_content ?? lastStep.output ?? lastStep.result ?? null;
                  }
                }
              } catch { /* fall through with null output */ }
            }
            console.log(`[runBrowserTask] COMPLETED taskId=${taskId} outputLen=${(output ?? '').length}`);
            return { output, taskId, sessionId, status: 'completed' };
          }
          // 'stopped' — treat as failure; output may contain Browser Use's error message
          console.log(`[runBrowserTask] FAILED taskId=${taskId} status=${data.status}`);
          return {
            output: data.output ?? null,
            taskId,
            status: 'failed',
            error: data.output ?? 'Task was stopped before completing',
          };
        }
        // 'created' or 'started' — fall through to sleep
      }
      // non-OK response — transient error, fall through to sleep
    } catch {
      // Network blip — fall through to sleep
    }

    await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  // Timed out — return sessionId so caller can persist it; session is still alive on Browser Use's side
  console.log(`[runBrowserTask] TIMEOUT taskId=${taskId} sessionId=${sessionId}`);
  return { output: null, taskId, sessionId, status: 'timeout' };
}

interface TaskFullView extends TaskStatusView {
  steps?: Array<{ extracted_content?: string | null; output?: string | null; result?: string | null }>;
}

// Check the status of a task that was previously started but timed out.
// Polls for up to waitMs (default 30s) so that tasks which are nearly done
// return a result immediately rather than forcing another follow-up from the user.
// When done, fetches the full task view (GET /tasks/{id}) to get the actual output —
// the lightweight /status endpoint does not reliably include the output field.
export async function getBrowserTaskStatus(
  taskId: string,
  apiKey: string,
  opts?: { waitMs?: number }
): Promise<BrowserTaskStatus> {
  const waitMs = opts?.waitMs ?? 30000;
  const deadline = Date.now() + waitMs;

  while (Date.now() < deadline) {
    try {
      const statusRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}/status`, {
        headers: { 'X-Browser-Use-API-Key': apiKey },
      });

      if (!statusRes.ok) {
        await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));
        continue;
      }

      const statusData = (await statusRes.json()) as TaskStatusView;

      if (DONE_STATUSES.has(statusData.status)) {
        // Task is done — fetch full task view to get actual output.
        // The lightweight /status endpoint does not reliably include output.
        // If the full view also has no output, fall back to the last step's extracted content.
        let output: string | null = null;
        const fullRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}`, {
          headers: { 'X-Browser-Use-API-Key': apiKey },
        });
        if (fullRes.ok) {
          const fullData = (await fullRes.json()) as TaskFullView;
          output = fullData.output ?? null;
          if (!output && fullData.steps?.length) {
            const lastStep = fullData.steps[fullData.steps.length - 1];
            output = lastStep.extracted_content ?? lastStep.output ?? lastStep.result ?? null;
          }
        } else {
          output = statusData.output ?? null;
        }
        return { status: statusData.status, output, done: true };
      }

      // Still running — wait before next poll
    } catch { /* network blip — keep polling */ }

    await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  // Timed out waiting — task is still in progress
  return { status: 'running', output: null, done: false };
}

// Build a deterministic Blue Dart AWB tracking task prompt.
// Returned string is used directly as the `task` argument to runBrowserTask().
export function buildBlueDartTrackingTask(awb: string): string {
  return `Navigate to https://www.bluedart.com/tracking.
Find the AWB/tracking number input field, enter the number ${awb}, and submit the form.
Wait for the tracking results to fully load (up to 15 seconds).
If a captcha appears at any point, do not attempt to solve it.

Extract the following fields and return them as a strict JSON block with no prose before or after:
{
  "awb": "${awb}",
  "status": "<current shipment status, or 'not_found' if AWB is unknown>",
  "location": "<last known location, or null>",
  "last_event_time": "<timestamp of most recent event, or null>",
  "expected_delivery": "<expected delivery date/time, or null>",
  "captcha_required": <true if a captcha was encountered, false otherwise>
}

After the JSON block, on a new line, write a single human-readable summary sentence (e.g. "Shipment ${awb} is in transit at Delhi Hub, expected delivery 5 May 2026.").
If the AWB is not found, set status to "not_found" and all other fields to null.
If a captcha was encountered, set captcha_required to true and populate whatever tracking data was visible before the captcha appeared.`;
}

export async function getBrowserTaskStatusForActionCenter(
  taskId: string,
  apiKey: string
): Promise<{ status: string; output: string | null; done: boolean }> {
  return getBrowserTaskStatus(taskId, apiKey, { waitMs: 8000 });
}
