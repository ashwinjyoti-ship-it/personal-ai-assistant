#!/bin/bash

# Deploy karna-cron worker
# This script deploys the cron worker that triggers evening briefings every minute

echo "🚀 Deploying karna-cron worker..."
echo ""

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js and npm."
    exit 1
fi

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not set."
    echo "Please provide your Cloudflare API token:"
    echo ""
    echo "export CLOUDFLARE_API_TOKEN=YOUR_TOKEN_HERE"
    echo ""
    exit 1
fi

# Check if CLOUDFLARE_ACCOUNT_ID is set
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "⚠️  CLOUDFLARE_ACCOUNT_ID not set."
    echo "Using default account ID: cf39f049784caf415803b1a54fea336c"
    export CLOUDFLARE_ACCOUNT_ID="cf39f049784caf415803b1a54fea336c"
fi

# Navigate to cron-worker directory
cd "$(dirname "$0")"

echo "📁 Working directory: $(pwd)"
echo "📄 Config file: wrangler.json"
echo ""

# Display current configuration
echo "⚙️  Current Configuration:"
cat wrangler.json
echo ""

# Deploy
echo "🔨 Deploying worker..."
npx wrangler deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 To view deployment status:"
    echo "   npx wrangler deployments list --name karna-cron"
    echo ""
    echo "🧪 To test the worker:"
    echo "   curl https://karna-cron.YOUR_SUBDOMAIN.workers.dev/trigger"
    echo ""
    echo "📝 To view logs:"
    echo "   npx wrangler tail karna-cron"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "Please check:"
    echo "1. CLOUDFLARE_API_TOKEN has correct permissions"
    echo "2. CLOUDFLARE_ACCOUNT_ID is correct"
    echo "3. wrangler.json configuration is valid"
    exit 1
fi
