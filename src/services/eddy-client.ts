// HTTP client for Karna → Eddy federation calls.
// Eddy URL comes from EDDY_BASE_URL env var (Render or Cloudflare secret).

export interface EddyRecallRequest {
  show?: string;
  date?: string;
  dateRange?: string;
  query: string;
  limit?: number;
}

export interface EddyRecallResponse {
  success: boolean;
  jobId?: string;
  showName?: string;
  date?: string;
  venue?: string;
  gear?: Array<{ type: string; model: string; qty: number; notes?: string }>;
  crew?: Array<{ name: string; role: string }>;
  notes?: string;
  source: string;
  error?: string;
}

function eddyBaseUrl(): string {
  return (
    (typeof process !== 'undefined' && process.env?.EDDY_BASE_URL) ||
    (typeof globalThis !== 'undefined' && (globalThis as any).EDDY_BASE_URL) ||
    ''
  );
}

export async function eddyRecall(params: EddyRecallRequest): Promise<EddyRecallResponse> {
  const base = eddyBaseUrl();
  if (!base) {
    return { success: false, error: 'EDDY_BASE_URL not configured', source: 'eddy:config' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(`${base}/api/recall`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Karna-Integration': 'true' },
      body: JSON.stringify({ ...params, limit: params.limit ?? 5 }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        success: false,
        error: `Eddy returned ${response.status}: ${response.statusText}`,
        source: 'eddy:error',
      };
    }

    const data = await response.json() as EddyRecallResponse;
    return { ...data, success: true };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, error: 'Eddy request timed out after 10s', source: 'eddy:timeout' };
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error calling Eddy',
      source: 'eddy:error',
    };
  }
}

export async function eddyHealth(): Promise<boolean> {
  const base = eddyBaseUrl();
  if (!base) return false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3_000);
    const res = await fetch(`${base}/api/health`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}
