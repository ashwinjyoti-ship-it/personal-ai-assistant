// Unified Doc Management (UDM) API client
// Base URL: https://ash-doc.pages.dev
// Auth: X-API-Key header. Key stored in credentials table as service 'unified-doc-management'.

import { decrypt } from './crypto';

const UDM_BASE_URL = 'https://ash-doc.pages.dev';

export class UDMNotConfiguredError extends Error {
  constructor() {
    super(
      'Unified Docs API key not configured. Go to Settings → API, ' +
      'add a credential with service name "unified-doc-management" and paste your API key from ash-doc.pages.dev/settings.'
    );
    this.name = 'UDMNotConfiguredError';
  }
}

async function getApiKey(db: D1Database, userId: number, pinHash: string): Promise<string> {
  const row = await db
    .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
    .bind(userId, 'unified-doc-management')
    .first<{ encrypted_value: string }>();
  if (!row) throw new UDMNotConfiguredError();
  return decrypt(row.encrypted_value, pinHash);
}

async function udmFetch(apiKey: string, path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${UDM_BASE_URL}/api${path}`;
  const headers: Record<string, string> = {
    'X-API-Key': apiKey,
    ...(options.headers as Record<string, string> | undefined),
  };
  if (options.body) headers['Content-Type'] = 'application/json';
  return fetch(url, { ...options, headers });
}

async function getWorkspaceId(apiKey: string): Promise<string> {
  const res = await udmFetch(apiKey, '/workspaces');
  if (!res.ok) throw new Error(`UDM workspace lookup failed (${res.status})`);
  const data = await res.json() as { workspaces: { id: string }[] };
  const ws = data.workspaces?.[0];
  if (!ws) throw new Error('No workspaces found for this API key.');
  return ws.id;
}

interface UDMPage { id: string; title: string; type: string }

async function resolvePageTitle(
  apiKey: string,
  workspaceId: string,
  title: string
): Promise<UDMPage | null> {
  // Try search first (fastest)
  const searchRes = await udmFetch(apiKey, `/search?q=${encodeURIComponent(title)}`);
  if (searchRes.ok) {
    const data = await searchRes.json() as { results: { id: string; title: string; type: string }[] };
    const exact = (data.results || []).find(r => r.title.toLowerCase() === title.toLowerCase());
    if (exact) return exact;
    // Partial match from search
    const partial = (data.results || []).find(r =>
      r.title.toLowerCase().includes(title.toLowerCase()) ||
      title.toLowerCase().includes(r.title.toLowerCase())
    );
    if (partial) return partial;
  }

  // Fall back to listing all pages
  const listRes = await udmFetch(apiKey, `/workspaces/${workspaceId}/pages`);
  if (!listRes.ok) return null;
  const listData = await listRes.json() as { pages: UDMPage[] };
  return (listData.pages || []).find(p =>
    p.title.toLowerCase() === title.toLowerCase() ||
    p.title.toLowerCase().includes(title.toLowerCase())
  ) ?? null;
}

// === Exported tool functions ===

export async function udmListPages(
  db: D1Database, userId: number, pinHash: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const res = await udmFetch(apiKey, `/workspaces/${workspaceId}/pages`);
  if (!res.ok) throw new Error(`Failed to list pages (${res.status})`);
  const data = await res.json() as { pages: UDMPage[] };
  if (!data.pages?.length) return 'No pages found in your Unified Docs workspace.';
  const grouped = { page: [] as string[], folder: [] as string[], database: [] as string[] };
  for (const p of data.pages) {
    const key = p.type as keyof typeof grouped;
    if (grouped[key]) grouped[key].push(p.title);
    else grouped.page.push(p.title);
  }
  const lines: string[] = [];
  if (grouped.folder.length) lines.push(`**Folders:** ${grouped.folder.join(', ')}`);
  if (grouped.database.length) lines.push(`**Databases:** ${grouped.database.join(', ')}`);
  if (grouped.page.length) lines.push(`**Pages:** ${grouped.page.join(', ')}`);
  return lines.join('\n');
}

export async function udmCreatePage(
  db: D1Database, userId: number, pinHash: string,
  title: string, markdown?: string, parentTitle?: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);

  let parentId: string | undefined;
  if (parentTitle) {
    const parent = await resolvePageTitle(apiKey, workspaceId, parentTitle);
    if (!parent) return `Could not find parent page "${parentTitle}" in your workspace.`;
    parentId = parent.id;
  }

  const createRes = await udmFetch(apiKey, `/workspaces/${workspaceId}/pages`, {
    method: 'POST',
    body: JSON.stringify({ title, type: 'page', ...(parentId ? { parentId } : {}) }),
  });
  if (!createRes.ok) {
    const err = await createRes.text().catch(() => String(createRes.status));
    throw new Error(`Failed to create page: ${err}`);
  }
  const created = await createRes.json() as { page: { id: string; title: string } };
  const pageId = created.page.id;

  if (markdown) {
    const mdRes = await udmFetch(apiKey, `/pages/${pageId}/markdown`, {
      method: 'PUT',
      body: JSON.stringify({ markdown }),
    });
    if (!mdRes.ok) {
      return `Page "${title}" was created but content could not be saved (${mdRes.status}). Open it on ash-doc.pages.dev to add content manually.`;
    }
  }

  return `Page "${title}" created successfully in Unified Docs.`;
}

export async function udmReadPage(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;
  const res = await udmFetch(apiKey, `/pages/${page.id}/markdown`);
  if (!res.ok) throw new Error(`Failed to read page (${res.status})`);
  const data = await res.json() as { markdown?: string; title: string };
  return data.markdown || '(Page is empty)';
}

export async function udmWritePage(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string, markdown: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;
  const res = await udmFetch(apiKey, `/pages/${page.id}/markdown`, {
    method: 'PUT',
    body: JSON.stringify({ markdown }),
  });
  if (!res.ok) throw new Error(`Failed to update page (${res.status})`);
  return `Page "${page.title}" updated in Unified Docs.`;
}

export async function udmSearchPages(
  db: D1Database, userId: number, pinHash: string,
  query: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const res = await udmFetch(apiKey, `/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data = await res.json() as { results: { id: string; title: string; type: string; snippet?: string }[] };
  if (!data.results?.length) return `No results found for "${query}" in Unified Docs.`;
  return data.results
    .map(r => {
      const snippet = r.snippet?.replace(/<\/?mark>/g, '').replace(/\s+/g, ' ').trim();
      return `- **${r.title}** (${r.type})${snippet ? `: ${snippet}` : ''}`;
    })
    .join('\n');
}

