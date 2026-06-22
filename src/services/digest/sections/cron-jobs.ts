// Cron-jobs sections: cron_jobs_today (due in the period window),
// cron_completed (completed in window), cron_missed (overdue/missed in window).

import type { DigestSection, DigestSectionItem } from '../../../types';
import { emptySection, type SectionFetcher } from './types';

interface CronJobRow {
  id: number;
  name: string;
  description: string;
  next_run: string | null;
  last_run: string | null;
  state: string | null;
  enabled: number;
}

function fmtTime(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export const cronJobsToday: SectionFetcher = {
  key: 'cron_jobs_today',
  title: "Today's Reminders",
  appliesTo: (k) => k === 'morning',
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const jobs = await ctx.db
        .prepare(
          `SELECT * FROM cron_jobs
           WHERE user_id = ? AND enabled = 1
           AND next_run IS NOT NULL AND next_run >= ? AND next_run <= ?
           ORDER BY next_run ASC`,
        )
        .bind(ctx.userId, ctx.periodStart, ctx.periodEnd)
        .all<CronJobRow>();

      const rows = jobs.results || [];
      const items: DigestSectionItem[] = rows.map((j) => ({
        key: `cron-${j.id}`,
        text: `${fmtTime(j.next_run)} ${j.name}`,
        metadata: { id: j.id, name: j.name, next_run: j.next_run, description: j.description },
      }));
      const summary = items.length === 0 ? 'No scheduled reminders' : `${items.length} scheduled`;
      return { key: 'cron_jobs_today', title: "Today's Reminders", summary, items };
    } catch (err: any) {
      console.error('[digest:cron_jobs_today] fetch error:', err?.message);
      return emptySection('cron_jobs_today', "Today's Reminders");
    }
  },
};

export const cronCompleted: SectionFetcher = {
  key: 'cron_completed',
  title: 'Completed',
  appliesTo: (k) => k === 'weekly',
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const jobs = await ctx.db
        .prepare(
          `SELECT id, name, last_run FROM cron_jobs
           WHERE user_id = ? AND state = 'completed' AND last_run IS NOT NULL AND last_run >= ?
           ORDER BY last_run DESC LIMIT 20`,
        )
        .bind(ctx.userId, ctx.periodStart)
        .all<{ id: number; name: string; last_run: string }>();

      const rows = jobs.results || [];
      const items: DigestSectionItem[] = rows.map((j) => ({
        key: `cron-done-${j.id}`,
        text: j.name,
        metadata: { id: j.id, name: j.name, last_run: j.last_run },
      }));
      const summary = `${rows.length} completed`;
      return { key: 'cron_completed', title: 'Completed', summary, items };
    } catch (err: any) {
      console.error('[digest:cron_completed] fetch error:', err?.message);
      return emptySection('cron_completed', 'Completed');
    }
  },
};

export const cronMissed: SectionFetcher = {
  key: 'cron_missed',
  title: 'Missed / Overdue',
  appliesTo: (k) => k === 'weekly',
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const jobs = await ctx.db
        .prepare(
          `SELECT id, name, next_run FROM cron_jobs
           WHERE user_id = ? AND enabled = 1 AND next_run IS NOT NULL AND next_run < ?
           ORDER BY next_run DESC LIMIT 20`,
        )
        .bind(ctx.userId, ctx.periodEnd)
        .all<{ id: number; name: string; next_run: string }>();

      const rows = jobs.results || [];
      const items: DigestSectionItem[] = rows.map((j) => ({
        key: `cron-missed-${j.id}`,
        text: `${j.name} (was due ${fmtTime(j.next_run)})`,
        metadata: { id: j.id, name: j.name, next_run: j.next_run },
      }));
      const summary = items.length === 0 ? 'None missed' : `${items.length} missed`;
      return { key: 'cron_missed', title: 'Missed / Overdue', summary, items };
    } catch (err: any) {
      console.error('[digest:cron_missed] fetch error:', err?.message);
      return emptySection('cron_missed', 'Missed / Overdue');
    }
  },
};
