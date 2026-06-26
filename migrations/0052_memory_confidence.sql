-- Memory Upgrade E: Meta-Cognitive Confidence
-- Stores confidence history on memories and adds confidence metadata table

CREATE TABLE IF NOT EXISTS memory_confidence_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memory_id INTEGER NOT NULL,
  confidence REAL NOT NULL,
  query_used TEXT,
  occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (memory_id) REFERENCES memory(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_conf_hist_memory ON memory_confidence_history(memory_id);
CREATE INDEX IF NOT EXISTS idx_conf_hist_occurred ON memory_confidence_history(occurred_at);
