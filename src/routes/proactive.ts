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
        components: {
          google_calendar: true,
          outlook_calendar: true,
          gmail: true,
          outlook_email: true,
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
    const preferences: BriefingPreferences = {
      briefingTime: prefs.briefing_time,
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
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all<UserRecord & { briefing_time: string }>();
    
    const results: any[] = [];
    const now = new Date();
    
    for (const user of usersWithPrefs.results || []) {
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
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: user.telegram_chat_id,
        text: `🌙 *Evening Briefing*\n\n${text}`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: inlineKeyboard.map(row => row.map(btn => ({
            ...btn,
            callback_data: `${btn.callback_data}:${briefingId}`,
          }))),
        },
      }),
    });
    
    // Mark as delivered
    await db.prepare(
      'UPDATE briefings SET delivered_telegram = 1 WHERE id = ?'
    ).bind(briefingId).run();
  } catch (err: any) {
    console.error('Telegram briefing error:', err.message);
  }
}



// Delete a specific briefing
proactive.delete('/briefings/:id', requireAuth, async (c) => {
  const userId = c.get('user').id;
  const briefingId = c.req.param('id');
  
  // Delete briefing
  await c.env.DB.prepare(
    'DELETE FROM briefings WHERE id = ? AND user_id = ?'
  ).bind(briefingId, userId).run();
  
  return c.json({ success: true });
});

export default proactive;
