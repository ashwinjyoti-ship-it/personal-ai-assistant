// Research Engine — Deep web research with synthesized reports
// Opus 4.8 + Tavily when keys available; DuckDuckGo + LLM synthesis fallback

import type { LLMProvider } from '../types';
import { webSearch, type WebSearchResult } from './google-apis';

const MAX_PAGE_CHARS = 15000;
const FETCH_TIMEOUT_MS = 15000;
const TAVILY_TIMEOUT_MS = 15000;
const OPUS_TIMEOUT_MS = 60000;

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

    if (!res.ok) {
      return { text: '', error: `HTTP ${res.status}` };
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml')) {
      return { text: '', error: `Non-HTML content: ${contentType.split(';')[0]}` };
    }

    const rawHtml = await res.text();
    clearTimeout(timeout);
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

function htmlToText(html: string): string {
  let text = html;
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  text = text.replace(/<header[\s\S]*?<\/header>/gi, '');
  text = text.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi, '\n');
  text = text.replace(/<li[^>]*>/gi, '\n• ');
  text = text.replace(/<[^>]+>/g, '');
  text = text
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n/g, '\n\n');
  text = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
  return text.trim();
}

export interface ResearchResult {
  report: string;
  sources: { title: string; url: string }[];
  pagesRead: number;
  error?: string;
}

export type TavilyResult = {
  url: string;
  title: string;
  content: string;
  raw_content: string | null;
  score: number;
};

async function searchViaTavily(
  query: string,
  tavilyKey: string,
  depth: 'quick' | 'thorough'
): Promise<{ results: TavilyResult[]; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TAVILY_TIMEOUT_MS);
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: tavilyKey,
        query,
        search_depth: depth === 'quick' ? 'basic' : 'advanced',
        include_raw_content: true,
        max_results: depth === 'quick' ? 7 : 5,
      }),
    });
    clearTimeout(timer);
    if (!res.ok) {
      return { results: [], error: `Tavily error ${res.status}` };
    }
    const data = await res.json() as { results?: TavilyResult[] };
    return { results: data.results || [] };
  } catch (err: any) {
    clearTimeout(timer);
    const msg = err.name === 'AbortError' ? 'Timeout' : err.message;
    console.warn('[searchViaTavily]', msg);
    return { results: [], error: msg };
  }
}

async function callOpus(
  anthropicKey: string,
  system: string,
  user: string,
  maxTokens: number
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPUS_TIMEOUT_MS);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-8',
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: user }],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) {
      let detail = `Opus API error ${res.status}`;
      if (res.status === 401) detail = 'Opus API error 401: invalid or expired Anthropic API key';
      else if (res.status === 404) detail = 'Opus API error 404: model not found — check the model ID';
      else if (res.status === 529) detail = 'Opus API error 529: Anthropic API overloaded';
      throw new Error(detail);
    }
    const data = await res.json() as { content?: Array<{ text?: string }> };
    return data.content?.[0]?.text || '';
  } catch (err: any) {
    clearTimeout(timer);
    throw err;
  }
}

function parseJsonArray(text: string, fallback: string[]): string[] {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return fallback;
    const parsed = JSON.parse(match[0]);
    if (Array.isArray(parsed) && parsed.every(x => typeof x === 'string')) {
      return parsed.filter(Boolean);
    }
  } catch { /* use fallback */ }
  return fallback;
}

async function getPageContent(result: TavilyResult): Promise<string> {
  if (result.raw_content && result.raw_content.length > 100) {
    return result.raw_content.slice(0, 15000);
  }
  const fetched = await fetchPageContent(result.url, 15000);
  return fetched.text;
}

