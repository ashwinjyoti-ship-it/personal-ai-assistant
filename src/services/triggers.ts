// Proactive Intelligence: Trigger Evaluation System
// Custom triggers for email content, calendar events, time-based actions
// Runs every 15 minutes to evaluate user-defined triggers

import type { UserRecord } from '../types';
import { GmailService } from './gmail';
import { GoogleCalendar } from './google';
import { decrypt } from './crypto';

// === Types ===

export interface ProactiveTrigger {
  id: number;
  user_id: number;
  name: string;
  type: 'email_content' | 'calendar_event' | 'time_based' | 'custom';
  conditions: TriggerConditions;
  actions: TriggerActions;
  enabled: boolean;
  last_triggered: string | null;
  trigger_count: number;
  created_at: string;
  updated_at: string;
}

export interface TriggerConditions {
  keywords?: string[];
  regex?: string;
  time?: string; // HH:MM format
  calendar_pattern?: string;
  email_from?: string;
  email_subject?: string;
  custom_condition?: string;
}

export interface TriggerActions {
  notify: boolean;
  telegram: boolean;
  log: boolean;
  custom_action?: string;
  webhook_url?: string;
}

export interface TriggerResult {
  triggered: boolean;
  trigger_id: number;
  trigger_name: string;
  matched_content?: string;
  timestamp: string;
}

// === CRUD Operations ===

