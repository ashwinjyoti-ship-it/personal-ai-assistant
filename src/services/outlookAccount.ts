/**
 * Account matching helpers shared by the scripted Outlook login and tests.
 * Microsoft can show several remembered identities in the same browser, so
 * account selection must be based on the saved login identifier, never tile
 * order.
 */
export function normalizeLoginIdentifier(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Does this URL show a signed-in Outlook mailbox?
 *
 * Two hard-won rules live here:
 *   1. Tenants land on several hosts after login — outlook.office.com,
 *      outlook.office365.com, outlook.live.com, and Microsoft's newer
 *      outlook.cloud.microsoft — so the host check is an allowlist, not a
 *      single literal.
 *   2. Only the PATH may veto success. OWA's post-login landing URL is
 *      typically `/mail/?authRedirect=true&...`; a naive "no 'auth' anywhere
 *      in the URL" check rejects the fully loaded inbox forever, which
 *      surfaced as "Login did not reach the inbox" with the inbox visibly
 *      open in the failure screenshot.
 */
export function isOutlookInboxUrl(rawUrl: string): boolean {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }
  const host = url.hostname.toLowerCase();
  const outlookHost =
    host === 'outlook.office.com' ||
    host === 'outlook.office365.com' ||
    host === 'outlook.live.com' ||
    host === 'outlook.cloud.microsoft' ||
    host.endsWith('.outlook.office.com') ||
    host.endsWith('.outlook.office365.com') ||
    host.endsWith('.outlook.cloud.microsoft');
  if (!outlookHost) return false;
  return !/login|logout|signin|signout|\/auth\b/i.test(url.pathname);
}

export function accountTileMatchesUsername(tileText: string, username: string): boolean {
  const target = normalizeLoginIdentifier(username);
  if (!target) return false;

  // Email/UPN tiles normally contain the identifier as a standalone token.
  // Extracting email-shaped tokens prevents a target such as
  // `user@example.com` from matching `otheruser@example.com` by substring.
  const identifiers = tileText
    .match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
    ?.map(normalizeLoginIdentifier) ?? [];
  if (target.includes('@')) return identifiers.includes(target);

  return tileText
    .split(/\s+/)
    .map(normalizeLoginIdentifier)
    .includes(target);
}
