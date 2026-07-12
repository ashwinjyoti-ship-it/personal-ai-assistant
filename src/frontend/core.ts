// core — Karna frontend section
export function getCoreScript(): string {
  return `  // === Karna v3.1 Frontend ===
  // API base: same-origin by default; set window.__KARNA_API_BASE__ (injected by
  // the server from API_BASE_URL) to call the backend on another origin (Render).
  var API_ORIGIN = (typeof window !== 'undefined' && window.__KARNA_API_BASE__) ? String(window.__KARNA_API_BASE__).replace(/\\/$/, '') : '';
  var API = API_ORIGIN + '/api';

  // Phase D: Telegram webhook targets the backend host (Render when API_BASE_URL is set),
  // not the Cloudflare Pages origin. Same base as API calls.
  function getTelegramWebhookUrl() {
    var base = API_ORIGIN || (typeof window !== 'undefined' ? window.location.origin : '');
    return String(base).replace(/\\/$/, '') + '/api/telegram/webhook';
  }

  // Keep the phone awake while Karna is actively working (chat streaming,
  // browser tasks, voice sessions). Without it, mobile screens sleep mid-task
  // and the OS suspends the tab, killing the SSE stream.
  //
  // Two mechanisms run together because neither covers every device:
  //  1. Screen Wake Lock API — the correct API; reliable on Android/desktop
  //     Chrome and usually on modern iOS Safari.
  //  2. A muted, looping, inline <video> fed by a canvas MediaStream — the
  //     long-standing iOS fallback (the "NoSleep" trick). iOS treats active
  //     inline video playback as a reason to keep the screen on even when the
  //     Wake Lock API silently no-ops (common in home-screen PWAs). No external
  //     media file — the stream is generated locally, so nothing can 404 or
  //     decode-fail.
  // Everything is best-effort and wrapped so an unsupported API never throws.
  var _wakeLock = null;
  var _wakeLockWanted = false;
  var _wakeVideo = null;
  var _wakeCanvasTimer = null;

  async function _requestWakeLock() {
    if (!('wakeLock' in navigator) || _wakeLock) return;
    try {
      _wakeLock = await navigator.wakeLock.request('screen');
      _wakeLock.addEventListener('release', function() { _wakeLock = null; });
    } catch (e) { _wakeLock = null; }
  }

  function _startWakeVideo() {
    if (_wakeVideo) return;
    try {
      var canvas = document.createElement('canvas');
      canvas.width = 2; canvas.height = 2;
      var ctx = canvas.getContext('2d');
      if (!canvas.captureStream) return;
      var stream = canvas.captureStream(2);
      // Keep the stream producing frames — a static canvas can let iOS treat
      // the video as ended/idle.
      var on = false;
      _wakeCanvasTimer = setInterval(function() {
        on = !on;
        ctx.fillStyle = on ? '#000001' : '#000000';
        ctx.fillRect(0, 0, 2, 2);
      }, 1000);
      var v = document.createElement('video');
      v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
      v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
      v.setAttribute('autoplay', ''); v.loop = true;
      v.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:-1';
      v.srcObject = stream;
      document.body.appendChild(v);
      var p = v.play();
      if (p && p.catch) p.catch(function() {});
      _wakeVideo = v;
    } catch (e) { _wakeVideo = null; }
  }

  function _stopWakeVideo() {
    if (_wakeCanvasTimer) { clearInterval(_wakeCanvasTimer); _wakeCanvasTimer = null; }
    if (_wakeVideo) {
      try {
        _wakeVideo.pause();
        if (_wakeVideo.srcObject) {
          _wakeVideo.srcObject.getTracks().forEach(function(t) { t.stop(); });
        }
        _wakeVideo.remove();
      } catch (e) { /* ignore */ }
      _wakeVideo = null;
    }
  }

  function _engageWake() {
    _wakeLockWanted = true;
    _requestWakeLock();
    _startWakeVideo();
  }
  function _disengageWake() {
    _wakeLockWanted = false;
    if (_wakeLock) {
      try { _wakeLock.release(); } catch (e) { /* already released */ }
      _wakeLock = null;
    }
    _stopWakeVideo();
  }

  // Reference-counted so the wake lock is held for the union of every in-flight
  // task app-wide, not just one. Each task calls acquireWakeLock() on start and
  // releaseWakeLock() on finish; the screen stays awake while the count is > 0.
  // Release is debounced by ~1.5s so back-to-back tasks (or the brief gap
  // between an SSE stream ending and a resume starting) don't tear the video
  // down and rebuild it.
  var _taskCount = 0;
  var _releaseTimer = null;
  function acquireWakeLock() {
    _taskCount++;
    if (_releaseTimer) { clearTimeout(_releaseTimer); _releaseTimer = null; }
    _engageWake();
  }
  function releaseWakeLock() {
    _taskCount = Math.max(0, _taskCount - 1);
    if (_taskCount > 0) return;
    if (_releaseTimer) clearTimeout(_releaseTimer);
    _releaseTimer = setTimeout(function() {
      _releaseTimer = null;
      if (_taskCount === 0) _disengageWake();
    }, 1500);
  }

  // The OS drops the Wake Lock (and can pause the video) when the tab is
  // hidden; re-acquire both when it returns to the foreground if work is still
  // in progress.
  function _reacquireIfWanted() {
    if (!_wakeLockWanted) return;
    _requestWakeLock();
    if (_wakeVideo) { var p = _wakeVideo.play(); if (p && p.catch) p.catch(function() {}); }
    else _startWakeVideo();
  }
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') _reacquireIfWanted();
  });
  window.addEventListener('focus', _reacquireIfWanted);

  var state = {
    session: null,
    messages: [],
    loading: false,
    activeOverlay: null,
    settingsTab: 'profile',
    settingsSection: null,
    prevView: 'home',
    threads: [],
    activeThreadId: null,
    view: 'home',
    assistantName: 'Karna',
    pendingFiles: [],
    selectMode: false,
    selectedThreadIds: {},
    abortController: null,
    activeRunId: null,
    resumeInProgress: false,
    streamSession: 0,
    memoryReviewFilter: 'all',
    memoryReviewSearch: '',
    memoryTypeFilter: 'all',
    documentLibrarySearch: '',
    pendingDashMessage: null,
  };

  function messagePlaceholder() {
    return 'Message ' + (state.assistantName || 'Karna') + '\u2026';
  }

  function updateMessagePlaceholders() {
    var ph = messagePlaceholder();
    var dash = document.getElementById('dashInputField');
    var chat = document.getElementById('inputField');
    if (dash) dash.setAttribute('data-placeholder', ph);
    if (chat) chat.setAttribute('data-placeholder', ph);
  }

  function applyAssistantName(name) {
    if (name) state.assistantName = name;
    updateMessagePlaceholders();
    var sub = document.querySelector('.dash-subtitle');
    if (sub) sub.textContent = 'Here\u2019s what\u2019s happening with ' + (state.assistantName || 'Karna');
  }

  // === Utility ===
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }
  
  async function api(path, options) {
    options = options || {};
    var headers = { 'Content-Type': 'application/json' };
    if (options.headers) { for (var k in options.headers) { headers[k] = options.headers[k]; } }
    if (state.session && state.session.sessionId) {
      headers['Authorization'] = 'Bearer ' + state.session.sessionId;
    }
    // App-wide wake lock: any request still pending after 400ms counts as a
    // "task" and holds the screen awake until it settles. Fast calls (light
    // navigation, quick polls) never engage it, so the screen still sleeps when
    // the app is idle. Streaming chat and voice hold the lock explicitly since
    // they outlive a single request.
    var _wakeEngaged = false;
    var _wakeTimer = setTimeout(function() { _wakeEngaged = true; acquireWakeLock(); }, 400);
    try {
      var res = await fetch(API + path, { method: options.method || 'GET', headers: headers, body: options.body });
      var text = await res.text();
      try { return JSON.parse(text); } catch(e) { return { error: 'Non-JSON response (' + res.status + '): ' + text.substring(0, 100) }; }
    } finally {
      clearTimeout(_wakeTimer);
      if (_wakeEngaged) releaseWakeLock();
    }
  }

  function saveSession(d) {
    state.session = d;
    if (d && d.user && d.user.assistant_name) applyAssistantName(d.user.assistant_name);
    try {
      localStorage.setItem('karna_session', JSON.stringify(d));
      if (d && d.user && d.user.username) localStorage.setItem('karna_last_username', d.user.username);
    } catch(e) {}
  }
  function loadSession() {
    try {
      var s = localStorage.getItem('karna_session');
      if (s) {
        var parsed = JSON.parse(s);
        if (parsed && typeof parsed === 'object') {
          state.session = parsed;
          if (parsed.user && parsed.user.assistant_name) state.assistantName = parsed.user.assistant_name;
        }
      }
    } catch(e) { try { localStorage.removeItem('karna_session'); } catch(e2) {} }
  }
  function clearSession() {
    var key = viewStateKey();
    state.session = null;
    clearActiveThreadId();
    try { localStorage.removeItem('karna_session'); } catch(e) {}
    try { if (key) sessionStorage.removeItem(key); } catch(e) {}
  }

  function activeThreadStorageKey() {
    var u = state.session && state.session.user && state.session.user.username;
    return u ? 'karna_active_thread_' + u : null;
  }
  function setActiveThreadId(id) {
    var n = typeof id === 'number' ? id : parseInt(id, 10);
    if (!n || isNaN(n)) return;
    state.activeThreadId = n;
    try {
      var key = activeThreadStorageKey();
      if (key) sessionStorage.setItem(key, String(n));
    } catch(e) {}
  }
  function restoreActiveThreadId() {
    try {
      var key = activeThreadStorageKey();
      if (!key) return;
      var stored = sessionStorage.getItem(key);
      if (stored) {
        var n = parseInt(stored, 10);
        if (n && !isNaN(n)) state.activeThreadId = n;
      }
    } catch(e) {}
  }
  function clearActiveThreadId() {
    state.activeThreadId = null;
    try {
      var key = activeThreadStorageKey();
      if (key) sessionStorage.removeItem(key);
    } catch(e) {}
  }

  function viewStateKey() {
    var u = state.session && state.session.user && state.session.user.username;
    return u ? 'karna_view_' + u : null;
  }
  function saveViewState() {
    try {
      var key = viewStateKey();
      if (!key) return;
      sessionStorage.setItem(key, JSON.stringify({ view: state.view, settingsSection: state.settingsSection || null }));
    } catch(e) {}
  }
  function restoreViewState() {
    try {
      var key = viewStateKey();
      if (!key) return;
      var raw = sessionStorage.getItem(key);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved && saved.view) {
        state.view = saved.view;
        if (saved.settingsSection) state.settingsSection = saved.settingsSection;
      }
    } catch(e) {}
  }

  function showToast(msg, type) {
    var c = document.getElementById('toasts');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 3000);
  }

  function parseMdTableCells(line) {
    return line.trim().replace(/^\\|/, '').replace(/\\|$/, '').split('|').map(function(c) { return c.trim(); });
  }

  function isMdTableSeparator(line) {
    return /^\\|[\\s\\-:|]+\\|$/.test((line || '').trim());
  }

  function parseMdTables(s) {
    var lines = s.split('\\n');
    var out = [];
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (line.trim().charAt(0) === '|' && i + 1 < lines.length && isMdTableSeparator(lines[i + 1])) {
        var headers = parseMdTableCells(line);
        i += 2;
        var html = '<table><thead><tr>';
        for (var h = 0; h < headers.length; h++) html += '<th>' + headers[h] + '</th>';
        html += '</tr></thead><tbody>';
        while (i < lines.length && lines[i].trim().charAt(0) === '|' && !isMdTableSeparator(lines[i])) {
          var cells = parseMdTableCells(lines[i]);
          html += '<tr>';
          for (var c = 0; c < cells.length; c++) html += '<td>' + cells[c] + '</td>';
          html += '</tr>';
          i++;
        }
        html += '</tbody></table>';
        out.push(html);
      } else {
        out.push(line);
        i++;
      }
    }
    return out.join('\\n');
  }

  function isMdBlockLine(line) {
    return /^<[/]?(?:h[1-6]|ul|ol|li|pre|hr|table|thead|tbody|tr|p)\\b/.test(line || '');
  }

  // Simple markdown to HTML with auto-linkification
  function md(text) {
    if (!text) return '';
    var s = text;
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^)]+)\\)/g, function(m, label, url) { return linkify(url, label); });
    s = s.replace(/(?<!href=["'])(?<!">)(https?:\\/\\/[^\\s<"'\\)]+)/g, function(url) { return linkify(url); });
    s = s.replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');
    s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
    s = s.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    s = s.replace(/(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)/g, '<em>$1</em>');
    s = parseMdTables(s);
    // Headings — must run before list processing so #-prefixed lines aren't misread
    s = s.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
    s = s.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
    s = s.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
    s = s.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    s = s.replace(/^---+$/gm, '<hr>');
    s = s.replace(/^\\d+\\. (.+)$/gm, '<li data-ol="1">$1</li>');
    s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    var lines = s.split('\\n');
    var result = [];
    var inList = false;
    var inOrderedList = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.indexOf('<li data-ol="1">') === 0) {
        if (inList) { result.push('</ul>'); inList = false; }
        if (!inOrderedList) { result.push('<ol>'); inOrderedList = true; }
        result.push(line.replace(' data-ol="1"', ''));
      } else if (line.indexOf('<li>') === 0) {
        if (inOrderedList) { result.push('</ol>'); inOrderedList = false; }
        if (!inList) { result.push('<ul>'); inList = true; }
        result.push(line);
      } else {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOrderedList) { result.push('</ol>'); inOrderedList = false; }
        if (!line.trim()) continue;
        result.push(line);
      }
    }
    if (inList) result.push('</ul>');
    if (inOrderedList) result.push('</ol>');

    var blocks = [];
    var paraBuf = [];
    for (var k = 0; k < result.length; k++) {
      var ln = result[k];
      if (isMdBlockLine(ln)) {
        if (paraBuf.length) {
          blocks.push('<p>' + paraBuf.join('<br>') + '</p>');
          paraBuf = [];
        }
        blocks.push(ln);
      } else {
        paraBuf.push(ln);
      }
    }
    if (paraBuf.length) blocks.push('<p>' + paraBuf.join('<br>') + '</p>');
    return blocks.join('');
  }

  function linkify(url, label) {
    var clean = url.replace(/&amp;/g, '&');
    var icon = ''; var cls = 'msg-link';
    if (clean.match(/youtube\\.com\\/watch|youtu\\.be\\//)) { icon = '<span class="link-icon yt-icon">&#9654;</span>'; cls += ' yt-link'; if (!label) { var vid = clean.match(/[?&]v=([^&]+)/); label = vid ? 'YouTube Video' : 'YouTube'; } }
    else if (clean.match(/google\\.com\\/maps|maps\\.google/)) { icon = '<span class="link-icon map-icon">&#128205;</span>'; cls += ' map-link'; if (!label) label = 'Google Maps'; }
    else if (clean.match(/docs\\.google\\.com\\/spreadsheets/)) { icon = '<span class="link-icon">&#128196;</span>'; if (!label) label = 'Google Sheet'; }
    else if (clean.match(/docs\\.google\\.com\\/document/)) { icon = '<span class="link-icon">&#128196;</span>'; if (!label) label = 'Google Doc'; }
    if (!label) label = clean.length > 60 ? clean.substring(0, 57) + '...' : clean;
    return '<a href="' + clean + '" target="_blank" rel="noopener" class="' + cls + '">' + icon + label + '</a>';
  }

  function navigateToChatWithPendingMessage(text) {
    state.pendingDashMessage = (text || '').trim();
    if (!state.pendingDashMessage) return;
    state.view = 'chat';
    renderView();
  }

  function escapeHtml(text) { var d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
  function mdToPlain(text) {
    if (!text) return '';
    try {
      var linkRe = new RegExp('\\\\[([^\\\\]]+)\\\\]\\\\([^)]+\\\\)', 'g');
      var tickRe = new RegExp(String.fromCharCode(96) + '(.+?)' + String.fromCharCode(96), 'g');
      var headRe = new RegExp('^#{1,6}\\\\s+', 'gm');
      var boldRe = new RegExp('\\\\*\\\\*(.+?)\\\\*\\\\*', 'g');
      var italicRe = new RegExp('\\\\*(.+?)\\\\*', 'g');
      var bulletRe = new RegExp('^[-*]\\\\s+', 'gm');
      var numRe = new RegExp('^\\\\d+\\\\.\\\\s+', 'gm');
      var hrRe = new RegExp('^\\\\s*---+\\\\s*$', 'gm');
      var bullet = String.fromCharCode(8226) + ' ';
      return text
        .replace(headRe, '')
        .replace(boldRe, '$1')
        .replace(italicRe, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        .replace(tickRe, '$1')
        .replace(bulletRe, bullet)
        .replace(numRe, '')
        .replace(hrRe, '')
        .replace(linkRe, '$1')
        .replace(/\\n{3,}/g, '\\n\\n')
        .trim();
    } catch(e) {
      return text.replace(/[#*_~\[\]()]/g, '').trim();
    }
  }

  window.addEventListener('error', function(e) {
    console.error('Karna runtime error:', e.error || e.message);
    var app = document.getElementById('app');
    if (app && app.children.length === 0) {
      app.innerHTML = '<div style="height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#F3EBE2;color:#8C8175;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;">' +
        '<div style="font-size:18px;color:#2A2521;font-weight:600;">Something went wrong</div>' +
        '<div style="font-size:13px;">Please refresh the page. If this persists, clear your browser cache.</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:10px 20px;background:#C97A52;color:#fff;border:none;border-radius:9999px;cursor:pointer;font-size:13px;font-weight:600;">Refresh</button>' +
        '</div>';
    }
  });
`;
}
