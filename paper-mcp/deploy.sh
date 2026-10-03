#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "▶  Creating KV namespace (skip if already exists)..."
KV_OUTPUT=$(npx wrangler kv namespace create PAPER_STATE 2>&1 || true)
echo "$KV_OUTPUT"

KV_ID=$(echo "$KV_OUTPUT" | grep -oP '"id":\s*"\K[^"]+' | head -1)
if [ -n "$KV_ID" ]; then
  echo "✅  KV namespace id: $KV_ID"
  # Patch wrangler.json in-place
  sed -i "s/REPLACE_WITH_KV_NAMESPACE_ID/$KV_ID/" wrangler.json
fi

echo ""
echo "▶  Deploying worker..."
npx wrangler deploy

echo ""
echo "▶  Setting RELAY_SECRET..."
echo "   Run: npx wrangler secret put RELAY_SECRET"
echo "   (enter a strong random value and save it)"
echo ""
echo "✅  Done! Add to Claude Code on any machine:"
echo "   claude mcp add paper --transport http https://paper-mcp-proxy.<subdomain>.workers.dev/mcp --scope user"
