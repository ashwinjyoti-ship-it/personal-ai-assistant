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
import { getNotesScript } from './notes';
import { getDigestsScript } from './digests';

export function getAppHTML(apiBase: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#F3EBE2">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Karna">
  <title>Karna</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/static/karna.css?v=3">
</head>
<body>
  <div id="app">
    <div style="height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#F3EBE2;color:#8C8175;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;">
      <div style="font-size:28px;font-weight:600;color:#2A2521;">Karna</div>
      <div style="font-size:14px;">Loading…</div>
      <noscript>
        <div style="color:#C0392B;font-size:14px;">JavaScript is required to use Karna.</div>
      </noscript>
    </div>
  </div>
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
${getNotesScript()}
${getDigestsScript()}
  </script>
</body>
</html>`;
}
