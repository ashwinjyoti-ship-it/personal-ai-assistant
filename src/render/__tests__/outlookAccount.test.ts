import { describe, expect, it } from 'vitest';
import {
  accountTileMatchesUsername,
  isOutlookInboxUrl,
  normalizeLoginIdentifier,
} from '../../services/outlookAccount';

describe('isOutlookInboxUrl', () => {
  it('accepts the plain OWA inbox', () => {
    expect(isOutlookInboxUrl('https://outlook.office.com/mail/')).toBe(true);
    expect(isOutlookInboxUrl('https://outlook.office.com/mail/inbox/id/AAQkAD')).toBe(true);
  });

  it('accepts the post-login landing URL with authRedirect in the query', () => {
    // Regression: "auth" in the query string must NOT veto success — OWA
    // lands on exactly this URL after AAD login.
    expect(isOutlookInboxUrl('https://outlook.office.com/mail/?authRedirect=true&state=1')).toBe(true);
  });

  it('accepts the other mailbox hosts tenants land on', () => {
    expect(isOutlookInboxUrl('https://outlook.office365.com/mail/')).toBe(true);
    expect(isOutlookInboxUrl('https://outlook.cloud.microsoft/mail/')).toBe(true);
    expect(isOutlookInboxUrl('https://outlook.live.com/mail/0/')).toBe(true);
  });

  it('rejects login, logout, and OWA auth paths', () => {
    expect(isOutlookInboxUrl('https://login.microsoftonline.com/common/oauth2/authorize')).toBe(false);
    expect(isOutlookInboxUrl('https://outlook.office.com/owa/auth/errorfe.aspx')).toBe(false);
    expect(isOutlookInboxUrl('https://outlook.office.com/mail/logout')).toBe(false);
    expect(isOutlookInboxUrl('https://outlook.office365.com/login.srf')).toBe(false);
  });

  it('rejects non-Outlook hosts and non-URLs', () => {
    expect(isOutlookInboxUrl('https://adfs.example.com/adfs/ls/')).toBe(false);
    expect(isOutlookInboxUrl('https://evil.com/outlook.office.com/mail/')).toBe(false);
    expect(isOutlookInboxUrl('about:blank')).toBe(false);
    expect(isOutlookInboxUrl('not a url')).toBe(false);
  });
});

describe('Outlook account matching', () => {
  it('normalizes the saved login identifier', () => {
    expect(normalizeLoginIdentifier('  AJYOTI@NCPAMUMBAI.COM ')).toBe('ajyoti@ncpamumbai.com');
  });

  it('matches the exact email shown on an account tile', () => {
    expect(accountTileMatchesUsername(
      'Ashwin Jyoti\najyoti@ncpamumbai.com',
      'AJYOTI@ncpamumbai.com',
    )).toBe(true);
  });

  it('does not match a different email with the target as a substring', () => {
    expect(accountTileMatchesUsername(
      'Another account\nnotajyoti@ncpamumbai.com',
      'ajyoti@ncpamumbai.com',
    )).toBe(false);
  });

  it('does not guess when the tile has no matching identifier', () => {
    expect(accountTileMatchesUsername(
      'Other Work Account\nother@example.com',
      'ajyoti@ncpamumbai.com',
    )).toBe(false);
  });
});
