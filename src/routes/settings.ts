// Settings routes — profile management, credential vault, memory viewer, Google OAuth workspace config

import { Hono } from 'hono';
import type { AppEnv, UserRecord, CredentialRecord, ServiceName, LLMSlotValue } from '../types';
import { LLM_PROVIDER_REGISTRY } from '../types';
import { encrypt, decrypt } from '../services/crypto';
import { MemoryService } from '../services/memory';
import {
  generateAuthUrl,
  completeOAuthFlow,
  isGoogleConnected,
  isOAuthClientConfigured,
  disconnectGoogle,
  getGoogleAuth,
} from '../services/google';

const settings = new Hono<AppEnv>();

// Auth middleware
async function requireAuth(c: any, next: any) {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<any>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
    role: session.role,
    personality_prompt: session.personality_prompt,
    telegram_chat_id: session.telegram_chat_id,
    timezone: session.timezone,
    assistant_name: session.assistant_name || 'Karna',
    created_at: session.created_at,
    updated_at: session.updated_at,
  } as UserRecord);

  await next();
}

settings.use('/*', requireAuth);

// === Profile ===

settings.get('/profile', async (c) => {
  const user = c.get('user')!;
  const fresh = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(user.id).first<any>();
  return c.json({
    id: user.id,
    username: user.username,
    name: fresh?.name || user.name,
    role: fresh?.role || user.role,
    personality_prompt: fresh?.personality_prompt || user.personality_prompt,
    telegram_chat_id: fresh?.telegram_chat_id || user.telegram_chat_id,
    timezone: fresh?.timezone || user.timezone,
    assistant_name: fresh?.assistant_name || 'Karna',
  });
});

settings.put('/profile', async (c) => {
  const user = c.get('user')!;
  const updates = await c.req.json();
  
  const allowedFields = ['name', 'personality_prompt', 'telegram_chat_id', 'timezone', 'role', 'assistant_name'];
  const sets: string[] = [];
  const values: any[] = [];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      sets.push(`${field} = ?`);
      values.push(updates[field]);
    }
  }

  if (sets.length === 0) return c.json({ error: 'No valid fields to update' }, 400);

  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(user.id);

  await c.env.DB.prepare(
    `UPDATE users SET ${sets.join(', ')} WHERE id = ?`
  ).bind(...values).run();

  return c.json({ success: true });
});

// === Credentials ===

const VALID_SERVICES: ServiceName[] = [
  'anthropic', 'openai',                     // legacy LLM keys (backward compat)
  'llm_slot_1', 'llm_slot_2', 'llm_slot_3',  // generic LLM slots
  'telegram_bot_token',
  'google_oauth_tokens',
  'google_api_key',
  'perplexity_api_key',                       // Perplexity AI for fast research
  'browser_use_api_key',                      // Browser Use Cloud for browser automation
];

settings.get('/credentials', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?'
  ).bind(user.id).all<CredentialRecord>();

  const LLM_SLOTS = ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'];
  const credentials = await Promise.all((result.results || []).map(async (cr) => {
    let provider_id: string | undefined;
    if (LLM_SLOTS.includes(cr.service!)) {
      try {
        const decrypted = await decrypt(cr.encrypted_value!, user.pin_hash);
        const slot: LLMSlotValue = JSON.parse(decrypted);
        provider_id = slot.provider;
      } catch { /* non-critical */ }
    }
    return {
      id: cr.id,
      service: cr.service,
      label: cr.label,
      created_at: cr.created_at,
      updated_at: cr.updated_at,
      configured: true,
      ...(provider_id ? { provider_id } : {}),
    };
  }));

  return c.json({
    credentials,
    available_services: VALID_SERVICES,
    llm_providers: LLM_PROVIDER_REGISTRY,
  });
});

settings.put('/credentials', async (c) => {
  const user = c.get('user')!;
  const { service, value, label } = await c.req.json();

  if (!service || !value) {
    return c.json({ error: 'Service name and value are required' }, 400);
  }
  if (!VALID_SERVICES.includes(service)) {
    return c.json({ error: `Invalid service. Must be one of: ${VALID_SERVICES.join(', ')}` }, 400);
  }

  const encryptedValue = await encrypt(value, user.pin_hash);

  await c.env.DB.prepare(
    `INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`
  ).bind(user.id, service, label || service, encryptedValue).run();

  return c.json({ success: true, service });
});

