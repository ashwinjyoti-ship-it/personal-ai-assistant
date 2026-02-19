# 🚀 Cloudflare Pages Auto-Deploy Setup Guide

This guide shows you how to set up automatic deployment from GitHub to Cloudflare Pages for ANY project.

## 📋 One-Time GitHub Account Setup

These secrets need to be set up **once** for your GitHub account. They work for all your repositories.

### Step 1: Get Your Cloudflare Account ID

1. Go to: https://dash.cloudflare.com
2. Copy your Account ID from the right sidebar (or from URL)
3. Save it: `cf39f049784caf415803b1a54fea336c` (yours)

### Step 2: Create Cloudflare API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Under "Account Resources", select your account
5. Under "Zone Resources", select "All zones"
6. Click "Continue to summary" → "Create Token"
7. Copy the token (starts with: `Ze99...`)

### Step 3: Add Secrets to GitHub Repository

For **EACH repository**, you need to add these secrets:

1. Go to your repository on GitHub
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add these two secrets:

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Your Cloudflare API token (from Step 2)

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: Your Cloudflare Account ID (from Step 1)

---

## 🎯 Per-Project Setup (For Each New Project)

### Step 1: Create Cloudflare Pages Project

1. Go to: https://dash.cloudflare.com → "Workers & Pages"
2. Click "Create" → "Pages" → "Upload assets"
3. Enter your project name (e.g., `my-awesome-app`)
4. Upload a simple `index.html` or any file (this is just to create the project)
5. Note your project name and URL

### Step 2: Copy Workflow File

1. Copy `.github/workflows/deploy.yml` to your new project
2. That's it! The workflow is ready to use.

### Step 3: Configure Project Variables (Optional)

If your project has different settings, you can customize them without editing the workflow file:

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions" → "Variables" tab
3. Click "New repository variable"
4. Add any of these variables as needed:

| Variable Name | Default Value | Description | Example |
|---------------|---------------|-------------|---------|
| `CLOUDFLARE_PROJECT_NAME` | `karna` | Your Cloudflare Pages project name | `my-app` |
| `BUILD_OUTPUT_DIR` | `dist` | Directory containing built files | `build`, `out`, `public` |
| `BUILD_COMMAND` | `npm run build` | Command to build your project | `npm run build`, `yarn build` |
| `NODE_VERSION` | `20` | Node.js version to use | `18`, `20`, `21` |
| `PACKAGE_MANAGER` | `npm` | Package manager to use | `npm`, `yarn`, `pnpm` |

**Note:** If you don't set these variables, the workflow will use the default values (which work for most projects).

### Step 4: Push to GitHub

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add Cloudflare Pages auto-deploy"
git push origin main
```

That's it! 🎉 Your project will now auto-deploy on every push to `main`.

---

## 🔄 How It Works

1. **Trigger**: Automatically runs when you push to `main` or `master` branch
2. **Build**: Installs dependencies and builds your project
3. **Deploy**: Uploads built files to Cloudflare Pages
4. **Live**: Your site is updated in ~60 seconds

### View Deployments

- GitHub Actions: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
- Cloudflare Dashboard: https://dash.cloudflare.com → "Workers & Pages" → Your Project

---

## 📝 Examples

### Example 1: Default Project (like Karna)
No variables needed! Just copy the workflow file and push.

### Example 2: Next.js Project
Set these variables:
- `CLOUDFLARE_PROJECT_NAME`: `my-nextjs-app`
- `BUILD_OUTPUT_DIR`: `out`
- `BUILD_COMMAND`: `npm run build`

### Example 3: Vite + Yarn Project
Set these variables:
- `CLOUDFLARE_PROJECT_NAME`: `my-vite-app`
- `BUILD_OUTPUT_DIR`: `dist`
- `BUILD_COMMAND`: `yarn build`
- `PACKAGE_MANAGER`: `yarn`

### Example 4: React + PNPM Project
Set these variables:
- `CLOUDFLARE_PROJECT_NAME`: `my-react-app`
- `BUILD_OUTPUT_DIR`: `build`
- `BUILD_COMMAND`: `pnpm run build`
- `PACKAGE_MANAGER`: `pnpm`

---

## 🆘 Troubleshooting

### Workflow Fails - "Authentication Error"
- Check that `CLOUDFLARE_API_TOKEN` secret is set correctly
- Make sure the token has "Edit Cloudflare Workers" permissions

### Workflow Fails - "Project not found"
- Check that `CLOUDFLARE_PROJECT_NAME` matches your Cloudflare Pages project name
- Project names are case-sensitive

### Build Fails
- Check that `BUILD_COMMAND` is correct for your project
- Verify `NODE_VERSION` is compatible with your project
- Look at the workflow logs in GitHub Actions for specific errors

### Wrong Files Deployed
- Check that `BUILD_OUTPUT_DIR` points to the correct build directory
- Common directories: `dist`, `build`, `out`, `public`, `.next`

---

## 🎓 Quick Reference

### Default Configuration (No variables needed)
```yaml
CLOUDFLARE_PROJECT_NAME: karna
BUILD_OUTPUT_DIR: dist
BUILD_COMMAND: npm run build
NODE_VERSION: 20
PACKAGE_MANAGER: npm
```

### Manual Deployment Trigger
1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
2. Click "Deploy to Cloudflare Pages"
3. Click "Run workflow" → Select branch → "Run workflow"

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Wrangler Action](https://github.com/cloudflare/wrangler-action)

---

**Created for:** Tech-zero users who want simple, automatic deployments  
**Updated:** 2026-02-19
