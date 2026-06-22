// digests — Karna frontend section
// Unified proactive intelligence UI: history list, digest detail (with
// checklist), and the per-kind config cards shown inside Settings.
//
// All four kinds (morning / evening / weekly / email) share one view; the only
// differences are which sections are enabled and the schedule.
export function getDigestsScript(): string {
  return `  // ============================================================
  // DIGESTS
  // ============================================================

  var digestsState = {
    list: [],
    sections: [],
    configs: [],
    activeDigest: null,
    activeFilter: 'all',
    savingKind: null,
  };

  var DIGEST_KIND_META = {
    morning: { icon: '\\u2600\\uFE0F', title: 'Morning',  blurb: 'Start your day: today\\u2019s calendar, due reminders, open actions.' },
    evening: { icon: '\\uD83D\\uDD67', title: 'Evening',  blurb: 'Wind down: tomorrow\\u2019s calendar, tasks, the day\\u2019s news signal.' },
    weekly:  { icon: '\\uD83D\\uDCCA', title: 'Weekly',   blurb: 'Review the week: completed vs missed, documents, open actions.' },
    email:   { icon: '\\uD83D\\uDCE7', title: 'Email',     blurb: 'Inbox digest: Gmail summary + Outlook (via Browser Use).' },
  };
  var DIGEST_KINDS = ['morning', 'evening', 'weekly', 'email'];
  var WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var CHANNEL_LABELS = { ntfy: 'Ntfy push', web: 'Web bell', telegram: 'Telegram' };

  function digestKindMeta(kind) { return DIGEST_KIND_META[kind] || { icon: '\\uD83D\\uDCC4', title: kind, blurb: '' }; }

  function digestRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var diffDays = Math.round((startOfToday - startOfDate) / 86400000);
    if (diffDays === 0) return 'Today ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays > 1 && diffDays < 7) return diffDays + ' days ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  function deliveredChannelsBadges(channels) {
    if (!channels) return '<span class="tag" style="color:var(--text-muted);">not sent</span>';
    var list = channels.split(',').filter(Boolean);
    if (list.length === 0) return '<span class="tag" style="color:var(--danger);">\\u2717 not sent</span>';
    var parts = [];
    for (var i = 0; i < list.length; i++) {
      var label = list[i] === 'telegram' ? 'TG' : list[i] === 'ntfy' ? 'push' : list[i];
      parts.push('<span class="tag" style="color:var(--success);">\\u2713 ' + escapeHtml(label) + '</span>');
    }
    return parts.join('');
  }

  // === History list view ===
  async function renderDigestsView(container) {
    container.innerHTML = '<div class="page-view">' +
      '<div class="page-header">' +
        '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
        '<h1 class="page-title">Digests</h1>' +
      '</div>' +
      '<p class="page-header-subtitle">Your proactive briefings, reviews &amp; digests</p>' +
      '<div class="digests-toolbar">' +
        '<div class="digests-filter-pills" id="digestsFilterPills"></div>' +
        '<button class="btn btn-small" onclick="state.view=\\'settings\\';state.settingsSection=\\'digests\\';renderView();" title="Configure digests"><i class="fa-solid fa-sliders"></i> Settings</button>' +
      '</div>' +
      '<div id="digestsListWrap" style="padding:0 16px 32px;"><div style="color:var(--text-muted);font-size:13px;padding:16px;">Loading...</div></div>' +
    '</div>';

    // Filter pills (All + per kind)
    var pillsHtml = '<button class="digests-pill' + (digestsState.activeFilter === 'all' ? ' active' : '') + '" onclick="setDigestsFilter(\\'all\\')">All</button>';
    for (var k = 0; k < DIGEST_KINDS.length; k++) {
      var meta = digestKindMeta(DIGEST_KINDS[k]);
      var active = digestsState.activeFilter === DIGEST_KINDS[k];
      pillsHtml += '<button class="digests-pill' + (active ? ' active' : '') + '" onclick="setDigestsFilter(\\'' + DIGEST_KINDS[k] + '\\')">' + meta.icon + ' ' + meta.title + '</button>';
    }
    var fp = document.getElementById('digestsFilterPills');
    if (fp) fp.innerHTML = pillsHtml;

    var query = digestsState.activeFilter !== 'all' ? '?kind=' + digestsState.activeFilter + '&limit=40' : '?limit=40';
    var data = await api('/digests' + query);
    digestsState.list = (data && data.digests) || [];
    renderDigestsList();
  }

  function renderDigestsList() {
    var wrap = document.getElementById('digestsListWrap');
    if (!wrap) return;
    var list = digestsState.list;
    if (!list || list.length === 0) {
      wrap.innerHTML = '<div class="empty-state">' +
        '<div style="font-size:32px;margin-bottom:8px;">\\uD83D\\uDCC4</div>' +
        '<div style="font-size:14px;color:var(--text-secondary);margin-bottom:12px;">No digests yet.</div>' +
        '<button class="btn btn-small" style="background:var(--accent);color:#080b11;font-weight:600;" onclick="generateDigestNow(\\'evening\\')">Generate an evening digest</button>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-top:8px;">Scheduled digests appear here automatically once they fire.</div>' +
      '</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var d = list[i];
      var meta = digestKindMeta(d.kind);
      var highlights = (d.content && d.content.highlights) || [];
      var preview = highlights.length > 0 ? highlights[0] : (d.content && d.content.sections && d.content.sections.length > 0 ? d.content.sections[0].title + ': ' + (d.content.sections[0].summary || '') : '');
      var itemCount = (d.content && d.content.sections) ? d.content.sections.reduce(function (n, s) { return n + (s.items ? s.items.length : 0); }, 0) : 0;
      html += '<div class="item-card digests-card" onclick="openDigest(' + d.id + ')">' +
        '<div class="item-card-header">' +
          '<span class="item-card-icon">' + meta.icon + '</span>' +
          '<span class="item-card-title">' + escapeHtml(meta.title) + ' \\u00B7 ' + digestRelativeDate(d.created_at) + '</span>' +
          '<span class="tag">' + (itemCount > 0 ? itemCount + ' items' : 'no items') + '</span>' +
        '</div>' +
        (preview ? '<div class="item-card-sub">' + escapeHtml(preview) + '</div>' : '') +
        '<div class="item-card-footer">' + deliveredChannelsBadges(d.delivered_channels) +
          '<span class="tag" style="margin-left:auto;color:var(--text-muted);">' + (d.content && d.content.period && d.content.period.start ? new Date(d.content.period.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '') + '</span>' +
        '</div>' +
      '</div>';
    }
    wrap.innerHTML = html;
  }

  window.setDigestsFilter = function (f) { digestsState.activeFilter = f; renderDigestsView(document.querySelector('.chat-area') || document.getElementById('mainContent')); };

  // === Digest detail view (with checklist) ===
  async function openDigest(id) {
    var container = document.querySelector('.chat-area') || document.getElementById('mainContent');
    if (!container) return;
    container.innerHTML = '<div class="page-view"><div class="page-header"><button class="page-back-btn" onclick="state.view=\\'digests\\';renderView();">&#8592;</button><h1 class="page-title">Digest</h1></div><div id="digestDetailWrap" style="padding:0 16px 32px;"><div style="color:var(--text-muted);font-size:13px;padding:16px;">Loading...</div></div></div>';
    var data = await api('/digests/' + id);
    if (!data || data.error) {
      var w = document.getElementById('digestDetailWrap');
      if (w) w.innerHTML = '<div style="color:var(--danger);padding:16px;">' + escapeHtml((data && data.error) || 'Not found') + '</div>';
      return;
    }
    digestsState.activeDigest = data;
    renderDigestDetail();
  }
  window.openDigest = openDigest;

  function renderDigestDetail() {
    var wrap = document.getElementById('digestDetailWrap');
    if (!wrap || !digestsState.activeDigest) return;
    var d = digestsState.activeDigest;
    var digest = d.digest;
    var items = d.items || [];
    var content = digest.content || { sections: [], highlights: [] };
    var meta = digestKindMeta(digest.kind);

    var checkedCount = 0;
    for (var ci = 0; ci < items.length; ci++) { if (items[ci].checked) checkedCount++; }

    var html = '<div class="digest-detail">' +
      '<div class="digest-detail-head">' +
        '<div class="digest-detail-icon">' + meta.icon + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="digest-detail-title">' + escapeHtml(meta.title) + '</div>' +
          '<div class="digest-detail-meta">' + escapeHtml(new Date(digest.created_at).toLocaleString()) + ' \\u00B7 ' + deliveredChannelsBadges(digest.delivered_channels) + '</div>' +
        '</div>' +
        '<div class="digest-detail-actions">' +
          '<button class="btn btn-small" onclick="resendDigest(' + digest.id + ')"><i class="fa-solid fa-paper-plane"></i> Resend</button>' +
          '<button class="btn btn-small btn-danger" onclick="deleteDigest(' + digest.id + ')"><i class="fa-solid fa-trash"></i></button>' +
        '</div>' +
      '</div>';

    if (content.highlights && content.highlights.length > 0) {
      html += '<div class="digest-highlights">';
      for (var h = 0; h < content.highlights.length; h++) {
        html += '<div class="digest-highlight-line">\\u25B8 ' + escapeHtml(content.highlights[h]) + '</div>';
      }
      html += '</div>';
    }

    if (items.length > 0) {
      html += '<div class="digest-checklist-head">Checklist \\u2014 ' + checkedCount + '/' + items.length + ' done</div>';
    }

    for (var s = 0; s < (content.sections || []).length; s++) {
      var section = content.sections[s];
      var sectionItems = items.filter(function (it) { return it.section === section.key; });
      html += '<div class="digest-section">' +
        '<div class="digest-section-title">' + escapeHtml(section.title) + '</div>' +
        '<div class="digest-section-summary">' + escapeHtml(section.summary || '') + '</div>';
      for (var si = 0; si < section.items.length; si++) {
        var item = section.items[si];
        var matchRow = sectionItems.filter(function (it) { return it.item_key === item.key; })[0];
        var rowId = matchRow ? matchRow.id : null;
        var checked = matchRow ? !!matchRow.checked : false;
        if (rowId) {
          html += '<label class="digest-checklist-row' + (checked ? ' checked' : '') + '">' +
            '<input type="checkbox"' + (checked ? ' checked' : '') + ' onchange="toggleDigestItem(' + digest.id + ',' + rowId + ',this.checked)">' +
            '<span class="digest-checklist-text">' + escapeHtml(item.text) + '</span>' +
          '</label>';
        } else {
          html += '<div class="digest-section-item"><span class="digest-bullet">\\u2022</span><span>' + escapeHtml(item.text) + '</span></div>';
        }
      }
      html += '</div>';
    }

    html += '</div>';
    wrap.innerHTML = html;
  }

  window.toggleDigestItem = async function (digestId, itemId, checked) {
    var row = event && event.target ? event.target.closest('.digest-checklist-row') : null;
    if (row) { row.classList.toggle('checked', checked); }
    var res = await api('/digests/' + digestId + '/items/' + itemId + '/toggle', { method: 'POST' });
    if (res && res.error) showToast(res.error, 'error');
  };

  window.resendDigest = async function (id) {
    showToast('Resending...', '');
    var res = await api('/digests/' + id + '/resend', { method: 'POST' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Sent to ' + ((res && res.deliveredChannels) || []).join(', '), 'success');
    if (digestsState.activeDigest && digestsState.activeDigest.digest.id === id) {
      digestsState.activeDigest.digest.delivered_channels = (res && res.deliveredChannels) ? res.deliveredChannels.join(',') : '';
      renderDigestDetail();
    }
  };

  window.deleteDigest = async function (id) {
    if (!confirm('Delete this digest?')) return;
    var res = await api('/digests/' + id, { method: 'DELETE' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Deleted', 'success');
    state.view = 'digests';
    renderView();
  };

  window.generateDigestNow = async function (kind) {
    showToast('Generating ' + (digestKindMeta(kind).title) + ' digest...', '');
    var res = await api('/digests/generate', { method: 'POST', body: JSON.stringify({ kind: kind, force: true }) });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast((digestKindMeta(kind).title) + ' digest generated', 'success');
    if (res && res.digestId) { window.openDigest(res.digestId); }
  };

  // === Digest config (rendered inside the Settings panel) ===
  async function renderDigestConfigTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading digest settings...</div>';
    var data = await api('/digests/configs');
    digestsState.configs = (data && data.configs) || [];
    digestsState.sections = (data && data.sections) || [];

    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">' +
      '<strong>Digests</strong> are proactive summaries Karna generates on a schedule. Each kind is independent \\u2014 pick what sections you want, when it runs, and where it\\u2019s delivered.' +
    '</div>';

    for (var i = 0; i < digestsState.configs.length; i++) {
      html += renderDigestConfigCard(digestsState.configs[i]);
    }

    html += '<div style="margin-top:20px;padding:12px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">' +
      '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">\\u23F0 Meeting Reminders</div>' +
      '<div style="font-size:13px;color:var(--text-secondary);">Automatic reminders <strong>10 minutes before</strong> Google Calendar events. Delivered to your configured push channels \\u2014 no per-digest settings.</div>' +
    '</div>';

    container.innerHTML = html;
  }

  function renderDigestConfigCard(cfg) {
    var meta = digestKindMeta(cfg.kind);
    var id = 'cfg_' + cfg.kind;

    var html = '<div class="digest-config-card" data-kind="' + cfg.kind + '" style="margin-bottom:20px;padding:16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<span style="font-size:18px;">' + meta.icon + '</span>' +
          '<div>' +
            '<div style="font-size:13px;font-weight:600;">' + escapeHtml(meta.title) + ' Digest</div>' +
            '<div style="font-size:11px;color:var(--text-muted);">' + escapeHtml(meta.blurb) + '</div>' +
          '</div>' +
        '</div>' +
        renderToggle(id + '_enabled', cfg.enabled, 'toggleDigestEnabled(\\'' + cfg.kind + '\\', this.checked)') +
      '</div>';

    // Schedule
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Schedule</label>' +
      '<div style="display:flex;gap:8px;align-items:center;">' +
        '<input type="time" id="' + id + '_time" value="' + escapeHtml(cfg.scheduleTime) + '" style="background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;width:120px;">';
    if (cfg.kind === 'weekly') {
      html += '<select id="' + id + '_weekday" style="background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;">';
      for (var w = 0; w < WEEKDAYS.length; w++) {
        html += '<option value="' + WEEKDAYS[w] + '"' + (cfg.scheduleWeekday === WEEKDAYS[w] ? ' selected' : '') + '>' + WEEKDAYS[w] + '</option>';
      }
      html += '</select>';
    }
    html += '<span style="font-size:11px;color:var(--text-muted);">in your timezone</span>' +
      '</div></div>';

    // Sections checklist
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Sections</label>' +
      '<div class="digest-sections-grid">';
    for (var s = 0; s < digestsState.sections.length; s++) {
      var sec = digestsState.sections[s];
      var applies = sec.appliesTo[cfg.kind];
      if (!applies) continue;
      var on = cfg.sections.indexOf(sec.key) >= 0;
      html += '<label class="digest-section-chip' + (on ? ' on' : '') + '">' +
        '<input type="checkbox" data-kind="' + cfg.kind + '" data-section="' + sec.key + '"' + (on ? ' checked' : '') + ' onchange="onDigestSectionChange(this)">' +
        escapeHtml(sec.title) + '</label>';
    }
    html += '</div></div>';

    // Delivery channels
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Deliver to</label>' +
      '<div style="display:flex;gap:16px;">';
    var channelKeys = ['ntfy', 'web', 'telegram'];
    for (var c = 0; c < channelKeys.length; c++) {
      var ck = channelKeys[c];
      var on = cfg.notifyChannels.indexOf(ck) >= 0;
      html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
        '<input type="checkbox" data-kind="' + cfg.kind + '" data-channel="' + ck + '"' + (on ? ' checked' : '') + ' onchange="onDigestChannelChange(this)">' +
        escapeHtml(CHANNEL_LABELS[ck] || ck) + '</label>';
    }
    html += '</div></div>';

    // News topics (only if news section is available for this kind)
    var hasNews = false;
    for (var sn = 0; sn < digestsState.sections.length; sn++) {
      if (digestsState.sections[sn].key === 'news_ai' && digestsState.sections[sn].appliesTo[cfg.kind]) { hasNews = true; break; }
    }
    if (hasNews) {
      html += '<div style="margin-bottom:12px;">' +
        '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">News Topics (max 5)</label>' +
        '<input type="text" id="' + id + '_topics" value="' + escapeHtml(cfg.newsTopics.join(', ')) + '" placeholder="AI, LLM, Tools" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:13px;">' +
        '<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Used by the Today\\u2019s Signal section.</div>' +
      '</div>';
    }

    // Actions
    html += '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px;">' +
      '<button class="btn btn-small" style="background:var(--accent);color:#080b11;font-weight:600;" onclick="saveDigestConfig(\\'' + cfg.kind + '\\')">Save</button>' +
      '<button class="btn btn-small" onclick="resetDigestConfig(\\'' + cfg.kind + '\\')">Reset to defaults</button>' +
      '<button class="btn btn-small" onclick="generateDigestNow(\\'' + cfg.kind + '\\')">Generate now</button>' +
      '<span id="cfg_status_' + cfg.kind + '" style="font-size:11px;color:var(--text-muted);margin-left:auto;"></span>' +
    '</div>';

    html += '</div>';
    return html;
  }

  function renderToggle(id, on, onchangeExpr) {
    return '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;">' +
      '<span style="color:var(--text-muted);" id="' + id + '_label">' + (on ? 'Enabled' : 'Disabled') + '</span>' +
      '<div style="position:relative;width:36px;height:20px;">' +
        '<input type="checkbox" id="' + id + '"' + (on ? ' checked' : '') + ' style="opacity:0;width:0;height:0;position:absolute;" onchange="' + onchangeExpr + '">' +
        '<div id="' + id + '_track" style="cursor:pointer;width:36px;height:20px;background:' + (on ? 'var(--accent)' : 'var(--border)') + ';border-radius:10px;transition:background 0.2s;"></div>' +
        '<div id="' + id + '_thumb" style="cursor:pointer;position:absolute;top:2px;' + (on ? 'left:18px' : 'left:2px') + ';width:16px;height:16px;background:#fff;border-radius:50%;transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>' +
      '</div></label>';
  }

  function bindToggleClick(id, kind) {
    var track = document.getElementById(id + '_track');
    var thumb = document.getElementById(id + '_thumb');
    function click() { var cb = document.getElementById(id); if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); } }
    if (track) track.onclick = click;
    if (thumb) thumb.onclick = click;
  }

  function collectConfigFromForm(kind) {
    var cfg = { kind: kind };
    var id = 'cfg_' + kind;
    var enabledEl = document.getElementById(id + '_enabled');
    cfg.enabled = enabledEl ? enabledEl.checked : true;
    var timeEl = document.getElementById(id + '_time');
    cfg.scheduleTime = timeEl ? timeEl.value : '20:00';
    var weekdayEl = document.getElementById(id + '_weekday');
    cfg.scheduleWeekday = weekdayEl ? weekdayEl.value : null;

    var sections = [];
    var secBoxes = document.querySelectorAll('input[data-kind="' + kind + '"][data-section]');
    for (var i = 0; i < secBoxes.length; i++) { if (secBoxes[i].checked) sections.push(secBoxes[i].getAttribute('data-section')); }
    cfg.sections = sections;

    var channels = [];
    var chBoxes = document.querySelectorAll('input[data-kind="' + kind + '"][data-channel]');
    for (var j = 0; j < chBoxes.length; j++) { if (chBoxes[j].checked) channels.push(chBoxes[j].getAttribute('data-channel')); }
    cfg.notifyChannels = channels;

    var topicsEl = document.getElementById(id + '_topics');
    if (topicsEl) {
      cfg.newsTopics = topicsEl.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    }
    return cfg;
  }

  window.onDigestSectionChange = function (el) { el.closest('.digest-section-chip').classList.toggle('on', el.checked); };
  window.onDigestChannelChange = function () { /* state read on save */ };

  window.toggleDigestEnabled = function (kind, on) {
    var id = 'cfg_' + kind;
    var track = document.getElementById(id + '_track');
    var thumb = document.getElementById(id + '_thumb');
    var label = document.getElementById(id + '_label');
    if (track) track.style.background = on ? 'var(--accent)' : 'var(--border)';
    if (thumb) thumb.style.left = on ? '18px' : '2px';
    if (label) label.textContent = on ? 'Enabled' : 'Disabled';
    // Persist immediately so toggling on/off is reflected even without Save.
    var cfg = collectConfigFromForm(kind);
    cfg.enabled = on;
    saveDigestConfig(kind, true);
  };

  window.saveDigestConfig = async function (kind, silent) {
    var statusEl = document.getElementById('cfg_status_' + kind);
    if (statusEl && !silent) statusEl.textContent = 'Saving...';
    var cfg = collectConfigFromForm(kind);
    if (cfg.newsTopics && cfg.newsTopics.length > 5) {
      showToast('Maximum 5 news topics allowed', 'error');
      if (statusEl) statusEl.textContent = '';
      return;
    }
    if (cfg.notifyChannels.length === 0) {
      showToast('Select at least one delivery channel', 'error');
      if (statusEl) statusEl.textContent = '';
      return;
    }
    var body = {
      enabled: cfg.enabled,
      scheduleTime: cfg.scheduleTime,
      scheduleWeekday: cfg.scheduleWeekday,
      sections: cfg.sections,
      notifyChannels: cfg.notifyChannels,
    };
    if (cfg.newsTopics) body.newsTopics = cfg.newsTopics;
    var res = await api('/digests/configs?kind=' + kind, { method: 'PUT', body: JSON.stringify(body) });
    if (res && res.error) {
      showToast(res.error, 'error');
      if (statusEl) statusEl.textContent = 'Error';
      return;
    }
    if (statusEl && !silent) statusEl.textContent = 'Saved \\u2713';
    if (!silent) showToast((digestKindMeta(kind).title) + ' digest saved', 'success');
    // Keep local config in sync.
    for (var i = 0; i < digestsState.configs.length; i++) {
      if (digestsState.configs[i].kind === kind && res && res.config) digestsState.configs[i] = res.config;
    }
  };

  window.resetDigestConfig = async function (kind) {
    if (!confirm('Reset ' + (digestKindMeta(kind).title) + ' digest to defaults?')) return;
    var res = await api('/digests/configs/reset?kind=' + kind, { method: 'POST' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Reset to defaults', 'success');
    renderDigestConfigTab(document.getElementById('settingsContentCol') || document.querySelector('.chat-area'));
  };

  // Bind toggle clicks after the config card renders (called from renderDigestConfigTab wrapper).
  function bindDigestConfigToggles() {
    for (var i = 0; i < digestsState.configs.length; i++) {
      bindToggleClick('cfg_' + digestsState.configs[i].kind + '_enabled', digestsState.configs[i].kind);
    }
  }
`;
}
