// Google Services — Phase 2.3
// OAuth 2.0 User Authentication for Cloudflare Workers
// User signs in once → refresh token stored encrypted in D1 → auto-refreshes forever
//
// Replaces service account auth (killed by Google mid-2025 for personal accounts)
// Now ALL operations run as the actual user — full quota, full permissions
//
// Supports: Sheets v4, Calendar v3, Docs v1, Drive v3

import { encrypt, decrypt } from './crypto';

// ==========================================
// OAuth 2.0 Configuration
// ==========================================

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// Scopes: full access to Sheets, Calendar, Docs, Drive, Gmail
const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ');

// In-memory access token cache (per Worker isolate, auto-clears on cold start)
let accessTokenCache: { userId: number; token: string; expiresAt: number } | null = null;

// ==========================================
// OAuth Token Types
// ==========================================

interface GoogleOAuthTokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface StoredGoogleAuth {
  refresh_token: string;
  email: string;
  name: string;
  connected_at: string;
}

// ==========================================
// OAuth 2.0 Flow Helpers
// ==========================================

// Get stored refresh token from DB (stored as 'google_oauth_tokens' credential)
async function getStoredAuth(db: D1Database, userId: number, pinHash: string): Promise<StoredGoogleAuth | null> {
  const cred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(userId, 'google_oauth_tokens').first<{ encrypted_value: string }>();

  if (!cred) return null;

  try {
    const decrypted = await decrypt(cred.encrypted_value, pinHash);
    return JSON.parse(decrypted) as StoredGoogleAuth;
  } catch {
    return null;
  }
}

// Store refresh token + user info in DB
async function storeAuth(db: D1Database, userId: number, pinHash: string, auth: StoredGoogleAuth): Promise<void> {
  const encrypted = await encrypt(JSON.stringify(auth), pinHash);
  await db.prepare(
    `INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`
  ).bind(userId, encrypted).run();
}