export async function udmDeletePage(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;
  const res = await udmFetch(apiKey, `/pages/${page.id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete page (${res.status})`);
  return `Page "${page.title}" deleted from Unified Docs.`;
}

interface UDMComment { id: string; content: string; author_name?: string; created_at: number }

export async function udmListComments(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;
  const res = await udmFetch(apiKey, `/pages/${page.id}/comments`);
  if (!res.ok) throw new Error(`Failed to fetch comments (${res.status})`);
  const data = await res.json() as { comments: UDMComment[] };
  if (!data.comments?.length) return `No comments on "${page.title}".`;
  return data.comments
    .map(c => {
      const date = new Date(c.created_at * 1000).toISOString().slice(0, 10);
      const author = c.author_name ? ` — ${c.author_name}` : '';
      return `[id: ${c.id}, ${date}${author}]: ${c.content}`;
    })
    .join('\n');
}

export async function udmAddComment(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string, content: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;
  const res = await udmFetch(apiKey, `/pages/${page.id}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error(`Failed to add comment (${res.status})`);
  return `Comment added to "${page.title}" in Unified Docs.`;
}

// === Phase 2: Database tools ===

interface UDMDBProperty { id: string; name: string; type: string; options: string }
interface UDMDBRow { id: string; properties: string; page_title?: string; created_at: number; updated_at: number }
interface UDMDBData { properties: UDMDBProperty[]; rows: UDMDBRow[] }

async function getDatabaseData(apiKey: string, pageId: string): Promise<UDMDBData> {
  const res = await udmFetch(apiKey, `/pages/${pageId}/database`);
  if (!res.ok) throw new Error(`Failed to fetch database (${res.status})`);
  return await res.json() as UDMDBData;
}

function buildPropNameMap(properties: UDMDBProperty[]): Map<string, UDMDBProperty> {
  const map = new Map<string, UDMDBProperty>();
  for (const p of properties) map.set(p.name.toLowerCase(), p);
  return map;
}

function resolvePropertyValues(
  userProps: Record<string, unknown>,
  propMap: Map<string, UDMDBProperty>
): { resolved: Record<string, unknown>; errors: string[] } {
  const resolved: Record<string, unknown> = {};
  const errors: string[] = [];
  for (const [name, value] of Object.entries(userProps)) {
    const prop = propMap.get(name.toLowerCase());
    if (!prop) { errors.push(`Unknown column "${name}"`); continue; }
    if (prop.type === 'rollup' || prop.type === 'relation') {
      errors.push(`Column "${name}" (${prop.type}) cannot be set directly`); continue;
    }
    if (prop.type === 'select' && typeof value === 'string') {
      try {
        const opts = JSON.parse(prop.options) as string[];
        if (opts.length && !opts.some(o => o.toLowerCase() === (value as string).toLowerCase())) {
          errors.push(`"${value}" is not a valid option for "${name}". Valid: ${opts.join(', ')}`); continue;
        }
      } catch { /* options not parseable, skip validation */ }
    }
    if (prop.type === 'multi_select' && Array.isArray(value)) {
      try {
        const opts = JSON.parse(prop.options) as string[];
        const bad = (value as string[]).filter(v => opts.length && !opts.some(o => o.toLowerCase() === v.toLowerCase()));
        if (bad.length) { errors.push(`Invalid option(s) "${bad.join(', ')}" for "${name}". Valid: ${opts.join(', ')}`); continue; }
      } catch { /* skip validation */ }
    }
    resolved[prop.id] = value;
  }
  return { resolved, errors };
}

export async function udmCreateDatabase(
  db: D1Database, userId: number, pinHash: string,
  title: string, parentTitle?: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  let parentId: string | undefined;
  if (parentTitle) {
    const parent = await resolvePageTitle(apiKey, workspaceId, parentTitle);
    if (!parent) return `Could not find parent "${parentTitle}" in your workspace.`;
    parentId = parent.id;
  }
  const res = await udmFetch(apiKey, `/workspaces/${workspaceId}/pages`, {
    method: 'POST',
    body: JSON.stringify({ title, type: 'database', ...(parentId ? { parentId } : {}) }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to create database: ${err}`);
  }
  return `Database "${title}" created in Unified Docs.`;
}

