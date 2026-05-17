-- Track which conversation thread and channel originated each browser task so the
-- cron worker can deliver the result as an assistant message in the same thread
-- instead of just a notification that the user might miss.
ALTER TABLE pending_browser_tasks ADD COLUMN thread_id INTEGER REFERENCES threads(id) ON DELETE SET NULL;
ALTER TABLE pending_browser_tasks ADD COLUMN channel   TEXT NOT NULL DEFAULT 'web';
