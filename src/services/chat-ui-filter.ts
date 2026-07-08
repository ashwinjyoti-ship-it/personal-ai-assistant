// Filters for chat log UI — voice transcripts stay in `conversations` but are hidden
// unless a long-form handoff produced written `web` messages in the same thread.

/** SQL fragment (AND …) — hide threads that only contain voice transcripts. */
export const THREADS_UI_VISIBLE_SQL = `
  AND (
    NOT EXISTS (SELECT 1 FROM conversations c WHERE c.thread_id = t.id)
    OR EXISTS (SELECT 1 FROM conversations c WHERE c.thread_id = t.id AND c.channel = 'web')
  )
`;

/** Conversation rows shown in the chat log (written responses + typed chat). */
export const UI_VISIBLE_MESSAGE_CHANNEL_SQL = "channel != 'voice'";

/** Subquery: count of UI-visible messages for a thread. */
export const UI_VISIBLE_MESSAGE_COUNT_SQL = `
  (SELECT COUNT(*) FROM conversations
   WHERE thread_id = t.id AND ${UI_VISIBLE_MESSAGE_CHANNEL_SQL}) as message_count
`;

/** Subquery: preview of last user message visible in UI. */
export const UI_VISIBLE_LAST_USER_MESSAGE_SQL = `
  (SELECT content FROM conversations
   WHERE thread_id = t.id AND ${UI_VISIBLE_MESSAGE_CHANNEL_SQL} AND role = 'user'
   ORDER BY created_at DESC LIMIT 1) as last_message
`;
