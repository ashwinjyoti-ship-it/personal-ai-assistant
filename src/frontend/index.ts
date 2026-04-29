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

export function getAppHTML(): string {
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app"></div>
  <div class="toast-container" id="toasts"></div>

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
