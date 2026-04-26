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
import { GmailService } from '../services/gmail';
import { runBrowserTask } from '../services/browser';

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

// Manually generate a morning briefing
proactive.get('/morning-briefing', async (c) => {
  const user = c.get('user')!;
  
  try {
    const result = await generateMorningBriefing(c.env.DB, user, {
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

// Run morning briefing for users whose morning briefing time matches current time
proactive.post('/cron/morning-briefing', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const usersWithPrefs = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<UserRecord & { morning_briefing_time: string; morning_briefing_enabled: number; notification_channels: string }>();

    const results: any[] = [];
    const now = new Date();

    for (const user of usersWithPrefs.results || []) {
      if (!user.morning_briefing_enabled) continue;

      const timezone = user.timezone || 'Asia/Kolkata';
      const briefingTime = user.morning_briefing_time || '08:00';

      if (!shouldRunBriefing(briefingTime, timezone, now)) continue;

      try {
        const briefing = await generateMorningBriefing(c.env.DB, user, {
          GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        });

        // Send via Telegram if configured
        let channels: { telegram?: boolean; web?: boolean } = { telegram: true, web: true };
        try {
          channels = JSON.parse(user.notification_channels || '{}');
        } catch { /* ignore */ }
        if (channels.telegram !== false && user.telegram_chat_id && briefing.briefingId) {
          const text = formatMorningBriefingForTelegram(briefing.content);
          await sendTelegramPlainText(c.env.DB, user, text);
          await c.env.DB.prepare(
            'UPDATE briefings SET delivered_telegram = 1 WHERE id = ?'
          ).bind(briefing.briefingId).run();
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

// Run email digest for users with email digest enabled
proactive.post('/cron/email-digest', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const usersWithPrefs = await c.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<UserRecord & { components: string }>();

    const results: any[] = [];

    for (const user of usersWithPrefs.results || []) {
      let components: { email_digest?: boolean } = {};
      try {
        components = JSON.parse(user.components || '{}');
      } catch { /* ignore */ }
      if (components.email_digest === false) continue;

      try {
        const digest = await generateEmailDigest(c.env.DB, user, {
          GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        });

        const title = `Email Digest — ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`;
        const body = JSON.stringify(digest, null, 2);

        const itemResult = await c.env.DB.prepare(
          `INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`
        ).bind(
          user.id,
          title,
          body,
          `email_digest_${Date.now()}`,
          null,
          null,
          null
        ).first<{ id: number }>();

        results.push({ user_id: user.id, status: 'success', action_item_id: itemResult?.id, digest });
      } catch (err: any) {
        results.push({ user_id: user.id, status: 'error', error: err.message });
      }
    }

    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Run weekly review for users whose weekly review day/time matches current time
proactive.post('/cron/weekly-review', async (c) => {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  if (secret !== expected) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const usersWithPrefs = await c.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<UserRecord & { weekly_review_day_time: string; weekly_review_enabled: number; notification_channels: string }>();

    const results: any[] = [];
    const now = new Date();

    for (const user of usersWithPrefs.results || []) {
      if (!user.weekly_review_enabled) continue;

      const timezone = user.timezone || 'Asia/Kolkata';
      const dayTime = user.weekly_review_day_time || 'Sunday 20:00';
      if (!shouldRunWeeklyReview(dayTime, timezone, now)) continue;

      try {
        const review = await generateWeeklyReview(c.env.DB, user, {
          GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        });

        const title = `Weekly Review — Week of ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        const body = JSON.stringify(review, null, 2);

        const itemResult = await c.env.DB.prepare(
          `INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`
        ).bind(
          user.id,
          title,
          body,
          `weekly_review_${Date.now()}`,
          null,
          null,
          null
        ).first<{ id: number }>();

        // Send via Telegram if configured
        let channels: { telegram?: boolean; web?: boolean } = { telegram: true, web: true };
        try {
          channels = JSON.parse(user.notification_channels || '{}');
        } catch { /* ignore */ }
        if (channels.telegram !== false && user.telegram_chat_id) {
          const text = formatWeeklyReviewForTelegram(review);
          await sendTelegramPlainText(c.env.DB, user, text);
        }

        results.push({ user_id: user.id, status: 'success', action_item_id: itemResult?.id });
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
          text: text.replace(/[_*[`\]]/g, ''),  // strip markdown chars
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

// === Helper: Send plain text Telegram message ===

async function sendTelegramPlainText(db: D1Database, user: UserRecord, text: string): Promise<void> {
  try {
    const botTokenCred = await db.prepare(
      `SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`
    ).bind(user.id).first<{ encrypted_value: string; pin_hash: string }>();
    if (!botTokenCred) return;
    const botToken = await decrypt(botTokenCred.encrypted_value, botTokenCred.pin_hash);
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: user.telegram_chat_id,
        text: text.substring(0, 4000),
        parse_mode: 'Markdown',
      }),
    });
    if (!tgRes.ok) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: user.telegram_chat_id,
          text: text.substring(0, 4000).replace(/[_*[`\]]/g, ''),
        }),
      });
    }
  } catch (err: any) {
    console.error('Telegram plain text error:', err.message);
  }
}

// === Helper: Generate Morning Briefing ===

async function generateMorningBriefing(
  db: D1Database,
  user: UserRecord,
  env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<{ briefingId: number; content: any }> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const cronJobs = await db.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(user.id, todayStart.toISOString(), todayEnd.toISOString()).all<any>();

  const pendingActions = await db.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(user.id).all<any>();

  const emailDigest = await generateEmailDigest(db, user, env);

  let calendarEvents: any[] = [];
  try {
    const tokenCred = await db.prepare(
      `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`
    ).bind(user.id).first<{ encrypted_value: string }>();
    if (tokenCred) {
      const tokensJson = await decrypt(tokenCred.encrypted_value, user.pin_hash);
      const tokens = JSON.parse(tokensJson);
      const accessToken = tokens.access_token;
      if (accessToken) {
        const timeMin = todayStart.toISOString();
        const timeMax = todayEnd.toISOString();
        const calRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&maxResults=20`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (calRes.ok) {
          const calData = await calRes.json() as { items?: any[] };
          calendarEvents = (calData.items || []).map((e: any) => ({
            title: e.summary || 'Untitled',
            startTime: e.start?.dateTime || e.start?.date,
            endTime: e.end?.dateTime || e.end?.date,
          }));
        }
      }
    }
  } catch {
    // Calendar optional
  }

  const content = {
    generatedAt: new Date().toISOString(),
    type: 'morning',
    todayReminders: (cronJobs.results || []).map((j: any) => ({
      name: j.name,
      description: j.description,
      next_run: j.next_run,
    })),
    pendingActions: (pendingActions.results || []).map((a: any) => ({
      title: a.title,
      priority: a.priority,
    })),
    emailDigest,
    calendarEvents,
  };

  const briefingResult = await db.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'morning', ?, 'all')
    RETURNING id
  `).bind(user.id, JSON.stringify(content)).first<{ id: number }>();

  const briefingId = briefingResult?.id || 0;
  return { briefingId, content };
}

// === Helper: Generate Email Digest ===

async function generateEmailDigest(
  db: D1Database,
  user: UserRecord,
  env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<{ gmail: any; outlook: any }> {
  const gmailData: any = { unreadCount: 0, recent: [] };
  const outlookData: any = { message: '', recent: [] };

  // Gmail
  try {
    const tokenCred = await db.prepare(
      `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`
    ).bind(user.id).first<{ encrypted_value: string }>();
    if (tokenCred) {
      const gmail = new GmailService(db, user.id, user.pin_hash, env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
      const unreadCount = await gmail.getUnreadCount();
      const messages = await gmail.listMessages({ maxResults: 10, labelIds: ['INBOX'] });
      gmailData.unreadCount = unreadCount;
      gmailData.recent = messages.map(m => ({
        id: m.id,
        subject: m.subject,
        from: m.from,
        snippet: m.snippet,
        isUnread: m.isUnread,
      }));
    }
  } catch (err: any) {
    gmailData.error = err.message;
  }

  // Outlook via Browser Use Cloud
  try {
    const vaultEntry = await db.prepare(
      `SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1`
    ).bind(user.id, '%Outlook%', '%Microsoft%', '%Office 365%').first<{ name: string; encrypted_blob: string }>();

    if (!vaultEntry) {
      outlookData.message = 'No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.';
    } else {
      const buCred = await db.prepare(
        'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
      ).bind(user.id, 'browser_use_api_key').first<{ encrypted_value: string }>();
      if (!buCred) {
        outlookData.message = 'Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.';
      } else {
        const apiKey = (await decrypt(buCred.encrypted_value, user.pin_hash)).trim();
        const cred = JSON.parse(await decrypt(vaultEntry.encrypted_blob, user.pin_hash));
        const result = await runBrowserTask(
          `Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.`,
          apiKey,
          {
            secrets: { username: cred.username, password: cred.password },
            timeoutMs: 88000,
          }
        );
        if (result.status === 'completed' && result.output) {
          outlookData.recent = result.output;
        } else if (result.status === 'timeout') {
          outlookData.message = 'Outlook browser task timed out.';
        } else {
          outlookData.message = 'Outlook returned no content.';
        }
      }
    }
  } catch (err: any) {
    outlookData.message = `Outlook error: ${err.message}`;
  }

  return { gmail: gmailData, outlook: outlookData };
}

// === Helper: Check Weekly Review Timing ===

function shouldRunWeeklyReview(dayTime: string, timezone: string, now: Date = new Date()): boolean {
  const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const userDay = userNow.toLocaleDateString('en-US', { weekday: 'long' });
  const userHour = userNow.getHours();
  const userMinute = userNow.getMinutes();

  const parts = dayTime.trim().split(' ');
  const timePart = parts[parts.length - 1];
  const dayPart = parts.slice(0, parts.length - 1).join(' ');

  const [targetHour, targetMinute] = timePart.split(':').map(Number);
  const currentMinutes = userHour * 60 + userMinute;
  const targetMinutes = targetHour * 60 + targetMinute;

  return userDay === dayPart && currentMinutes === targetMinutes;
}

// === Helper: Generate Weekly Review ===

async function generateWeeklyReview(
  db: D1Database,
  user: UserRecord,
  env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<any> {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const completedTasks = await db.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(user.id, sevenDaysAgo.toISOString()).all<any>();

  const missedTasks = await db.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(user.id, now.toISOString()).all<any>();

  const openActions = await db.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(user.id).all<any>();

  const recentDocuments = await db.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(user.id, sevenDaysAgo.toISOString()).all<any>();

  const upcomingTasks = await db.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(user.id, now.toISOString(), sevenDaysAhead.toISOString()).all<any>();

  let gmailSummary: any = { unreadCount: 0, recent: [] };
  try {
    const tokenCred = await db.prepare(
      `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`
    ).bind(user.id).first<{ encrypted_value: string }>();
    if (tokenCred) {
      const gmail = new GmailService(db, user.id, user.pin_hash, env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
      const unreadCount = await gmail.getUnreadCount();
      const messages = await gmail.listMessages({ maxResults: 10, labelIds: ['INBOX'] });
      gmailSummary = {
        unreadCount,
        recent: messages.map(m => ({
          subject: m.subject,
          from: m.from,
          snippet: m.snippet,
        })),
      };
    }
  } catch {
    // Gmail optional
  }

  return {
    generatedAt: now.toISOString(),
    period: {
      start: sevenDaysAgo.toISOString(),
      end: now.toISOString(),
    },
    completedTasks: (completedTasks.results || []).map((t: any) => ({
      name: t.name,
      last_run: t.last_run,
    })),
    missedTasks: (missedTasks.results || []).map((t: any) => ({
      name: t.name,
      next_run: t.next_run,
    })),
    openActions: (openActions.results || []).map((a: any) => ({
      title: a.title,
      priority: a.priority,
      status: a.status,
    })),
    recentDocuments: (recentDocuments.results || []).map((d: any) => ({
      name: d.name,
      status: d.status,
      created_at: d.created_at,
    })),
    upcomingTasks: (upcomingTasks.results || []).map((t: any) => ({
      name: t.name,
      next_run: t.next_run,
    })),
    gmailSummary,
  };
}

// === Helper: Format Morning Briefing for Telegram ===

function formatMorningBriefingForTelegram(content: any): string {
  const lines: string[] = [];
  lines.push('☀️ Morning Briefing');
  lines.push('');
  const reminders = content.todayReminders || [];
  if (reminders.length > 0) {
    lines.push(`📋 Today (${reminders.length}):`);
    for (const r of reminders) {
      const time = r.next_run ? new Date(r.next_run).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      lines.push(`   • ${time} ${r.name}`);
    }
  } else {
    lines.push('📋 Today: No scheduled reminders');
  }
  lines.push('');

  const actions = content.pendingActions || [];
  if (actions.length > 0) {
    lines.push(`🔔 Pending Actions (${actions.length}):`);
    for (const a of actions.slice(0, 5)) {
      lines.push(`   • ${a.title} (${a.priority})`);
    }
  } else {
    lines.push('🔔 Pending Actions: None');
  }
  lines.push('');

  const digest = content.emailDigest || {};
  const gmail = digest.gmail || {};
  if (gmail.unreadCount > 0) {
    lines.push(`📧 Gmail: ${gmail.unreadCount} unread`);
  } else {
    lines.push('📧 Gmail: Inbox clear');
  }
  const outlook = digest.outlook || {};
  if (typeof outlook.recent === 'string' && outlook.recent.length > 0) {
    lines.push('📧 Outlook: see digest');
  } else if (outlook.message) {
    lines.push(`📧 Outlook: ${outlook.message}`);
  }
  lines.push('');

  const calendar = content.calendarEvents || [];
  if (calendar.length > 0) {
    lines.push(`📅 Calendar (${calendar.length}):`);
    for (const e of calendar.slice(0, 5)) {
      const time = e.startTime ? new Date(e.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      lines.push(`   • ${time} ${e.title}`);
    }
  }

  return lines.join('\n');
}

// === Helper: Format Weekly Review for Telegram ===

function formatWeeklyReviewForTelegram(review: any): string {
  const lines: string[] = [];
  lines.push('📊 Weekly Review');
  lines.push('');

  const completed = review.completedTasks || [];
  lines.push(`✅ Completed: ${completed.length}`);
  const missed = review.missedTasks || [];
  lines.push(`❌ Missed/Overdue: ${missed.length}`);
  const open = review.openActions || [];
  lines.push(`🔔 Open Actions: ${open.length}`);
  lines.push('');

  const docs = review.recentDocuments || [];
  if (docs.length > 0) {
    lines.push(`📄 Documents: ${docs.length} this week`);
  }

  const upcoming = review.upcomingTasks || [];
  if (upcoming.length > 0) {
    lines.push(`📅 Upcoming: ${upcoming.length} in next 7 days`);
  }

  const gmail = review.gmailSummary || {};
  if (gmail.unreadCount > 0) {
    lines.push(`📧 Gmail Unread: ${gmail.unreadCount}`);
  }

  return lines.join('\n');
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
