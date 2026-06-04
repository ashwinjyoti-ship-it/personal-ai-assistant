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

type R2PutBody = ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob;

async function bodyToUint8Array(value: R2PutBody): Promise<Uint8Array> {
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

  const renderBucket = {
    async put(key: string, value: R2PutBody, options?: R2PutOptions) {
      const body = await bodyToUint8Array(value as R2PutBody);
      const httpMeta =
        options?.httpMetadata && !(options.httpMetadata instanceof Headers)
          ? options.httpMetadata
          : undefined;
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: httpMeta?.contentType,
          Metadata: options?.customMetadata as Record<string, string> | undefined,
        }),
      );
      return {
        key,
        version: '',
        size: body.byteLength,
        etag: '',
        httpEtag: '',
        uploaded: new Date(),
        httpMetadata: httpMeta ?? {},
        customMetadata: (options?.customMetadata as Record<string, string>) ?? {},
        range: undefined,
        checksums: {},
        writeHttpMetadata() {},
      } as unknown as R2Object;
    },
    async get(key: string) {
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
            return JSON.parse(new TextDecoder().decode(bytes)) as T;
          },
          async blob() {
            return new Blob([bytes]);
          },
        } as unknown as R2ObjectBody;
      } catch (err: unknown) {
        const meta = (err as { $metadata?: { httpStatusCode?: number }; name?: string }).$metadata;
        const name = (err as { name?: string }).name;
        if (meta?.httpStatusCode === 404 || name === 'NoSuchKey') return null;
        throw err;
      }
    },
  };

  // Only `put`/`get` are implemented for the Render shim; the remaining R2Bucket
  // surface (head, list, delete, multipart) is unused on this code path.
  return renderBucket as unknown as R2Bucket;
}
