// dashboard — Karna frontend section
export function getDashboardScript(): string {
  return `  // ============================================================
  // DASHBOARD
  // ============================================================

  var UI_IMG = '/static/ui/';

  function dashTile(img, alt, onclick, badgeId, badgeVal) {
    var badge = badgeId ? '<span class="dash-tile-badge" id="' + badgeId + '">' + (badgeVal || '') + '</span>' : '';
    return '<button type="button" class="dash-tile" onclick="' + onclick + '">' +
      '<img src="' + UI_IMG + img + '" alt="' + alt + '" loading="lazy" decoding="async" />' +
      badge + '</button>';
  }

  function renderDashInputArea() {
    var name = escapeHtml(state.assistantName || 'Karna');
    return '<div class="dash-input-area">' +
      '<div class="dash-input-wrap">' +
        '<div class="dash-input-row">' +
          '<textarea class="dash-input-field" id="dashInputField" placeholder="Message ' + name + '\\u2026" rows="1"></textarea>' +
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
    startNewThread();
  }

  async function renderDashboard(container) {
    container.innerHTML = '<div class="dash-page">' +
      '<div class="chat-area has-dash-bg"><div class="dashboard" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>' +
      renderDashInputArea() +
    '</div>';
    bindDashInput();

    try {
      var data = await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      html += '<div class="dash-tiles">';
      html += dashTile('tile-active-tasks.png', 'Active Tasks', 'viewTasksModal()', 'dashTasksBadge', data.active_schedules || 0);
      html += dashTile('tile-skills.png', 'Skills', 'state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();', 'dashSkillsBadge', data.skills_count || 0);
      html += dashTile('tile-preferences.png', 'Preferences', 'state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();', 'dashPrefsBadge', data.preferences_count || 0);
      html += dashTile('tile-gmail.png', 'Unread Gmail', 'dashGmailClick()', 'dashGmailBadge', '\\u2026');
      html += dashTile('tile-documents.png', 'Documents', 'state.prevView=\\'dashboard\\';state.view=\\'documents\\';renderView();', 'dashDocsBadge', data.documents_count || 0);
      html += '</div>';

      dc.innerHTML = html;
      loadDashGmailCount();
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) dc2.innerHTML = '<div class="welcome"><h2>Hello' + (state.session && state.session.user ? ', ' + state.session.user.name : '') + '</h2><p>' + escapeHtml(state.assistantName || 'Karna') + ' is ready. Start a new conversation below.</p></div>';
    }
  }

  async function loadDashGmailCount() {
    var el = document.getElementById('dashGmailBadge');
    try {
      var data = await api('/chat/gmail/unread');
      if (!el) return;
      if (data.count !== null && data.count !== undefined) {
        el.textContent = data.count;
        el.classList.toggle('dash-tile-badge-hidden', data.count === 0);
        state.gmailUnread = data.count;
      } else {
        el.textContent = '\\u2014';
        el.classList.add('dash-tile-badge-muted');
        state.gmailUnread = 0;
      }
    } catch(e) {
      if (el) {
        el.textContent = '\\u2014';
        el.classList.add('dash-tile-badge-muted');
      }
    }
  }

  function dashGmailClick() {
    if (state.gmailUnread > 0) {
      state.pendingDashMessage = 'Check my Gmail inbox — list the latest unread messages';
    } else {
      state.pendingDashMessage = 'Check my Gmail inbox';
    }
    startNewThread();
  }
`;
}
