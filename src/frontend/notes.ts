// notes — Karna frontend section
export function getNotesScript(): string {
  return `  // ============================================================
  // NOTES
  // ============================================================

  var notesState = {
    notes: [],
    activeFilter: 'all',
    searchQuery: '',
    composeOpen: false,
    editingNote: null,
    deleteConfirmId: null,
    searchTimer: null,
    allTags: []
  };

  function notesRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var diffDays = Math.round((startOfToday - startOfDate) / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays > 1 && diffDays < 7) return diffDays + ' days ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  function notesExtractTags(notes) {
    var tagSet = {};
    for (var i = 0; i < notes.length; i++) {
      var tags = (notes[i].tags || '').split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagSet[t] = true;
      }
    }
    return Object.keys(tagSet).sort();
  }

  function renderNoteCard(note) {
    var pinned = note.is_pinned ? 1 : 0;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span>';
      }
    }
    var confirmHtml = notesState.deleteConfirmId === note.id
      ? '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', true)">Sure? Tap again</button>'
      : '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', false)">Delete</button>';

    return '<div class="note-card" data-note-id="' + note.id + '">' +
      '<div style="display:flex;align-items:flex-start;gap:8px;">' +
        '<span class="note-pin" onclick="event.stopPropagation();togglePin(' + note.id + ',' + pinned + ')" title="Pin note">' + (pinned ? '⭐' : '☆') + '</span>' +
        '<div style="flex:1;min-width:0;" onclick="showNoteDetail(' + note.id + ')">' +
          '<div class="note-card-title">' + escapeHtml(note.title || 'Untitled') + '</div>' +
          '<div class="note-card-preview">' + escapeHtml(mdToPlain(note.content || '').substring(0, 160)) + '</div>' +
          '<div class="note-card-meta">' + tagsHtml +
            '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="note-actions">' +
        '<button class="note-action-btn" onclick="event.stopPropagation();editNote(' + note.id + ')">Edit</button>' +
        confirmHtml +
      '</div>' +
    '</div>';
  }

  function renderNotesGrid() {
    var grid = document.getElementById('notesGrid');
    if (!grid) return;
    if (notesState.notes.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px 16px;font-size:14px;">No notes yet. Tap + to create one.</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < notesState.notes.length; i++) {
      html += renderNoteCard(notesState.notes[i]);
    }
    grid.innerHTML = html;
  }

  function renderNotesFilters() {
    var el = document.getElementById('notesFilters');
    if (!el) return;
    var html = '<button class="filter-chip' + (notesState.activeFilter === 'all' ? ' active' : '') + '" onclick="filterByTag(\\'all\\')">All</button>';
    html += '<button class="filter-chip' + (notesState.activeFilter === 'pinned' ? ' active' : '') + '" onclick="filterByTag(\\'pinned\\')">Pinned</button>';
    for (var i = 0; i < notesState.allTags.length; i++) {
      var tag = notesState.allTags[i];
      html += '<button class="filter-chip' + (notesState.activeFilter === tag ? ' active' : '') + '" onclick="filterByTag(\\'' + escapeHtml(tag).replace(/'/g, "\\\\'") + '\\')">' + escapeHtml(tag) + '</button>';
    }
    el.innerHTML = html;
  }

  async function loadNotesList() {
    var params = '?limit=50';
    if (notesState.activeFilter === 'pinned') {
      params += '&pinned_only=1';
    } else if (notesState.activeFilter !== 'all') {
      params += '&tag=' + encodeURIComponent(notesState.activeFilter);
    }
    var data = await api('/notes' + params);
    notesState.notes = data.notes || [];
    notesState.allTags = notesExtractTags(notesState.notes);
    renderNotesFilters();
    renderNotesGrid();
  }

  async function renderNotesView(container) {
    container.innerHTML =
      '<style>' +
      '.notes-page{padding:0;max-width:100%;}' +
      '.notes-toolbar{position:sticky;top:0;z-index:10;background:var(--bg);padding:12px 16px;display:flex;gap:8px;align-items:center;border-bottom:1px solid var(--border);}' +
      '.notes-search{flex:1;height:44px;padding:0 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-size:15px;}' +
      '.notes-fab{height:44px;min-width:44px;padding:0 16px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:22px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;}' +
      '.notes-filters{display:flex;gap:8px;padding:10px 16px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}' +
      '.notes-filters::-webkit-scrollbar{display:none;}' +
      '.filter-chip{flex-shrink:0;height:34px;padding:0 14px;border:1px solid var(--border);border-radius:20px;background:var(--surface);color:var(--text-muted);font-size:13px;cursor:pointer;white-space:nowrap;}' +
      '.filter-chip.active{background:var(--accent);color:#fff;border-color:var(--accent);}' +
      '.notes-grid{display:grid;grid-template-columns:1fr;gap:12px;padding:12px 16px;}' +
      '@media(min-width:768px){.notes-grid{grid-template-columns:repeat(2,1fr);padding:16px 24px;}}' +
      '@media(min-width:1200px){.notes-grid{grid-template-columns:repeat(3,1fr);}}' +
      '.note-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;cursor:pointer;transition:border-color 0.15s;}' +
      '.note-card:active{border-color:var(--accent);}' +
      '.note-card-title{font-size:15px;font-weight:600;color:var(--text);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.note-card-preview{font-size:13px;color:var(--text-muted);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.note-card-meta{display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap;}' +
      '.note-tag{font-size:11px;padding:2px 8px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text-muted);}' +
      '.note-date{font-size:11px;color:var(--text-muted);margin-left:auto;}' +
      '.note-pin{font-size:16px;cursor:pointer;padding:4px;min-width:28px;min-height:28px;display:flex;align-items:center;justify-content:center;}' +
      '.note-actions{display:flex;gap:8px;margin-top:8px;border-top:1px solid var(--border);padding-top:10px;}' +
      '.note-action-btn{flex:1;height:40px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text-muted);font-size:13px;cursor:pointer;}' +
      '.note-action-btn.danger{color:var(--danger);border-color:var(--danger);}' +
      '.note-compose{background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:16px;margin:0 16px 12px;display:none;flex-direction:column;gap:10px;}' +
      '.note-compose.open{display:flex;}' +
      '.note-compose input,.note-compose textarea{width:100%;padding:12px 14px;box-sizing:border-box;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);font-size:15px;}' +
      '.note-compose textarea{min-height:120px;resize:vertical;line-height:1.6;}' +
      '.compose-actions{display:flex;gap:8px;}' +
      '.compose-actions button{flex:1;height:48px;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;border:none;}' +
      '.btn-save-note{background:var(--accent);color:#fff;}' +
      '.btn-cancel-note{background:var(--surface);color:var(--text-muted);border:1px solid var(--border)!important;}' +
      '.note-detail{padding:20px 24px 48px;max-width:720px;margin:0 auto;box-sizing:border-box;padding-left:calc(24px + var(--safe-left,0px));padding-right:calc(24px + var(--safe-right,0px));}' +
      '.note-detail-header{display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:0 4px;}' +
      '.note-detail-meta{margin-bottom:16px;padding:0 4px;}' +
      '.note-detail-body{background:var(--clay);border-radius:16px;padding:28px 24px;box-shadow:0 10px 22px -10px var(--sh-clay-sm-outer),inset 0 2px 2px var(--sh-white-top-soft),inset 0 -4px 8px var(--sh-brown-bottom-sm);}' +
      '.note-detail-content{padding:0 2px;}' +
      '.research-ack{font-size:13px;color:var(--text-muted);padding:8px 12px;margin:8px 0;background:var(--surface);border-radius:8px;border:1px solid var(--border);}' +
      '</style>' +
      '<div class="notes-page">' +
        '<div class="notes-toolbar">' +
          '<button class="page-back-btn" onclick="goBackFromNotes()" style="width:44px;height:44px;flex-shrink:0;">&#8592;</button>' +
          '<input type="search" class="notes-search" id="notesSearchInput" placeholder="Search notes..." autocomplete="off">' +
          '<button class="notes-fab" id="notesFabBtn" title="New note">+</button>' +
        '</div>' +
        '<div class="notes-filters" id="notesFilters"></div>' +
        '<div class="note-compose" id="noteCompose">' +
          '<input type="text" id="noteTitleInput" placeholder="Title (optional)">' +
          '<textarea id="noteContentInput" placeholder="Write your note..."></textarea>' +
          '<input type="text" id="noteTagsInput" placeholder="Tags (comma-separated)">' +
          '<div class="compose-actions">' +
            '<button class="btn-cancel-note" id="noteCancelBtn">Cancel</button>' +
            '<button class="btn-save-note" id="noteSaveBtn">Save</button>' +
          '</div>' +
        '</div>' +
        '<div class="notes-grid" id="notesGrid"><div style="color:var(--text-muted);padding:24px;text-align:center;">Loading notes...</div></div>' +
      '</div>';

    document.getElementById('notesFabBtn').onclick = function() { showComposePanel(null); };
    document.getElementById('noteCancelBtn').onclick = hideComposePanel;
    document.getElementById('noteSaveBtn').onclick = saveNote;
    document.getElementById('notesSearchInput').oninput = function(e) { searchNotes(e.target.value); };

    notesState.activeFilter = 'all';
    notesState.composeOpen = false;
    notesState.editingNote = null;
    notesState.deleteConfirmId = null;
    await loadNotesList();
  }

  function showComposePanel(existingNote) {
    var panel = document.getElementById('noteCompose');
    if (!panel) return;
    notesState.editingNote = existingNote;
    notesState.composeOpen = true;
    panel.classList.add('open');
    document.getElementById('noteTitleInput').value = existingNote ? (existingNote.title || '') : '';
    document.getElementById('noteContentInput').value = existingNote ? (existingNote.content || '') : '';
    document.getElementById('noteTagsInput').value = existingNote ? (existingNote.tags || '') : '';
    document.getElementById('noteTitleInput').focus();
  }

  function hideComposePanel() {
    var panel = document.getElementById('noteCompose');
    if (panel) panel.classList.remove('open');
    notesState.composeOpen = false;
    notesState.editingNote = null;
  }

  async function saveNote() {
    var title = document.getElementById('noteTitleInput').value.trim();
    var content = document.getElementById('noteContentInput').value.trim();
    var tags = document.getElementById('noteTagsInput').value.trim();
    if (!content) {
      showToast('Note content is required', 'warning');
      return;
    }
    try {
      if (notesState.editingNote && notesState.editingNote.id) {
        await api('/notes/' + notesState.editingNote.id, {
          method: 'PUT',
          body: JSON.stringify({ title: title, content: content, tags: tags })
        });
        showToast('Note updated', 'success');
      } else {
        await api('/notes', {
          method: 'POST',
          body: JSON.stringify({ title: title, content: content, tags: tags, source: 'manual' })
        });
        showToast('Note saved', 'success');
      }
      hideComposePanel();
      await loadNotesList();
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  }

  window.editNote = function(id) {
    var note = null;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) { note = notesState.notes[i]; break; }
    }
    if (note) showComposePanel(note);
  };

  window.togglePin = async function(id, current) {
    try {
      await api('/notes/' + id, {
        method: 'PUT',
        body: JSON.stringify({ is_pinned: current ? 0 : 1 })
      });
      await loadNotesList();
    } catch (err) {
      showToast('Failed to update pin', 'error');
    }
  };

  window.deleteNote = async function(id, confirmed) {
    if (!confirmed) {
      notesState.deleteConfirmId = id;
      renderNotesGrid();
      return;
    }
    notesState.deleteConfirmId = null;
    try {
      await api('/notes/' + id, { method: 'DELETE' });
      showToast('Note deleted', 'success');
      await loadNotesList();
    } catch (err) {
      showToast('Failed to delete note', 'error');
    }
  };

  window.searchNotes = function(query) {
    notesState.searchQuery = query;
    if (notesState.searchTimer) clearTimeout(notesState.searchTimer);
    notesState.searchTimer = setTimeout(async function() {
      if (!query.trim()) {
        await loadNotesList();
        return;
      }
      try {
        var data = await api('/notes/search?q=' + encodeURIComponent(query.trim()));
        notesState.notes = data.notes || [];
        renderNotesGrid();
      } catch (err) {
        showToast('Search failed', 'error');
      }
    }, 300);
  };

  window.filterByTag = async function(tag) {
    notesState.activeFilter = tag;
    notesState.searchQuery = '';
    var searchEl = document.getElementById('notesSearchInput');
    if (searchEl) searchEl.value = '';
    await loadNotesList();
  };

  window.showNoteDetail = function(id) {
    var note = null;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) { note = notesState.notes[i]; break; }
    }
    if (!note) return;
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span> ';
      }
    }
    mc.innerHTML =
      '<div class="note-detail">' +
        '<div class="note-detail-header">' +
          '<button class="page-back-btn" onclick="renderNotesView(document.getElementById(\\'mainContent\\'))" style="width:44px;height:44px;flex-shrink:0;">&#8592;</button>' +
          '<h1 style="margin:0;font-size:18px;flex:1;min-width:0;">' + escapeHtml(note.title || 'Untitled') + '</h1>' +
          '<button class="note-action-btn" style="flex:0 0 auto;width:auto;padding:0 16px;" onclick="openNoteEditor(' + note.id + ')">Edit</button>' +
        '</div>' +
        '<div class="note-detail-meta">' + tagsHtml +
          '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
        '</div>' +
        '<div class="note-detail-body">' +
          '<div class="note-detail-content msg-assistant note-doc">' + md(note.content || '') + '</div>' +
        '</div>' +
      '</div>';
  };

  window.openNoteEditor = async function(id) {
    var note = null;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) { note = notesState.notes[i]; break; }
    }
    if (!note) return;
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    await renderNotesView(mc);
    showComposePanel(note);
  };
`;
}
