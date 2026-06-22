import { describe, it, expect } from 'vitest';
import { shouldRunDigest, getUserLocalDate } from '../digest/schedule';
import { getDefaultDigestConfig, defaultSections, validateDigestConfigUpdate } from '../digest/config';
import { periodWindowFor } from '../digest';
import type { DigestKind } from '../../types';

// 14:30 UTC == 20:00 IST (Asia/Kolkata, UTC+5:30).
const tz = 'Asia/Kolkata';

describe('shouldRunDigest — catch-up window', () => {
  const evening = getDefaultDigestConfig('evening');

  it('fires exactly on the target minute', () => {
    const at2000 = new Date('2026-06-04T14:30:30Z'); // 20:00 IST
    expect(shouldRunDigest(evening, tz, at2000)).toBe(true);
  });

  it('fires within the catch-up window (default 5 minutes) after the target', () => {
    const at2001 = new Date('2026-06-04T14:31:00Z'); // 20:01 IST
    const at2004 = new Date('2026-06-04T14:34:30Z'); // 20:04 IST
    expect(shouldRunDigest(evening, tz, at2001)).toBe(true);
    expect(shouldRunDigest(evening, tz, at2004)).toBe(true);
  });

  it('does NOT fire at or beyond the window edge (5 minutes after)', () => {
    const at2005 = new Date('2026-06-04T14:35:30Z'); // 20:05 IST
    expect(shouldRunDigest(evening, tz, at2005)).toBe(false);
  });

  it('does NOT fire before the target minute', () => {
    const at1959 = new Date('2026-06-04T14:29:30Z'); // 19:59 IST
    expect(shouldRunDigest(evening, tz, at1959)).toBe(false);
  });

  it('honours a custom window', () => {
    const at2009 = new Date('2026-06-04T14:39:00Z'); // 20:09 IST
    expect(shouldRunDigest(evening, tz, at2009, 10)).toBe(true);
    expect(shouldRunDigest(evening, tz, at2009, 5)).toBe(false);
  });
});

describe('shouldRunDigest — weekly weekday gating', () => {
  const weekly = getDefaultDigestConfig('weekly'); // Sunday 20:00 IST

  it('fires on the right weekday at the target time', () => {
    // 2026-06-07 is a Sunday. 14:30 UTC == 20:00 IST.
    const sunday2000 = new Date('2026-06-07T14:30:00Z');
    expect(shouldRunDigest(weekly, tz, sunday2000)).toBe(true);
  });

  it('does NOT fire on the wrong weekday even at the target time', () => {
    // 2026-06-08 is a Monday at 20:00 IST.
    const monday2000 = new Date('2026-06-08T14:30:00Z');
    expect(shouldRunDigest(weekly, tz, monday2000)).toBe(false);
  });

  it('does NOT fire on the right weekday at the wrong time', () => {
    // Sunday 21:00 IST.
    const sunday2100 = new Date('2026-06-07T15:30:00Z');
    expect(shouldRunDigest(weekly, tz, sunday2100)).toBe(false);
  });
});

describe('getUserLocalDate', () => {
  it('returns YYYY-MM-DD in the user timezone', () => {
    // 2026-06-04T14:30:00Z is 2026-06-04 20:00 IST.
    expect(getUserLocalDate(tz, new Date('2026-06-04T14:30:00Z'))).toBe('2026-06-04');
  });

  it('rolls over at midnight user-local', () => {
    // 2026-06-04T18:30:00Z is 2026-06-05 00:00 IST.
    expect(getUserLocalDate(tz, new Date('2026-06-04T18:30:00Z'))).toBe('2026-06-05');
  });
});

describe('defaultSections / getDefaultDigestConfig', () => {
  it('morning includes calendar_today + cron_jobs_today', () => {
    const s = defaultSections('morning');
    expect(s).toContain('calendar_today');
    expect(s).toContain('cron_jobs_today');
    expect(s).not.toContain('calendar_tomorrow');
  });

  it('evening includes calendar_tomorrow + news_ai', () => {
    const s = defaultSections('evening');
    expect(s).toContain('calendar_tomorrow');
    expect(s).toContain('news_ai');
  });

  it('weekly includes cron_completed + cron_missed', () => {
    const s = defaultSections('weekly');
    expect(s).toContain('cron_completed');
    expect(s).toContain('cron_missed');
  });

  it('email digest defaults to disabled (costs a browser-use run)', () => {
    expect(getDefaultDigestConfig('email').enabled).toBe(false);
  });

  it('every kind has a non-empty section list', () => {
    (['morning', 'evening', 'weekly', 'email'] as DigestKind[]).forEach((k) => {
      expect(getDefaultDigestConfig(k).sections.length).toBeGreaterThan(0);
    });
  });
});

describe('validateDigestConfigUpdate', () => {
  it('accepts a valid scheduleTime', () => {
    expect(validateDigestConfigUpdate({ scheduleTime: '20:00' })).toEqual([]);
  });

  it('rejects a malformed scheduleTime', () => {
    expect(validateDigestConfigUpdate({ scheduleTime: '8pm' })).not.toEqual([]);
  });

  it('rejects an unknown section', () => {
    expect(validateDigestConfigUpdate({ sections: ['bogus_section' as any] })).not.toEqual([]);
  });

  it('rejects an empty channel list', () => {
    expect(validateDigestConfigUpdate({ notifyChannels: [] })).not.toEqual([]);
  });

  it('rejects more than 5 news topics', () => {
    expect(validateDigestConfigUpdate({ newsTopics: ['a', 'b', 'c', 'd', 'e', 'f'] })).not.toEqual([]);
  });
});

describe('periodWindowFor', () => {
  it('morning/evening span the current user-local day', () => {
    const w = periodWindowFor('evening', tz, new Date('2026-06-04T14:30:00Z'));
    // start = 2026-06-04 00:00 IST, end = 2026-06-04 23:59 IST
    expect(new Date(w.start).toISOString()).toBe(new Date('2026-06-03T18:30:00.000Z').toISOString());
    expect(new Date(w.end).toISOString()).toBe(new Date('2026-06-04T18:29:59.999Z').toISOString());
  });

  it('weekly spans 7 days ending today', () => {
    const w = periodWindowFor('weekly', tz, new Date('2026-06-07T14:30:00Z'));
    const start = new Date(w.start);
    const end = new Date(w.end);
    const days = (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);
    expect(days).toBeCloseTo(7, 0);
  });
});
