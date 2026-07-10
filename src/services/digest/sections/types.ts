// Section fetchers: each SectionKey maps to a fetcher that returns a DigestSection.
//
// A fetcher receives a shared context (db, user, env, period, newsTopics) and
// decides what to fetch based on the digest period window. Failures degrade
// gracefully — a fetcher that throws returns an empty section, never breaks
// the whole digest.

import { GoogleCalendar } from '../../google';
import { GmailService } from '../../gmail';
import type { DigestSection, DigestKind, SectionKey, OutlookPlaywrightFn } from '../../../types';

export interface SectionContext {
  db: D1Database;
  userId: number;
  pinHash: string;
  timezone: string;
  kind: DigestKind;
  /** Inclusive window the digest covers (ISO strings). */
  periodStart: string;
  periodEnd: string;
  newsTopics: string[];
  env: {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn;
  };
}

export interface SectionFetcher {
  key: SectionKey;
  title: string;
  /** Whether this section is meaningful for the given kind (used by UI hints). */
  appliesTo: (kind: DigestKind) => boolean;
  fetch: (ctx: SectionContext) => Promise<DigestSection>;
}

/** Build a calendar helper bound to the user's OAuth tokens. */
export function buildCalendar(ctx: SectionContext): GoogleCalendar {
  return new GoogleCalendar(
    ctx.db,
    ctx.userId,
    ctx.pinHash,
    ctx.env.GOOGLE_CLIENT_ID,
    ctx.env.GOOGLE_CLIENT_SECRET,
  );
}

/** Build a Gmail helper bound to the user's OAuth tokens. */
export function buildGmail(ctx: SectionContext): GmailService {
  return new GmailService(
    ctx.db,
    ctx.userId,
    ctx.pinHash,
    ctx.env.GOOGLE_CLIENT_ID,
    ctx.env.GOOGLE_CLIENT_SECRET,
  );
}

/** Empty section helper for graceful degradation. */
export function emptySection(key: SectionKey, title: string, summary = ''): DigestSection {
  return { key, title, summary, items: [] };
}
