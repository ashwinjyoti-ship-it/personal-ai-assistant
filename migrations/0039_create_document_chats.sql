-- Create document chats table for Q&A history
CREATE TABLE IF NOT EXISTS document_chats (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_ids TEXT NOT NULL,  -- JSON array of document IDs
    session_id TEXT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sources_json TEXT,  -- JSON array of sources used
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index for session-based queries
CREATE INDEX IF NOT EXISTS idx_document_chats_session ON document_chats(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_document_chats_user ON document_chats(user_id, created_at DESC);
