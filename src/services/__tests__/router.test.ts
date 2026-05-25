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
