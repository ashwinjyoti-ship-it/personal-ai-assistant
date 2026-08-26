// notes — Karna frontend section
export function getNotesScript(): string {
  return `  // ============================================================
  // NOTES
  // ============================================================

  var notesState = {
    notes: [],
    activeFilter: 'all',
    searchQuery: '',
    screen: 'list',
    activeNoteId: null,
    composeCancelTo: 'list',
    composeMode: 'read',
    composePreviewTimer: null,
    editingNote: null,
    deleteConfirmId: null,
    searchTimer: null,
    allTags: []
  };

  function notesHostEl() {
    return document.getElementById('kdNotesHost') || document.getElementById('mainContent');
  }

  function notesFindById(id) {
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) return notesState.notes[i];
    }
    return null;
  }

  function notesUpsert(note) {
    var found = false;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === note.id) {
        notesState.notes[i] = note;
        found = true;
        break;
      }
    }
    if (!found) notesState.notes.unshift(note);
    notesState.allTags = notesExtractTags(notesState.notes);
  }

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
      ? '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', true)">Tap again</button>'
      : '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', false)">Delete</button>';

    return '<div class="note-card' + (pinned ? ' note-card--pinned' : '') + '" data-note-id="' + note.id + '">' +
      '<div class="note-card-row">' +
        '<span class="note-pin" onclick="event.stopPropagation();togglePin(' + note.id + ',' + pinned + ')" title="Pin note">' + (pinned ? '⭐' : '☆') + '</span>' +
        '<div class="note-card-content" onclick="showNoteDetail(' + note.id + ')">' +
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
    notesState.screen = 'list';
    notesState.activeNoteId = null;
    notesState.editingNote = null;
    container.innerHTML =
      '<div class="notes-page">' +
        '<div class="notes-toolbar">' +
          '<button class="page-back-btn" onclick="goBackFromNotes()" style="width:44px;height:44px;flex-shrink:0;" aria-label="Back">&#8592;</button>' +
          '<input type="search" class="notes-search" id="notesSearchInput" placeholder="Search notes..." autocomplete="off">' +
          '<button class="notes-fab" id="notesFabBtn" title="New note" aria-label="New note">+</button>' +
        '</div>' +
        '<div class="notes-filters" id="notesFilters"></div>' +
        '<div class="notes-list-scroll">' +
          '<div class="notes-grid" id="notesGrid"><div style="color:var(--text-muted);padding:24px;text-align:center;">Loading notes...</div></div>' +
        '</div>' +
      '</div>';

    document.getElementById('notesFabBtn').onclick = function() { openNoteCompose(null, 'list'); };
    document.getElementById('notesSearchInput').oninput = function(e) { searchNotes(e.target.value); };
    var backBtn = container.querySelector('.page-back-btn');
    if (backBtn && document.getElementById('karnaDesktop') && typeof kdOpenNav === 'function') {
      backBtn.onclick = function() { kdOpenNav('threads'); };
    }

    notesState.deleteConfirmId = null;
    await loadNotesList();
  }

  window.showNotesList = function() {
    var mc = notesHostEl();
    if (mc) renderNotesView(mc);
  };

  function renderNoteDetailPage(note) {
    var mc = notesHostEl();
    if (!mc || !note) return;
    notesState.screen = 'detail';
    notesState.activeNoteId = note.id;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span>';
      }
    }
    mc.innerHTML =
      '<div class="note-screen note-detail-page">' +
        '<div class="note-detail-header">' +
          '<button class="page-back-btn" onclick="showNotesList()" style="width:44px;height:44px;flex-shrink:0;" aria-label="All notes">&#8592;</button>' +
          '<h1>' + escapeHtml(note.title || 'Untitled') + '</h1>' +
          '<button class="note-action-btn" style="flex:0 0 auto;width:auto;padding:0 16px;height:40px;" onclick="openNoteEditor(' + note.id + ')">Edit</button>' +
        '</div>' +
        '<div class="note-detail-meta">' + tagsHtml +
          '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
        '</div>' +
        '<div class="note-detail-body">' +
          '<div class="note-detail-content msg-assistant note-doc">' + md(note.content || '') + '</div>' +
        '</div>' +
      '</div>';
  }

  function refreshComposePreview() {
    var preview = document.getElementById('noteComposePreview');
    var contentEl = document.getElementById('noteContentInput');
    if (!preview || !contentEl) return;
    var content = contentEl.value.trim();
    preview.innerHTML = content
      ? md(content)
      : '<p style="color:var(--text-muted);margin:0;">No content yet. Tap “Edit text” to write.</p>';
  }

  function setComposeMode(mode) {
    notesState.composeMode = mode;
    var readPanel = document.getElementById('noteComposeRead');
    var writePanel = document.getElementById('noteComposeWrite');
    var modeBtn = document.getElementById('noteComposeModeBtn');
    if (!readPanel || !writePanel || !modeBtn) return;
    if (mode === 'read') {
      refreshComposePreview();
      readPanel.style.display = 'block';
      writePanel.style.display = 'none';
      modeBtn.textContent = 'Edit text';
    } else {
      readPanel.style.display = 'none';
      writePanel.style.display = 'flex';
      modeBtn.textContent = 'Preview';
      refreshComposePreview();
      var contentEl = document.getElementById('noteContentInput');
      if (contentEl) contentEl.focus();
    }
  }

  window.toggleComposeMode = function() {
    setComposeMode(notesState.composeMode === 'read' ? 'write' : 'read');
  };

  function scheduleComposePreview() {
    if (notesState.composePreviewTimer) clearTimeout(notesState.composePreviewTimer);
    notesState.composePreviewTimer = setTimeout(function() {
      notesState.composePreviewTimer = null;
      if (notesState.composeMode === 'write') refreshComposePreview();
    }, 150);
  }

  function renderNoteComposePage(note, cancelTo) {
    var mc = notesHostEl();
    if (!mc) return;
    notesState.screen = 'compose';
    notesState.editingNote = note;
    notesState.composeCancelTo = cancelTo || 'list';
    var isNew = !note || !note.id;
    var hasContent = !!(note && note.content && note.content.trim());
    notesState.composeMode = isNew || !hasContent ? 'write' : 'read';
    var heading = isNew ? 'New note' : 'Edit note';
    mc.innerHTML =
      '<div class="note-screen note-compose-page">' +
        '<div class="note-detail-header">' +
          '<button class="page-back-btn" onclick="cancelNoteCompose()" style="width:44px;height:44px;flex-shrink:0;" aria-label="Cancel">&#8592;</button>' +
          '<h1>' + heading + '</h1>' +
          '<button type="button" class="note-action-btn" id="noteComposeModeBtn" style="flex:0 0 auto;width:auto;padding:0 14px;height:40px;" onclick="toggleComposeMode()">Edit text</button>' +
        '</div>' +
        '<div class="note-compose-form">' +
          '<input type="text" id="noteTitleInput" placeholder="Title (optional)">' +
          '<div id="noteComposeRead" class="note-compose-read">' +
            '<div class="note-detail-body">' +
              '<div id="noteComposePreview" class="note-detail-content msg-assistant note-doc"></div>' +
            '</div>' +
          '</div>' +
          '<div id="noteComposeWrite" class="note-compose-write">' +
            '<textarea id="noteContentInput" placeholder="Write your note..."></textarea>' +
            '<div class="note-compose-live-preview">' +
              '<div class="note-compose-live-label">Preview</div>' +
              '<div class="note-detail-body note-compose-live-body">' +
                '<div id="noteComposeWritePreview" class="note-detail-content msg-assistant note-doc"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<input type="text" id="noteTagsInput" placeholder="Tags (comma-separated)">' +
          '<div class="note-compose-actions">' +
            '<button type="button" class="btn-cancel-note" id="noteCancelBtn">Cancel</button>' +
            '<button type="button" class="btn-save-note" id="noteSaveBtn">Save</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('noteTitleInput').value = note ? (note.title || '') : '';
    document.getElementById('noteContentInput').value = note ? (note.content || '') : '';
    document.getElementById('noteTagsInput').value = note ? (note.tags || '') : '';
    document.getElementById('noteCancelBtn').onclick = cancelNoteCompose;
    document.getElementById('noteSaveBtn').onclick = saveNote;
    document.getElementById('noteContentInput').oninput = function() {
      var writePreview = document.getElementById('noteComposeWritePreview');
      if (writePreview && notesState.composeMode === 'write') {
        var c = document.getElementById('noteContentInput').value.trim();
        writePreview.innerHTML = c ? md(c) : '<p style="color:var(--text-muted);margin:0;">Start typing to see a preview.</p>';
      }
      scheduleComposePreview();
    };
    setComposeMode(notesState.composeMode);
    if (notesState.composeMode === 'write') {
      var writePreview = document.getElementById('noteComposeWritePreview');
      if (writePreview) {
        var initial = document.getElementById('noteContentInput').value.trim();
        writePreview.innerHTML = initial ? md(initial) : '<p style="color:var(--text-muted);margin:0;">Start typing to see a preview.</p>';
      }
      document.getElementById('noteTitleInput').focus();
    } else {
      document.getElementById('noteTitleInput').focus();
    }
  }

  window.openNoteCompose = function(note, cancelTo) {
    renderNoteComposePage(note, cancelTo || 'list');
  };

  window.cancelNoteCompose = function() {
    if (notesState.composeCancelTo === 'detail' && notesState.editingNote && notesState.editingNote.id) {
      renderNoteDetailPage(notesFindById(notesState.editingNote.id) || notesState.editingNote);
    } else {
      showNotesList();
    }
  };

  async function saveNote() {
    var titleEl = document.getElementById('noteTitleInput');
    var contentEl = document.getElementById('noteContentInput');
    var tagsEl = document.getElementById('noteTagsInput');
    if (!titleEl || !contentEl || !tagsEl) return;
    var title = titleEl.value.trim();
    var content = contentEl.value.trim();
    var tags = tagsEl.value.trim();
    if (!content) {
      showToast('Note content is required', 'warning');
      return;
    }
    try {
      var saved = null;
      if (notesState.editingNote && notesState.editingNote.id) {
        var updated = await api('/notes/' + notesState.editingNote.id, {
          method: 'PUT',
          body: JSON.stringify({ title: title, content: content, tags: tags })
        });
        saved = updated.note;
        showToast('Note updated', 'success');
      } else {
        var created = await api('/notes', {
          method: 'POST',
          body: JSON.stringify({ title: title, content: content, tags: tags, source: 'manual' })
        });
        saved = created.note;
        showToast('Note saved', 'success');
      }
      if (saved) {
        notesUpsert(saved);
        renderNoteDetailPage(saved);
      }
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  }

  window.editNote = function(id) {
    var note = notesFindById(id);
    if (note) openNoteCompose(note, 'list');
  };

  window.openNoteEditor = function(id) {
    var note = notesFindById(id);
    if (note) openNoteCompose(note, 'detail');
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
    var note = notesFindById(id);
    if (!note) return;
    renderNoteDetailPage(note);
  };
`;
}
