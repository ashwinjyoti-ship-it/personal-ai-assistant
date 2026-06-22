// Tasks due section: open tasks from the memory table, labelled overdue/due-today/by-date.

import type { DigestSection } from '../../../types';
import { emptySection, type SectionFetcher } from './types';

export const tasksDue: SectionFetcher = {
  key: 'tasks_due',
  title: 'Tasks',
  appliesTo: () => true,
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const tasks = await ctx.db
        .prepare(
          `SELECT title, content, due_date
           FROM memory
           WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
           ORDER BY
             CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
             due_date ASC,
             importance DESC
           LIMIT 10`,
        )
        .bind(ctx.userId)
        .all<{ title: string; content: string; due_date: string | null }>();

      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);

      const rows = tasks.results || [];
      const items = rows.map((t) => {
        let label = '';
        if (t.due_date) {
          const d = new Date(t.due_date);
          label =
            d <= now
              ? 'overdue'
              : d <= tomorrow
                ? 'due today'
                : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }
        return {
          key: `task-${t.title}`,
          text: label ? `${t.title} [${label}]` : t.title,
          metadata: { title: t.title, dueDate: t.due_date },
        };
      });

      const dueToday = rows.filter((t) => {
        if (!t.due_date) return false;
        return new Date(t.due_date) <= tomorrow;
      }).length;

      const summary =
        items.length === 0
          ? 'All clear'
          : `${items.length} open${dueToday > 0 ? `, ${dueToday} due today` : ''}`;
      return { key: 'tasks_due', title: 'Tasks', summary, items };
    } catch (err: any) {
      console.error('[digest:tasks_due] fetch error:', err?.message);
      return emptySection('tasks_due', 'Tasks');
    }
  },
};
