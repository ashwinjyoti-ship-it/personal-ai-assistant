-- Memory Upgrade D: Signal Extraction + Semantic Compression
-- Creates: signals table for structured per-message signal records

CREATE TABLE IF NOT EXISTS signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  conversation_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  intent TEXT NOT NULL CHECK(intent IN (
    'question', 'command', 'statement', 'tool_call', 'reflection', 'greeting', 'meta'
  )),
  entities TEXT DEFAULT '[]',
  topic TEXT NOT NULL DEFAULT 'unknown',
  importance REAL DEFAULT 0.5,
  emotional_tone TEXT CHECK(emotional_tone IN ('neutral', 'frustrated', 'excited', 'uncertain')),
  raw_ref TEXT NOT NULL,
  occurred_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_signals_user ON signals(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signals_topic ON signals(user_id, topic);
CREATE INDEX IF NOT EXISTS idx_signals_conv ON signals(conversation_id);
CREATE INDEX IF NOT EXISTS idx_signals_intent ON signals(user_id, intent);

ALTER TABLE conversations ADD COLUMN signal_id INTEGER REFERENCES signals(id);