async function researchViaOpus(
  query: string,
  anthropicKey: string,
  tavilyKey: string | null,
  depth: 'quick' | 'thorough',
  searchFallback: (q: string, n: number) => Promise<WebSearchResult[]>
): Promise<{ report: string; sources: { url: string; title: string }[]; pagesRead: number }> {
  const sources: { url: string; title: string }[] = [];

  async function searchAndFetch(q: string, n: number, mode: 'quick' | 'thorough') {
    let tavilyResults: TavilyResult[] = [];
    if (tavilyKey) {
      const tavily = await searchViaTavily(q, tavilyKey, mode);
      tavilyResults = tavily.results;
    }
    if (tavilyResults.length === 0) {
      const fallback = await searchFallback(q, n);
      tavilyResults = fallback.map(r => ({
        url: r.link,
        title: r.title,
        content: r.snippet,
        raw_content: null,
        score: 0,
      }));
    }
    const fetched = await Promise.all(
      tavilyResults.map(async (r) => ({
        result: r,
        content: await getPageContent(r),
      }))
    );
    return fetched.filter(f => f.content.length > 50);
  }

  if (depth === 'quick') {
    const pages = await searchAndFetch(query, 7, 'quick');
    let corpus = '';
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      const block = `[${i + 1}] ${p.result.title}\n${p.result.url}\n\n${p.content}\n\n`;
      if (corpus.length + block.length > 80000) break;
      corpus += block;
      sources.push({ url: p.result.url, title: p.result.title });
    }

    const report = await callOpus(
      anthropicKey,
      'You are an expert research analyst. Write a clear, accurate, well-structured report answering the query based on provided sources. Cite sources as [1], [2] etc. Be precise and factual.',
      `Query: ${query}\n\nSources:\n${corpus}`,
      2048
    );

    return { report, sources, pagesRead: pages.length };
  }

  // === THOROUGH MODE ===
  const planRaw = await callOpus(
    anthropicKey,
    'You are a research planning expert.',
    `I need to research: ${query}\n\nGenerate exactly 4-5 specific sub-queries that together cover all important angles (definition, current state, comparisons, recent developments, expert analysis). Return ONLY a JSON array of strings, nothing else.`,
    400
  );
  const subQueries = parseJsonArray(planRaw, [
    query,
    `${query} overview`,
    `${query} examples`,
    `${query} latest`,
  ]).slice(0, 5);

  const fanOut = await Promise.all(subQueries.map(sq => searchAndFetch(sq, 5, 'thorough')));
  const seenUrls = new Set<string>();
  const allPages: Array<{ result: TavilyResult; content: string }> = [];
  for (const batch of fanOut) {
    for (const p of batch) {
      if (seenUrls.has(p.result.url) || allPages.length >= 20) continue;
      seenUrls.add(p.result.url);
      allPages.push(p);
    }
  }

  let corpus = '';
  for (let i = 0; i < allPages.length; i++) {
    const p = allPages[i];
    const block = `[${i + 1}] ${p.result.title}\n${p.result.url}\n\n${p.content}\n\n`;
    if (corpus.length + block.length > 180000) break;
    corpus += block;
    sources.push({ url: p.result.url, title: p.result.title });
  }

  const gapRaw = await callOpus(
    anthropicKey,
    'You are a research analyst identifying information gaps.',
    `I'm researching: ${query}\n\nHere's what I've found so far:\n${corpus.slice(0, 60000)}\n\nIdentify 2-3 specific information gaps or important angles not yet covered. Return ONLY a JSON array of follow-up search queries.`,
    300
  );
  const gapQueries = parseJsonArray(gapRaw, []).slice(0, 3);

  if (gapQueries.length > 0) {
    let added = 0;
    const gapBatches = await Promise.all(gapQueries.map(gq => searchAndFetch(gq, 4, 'thorough')));
    for (const batch of gapBatches) {
      for (const p of batch) {
        if (added >= 5 || seenUrls.has(p.result.url)) continue;
        seenUrls.add(p.result.url);
        const idx = sources.length + 1;
        const block = `[${idx}] ${p.result.title}\n${p.result.url}\n\n${p.content}\n\n`;
        if (corpus.length + block.length > 180000) break;
        corpus += block;
        sources.push({ url: p.result.url, title: p.result.title });
        allPages.push(p);
        added++;
      }
    }
  }

  const report = await callOpus(
    anthropicKey,
    `You are an expert research analyst producing a comprehensive report. Use this exact structure:
**Executive Summary** (2-3 sentences)
**Key Findings** (bullet points with citations)
**Detailed Analysis** (multiple paragraphs with citations)
**Conflicting Information** (if sources disagree, note explicitly — omit this section if no conflicts)
**Sources** (numbered list of URLs)
Cite sources as [1], [2] etc. Be thorough, precise, and objective.`,
    `Research query: ${query}\n\nSources:\n${corpus}`,
    4096
  );

  return { report, sources, pagesRead: allPages.length };
}