// Generate the OAuth consent URL
export function generateAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: OAUTH_SCOPES,
    access_type: 'offline',       // Gets refresh_token
    prompt: 'consent',            // Forces consent screen → always returns refresh_token
    state: state,
    include_granted_scopes: 'true',
  });
  return `${GOOGLE_AUTH_URL}?${params}`;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<GoogleOAuthTokens> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${text.substring(0, 300)}`);
  }

  return JSON.parse(text) as GoogleOAuthTokens;
}

// Refresh an access token using the stored refresh token
async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<{ access_token: string; expires_in: number }> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    // If refresh token is revoked or expired, user needs to reconnect
    if (res.status === 400 || res.status === 401) {
      throw new Error('Google connection expired. Please reconnect your Google account in Settings → Keys.');
    }
    throw new Error(`Token refresh failed (${res.status}): ${text.substring(0, 300)}`);
  }

  return JSON.parse(text);
}

// Fetch Google user info from access token
export async function fetchUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  return await res.json() as GoogleUserInfo;
}

// ==========================================
// Core Auth: get a valid access token
// ==========================================

// This is the single gateway — all API calls go through here.
// It checks the in-memory cache, refreshes if expired, and returns a valid token.
// clientId/clientSecret come from Cloudflare env vars (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
export async function getGoogleAuth(
  db: D1Database,
  userId: number,
  pinHash: string,
  clientId: string,
  clientSecret: string
): Promise<{ token: string; email: string }> {
  // Validate env vars are set
  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.');
  }

  // 1. Check in-memory cache (fast path)
  if (
    accessTokenCache &&
    accessTokenCache.userId === userId &&
    accessTokenCache.expiresAt > Date.now() / 1000 + 60
  ) {
    const stored = await getStoredAuth(db, userId, pinHash);
    return { token: accessTokenCache.token, email: stored?.email || 'unknown' };
  }

  // 2. Get stored auth (refresh token + email)
  const storedAuth = await getStoredAuth(db, userId, pinHash);
  if (!storedAuth) {
    throw new Error(
      'Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".'
    );
  }

  // 3. Refresh the access token using env-provided client credentials
  const refreshed = await refreshAccessToken(storedAuth.refresh_token, clientId, clientSecret);

  // 4. Cache in memory
  accessTokenCache = {
    userId,
    token: refreshed.access_token,
    expiresAt: Math.floor(Date.now() / 1000) + refreshed.expires_in,
  };

  return { token: refreshed.access_token, email: storedAuth.email };
}

// Check if Google is connected (without requiring full auth)
export async function isGoogleConnected(db: D1Database, userId: number, pinHash: string): Promise<{ connected: boolean; email?: string; connectedAt?: string }> {
  try {
    const stored = await getStoredAuth(db, userId, pinHash);
    if (!stored) return { connected: false };
    return { connected: true, email: stored.email, connectedAt: stored.connected_at };
  } catch {
    return { connected: false };
  }
}

// Check if OAuth client is configured via env vars
export function isOAuthClientConfigured(clientId?: string, clientSecret?: string): boolean {
  return !!(clientId && clientSecret && clientId.includes('.apps.googleusercontent.com'));
}

// Complete the OAuth flow: exchange code, store tokens
// clientId/clientSecret come from Cloudflare env vars
export async function completeOAuthFlow(
  db: D1Database,
  userId: number,
  pinHash: string,
  code: string,
  redirectUri: string,
  clientId: string,
  clientSecret: string
): Promise<{ email: string; name: string }> {
  // Exchange code for tokens
  const tokens = await exchangeCodeForTokens(code, clientId, clientSecret, redirectUri);

  if (!tokens.refresh_token) {
    throw new Error('No refresh token received. Try disconnecting and reconnecting.');
  }

  // Get user info
  const userInfo = await fetchUserInfo(tokens.access_token);

  // Store the refresh token + user info
  const authData: StoredGoogleAuth = {
    refresh_token: tokens.refresh_token,
    email: userInfo.email,
    name: userInfo.name,
    connected_at: new Date().toISOString(),
  };

  await storeAuth(db, userId, pinHash, authData);

  // Cache the access token in memory
  accessTokenCache = {
    userId,
    token: tokens.access_token,
    expiresAt: Math.floor(Date.now() / 1000) + tokens.expires_in,
  };

  return { email: userInfo.email, name: userInfo.name };
}

// Disconnect Google (remove stored tokens)
export async function disconnectGoogle(db: D1Database, userId: number): Promise<void> {
  await db.prepare(
    "DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'"
  ).bind(userId).run();

  // Clear cache
  if (accessTokenCache?.userId === userId) {
    accessTokenCache = null;
  }
}


// ==========================================
// Google Sheets Service
// ==========================================

const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export class GoogleSheets {
  constructor(
    private db: D1Database,
    private userId: number,
    private pinHash: string,
    private clientId: string,
    private clientSecret: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash, this.clientId, this.clientSecret);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Read values from a range (e.g., "Sheet1!A1:D10")
  async readRange(spreadsheetId: string, range: string): Promise<string[][]> {
    const headers = await this.authHeaders();
    const encodedRange = encodeURIComponent(range);
    const res = await fetch(
      `${SHEETS_BASE}/${spreadsheetId}/values/${encodedRange}`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets read failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { values?: string[][] };
    return data.values || [];
  }

  // Write values to a range (overwrites)
  async writeRange(spreadsheetId: string, range: string, values: string[][]): Promise<{ updatedCells: number }> {
    const headers = await this.authHeaders();
    const encodedRange = encodeURIComponent(range);
    const res = await fetch(
      `${SHEETS_BASE}/${spreadsheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets write failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { updatedCells: number };
    return { updatedCells: data.updatedCells || 0 };
  }

  // Append rows to the end of a sheet
  async appendRows(spreadsheetId: string, range: string, values: string[][]): Promise<{ updatedCells: number }> {
    const headers = await this.authHeaders();
    const encodedRange = encodeURIComponent(range);
    const res = await fetch(
      `${SHEETS_BASE}/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets append failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { updates?: { updatedCells: number } };
    return { updatedCells: data.updates?.updatedCells || values.length };
  }

  // Delete a single row from a named tab (rowNumber is 1-based, as displayed in the sheet)
  async deleteRow(spreadsheetId: string, sheetName: string, rowNumber: number): Promise<void> {
    const headers = await this.authHeaders();

    // Resolve tab name → numeric sheetId required by batchUpdate
    const metaRes = await fetch(
      `${SHEETS_BASE}/${spreadsheetId}?fields=sheets.properties`,
      { headers }
    );
    if (!metaRes.ok) {
      const err = await metaRes.text();
      throw new Error(`Failed to get sheet metadata (${metaRes.status}): ${err}`);
    }
    const metaData = await metaRes.json() as {
      sheets: { properties: { sheetId: number; title: string } }[];
    };
    const sheet = metaData.sheets.find(s => s.properties.title === sheetName);
    if (!sheet) {
      const available = metaData.sheets.map(s => s.properties.title).join(', ');
      throw new Error(`Tab "${sheetName}" not found. Available tabs: ${available}`);
    }
    const sheetId = sheet.properties.sheetId;

    // Convert 1-based row number to 0-based API index
    const startIndex = rowNumber - 1;
    const res = await fetch(`${SHEETS_BASE}/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [{
          deleteDimension: {
            range: { sheetId, dimension: 'ROWS', startIndex, endIndex: startIndex + 1 },
          },
        }],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Row delete failed (${res.status}): ${err}`);
    }
  }

  // Create a new spreadsheet — now runs as the USER (full quota, no restrictions)
  async createSpreadsheet(title: string, sheetNames?: string[]): Promise<{ spreadsheetId: string; url: string }> {
    const headers = await this.authHeaders();

    const body: Record<string, unknown> = {
      properties: { title },
      sheets: (sheetNames && sheetNames.length > 0)
        ? sheetNames.map(name => ({ properties: { title: name } }))
        : [{ properties: { title: 'Sheet1' } }],
    };

    const res = await fetch(SHEETS_BASE, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets create failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { spreadsheetId: string };
    return {
      spreadsheetId: data.spreadsheetId,
      url: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    };
  }

  // Get spreadsheet metadata (title, sheet names, etc.)
  async getMetadata(spreadsheetId: string): Promise<{ title: string; sheets: string[] }> {
    const headers = await this.authHeaders();
    const res = await fetch(
      `${SHEETS_BASE}/${spreadsheetId}?fields=properties.title,sheets.properties.title`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets metadata failed (${res.status}): ${err}`);
    }

    const data = await res.json() as {
      properties: { title: string };
      sheets: { properties: { title: string } }[];
    };

    return {
      title: data.properties.title,
      sheets: data.sheets.map(s => s.properties.title),
    };
  }
}


