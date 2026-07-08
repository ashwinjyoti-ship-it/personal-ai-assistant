// Purge stale bell notifications. Snoozed reminders live as future cron_jobs only —
// they should not leave rows in notifications until they fire again.

export async function purgeStaleNotifications(db: D1Database, userId: number): Promise<void> {
  // Read rows are never shown; don't keep them stored.
  await db.prepare(
    'DELETE FROM notifications WHERE user_id = ? AND is_read = 1'
  ).bind(userId).run();

  // Pre-link reminder rows (source=ntfy / missing cron id) are orphaned history.
  await db.prepare(
    `DELETE FROM notifications WHERE user_id = ? AND type = 'reminder'
     AND (source IS NULL OR source = '' OR source = 'ntfy' OR source NOT LIKE 'cron:%')`
  ).bind(userId).run();

  // Recurring reminders that were stopped/completed should not linger in the bell.
  // Once reminders stay completed after fire until the user taps Done/Snooze.
  await db.prepare(
    `DELETE FROM notifications WHERE user_id = ? AND type = 'reminder'
     AND source LIKE 'cron:%'
     AND id IN (
       SELECT n.id FROM notifications n
       JOIN cron_jobs j
         ON j.user_id = n.user_id
        AND j.id = CAST(SUBSTR(n.source, 6) AS INTEGER)
       WHERE n.user_id = ?
         AND j.state = 'completed'
         AND j.enabled = 0
         AND j.schedule_type IN ('daily', 'weekly', 'interval')
     )`
  ).bind(userId, userId).run();
}
