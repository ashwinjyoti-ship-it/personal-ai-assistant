// Browser Automation Service — Browser Use Cloud API v2 + optional Steel.dev
// Browser Use Cloud provides AI agent sessions with persistent browser profiles
// Steel.dev is optional — provides CDP access for advanced use cases
//
// Architecture:
// - BrowserUseRunner: Core task runner using Browser Use Cloud API v2
// - SteelSessionManager: Optional Steel.dev session management for CDP access
// - BrowserActions: High-level tools the agent calls (Outlook, Gmail, web browsing)

import type { BrowserSessionRecord } from '../types';
import { logError } from './llm/provider';
import { decrypt } from './crypto';

// === Browser Use Cloud API v2 Constants ===
const BU_API_BASE = 'https://api.browser-use.com/api/v2';
const BU_DEFAULT_LLM = 'gpt-4o'; // Browser Use Cloud LLM
const BU_POLL_INTERVAL_MS = 4000; // 4 seconds between polls
const BU_MAX_WAIT_MS = 180_000; // 3 minutes max wait per task
const BU_MAX_STEPS = 50; // Max agent steps per task

// === Steel.dev Constants (optional) ===
const STEEL_SESSION_TIMEOUT_MIN = 15;
const SESSION_REUSE_WINDOW_MIN = 10;

// === Browser Use Task Runner (API v2) ===
// Sends natural-language tasks to Browser Use Cloud
// Docs: https://docs.cloud.browser-use.com/api-reference/latest-api-v-2/tasks/create-task-tasks-post

