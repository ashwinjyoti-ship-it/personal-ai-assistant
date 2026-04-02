// DOCX text extraction using only Web Platform APIs (no external libraries).
// DOCX files are ZIP archives containing word/document.xml. We parse the ZIP
// local file headers, decompress with DecompressionStream, and strip XML tags.
// Works in Cloudflare Workers which support the Compression Streams API.

export async function extractDocxTextFromBuffer(bytes: Buffer | Uint8Array): Promise<string> {
  const buf = bytes instanceof Buffer ? new Uint8Array(bytes) : bytes;
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let offset = 0;

  while (offset < buf.length - 30) {
    if (view.getUint32(offset, true) !== 0x04034b50) break; // not a local file header
    const flags       = view.getUint16(offset + 6,  true);
    const compression = view.getUint16(offset + 8,  true);
    const compSize    = view.getUint32(offset + 18, true);
    const uncompSize  = view.getUint32(offset + 22, true);
    const nameLen     = view.getUint16(offset + 26, true);
    const extraLen    = view.getUint16(offset + 28, true);
    const name        = new TextDecoder().decode(buf.slice(offset + 30, offset + 30 + nameLen));
    const dataStart   = offset + 30 + nameLen + extraLen;

    if (name === 'word/document.xml') {
      const compData = buf.slice(dataStart, dataStart + compSize);
      let xmlBytes: Uint8Array;

      if (compression === 0) {
        xmlBytes = compData;
      } else {
        // DEFLATE-compressed entry — decompress with DecompressionStream
        const ds = new DecompressionStream('deflate-raw');
        const writer = ds.writable.getWriter();
        writer.write(compData);
        writer.close();
        const reader = ds.readable.getReader();
        const chunks: Uint8Array[] = [];
        let done = false;
        while (!done) {
          const r = await reader.read();
          if (r.done) { done = true; } else { chunks.push(r.value); }
        }
        const total = chunks.reduce((n, c) => n + c.length, 0);
        xmlBytes = new Uint8Array(uncompSize || total);
        let pos = 0;
        for (const c of chunks) { xmlBytes.set(c, pos); pos += c.length; }
      }

      const xml = new TextDecoder().decode(xmlBytes);
      const text = xml
        .replace(/<\/w:p>/g, '\n')   // paragraph break
        .replace(/<\/w:tr>/g, '\n')  // table row break
        .replace(/<[^>]+>/g, '')     // strip all XML tags
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      return text;
    }

    offset = dataStart + compSize;
    if (flags & 0x0008) offset += 16; // skip optional data descriptor
  }
  return '';
}