export async function conductResearch(
  query: string,
  provider: LLMProvider,
  options: {
    maxPages?: number;
    maxResults?: number;
    site?: string;
    depth?: 'quick' | 'thorough';
    anthropicKey?: string;
    tavilyKey?: string | null;
    googleApiKey?: string;
    googleCseId?: string;
  } = {}
): Promise<ResearchResult> {
  const depth = options.depth || 'quick';

  const searchFallback = async (q: string, n: number): Promise<WebSearchResult[]> => {
    const searchResult = await webSearch(q, {
      num: n,
      site: options.site,
      googleApiKey: options.googleApiKey,
      googleCseId: options.googleCseId,
    });
    return searchResult.results || [];
  };

  let opusError: string | undefined;
  if (options.anthropicKey) {
    try {
      const opusResult = await researchViaOpus(
        query,
        options.anthropicKey,
        options.tavilyKey || null,
        depth,
        searchFallback
      );
      if (opusResult.report.trim()) {
        return {
          report: opusResult.report,
          sources: opusResult.sources.map(s => ({ title: s.title, url: s.url })),
          pagesRead: opusResult.pagesRead,
        };
      }
    } catch (err: any) {
      opusError = err.message;
      console.warn('[conductResearch] Opus path failed:', err.message);
    }
  }

  // Tavily + LLM synthesis when Tavily key is set but Opus path unavailable
  if (options.tavilyKey) {
    try {
      const tavily = await searchViaTavily(query, options.tavilyKey, depth);
      if (tavily.results.length > 0) {
        const maxPages = depth === 'thorough' ? 8 : 5;
        const pages = await Promise.all(
          tavily.results.slice(0, maxPages).map(async (r) => ({
            result: r,
            content: await getPageContent(r),
          }))
        );
        const successful = pages.filter(p => p.content.length > 50);
        const sources = successful.map(p => ({ title: p.result.title, url: p.result.url }));

        if (successful.length > 0) {
          const pageContext = successful
            .map((p, i) => `--- SOURCE ${i + 1}: ${p.result.title} ---\n${p.content}\n--- END SOURCE ${i + 1} ---`)
            .join('\n\n');
          const report = await synthesizeReport(query, pageContext, provider, 'full');
          return { report, sources, pagesRead: successful.length };
        }

        const snippetContext = tavily.results
          .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}\nSource: ${r.url}`)
          .join('\n\n');
        const report = await synthesizeReport(query, snippetContext, provider, 'snippets');
        return {
          report,
          sources: tavily.results.map(r => ({ title: r.title, url: r.url })),
          pagesRead: 0,
        };
      }
    } catch (err: any) {
      console.warn('[conductResearch] Tavily path failed:', err.message);
    }
  }

  const maxPages = options.maxPages || (depth === 'thorough' ? 5 : 3);
  const maxResults = options.maxResults || (depth === 'thorough' ? 8 : 5);

  const searchResult = await webSearch(query, {
    num: maxResults,
    site: options.site,
    googleApiKey: options.googleApiKey,
    googleCseId: options.googleCseId,
  });

  if (searchResult.error) {
    const detail = opusError ? ` (Opus: ${opusError})` : '';
    return { report: '', sources: [], pagesRead: 0, error: `Search failed: ${searchResult.error}${detail}` };
  }

  if (searchResult.results.length === 0) {
    return { report: `No web results found for "${query}".`, sources: [], pagesRead: 0 };
  }

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
  const successfulPages = pages.filter(p => p.content.length > 50);

  if (successfulPages.length === 0) {
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

  const pageContext = successfulPages
    .map((p, i) => `--- SOURCE ${i + 1}: ${p.title} (${p.displayLink}) ---\n${p.content}\n--- END SOURCE ${i + 1} ---`)
    .join('\n\n');

  const report = await synthesizeReport(query, pageContext, provider, 'full');

  return {
    report,
    sources: successfulPages.map(p => ({ title: p.title, url: p.url })),
    pagesRead: successfulPages.length,
  };
}

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
      { temperature: 0.3, maxTokens: 2048 }
    );

    return response.content || 'Research synthesis failed — no response from LLM.';
  } catch (err: any) {
    return `Research synthesis error: ${err.message}. Raw search results were found but could not be analyzed.`;
  }
}
