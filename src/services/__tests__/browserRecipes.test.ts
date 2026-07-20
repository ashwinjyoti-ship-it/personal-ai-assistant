import { describe, expect, it } from 'vitest';
import { validateRecipeSteps, MAX_RECIPE_STEPS } from '../browserRecipes';

const goodSteps = [
  { action: 'goto', url: 'https://news.ycombinator.com' },
  { action: 'wait', selector: '.athing' },
  { action: 'extract_list', selector: '.athing .titleline > a', label: 'headlines', limit: 5 },
];

describe('validateRecipeSteps', () => {
  it('accepts a well-formed recipe', () => {
    const res = validateRecipeSteps(goodSteps);
    expect('steps' in res && res.steps.length).toBe(3);
  });

  it('rejects non-arrays and empty arrays', () => {
    expect(validateRecipeSteps('not an array')).toHaveProperty('error');
    expect(validateRecipeSteps([])).toHaveProperty('error');
  });

  it('rejects unknown actions with an actionable message', () => {
    const res = validateRecipeSteps([{ action: 'hack', url: 'https://x.com' }]);
    expect('error' in res && res.error).toMatch(/unknown action "hack"/);
  });

  it('rejects non-http(s) goto urls', () => {
    const res = validateRecipeSteps([
      { action: 'goto', url: 'file:///etc/passwd' },
      { action: 'extract_text', selector: 'body' },
    ]);
    expect('error' in res && res.error).toMatch(/http\(s\)/);
  });

  it('requires the first step to be a goto', () => {
    const res = validateRecipeSteps([
      { action: 'extract_text', selector: 'body' },
    ]);
    expect('error' in res && res.error).toMatch(/first step must be a goto/);
  });

  it('requires at least one extract step', () => {
    const res = validateRecipeSteps([
      { action: 'goto', url: 'https://example.com' },
      { action: 'click', selector: 'a' },
    ]);
    expect('error' in res && res.error).toMatch(/extract/);
  });

  it('caps step count and wait durations', () => {
    const tooMany = Array.from({ length: MAX_RECIPE_STEPS + 1 }, () => ({ action: 'wait', ms: 10 }));
    expect(validateRecipeSteps(tooMany)).toHaveProperty('error');
    const res = validateRecipeSteps([
      { action: 'goto', url: 'https://example.com' },
      { action: 'wait', ms: 999999 },
      { action: 'extract_text', selector: 'body' },
    ]);
    expect('error' in res && res.error).toMatch(/0-15000/);
  });

  it('names the failing step in errors', () => {
    const res = validateRecipeSteps([
      { action: 'goto', url: 'https://example.com' },
      { action: 'fill', selector: '' },
    ]);
    expect('error' in res && res.error).toMatch(/step 2/);
  });
});
