// Federation layer: Karna ↔ Eddy memory-wrapped tool call.
// Decision logic: answer from memory (confidence ≥ 0.40) OR call Eddy → save result → answer.

import { eddyRecall, type EddyRecallResponse } from './eddy-client';
import type { MemoryService } from './memory';

export interface FederationResult {
  answer: string;
  source: 'memory' | 'eddy' | 'uncertain';
  confidence: number;
  eddyResponse?: EddyRecallResponse;
  memorySaved: boolean;
  error?: string;
}

export async function answerWithFederation(
  memoryService: MemoryService,
  userId: number,
  query: string,
  options?: { forceToolCall?: boolean }
): Promise<FederationResult> {
  const { forceToolCall = false } = options ?? {};

  const confidenceResult = await memoryService.searchWithConfidence(userId, query, { limit: 5 });
  const hasAcceptableConfidence =
    confidenceResult.overallConfidence === 'high' || confidenceResult.overallConfidence === 'medium';
  const hasResults = confidenceResult.results.length > 0;

  if (hasAcceptableConfidence && hasResults && !forceToolCall) {
    const { buildConfidenceContext } = await import('./confidence-queries');
    return {
      answer: buildConfidenceContext(confidenceResult.results),
      source: 'memory',
      confidence: confidenceResult.results[0]?.confidence ?? 0.5,
      memorySaved: false,
    };
  }

  const eddyResult = await eddyRecall({ query });

  if (!eddyResult.success) {
    if (hasResults) {
      const { buildConfidenceContext } = await import('./confidence-queries');
      return {
        answer: buildConfidenceContext(confidenceResult.results) +
          '\n\n*[Note: I tried Eddy\'s records for more detail but couldn\'t reach it.]*',
        source: 'memory',
        confidence: confidenceResult.results[0]?.confidence ?? 0.3,
        memorySaved: false,
        error: eddyResult.error,
      };
    }
    return {
      answer: `I don't have this in memory, and couldn't reach Eddy's records (${eddyResult.error}). Try checking Eddy directly.`,
      source: 'uncertain',
      confidence: 0.0,
      memorySaved: false,
      error: eddyResult.error,
    };
  }

  let memorySaved = false;
  try {
    if (eddyResult.showName) {
      await memoryService.storeTyped({
        userId,
        type: 'episodic',
        title: `${eddyResult.showName} — gear used`,
        content: formatEddyContent(eddyResult),
        occurredAt: eddyResult.date ?? new Date().toISOString(),
        source: 'tool:eddy',
        entities: [
          eddyResult.showName,
          ...(eddyResult.gear ?? []).map(g => g.model),
          ...(eddyResult.crew ?? []).map(c => c.name),
        ].filter(Boolean) as string[],
        tier: 'long_term',
      });
      memorySaved = true;
    }
  } catch (err) {
    console.warn('[federation] Failed to save Eddy response to memory:', err);
  }

  return {
    answer: formatEddyAnswer(eddyResult),
    source: 'eddy',
    confidence: 1.0,
    eddyResponse: eddyResult,
    memorySaved,
  };
}

function formatEddyContent(result: EddyRecallResponse): string {
  const parts: string[] = [];
  if (result.showName) parts.push(`Show: ${result.showName}`);
  if (result.date) parts.push(`Date: ${result.date}`);
  if (result.venue) parts.push(`Venue: ${result.venue}`);
  if (result.gear?.length) {
    parts.push(`Gear: ${result.gear.map(g => `${g.qty}x ${g.model} (${g.type})`).join(', ')}`);
  }
  if (result.crew?.length) {
    parts.push(`Crew: ${result.crew.map(c => `${c.name} (${c.role})`).join(', ')}`);
  }
  if (result.notes) parts.push(`Notes: ${result.notes}`);
  return parts.join('\n');
}

function formatEddyAnswer(result: EddyRecallResponse): string {
  if (!result.success || !result.showName) {
    return `I checked Eddy's records but couldn't find anything matching that query.`;
  }
  const parts: string[] = [];
  parts.push(`**${result.showName}** (${result.date ?? 'date unknown'})`);
  if (result.venue) parts.push(`at ${result.venue}`);
  parts.push('');
  if (result.gear?.length) {
    parts.push(`**Gear used:**`);
    for (const g of result.gear) {
      parts.push(`- ${g.qty}× ${g.model} (${g.type})${g.notes ? ` — ${g.notes}` : ''}`);
    }
  }
  if (result.crew?.length) {
    parts.push(`**Crew:** ${result.crew.map(c => `${c.name} (${c.role})`).join(', ')}`);
  }
  if (result.notes) parts.push(`_Notes: ${result.notes}_`);
  parts.push(`\n_[Source: Eddy — ${result.source}]_`);
  return parts.join('\n');
}
