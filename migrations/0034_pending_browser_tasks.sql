-- Tracks browser tasks that are still running after the agent's polling window.
-- A cron job polls these every minute and sends a notification when they finish.
CREATE TABLE IF NOT EXISTS pending_browser_tasks (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL,
  task_id         TEXT    NOT NULL,
  task_description TEXT,
  notified        INTEGER NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pending_browser_tasks_user ON pending_browser_tasks (user_id);
CREATE INDEX IF NOT EXISTS idx_pending_browser_tasks_notified ON pending_browser_tasks (notified);
