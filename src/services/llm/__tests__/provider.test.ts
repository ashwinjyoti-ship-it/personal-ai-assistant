import { describe, it, expect, vi, afterEach } from 'vitest';
import { ClaudeProvider, OpenAICompatibleProvider } from '../provider';

function anthropicRes(body: unknown = { content: [{ type: 'text', text: 'hi' }] }): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}

function openAiRes(body: unknown = { choices: [{ message: { content: 'hi' } }] }): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}

describe('ClaudeProvider — Sonnet 5 sampling-parameter restriction', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('omits temperature for claude-sonnet-5 (chat)', async () => {
    const fetchMock = vi.fn(async () => anthropicRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new ClaudeProvider('key', 'claude-sonnet-5');
    await provider.chat([{ role: 'user', content: 'hi' }]);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.model).toBe('claude-sonnet-5');
    expect(body).not.toHaveProperty('temperature');
  });

  it('omits temperature for claude-sonnet-5 even when an explicit temperature option is passed', async () => {
    const fetchMock = vi.fn(async () => anthropicRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new ClaudeProvider('key', 'claude-sonnet-5');
    await provider.chat([{ role: 'user', content: 'hi' }], { temperature: 0 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).not.toHaveProperty('temperature');
  });

  it('omits temperature for claude-sonnet-5 (streamChat)', async () => {
    const fetchMock = vi.fn(async () => new Response(new ReadableStream(), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const provider = new ClaudeProvider('key', 'claude-sonnet-5');
    await provider.streamChat([{ role: 'user', content: 'hi' }], { temperature: 0.8 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).not.toHaveProperty('temperature');
  });

  it('still sends temperature for older models (claude-sonnet-4-6)', async () => {
    const fetchMock = vi.fn(async () => anthropicRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new ClaudeProvider('key', 'claude-sonnet-4-6');
    await provider.chat([{ role: 'user', content: 'hi' }], { temperature: 0.8 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.temperature).toBe(0.8);
  });

  it('defaults to claude-sonnet-5 when no model is specified', async () => {
    const fetchMock = vi.fn(async () => anthropicRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new ClaudeProvider('key');
    await provider.chat([{ role: 'user', content: 'hi' }]);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.model).toBe('claude-sonnet-5');
    expect(body).not.toHaveProperty('temperature');
  });
});

describe('OpenAICompatibleProvider — Sonnet 5 sampling-parameter restriction (OpenRouter passthrough)', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('omits temperature when routed to anthropic/claude-sonnet-5 via OpenRouter', async () => {
    const fetchMock = vi.fn(async () => openAiRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new OpenAICompatibleProvider('key', 'anthropic/claude-sonnet-5', 'https://openrouter.ai/api', 'openrouter');
    await provider.chat([{ role: 'user', content: 'hi' }], { temperature: 0.7 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).not.toHaveProperty('temperature');
  });

  it('still sends temperature for unrelated OpenAI-compatible models', async () => {
    const fetchMock = vi.fn(async () => openAiRes());
    vi.stubGlobal('fetch', fetchMock);

    const provider = new OpenAICompatibleProvider('key', 'gpt-4o', 'https://api.openai.com', 'openai');
    await provider.chat([{ role: 'user', content: 'hi' }], { temperature: 0.5 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.temperature).toBe(0.5);
  });
});
