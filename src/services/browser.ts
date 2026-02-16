// Browser Automation Service — Steel.dev + Browser Use Cloud
// Steel provides persistent browser sessions (the hands)
// Browser Use provides AI-driven navigation (the brain)
//
// Phase 3 scaffold — service layer ready, tools wired, execution deferred to P3 implementation

import type { BrowserSessionRecord } from '../types';
import { logError } from './llm/provider';
import { decrypt } from './crypto';

// === Session Lifecycle States ===
// ACTIVE  — session running in Steel, reusable
// EXPIRED — session timed out or was idle too long
// ERROR   — session failed, needs recreation
// RELEASED — explicitly released, clean shutdown

// Steel session timeout defaults
const DEFAULT_SESSION_TIMEOUT_MIN = 15;  // Hobby plan max
const SESSION_REUSE_WINDOW_MIN = 10;     // Reuse if last used within 10 min

// === Steel Session Manager ===
export class SteelSessionManager {
  constructor(private db: D1Database, private userId: number) {}

  // Get or create a session for a given purpose (e.g., 'outlook', 'google_drive', 'general')
  async getSession(purpose: string, steelApiKey: string): Promise<{ sessionId: string; isNew: boolean }> {
    // Check for existing active session
    const existing = await this.db.prepare(
      `SELECT * FROM browser_sessions 
       WHERE user_id = ? AND purpose = ? AND status = 'active' 
       AND last_used > datetime('now', ?)
       ORDER BY last_used DESC LIMIT 1`
    ).bind(this.userId, purpose, `-${SESSION_REUSE_WINDOW_MIN} minutes`).first<BrowserSessionRecord>();

    if (existing) {
      // Touch last_used
      await this.db.prepare(
        `UPDATE browser_sessions SET last_used = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(existing.id).run();
      return { sessionId: existing.steel_session_id, isNew: false };
    }

    // Create new Steel session via REST API
    const session = await this.createSteelSession(steelApiKey, purpose);
    
    // Store in D1
    await this.db.prepare(
      `INSERT INTO browser_sessions (user_id, steel_session_id, purpose, status, metadata) VALUES (?, ?, ?, 'active', ?)`
    ).bind(this.userId, session.id, purpose, JSON.stringify({ viewer_url: session.viewerUrl })).run();

    return { sessionId: session.id, isNew: true };
  }

  // Create a Steel cloud browser session
  private async createSteelSession(apiKey: string, purpose: string): Promise<{ id: string; viewerUrl: string }> {
    const res = await fetch('https://api.steel.dev/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'steel-api-key': apiKey,
      },
      body: JSON.stringify({
        timeout: DEFAULT_SESSION_TIMEOUT_MIN * 60 * 1000, // ms
        // proxy: true,  // Enable when needed for geo-restricted content
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

  // Release a session explicitly
  async releaseSession(steelSessionId: string, steelApiKey: string): Promise<void> {
    try {
      await fetch(`https://api.steel.dev/v1/sessions/${steelSessionId}/release`, {
        method: 'POST',
        headers: { 'steel-api-key': steelApiKey },
      });
    } catch (e) {
      // Best effort — session may have already expired
    }