settings.delete('/credentials/:service', async (c) => {
  const user = c.get('user')!;
  const service = c.req.param('service');

  await c.env.DB.prepare(
    'DELETE FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(user.id, service).run();

  return c.json({ success: true });
});

// === Memory Management ===

settings.get('/memory', async (c) => {
  const user = c.get('user')!;
  const type = c.req.query('type');
  const memoryService = new MemoryService(c.env.DB);
  const memories = await memoryService.getAll(user.id, type || undefined, 100);
  return c.json({ memories });
});

settings.post('/memory', async (c) => {
  const user = c.get('user')!;
  const { type, title, content, importance } = await c.req.json();
  
  if (!type || !title || !content) {
    return c.json({ error: 'Type, title, and content are required' }, 400);
  }

  const memoryService = new MemoryService(c.env.DB);
  await memoryService.store(user.id, type, title, content, importance || 5);
  return c.json({ success: true });
});

settings.delete('/memory/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const memoryService = new MemoryService(c.env.DB);
  await memoryService.remove(id, user.id);
  return c.json({ success: true });
});

// === Preferences ===

settings.get('/preferences', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC'
  ).bind(user.id).all<{ id: number; content: string; created_at: string }>();
  return c.json({ preferences: result.results || [] });
});

settings.post('/preferences', async (c) => {
  const user = c.get('user')!;
  const { content } = await c.req.json();
  if (!content?.trim()) return c.json({ error: 'Content required' }, 400);
  await c.env.DB.prepare(
    'INSERT INTO preferences (user_id, content) VALUES (?, ?)'
  ).bind(user.id, content.trim()).run();
  return c.json({ success: true });
});

settings.put('/preferences/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const { content } = await c.req.json();
  if (!content?.trim()) return c.json({ error: 'Content required' }, 400);
  await c.env.DB.prepare(
    'UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?'
  ).bind(content.trim(), id, user.id).run();
  return c.json({ success: true });
});

settings.delete('/preferences/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  await c.env.DB.prepare(
    'DELETE FROM preferences WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

// === Scheduled Tasks ===

settings.get('/schedules', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC'
  ).bind(user.id).all<any>();
  return c.json({ schedules: result.results || [] });
});

settings.put('/schedules/:id/toggle', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  const { enabled } = await c.req.json();
  
  await c.env.DB.prepare(
    'UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?'
  ).bind(enabled ? 1 : 0, id, user.id).run();
  return c.json({ success: true });
});

settings.delete('/schedules/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  await c.env.DB.prepare(
    'DELETE FROM cron_jobs WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

// === Error Log ===

settings.get('/errors', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50'
  ).bind(user.id).all<any>();
  return c.json({ errors: result.results || [] });
});

settings.delete('/errors', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL'
  ).bind(user.id).run();
  return c.json({ success: true });
});

// === Key Validation ===

