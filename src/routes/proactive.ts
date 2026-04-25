// Proactive Intelligence Routes — Briefings and Meeting Reminders
// API endpoints for evening briefings and meeting reminders

import { Hono } from 'hono';
import type {
  AppEnv,
  UserRecord,
  BriefingPreferencesRecord,
  BriefingPreferences,
  BriefingComponentsConfig,
  NotificationChannelsConfig,
  ProactiveLevel,
} from '../types';
import {
  generateEveningBriefing,
  getBriefing,
  toggleBriefingItem,
  getRecentBriefings,
  formatBriefingForTelegram,
  shouldRunBriefing,
} from '../services/briefing';
import { decrypt } from '../services/crypto';
import { buildEmailDigest } from '../services/email-digest';

const proactive = new Hono<AppEnv>();

// Auth middleware - skip for cron endpoints
async function requireAuth(c: any, next: any) {
  // Skip auth for cron endpoints (they use X-Cron-Secret instead)
  if (c.req.path.includes('/cron/')) {
    return next();
  }
  
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<any>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
    role: session.role,
    personality_prompt: session.personality_prompt,
    telegram_chat_id: session.telegram_chat_id,
    timezone: session.timezone,
    assistant_name: session.assistant_name || 'Karna',
    created_at: session.created_at,
    updated_at: session.updated_at,
  } as UserRecord);
  c.set('sessionId', sessionId);
  
  await next();
}

proactive.use('/*', requireAuth);

// ==========================================
// Briefings API
// ==========================================

