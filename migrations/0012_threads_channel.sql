-- Add channel column to threads table for Telegram persistent threads
ALTER TABLE threads ADD COLUMN channel TEXT DEFAULT 'web';
