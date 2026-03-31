// Skills routes — user-defined reusable AI workflows

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';

const skills = new Hono<AppEnv>();

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
  c.set('sessionId', sessionId);
  await next();
}

skills.use('/*', requireAuth);

// Generate a URL-safe slug from a name
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50)
    .replace(/^_|_$/g, '');
}

// GET /api/skills — list all user skills
skills.get('/', async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    `SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`
  ).bind(user.id).all<any>();
  return c.json({ skills: result.results || [] });
});

// POST /api/skills — create a new skill
skills.post('/', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    name: string;
    description: string;
    instructions: string;
    parameters?: Record<string, unknown>;
    required_tools?: string[];
    examples?: Array<{ input: Record<string, unknown>; output: string }>;
  }>();

  if (!body.name?.trim()) return c.json({ error: 'name is required' }, 400);
  if (!body.description?.trim()) return c.json({ error: 'description is required' }, 400);
  if (!body.instructions?.trim()) return c.json({ error: 'instructions is required' }, 400);

  let slug = toSlug(body.name);
  if (!slug) slug = `skill_${Date.now()}`;

  // Ensure unique slug per user — append counter if taken
  const existing = await c.env.DB.prepare(
    'SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?'
  ).bind(user.id, `${slug}%`).all<{ slug: string }>();

  if (existing.results && existing.results.length > 0) {
    const taken = existing.results.map(r => r.slug);
    if (taken.includes(slug)) {
      slug = `${slug}_${existing.results.length + 1}`;
    }
  }

  const parameters = JSON.stringify(body.parameters || {});
  const required_tools = JSON.stringify(body.required_tools || []);
  const examples = JSON.stringify(body.examples || []);

  const result = await c.env.DB.prepare(
    `INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(user.id, body.name.trim(), slug, body.description.trim(), body.instructions.trim(), parameters, required_tools, examples).first<any>();

  return c.json({ skill: result, created: true });
});

// GET /api/skills/:id — get a single skill
skills.get('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid skill ID' }, 400);

  const skill = await c.env.DB.prepare(
    'SELECT * FROM user_skills WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!skill) return c.json({ error: 'Skill not found' }, 404);
  return c.json({ skill });
});

// PUT /api/skills/:id — update a skill
skills.put('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid skill ID' }, 400);

  const body = await c.req.json<{
    name?: string;
    description?: string;
    instructions?: string;
    parameters?: Record<string, unknown>;
    required_tools?: string[];
    examples?: Array<{ input: Record<string, unknown>; output: string }>;
    enabled?: boolean;
  }>();

  const sets: string[] = [];
  const values: any[] = [];

  if (body.name !== undefined) {
    sets.push('name = ?', 'slug = ?');
    values.push(body.name.trim(), toSlug(body.name));
  }
  if (body.description !== undefined) { sets.push('description = ?'); values.push(body.description.trim()); }
  if (body.instructions !== undefined) { sets.push('instructions = ?'); values.push(body.instructions.trim()); }
  if (body.parameters !== undefined) { sets.push('parameters = ?'); values.push(JSON.stringify(body.parameters)); }
  if (body.required_tools !== undefined) { sets.push('required_tools = ?'); values.push(JSON.stringify(body.required_tools)); }
  if (body.examples !== undefined) { sets.push('examples = ?'); values.push(JSON.stringify(body.examples)); }
  if (body.enabled !== undefined) { sets.push('enabled = ?'); values.push(body.enabled ? 1 : 0); }

  if (sets.length === 0) return c.json({ error: 'Nothing to update' }, 400);
  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id, user.id);

  await c.env.DB.prepare(
    `UPDATE user_skills SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  return c.json({ success: true });
});

// DELETE /api/skills/:id — delete a skill
skills.delete('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid skill ID' }, 400);

  await c.env.DB.prepare(
    'DELETE FROM user_skills WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

export default skills;
