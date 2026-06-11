// Auth routes — PIN-based authentication, user setup, sessions

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';
import { hashPin, verifyPin } from '../services/crypto';

const auth = new Hono<AppEnv>();

function authUserPayload(user: UserRecord) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    assistant_name: user.assistant_name || 'Karna',
  };
}

// Check if any users exist (first-time setup)
auth.get('/check', async (c) => {
  const result = await c.env.DB.prepare('SELECT COUNT(*) as cnt FROM users').first<{ cnt: number }>();
  return c.json({ hasUsers: (result?.cnt || 0) > 0 });
});

// First-time user setup
auth.post('/setup', async (c) => {
  const { username, name, pin, personality_prompt, timezone } = await c.req.json();
  
  if (!username || !name || !pin) {
    return c.json({ error: 'Username, name, and PIN are required' }, 400);
  }
  if (pin.length < 4) {
    return c.json({ error: 'PIN must be at least 4 characters' }, 400);
  }

  // Check if username exists
  const existing = await c.env.DB.prepare(
    'SELECT id FROM users WHERE username = ?'
  ).bind(username).first();
  
  if (existing) {
    return c.json({ error: 'Username already taken' }, 409);
  }

  const pinHash = await hashPin(pin);
  
  await c.env.DB.prepare(
    `INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)`
  ).bind(
    username, 
    name, 
    pinHash, 
    personality_prompt || '',
    timezone || 'Asia/Kolkata'
  ).run();

  // Get the created user
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE username = ?'
  ).bind(username).first<UserRecord>();

  // Create session
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
  
  await c.env.DB.prepare(
    'INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)'
  ).bind(sessionId, user!.id, 'web', expiresAt).run();

  return c.json({ 
    success: true, 
    sessionId, 
    user: authUserPayload(user!),
  });
});

// Login with PIN
auth.post('/login', async (c) => {
  const { username, pin } = await c.req.json();
  
  if (!username || !pin) {
    return c.json({ error: 'Username and PIN required' }, 400);
  }

  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE username = ?'
  ).bind(username).first<UserRecord>();
  
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  const valid = await verifyPin(pin, user.pin_hash);
  if (!valid) {
    return c.json({ error: 'Invalid PIN' }, 401);
  }

  // Create session
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  await c.env.DB.prepare(
    'INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)'
  ).bind(sessionId, user.id, 'web', expiresAt).run();

  return c.json({ 
    success: true, 
    sessionId, 
    user: authUserPayload(user),
  });
});

// Logout
auth.post('/logout', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (sessionId) {
    await c.env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
  }
  return c.json({ success: true });
});

// Forgot credentials — list usernames (masked) and hints
auth.get('/users/hints', async (c) => {
  const users = await c.env.DB.prepare(
    'SELECT username, name, created_at FROM users ORDER BY created_at ASC'
  ).all<{ username: string; name: string; created_at: string }>();

  const hints = (users.results || []).map(u => ({
    username: u.username,
    name_hint: u.name.split(' ')[0], // First name only
    created: u.created_at?.split(' ')[0] || '',
  }));

  return c.json({ users: hints, count: hints.length });
});

// Reset PIN — requires username + full display name for verification
auth.post('/reset-pin', async (c) => {
  const { username, name, new_pin } = await c.req.json();

  if (!username || !name || !new_pin) {
    return c.json({ error: 'Username, display name, and new PIN are required' }, 400);
  }
  if (new_pin.length < 4) {
    return c.json({ error: 'PIN must be at least 4 characters' }, 400);
  }

  // Verify username + name match (case-insensitive name match)
  const user = await c.env.DB.prepare(
    'SELECT id, username, name FROM users WHERE username = ?'
  ).bind(username).first<{ id: number; username: string; name: string }>();

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  if (user.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
    return c.json({ error: 'Display name does not match. This is required for identity verification.' }, 403);
  }

  // Hash new PIN
  const newPinHash = await hashPin(new_pin);

  // Update PIN
  await c.env.DB.prepare(
    'UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(newPinHash, user.id).run();

  // Delete all encrypted credentials (they were encrypted with old PIN hash)
  const deletedCreds = await c.env.DB.prepare(
    'DELETE FROM credentials WHERE user_id = ?'
  ).bind(user.id).run();

  // Expire all existing sessions (force re-login with new PIN)
  await c.env.DB.prepare(
    'DELETE FROM sessions WHERE user_id = ?'
  ).bind(user.id).run();

  return c.json({
    success: true,
    message: 'PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.',
    credentials_cleared: deletedCreds.meta?.changes || 0,
  });
});

// Validate session (used by frontend)
auth.get('/me', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'No session' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone, u.assistant_name 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<any>();

  if (!session) return c.json({ error: 'Invalid or expired session' }, 401);

  return c.json({ 
    user: { 
      id: session.uid, 
      username: session.username, 
      name: session.name, 
      role: session.role,
      timezone: session.timezone,
      assistant_name: session.assistant_name || 'Karna',
    } 
  });
});

export default auth;
