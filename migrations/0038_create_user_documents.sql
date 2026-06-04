-- Migration: Create user_documents table for document intelligence system
-- Documents are stored temporarily in R2 (30 min), text/embeddings permanently in D1

CREATE TABLE IF NOT EXISTS user_documents (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    r2_key TEXT,                    -- R2 storage path (NULL after deletion)
    r2_bucket TEXT,
    extracted_text TEXT,            -- Full extracted text content
    chunks TEXT,                    -- JSON array: [{text, embedding, start, end}]
    summary TEXT,                   -- AI-generated summary
    metadata TEXT,                   -- JSON: key_terms, dates, entities, doc_type
    document_type TEXT,             -- 'pdf', 'excel', 'word', 'image'
    processing_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
    processing_error TEXT,          -- Error message if failed
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME,
    expires_at DATETIME,            -- When to delete from R2 (30 min from upload)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for user document lookups
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_status ON user_documents(processing_status);
CREATE INDEX IF NOT EXISTS idx_user_documents_expires ON user_documents(expires_at);

-- Document chat history for Q&A
CREATE TABLE IF NOT EXISTS document_chats (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_id TEXT,               -- NULL for cross-document queries
    session_id TEXT NOT NULL,       -- Group related Q&A
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sources TEXT,                   -- JSON: which chunks were used
    is_cross_document INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES user_documents(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_document_chats_user ON document_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_document_chats_session ON document_chats(session_id);

-- Document deletion queue (for 30-min auto-delete)
CREATE TABLE IF NOT EXISTS document_deletion_queue (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL,
    r2_key TEXT NOT NULL,
    r2_bucket TEXT NOT NULL,
    delete_after DATETIME NOT NULL,
    processed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES user_documents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_deletion_queue_time ON document_deletion_queue(delete_after);
CREATE INDEX IF NOT EXISTS idx_deletion_queue_processed ON document_deletion_queue(processed);
