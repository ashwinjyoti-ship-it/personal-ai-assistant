// Memory Service — Two-Tier Memory System
// Tier 1 (Working): Small, always in prompt, capped at ~20 entries
// Tier 2 (Long-term): Archive, searched on demand via LLM tool

import type { MemoryRecord, ConversationRecord, TypedMemoryInput, Signal, ConfidenceSearchOpts, ConfidenceSearchResult } from '../types';
import { decayScore } from './decay';
import { compactLowScoreMemories as _compactLowScoreMemories } from './compaction';
import type { CompactionResult } from './compaction';
import { embed, embedBatch, serializeEmbedding } from './memory-embeddings';
import { searchHybrid as _searchHybrid, searchSemantic as _searchSemantic } from './retrieval';
import type { HybridResult, HybridSearchOpts } from './retrieval';
import type { ShortTermCompressionResult } from './short-term';

// Token budget constants
const WORKING_MEMORY_CAP = 20;        // Max entries in working memory
const WORKING_MEMORY_TOKEN_BUDGET = 2000; // ~2K tokens for working memory in prompt
const PERSONALITY_TOKEN_BUDGET = 2000;    // ~2K tokens for personality
const APPROX_CHARS_PER_TOKEN = 4;
const NOTES_TOKEN_BUDGET = 1000;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

function truncateToTokenBudget(text: string, budget: number): string {
  const maxChars = budget * APPROX_CHARS_PER_TOKEN;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '\n[...truncated to fit token budget]';
}

/** Pinned notes for system prompt injection */
export async function buildNotesContext(db: D1Database, userId: number): Promise<string> {
  try {
    const result = await db.prepare(
      `SELECT title, content FROM notes
       WHERE user_id = ? AND is_pinned = 1
       ORDER BY updated_at DESC LIMIT 10`
    ).bind(userId).all<{ title: string; content: string }>();

    const rows = result.results || [];
    if (rows.length === 0) return '';

    const context =
      '## Pinned Notes\n' +
      rows.map(n => `- **${n.title || 'Note'}**: ${(n.content || '').slice(0, 300)}`).join('\n');

    return truncateToTokenBudget(context, NOTES_TOKEN_BUDGET);
  } catch {
    return '';
  }
}

export class MemoryService {
  constructor(private db: D1Database) {}

  // === Store ===
  // Deduplicates by (user_id, type, title) — updates existing entry if found
  async store(userId: number, type: MemoryRecord['type'], title: string, content: string, importance = 5, tier: 'working' | 'long_term' = 'working'): Promise<void> {
    // Check for existing memory with same title+type
    const existing = await this.db.prepare(
      `SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?`
    ).bind(userId, type, title).first<{ id: number }>();

    let memoryId: number | null = null;
    if (existing) {
      // Update existing memory — don't create duplicate
      await this.db.prepare(
        `UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(content, importance, tier, existing.id).run();
      memoryId = existing.id;
    } else {
      const ins = await this.db.prepare(
        `INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(userId, type, title, content, importance, tier).run();
      memoryId = (ins.meta?.last_row_id as number) ?? null;
    }

    // Generate and store embedding (best-effort — failure does not block storage)
    if (memoryId !== null) {
      try {
        const vec = await embed(`${title} ${content}`);
        if (vec) {
          await this.db.prepare(`UPDATE memory SET embedding = ? WHERE id = ?`)
            .bind(serializeEmbedding(vec), memoryId).run();
        }
      } catch {
        // embedding failure is non-fatal
      }
    }

    // Auto-enforce working memory cap
    if (tier === 'working') {
      await this.enforceWorkingMemoryCap(userId);
    }
  }

  // Auto-demote completed tasks from working memory to long-term after 7 days.
  // Called as part of the cron cycle or from enforceWorkingMemoryCap.
  async cleanupDoneTasks(userId: number): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`
    ).bind(userId).run();
  }

  // Demote oldest working memory entries to long-term when cap is exceeded
  private async enforceWorkingMemoryCap(userId: number): Promise<void> {
    const count = await this.db.prepare(
      `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'`
    ).bind(userId).first<{ cnt: number }>();

