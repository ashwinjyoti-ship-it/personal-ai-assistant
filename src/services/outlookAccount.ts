/**
 * Account matching helpers shared by the scripted Outlook login and tests.
 * Microsoft can show several remembered identities in the same browser, so
 * account selection must be based on the saved login identifier, never tile
 * order.
 */
export function normalizeLoginIdentifier(value: string): string {
  return value.trim().toLowerCase();
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