export async function udmReadDatabase(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a database titled "${pageTitle}" in your Unified Docs workspace.`;
  if (page.type !== 'database') return `"${page.title}" is a ${page.type}, not a database.`;

  const { properties, rows } = await getDatabaseData(apiKey, page.id);
  if (!properties?.length) return `Database "${page.title}" has no columns defined yet.`;

  const colLines = properties
    .filter(p => p.type !== 'rollup')
    .map(p => {
      let opts = '';
      try {
        const parsed = JSON.parse(p.options) as string[];
        if (Array.isArray(parsed) && parsed.length) opts = `: ${parsed.join(', ')}`;
      } catch { /* not an options array */ }
      return `- ${p.name} (${p.type})${opts}`;
    });

  const rowLines = (rows || []).map((row, i) => {
    let rowProps: Record<string, unknown> = {};
    try { rowProps = JSON.parse(row.properties); } catch { /* ignore */ }
    const cells: string[] = [];
    if (row.page_title) cells.push(`Name: ${row.page_title}`);
    for (const p of properties) {
      if (p.type === 'rollup') continue;
      const v = rowProps[p.id];
      if (v === undefined || v === null || v === '') continue;
      const display = Array.isArray(v) ? (v as unknown[]).join(', ') : String(v);
      cells.push(`${p.name}: ${display}`);
    }
    return `${i + 1}. [id: ${row.id}] ${cells.join(' | ')}`;
  });

  return [
    `## Database: ${page.title} (${rows?.length ?? 0} rows)`,
    '',
    'Columns:',
    ...colLines,
    '',
    ...(rows?.length ? ['Rows:', ...rowLines] : ['(No rows yet)']),
  ].join('\n');
}

export async function udmAddRow(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string,
  properties: Record<string, unknown>,
  title?: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a database titled "${pageTitle}" in your Unified Docs workspace.`;

  const schema = await getDatabaseData(apiKey, page.id);
  const propMap = buildPropNameMap(schema.properties);
  const { resolved, errors } = resolvePropertyValues(properties, propMap);
  if (errors.length) return `Cannot add row: ${errors.join('; ')}`;

  const body: Record<string, unknown> = { properties: resolved };
  if (title) body.title = title;

  const res = await udmFetch(apiKey, `/pages/${page.id}/database/rows`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to add row: ${err}`);
  }
  return `Row added to database "${page.title}".`;
}

