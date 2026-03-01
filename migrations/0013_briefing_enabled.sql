-- Add briefing_enabled column to allow disabling briefings
ALTER TABLE briefing_preferences ADD COLUMN briefing_enabled INTEGER DEFAULT 1;
