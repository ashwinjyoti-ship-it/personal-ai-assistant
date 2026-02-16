// Karna — Personal AI Assistant
// Main application entry point

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from './types';

// Route imports
import auth from './routes/auth';
import chat from './routes/chat';
import settings from './routes/settings';
import system from './routes/system';
import telegram from './routes/channels/telegram';
import { completeOAuthFlow } from './services/google';
import { decrypt } from './services/crypto';

const app = new Hono<AppEnv>();

// Global middleware
app.use('/api/*', cors());

// API routes
app.route('/api/auth', auth);
app.route('/api/chat', chat);
app.route('/api/settings', settings);
app.route('/api/system', system);
app.route('/api/telegram', telegram);

// ==========================================
// Google OAuth 2.0 Callback
// ==========================================
// This handles the redirect from Google after user grants consent.
// Extracts the code, exchanges for tokens, stores the refresh token.
app.get('/auth/google/callback', async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return c.html(getOAuthResultHTML(false, `Google denied access: ${error}`));
  }

  if (!code || !state) {
    return c.html(getOAuthResultHTML(false, 'Missing authorization code or state parameter.'));
  }

  try {
    // Decode state to get session ID
    const stateData = JSON.parse(atob(state));
    const sessionId = stateData.sessionId;

    if (!sessionId) {
      return c.html(getOAuthResultHTML(false, 'Invalid state parameter — missing session.'));
    }

    // Verify session
    const session = await c.env.DB.prepare(
      `SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`
    ).bind(sessionId).first<any>();

    if (!session) {
      return c.html(getOAuthResultHTML(false, 'Session expired. Please log in again and retry.'));
    }

    const userId = session.user_id;
    const pinHash = session.pin_hash;

    // Build redirect URI (must match exactly what was sent to Google)
    const redirectUri = `${url.protocol}//${url.host}/auth/google/callback`;

    // Complete the OAuth flow — exchanges code for tokens, stores them
    const result = await completeOAuthFlow(
      c.env.DB, userId, pinHash, code, redirectUri,
      c.env.GOOGLE_CLIENT_ID, c.env.GOOGLE_CLIENT_SECRET
    );

    return c.html(getOAuthResultHTML(true, `Connected as ${result.email}`, result.email));
  } catch (err: any) {
    return c.html(getOAuthResultHTML(false, `OAuth failed: ${err.message}`));
  }
});

// Serve the main application HTML
app.get('/', (c) => {
  return c.html(getAppHTML());
});

// Catch-all for SPA — serve the same HTML for any non-API route
app.get('*', (c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: 'Not found' }, 404);
  }
  return c.html(getAppHTML());
});