export async function udmUpdateRow(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string,
  rowId: string,
  properties: Record<string, unknown>
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a database titled "${pageTitle}" in your Unified Docs workspace.`;

  const schema = await getDatabaseData(apiKey, page.id);
  const propMap = buildPropNameMap(schema.properties);
  const { resolved, errors } = resolvePropertyValues(properties, propMap);
  if (errors.length) return `Cannot update row: ${errors.join('; ')}`;

  const res = await udmFetch(apiKey, `/pages/${page.id}/database/rows/${rowId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties: resolved }),
  });
  if (!res.ok) throw new Error(`Failed to update row (${res.status})`);
  return `Row updated in database "${page.title}".`;
}

export async function udmDeleteRow(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string,
  rowId: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a database titled "${pageTitle}" in your Unified Docs workspace.`;

  const res = await udmFetch(apiKey, `/pages/${page.id}/database/rows/${rowId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete row (${res.status})`);
  return `Row deleted from database "${page.title}".`;
}

export async function udmAddProperty(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string,
  name: string,
  type: string,
  options?: unknown
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a database titled "${pageTitle}" in your Unified Docs workspace.`;

  const validTypes = ['text', 'number', 'date', 'select', 'multi_select', 'checkbox'];
  if (!validTypes.includes(type)) {
    return `Invalid column type "${type}". Valid types: ${validTypes.join(', ')}.`;
  }

  // Accept comma-separated string for select/multi_select options
  let normalizedOptions: unknown = options;
  if (typeof options === 'string' && (type === 'select' || type === 'multi_select')) {
    normalizedOptions = options.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  const body: Record<string, unknown> = { name, type };
  if (normalizedOptions !== undefined) body.options = normalizedOptions;

  const res = await udmFetch(apiKey, `/pages/${page.id}/database/properties`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to add column: ${err}`);
  }
  return `Column "${name}" (${type}) added to database "${page.title}".`;
}

export async function udmReadPageWithComments(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;

  const [mdRes, commentsRes] = await Promise.all([
    udmFetch(apiKey, `/pages/${page.id}/markdown`),
    udmFetch(apiKey, `/pages/${page.id}/comments`),
  ]);

  const mdData = mdRes.ok
    ? await mdRes.json() as { markdown?: string }
    : { markdown: '(could not read page content)' };

  const commentsData = commentsRes.ok
    ? await commentsRes.json() as { comments: UDMComment[] }
    : { comments: [] as UDMComment[] };

  const markdown = mdData.markdown || '(empty)';
  const commentLines = (commentsData.comments || []).map(c => {
    const date = new Date(c.created_at * 1000).toISOString().slice(0, 10);
    const author = c.author_name ? ` — ${c.author_name}` : '';
    return `[id: ${c.id}, ${date}${author}]: ${c.content}`;
  });

  if (!commentLines.length) {
    return `## Page: ${page.title}\n\n${markdown}\n\n---\n(No comments on this page)`;
  }

  return `## Page: ${page.title}\n\n${markdown}\n\n---\n## Comments (${commentLines.length})\n\n${commentLines.join('\n')}`;
}

export async function udmResolveComment(
  db: D1Database, userId: number, pinHash: string,
  commentId: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const res = await udmFetch(apiKey, `/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'resolved' }),
  });
  if (!res.ok) throw new Error(`Failed to resolve comment (${res.status})`);
  return `Comment ${commentId} marked as resolved.`;
}

export async function udmEditSection(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string,
  oldText: string,
  newText: string,
  commentId?: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;

  const mdRes = await udmFetch(apiKey, `/pages/${page.id}/markdown`);
  if (!mdRes.ok) throw new Error(`Failed to read page (${mdRes.status})`);
  const mdData = await mdRes.json() as { markdown?: string };
  const current = mdData.markdown || '';

  if (!current.includes(oldText)) {
    return `Could not find the specified text in "${page.title}". Make sure old_text matches exactly (including whitespace). Use udm_read_page to inspect the current content.`;
  }

  const updated = current.replace(oldText, newText);
  const writeRes = await udmFetch(apiKey, `/pages/${page.id}/markdown`, {
    method: 'PUT',
    body: JSON.stringify({ markdown: updated }),
  });
  if (!writeRes.ok) throw new Error(`Failed to update page (${writeRes.status})`);

  const messages = [`Section updated in "${page.title}".`];

  if (commentId) {
    const resolveRes = await udmFetch(apiKey, `/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'resolved' }),
    });
    if (resolveRes.ok) {
      messages.push(`Comment ${commentId} marked as resolved.`);
    } else {
      messages.push(`Note: edit saved but could not resolve comment ${commentId} (${resolveRes.status}).`);
    }
  }

  return messages.join(' ');
}
