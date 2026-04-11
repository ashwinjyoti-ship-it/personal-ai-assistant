// Browser Use Cloud — REST client for cloud browser automation
// API base: https://api.browser-use.com/api/v2
//
// Correct endpoints (verified from SDK source):
//   Create:  POST /tasks          → { id, sessionId }
//   Poll:    GET  /tasks/{id}/status  → { id, status, output, finishedAt }
//   Full:    GET  /tasks/{id}     → full TaskView with steps
//
// Status values: 'created' | 'started' | 'finished' | 'stopped'
// Uses raw fetch() for Cloudflare Worker compatibility (no Node.js SDK).

const BROWSER_USE_API = 'https://api.browser-use.com/api/v2';
const POLL_INTERVAL_MS = 4000;
const DEFAULT_TIMEOUT_MS = 55000; // 55s — browser tasks are slow; poll every 4s, fits Cloudflare wall-clock budget

const DONE_STATUSES = new Set(['finished', 'stopped']);

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
  opts?: { timeoutMs?: number; secrets?: Record<string, string> }
): Promise<BrowserTaskResult> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  // 1. Create the task — POST /tasks
  let taskId: string;
  try {
    const body: Record<string, unknown> = { task };
    if (opts?.secrets && Object.keys(opts.secrets).length > 0) {
      // Browser Use Cloud v2 API field is `secrets` (confirmed from /api/v2/openapi.json)
      // Keys are injected as {key} placeholders in the task text
      body.secrets = opts.secrets;
    }
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
      return { output: null, taskId: '', status: 'failed', error: `HTTP ${res.status}: ${body}` };
    }

    const data = (await res.json()) as TaskCreatedResponse;
    taskId = data.id;
    if (!taskId) {
      return { output: null, taskId: '', status: 'failed', error: 'No id in create response' };
    }
  } catch (err: any) {
    return { output: null, taskId: '', status: 'failed', error: err.message };
  }

  // 2. Poll via lightweight /status endpoint until done or timeout
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));

    try {
      const statusRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}/status`, {
        headers: { 'X-Browser-Use-API-Key': apiKey },
      });

      if (!statusRes.ok) continue; // transient error — keep polling

      const data = (await statusRes.json()) as TaskStatusView;

      if (DONE_STATUSES.has(data.status)) {
        if (data.status === 'finished') {
          return { output: data.output ?? null, taskId, status: 'completed' };
        }
        // 'stopped' — treat as failure; output may contain Browser Use's error message
        return {
          output: data.output ?? null,
          taskId,
          status: 'failed',
          error: data.output ?? 'Task was stopped before completing',
        };
      }

      // 'created' or 'started' — loop continues
    } catch {
      // Network blip — keep polling
    }
  }

  return { output: null, taskId, status: 'timeout' };
}

// Check the status of a task that was previously started but timed out.
// When done, fetches the full task view (GET /tasks/{id}) to get the actual output —
// the lightweight /status endpoint does not reliably include the output field.
export async function getBrowserTaskStatus(
  taskId: string,
  apiKey: string
): Promise<BrowserTaskStatus> {
  try {
    // 1. Lightweight status check
    const statusRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}/status`, {
      headers: { 'X-Browser-Use-API-Key': apiKey },
    });
    if (!statusRes.ok) {
      return { status: 'error', output: null, done: false };
    }
    const statusData = (await statusRes.json()) as TaskStatusView;

    if (!DONE_STATUSES.has(statusData.status)) {
      return { status: statusData.status, output: null, done: false };
    }

    // 2. Task is done — fetch full task view to get actual output
    const fullRes = await fetch(`${BROWSER_USE_API}/tasks/${taskId}`, {
      headers: { 'X-Browser-Use-API-Key': apiKey },
    });
    const output = fullRes.ok
      ? ((await fullRes.json()) as TaskStatusView).output ?? null
      : statusData.output ?? null; // fall back to status output if full fetch fails

    return {
      status: statusData.status,
      output,
      done: true,
    };
  } catch {
    return { status: 'error', output: null, done: false };
  }
}
