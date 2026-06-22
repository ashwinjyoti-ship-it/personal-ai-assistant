// AI news section: Hacker News (Algolia) for AI-adjacent topics + DuckDuckGo/Google
// CSE web search for configured topics, with a 7-day per-user dedup table
// (briefing_seen_news, reused unchanged) so repeats don't resurface.

import type { DigestSection, DigestSectionItem } from '../../../types';

// Kept for backwards-compatible imports from this module path.
export interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
}
import { webSearch } from '../../google-apis';
import { emptySection, type SectionContext, type SectionFetcher } from './types';

const AI_TOPICS = [
  'AI',
  'LLM',
  'Agentic',
  'artificial intelligence',
  'machine learning',
  'Claude',
  'GPT',
  'Gemini',
];

interface NewsItemLocal {
  title: string;
  summary: string;
  url: string;
  source: string;
}

async function fetchHNStories(topic: string, seenUrls: Set<string>): Promise<NewsItemLocal[]> {
  try {
    const since = Math.floor((Date.now() - 48 * 60 * 60 * 1000) / 1000);
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(topic)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${since},points>10`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Karna/1.0' } });
    if (!res.ok) return [];
    const data = (await res.json()) as { hits?: any[] };
    return (data.hits || [])
      .filter((h: any) => h.url && !seenUrls.has(h.url))
      .slice(0, 2)
      .map((h: any) => ({
        title: h.title,
        summary: `${h.points} pts · ${h.num_comments} comments on HN`,
        url: h.url,
        source: 'news.ycombinator.com',
      }));
  } catch {
    return [];
  }
}

async function fetchNewsByTopics(topics: string[], ctx: SectionContext): Promise<NewsItemLocal[]> {
  const searchTopics =
    topics.length > 0
      ? topics.slice(0, 5)
      : ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'];

  const seenUrls = new Set<string>();
  try {
    const seen = await ctx.db
      .prepare(
        `SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')`,
      )
      .bind(ctx.userId)
      .all<{ url: string }>();
    (seen.results || []).forEach((r: { url: string }) => seenUrls.add(r.url));
  } catch {
    // non-fatal
  }

  const news: NewsItemLocal[] = [];

  const isAITopics = searchTopics.some((t) =>
    AI_TOPICS.some((a) => t.toLowerCase().includes(a.toLowerCase())),
  );
  if (isAITopics) {
    const hnQuery =
      searchTopics.find((t) => AI_TOPICS.some((a) => t.toLowerCase().includes(a.toLowerCase()))) ||
      'AI agents';
    const hnItems = await fetchHNStories(hnQuery, seenUrls);
    for (const item of hnItems) {
      news.push(item);
      seenUrls.add(item.url);
    }
  }

  for (const topic of searchTopics) {
    if (news.length >= 8) break;
    const query = `latest ${topic} news today`;
    try {
      const searchResult = await webSearch(query, { num: 5 });
      if (searchResult.results) {
        for (const r of searchResult.results) {
          if (news.length >= 8) break;
          if (seenUrls.has(r.link)) continue;
          news.push({ title: r.title, summary: r.snippet, url: r.link, source: r.displayLink });
          seenUrls.add(r.link);
        }
      }
    } catch (err: any) {
      console.error(`[digest:news] search error for "${query}":`, err?.message);
    }
  }

  const finalNews = news.slice(0, 7);

  if (finalNews.length > 0) {
    for (const item of finalNews) {
      try {
        await ctx.db
          .prepare(
            `INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)`,
          )
          .bind(ctx.userId, item.url, item.title)
          .run();
      } catch {
        // non-fatal
      }
    }
  }

  return finalNews;
}

export const newsAi: SectionFetcher = {
  key: 'news_ai',
  title: "Today's Signal",
  appliesTo: () => true,
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const items = await fetchNewsByTopics(ctx.newsTopics, ctx);
      if (items.length === 0) {
        return emptySection('news_ai', "Today's Signal", 'No new items');
      }
      const sectionItems: DigestSectionItem[] = items.map((n) => ({
        key: `news-${n.url}`,
        text: `📰 ${n.title}`,
        metadata: { url: n.url, source: n.source, summary: n.summary },
      }));
      return {
        key: 'news_ai',
        title: "Today's Signal",
        summary: `${items.length} items`,
        items: sectionItems,
      };
    } catch (err: any) {
      console.error('[digest:news_ai] fetch error:', err?.message);
      return emptySection('news_ai', "Today's Signal");
    }
  },
};
