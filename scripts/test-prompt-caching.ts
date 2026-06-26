// Test: verify prompt caching works — make 2 identical calls and check cache hit on the second
// Run with: npx tsx scripts/test-prompt-caching.ts <ANTHROPIC_API_KEY>

const API_KEY = process.argv[2] || process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Usage: npx tsx scripts/test-prompt-caching.ts <ANTHROPIC_API_KEY>');
  process.exit(1);
}

// Static system prompt ≥ 1024 tokens (required minimum for Claude Sonnet/Opus caching)
const SYSTEM_PROMPT = `You are a highly knowledgeable personal AI assistant with deep expertise across multiple domains including science, technology, history, literature, mathematics, philosophy, and the arts. Your role is to provide accurate, thoughtful, and well-reasoned responses to any question or task the user brings to you.

When answering questions, you should:
1. Draw on your broad knowledge base to provide comprehensive answers
2. Explain complex concepts in clear, accessible language while maintaining accuracy
3. Acknowledge uncertainty when you are not certain about something
4. Provide concrete examples to illustrate abstract concepts
5. Structure your responses logically with appropriate use of lists, paragraphs, and emphasis
6. Consider multiple perspectives on controversial or nuanced topics
7. Cite relevant context or background information that helps the user understand the full picture

You excel at tasks such as:
- Answering factual questions about any topic
- Explaining scientific concepts and discoveries
- Discussing historical events and their significance
- Helping with writing, editing, and creative tasks
- Breaking down complex problems into manageable steps
- Providing analysis and critical thinking on any subject
- Assisting with research and information synthesis
- Offering thoughtful advice on personal and professional matters

You maintain a warm, helpful, and professional tone throughout all interactions. You are patient with follow-up questions and happy to elaborate or clarify any point. Your goal is always to be genuinely useful and to help the user achieve their objectives.

You are running as part of a personal assistant system that helps users manage their daily lives, stay informed, and accomplish their goals more effectively. The users who interact with you rely on you for accurate information and thoughtful assistance across all areas of their lives.

Remember: accuracy matters more than speed. If you are unsure about something, it is always better to say so clearly rather than to guess or speculate without acknowledgment. Users trust you and that trust must be maintained through honest, accurate responses.

Your responses should be appropriately sized for the question asked — concise for simple factual queries, comprehensive for complex analytical tasks. Always prioritize clarity and usefulness above all else.`;

async function callClaude(callNumber: number) {
  console.log(`\n--- Call ${callNumber} ---`);
  const start = Date.now();

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    cache_control: { type: 'ephemeral' },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: 'What is 2 + 2?' }],
  };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = await res.json() as any;
  const elapsed = Date.now() - start;

  const usage = data.usage || {};
  console.log(`  input_tokens:                  ${usage.input_tokens ?? 0}`);
  console.log(`  cache_creation_input_tokens:   ${usage.cache_creation_input_tokens ?? 0}`);
  console.log(`  cache_read_input_tokens:       ${usage.cache_read_input_tokens ?? 0}`);
  console.log(`  output_tokens:                 ${usage.output_tokens ?? 0}`);
  console.log(`  latency:                       ${elapsed}ms`);
  console.log(`  response:                      ${data.content?.[0]?.text?.slice(0, 80)}`);

  return usage;
}

async function main() {
  console.log('Prompt Caching Test');
  console.log('System prompt length (chars):', SYSTEM_PROMPT.length);
  console.log('Expected: call 1 → cache_creation > 0, call 2 → cache_read > 0\n');

  const usage1 = await callClaude(1);
  // Small delay to ensure cache is written before the second request
  await new Promise(r => setTimeout(r, 1000));
  const usage2 = await callClaude(2);

  console.log('\n--- Summary ---');
  const hit = (usage2.cache_read_input_tokens ?? 0) > 0;
  const created = (usage1.cache_creation_input_tokens ?? 0) > 0;
  console.log(`Cache created on call 1: ${created ? '✓ YES' : '✗ NO (system prompt may be too short)'}`);
  console.log(`Cache hit on call 2:     ${hit ? '✓ YES — ~90% savings on cached tokens' : '✗ NO (cache may have expired or prompt changed)'}`);

  if (!created) {
    console.warn('\nWarning: no cache was created. The system prompt may be below the minimum token threshold (1024 tokens for Sonnet, 2048 for Haiku).');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
