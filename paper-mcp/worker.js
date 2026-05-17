/**
 * Paper.design MCP Proxy — Cloudflare Worker
 *
 * Architecture:
 *   Claude Code (any machine) → this worker → relay machine (Paper Desktop running locally)
 *
 * How the relay works:
 *   1. The machine running Paper Desktop calls POST /register with its Paper MCP URL
 *      (e.g. http://127.0.0.1:29979/mcp) and a shared secret (RELAY_SECRET).
 *   2. That relay machine keeps a long-poll open via GET /relay/poll.
 *   3. Claude Code connects to this worker as an MCP server (GET/POST /mcp).
 *   4. The worker queues MCP requests, the relay machine picks them up, forwards to
 *      Paper Desktop, then posts the response back via POST /relay/respond.
 *
 * Environment variables (set via `wrangler secret put`):
 *   RELAY_SECRET   — shared secret used by the relay script to authenticate
 */

const POLL_TIMEOUT_MS = 25000; // long-poll duration
const REQUEST_TIMEOUT_MS = 30000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS for Claude Code desktop/web clients
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    if (path === "/register" && request.method === "POST") {
      return handleRegister(request, env);
    }

    if (path === "/relay/poll" && request.method === "GET") {
      return handleRelayPoll(request, env, ctx);
    }

    if (path === "/relay/respond" && request.method === "POST") {
      return handleRelayRespond(request, env);
    }

    if (path === "/mcp" || path === "/mcp/") {
      return handleMcp(request, env, ctx);
    }

    if (path === "/health") {
      const registered = await env.PAPER_STATE.get("relay_registered");
      return cors(Response.json({ ok: true, relay_active: !!registered }));
    }

    return cors(new Response("Not found", { status: 404 }));
  },
};

// ── Registration ──────────────────────────────────────────────────────────────

async function handleRegister(request, env) {
  const secret = request.headers.get("x-relay-secret");
  if (!env.RELAY_SECRET || secret !== env.RELAY_SECRET) {
    return cors(new Response("Unauthorized", { status: 401 }));
  }
  const body = await request.json().catch(() => ({}));
  const paperUrl = body.paper_url || "http://127.0.0.1:29979/mcp";
  await env.PAPER_STATE.put("relay_registered", "1", { expirationTtl: 120 });
  await env.PAPER_STATE.put("paper_url", paperUrl, { expirationTtl: 120 });
  return cors(Response.json({ ok: true, paper_url: paperUrl }));
}

// ── Relay long-poll (relay machine listens here for pending requests) ─────────

async function handleRelayPoll(request, env, ctx) {
  const secret = request.headers.get("x-relay-secret");
  if (!env.RELAY_SECRET || secret !== env.RELAY_SECRET) {
    return cors(new Response("Unauthorized", { status: 401 }));
  }

  // Renew registration heartbeat
  await env.PAPER_STATE.put("relay_registered", "1", { expirationTtl: 120 });

  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const pendingKey = await env.PAPER_STATE.list({ prefix: "req:" });
    if (pendingKey.keys.length > 0) {
      const key = pendingKey.keys[0].name;
      const payload = await env.PAPER_STATE.get(key, { type: "json" });
      if (payload) {
        await env.PAPER_STATE.delete(key);
        return cors(Response.json({ id: key, payload }));
      }
    }
    await sleep(500);
  }

  return cors(Response.json({ id: null })); // timeout, relay should re-poll
}

// ── Relay response (relay machine posts Paper's response back here) ────────────

async function handleRelayRespond(request, env) {
  const secret = request.headers.get("x-relay-secret");
  if (!env.RELAY_SECRET || secret !== env.RELAY_SECRET) {
    return cors(new Response("Unauthorized", { status: 401 }));
  }
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.response) {
    return cors(new Response("Bad request", { status: 400 }));
  }
  // Write response so the waiting /mcp handler can pick it up
  await env.PAPER_STATE.put(`res:${body.id}`, JSON.stringify(body.response), {
    expirationTtl: 60,
  });
  return cors(Response.json({ ok: true }));
}

// ── MCP endpoint (Claude Code calls this) ────────────────────────────────────

async function handleMcp(request, env, ctx) {
  const registered = await env.PAPER_STATE.get("relay_registered");
  if (!registered) {
    return cors(
      Response.json(
        {
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message:
              "Paper relay not active. Run the relay script on the machine with Paper Desktop open.",
          },
          id: null,
        },
        { status: 503 }
      )
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return cors(new Response("Invalid JSON", { status: 400 }));
  }

  const reqId = `req:${crypto.randomUUID()}`;
  await env.PAPER_STATE.put(reqId, JSON.stringify(body), { expirationTtl: 60 });

  // Wait for the relay machine to respond
  const deadline = Date.now() + REQUEST_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const res = await env.PAPER_STATE.get(`res:${reqId}`, { type: "json" });
    if (res !== null) {
      await env.PAPER_STATE.delete(`res:${reqId}`);
      return cors(Response.json(res));
    }
    await sleep(300);
  }

  return cors(
    Response.json(
      {
        jsonrpc: "2.0",
        error: { code: -32000, message: "Relay timeout — Paper Desktop may be busy." },
        id: body?.id ?? null,
      },
      { status: 504 }
    )
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function cors(response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, x-relay-secret, Authorization");
  return new Response(response.body, { status: response.status, headers });
}