// Get recent briefings
proactive.get('/briefings', async (c) => {
  const user = c.get('user')!;
  const limit = parseInt(c.req.query('limit') || '10');
  
  try {
    const briefings = await getRecentBriefings(c.env.DB, user.id, limit);
    return c.json({ briefings });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Get specific briefing with items
proactive.get('/briefings/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  
  try {
    const data = await getBriefing(c.env.DB, user.id, id);
    if (!data) return c.json({ error: 'Briefing not found' }, 404);
    return c.json(data);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Toggle a briefing item's checkbox
proactive.post('/briefings/:id/items/:itemId/toggle', async (c) => {
  const user = c.get('user')!;
  const briefingId = parseInt(c.req.param('id'));
  const itemId = parseInt(c.req.param('itemId'));
  
  try {
    const result = await toggleBriefingItem(c.env.DB, user.id, briefingId, itemId);
    if (!result) return c.json({ error: 'Item not found' }, 404);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Manually generate a briefing (for testing)
proactive.post('/briefings/generate', async (c) => {
  const user = c.get('user')!;
  
  try {
    const result = await generateEveningBriefing(c.env.DB, user, {
      GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
    });
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ==========================================
// Briefing Preferences API
// ==========================================

// Get user's briefing preferences
proactive.get('/briefing-preferences', async (c) => {
  const user = c.get('user')!;
  
  try {
    const prefs = await c.env.DB.prepare(
      'SELECT * FROM briefing_preferences WHERE user_id = ?'
    ).bind(user.id).first<BriefingPreferencesRecord>();
    
    if (!prefs) {
      // Return defaults if no preferences exist
      const defaultPrefs = {
        briefingTime: '20:00',
        briefingEnabled: true,
        components: {
          google_calendar: true,
          gmail: true,
          tasks: true,
          news: true,
          weather: false,
        },
        newsTopics: ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'],
        notificationChannels: {
          telegram: true,
          web: true,
        },
        proactiveLevel: 'moderate' as ProactiveLevel,
      };
      return c.json({ preferences: defaultPrefs });
    }
    
    // Parse and return preferences
    const preferences = {
      briefingTime: prefs.briefing_time,
      briefingEnabled: (prefs as any).briefing_enabled !== 0,
      components: JSON.parse(prefs.components),
      newsTopics: prefs.news_topics.split(',').map(t => t.trim()).filter(Boolean),
      notificationChannels: JSON.parse(prefs.notification_channels),
      proactiveLevel: prefs.proactive_level,
    };
    
    return c.json({ preferences });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Save user's briefing preferences
proactive.post('/briefing-preferences', async (c) => {
  const user = c.get('user')!;
  const body = await c.req.json<{
    briefingTime?: string;
    briefingEnabled?: boolean;
    components?: BriefingComponentsConfig;
    newsTopics?: string[];
    notificationChannels?: NotificationChannelsConfig;
    proactiveLevel?: ProactiveLevel;
  }>();
  
  // Validation
  const errors: string[] = [];
  
  // Validate time format (HH:MM)
  if (body.briefingTime) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(body.briefingTime)) {
      errors.push('Invalid time format. Use HH:MM (e.g., 20:00)');
    }
  }
  
  // Validate news topics (max 5)
  if (body.newsTopics) {
    if (body.newsTopics.length > 5) {
      errors.push('Maximum 5 news topics allowed');
    }
    if (body.newsTopics.some(t => t.length > 50)) {
      errors.push('Each news topic must be 50 characters or less');
    }
  }
  
  // Validate proactive level
  if (body.proactiveLevel && !['conservative', 'moderate', 'aggressive'].includes(body.proactiveLevel)) {
    errors.push('Invalid proactive level. Use conservative, moderate, or aggressive');
  }
  
  if (errors.length > 0) {
    return c.json({ error: errors.join('; ') }, 400);
  }
  
  try {
    // Check if preferences exist
    const existing = await c.env.DB.prepare(
      'SELECT id FROM briefing_preferences WHERE user_id = ?'
    ).bind(user.id).first<{ id: number }>();
    
    const componentsJson = body.components ? JSON.stringify(body.components) : null;
    const channelsJson = body.notificationChannels ? JSON.stringify(body.notificationChannels) : null;
    const newsTopicsStr = body.newsTopics ? body.newsTopics.join(', ') : null;
    
    if (existing) {
      // Build dynamic update query
      const updates: string[] = [];
      const values: any[] = [];
      
      if (body.briefingTime !== undefined) {
        updates.push('briefing_time = ?');
        values.push(body.briefingTime);
      }
      if (body.briefingEnabled !== undefined) {
        updates.push('briefing_enabled = ?');
        values.push(body.briefingEnabled ? 1 : 0);
      }
      if (componentsJson !== null) {
        updates.push('components = ?');
        values.push(componentsJson);
      }
      if (newsTopicsStr !== null) {
        updates.push('news_topics = ?');
        values.push(newsTopicsStr);
      }
      if (channelsJson !== null) {
        updates.push('notification_channels = ?');
        values.push(channelsJson);
      }
      if (body.proactiveLevel !== undefined) {
        updates.push('proactive_level = ?');
        values.push(body.proactiveLevel);
      }
      
      if (updates.length > 0) {
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(user.id);
        
        await c.env.DB.prepare(
          `UPDATE briefing_preferences SET ${updates.join(', ')} WHERE user_id = ?`
        ).bind(...values).run();
      }
    } else {
      // Insert new preferences with defaults
      await c.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        user.id,
        body.briefingTime || '20:00',
        componentsJson || '{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',
        newsTopicsStr || 'AI, LLM, Tools, Agentic Workflows, AI Features',
        channelsJson || '{"telegram":true,"web":true}',
        body.proactiveLevel || 'moderate'
      ).run();
    }
    
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Initialize default preferences for a user (called on user creation or manual)
proactive.post('/briefing-preferences/init-defaults', async (c) => {
  const user = c.get('user')!;
  
  try {
    // Check if preferences already exist
    const existing = await c.env.DB.prepare(
      'SELECT id FROM briefing_preferences WHERE user_id = ?'
    ).bind(user.id).first<{ id: number }>();
    
    if (existing) {
      return c.json({ success: true, message: 'Preferences already exist' });
    }
    
    // Create default preferences
    await c.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(user.id).run();
    
    return c.json({ success: true, message: 'Default preferences created' });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ==========================================
// System Endpoints (for cron worker)
// ==========================================

// Run evening briefing for users whose briefing time matches current time
// Called every minute by cron worker - checks each user's configured briefing time
proactive.post('/cron/evening-briefing', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    // Get all users with their briefing preferences
    const usersWithPrefs = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<UserRecord & { briefing_time: string; briefing_enabled: number }>();
    
    const results: any[] = [];
    const now = new Date();
    
    for (const user of usersWithPrefs.results || []) {
      // Skip users who have disabled briefing
      if (!user.briefing_enabled) {
        continue;
      }
      
      const timezone = user.timezone || 'Asia/Kolkata';
      const briefingTime = user.briefing_time || '20:00';
      
      // Check if it's time for this user's briefing
      if (!shouldRunBriefing(briefingTime, timezone, now)) {
        continue; // Skip users not scheduled for this minute
      }
      
      try {
        const briefing = await generateEveningBriefing(c.env.DB, user, {
          GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        });
        
        // Send via Telegram if configured
        if (user.telegram_chat_id) {
          const { text, inlineKeyboard } = formatBriefingForTelegram(briefing.content, briefing.items);
          await sendTelegramBriefing(c.env.DB, user, text, inlineKeyboard, briefing.briefingId);
        }
        
        results.push({ 
          user_id: user.id, 
          status: 'success', 
          briefing_id: briefing.briefingId,
          briefing_time: briefingTime,
          timezone: timezone
        });
      } catch (err: any) {
        results.push({ user_id: user.id, status: 'error', error: err.message });
      }
    }
    
    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

proactive.post('/cron/morning-briefing', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const users = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_enabled, 1) as morning_enabled,
             COALESCE(bp.morning_time, '08:00') as morning_time,
             bp.last_morning_briefing_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<any>();
    const now = new Date();
    const results: any[] = [];
    for (const user of users.results || []) {
      if (!user.morning_enabled) continue;
      const timezone = user.timezone || 'Asia/Kolkata';
      const today = localDateKey(now, timezone);
      if (user.last_morning_briefing_date === today || !shouldRunBriefing(user.morning_time || '08:00', timezone, now)) continue;
      const digest = await buildEmailDigest(c.env.DB, user, { GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET });
      const content = formatDailyDigest('Morning Briefing', today, digest);
      await insertNotification(c.env.DB, user.id, 'system', 'Morning briefing', content, 'high');
      await c.env.DB.prepare(`UPDATE briefing_preferences SET last_morning_briefing_date = ? WHERE user_id = ?`).bind(today, user.id).run().catch(() => null);
      results.push({ user_id: user.id, status: 'success' });
    }
    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

proactive.post('/cron/email-digest', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);
  try {
    const users = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.email_digest_enabled, 1) as email_digest_enabled,
             COALESCE(bp.morning_time, '08:00') as digest_time,
             bp.last_email_digest_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<any>();
    const now = new Date();
    const results: any[] = [];
    for (const user of users.results || []) {
      if (!user.email_digest_enabled) continue;
      const timezone = user.timezone || 'Asia/Kolkata';
      const today = localDateKey(now, timezone);
      if (user.last_email_digest_date === today || !shouldRunBriefing(user.digest_time || '08:00', timezone, now)) continue;
      const digest = await buildEmailDigest(c.env.DB, user, { GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET });
      await insertNotification(c.env.DB, user.id, 'mail', 'Email digest', formatDailyDigest('Email Digest', today, digest), 'normal');
      await c.env.DB.prepare(`UPDATE briefing_preferences SET last_email_digest_date = ? WHERE user_id = ?`).bind(today, user.id).run().catch(() => null);
      results.push({ user_id: user.id, status: 'success', outlook_status: digest.outlookStatus });
    }
    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

proactive.post('/cron/weekly-review', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);
  try {
    const users = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             COALESCE(bp.weekly_review_day, 1) as weekly_review_day,
             COALESCE(bp.weekly_review_time, '09:00') as weekly_review_time,
             bp.last_weekly_review_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<any>();
    const now = new Date();
    const results: any[] = [];
    for (const user of users.results || []) {
      if (!user.weekly_review_enabled) continue;
      const timezone = user.timezone || 'Asia/Kolkata';
      const today = localDateKey(now, timezone);
      const local = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
      if (Number(user.weekly_review_day) !== local.getDay() || user.last_weekly_review_date === today || !shouldRunBriefing(user.weekly_review_time || '09:00', timezone, now)) continue;
      const [completed, open, docs] = await Promise.all([
        c.env.DB.prepare(`SELECT title FROM action_items WHERE user_id = ? AND status = 'completed' AND completed_at > datetime('now', '-7 days') LIMIT 10`).bind(user.id).all<any>().catch(() => ({ results: [] })),
        c.env.DB.prepare(`SELECT title FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','failed') LIMIT 10`).bind(user.id).all<any>().catch(() => ({ results: [] })),
        c.env.DB.prepare(`SELECT name, summary FROM document_library WHERE user_id = ? AND updated_at > datetime('now', '-7 days') LIMIT 8`).bind(user.id).all<any>().catch(() => ({ results: [] })),
      ]);
      const digest = await buildEmailDigest(c.env.DB, user, { GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET });
      const body = `Weekly Review - ${today}\n\nCompleted\n${listLines(completed.results, 'title')}\n\nOpen Tasks\n${listLines(open.results, 'title')}\n\nDocuments\n${(docs.results || []).map((d: any) => `- ${d.name}${d.summary ? ': ' + d.summary.slice(0, 120) : ''}`).join('\n') || '- None'}\n\n${formatDailyDigest('Important Email', today, digest)}`;
      await insertNotification(c.env.DB, user.id, 'system', 'Weekly review', body, 'high');
      await c.env.DB.prepare(`UPDATE briefing_preferences SET last_weekly_review_date = ? WHERE user_id = ?`).bind(today, user.id).run().catch(() => null);
      results.push({ user_id: user.id, status: 'success' });
    }
    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Run meeting reminder check (called every 5 minutes)
// Sends Telegram notification for meetings starting within 10 minutes
proactive.post('/cron/meeting-reminders', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const users = await c.env.DB.prepare('SELECT * FROM users WHERE telegram_chat_id IS NOT NULL').all<UserRecord>();
    const results: any[] = [];
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
    const fifteenMinutesLater = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    for (const user of users.results || []) {
      try {
        // Fetch Google OAuth token
        const tokenCred = await c.env.DB.prepare(
          `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`
        ).bind(user.id).first<{ encrypted_value: string }>();
        if (!tokenCred) continue;

        const tokensJson = await decrypt(tokenCred.encrypted_value, user.pin_hash);
        const tokens = JSON.parse(tokensJson);
        const accessToken = tokens.access_token;
        if (!accessToken) continue;

        // Fetch upcoming events in 10-15 min window
        const calRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(now.toISOString())}&timeMax=${encodeURIComponent(fifteenMinutesLater)}&maxResults=10`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!calRes.ok) continue;

        const calData = await calRes.json() as { items?: any[] };
        const upcomingEvents = (calData.items || []).filter((e: any) => {
          const start = e.start?.dateTime;
          if (!start) return false;
          return start >= now.toISOString() && start <= tenMinutesLater;
        });

        if (upcomingEvents.length === 0) {
          results.push({ user_id: user.id, reminders_sent: 0 });
          continue;
        }

        // Get bot token for Telegram
        const botCred = await c.env.DB.prepare(
          `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'`
        ).bind(user.id).first<{ encrypted_value: string }>();
        if (!botCred) continue;

        const botToken = await decrypt(botCred.encrypted_value, user.pin_hash);

        for (const event of upcomingEvents) {
          const startTime = new Date(event.start.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const location = event.location ? `\n📍 ${event.location}` : '';
          const msg = `⏰ Meeting in 10 minutes!\n\n*${event.summary || 'Untitled Event'}*\n🕐 ${startTime}${location}`;

          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: user.telegram_chat_id,
              text: msg,
              parse_mode: 'Markdown',
            }),
          });
        }

        results.push({ user_id: user.id, reminders_sent: upcomingEvents.length });
      } catch (err: any) {
        results.push({ user_id: user.id, status: 'error', error: err.message });
      }
    }

    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// === Helper: Send Telegram Briefing ===

async function sendTelegramBriefing(
  db: D1Database,
  user: UserRecord,
  text: string,
  inlineKeyboard: Array<Array<{ text: string; callback_data: string }>>,
  briefingId: number
): Promise<void> {
  try {
    const botTokenCred = await db.prepare(
      `SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`
    ).bind(user.id).first<{ encrypted_value: string; pin_hash: string }>();
    
    if (!botTokenCred) return;
    
    const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
    
    // Send message with inline keyboard
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: user.telegram_chat_id,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: inlineKeyboard.map(row => row.map(btn => ({
            ...btn,
            callback_data: `${btn.callback_data}:${briefingId}`,
          }))),
        },
      }),
    });

    const tgJson = await tgRes.json() as { ok: boolean; description?: string };
    if (!tgJson.ok) {
      // Markdown parse failed — retry as plain text
      const tgRetry = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: user.telegram_chat_id,
          text: text.replace(/[_*[\]`]/g, ''),  // strip markdown chars
          reply_markup: {
            inline_keyboard: inlineKeyboard.map(row => row.map(btn => ({
              ...btn,
              callback_data: `${btn.callback_data}:${briefingId}`,
            }))),
          },
        }),
      });
      const retryJson = await tgRetry.json() as { ok: boolean; description?: string };
      if (!retryJson.ok) {
        console.error('Telegram briefing send failed:', retryJson.description, 'chat_id:', user.telegram_chat_id);
        return;
      }
    }

    // Only mark delivered after confirmed success
    await db.prepare(
      'UPDATE briefings SET delivered_telegram = 1 WHERE id = ?'
    ).bind(briefingId).run();
  } catch (err: any) {
    console.error('Telegram briefing error:', err.message);
  }
}

function localDateKey(date: Date, timezone: string): string {
  const local = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const y = local.getFullYear();
  const m = String(local.getMonth() + 1).padStart(2, '0');
  const d = String(local.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDailyDigest(title: string, date: string, digest: { gmail: string[]; outlook: string[] }): string {
  return `${title} - ${date}\n\nGmail\n${digest.gmail.map((x) => `- ${x}`).join('\n') || '- No Gmail items.'}\n\nOutlook\n${digest.outlook.map((x) => `- ${x}`).join('\n') || '- Outlook returned no content.'}`;
}

function listLines(rows: any[] | undefined, field: string): string {
  const lines = (rows || []).map((r) => `- ${r[field]}`).filter(Boolean);
  return lines.length ? lines.join('\n') : '- None';
}

async function insertNotification(db: D1Database, userId: number, type: string, title: string, body: string, priority: string): Promise<void> {
  await db.prepare(
    `INSERT INTO notifications (user_id, type, title, body, priority, status, source)
     VALUES (?, ?, ?, ?, ?, 'open', 'proactive')`
  ).bind(userId, type, title, body, priority).run();
}



// Resend a briefing to Telegram
proactive.post('/briefings/:id/resend', async (c) => {
  const user = c.get('user')!;
  const briefingId = parseInt(c.req.param('id'));
  try {
    const row = await c.env.DB.prepare(
      'SELECT * FROM briefings WHERE id = ? AND user_id = ?'
    ).bind(briefingId, user.id).first<any>();
    if (!row) return c.json({ error: 'Briefing not found' }, 404);
    const content = JSON.parse(row.content || '{}');
    const items = await c.env.DB.prepare(
      'SELECT * FROM briefing_items WHERE briefing_id = ?'
    ).bind(briefingId).all<any>();
    const { text, inlineKeyboard } = formatBriefingForTelegram(content, items.results || []);
    // Reset delivered flag first so we can re-mark on success
    await c.env.DB.prepare('UPDATE briefings SET delivered_telegram = 0 WHERE id = ?').bind(briefingId).run();
    await sendTelegramBriefing(c.env.DB, user, text, inlineKeyboard, briefingId);
    // Check if it got marked delivered
    const check = await c.env.DB.prepare('SELECT delivered_telegram FROM briefings WHERE id = ?').bind(briefingId).first<any>();
    if (check?.delivered_telegram) {
      return c.json({ success: true, message: 'Briefing sent to Telegram' });
    } else {
      return c.json({ error: 'Telegram send failed — check bot token and chat ID in Settings' }, 500);
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Delete a specific briefing
proactive.delete('/briefings/:id', async (c) => {
  const user = c.get('user')!;
  const briefingId = c.req.param('id');

  await c.env.DB.prepare(
    'DELETE FROM briefings WHERE id = ? AND user_id = ?'
  ).bind(briefingId, user.id).run();

  return c.json({ success: true });
});

export default proactive;
