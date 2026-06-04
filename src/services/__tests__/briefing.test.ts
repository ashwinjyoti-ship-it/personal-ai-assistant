import { describe, it, expect } from 'vitest';
import { shouldRunBriefing, getUserLocalDate } from '../briefing';

// All fixed instants below are expressed in UTC; the function converts them to
// the supplied timezone. 14:30 UTC == 20:00 IST (Asia/Kolkata, UTC+5:30).
const tz = 'Asia/Kolkata';

describe('shouldRunBriefing — catch-up window', () => {
  it('fires exactly on the target minute', () => {
    const at2000 = new Date('2026-06-04T14:30:30Z'); // 20:00 IST
    expect(shouldRunBriefing('20:00', tz, at2000)).toBe(true);
  });

  it('fires within the catch-up window (default 5 minutes) after the target', () => {
    const at2001 = new Date('2026-06-04T14:31:00Z'); // 20:01 IST
    const at2004 = new Date('2026-06-04T14:34:30Z'); // 20:04 IST
    expect(shouldRunBriefing('20:00', tz, at2001)).toBe(true);
    expect(shouldRunBriefing('20:00', tz, at2004)).toBe(true);
  });

  it('does NOT fire at or beyond the window edge (5 minutes after)', () => {
    const at2005 = new Date('2026-06-04T14:35:30Z'); // 20:05 IST
    expect(shouldRunBriefing('20:00', tz, at2005)).toBe(false);
  });

  it('does NOT fire before the target minute', () => {
    const at1959 = new Date('2026-06-04T14:29:30Z'); // 19:59 IST
    expect(shouldRunBriefing('20:00', tz, at1959)).toBe(false);
  });

  it('respects a custom window size', () => {
    const at2002 = new Date('2026-06-04T14:32:30Z'); // 20:02 IST
    expect(shouldRunBriefing('20:00', tz, at2002, 2)).toBe(false); // window [0,2)
    expect(shouldRunBriefing('20:00', tz, at2002, 3)).toBe(true);  // window [0,3)
  });

  it('honours the user timezone when matching', () => {
    // 20:00 in New York (UTC-4 in June) == 00:00 UTC next day.
    const nyEvening = new Date('2026-06-05T00:00:30Z');
    expect(shouldRunBriefing('20:00', 'America/New_York', nyEvening)).toBe(true);
    // Same instant is NOT 20:00 in IST, so an IST user should not fire.
    expect(shouldRunBriefing('20:00', tz, nyEvening)).toBe(false);
  });
});

describe('getUserLocalDate', () => {
  it('returns the user-local YYYY-MM-DD', () => {
    // 22:00 UTC on Jun 4 is already Jun 5 in IST (03:30 IST).
    const lateUtc = new Date('2026-06-04T22:00:00Z');
    expect(getUserLocalDate(tz, lateUtc)).toBe('2026-06-05');
    // ...but still Jun 4 in New York.
    expect(getUserLocalDate('America/New_York', lateUtc)).toBe('2026-06-04');
  });

  it('formats as zero-padded YYYY-MM-DD', () => {
    const d = new Date('2026-01-09T12:00:00Z');
    expect(getUserLocalDate(tz, d)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
