// Semantic Search Service — Cloudflare Workers AI embeddings + cosine similarity
// Used by MemoryService to power vector-based memory retrieval.

import type { MemoryRecord } from '../types';

const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

/**
 * Generate an embedding vector for a piece of text using Cloudflare Workers AI.
 */
export async function generateEmbedding(text: string, ai: Ai): Promise<number[]> {
  const response = await ai.run(EMBEDDING_MODEL, { text: [text] });
  // Response shape: { shape: [1, 768], data: Float32Array }
  const dim = response.shape[1];
  const vector: number[] = [];
  for (let i = 0; i < dim; i++) {
    vector.push(response.data[i]);
  }
  return vector;
}

/**
 * Compute cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Perform semantic search over a user's memories.
 * 1. Generate query embedding via Workers AI
 * 2. Fetch memories that already have embeddings
 * 3. Rank by cosine similarity
 * 4. Return top-N results
 *
 * Falls back to empty array if no embeddings exist or AI is unavailable.
 */
export async function semanticSearch(
  userId: number,
  query: string,
  db: D1Database,
  ai: Ai,
  limit = 10
): Promise<MemoryRecord[]> {
  const queryEmbedding = await generateEmbedding(query, ai);

  // Fetch memories with embeddings (scoped to user, any tier)
  const result = await db.prepare(
    `SELECT * FROM memory WHERE user_id = ? AND embedding IS NOT NULL ORDER BY updated_at DESC LIMIT 500`
  ).bind(userId).all<MemoryRecord>();

  const records = result.results || [];
  if (records.length === 0) return [];

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
  return scored.slice(0, limit).map((s) => s.record);
}