// OAuth callback result page
function getOAuthResultHTML(success: boolean, message: string, email?: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Google OAuth — Karna</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center; min-height:100vh;
    background:#0a0a0a; color:#e0e0e0; font-family:'Inter',sans-serif; }
  .card { background:#141414; border:1px solid #222; border-radius:12px; padding:32px; max-width:400px; text-align:center; }
  .icon { font-size:48px; margin-bottom:16px; }
  .msg { font-size:15px; color:#999; margin:12px 0; }
  .email { color:#4fd1c5; font-weight:500; }
  .btn { display:inline-block; margin-top:16px; padding:10px 24px; background:#4fd1c5; color:#0a0a0a;
    border:none; border-radius:8px; font-weight:600; cursor:pointer; text-decoration:none; font-size:14px; }
</style></head><body>
<div class="card">
  <div class="icon">${success ? '&#10003;' : '&#10007;'}</div>
  <h2 style="margin:0; color:${success ? '#4fd1c5' : '#ff6b6b'};">${success ? 'Connected' : 'Connection Failed'}</h2>
  <p class="msg">${message}</p>
  ${email ? '<p class="email">' + email + '</p>' : ''}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${success}, email: '${email || ''}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
</script>
</body></html>`;
}

function getAppHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <style>
    /* === KARNA — Seamless Minimalist Chat === */
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: #0e0e10;
      --bg-elevated: #16161a;
      --bg-overlay: rgba(14, 14, 16, 0.85);
      --text-primary: #e8e6e3;
      --text-secondary: #8b8a88;
      --text-muted: #555553;
      --accent: #4fd1c5;
      --accent-dim: rgba(79, 209, 197, 0.15);
      --border: rgba(255, 255, 255, 0.06);
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
    }

    /* === Layout === */
    #app {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* === Top Bar === */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      backdrop-filter: blur(20px);
      z-index: 10;
    }
    .topbar-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s;
      font-size: 16px;
    }
    .topbar-btn:hover { color: var(--text-primary); background: var(--accent-dim); }
    .topbar-title {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-secondary);
    }
    .status-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      display: inline-block;
      margin-right: 8px;
      animation: pulse 3s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* === Chat Area === */
    .chat-area {
      flex: 1;
      overflow-y: auto;
      padding: 32px 20px;
      scroll-behavior: smooth;
    }
    .chat-area::-webkit-scrollbar { width: 3px; }
    .chat-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    .message-group {
      max-width: 720px;
      margin: 0 auto 28px;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .msg-user {
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 6px;
      font-size: 15px;
    }
    .msg-assistant {
      color: var(--text-secondary);
      font-weight: 300;
      font-size: 15px;
      line-height: 1.75;
    }
    .msg-assistant strong { color: var(--text-primary); font-weight: 500; }
    .msg-assistant code {
      font-family: var(--font-mono);
      font-size: 13px;
      background: var(--bg-elevated);
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--accent);
    }
    .msg-assistant pre {
      background: var(--bg-elevated);
      padding: 14px 16px;
      border-radius: 8px;
      margin: 12px 0;
      overflow-x: auto;
      border: 1px solid var(--border);
    }
    .msg-assistant pre code { background: none; padding: 0; }
    .msg-assistant ul, .msg-assistant ol { padding-left: 20px; margin: 8px 0; }
    .msg-assistant li { margin: 4px 0; }
    .msg-assistant a { color: var(--accent); text-decoration: none; }
    .msg-assistant a:hover { text-decoration: underline; }

    /* Inline widgets */
    .widget {
      border: 1px dashed var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      margin: 12px 0;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.2s;
    }
    .widget:hover { border-color: var(--accent); }
    .widget-icon { color: var(--accent); margin-right: 10px; font-size: 14px; }
    .widget-content { flex: 1; color: var(--text-secondary); }
    .widget-action {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }
    .widget-action:hover { border-color: var(--accent); color: var(--accent); }

    /* Thinking indicator */
    .thinking {
      max-width: 720px;
      margin: 0 auto;
      color: var(--text-muted);
      font-size: 14px;
    }
    .thinking-cursor {
      display: inline-block;
      width: 2px;
      height: 16px;
      background: var(--accent);
      vertical-align: text-bottom;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Progress bar */
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--accent), transparent);
      width: 0;
      transition: width 0.3s;
      z-index: 100;
      opacity: 0;
    }
    .progress-bar.active { opacity: 1; animation: progressPulse 2s infinite; }
    @keyframes progressPulse {
      0% { width: 0; }
      50% { width: 60%; }
      100% { width: 85%; }
    }

    /* === Input Area === */
    .input-area {
      padding: 16px 20px 24px;
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }
    .input-wrap {
      max-width: 720px;
      margin: 0 auto;
      position: relative;
    }
    .input-field {
      width: 100%;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.5;
      resize: none;
      outline: none;
      min-height: 24px;
      max-height: 120px;
    }
    .input-field::placeholder { color: var(--text-muted); }

    /* === Overlays (History & Settings) === */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-overlay);
      backdrop-filter: blur(24px);
      z-index: 50;
      display: none;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .overlay.active { display: flex; opacity: 1; }
    .overlay-panel {
      width: 380px;
      height: 100%;
      background: var(--bg-elevated);
      border-right: 1px solid var(--border);
      padding: 24px;
      overflow-y: auto;
      animation: slideIn 0.25s ease;
    }
    .overlay-panel.right {
      margin-left: auto;
      border-right: none;
      border-left: 1px solid var(--border);
      animation: slideInRight 0.25s ease;
    }
    @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .overlay-close {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .panel-title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 20px;
    }

    /* === Login & Setup === */
    .auth-screen {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .auth-form {
      width: 320px;
    }
    .auth-title {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--text-primary);
      text-align: center;
      margin-bottom: 8px;
    }
    .auth-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      text-align: center;
      margin-bottom: 32px;
    }
    .field {
      margin-bottom: 16px;
    }
    .field label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .field input, .field textarea, .field select {
      width: 100%;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 14px;
      padding: 10px 14px;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
    }
    .field input:focus, .field textarea:focus {
      border-color: var(--accent);
    }
    .field textarea {
      min-height: 80px;
      resize: vertical;
    }
    .btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 1px solid var(--accent);
      color: var(--accent);
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn:hover { background: var(--accent-dim); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .btn-small {
      width: auto;
      padding: 6px 14px;
      font-size: 11px;
    }
    .btn-danger { border-color: #e55; color: #e55; }
    .btn-danger:hover { background: rgba(238, 85, 85, 0.1); }

    .error-text { color: #e55; font-size: 13px; margin-top: 8px; }
    .success-text { color: var(--accent); font-size: 13px; margin-top: 8px; }

    /* Settings tabs */
    .tabs {
      display: flex;
      gap: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .tab {
      padding: 10px 16px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-muted);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab:hover { color: var(--text-secondary); }
    .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
    .tab-content { display: none; }
    .tab-content.active { display: block; }

    /* Memory and schedule items */
    .item-card {
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 8px;
      transition: border-color 0.2s;
    }
    .item-card:hover { border-color: rgba(255,255,255,0.12); }
    .item-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .item-card-title { font-size: 13px; font-weight: 500; color: var(--text-primary); }
    .item-card-meta { font-size: 11px; color: var(--text-muted); }
    .item-card-body { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
    .tag {
      display: inline-block;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--accent-dim);
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Toggle switch */
    .toggle {
      position: relative;
      width: 36px;
      height: 20px;
      cursor: pointer;
    }
    .toggle input { display: none; }
    .toggle-track {
      width: 100%;
      height: 100%;
      background: var(--border);
      border-radius: 10px;
      transition: background 0.2s;
    }
    .toggle input:checked + .toggle-track { background: var(--accent); }
    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: var(--text-primary);
      border-radius: 50%;
      transition: transform 0.2s;
    }
    .toggle input:checked ~ .toggle-thumb { transform: translateX(16px); }

    /* Welcome message */
    .welcome {
      max-width: 720px;
      margin: 0 auto;
      text-align: center;
      padding-top: 15vh;
    }
    .welcome h2 {
      font-size: 20px;
      font-weight: 300;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }
    .welcome p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .overlay-panel { width: 100%; }
      .chat-area { padding: 20px 16px; }
      .input-area { padding: 12px 16px 20px; }
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <div class="progress-bar" id="progressBar"></div>

  <script>
  // === Karna Frontend Application ===
  const API = '/api';
  let state = {
    session: null,       // { sessionId, user }
    messages: [],        // conversation history
    loading: false,
    activeOverlay: null, // 'history' | 'settings' | null
    settingsTab: 'profile',
  };

  // === Utility ===
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }
  
  async function api(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (state.session?.sessionId) {
      headers['Authorization'] = 'Bearer ' + state.session.sessionId;
    }
    const res = await fetch(API + path, { ...options, headers });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      // If the response isn't JSON (e.g., HTML error page), wrap it
      return { error: 'Non-JSON response (' + res.status + '): ' + text.substring(0, 100) };
    }
  }

  function saveSession(sessionData) {
    state.session = sessionData;
    localStorage.setItem('karna_session', JSON.stringify(sessionData));
  }
  function loadSession() {
    const stored = localStorage.getItem('karna_session');
    if (stored) state.session = JSON.parse(stored);
  }
  function clearSession() {
    state.session = null;
    localStorage.removeItem('karna_session');
  }

  // Simple markdown to HTML
  function md(text) {
    if (!text) return '';
    var s = text;
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');
    s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
    s = s.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    s = s.replace(/(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)/g, '<em>$1</em>');
    s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    var lines = s.split('\\n');
    var result = [];
    var inList = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('<li>') === 0) {
        if (!inList) { result.push('<ul>'); inList = true; }
        result.push(lines[i]);
      } else {
        if (inList) { result.push('</ul>'); inList = false; }
        result.push(lines[i]);
      }
    }
    if (inList) result.push('</ul>');
    return result.join('<br>');
  }

  // === Render Functions ===
  function render() {
    const app = $('#app');
    if (!state.session) {
      renderAuth(app);
    } else {
      renderChat(app);
    }
  }

  function renderAuth(container) {
    // Check if first-time setup needed
    api('/auth/check').then(data => {
      if (!data.hasUsers) {
        renderSetup(container);
      } else {
        renderLogin(container);
      }
    });
  }

  function renderSetup(container) {
    container.innerHTML = \`
      <div class="auth-screen">
        <div class="auth-form">
          <div class="auth-title">Karna</div>
          <div class="auth-subtitle">First time setup — create your profile</div>
          <div class="field">
            <label>Username</label>
            <input type="text" id="setupUsername" placeholder="ashwin" autocomplete="off">
          </div>
          <div class="field">
            <label>Display Name</label>
            <input type="text" id="setupName" placeholder="Ashwin Jyoti">
          </div>
          <div class="field">
            <label>PIN (4+ characters)</label>
            <input type="password" id="setupPin" placeholder="Your secret PIN">
          </div>
          <div class="field">
            <label>Personality Instructions (optional)</label>
            <textarea id="setupPersonality" placeholder="How should Karna talk to you? Any context about your work, preferences..."></textarea>
          </div>
          <div class="field">
            <label>Timezone</label>
            <select id="setupTimezone">
              <option value="Asia/Kolkata" selected>Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <button class="btn" id="setupBtn">Create Profile</button>
          <div id="setupError" class="error-text"></div>
        </div>
      </div>
    \`;
    $('#setupBtn').onclick = handleSetup;
  }

  function renderLogin(container) {
    container.innerHTML = \`
      <div class="auth-screen">
        <div class="auth-form">
          <div class="auth-title">Karna</div>
          <div class="auth-subtitle">Welcome back</div>
          <div class="field">
            <label>Username</label>
            <input type="text" id="loginUsername" placeholder="username" autocomplete="off">
          </div>
          <div class="field">
            <label>PIN</label>
            <input type="password" id="loginPin" placeholder="Your PIN">
          </div>
          <button class="btn" id="loginBtn">Enter</button>
          <div id="loginError" class="error-text"></div>
          <div style="text-align:center; margin-top:20px;">
            <a href="#" id="showSetup" style="color:var(--text-muted); font-size:12px;">Create new account</a>
          </div>
        </div>
      </div>
    \`;
    $('#loginBtn').onclick = handleLogin;
    $('#loginPin').onkeydown = (e) => { if (e.key === 'Enter') handleLogin(); };
    $('#showSetup').onclick = (e) => { e.preventDefault(); renderSetup(container); };
  }

  function renderChat(container) {
    container.innerHTML = \`
      <div class="topbar">
        <button class="topbar-btn" id="historyBtn" title="History">&#9776;</button>
        <div class="topbar-title"><span class="status-dot"></span><span id="assistantNameDisplay">KARNA</span></div>
        <button class="topbar-btn" id="settingsBtn" title="Settings">&#9881;</button>
      </div>
      <div class="chat-area" id="chatArea">
        <div id="messages"></div>
        <div id="thinking" class="thinking" style="display:none">
          <span class="thinking-cursor"></span>
        </div>
      </div>
      <div class="input-area">
        <div class="input-wrap">
          <textarea class="input-field" id="inputField" placeholder="Type something..." rows="1"></textarea>
        </div>
      </div>
      
      <!-- History Overlay -->
      <div class="overlay" id="historyOverlay">
        <div class="overlay-panel">
          <div class="panel-title">Conversations</div>
          <div id="historyList"></div>
        </div>
        <div class="overlay-close" id="historyClose"></div>
      </div>

      <!-- Settings Overlay -->
      <div class="overlay" id="settingsOverlay">
        <div class="overlay-close" id="settingsClose"></div>
        <div class="overlay-panel right">
          <div class="panel-title">Settings</div>
          <div class="tabs">
            <div class="tab active" data-tab="profile">Profile</div>
            <div class="tab" data-tab="credentials">Keys</div>
            <div class="tab" data-tab="schedules">Tasks</div>
            <div class="tab" data-tab="memory">Memory</div>
            <div class="tab" data-tab="errors">Errors</div>
          </div>
          <div id="settingsContent"></div>
        </div>
      </div>
    \`;

    // Event listeners
    $('#historyBtn').onclick = () => toggleOverlay('historyOverlay');
    $('#settingsBtn').onclick = () => { toggleOverlay('settingsOverlay'); renderSettingsTab(); };
    $('#historyClose').onclick = () => toggleOverlay(null);
    $('#settingsClose').onclick = () => toggleOverlay(null);
    
    $$('.tab').forEach(tab => {
      tab.onclick = () => {
        $$('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.settingsTab = tab.dataset.tab;
        renderSettingsTab();
      };
    });

    const input = $('#inputField');
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
    input.oninput = () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    };

    // Load history and assistant name
    loadChatHistory();
    loadAssistantName();
    input.focus();
  }

  // === Handlers ===
  async function handleSetup() {
    const btn = $('#setupBtn');
    btn.disabled = true;
    $('#setupError').textContent = '';

    const data = await api('/auth/setup', {
      method: 'POST',
      body: JSON.stringify({
        username: $('#setupUsername').value.trim().toLowerCase(),
        name: $('#setupName').value.trim(),
        pin: $('#setupPin').value,
        personality_prompt: $('#setupPersonality').value.trim(),
        timezone: $('#setupTimezone').value,
      }),
    });

    if (data.error) {
      $('#setupError').textContent = data.error;
      btn.disabled = false;
      return;
    }
    saveSession({ sessionId: data.sessionId, user: data.user });
    render();
  }

  async function handleLogin() {
    const btn = $('#loginBtn');
    btn.disabled = true;
    $('#loginError').textContent = '';

    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: $('#loginUsername').value.trim().toLowerCase(),
        pin: $('#loginPin').value,
      }),
    });

    if (data.error) {
      $('#loginError').textContent = data.error;
      btn.disabled = false;
      return;
    }
    saveSession({ sessionId: data.sessionId, user: data.user });
    render();
  }

  async function handleSend() {
    const input = $('#inputField');
    const text = input.value.trim();
    if (!text || state.loading) return;

    input.value = '';
    input.style.height = 'auto';
    state.loading = true;

    // Add user message
    addMessage('user', text);
    showThinking(true);
    $('#progressBar').classList.add('active');

    try {
      const data = await api('/chat/send', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
      });

      showThinking(false);
      $('#progressBar').classList.remove('active');

      if (data.error) {
        addMessage('assistant', data.error, data.type === 'no_provider' ? 'error-provider' : 'error');
      } else {
        addMessage('assistant', data.response);
      }
    } catch (err) {
      showThinking(false);
      $('#progressBar').classList.remove('active');
      addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
    }

    state.loading = false;
    input.focus();
  }

  function addMessage(role, content, type = '') {
    const messagesEl = $('#messages');
    if (!messagesEl) return;

    const group = document.createElement('div');
    group.className = 'message-group';

    if (role === 'user') {
      group.innerHTML = '<div class="msg-user">' + escapeHtml(content) + '</div>';
    } else {
      if (type === 'error-provider') {
        group.innerHTML = '<div class="msg-assistant">' + md(content) + 
          '<br><br><button class="btn btn-small" onclick="toggleOverlay(&apos;settingsOverlay&apos;); state.settingsTab=&apos;credentials&apos;; renderSettingsTab();">Open Settings</button></div>';
      } else if (type === 'error') {
        group.innerHTML = '<div class="msg-assistant" style="color:#e55">' + md(content) + '</div>';
      } else {
        group.innerHTML = '<div class="msg-assistant">' + md(content) + '</div>';
      }
    }

    messagesEl.appendChild(group);
    scrollToBottom();

    state.messages.push({ role, content, timestamp: new Date().toISOString() });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showThinking(show) {
    const el = $('#thinking');
    if (el) el.style.display = show ? 'block' : 'none';
    if (show) scrollToBottom();
  }

  function scrollToBottom() {
    const area = $('#chatArea');
    if (area) setTimeout(() => area.scrollTop = area.scrollHeight, 50);
  }

  async function loadAssistantName() {
    var data = await api('/settings/profile');
    var aName = data.assistant_name || 'Karna';
    var el = $('#assistantNameDisplay');
    if (el) el.textContent = aName.toUpperCase();
    state.assistantName = aName;
  }

  async function loadChatHistory() {
    var aName = state.assistantName || 'Karna';
    const data = await api('/chat/history?limit=50');
    const messagesEl = $('#messages');
    if (!messagesEl) return;

    if (!data.messages || data.messages.length === 0) {
      // Show welcome
      var userName = state.session?.user?.name ? ', ' + state.session.user.name : '';
      messagesEl.innerHTML = '<div class="welcome"><h2>Hello' + userName + '</h2><p>I am ' + aName + ', your personal assistant. I can manage your schedules, remember important things, and help you stay organized. Start by telling me something.</p></div>';
      return;
    }

    messagesEl.innerHTML = '';
    for (const msg of data.messages) {
      const group = document.createElement('div');
      group.className = 'message-group';
      if (msg.role === 'user') {
        group.innerHTML = '<div class="msg-user">' + escapeHtml(msg.content) + '</div>';
      } else {
        group.innerHTML = '<div class="msg-assistant">' + md(msg.content) + '</div>';
      }
      messagesEl.appendChild(group);
    }
    scrollToBottom();
  }

  // === Overlays ===
  function toggleOverlay(id) {
    $$('.overlay').forEach(o => o.classList.remove('active'));
    if (id) {
      const overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'historyOverlay') loadHistoryPanel();
    }
  }

  async function loadHistoryPanel() {
    const list = $('#historyList');
    if (!list) return;
    list.innerHTML = '<div style="color:var(--text-muted); font-size:13px;">Loading...</div>';
    
    const data = await api('/chat/history?limit=100');
    if (!data.messages || data.messages.length === 0) {
      list.innerHTML = '<div style="color:var(--text-muted); font-size:13px;">No conversations yet.</div>';
      return;
    }

    // Group by date
    const grouped = {};
    for (const msg of data.messages) {
      const date = msg.created_at?.split('T')[0] || 'Unknown';
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(msg);
    }

    let html = '';
    for (const [date, msgs] of Object.entries(grouped)) {
      html += '<div style="font-size:11px; color:var(--text-muted); margin:16px 0 8px; letter-spacing:1px; text-transform:uppercase;">' + date + '</div>';
      const userMsgs = msgs.filter(m => m.role === 'user');
      for (const m of userMsgs.slice(0, 10)) {
        html += '<div class="item-card" style="cursor:default"><div class="item-card-body">' + escapeHtml(m.content.substring(0, 80)) + (m.content.length > 80 ? '...' : '') + '</div></div>';
      }
    }
    list.innerHTML = html;
  }

  // === Settings Panel ===
  async function renderSettingsTab() {
    const content = $('#settingsContent');
    if (!content) return;

    try {
      switch (state.settingsTab) {
        case 'profile': return await renderProfileTab(content);
        case 'credentials': return await renderCredentialsTab(content);
        case 'schedules': return await renderSchedulesTab(content);
        case 'memory': return await renderMemoryTab(content);
        case 'errors': return await renderErrorsTab(content);
      }
    } catch (err) {
      content.innerHTML = '<div style="color:#e55; font-size:13px; padding:12px;">Error loading settings: ' + (err.message || 'Unknown error') + '<br><br>Try logging out and back in.<br><button class="btn btn-small btn-danger" style="margin-top:12px;" onclick="clearSession(); render();">Logout</button></div>';
      console.error('Settings render error:', err);
    }
  }

  async function renderProfileTab(container) {
    const data = await api('/settings/profile');
    if (data.error) {
      container.innerHTML = '<div style="color:#e55; font-size:13px;">Profile error: ' + escapeHtml(data.error) + '<br><br><button class="btn btn-small btn-danger" onclick="clearSession(); render();">Logout &amp; Re-login</button></div>';
      return;
    }
    container.innerHTML = \`
      <div class="field">
        <label>Name</label>
        <input type="text" id="profName" value="\${data.name || ''}">
      </div>
      <div class="field">
        <label>Role</label>
        <input type="text" id="profRole" value="\${data.role || ''}">
      </div>
      <div class="field">
        <label>Assistant Name</label>
        <input type="text" id="profAssistantName" value="\${data.assistant_name || 'Karna'}" placeholder="What should your assistant be called?">
        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">The name your assistant uses when talking to you.</div>
      </div>
      <div class="field">
        <label>Telegram Chat ID</label>
        <input type="text" id="profTelegram" value="\${data.telegram_chat_id || ''}" placeholder="Your Telegram chat ID">
      </div>
      <div class="field">
        <label>Timezone</label>
        <select id="profTimezone">
          <option value="Asia/Kolkata" \${data.timezone === 'Asia/Kolkata' ? 'selected' : ''}>Asia/Kolkata (IST)</option>
          <option value="America/New_York" \${data.timezone === 'America/New_York' ? 'selected' : ''}>America/New_York (EST)</option>
          <option value="Europe/London" \${data.timezone === 'Europe/London' ? 'selected' : ''}>Europe/London (GMT)</option>
          <option value="UTC" \${data.timezone === 'UTC' ? 'selected' : ''}>UTC</option>
        </select>
      </div>
      <div class="field">
        <label>Personality Instructions</label>
        <textarea id="profPersonality" rows="4" placeholder="How should your assistant behave? Describe the personality, tone, style...">\${data.personality_prompt || ''}</textarea>
      </div>
      <button class="btn" id="profSave">Save Profile</button>
      <div id="profMsg" class="success-text"></div>
      <div style="margin-top:24px; border-top:1px solid var(--border); padding-top:16px;">
        <button class="btn btn-danger btn-small" id="logoutBtn">Logout</button>
      </div>
    \`;
    $('#profSave').onclick = async () => {
      await api('/settings/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: $('#profName').value.trim(),
          role: $('#profRole').value.trim(),
          assistant_name: $('#profAssistantName').value.trim() || 'Karna',
          telegram_chat_id: $('#profTelegram').value.trim(),
          timezone: $('#profTimezone').value,
          personality_prompt: $('#profPersonality').value.trim(),
        }),
      });
      $('#profMsg').textContent = 'Saved';
      setTimeout(() => { if ($('#profMsg')) $('#profMsg').textContent = ''; }, 2000);
    };
    $('#logoutBtn').onclick = async () => {
      await api('/auth/logout', { method: 'POST' });
      clearSession();
      render();
    };
  }

  async function renderCredentialsTab(container) {
    const data = await api('/settings/credentials');
    if (data.error) {
      container.innerHTML = '<div style="color:#e55; font-size:13px;">Credentials error: ' + escapeHtml(data.error) + '</div>';
      return;
    }
    const configured = new Set((data.credentials || []).map(c => c.service));

    var sections = [
      {
        title: 'AI PROVIDERS',
        desc: 'Add one or both. When both are configured, requests rotate between them to balance daily token usage. If one hits a rate limit, the other takes over automatically.',
        items: [
          { key: 'anthropic', label: 'Anthropic Claude', placeholder: 'sk-ant-api03-...', badge: 'provider' },
          { key: 'openai', label: 'OpenAI GPT-4', placeholder: 'sk-...', badge: 'provider' },
        ]
      },
      {
        title: 'COMMUNICATION',
        desc: 'Connect Karna to your messaging channels.',
        items: [
          { key: 'telegram_bot_token', label: 'Telegram Bot Token', placeholder: 'Token from @BotFather' },
        ]
      },
      {
        title: 'BROWSER AUTOMATION',
        desc: 'Steel.dev provides the browser session. Browser Use provides the AI that drives it. Both needed for Outlook and web automation.',
        items: [
          { key: 'steel_api_key', label: 'Steel.dev API Key', placeholder: 'steel_...' },
          { key: 'browser_use_api_key', label: 'Browser Use API Key', placeholder: 'bu_...' },
        ]
      },
      {
        title: 'GOOGLE WORKSPACE',
        desc: 'Connect your Google account with OAuth 2.0 for Sheets, Calendar, Docs, and Drive access. Your data stays yours — Karna only acts with your permission.',
        items: [],
        custom_after: 'google_oauth_section'
      },
      {
        title: 'OUTLOOK',
        desc: 'Outlook credentials are used by the browser agent (Steel + Browser Use) to log into Outlook for email and calendar.',
        items: [
          { key: 'outlook_email', label: 'Outlook Email', placeholder: 'you@org.com' },
          { key: 'outlook_password', label: 'Outlook Password', placeholder: 'Password', isPassword: true },
        ]
      },
    ];

    var html = '<div style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">All credentials are encrypted with your PIN and stored securely. Only you can access them.</div>';
    
    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      html += '<div style="font-size:10px; font-weight:600; letter-spacing:1.5px; color:var(--text-muted); margin:' + (s > 0 ? '24px' : '8px') + ' 0 6px; text-transform:uppercase;">' + section.title + '</div>';
      html += '<div style="font-size:11px; color:var(--text-muted); margin-bottom:12px; line-height:1.5;">' + section.desc + '</div>';
      
      for (var i = 0; i < section.items.length; i++) {
        var svc = section.items[i];
        var isSet = configured.has(svc.key);
        var badgeHtml = '';
        if (svc.badge === 'provider') {
          badgeHtml = '<span class="tag" style="background:' + (isSet ? 'rgba(79,209,197,0.2)' : 'rgba(255,255,255,0.06)') + '; color:' + (isSet ? 'var(--accent)' : 'var(--text-muted)') + ';">' + (isSet ? 'active' : 'not set') + '</span>';
        } else {
          badgeHtml = '<span class="tag">' + (isSet ? 'configured' : 'not set') + '</span>';
        }

        html += '<div class="item-card" style="margin-bottom:10px">';
        html += '<div class="item-card-header"><span class="item-card-title">' + svc.label + '</span>' + badgeHtml + '</div>';
        html += '<div style="margin-top:8px; display:flex; gap:8px; align-items:center;">';
        html += '<input type="' + (svc.isPassword ? 'password' : 'text') + '" id="cred_' + svc.key + '" placeholder="' + (isSet ? '••••••• (enter new to update)' : svc.placeholder) + '" style="flex:1; background:var(--bg); border:1px solid var(--border); color:var(--text-primary); padding:8px 10px; border-radius:6px; font-size:13px; font-family:var(--font-mono); outline:none;">';
        html += '<button class="btn btn-small" onclick="saveCred(&apos;' + svc.key + '&apos;)">Save</button>';
        if (isSet) {
          html += '<button class="btn btn-small" onclick="validateCred(&apos;' + svc.key + '&apos;)" style="color:var(--accent);">Test</button>';
          html += '<button class="btn btn-small btn-danger" onclick="deleteCred(&apos;' + svc.key + '&apos;)">×</button>';
        }
        html += '</div>';
        html += '<div id="credValidation_' + svc.key + '" style="font-size:11px; margin-top:4px; min-height:0;"></div>';
        html += '</div>';
      }

      // Render Google OAuth connection section
      if (section.custom_after === 'google_oauth_section') {
        html += '<div id="googleOAuthSection" class="item-card" style="margin-bottom:10px; margin-top:4px;">';
        html += '<div class="item-card-header"><span class="item-card-title">Google Account</span><span class="tag" id="googleStatusBadge">loading...</span></div>';
        html += '<div id="googleStatusInfo" style="font-size:12px; color:var(--text-muted); margin:8px 0; line-height:1.6;"></div>';
        html += '<div style="display:flex; gap:8px; align-items:center; margin-top:8px;">';
        html += '<button class="btn btn-small" id="googleConnectBtn" onclick="connectGoogleAccount()" style="background:var(--accent); color:#0a0a0a; font-weight:600;">Connect Google Account</button>';
        html += '<button class="btn btn-small" id="googleTestBtn" onclick="testGoogleConnection()" style="display:none; color:var(--accent);">Test</button>';
        html += '<button class="btn btn-small btn-danger" id="googleDisconnectBtn" onclick="disconnectGoogleAccount()" style="display:none;">Disconnect</button>';
        html += '</div>';
        html += '<div id="googleTestResult" style="font-size:11px; margin-top:6px; min-height:0;"></div>';
        html += '</div>';
      }
    }
    html += '<div id="credMsg" class="success-text"></div>';
    container.innerHTML = html;

    // Load Google OAuth status
    loadGoogleStatus();
  }

  async function loadGoogleStatus() {
    try {
      var status = await api('/settings/google/status');
      var badge = document.getElementById('googleStatusBadge');
      var info = document.getElementById('googleStatusInfo');
      var connectBtn = document.getElementById('googleConnectBtn');
      var testBtn = document.getElementById('googleTestBtn');
      var disconnectBtn = document.getElementById('googleDisconnectBtn');

      if (status.connected) {
        if (badge) { badge.textContent = 'connected'; badge.style.background = 'rgba(79,209,197,0.2)'; badge.style.color = 'var(--accent)'; }
        if (info) info.innerHTML = 'Connected as <strong style="color:var(--accent);">' + status.email + '</strong>' + (status.connectedAt ? '<br>Since: ' + new Date(status.connectedAt).toLocaleDateString() : '');
        if (connectBtn) connectBtn.textContent = 'Reconnect';
        if (testBtn) testBtn.style.display = 'inline-block';
        if (disconnectBtn) disconnectBtn.style.display = 'inline-block';
      } else {
        if (badge) { badge.textContent = 'not connected'; badge.style.background = ''; badge.style.color = ''; }
        if (info) {
          if (!status.oauth_client_configured) {
            info.innerHTML = 'Google OAuth is not configured on this deployment. The system administrator needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.';
            if (connectBtn) { connectBtn.disabled = true; connectBtn.style.opacity = '0.4'; }
          } else {
            info.textContent = 'Click "Connect Google Account" to sign in with your Google account.';
          }
        }
        if (connectBtn) connectBtn.textContent = 'Connect Google Account';
        if (testBtn) testBtn.style.display = 'none';
        if (disconnectBtn) disconnectBtn.style.display = 'none';
      }
    } catch(e) {
      var info2 = document.getElementById('googleStatusInfo');
      if (info2) info2.textContent = 'Error loading status: ' + e.message;
    }
  }

  async function connectGoogleAccount() {
    try {
      var data = await api('/settings/google/auth-url');
      if (data.error) {
        var testResult = document.getElementById('googleTestResult');
        if (testResult) { testResult.style.color = '#ff6b6b'; testResult.textContent = data.error; }
        return;
      }
      // Open Google consent page in a popup
      var popup = window.open(data.auth_url, 'google_oauth', 'width=600,height=700,scrollbars=yes');
      // Listen for the callback message
      window.addEventListener('message', function handler(e) {
        if (e.data && e.data.type === 'google_oauth_complete') {
          window.removeEventListener('message', handler);
          if (e.data.success) {
            loadGoogleStatus();
            var msg = document.getElementById('credMsg');
            if (msg) { msg.textContent = 'Google account connected: ' + e.data.email; setTimeout(function(){ msg.textContent = ''; }, 5000); }
          }
        }
      });
    } catch(e) {
      var testResult2 = document.getElementById('googleTestResult');
      if (testResult2) { testResult2.style.color = '#ff6b6b'; testResult2.textContent = 'Error: ' + e.message; }
    }
  }

  async function testGoogleConnection() {
    var el = document.getElementById('googleTestResult');
    if (el) { el.style.color = 'var(--text-muted)'; el.textContent = 'Testing...'; }
    try {
      var result = await api('/settings/google/test', { method: 'POST' });
      if (el) {
        if (result.success) {
          el.style.color = 'var(--accent)';
          el.textContent = result.message;
        } else {
          el.style.color = '#ff6b6b';
          el.textContent = result.error || 'Test failed.';
        }
      }
    } catch(e) {
      if (el) { el.style.color = '#ff6b6b'; el.textContent = 'Error: ' + e.message; }
    }
  }

  async function disconnectGoogleAccount() {
    if (!confirm('Disconnect your Google account? Karna will lose access to Sheets, Calendar, and Docs.')) return;
    try {
      await api('/settings/google/disconnect', { method: 'POST' });
      loadGoogleStatus();
      var msg = document.getElementById('credMsg');
      if (msg) { msg.textContent = 'Google account disconnected.'; setTimeout(function(){ msg.textContent = ''; }, 3000); }
    } catch(e) {}
  }

  async function saveCred(service) {
    const input = document.getElementById('cred_' + service);
    if (!input || !input.value.trim()) return;
    await api('/settings/credentials', {
      method: 'PUT',
      body: JSON.stringify({ service, value: input.value.trim() }),
    });
    input.value = '';
    renderSettingsTab();
    const msg = $('#credMsg');
    if (msg) { msg.textContent = 'Credential saved'; setTimeout(() => msg.textContent = '', 2000); }
  }

  async function deleteCred(service) {
    await api('/settings/credentials/' + service, { method: 'DELETE' });
    renderSettingsTab();
  }

  async function validateCred(service) {
    var el = document.getElementById('credValidation_' + service);
    if (el) { el.innerHTML = '<span style="color:var(--text-muted);">Testing...</span>'; }
    
    // For validation of stored keys, we need to decrypt server-side
    // Send the service name — backend reads the stored encrypted value
    var input = document.getElementById('cred_' + service);
    var value = input && input.value.trim() ? input.value.trim() : null;
    
    if (!value) {
      // Validate the already-stored key by passing a special flag
      if (el) { el.innerHTML = '<span style="color:var(--text-muted);">Enter a key to test, or save first.</span>'; }
      return;
    }

    try {
      var result = await api('/settings/credentials/validate', {
        method: 'POST',
        body: JSON.stringify({ service: service, value: value }),
      });
      if (el) {
        if (result.valid) {
          el.innerHTML = '<span style="color:var(--accent);">✓ ' + escapeHtml(result.message) + '</span>';
        } else {
          el.innerHTML = '<span style="color:#f56565;">✗ ' + escapeHtml(result.message) + '</span>';
        }
        setTimeout(function() { if (el) el.innerHTML = ''; }, 5000);
      }
    } catch (err) {
      if (el) { el.innerHTML = '<span style="color:#f56565;">✗ Validation request failed</span>'; }
    }
  }

  async function renderSchedulesTab(container) {
    const data = await api('/settings/schedules');
    const schedules = data.schedules || [];

    if (schedules.length === 0) {
      container.innerHTML = '<div style="color:var(--text-muted); font-size:13px;">No scheduled tasks. Tell your assistant to remind you about something in the chat.</div>';
      return;
    }

    let html = '';
    for (const job of schedules) {
      const config = JSON.parse(job.action_config || '{}');
      var stateColors = { created: '#888', active: '#4fd1c5', reminding: '#f6ad55', paused: '#a0aec0', completed: '#68d391' };
      var stateColor = stateColors[job.state] || '#888';
      html += \`
        <div class="item-card">
          <div class="item-card-header">
            <span class="item-card-title">\${escapeHtml(job.name)}</span>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="tag" style="background:rgba(255,255,255,0.04); color:\${stateColor}; border:1px solid \${stateColor}33;">\${job.state || 'active'}</span>
              <label class="toggle">
                <input type="checkbox" \${job.enabled ? 'checked' : ''} onchange="toggleSchedule(\${job.id}, this.checked)">
                <div class="toggle-track"></div>
                <div class="toggle-thumb"></div>
              </label>
              <button class="btn btn-small btn-danger" onclick="deleteSchedule(\${job.id})">×</button>
            </div>
          </div>
          <div class="item-card-body">
            \${job.schedule_type === 'interval' ? 'Every ' + job.schedule_value + ' min' : 'Daily at ' + job.schedule_value}
            · \${escapeHtml(job.action_type)}
          </div>
          \${config.description ? '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>' : ''}
          \${job.next_run ? '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>' : ''}
          \${job.last_run ? '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>' : ''}
        </div>
      \`;
    }
    container.innerHTML = html;
  }

  async function toggleSchedule(id, enabled) {
    await api('/settings/schedules/' + id + '/toggle', {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    });
  }

  async function deleteSchedule(id) {
    await api('/settings/schedules/' + id, { method: 'DELETE' });
    renderSettingsTab();
  }

  async function renderMemoryTab(container) {
    const data = await api('/settings/memory');
    const memories = data.memories || [];

    if (memories.length === 0) {
      container.innerHTML = '<div style="color:var(--text-muted); font-size:13px;">No memories stored yet. As you chat, important information will be remembered.</div>';
      return;
    }

    let html = '<div style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">Working memory is always in context. Long-term memory is searched on demand.</div>';
    for (const mem of memories) {
      var tierColor = mem.tier === 'working' ? 'rgba(79,209,197,0.2)' : 'rgba(255,255,255,0.06)';
      var tierTextColor = mem.tier === 'working' ? 'var(--accent)' : 'var(--text-muted)';
      html += \`
        <div class="item-card">
          <div class="item-card-header">
            <span class="item-card-title">\${escapeHtml(mem.title)}</span>
            <div style="display:flex; gap:6px; align-items:center;">
              <span class="tag" style="background:\${tierColor}; color:\${tierTextColor};">\${mem.tier === 'working' ? 'active' : 'archive'}</span>
              <span class="tag">\${mem.type}</span>
              <span class="tag" style="font-size:10px;">★\${mem.importance}</span>
              <button class="btn btn-small btn-danger" onclick="deleteMemory(\${mem.id})">×</button>
            </div>
          </div>
          <div class="item-card-body">\${escapeHtml(mem.content)}</div>
        </div>
      \`;
    }
    container.innerHTML = html;
  }

  async function deleteMemory(id) {
    await api('/settings/memory/' + id, { method: 'DELETE' });
    renderSettingsTab();
  }

  async function renderErrorsTab(container) {
    const data = await api('/settings/errors');
    const errors = data.errors || [];

    if (errors.length === 0) {
      container.innerHTML = '<div style="color:var(--text-muted); font-size:13px;">No errors logged. System running clean.</div>';
      return;
    }

    var html = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">';
    html += '<span style="font-size:11px; color:var(--text-muted);">' + errors.length + ' error(s)</span>';
    html += '<button class="btn btn-small" onclick="clearErrors()">Clear All</button>';
    html += '</div>';

    for (var i = 0; i < errors.length; i++) {
      var err = errors[i];
      var srcColor = err.source === 'llm' ? '#f56565' : err.source === 'cron' ? '#f6ad55' : '#a0aec0';
      html += '<div class="item-card" style="margin-bottom:8px">';
      html += '<div class="item-card-header">';
      html += '<span class="item-card-title" style="font-size:12px;">' + escapeHtml(err.error_type) + '</span>';
      html += '<div style="display:flex; gap:6px; align-items:center;">';
      html += '<span class="tag" style="color:' + srcColor + ';">' + escapeHtml(err.source) + '</span>';
      html += '<span class="tag" style="font-size:10px;">' + (err.created_at || '').split('T')[0] + '</span>';
      html += '</div></div>';
      html += '<div class="item-card-body" style="font-size:12px; font-family:var(--font-mono); word-break:break-all;">' + escapeHtml(err.message.substring(0, 200)) + '</div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  async function clearErrors() {
    await api('/settings/errors', { method: 'DELETE' });
    renderSettingsTab();
  }

  // === Init ===
  loadSession();
  if (state.session) {
    // Validate session
    api('/auth/me').then(data => {
      if (data.error) {
        clearSession();
        render();
      } else {
        render();
      }
    });
  } else {
    render();
  }

  // Keyboard shortcuts
  document.onkeydown = (e) => {
    if (e.key === 'Escape') toggleOverlay(null);
  };
  </script>
</body>
</html>`;
}

// Cron handler for Cloudflare Workers scheduled events
export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
    // Execute due cron jobs
    const now = new Date().toISOString();
    
    try {
      // Record heartbeat
      await env.DB.prepare(
        `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
      ).bind('ok', 0, JSON.stringify({ event: 'cron_tick', trigger: event.cron })).run();

      // Find and execute due jobs
      const dueJobs = await env.DB.prepare(
        `SELECT cj.*, u.name as user_name, u.telegram_chat_id 
         FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
         WHERE cj.enabled = 1 AND cj.next_run <= ?`
      ).bind(now).all();

      for (const job of (dueJobs.results || [])) {
        const currentTime = new Date();
        let nextRun: Date;

        if (job.schedule_type === 'interval') {
          const minutes = parseInt(job.schedule_value, 10);
          nextRun = new Date(currentTime.getTime() + minutes * 60 * 1000);
        } else if (job.schedule_type === 'daily') {
          const [hours, mins] = job.schedule_value.split(':').map(Number);
          nextRun = new Date(currentTime);
          nextRun.setUTCHours(hours, mins, 0, 0);
          if (nextRun <= currentTime) nextRun.setDate(nextRun.getDate() + 1);
        } else {
          nextRun = new Date(currentTime.getTime() + 60 * 60 * 1000);
        }

        // Update job
        await env.DB.prepare(
          `UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(now, nextRun.toISOString(), job.id).run();

        // Store notification
        const config = JSON.parse(job.action_config || '{}');
        const notificationText = '⏰ Scheduled: **' + job.name + '**\n' + (config.description || job.description || '');

        await env.DB.prepare(
          `INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)`
        ).bind(job.user_id, 'system', 'assistant', notificationText, JSON.stringify({ type: 'cron', job_id: job.id })).run();
      }
    } catch (err) {
      console.error('Cron execution error:', err);
      await env.DB.prepare(
        `INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)`
      ).bind('error', 0, JSON.stringify({ error: String(err) })).run();
    }
  }
};
