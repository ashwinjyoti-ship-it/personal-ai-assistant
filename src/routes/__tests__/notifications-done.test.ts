import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import type { AppEnv, UserRecord } from '../../types';
import notifications from '../notifications';

type Row = Record<string, unknown>;

function createNotificationsDb(initial: {
  notifications?: Row[];
  cronJobs?: Row[];
} = {}) {
  const notifications = [...(initial.notifications || [])];
  const cronJobs = [...(initial.cronJobs || [])];

  const db = {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async first<T>() {
              if (sql.includes('FROM notifications WHERE id = ?')) {
                const id = args[0];
                const userId = args[1];
                return notifications.find((n) => n.id === id && n.user_id === userId) as T ?? null;
              }
              if (sql.includes('FROM cron_jobs WHERE id = ?')) {
                const id = args[0];
                const userId = args[1];
                return cronJobs.find((j) => j.id === id && j.user_id === userId) as T ?? null;
              }
              if (sql.includes('FROM sessions s JOIN users u')) {
                return {
                  user_id: 1,
                  username: 'test',
                  name: 'Test',
                  pin_hash: 'hash',
                  personality_prompt: null,
                  telegram_chat_id: null,
                  timezone: 'UTC',
                  assistant_name: 'Karna',
                  created_at: '2026-01-01',
                  updated_at: '2026-01-01',
                } as T;
              }
              if (sql.includes('RETURNING id')) {
                return { id: 99 } as T;
              }
              return null;
            },
            async run() {
              if (sql.includes("UPDATE cron_jobs SET state = 'completed'")) {
                const id = args[0];
                const userId = args[1];
                const job = cronJobs.find((j) => j.id === id && j.user_id === userId);
                if (job) {
                  job.state = 'completed';
                  job.enabled = 0;
                }
              }
              if (sql.includes('DELETE FROM notifications WHERE id = ?')) {
                const id = args[0];
                const userId = args[1];
                const idx = notifications.findIndex((n) => n.id === id && n.user_id === userId);
                if (idx >= 0) notifications.splice(idx, 1);
              }
              if (sql.includes('DELETE FROM notifications WHERE source = ?')) {
                const source = args[0];
                const userId = args[1];
                for (let i = notifications.length - 1; i >= 0; i--) {
                  if (notifications[i].source === source && notifications[i].user_id === userId) {
                    notifications.splice(i, 1);
                  }
                }
              }
              if (sql.includes('INSERT INTO cron_jobs')) {
                cronJobs.push({ id: 99, user_id: args[0], state: args[9] });
              }
              return { meta: { changes: 1 } };
            },
          };
        },
      };
    },
    _notifications: notifications,
    _cronJobs: cronJobs,
  };

  return db as unknown as D1Database & { _notifications: Row[]; _cronJobs: Row[] };
}

function mountNotificationsApp(db: D1Database) {
  const app = new Hono<AppEnv>();
  app.use('*', async (c, next) => {
    c.env = { DB: db } as AppEnv['Bindings'];
    await next();
  });
  app.route('/', notifications);
  return app;
}

describe('notifications done action', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('DELETEs the bell notification and completes linked cron job on done', async () => {
    const db = createNotificationsDb({
      notifications: [{ id: 5, user_id: 1, title: '⏰ Meds', body: 'Take meds', source: 'cron:7', type: 'reminder' }],
      cronJobs: [{ id: 7, user_id: 1, state: 'reminding', enabled: 1 }],
    });
    const app = mountNotificationsApp(db);

    const res = await app.request('/5/done', {
      method: 'PUT',
      headers: { Authorization: 'Bearer session-1' },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, cron_completed: true });
    expect(db._notifications).toHaveLength(0);
    expect(db._cronJobs[0].state).toBe('completed');
    expect(db._cronJobs[0].enabled).toBe(0);
  });

  it('DELETEs reminder notifications when marking reminder done via /reminders/:id/done', async () => {
    const db = createNotificationsDb({
      notifications: [{ id: 10, user_id: 1, title: '⏰ Walk', body: 'Go walk', source: 'cron:3', type: 'reminder' }],
      cronJobs: [{ id: 3, user_id: 1, state: 'reminding', enabled: 1 }],
    });
    const app = mountNotificationsApp(db);

    const res = await app.request('/reminders/3/done', {
      method: 'POST',
      headers: { Authorization: 'Bearer session-1' },
    });

    expect(res.status).toBe(200);
    expect(db._notifications).toHaveLength(0);
    expect(db._cronJobs[0].state).toBe('completed');
  });
});
