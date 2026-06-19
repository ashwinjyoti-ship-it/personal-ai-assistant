// dashboard — Karna frontend section
export function getDashboardScript(): string {
  return `  // ============================================================
  // DASHBOARD
  // ============================================================

  function renderDashInputArea() {
    return '<div class="input-anchor">' +
      '<div class="input-pill">' +
        '<span class="prefix-icon">&#128172;</span>' +
        '<textarea class="text-input" id="dashInputField" placeholder="' + escapeHtml(messagePlaceholder()) + '" rows="1"></textarea>' +
        '<button type="button" class="send-btn" id="dashSendBtn" title="Send" aria-label="Send">&#10148;</button>' +
      '</div>' +
    '</div>';
  }

  function bindDashInput() {
    var dashInput = document.getElementById('dashInputField');
    var dashSend = document.getElementById('dashSendBtn');
    if (!dashInput || !dashSend) return;
    dashInput.onkeydown = function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        dashChatSend();
      }
    };
    dashInput.oninput = function() {
      dashInput.style.height = 'auto';
      dashInput.style.height = Math.max(36, Math.min(dashInput.scrollHeight, window.innerHeight * 0.25)) + 'px';
    };
    dashInput.style.height = '36px';
    dashSend.onclick = dashChatSend;
  }

  function dashChatSend() {
    var dashInput = document.getElementById('dashInputField');
    if (!dashInput) return;
    var text = dashInput.value.trim();
    if (!text) {
      dashInput.focus();
      return;
    }
    state.pendingDashMessage = text;
    dashInput.value = '';
    dashInput.style.height = '36px';
    if (state.activeThreadId) {
      state.view = 'chat';
      renderView();
    } else {
      startNewThread();
    }
  }

  async function renderDashboard(container) {
    container.innerHTML = '<div class="dash-page">' +
      '<div class="chat-area"><div class="dashboard dashboard--minimal" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>' +
      renderDashInputArea() +
    '</div>';
    bindDashInput();
    updateMessagePlaceholders();

    try {
      await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var firstName = userName ? userName.split(' ')[0] : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      var dateLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      var assistant = state.assistantName || 'Karna';

      dc.innerHTML = '<div class="home">' +
        '<div class="home-date">' + escapeHtml(dateLabel) + '</div>' +
        '<h1 class="home-greeting">' + greeting + (firstName ? ',<br>' + escapeHtml(firstName) : '') + '</h1>' +
        '<div class="home-bot">' +
          '<span class="pulse-ring"></span>' +
          '<span class="pulse-ring d2"></span>' +
          '<span class="bot-mark"><img src="/static/bot-mark.png" alt="' + escapeHtml(assistant) + '"></span>' +
        '</div>' +
        '<div class="home-listening">' +
          '<span class="dot"></span>' +
          '<span>' + escapeHtml(assistant) + ' is listening&hellip;</span>' +
        '</div>' +
      '</div>';
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) {
        var hour2 = new Date().getHours();
        var greeting2 = hour2 < 12 ? 'Good morning' : hour2 < 17 ? 'Good afternoon' : 'Good evening';
        var name2 = state.session && state.session.user ? state.session.user.name.split(' ')[0] : '';
        var dateLabel2 = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        var assistant2 = state.assistantName || 'Karna';
        dc2.innerHTML = '<div class="home">' +
          '<div class="home-date">' + escapeHtml(dateLabel2) + '</div>' +
          '<h1 class="home-greeting">' + greeting2 + (name2 ? ',<br>' + escapeHtml(name2) : '') + '</h1>' +
          '<div class="home-bot">' +
            '<span class="pulse-ring"></span>' +
            '<span class="pulse-ring d2"></span>' +
            '<span class="bot-mark"><img src="/static/bot-mark.png" alt="' + escapeHtml(assistant2) + '"></span>' +
          '</div>' +
          '<div class="home-listening">' +
            '<span class="dot"></span>' +
            '<span>' + escapeHtml(assistant2) + ' is listening&hellip;</span>' +
          '</div>' +
        '</div>';
      }
    }
  }
`;
}
