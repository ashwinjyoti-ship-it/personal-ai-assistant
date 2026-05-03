// Skills routes — user-defined and auto-learned reusable AI workflows

import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../types';
import { reviewLowConfidenceSkills } from '../services/skills';
import { createRotatingProvider } from '../services/llm/provider';

const skills = new Hono<AppEnv>();

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

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50)
    .replace(/^_|_$/g, '');
}

// ─── POST /api/skills/cron/review-low-confidence ──────────────────────────────
// Called weekly by the cron worker — guarded by X-Cron-Secret (no session needed).

skills.post('/cron/review-low-confidence', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  if (secret !== (c.env.CRON_SECRET || 'karna-cron-default-v1')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  let totalReviewed = 0, totalRewritten = 0, totalDisabled = 0;

  try {
    const usersWithStaleSkills = await c.env.DB.prepare(
      `SELECT DISTINCT u.id, u.pin_hash
       FROM users u
       JOIN user_skills us ON us.user_id = u.id
       WHERE us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < 0.4 AND us.usage_count >= 5`
    ).all<{ id: number; pin_hash: string }>();

    for (const user of usersWithStaleSkills.results ?? []) {
      try {
        const { provider } = await createRotatingProvider(c.env.DB, user.id, user.pin_hash);
        const result = await reviewLowConfidenceSkills(c.env.DB, provider, user.id);
        totalReviewed += result.reviewed;
        totalRewritten += result.rewritten;
        totalDisabled += result.disabled;
      } catch {
        // Skip users whose provider can't be loaded
      }
    }
  } catch (err: any) {
    return c.json({ error: err.message, reviewed: totalReviewed, rewritten: totalRewritten, disabled: totalDisabled }, 500);
  }

  return c.json({ reviewed: totalReviewed, rewritten: totalRewritten, disabled: totalDisabled });
});

// ─── GET /api/skills — list all skills grouped by type ───────────────────────

skills.get('/', requireAuth, async (c) => {
  const user = c.get('user')!;
  const result = await c.env.DB.prepare(
    `SELECT id, name, slug, description, instructions, parameters, required_tools, examples,
            enabled, usage_count, last_used_at, created_at, updated_at,
            is_auto, refinement_count, source, confidence_score
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`
  ).bind(user.id).all<any>();

  const all = result.results || [];
  const manual = all.filter((s: any) => !s.is_auto);
  const auto = all.filter((s: any) => s.is_auto);

  return c.json({ skills: manual, auto_skills: auto });
});

// ─── POST /api/skills — create a new manual skill ────────────────────────────

skills.post('/', requireAuth, async (c) => {
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

// ─── GET /api/skills/:id — get a single skill ────────────────────────────────

skills.get('/:id', requireAuth, async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid skill ID' }, 400);

  const skill = await c.env.DB.prepare(
    'SELECT * FROM user_skills WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first<any>();

  if (!skill) return c.json({ error: 'Skill not found' }, 404);
  return c.json({ skill });
});

// ─── PUT /api/skills/:id — update a skill ────────────────────────────────────
// Supports: name, description, instructions, parameters, required_tools,
//           examples, enabled, and `promote: true` (sets is_auto=0, source='user')

skills.put('/:id', requireAuth, async (c) => {
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
    promote?: boolean;
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

  // Promote: convert auto-skill to manual so the user can edit it freely
  if (body.promote) {
    sets.push("is_auto = 0", "source = 'user'");
  }

  if (sets.length === 0) return c.json({ error: 'Nothing to update' }, 400);
  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id, user.id);

  await c.env.DB.prepare(
    `UPDATE user_skills SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  return c.json({ success: true });
});

// ─── DELETE /api/skills/:id — delete a skill ─────────────────────────────────
// ON DELETE SET NULL on skill_patterns.auto_skill_id handles the unlink automatically.

skills.delete('/:id', requireAuth, async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid skill ID' }, 400);

  await c.env.DB.prepare(
    'DELETE FROM user_skills WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return c.json({ success: true });
});

export default skills;
