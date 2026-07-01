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

// Chunks a document and persists the chunks in D1 for keyword search on every
// runtime. When AI + VECTORIZE bindings are available (Cloudflare Workers),
// also generates embeddings and indexes them in Vectorize for semantic search.
// On runtimes without those bindings (e.g. the Render native-mode worker),
// chunks are still stored with a synthetic vector_id so keyword search over
// document_chunks keeps working — only the embedding step is skipped.
export async function indexDocumentChunks(
  env: EmbeddingEnv,
  userId: number,
  documentId: number,
  text: string
): Promise<void> {
  const chunks = chunkText(text);
  if (chunks.length === 0) return;

  const canEmbed = !!(env.AI && env.VECTORIZE);

  // Remove stale chunks for this document before re-indexing
  const old = await env.DB.prepare(
    'SELECT vector_id FROM document_chunks WHERE document_id = ?'
  ).bind(documentId).all<{ vector_id: string }>();

  if (old.results.length > 0) {
    if (canEmbed) {
      await env.VECTORIZE!.deleteByIds(old.results.map(r => r.vector_id));
    }
    await env.DB.prepare('DELETE FROM document_chunks WHERE document_id = ?')
      .bind(documentId).run();
  }

  const vectorIds = chunks.map((_, i) => `doc_${documentId}_${i}`);

  if (canEmbed) {
    // Batch-generate all embeddings in a single AI call
    const embResult = await (env.AI as any).run('@cf/baai/bge-large-en-v1.5', { text: chunks });
    const embeddings: number[][] = embResult.data;

    // Insert into Vectorize with user/document metadata for filtered queries
    await env.VECTORIZE!.insert(
      chunks.map((_, i) => ({
        id: vectorIds[i],
        values: embeddings[i],
        metadata: { userId: String(userId), documentId: String(documentId) },
      }))
    );
  }

  // Persist chunk text and vector IDs in D1 for retrieval (keyword search
  // works off this table alone; vector_id is a no-op placeholder when canEmbed is false)
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
  chunk_index: number;
  retrieval_method: "vector" | "keyword" | "hybrid";
};

// Embed the query, search Vectorize + keyword matches, then merge and rank.
// When AI/VECTORIZE aren't available on this runtime (e.g. Render), falls
// back to keyword-only search instead of returning no results.
export async function semanticDocumentSearch(
  env: EmbeddingEnv,
  userId: number,
  query: string,
  limit = 5
): Promise<SemanticSearchResult[]> {
  const canEmbed = !!(env.AI && env.VECTORIZE);
  let vectorResults: SemanticSearchResult[] = [];

  if (canEmbed) {
    const embResult = await (env.AI as any).run('@cf/baai/bge-large-en-v1.5', { text: [query] });
    const queryVector: number[] = embResult.data[0];

    // Fetch extra candidates so we still hit `limit` after D1 join filtering
    const matches = await env.VECTORIZE!.query(queryVector, {
      topK: limit * 3,
      filter: { userId: String(userId) },
    });

    if (matches.matches && matches.matches.length > 0) {
      const vectorIds = matches.matches.map((m: any) => m.id);
      const scoreMap = new Map<string, number>(matches.matches.map((m: any) => [m.id, m.score]));

      const placeholders = vectorIds.map(() => '?').join(',');
      const rows = await env.DB.prepare(
        `SELECT dc.text, dc.vector_id, dc.document_id, dl.name, dc.chunk_index
         FROM document_chunks dc
         JOIN document_library dl ON dc.document_id = dl.id
         WHERE dc.vector_id IN (${placeholders}) AND dc.user_id = ?`
      ).bind(...vectorIds, userId).all<{ text: string; vector_id: string; document_id: number; name: string; chunk_index: number }>();

      vectorResults = (rows.results || []).map(r => ({
        filename: r.name,
        relevance_score: scoreMap.get(r.vector_id) ?? 0,
        chunk: r.text,
        document_id: r.document_id,
        chunk_index: r.chunk_index,
        retrieval_method: 'vector' as const,
      }));
    }
  }

  const keywordRows = await env.DB.prepare(
    `SELECT dc.text, dc.document_id, dc.chunk_index, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.user_id = ? AND dc.text LIKE ?
     ORDER BY dc.chunk_index DESC
     LIMIT ?`
  ).bind(userId, `%${query.substring(0, 80)}%`, limit * 2).all<{ text: string; document_id: number; chunk_index: number; name: string }>();

  const keywordResults = (keywordRows.results || []).map(r => ({
    filename: r.name,
    relevance_score: 0.55,
    chunk: r.text,
    document_id: r.document_id,
    chunk_index: r.chunk_index,
    retrieval_method: 'keyword' as const,
  }));

  const merged = new Map<string, SemanticSearchResult>();
  for (const item of [...vectorResults, ...keywordResults]) {
    const key = `${item.document_id}:${item.chunk_index}`;
    if (!merged.has(key)) {
      merged.set(key, item);
    } else {
      const prev = merged.get(key)!;
      merged.set(key, {
        ...prev,
        relevance_score: Math.max(prev.relevance_score, item.relevance_score),
        retrieval_method: 'hybrid',
      });
    }
  }

  return [...merged.values()]
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
}