    await this.db.prepare(
      `UPDATE browser_sessions SET status = 'released', updated_at = CURRENT_TIMESTAMP WHERE steel_session_id = ? AND user_id = ?`
    ).bind(steelSessionId, this.userId).run();
  }

  // Mark a session as errored
  async markError(steelSessionId: string, error: string): Promise<void> {
    await this.db.prepare(
      `UPDATE browser_sessions SET status = 'error', error_message = ?, updated_at = CURRENT_TIMESTAMP WHERE steel_session_id = ? AND user_id = ?`
    ).bind(error, steelSessionId, this.userId).run();
  }

  // Expire stale sessions (called by cron/heartbeat)
  async expireStale(): Promise<number> {
    const result = await this.db.prepare(
      `UPDATE browser_sessions SET status = 'expired', updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = ? AND status = 'active' AND last_used < datetime('now', '-${DEFAULT_SESSION_TIMEOUT_MIN} minutes')`
    ).bind(this.userId).run();
    return result.meta?.changes || 0;
  }

  // Get all sessions for UI display
  async listSessions(): Promise<BrowserSessionRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM browser_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`
    ).bind(this.userId).all<BrowserSessionRecord>();
    return result.results || [];
  }
}

// === Browser Use Task Runner ===
// Sends natural-language tasks to Browser Use Cloud API
// The browser-use-sdk is Cloudflare Workers compatible (pure fetch)

export class BrowserUseRunner {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Run a task using Browser Use Cloud — with optional Steel session
  async runTask(
    task: string,
    options: {
      steelApiKey?: string;
      steelSessionId?: string;
      schema?: Record<string, unknown>;
      model?: string;
    } = {}
  ): Promise<{ output: string; steps: number; taskId: string }> {
    // Build the task creation payload
    const payload: Record<string, unknown> = {
      task,
      model: options.model || 'browser-use-2.0',
    };

    // If Steel session provided, connect via CDP
    if (options.steelApiKey && options.steelSessionId) {
      payload.cdp_url = `wss://connect.steel.dev?apiKey=${options.steelApiKey}&sessionId=${options.steelSessionId}`;
    }

    if (options.schema) {
      payload.output_schema = options.schema;
    }

    // Create and run the task via Browser Use Cloud REST API
    const createRes = await fetch('https://api.browser-use.com/api/v1/run-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Browser Use task creation failed (${createRes.status}): ${err}`);
    }

    const taskData = await createRes.json() as any;
    const taskId = taskData.id || taskData.task_id;

    // Poll for completion (Browser Use tasks are async)
    const result = await this.pollTaskCompletion(taskId);

    return {
      output: result.output || '',
      steps: result.steps || 0,
      taskId,
    };
  }

  // Poll task status until completion
  private async pollTaskCompletion(taskId: string, maxWaitMs = 120_000): Promise<{ output: string; steps: number }> {
    const startTime = Date.now();
    const pollInterval = 3000; // 3 seconds

    while (Date.now() - startTime < maxWaitMs) {
      const res = await fetch(`https://api.browser-use.com/api/v1/task/${taskId}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to check task status: ${res.status}`);
      }

      const data = await res.json() as any;

      if (data.status === 'finished' || data.status === 'completed') {
        return {
          output: typeof data.output === 'string' ? data.output : JSON.stringify(data.output || data.result || ''),
          steps: data.steps?.length || data.step_count || 0,
        };
      }

      if (data.status === 'failed' || data.status === 'error') {
        throw new Error(`Browser task failed: ${data.error || data.message || 'Unknown error'}`);
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Browser task timed out after ${maxWaitMs / 1000}s`);
  }
}

// === High-Level Browser Actions ===
// Pre-built task templates for common operations
// These are the "tools" the agent will call

export class BrowserActions {
  private sessionManager: SteelSessionManager;
  private db: D1Database;
  private userId: number;

  constructor(db: D1Database, userId: number) {
    this.db = db;
    this.userId = userId;
    this.sessionManager = new SteelSessionManager(db, userId);
  }

  // Decrypt credentials for a service
  private async getCredential(service: string, pinHash: string): Promise<string | null> {
    const cred = await this.db.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(this.userId, service).first<{ encrypted_value: string }>();
    if (!cred) return null;
    return decrypt(cred.encrypted_value, pinHash);
  }

  // Log a browser task
  private async logTask(taskType: string, description: string, status: string, result: string = '', error: string = '', sessionId?: number): Promise<void> {
    await this.db.prepare(
      `INSERT INTO browser_task_log (user_id, session_id, task_type, task_description, status, result, error) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(this.userId, sessionId || null, taskType, description, status, result, error).run();
  }

  // === Outlook Actions ===
  // account: 'primary' uses outlook_email/outlook_password
  //          'secondary' uses outlook_email_2/outlook_password_2
  // Each account gets its own Steel browser session for isolation.

  private getOutlookCredKeys(account: 'primary' | 'secondary' = 'primary') {
    return account === 'secondary'
      ? { emailKey: 'outlook_email_2' as const, passKey: 'outlook_password_2' as const, sessionPurpose: 'outlook_2', label: 'secondary' }
      : { emailKey: 'outlook_email' as const, passKey: 'outlook_password' as const, sessionPurpose: 'outlook', label: 'primary' };
  }

  async checkOutlookMail(pinHash: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);
    const { emailKey, passKey, sessionPurpose, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured. Add Steel.dev and Browser Use API keys in Settings → Keys.';
    if (!email || !password) return `Outlook ${label} account credentials not configured. Add your email and password in Settings → Keys → Outlook — ${label.toUpperCase()}.`;

    try {
      // Separate Steel session per account for isolation
      const { sessionId, isNew } = await this.sessionManager.getSession(sessionPurpose, steelKey);

      const runner = new BrowserUseRunner(buKey);
      const task = isNew 
        ? `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, go to the inbox. List the 10 most recent emails with: sender name, subject line, date received, and whether it's read or unread. Return as structured text.`
        : `You are already logged into Outlook. Go to the inbox. List the 10 most recent emails with: sender name, subject line, date received, and whether it's read or unread. Return as structured text.`;

      const result = await runner.runTask(task, {
        steelApiKey: steelKey,
        steelSessionId: sessionId,
      });

      await this.logTask('check_outlook_mail', `Check Outlook inbox (${label})`, 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('check_outlook_mail', `Check Outlook inbox (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'outlook_mail', err.message);
      return `Failed to check Outlook (${label}): ${err.message}`;
    }
  }

  async composeDraft(pinHash: string, to: string, subject: string, body: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);
    const { emailKey, passKey, sessionPurpose, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured.';
    if (!email || !password) return `Outlook ${label} account credentials not configured.`;

    try {
      const { sessionId, isNew } = await this.sessionManager.getSession(sessionPurpose, steelKey);
      const runner = new BrowserUseRunner(buKey);

      const loginPrefix = isNew
        ? `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, `
        : `You are already logged into Outlook. `;

      const result = await runner.runTask(
        `${loginPrefix}Compose a new email. Set the recipient to "${to}", subject to "${subject}", and body to: "${body}". Save it as a draft — do NOT send it. Confirm the draft was saved.`,
        { steelApiKey: steelKey, steelSessionId: sessionId }
      );

      await this.logTask('compose_draft', `Draft to ${to}: ${subject} (${label})`, 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('compose_draft', `Draft to ${to}: ${subject} (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'compose_draft', err.message);
      return `Failed to compose draft (${label}): ${err.message}`;
    }
  }

  async checkOutlookCalendar(pinHash: string, account: 'primary' | 'secondary' = 'primary'): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);
    const { emailKey, passKey, sessionPurpose, label } = this.getOutlookCredKeys(account);
    const email = await this.getCredential(emailKey, pinHash);
    const password = await this.getCredential(passKey, pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured.';
    if (!email || !password) return `Outlook ${label} account credentials not configured.`;

    try {
      const { sessionId, isNew } = await this.sessionManager.getSession(sessionPurpose, steelKey);
      const runner = new BrowserUseRunner(buKey);

      const loginPrefix = isNew
        ? `Go to https://outlook.live.com. Log in with email "${email}" and password "${password}". After logging in, `
        : `You are already logged into Outlook. `;

      const result = await runner.runTask(
        `${loginPrefix}Navigate to the Calendar view. List all events for today and tomorrow with: event title, time, location (if any), and attendees (if visible). Return as structured text.`,
        { steelApiKey: steelKey, steelSessionId: sessionId }
      );

      await this.logTask('check_outlook_calendar', `Check Outlook calendar (${label})`, 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('check_outlook_calendar', `Check Outlook calendar (${label})`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'outlook_calendar', err.message);
      return `Failed to check calendar (${label}): ${err.message}`;
    }
  }

  // === Gmail Actions (via browser automation) ===

  async checkGmail(pinHash: string): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured. Add Steel.dev and Browser Use API keys in Settings → Keys.';

    try {
      const { sessionId, isNew } = await this.sessionManager.getSession('gmail', steelKey);
      const runner = new BrowserUseRunner(buKey);

      const task = isNew
        ? `Go to https://mail.google.com. If a Google sign-in page appears, wait — the user will handle authentication manually through the Steel session viewer. Once inside Gmail inbox, list the 10 most recent emails with: sender name, subject line, snippet/preview, date received, and whether it's read or unread. Return as structured text.`
        : `You are already in a Gmail session. Navigate to the inbox. List the 10 most recent emails with: sender name, subject line, snippet/preview, date received, and whether it's read or unread. Return as structured text.`;

      const result = await runner.runTask(task, {
        steelApiKey: steelKey,
        steelSessionId: sessionId,
      });

      await this.logTask('check_gmail', 'Check Gmail inbox', 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('check_gmail', 'Check Gmail inbox', 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_inbox', err.message);
      return `Failed to check Gmail: ${err.message}`;
    }
  }

  async composeGmailDraft(pinHash: string, to: string, subject: string, body: string): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured.';

    try {
      const { sessionId } = await this.sessionManager.getSession('gmail', steelKey);
      const runner = new BrowserUseRunner(buKey);

      const result = await runner.runTask(
        `In Gmail, click Compose. Set the recipient to "${to}", subject to "${subject}", and body to: "${body}". Do NOT click Send. Close the compose window so it saves as a draft. Confirm the draft was saved.`,
        { steelApiKey: steelKey, steelSessionId: sessionId }
      );

      await this.logTask('compose_gmail_draft', `Gmail draft to ${to}: ${subject}`, 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('compose_gmail_draft', `Gmail draft to ${to}: ${subject}`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_compose', err.message);
      return `Failed to compose Gmail draft: ${err.message}`;
    }
  }

  async searchGmail(pinHash: string, query: string): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);

    if (!steelKey || !buKey) return 'Browser automation keys not configured.';

    try {
      const { sessionId } = await this.sessionManager.getSession('gmail', steelKey);
      const runner = new BrowserUseRunner(buKey);

      const result = await runner.runTask(
        `In Gmail, use the search bar to search for: "${query}". List the top 10 results with: sender name, subject line, snippet, and date. Return as structured text.`,
        { steelApiKey: steelKey, steelSessionId: sessionId }
      );

      await this.logTask('search_gmail', `Gmail search: ${query}`, 'completed', result.output);
      return result.output;
    } catch (err: any) {
      await this.logTask('search_gmail', `Gmail search: ${query}`, 'failed', '', err.message);
      await logError(this.db, this.userId, 'browser', 'gmail_search', err.message);
      return `Failed to search Gmail: ${err.message}`;
    }
  }

  // === General Web Browsing ===

  async browseWeb(pinHash: string, instruction: string): Promise<string> {
    const steelKey = await this.getCredential('steel_api_key', pinHash);
    const buKey = await this.getCredential('browser_use_api_key', pinHash);

    if (!buKey) return 'Browser Use API key not configured. Add it in Settings → Keys.';

    try {
      const runner = new BrowserUseRunner(buKey);

      // Use Steel if available, otherwise Browser Use creates its own session
      const opts: { steelApiKey?: string; steelSessionId?: string } = {};
      if (steelKey) {
        const { sessionId } = await this.sessionManager.getSession('general', steelKey);
        opts.steelApiKey = steelKey;
        opts.steelSessionId = sessionId;
      }

      const result = await runner.runTask(instruction, opts);

      await this.logTask('browse_web', instruction.substring(0, 200), 'completed', result.output);
      return result.output;
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
        body: JSON.stringify({ timeout: 30000 }), // 30s throwaway session
      });

      if (res.ok) {
        const data = await res.json() as any;
        // Release the test session immediately
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
      // Use the tasks endpoint to validate — a simple list call
      const res = await fetch('https://api.browser-use.com/api/v1/tasks?limit=1', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
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
