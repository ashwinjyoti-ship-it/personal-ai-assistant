-- Guardrails migration: Two-tier memory, cost caps, cron locks, error logging, idempotency, state machine

-- Error log table
CREATE TABLE IF NOT EXISTS error_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  source TEXT NOT NULL,
  error_type TEXT NOT NULL,
  message TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  acknowledged INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_error_log_user ON error_log(user_id, acknowledged);
CREATE INDEX IF NOT EXISTS idx_error_log_created ON error_log(created_at);

-- Cron execution log with idempotency and locking
CREATE TABLE IF NOT EXISTS cron_execution_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('running', 'completed', 'failed', 'skipped')),
  idempotency_key TEXT,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  result TEXT DEFAULT '',
  error TEXT DEFAULT '',
  FOREIGN KEY (job_id) REFERENCES cron_jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cron_exec_job ON cron_execution_log(job_id, status);
CREATE INDEX IF NOT EXISTS idx_cron_exec_idemp ON cron_execution_log(idempotency_key);

-- Add state machine column to cron_jobs
ALTER TABLE cron_jobs ADD COLUMN state TEXT DEFAULT 'active' CHECK(state IN ('created', 'active', 'reminding', 'paused', 'completed'));

-- Add tier column to memory for two-tier system
ALTER TABLE memory ADD COLUMN tier TEXT DEFAULT 'long_term' CHECK(tier IN ('working', 'long_term'));

-- Usage caps table (per user, configurable)
CREATE TABLE IF NOT EXISTS usage_caps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  cap_type TEXT NOT NULL,
  daily_limit INTEGER NOT NULL,
  current_usage INTEGER DEFAULT 0,
  usage_date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, cap_type, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_usage_caps_user ON usage_caps(user_id, usage_date);
