-- Provider usage tracking for smart rotation
-- Tracks daily token consumption per user per provider

CREATE TABLE IF NOT EXISTS provider_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  provider TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  request_count INTEGER DEFAULT 0,
  last_error TEXT DEFAULT '',
  cooldown_until DATETIME,
  usage_date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, provider, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_provider_usage_user_date ON provider_usage(user_id, usage_date);
CREATE INDEX IF NOT EXISTS idx_provider_usage_cooldown ON provider_usage(cooldown_until);

-- Add assistant_name field to users
ALTER TABLE users ADD COLUMN assistant_name TEXT DEFAULT 'Karna';
