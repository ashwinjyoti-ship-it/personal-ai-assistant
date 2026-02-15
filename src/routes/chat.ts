// Chat routes — main conversation endpoint with LLM integration

import { Hono } from 'hono';
import type { AppEnv, UserRecord, NormalizedMessage } from '../types';
import { createProviderChain } from '../services/llm/provider';
import { runAgent } from '../services/agent';
import { MemoryService } from '../services/memory';

const chat = new Hono<AppEnv>();

// Auth middleware for chat routes
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
  c.set('sessionId', sessionId);
  
  await next();
}

chat.use('/*', requireAuth);

// Send a message and get a response
chat.post('/send', async (c) => {
  const user = c.get('user')!;
  const { message, channel = 'web' } = await c.req.json();

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return c.json({ error: 'Message is required' }, 400);
  }

  // Normalize the message (Adapter Pattern)
  const normalized: NormalizedMessage = {
    userId: user.id,
    username: user.username,
    channel: channel as 'web' | 'telegram',
    text: message.trim(),
    sessionId: c.get('sessionId')!,
    timestamp: new Date().toISOString(),
  };

  try {
    // Create provider chain with user's credentials
    // Use PIN hash as encryption key (already available from session)
    const provider = await createProviderChain(c.env.DB, user.id, user.pin_hash);
    
    // Run the agent
    const response = await runAgent(normalized, c.env.DB, provider, user);

    return c.json({ 
      response, 
      timestamp: new Date().toISOString(),
      channel: normalized.channel,
    });
  } catch (err: any) {
    console.error('Chat error:', err);
    
    if (err.message?.includes('No LLM provider configured')) {
      return c.json({ 
        error: 'No AI provider configured. Please add your API key in Settings → Credentials.',
        type: 'no_provider' 
      }, 400);
    }

    return c.json({ 
      error: 'Something went wrong. I\'ll be back in a moment.',
      details: err.message 
    }, 500);
  }
});

// Get conversation history
chat.get('/history', async (c) => {
  const user = c.get('user')!;
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');

  const result = await c.env.DB.prepare(
    `SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
  ).bind(user.id, limit, offset).all<any>();

  return c.json({ 
    messages: (result.results || []).reverse(),
    total: result.results?.length || 0 
  });
});

// Clear conversation history
chat.delete('/history', async (c) => {
  const user = c.get('user')!;
  await c.env.DB.prepare(
    'DELETE FROM conversations WHERE user_id = ?'
  ).bind(user.id).run();
  return c.json({ success: true });
});

export default chat;
