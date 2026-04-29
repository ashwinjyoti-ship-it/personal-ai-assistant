// threads — Karna frontend section
export function getThreadsScript(): string {
  return `  // ============================================================
  // THREAD MANAGEMENT
  // ============================================================

  async function startNewThread() {
    state.activeThreadId = null;
    state.view = 'chat';
    renderView();
    toggleOverlay(null);
  }

  function openThread(threadId, title) {
    state.activeThreadId = threadId;
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
      var groups = { today: [], yesterday: [], older: [] };
      for (var i = 0; i < state.threads.length; i++) {
        var t = state.threads[i];
        var d = (t.updated_at || t.created_at || '').split('T')[0];
        if (d === today) groups.today.push(t);
        else if (d === yesterday) groups.yesterday.push(t);
        else groups.older.push(t);
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
      if (groups.today.length > 0) { html += '<div class="thread-section-label">Today</div>'; html += renderThreadGroup(groups.today); }
      if (groups.yesterday.length > 0) { html += '<div class="thread-section-label">Yesterday</div>'; html += renderThreadGroup(groups.yesterday); }
      if (groups.older.length > 0) { html += '<div class="thread-section-label">Older</div>'; html += renderThreadGroup(groups.older); }
      if (!state.selectMode) {
        html += '<div style="padding:16px 14px;"><a href="#" onclick="loadArchivedThreads();return false;" style="color:var(--text-muted);font-size:12px;">View archived conversations</a></div>';
      }
      list.innerHTML = html;
    } catch(e) {
      list.innerHTML = '<div style="padding:16px;color:var(--danger);font-size:13px;">Error loading threads.</div>';
    }
  }

  function renderThreadGroup(threads) {
    var html = '';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var isActive = t.id === state.activeThreadId;
      var isChecked = !!state.selectedThreadIds[t.id];
      if (state.selectMode) {
        html += '<div class="thread-item' + (isChecked ? ' active' : '') + '" data-id="' + t.id + '" onclick="toggleThreadSelect(' + t.id + ')" style="cursor:pointer;">';
        html += '<div style="display:flex;align-items:center;gap:10px;">';
        html += '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onclick="event.stopPropagation();toggleThreadSelect(' + t.id + ')" style="width:16px;height:16px;flex-shrink:0;cursor:pointer;">';
        html += '<div style="flex:1;min-width:0;"><div class="thread-item-title">' + escapeHtml(t.title) + '</div>';
        html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span><span>' + formatRelativeDate(t.updated_at) + '</span></div></div>';
        html += '</div></div>';
      } else {
        html += '<div class="thread-item' + (isActive ? ' active' : '') + '" data-id="' + t.id + '" onclick="openThread(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
        html += '<div class="thread-item-title">' + escapeHtml(t.title) + '</div>';
        if (t.last_message) { html += '<div class="thread-item-preview">' + escapeHtml(t.last_message.substring(0, 60)) + '</div>'; }
        html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span><span>' + formatRelativeDate(t.updated_at) + '</span></div>';
        html += '<div class="thread-item-actions">';
        html += '<button class="thread-action-btn" onclick="event.stopPropagation();archiveThread(' + t.id + ')" title="Archive">&#128230;</button>';
        html += '<button class="thread-action-btn danger" onclick="event.stopPropagation();deleteThread(' + t.id + ')" title="Delete">&#128465;</button>';
        html += '</div></div>';
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
    var html = '<div class="thread-section-label">Archived</div>';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      html += '<div class="thread-item" onclick="unarchiveAndOpen(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
      html += '<div class="thread-item-title" style="color:var(--text-muted);">' + escapeHtml(t.title) + '</div>';
      html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span></div></div>';
    }
    html += '<div style="padding:16px 14px;"><a href="#" onclick="loadThreadSidebar();return false;" style="color:var(--text-muted);font-size:12px;">\\u2190 Back to active</a></div>';
    list.innerHTML = html;
  }

  async function archiveThread(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:true}) });
    if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation archived', 'success');
  }

  async function unarchiveAndOpen(id, title) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:false}) });
    openThread(id, title);
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
    if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation deleted', '');
  }

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
        if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
      } catch (e) { failed++; }
    }
    state.selectedThreadIds = {};
    state.selectMode = false;
    loadThreadSidebar();
    showToast(failed === 0 ? (ids.length + ' conversations deleted') : (ids.length - failed + ' deleted, ' + failed + ' failed'), failed === 0 ? '' : 'error');
  };

  function formatRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
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
    if (id) {
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'threadsOverlay') loadThreadSidebar();
    }
  }
`;
}
