import { Hono } from 'hono';
import type { AppEnv } from '../types';
import { DocumentProcessor, ProcessedDocument } from '../document-processor';

interface DocumentRecord {
  id: string;
  user_id: string;
  filename: string;
  r2_key: string;
  extracted_text: string;
  chunks_json: string;
  summary: string;
  key_terms_json: string;
  metadata_json: string;
  file_type: string;
  file_size: number;
  created_at: string;
  expires_at: string;
  status: 'processing' | 'completed' | 'failed';
}

const documents = new Hono<AppEnv>();

// Auth middleware for documents routes
async function requireAuth(c: any, next: any) {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) return c.json({ error: 'Authentication required' }, 401);

  const session = await c.env.DB.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  ).bind(sessionId).first<any>();

  if (!session) return c.json({ error: 'Invalid session' }, 401);

  c.set('user', {
    id: session.user_id,
    username: session.username,
    name: session.name,
    pin_hash: session.pin_hash,
    role: session.role,
    personality_prompt: session.personality_prompt,
    telegram_chat_id: session.telegram_chat_id,
    timezone: session.timezone,
    assistant_name: session.assistant_name || 'Karna',
    created_at: session.created_at,
    updated_at: session.updated_at,
  });
  c.set('sessionId', sessionId);
  
  await next();
}

documents.use('/*', requireAuth);

// Upload document
documents.post('/upload', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];

    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: `Unsupported file type: ${file.type}` }, 400);
    }

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ error: 'File too large. Maximum size is 50MB.' }, 400);
    }

    const id = crypto.randomUUID();
    const r2Key = `${userId}/${id}/${file.name}`;
    
    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    
    // Upload to R2
    await c.env.DOCUMENTS_BUCKET.put(r2Key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    // Calculate expiration (30 minutes from now)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Insert record
    await c.env.DB.prepare(
      `INSERT INTO user_documents (
        id, user_id, filename, r2_key, file_type, file_size,
        created_at, expires_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, user_id, file.name, r2Key, file.type, file.size,
      new Date().toISOString(), expiresAt, 'processing'
    ).run();

    // Start background processing
    c.executionCtx.waitUntil(
      processDocumentAsync(c.env, id, file.name, file.type, arrayBuffer, user_id)
    );

    return c.json({
      id,
      filename: file.name,
      status: 'processing',
      expires_at: expiresAt,
      message: 'Document uploaded and processing started. Will be deleted in 30 minutes.',
    }, 202);

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload document' }, 500);
  }
});

// Process document asynchronously
async function processDocumentAsync(
  env: Env,
  id: string,
  filename: string,
  fileType: string,
  content: ArrayBuffer,
  userId: string
) {
  try {
    const processor = new DocumentProcessor(env.GOOGLE_API_KEY);
    
    const processed = await processor.processDocument(id, filename, fileType, content);

    // Update record with processed data
    await env.DB.prepare(
      `UPDATE user_documents SET
        extracted_text = ?,
        chunks_json = ?,
        summary = ?,
        key_terms_json = ?,
        metadata_json = ?,
        status = ?
      WHERE id = ? AND user_id = ?`
    ).bind(
      processed.extractedText,
      JSON.stringify(processed.chunks),
      processed.summary,
      JSON.stringify(processed.keyTerms),
      JSON.stringify(processed.metadata),
      'completed',
      id,
      userId
    ).run();

    // Schedule deletion after 30 minutes
    setTimeout(async () => {
      try {
        // Delete from R2
        await env.DOCUMENTS_BUCKET.delete(processed.id);
        
        // Update record to mark file as deleted (but keep metadata)
        await env.DB.prepare(
          `UPDATE user_documents SET r2_key = NULL WHERE id = ?`
        ).bind(id).run();
      } catch (error) {
        console.error('Auto-delete error:', error);
      }
    }, 30 * 60 * 1000);

  } catch (error) {
    console.error('Processing error:', error);
    await env.DB.prepare(
      `UPDATE user_documents SET status = ? WHERE id = ?`
    ).bind('failed', id).run();
  }
}

// Get all documents for user
documents.get('/', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    
    const { results } = await c.env.DB.prepare(
      `SELECT id, filename, file_type, file_size, summary, 
              key_terms_json, metadata_json, status, created_at, expires_at
       FROM user_documents 
       WHERE user_id = ? 
       ORDER BY created_at DESC`
    ).bind(userId).all<DocumentRecord>();

    const documents = results.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      file_type: doc.file_type,
      file_size: doc.file_size,
      summary: doc.summary,
      key_terms: JSON.parse(doc.key_terms_json || '{}'),
      metadata: JSON.parse(doc.metadata_json || '{}'),
      status: doc.status,
      created_at: doc.created_at,
      expires_at: doc.expires_at,
    }));

    return c.json({ documents });

  } catch (error) {
    console.error('List documents error:', error);
    return c.json({ error: 'Failed to fetch documents' }, 500);
  }
});

// Get single document
documents.get('/:id', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const id = c.req.param('id');

    const doc = await c.env.DB.prepare(
      `SELECT * FROM user_documents WHERE id = ? AND user_id = ?`
    ).bind(id, userId).first<DocumentRecord>();

    if (!doc) {
      return c.json({ error: 'Document not found' }, 404);
    }

    return c.json({
      id: doc.id,
      filename: doc.filename,
      file_type: doc.file_type,
      file_size: doc.file_size,
      extracted_text: doc.extracted_text,
      summary: doc.summary,
      key_terms: JSON.parse(doc.key_terms_json || '{}'),
      metadata: JSON.parse(doc.metadata_json || '{}'),
      status: doc.status,
      created_at: doc.created_at,
      expires_at: doc.expires_at,
    });

  } catch (error) {
    console.error('Get document error:', error);
    return c.json({ error: 'Failed to fetch document' }, 500);
  }
});

// Download original file
documents.get('/:id/download', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const id = c.req.param('id');

    const doc = await c.env.DB.prepare(
      `SELECT r2_key, filename, file_type FROM user_documents WHERE id = ? AND user_id = ?`
    ).bind(id, userId).first<DocumentRecord>();

    if (!doc || !doc.r2_key) {
      return c.json({ error: 'Document not found or expired' }, 404);
    }

    const object = await c.env.DOCUMENTS_BUCKET.get(doc.r2_key);
    if (!object) {
      return c.json({ error: 'File not found in storage' }, 404);
    }

    const headers = new Headers();
    headers.set('Content-Type', doc.file_type);
    headers.set('Content-Disposition', `attachment; filename="${doc.filename}"`);

    return new Response(object.body, { headers });

  } catch (error) {
    console.error('Download error:', error);
    return c.json({ error: 'Failed to download document' }, 500);
  }
});

// Search across documents
documents.post('/search', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const { query } = await c.req.json();

    if (!query) {
      return c.json({ error: 'Query is required' }, 400);
    }

    // Get all completed documents for user
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM user_documents WHERE user_id = ? AND status = 'completed'`
    ).bind(userId).all<DocumentRecord>();

    if (results.length === 0) {
      return c.json({ results: [], message: 'No documents found' });
    }

    // Reconstruct ProcessedDocuments
    const documents: ProcessedDocument[] = results.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      extractedText: doc.extracted_text,
      chunks: JSON.parse(doc.chunks_json || '[]'),
      summary: doc.summary,
      keyTerms: JSON.parse(doc.key_terms_json || '{}'),
      metadata: JSON.parse(doc.metadata_json || '{}'),
    }));

    const processor = new DocumentProcessor(c.env.GOOGLE_API_KEY);
    const searchResults = await processor.searchDocuments(query, documents);

    return c.json({
      query,
      results: searchResults.map(r => ({
        document_id: r.document.id,
        filename: r.document.filename,
        chunk: r.chunk.text,
        relevance_score: r.score,
      })),
    });

  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: 'Failed to search documents' }, 500);
  }
});

