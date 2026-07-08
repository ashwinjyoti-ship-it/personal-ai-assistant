-- Clear accumulated bell notifications. Snoozed reminders remain as cron_jobs
-- (future next_run) and will insert a fresh notification when they fire.
DELETE FROM notifications;