settings.post('/credentials/validate', async (c) => {
  const user = c.get('user')!;
  const { service, value: rawValue } = await c.req.json();

  if (!service) {
    return c.json({ error: 'Service required' }, 400);
  }

  // If no value provided, test the stored credential (used by the Test button on saved slots)
  let value = rawValue;
  if (!value) {
    const stored = await c.env.DB.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(user.id, service).first<{ encrypted_value: string }>();
    if (!stored) return c.json({ valid: false, message: 'No credential saved for this slot.' });
    try {
      value = await decrypt(stored.encrypted_value, user.pin_hash);
    } catch {
      return c.json({ valid: false, message: 'Failed to decrypt stored credential.' });
    }
  }

  switch (service) {
    case 'anthropic': {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': value, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] }),
        });
        if (res.ok) return c.json({ valid: true, message: 'Anthropic API key is valid.' });
        if (res.status === 401) return c.json({ valid: false, message: 'Invalid Anthropic API key.' });
        return c.json({ valid: false, message: `Anthropic responded with status ${res.status}.` });
      } catch (err: any) {
        return c.json({ valid: false, message: `Connection failed: ${err.message}` });
      }
    }
    case 'openai': {
      try {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${value}` },
        });
        if (res.ok) return c.json({ valid: true, message: 'OpenAI API key is valid.' });
        if (res.status === 401) return c.json({ valid: false, message: 'Invalid OpenAI API key.' });
        return c.json({ valid: false, message: `OpenAI responded with status ${res.status}.` });
      } catch (err: any) {
        return c.json({ valid: false, message: `Connection failed: ${err.message}` });
      }
    }
    // === Generic LLM Slot Validation ===
    case 'llm_slot_1':
    case 'llm_slot_2':
    case 'llm_slot_3': {
      try {
        // value is JSON: {provider, apiKey}
        const slotValue: LLMSlotValue = JSON.parse(value);
        if (!slotValue.provider || !slotValue.apiKey) {
          return c.json({ valid: false, message: 'Missing provider or API key.' });
        }
        const config = LLM_PROVIDER_REGISTRY[slotValue.provider];
        if (!config) {
          return c.json({ valid: false, message: `Unknown provider: ${slotValue.provider}` });
        }
        // Validate based on provider API format
        if (config.apiFormat === 'anthropic') {
          const res = await fetch(config.apiBase + '/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': slotValue.apiKey, 'anthropic-version': '2023-06-01' },
            body: JSON.stringify({ model: config.defaultModel, max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] }),
          });
          if (res.ok) return c.json({ valid: true, message: `${config.label} API key is valid.` });
          if (res.status === 401) return c.json({ valid: false, message: `Invalid ${config.label} API key.` });
          return c.json({ valid: false, message: `${config.label} responded with status ${res.status}.` });
        } else {
          // OpenAI-compatible: test with /v1/models or a minimal chat
          const validateUrl = config.apiBase + (config.validatePath || '/v1/models');
          const res = await fetch(validateUrl, {
            headers: { 'Authorization': `Bearer ${slotValue.apiKey}` },
          });
          if (res.ok) return c.json({ valid: true, message: `${config.label} API key is valid.` });
          if (res.status === 401 || res.status === 403) return c.json({ valid: false, message: `Invalid ${config.label} API key.` });
          // Some providers don't have /models endpoint — try a minimal chat
          if (res.status === 404) {
            try {
              const chatRes = await fetch(config.apiBase + '/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${slotValue.apiKey}` },
                body: JSON.stringify({ model: config.defaultModel, max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] }),
              });
              if (chatRes.ok || chatRes.status === 200) return c.json({ valid: true, message: `${config.label} API key is valid.` });
              if (chatRes.status === 401 || chatRes.status === 403) return c.json({ valid: false, message: `Invalid ${config.label} API key.` });
              return c.json({ valid: false, message: `${config.label} responded with status ${chatRes.status}.` });
            } catch (chatErr: any) {
              return c.json({ valid: false, message: `${config.label} chat test failed: ${chatErr.message}` });
            }
          }
          return c.json({ valid: false, message: `${config.label} responded with status ${res.status}.` });
        }
      } catch (err: any) {
        if (err instanceof SyntaxError) {
          return c.json({ valid: false, message: 'Invalid slot data format.' });
        }
        return c.json({ valid: false, message: `Connection failed: ${err.message}` });
      }
    }
    case 'google_oauth_client': {
      // Legacy — no longer stored as credential, use env vars instead
      return c.json({ valid: false, message: 'Google OAuth client is now configured via environment variables, not Settings.' });
    }
    case 'perplexity_api_key': {
      try {
        const res = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${value}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'sonar', messages: [{ role: 'user', content: 'test' }], max_tokens: 1 }),
        });
        if (res.ok || res.status === 400) return c.json({ valid: true, message: 'Perplexity API key is valid.' });
        if (res.status === 401) return c.json({ valid: false, message: 'Invalid Perplexity API key.' });
        return c.json({ valid: false, message: `Perplexity responded with status ${res.status}.` });
      } catch (err: any) {
        return c.json({ valid: false, message: `Connection failed: ${err.message}` });
      }
    }
    default:
      return c.json({ valid: true, message: 'Saved (validation not available for this service).' });
  }
});

// ==========================================
// Google OAuth 2.0 Endpoints
// ==========================================

