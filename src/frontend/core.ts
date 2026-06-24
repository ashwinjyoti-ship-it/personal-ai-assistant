// core — Karna frontend section
export function getCoreScript(): string {
  return `  // === Karna v3.1 Frontend ===
  // API base: same-origin by default; set window.__KARNA_API_BASE__ (injected by
  // the server from API_BASE_URL) to call the backend on another origin (Render).
  var API_ORIGIN = (typeof window !== 'undefined' && window.__KARNA_API_BASE__) ? String(window.__KARNA_API_BASE__).replace(/\\/$/, '') : '';
  var API = API_ORIGIN + '/api';
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
    gmailUnread: 0,
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
    if (dash) dash.placeholder = ph;
    if (chat) chat.placeholder = ph;
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
    var res = await fetch(API + path, { method: options.method || 'GET', headers: headers, body: options.body });
    var text = await res.text();
    try { return JSON.parse(text); } catch(e) { return { error: 'Non-JSON response (' + res.status + '): ' + text.substring(0, 100) }; }
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
    state.session = null;
    clearActiveThreadId();
    try { localStorage.removeItem('karna_session'); } catch(e) {}
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

    // Wrap plain text runs in paragraphs for readable document flow
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
