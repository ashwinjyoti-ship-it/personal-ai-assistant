// Section registry: maps every SectionKey to its fetcher.

import type { SectionKey } from '../../../types';
import type { SectionFetcher } from './types';
import { calendarToday, calendarTomorrow } from './calendar';
import { gmailSummary } from './gmail';
import { tasksDue } from './tasks';
import { newsAi } from './news';
import { cronJobsToday, cronCompleted, cronMissed } from './cron-jobs';
import { actionItemsOpen } from './actions';
import { documentsRecent } from './documents';
import { outlookSummary } from './outlook';

const FETCHERS: Record<SectionKey, SectionFetcher> = {
  calendar_today: calendarToday,
  calendar_tomorrow: calendarTomorrow,
  gmail_summary: gmailSummary,
  outlook_summary: outlookSummary,
  tasks_due: tasksDue,
  news_ai: newsAi,
  cron_jobs_today: cronJobsToday,
  cron_completed: cronCompleted,
  cron_missed: cronMissed,
  action_items_open: actionItemsOpen,
  documents_recent: documentsRecent,
};

export function getSectionFetcher(key: SectionKey): SectionFetcher | undefined {
  return FETCHERS[key];
}

/** All fetchers, for UI to enumerate which sections are available per kind. */
export function allSectionFetchers(): SectionFetcher[] {
  return Object.values(FETCHERS);
}

export type { SectionFetcher, SectionContext } from './types';
