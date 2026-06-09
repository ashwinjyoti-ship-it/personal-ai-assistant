// Karna frontend — HTML compositor
// Import JS fragments and assemble the SPA HTML returned to the browser.

import { getCoreScript } from './core';
import { getAuthScript } from './auth';
import { getMainScript } from './main';
import { getDashboardScript } from './dashboard';
import { getChatScript } from './chat';
import { getThreadsScript } from './threads';
import { getNotificationsScript } from './notifications';
import { getMemoryScript } from './memory';
import { getDocLibScript } from './doclib';
import { getSettingsScript } from './settings';
import { getGoogleScript } from './google';
import { getSkillsScript } from './skills';
import { getInitScript } from './init';
import { getDocumentsScript } from './documents';

export function getAppHTML(apiBase: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Karna">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app"></div>
  <div class="toast-container" id="toasts"></div>

  <script>window.__KARNA_API_BASE__ = ${JSON.stringify(apiBase || '')};</script>
  <script>
${getCoreScript()}
${getAuthScript()}
${getMainScript()}
${getDashboardScript()}
${getChatScript()}
${getThreadsScript()}
${getNotificationsScript()}
${getMemoryScript()}
${getDocLibScript()}
${getSettingsScript()}
${getGoogleScript()}
${getSkillsScript()}
${getInitScript()}
${getDocumentsScript()}
  </script>
</body>
</html>`;
}
