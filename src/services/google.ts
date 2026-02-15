// Google Services — Phase 2
// Pure Web Crypto JWT auth for Cloudflare Workers (no Node.js dependencies)
// Service account → JWT → access token → REST API calls
//
// Supports: Sheets v4, Calendar v3, Docs v1, Drive v3

import { decrypt } from './crypto';
import { logError } from './llm/provider';

// ==========================================
// Google Auth — JWT RS256 via Web Crypto API
// ==========================================

interface ServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

interface AccessToken {
  access_token: string;
  expires_at: number; // unix timestamp
}

// In-memory token cache (per-isolate, auto-clears on cold start)
let tokenCache: { token: AccessToken; scopes: string } | null = null;

// Base64url encode (no padding, URL-safe)
function base64url(input: string | ArrayBuffer): string {
  let base64: string;
  if (typeof input === 'string') {
    base64 = btoa(input);
  } else {
    const bytes = new Uint8Array(input);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(binary);
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Parse PEM private key → CryptoKey
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '')
    .replace(/\r/g, '');

  // Decode base64 to binary
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    'pkcs8',
    bytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

// Sign JWT with RS256
async function signJWT(serviceAccount: ServiceAccountKey, scopes: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // 1 hour

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: scopes,
    aud: serviceAccount.token_uri,
    exp,
    iat: now,
  }));

  const unsignedToken = `${header}.${claims}`;
  const key = await importPrivateKey(serviceAccount.private_key);
  const signatureBuffer = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    new TextEncoder().encode(unsignedToken)
  );

  const signature = base64url(signatureBuffer);
  return `${unsignedToken}.${signature}`;
}

// Exchange JWT for access token
async function getAccessToken(serviceAccount: ServiceAccountKey, scopes: string): Promise<string> {
  // Check cache
  if (tokenCache && tokenCache.scopes === scopes && tokenCache.token.expires_at > Date.now() / 1000 + 60) {
    return tokenCache.token.access_token;
  }

  const jwt = await signJWT(serviceAccount, scopes);

  const res = await fetch(serviceAccount.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const responseText = await res.text();

  if (!res.ok) {
    throw new Error(`Google OAuth token exchange failed (${res.status}): ${responseText}`);
  }

  let data: any;
  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(`Google OAuth returned non-JSON: ${responseText.substring(0, 200)}`);
  }

  if (!data.access_token) {
    throw new Error(`Google OAuth response missing access_token: ${JSON.stringify(data).substring(0, 200)}`);
  }

  const token: AccessToken = {
    access_token: data.access_token,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
  };

  tokenCache = { token, scopes };
  return token.access_token;
}

// Google API scopes
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
].join(' ');

// Helper: get the parent folder for file creation
// Service accounts on personal Google accounts have zero Drive quota,
// so we must create files inside a folder shared by the user.
// The folder ID is stored in the user's memory as a 'preference'.
async function getParentFolder(db: D1Database, userId: number): Promise<string | undefined> {
  const mem = await db.prepare(
    "SELECT content FROM memory WHERE user_id = ? AND title = 'google_drive_folder_id' LIMIT 1"
  ).bind(userId).first<{ content: string }>();
  return mem?.content || undefined;
}

// Helper: get auth header from encrypted credential
async function getGoogleAuth(db: D1Database, userId: number, pinHash: string): Promise<{ token: string; email: string }> {
  const cred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(userId, 'google_service_account').first<{ encrypted_value: string }>();

  if (!cred) throw new Error('Google service account not configured. Add it in Settings → Keys.');

  const decrypted = await decrypt(cred.encrypted_value, pinHash);
  const serviceAccount: ServiceAccountKey = JSON.parse(decrypted);

  if (!serviceAccount.private_key || !serviceAccount.client_email) {
    throw new Error('Invalid service account JSON. Ensure it contains private_key and client_email.');
  }

  const token = await getAccessToken(serviceAccount, SCOPES);
  return { token, email: serviceAccount.client_email };
}

