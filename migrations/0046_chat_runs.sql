-- Chat runs: decouple the agent run from the streaming request so it survives
-- the client disconnecting (app backgrounded, phone sleep, page reload).
--
-- A run is created at /chat/stream start. The agent generator writes events to
-- an in-memory bus (for live tailing on the long-running Render process) and
-- also appends them to events_json here for durability. A reconnecting client
-- (or a fresh page load) replays the buffered events via /chat/runs/:id/resume,
-- then tails the bus if the run is still active.
--
-- status: 'running' -> 'completed' | 'failed' | 'cancelled'

CREATE TABLE IF NOT EXISTS chat_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL UNIQUE,             -- opaque token returned to the client
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  thread_id INTEGER,
  status TEXT NOT NULL DEFAULT 'running' CHECK(status IN ('running', 'completed', 'failed', 'cancelled')),
  events_json TEXT NOT NULL DEFAULT '[]',   -- JSON array of SSEEvent, appended incrementally
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_runs_user ON chat_runs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_runs_thread ON chat_runs(thread_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_runs_status ON chat_runs(status, updated_at);