// Chat with documents (Q&A)
documents.post('/chat', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const { question, document_ids, session_id } = await c.req.json();

    if (!question) {
      return c.json({ error: 'Question is required' }, 400);
    }

    // Get specified documents or all user documents
    let query = `SELECT * FROM user_documents WHERE user_id = ? AND status = 'completed'`;
    let params: (string | string[])[] = [userId];

    if (document_ids && document_ids.length > 0) {
      const placeholders = document_ids.map(() => '?').join(',');
      query += ` AND id IN (${placeholders})`;
      params = [userId, ...document_ids];
    }

    const { results } = await c.env.DB.prepare(query).bind(...params).all<DocumentRecord>();

    if (results.length === 0) {
      return c.json({ 
        answer: 'No documents available to answer your question. Please upload documents first.',
        sources: []
      });
    }

    // Reconstruct ProcessedDocuments
    const documents: ProcessedDocument[] = results.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      extractedText: doc.extracted_text,
      chunks: JSON.parse(doc.chunks_json || '[]'),
      summary: doc.summary,
      keyTerms: JSON.parse(doc.key_terms_json || '{}'),
      metadata: JSON.parse(doc.metadata_json || '{}'),
    }));

    const processor = new DocumentProcessor(c.env.GOOGLE_API_KEY);
    
    // Get chat history if session_id provided
    let chatHistory: Array<{ role: 'user' | 'model'; text: string }> = [];
    if (session_id) {
      const history = await c.env.DB.prepare(
        `SELECT question, answer FROM document_chats 
         WHERE user_id = ? AND session_id = ? 
         ORDER BY created_at DESC LIMIT 5`
      ).bind(userId, session_id).all<{ question: string; answer: string }>();
      
      chatHistory = history.results?.flatMap(h => [
        { role: 'user' as const, text: h.question },
        { role: 'model' as const, text: h.answer },
      ]) || [];
    }

    const { answer, sources } = await processor.answerQuestion(question, documents, chatHistory);

    // Save chat interaction
    const chatId = crypto.randomUUID();
    await c.env.DB.prepare(
      `INSERT INTO document_chats (id, user_id, document_ids, session_id, question, answer, sources_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      chatId, userId, JSON.stringify(document_ids || []), session_id || null,
      question, answer, JSON.stringify(sources), new Date().toISOString()
    ).run();

    return c.json({
      answer,
      session_id: session_id || chatId,
      sources: sources.map(s => ({
        document_id: s.documentId,
        chunk_preview: s.chunk.slice(0, 200) + '...',
        relevance: s.relevance,
      })),
    });

  } catch (error) {
    console.error('Chat error:', error);
    return c.json({ error: 'Failed to process question' }, 500);
  }
});

// Compare documents
documents.post('/compare', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const { document_ids, comparison_type } = await c.req.json();

    if (!document_ids || document_ids.length < 2) {
      return c.json({ error: 'At least 2 documents required for comparison' }, 400);
    }

    const placeholders = document_ids.map(() => '?').join(',');
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM user_documents WHERE user_id = ? AND id IN (${placeholders}) AND status = 'completed'`
    ).bind(userId, ...document_ids).all<DocumentRecord>();

    if (results.length < 2) {
      return c.json({ error: 'Not all documents found' }, 404);
    }

    const documents: ProcessedDocument[] = results.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      extractedText: doc.extracted_text,
      chunks: JSON.parse(doc.chunks_json || '[]'),
      summary: doc.summary,
      keyTerms: JSON.parse(doc.key_terms_json || '{}'),
      metadata: JSON.parse(doc.metadata_json || '{}'),
    }));

    const processor = new DocumentProcessor(c.env.GOOGLE_API_KEY);
    const comparison = await processor.compareDocuments(
      documents,
      comparison_type || 'general'
    );

    return c.json({
      comparison,
      documents: documents.map(d => ({ id: d.id, filename: d.filename })),
    });

  } catch (error) {
    console.error('Compare error:', error);
    return c.json({ error: 'Failed to compare documents' }, 500);
  }
});

