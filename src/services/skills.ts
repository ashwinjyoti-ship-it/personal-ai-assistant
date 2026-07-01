// Auto Skill Generation — Phase 1 + Phase 2 of the self-improving flywheel
// Phase 1: Tracks repeated multi-tool workflows, auto-generates skills at threshold, refines them.
// Phase 2: Tracks per-invocation success/failure, maintains confidence_score, auto-disables
//          skills that fall below the confidence floor after enough uses.

import type { LLMProvider, UserRecord } from '../types';

// Tools excluded from pattern tracking — meta/single-purpose, not worth codifying
const SKIP_TOOLS = new Set([
  'create_skill', 'list_skills',
  'store_memory', 'search_memory', 'delete_memory', 'update_memory',
  'get_schedules', 'delete_schedule', 'create_schedule', 'toggle_schedule',
  'gmail_unread_count',
]);

const MIN_TOOLS_FOR_PATTERN = 3;
const SKILL_TRIGGER_THRESHOLD = 3;
const MAX_REFINEMENTS = 5;

// Confidence floor: skills below this with 5+ uses get auto-disabled
const CONFIDENCE_FLOOR = 0.4;
const MIN_USES_FOR_CONFIDENCE_CHECK = 5;

// ─── Public entry point ───────────────────────────────────────────────────────

/**
 * Called after each agent run. Records the tool sequence and, once the same
 * pattern has been seen SKILL_TRIGGER_THRESHOLD times, auto-generates (or refines)
 * a skill. Tracks invocation success for confidence scoring. All DB writes are
 * best-effort; errors are swallowed.
 */
export async function recordAndEvaluatePattern(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  userMessage: string,
  toolsCalledInOrder: string[],
  turnCount: number,
  succeeded: boolean = true,
): Promise<void> {
  try {
    const meaningful = toolsCalledInOrder.filter(t => !SKIP_TOOLS.has(t));
    if (meaningful.length < MIN_TOOLS_FOR_PATTERN) return;

    const unique = [...new Set(meaningful)];
    const toolSignature = [...unique].sort().join(',');

    // Record this occurrence with success outcome
    const patternInsert = await db.prepare(
      `INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count, succeeded)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING id`
    ).bind(
      user.id,
      toolSignature,
      userMessage.slice(0, 500),
      JSON.stringify(meaningful),
      turnCount,
      succeeded ? 1 : 0,
    ).first<{ id: number }>();

    const countRow = await db.prepare(
      'SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?'
    ).bind(user.id, toolSignature).first<{ c: number }>();
    const patternCount = countRow?.c ?? 0;

    const linked = await db.prepare(
      `SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`
    ).bind(user.id, toolSignature).first<{ auto_skill_id: number }>();

    if (linked?.auto_skill_id) {
      // Link this fresh occurrence so confidence uses truly recent invocations.
      if (patternInsert?.id) {
        await db.prepare(
          'UPDATE skill_patterns SET auto_skill_id = ? WHERE id = ?'
        ).bind(linked.auto_skill_id, patternInsert.id).run();
      }

      // Update usage count and confidence score on every invocation
      await updateSkillConfidence(db, user, linked.auto_skill_id, toolSignature);
      // Still try refinement on success
      if (succeeded) {
        await refineAutoSkill(db, provider, user, linked.auto_skill_id, meaningful, userMessage);
      }
      return;
    }

    if (patternCount >= SKILL_TRIGGER_THRESHOLD) {
      await autoGenerateSkill(db, provider, user, toolSignature, meaningful);
    }
  } catch {
    // Non-critical — never let this crash the agent
  }
}

// ─── Confidence management ────────────────────────────────────────────────────

/**
 * Recomputes confidence_score from the last 20 invocations of a skill's pattern,
 * bumps usage_count and last_used_at, then auto-disables if below floor.
 */