export async function createTrigger(
  db: D1Database,
  userId: number,
  name: string,
  type: ProactiveTrigger['type'],
  conditions: TriggerConditions,
  actions: TriggerActions
): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO proactive_triggers (user_id, name, type, conditions, actions)
    VALUES (?, ?, ?, ?, ?)
    RETURNING id
  `).bind(
    userId,
    name,
    type,
    JSON.stringify(conditions),
    JSON.stringify(actions)
  ).first<{ id: number }>();
  
  return result?.id || 0;
}

export async function getTrigger(db: D1Database, userId: number, triggerId: number): Promise<ProactiveTrigger | null> {
  const result = await db.prepare(`
    SELECT * FROM proactive_triggers WHERE id = ? AND user_id = ?
  `).bind(triggerId, userId).first<any>();
  
  if (!result) return null;
  
  return {
    ...result,
    conditions: JSON.parse(result.conditions || '{}'),
    actions: JSON.parse(result.actions || '{}'),
    enabled: result.enabled === 1,
  };
}

export async function listTriggers(db: D1Database, userId: number): Promise<ProactiveTrigger[]> {
  const results = await db.prepare(`
    SELECT * FROM proactive_triggers WHERE user_id = ? ORDER BY created_at DESC
  `).bind(userId).all<any>();
  
  return (results.results || []).map(r => ({
    ...r,
    conditions: JSON.parse(r.conditions || '{}'),
    actions: JSON.parse(r.actions || '{}'),
    enabled: r.enabled === 1,
  }));
}

export async function updateTrigger(
  db: D1Database,
  userId: number,
  triggerId: number,
  updates: {
    name?: string;
    type?: ProactiveTrigger['type'];
    conditions?: TriggerConditions;
    actions?: TriggerActions;
    enabled?: boolean;
  }
): Promise<boolean> {
  const sets: string[] = [];
  const values: any[] = [];
  
  if (updates.name !== undefined) { sets.push('name = ?'); values.push(updates.name); }
  if (updates.type !== undefined) { sets.push('type = ?'); values.push(updates.type); }
  if (updates.conditions !== undefined) { sets.push('conditions = ?'); values.push(JSON.stringify(updates.conditions)); }
  if (updates.actions !== undefined) { sets.push('actions = ?'); values.push(JSON.stringify(updates.actions)); }
  if (updates.enabled !== undefined) { sets.push('enabled = ?'); values.push(updates.enabled ? 1 : 0); }
  
  if (sets.length === 0) return false;
  
  sets.push('updated_at = CURRENT_TIMESTAMP');
  values.push(triggerId, userId);
  
  await db.prepare(`
    UPDATE proactive_triggers SET ${sets.join(', ')} WHERE id = ? AND user_id = ?
  `).bind(...values).run();
  
  return true;
}

export async function deleteTrigger(db: D1Database, userId: number, triggerId: number): Promise<boolean> {
  const result = await db.prepare(`
    DELETE FROM proactive_triggers WHERE id = ? AND user_id = ?
  `).bind(triggerId, userId).run();
  
  return (result.meta?.changes || 0) > 0;
}

// === Pre-configured Triggers ===

export async function createDefaultTriggers(db: D1Database, userId: number): Promise<void> {
  // Check if default triggers already exist
  const existing = await db.prepare(`
    SELECT COUNT(*) as cnt FROM proactive_triggers WHERE user_id = ? AND name LIKE 'Default:%'
  `).bind(userId).first<{ cnt: number }>();
  
  if (existing && existing.cnt > 0) return;
  
  // Outlook event info trigger
  await createTrigger(db, userId, 'Default: Outlook Event Detection', 'email_content', {
    keywords: ['event', 'meeting', 'schedule', 'timing', 'sound check', 'requirement'],
    email_from: '@',
  }, {
    notify: true,
    telegram: true,
    log: true,
  });
  
  // Urgent email trigger
  await createTrigger(db, userId, 'Default: Urgent Email Alert', 'email_content', {
    keywords: ['urgent', 'asap', 'immediately', 'critical'],
  }, {
    notify: true,
    telegram: true,
    log: true,
  });
}

// === Trigger Evaluation Engine ===

async function evaluateEmailTrigger(
  trigger: ProactiveTrigger,
  emails: Array<{ subject: string; from: string; snippet: string }>
): Promise<{ matched: boolean; content?: string }> {
  const conditions = trigger.conditions;
  
  for (const email of emails) {
    const searchText = `${email.subject} ${email.from} ${email.snippet}`.toLowerCase();
    
    // Check keywords
    if (conditions.keywords?.length) {
      const matched = conditions.keywords.some(kw => searchText.includes(kw.toLowerCase()));
      if (matched) {
        return { matched: true, content: `Email: ${email.subject} from ${email.from}` };
      }
    }
    
    // Check regex
    if (conditions.regex) {
      try {
        const re = new RegExp(conditions.regex, 'i');
        if (re.test(searchText)) {
          return { matched: true, content: `Email matched pattern: ${email.subject}` };
        }
      } catch {}
    }
    
    // Check specific from
    if (conditions.email_from && email.from.toLowerCase().includes(conditions.email_from.toLowerCase())) {
      return { matched: true, content: `Email from ${email.from}: ${email.subject}` };
    }
    
    // Check specific subject
    if (conditions.email_subject && email.subject.toLowerCase().includes(conditions.email_subject.toLowerCase())) {
      return { matched: true, content: `Email with subject: ${email.subject}` };
    }
  }
  
  return { matched: false };
}

async function evaluateCalendarTrigger(
  trigger: ProactiveTrigger,
  events: Array<{ summary: string; description?: string; location?: string }>
): Promise<{ matched: boolean; content?: string }> {
  const conditions = trigger.conditions;
  
  for (const event of events) {
    const searchText = `${event.summary} ${event.description || ''} ${event.location || ''}`.toLowerCase();
    
    // Check pattern
    if (conditions.calendar_pattern) {
      if (searchText.includes(conditions.calendar_pattern.toLowerCase())) {
        return { matched: true, content: `Calendar event: ${event.summary}` };
      }
    }
    
    // Check keywords
    if (conditions.keywords?.length) {
      const matched = conditions.keywords.some(kw => searchText.includes(kw.toLowerCase()));
      if (matched) {
        return { matched: true, content: `Calendar event: ${event.summary}` };
      }
    }
  }
  
  return { matched: false };
}

function evaluateTimeTrigger(trigger: ProactiveTrigger, currentTime: Date, timezone: string): boolean {
  const conditions = trigger.conditions;
  
  if (!conditions.time) return false;
  
  // Get current time in user's timezone
  const userTime = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
  const [hours, mins] = conditions.time.split(':').map(Number);
  
  // Check if within 15-minute window (since we run every 15 mins)
  const triggerMinutes = hours * 60 + mins;
  const currentMinutes = userTime.getHours() * 60 + userTime.getMinutes();
  
  return Math.abs(currentMinutes - triggerMinutes) < 15;
}

// === Main Evaluation Function ===

export async function evaluateTriggers(
  db: D1Database,
  user: UserRecord,
  envVars: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<TriggerResult[]> {
  const results: TriggerResult[] = [];
  
  // Get all enabled triggers for user
  const triggers = await listTriggers(db, user.id);
  const enabledTriggers = triggers.filter(t => t.enabled);
  
  if (enabledTriggers.length === 0) return results;
  
  // Fetch recent data for evaluation
  let recentEmails: Array<{ subject: string; from: string; snippet: string }> = [];
  let upcomingEvents: Array<{ summary: string; description?: string; location?: string }> = [];
  
  try {
    // Fetch Gmail messages
    const gmail = new GmailService(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET);
    const emails = await gmail.listMessages({ query: 'newer_than:1h', maxResults: 20 });
    recentEmails = emails.map(e => ({ subject: e.subject, from: e.from, snippet: e.snippet }));
  } catch {}
  
  try {
    // Fetch upcoming calendar events
    const calendar = new GoogleCalendar(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET);
    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const events = await calendar.listEvents('primary', {
      timeMin: now.toISOString(),
      timeMax: in24h.toISOString(),
      maxResults: 20,
    });
    upcomingEvents = events.map(e => ({ summary: e.summary, description: e.description, location: e.location }));
  } catch {}
  
  // Evaluate each trigger
  for (const trigger of enabledTriggers) {
    let matched = false;
    let content = '';
    
    switch (trigger.type) {
      case 'email_content': {
        const result = await evaluateEmailTrigger(trigger, recentEmails);
        matched = result.matched;
        content = result.content || '';
        break;
      }
      
      case 'calendar_event': {
        const result = await evaluateCalendarTrigger(trigger, upcomingEvents);
        matched = result.matched;
        content = result.content || '';
        break;
      }
      
      case 'time_based': {
        matched = evaluateTimeTrigger(trigger, new Date(), user.timezone || 'Asia/Kolkata');
        content = `Time trigger: ${trigger.conditions.time}`;
        break;
      }
      
      case 'custom': {
        // Custom triggers can be evaluated by external logic
        break;
      }
    }
    
    if (matched) {
      // Update trigger stats
      await db.prepare(`
        UPDATE proactive_triggers 
        SET last_triggered = CURRENT_TIMESTAMP, trigger_count = trigger_count + 1
        WHERE id = ?
      `).bind(trigger.id).run();
      
      results.push({
        triggered: true,
        trigger_id: trigger.id,
        trigger_name: trigger.name,
        matched_content: content,
        timestamp: new Date().toISOString(),
      });
    }
  }
  
  return results;
}

// === Execute Trigger Actions ===

export async function executeTriggerActions(
  db: D1Database,
  user: UserRecord,
  trigger: ProactiveTrigger,
  matchedContent: string
): Promise<void> {
  const actions = trigger.actions;
  
  // Log to database
  if (actions.log) {
    await db.prepare(`
      INSERT INTO notifications (user_id, type, title, body, source)
      VALUES (?, 'info', ?, ?, ?)
    `).bind(user.id, `Trigger: ${trigger.name}`, matchedContent, `trigger:${trigger.id}`).run();
  }
  
  // Telegram notification
  if (actions.telegram && user.telegram_chat_id) {
    try {
      const botTokenCred = await db.prepare(`
        SELECT c.encrypted_value, u.pin_hash FROM credentials c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.user_id = ? AND c.service = 'telegram_bot_token'
      `).bind(user.id).first<{ encrypted_value: string; pin_hash: string }>();
      
      if (botTokenCred) {
        const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
        const text = `🔔 *Trigger Alert: ${trigger.name}*\n\n${matchedContent}`;
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: user.telegram_chat_id,
            text,
            parse_mode: 'Markdown',
          }),
        });
      }
    } catch {}
  }
  
  // Webhook
  if (actions.webhook_url) {
    try {
      await fetch(actions.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trigger_id: trigger.id,
          trigger_name: trigger.name,
          matched_content: matchedContent,
          timestamp: new Date().toISOString(),
          user_id: user.id,
        }),
      });
    } catch {}
  }
}

// === Meeting Reminder System ===

export interface MeetingReminder {
  eventId: string;
  title: string;
  startTime: string;
  location?: string;
  attendees?: string[];
  source: 'google' | 'outlook';
  minutesUntil: number;
}

export async function checkUpcomingMeetings(
  db: D1Database,
  user: UserRecord,
  envVars: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<MeetingReminder[]> {
  const reminders: MeetingReminder[] = [];
  const now = new Date();
  const in30mins = new Date(now.getTime() + 30 * 60 * 1000);
  const in35mins = new Date(now.getTime() + 35 * 60 * 1000);
  
  // Check Google Calendar
  try {
    const calendar = new GoogleCalendar(db, user.id, user.pin_hash, envVars.GOOGLE_CLIENT_ID, envVars.GOOGLE_CLIENT_SECRET);
    const events = await calendar.listEvents('primary', {
      timeMin: in30mins.toISOString(),
      timeMax: in35mins.toISOString(),
      maxResults: 10,
    });
    
    for (const event of events) {
      const startTime = event.start.dateTime || event.start.date;
      if (!startTime) continue;
      
      const eventStart = new Date(startTime);
      const minutesUntil = Math.round((eventStart.getTime() - now.getTime()) / (60 * 1000));
      
      // Check if we already sent a reminder
      const existingReminder = await db.prepare(`
        SELECT id FROM meeting_reminders 
        WHERE user_id = ? AND event_id = ? AND event_source = 'google' AND reminder_type = '30min'
      `).bind(user.id, event.id).first<{ id: number }>();
      
      if (existingReminder) continue;
      
      reminders.push({
        eventId: event.id || '',
        title: event.summary,
        startTime,
        location: event.location,
        attendees: event.attendees?.map(a => a.displayName || a.email),
        source: 'google',
        minutesUntil,
      });
    }
  } catch {}
  
  return reminders;
}

export async function sendMeetingReminder(
  db: D1Database,
  user: UserRecord,
  reminder: MeetingReminder
): Promise<void> {
  // Record that we sent this reminder
  await db.prepare(`
    INSERT OR IGNORE INTO meeting_reminders (user_id, event_id, event_source, reminder_type)
    VALUES (?, ?, ?, '30min')
  `).bind(user.id, reminder.eventId, reminder.source).run();
  
  // Create notification
  const body = [
    `🗓 *${reminder.title}*`,
    `⏰ In ${reminder.minutesUntil} minutes`,
    reminder.location ? `📍 ${reminder.location}` : '',
    reminder.attendees?.length ? `👥 ${reminder.attendees.slice(0, 3).join(', ')}` : '',
  ].filter(Boolean).join('\n');
  
  await db.prepare(`
    INSERT INTO notifications (user_id, type, title, body, source)
    VALUES (?, 'reminder', 'Meeting in 30 minutes', ?, ?)
  `).bind(user.id, body, `calendar:${reminder.eventId}`).run();
  
  // Send Telegram notification
  if (user.telegram_chat_id) {
    try {
      const botTokenCred = await db.prepare(`
        SELECT c.encrypted_value, u.pin_hash FROM credentials c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.user_id = ? AND c.service = 'telegram_bot_token'
      `).bind(user.id).first<{ encrypted_value: string; pin_hash: string }>();
      
      if (botTokenCred) {
        const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: user.telegram_chat_id,
            text: `⏰ *Meeting Reminder*\n\n${body}`,
            parse_mode: 'Markdown',
          }),
        });
      }
    } catch {}
  }
}

// === Pattern Recognition ===

export async function recordUserPattern(
  db: D1Database,
  userId: number,
  patternType: 'usage' | 'schedule' | 'email' | 'calendar' | 'preference',
  data: Record<string, unknown>
): Promise<void> {
  // Get existing pattern data
  const existing = await db.prepare(`
    SELECT data_json, confidence FROM pattern_data WHERE user_id = ? AND pattern_type = ?
  `).bind(userId, patternType).first<{ data_json: string; confidence: number }>();
  
  let mergedData = data;
  let confidence = 0.5;
  
  if (existing) {
    const oldData = JSON.parse(existing.data_json);
    mergedData = { ...oldData, ...data };
    confidence = Math.min(1.0, existing.confidence + 0.05);
  }
  
  await db.prepare(`
    INSERT INTO pattern_data (user_id, pattern_type, data_json, confidence)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, pattern_type) DO UPDATE SET
      data_json = excluded.data_json,
      confidence = excluded.confidence,
      updated_at = CURRENT_TIMESTAMP
  `).bind(userId, patternType, JSON.stringify(mergedData), confidence).run();
}

export async function getUserPatterns(db: D1Database, userId: number): Promise<Record<string, any>> {
  const patterns = await db.prepare(`
    SELECT pattern_type, data_json, confidence FROM pattern_data WHERE user_id = ?
  `).bind(userId).all<{ pattern_type: string; data_json: string; confidence: number }>();
  
  const result: Record<string, any> = {};
  for (const p of patterns.results || []) {
    result[p.pattern_type] = {
      data: JSON.parse(p.data_json),
      confidence: p.confidence,
    };
  }
  return result;
}