export class BrowserUseRunner {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Common headers for Browser Use API v2
  private get headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-Browser-Use-API-Key': this.apiKey,
    };
  }

  // Create a Browser Use session (for multi-task workflows or profile-based auth)
  async createSession(options: {
    profileId?: string;
    keepAlive?: boolean;
    persistMemory?: boolean;
  } = {}): Promise<{ sessionId: string; liveUrl: string }> {
    const res = await fetch(`${BU_API_BASE}/sessions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        profileId: options.profileId || undefined,
        keepAlive: options.keepAlive ?? true,
        persistMemory: options.persistMemory ?? true,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Browser Use session creation failed (${res.status}): ${err}`);
    }

    const data = await res.json() as any;
    return {
      sessionId: data.id,
      liveUrl: data.liveUrl || '',
    };
  }

  // Run a task — auto-creates a session if none provided
  async runTask(
    task: string,
    options: {
      sessionId?: string;
      llm?: string;
      maxSteps?: number;
      startUrl?: string;
      structuredOutput?: Record<string, unknown>;
    } = {}
  ): Promise<{ output: string; steps: number; taskId: string }> {
    const payload: Record<string, unknown> = {
      task,
      llm: options.llm || BU_DEFAULT_LLM,
      maxSteps: options.maxSteps || BU_MAX_STEPS,
    };

    if (options.sessionId) {
      payload.sessionId = options.sessionId;
    }

    if (options.startUrl) {
      payload.startUrl = options.startUrl;
    }

    if (options.structuredOutput) {
      payload.structuredOutput = JSON.stringify(options.structuredOutput);
    }

    // Create task via Browser Use Cloud API v2
    const createRes = await fetch(`${BU_API_BASE}/tasks`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Browser Use task creation failed (${createRes.status}): ${err}`);
    }

    const taskData = await createRes.json() as any;
    const taskId = taskData.id;

    if (!taskId) {
      throw new Error('Browser Use task created but no task ID returned');
    }

    // Poll for completion
    const result = await this.pollTaskCompletion(taskId);

    return {
      output: result.output || '',
      steps: result.steps || 0,
      taskId,
    };
  }

  // Poll task status until completion
  private async pollTaskCompletion(taskId: string): Promise<{ output: string; steps: number }> {
    const startTime = Date.now();

    while (Date.now() - startTime < BU_MAX_WAIT_MS) {
      const res = await fetch(`${BU_API_BASE}/tasks/${taskId}`, {
        headers: { 'X-Browser-Use-API-Key': this.apiKey },
      });

      if (!res.ok) {
        throw new Error(`Failed to check task status (${res.status})`);
      }

      const data = await res.json() as any;

      // Task finished successfully
      if (data.status === 'finished' || data.status === 'completed') {
        return {
          output: typeof data.output === 'string'
            ? data.output
            : JSON.stringify(data.output || data.result || ''),
          steps: data.steps?.length || data.stepCount || 0,
        };
      }

      // Task failed or was stopped
      if (data.status === 'failed' || data.status === 'error' || data.status === 'stopped') {
        const errorMsg = data.error || data.message || data.failureReason || 'Unknown error';
        throw new Error(`Browser task ${data.status}: ${errorMsg}`);
      }

      // Still running — wait before next poll
      await new Promise(resolve => setTimeout(resolve, BU_POLL_INTERVAL_MS));
    }

    throw new Error(`Browser task timed out after ${BU_MAX_WAIT_MS / 1000}s`);
  }

  // Stop a running session
  async stopSession(sessionId: string): Promise<void> {
    try {
      await fetch(`${BU_API_BASE}/sessions/${sessionId}/stop`, {
        method: 'PUT',
        headers: this.headers,
      });
    } catch (_) {
      // Best effort
    }
  }
}

// === Steel Session Manager (Optional — for CDP access) ===
export class SteelSessionManager {
  constructor(private db: D1Database, private userId: number) {}

  async getSession(purpose: string, steelApiKey: string): Promise<{ sessionId: string; isNew: boolean }> {
    const existing = await this.db.prepare(
      `SELECT * FROM browser_sessions 
       WHERE user_id = ? AND purpose = ? AND status = 'active' 
       AND last_used > datetime('now', ?)
       ORDER BY last_used DESC LIMIT 1`
    ).bind(this.userId, purpose, `-${SESSION_REUSE_WINDOW_MIN} minutes`).first<BrowserSessionRecord>();

    if (existing) {
      await this.db.prepare(
        `UPDATE browser_sessions SET last_used = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(existing.id).run();
      return { sessionId: existing.steel_session_id, isNew: false };
    }

    const session = await this.createSteelSession(steelApiKey, purpose);
    await this.db.prepare(
      `INSERT INTO browser_sessions (user_id, steel_session_id, purpose, status, metadata) VALUES (?, ?, ?, 'active', ?)`
    ).bind(this.userId, session.id, purpose, JSON.stringify({ viewer_url: session.viewerUrl })).run();

    return { sessionId: session.id, isNew: true };
  }

  private async createSteelSession(apiKey: string, purpose: string): Promise<{ id: string; viewerUrl: string }> {
    const res = await fetch('https://api.steel.dev/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'steel-api-key': apiKey,
      },
      body: JSON.stringify({
        timeout: STEEL_SESSION_TIMEOUT_MIN * 60 * 1000,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Steel session creation failed (${res.status}): ${err}`);
    }

    const data = await res.json() as any;
    return {
      id: data.id,
      viewerUrl: data.sessionViewerUrl || data.session_viewer_url || '',
    };
  }

  async releaseSession(steelSessionId: string, steelApiKey: string): Promise<void> {
    try {
      await fetch(`https://api.steel.dev/v1/sessions/${steelSessionId}/release`, {
        method: 'POST',
        headers: { 'steel-api-key': steelApiKey },
      });
    } catch (_) {}

    await this.db.prepare(
      `UPDATE browser_sessions SET status = 'released', updated_at = CURRENT_TIMESTAMP WHERE steel_session_id = ? AND user_id = ?`
    ).bind(steelSessionId, this.userId).run();
  }

  async markError(steelSessionId: string, error: string): Promise<void> {
    await this.db.prepare(
      `UPDATE browser_sessions SET status = 'error', error_message = ?, updated_at = CURRENT_TIMESTAMP WHERE steel_session_id = ? AND user_id = ?`
    ).bind(error, steelSessionId, this.userId).run();
  }

  async expireStale(): Promise<number> {
    const result = await this.db.prepare(
      `UPDATE browser_sessions SET status = 'expired', updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = ? AND status = 'active' AND last_used < datetime('now', '-${STEEL_SESSION_TIMEOUT_MIN} minutes')`
    ).bind(this.userId).run();
    return result.meta?.changes || 0;
  }

  async listSessions(): Promise<BrowserSessionRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM browser_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`
    ).bind(this.userId).all<BrowserSessionRecord>();
    return result.results || [];
  }
}

// === High-Level Browser Actions ===
// Pre-built task templates for common operations — the "tools" the agent calls
// Now uses Browser Use Cloud sessions natively (Steel optional for CDP)

export class BrowserActions {
  private db: D1Database;
  private userId: number;

  constructor(db: D1Database, userId: number) {
    this.db = db;
    this.userId = userId;
  }

  private async getCredential(service: string, pinHash: string): Promise<string | null> {
    const cred = await this.db.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(this.userId, service).first<{ encrypted_value: string }>();
    if (!cred) return null;
    return decrypt(cred.encrypted_value, pinHash);
  }

  private async logTask(taskType: string, description: string, status: string, result: string = '', error: string = ''): Promise<void> {
    await this.db.prepare(
      `INSERT INTO browser_task_log (user_id, session_id, task_type, task_description, status, result, error) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(this.userId, null, taskType, description, status, result, error).run();
  }

  // Get a Browser Use runner (requires just the BU key)
  private async getRunner(pinHash: string): Promise<BrowserUseRunner | null> {
    const buKey = await this.getCredential('browser_use_api_key', pinHash);
    if (!buKey) return null;
    return new BrowserUseRunner(buKey);
  }

  // === Outlook Actions ===

  private getOutlookCredKeys(account: 'primary' | 'secondary' = 'primary') {
    return account === 'secondary'
      ? { emailKey: 'outlook_email_2' as const, passKey: 'outlook_password_2' as const, label: 'secondary' }
      : { emailKey: 'outlook_email' as const, passKey: 'outlook_password' as const, label: 'primary' };
  }

  async checkOutlookMail(pinHash: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.';

    const { emailKey, passKey, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!email || !password) return `Outlook ${label} account credentials not configured. Add your email and password in Settings → Keys → Outlook — ${label.toUpperCase()}.`;

    try {
      const task = `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, go to the inbox. List the latest 2 emails with: sender name, subject line, date received, and whether it's read or unread. Return as structured text.`;

      const result = await runner.runTask(task, {
        startUrl: 'https://outlook.live.com',
        maxSteps: 40,
      });

      await this.logTask('check_outlook_mail', `Check Outlook inbox (${label})`, 'completed', result.output);
      return result.output || 'No output returned from browser agent.';
    } catch (err: any) {
      await this.logTask('check_outlook_mail', `Check Outlook inbox (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'outlook_mail', err.message);
      return `Failed to check Outlook (${label}): ${err.message}`;
    }
  }

  async composeDraft(pinHash: string, to: string, subject: string, body: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured.';

    const { emailKey, passKey, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!email || !password) return `Outlook ${label} account credentials not configured.`;

    try {
      const task = `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, compose a new email. Set the recipient to "${to}", subject to "${subject}", and body to: "${body}". Save it as a draft — do NOT send it. Confirm the draft was saved.`;

      const result = await runner.runTask(task, {
        startUrl: 'https://outlook.live.com',
        maxSteps: 40,
      });

      await this.logTask('compose_draft', `Draft to ${to}: ${subject} (${label})`, 'completed', result.output);
      return result.output || 'Draft operation completed.';
    } catch (err: any) {
      await this.logTask('compose_draft', `Draft to ${to}: ${subject} (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'compose_draft', err.message);
      return `Failed to compose draft (${label}): ${err.message}`;
    }
  }

  async checkOutlookCalendar(pinHash: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured.';

    const { emailKey, passKey, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!email || !password) return `Outlook ${label} account credentials not configured.`;

    try {
      const task = `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, navigate to the Calendar view. List all events for today and tomorrow with: event title, time, location (if any), and attendees (if visible). Return as structured text.`;

      const result = await runner.runTask(task, {
        startUrl: 'https://outlook.live.com',
        maxSteps: 40,
      });

      await this.logTask('check_outlook_calendar', `Check Outlook calendar (${label})`, 'completed', result.output);
      return result.output || 'No calendar events found.';
    } catch (err: any) {
      await this.logTask('check_outlook_calendar', `Check Outlook calendar (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'outlook_calendar', err.message);
      return `Failed to check calendar (${label}): ${err.message}`;
    }
  }

  // === Gmail Actions (via browser automation — fallback) ===

  async checkGmail(pinHash: string): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.';

    try {
      const task = `Go to https://mail.google.com. If a Google sign-in page appears, report that manual login is required. Once inside Gmail inbox, list the 10 most recent emails with: sender name, subject line, snippet/preview, date received, and whether it's read or unread. Return as structured text.`;

      const result = await runner.runTask(task, {
        startUrl: 'https://mail.google.com',
        maxSteps: 40,
      });

      await this.logTask('check_gmail', 'Check Gmail inbox', 'completed', result.output);
      return result.output || 'No output returned.';
    } catch (err: any) {
      await this.logTask('check_gmail', 'Check Gmail inbox', 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_inbox', err.message);
      return `Failed to check Gmail: ${err.message}`;
    }
  }

  async composeGmailDraft(pinHash: string, to: string, subject: string, body: string): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured.';

    try {
      const result = await runner.runTask(
        `In Gmail, click Compose. Set the recipient to "${to}", subject to "${subject}", and body to: "${body}". Do NOT click Send. Close the compose window so it saves as a draft. Confirm the draft was saved.`,
        { startUrl: 'https://mail.google.com', maxSteps: 30 }
      );

      await this.logTask('compose_gmail_draft', `Gmail draft to ${to}: ${subject}`, 'completed', result.output);
      return result.output || 'Draft operation completed.';
    } catch (err: any) {
      await this.logTask('compose_gmail_draft', `Gmail draft to ${to}: ${subject}`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_compose', err.message);
      return `Failed to compose Gmail draft: ${err.message}`;
    }
  }

  async searchGmail(pinHash: string, query: string): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured.';

    try {
      const result = await runner.runTask(
        `In Gmail, use the search bar to search for: "${query}". List the top 10 results with: sender name, subject line, snippet, and date. Return as structured text.`,
        { startUrl: 'https://mail.google.com', maxSteps: 30 }
      );

      await this.logTask('search_gmail', `Gmail search: ${query}`, 'completed', result.output);
      return result.output || 'No results found.';
    } catch (err: any) {
      await this.logTask('search_gmail', `Gmail search: ${query}`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_search', err.message);
      return `Failed to search Gmail: ${err.message}`;
    }
  }

  // === General Web Browsing ===

  async browseWeb(pinHash: string, instruction: string): Promise<string> {
    const runner = await this.getRunner(pinHash);
    if (!runner) return 'Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.';

    try {
      const result = await runner.runTask(instruction, {
        maxSteps: BU_MAX_STEPS,
      });

      await this.logTask('browse_web', instruction.substring(0, 200), 'completed', result.output);
      return result.output || 'Task completed but no output returned.';
    } catch (err: any) {
      await this.logTask('browse_web', instruction.substring(0, 200), 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'browse_web', err.message);
      return `Browser task failed: ${err.message}`;
    }
  }

  // === Credential Validation ===

  async validateSteelKey(apiKey: string): Promise<{ valid: boolean; message: string }> {
    try {
      const res = await fetch('https://api.steel.dev/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'steel-api-key': apiKey,
        },
        body: JSON.stringify({ timeout: 30000 }),
      });

      if (res.ok) {
        const data = await res.json() as any;
        try {
          await fetch(`https://api.steel.dev/v1/sessions/${data.id}/release`, {
            method: 'POST',
            headers: { 'steel-api-key': apiKey },
          });
        } catch (_) {}
        return { valid: true, message: 'Steel.dev API key is valid. Session created and released.' };
      }

      if (res.status === 401 || res.status === 403) {
        return { valid: false, message: 'Invalid Steel.dev API key. Check your key at app.steel.dev.' };
      }

      return { valid: false, message: `Steel.dev responded with status ${res.status}.` };
    } catch (err: any) {
      return { valid: false, message: `Connection failed: ${err.message}` };
    }
  }

  async validateBrowserUseKey(apiKey: string): Promise<{ valid: boolean; message: string }> {
    try {
      // Validate using the v2 tasks list endpoint
      const res = await fetch(`${BU_API_BASE}/tasks?limit=1`, {
        headers: { 'X-Browser-Use-API-Key': apiKey },
      });

      if (res.ok) {
        return { valid: true, message: 'Browser Use API key is valid.' };
      }

      if (res.status === 401 || res.status === 403) {
        return { valid: false, message: 'Invalid Browser Use API key. Check your key at cloud.browser-use.com.' };
      }

      return { valid: false, message: `Browser Use responded with status ${res.status}.` };
    } catch (err: any) {
      return { valid: false, message: `Connection failed: ${err.message}` };
    }
  }
}
