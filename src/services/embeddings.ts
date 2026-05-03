// Chunking, embedding generation, and semantic search utilities.
// Used by both the documents route and the agent's search_library tool.

export type EmbeddingEnv = {
  DB: D1Database;
  AI?: Ai;
  VECTORIZE?: VectorizeIndex;
};

// Split text into overlapping ~1800-char chunks at paragraph/sentence boundaries.
export function chunkText(text: string): string[] {
  const TARGET = 1800;
  const OVERLAP = 200;
  const MIN_CHUNK = 100;

  if (text.length < MIN_CHUNK) return text.trim() ? [text.trim()] : [];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + TARGET, text.length);

    if (end < text.length) {
      // Prefer to break at a paragraph boundary
      const paraBreak = text.lastIndexOf('\n\n', end);
      if (paraBreak > start + TARGET / 2) {
        end = paraBreak + 2;
      } else {
        // Fall back to sentence boundary
        const sentBreak = text.lastIndexOf('. ', end);
        if (sentBreak > start + TARGET / 2) {
          end = sentBreak + 2;
        }
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length >= MIN_CHUNK) {
      chunks.push(chunk);
    }

    // Advance with overlap so context at boundaries is preserved
    start = end - OVERLAP;
    if (start <= 0) start = end;
  }

  return chunks;
}

// Generate embeddings for all document chunks and store them in Vectorize + D1.
// Silently no-ops if AI or VECTORIZE bindings are absent.
export async function indexDocumentChunks(
  env: EmbeddingEnv,
  userId: number,
  documentId: number,
  text: string
): Promise<void> {
  if (!env.AI || !env.VECTORIZE) return;

  const chunks = chunkText(text);
  if (chunks.length === 0) return;

  // Remove stale chunks for this document before re-indexing
  const old = await env.DB.prepare(
    'SELECT vector_id FROM document_chunks WHERE document_id = ?'
  ).bind(documentId).all<{ vector_id: string }>();

  if (old.results.length > 0) {
    await env.VECTORIZE.deleteByIds(old.results.map(r => r.vector_id));
    await env.DB.prepare('DELETE FROM document_chunks WHERE document_id = ?')
      .bind(documentId).run();
  }

  // Batch-generate all embeddings in a single AI call
  const embResult = await (env.AI as any).run('@cf/baai/bge-large-en-v1.5', { text: chunks });
  const embeddings: number[][] = embResult.data;

  const vectorIds = chunks.map((_, i) => `doc_${documentId}_${i}`);

  // Insert into Vectorize with user/document metadata for filtered queries
  await env.VECTORIZE.insert(
    chunks.map((_, i) => ({
      id: vectorIds[i],
      values: embeddings[i],
      metadata: { userId: String(userId), documentId: String(documentId) },
    }))
  );

  // Persist chunk text and vector IDs in D1 for retrieval
  const stmt = env.DB.prepare(
    'INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)'
  );
  await env.DB.batch(
    chunks.map((chunk, i) => stmt.bind(userId, documentId, i, chunk, vectorIds[i]))
  );
}

export type SemanticSearchResult = {
  filename: string;
  relevance_score: number;
  chunk: string;
  document_id: number;
};

// Embed the query, search Vectorize (filtered by userId), then hydrate with chunk text.
export async function semanticDocumentSearch(
  env: EmbeddingEnv,
  userId: number,
  query: string,
  limit = 5
): Promise<SemanticSearchResult[]> {
  if (!env.AI || !env.VECTORIZE) return [];

  const embResult = await (env.AI as any).run('@cf/baai/bge-large-en-v1.5', { text: [query] });
  const queryVector: number[] = embResult.data[0];

  // Fetch extra candidates so we still hit `limit` after D1 join filtering
  const matches = await env.VECTORIZE.query(queryVector, {
    topK: limit * 3,
    filter: { userId: String(userId) },
  });

  if (!matches.matches || matches.matches.length === 0) return [];

  const vectorIds = matches.matches.map((m: any) => m.id);
  const scoreMap = new Map<string, number>(matches.matches.map((m: any) => [m.id, m.score]));

  const placeholders = vectorIds.map(() => '?').join(',');
  const rows = await env.DB.prepare(
    `SELECT dc.text, dc.vector_id, dc.document_id, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.vector_id IN (${placeholders}) AND dc.user_id = ?`
  ).bind(...vectorIds, userId).all<{ text: string; vector_id: string; document_id: number; name: string }>();

  return (rows.results || [])
    .map(r => ({
      filename: r.name,
      relevance_score: scoreMap.get(r.vector_id) ?? 0,
      chunk: r.text,
      document_id: r.document_id,
    }))
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
}
