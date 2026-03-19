// Research Engine — Deep web research with synthesized reports
// Flow: Search → Fetch pages → Extract text → Synthesize via LLM
// Returns compiled reports instead of raw links

import type { LLMProvider } from '../types';
import { webSearch } from './google-apis';

// === Page Content Fetcher ===
// Fetches a URL and extracts readable text content (strips HTML, scripts, styles)
const MAX_PAGE_CHARS = 10000; // ~2.5K tokens per page — paid Workers plan allows deeper reads
const FETCH_TIMEOUT_MS = 10000; // 10 second timeout per page

export async function fetchPageContent(url: string, maxChars?: number): Promise<{ text: string; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return { text: '', error: `HTTP ${res.status}` };
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml')) {
      return { text: '', error: `Non-HTML content: ${contentType.split(';')[0]}` };
    }

    const rawHtml = await res.text();
    // Cap HTML at 200KB before regex processing — framework homepages can be 300-800KB,
    // and htmlToText runs 15+ regex passes on the full string, hitting Cloudflare CPU limits.
    const html = rawHtml.length > 200_000 ? rawHtml.substring(0, 200_000) : rawHtml;
    const text = htmlToText(html);

    if (text.length < 50) {
      return { text: '', error: 'Page has too little readable content' };
    }

    return { text: text.substring(0, maxChars || MAX_PAGE_CHARS) };
  } catch (err: any) {
    const msg = err.name === 'AbortError' ? 'Timeout' : err.message;
    return { text: '', error: msg };
  }
}

// === HTML to Text Converter ===
// Strips HTML tags, scripts, styles, nav, footer; preserves paragraph structure
function htmlToText(html: string): string {
  let text = html;

  // Remove script, style, nav, footer, header, aside blocks entirely
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  text = text.replace(/<header[\s\S]*?<\/header>/gi, '');
  text = text.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Convert common block elements to newlines
  text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi, '\n');
  // Convert list items to bullet points
  text = text.replace(/<li[^>]*>/gi, '\n• ');

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  text = text
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));

  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' ');           // collapse horizontal whitespace
  text = text.replace(/\n\s*\n/g, '\n\n');        // collapse multiple blank lines
  text = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');

  return text.trim();
}

// === Research Engine ===
// Searches the web, fetches top pages, and synthesizes a report

export interface ResearchResult {
  report: string;
  sources: { title: string; url: string }[];
  pagesRead: number;
  error?: string;
}

export async function conductResearch(
  query: string,
  provider: LLMProvider,
  options: { maxPages?: number; maxResults?: number; site?: string; depth?: 'quick' | 'thorough' } = {}
): Promise<ResearchResult> {
  const maxPages = options.maxPages || (options.depth === 'thorough' ? 5 : 3);
  const maxResults = options.maxResults || (options.depth === 'thorough' ? 8 : 5);

  // Step 1: Search the web
  const searchResult = await webSearch(query, { num: maxResults, site: options.site });

  if (searchResult.error) {
    return { report: '', sources: [], pagesRead: 0, error: `Search failed: ${searchResult.error}` };
  }

  if (searchResult.results.length === 0) {
    return { report: `No web results found for "${query}".`, sources: [], pagesRead: 0 };
  }

  // Step 2: Fetch content from top pages (in parallel, with limits)
  const pagesToFetch = searchResult.results.slice(0, maxPages);
  const fetchPromises = pagesToFetch.map(async (result) => {
    const content = await fetchPageContent(result.link);
    return {
      title: result.title,
      url: result.link,
      displayLink: result.displayLink,
      snippet: result.snippet,
      content: content.text,
      error: content.error,
    };
  });

  const pages = await Promise.all(fetchPromises);

  // Filter to pages that actually have content
  const successfulPages = pages.filter(p => p.content.length > 50);

  if (successfulPages.length === 0) {
    // Fallback: use snippets from search results if pages couldn't be fetched
    const snippetContext = searchResult.results
      .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.link}`)
      .join('\n\n');

    const fallbackReport = await synthesizeReport(query, snippetContext, provider, 'snippets');
    return {
      report: fallbackReport,
      sources: searchResult.results.map(r => ({ title: r.title, url: r.link })),
      pagesRead: 0,
    };
  }

  // Step 3: Build context from fetched pages
  const pageContext = successfulPages
    .map((p, i) => `--- SOURCE ${i + 1}: ${p.title} (${p.displayLink}) ---\n${p.content}\n--- END SOURCE ${i + 1} ---`)
    .join('\n\n');

  // Step 4: Synthesize report via LLM
  const report = await synthesizeReport(query, pageContext, provider, 'full');

  return {
    report,
    sources: successfulPages.map(p => ({ title: p.title, url: p.url })),
    pagesRead: successfulPages.length,
  };
}

// === Report Synthesizer ===
// Sends collected page content + the research question to the LLM for synthesis
async function synthesizeReport(
  query: string,
  context: string,
  provider: LLMProvider,
  mode: 'full' | 'snippets'
): Promise<string> {
  const contextNote = mode === 'full'
    ? 'I have fetched and read the full content of several web pages related to the research query.'
    : 'I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation.';

  const systemPrompt = `You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${contextNote}

Instructions:
- Analyze ALL the source material provided below
- Write a clear, well-structured report answering the research query
- Include specific facts, numbers, and details from the sources
- Note any conflicting information between sources
- End with a brief conclusion or recommendation
- Cite sources by number [1], [2], etc.
- Keep the report concise but thorough — aim for 400-800 words
- Do NOT make up information not found in the sources
- If the sources don't adequately answer the query, say so honestly`;

  const userPrompt = `Research query: "${query}"

Source material:
${context}

Write a synthesized research report answering the query above.`;

  try {
    const response = await provider.chat(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.3, maxTokens: 2048 }  // Lower temperature for factual reports
    );

    return response.content || 'Research synthesis failed — no response from LLM.';
  } catch (err: any) {
    return `Research synthesis error: ${err.message}. Raw search results were found but could not be analyzed.`;
  }
}
