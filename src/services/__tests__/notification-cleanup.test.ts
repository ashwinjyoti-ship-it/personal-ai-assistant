import { describe, it, expect } from 'vitest';
import { purgeStaleNotifications } from '../notification-cleanup';

type Row = Record<string, unknown>;

function createCleanupDb(initial: { notifications: Row[] }) {
  const notifications = initial.notifications.map((n) => ({ ...n }));

  const db = {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async run() {
              if (sql.includes('DELETE FROM notifications')) {
                if (sql.includes('is_read = 1')) {
                  for (let i = notifications.length - 1; i >= 0; i--) {
                    if (notifications[i].user_id === args[0] && notifications[i].is_read === 1) {
                      notifications.splice(i, 1);
                    }
                  }
                } else if (sql.includes("source NOT LIKE 'cron:%'")) {
                  for (let i = notifications.length - 1; i >= 0; i--) {
                    const n = notifications[i];
                    if (
                      n.user_id === args[0] &&
                      n.type === 'reminder' &&
                      (!n.source || n.source === 'ntfy' || !String(n.source).startsWith('cron:'))
                    ) {
                      notifications.splice(i, 1);
                    }
                  }
                } else if (sql.includes('schedule_type IN')) {
                  const userId = args[0];
                  for (let i = notifications.length - 1; i >= 0; i--) {
                    const n = notifications[i];
                    if (n.user_id !== userId || n.type !== 'reminder') continue;
                    const source = String(n.source || '');
                    if (!source.startsWith('cron:')) continue;
                    const cronId = parseInt(source.slice(5), 10);
                    const meta = n._cron as Row | undefined;
                    if (
                      meta &&
                      meta.id === cronId &&
                      meta.state === 'completed' &&
                      meta.enabled === 0 &&
                      ['daily', 'weekly', 'interval'].includes(String(meta.schedule_type))
                    ) {
                      notifications.splice(i, 1);
                    }
                  }
                }
              }
              return { meta: { changes: 1 } };
            },
            async all<T>() {
              if (sql.includes('SELECT n.id FROM notifications n')) {
                const userId = args[0];
                return notifications
                  .filter((n) => {
                    if (n.user_id !== userId || n.type !== 'reminder') return false;
                    const meta = n._cron as Row | undefined;
                    return (
                      meta &&
                      meta.state === 'completed' &&
                      meta.enabled === 0 &&
                      ['daily', 'weekly', 'interval'].includes(String(meta.schedule_type))
                    );
                  })
                  .map((n) => ({ id: n.id })) as T;
              }
              return [] as T;
            },
          };
        },
      };
    },
    _notifications: notifications,
  };

  return db as unknown as D1Database & { _notifications: Row[] };
}

describe('purgeStaleNotifications', () => {
  it('removes read and orphaned reminder rows but keeps pending once reminders', async () => {
    const db = createCleanupDb({
      notifications: [
        { id: 1, user_id: 1, type: 'info', title: 'Digest', is_read: 1, source: 'ntfy' },
        { id: 2, user_id: 1, type: 'reminder', title: 'Old', is_read: 0, source: 'ntfy' },
        {
          id: 3,
          user_id: 1,
          type: 'reminder',
          title: 'Pending once',
          is_read: 0,
          source: 'cron:9',
          _cron: { id: 9, state: 'completed', enabled: 0, schedule_type: 'once' },
        },
        {
          id: 4,
          user_id: 1,
          type: 'reminder',
          title: 'Stopped daily',
          is_read: 0,
          source: 'cron:10',
          _cron: { id: 10, state: 'completed', enabled: 0, schedule_type: 'daily' },
        },
      ],
    });

    await purgeStaleNotifications(db, 1);

    const ids = db._notifications.map((n) => n.id);
    expect(ids).toEqual([3]);
  });
});
