// Outlook summary section: scrapes outlook.live.com/office.com.
// Only meaningful for the 'email' kind and only runs when the user has saved
// Outlook vault credentials.
//
// Two backends:
//   - OUTLOOK_PLAYWRIGHT (ctx.env): a scripted Playwright login+scrape, wired
//     in only on Render (see src/render/env.ts) since Cloudflare Workers can't
//     spawn a real browser. No per-run cost, no Browser Use API key needed.
//   - Browser Use Cloud: AI-agent fallback, used when Playwright isn't
//     available (i.e. this is running on Cloudflare) or a Browser Use key is
//     configured and Playwright isn't wired in.

import type { DigestSection, DigestSectionItem } from '../../../types';
import { decrypt } from '../../crypto';
import { runBrowserTask } from '../../browser';
import { emptySection, type SectionFetcher } from './types';

async function loadOutlookVaultCred(
  ctx: Parameters<SectionFetcher['fetch']>[0],
): Promise<{ username: string; password: string } | null> {
  const vaultEntry = await ctx.db
    .prepare(
      `SELECT name, encrypted_blob FROM site_credentials
       WHERE user_id = ?
         AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE)
       LIMIT 1`,
    )
    .bind(ctx.userId, '%Outlook%', '%Microsoft%', '%Office 365%')
    .first<{ name: string; encrypted_blob: string }>();
  if (!vaultEntry) return null;
  return JSON.parse(await decrypt(vaultEntry.encrypted_blob, ctx.pinHash));
}

export const outlookSummary: SectionFetcher = {
  key: 'outlook_summary',
  title: 'Outlook',
  appliesTo: (k) => k === 'email',
  fetch: async (ctx): Promise<DigestSection> => {
    try {
      const cred = await loadOutlookVaultCred(ctx);
      if (!cred) {
        return {
          key: 'outlook_summary',
          title: 'Outlook',
          summary: 'No Outlook credentials saved. Add them in Settings → Secret Vault.',
          items: [],
        };
      }

      if (ctx.env.OUTLOOK_PLAYWRIGHT) {
        const result = await ctx.env.OUTLOOK_PLAYWRIGHT({
          db: ctx.db,
          userId: ctx.userId,
          pinHash: ctx.pinHash,
          username: cred.username,
          password: cred.password,
        });

        if (result.status === 'completed' && result.emails?.length) {
          const items: DigestSectionItem[] = result.emails.map((e, i) => ({
            key: `outlook-inbox-${i}`,
            text: `${e.sender} — ${e.subject}`,
            metadata: { source: 'outlook', ...e },
          }));
          return { key: 'outlook_summary', title: 'Outlook', summary: 'Inbox fetched', items };
        }
        return {
          key: 'outlook_summary',
          title: 'Outlook',
          summary: result.error
            ? `Outlook scrape failed: ${result.error}`
            : 'Outlook returned no messages.',
          items: [],
        };
      }

      const buCred = await ctx.db
        .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
        .bind(ctx.userId, 'browser_use_api_key')
        .first<{ encrypted_value: string }>();
      if (!buCred) {
        return {
          key: 'outlook_summary',
          title: 'Outlook',
          summary: 'Browser Use API key not configured. Add it in Settings → API Keys.',
          items: [],
        };
      }

      const apiKey = (await decrypt(buCred.encrypted_value, ctx.pinHash)).trim();
      const result = await runBrowserTask(
        `Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.`,
        apiKey,
        { secrets: { username: cred.username, password: cred.password }, timeoutMs: 300000 },
      );

      if (result.status === 'completed' && result.output) {
        const items: DigestSectionItem[] = [
          {
            key: 'outlook-inbox',
            text: 'See digest for recent Outlook messages',
            metadata: { source: 'outlook', output: result.output },
          },
        ];
        return { key: 'outlook_summary', title: 'Outlook', summary: 'Inbox fetched', items };
      }
      if (result.status === 'timeout') {
        return {
          key: 'outlook_summary',
          title: 'Outlook',
          summary: 'Browser task timed out.',
          items: [],
        };
      }
      return {
        key: 'outlook_summary',
        title: 'Outlook',
        summary: 'Outlook returned no content.',
        items: [],
      };
    } catch (err: any) {
      console.error('[digest:outlook_summary] fetch error:', err?.message);
      return emptySection('outlook_summary', 'Outlook');
    }
  },
};