// ==========================================
// Google Calendar Service
// ==========================================

const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3';

interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string; timeZone?: string };
  end: { dateTime?: string; date?: string; timeZone?: string };
  attendees?: { email: string; displayName?: string }[];
  status?: string;
}

export class GoogleCalendar {
  constructor(
    private db: D1Database,
    private userId: number,
    private pinHash: string,
    private clientId: string,
    private clientSecret: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash, this.clientId, this.clientSecret);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // List events (now uses the user's actual primary calendar)
  async listEvents(
    calendarId: string = 'primary',
    options: {
      timeMin?: string;
      timeMax?: string;
      maxResults?: number;
      query?: string;
    } = {}
  ): Promise<CalendarEvent[]> {
    const headers = await this.authHeaders();
    const params = new URLSearchParams();

    if (options.timeMin) params.set('timeMin', options.timeMin);
    if (options.timeMax) params.set('timeMax', options.timeMax);
    params.set('maxResults', String(options.maxResults || 20));
    params.set('singleEvents', 'true');
    params.set('orderBy', 'startTime');
    if (options.query) params.set('q', options.query);

    const res = await fetch(
      `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Calendar list failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { items?: CalendarEvent[] };
    return data.items || [];
  }

  // Create a new event
  async createEvent(
    calendarId: string = 'primary',
    event: {
      summary: string;
      description?: string;
      location?: string;
      startDateTime: string;
      endDateTime: string;
      timeZone?: string;
      attendees?: string[];
    }
  ): Promise<CalendarEvent> {
    const headers = await this.authHeaders();
    const tz = event.timeZone || 'Asia/Kolkata';

    const body: Record<string, unknown> = {
      summary: event.summary,
      description: event.description || '',
      location: event.location || '',
      start: { dateTime: event.startDateTime, timeZone: tz },
      end: { dateTime: event.endDateTime, timeZone: tz },
    };

    if (event.attendees?.length) {
      body.attendees = event.attendees.map(email => ({ email }));
    }

    const res = await fetch(
      `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events`,
      { method: 'POST', headers, body: JSON.stringify(body) }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Calendar create failed (${res.status}): ${err}`);
    }

