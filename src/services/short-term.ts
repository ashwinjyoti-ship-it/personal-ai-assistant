// Short-term memory manager with semantic compression.
// Clusters signals by topic similarity and summarizes overflowing windows.

import type { Signal } from '../types';
import type { MemoryService } from './memory';

const SHORT_TERM_TOKEN_BUDGET = 4000;
const APPROX_CHARS_PER_TOKEN = 4;
const KEEP_RECENT_SIGNALS = 5;

export interface ShortTermCompressionResult {
  compressedCount: number;
  summaryId: number;
  clusterCount: number;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

// Token-overlap Jaccard similarity between two signals
function topicSimilarity(a: Signal, b: Signal): number {
  const aTokens = new Set([...a.topic.split(/\s+/), ...(a.entities ?? [])]);
  const bTokens = new Set([...b.topic.split(/\s+/), ...(b.entities ?? [])]);
  if (aTokens.size === 0 && bTokens.size === 0) return 0;
  let intersect = 0;
  for (const t of aTokens) if (bTokens.has(t)) intersect++;
  return intersect / Math.max(aTokens.size, bTokens.size);
}

// Greedy clustering: group signals by topic similarity
export function clusterSignals(signals: Signal[], threshold = 0.3): Signal[][] {
  const clusters: Signal[][] = [];
  const assigned = new Set<number>();

  for (let i = 0; i < signals.length; i++) {
    if (assigned.has(i)) continue;
    const cluster = [signals[i]];
    assigned.add(i);
    for (let j = i + 1; j < signals.length; j++) {
      if (assigned.has(j)) continue;
      if (topicSimilarity(signals[i], signals[j]) >= threshold) {
        cluster.push(signals[j]);
        assigned.add(j);
      }
    }
    clusters.push(cluster);
  }
  return clusters;
}

function compressCluster(cluster: Signal[]): { title: string; content: string; entities: string[] } {
  const allEntities = cluster.flatMap(s => s.entities ?? []);
  const entityCounts = new Map<string, number>();
  for (const e of allEntities) entityCounts.set(e, (entityCounts.get(e) ?? 0) + 1);
  const topEntity = Array.from(entityCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
  const title = topEntity ?? cluster[0].topic;

  const contentParts = cluster.map(s => {
    const parts = s.raw_ref.split(':');
    return `[${parts[1] ?? '?'}/${parts[3] ?? '?'}]: ${s.topic}`;
  });
  const content =
    contentParts.join('\n') + `\n\n[${cluster.length} similar messages compressed into this summary]`;

  const uniqueEntities = [...new Set(allEntities)].slice(0, 10);
  return { title, content, entities: uniqueEntities };
}

export async function compressShortTermMemory(
  memoryService: MemoryService,
  db: D1Database,
  userId: number
): Promise<ShortTermCompressionResult> {
  // Fetch the most recent KEEP_RECENT_SIGNALS to exclude from compression
  const recentResult = await db.prepare(
    `SELECT id FROM signals WHERE user_id = ? ORDER BY occurred_at DESC LIMIT ?`
  ).bind(userId, KEEP_RECENT_SIGNALS).all<{ id: number }>();

  const recentIds = new Set((recentResult.results ?? []).map(r => r.id));

  // Fetch older signals (candidates for compression)
  let olderSignals: Signal[];
  if (recentIds.size === 0) {
    const r = await db.prepare(
      `SELECT * FROM signals WHERE user_id = ? ORDER BY occurred_at ASC`
    ).bind(userId).all<Signal>();
    olderSignals = r.results ?? [];
  } else {
    const placeholders = [...recentIds].map(() => '?').join(',');
    const r = await db.prepare(
      `SELECT * FROM signals WHERE user_id = ? AND id NOT IN (${placeholders}) ORDER BY occurred_at ASC`
    ).bind(userId, ...[...recentIds]).all<Signal>();
    olderSignals = r.results ?? [];
  }

  if (olderSignals.length === 0) {
    return { compressedCount: 0, summaryId: 0, clusterCount: 0 };
  }

  // Parse entities JSON (stored as string in DB)
  const signals: Signal[] = olderSignals.map(s => ({
    ...s,
    entities: typeof s.entities === 'string' ? JSON.parse(s.entities as unknown as string) : (s.entities ?? []),
  }));

  // Check if compression is needed
  const totalTokens = signals.reduce(
    (sum, s) => sum + estimateTokens(`${s.topic} ${(s.entities ?? []).join(' ')}`),
    0
  );

  if (totalTokens < SHORT_TERM_TOKEN_BUDGET) {
    return { compressedCount: 0, summaryId: 0, clusterCount: 0 };
  }

  const clusters = clusterSignals(signals);

  let compressedCount = 0;
  let lastSummaryId = 0;

  for (const cluster of clusters) {
    if (cluster.length < 2) continue;

    const { title, content, entities } = compressCluster(cluster);
    // Oldest in cluster (list is ASC order)
    const occurredAt = cluster[0].occurred_at;

    const summaryId = await memoryService.storeTyped({
      userId,
      type: 'episodic',
      title: `compressed: ${title}`,
      content,
      occurredAt,
      source: 'inferred:compression',
      entities,
      tier: 'long_term',
    });

    // Mark source conversations as superseded in their metadata
    for (const s of cluster) {
      await db.prepare(
        `UPDATE conversations SET metadata = json_set(COALESCE(metadata, '{}'), '$.superseded', datetime('now'))
         WHERE id = ? AND user_id = ?`
      ).bind(s.conversation_id, userId).run();
    }

    compressedCount += cluster.length;
    lastSummaryId = summaryId;
  }

  return { compressedCount, summaryId: lastSummaryId, clusterCount: clusters.length };
}

export async function getRecentSignals(
  db: D1Database,
  userId: number,
  limit = 20
): Promise<Signal[]> {
  const result = await db.prepare(
    `SELECT * FROM signals WHERE user_id = ? ORDER BY occurred_at DESC LIMIT ?`
  ).bind(userId, limit).all<Signal>();

  const rows = (result.results ?? []).reverse(); // chronological order
  // Parse entities JSON
  return rows.map(s => ({
    ...s,
    entities: typeof s.entities === 'string' ? JSON.parse(s.entities as unknown as string) : (s.entities ?? []),
  }));
}
