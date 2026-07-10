# Render backend image — needs a real Chromium for the scripted Outlook
# scraper (src/render/outlookPlaywright.ts). Render's plain Node buildpack
# runs the build step without root/apt access, so `playwright install
# --with-deps` fails there; Microsoft's official Playwright image ships
# Chromium + all its OS-level libraries preinstalled, which sidesteps that
# entirely. The image tag's version must match the `playwright` version
# pinned in package.json exactly, or the npm package won't find a
# compatible browser build.
FROM mcr.microsoft.com/playwright:v1.61.1-jammy

WORKDIR /app

COPY package.json package-lock.json ./
# Browsers are already in the base image — skip downloading them again.
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci

COPY . .

CMD ["npm", "run", "render:worker"]
