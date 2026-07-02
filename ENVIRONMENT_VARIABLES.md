# Environment Variables Configuration Guide

This document explains all environment variables used in Karna and where to configure them across the three systems: **Cloudflare Pages**, **Render Backend**, and **GitHub Actions**.

## Architecture Overview

Karna uses a **split runtime model**:
- **Cloudflare Pages**: Frontend (HTML/JS) + Google OAuth callback. Optional `AI`/`VECTORIZE` for semantic search on CF.
- **Render web service**: Full API backend (chat, Telegram, cron, browser automation)
- **Cloudflare D1 / R2**: Shared database and object storage

Environment variables must be configured on the appropriate platform depending on where the code runs.

---

## System 1: Cloudflare Pages

**Purpose**: Serve the frontend SPA and OAuth callback

**Location**: Cloudflare Dashboard → Pages → `karna-5xs` → Settings → Environment Variables

### Required Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `API_BASE_URL` | `https://karna-background-worker.onrender.com` | Render backend URL injected into the SPA (`window.__KARNA_API_BASE__`) |
| `GOOGLE_CLIENT_ID` | _(from Google Cloud Console)_ | OAuth callback on Cloudflare origin |
| `GOOGLE_CLIENT_SECRET` | _(secret)_ | OAuth callback on Cloudflare origin |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `TELEGRAM_WEBHOOK_BASE_URL` | same as `API_BASE_URL` | Override for Telegram webhook registration in Settings |

### Notes

- The browser and Telegram webhook registration call **Render directly** — no CF→Render proxy.
- LLM keys and Telegram bot tokens live encrypted in D1 (`credentials` table), not as CF env vars.
- Remove legacy proxy vars if still set: `ENABLE_RENDER_PROXY`, `RENDER_BACKEND_URL`, `RENDER_API_SECRET`, `RENDER_PROXY_TIMEOUT_MS`.

---

## System 2: Render Web Service

**Purpose**: Full API backend (chat, Telegram, cron, browser automation)

**Location**: Render Dashboard → `karna-background-worker` → Environment

### Required Variables (Render-specific)

| Variable | Value | Purpose |
|----------|-------|---------|
| `CLOUDFLARE_ACCOUNT_ID` | your account ID | D1 REST API access |
| `CLOUDFLARE_D1_DATABASE_ID` | D1 database ID | Remote database |
| `CLOUDFLARE_D1_API_TOKEN` | API token with D1 read/write | Authenticates D1 REST calls |
| `GOOGLE_CLIENT_ID` | same as Cloudflare Pages | OAuth + Google APIs on Render |
| `GOOGLE_CLIENT_SECRET` | same as Cloudflare Pages | OAuth + Google APIs on Render |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `GOOGLE_API_KEY` / `GOOGLE_CSE_ID` | same as Pages | Search/places APIs |
| `CLOUDFLARE_R2_*` | R2 S3 credentials | Document uploads on Render |
| `CRON_SECRET` | shared secret | Cron endpoint auth (defaults if unset) |
| `RENDER_DISABLE_CRON` | `false` | Set `true` to disable in-process scheduler |

### Cloudflare API Credentials (D1 + R2 on Render)

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

Check `.github/workflows/*.yml` files to see which secrets are used in each workflow.

---

## Configuration Checklist

Use this checklist when setting up or verifying your environment:

### Cloudflare Pages Configuration

- [ ] `API_BASE_URL` = `https://karna-background-worker.onrender.com`
- [ ] `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` set for OAuth callback
- [ ] Legacy proxy vars **removed**: `ENABLE_RENDER_PROXY`, `RENDER_BACKEND_URL`, `RENDER_API_SECRET`, `RENDER_PROXY_TIMEOUT_MS`
- [ ] Variables set for **Production** (and Preview if used)

### Render Backend Configuration

- [ ] `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_D1_API_TOKEN`
- [ ] `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (mirror Cloudflare Pages)
- [ ] Optional R2 vars if using document uploads
- [ ] Legacy vars **removed**: `RENDER_RUN_NATIVE_APP`, `RENDER_API_SECRET`, `LEGACY_API_BASE_URL`, `ASYNC_ACK_ROUTES`

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

Legacy — no longer used. Safe to delete `RENDER_API_SECRET` from Cloudflare and Render dashboards.

---

## Troubleshooting

### API requests fail from the browser
- **Check**: `API_BASE_URL` on Cloudflare Pages points at Render
- **Check**: Render backend is running (`GET https://karna-background-worker.onrender.com/healthz`)

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
- **RENDER_API_SECRET** is legacy — remove from both platforms after Tier 3 deploy.
- **Keep Cloudflare D1 and R2 credentials** separate from public Git repos and logs
