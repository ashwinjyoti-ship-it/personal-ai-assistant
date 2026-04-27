// Memory Service — Two-Tier Memory System
// Tier 1 (Working): Small, always in prompt, capped at ~20 entries
// Tier 2 (Long-term): Archive, searched on demand via LLM tool
// Semantic search via Cloudflare Workers AI embeddings when AI binding is available.

import type { MemoryRecord, ConversationRecord } from '../types';
import { generateEmbedding, semanticSearch } from './semantic-search';

// Token budget constants
const WORKING_MEMORY_CAP = 20;        // Max entries in working memory
const WORKING_MEMORY_TOKEN_BUDGET = 2000; // ~2K tokens for working memory in prompt
const PERSONALITY_TOKEN_BUDGET = 2000;    // ~2K tokens for personality
const APPROX_CHARS_PER_TOKEN = 4;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

function truncateToTokenBudget(text: string, budget: number): string {
  const maxChars = budget * APPROX_CHARS_PER_TOKEN;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '\n[...truncated to fit token budget]';
}

export class MemoryService {
  constructor(private db: D1Database, private ai?: Ai) {}

  // === Store ===
  // Deduplicates by (user_id, type, title) — updates existing entry if found
  async store(userId: number, type: MemoryRecord['type'], title: string, content: string, importance = 5, tier: 'working' | 'long_term' = 'working'): Promise<void> {
    // Check for existing memory with same title+type
    const existing = await this.db.prepare(
      `SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?`
    ).bind(userId, type, title).first<{ id: number }>();

    let memoryId: number;
    let embeddingJson: string | undefined;

    // Generate embedding before DB write if AI is available
    if (this.ai) {
      try {
        const embeddingText = `${title}\n${content}`;
        const embedding = await generateEmbedding(embeddingText, this.ai);
        embeddingJson = JSON.stringify(embedding);
      } catch {
        // Embedding is best-effort
      }
    }

    if (existing) {
      // Update existing memory — don't create duplicate
      if (embeddingJson) {
        await this.db.prepare(
          `UPDATE memory SET content = ?, importance = ?, tier = ?, embedding = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(content, importance, tier, embeddingJson, existing.id).run();
      } else {
        await this.db.prepare(
          `UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(content, importance, tier, existing.id).run();
      }
      memoryId = existing.id;
    } else {
      if (embeddingJson) {
        const result = await this.db.prepare(
          `INSERT INTO memory (user_id, type, title, content, importance, tier, embedding) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`
        ).bind(userId, type, title, content, importance, tier, embeddingJson).first<{ id: number }>();
        memoryId = result?.id || 0;
      } else {
        const result = await this.db.prepare(
          `INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?) RETURNING id`
        ).bind(userId, type, title, content, importance, tier).first<{ id: number }>();
        memoryId = result?.id || 0;
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
  // Primary pass: semantic search via embeddings when AI binding is available.
  // Secondary pass: exact phrase LIKE match.
  // Fallback: if 0 results, split into words and OR-match each, ranked by how many words hit.
  // After returning results, touch updated_at so frequently-accessed memories surface by recency.
  async search(userId: number, query: string, limit = 10): Promise<MemoryRecord[]> {
    // Semantic search first (if AI binding available)
    if (this.ai) {
      try {
        const semanticResults = await semanticSearch(userId, query, this.db, this.ai, limit);
        if (semanticResults.length > 0) {
          await this.touchMemories(userId, semanticResults.map(r => r.id));
          return semanticResults;
        }
      } catch {
        // Fall through to keyword search
      }
    }

    const primary = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`
    ).bind(userId, `%${query}%`, `%${query}%`, limit).all<MemoryRecord>();

    const primaryResults = primary.results || [];
    if (primaryResults.length > 0) {
      await this.touchMemories(userId, primaryResults.map(r => r.id));
      return primaryResults;
    }

    // Fallback: word-by-word OR match, ranked by number of matching words
    const words = query.split(/\s+/).filter(w => w.length > 2);
    if (words.length === 0) return [];

    const matchCount = new Map<number, number>();
    const recordMap = new Map<number, MemoryRecord>();

    for (const word of words) {
      const wordResult = await this.db.prepare(
        `SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?`
      ).bind(userId, `%${word}%`, `%${word}%`, limit * 2).all<MemoryRecord>();

      for (const record of (wordResult.results || [])) {
        matchCount.set(record.id, (matchCount.get(record.id) || 0) + 1);
        recordMap.set(record.id, record);
      }
    }

    const ranked = [...recordMap.values()]
      .sort((a, b) => (matchCount.get(b.id) || 0) - (matchCount.get(a.id) || 0))
      .slice(0, limit);

    if (ranked.length > 0) {
      await this.touchMemories(userId, ranked.map(r => r.id));
    }
    return ranked;
  }

  // Search only the long_term tier — used for on-demand context injection before LLM calls.
  // Same strategy as search() but scoped to tier='long_term'.
  async searchLongTerm(userId: number, query: string, limit = 5): Promise<MemoryRecord[]> {
    // Semantic search first (if AI binding available)
    if (this.ai) {
      try {
        const queryEmbedding = await generateEmbedding(query, this.ai);
        // Fetch long-term memories with embeddings
        const result = await this.db.prepare(
          `SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND embedding IS NOT NULL ORDER BY updated_at DESC LIMIT 500`
        ).bind(userId).all<MemoryRecord>();
        const records = result.results || [];
        if (records.length > 0) {
          const { cosineSimilarity } = await import('./semantic-search');
          const scored = records.map((record) => {
            let recordEmbedding: number[];
            try {
              recordEmbedding = JSON.parse(record.embedding!);
              if (!Array.isArray(recordEmbedding) || recordEmbedding.length === 0) {
                return { record, score: -1 };
              }
            } catch {
              return { record, score: -1 };
            }
            const score = cosineSimilarity(queryEmbedding, recordEmbedding);
            return { record, score };
          });
          scored.sort((a, b) => b.score - a.score);
          const semanticResults = scored.slice(0, limit).map((s) => s.record);
          if (semanticResults.length > 0) {
            await this.touchMemories(userId, semanticResults.map(r => r.id));
            return semanticResults;
          }
        }
      } catch {
        // Fall through to keyword search
      }
    }

    const primary = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`
    ).bind(userId, `%${query}%`, `%${query}%`, limit).all<MemoryRecord>();

    const primaryResults = primary.results || [];
    if (primaryResults.length > 0) {
      await this.touchMemories(userId, primaryResults.map(r => r.id));
      return primaryResults;
    }

    const words = query.split(/\s+/).filter(w => w.length > 2);
    if (words.length === 0) return [];

    const matchCount = new Map<number, number>();
    const recordMap = new Map<number, MemoryRecord>();

    for (const word of words) {
      const wordResult = await this.db.prepare(
        `SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?`
      ).bind(userId, `%${word}%`, `%${word}%`, limit * 2).all<MemoryRecord>();

      for (const record of (wordResult.results || [])) {
        matchCount.set(record.id, (matchCount.get(record.id) || 0) + 1);
        recordMap.set(record.id, record);
      }
    }

    const ranked = [...recordMap.values()]
      .sort((a, b) => (matchCount.get(b.id) || 0) - (matchCount.get(a.id) || 0))
      .slice(0, limit);

    if (ranked.length > 0) await this.touchMemories(userId, ranked.map(r => r.id));
    return ranked;
  }

  // Touch updated_at for a list of memory IDs so frequently-searched entries surface by recency
  private async touchMemories(userId: number, ids: number[]): Promise<void> {
    for (const id of ids) {
      await this.db.prepare(
        `UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(id, userId).run();
    }
  }

  // === Modify ===
  async update(id: number, userId: number, content: string): Promise<void> {
    let embeddingJson: string | undefined;

    if (this.ai) {
      try {
        const row = await this.db.prepare(
          `SELECT title, content FROM memory WHERE id = ? AND user_id = ?`
        ).bind(id, userId).first<{ title: string; content: string }>();
        if (row) {
          const embeddingText = `${row.title}\n${content}`;
          const embedding = await generateEmbedding(embeddingText, this.ai);
          embeddingJson = JSON.stringify(embedding);
        }
      } catch {
        // Best-effort
      }
    }

    if (embeddingJson) {
      await this.db.prepare(
        `UPDATE memory SET content = ?, embedding = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(content, embeddingJson, id, userId).run();
    } else {
      await this.db.prepare(
        `UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
      ).bind(content, id, userId).run();
    }
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
    if (threadId) {
      await this.db.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(userId, channel, role, content, metadata, tokenEstimate, threadId).run();
    } else {
      await this.db.prepare(
        `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(userId, channel, role, content, metadata, tokenEstimate).run();
    }
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
