// Proactive Intelligence: Evening Briefing Service
// Generates configurable evening briefings with:
// - Tomorrow's calendar events (Google Calendar)
// - Email summary (Gmail)
// - Tasks summary
// - Custom news topics (configurable)
// - Interactive checklist items

import type {
  UserRecord,
  BriefingPreferencesRecord,
  BriefingComponentsConfig,
  BriefingPreferences
} from '../types';
import { getGoogleAuth, GoogleCalendar } from './google';
import { GmailService } from './gmail';
import { webSearch } from './google-apis';
import { decrypt } from './crypto';

// === Types ===

export interface BriefingContent {
  generatedAt: string;
  targetDate: string; // Tomorrow's date
  calendar: CalendarSection;
  emails: EmailSection;
  tasks: TasksSection;
  news: NewsSection;
  summary: string;
}

export interface CalendarSection {
  google: CalendarEvent[];
  totalCount: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  source: 'google';
}

export interface EmailSection {
  gmail: EmailSummary;
}

export interface EmailSummary {
  unreadCount: number;
  importantCount: number;
  topSenders: string[];
  hasUrgent: boolean;
}

export interface TasksSection {
  pending: number;
  dueToday: number;
  items: string[];
}

export interface NewsSection {
  items: NewsItem[];
  fetchedAt: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
}

export interface BriefingItem {
  type: 'calendar' | 'email' | 'task' | 'news' | 'custom';
  key: string;
  text: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
}

// === Helper: Get tomorrow's date range in user timezone ===

function getTomorrowDateRange(timezone: string): { start: string; end: string; dateStr: string } {
  // Get current time in user's timezone
  const now = new Date();
  const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  
  // Tomorrow
  const tomorrow = new Date(userNow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);
  
  // Convert to ISO strings
  const dateStr = tomorrow.toISOString().split('T')[0];
  
  return {
    start: tomorrow.toISOString(),
    end: tomorrowEnd.toISOString(),
    dateStr,
  };
}

/**
 * Returns the user-local calendar date as a YYYY-MM-DD string.
 * Used to key the per-day briefing idempotency guard.
 */
export function getUserLocalDate(timezone: string, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD, honouring the supplied timezone.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone || 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

// === Fetch Google Calendar Events ===

async function fetchGoogleCalendarEvents(
  db: D1Database,
  userId: number,
  pinHash: string,
  clientId: string,
  clientSecret: string,
  tomorrow: { start: string; end: string }
): Promise<CalendarEvent[]> {
  try {
    const calendar = new GoogleCalendar(db, userId, pinHash, clientId, clientSecret);
    const events = await calendar.listEvents('primary', {
      timeMin: tomorrow.start,
      timeMax: tomorrow.end,
      maxResults: 50,
    });
    
    return events.map(e => ({
      id: e.id || `google-${Date.now()}`,
      title: e.summary || 'Untitled Event',
      startTime: e.start.dateTime || e.start.date || '',
      endTime: e.end.dateTime || e.end.date || '',
      location: e.location,
      attendees: e.attendees?.map(a => a.displayName || a.email),
      source: 'google' as const,
    }));
  } catch (err: any) {
    console.error('Google Calendar fetch error:', err.message);
    return [];
  }
}

// === Fetch Gmail Summary ===

async function fetchGmailSummary(
  db: D1Database,
  userId: number,
  pinHash: string,
  clientId: string,
  clientSecret: string
): Promise<EmailSummary> {
  try {
    const gmail = new GmailService(db, userId, pinHash, clientId, clientSecret);
    
    // Get unread messages
    const unread = await gmail.listMessages({
      query: 'is:unread',
      maxResults: 50,
      labelIds: ['INBOX'],
    });
    
    // Get important messages
    const important = await gmail.listMessages({
      query: 'is:important is:unread',
      maxResults: 10,
    });
    
    // Extract top senders
    const senderCounts: Record<string, number> = {};
    for (const msg of unread) {
      const sender = msg.from.split('<')[0].trim() || msg.from;
      senderCounts[sender] = (senderCounts[sender] || 0) + 1;
    }
    const topSenders = Object.entries(senderCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([sender]) => sender);
    
    // Check for urgent patterns
    const hasUrgent = unread.some(m => 
      m.subject.toLowerCase().includes('urgent') ||
      m.subject.toLowerCase().includes('asap') ||
      m.subject.toLowerCase().includes('immediately')
    );
    
    return {
      unreadCount: unread.length,
      importantCount: important.length,
      topSenders,
      hasUrgent,
    };
  } catch (err: any) {
    console.error('Gmail fetch error:', err.message);
    return { unreadCount: 0, importantCount: 0, topSenders: [], hasUrgent: false };
  }
}

// === Fetch Tasks Summary ===

async function fetchTasksSummary(db: D1Database, userId: number): Promise<TasksSection> {
  try {
    const tasks = await db.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(userId).all<{ title: string; content: string; due_date: string | null }>();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);

    const rows = tasks.results || [];
    const items = rows.map(t => {
      if (t.due_date) {
        const d = new Date(t.due_date);
        const label = d <= now ? 'overdue' : d <= tomorrow ? 'due today' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        return `${t.title} [${label}]`;
      }
      return t.title;
    });

    const dueToday = rows.filter(t => {
      if (!t.due_date) return false;
      const d = new Date(t.due_date);
      return d <= tomorrow;
    }).length;

    return { pending: rows.length, dueToday, items };
  } catch (err: any) {
    console.error('Tasks fetch error:', err.message);
    return { pending: 0, dueToday: 0, items: [] };
  }
}

