// Calendar sections: calendar_today (events in the period window) and
// calendar_tomorrow (events on the day after the period end). Both reuse the
// GoogleCalendar service.

import type { DigestSection, SectionKey } from '../../../types';
import { buildCalendar, emptySection, type SectionContext, type SectionFetcher } from './types';

function fmtTime(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

async function fetchCalendarWindow(
  ctx: SectionContext,
  key: SectionKey,
  title: string,
  start: string,
  end: string,
): Promise<DigestSection> {
  try {
    const cal = buildCalendar(ctx);
    const events = await cal.listEvents('primary', {
      timeMin: start,
      timeMax: end,
      maxResults: 50,
    });
    const items = events.map((e) => {
      const startIso = e.start?.dateTime || e.start?.date || '';
      return {
        key: e.id || `cal-${startIso}-${e.summary}`,
        text: `${fmtTime(startIso)} ${e.summary || 'Untitled Event'}${e.location ? ` @ ${e.location}` : ''}`,
        metadata: {
          title: e.summary,
          startTime: startIso,
          endTime: e.end?.dateTime || e.end?.date || '',
          location: e.location,
          attendees: e.attendees?.map((a) => a.displayName || a.email),
        },
      };
    });
    const summary =
      items.length === 0
        ? 'Nothing scheduled'
        : `${items.length} event${items.length === 1 ? '' : 's'}`;
    return { key, title, summary, items };
  } catch (err: any) {
    console.error(`[digest:calendar:${key}] fetch error:`, err?.message);
    return emptySection(key, title);
  }
}

export const calendarToday: SectionFetcher = {
  key: 'calendar_today',
  title: 'Today',
  appliesTo: (k) => k === 'morning' || k === 'email',
  fetch: (ctx) =>
    fetchCalendarWindow(ctx, 'calendar_today', 'Today', ctx.periodStart, ctx.periodEnd),
};

export const calendarTomorrow: SectionFetcher = {
  key: 'calendar_tomorrow',
  title: 'Tomorrow',
  appliesTo: (k) => k === 'evening',
  fetch: (ctx) => {
    // Tomorrow = day after periodEnd. periodEnd is end-of-today; +1 day window.
    const start = new Date(ctx.periodEnd);
    start.setSeconds(start.getSeconds() + 1);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    return fetchCalendarWindow(
      ctx,
      'calendar_tomorrow',
      'Tomorrow',
      start.toISOString(),
      end.toISOString(),
    );
  },
};
