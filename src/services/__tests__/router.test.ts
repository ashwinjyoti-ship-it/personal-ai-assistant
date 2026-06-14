import { describe, it, expect } from 'vitest';
import {
  classifyIntentFast,
  detectDeterministicOp,
  extractPurchaseProduct,
  buildPurchaseGmailQuery,
} from '../router';

describe('classifyIntentFast — essay and Drive saves', () => {
  it('routes "write an essay and store to drive" to multi agent', () => {
    const route = classifyIntentFast('Write an essay on climate change and store it to Google Drive');
    expect(route.agent).toBe('multi');
    expect(route.confidence).toBeGreaterThanOrEqual(0.85);
  });

  it('routes "save to drive" without write keyword to multi agent', () => {
    const route = classifyIntentFast('Store this essay to my drive please');
    expect(route.agent).toBe('multi');
  });

  it('routes plain essay request to multi agent', () => {
    const route = classifyIntentFast('Write an essay about friendship');
    expect(route.agent).toBe('multi');
  });
});

describe('classifyIntentFast — research follow-ups', () => {
  it('routes short follow-up to multi when recent conversation used research', () => {
    const recentConversation = [
      'Do deep research on pencil vs pen for drawing',
      '[TOOLS_USED: research] Pencils offer erasability and tonal range; pens give permanence and line consistency.',
    ].join('\n');
    const route = classifyIntentFast('So pencil is superior?', undefined, recentConversation);
    expect(route.agent).toBe('multi');
    expect(route.reasoning).toContain('follow-up');
  });

  it('routes plain greeting to conversation when no prior research context', () => {
    const route = classifyIntentFast('So pencil is superior?');
    expect(route.agent).toBe('conversation');
  });

  it('routes long follow-up to multi when recent conversation used research', () => {
    const recentConversation = [
      'Do deep research on pencil vs pen for drawing',
      '[TOOLS_USED: research] Pencils offer erasability and tonal range; pens give permanence and line consistency.',
    ].join('\n');
    const route = classifyIntentFast(
      'Can you elaborate on the second point about tonal range and why that matters for sketching?',
      undefined,
      recentConversation,
    );
    expect(route.agent).toBe('multi');
    expect(route.reasoning).toContain('Research thread follow-up');
  });
});

describe('Gmail purchase lookup — deterministic dispatch', () => {
  const readingGlassesMsg =
    'I had purchased a pair of reading glasses recently. Can you find a recent relevant gmail confirming the purchase and give me date of Email?';

  it('extracts product from purchase message', () => {
    expect(extractPurchaseProduct(readingGlassesMsg)).toBe('reading glasses');
  });

  it('builds product-focused Gmail query', () => {
    expect(buildPurchaseGmailQuery('reading glasses')).toBe(
      '("reading glasses" OR glasses) newer_than:180d'
    );
  });

  it('dispatches gmail_search tier-1 for purchase confirmation lookup', () => {
    const op = detectDeterministicOp(readingGlassesMsg);
    expect(op?.tool).toBe('gmail_search');
    expect(op?.args.query).toContain('reading glasses');
    expect(op?.args.product_hint).toBe('reading glasses');
    expect(op?.args.max_results).toBe(15);
  });
});
