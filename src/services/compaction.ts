// Memory compaction: collapse low-decay memories into summary entries.
// MVP: simple title + content concat. Future upgrade: LLM-generated summaries.

import type { MemoryRecord } from '../types';

export interface CompactionResult {
  compactedCount: number;
  summaryIds: number[];
  freedImportance: number;
}

/**
 * Finds all memories below `threshold` decay_score, groups them by type,
 * creates a 'summary' memory per group, and supersedes the originals by
 * setting valid_until = now.
 *
 * Returns counts of what was changed.
 */
export async function compactLowScoreMemories(
  db: D1Database,
  userId: number,
  threshold = 0.1
): Promise<CompactionResult> {
  const now = new Date().toISOString();

  // Fetch all still-valid memories below threshold
  const result = await db.prepare(
    `SELECT * FROM memory
     WHERE user_id = ? AND decay_score < ? AND valid_until IS NULL
     ORDER BY type, last_accessed_at ASC`
  ).bind(userId, threshold).all<MemoryRecord>();

  const candidates = result.results || [];
  if (candidates.length === 0) {
    return { compactedCount: 0, summaryIds: [], freedImportance: 0 };
  }

  // Group by type
  const byType = new Map<string, MemoryRecord[]>();
  for (const m of candidates) {
    const group = byType.get(m.type) ?? [];
    group.push(m);
    byType.set(m.type, group);
  }

  let compactedCount = 0;
  let freedImportance = 0;
  const summaryIds: number[] = [];

  for (const [type, memories] of byType) {
    // Build concat summary
    const summaryTitle = `Compacted ${type} memories (${memories.length} entries)`;
    const summaryContent = memories
      .map(m => `• ${m.title}: ${m.content.slice(0, 200)}`)
      .join('\n');

    const maxImportance = Math.max(...memories.map(m => m.importance));

    // Insert new summary entry
    const insertResult = await db.prepare(
      `INSERT INTO memory (user_id, type, title, content, importance, tier, source, decay_score, last_accessed_at)
       VALUES (?, 'summary', ?, ?, ?, 'long_term', 'compaction', 1.0, CURRENT_TIMESTAMP)`
    ).bind(userId, summaryTitle, summaryContent, maxImportance).run();

    const summaryId = insertResult.meta?.last_row_id as number;
    summaryIds.push(summaryId);

    // Supersede all originals
    for (const m of memories) {
      await db.prepare(
        `UPDATE memory SET valid_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(now, m.id, userId).run();
      freedImportance += m.importance;
    }

    compactedCount += memories.length;
  }

  return { compactedCount, summaryIds, freedImportance };
}
