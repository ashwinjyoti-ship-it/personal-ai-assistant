// Action items section: open / pending action_items, ordered by priority.

import type { DigestSection, DigestSectionItem } from '../../../types';
import { emptySection, type SectionFetcher } from './types';

export const actionItemsOpen: SectionFetcher = {
  key: 'action_items_open',
  title: 'Pending Actions',
  appliesTo: () => true,
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const actions = await ctx.db
        .prepare(
          `SELECT id, title, priority, type, due_at FROM action_items
           WHERE user_id = ? AND status = 'pending'
             AND type NOT IN ('email_digest', 'weekly_review')
           ORDER BY
             CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END,
             created_at DESC
           LIMIT 15`,
        )
        .bind(ctx.userId)
        .all<{
          id: number;
          title: string;
          priority: string;
          type: string;
          due_at: string | null;
        }>();

      const rows = actions.results || [];
      const items: DigestSectionItem[] = rows.map((a) => ({
        key: `action-${a.id}`,
        text: `${a.title} (${a.priority})`,
        metadata: {
          id: a.id,
          title: a.title,
          priority: a.priority,
          type: a.type,
          due_at: a.due_at,
        },
      }));
      const summary = items.length === 0 ? 'None' : `${items.length} pending`;
      return { key: 'action_items_open', title: 'Pending Actions', summary, items };
    } catch (err: any) {
      console.error('[digest:action_items_open] fetch error:', err?.message);
      return emptySection('action_items_open', 'Pending Actions');
    }
  },
};
