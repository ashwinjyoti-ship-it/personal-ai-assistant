# 🚀 Quick Start: Copy This to Any New Project

## For Your Next Project (3-Minute Setup)

### 1️⃣ Copy the Workflow File

Copy `.github/workflows/deploy.yml` from this repository to your new project.

### 2️⃣ Set GitHub Secrets (One-Time Per Repo)

Go to your new repository → Settings → Secrets and variables → Actions → New secret

Add these two secrets:
```
CLOUDFLARE_API_TOKEN: Ze99LIuRRuADgojC6T2xcvbTC1Vh2BA8gNH7p_xh
CLOUDFLARE_ACCOUNT_ID: cf39f049784caf415803b1a54fea336c
```

### 3️⃣ Set Project Variables (Optional - Only if Different from Defaults)

Go to: Settings → Secrets and variables → Actions → Variables tab

Only add these if your project is different:

```
CLOUDFLARE_PROJECT_NAME: your-project-name
BUILD_OUTPUT_DIR: dist (or build, out, public)
BUILD_COMMAND: npm run build (or yarn build, pnpm build)
NODE_VERSION: 20
PACKAGE_MANAGER: npm (or yarn, pnpm)
```

**If you don't set these, defaults will be used** (which work for most projects).

### 4️⃣ Create Cloudflare Pages Project

1. Go to: https://dash.cloudflare.com → Workers & Pages → Create
2. Choose "Upload assets"
3. Enter your project name (e.g., `my-app`)
4. Upload any placeholder file (just to create the project)

### 5️⃣ Push to GitHub

```bash
git add .github/workflows/deploy.yml
git commit -m "Add auto-deploy workflow"
git push origin main
```

✅ **DONE!** Your project now auto-deploys on every push to main!

---

## 📖 Need More Details?

See the full guide: [CLOUDFLARE_DEPLOY_SETUP.md](./CLOUDFLARE_DEPLOY_SETUP.md)
