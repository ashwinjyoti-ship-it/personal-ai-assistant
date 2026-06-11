// main — Karna frontend section
export function getMainScript(): string {
  return `  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  async function renderMain(container) {
    state.view = 'dashboard';
    state.activeThreadId = null;
    container.innerHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="topbar-btn" id="threadsBtn" title="Conversations" style="margin-right:8px;">&#9776;</button>' +
        '<div class="chunky-tabs">' +
          '<button class="chunky-tab active" id="tabDash" title="Dashboard"><img class="nav-icon" src="/static/ui/nav-dashboard.png" alt="Dashboard"></button>' +
          '<button class="chunky-tab" id="tabSkills" title="Skills"><img class="nav-icon" src="/static/ui/nav-skills.png" alt="Skills"></button>' +
        '</div>' +
        '<span class="thread-title-display" id="threadTitleDisplay" style="margin-left:12px;"></span>' +
      '</div>' +
      '<div class="topbar-right">' +
        '<button class="topbar-btn notif-btn" id="notifBtn" title="Notifications">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="topbar-btn topbar-icon-btn" id="settingsBtn" title="Settings"><img class="nav-icon" src="/static/ui/nav-settings.png" alt="Settings"></button>' +
        '<button class="topbar-btn topbar-icon-btn" id="newThreadBtn" title="New conversation"><img class="nav-icon" src="/static/ui/nav-new-chat.png" alt="New chat"></button>' +
        '<button class="topbar-btn" id="exportBtn" title="Export chat" style="display:none;">&#x21e9;</button>' +
      '</div></div>' +
      '<!-- Notification Dropdown -->' +
      '<div class="notif-dropdown" id="notifDropdown">' +
        '<div class="notif-header"><span class="notif-header-title">Notifications</span><button class="btn btn-small" id="notifReadAll" style="width:auto;padding:4px 10px;font-size:10px;">Mark all done</button></div>' +
        '<div class="notif-list" id="notifList"><div class="notif-empty">No notifications</div></div>' +
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">CHAT LOG</span><div style="display:flex;gap:6px;"><button class="thread-new-btn" id="sidebarSelectBtn" title="Select to delete">&#9745;</button><button class="thread-new-btn btn-clay sidebar-new-chat-btn" id="sidebarNewBtn"><img class="nav-icon-sm" src="/static/ui/nav-new-chat.png" alt="" aria-hidden="true"><span>+ NEW</span></button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<button class="thread-footer-btn" id="sidebarDashBtn"><img class="nav-icon-sm" src="/static/ui/nav-dashboard.png" alt="" aria-hidden="true"><span>Dashboard</span></button>' +
            '<button class="thread-footer-btn" id="sidebarSkillsBtn"><img class="nav-icon-sm" src="/static/ui/nav-skills.png" alt="" aria-hidden="true"><span>Skills</span></button>' +
            '<button class="thread-footer-btn" id="sidebarSettingsBtn"><img class="nav-icon-sm" src="/static/ui/nav-settings.png" alt="" aria-hidden="true"><span>Settings</span></button>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('tabDash').onclick = function() { state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('tabSkills').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'skills'; renderView(); };
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'settings'; state.settingsSection = null; renderView(); };
    
    // documentsBtn removed in v4
    document.getElementById('newThreadBtn').onclick = startNewThread;
    document.getElementById('exportBtn').onclick = exportChat;
    document.getElementById('sidebarNewBtn').onclick = function() { toggleOverlay(null); startNewThread(); };
    document.getElementById('sidebarSelectBtn').onclick = function() { state.selectMode = !state.selectMode; state.selectedThreadIds = {}; loadThreadSidebar(); };
    document.getElementById('sidebarDashBtn').onclick = function() { toggleOverlay(null); state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('sidebarSkillsBtn').onclick = function() { toggleOverlay(null); state.prevView = state.view; state.view = 'skills'; renderView(); };
    document.getElementById('sidebarSettingsBtn').onclick = function() { toggleOverlay(null); state.prevView = state.view; state.view = 'settings'; state.settingsSection = null; renderView(); };

    // Notification bell
    document.getElementById('notifBtn').onclick = toggleNotifDropdown;
    document.getElementById('notifReadAll').onclick = markAllNotificationsRead;
    document.addEventListener('click', function(e) {
      var dd = document.getElementById('notifDropdown');
      var btn = document.getElementById('notifBtn');
      if (dd && dd.classList.contains('open') && !dd.contains(e.target) && !btn.contains(e.target)) {
        dd.classList.remove('open');
      }
    });

    await loadAssistantName();
    loadNotificationCount();
    // Poll notification count every 60s
    setInterval(loadNotificationCount, 60000);
    // Check Google connection status on load and every 5 minutes
    checkGoogleConnectionBanner();
    if (googleStatusInterval) clearInterval(googleStatusInterval);
    googleStatusInterval = setInterval(checkGoogleConnectionBanner, 5 * 60 * 1000);
    try {
      renderView();
    } catch(e) {
      var mc2 = document.getElementById('mainContent');
      if (mc2) mc2.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:12px;color:var(--text-muted);font-size:14px;text-align:center;">' +
        '<div>Something went wrong loading this view.</div>' +
        '<button onclick="location.reload()" style="padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;">Reload</button>' +
        '</div>';
      console.error(e);
    }
  }

  function renderView() {
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    
    // Update active tab state
    document.querySelectorAll('.chunky-tab').forEach(function(t) { t.classList.remove('active'); });
    if (state.view === 'dashboard' && document.getElementById('tabDash')) document.getElementById('tabDash').classList.add('active');
    if (state.view === 'skills' && document.getElementById('tabSkills')) document.getElementById('tabSkills').classList.add('active');

    var exp = document.getElementById('exportBtn');
    var ttl = document.getElementById('threadTitleDisplay');
    if (state.view === 'dashboard') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderDashboard(mc);
    } else if (state.view === 'documents') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Documents';
      renderDocumentsView(mc);
    } else if (state.view === 'settings') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderSettingsView(mc);
    } else if (state.view === 'memory-review') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Memory Review';
      renderMemoryReview(mc);
    } else if (state.view === 'document-library') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Documents';
      renderDocumentLibrary(mc);
    } else if (state.view === 'skills') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderSkillsView(mc);
    } else {
      if (exp) exp.style.display = 'inline-block';
      renderChatView(mc);
    }
  }

  // Helper: open a settings sub-section (global — called from rendered HTML)
  window.openSection = function(section) {
    state.settingsSection = section;
    renderView();
  };

  // Helper: go back from settings/skills to previous view (global — called from rendered HTML)
  window.goBack = function() {
    var prev = state.prevView || 'dashboard';
    state.view = prev;
    state.settingsSection = null;
    if (prev === 'dashboard') state.activeThreadId = null;
    renderView();
  };
`;
}
