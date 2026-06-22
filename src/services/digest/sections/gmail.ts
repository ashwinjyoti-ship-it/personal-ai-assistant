// Gmail summary section: unread count, important count, top senders, urgent flag.

import type { DigestSection } from '../../../types';
import { buildGmail, emptySection, type SectionFetcher } from './types';

export const gmailSummary: SectionFetcher = {
  key: 'gmail_summary',
  title: 'Gmail',
  appliesTo: () => true,
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const gmail = buildGmail(ctx);
      const unread = await gmail.listMessages({
        query: 'is:unread',
        maxResults: 50,
        labelIds: ['INBOX'],
      });
      const important = await gmail.listMessages({
        query: 'is:important is:unread',
        maxResults: 10,
      });

      const senderCounts: Record<string, number> = {};
      for (const m of unread) {
        const sender = m.from.split('<')[0].trim() || m.from;
        senderCounts[sender] = (senderCounts[sender] || 0) + 1;
      }
      const topSenders = Object.entries(senderCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([s]) => s);

      const hasUrgent = unread.some(
        (m) =>
          m.subject.toLowerCase().includes('urgent') ||
          m.subject.toLowerCase().includes('asap') ||
          m.subject.toLowerCase().includes('immediately'),
      );

      if (unread.length === 0) {
        return { key: 'gmail_summary', title: 'Gmail', summary: 'Inbox clear', items: [] };
      }

      const lines = [`📬 ${unread.length} unread`];
      if (important.length > 0) lines.push(`★ ${important.length} important`);
      if (hasUrgent) lines.push('⚠️ Urgent messages present');
      if (topSenders.length > 0) lines.push(`From: ${topSenders.slice(0, 3).join(', ')}`);

      return {
        key: 'gmail_summary',
        title: 'Gmail',
        summary: lines.join(' · '),
        items: [
          {
            key: 'gmail-unread',
            text: `Review ${unread.length} unread Gmail messages`,
            metadata: {
              source: 'gmail',
              count: unread.length,
              importantCount: important.length,
              hasUrgent,
              topSenders,
            },
          },
        ],
      };
    } catch (err: any) {
      console.error('[digest:gmail_summary] fetch error:', err?.message);
      return emptySection('gmail_summary', 'Gmail');
    }
  },
};