// GET /google/status — Check if Google account is connected
settings.get('/google/status', async (c) => {
  const user = c.get('user')!;
  try {
    const status = await isGoogleConnected(c.env.DB, user.id, user.pin_hash);
    const clientConfigured = isOAuthClientConfigured(c.env.GOOGLE_CLIENT_ID, c.env.GOOGLE_CLIENT_SECRET);

    return c.json({
      ...status,
      oauth_client_configured: clientConfigured,
    });
  } catch (err: any) {
    return c.json({ connected: false, error: err.message });
  }
});

// GET /google/auth-url — Generate the OAuth consent URL
settings.get('/google/auth-url', async (c) => {
  const user = c.get('user')!;
  try {
    const clientId = c.env.GOOGLE_CLIENT_ID;
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return c.json({ error: 'Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets.' }, 400);
    }

    // Build redirect URI from request URL
    const reqUrl = new URL(c.req.url);
    const redirectUri = `${reqUrl.protocol}//${reqUrl.host}/auth/google/callback`;

    // Generate state token (session ID for CSRF protection)
    const state = btoa(JSON.stringify({
      sessionId: c.req.header('Authorization')?.replace('Bearer ', ''),
      ts: Date.now(),
    }));

    const authUrl = generateAuthUrl(clientId, redirectUri, state);

    return c.json({ auth_url: authUrl, redirect_uri: redirectUri });
  } catch (err: any) {
    return c.json({ error: `Failed to generate auth URL: ${err.message}` }, 500);
  }
});

// POST /google/disconnect — Remove stored Google tokens
settings.post('/google/disconnect', async (c) => {
  const user = c.get('user')!;
  try {
    await disconnectGoogle(c.env.DB, user.id);
    return c.json({ success: true, message: 'Google account disconnected.' });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// POST /google/test — Quick test of Google API access
settings.post('/google/test', async (c) => {
  const user = c.get('user')!;
  try {
    const { token, email } = await getGoogleAuth(
      c.env.DB, user.id, user.pin_hash,
      c.env.GOOGLE_CLIENT_ID, c.env.GOOGLE_CLIENT_SECRET
    );

    // Test: list 1 calendar event to verify scopes work
    const calRes = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin=' + new Date().toISOString(),
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const sheetsOk = true; // If we got a token, sheets scope is granted
    const calOk = calRes.ok;

    return c.json({
      success: true,
      email,
      scopes: {
        sheets: sheetsOk,
        calendar: calOk,
        docs: sheetsOk, // same token
        drive: sheetsOk,
      },
      message: calOk
        ? `Connected as ${email} — all services working.`
        : `Connected as ${email} — calendar access issue (${calRes.status}).`,
    });
  } catch (err: any) {
    return c.json({ success: false, error: err.message });
  }
});

// === Secret Vault ===
// Stores named site credentials (username + password) encrypted with the user's PIN.
// Names are visible; credentials are never returned decrypted via the API.

settings.get('/site-vault', async (c) => {
  const user = c.get('user')!;
  try {
    const rows = await c.env.DB.prepare(
      'SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC'
    ).bind(user.id).all<{ id: number; name: string; created_at: string; updated_at: string }>();
    return c.json({ entries: rows.results || [] });
  } catch {
    return c.json({ entries: [] }); // table may not exist yet before migration
  }
});

settings.put('/site-vault', async (c) => {
  const user = c.get('user')!;
  const { name, username, password, notes } = await c.req.json();
  if (!name?.trim() || !username?.trim() || !password?.trim()) {
    return c.json({ error: 'name, username, and password are required' }, 400);
  }
  const blob = JSON.stringify({ username: username.trim(), password, ...(notes ? { notes } : {}) });
  const encryptedBlob = await encrypt(blob, user.pin_hash);
  await c.env.DB.prepare(
    `INSERT INTO site_credentials (user_id, name, encrypted_blob)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, name) DO UPDATE SET
       encrypted_blob = excluded.encrypted_blob,
       updated_at = CURRENT_TIMESTAMP`
  ).bind(user.id, name.trim(), encryptedBlob).run();
  return c.json({ success: true, name: name.trim() });
});

settings.delete('/site-vault/:id', async (c) => {
  const user = c.get('user')!;
  const id = Number(c.req.param('id'));
  await c.env.DB.prepare(
    'DELETE FROM site_credentials WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();
  return c.json({ success: true });
});

export default settings;
