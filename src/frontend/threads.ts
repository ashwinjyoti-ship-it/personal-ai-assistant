// threads — Karna frontend section
export function getThreadsScript(): string {
  return `  // ============================================================
  // THREAD MANAGEMENT
  // ============================================================

  async function startNewThread() {
    clearActiveThreadId();
    state.view = 'home';
    renderView();
    toggleOverlay(null);
  }

  function openThread(threadId) {
    if (threadContextMenuOpen) { hideThreadContextMenu(); return; }
    setActiveThreadId(threadId);
    state.view = 'chat';
    renderView();
    toggleOverlay(null);
  }

  async function loadThreadSidebar() {
    var list = document.getElementById('threadList');
    if (!list) return;
    list.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:13px;">Loading...</div>';
    
    try {
      var data = await api('/chat/threads?limit=50');
      state.threads = data.threads || [];
      
      if (state.threads.length === 0) {
        list.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:13px;">No conversations yet. Start one!</div>';
        return;
      }

      var today = new Date().toISOString().split('T')[0];
      var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      var groups = { pinned: [], today: [], yesterday: [], older: [] };
      var telegramThread = null;
      for (var i = 0; i < state.threads.length; i++) {
        var t = state.threads[i];
        if (t.channel === 'telegram') {
          telegramThread = t;
        } else if (t.is_pinned) {
          groups.pinned.push(t);
        } else {
          var d = (t.updated_at || t.created_at || '').substring(0, 10);
          if (d === today) groups.today.push(t);
          else if (d === yesterday) groups.yesterday.push(t);
          else groups.older.push(t);
        }
      }

      var html = '';
      if (state.selectMode) {
        html += '<div style="padding:8px 14px;background:rgba(255,107,74,0.08);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
          '<span style="font-size:12px;color:var(--text-muted);" id="selectCount">0 selected</span>' +
          '<div style="display:flex;gap:6px;">' +
          '<button class="btn btn-small" onclick="selectAllThreads()">All</button>' +
          '<button class="btn btn-small btn-danger" id="deleteSelectedBtn" onclick="deleteSelectedThreads()" disabled>Delete</button>' +
          '<button class="btn btn-small" onclick="state.selectMode=false;state.selectedThreadIds={};loadThreadSidebar();">Cancel</button>' +
          '</div></div>';
      }
      // Telegram thread — always pinned at top
      if (telegramThread && !state.selectMode) {
        html += '<div class="card-group"><div class="section-header section-header--accent">&#128204; Telegram</div>' + renderThreadGroup([telegramThread], true) + '</div>';
      }
      if (groups.pinned.length > 0 && !state.selectMode) { html += '<div class="card-group"><div class="section-header">&#128204; Pinned</div>' + renderThreadGroup(groups.pinned) + '</div>'; }
      if (groups.today.length > 0) { html += '<div class="card-group"><div class="section-header">Today</div>' + renderThreadGroup(groups.today) + '</div>'; }
      if (groups.yesterday.length > 0) { html += '<div class="card-group"><div class="section-header">Yesterday</div>' + renderThreadGroup(groups.yesterday) + '</div>'; }
      if (groups.older.length > 0) { html += '<div class="card-group"><div class="section-header">Older</div>' + renderThreadGroup(groups.older) + '</div>'; }
      if (!state.selectMode) {
        html += '<div style="padding:16px 14px;"><a href="#" onclick="loadArchivedThreads();return false;" style="color:var(--text-muted);font-size:12px;">View archived conversations</a></div>';
      }
      list.innerHTML = html;
    } catch(e) {
      list.innerHTML = '<div style="padding:16px;color:var(--danger);font-size:13px;">Error loading threads.</div>';
    }
  }

  function renderThreadGroup(threads, pinned) {
    var html = '';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var isActive = t.id === state.activeThreadId;
      var isChecked = !!state.selectedThreadIds[t.id];
      var rel = formatRelativeDate(t.updated_at);
      var msgCount = t.message_count || 0;
      var preview = t.last_message ? escapeHtml(t.last_message.substring(0, 60)) : '';
      var badgeText = msgCount + ' message' + (msgCount === 1 ? '' : 's');
      var isPinned = pinned || t.is_pinned;
      var pinnedClass = isPinned ? ' pinned' : '';
      var titleBadge = isPinned ? '<span class="thread-pinned-badge">&#128204;</span>' : '';
      if (state.selectMode) {
        html += '<div class="row thread-item' + (isChecked ? ' active' : '') + '" role="button" tabindex="0" data-id="' + t.id + '" onclick="toggleThreadSelect(' + t.id + ')" style="cursor:pointer;text-align:left;">';
        html += '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onclick="event.stopPropagation();toggleThreadSelect(' + t.id + ')" style="width:18px;height:18px;flex-shrink:0;cursor:pointer;accent-color:var(--terracotta);margin-left:4px;">';
        html += '<span class="icon-well">&#128172;</span>';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<span class="row-chevron">&#8250;</span>';
        html += '</div>';
      } else {
        html += '<div class="row thread-item' + (isActive ? ' active' : '') + pinnedClass + '" role="button" tabindex="0" data-id="' + t.id + '" onclick="openThread(' + t.id + ')" oncontextmenu="event.preventDefault();showThreadContextMenu(' + t.id + ',null,event.clientX,event.clientY)">';
        html += '<span class="icon-well">&#128172;</span>';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<button class="thread-more-btn" onclick="event.stopPropagation();showThreadContextMenu(' + t.id + ',null,event.clientX,event.clientY)" title="More options">&#8942;</button>';
        html += '</div>';
      }
    }
    return html;
  }

  async function loadArchivedThreads() {
    var list = document.getElementById('threadList');
    if (!list) return;
    var data = await api('/chat/threads?archived=1&limit=30');
    var threads = data.threads || [];
    if (threads.length === 0) { showToast('No archived conversations', ''); return; }
    var html = '<div class="section-header">Archived</div><div class="card-group">';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var msgCount = t.message_count || 0;
      if (i > 0) { html += '<div class="row-divider"></div>'; }
      html += '<button class="row thread-item" onclick="unarchiveAndOpen(' + t.id + ')">';
      html += '<span class="icon-well">&#128172;</span>';
      html += '<span class="row-body">';
      html += '<span class="row-top"><span class="row-title" style="color:var(--text-muted);">' + escapeHtml(t.title) + '</span></span>';
      html += '<span class="row-badge">' + msgCount + ' message' + (msgCount === 1 ? '' : 's') + '</span>';
      html += '</span>';
      html += '<span class="row-chevron">&#8250;</span>';
      html += '</button>';
    }
    html += '</div>';
    html += '<div style="padding:16px 14px;"><a href="#" onclick="loadThreadSidebar();return false;" style="color:var(--text-muted);font-size:12px;">\\u2190 Back to active</a></div>';
    list.innerHTML = html;
  }

  async function archiveThread(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:true}) });
    if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation archived', 'success');
  }

  async function unarchiveAndOpen(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:false}) });
    openThread(id);
  }

  async function pinThread(id) {
    try {
      await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_pinned:true}) });
      loadThreadSidebar();
      showToast('Conversation pinned', 'success');
    } catch(e) {
      showToast('Failed to pin conversation', 'error');
    }
  }

  async function unpinThread(id) {
    try {
      await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_pinned:false}) });
      loadThreadSidebar();
      showToast('Conversation unpinned', '');
    } catch(e) {
      showToast('Failed to unpin conversation', 'error');
    }
  }

  async function deleteThread(id) {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    // Optimistic removal — remove from DOM immediately
    var el = document.querySelector('.thread-item[data-id="' + id + '"]');
    if (el) el.remove();
    // Remove from local state cache too
    state.threads = state.threads ? state.threads.filter(function(t) { return t.id !== id; }) : [];
    var result = await api('/chat/threads/' + id, { method:'DELETE' });
    if (result && result.error) {
      showToast('Delete failed: ' + result.error, 'error');
      loadThreadSidebar(); // Restore from server
      return;
    }
    if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation deleted', '');
  }

  // ============================================================
  // THREAD CONTEXT MENU (long-press mobile / right-click desktop)
  // ============================================================
  var threadLongPressTimer = null;
  var threadLongPressItem = null;
  var threadContextMenuOpen = false;

  function startThreadLongPress(item) {
    if (state.selectMode) return;
    threadLongPressItem = item;
    threadLongPressTimer = setTimeout(function() {
      threadLongPressTimer = null;
      threadLongPressItem = null;
      var id = parseInt(item.getAttribute('data-id'), 10);
      var title = item.querySelector('.row-title') ? item.querySelector('.row-title').textContent : '';
      showThreadContextMenu(id, title, null, null);
    }, 500);
  }

  function cancelThreadLongPress() {
    if (threadLongPressTimer) {
      clearTimeout(threadLongPressTimer);
      threadLongPressTimer = null;
    }
    threadLongPressItem = null;
  }

  window.showThreadContextMenu = function(threadId, title, clientX, clientY) {
    hideThreadContextMenu();
    var thread = state.threads.find(function(t) { return t.id === threadId; });
    var isPinned = thread && thread.is_pinned;
    var isTouch = clientX === null || clientY === null;

    var backdrop = document.createElement('div');
    backdrop.className = 'thread-context-menu-backdrop';
    backdrop.id = 'threadContextMenuBackdrop';
    backdrop.onclick = hideThreadContextMenu;

    var menu = document.createElement('div');
    menu.className = 'thread-context-menu';
    menu.id = 'threadContextMenu';

    if (isTouch) {
      menu.style.left = '50%';
      menu.style.top = '40%';
      menu.style.transform = 'translate(-50%, -50%)';
    } else {
      var x = clientX;
      var y = clientY;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var menuW = 200;
      var menuH = 180;
      if (x + menuW > w - 8) x = w - menuW - 8;
      if (y + menuH > h - 8) y = h - menuH - 8;
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      menu.style.transform = 'none';
    }

    var titleEl = document.createElement('div');
    titleEl.className = 'thread-context-menu-title';
    titleEl.textContent = title || (thread && thread.title) || 'Conversation';
    menu.appendChild(titleEl);

    function makeItem(label, action, danger) {
      var btn = document.createElement('button');
      btn.className = 'thread-context-menu-item' + (danger ? ' danger' : '');
      btn.textContent = label;
      btn.onclick = function() {
        hideThreadContextMenu();
        action();
      };
      return btn;
    }

    menu.appendChild(makeItem(isPinned ? 'Unpin' : 'Pin', function() {
      if (isPinned) unpinThread(threadId); else pinThread(threadId);
    }));
    menu.appendChild(makeItem('Archive', function() {
      archiveThread(threadId);
    }));
    menu.appendChild(makeItem('Delete', function() {
      deleteThread(threadId);
    }, true));

    document.body.appendChild(backdrop);
    document.body.appendChild(menu);
    threadContextMenuOpen = true;
  };

  window.hideThreadContextMenu = function() {
    var backdrop = document.getElementById('threadContextMenuBackdrop');
    var menu = document.getElementById('threadContextMenu');
    if (backdrop) backdrop.remove();
    if (menu) menu.remove();
    threadContextMenuOpen = false;
  };

  window.toggleThreadSelect = function(id) {
    if (state.selectedThreadIds[id]) {
      delete state.selectedThreadIds[id];
    } else {
      state.selectedThreadIds[id] = true;
    }
    var count = Object.keys(state.selectedThreadIds).length;
    var countEl = document.getElementById('selectCount');
    if (countEl) countEl.textContent = count + ' selected';
    var delBtn = document.getElementById('deleteSelectedBtn');
    if (delBtn) delBtn.disabled = count === 0;
    // Re-render just the checkboxes without reloading
    var items = document.querySelectorAll('.thread-item[data-id]');
    items.forEach(function(item) {
      var tid = parseInt(item.getAttribute('data-id'), 10);
      var cb = item.querySelector('input[type=checkbox]');
      if (cb) cb.checked = !!state.selectedThreadIds[tid];
      if (state.selectedThreadIds[tid]) item.classList.add('active'); else item.classList.remove('active');
    });
  };

  window.selectAllThreads = function() {
    var allSelected = state.threads.every(function(t) { return state.selectedThreadIds[t.id]; });
    state.selectedThreadIds = {};
    if (!allSelected) state.threads.forEach(function(t) { state.selectedThreadIds[t.id] = true; });
    loadThreadSidebar();
  };

  window.deleteSelectedThreads = async function() {
    var ids = Object.keys(state.selectedThreadIds).map(Number);
    if (ids.length === 0) return;
    if (!confirm('Delete ' + ids.length + ' conversation' + (ids.length > 1 ? 's' : '') + '? This cannot be undone.')) return;
    var delBtn = document.getElementById('deleteSelectedBtn');
    if (delBtn) { delBtn.disabled = true; delBtn.textContent = 'Deleting...'; }
    var failed = 0;
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      try {
        await api('/chat/threads/' + id, { method: 'DELETE' });
        state.threads = state.threads ? state.threads.filter(function(t) { return t.id !== id; }) : [];
        if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
      } catch (e) { failed++; }
    }
    state.selectedThreadIds = {};
    state.selectMode = false;
    loadThreadSidebar();
    showToast(failed === 0 ? (ids.length + ' conversations deleted') : (ids.length - failed + ' deleted, ' + failed + ' failed'), failed === 0 ? '' : 'error');
  };

  function formatRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr.replace(' ', 'T') + 'Z');
    var now = new Date();
    var diff = now.getTime() - d.getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    return d.toLocaleDateString();
  }

  // ============================================================
  // EXPORT CHAT
  // ============================================================

  async function exportChat() {
    if (!state.activeThreadId) { showToast('No active conversation to export', 'error'); return; }
    var data = await api('/chat/threads/' + state.activeThreadId + '/messages?limit=500');
    if (!data.messages || data.messages.length === 0) { showToast('No messages to export', 'error'); return; }

    var thread = state.threads.find(function(t) { return t.id === state.activeThreadId; });
    var title = thread ? thread.title : 'Conversation';
    var text = '# ' + title + '\\n# Exported from Karna on ' + new Date().toISOString() + '\\n\\n';
    for (var i = 0; i < data.messages.length; i++) {
      var m = data.messages[i];
      var time = m.created_at ? new Date(m.created_at).toLocaleString() : '';
      if (m.role === 'user') { text += '[You] (' + time + ')\\n' + m.content + '\\n\\n'; }
      else { text += '[' + escapeHtml(state.assistantName || 'Karna') + '] (' + time + ')\\n' + m.content + '\\n\\n'; }
    }

    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40) + '_export.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Chat exported', 'success');
  }

  // ============================================================
  // OVERLAYS
  // ============================================================

  function toggleOverlay(id) {
    $$('.overlay').forEach(function(o) { o.classList.remove('active'); });
    closeNotifDropdown();
    hideThreadContextMenu();
    if (id) {
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'threadsOverlay') loadThreadSidebar();
    }
  }
`;
}
