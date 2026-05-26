import { GetObjectCommand, PutObjectCommand, type S3Client } from '@aws-sdk/client-s3';
import { createR2Client } from './r2';

function r2ConfigReady(): boolean {
  return !!(
    process.env.CLOUDFLARE_R2_ACCOUNT_ID?.trim() &&
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim() &&
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim() &&
    process.env.CLOUDFLARE_R2_BUCKET_NAME?.trim()
  );
}

async function bodyToUint8Array(value: R2PutValue): Promise<Uint8Array> {
  if (value === null) return new Uint8Array(0);
  if (typeof value === 'string') return new TextEncoder().encode(value);
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    return new Uint8Array(await value.arrayBuffer());
  }
  const stream = value as ReadableStream;
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Minimal R2Bucket shim over S3-compatible R2 API for Render. */
export function createRenderDocumentsBucket(): R2Bucket | undefined {
  if (!r2ConfigReady()) return undefined;

  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!.trim();
  const client: S3Client = createR2Client();

  return {
    async put(key, value, options?) {
      const body = await bodyToUint8Array(value);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: options?.httpMetadata?.contentType,
          Metadata: options?.customMetadata as Record<string, string> | undefined,
        }),
      );
      return null;
    },
    async get(key) {
      try {
        const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        if (!res.Body) return null;
        const bytes = await res.Body.transformToByteArray();
        return {
          key,
          version: '',
          size: bytes.byteLength,
          etag: res.ETag ?? '',
          httpEtag: res.ETag ?? '',
          uploaded: res.LastModified ?? new Date(),
          httpMetadata: {},
          customMetadata: {},
          range: undefined,
          checksums: {},
          writeHttpMetadata() {},
          async arrayBuffer() {
            return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
          },
          async text() {
            return new TextDecoder().decode(bytes);
          },
          async json<T>() {
            return JSON.parse(await this.text()) as T;
          },
          async blob() {
            return new Blob([bytes]);
          },
        } as R2ObjectBody;
      } catch (err: unknown) {
        const meta = (err as { $metadata?: { httpStatusCode?: number }; name?: string }).$metadata;
        const name = (err as { name?: string }).name;
        if (meta?.httpStatusCode === 404 || name === 'NoSuchKey') return null;
        throw err;
      }
    },
  };
}
