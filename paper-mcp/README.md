# Paper.design MCP Proxy

Connect Claude Code to Paper.design from **any machine**, not just the one running Paper Desktop.

## Architecture

```
Claude Code (any machine)
        │
        ▼
Cloudflare Worker  ←──── relay.js (machine with Paper Desktop open)
 /mcp endpoint               │
        │                    ▼
        └──────────► Paper Desktop (127.0.0.1:29979)
```

## One-time Setup

### 1. Create a KV namespace

```bash
cd paper-mcp
npx wrangler kv namespace create PAPER_STATE
```

Copy the `id` from the output into `wrangler.json`.

### 2. Deploy the worker

```bash
npx wrangler deploy
```

Note the worker URL (e.g. `https://paper-mcp-proxy.<subdomain>.workers.dev`).

### 3. Set the relay secret

```bash
npx wrangler secret put RELAY_SECRET
# enter any strong random string, e.g. openssl rand -hex 32
```

Keep this secret — you'll need it for the relay script.

### 4. Add the worker to Claude Code (any machine, any session)

```bash
claude mcp add paper --transport http https://paper-mcp-proxy.<subdomain>.workers.dev/mcp --scope user
```

Or it's already wired in `.claude/settings.json` for this project (local Paper Desktop sessions).

---

## Daily Use — On the machine with Paper Desktop open

```bash
RELAY_SECRET=<your-secret> \
WORKER_URL=https://paper-mcp-proxy.<subdomain>.workers.dev \
node paper-mcp/relay.js
```

Leave this running. Claude Code on any other machine will now route through to Paper Desktop.

### Optional: run as a background service

```bash
# macOS launchd / Linux systemd — or simply:
nohup RELAY_SECRET=xxx WORKER_URL=https://... node paper-mcp/relay.js &
```

---

## What you can do with Paper MCP tools

| Tool | Description |
|------|-------------|
| `get_selection` | Read the currently selected element |
| `get_jsx` | Export selected element as JSX |
| `get_screenshot` | Screenshot the canvas |
| `get_computed_styles` | Read computed CSS |
| `create_artboard` | Create a new artboard |
| `write_html` | Write HTML/CSS into the canvas |
| `set_text_content` | Update text in a layer |
| `update_styles` | Apply style changes |

Paper exposes 24 tools total — Claude will discover them automatically on connection.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `relay not active` error | Start `relay.js` on the Paper Desktop machine |
| `504 Relay timeout` | Paper Desktop may be closed or busy |
| `401 Unauthorized` | Check `RELAY_SECRET` matches on both sides |
| Local sessions broken | Make sure Paper Desktop is open before the session |
