-- Restore heartbeat_log (was dropped in 0010_v4_cleanup)
CREATE TABLE IF NOT EXISTS heartbeat_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL DEFAULT 'ok',
  latency_ms INTEGER DEFAULT 0,
  details TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_heartbeat_created ON heartbeat_log(created_at);
