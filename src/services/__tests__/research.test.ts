import { describe, it, expect } from 'vitest';
import { parseDuckDuckGoHtml } from '../google-apis';

describe('parseDuckDuckGoHtml', () => {
  it('returns empty for bot-challenge HTML', () => {
    const html = '<div class="anomaly-modal__title">Challenge</div>';
    expect(parseDuckDuckGoHtml(html, 5)).toEqual([]);
  });

  it('parses result blocks from POST-style DuckDuckGo HTML', () => {
    // Minimal fixture matching production markup
    const html = `
      <div class="result results_links">
        <a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.com%2Fpage">Example Title</a>
        <a class="result__snippet">A short snippet about the page.</a>
      </div>`;
    const results = parseDuckDuckGoHtml(html, 5);
    expect(results).toHaveLength(1);
    expect(results[0].link).toBe('https://example.com/page');
    expect(results[0].title).toBe('Example Title');
    expect(results[0].snippet).toContain('snippet');
  });
});
