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

// === Markdown normalization for ash-doc ===

const UDM_STRUCTURAL_LINE = /^(#{1,6}\s|[-*+]\s|>\s|```|\{\{database:)/;

function isUdmStructuralLine(trimmed: string): boolean {
  return UDM_STRUCTURAL_LINE.test(trimmed);
}

function isUdmParagraphStart(prevLine: string, line: string): boolean {
  const prev = prevLine.trim();
  const next = line.trim();
  return /[.!?:"']$/.test(prev) && /^[A-Z0-9"'(]/.test(next);
}

/** Normalize LLM markdown before sending to ash-doc (paragraph spacing, strip --- dividers). */
export function normalizeUdmMarkdown(markdown: string): string {
  let text = markdown.trim();
  if (!text) return text;

  // Replace standalone horizontal rules used as pseudo-paragraph breaks
  text = text.replace(/\n\s*---+\s*\n/g, '\n\n');
  text = text.replace(/^\s*---+\s*\n/, '');
  text = text.replace(/\n\s*---+\s*$/, '');

  // Collapse excessive blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  // Upgrade single-newline prose when no blank-line paragraphs exist
  if (!/\n\n/.test(text) && /\n/.test(text)) {
    const lines = text.split('\n');
    const blocks: string[] = [];
    let current: string[] = [];

    const flushProse = () => {
      if (current.length) {
        blocks.push(current.join(' '));
        current = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '') {
        flushProse();
      } else if (isUdmStructuralLine(trimmed)) {
        flushProse();
        blocks.push(trimmed);
      } else if (current.length && isUdmParagraphStart(current[current.length - 1], trimmed)) {
        flushProse();
        current.push(trimmed);
      } else {
        current.push(trimmed);
      }
    }
    flushProse();
    text = blocks.join('\n\n');
  }

  return text;
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

  // Guard: if a page with this exact title already exists, update it instead of
  // creating a duplicate. This prevents the "rewrite → create loop" bug where
  // repeated udm_create_page calls for the same title produce duplicate pages.
  const existing = await resolvePageTitle(apiKey, workspaceId, title);
  if (existing && existing.title.toLowerCase() === title.toLowerCase()) {
    if (markdown) {
      const normalized = normalizeUdmMarkdown(markdown);
      const mdRes = await udmFetch(apiKey, `/pages/${existing.id}/markdown`, {
        method: 'PUT',
        body: JSON.stringify({ markdown: normalized }),
      });
      if (!mdRes.ok) {
        return `Page "${existing.title}" already exists but content could not be updated (${mdRes.status}). Use udm_write_page to update it.`;
      }
      return `Page "${existing.title}" already existed — content updated in Unified Docs (use udm_write_page for future rewrites).`;
    }
    return `Page "${existing.title}" already exists in Unified Docs. Use udm_write_page to update its content.`;
  }

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
    const normalized = normalizeUdmMarkdown(markdown);
    const mdRes = await udmFetch(apiKey, `/pages/${pageId}/markdown`, {
      method: 'PUT',
      body: JSON.stringify({ markdown: normalized }),
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
  const normalized = normalizeUdmMarkdown(markdown);
  const res = await udmFetch(apiKey, `/pages/${page.id}/markdown`, {
    method: 'PUT',
    body: JSON.stringify({ markdown: normalized }),
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
  title: string, parentTitle?: string, embedInPageTitle?: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);

  let parentId: string | undefined;
  let embedInPageId: string | undefined;

  if (embedInPageTitle) {
    const embedPage = await resolvePageTitle(apiKey, workspaceId, embedInPageTitle);
    if (!embedPage) return `Could not find page "${embedInPageTitle}" to embed the database into.`;
    if (embedPage.type !== 'page') return `"${embedPage.title}" is a ${embedPage.type} — inline databases can only be embedded in pages, not folders or databases.`;
    embedInPageId = embedPage.id;
  } else if (parentTitle) {
    const parent = await resolvePageTitle(apiKey, workspaceId, parentTitle);
    if (!parent) return `Could not find parent "${parentTitle}" in your workspace.`;
    parentId = parent.id;
  }

  const body: Record<string, unknown> = { title, type: 'database' };
  if (embedInPageId) body.embedInPageId = embedInPageId;
  else if (parentId) body.parentId = parentId;

  const res = await udmFetch(apiKey, `/workspaces/${workspaceId}/pages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to create database: ${err}`);
  }
  if (embedInPageId) return `Database "${title}" created and embedded inline on page "${embedInPageTitle}" in Unified Docs.`;
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
  commentId?: string,
  occurrence?: string | number
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;

  const body: Record<string, unknown> = {
    old_text: oldText,
    new_text: normalizeUdmMarkdown(newText),
  };
  if (commentId) body.comment_id = commentId;
  if (occurrence !== undefined) body.occurrence = occurrence;

  const res = await udmFetch(apiKey, `/pages/${page.id}/edit-section`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return `Could not find the specified text in "${page.title}". Make sure old_text matches exactly (including whitespace). Use udm_read_page to inspect the current content.`;
    }
    if (res.status === 409) {
      const err = await res.json().catch(() => ({ error: 'ambiguous match' })) as { error?: string; match_count?: number };
      const count = err.match_count ?? 'multiple';
      return `Found ${count} matches for the specified text in "${page.title}" — ambiguous. Retry with occurrence: "first" to replace the first match, "all" to replace all, or a number (1, 2, …) to target a specific one.`;
    }
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to edit section: ${err}`);
  }

  const data = await res.json() as { replaced?: number; comment_resolved?: boolean; open_count?: number };
  const parts = [`Section updated in "${page.title}" (${data.replaced ?? 1} replacement).`];
  if (commentId && data.comment_resolved) parts.push(`Comment resolved.`);
  if (data.open_count !== undefined) parts.push(`${data.open_count} agent instruction(s) still open on this page.`);
  return parts.join(' ');
}

interface UDMAgentComment {
  id: string;
  content: string;
  agent_prompt: string;
  selection_quote?: string;
  status: string;
  author_name?: string;
  created_at: number;
}

export async function udmListAgentComments(
  db: D1Database, userId: number, pinHash: string,
  pageTitle: string
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);
  const workspaceId = await getWorkspaceId(apiKey);
  const page = await resolvePageTitle(apiKey, workspaceId, pageTitle);
  if (!page) return `Could not find a page titled "${pageTitle}" in your Unified Docs workspace.`;

  const res = await udmFetch(apiKey, `/pages/${page.id}/agent-comments?status=open`);
  if (!res.ok) throw new Error(`Failed to fetch agent comments (${res.status})`);
  const data = await res.json() as { comments: UDMAgentComment[] };
  if (!data.comments?.length) return `No open agent instructions on "${page.title}".`;

  return data.comments.map((c, i) => {
    const quote = c.selection_quote ? `\nSelected text: "${c.selection_quote}"` : '';
    return `${i + 1}. [id: ${c.id}]${quote}\nInstruction: ${c.agent_prompt}`;
  }).join('\n\n');
}

export async function udmApplyComment(
  db: D1Database, userId: number, pinHash: string,
  commentId: string,
  newText: string,
  oldText?: string,
  occurrence?: string | number
): Promise<string> {
  const apiKey = await getApiKey(db, userId, pinHash);

  const body: Record<string, unknown> = { new_text: normalizeUdmMarkdown(newText) };
  if (oldText !== undefined) body.old_text = oldText;
  if (occurrence !== undefined) body.occurrence = occurrence;

  const res = await udmFetch(apiKey, `/comments/${commentId}/apply`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 404) return `Could not find the highlighted text in the page — it may have changed since the comment was made. Use udm_edit_section with explicit old_text/new_text instead.`;
    if (res.status === 409) {
      const err = await res.json().catch(() => ({ match_count: 'multiple' })) as { match_count?: number | string };
      return `Found ${err.match_count ?? 'multiple'} matches for the highlighted text — ambiguous. Retry with occurrence: "first" or a number.`;
    }
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Failed to apply comment edit: ${err}`);
  }

  const data = await res.json() as { replaced?: number; comment_resolved?: boolean; open_count?: number };
  const parts = [`Comment ${commentId} applied and resolved.`];
  if (data.open_count !== undefined && data.open_count > 0) {
    parts.push(`${data.open_count} agent instruction(s) still open on this page.`);
  } else if (data.open_count === 0) {
    parts.push(`All agent instructions resolved.`);
  }
  return parts.join(' ');
}
