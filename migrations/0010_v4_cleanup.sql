-- v4 Cleanup Migration: Remove browser automation, triggers, feature requests,
-- provider usage tracking, and heartbeat log tables.
-- This migration is safe to run multiple times (uses IF EXISTS).

-- Remove browser automation tables
DROP TABLE IF EXISTS browser_sessions;
DROP TABLE IF EXISTS browser_task_log;

-- Remove self-building system tables
DROP TABLE IF EXISTS feature_requests;

-- Remove provider usage tracking tables (replaced by in-memory rotation)
DROP TABLE IF EXISTS provider_usage;
DROP TABLE IF EXISTS usage_caps;

-- Remove complex monitoring tables
DROP TABLE IF EXISTS heartbeat_log;

-- Remove proactive intelligence tables from migration 0008 (if they exist)
DROP TABLE IF EXISTS proactive_triggers;
DROP TABLE IF EXISTS proactive_trigger_log;
DROP TABLE IF EXISTS user_patterns;

-- Remove document upload tables (document upload removed in v4)
DROP TABLE IF EXISTS uploaded_files;
DROP TABLE IF EXISTS document_chunks;

-- Remove file upload tables from migrations 006/007 (if they exist)
DROP TABLE IF EXISTS user_documents;
DROP TABLE IF EXISTS document_chats;

-- Update briefing_preferences defaults to remove Outlook components
-- (existing rows will have Outlook in their JSON, but new rows get v4 defaults)
-- Note: SQLite doesn't support ALTER TABLE DROP COLUMN in older versions,
-- so we just update the default value via application logic.
-- Existing rows keep their JSON; the application will ignore outlook_* keys gracefully.
