// main — Karna frontend section
export function getMainScript(): string {
  return `  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  async function renderMain(container) {
    restoreActiveThreadId();
    restoreViewState();
    container.innerHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="icon-btn" id="threadsBtn" title="Chat history" style="margin-right:8px;">&#9776;</button>' +
      '</div>' +
      '<div class="topbar-right">' +
        '<button class="clay-notes-btn clay-notes-btn--top" id="notesBtn" type="button" title="Notes" aria-label="Notes">' +
          '<span class="clay-notes-btn__icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M7 3.5h7.5L18.5 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.08)"/>' +
              '<path d="M14.5 3.5V7.5H18.5" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.04)"/>' +
              '<path d="M8.5 11h7M8.5 14h7M8.5 17h4.5" stroke="white" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
            '</svg>' +
          '</span>' +
        '</button>' +
        '<button class="icon-btn notif-btn" id="notifBtn" title="Schedule">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="icon-btn" id="newChatBtn" title="New chat"><i class="fa-solid fa-pen-to-square"></i></button>' +
        '<button class="icon-btn" id="settingsBtn" title="Settings"><i class="fa-solid fa-gear"></i></button>' +
      '</div></div>' +
      '<!-- Notification Dropdown -->' +
      '<div class="notif-dropdown" id="notifDropdown">' +
        '<div class="notif-header"><span class="notif-header-title">Notifications</span><button class="btn btn-small" id="notifReadAll" style="width:auto;padding:4px 10px;font-size:10px;">Mark all done</button></div>' +
        '<div class="notif-list" id="notifList"><div class="notif-empty">No notifications</div></div>' +
        '<div class="notif-footer"><button class="notif-footer-btn" onclick="closeNotifDropdown();state.view=\\'reminders\\';renderView();">&#9201; Manage reminders</button></div>' +
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">CHAT LOG</span><div style="display:flex;gap:8px;align-items:center;"><button class="icon-btn" id="sidebarSelectBtn" title="Select to delete" style="width:36px;height:36px;font-size:14px;">&#9745;</button><button class="btn-new" id="sidebarNewBtn"><span class="plus">+</span><span>NEW</span></button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<div class="nav-pill">' +
              '<button class="nav-item nav-item--skills" id="sidebarSkillsBtn"><i class="fa-solid fa-bolt"></i><span>Skills</span></button>' +
              '<button class="nav-item nav-item--memory" id="sidebarMemoryBtn"><i class="fa-solid fa-brain"></i><span>Memory</span></button>' +
              '<button class="nav-item nav-item--documents" id="sidebarDocumentsBtn"><i class="fa-solid fa-folder-open"></i><span>Documents</span></button>' +
              '<button class="nav-item nav-item--digests" id="sidebarDigestsBtn"><i class="fa-solid fa-rectangle-list"></i><span>Digests</span></button>' +
            '</div>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('newChatBtn').onclick = function() { closeNotifDropdown(); startNewThread(); };
    document.getElementById('notesBtn').onclick = function() { navigateToNotes(); };
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); state.view = 'settings'; state.settingsSection = null; renderView(); };
    
    document.getElementById('sidebarNewBtn').onclick = function() { toggleOverlay(null); startNewThread(); };
    document.getElementById('sidebarSelectBtn').onclick = function() { state.selectMode = !state.selectMode; state.selectedThreadIds = {}; loadThreadSidebar(); };
    document.getElementById('sidebarSkillsBtn').onclick = function() { toggleOverlay(null); state.view = 'skills'; renderView(); };
    document.getElementById('sidebarMemoryBtn').onclick = function() { toggleOverlay(null); state.view = 'memory-review'; renderView(); };
    document.getElementById('sidebarDocumentsBtn').onclick = function() { toggleOverlay(null); state.view = 'document-library'; renderView(); };
    if (document.getElementById('sidebarDigestsBtn')) document.getElementById('sidebarDigestsBtn').onclick = function() { toggleOverlay(null); state.view = 'digests'; renderView(); };

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

    // Keyboard activation for thread cards (now rendered as <div> buttons)
    document.getElementById('threadList').addEventListener('keydown', function(e) {
      var item = e.target.closest('.thread-item');
      if (!item) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var id = parseInt(item.getAttribute('data-id'), 10);
        if (state.selectMode) {
          toggleThreadSelect(id);
        } else {
          openThread(id);
        }
      }
    });

    // Long-press (mobile) and right-click (desktop) context menu for thread items
    var threadListEl = document.getElementById('threadList');
    var _lpStartX = 0, _lpStartY = 0;
    if (threadListEl) {
      threadListEl.addEventListener('touchstart', function(e) {
        var item = e.target.closest('.thread-item');
        if (!item) return;
        _lpStartX = e.touches[0].clientX;
        _lpStartY = e.touches[0].clientY;
        startThreadLongPress(item);
      }, { passive: true });
      threadListEl.addEventListener('touchend', function(e) {
        cancelThreadLongPress();
        // If context menu is open, prevent the tap from opening the thread
        if (threadContextMenuOpen) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      threadListEl.addEventListener('touchmove', function(e) {
        // Only cancel long-press if finger moved more than 10px (ignore minor tremor)
        var dx = e.touches[0].clientX - _lpStartX;
        var dy = e.touches[0].clientY - _lpStartY;
        if (Math.sqrt(dx * dx + dy * dy) > 10) {
          cancelThreadLongPress();
        }
      }, { passive: true });
    }

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

  function navigateToNotes() {
    if (state.view !== 'notes') {
      state.prevView = state.view;
    }
    closeNotifDropdown();
    if (typeof toggleOverlay === 'function') toggleOverlay(null);
    state.view = 'notes';
    renderView();
  }

  window.navigateToNotes = navigateToNotes;

  function goBackFromNotes() {
    state.view = state.prevView || 'home';
    renderView();
  }

  window.goBackFromNotes = goBackFromNotes;

  function renderView() {
    saveViewState();
    var mc = document.getElementById('mainContent');
    if (!mc) return;

    if (state.view === 'home') {
      renderDashboard(mc);
    } else if (state.view === 'documents') {
      renderDocumentsView(mc);
    } else if (state.view === 'notes') {
      renderNotesView(mc);
    } else if (state.view === 'settings') {
      renderSettingsView(mc);
    } else if (state.view === 'memory-review') {
      renderMemoryReview(mc);
    } else if (state.view === 'document-library') {
      renderDocumentLibrary(mc);
    } else if (state.view === 'skills') {
      renderSkillsView(mc);
    } else if (state.view === 'digests') {
      renderDigestsView(mc);
    } else if (state.view === 'reminders') {
      renderRemindersView(mc);
    } else {
      renderChatView(mc);
    }
    updateNotesNavActive();
  }

  function updateNotesNavActive() {
    var btn = document.getElementById('notesBtn');
    if (btn) btn.classList.toggle('clay-notes-btn--active', state.view === 'notes');
  }

  // Helper: open a settings sub-section (global — called from rendered HTML)
  window.openSection = function(section) {
    state.settingsSection = section;
    renderView();
  };

  // Helper: go back from settings/skills to home (global — called from rendered HTML)
  window.goBack = function() {
    state.view = 'home';
    state.settingsSection = null;
    renderView();
  };
`;
}
