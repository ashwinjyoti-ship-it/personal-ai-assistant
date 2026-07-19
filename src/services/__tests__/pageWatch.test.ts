import { describe, expect, it } from 'vitest';
import {
  normalizeSnapshotText,
  sha256Hex,
  summarizeSnapshotChange,
} from '../pageWatch';

describe('normalizeSnapshotText', () => {
  it('collapses cosmetic whitespace so reflows do not register as changes', () => {
    const a = normalizeSnapshotText('Events\n\n   Concert  A \n\t Concert B  ');
    const b = normalizeSnapshotText('Events\nConcert A\nConcert B');
    expect(a).toBe(b);
  });
});

describe('sha256Hex', () => {
  it('is stable for equal input and differs for different input', async () => {
    expect(await sha256Hex('hello')).toBe(await sha256Hex('hello'));
    expect(await sha256Hex('hello')).not.toBe(await sha256Hex('hello!'));
    expect(await sha256Hex('hello')).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('summarizeSnapshotChange', () => {
  it('reports added and removed lines', () => {
    const oldText = 'Concert A\nConcert B\nConcert C';
    const newText = 'Concert A\nConcert C\nConcert D — ON SALE';
    const summary = summarizeSnapshotChange(oldText, newText);
    expect(summary).toContain('Concert D — ON SALE');
    expect(summary).toContain('Concert B');
    expect(summary).toMatch(/New:/);
    expect(summary).toMatch(/Gone:/);
  });

  it('truncates long line lists instead of dumping everything', () => {
    const oldText = '';
    const newText = Array.from({ length: 12 }, (_, i) => `Item ${i}`).join('\n');
    const summary = summarizeSnapshotChange(oldText, newText);
    expect(summary).toContain('(+7 more)');
  });

  it('falls back to a rearrangement message when line sets are identical', () => {
    const summary = summarizeSnapshotChange('a\nb', 'b\na');
    expect(summary).toContain('rearranged');
  });
});
