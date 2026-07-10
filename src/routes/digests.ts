// Digests API — unified proactive intelligence.
//
// Replaces routes/proactive.ts. One set of endpoints for all four kinds
// (morning / evening / weekly / email), plus a single cron tick that evaluates
// every user's schedule and fires whichever digests are due.

import { Hono, type Context, type Next } from 'hono';
import type { AppEnv, UserRecord, SessionUserRow, DigestKind, DigestConfig } from '../types';
import { logError } from '../utils/logger';
import {
  generateDigest,
  getDigest,
  toggleDigestItem,
  getRecentDigests,
  deleteDigest,
  getDigestConfigs,
  getDigestConfig,
  upsertDigestConfig,
  validateDigestConfigUpdate,
  getDefaultDigestConfigs,
  shouldRunDigest,
  getAllDueCandidates,
} from '../services/digest';
import { allSectionFetchers } from '../services/digest/sections';

const digests = new Hono<AppEnv>();

// Auth middleware — skip for cron endpoints (they use X-Cron-Secret instead).
async function requireAuth(c: Context<AppEnv>, next: Next) {
  if (c.req.path.includes('/cron/')) {
    return next();
  }

  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`,
  )
    .bind(sessionId)
    .first<SessionUserRow>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
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

digests.use('/*', requireAuth);

function cronSecretOk(c: Context<AppEnv>): boolean {
  const secret = c.req.header('X-Cron-Secret') || '';
  const expected = c.env.CRON_SECRET || 'karna-cron-default-v1';
  return secret === expected;
}

// ==========================================
// Digests
// ==========================================

// List recent digests (optional ?kind=morning|evening|weekly|email&limit=20)
digests.get('/', async (c) => {
  const user = c.get('user')!;
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 100);
  const kindParam = c.req.query('kind') as DigestKind | undefined;
  const validKinds: DigestKind[] = ['morning', 'evening', 'weekly', 'email'];
  const kind = kindParam && validKinds.includes(kindParam) ? kindParam : undefined;

  try {
    const list = await getRecentDigests(c.env.DB, user.id, limit, kind);
    return c.json({ digests: list });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ==========================================
// Digest configs (settings) — registered before /:id so the static path wins
// ==========================================

// Get all four configs (+ the catalogue of available sections per kind)
digests.get('/configs', async (c) => {
  const user = c.get('user')!;
  try {
    const configs = await getDigestConfigs(c.env.DB, user.id);
    const sections = allSectionFetchers().map((f) => ({
      key: f.key,
      title: f.title,
      appliesTo: {
        morning: f.appliesTo('morning'),
        evening: f.appliesTo('evening'),
        weekly: f.appliesTo('weekly'),
        email: f.appliesTo('email'),
      },
    }));
    return c.json({ configs, sections });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Update a single config. Body: partial DigestConfig. ?kind=morning|evening|weekly|email
digests.put('/configs', async (c) => {
  const user = c.get('user')!;
  const kind = c.req.query('kind') as DigestKind | undefined;
  const validKinds: DigestKind[] = ['morning', 'evening', 'weekly', 'email'];
  if (!kind || !validKinds.includes(kind)) {
    return c.json({ error: 'Invalid or missing ?kind= parameter' }, 400);
  }

  const body = await c.req.json<Partial<DigestConfig>>().catch(() => ({}) as Partial<DigestConfig>);

  const errors = validateDigestConfigUpdate({
    enabled: body.enabled,
    scheduleTime: body.scheduleTime,
    scheduleWeekday: body.scheduleWeekday,
    sections: body.sections,
    notifyChannels: body.notifyChannels,
    newsTopics: body.newsTopics,
  });
  if (errors.length > 0) return c.json({ error: errors.join('; ') }, 400);

  try {
    const current = await getDigestConfig(c.env.DB, user.id, kind);
    const merged: DigestConfig = {
      kind,
      enabled: body.enabled ?? current.enabled,
      scheduleTime: body.scheduleTime ?? current.scheduleTime,
      scheduleWeekday:
        body.scheduleWeekday === undefined ? current.scheduleWeekday : body.scheduleWeekday,
      sections: body.sections ?? current.sections,
      notifyChannels: body.notifyChannels ?? current.notifyChannels,
      newsTopics: body.newsTopics ?? current.newsTopics,
    };
    await upsertDigestConfig(c.env.DB, user.id, kind, merged);
    return c.json({ success: true, config: merged });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Reset a single config to defaults
digests.post('/configs/reset', async (c) => {
  const user = c.get('user')!;
  const kind = c.req.query('kind') as DigestKind | undefined;
  const validKinds: DigestKind[] = ['morning', 'evening', 'weekly', 'email'];
  if (!kind || !validKinds.includes(kind)) {
    return c.json({ error: 'Invalid or missing ?kind= parameter' }, 400);
  }

  try {
    const defaults = getDefaultDigestConfigs().find((d) => d.kind === kind)!;
    await upsertDigestConfig(c.env.DB, user.id, kind, defaults);
    return c.json({ success: true, config: defaults });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ==========================================
// Individual digest operations
// ==========================================

// Get a specific digest with its items
digests.get('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (!Number.isFinite(id)) return c.json({ error: 'Invalid id' }, 400);

  try {
    const data = await getDigest(c.env.DB, user.id, id);
    if (!data) return c.json({ error: 'Digest not found' }, 404);
    return c.json(data);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Toggle a digest item's checkbox
digests.post('/:id/items/:itemId/toggle', async (c) => {
  const user = c.get('user')!;
  const digestId = parseInt(c.req.param('id'));
  const itemId = parseInt(c.req.param('itemId'));
  if (!Number.isFinite(digestId) || !Number.isFinite(itemId)) {
    return c.json({ error: 'Invalid id' }, 400);
  }

  try {
    const result = await toggleDigestItem(c.env.DB, user.id, digestId, itemId);
    if (!result) return c.json({ error: 'Item not found' }, 404);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Manually generate a digest (for testing / "generate now"). Body: { kind }
digests.post('/generate', async (c) => {
  const user = c.get('user')!;
  const body = await c.req
    .json<{ kind?: DigestKind; force?: boolean }>()
    .catch(() => ({}) as { kind?: DigestKind; force?: boolean });
  const validKinds: DigestKind[] = ['morning', 'evening', 'weekly', 'email'];
  const kind: DigestKind = body.kind && validKinds.includes(body.kind) ? body.kind : 'evening';

  try {
    const result = await generateDigest(
      c.env.DB,
      user,
      kind,
      {
        GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
        OUTLOOK_PLAYWRIGHT: c.env.OUTLOOK_PLAYWRIGHT,
      },
      { force: body.force === true, deliver: false },
    );
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Resend a digest to all configured channels
digests.post('/:id/resend', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (!Number.isFinite(id)) return c.json({ error: 'Invalid id' }, 400);

  try {
    const stored = await getDigest(c.env.DB, user.id, id);
    if (!stored) return c.json({ error: 'Digest not found' }, 404);

    const cfg = await getDigestConfig(c.env.DB, user.id, stored.digest.kind);
    const items = stored.items.map((i, idx) => ({
      section: i.section as any,
      key: i.item_key,
      text: i.text,
      metadata: i.metadata,
      sortOrder: i.sort_order ?? idx,
    }));

    const { deliverDigest } = await import('../services/digest/deliver');
    const result = await deliverDigest(c.env.DB, stored.digest.content, items, id, {
      userId: user.id,
      pinHash: user.pin_hash,
      telegramChatId: user.telegram_chat_id,
      kind: stored.digest.kind,
      scheduleTime: cfg.scheduleTime,
      channels: cfg.notifyChannels,
    });

    const deliveredChannels = result.deliveredChannels.join(',');
    await c.env.DB.prepare('UPDATE digests SET delivered_channels = ? WHERE id = ?')
      .bind(deliveredChannels, id)
      .run();

    if (result.deliveredChannels.length === 0) {
      return c.json(
        { error: 'No channels delivered — check Settings for ntfy/Telegram config' },
        500,
      );
    }
    return c.json({ success: true, deliveredChannels: result.deliveredChannels });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Delete a digest
digests.delete('/:id', async (c) => {
  const user = c.get('user')!;
  const id = parseInt(c.req.param('id'));
  if (!Number.isFinite(id)) return c.json({ error: 'Invalid id' }, 400);

  try {
    await deleteDigest(c.env.DB, user.id, id);
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ==========================================
// System: single cron tick (replaces 5 separate cron endpoints)
// ==========================================

// Run all due digests for all users. Called every minute by the in-process
// scheduler. Each user/kind is independently time-gated + per-day guarded.
digests.post('/cron/tick', async (c) => {
  if (!cronSecretOk(c)) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const candidates = await getAllDueCandidates(c.env.DB);
    const now = new Date();
    const results: any[] = [];

    // Load user rows once for the candidates we need.
    const userIds = [...new Set(candidates.map((cand) => cand.userId))];
    if (userIds.length === 0) return c.json({ executed: 0, results: [] });

    const userRows = await c.env.DB.prepare(
      `SELECT * FROM users WHERE id IN (${userIds.map(() => '?').join(',')})`,
    )
      .bind(...userIds)
      .all<UserRecord>();
    const userById = new Map<number, UserRecord>();
    for (const u of userRows.results || []) userById.set(u.id, u);

    for (const { userId, timezone, config } of candidates) {
      if (!shouldRunDigest(config, timezone, now)) continue;

      const user = userById.get(userId);
      if (!user) continue;

      try {
        const result = await generateDigest(
          c.env.DB,
          user,
          config.kind,
          {
            GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
            OUTLOOK_PLAYWRIGHT: c.env.OUTLOOK_PLAYWRIGHT,
          },
          { deliver: true },
        );
        results.push({
          user_id: userId,
          kind: config.kind,
          status: result.skipped ? 'skipped' : 'success',
          digest_id: result.digestId,
          delivered_channels: result.deliveredChannels,
          schedule_time: config.scheduleTime,
          timezone,
        });
      } catch (err: any) {
        logError('digest cron tick user error', { userId, kind: config.kind, error: err?.message });
        results.push({ user_id: userId, kind: config.kind, status: 'error', error: err.message });
      }
    }

    return c.json({ executed: results.length, results });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Meeting reminders — kept here (still a per-minute cron, time-gated by event
// start, not by user schedule). Reuses the old approach: scan Google Calendar
// for events starting in the next 10 minutes and push a notification.
digests.post('/cron/meeting-reminders', async (c) => {
  if (!cronSecretOk(c)) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const users = await c.env.DB.prepare('SELECT * FROM users').all<UserRecord>();
    const results: any[] = [];
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
    const fifteenMinutesLater = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    const { decrypt } = await import('../services/crypto');
    const { sendNotification } = await import('../services/notify');

    for (const user of users.results || []) {
      try {
        const tokenCred = await c.env.DB.prepare(
          `SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'`,
        )
          .bind(user.id)
          .first<{ encrypted_value: string }>();
        if (!tokenCred) continue;

        const tokensJson = await decrypt(tokenCred.encrypted_value, user.pin_hash);
        const tokens = JSON.parse(tokensJson);
        const accessToken = tokens.access_token;
        if (!accessToken) continue;

        const calRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(now.toISOString())}&timeMax=${encodeURIComponent(fifteenMinutesLater)}&maxResults=10`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (!calRes.ok) continue;

        const calData = (await calRes.json()) as { items?: any[] };
        const upcomingEvents = (calData.items || []).filter((e: any) => {
          const start = e.start?.dateTime;
          if (!start) return false;
          return start >= now.toISOString() && start <= tenMinutesLater;
        });

        if (upcomingEvents.length === 0) {
          results.push({ user_id: user.id, reminders_sent: 0 });
          continue;
        }

        for (const event of upcomingEvents) {
          const startTime = new Date(event.start.dateTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
          const location = event.location ? `\n📍 ${event.location}` : '';
          const title = 'Meeting in 10 minutes';
          const msg = `${event.summary || 'Untitled Event'}\n🕐 ${startTime}${location}`;

          await sendNotification(c.env.DB, user.id, title, msg, {
            pinHash: user.pin_hash,
            priority: 'high',
            tags: ['calendar', 'karna'],
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

export default digests;