async function updateSkillConfidence(
  db: D1Database,
  user: UserRecord,
  skillId: number,
  toolSignature: string,
): Promise<void> {
  // Recompute confidence from recent invocations linked to this skill
  const confRow = await db.prepare(
    `SELECT AVG(CAST(succeeded AS REAL)) as avg_success, COUNT(*) as total
     FROM (
       SELECT succeeded FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id = ?
       ORDER BY created_at DESC LIMIT 20
     )`
  ).bind(user.id, toolSignature, skillId).first<{ avg_success: number | null; total: number }>();

  const confidence = confRow?.avg_success ?? 1.0;
  const totalUses = confRow?.total ?? 0;

  // Determine if we should auto-disable
  const shouldDisable = confidence < CONFIDENCE_FLOOR && totalUses >= MIN_USES_FOR_CONFIDENCE_CHECK;

  await db.prepare(
    `UPDATE user_skills
     SET usage_count = usage_count + 1,
         last_used_at = CURRENT_TIMESTAMP,
         confidence_score = ?,
         enabled = CASE WHEN ? THEN 0 ELSE enabled END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`
  ).bind(confidence, shouldDisable ? 1 : 0, skillId, user.id).run();

  if (shouldDisable) {
    // Fetch skill name for the notification
    const skill = await db.prepare(
      'SELECT name FROM user_skills WHERE id = ?'
    ).bind(skillId).first<{ name: string }>();

    if (skill) {
      await db.prepare(
        `INSERT INTO notifications (user_id, type, title, body, source, is_read)
         VALUES (?, 'warning', ?, ?, 'skills', 0)`
      ).bind(
        user.id,
        `Auto-skill disabled: ${skill.name}`,
        `The skill "${skill.name}" was auto-disabled because its success rate dropped below 40% after ${totalUses} uses. You can re-enable or delete it in Settings → Skills.`,
      ).run();
    }
  }
}

// ─── Auto-skill context for system prompt injection ───────────────────────────

/**
 * Returns a markdown block of the user's top auto-generated skills for injection
 * into the system prompt, plus a one-time conversational announcement for any
 * newly auto-learned skill that hasn't been mentioned to the user yet. Returns
 * '' if there's nothing to inject.
 */
export async function getAutoSkillsContext(db: D1Database, userId: number): Promise<string> {
  try {
    const announcement = await getPendingSkillAnnouncement(db, userId);

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
    if (skills.length === 0) return announcement;

    const list = skills
      .map(s => `**${s.name}** (used ${s.usage_count}×)\n${s.instructions}`)
      .join('\n\n---\n\n');

    const proven = `## Proven Procedures (Auto-Learned)\nThese workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:\n\n${list}\n`;

    return announcement + proven;
  } catch {
    return '';
  }
}

/**
 * Finds the oldest auto-learned skill that hasn't been conversationally
 * announced yet, marks it as announced (best-effort, one-shot), and returns
 * a one-time system-prompt instruction telling the model to mention it
 * naturally in its next reply. This is the "legibility moment" — surfacing
 * newly learned skills in conversation instead of only in a Settings
 * notification the user may never see.
 */
async function getPendingSkillAnnouncement(db: D1Database, userId: number): Promise<string> {
  const pending = await db.prepare(
    `SELECT id, name, description FROM user_skills
     WHERE user_id = ? AND is_auto = 1 AND enabled = 1 AND announced = 0
     ORDER BY created_at ASC LIMIT 1`
  ).bind(userId).first<{ id: number; name: string; description: string }>();

  if (!pending) return '';

  await db.prepare(
    'UPDATE user_skills SET announced = 1 WHERE id = ?'
  ).bind(pending.id).run();

  return `## New Skill Learned — Mention Once\nYou just learned a new skill from this user's repeated behavior: **${pending.name}** — ${pending.description}. Somewhere in your next reply, mention this naturally in one short sentence (e.g., "By the way, I noticed you always do this the same way, so I've saved it as a skill — check Settings → Skills if you want to adjust it."). Don't make it a big deal, don't ask a question about it, and don't bring it up again after this turn.\n\n`;
}

// ─── Cron: weekly low-confidence review ──────────────────────────────────────

/**
 * Reviews low-confidence auto-skills for a single user, either rewriting or disabling them.
 * Called by the weekly cron endpoint (once per user with stale skills).
 */