// === Fetch News by Topics — with dedup and HN feed ===

// HN Algolia API — free, no key, excellent signal for AI/tech topics
async function fetchHNStories(topic: string, seenUrls: Set<string>): Promise<NewsItem[]> {
  try {
    const since = Math.floor((Date.now() - 48 * 60 * 60 * 1000) / 1000); // last 48h
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(topic)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${since},points>10`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Karna/1.0' } });
    if (!res.ok) return [];
    const data = await res.json() as { hits?: any[] };
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

const AI_TOPICS = ['AI', 'LLM', 'Agentic', 'artificial intelligence', 'machine learning', 'Claude', 'GPT', 'Gemini'];

async function fetchNewsByTopics(topics: string[], db?: D1Database, userId?: number): Promise<NewsItem[]> {
  const searchTopics = topics.length > 0 ? topics.slice(0, 5) : ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'];

  // Load seen URLs from last 7 days
  const seenUrls = new Set<string>();
  if (db && userId) {
    try {
      const seen = await db.prepare(
        `SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')`
      ).bind(userId).all<{ url: string }>();
      (seen.results || []).forEach(r => seenUrls.add(r.url));
    } catch { /* non-fatal */ }
  }

  const news: NewsItem[] = [];

  // HN feed for AI-adjacent topics (parallel, no quota cost)
  const isAITopics = searchTopics.some(t => AI_TOPICS.some(a => t.toLowerCase().includes(a.toLowerCase())));
  if (isAITopics) {
    const hnQuery = searchTopics.find(t => AI_TOPICS.some(a => t.toLowerCase().includes(a.toLowerCase()))) || 'AI agents';
    const hnItems = await fetchHNStories(hnQuery, seenUrls);
    for (const item of hnItems) {
      news.push(item);
      seenUrls.add(item.url);
    }
  }

  // Google CSE for all topics — 5 results per topic, pick 2 new ones each
  for (const topic of searchTopics) {
    if (news.length >= 8) break;
    const query = `latest ${topic} news today`;
    try {
      const searchResult = await webSearch(query, { num: 5 });
      if (searchResult.results) {
        for (const r of searchResult.results) {
          if (news.length >= 8) break;
          if (seenUrls.has(r.link)) continue;
          news.push({
            title: r.title,
            summary: r.snippet,
            url: r.link,
            source: r.displayLink,
          });
          seenUrls.add(r.link);
        }
      }
    } catch (err: any) {
      console.error(`News search error for "${query}":`, err.message);
    }
  }

  const finalNews = news.slice(0, 7);

  // Persist seen URLs
  if (db && userId && finalNews.length > 0) {
    for (const item of finalNews) {
      try {
        await db.prepare(
          `INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)`
        ).bind(userId, item.url, item.title).run();
      } catch { /* non-fatal */ }
    }
  }

  return finalNews;
}

// Legacy function for backward compatibility
async function fetchAINews(): Promise<NewsItem[]> {
  return fetchNewsByTopics(['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features']);
}

