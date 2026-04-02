-- Add extracted_text column to uploaded_files.
-- PDFs are pre-extracted at upload time (background via waitUntil) so that
-- parse_document can return the text instantly without making a 34-second
-- Anthropic API call inside the agent loop (which caused 25s LLM timeouts).
ALTER TABLE uploaded_files ADD COLUMN extracted_text TEXT;
