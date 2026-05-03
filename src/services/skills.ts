// Auto Skill Generation — Phase 1 of the self-improving flywheel
// Tracks repeated multi-tool workflows, auto-generates skills at threshold,
// and refines them with each new occurrence.

import type { LLMProvider, UserRecord } from '../types';

// Tools excluded from pattern tracking — meta/single-purpose, not worth codifying
const SKIP_TOOLS = new Set([
  'create_skill', 'list_skills',
  'store_memory', 'search_memory', 'delete_memory', 'update_memory',
  'get_schedules', 'delete_schedule', 'create_schedule', 'toggle_schedule',
  'gmail_unread_count',
]);

// Minimum distinct tools for a task to be worth tracking
const MIN_TOOLS_FOR_PATTERN = 3;

// How many pattern occurrences trigger auto-skill creation
const SKILL_TRIGGER_THRESHOLD = 3;

// Max refinement passes to prevent drift
const MAX_REFINEMENTS = 5;

// ─── Public entry point ───────────────────────────────────────────────────────

/**
 * Called after each agent run. Records the tool sequence and, once the same
 * pattern has been seen SKILL_TRIGGER_THRESHOLD times, auto-generates (or refines)
 * a skill. All DB writes are best-effort; errors are swallowed.
 */
export async function recordAndEvaluatePattern(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  userMessage: string,
  toolsCalledInOrder: string[],
  turnCount: number,
): Promise<void> {
  try {
    // Strip meta-tools and keep only meaningful ones
    const meaningful = toolsCalledInOrder.filter(t => !SKIP_TOOLS.has(t));
    if (meaningful.length < MIN_TOOLS_FOR_PATTERN) return;

    // Fingerprint: sorted unique tools — groups tasks by capability set
    const unique = [...new Set(meaningful)];
    const toolSignature = [...unique].sort().join(',');

    // Record this occurrence
    await db.prepare(
      `INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      user.id,
      toolSignature,
      userMessage.slice(0, 500),
      JSON.stringify(meaningful),
      turnCount,
    ).run();

    // Count total occurrences for this signature
    const countRow = await db.prepare(
      'SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?'
    ).bind(user.id, toolSignature).first<{ c: number }>();
    const patternCount = countRow?.c ?? 0;

    // Check if an auto-skill already exists for this signature
    const linked = await db.prepare(
      `SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`
    ).bind(user.id, toolSignature).first<{ auto_skill_id: number }>();

    if (linked?.auto_skill_id) {
      // Skill exists — attempt a refinement pass
      await refineAutoSkill(db, provider, user, linked.auto_skill_id, meaningful, userMessage);
      return;
    }

    // No skill yet — create one when threshold is crossed
    if (patternCount >= SKILL_TRIGGER_THRESHOLD) {
      await autoGenerateSkill(db, provider, user, toolSignature, meaningful);
    }
  } catch {
    // Non-critical — never let this crash the agent
  }
}

// ─── Auto-skill context for system prompt injection ───────────────────────────

/**
 * Returns a markdown block of the user's top auto-generated skills for injection
 * into the system prompt. Returns '' if none exist.
 */
export async function getAutoSkillsContext(db: D1Database, userId: number): Promise<string> {
  try {
    const result = await db.prepare(
      `SELECT name, description, instructions, usage_count
       FROM user_skills
       WHERE user_id = ? AND is_auto = 1 AND enabled = 1
       ORDER BY usage_count DESC, created_at DESC
       LIMIT 5`
    ).bind(userId).all<{
      name: string;
      description: string;
      instructions: string;
      usage_count: number;
    }>();

    const skills = result.results ?? [];
    if (skills.length === 0) return '';

    const list = skills
      .map(s => `**${s.name}** (used ${s.usage_count}×)\n${s.instructions}`)
      .join('\n\n---\n\n');

    return `## Proven Procedures (Auto-Learned)\nThese workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:\n\n${list}\n`;
  } catch {
    return '';
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

async function autoGenerateSkill(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  toolSignature: string,
  toolSequence: string[],
): Promise<void> {
  // Fetch up to 3 sample messages that triggered this pattern
  const samples = await db.prepare(
    `SELECT user_message_sample, tool_sequence
     FROM skill_patterns
     WHERE user_id = ? AND tool_signature = ?
     ORDER BY created_at DESC LIMIT 3`
  ).bind(user.id, toolSignature).all<{ user_message_sample: string; tool_sequence: string }>();

  const sampleMessages = (samples.results ?? []).map(s => s.user_message_sample);

  const genMessages = [
    {
      role: 'system' as const,
      content: 'You are a workflow analyst. Given examples of user requests that all triggered the same multi-tool sequence, write a concise reusable skill procedure.',
    },
    {
      role: 'user' as const,
      content: `These user requests all produced the same multi-tool workflow:

${sampleMessages.map((m, i) => `${i + 1}. "${m}"`).join('\n')}

Tools used (in order): ${toolSequence.join(' → ')}

Write a reusable skill. Respond with EXACTLY these three fields (no extra text):
NAME: <2-4 word skill name>
DESCRIPTION: <one sentence — what this skill does>
INSTRUCTIONS: <step-by-step instructions referencing exact tool names, under 200 words>`,
    },
  ];

  const response = await provider.chat(genMessages, { tools: [] });
  const text = response.content?.trim() ?? '';

  const nameMatch = text.match(/^NAME:\s*(.+)$/m);
  const descMatch = text.match(/^DESCRIPTION:\s*(.+)$/m);
  const instrMatch = text.match(/^INSTRUCTIONS:\s*([\s\S]+)$/m);
  if (!nameMatch || !descMatch || !instrMatch) return;

  const name = nameMatch[1].trim();
  const description = descMatch[1].trim();
  const instructions = instrMatch[1].trim();
  if (!name || !description || !instructions) return;

  // Build a unique slug
  let slug = `auto_${name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 40)}`;
  const conflict = await db.prepare(
    'SELECT id FROM user_skills WHERE user_id = ? AND slug = ?'
  ).bind(user.id, slug).first();
  if (conflict) slug = `${slug}_${Date.now().toString().slice(-4)}`;

  // Insert auto-generated skill
  const inserted = await db.prepare(
    `INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`
  ).bind(user.id, name, slug, description, instructions, JSON.stringify(toolSequence)).first<{ id: number }>();

  if (!inserted?.id) return;

  // Link all existing patterns for this signature to the new skill
  await db.prepare(
    'UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?'
  ).bind(inserted.id, user.id, toolSignature).run();
}

async function refineAutoSkill(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  skillId: number,
  newToolSequence: string[],
  newUserMessage: string,
): Promise<void> {
  const skill = await db.prepare(
    'SELECT name, instructions, refinement_count FROM user_skills WHERE id = ? AND user_id = ?'
  ).bind(skillId, user.id).first<{ name: string; instructions: string; refinement_count: number }>();

  if (!skill || skill.refinement_count >= MAX_REFINEMENTS) return;

  const refineMessages = [
    {
      role: 'system' as const,
      content: 'You are a workflow optimizer. Given an existing skill and a new usage example, decide if the instructions should be improved.',
    },
    {
      role: 'user' as const,
      content: `Existing skill "${skill.name}":
${skill.instructions}

New example that used this same workflow:
User asked: "${newUserMessage}"
Tools used: ${newToolSequence.join(' → ')}

If the existing instructions are accurate and complete for this new example, respond with exactly:
NO_CHANGE

If you can improve clarity or add a genuinely useful detail, respond with:
UPDATED_INSTRUCTIONS: <revised instructions, under 200 words>

Keep changes minimal. Only update if the new example reveals a real gap.`,
    },
  ];

  const response = await provider.chat(refineMessages, { tools: [] });
  const text = response.content?.trim() ?? '';

  if (!text || text.startsWith('NO_CHANGE') || !text.includes('UPDATED_INSTRUCTIONS:')) return;

  const updated = text.replace(/^UPDATED_INSTRUCTIONS:\s*/m, '').trim();
  if (!updated || updated === skill.instructions) return;

  await db.prepare(
    `UPDATE user_skills
     SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).bind(updated, skillId).run();
}
