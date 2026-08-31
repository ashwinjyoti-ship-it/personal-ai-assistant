#!/usr/bin/env node
/**
 * Paper.design MCP Relay
 *
 * Run this on any machine where Paper Desktop is open.
 * It bridges the public Cloudflare worker to Paper's local MCP server.
 *
 * Usage:
 *   RELAY_SECRET=<secret> WORKER_URL=https://paper-mcp-proxy.<your-cf>.workers.dev node relay.js
 *
 * Or set defaults below:
 */

const WORKER_URL = process.env.WORKER_URL || "https://paper-mcp-proxy.workers.dev";
const PAPER_URL = process.env.PAPER_URL || "http://127.0.0.1:29979/mcp";
const RELAY_SECRET = process.env.RELAY_SECRET;
const POLL_INTERVAL_MS = 500;

if (!RELAY_SECRET) {
  console.error("❌  RELAY_SECRET env var is required.");
  process.exit(1);
}

const headers = { "x-relay-secret": RELAY_SECRET, "Content-Type": "application/json" };

async function register() {
  const res = await fetch(`${WORKER_URL}/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ paper_url: PAPER_URL }),
  });
  if (!res.ok) throw new Error(`Registration failed: ${res.status} ${await res.text()}`);
  console.log(`✅  Registered with worker. Forwarding ${PAPER_URL} → ${WORKER_URL}/mcp`);
}

async function poll() {
  const res = await fetch(`${WORKER_URL}/relay/poll`, { headers });
  if (!res.ok) {
    console.warn(`Poll error: ${res.status}`);
    return null;
  }
  return res.json();
}

async function forwardToPaper(payload) {
  const res = await fetch(PAPER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return {
      jsonrpc: "2.0",
      error: { code: -32000, message: `Paper returned ${res.status}` },
      id: payload?.id ?? null,
    };
  }
  return res.json();
}

async function respond(id, response) {
  await fetch(`${WORKER_URL}/relay/respond`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id, response }),
  });
}

async function run() {
  await register();
  let failCount = 0;

  // Re-register every 60 s to refresh the KV TTL
  setInterval(async () => {
    try {
      await register();
      failCount = 0;
    } catch (e) {
      console.warn("Re-register failed:", e.message);
    }
  }, 60_000);

  while (true) {
    try {
      const { id, payload } = await poll();
      if (id && payload) {
        console.log(`→  Forwarding request ${id} to Paper Desktop`);
        const response = await forwardToPaper(payload);
        await respond(id, response);
        console.log(`←  Sent response for ${id}`);
      }
      failCount = 0;
      await sleep(POLL_INTERVAL_MS);
    } catch (e) {
      failCount++;
      const wait = Math.min(2 ** failCount * 500, 30_000);
      console.warn(`Error (attempt ${failCount}): ${e.message}. Retrying in ${wait}ms`);
      await sleep(wait);
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

run().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
