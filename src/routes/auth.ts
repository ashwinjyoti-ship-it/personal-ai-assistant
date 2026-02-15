// Auth routes — PIN-based authentication, user setup, sessions

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';
import { hashPin, verifyPin } from '../services/crypto';

const auth = new Hono<AppEnv>();

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
    user: { id: user!.id, username: user!.username, name: user!.name } 
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
    user: { id: user.id, username: user.username, name: user.name } 
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

// Validate session (used by frontend)
auth.get('/me', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'No session' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
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
      timezone: session.timezone 
    } 
  });
});

export default auth;
