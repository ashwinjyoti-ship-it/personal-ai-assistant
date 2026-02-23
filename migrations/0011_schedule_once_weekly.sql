-- Add 'once' and 'weekly' schedule types to cron_jobs table

CREATE TABLE cron_jobs_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  schedule_type TEXT NOT NULL CHECK(schedule_type IN ('interval', 'daily', 'weekly', 'once', 'cron')),
  schedule_value TEXT NOT NULL,
  action_type TEXT NOT NULL,
  action_config TEXT DEFAULT '{}',
  enabled INTEGER DEFAULT 1,
  last_run DATETIME,
  next_run DATETIME,
  notify_channel TEXT DEFAULT 'all',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  state TEXT DEFAULT 'active' CHECK(state IN ('created', 'active', 'reminding', 'paused', 'completed')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO cron_jobs_new SELECT * FROM cron_jobs;

DROP TABLE cron_jobs;

ALTER TABLE cron_jobs_new RENAME TO cron_jobs;
