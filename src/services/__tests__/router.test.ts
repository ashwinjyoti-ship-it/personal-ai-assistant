import { describe, it, expect } from 'vitest';
import { classifyIntentFast } from '../router';

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
});
