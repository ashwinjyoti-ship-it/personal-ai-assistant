# Environment Variables Configuration Guide

This document explains all environment variables used in Karna and where to configure them across the three systems: **Cloudflare Pages**, **Render Backend**, and **GitHub Actions**.

## Architecture Overview

Karna uses a **split runtime model**:
- **Cloudflare Pages/Workers**: Lightweight gateway for auth, session checks, settings, and Telegram webhooks
- **Render Background Worker**: Long-running backend for chat orchestration, tool chains, browser automation, and cron jobs
- **Cloudflare D1**: System database (shared by both)
- **Cloudflare R2**: Object/document storage (shared by both)

Environment variables must be configured on the appropriate platform(s) depending on where the code runs.

---

## System 1: Cloudflare Pages

**Purpose**: Frontend gateway with proxy to Render backend

**Location**: Cloudflare Dashboard → Pages → `karna-5xs` → Settings → Environment Variables

### Navigation Steps

1. Go to https://dash.cloudflare.com
2. Select your Cloudflare account
3. Click **Pages** in the left sidebar
4. Click the `karna-5xs` project
5. Click the **Settings** tab
6. Scroll down to **Environment variables** section
7. Add/edit variables for both **Production** and **Preview** environments (or just Production)

### Required Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `ENABLE_RENDER_PROXY` | `true` | Enables proxying of `/api/*` routes to Render backend |
| `RENDER_BACKEND_URL` | `https://karna-background-worker.onrender.com` | Full URL to Render backend service |
| `RENDER_API_SECRET` | `<32+ char random string>` | Shared secret for authenticating requests to Render (must match Render's value) |
| `RENDER_PROXY_TIMEOUT_MS` | `8000` | Timeout in milliseconds for proxied requests to Render |
| `API_BASE_URL` | `https://karna-background-worker.onrender.com` | Render backend URL injected into the SPA (`window.__KARNA_API_BASE__`) so the browser calls Render directly |
| `TELEGRAM_WEBHOOK_BASE_URL` | _(optional)_ same as `API_BASE_URL` | Override for Telegram webhook registration when it must differ from the API base |
| `RENDER_API_SECRET` | `<32+ char random string>` | Shared secret for authenticating requests to Render (must match Render's value) |
| `RENDER_PROXY_TIMEOUT_MS` | `8000` | Timeout in milliseconds for proxied requests to Render |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `ASYNC_ACK_ROUTES` | `true` | Return 202 Accepted immediately for long-running routes (chat send, Telegram webhook) |

### Existing App Secrets (also on Cloudflare Pages)

These are your API keys and credentials needed by both Cloudflare and Render:

- **Google OAuth**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_OAUTH_REDIRECT_URI`
- **Telegram Bot**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- **LLM Providers**: 
  - `ANTHROPIC_API_KEY`
  - `OPENAI_API_KEY`
  - `GROK_API_KEY`
  - `DEEPSEEK_API_KEY`
  - `GOOGLE_GEMINI_API_KEY`
  - `OPENROUTER_API_KEY`
  - `ABACUSAI_API_KEY`
- **Browser Automation**: `BROWSER_USE_API_KEY`
- **Other**: `ENCRYPTION_KEY`, `SMTP_PASSWORD`, etc.

---

## System 2: Render Background Worker

**Purpose**: Long-running backend for heavy workloads (orchestration, browser automation, cron jobs)

**Location**: Render Dashboard → `karna-background-worker` → Environment

### Navigation Steps

1. Go to https://dashboard.render.com
2. Find the `karna-background-worker` service
3. Click into the service
4. Click the **Environment** tab
5. Add/edit environment variables (changes trigger auto-redeploy if configured)

### Required Variables (Specific to Render)

| Variable | Value | Purpose |
|----------|-------|---------|
| `RENDER_API_SECRET` | `<32+ char random string>` | Shared secret for Cloudflare to authenticate requests (must match Cloudflare value) |
| `LEGACY_API_BASE_URL` | `https://karna-5xs.pages.dev` | Cloudflare Pages URL so Render can call itself back (for internal API chains) |

### Optional Variables (Specific to Render)

| Variable | Value | Purpose |
|----------|-------|---------|
| `ASYNC_ACK_ROUTES` | `true` | Return 202 Accepted immediately for `/api/chat/send` and `/api/telegram/webhook` |

### Cloudflare API Credentials (Required for Render to access D1/R2)

These credentials allow the Render backend to read/write to Cloudflare D1 and R2:

| Variable | Value | Purpose |
|----------|-------|---------|
| `CLOUDFLARE_ACCOUNT_ID` | `<your account ID>` | Your Cloudflare account ID (find in Cloudflare dashboard top-right or account settings) |
| `CLOUDFLARE_D1_DATABASE_ID` | `<database ID>` | D1 database ID (find in Cloudflare dashboard → D1 → your database → ID) |
| `CLOUDFLARE_D1_API_TOKEN` | `<API token>` | Cloudflare API token with D1 edit permissions |
| `CLOUDFLARE_R2_ACCOUNT_ID` | `<account ID>` | Same as CLOUDFLARE_ACCOUNT_ID |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | `<access key>` | R2 access key ID (generate in Cloudflare → R2 → API Tokens → Create API Token) |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | `<secret key>` | R2 secret access key (generate with access key) |
| `CLOUDFLARE_R2_BUCKET_NAME` | `<bucket name>` | Name of your R2 bucket (e.g., `karna-documents`) |

### Existing App Secrets (shared with Cloudflare Pages)

Same as Cloudflare Pages:
- Google OAuth credentials
- Telegram Bot token
- LLM provider API keys
- Browser automation keys
- Encryption key
- SMTP credentials

---

## System 3: GitHub Actions

**Purpose**: CI/CD workflows that may need to deploy, test, or publish

**Location**: GitHub → Settings → Secrets and variables → Actions

### Navigation Steps

1. Go to https://github.com/ashwinjyoti-ship-it/personal-ai-assistant
2. Click the **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** or **New repository variable** as needed

### Variables Used in Workflows

| Variable | Type | Purpose |
|----------|------|---------|
| `CLOUDFLARE_ACCOUNT_ID` | Secret | Cloudflare account for deployment |
| `CLOUDFLARE_API_TOKEN` | Secret | Cloudflare API token for Pages deployment |
| `RENDER_API_SECRET` | Secret | Used in deployment scripts to verify Render |
| `RENDER_BACKEND_URL` | Variable | Non-sensitive URL for Render (can be public) |

Check `.github/workflows/*.yml` files to see which secrets are used in each workflow.

---

## Configuration Checklist

Use this checklist when setting up or verifying your environment:

### Cloudflare Pages Configuration

- [ ] `ENABLE_RENDER_PROXY` = `true`
- [ ] `RENDER_BACKEND_URL` = `https://karna-background-worker.onrender.com` (or your Render service URL)
- [ ] `API_BASE_URL` = `https://karna-background-worker.onrender.com` (same Render URL — Phase B + D)
- [ ] `RENDER_API_SECRET` = `<same value as Render's RENDER_API_SECRET>`
- [ ] `RENDER_PROXY_TIMEOUT_MS` = `8000`
- [ ] All existing app secrets are present (Google, Telegram, LLM keys, etc.)
- [ ] Variables set for both **Production** and **Preview** environments (or just Production if preferred)

### Render Backend Configuration

- [ ] `RENDER_API_SECRET` = `<same value as Cloudflare's RENDER_API_SECRET>`
- [ ] `LEGACY_API_BASE_URL` = `https://karna-5xs.pages.dev` (your Cloudflare Pages URL)
- [ ] `CLOUDFLARE_ACCOUNT_ID` = `<your account ID>`
- [ ] `CLOUDFLARE_D1_DATABASE_ID` = `<your D1 database ID>`
- [ ] `CLOUDFLARE_D1_API_TOKEN` = `<valid API token with D1 permissions>`
- [ ] `CLOUDFLARE_R2_ACCOUNT_ID` = `<your account ID>`
- [ ] `CLOUDFLARE_R2_ACCESS_KEY_ID` = `<R2 access key>`
- [ ] `CLOUDFLARE_R2_SECRET_ACCESS_KEY` = `<R2 secret>`
- [ ] `CLOUDFLARE_R2_BUCKET_NAME` = `<bucket name>`
- [ ] All existing app secrets are present (Google, Telegram, LLM keys, Browser Use, etc.)

### GitHub Actions Configuration

- [ ] Any required secrets are set for deployment workflows
- [ ] Check `.github/workflows/` for specific secret names used

---

## How to Find Your Values

### Cloudflare Account ID
1. Log in to https://dash.cloudflare.com
2. Look at the top-right corner, or go to Account settings
3. Account ID is listed under "Account Information"

### D1 Database ID
1. Go to Cloudflare Dashboard → D1
2. Click your database (`karna` or similar)
3. ID is shown at the top or in Overview

### Cloudflare API Token
1. Go to Account settings → API tokens
2. Click "Create token" or use "Edit Zone DNS" template
3. Ensure it has D1 edit permissions
4. Copy the token (only shown once)

### R2 Access Keys
1. Go to Cloudflare Dashboard → R2
2. Click "API Tokens" in the top-right
3. Click "Create API Token"
4. Select "S3 API credentials"
5. Copy Access Key ID and Secret Access Key (shown once)

### Render API Secret
- Generate a random 32+ character string
- Use a password generator or: `openssl rand -hex 16`
- **Must be identical** on both Cloudflare and Render

---

## Troubleshooting

### "502 Bad Gateway" when accessing `/api/*` routes
- **Check**: `ENABLE_RENDER_PROXY` is `true` on Cloudflare
- **Check**: `RENDER_BACKEND_URL` is correct and reachable
- **Check**: `RENDER_API_SECRET` matches between Cloudflare and Render
- **Check**: Render backend service is running (`GET https://karna-background-worker.onrender.com/healthz`)

### Render backend can't connect to D1
- **Check**: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_D1_DATABASE_ID` are correct
- **Check**: `CLOUDFLARE_D1_API_TOKEN` is valid and not expired
- **Check**: API token has D1 edit permissions

### Render backend can't write to R2
- **Check**: `CLOUDFLARE_R2_BUCKET_NAME` exists and is spelled correctly
- **Check**: `CLOUDFLARE_R2_ACCESS_KEY_ID` and `CLOUDFLARE_R2_SECRET_ACCESS_KEY` are correct
- **Check**: R2 credentials have read+write permissions (not read-only)

### Telegram webhook not received
- **Check**: Bot token is configured in Settings → Keys
- **Check**: Webhook URL points at Render (`https://karna-background-worker.onrender.com/api/telegram/webhook`), not the Cloudflare Pages URL
- **Fix**: Settings → Telegram → **Set Webhook** or **Migrate to Render**

---

## Security Notes

- **Never commit secrets** to Git (use environment variables, not hardcoded values)
- **Rotate API tokens** periodically (every 90 days recommended)
- **Use different keys for dev/staging/production** when possible
- **RENDER_API_SECRET** is a shared secret between Cloudflare and Render — if compromised, regenerate on both platforms
- **Keep Cloudflare D1 and R2 credentials** separate from public Git repos and logs
