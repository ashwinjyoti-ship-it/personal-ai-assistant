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

// Scopes: full access to Sheets, Calendar, Docs, Drive
const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
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

  // Append text to the end of a document
  async appendText(documentId: string, text: string): Promise<void> {
    const headers = await this.authHeaders();

    const docRes = await fetch(`${DOCS_BASE}/${documentId}`, { headers });
    if (!docRes.ok) {
      const err = await docRes.text();
      throw new Error(`Docs read for append failed (${docRes.status}): ${err}`);
    }

    const doc = await docRes.json() as { body: { content: { endIndex: number }[] } };
    const endIndex = doc.body.content[doc.body.content.length - 1].endIndex - 1;

    const res = await fetch(`${DOCS_BASE}/${documentId}:batchUpdate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: endIndex },
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
