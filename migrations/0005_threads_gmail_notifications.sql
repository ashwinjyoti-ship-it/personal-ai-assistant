-- v3.0: Conversation threads, notifications, multi-user improvements

-- Conversation threads for organized chat history
CREATE TABLE IF NOT EXISTS threads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL DEFAULT 'New conversation',
  summary TEXT DEFAULT '',
  is_archived INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_threads_user ON threads(user_id, is_archived, updated_at DESC);

-- Add thread_id to conversations (nullable for backward compat with existing messages)
ALTER TABLE conversations ADD COLUMN thread_id INTEGER REFERENCES threads(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_conversations_thread ON conversations(thread_id, created_at);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK(type IN ('info', 'reminder', 'mail', 'calendar', 'error', 'system')),
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  is_read INTEGER DEFAULT 0,
  action_url TEXT DEFAULT '',
  source TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- Invite codes for multi-user onboarding
CREATE TABLE IF NOT EXISTS invite_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  created_by INTEGER NOT NULL,
  used_by INTEGER,
  role TEXT DEFAULT 'user',
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (used_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_invite_codes ON invite_codes(code, used_by);
