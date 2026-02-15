-- Browser automation: session management for Steel + Browser Use
-- Phase 3 scaffold

-- Browser sessions tracked in D1 for persistence across requests
CREATE TABLE IF NOT EXISTS browser_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  steel_session_id TEXT NOT NULL,
  profile_id TEXT,
  purpose TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'expired', 'error', 'released')),
  last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
  error_message TEXT,
  metadata TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_browser_sessions_user ON browser_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_browser_sessions_purpose ON browser_sessions(purpose, status);

-- Browser task execution log (for auditing and idempotency)
CREATE TABLE IF NOT EXISTS browser_task_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_id INTEGER,
  task_type TEXT NOT NULL,
  task_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'running', 'completed', 'failed')),
  result TEXT DEFAULT '',
  error TEXT DEFAULT '',
  tokens_used INTEGER DEFAULT 0,
  cost_estimate REAL DEFAULT 0,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES browser_sessions(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_browser_task_user ON browser_task_log(user_id, status);
CREATE INDEX IF NOT EXISTS idx_browser_task_type ON browser_task_log(task_type);
