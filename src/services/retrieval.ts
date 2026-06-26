// Hybrid retrieval for the memory system (Upgrade A).
// Combines vector cosine similarity, keyword overlap, and decay score.

import type { MemoryRecord } from '../types';
import { cosineSimilarity, embed, deserializeEmbedding } from './memory-embeddings';

export interface HybridResult {
  memory: MemoryRecord;
  vectorScore: number;
  keywordScore: number;
  decayScore: number;
  finalScore: number;
}

export interface HybridSearchOpts {
  limit?: number;
  type?: string;
  minFinalScore?: number;
  /** Fetch this many × limit candidates from SQL, then re-rank in JS. */
  candidateMultiplier?: number;
}

const WEIGHT_VECTOR = 0.55;
const WEIGHT_KEYWORD = 0.25;
const WEIGHT_DECAY = 0.20;

/** Jaccard-style keyword recall: fraction of query tokens found in text. */
export function keywordOverlap(query: string, text: string): number {
  const qTokens = new Set(query.toLowerCase().split(/\W+/).filter(t => t.length > 2));
  const tText = text.toLowerCase();
  if (qTokens.size === 0) return 0;
  let found = 0;
  for (const t of qTokens) if (tText.includes(t)) found++;
  return found / qTokens.size;
}

/**
 * Hybrid search combining vector cosine + keyword overlap + decay.
 *
 * Two-pass candidate strategy:
 *  1. SQL LIKE filter — fast keyword pre-filter.
 *  2. If LIKE returns few candidates, supplement with top-N by decay_score so
 *     purely semantic queries ("H-town Broadway") still surface relevant results.
 */
export async function searchHybrid(
  db: D1Database,
  userId: number,
  query: string,
  opts: HybridSearchOpts = {}
): Promise<HybridResult[]> {
  const { limit = 10, type, minFinalScore = 0.0, candidateMultiplier = 5 } = opts;
  const candidateLimit = Math.max(limit * candidateMultiplier, 50);
  const typeClause = type ? ' AND type = ?' : '';

  // Pass 1: keyword candidates
  const likeParams: (number | string)[] = [userId, `%${query}%`, `%${query}%`];
  if (type) likeParams.push(type);
  likeParams.push(candidateLimit);

  const likeRows = await db.prepare(
    `SELECT * FROM memory
     WHERE user_id = ? AND valid_until IS NULL
       AND (title LIKE ? OR content LIKE ?)${typeClause}
     ORDER BY decay_score DESC LIMIT ?`
  ).bind(...likeParams).all<MemoryRecord>();

  // Pass 2: supplement with top decay rows when keyword candidates are sparse
  let candidates = likeRows.results ?? [];
  if (candidates.length < Math.ceil(candidateLimit / 2)) {
    const decayParams: (number | string)[] = [userId];
    if (type) decayParams.push(type);
    decayParams.push(candidateLimit);

    const decayRows = await db.prepare(
      `SELECT * FROM memory
       WHERE user_id = ? AND valid_until IS NULL${typeClause}
       ORDER BY decay_score DESC LIMIT ?`
    ).bind(...decayParams).all<MemoryRecord>();

    const seen = new Set(candidates.map(r => r.id));
    for (const r of decayRows.results ?? []) {
      if (!seen.has(r.id)) { candidates.push(r); seen.add(r.id); }
    }
  }

  if (candidates.length === 0) return [];

  const queryEmb = await embed(query);

  const scored: HybridResult[] = [];
  for (const m of candidates) {
    const memEmb = deserializeEmbedding(m.embedding);
    const vectorScore = queryEmb && memEmb ? cosineSimilarity(queryEmb, memEmb) : 0;
    const kw = keywordOverlap(query, `${m.title} ${m.content}`);
    const keywordScore = Math.max(kw, m.title.toLowerCase().includes(query.toLowerCase()) ? 1.0 : 0);
    const ds = m.decay_score ?? 1.0;
    const importanceWeight = (m.importance ?? 5) / 10;
    const finalScore =
      (WEIGHT_VECTOR * vectorScore + WEIGHT_KEYWORD * keywordScore + WEIGHT_DECAY * ds) *
      importanceWeight;

    if (finalScore >= minFinalScore) {
      scored.push({ memory: m, vectorScore, keywordScore, decayScore: ds, finalScore });
    }
  }

  scored.sort((a, b) => b.finalScore - a.finalScore);
  return scored.slice(0, limit);
}

/** Pure semantic search — ignores keyword overlap, ranks only by vector + decay. */
export async function searchSemantic(
  db: D1Database,
  userId: number,
  query: string,
  opts: { limit?: number; type?: string } = {}
): Promise<HybridResult[]> {
  const { limit = 10, type } = opts;
  const typeClause = type ? ' AND type = ?' : '';
  const params: (number | string)[] = [userId];
  if (type) params.push(type);
  params.push(limit * 5);

  const rows = await db.prepare(
    `SELECT * FROM memory
     WHERE user_id = ? AND valid_until IS NULL AND embedding IS NOT NULL${typeClause}
     ORDER BY decay_score DESC LIMIT ?`
  ).bind(...params).all<MemoryRecord>();

  const queryEmb = await embed(query);
  if (!queryEmb) return [];

  const scored: HybridResult[] = [];
  for (const m of rows.results ?? []) {
    const memEmb = deserializeEmbedding(m.embedding);
    if (!memEmb) continue;
    const vectorScore = cosineSimilarity(queryEmb, memEmb);
    const ds = m.decay_score ?? 1.0;
    scored.push({
      memory: m,
      vectorScore,
      keywordScore: 0,
      decayScore: ds,
      finalScore: vectorScore * ((m.importance ?? 5) / 10),
    });
  }

  scored.sort((a, b) => b.finalScore - a.finalScore);
  return scored.slice(0, limit);
}
