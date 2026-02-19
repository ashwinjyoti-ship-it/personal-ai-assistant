import { GoogleGenerativeAI } from '@google/generative-ai';

export interface DocumentChunk {
  text: string;
  embedding: number[];
  startPos: number;
  endPos: number;
}

export interface ProcessedDocument {
  id: string;
  filename: string;
  extractedText: string;
  chunks: DocumentChunk[];
  summary: string;
  keyTerms: Record<string, string>;
  metadata: {
    pageCount?: number;
    wordCount: number;
    fileType: string;
    processedAt: string;
  };
}

export class DocumentProcessor {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      // Use PDF.js-like approach for Workers - extract text from PDF
      // For now, we'll use Gemini to process the raw bytes
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64
          }
        },
        { text: 'Extract all text content from this PDF. Return the full text as-is, preserving structure where possible.' }
      ]);
      
      return result.response.text();
    } catch (error) {
      console.error('PDF extraction error:', error);
      // Fallback: treat as text extraction
      return 'PDF processing failed. Please try uploading a text-based PDF.';
    }
  }

  async extractTextFromExcel(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      // For Cloudflare Workers, use Gemini to extract from XLSX
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            data: base64
          }
        },
        { text: 'Extract all data from this Excel/spreadsheet file. Return the content in a readable tabular format with sheet names and cell values.' }
      ]);
      
      return result.response.text();
    } catch (error) {
      console.error('Excel extraction error:', error);
      throw new Error('Failed to extract text from Excel');
    }
  }

  async extractTextFromWord(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      // For Cloudflare Workers, use Gemini to extract from DOCX
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            data: base64
          }
        },
        { text: 'Extract all text content from this Word document. Return the full text, preserving paragraphs and structure.' }
      ]);
      
      return result.response.text();
    } catch (error) {
      console.error('Word extraction error:', error);
      throw new Error('Failed to extract text from Word document');
    }
  }

  async performOCR(imageBuffer: ArrayBuffer): Promise<string> {
    try {
      // Use Gemini Vision for OCR
      const base64 = Buffer.from(imageBuffer).toString('base64');
      const mimeType = this.detectImageMimeType(imageBuffer);
      
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: mimeType,
            data: base64
          }
        },
        { text: 'Extract all text from this image using OCR. Return the extracted text exactly as it appears.' }
      ]);
      
      return result.response.text();
    } catch (error) {
      console.error('OCR error:', error);
      throw new Error('Failed to perform OCR on image');
    }
  }

  detectImageMimeType(buffer: ArrayBuffer): string {
    const arr = new Uint8Array(buffer);
    if (arr[0] === 0xFF && arr[1] === 0xD8) return 'image/jpeg';
    if (arr[0] === 0x89 && arr[1] === 0x50) return 'image/png';
    return 'image/jpeg'; // Default
  }

  chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      chunks.push(text.slice(start, end));
      start = end - overlap;
      if (start >= end) break;
    }
    
    return chunks;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'embedding-001' });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Embedding generation error:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  async generateSummary(text: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const prompt = `Summarize the following document in 3-5 bullet points, highlighting key information:

${text.slice(0, 15000)}`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Summary generation error:', error);
      return 'Summary generation failed';
    }
  }

  async extractKeyTerms(text: string): Promise<Record<string, string>> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      const prompt = `Extract key terms, dates, amounts, names, and obligations from this document. Return as a JSON object with key-value pairs:

${text.slice(0, 10000)}`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch {
        // Fall through to default
      }
      
      return { key_info: responseText };
    } catch (error) {
      console.error('Key terms extraction error:', error);
      return {};
    }
  }

  async processDocument(
    id: string,
    filename: string,
    fileType: string,
    content: ArrayBuffer
  ): Promise<ProcessedDocument> {
    let extractedText = '';
    let pageCount: number | undefined;

    // Extract text based on file type
    if (fileType === 'application/pdf') {
      extractedText = await this.extractTextFromPDF(content);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      extractedText = await this.extractTextFromExcel(content);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      extractedText = await this.extractTextFromWord(content);
    } else if (fileType.startsWith('image/')) {
      extractedText = await this.performOCR(content);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    if (!extractedText.trim()) {
      throw new Error('No text could be extracted from the document');
    }

    // Chunk the text
    const textChunks = this.chunkText(extractedText);
    
    // Generate embeddings for each chunk
    const chunks: DocumentChunk[] = [];
    let currentPos = 0;
    
    for (const chunkText of textChunks) {
      const embedding = await this.generateEmbedding(chunkText);
      chunks.push({
        text: chunkText,
        embedding,
        startPos: currentPos,
        endPos: currentPos + chunkText.length,
      });
      currentPos += chunkText.length - 200; // Account for overlap
    }

    // Generate summary and key terms in parallel
    const [summary, keyTerms] = await Promise.all([
      this.generateSummary(extractedText),
      this.extractKeyTerms(extractedText),
    ]);

    return {
      id,
      filename,
      extractedText,
      chunks,
      summary,
      keyTerms,
      metadata: {
        pageCount,
        wordCount: extractedText.split(/\s+/).length,
        fileType,
        processedAt: new Date().toISOString(),
      },
    };
  }

  cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async searchDocuments(
    query: string,
    documents: ProcessedDocument[],
    topK: number = 5
  ): Promise<Array<{ document: ProcessedDocument; chunk: DocumentChunk; score: number }>> {
    const queryEmbedding = await this.generateEmbedding(query);
    
    const results: Array<{ document: ProcessedDocument; chunk: DocumentChunk; score: number }> = [];
    
    for (const doc of documents) {
      for (const chunk of doc.chunks) {
        const score = this.cosineSimilarity(queryEmbedding, chunk.embedding);
        results.push({ document: doc, chunk, score });
      }
    }
    
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  async answerQuestion(
    question: string,
    documents: ProcessedDocument[],
    chatHistory: Array<{ role: 'user' | 'model'; text: string }> = []
  ): Promise<{ answer: string; sources: Array<{ documentId: string; chunk: string; relevance: number }> }> {
    // Search for relevant chunks
    const searchResults = await this.searchDocuments(question, documents, 5);
    
    // Build context from top results
    const context = searchResults
      .map((r, i) => `[${i + 1}] From "${r.document.filename}": ${r.chunk.text}`)
      .join('\n\n');
    
    const sources = searchResults.map(r => ({
      documentId: r.document.id,
      chunk: r.chunk.text,
      relevance: r.score,
    }));

    // Build chat history context
    const historyContext = chatHistory
      .map(h => `${h.role}: ${h.text}`)
      .join('\n');

    const prompt = `You are a helpful AI assistant analyzing documents. Answer the user's question based on the provided document excerpts.

Chat History:
${historyContext}

Relevant Document Excerpts:
${context}

User Question: ${question}

Provide a clear, accurate answer based on the documents. Cite the source numbers [1], [2], etc. when referencing information. If the documents don't contain relevant information, say so.`;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(prompt);
    
    return {
      answer: result.response.text(),
      sources,
    };
  }

  async compareDocuments(
    documents: ProcessedDocument[],
    comparisonType: 'pricing' | 'terms' | 'general' = 'general'
  ): Promise<string> {
    const context = documents
      .map((d, i) => `Document ${i + 1} (${d.filename}):\nSummary: ${d.summary}\nKey Terms: ${JSON.stringify(d.keyTerms)}\n---`)
      .join('\n\n');

    const prompts: Record<string, string> = {
      pricing: `Compare pricing across these documents. Identify differences in costs, payment terms, and value propositions:

${context}

Provide a structured comparison table.`,
      terms: `Compare terms and conditions across these documents. Identify differences in obligations, deadlines, and legal provisions:

${context}

Provide a structured comparison.`,
      general: `Compare these documents and identify key similarities and differences:

${context}

Provide a comprehensive comparison.`,
    };

    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(prompts[comparisonType]);
    
    return result.response.text();
  }
}
