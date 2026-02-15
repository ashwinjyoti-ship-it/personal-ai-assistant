// Memory Service — Stores and retrieves contextual memory per user
// Follows Cloudbot's file-based memory philosophy, adapted to D1

import type { MemoryRecord, ConversationRecord } from '../types';

export class MemoryService {
  constructor(private db: D1Database) {}

  // Store a new memory entry
  async store(userId: number, type: MemoryRecord['type'], title: string, content: string, importance = 5): Promise<void> {
    await this.db.prepare(
      `INSERT INTO memory (user_id, type, title, content, importance) VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, type, title, content, importance).run();
  }

  // Get all memory for a user, optionally filtered by type
  async getAll(userId: number, type?: string, limit = 50): Promise<MemoryRecord[]> {
    if (type) {
      const result = await this.db.prepare(
        `SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY importance DESC, updated_at DESC LIMIT ?`
      ).bind(userId, type, limit).all<MemoryRecord>();
      return result.results || [];
    }
    const result = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? ORDER BY importance DESC, updated_at DESC LIMIT ?`
    ).bind(userId, limit).all<MemoryRecord>();
    return result.results || [];
  }

  // Search memory by keyword
  async search(userId: number, query: string, limit = 10): Promise<MemoryRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`
    ).bind(userId, `%${query}%`, `%${query}%`, limit).all<MemoryRecord>();
    return result.results || [];
  }

  // Update a memory entry
  async update(id: number, userId: number, content: string): Promise<void> {
    await this.db.prepare(
      `UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`
    ).bind(content, id, userId).run();
  }

  // Delete a memory entry
  async remove(id: number, userId: number): Promise<void> {
    await this.db.prepare(
      `DELETE FROM memory WHERE id = ? AND user_id = ?`
    ).bind(id, userId).run();
  }

  // Build memory context string for system prompt
  async buildContext(userId: number): Promise<string> {
    const memories = await this.getAll(userId, undefined, 30);
    if (memories.length === 0) return '';

    const grouped: Record<string, MemoryRecord[]> = {};
    for (const m of memories) {
      if (!grouped[m.type]) grouped[m.type] = [];
      grouped[m.type].push(m);
    }

    let context = '\n## Your Memory & Context\n';
    for (const [type, entries] of Object.entries(grouped)) {
      context += `\n### ${type.charAt(0).toUpperCase() + type.slice(1)}s\n`;
      for (const e of entries) {
        context += `- **${e.title}**: ${e.content}\n`;
      }
    }
    return context;
  }

  // Get recent conversation history for context
  async getRecentConversations(userId: number, limit = 20): Promise<ConversationRecord[]> {
    const result = await this.db.prepare(
      `SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
    ).bind(userId, limit).all<ConversationRecord>();
    return (result.results || []).reverse();
  }

  // Store conversation message
  async storeMessage(userId: number, channel: string, role: string, content: string, metadata = '{}'): Promise<void> {
    const tokenEstimate = Math.ceil(content.length / 4);
    await this.db.prepare(
      `INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(userId, channel, role, content, metadata, tokenEstimate).run();
  }

  // Context window guard — estimate total tokens and compact if needed
  async getContextTokenCount(userId: number): Promise<number> {
    const result = await this.db.prepare(
      `SELECT SUM(token_estimate) as total FROM conversations WHERE user_id = ?`
    ).bind(userId).first<{ total: number }>();
    return result?.total || 0;
  }

  // Compact old conversations (keep recent, summarize old)
  async compactHistory(userId: number, keepRecent = 20): Promise<void> {
    // Get count of messages
    const countResult = await this.db.prepare(
      `SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?`
    ).bind(userId).first<{ cnt: number }>();
    
    const count = countResult?.cnt || 0;
    if (count <= keepRecent * 2) return; // Not enough to compact

    // Delete oldest messages beyond keepRecent
    await this.db.prepare(
      `DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`
    ).bind(userId, userId, keepRecent).run();
  }
}
