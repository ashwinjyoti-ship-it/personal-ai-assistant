// Documents section: recently added documents in the period window (weekly).

import type { DigestSection, DigestSectionItem } from '../../../types';
import { emptySection, type SectionFetcher } from './types';

export const documentsRecent: SectionFetcher = {
  key: 'documents_recent',
  title: 'Recent Documents',
  appliesTo: (k) => k === 'weekly',
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const docs = await ctx.db
        .prepare(
          `SELECT id, name, status, created_at FROM document_library
           WHERE user_id = ? AND created_at >= ?
           ORDER BY created_at DESC LIMIT 10`,
        )
        .bind(ctx.userId, ctx.periodStart)
        .all<{ id: number; name: string; status: string; created_at: string }>();

      const rows = docs.results || [];
      const items: DigestSectionItem[] = rows.map((d) => ({
        key: `doc-${d.id}`,
        text: `${d.name} (${d.status})`,
        metadata: { id: d.id, name: d.name, status: d.status, created_at: d.created_at },
      }));
      const summary = items.length === 0 ? 'None this week' : `${items.length} this week`;
      return { key: 'documents_recent', title: 'Recent Documents', summary, items };
    } catch (err: any) {
      console.error('[digest:documents_recent] fetch error:', err?.message);
      return emptySection('documents_recent', 'Recent Documents');
    }
  },
};
