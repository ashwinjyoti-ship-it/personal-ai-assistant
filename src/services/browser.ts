// Browser Use Cloud — REST client for cloud browser automation
// API docs: https://api.browser-use.com/api/v2
//
// Pattern: create task → poll until done / timeout → return output
// Uses raw fetch() for Cloudflare Worker compatibility (no Node.js SDK).

const BROWSER_USE_API = 'https://api.browser-use.com/api/v2';
const POLL_INTERVAL_MS = 3000; // check every 3 seconds
const DEFAULT_TIMEOUT_MS = 25000; // 25s default — matches Workers wall-clock budget

// Terminal statuses from the Browser Use API
const DONE_STATUSES = new Set(['completed', 'failed', 'stopped', 'paused']);

interface TaskCreatedResponse {
  task_id: string;
}

interface TaskStatusResponse {
  id: string;
  status: string;
  output: string | null;
  steps?: number;
  error?: string | null;
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
  steps?: number;
  done: boolean;
}

// Create a task and poll until completion or timeout.
// On timeout, returns { status: 'timeout', taskId } so the caller can
// store the taskId and check later via getBrowserTaskStatus().
export async function runBrowserTask(
  task: string,
  apiKey: string,
  opts?: { timeoutMs?: number }
): Promise<BrowserTaskResult> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  // 1. Create the task
  let taskId: string;
  try {
    const res = await fetch(`${BROWSER_USE_API}/run-task`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { output: null, taskId: '', status: 'failed', error: `HTTP ${res.status}: ${body}` };
    }

    const data = (await res.json()) as TaskCreatedResponse;
    taskId = data.task_id;
    if (!taskId) {
      return { output: null, taskId: '', status: 'failed', error: 'No task_id in response' };
    }
  } catch (err: any) {
    return { output: null, taskId: '', status: 'failed', error: err.message };
  }

  // 2. Poll with timeout
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    // Wait before polling (give the task a moment to start)
    await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));

    try {
      const statusRes = await fetch(`${BROWSER_USE_API}/task/${taskId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (!statusRes.ok) continue; // transient error — keep polling

      const data = (await statusRes.json()) as TaskStatusResponse;

      if (DONE_STATUSES.has(data.status)) {
        if (data.status === 'completed') {
          return { output: data.output, taskId, status: 'completed' };
        }
        return {
          output: data.output,
          taskId,
          status: 'failed',
          error: data.error ?? `Task ended with status: ${data.status}`,
        };
      }

      // Still running — loop continues
    } catch {
      // Network blip — keep polling
    }
  }

  return { output: null, taskId, status: 'timeout' };
}

// Check the status of a task that was previously started but timed out.
export async function getBrowserTaskStatus(
  taskId: string,
  apiKey: string
): Promise<BrowserTaskStatus> {
  try {
    const res = await fetch(`${BROWSER_USE_API}/task/${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      return { status: 'error', output: null, done: false };
    }

    const data = (await res.json()) as TaskStatusResponse;
    return {
      status: data.status,
      output: data.output,
      steps: data.steps,
      done: DONE_STATUSES.has(data.status),
    };
  } catch (err: any) {
    return { status: 'error', output: null, done: false };
  }
}