// === Format Briefing Summary ===

function formatBriefingSummary(content: BriefingContent, briefingTime?: string): string {
  const lines: string[] = [];

  // Convert "HH:MM" 24h to "H:MM AM/PM" — keep it clean
  let timeLabel = '20:00';
  if (briefingTime) {
    const [hStr, mStr] = briefingTime.split(':');
    const h = parseInt(hStr, 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    timeLabel = `${h12}:${m} ${ampm}`;
  }
  lines.push(`🗓 Your ${timeLabel} Brief — ${content.targetDate}`);
  lines.push('');

  // Calendar
  const totalEvents = content.calendar.totalCount;
  if (totalEvents > 0) {
    lines.push(`📅 Tomorrow: ${totalEvents} event${totalEvents === 1 ? '' : 's'}`);
    for (const e of content.calendar.google.slice(0, 5)) {
      const time = e.startTime ? new Date(e.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      lines.push(`   • ${time} ${e.title}`);
    }
  } else {
    lines.push('📅 Tomorrow: Nothing scheduled');
  }
  lines.push('');

  // Emails
  const totalUnread = content.emails.gmail.unreadCount;
  if (totalUnread > 0) {
    lines.push(`📧 Gmail: ${totalUnread} unread`);
    if (content.emails.gmail.importantCount > 0) lines.push(`   ★ ${content.emails.gmail.importantCount} marked important`);
    if (content.emails.gmail.hasUrgent) lines.push('   ⚠️ Urgent messages present');
    if (content.emails.gmail.topSenders.length > 0) lines.push(`   From: ${content.emails.gmail.topSenders.slice(0, 3).join(', ')}`);
  } else {
    lines.push('📧 Gmail: Inbox clear');
  }
  lines.push('');

  // Tasks
  if (content.tasks.pending > 0) {
    lines.push(`✅ Open Tasks (${content.tasks.pending}):`);
    for (const item of content.tasks.items) {
      lines.push(`   ☐ ${item}`);
    }
  } else {
    lines.push('✅ Tasks: All clear');
  }
  lines.push('');

  // News
  if (content.news.items.length > 0) {
    lines.push('📡 Today\'s Signal:');
    for (const item of content.news.items) {
      const src = item.source === 'news.ycombinator.com' ? '🟠 HN' : `🔗 ${item.source}`;
      lines.push(`   • ${item.title.substring(0, 90)}${item.title.length > 90 ? '…' : ''}`);
      lines.push(`     ${src} — ${item.summary.substring(0, 80)}${item.summary.length > 80 ? '…' : ''}`);
    }
  }

  return lines.join('\n');
}

// === Generate Briefing Items for Checklist ===

function generateBriefingItems(content: BriefingContent): BriefingItem[] {
  const items: BriefingItem[] = [];
  let order = 0;
  
  // Calendar events
  for (const e of content.calendar.google) {
    items.push({
      type: 'calendar',
      key: e.id,
      text: `${e.title} - ${new Date(e.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      metadata: { event: e },
      sortOrder: order++,
    });
  }
  
  // Email actions
  if (content.emails.gmail.unreadCount > 0) {
    items.push({
      type: 'email',
      key: 'gmail-unread',
      text: `Review ${content.emails.gmail.unreadCount} unread Gmail messages`,
      metadata: { source: 'gmail', count: content.emails.gmail.unreadCount },
      sortOrder: order++,
    });
  }
  
  // Tasks
  for (const task of content.tasks.items) {
    items.push({
      type: 'task',
      key: `task-${task}`,
      text: task,
      metadata: {},
      sortOrder: order++,
    });
  }
  
  // News items
  for (const news of content.news.items) {
    items.push({
      type: 'news',
      key: `news-${news.url}`,
      text: `📰 ${news.title}`,
      metadata: { url: news.url, source: news.source },
      sortOrder: order++,
    });
  }
  
  return items;
}

// === Helper: Get User Briefing Preferences ===

async function getUserBriefingPreferences(db: D1Database, userId: number): Promise<{
  components: BriefingComponentsConfig;
  newsTopics: string[];
}> {
  const prefs = await db.prepare(
    'SELECT * FROM briefing_preferences WHERE user_id = ?'
  ).bind(userId).first<BriefingPreferencesRecord>();
  
  if (!prefs) {
    // Return defaults
    return {
      components: {
        google_calendar: true,
        gmail: true,
        tasks: true,
        news: true,
      },
      newsTopics: ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'],
    };
  }

  let components: BriefingComponentsConfig;
  try {
    const parsed = JSON.parse(prefs.components);
    // Merge with defaults so any missing key is always true (safe default)
    components = {
      google_calendar: parsed.google_calendar !== false,
      gmail: parsed.gmail !== false,
      tasks: parsed.tasks !== false,
      news: parsed.news !== false,
    };
  } catch {
    components = {
      google_calendar: true,
      gmail: true,
      tasks: true,
      news: true,
    };
  }
  
  const newsTopics = prefs.news_topics
    ? prefs.news_topics.split(',').map(t => t.trim()).filter(Boolean)
    : ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'];
  
  return { components, newsTopics };
}

// === Main: Generate Evening Briefing ===

export async function generateEveningBriefing(
  db: D1Database,
  user: UserRecord,
  envVars: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<{ briefingId: number; content: BriefingContent; items: BriefingItem[] }> {
  const timezone = user.timezone || 'Asia/Kolkata';
  const tomorrow = getTomorrowDateRange(timezone);
  
  // Get user preferences
  const { components, newsTopics } = await getUserBriefingPreferences(db, user.id);
  
  // Build promise array based on enabled components
  const fetchPromises: Promise<any>[] = [];
  const promiseMapping: string[] = [];
  
  // Google Calendar
  if (components.google_calendar) {
    fetchPromises.push(fetchGoogleCalendarEvents(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET, tomorrow));
    promiseMapping.push('googleEvents');
  }

  // Gmail
  if (components.gmail) {
    fetchPromises.push(fetchGmailSummary(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET));
    promiseMapping.push('gmailSummary');
  }

  // Tasks
  if (components.tasks) {
    fetchPromises.push(fetchTasksSummary(db, user.id));
    promiseMapping.push('tasks');
  }
  
  // News - use custom topics from preferences, with dedup
  if (components.news) {
    fetchPromises.push(fetchNewsByTopics(newsTopics, db, user.id));
    promiseMapping.push('news');
  }
  
  // Fetch all enabled data in parallel
  const results = await Promise.all(fetchPromises);
  
  // Map results to variables
  const fetchedData: Record<string, any> = {};
  promiseMapping.forEach((key, index) => {
    fetchedData[key] = results[index];
  });
  
  // Build briefing content with defaults for disabled components
  const emptyEmailSummary: EmailSummary = { unreadCount: 0, importantCount: 0, topSenders: [], hasUrgent: false };
  const emptyTasksSection: TasksSection = { pending: 0, dueToday: 0, items: [] };
  
  const content: BriefingContent = {
    generatedAt: new Date().toISOString(),
    targetDate: tomorrow.dateStr,
    calendar: {
      google: fetchedData.googleEvents || [],
      totalCount: (fetchedData.googleEvents?.length || 0),
    },
    emails: {
      gmail: fetchedData.gmailSummary || emptyEmailSummary,
    },
    tasks: fetchedData.tasks || emptyTasksSection,
    news: {
      items: fetchedData.news || [],
      fetchedAt: new Date().toISOString(),
    },
    summary: '',
  };
  
  // Generate summary — pass briefing time for header
  const userBriefingTime = (await db.prepare('SELECT briefing_time FROM briefing_preferences WHERE user_id = ?').bind(user.id).first<{ briefing_time: string }>())?.briefing_time || '20:00';
  content.summary = formatBriefingSummary(content, userBriefingTime);
  
  // Generate checklist items
  const items = generateBriefingItems(content);
  
  // Store in database. briefing_date (user-local YYYY-MM-DD) keys the per-day
  // idempotency guard enforced by the unique index in migration 0041.
  const briefingDate = getUserLocalDate(timezone);
  const briefingResult = await db.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'evening', ?, 'all', ?)
    RETURNING id
  `).bind(user.id, JSON.stringify(content), briefingDate).first<{ id: number }>();
  
  const briefingId = briefingResult?.id || 0;
  
  // Store checklist items
  for (const item of items) {
    await db.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(briefingId, item.type, item.key, item.text, JSON.stringify(item.metadata), item.sortOrder).run();
  }
  
  return { briefingId, content, items };
}

// === Get Briefing by ID ===

export async function getBriefing(db: D1Database, userId: number, briefingId: number): Promise<{
  briefing: any;
  items: any[];
} | null> {
  const briefing = await db.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(briefingId, userId).first<any>();
  
  if (!briefing) return null;
  
  const items = await db.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(briefingId).all<any>();
  
  return {
    briefing: {
      ...briefing,
      content: JSON.parse(briefing.content_json || '{}'),
    },
    items: items.results || [],
  };
}

// === Toggle Briefing Item Checkbox ===

export async function toggleBriefingItem(
  db: D1Database,
  userId: number,
  briefingId: number,
  itemId: number
): Promise<{ checked: boolean } | null> {
  // Verify ownership
  const briefing = await db.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(briefingId, userId).first<{ id: number }>();
  
  if (!briefing) return null;
  
  // Toggle the item
  const item = await db.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(itemId, briefingId).first<{ checked: number }>();
  
  if (!item) return null;
  
  const newChecked = item.checked ? 0 : 1;
  await db.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(newChecked, newChecked, itemId, briefingId).run();
  
  return { checked: newChecked === 1 };
}

// === Get Recent Briefings ===

export async function getRecentBriefings(
  db: D1Database,
  userId: number,
  limit: number = 10
): Promise<any[]> {
  const briefings = await db.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(userId, limit).all<any>();
  
  return (briefings.results || []).map(b => ({
    ...b,
    content: JSON.parse(b.content_json || '{}'),
  }));
}

// === Format Briefing for Telegram ===

// === Get User Briefing Time ===

export async function getUserBriefingTime(db: D1Database, userId: number): Promise<string> {
  const prefs = await db.prepare(
    'SELECT briefing_time FROM briefing_preferences WHERE user_id = ?'
  ).bind(userId).first<{ briefing_time: string }>();
  
  return prefs?.briefing_time || '20:00';
}

// === Get All Users Briefing Times ===

export async function getAllUsersBriefingTimes(db: D1Database): Promise<Array<{
  userId: number;
  briefingTime: string;
  timezone: string;
}>> {
  const results = await db.prepare(`
    SELECT u.id as user_id, u.timezone, COALESCE(bp.briefing_time, '20:00') as briefing_time
    FROM users u
    LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
  `).all<{ user_id: number; timezone: string; briefing_time: string }>();
  
  return (results.results || []).map(r => ({
    userId: r.user_id,
    briefingTime: r.briefing_time,
    timezone: r.timezone || 'Asia/Kolkata',
  }));
}

// === Check if Briefing Should Run for User ===

export function shouldRunBriefing(
  briefingTime: string,
  timezone: string,
  now: Date = new Date(),
  windowMinutes = 5
): boolean {
  // Get current time in user's timezone
  const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const userHour = userNow.getHours();
  const userMinute = userNow.getMinutes();

  // Parse briefing time
  const [targetHour, targetMinute] = briefingTime.split(':').map(Number);

  const currentMinutes = userHour * 60 + userMinute;
  const targetMinutes = targetHour * 60 + targetMinute;

  // Fire on the target minute and for up to `windowMinutes` afterwards (a
  // catch-up window). This tolerates a single missed or drifted cron tick on
  // the exact target minute. Duplicate sends are prevented separately by the
  // per-user/per-day idempotency guard in the briefing cron endpoints, so
  // widening the window here is safe.
  const delta = currentMinutes - targetMinutes;
  return delta >= 0 && delta < windowMinutes;
}

// === Format Briefing for Telegram ===

export function formatBriefingForTelegram(content: BriefingContent, items: BriefingItem[]): {
  text: string;
  inlineKeyboard: Array<Array<{ text: string; callback_data: string }>>;
} {
  const text = content.summary;
  
  // Create inline keyboard with checkboxes
  const inlineKeyboard: Array<Array<{ text: string; callback_data: string }>> = [];
  
  for (const item of items.slice(0, 10)) { // Telegram limit
    inlineKeyboard.push([{
      text: `☐ ${item.text.substring(0, 40)}${item.text.length > 40 ? '...' : ''}`,
      callback_data: `briefing_toggle:${item.key}`,
    }]);
  }
  
  return { text, inlineKeyboard };
}