    if ((count?.cnt || 0) > WORKING_MEMORY_CAP) {
      // Demote the oldest, lowest-importance entries
      const excess = (count?.cnt || 0) - WORKING_MEMORY_CAP;
      await this.db.prepare(
        `UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`
      ).bind(userId, userId, excess).run();
    }
  }

  // === Retrieve ===
  
  // Get working memory only (for system prompt injection)
  async getWorkingMemory(userId: number): Promise<MemoryRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?`
    ).bind(userId, WORKING_MEMORY_CAP).all<MemoryRecord>();
    return result.results || [];
  }

  // Get all memory (for settings UI)
  async getAll(userId: number, type?: string, limit = 50): Promise<MemoryRecord[]> {
    if (type) {
      const result = await this.db.prepare(
        `SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?`
      ).bind(userId, type, limit).all<MemoryRecord>();
      return result.results || [];
    }
    const result = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?`
    ).bind(userId, limit).all<MemoryRecord>();
    return result.results || [];
  }

  // Search long-term memory (called by LLM tool)
  // Primary pass: exact phrase LIKE match.
  // Fallback: if 0 results, split into words and OR-match each, ranked by how many words hit.
  // After returning results, touch updated_at so frequently-accessed memories surface by recency.
  async search(userId: number, query: string, limit = 10): Promise<MemoryRecord[]> {
    return this.searchMemoryByTier(userId, query, limit);
  }

  // Search only the long_term tier — used for on-demand context injection before LLM calls.
  // Same 2-pass strategy as search() but scoped to tier='long_term'.
  async searchLongTerm(userId: number, query: string, limit = 5): Promise<MemoryRecord[]> {
    return this.searchMemoryByTier(userId, query, limit, 'long_term');
  }

  private async searchMemoryByTier(
    userId: number,
    query: string,
    limit: number,
    tier?: 'working' | 'long_term'
  ): Promise<MemoryRecord[]> {
    const tierClause = tier ? ' AND tier = ?' : '';
    const buildSearchBindParams = (needle: string, rowLimit: number): (number | string)[] => (
      tier
        ? [userId, tier, needle, needle, rowLimit]
        : [userId, needle, needle, rowLimit]
    );

    const primary = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ?${tierClause} AND (title LIKE ? OR content LIKE ?)
       ORDER BY COALESCE(decay_score, 1.0) * (importance / 10.0) DESC LIMIT ?`
    ).bind(...buildSearchBindParams(`%${query}%`, limit)).all<MemoryRecord>();

    const primaryResults = primary.results || [];
    if (primaryResults.length > 0) {
      await this.touchMemories(userId, primaryResults.map((record) => record.id));
      return primaryResults;
    }

    const words = query.split(/\s+/).filter((word) => word.length > 2);
    if (words.length === 0) return [];

    const matchCount = new Map<number, number>();
    const recordMap = new Map<number, MemoryRecord>();

    for (const word of words) {
      const wordResult = await this.db.prepare(
        `SELECT * FROM memory WHERE user_id = ?${tierClause} AND (title LIKE ? OR content LIKE ?) LIMIT ?`
      ).bind(...buildSearchBindParams(`%${word}%`, limit * 2)).all<MemoryRecord>();

      for (const record of (wordResult.results || [])) {
        matchCount.set(record.id, (matchCount.get(record.id) || 0) + 1);
        recordMap.set(record.id, record);
      }
    }

    const ranked = [...recordMap.values()]
      .sort((a, b) => {
        // Weight word-hit count by decay_score so stale memories rank lower
        const aScore = (matchCount.get(a.id) || 0) * (a.decay_score ?? 1.0);
        const bScore = (matchCount.get(b.id) || 0) * (b.decay_score ?? 1.0);
        return bScore - aScore;
      })
      .slice(0, limit);

    if (ranked.length > 0) {
      await this.touchMemories(userId, ranked.map((record) => record.id));
    }

    return ranked;
  }

  // Touch updated_at and last_accessed_at so decay resets on each access
  private async touchMemories(userId: number, ids: number[]): Promise<void> {
    for (const id of ids) {
      await this.db.prepare(
        `UPDATE memory SET updated_at = CURRENT_TIMESTAMP, last_accessed_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(id, userId).run();
    }
  }

  // === Modify ===
  async update(id: number, userId: number, content: string): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(content, id, userId).run();
  }

  async promote(id: number, userId: number): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(id, userId).run();
    await this.enforceWorkingMemoryCap(userId);
  }

  async demote(id: number, userId: number): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(id, userId).run();
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.db.prepare(
      `DELETE FROM memory WHERE id = ? AND user_id = ?`
    ).bind(id, userId).run();
  }

  // === Context Building (for system prompt) ===

  // Build working memory context — enforces token budget
  async buildContext(userId: number): Promise<string> {
    const memories = await this.getWorkingMemory(userId);
    if (memories.length === 0) return '';

    const grouped: Record<string, MemoryRecord[]> = {};
    for (const m of memories) {
      if (!grouped[m.type]) grouped[m.type] = [];
      grouped[m.type].push(m);
    }

    let context = '\n## Working Memory (Active Context)\n';
    for (const [type, entries] of Object.entries(grouped)) {
      context += `\n### ${type.charAt(0).toUpperCase() + type.slice(1)}s\n`;
      for (const e of entries) {
        context += `- **${e.title}**: ${e.content}\n`;
      }
    }

    // Enforce token budget
    return truncateToTokenBudget(context, WORKING_MEMORY_TOKEN_BUDGET);
  }

  // Truncate personality prompt to budget
  static truncatePersonality(prompt: string): string {
    return truncateToTokenBudget(prompt, PERSONALITY_TOKEN_BUDGET);
  }

  // === Conversation History ===
  async getRecentConversations(userId: number, limit = 20, threadId?: number): Promise<ConversationRecord[]> {
    if (threadId) {
      const result = await this.db.prepare(
        `SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`
      ).bind(userId, threadId, limit).all<ConversationRecord>();
      return (result.results || []).reverse();
    }
    const result = await this.db.prepare(
      `SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
    ).bind(userId, limit).all<ConversationRecord>();
    return (result.results || []).reverse();
  }

  async storeMessage(userId: number, channel: string, role: string, content: string, metadata = '{}', threadId?: number): Promise<void> {
    const tokenEstimate = estimateTokens(content);
    let insertResult: { meta?: { last_row_id?: number | bigint | null } };
    if (threadId) {
      insertResult = await this.db.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(userId, channel, role, content, metadata, tokenEstimate, threadId).run();
    } else {
      insertResult = await this.db.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(userId, channel, role, content, metadata, tokenEstimate).run();
    }

    // Extract and store signal (best-effort — does not block message storage)
    try {
      const msgId = Number(insertResult.meta?.last_row_id ?? 0);
      const convId = threadId ?? msgId;
      const { extractSignal } = await import('./signals');
      const signal = extractSignal(
        userId, convId, role as 'user' | 'assistant', content, msgId, new Date().toISOString()
      );
      await this.db.prepare(
        `INSERT INTO signals (user_id, conversation_id, role, intent, entities, topic, importance, emotional_tone, raw_ref, occurred_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        signal.user_id, signal.conversation_id, signal.role, signal.intent,
        JSON.stringify(signal.entities), signal.topic, signal.importance,
        signal.emotional_tone ?? null, signal.raw_ref, signal.occurred_at
      ).run();

      // Periodically trigger compression (every 10 signals, fire-and-forget)
      const countResult = await this.db.prepare(
        `SELECT COUNT(*) as cnt FROM signals WHERE user_id = ?`
      ).bind(userId).first<{ cnt: number }>();
      if ((countResult?.cnt ?? 0) % 10 === 0) {
        import('./short-term').then(({ compressShortTermMemory }) => {
          compressShortTermMemory(this, this.db, userId).catch(() => {});
        }).catch(() => {});
      }
    } catch {
      // signal extraction failure is non-fatal
    }
  }

  // === Decay Methods (Upgrade C) ===

  // Recompute decay_score for all of a user's memories based on last_accessed_at.
  // Called nightly by the cron job. Returns the count of updated rows.
  async recomputeDecayScores(userId: number): Promise<number> {
    const result = await this.db.prepare(
      `SELECT id, type, importance, last_accessed_at FROM memory WHERE user_id = ?`
    ).bind(userId).all<{ id: number; type: string; importance: number; last_accessed_at: string | null }>();

    const rows = result.results || [];
    if (rows.length === 0) return 0;

    for (const row of rows) {
      const score = decayScore(
        row.type,
        row.importance,
        row.last_accessed_at ?? new Date().toISOString()
      );
      await this.db.prepare(
        `UPDATE memory SET decay_score = ? WHERE id = ? AND user_id = ?`
      ).bind(score, row.id, userId).run();
    }

    return rows.length;
  }

  // Compact memories below threshold; delegates to compaction.ts helper.
  async compactLowScoreMemories(userId: number, threshold = 0.1): Promise<CompactionResult> {
    return _compactLowScoreMemories(this.db, userId, threshold);
  }

  // Find memories with decay_score >= minScore and valid_until IS NULL.
  // Ordered by decay_score DESC — highest signal first.
  async getByDecayScore(
    userId: number,
    minScore: number,
    opts?: { type?: string; limit?: number }
  ): Promise<MemoryRecord[]> {
    const limit = opts?.limit ?? 20;
    const params: (number | string)[] = [userId, minScore];
    let typeClause = '';

    if (opts?.type) {
      typeClause = ' AND type = ?';
      params.push(opts.type);
    }

    params.push(limit);

    const result = await this.db.prepare(
      `SELECT * FROM memory
       WHERE user_id = ? AND decay_score >= ? AND valid_until IS NULL${typeClause}
       ORDER BY decay_score DESC LIMIT ?`
    ).bind(...params).all<MemoryRecord>();

    return result.results || [];
  }

  // === Typed Memory Methods (Upgrade B) ===

  // Store a typed episodic or semantic memory with full bi-temporal metadata.
  // Dedup rule (same as store()): if (user_id, type, title) exists and is still valid,
  // supersede the old record and insert a fresh one. Returns the new memory id.
  async storeTyped(input: TypedMemoryInput): Promise<number> {
    const {
      userId,
      type,
      title,
      content,
      importance = 5,
      occurredAt = new Date().toISOString(),
      validUntil = null,
      source = 'user',
      entities = [],
      tier = 'long_term',
    } = input;

    const entitiesJson = JSON.stringify(entities);

    // Look for an existing still-valid record with the same (user_id, type, title)
    const existing = await this.db.prepare(
      `SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ? AND valid_until IS NULL`
    ).bind(userId, type, title).first<{ id: number }>();

    if (existing) {
      // Supersede the old record, then insert the new one
      await this.supersede(existing.id, userId, new Date().toISOString());
    }

    const result = await this.db.prepare(
      `INSERT INTO memory (user_id, type, title, content, importance, tier, occurred_at, valid_until, source, entities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(userId, type, title, content, importance, tier, occurredAt, validUntil, source, entitiesJson).run();

    const insertedId = result.meta?.last_row_id as number;

    // Generate and store embedding (best-effort — failure does not block storage)
    try {
      const vec = await embed(`${title} ${content}`);
      if (vec) {
        await this.db.prepare(`UPDATE memory SET embedding = ? WHERE id = ?`)
          .bind(serializeEmbedding(vec), insertedId).run();
      }
    } catch {
      // embedding failure is non-fatal
    }

    return insertedId;
  }

  // Find memories of a specific type, optionally filtered by time range.
  // Only returns currently-valid records (valid_until IS NULL).
  async findByType(
    userId: number,
    type: 'episodic' | 'semantic',
    opts?: { from?: string; to?: string; limit?: number }
  ): Promise<MemoryRecord[]> {
    const limit = opts?.limit ?? 20;
    const params: (number | string)[] = [userId, type];
    let whereExtra = '';

    if (opts?.from) {
      whereExtra += ' AND occurred_at >= ?';
      params.push(opts.from);
    }
    if (opts?.to) {
      whereExtra += ' AND occurred_at <= ?';
      params.push(opts.to);
    }

    params.push(limit);

    const result = await this.db.prepare(
      `SELECT * FROM memory
       WHERE user_id = ? AND type = ? AND valid_until IS NULL${whereExtra}
       ORDER BY occurred_at DESC LIMIT ?`
    ).bind(...params).all<MemoryRecord>();

    return result.results || [];
  }

  // Point-in-time retrieval: full history of what was ever recorded before asOf.
  // Returns all memories (including superseded ones) where occurred_at <= asOf,
  // ordered by occurred_at DESC so newest-before-asOf appears first.
  // Use findByType for current-state queries (only valid_until IS NULL records).
  async recallAt(
    userId: number,
    asOf: string,
    query: string,
    limit = 10
  ): Promise<MemoryRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM memory
       WHERE user_id = ?
         AND occurred_at <= ?
         AND (title LIKE ? OR content LIKE ?)
       ORDER BY occurred_at DESC, importance DESC
       LIMIT ?`
    ).bind(userId, asOf, `%${query}%`, `%${query}%`, limit).all<MemoryRecord>();

    return result.results || [];
  }

  // Mark a memory as superseded by setting its valid_until timestamp.
  async supersede(id: number, userId: number, validUntil: string): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET valid_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(validUntil, id, userId).run();
  }

  // === Vector + Hybrid Search Methods (Upgrade A) ===

  /** Hybrid search: vector cosine (55%) + keyword (25%) + decay (20%) × importance. */
  async searchHybrid(userId: number, query: string, opts?: HybridSearchOpts): Promise<HybridResult[]> {
    return _searchHybrid(this.db, userId, query, opts);
  }

  /** Pure semantic search ranked by vector cosine × importance. */
  async searchSemantic(userId: number, query: string, opts?: { limit?: number; type?: string }): Promise<HybridResult[]> {
    return _searchSemantic(this.db, userId, query, opts);
  }

  /**
   * Backfill embeddings for memories that don't have one yet.
   * Processes up to batchSize memories and returns the count processed.
   * Call in a loop until 0 is returned to process all.
   */
  async backfillEmbeddings(userId: number, batchSize = 20): Promise<number> {
    const rows = await this.db.prepare(
      `SELECT id, title, content FROM memory WHERE user_id = ? AND embedding IS NULL LIMIT ?`
    ).bind(userId, batchSize).all<{ id: number; title: string; content: string }>();

    const items = rows.results ?? [];
    if (items.length === 0) return 0;

    const texts = items.map(r => `${r.title} ${r.content}`);
    let embeddings: (number[] | null)[];
    try {
      embeddings = await embedBatch(texts);
    } catch {
      return 0;
    }

    for (let i = 0; i < items.length; i++) {
      const vec = embeddings[i];
      if (!vec) continue;
      await this.db.prepare(`UPDATE memory SET embedding = ? WHERE id = ? AND user_id = ?`)
        .bind(serializeEmbedding(vec), items[i].id, userId).run();
    }

    return items.length;
  }

  // === Signal Methods (Upgrade D) ===

  /** Get recent signals for a user in chronological order. */
  async getRecentSignals(userId: number, limit = 20): Promise<Signal[]> {
    const { getRecentSignals } = await import('./short-term');
    return getRecentSignals(this.db, userId, limit);
  }

  /** Manually trigger short-term memory compression (also fires every 10 messages automatically). */
  async triggerCompression(userId: number): Promise<ShortTermCompressionResult> {
    const { compressShortTermMemory } = await import('./short-term');
    return compressShortTermMemory(this, this.db, userId);
  }

  // === Confidence Methods (Upgrade E) ===

  /** Confidence-aware hybrid search with anti-hallucination surface. */
  async searchWithConfidence(
    userId: number,
    query: string,
    opts?: ConfidenceSearchOpts
  ): Promise<ConfidenceSearchResult> {
    const { searchWithConfidence } = await import('./confidence-queries');
    return searchWithConfidence(this, userId, query, opts);
  }

  async compactHistory(userId: number, keepRecent = 30): Promise<void> {
    const countResult = await this.db.prepare(
      `SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?`
    ).bind(userId).first<{ cnt: number }>();
    
    const count = countResult?.cnt || 0;
    if (count <= keepRecent * 2) return;

    await this.db.prepare(
      `DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`
    ).bind(userId, userId, keepRecent).run();
  }
}