// Validate service account by attempting token exchange
export async function validateGoogleServiceAccount(jsonString: string): Promise<{ valid: boolean; message: string; email?: string }> {
  try {
    const sa: ServiceAccountKey = JSON.parse(jsonString);
    if (!sa.private_key || !sa.client_email || !sa.token_uri) {
      return { valid: false, message: 'Missing required fields: private_key, client_email, or token_uri.' };
    }

    const token = await getAccessToken(sa, 'https://www.googleapis.com/auth/spreadsheets.readonly');
    if (token) {
      return { valid: true, message: `Service account verified: ${sa.client_email}`, email: sa.client_email };
    }
    return { valid: false, message: 'Token exchange returned empty.' };
  } catch (err: any) {
    return { valid: false, message: `Validation failed: ${err.message}` };
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
    private pinHash: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash);
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

  // Create a new spreadsheet
  // Uses Drive API to create (avoids service account storage quota issue),
  // then Sheets API to add tabs if needed
  async createSpreadsheet(title: string, sheetNames?: string[], parentFolderId?: string): Promise<{ spreadsheetId: string; url: string }> {
    const headers = await this.authHeaders();

    // Step 1: Create via Drive API (works even when Sheets API has quota issues)
    const driveBody: Record<string, unknown> = {
      name: title,
      mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    if (parentFolderId) {
      driveBody.parents = [parentFolderId];
    }

    const driveRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers,
      body: JSON.stringify(driveBody),
    });

    if (!driveRes.ok) {
      const err = await driveRes.text();
      throw new Error(`Spreadsheet creation failed (${driveRes.status}): ${err}`);
    }

    const driveData = await driveRes.json() as { id: string };
    const spreadsheetId = driveData.id;

    // Step 2: If custom tab names requested, rename/add via Sheets API
    if (sheetNames && sheetNames.length > 0) {
      try {
        // Get existing sheet info
        const metaRes = await fetch(`${SHEETS_BASE}/${spreadsheetId}?fields=sheets.properties`, { headers });
        if (metaRes.ok) {
          const metaData = await metaRes.json() as { sheets: { properties: { sheetId: number; title: string } }[] };
          const existingSheetId = metaData.sheets[0]?.properties.sheetId;

          const requests: Record<string, unknown>[] = [];

          // Rename first sheet
          if (existingSheetId !== undefined && sheetNames[0]) {
            requests.push({
              updateSheetProperties: {
                properties: { sheetId: existingSheetId, title: sheetNames[0] },
                fields: 'title',
              },
            });
          }

          // Add remaining sheets
          for (let i = 1; i < sheetNames.length; i++) {
            requests.push({
              addSheet: { properties: { title: sheetNames[i] } },
            });
          }

          if (requests.length > 0) {
            await fetch(`${SHEETS_BASE}/${spreadsheetId}:batchUpdate`, {
              method: 'POST',
              headers,
              body: JSON.stringify({ requests }),
            });
          }
        }
      } catch {
        // Tab creation is best-effort — the spreadsheet itself was created
      }
    }

    return {
      spreadsheetId,
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
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
    private pinHash: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // List events for a calendar (default: primary / service account calendar)
  // For shared calendars, calendarId = the calendar's email address
  async listEvents(
    calendarId: string = 'primary',
    options: {
      timeMin?: string; // ISO date
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
      startDateTime: string; // ISO format
      endDateTime: string;
      timeZone?: string;
      attendees?: string[]; // email addresses
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

  // List calendars accessible to the service account
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
    private pinHash: string
  ) {}

  private async authHeaders(): Promise<Record<string, string>> {
    const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Create a new document (via Drive API to avoid service account quota issue)
  async createDocument(title: string, parentFolderId?: string): Promise<{ documentId: string; url: string }> {
    const headers = await this.authHeaders();

    const driveBody: Record<string, unknown> = {
      name: title,
      mimeType: 'application/vnd.google-apps.document',
    };
    if (parentFolderId) {
      driveBody.parents = [parentFolderId];
    }

    const res = await fetch(DRIVE_BASE, {
      method: 'POST',
      headers,
      body: JSON.stringify(driveBody),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Docs create failed (${res.status}): ${err}`);
    }

    const data = await res.json() as { id: string };
    return {
      documentId: data.id,
      url: `https://docs.google.com/document/d/${data.id}/edit`,
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

    // Extract plain text from document structure
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

    // First get the document to find the end index
    const docRes = await fetch(`${DOCS_BASE}/${documentId}`, { headers });
    if (!docRes.ok) {
      const err = await docRes.text();
      throw new Error(`Docs read for append failed (${docRes.status}): ${err}`);
    }

    const doc = await docRes.json() as { body: { content: { endIndex: number }[] } };
    const endIndex = doc.body.content[doc.body.content.length - 1].endIndex - 1;

    // Insert text at the end
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

  constructor(db: D1Database, userId: number, pinHash: string) {
    this.db = db;
    this.userId = userId;
    this.sheets = new GoogleSheets(db, userId, pinHash);
    this.calendar = new GoogleCalendar(db, userId, pinHash);
    this.docs = new GoogleDocs(db, userId, pinHash);
  }

  // Get stored parent folder ID (for creating files in shared folder)
  async getParentFolderId(): Promise<string | undefined> {
    return getParentFolder(this.db, this.userId);
  }

  // Validate that the service account can access a given folder
  async validateFolderAccess(folderId: string): Promise<{ accessible: boolean; error?: string }> {
    try {
      const { token } = await getGoogleAuth(this.db, this.userId, this.pinHash);
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${encodeURIComponent(folderId)}'+in+parents&pageSize=1`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (res.ok) return { accessible: true };
      const errText = await res.text();
      return { accessible: false, error: errText.substring(0, 200) };
    } catch (err: any) {
      return { accessible: false, error: err.message };
    }
  }
}
