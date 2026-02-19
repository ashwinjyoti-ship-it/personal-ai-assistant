-- v3.1: Self-building — Feature request tracking by the assistant itself
-- Karna can propose features, user can approve/reject, and track implementation status

CREATE TABLE IF NOT EXISTS feature_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rationale TEXT DEFAULT '',
  priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'proposed' CHECK(status IN ('proposed', 'approved', 'rejected', 'in_progress', 'implemented', 'deferred')),
  category TEXT DEFAULT 'general' CHECK(category IN ('general', 'tool', 'ui', 'integration', 'performance', 'security')),
  proposed_by TEXT DEFAULT 'assistant' CHECK(proposed_by IN ('assistant', 'user')),
  implementation_notes TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_feature_requests_user ON feature_requests(user_id, status, created_at DESC);
