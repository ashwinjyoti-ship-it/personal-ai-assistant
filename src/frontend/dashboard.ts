// dashboard — Karna frontend section
import { getVoiceDockHtml } from './voice';

export function getDashboardScript(): string {
  return `  // ============================================================
  // DASHBOARD
  // ============================================================

  function renderDashInputArea() {
    return '<div class="input-anchor">' +
      '<input type="file" id="dashFileInput" style="display:none" multiple>' +
      '<div id="dashFileChips" class="file-chips" style="display:none"></div>' +
      ${JSON.stringify(getVoiceDockHtml())} +
      '<div class="input-pill">' +
        '<button type="button" class="attach-btn" id="dashAttachBtn" title="Attach file" aria-label="Attach file" tabindex="-1">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<div contenteditable="true" class="text-input" id="dashInputField" role="textbox" data-placeholder="' + escapeHtml(messagePlaceholder()) + '" enterkeyhint="send" autocorrect="off"></div>' +
        '<button type="button" class="send-btn" id="dashSendBtn" title="Send" aria-label="Send" tabindex="-1">&#10148;</button>' +
      '</div>' +
    '</div>';
  }

  function renderDashFileChips() {
    var container = document.getElementById('dashFileChips');
    if (!container) return;
    if (state.pendingFiles.length === 0) { container.style.display = 'none'; container.innerHTML = ''; return; }
    container.style.display = 'flex';
    var html = '';
    for (var i = 0; i < state.pendingFiles.length; i++) {
      var f = state.pendingFiles[i];
      var sizeKb = Math.round(f.size / 1024);
      var sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';
      html += '<div class="file-chip"><span>&#128196;</span> ' + escapeHtml(f.name) + ' (' + sizeStr + ')<button onclick="dashRemoveFile(' + i + ')">\\u00d7</button></div>';
    }
    container.innerHTML = html;
  }

  window.dashRemoveFile = function(index) {
    state.pendingFiles.splice(index, 1);
    renderDashFileChips();
  };

  function bindDashInput() {
    var dashInput = document.getElementById('dashInputField');
    var dashSend = document.getElementById('dashSendBtn');
    var dashAttach = document.getElementById('dashAttachBtn');
    var dashFileInput = document.getElementById('dashFileInput');
    if (!dashInput || !dashSend) return;
    dashInput.onkeydown = function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        dashChatSend();
      }
    };
    dashSend.onclick = dashChatSend;
    if (dashAttach && dashFileInput) {
      dashAttach.onclick = function() { dashFileInput.click(); };
      dashFileInput.onchange = function(e) {
        var files = e.target.files;
        if (!files || files.length === 0) return;
        for (var i = 0; i < files.length; i++) { state.pendingFiles.push(files[i]); }
        renderDashFileChips();
        e.target.value = '';
      };
    }
    if (typeof bindVoiceControls === 'function') bindVoiceControls();
  }

  function dashChatSend() {
    var dashInput = document.getElementById('dashInputField');
    if (!dashInput) return;
    var text = (dashInput.innerText || '').trim();
    if (!text) {
      dashInput.focus();
      return;
    }
    dashInput.textContent = '';
    navigateToChatWithPendingMessage(text);
  }

  async function renderDashboard(container) {
    container.innerHTML = '<div class="dash-page">' +
      '<div class="chat-area"><div class="dashboard dashboard--minimal" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading home...</div></div></div>' +
      renderDashInputArea() +
    '</div>';
    bindDashInput();
    updateMessagePlaceholders();

    function pickRandom(arr, storageKey) {
      var last = parseInt(localStorage.getItem(storageKey) || '-1', 10);
      var idx = Math.floor(Math.random() * arr.length);
      if (arr.length > 1 && idx === last) { idx = (idx + 1) % arr.length; }
      localStorage.setItem(storageKey, String(idx));
      return arr[idx];
    }
    function formatTimeShort(d) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    function slotActive(slots, hour, day) {
      for (var i = 0; i < slots.length; i++) {
        var s = slots[i];
        if (s === 'any') return true;
        if (s === 'deep_night' && hour < 5) return true;
        if (s === 'early_morning' && hour >= 5 && hour < 8) return true;
        if (s === 'morning' && hour >= 5 && hour < 12) return true;
        if (s === 'midday' && hour >= 11 && hour < 14) return true;
        if (s === 'post_lunch' && hour >= 13 && hour < 15) return true;
        if (s === 'afternoon' && hour >= 12 && hour < 17) return true;
        if (s === 'afternoon_slump' && hour >= 14 && hour < 17) return true;
        if (s === 'dusk' && hour >= 17 && hour < 20) return true;
        if (s === 'evening' && hour >= 17 && hour < 22) return true;
        if (s === 'late_night' && hour >= 21) return true;
        if (s === 'night' && (hour >= 22 || hour < 5)) return true;
        if (s === 'monday_morning' && day === 1 && hour >= 5 && hour < 12) return true;
        if (s === 'friday_evening' && day === 5 && hour >= 17 && hour < 22) return true;
        if (s === 'saturday_afternoon' && day === 6 && hour >= 12 && hour < 17) return true;
      }
      return false;
    }
    function recordVisitPattern(hour) {
      var key = 'karna_visit_hours';
      var raw = localStorage.getItem(key);
      var hours = raw ? JSON.parse(raw) : [];
      var pattern = null;
      if (hours.length >= 3) {
        var sum = 0;
        for (var vi = 0; vi < hours.length; vi++) sum += hours[vi];
        var avg = sum / hours.length;
        if (hour < avg - 2) pattern = 'early';
        else if (hours.length >= 5 && Math.abs(hour - avg) <= 1) pattern = 'ritual';
      }
      hours.push(hour);
      if (hours.length > 12) hours = hours.slice(-12);
      localStorage.setItem(key, JSON.stringify(hours));
      return pattern;
    }
    function buildGreetingCandidates(firstName, now, pattern) {
      var hour = now.getHours();
      var day = now.getDay();
      var timeStr = formatTimeShort(now);
      var fn = firstName;
      var list = [];
      function add(slots, text) {
        if (slotActive(slots, hour, day)) list.push(text);
      }
      if (hour >= 5 && hour < 12) {
        var mornSuffix = fn ? ', ' + fn + '.' : '.';
        add(['morning'], 'Good morning' + mornSuffix);
        add(['morning'], 'Morning' + (fn ? ', ' + fn + '.' : '.'));
        add(['morning'], 'Good morning. You\\'re up early.');
        add(['morning'], 'Morning. The day\\'s already moving.');
        add(['morning'], 'Good morning. Let\\'s make it count.');
        add(['morning'], 'Morning' + (fn ? ', ' + fn : '') + '. Something\\'s already brewing.');
        add(['morning'], 'Good morning. The world didn\\'t wait \\u2014 neither did I.');
      }
      if (hour >= 12 && hour < 17) {
        add(['afternoon'], 'Good afternoon' + (fn ? ', ' + fn + '.' : '.'));
      }
      if (hour >= 17 && hour < 22) {
        add(['evening'], 'Good evening' + (fn ? ', ' + fn + '.' : '.'));
      }
      if (hour >= 22 || hour < 5) {
        add(['night'], 'Still up' + (fn ? ', ' + fn + '?' : '?'));
        add(['night'], 'Night session' + (fn ? ', ' + fn + '.' : '.'));
      }
      add(['early_morning'], timeStr + ' and you\\'re here? Either inspired or insomniac. I respect both.');
      add(['midday'], 'Noon. Peak energy time. Let\\'s do something worth doing.');
      add(['late_night'], timeStr + '. The thinking hours. What\\'s on your mind?');
      add(['deep_night'], '3 AM thoughts hitting different, aren\\'t they? I\\'m here for it.');
      add(['monday_morning'], 'Monday morning. We\\'ve got this. (Probably.)');
      add(['friday_evening'], 'Friday evening vibes. Work\\'s done, let\\'s make something instead.');
      add(['any'], 'You\\'re back. Did the algorithm miss you, or did you miss yourself?');
      add(['afternoon_slump', 'late_night', 'deep_night'], 'It\\'s ' + timeStr + '. Your brain\\'s probably running on fumes. Good thing I\\'m here.');
      add(['night', 'late_night'], 'That hour when you\\'re too awake to sleep and too tired to think. Perfect time to build something.');
      add(['early_morning'], 'Sunrise hours. Fresh mind, no inbox noise yet. Golden window.');
      add(['post_lunch'], 'Post-lunch dip. Coffee\\'s kicking in. Let\\'s move.');
      add(['saturday_afternoon'], 'Saturday afternoon. No meetings. Just us and the work.');
      add(['dusk'], 'That witching hour between day and night. Liminal space thinking\\u2014my favorite.');
      if (pattern === 'early') add(['any'], 'You\\'re here earlier than usual. Plot twist incoming?');
      if (pattern === 'ritual') add(['any'], 'Same time, same place. Becoming a ritual. I dig it.');
      return list.length ? list : ['Hey' + (fn ? ', ' + fn : '') + '.'];
    }
    function buildStatusCandidates(hour) {
      var STATUS_LINES = [
        { slots: ['morning', 'midday'], text: 'Ruby is caffeinated.' },
        { slots: ['any'], text: 'Ruby is in a good mood. Use it.' },
        { slots: ['any'], text: 'Ruby has opinions today.' },
        { slots: ['morning'], text: 'Ruby slept well. Let\\'s go.' },
        { slots: ['any'], text: 'Ruby is sharp and slightly impatient.' },
        { slots: ['morning', 'afternoon'], text: 'Ruby is warmed up.' },
        { slots: ['any'], text: 'Ruby is feeling dangerous.' },
        { slots: ['any'], text: 'Ruby is dialed in.' },
        { slots: ['morning'], text: 'Ruby woke up before you.' },
        { slots: ['any'], text: 'Ruby is running hot.' },
        { slots: ['any'], text: 'Ruby is ready to move.' },
        { slots: ['afternoon', 'evening'], text: 'Ruby is on the clock.' },
        { slots: ['any'], text: 'Ruby is here. What needs doing?' },
        { slots: ['any'], text: 'Ruby is locked in.' },
        { slots: ['night', 'late_night'], text: 'Ruby doesn\\'t sleep either.' },
        { slots: ['night', 'late_night'], text: 'Ruby is in night-owl mode.' }
      ];
      var eligible = [];
      for (var si = 0; si < STATUS_LINES.length; si++) {
        if (slotActive(STATUS_LINES[si].slots, hour, 0)) eligible.push(STATUS_LINES[si].text);
      }
      return eligible.length ? eligible : ['Ruby is here. What needs doing?'];
    }
    function buildHome(firstName, assistant) {
      var now = new Date();
      var hour = now.getHours();
      var dateLabel = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      var pattern = recordVisitPattern(hour);
      var greeting = pickRandom(buildGreetingCandidates(firstName, now, pattern), 'karna_last_greeting');
      var status = pickRandom(buildStatusCandidates(hour), 'karna_last_status');
      return '<div class="home">' +
        '<div class="home-date">' + escapeHtml(dateLabel) + '</div>' +
        '<h1 class="home-greeting">' + escapeHtml(greeting) + '</h1>' +
        '<div class="home-bot">' +
          '<span class="pulse-ring"></span>' +
          '<span class="pulse-ring d2"></span>' +
          '<span class="bot-mark"><img src="/static/bot-mark.png" alt="' + escapeHtml(assistant) + '"></span>' +
        '</div>' +
        '<div class="home-listening">' +
          '<span class="dot"></span>' +
          '<span>' + escapeHtml(status) + '</span>' +
        '</div>' +
      '</div>';
    }

    var dc = document.getElementById('dashContent');
    if (!dc) return;
    var userName = state.session && state.session.user ? state.session.user.name : '';
    var firstName = userName ? userName.split(' ')[0] : '';
    var assistant = state.assistantName || 'Karna';
    dc.innerHTML = buildHome(firstName, assistant);
  }
`;
}
