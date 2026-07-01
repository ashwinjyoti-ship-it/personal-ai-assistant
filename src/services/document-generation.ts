// Generate real .docx and .pdf files from markdown-ish text content.
// Used by the create_file tool so requests for "a Word doc" / "a PDF" produce
// an actual downloadable file instead of a Google Doc (Karna's only other
// document output). Delivery is via Google Drive upload (see uploadFileToDrive
// in google.ts) — there is no separate file-hosting/download route in this app.

export type DocBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'numbered'; text: string; index: number };

// Parses a practical subset of markdown: #/##/### headings, -/* bullets,
// "1." numbered lists, and plain paragraphs. Bold/italic markers are left
// in place for renderInlineRuns() to split into styled runs.
export function parseMarkdownBlocks(markdown: string): DocBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: DocBlock[] = [];
  let numberedIndex = 0;
  let paragraphBuf: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuf.length > 0) {
      const text = paragraphBuf.join(' ').trim();
      if (text) blocks.push({ type: 'paragraph', text });
      paragraphBuf = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      flushParagraph();
      numberedIndex = 0;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      numberedIndex = 0;
      blocks.push({ type: 'heading', level: heading[1].length as 1 | 2 | 3, text: heading[2].trim() });
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      numberedIndex = 0;
      blocks.push({ type: 'bullet', text: bullet[1].trim() });
      continue;
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      numberedIndex += 1;
      blocks.push({ type: 'numbered', text: numbered[1].trim(), index: numberedIndex });
      continue;
    }

    numberedIndex = 0;
    paragraphBuf.push(line);
  }
  flushParagraph();

  return blocks;
}

// Splits "**bold** and *italic* text" into runs of {text, bold, italic}.
export function renderInlineRuns(text: string): { text: string; bold?: boolean; italic?: boolean }[] {
  const runs: { text: string; bold?: boolean; italic?: boolean }[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith('**')) {
      runs.push({ text: token.slice(2, -2), bold: true });
    } else {
      runs.push({ text: token.slice(1, -1), italic: true });
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    runs.push({ text: text.slice(lastIndex) });
  }
  return runs.length > 0 ? runs : [{ text }];
}

// Drops a leading level-1 heading if it duplicates the given title, so callers
// that always render an explicit title don't also show it as the first block.
function stripDuplicateTitleHeading(blocks: DocBlock[], title: string): DocBlock[] {
  const first = blocks[0];
  if (first && first.type === 'heading' && first.level === 1 && first.text.trim().toLowerCase() === title.trim().toLowerCase()) {
    return blocks.slice(1);
  }
  return blocks;
}

export async function generateDocxBuffer(title: string, markdown: string): Promise<Uint8Array> {
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
  } = await import('docx');

  const blocks = stripDuplicateTitleHeading(parseMarkdownBlocks(markdown), title);

  const toRuns = (text: string) =>
    renderInlineRuns(text).map(r => new TextRun({ text: r.text, bold: r.bold, italics: r.italic }));

  const HEADING_MAP = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 };

  const children = blocks.map(block => {
    if (block.type === 'heading') {
      return new Paragraph({ heading: HEADING_MAP[block.level], children: toRuns(block.text) });
    }
    if (block.type === 'bullet') {
      return new Paragraph({ bullet: { level: 0 }, children: toRuns(block.text) });
    }
    if (block.type === 'numbered') {
      return new Paragraph({
        numbering: { reference: 'karna-numbered-list', level: 0 },
        children: toRuns(block.text),
      });
    }
    return new Paragraph({ children: toRuns(block.text), spacing: { after: 160 } });
  });

  const doc = new Document({
    title,
    numbering: {
      config: [{
        reference: 'karna-numbered-list',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: 'start' }],
      }],
    },
    sections: [{
      children: [
        new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: title, bold: true })] }),
        ...children,
      ],
    }],
  });

  return new Uint8Array(await Packer.toBuffer(doc));
}

export async function generatePdfBuffer(title: string, markdown: string): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const PAGE_WIDTH = 612; // US Letter
  const PAGE_HEIGHT = 792;
  const MARGIN = 54;
  const MAX_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const BODY_SIZE = 11;
  const LINE_HEIGHT = 15;

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const newPageIfNeeded = (needed: number) => {
    if (y - needed < MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  };

  // Wraps plain text (no inline styling) to fit MAX_WIDTH at the given font/size.
  const wrapText = (text: string, useFont: any, size: number): string[] => {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (useFont.widthOfTextAtSize(candidate, size) > MAX_WIDTH && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines.length > 0 ? lines : [''];
  };

  const drawWrapped = (text: string, useFont: any, size: number, indent = 0, color = rgb(0.1, 0.1, 0.1)) => {
    for (const line of wrapText(text, useFont, size)) {
      newPageIfNeeded(LINE_HEIGHT);
      page.drawText(line, { x: MARGIN + indent, y, size, font: useFont, color });
      y -= LINE_HEIGHT;
    }
  };

  // Title
  newPageIfNeeded(28);
  page.drawText(title, { x: MARGIN, y, size: 20, font: boldFont, color: rgb(0, 0, 0) });
  y -= 30;

  const blocks = stripDuplicateTitleHeading(parseMarkdownBlocks(markdown), title);
  for (const block of blocks) {
    // Inline bold/italic markers aren't rendered as mixed styles in the PDF path
    // (pdf-lib has no rich-text layout primitive); markers are stripped instead.
    const plain = block.text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');

    if (block.type === 'heading') {
      const size = block.level === 1 ? 16 : block.level === 2 ? 14 : 12;
      newPageIfNeeded(size + 10);
      y -= 6;
      drawWrapped(plain, boldFont, size);
      y -= 4;
    } else if (block.type === 'bullet') {
      drawWrapped(`•  ${plain}`, font, BODY_SIZE, 10);
    } else if (block.type === 'numbered') {
      drawWrapped(`${block.index}.  ${plain}`, font, BODY_SIZE, 10);
    } else {
      drawWrapped(plain, font, BODY_SIZE);
      y -= 6;
    }
  }

  return pdfDoc.save();
}
