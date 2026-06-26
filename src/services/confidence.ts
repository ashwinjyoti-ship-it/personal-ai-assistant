import type { HybridResult } from './retrieval';
import type { MemoryRecord } from '../types';
import type { ConfidenceResult } from '../types';

const SOURCE_TRUST: Record<string, number> = {
  'user': 1.00,
  'tool:eddy': 0.85,
  'inferred:compression': 0.70,
  'inferred': 0.50,
  'default': 0.70,
};

export const WEIGHT_RETRIEVAL = 0.40;
export const WEIGHT_DECAY = 0.25;
export const WEIGHT_SOURCE = 0.20;
export const WEIGHT_CORROBORATION = 0.15;
export const CORROBORATION_CAP = 5;

export function getSourceTrust(source: string | undefined): number {
  if (!source) return SOURCE_TRUST['default'];
  return SOURCE_TRUST[source] ?? SOURCE_TRUST['default'];
}

export function computeRetrievalSimilarity(hybridResult: HybridResult): number {
  return hybridResult.vectorScore * 0.55 + hybridResult.keywordScore * 0.25;
}

export function countCorroboration(memory: MemoryRecord, allMemories: MemoryRecord[]): number {
  const memoryEntities = JSON.parse(memory.entities || '[]') as string[];
  if (memoryEntities.length === 0) return 0;

  let count = 0;
  for (const other of allMemories) {
    if (other.id === memory.id) continue;
    const otherEntities = JSON.parse(other.entities || '[]') as string[];
    for (const e of memoryEntities) {
      if (otherEntities.includes(e)) {
        count++;
        break;
      }
    }
    if (count >= CORROBORATION_CAP) break;
  }
  return count;
}

export function computeConfidence(
  hybridResult: HybridResult,
  allMemories: MemoryRecord[]
): ConfidenceResult {
  const { memory } = hybridResult;

  const retrieval_similarity = computeRetrievalSimilarity(hybridResult);
  const decay_score = hybridResult.decayScore;
  const source_trust = getSourceTrust(memory.source);
  const corroboration_count = countCorroboration(memory, allMemories);
  const corroboration_normalized = Math.min(corroboration_count / CORROBORATION_CAP, 1.0);

  const confidence =
    WEIGHT_RETRIEVAL * retrieval_similarity +
    WEIGHT_DECAY * decay_score +
    WEIGHT_SOURCE * source_trust +
    WEIGHT_CORROBORATION * corroboration_normalized;

  const tier: 'high' | 'medium' | 'low' =
    confidence >= 0.80 ? 'high' :
    confidence >= 0.40 ? 'medium' : 'low';

  const reasoning = buildReasoning({
    confidence,
    retrieval_similarity,
    decay_score,
    source_trust,
    corroboration_count,
    source: memory.source,
    title: memory.title,
  });

  return {
    memory,
    confidence,
    breakdown: {
      retrieval_similarity,
      decay_score,
      source_trust,
      corroboration_count,
      corroboration_normalized,
    },
    reasoning,
    tier,
  };
}

function buildReasoning(args: {
  confidence: number;
  retrieval_similarity: number;
  decay_score: number;
  source_trust: number;
  corroboration_count: number;
  source?: string;
  title: string;
}): string {
  const { confidence, retrieval_similarity, decay_score, source_trust, corroboration_count } = args;

  const parts: string[] = [];

  if (retrieval_similarity > 0.7) parts.push('strong semantic match');
  else if (retrieval_similarity > 0.4) parts.push('moderate semantic match');
  else parts.push('weak semantic match');

  if (decay_score > 0.8) parts.push('recently accessed');
  else if (decay_score > 0.5) parts.push('moderately recent');
  else if (decay_score < 0.2) parts.push('not accessed recently');

  if (source_trust >= 1.0) parts.push('from user direct input');
  else if (source_trust >= 0.8) parts.push('from trusted tool');
  else if (source_trust < 0.6) parts.push('inferred by Karna');

  if (corroboration_count >= 3) parts.push(`${corroboration_count} corroborating memories`);
  else if (corroboration_count === 1) parts.push('1 corroborating memory');
  else parts.push('no corroborating memories');

  return `${Math.round(confidence * 100)}% confidence: ${parts.join('; ')}.`;
}

export function confidenceTierLabel(tier: 'high' | 'medium' | 'low'): string {
  switch (tier) {
    case 'high': return "I'm confident that";
    case 'medium': return 'Based on what I recall';
    case 'low': return "I'm not sure about this, but";
  }
}

export function confidenceSystemPromptSuffix(tier: 'high' | 'medium' | 'low'): string {
  switch (tier) {
    case 'high': return '\n\n[Memory confidence: high — answer directly]';
    case 'medium': return '\n\n[Memory confidence: medium — acknowledge uncertainty in your response]';
    case 'low': return "\n\n[Memory confidence: low — indicate you don't have reliable information. Suggest how to find out.]";
  }
}