export async function reviewLowConfidenceSkills(
  db: D1Database,
  provider: LLMProvider,
  userId: number,
): Promise<{ reviewed: number; rewritten: number; disabled: number }> {
  let reviewed = 0, rewritten = 0, disabled = 0;

  try {
    const staleSkills = await db.prepare(
      `SELECT us.id, us.user_id, us.name, us.instructions, us.refinement_count,
              us.confidence_score, us.usage_count
       FROM user_skills us
       WHERE us.user_id = ? AND us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < ? AND us.usage_count >= ?`
    ).bind(userId, CONFIDENCE_FLOOR, MIN_USES_FOR_CONFIDENCE_CHECK).all<{
      id: number;
      user_id: number;
      name: string;
      instructions: string;
      refinement_count: number;
      confidence_score: number;
      usage_count: number;
    }>();

    for (const skill of staleSkills.results ?? []) {
      reviewed++;

      // Check if there are recent successful patterns to learn from
      const recentPatterns = await db.prepare(
        `SELECT user_message_sample, tool_sequence
         FROM skill_patterns
         WHERE auto_skill_id = ? AND succeeded = 1
         ORDER BY created_at DESC LIMIT 3`
      ).bind(skill.id).all<{ user_message_sample: string; tool_sequence: string }>();

      if ((recentPatterns.results ?? []).length < 2 || skill.refinement_count >= MAX_REFINEMENTS) {
        // Not enough data to improve — disable
        await db.prepare(
          `UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(skill.id).run();

        await db.prepare(
          `INSERT INTO notifications (user_id, type, title, body, source, is_read)
           VALUES (?, 'warning', ?, ?, 'skills', 0)`
        ).bind(
          skill.user_id,
          `Auto-skill retired: ${skill.name}`,
          `"${skill.name}" had a ${Math.round(skill.confidence_score * 100)}% success rate and couldn't be improved — disabled. Check Settings → Skills to manage it.`,
        ).run();

        disabled++;
        continue;
      }

      // Attempt a rewrite based on successful examples
      const samples = recentPatterns.results!.map(p => p.user_message_sample);
      const toolSeq = JSON.parse(recentPatterns.results![0].tool_sequence) as string[];

      const rewriteMessages = [
        {
          role: 'system' as const,
          content: 'You are a workflow optimizer. Rewrite a skill procedure so it is more reliable, based on examples that previously succeeded.',
        },
        {
          role: 'user' as const,
          content: `Skill "${skill.name}" has a ${Math.round(skill.confidence_score * 100)}% success rate.

Current instructions:
${skill.instructions}

Recent successful examples:
${samples.map((m, i) => `${i + 1}. "${m}"`).join('\n')}
Tools used: ${toolSeq.join(' → ')}

Rewrite the instructions to be clearer and more reliable. Keep them under 200 words.
Respond with EXACTLY:
REWRITTEN_INSTRUCTIONS: <revised instructions>`,
        },
      ];

      try {
        const response = await provider.chat(rewriteMessages, { tools: [] });
        const text = response.content?.trim() ?? '';
        const match = text.match(/^REWRITTEN_INSTRUCTIONS:\s*([\s\S]+)$/m);
        if (match && match[1].trim()) {
          await db.prepare(
            `UPDATE user_skills
             SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`
          ).bind(match[1].trim(), skill.id).run();
          rewritten++;
        }
      } catch {
        // If rewrite fails, disable
        await db.prepare(
          `UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(skill.id).run();
        disabled++;
      }
    }
  } catch {
    // Non-critical
  }

  return { reviewed, rewritten, disabled };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

async function autoGenerateSkill(
  db: D1Database,
  provider: LLMProvider,
  user: UserRecord,
  toolSignature: string,
  toolSequence: string[],
): Promise<void> {
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

  let slug = `auto_${name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 40)}`;
  const conflict = await db.prepare(
    'SELECT id FROM user_skills WHERE user_id = ? AND slug = ?'
  ).bind(user.id, slug).first();
  if (conflict) slug = `${slug}_${Date.now().toString().slice(-4)}`;

  const inserted = await db.prepare(
    `INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`
  ).bind(user.id, name, slug, description, instructions, JSON.stringify(toolSequence)).first<{ id: number }>();

  if (!inserted?.id) return;

  await db.prepare(
    'UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?'
  ).bind(inserted.id, user.id, toolSignature).run();

  await db.prepare(
    `INSERT INTO notifications (user_id, type, title, body, source, is_read)
     VALUES (?, 'info', ?, ?, 'skills', 0)`
  ).bind(
    user.id,
    `New skill learned: ${name}`,
    `You've asked me to do this the same way ${SKILL_TRIGGER_THRESHOLD} times, so I saved it as a skill: ${description} I'll follow it automatically next time — check Settings → Skills to review, edit, or turn it off.`,
  ).run();
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