    return await res.json() as CalendarEvent;
  }

  // Update an existing event
  async updateEvent(
    calendarId: string = 'primary',
    eventId: string,
    updates: Partial<{
      summary: string;
      description: string;
      location: string;
      startDateTime: string;
      endDateTime: string;
      timeZone: string;
    }>
  ): Promise<CalendarEvent> {
    const headers = await this.authHeaders();
    const tz = updates.timeZone || 'Asia/Kolkata';

    const body: Record<string, unknown> = {};
    if (updates.summary) body.summary = updates.summary;
    if (updates.description) body.description = updates.description;
    if (updates.location) body.location = updates.location;
    if (updates.startDateTime) body.start = { dateTime: updates.startDateTime, timeZone: tz };
    if (updates.endDateTime) body.end = { dateTime: updates.endDateTime, timeZone: tz };

    const res = await fetch(
      `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
      { method: 'PATCH', headers, body: JSON.stringify(body) }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Calendar update failed (${res.status}): ${err}`);
    }

    return await res.json() as CalendarEvent;
  }

  // Delete an event
  async deleteEvent(calendarId: string = 'primary', eventId: string): Promise<void> {
    const headers = await this.authHeaders();
    const res = await fetch(
      `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
      { method: 'DELETE', headers }
    );

    if (!res.ok && res.status !== 410) {
      const err = await res.text();
      throw new Error(`Calendar delete failed (${res.status}): ${err}`);
    }
  }

  // List calendars
  async listCalendars(): Promise<{ id: string; summary: string; primary: boolean }[]> {
    const headers = await this.authHeaders();
    const res = await fetch(`${CALENDAR_BASE}/users/me/calendarList`, { headers });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Calendar list calendars failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { items?: { id: string; summary: string; primary?: boolean }[] };
    return (data.items || []).map(c => ({
      id: c.id,
      summary: c.summary,
      primary: c.primary || false,
    }));
  }
}


// ==========================================
// Google Docs Service
// ==========================================

const DOCS_BASE = 'https://docs.googleapis.com/v1/documents';
const DRIVE_BASE = 'https://www.googleapis.com/drive/v3/files';

// ---- Markdown → Google Docs block parser ----

interface DocBlock {
  text: string;
  namedStyle: 'HEADING_1' | 'HEADING_2' | 'HEADING_3' | 'NORMAL_TEXT';
  spans: { start: number; end: number; bold?: boolean; italic?: boolean }[];
}

function parseMarkdownToDocBlocks(markdown: string): DocBlock[] {
  const blocks: DocBlock[] = [];
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || /^---+$/.test(trimmed)) continue;

    let namedStyle: DocBlock['namedStyle'] = 'NORMAL_TEXT';
    let rawText = line;

    const h3 = trimmed.match(/^###\s+(.+)/);
    const h2 = !h3 && trimmed.match(/^##\s+(.+)/);
    const h1 = !h3 && !h2 && trimmed.match(/^#\s+(.+)/);

    if (h3) { namedStyle = 'HEADING_3'; rawText = h3[1]; }
    else if (h2) { namedStyle = 'HEADING_2'; rawText = h2[1]; }
    else if (h1) { namedStyle = 'HEADING_1'; rawText = h1[1]; }
    else if (/^\s*[-*]\s/.test(line)) {
      rawText = '\u2022 ' + line.replace(/^\s*[-*]\s+/, '');
    }

    const { text, spans } = parseInlineMarkdown(rawText);
    blocks.push({ text, namedStyle, spans });
  }
  return blocks;
}

function parseInlineMarkdown(raw: string): { text: string; spans: { start: number; end: number; bold?: boolean; italic?: boolean }[] } {
  const spans: { start: number; end: number; bold?: boolean; italic?: boolean }[] = [];
  let result = '';
  let i = 0;

  while (i < raw.length) {
    if (raw[i] === '*' && raw[i + 1] === '*') {
      const close = raw.indexOf('**', i + 2);
      if (close !== -1) {
        const s = result.length;
        result += raw.substring(i + 2, close);
        spans.push({ start: s, end: result.length, bold: true });
        i = close + 2;
      } else { result += raw[i++]; }
    } else if (raw[i] === '_' && raw[i + 1] === '_') {
      const close = raw.indexOf('__', i + 2);
      if (close !== -1) {
        const s = result.length;
        result += raw.substring(i + 2, close);
        spans.push({ start: s, end: result.length, bold: true });
        i = close + 2;
      } else { result += raw[i++]; }
    } else if (raw[i] === '*' && raw[i + 1] !== '*') {
      const close = raw.indexOf('*', i + 1);
      if (close !== -1) {
        const s = result.length;
        result += raw.substring(i + 1, close);
        spans.push({ start: s, end: result.length, italic: true });
        i = close + 1;
      } else { result += raw[i++]; }
    } else if (raw[i] === '_') {
      const close = raw.indexOf('_', i + 1);
      if (close !== -1) {
        const s = result.length;
        result += raw.substring(i + 1, close);
        spans.push({ start: s, end: result.length, italic: true });
        i = close + 1;
      } else { result += raw[i++]; }
    } else {
      result += raw[i++];
    }
  }

  return { text: result, spans };
}

export class GoogleDocs {
  constructor(
    private db: D1Database,
    private userId: number,
    private pinHash: string,
    private clientId: string,
    private clientSecret: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash, this.clientId, this.clientSecret);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Create a new document — runs as the USER (full permissions)
  async createDocument(title: string): Promise<{ documentId: string; url: string }> {
    const headers = await this.authHeaders();

    const res = await fetch(DOCS_BASE, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs create failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { documentId: string };
    return {
      documentId: data.documentId,
      url: `https://docs.google.com/document/d/${data.documentId}/edit`,
    };
  }

  // Read document content (returns plain text)
  async readDocument(documentId: string): Promise<{ title: string; content: string }> {
    const headers = await this.authHeaders();
    const res = await fetch(`${DOCS_BASE}/${documentId}`, { headers });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs read failed (${res.status}): ${err}`);
    }

    const data = await res.json() as {
      title: string;
      body: {
        content: {
          paragraph?: {
            elements: { textRun?: { content: string } }[];
          };
        }[];
      };
    };

    let text = '';
    for (const block of data.body?.content || []) {
      if (block.paragraph) {
        for (const element of block.paragraph.elements) {
          if (element.textRun?.content) {
            text += element.textRun.content;
          }
        }
      }
    }

    return { title: data.title, content: text.trim() };
  }

  // Rewrite a document from scratch — clears existing content and writes formatted markdown
  async rewriteDocument(documentId: string, markdown: string): Promise<void> {
    const headers = await this.authHeaders();

    // Fetch doc to find current body range
    const docRes = await fetch(`${DOCS_BASE}/${documentId}`, { headers });
    if (!docRes.ok) {
      const err = await docRes.text();
      throw new Error(`Docs fetch failed (${docRes.status}): ${err.substring(0, 200)}`);
    }
    const docData = await docRes.json() as { body: { content: { endIndex?: number }[] } };
    const bodyContent = docData.body?.content || [];
    const lastElement = bodyContent[bodyContent.length - 1];
    const endIndex = lastElement?.endIndex ?? 2;

    const blocks = parseMarkdownToDocBlocks(markdown);
    const requests: object[] = [];

    // Delete all existing content, preserving the final paragraph break (index endIndex-1)
    if (endIndex > 2) {
      requests.push({
        deleteContentRange: {
          range: { startIndex: 1, endIndex: endIndex - 1 },
        },
      });
    }

    if (blocks.length === 0) {
      if (requests.length > 0) {
        await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
          method: 'POST', headers, body: JSON.stringify({ requests }),
        });
      }
      return;
    }

    // Build full text and track block positions
    // After the delete, content starts at index 1
    let fullText = '';
    const blockMeta: {
      start: number; end: number; namedStyle: string;
      spans: { start: number; end: number; bold?: boolean; italic?: boolean }[];
    }[] = [];

    for (const block of blocks) {
      const start = fullText.length;
      fullText += block.text + '\n';
      blockMeta.push({ start, end: fullText.length, namedStyle: block.namedStyle, spans: block.spans });
    }

    requests.push({ insertText: { location: { index: 1 }, text: fullText } });

    for (const meta of blockMeta) {
      if (meta.namedStyle !== 'NORMAL_TEXT') {
        requests.push({
          updateParagraphStyle: {
            range: { startIndex: 1 + meta.start, endIndex: 1 + meta.end },
            paragraphStyle: { namedStyleType: meta.namedStyle },
            fields: 'namedStyleType',
          },
        });
      }
      for (const span of meta.spans) {
        const textStyle: Record<string, boolean> = {};
        const fields: string[] = [];
        if (span.bold) { textStyle.bold = true; fields.push('bold'); }
        if (span.italic) { textStyle.italic = true; fields.push('italic'); }
        if (fields.length > 0) {
          requests.push({
            updateTextStyle: {
              range: {
                startIndex: 1 + meta.start + span.start,
                endIndex: 1 + meta.start + span.end,
              },
              textStyle,
              fields: fields.join(','),
            },
          });
        }
      }
    }

    const res = await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ requests }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs rewrite failed (${res.status}): ${err.substring(0, 200)}`);
    }
  }

  // Append markdown content with proper Google Docs formatting (headings, bold, italic, bullets)
  async appendFormattedContent(documentId: string, markdown: string): Promise<void> {
    const headers = await this.authHeaders();

    const blocks = parseMarkdownToDocBlocks(markdown);
    if (blocks.length === 0) return;

    // Fetch doc to get current end index so we know where to insert and where to apply styles
    const docRes = await fetch(`${DOCS_BASE}/${documentId}`, { headers });
    if (!docRes.ok) {
      const err = await docRes.text();
      throw new Error(`Docs fetch failed (${docRes.status}): ${err.substring(0, 200)}`);
    }
    const docData = await docRes.json() as { body: { content: { endIndex?: number }[] } };
    const bodyContent = docData.body?.content || [];
    const lastElement = bodyContent[bodyContent.length - 1];
    const insertIndex = Math.max(1, (lastElement?.endIndex ?? 2) - 1);

    // Concatenate all block texts and track each block's character range
    let fullText = '';
    const blockMeta: {
      start: number;
      end: number;
      namedStyle: string;
      spans: { start: number; end: number; bold?: boolean; italic?: boolean }[];
    }[] = [];

    for (const block of blocks) {
      const start = fullText.length;
      fullText += block.text + '\n';
      blockMeta.push({ start, end: fullText.length, namedStyle: block.namedStyle, spans: block.spans });
    }

    const requests: object[] = [
      // Insert all text in one shot
      { insertText: { location: { index: insertIndex }, text: fullText } },
    ];

    // Apply paragraph styles for headings, and inline styles for bold/italic
    for (const meta of blockMeta) {
      if (meta.namedStyle !== 'NORMAL_TEXT') {
        requests.push({
          updateParagraphStyle: {
            range: {
              startIndex: insertIndex + meta.start,
              endIndex: insertIndex + meta.end,
            },
            paragraphStyle: { namedStyleType: meta.namedStyle },
            fields: 'namedStyleType',
          },
        });
      }

      for (const span of meta.spans) {
        const textStyle: Record<string, boolean> = {};
        const fields: string[] = [];
        if (span.bold) { textStyle.bold = true; fields.push('bold'); }
        if (span.italic) { textStyle.italic = true; fields.push('italic'); }
        if (fields.length > 0) {
          requests.push({
            updateTextStyle: {
              range: {
                startIndex: insertIndex + meta.start + span.start,
                endIndex: insertIndex + meta.start + span.end,
              },
              textStyle,
              fields: fields.join(','),
            },
          });
        }
      }
    }

    const res = await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ requests }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs append failed (${res.status}): ${err.substring(0, 200)}`);
    }
  }

  // Append text to the end of a document
  async appendText(documentId: string, text: string): Promise<void> {
    const headers = await this.authHeaders();

    // Use endOfSegmentLocation to insert at the end of the document body without
    // needing to fetch the document first to discover its endIndex. This eliminates
    // one round-trip and works correctly for both fresh and existing documents.
    const res = await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              endOfSegmentLocation: {},
              text: text,
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs append failed (${res.status}): ${err}`);
    }
  }

  // Remove all occurrences of a text string from a document
  async deleteContent(documentId: string, textToRemove: string): Promise<{ occurrencesRemoved: number }> {
    const headers = await this.authHeaders();
    const res = await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [{
          replaceAllText: {
            containsText: { text: textToRemove, matchCase: true },
            replaceText: '',
          },
        }],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs delete content failed (${res.status}): ${err.substring(0, 200)}`);
    }
    const data = await res.json() as { replies?: { replaceAllText?: { occurrencesChanged?: number } }[] };
    return { occurrencesRemoved: data.replies?.[0]?.replaceAllText?.occurrencesChanged ?? 0 };
  }

  // Share a document with an email address
  async shareDocument(documentId: string, email: string, role: string = 'writer'): Promise<void> {
    const headers = await this.authHeaders();

    const res = await fetch(`${DRIVE_BASE}/${documentId}/permissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user',
        role,
        emailAddress: email,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Share failed (${res.status}): ${err}`);
    }
  }
}


// ==========================================
// Convenience wrapper for agent tools
// ==========================================

export class GoogleServices {
  public sheets: GoogleSheets;
  public calendar: GoogleCalendar;
  public docs: GoogleDocs;
  private db: D1Database;
  private userId: number;
  private pinHash: string;

  constructor(db: D1Database, userId: number, pinHash: string, clientId: string, clientSecret: string) {
    this.db = db;
    this.userId = userId;
    this.pinHash = pinHash;
    this.sheets = new GoogleSheets(db, userId, pinHash, clientId, clientSecret);
    this.calendar = new GoogleCalendar(db, userId, pinHash, clientId, clientSecret);
    this.docs = new GoogleDocs(db, userId, pinHash, clientId, clientSecret);
  }

  // Check if the user's Google account is connected
  async isConnected(): Promise<{ connected: boolean; email?: string }> {
    return isGoogleConnected(this.db, this.userId, this.pinHash);
  }
}
