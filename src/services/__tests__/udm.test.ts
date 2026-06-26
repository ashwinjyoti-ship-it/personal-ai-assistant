import { describe, it, expect } from 'vitest';
import { normalizeUdmMarkdown } from '../udm';

describe('normalizeUdmMarkdown', () => {
  it('converts --- between paragraphs to blank line separation', () => {
    const input = 'First paragraph.\n---\nSecond paragraph.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe('First paragraph.\n\nSecond paragraph.');
  });

  it('converts single-newline essay lines to double-newline paragraphs', () => {
    const input = 'First sentence.\nSecond sentence.\nThird sentence.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe('First sentence.\n\nSecond sentence.\n\nThird sentence.');
  });

  it('joins soft-wrapped lines within a paragraph', () => {
    const input = 'This is a long paragraph that\nwraps across multiple lines\nbefore ending here.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe(
      'This is a long paragraph that wraps across multiple lines before ending here.'
    );
  });

  it('preserves {{database:ID|Title}} embed markers', () => {
    const input = 'Intro text.\n{{database:abc123|My DB}}\nMore text.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toContain('{{database:abc123|My DB}}');
    expect(result).toBe('Intro text.\n\n{{database:abc123|My DB}}\n\nMore text.');
  });

  it('preserves headings and bullet lists', () => {
    const input = '## Section\n- Item one\n- Item two\n\nBody paragraph.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toContain('## Section');
    expect(result).toContain('- Item one');
    expect(result).toContain('- Item two');
    expect(result).toContain('Body paragraph.');
  });

  it('does not over-split when double newlines already exist', () => {
    const input = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe(input);
  });

  it('collapses three or more consecutive newlines', () => {
    const input = 'First.\n\n\n\nSecond.';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe('First.\n\nSecond.');
  });

  it('strips leading and trailing horizontal rules', () => {
    const input = '---\nFirst paragraph.\n---';
    const result = normalizeUdmMarkdown(input);
    expect(result).toBe('First paragraph.');
  });
});
