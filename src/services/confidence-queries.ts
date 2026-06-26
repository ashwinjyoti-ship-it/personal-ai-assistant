import type { ConfidenceResult, ConfidenceSearchOpts, ConfidenceSearchResult } from '../types';
import { computeConfidence, confidenceTierLabel, confidenceSystemPromptSuffix } from './confidence';
import type { MemoryService } from './memory';

export type { ConfidenceSearchOpts, ConfidenceSearchResult };

export async function searchWithConfidence(
  memoryService: MemoryService,
  userId: number,
  query: string,
  opts: ConfidenceSearchOpts = {}
): Promise<ConfidenceSearchResult> {
  const {
    limit = 5,
    type,
    minConfidence = 0.0,
    returnAllAboveMin = false,
  } = opts;

  const hybridResults = await memoryService.searchHybrid(userId, query, { limit: limit * 3, type });

  if (hybridResults.length === 0) {
    return {
      results: [],
      overallConfidence: 'low',
      systemPromptSuffix: confidenceSystemPromptSuffix('low'),
      unmetQuery: query,
    };
  }

  const allMemories = await memoryService.getByDecayScore(userId, 0.3, { limit: 200 });

  const confidenceResults: ConfidenceResult[] = hybridResults.map(hr =>
    computeConfidence(hr, allMemories)
  );

  confidenceResults.sort((a, b) => b.confidence - a.confidence);

  const aboveThreshold = confidenceResults.filter(r => r.confidence >= minConfidence);
  const finalResults = returnAllAboveMin ? aboveThreshold : aboveThreshold.slice(0, limit);

  const avgConfidence = finalResults.length > 0
    ? finalResults.slice(0, 3).reduce((s, r) => s + r.confidence, 0) / Math.min(finalResults.length, 3)
    : 0;

  const overallConfidence: 'high' | 'medium' | 'low' =
    avgConfidence >= 0.80 ? 'high' :
    avgConfidence >= 0.40 ? 'medium' : 'low';

  return {
    results: finalResults,
    overallConfidence,
    systemPromptSuffix: confidenceSystemPromptSuffix(overallConfidence),
    unmetQuery: finalResults.length === 0 ? query : undefined,
  };
}

export function formatConfidenceContext(result: ConfidenceResult): string {
  const label = confidenceTierLabel(result.tier);
  const mem = result.memory;
  return `[${result.tier.toUpperCase()} ${Math.round(result.confidence * 100)}%] ${label} ${mem.content}`;
}

export function buildConfidenceContext(results: ConfidenceResult[]): string {
  if (results.length === 0) return '';
  return results.map(r => formatConfidenceContext(r)).join('\n');
}

export function generateUncertaintyResponse(query: string): string {
  return `I don't have reliable information about "${query}" in my memory. Here's how I can help find out:\n\n1. **Search the web** — I can look this up for you\n2. **Ask me more specifically** — narrowing the topic helps\n3. **Check my tools** — I can query other systems you've connected\n\nWhat would you like me to do?`;
}
