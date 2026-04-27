-- Add embedding support for semantic search in document library
ALTER TABLE document_library ADD COLUMN embedding TEXT;
