// dashboard — Karna frontend section
export function getDashboardScript(): string {
  return `  // ============================================================
  // DASHBOARD
  // ============================================================

  function renderDashInputArea() {
    return '<div class="dash-input-area">' +
      '<div class="dash-input-wrap">' +
        '<div class="dash-input-row">' +
          '<textarea class="dash-input-field" id="dashInputField" placeholder="' + escapeHtml(messagePlaceholder()) + '" rows="1"></textarea>' +
          '<button type="button" class="dash-send-btn" id="dashSendBtn" title="Send" aria-label="Send">&#10148;</button>' +
        '</div>' +
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
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>';

      dc.innerHTML = html;
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) {
        var hour2 = new Date().getHours();
        var greeting2 = hour2 < 12 ? 'Good morning' : hour2 < 17 ? 'Good afternoon' : 'Good evening';
        var name = state.session && state.session.user ? ', ' + escapeHtml(state.session.user.name.split(' ')[0]) : '';
        dc2.innerHTML = '<div class="dash-greeting">' + greeting2 + name + '</div>';
      }
    }
  }
`;
}
