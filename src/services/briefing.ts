// Proactive Intelligence: Evening Briefing Service
// Generates daily evening briefings at 8:00 PM IST with:
// - Tomorrow's calendar events (Google + Outlook)
// - Email summary (Gmail + Outlook)
// - Tasks summary
// - Top 5 AI news
// - Interactive checklist items

import type { UserRecord, LLMProvider } from '../types';
import { getGoogleAuth, GoogleCalendar } from './google';
import { GmailService } from './gmail';
import { BrowserActions } from './browser';
import { webSearch } from './google-apis';
import { fetchPageContent } from './research';
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
  outlook: CalendarEvent[];
  totalCount: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  source: 'google' | 'outlook';
}

export interface EmailSection {
  gmail: EmailSummary;
  outlook: EmailSummary;
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

// === Fetch Outlook Calendar Events ===

async function fetchOutlookCalendarEvents(
  db: D1Database,
  userId: number,
  pinHash: string
): Promise<CalendarEvent[]> {
  try {
    const browser = new BrowserActions(db, userId);
    const result = await browser.checkOutlookCalendar(pinHash, 'primary');
    
    // Parse the browser automation result
    // The result is a text description; we'll extract structured data if possible
    if (!result || result.includes('not configured') || result.includes('Failed')) {
      return [];
    }
    
    // Simple parsing of the text output - create a single event summary
    // In a real implementation, you'd parse the structured output
    return [{
      id: `outlook-summary-${Date.now()}`,
      title: 'Outlook Calendar Summary',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      location: result.substring(0, 500),
      source: 'outlook' as const,
    }];
  } catch (err: any) {
    console.error('Outlook Calendar fetch error:', err.message);
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

// === Fetch Outlook Email Summary ===

async function fetchOutlookEmailSummary(
  db: D1Database,
  userId: number,
  pinHash: string
): Promise<EmailSummary> {
  try {
    const browser = new BrowserActions(db, userId);
    const result = await browser.checkOutlookMail(pinHash, 'primary');
    
    if (!result || result.includes('not configured') || result.includes('Failed')) {
      return { unreadCount: 0, importantCount: 0, topSenders: [], hasUrgent: false };
    }
    
    // Parse unread count from result text
    const unreadMatch = result.match(/(\d+)\s*unread/i);
    const unreadCount = unreadMatch ? parseInt(unreadMatch[1]) : 0;
    
    return {
      unreadCount,
      importantCount: 0,
      topSenders: [],
      hasUrgent: result.toLowerCase().includes('urgent'),
    };
  } catch (err: any) {
    console.error('Outlook email fetch error:', err.message);
    return { unreadCount: 0, importantCount: 0, topSenders: [], hasUrgent: false };
  }
}

// === Fetch Tasks Summary ===

async function fetchTasksSummary(db: D1Database, userId: number): Promise<TasksSection> {
  try {
    // Get pending cron jobs that act as tasks
    const tasks = await db.prepare(`
      SELECT name, description, next_run 
      FROM cron_jobs 
      WHERE user_id = ? AND enabled = 1 AND state != 'completed'
      ORDER BY next_run ASC
      LIMIT 10
    `).bind(userId).all<{ name: string; description: string; next_run: string }>();
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const items = (tasks.results || []).map(t => t.name);
    const dueToday = (tasks.results || []).filter(t => {
      const nextRun = new Date(t.next_run);
      return nextRun <= tomorrow;
    }).length;
    
    return {
      pending: tasks.results?.length || 0,
      dueToday,
      items,
    };
  } catch (err: any) {
    console.error('Tasks fetch error:', err.message);
    return { pending: 0, dueToday: 0, items: [] };
  }
}

// === Fetch AI News ===

async function fetchAINews(): Promise<NewsItem[]> {
  const queries = [
    'latest LLM AI news today',
    'AI tools announcement today',
    'agentic AI workflow news',
    'AI company feature release today',
  ];
  
  const news: NewsItem[] = [];
  
  for (const query of queries) {
    try {
      const searchResult = await webSearch(query, { num: 3 });
      
      if (searchResult.results) {
        for (const r of searchResult.results.slice(0, 2)) {
          // Avoid duplicates
          if (news.some(n => n.url === r.link)) continue;
          
          news.push({
            title: r.title,
            summary: r.snippet,
            url: r.link,
            source: r.displayLink,
          });
          
          if (news.length >= 5) break;
        }
      }
    } catch (err: any) {
      console.error(`News search error for "${query}":`, err.message);
    }
    
    if (news.length >= 5) break;
  }
  
  return news.slice(0, 5);
}

// === Format Briefing Summary ===

function formatBriefingSummary(content: BriefingContent): string {
  const lines: string[] = [];
  
  lines.push(`📋 Evening Briefing for ${content.targetDate}`);
  lines.push('');
  
  // Calendar
  const totalEvents = content.calendar.totalCount;
  if (totalEvents > 0) {
    lines.push(`📅 Tomorrow: ${totalEvents} event${totalEvents === 1 ? '' : 's'}`);
    for (const e of [...content.calendar.google, ...content.calendar.outlook].slice(0, 5)) {
      const time = e.startTime ? new Date(e.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      lines.push(`   • ${time} ${e.title}`);
    }
  } else {
    lines.push('📅 Tomorrow: No events scheduled');
  }
  lines.push('');
  
  // Emails
  const totalUnread = content.emails.gmail.unreadCount + content.emails.outlook.unreadCount;
  if (totalUnread > 0) {
    lines.push(`📧 Emails: ${totalUnread} unread`);
    if (content.emails.gmail.hasUrgent || content.emails.outlook.hasUrgent) {
      lines.push('   ⚠️ Contains urgent messages');
    }
  } else {
    lines.push('📧 Emails: Inbox clear');
  }
  lines.push('');
  
  // Tasks
  if (content.tasks.pending > 0) {
    lines.push(`✅ Tasks: ${content.tasks.pending} pending (${content.tasks.dueToday} due soon)`);
  } else {
    lines.push('✅ Tasks: All caught up');
  }
  lines.push('');
  
  // AI News
  if (content.news.items.length > 0) {
    lines.push('🤖 AI News Today:');
    for (const item of content.news.items) {
      lines.push(`   • ${item.title.substring(0, 80)}${item.title.length > 80 ? '...' : ''}`);
    }
  }
  
  return lines.join('\n');
}

// === Generate Briefing Items for Checklist ===

function generateBriefingItems(content: BriefingContent): BriefingItem[] {
  const items: BriefingItem[] = [];
  let order = 0;
  
  // Calendar events
  for (const e of [...content.calendar.google, ...content.calendar.outlook]) {
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
  
  if (content.emails.outlook.unreadCount > 0) {
    items.push({
      type: 'email',
      key: 'outlook-unread',
      text: `Review ${content.emails.outlook.unreadCount} unread Outlook messages`,
      metadata: { source: 'outlook', count: content.emails.outlook.unreadCount },
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

// === Main: Generate Evening Briefing ===

export async function generateEveningBriefing(
  db: D1Database,
  user: UserRecord,
  envVars: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<{ briefingId: number; content: BriefingContent; items: BriefingItem[] }> {
  const timezone = user.timezone || 'Asia/Kolkata';
  const tomorrow = getTomorrowDateRange(timezone);
  
  // Fetch all data in parallel
  const [googleEvents, outlookEvents, gmailSummary, outlookSummary, tasks, news] = await Promise.all([
    fetchGoogleCalendarEvents(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET, tomorrow),
    fetchOutlookCalendarEvents(db, user.id, user.pin_hash),
    fetchGmailSummary(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET),
    fetchOutlookEmailSummary(db, user.id, user.pin_hash),
    fetchTasksSummary(db, user.id),
    fetchAINews(),
  ]);
  
  // Build briefing content
  const content: BriefingContent = {
    generatedAt: new Date().toISOString(),
    targetDate: tomorrow.dateStr,
    calendar: {
      google: googleEvents,
      outlook: outlookEvents,
      totalCount: googleEvents.length + outlookEvents.length,
    },
    emails: {
      gmail: gmailSummary,
      outlook: outlookSummary,
    },
    tasks,
    news: {
      items: news,
      fetchedAt: new Date().toISOString(),
    },
    summary: '',
  };
  
  // Generate summary
  content.summary = formatBriefingSummary(content);
  
  // Generate checklist items
  const items = generateBriefingItems(content);
  
  // Store in database
  const briefingResult = await db.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(user.id, JSON.stringify(content)).first<{ id: number }>();
  
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
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(userId, limit).all<any>();
  
  return (briefings.results || []).map(b => ({
    ...b,
    content: JSON.parse(b.content_json || '{}'),
  }));
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
