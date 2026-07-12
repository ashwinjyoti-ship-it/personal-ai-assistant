import { describe, expect, it } from 'vitest';
import { accountTileMatchesUsername, normalizeLoginIdentifier } from '../../services/outlookAccount';

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
