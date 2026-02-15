// Settings routes — profile management, credential vault, memory viewer

import { Hono } from 'hono';
import type { AppEnv, UserRecord, CredentialRecord, ServiceName } from '../types';
import { encrypt, decrypt } from '../services/crypto';
import { MemoryService } from '../services/memory';

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
    created_at: session.created_at,
    updated_at: session.updated_at,
  } as UserRecord);

  await next();
}

settings.use('/*', requireAuth);

// === Profile ===

settings.get('/profile', async (c) => {
  const user = c.get('user')!;
  return c.json({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    personality_prompt: user.personality_prompt,
    telegram_chat_id: user.telegram_chat_id,
    timezone: user.timezone,
  });
});

settings.put('/profile', async (c) => {
  const user = c.get('user')!;
  const updates = await c.req.json();
  
  const allowedFields = ['name', 'personality_prompt', 'telegram_chat_id', 'timezone', 'role'];
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
  'anthropic', 'openai', 'telegram_bot_token', 
  'google_service_account', 'outlook_email', 'outlook_password', 'browserbase'
];

settings.get('/credentials', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    'SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?'
  ).bind(user.id).all<Partial<CredentialRecord>>();

  // Return list without actual values — just which services are configured
  return c.json({ 
    credentials: (result.results || []).map(cr => ({
      ...cr,
      configured: true,
    })),
    available_services: VALID_SERVICES,
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

  // Encrypt the credential value
  const encryptedValue = await encrypt(value, user.pin_hash);

  // Upsert
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

// === Scheduled Tasks (visual management) ===

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

export default settings;
