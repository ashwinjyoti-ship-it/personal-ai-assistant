// Memory embedding service — uses Cloudflare Workers AI REST API (from Render).
// Does NOT use the Workers AI binding (env.AI), which is Cloudflare-side only.
// Falls back gracefully (returns null) when CF credentials are not configured.
//
// Deviation from the original handoff (@xenova/transformers): the CF proxy in
// this environment blocks HuggingFace model downloads, so we call the CF Workers
// AI REST API directly instead — same model family, no local binary dependency.

const CF_AI_MODEL = '@cf/baai/bge-small-en-v1.5';
export const EMBEDDING_DIM = 384;

function getCfConfig(): { accountId: string; apiToken: string } | null {
  const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID ?? '').trim();
  const apiToken = (process.env.CLOUDFLARE_D1_API_TOKEN ?? '').trim();
  if (!accountId || !apiToken) return null;
  return { accountId, apiToken };
}

async function cfAiRun(texts: string[]): Promise<number[][]> {
  const cfg = getCfConfig();
  if (!cfg) throw new Error('CF credentials not configured (CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_API_TOKEN)');

  const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/ai/run/${CF_AI_MODEL}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: texts }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`CF Workers AI error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { result: { data: number[][] }; success: boolean };
  if (!data.success || !data.result?.data) {
    throw new Error('CF Workers AI returned unexpected response shape');
  }
  return data.result.data;
}

/** Embed a single string. Returns null when CF credentials are absent. */
export async function embed(text: string): Promise<number[] | null> {
  if (!getCfConfig()) return null;
  const [vec] = await cfAiRun([text]);
  return vec;
}

/** Embed multiple strings in one API call. Returns null per entry when unavailable. */
export async function embedBatch(texts: string[]): Promise<(number[] | null)[]> {
  if (texts.length === 0) return [];
  if (!getCfConfig()) return texts.map(() => null);
  return cfAiRun(texts);
}

/** Cosine similarity between two vectors. Works for normalized or un-normalized. */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function serializeEmbedding(emb: number[]): string {
  return JSON.stringify(emb);
}

export function deserializeEmbedding(s: string | null | undefined): number[] | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as number[];
  } catch {
    return null;
  }
}