// Delete document
documents.delete('/:id', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    const id = c.req.param('id');

    const doc = await c.env.DB.prepare(
      `SELECT r2_key FROM user_documents WHERE id = ? AND user_id = ?`
    ).bind(id, userId).first<DocumentRecord>();

    if (!doc) {
      return c.json({ error: 'Document not found' }, 404);
    }

    // Delete from R2 if exists
    if (doc.r2_key) {
      await c.env.DOCUMENTS_BUCKET.delete(doc.r2_key);
    }

    // Delete from DB
    await c.env.DB.prepare(
      `DELETE FROM user_documents WHERE id = ? AND user_id = ?`
    ).bind(id, userId).run();

    return c.json({ message: 'Document deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ error: 'Failed to delete document' }, 500);
  }
});

// Get knowledge graph connections
documents.get('/knowledge-graph', async (c) => {
  try {
    const user = c.get('user')!;
    const userId = user.id;
    
    // Get all documents with their key terms
    const { results } = await c.env.DB.prepare(
      `SELECT id, filename, key_terms_json, summary FROM user_documents 
       WHERE user_id = ? AND status = 'completed'`
    ).bind(userId).all<DocumentRecord>();

    // Build connections based on shared key terms
    const connections: Array<{ source: string; target: string; type: string; strength: number }> = [];
    
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        const doc1 = results[i];
        const doc2 = results[j];
        
        const terms1 = Object.keys(JSON.parse(doc1.key_terms_json || '{}'));
        const terms2 = Object.keys(JSON.parse(doc2.key_terms_json || '{}'));
        
        const shared = terms1.filter(t => terms2.includes(t));
        
        if (shared.length > 0) {
          connections.push({
            source: doc1.id,
            target: doc2.id,
            type: 'shared_terms',
            strength: shared.length / Math.max(terms1.length, terms2.length),
          });
        }
      }
    }

    return c.json({
      nodes: results.map(r => ({
        id: r.id,
        label: r.filename,
        summary: r.summary,
      })),
      edges: connections,
    });

  } catch (error) {
    console.error('Knowledge graph error:', error);
    return c.json({ error: 'Failed to build knowledge graph' }, 500);
  }
});

export default documents;
