// desktop-views — Phase 5 centre tabs for Documents, Digests, Memory, Skills, Schedules
// Opens inside the desktop shell; never tears down to the mobile Warm Clay screens.

export function getDesktopViewsScript(): string {
  return `  // ============================================================
  // DESKTOP VIEWS — Phase 5 rail sections as centre tabs
  // ============================================================

  var KD_VIEW_META = {
    documents: { title: 'Documents', sub: 'Library' },
    notes: { title: 'Notes', sub: 'Pinned & tagged' },
    digests: { title: 'Digests', sub: 'Briefings & reviews' },
    memory: { title: 'Memory', sub: 'Working & long-term' },
    skills: { title: 'Skills', sub: 'Registry' },
    reminders: { title: 'Reminders', sub: 'Scheduled alerts' },
    schedules: { title: 'Schedules', sub: 'Cron & agent jobs' },
    settings: { title: 'Settings', sub: 'Account & workspace' },
  };

  var KD_DIGEST_META = {
    morning: { title: 'Morning' },
    evening: { title: 'Evening' },
    weekly: { title: 'Weekly' },
    email: { title: 'Email' },
  };

  function kdSetViewMode(on) {
    var root = document.getElementById('karnaDesktop');
    if (!root) return;
    root.classList.toggle('view-mode', !!on);
    var rename = document.getElementById('kdRenameBtn');
    var del = document.getElementById('kdDeleteBtn');
    if (rename) rename.style.display = on ? 'none' : '';
    if (del) del.style.display = on ? 'none' : '';
  }

  function kdEnsureViewTab(type, id, title) {
    var key = kdTabKey(type, id || type);
    var existing = state.desktop.tabs.find(function(t) { return t.key === key; });
    if (!existing) {
      state.desktop.tabs.push({ key: key, type: type, id: id || type, title: title || type });
    } else if (title) {
      existing.title = title;
    }
    state.desktop.activeTabKey = key;
    kdRenderTabs();
    return key;
  }

  function kdActivateTab(tab) {
    if (!tab) return;
    if (tab.type === 'thread') {
      kdOpenThread(tab.id);
      return;
    }
    if (tab.type === 'document') {
      kdOpenDocument(tab.id, tab.title);
      return;
    }
    if (tab.type === 'digest') {
      kdOpenDigestDetail(tab.id);
      return;
    }
    if (tab.type === 'settings') {
      kdOpenSettings(state.settingsSection || null);
      return;
    }
    if (KD_VIEW_META[tab.type]) {
      kdOpenView(tab.type);
    }
  }

  function kdOpenNav(nav) {
    document.querySelectorAll('#kdNav a').forEach(function(x) {
      x.classList.toggle('on', x.getAttribute('data-nav') === nav);
    });
    if (nav === 'threads') {
      state.desktop.railMode = 'threads';
      kdSetViewMode(false);
      kdLoadThreads();
      if (state.activeThreadId) kdOpenThread(state.activeThreadId);
      else kdRenderEmptyCentre();
      return;
    }
    if (KD_VIEW_META[nav]) {
      kdOpenView(nav);
    }
  }

  async function kdOpenView(nav) {
    var meta = KD_VIEW_META[nav];
    if (!meta) return;
    clearActiveThreadId();
    state.desktop.railMode = nav === 'documents' ? 'documents' : 'threads';
    kdEnsureViewTab(nav, nav, meta.title);
    kdSetViewMode(true);
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    var stream = document.getElementById('kdStream');
    if (title) title.textContent = meta.title;
    if (sub) sub.textContent = meta.sub;
    if (stream) stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading…</div></div>';
    if (nav === 'documents') {
      await kdLoadDocumentsRail();
      await kdRenderDocumentsCentre();
    } else if (nav === 'digests') {
      kdRenderRail();
      await kdRenderDigestsCentre();
    } else if (nav === 'memory') {
      kdRenderRail();
      await kdRenderMemoryCentre();
    } else if (nav === 'skills') {
      kdRenderRail();
      await kdRenderSkillsCentre();
    } else if (nav === 'schedules') {
      kdRenderRail();
      await kdRenderSchedulesCentre();
    } else if (nav === 'notes') {
      kdRenderRail();
      await kdRenderNotesCentre();
    } else if (nav === 'reminders') {
      kdRenderRail();
      await kdRenderRemindersCentre();
    } else if (nav === 'settings') {
      kdRenderRail();
      await kdRenderSettingsCentre(state.settingsSection || 'profile');
    }
  }

  async function kdRenderNotesCentre() {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    if (typeof renderNotesView !== 'function') {
      stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Notes module unavailable.</div></div>';
      return;
    }
    stream.innerHTML = '<div class="kd-view kd-embed" id="kdNotesHost"></div>';
    var host = document.getElementById('kdNotesHost');
    await renderNotesView(host);
    var back = host && host.querySelector('.page-back-btn');
    if (back) back.onclick = function() { kdOpenNav('threads'); };
  }

  async function kdRenderRemindersCentre() {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    if (typeof renderRemindersView !== 'function') {
      stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Reminders module unavailable.</div></div>';
      return;
    }
    stream.innerHTML = '<div class="kd-view kd-embed" id="kdRemindersHost"></div>';
    var host = document.getElementById('kdRemindersHost');
    await renderRemindersView(host);
    var back = host && host.querySelector('.page-back-btn');
    if (back) back.onclick = function() { kdOpenNav('threads'); };
  }

  // ── Settings (config only — stays inside .kd) ────────────────

  function kdOpenSettings(section) {
    var active = state.desktop.activeTabKey;
    if (active && active !== kdTabKey('settings', 'settings')) {
      state.desktop.prevTabKey = active;
    }
    clearActiveThreadId();
    state.desktop.railMode = 'threads';
    state.settingsSection = section || 'profile';
    kdEnsureViewTab('settings', 'settings', 'Settings');
    kdSetViewMode(true);
    document.querySelectorAll('#kdNav a').forEach(function(x) { x.classList.remove('on'); });
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    if (title) title.textContent = 'Settings';
    if (sub) sub.textContent = 'Account & workspace';
    kdRenderRail();
    kdRenderSettingsCentre(state.settingsSection);
  }

  function kdLeaveSettings() {
    var key = kdTabKey('settings', 'settings');
    state.desktop.tabs = state.desktop.tabs.filter(function(t) { return t.key !== key; });
    state.settingsSection = null;
    var prevKey = state.desktop.prevTabKey;
    state.desktop.prevTabKey = null;
    var prev = prevKey ? state.desktop.tabs.find(function(t) { return t.key === prevKey; }) : null;
    if (prev) {
      kdActivateTab(prev);
      return;
    }
    var next = state.desktop.tabs[state.desktop.tabs.length - 1];
    if (next) {
      kdActivateTab(next);
      return;
    }
    state.desktop.activeTabKey = null;
    kdSetViewMode(false);
    state.desktop.railMode = 'threads';
    kdRenderEmptyCentre();
    kdRenderTabs();
    kdRenderRail();
  }

  /** Called from renderView() when Warm Clay #mainContent is absent. */
  function refreshDesktopView() {
    if (!document.getElementById('karnaDesktop') || !state.desktop) return;
    var key = state.desktop.activeTabKey;
    var tab = (state.desktop.tabs || []).find(function(t) { return t.key === key; });
    if (!tab) return;
    if (tab.type === 'settings') return kdRenderSettingsCentre(state.settingsSection || 'profile');
    if (tab.type === 'skills') return kdRenderSkillsCentre();
    if (tab.type === 'schedules') return kdRenderSchedulesCentre();
    if (tab.type === 'reminders') return kdRenderRemindersCentre();
    if (tab.type === 'notes') return kdRenderNotesCentre();
    if (tab.type === 'memory') return kdRenderMemoryCentre();
    if (tab.type === 'documents') {
      kdLoadDocumentsRail();
      return kdRenderDocumentsCentre();
    }
    if (tab.type === 'digests') return kdRenderDigestsCentre();
    if (tab.type === 'document') return kdOpenDocument(tab.id, tab.title);
    if (tab.type === 'digest') return kdOpenDigestDetail(tab.id);
    if (tab.type === 'thread') return kdOpenThread(tab.id);
  }

  /** Leave the current centre view tab (notes/reminders/settings/…) without Warm Clay. */
  function kdLeaveCentreView() {
    var key = state.desktop && state.desktop.activeTabKey;
    if (key === kdTabKey('settings', 'settings')) {
      kdLeaveSettings();
      return;
    }
    if (key) {
      kdCloseTab(key);
      return;
    }
    kdOpenNav('threads');
  }

  async function kdRenderSettingsCentre(section) {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    var active = section || state.settingsSection || 'profile';
    state.settingsSection = active;
    var sections = (typeof desktopSettingsSections !== 'undefined' && desktopSettingsSections)
      ? desktopSettingsSections
      : [];
    var navHtml = '';
    for (var gi = 0; gi < sections.length; gi++) {
      var grp = sections[gi];
      navHtml += '<div class="kd-set-group">' + escapeHtml(grp.group) + '</div>';
      for (var ii = 0; ii < grp.items.length; ii++) {
        var item = grp.items[ii];
        if (item.rail) {
          navHtml += '<button type="button" class="kd-set-item rail" data-rail="' + escapeHtml(item.rail) + '">' +
            '<span class="kd-set-ico">' + item.icon + '</span>' + escapeHtml(item.label) +
            '<span class="kd-set-ext">↗</span></button>';
        } else {
          var on = active === item.section ? ' on' : '';
          navHtml += '<button type="button" class="kd-set-item' + on + '" data-sec="' + escapeHtml(item.section) + '">' +
            '<span class="kd-set-ico">' + item.icon + '</span>' + escapeHtml(item.label) + '</button>';
        }
      }
    }
    var label = (typeof sectionLabels !== 'undefined' && sectionLabels[active]) ? sectionLabels[active] : active;
    stream.innerHTML =
      '<div class="kd-view kd-settings" id="kdSettingsPanel">' +
        '<div class="kd-toolbar">' +
          '<button type="button" class="kd-btn" id="kdSettingsBack">← Back</button>' +
          '<span class="kd-muted" style="margin-left:4px">Settings · ' + escapeHtml(label) + '</span>' +
        '</div>' +
        '<div class="kd-set-layout">' +
          '<nav class="kd-set-nav" aria-label="Settings sections">' + navHtml + '</nav>' +
          '<div class="kd-set-content" id="kdSettingsContent"><div class="kd-muted">Loading…</div></div>' +
        '</div>' +
      '</div>';

    var back = document.getElementById('kdSettingsBack');
    if (back) back.onclick = function() { kdLeaveSettings(); };

    stream.querySelectorAll('[data-sec]').forEach(function(btn) {
      btn.onclick = function() {
        kdRenderSettingsCentre(btn.getAttribute('data-sec'));
      };
    });
    stream.querySelectorAll('[data-rail]').forEach(function(btn) {
      btn.onclick = function() {
        kdOpenNav(btn.getAttribute('data-rail'));
      };
    });

    var content = document.getElementById('kdSettingsContent');
    if (content && typeof renderSettingsSection === 'function') {
      await renderSettingsSection(content, active);
    } else if (content) {
      content.innerHTML = '<div class="kd-muted">Settings modules still loading. Refresh and try again.</div>';
    }
  }

  // ── Documents: list in rail, document in centre ──────────────

  async function kdLoadDocumentsRail() {
    var list = document.getElementById('kdThreadList');
    var count = document.getElementById('kdThreadCount');
    if (!list) return;
    list.innerHTML = '<div class="eyebrow">Loading…</div>';
    try {
      var data = await api('/documents', { method: 'GET' });
      var docs = data.documents || [];
      if (count) count.textContent = String(docs.length);
      if (!docs.length) {
        list.innerHTML = '<div class="eyebrow">Documents</div><div class="th"><div class="t">No documents yet</div><div class="m">Upload from centre</div></div>';
        return;
      }
      var html = '<div class="eyebrow">Library</div><div class="grp">';
      for (var i = 0; i < docs.length; i++) {
        var d = docs[i];
        var ready = ['parsed', 'summarized'].indexOf(d.status) >= 0;
        html += '<div class="th" data-doc="' + escapeHtml(String(d.id)) + '">' +
          '<div class="t">' + escapeHtml(d.name || 'Untitled') + '</div>' +
          '<div class="m">' + (ready ? 'Ready' : escapeHtml(d.status || '')) + '</div></div>';
      }
      html += '</div>';
      list.innerHTML = html;
      list.querySelectorAll('[data-doc]').forEach(function(el) {
        el.addEventListener('click', function() {
          kdOpenDocument(el.getAttribute('data-doc'), el.querySelector('.t').textContent);
        });
      });
    } catch (e) {
      list.innerHTML = '<div class="eyebrow" style="color:var(--red)">Could not load documents</div>';
    }
  }

  async function kdRenderDocumentsCentre() {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    stream.innerHTML =
      '<div class="kd-view">' +
        '<div class="kd-toolbar">' +
          '<button type="button" class="kd-btn" id="kdDocUploadBtn">Upload</button>' +
          '<input type="file" id="kdDocFile" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" style="display:none">' +
          '<input type="search" class="kd-input" id="kdDocSearch" placeholder="Search documents…">' +
        '</div>' +
        '<div class="kd-muted" style="margin-top:24px">Select a document from the rail, or upload a new file.</div>' +
        '<div id="kdDocUploadStatus" class="kd-muted" style="margin-top:12px"></div>' +
      '</div>';
    var btn = document.getElementById('kdDocUploadBtn');
    var file = document.getElementById('kdDocFile');
    if (btn && file) {
      btn.onclick = function() { file.click(); };
      file.onchange = function() { kdUploadDocument(file); };
    }
    var search = document.getElementById('kdDocSearch');
    if (search) {
      search.onkeydown = function(e) {
        if (e.key === 'Enter') kdSearchDocuments(search.value);
      };
    }
  }

  async function kdUploadDocument(input) {
    var f = input.files && input.files[0];
    if (!f) return;
    var status = document.getElementById('kdDocUploadStatus');
    if (status) status.textContent = 'Uploading…';
    var formData = new FormData();
    formData.append('file', f);
    try {
      var response = await fetch(API + '/documents/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + (state.session ? state.session.sessionId : '') }
      });
      if (!response.ok) {
        var err = await response.json().catch(function() { return {}; });
        throw new Error(err.error || 'Upload failed');
      }
      if (status) status.textContent = 'Upload complete. Processing…';
      if (typeof showToast === 'function') showToast('Document uploaded', 'success');
      input.value = '';
      await kdLoadDocumentsRail();
    } catch (e) {
      if (status) status.textContent = 'Upload failed: ' + e.message;
      if (typeof showToast === 'function') showToast(e.message, 'error');
    }
  }

  async function kdSearchDocuments(q) {
    if (!q || !q.trim()) { await kdLoadDocumentsRail(); return; }
    try {
      var data = await api('/documents/search', {
        method: 'POST',
        body: JSON.stringify({ query: q.trim() })
      });
      var list = document.getElementById('kdThreadList');
      if (!list) return;
      var hits = data.results || [];
      if (!hits.length) {
        list.innerHTML = '<div class="eyebrow">Search</div><div class="th"><div class="t">No matches</div></div>';
        return;
      }
      var html = '<div class="eyebrow">Results</div><div class="grp">';
      for (var i = 0; i < hits.length; i++) {
        var d = hits[i];
        var id = d.document_id || d.id;
        html += '<div class="th" data-doc="' + escapeHtml(String(id)) + '">' +
          '<div class="t">' + escapeHtml(d.filename || d.name || 'Untitled') + '</div>' +
          '<div class="m">' + escapeHtml((d.chunk || d.snippet || '').substring(0, 80)) + '</div></div>';
      }
      html += '</div>';
      list.innerHTML = html;
      list.querySelectorAll('[data-doc]').forEach(function(el) {
        el.addEventListener('click', function() {
          kdOpenDocument(el.getAttribute('data-doc'), el.querySelector('.t').textContent);
        });
      });
    } catch (e) {
      if (typeof showToast === 'function') showToast('Search failed', 'error');
    }
  }

  async function kdOpenDocument(docId, titleHint) {
    clearActiveThreadId();
    state.desktop.railMode = 'documents';
    kdEnsureViewTab('document', docId, titleHint || 'Document');
    kdSetViewMode(true);
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    var stream = document.getElementById('kdStream');
    if (stream) stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading document…</div></div>';
    try {
      var response = await api('/documents/' + docId, { method: 'GET' });
      if (response.error) throw new Error(response.error);
      var name = response.filename || response.name || titleHint || 'Document';
      kdEnsureViewTab('document', docId, name);
      if (title) title.textContent = name;
      if (sub) sub.textContent = (response.status || 'document') + (response.metadata && response.metadata.wordCount ? ' · ' + response.metadata.wordCount + ' words' : '');
      var html = '<div class="kd-view kd-doc">';
      html += '<div class="kd-toolbar">' +
        '<button type="button" class="kd-btn" id="kdDocBack">All documents</button>' +
        '<button type="button" class="kd-btn danger" id="kdDocDelete">Delete</button>' +
      '</div>';
      html += '<section class="kd-panel"><h3>Summary</h3><div class="kd-prose">' +
        escapeHtml(response.summary || 'No summary available') + '</div></section>';
      if (response.key_terms && Object.keys(response.key_terms).length) {
        html += '<section class="kd-panel"><h3>Key terms</h3><div class="kd-kv">';
        for (var key in response.key_terms) {
          html += '<div><b>' + escapeHtml(key) + '</b><span>' + escapeHtml(String(response.key_terms[key])) + '</span></div>';
        }
        html += '</div></section>';
      }
      html += '</div>';
      if (stream) stream.innerHTML = html;
      var back = document.getElementById('kdDocBack');
      if (back) back.onclick = function() { kdOpenView('documents'); };
      var del = document.getElementById('kdDocDelete');
      if (del) del.onclick = async function() {
        if (!confirm('Delete this document?')) return;
        await api('/documents/' + docId, { method: 'DELETE' });
        kdCloseTab(kdTabKey('document', docId));
        kdOpenView('documents');
      };
      await kdLoadDocumentsRail();
      document.querySelectorAll('#kdThreadList [data-doc]').forEach(function(el) {
        el.classList.toggle('on', el.getAttribute('data-doc') === String(docId));
      });
    } catch (e) {
      if (stream) stream.innerHTML = '<div class="kd-view"><div class="kd-muted" style="color:var(--red)">' + escapeHtml(e.message) + '</div></div>';
    }
  }

  // ── Digests ──────────────────────────────────────────────────

  async function kdRenderDigestsCentre(filter) {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    var f = filter || 'all';
    var kinds = ['morning', 'evening', 'weekly', 'email'];
    var pills = '<button type="button" class="kd-pill' + (f === 'all' ? ' on' : '') + '" data-f="all">All</button>';
    for (var i = 0; i < kinds.length; i++) {
      var k = kinds[i];
      pills += '<button type="button" class="kd-pill' + (f === k ? ' on' : '') + '" data-f="' + k + '">' +
        escapeHtml((KD_DIGEST_META[k] || {}).title || k) + '</button>';
    }
    stream.innerHTML =
      '<div class="kd-view">' +
        '<div class="kd-toolbar">' + pills +
          '<button type="button" class="kd-btn" id="kdDigestCfg" style="margin-left:auto" title="Digest schedule & channels">Configure</button>' +
          '<button type="button" class="kd-btn" id="kdDigestGen">Generate evening</button>' +
        '</div>' +
        '<div id="kdDigestList" class="kd-list"><div class="kd-muted">Loading…</div></div>' +
      '</div>';
    stream.querySelectorAll('[data-f]').forEach(function(btn) {
      btn.onclick = function() { kdRenderDigestsCentre(btn.getAttribute('data-f')); };
    });
    var cfg = document.getElementById('kdDigestCfg');
    if (cfg) cfg.onclick = function() { kdOpenSettings('digests'); };
    var gen = document.getElementById('kdDigestGen');
    if (gen) gen.onclick = async function() {
      gen.disabled = true;
      gen.textContent = 'Generating…';
      try {
        await api('/digests/generate', { method: 'POST', body: JSON.stringify({ kind: 'evening', force: true }) });
        await kdRenderDigestsCentre(f);
      } catch (e) {
        if (typeof showToast === 'function') showToast('Generate failed', 'error');
        gen.disabled = false;
        gen.textContent = 'Generate evening';
      }
    };
    var query = f !== 'all' ? '?kind=' + f + '&limit=40' : '?limit=40';
    try {
      var data = await api('/digests' + query);
      var list = data.digests || [];
      var wrap = document.getElementById('kdDigestList');
      if (!wrap) return;
      if (!list.length) {
        wrap.innerHTML = '<div class="kd-muted">No digests yet. Generate one or wait for the schedule.</div>';
        return;
      }
      var html = '';
      for (var j = 0; j < list.length; j++) {
        var d = list[j];
        var meta = KD_DIGEST_META[d.kind] || { title: d.kind };
        var when = d.created_at ? new Date(d.created_at).toLocaleString() : '';
        html += '<button type="button" class="kd-row" data-digest="' + d.id + '">' +
          '<span class="kd-row-title">' + escapeHtml(meta.title) + '</span>' +
          '<span class="kd-row-meta">' + escapeHtml(when) + '</span>' +
        '</button>';
      }
      wrap.innerHTML = html;
      wrap.querySelectorAll('[data-digest]').forEach(function(row) {
        row.onclick = function() { kdOpenDigestDetail(parseInt(row.getAttribute('data-digest'), 10)); };
      });
    } catch (e) {
      var w = document.getElementById('kdDigestList');
      if (w) w.innerHTML = '<div class="kd-muted" style="color:var(--red)">Could not load digests</div>';
    }
  }

  async function kdOpenDigestDetail(id) {
    clearActiveThreadId();
    kdEnsureViewTab('digest', id, 'Digest');
    kdSetViewMode(true);
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    var stream = document.getElementById('kdStream');
    if (stream) stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading digest…</div></div>';
    try {
      var data = await api('/digests/' + id);
      if (!data || data.error) throw new Error((data && data.error) || 'Not found');
      var digest = data.digest;
      var items = data.items || [];
      var content = digest.content || { sections: [], highlights: [] };
      var meta = KD_DIGEST_META[digest.kind] || { title: digest.kind };
      kdEnsureViewTab('digest', id, meta.title);
      if (title) title.textContent = meta.title;
      if (sub) sub.textContent = digest.created_at ? new Date(digest.created_at).toLocaleString() : '';
      var checkedCount = 0;
      for (var ci = 0; ci < items.length; ci++) { if (items[ci].checked) checkedCount++; }
      var html = '<div class="kd-view kd-digest">';
      html += '<div class="kd-toolbar">' +
        '<button type="button" class="kd-btn" id="kdDigestBack">All digests</button>' +
        '<button type="button" class="kd-btn" id="kdDigestResend">Resend</button>' +
        '<button type="button" class="kd-btn danger" id="kdDigestDelete">Delete</button>' +
      '</div>';
      if (content.highlights && content.highlights.length) {
        html += '<section class="kd-panel"><h3>Highlights</h3><ul class="kd-bullets">';
        for (var h = 0; h < content.highlights.length; h++) {
          html += '<li>' + escapeHtml(content.highlights[h]) + '</li>';
        }
        html += '</ul></section>';
      }
      if (items.length) {
        html += '<div class="kd-check-head">Checklist — ' + checkedCount + '/' + items.length + ' done</div>';
      }
      for (var s = 0; s < (content.sections || []).length; s++) {
        var section = content.sections[s];
        var sectionItems = items.filter(function(it) { return it.section === section.key; });
        html += '<section class="kd-panel"><h3>' + escapeHtml(section.title) + '</h3>';
        if (section.summary) html += '<p class="kd-muted">' + escapeHtml(section.summary) + '</p>';
        for (var si = 0; si < (section.items || []).length; si++) {
          var item = section.items[si];
          var matchRow = sectionItems.filter(function(it) { return it.item_key === item.key; })[0];
          if (matchRow) {
            html += '<label class="kd-check' + (matchRow.checked ? ' on' : '') + '">' +
              '<input type="checkbox" data-digest="' + digest.id + '" data-item="' + matchRow.id + '"' +
              (matchRow.checked ? ' checked' : '') + '>' +
              '<span>' + escapeHtml(item.text) + '</span></label>';
          } else {
            html += '<div class="kd-bullet-row">' + escapeHtml(item.text) + '</div>';
          }
        }
        html += '</section>';
      }
      html += '</div>';
      if (stream) stream.innerHTML = html;
      var back = document.getElementById('kdDigestBack');
      if (back) back.onclick = function() { kdOpenView('digests'); };
      var resend = document.getElementById('kdDigestResend');
      if (resend) resend.onclick = async function() {
        var res = await api('/digests/' + id + '/resend', { method: 'POST' });
        if (res && res.error) { if (typeof showToast === 'function') showToast(res.error, 'error'); return; }
        if (typeof showToast === 'function') showToast('Resent', 'success');
      };
      var delB = document.getElementById('kdDigestDelete');
      if (delB) delB.onclick = async function() {
        if (!confirm('Delete this digest?')) return;
        await api('/digests/' + id, { method: 'DELETE' });
        kdCloseTab(kdTabKey('digest', id));
        kdOpenView('digests');
      };
      stream.querySelectorAll('.kd-check input').forEach(function(cb) {
        cb.onchange = async function() {
          var label = cb.closest('.kd-check');
          if (label) label.classList.toggle('on', cb.checked);
          await api('/digests/' + cb.getAttribute('data-digest') + '/items/' + cb.getAttribute('data-item') + '/toggle', { method: 'POST' });
        };
      });
    } catch (e) {
      if (stream) stream.innerHTML = '<div class="kd-view"><div class="kd-muted" style="color:var(--red)">' + escapeHtml(e.message) + '</div></div>';
    }
  }

  // ── Memory ───────────────────────────────────────────────────

  async function kdRenderMemoryCentre(filter, typeFilter, search) {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    var f = filter || 'all';
    var tf = typeFilter || 'all';
    var q = search || '';
    stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading memory…</div></div>';
    try {
      var data = await api('/memory/review?limit=100');
      var memories = data.memories || [];
      var sugData = await api('/memory/suggestions?limit=20');
      var suggestions = (sugData && sugData.suggestions) || [];
      var html = '<div class="kd-view">';
      html += '<div class="kd-toolbar">' +
        '<button type="button" class="kd-pill' + (f === 'all' ? ' on' : '') + '" data-mf="all">All</button>' +
        '<button type="button" class="kd-pill' + (f === 'working' ? ' on' : '') + '" data-mf="working">Working</button>' +
        '<button type="button" class="kd-pill' + (f === 'long_term' ? ' on' : '') + '" data-mf="long_term">Long-term</button>' +
        '<input type="search" class="kd-input" id="kdMemSearch" placeholder="Search memory…" value="' + escapeHtml(q) + '">' +
      '</div>';
      html += '<div class="kd-toolbar" style="margin-top:8px">' +
        '<button type="button" class="kd-pill' + (tf === 'all' ? ' on' : '') + '" data-mt="all">All types</button>' +
        '<button type="button" class="kd-pill' + (tf === 'preference' ? ' on' : '') + '" data-mt="preference">Preferences</button>' +
        '<button type="button" class="kd-pill' + (tf === 'task' ? ' on' : '') + '" data-mt="task">Tasks</button>' +
        '<button type="button" class="kd-pill' + (tf === 'fact' ? ' on' : '') + '" data-mt="fact">Facts</button>' +
        '<button type="button" class="kd-pill' + (tf === 'decision' ? ' on' : '') + '" data-mt="decision">Decisions</button>' +
      '</div>';

      function renderTier(label, tier) {
        var rows = memories.filter(function(m) {
          if (m.tier !== tier) return false;
          if (f !== 'all' && m.tier !== f) return false;
          if (tf !== 'all' && m.type !== tf) return false;
          if (q && !((m.title + ' ' + m.content).toLowerCase().includes(q.toLowerCase()))) return false;
          return true;
        });
        if (f !== 'all' && f !== tier) return;
        html += '<div class="eyebrow" style="margin:20px 0 10px">' + label + ' (' + rows.length + ')</div>';
        if (!rows.length) {
          html += '<div class="kd-muted">None in this tier.</div>';
          return;
        }
        for (var i = 0; i < rows.length; i++) {
          var m = rows[i];
          html += '<div class="kd-card" data-mem="' + m.id + '">' +
            '<div class="kd-card-h"><span>' + escapeHtml(m.title) + '</span><span class="kd-tag">' + escapeHtml(m.type || '') + '</span></div>' +
            '<div class="kd-card-b">' + escapeHtml((m.content || '').substring(0, 280)) + ((m.content || '').length > 280 ? '…' : '') + '</div>' +
            '<div class="kd-card-a">';
          if (m.tier === 'long_term') html += '<button type="button" class="kd-btn" data-act="promote">Promote</button>';
          if (m.tier === 'working') html += '<button type="button" class="kd-btn" data-act="demote">Archive</button>';
          html += '<button type="button" class="kd-btn danger" data-act="delete">Forget</button></div></div>';
        }
      }
      renderTier('Working', 'working');
      renderTier('Long-term', 'long_term');

      if (suggestions.length) {
        html += '<div class="eyebrow" style="margin:24px 0 10px">Suggestions (' + suggestions.length + ')</div>';
        for (var j = 0; j < suggestions.length; j++) {
          var s = suggestions[j];
          html += '<div class="kd-card" data-sug="' + s.id + '">' +
            '<div class="kd-card-h"><span>' + escapeHtml(s.title) + '</span><span class="kd-tag">' + escapeHtml(s.type || '') + '</span></div>' +
            '<div class="kd-card-b">' + escapeHtml((s.content || '').substring(0, 280)) + '</div>' +
            '<div class="kd-card-a">' +
              '<button type="button" class="kd-btn primary" data-act="accept">Accept</button>' +
              '<button type="button" class="kd-btn danger" data-act="reject">Reject</button>' +
            '</div></div>';
        }
      }
      html += '</div>';
      stream.innerHTML = html;
      stream.querySelectorAll('[data-mf]').forEach(function(btn) {
        btn.onclick = function() { kdRenderMemoryCentre(btn.getAttribute('data-mf'), tf, q); };
      });
      stream.querySelectorAll('[data-mt]').forEach(function(btn) {
        btn.onclick = function() { kdRenderMemoryCentre(f, btn.getAttribute('data-mt'), q); };
      });
      var searchEl = document.getElementById('kdMemSearch');
      if (searchEl) {
        searchEl.onkeydown = function(e) {
          if (e.key === 'Enter') kdRenderMemoryCentre(f, tf, searchEl.value);
        };
      }
      stream.querySelectorAll('[data-mem]').forEach(function(card) {
        var id = card.getAttribute('data-mem');
        card.querySelectorAll('[data-act]').forEach(function(btn) {
          btn.onclick = async function() {
            var act = btn.getAttribute('data-act');
            if (act === 'promote') await api('/memory/review/' + id + '/promote', { method: 'POST' });
            else if (act === 'demote') await api('/memory/review/' + id + '/demote', { method: 'POST' });
            else if (act === 'delete') {
              if (!confirm('Forget this memory?')) return;
              await api('/memory/review/' + id, { method: 'DELETE' });
            }
            kdRenderMemoryCentre(f, tf, q);
          };
        });
      });
      stream.querySelectorAll('[data-sug]').forEach(function(card) {
        var id = card.getAttribute('data-sug');
        card.querySelectorAll('[data-act]').forEach(function(btn) {
          btn.onclick = async function() {
            var act = btn.getAttribute('data-act');
            if (act === 'accept') await api('/memory/suggestions/' + id + '/accept', { method: 'POST' });
            else await api('/memory/suggestions/' + id + '/reject', { method: 'POST' });
            kdRenderMemoryCentre(f, tf, q);
          };
        });
      });
    } catch (e) {
      stream.innerHTML = '<div class="kd-view"><div class="kd-muted" style="color:var(--red)">Could not load memory</div></div>';
    }
  }

  // ── Skills ───────────────────────────────────────────────────

  async function kdRenderSkillsCentre() {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading skills…</div></div>';
    try {
      var data = await api('/skills');
      var skills = data.skills || [];
      var autoSkills = data.auto_skills || [];
      var html = '<div class="kd-view">';
      html += '<div class="kd-toolbar"><button type="button" class="kd-btn primary" id="kdSkillNew">New skill</button></div>';
      html += '<div class="eyebrow" style="margin:16px 0 10px">Your skills</div>';
      if (!skills.length) {
        html += '<div class="kd-muted">No skills yet. Create one or ask Karna in chat.</div>';
      } else {
        for (var i = 0; i < skills.length; i++) {
          html += kdSkillCardHtml(skills[i], false);
        }
      }
      if (autoSkills.length) {
        html += '<div class="eyebrow" style="margin:24px 0 10px">Auto-learned</div>';
        for (var j = 0; j < autoSkills.length; j++) {
          html += kdSkillCardHtml(autoSkills[j], true);
        }
      }
      html += '</div>';
      stream.innerHTML = html;
      var neu = document.getElementById('kdSkillNew');
      if (neu) neu.onclick = function() {
        if (typeof showCreateSkillModal === 'function') showCreateSkillModal();
        else if (typeof showToast === 'function') showToast('Open Skills on mobile to create', 'info');
      };
      stream.querySelectorAll('[data-skill]').forEach(function(card) {
        var id = card.getAttribute('data-skill');
        var enabled = card.getAttribute('data-enabled') === '1';
        card.querySelectorAll('[data-act]').forEach(function(btn) {
          btn.onclick = async function() {
            var act = btn.getAttribute('data-act');
            if (act === 'toggle') {
              await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ enabled: !enabled }) });
            } else if (act === 'promote') {
              if (!confirm('Promote this auto-skill to manual?')) return;
              await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ promote: true }) });
            } else if (act === 'delete') {
              if (!confirm('Delete this skill?')) return;
              await api('/skills/' + id, { method: 'DELETE' });
            } else if (act === 'edit' && typeof editSkill === 'function') {
              editSkill(parseInt(id, 10));
              return;
            }
            kdRenderSkillsCentre();
          };
        });
      });
    } catch (e) {
      stream.innerHTML = '<div class="kd-view"><div class="kd-muted" style="color:var(--red)">Could not load skills</div></div>';
    }
  }

  function kdSkillCardHtml(s, isAuto) {
    return '<div class="kd-card" data-skill="' + s.id + '" data-enabled="' + (s.enabled ? '1' : '0') + '">' +
      '<div class="kd-card-h"><span>' + escapeHtml(s.name) + (isAuto ? ' <span class="kd-tag">auto</span>' : '') +
        (s.enabled ? '' : ' <span class="kd-tag" style="color:var(--red)">disabled</span>') +
      '</span><span class="kd-tag">' + escapeHtml(s.slug || '') + '</span></div>' +
      '<div class="kd-card-b">' + escapeHtml(s.description || '') + '</div>' +
      '<div class="kd-muted" style="margin-top:6px">Used ' + (s.usage_count || 0) + ' times</div>' +
      '<div class="kd-card-a">' +
        '<button type="button" class="kd-btn" data-act="toggle">' + (s.enabled ? 'Disable' : 'Enable') + '</button>' +
        (isAuto ? '<button type="button" class="kd-btn" data-act="promote">Promote</button>' : '<button type="button" class="kd-btn" data-act="edit">Edit</button>') +
        '<button type="button" class="kd-btn danger" data-act="delete">Delete</button>' +
      '</div></div>';
  }

  // ── Schedules ────────────────────────────────────────────────

  async function kdRenderSchedulesCentre(selectedId) {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    stream.innerHTML = '<div class="kd-view"><div class="kd-muted">Loading schedules…</div></div>';
    try {
      var data = await api('/settings/schedules');
      var schedules = data.schedules || [];
      var selected = null;
      for (var i = 0; i < schedules.length; i++) {
        if (String(schedules[i].id) === String(selectedId)) selected = schedules[i];
      }
      if (!selected && schedules.length) selected = schedules[0];
      var html = '<div class="kd-view kd-sched">';
      html += '<div class="kd-split">';
      html += '<div class="kd-split-list">';
      if (!schedules.length) {
        html += '<div class="kd-muted">No scheduled tasks. Ask in chat to set reminders.</div>';
      } else {
        for (var j = 0; j < schedules.length; j++) {
          var job = schedules[j];
          var on = selected && job.id === selected.id ? ' on' : '';
          html += '<button type="button" class="kd-row' + on + '" data-sched="' + job.id + '">' +
            '<span class="kd-row-title">' + escapeHtml(job.name) + '</span>' +
            '<span class="kd-row-meta">' + (job.enabled ? 'on' : 'off') + ' · ' + escapeHtml(job.state || '') + '</span>' +
          '</button>';
        }
      }
      html += '</div><div class="kd-split-editor" id="kdSchedEditor">';
      if (selected) {
        html += kdScheduleEditorHtml(selected);
      } else {
        html += '<div class="kd-muted">Select a schedule to inspect cron status.</div>';
      }
      html += '</div></div></div>';
      stream.innerHTML = html;
      stream.querySelectorAll('[data-sched]').forEach(function(row) {
        row.onclick = function() { kdRenderSchedulesCentre(parseInt(row.getAttribute('data-sched'), 10)); };
      });
      kdBindScheduleEditor(selected);
    } catch (e) {
      stream.innerHTML = '<div class="kd-view"><div class="kd-muted" style="color:var(--red)">Could not load schedules</div></div>';
    }
  }

  function kdScheduleFreq(job) {
    if (job.schedule_type === 'interval') return 'Every ' + job.schedule_value + ' min';
    if (job.schedule_type === 'daily') return 'Daily at ' + job.schedule_value;
    if (job.schedule_type === 'weekly') return 'Weekly on ' + job.schedule_value;
    if (job.schedule_type === 'once') return 'Once at ' + job.schedule_value;
    return (job.schedule_type || '') + ' ' + (job.schedule_value || '');
  }

  function kdScheduleEditorHtml(job) {
    var config = {};
    try { config = JSON.parse(job.action_config || '{}'); } catch (e) {}
    return '<section class="kd-panel">' +
      '<h3>' + escapeHtml(job.name) + '</h3>' +
      '<div class="kd-kv">' +
        '<div><b>State</b><span>' + escapeHtml(job.state || '—') + '</span></div>' +
        '<div><b>Enabled</b><span>' + (job.enabled ? 'Yes' : 'No') + '</span></div>' +
        '<div><b>Schedule</b><span>' + escapeHtml(kdScheduleFreq(job)) + '</span></div>' +
        '<div><b>Action</b><span>' + escapeHtml(job.action_type || '') + '</span></div>' +
        (config.description ? '<div><b>Notes</b><span>' + escapeHtml(config.description) + '</span></div>' : '') +
        '<div><b>Next run</b><span>' + (job.next_run ? escapeHtml(new Date(job.next_run).toLocaleString()) : '—') + '</span></div>' +
        '<div><b>Last run</b><span>' + (job.last_run ? escapeHtml(new Date(job.last_run).toLocaleString()) : '—') + '</span></div>' +
      '</div>' +
      '<div class="kd-card-a" style="margin-top:16px">' +
        '<button type="button" class="kd-btn primary" id="kdSchedToggle">' + (job.enabled ? 'Disable' : 'Enable') + '</button>' +
        '<button type="button" class="kd-btn danger" id="kdSchedDelete">Delete</button>' +
      '</div>' +
      '<p class="kd-muted" style="margin-top:14px">Change the schedule expression by asking Karna in chat — the API exposes toggle and delete here.</p>' +
    '</section>';
  }

  function kdBindScheduleEditor(job) {
    if (!job) return;
    var toggle = document.getElementById('kdSchedToggle');
    var del = document.getElementById('kdSchedDelete');
    if (toggle) toggle.onclick = async function() {
      await api('/settings/schedules/' + job.id + '/toggle', { method: 'PUT', body: JSON.stringify({ enabled: !job.enabled }) });
      kdRenderSchedulesCentre(job.id);
    };
    if (del) del.onclick = async function() {
      if (!confirm('Delete this schedule?')) return;
      await api('/settings/schedules/' + job.id, { method: 'DELETE' });
      kdRenderSchedulesCentre(null);
    };
  }
`;
}
