// reminders — Karna frontend section
export function getRemindersScript(): string {
  return `  // ============================================================
  // REMINDERS VIEW
  // ============================================================

  var remindersState = {
    list: [],
    showForm: false,
    editId: null,
    saving: false,
    form: { name: '', description: '', schedule_type: 'once', date: '', time: '09:00', day: 'Monday', interval: '60' },
  };

  var REMINDER_DAYS_LIST = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function remTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function remScheduleLabel(r) {
    switch (r.schedule_type) {
      case 'once': {
        var d = r.next_run ? new Date(r.next_run) : null;
        return d ? 'Once — ' + d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Once (time unknown)';
      }
      case 'daily':    return 'Every day at ' + r.schedule_value;
      case 'weekly':   return 'Every ' + r.schedule_value;
      case 'interval': return 'Every ' + r.schedule_value + ' min';
      default:         return r.schedule_type + ': ' + (r.schedule_value || '');
    }
  }

  function remNextLabel(r) {
    if (!r.enabled || r.state === 'completed' || !r.next_run) return '';
    var d = new Date(r.next_run);
    var diff = d - new Date();
    if (diff < 0)          return 'Overdue';
    if (diff < 60000)      return 'Now';
    if (diff < 3600000)    return 'In ' + Math.round(diff / 60000) + 'm';
    if (diff < 86400000)   return 'In ' + Math.round(diff / 3600000) + 'h';
    if (diff < 172800000)  return 'Tomorrow ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  async function loadReminders() {
    var data = await api('/notifications/reminders');
    remindersState.list = data.reminders || [];
  }

  async function renderRemindersView(container) {
    container.innerHTML =
      '<div class="page-view">' +
        '<div class="page-header">' +
          '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
          '<h1 class="page-title">Reminders</h1>' +
          '<button class="btn btn-small" onclick="remToggleForm(true)" style="margin-left:auto;width:auto;padding:6px 16px;">+ New</button>' +
        '</div>' +
        '<p class="page-header-subtitle">Manage your scheduled reminders</p>' +
        '<div id="remBody" style="padding:0 16px 40px;"></div>' +
      '</div>';
    await loadReminders();
    remRender();
  }

  function remRender() {
    var body = document.getElementById('remBody');
    if (!body) return;
    var html = '';

    if (remindersState.showForm) html += remFormHtml();

    var active   = remindersState.list.filter(function(r) { return r.enabled && r.state !== 'completed'; });
    var inactive = remindersState.list.filter(function(r) { return !r.enabled || r.state === 'completed'; });

    if (!remindersState.list.length && !remindersState.showForm) {
      html +=
        '<div style="text-align:center;padding:48px 0;color:var(--text-muted);">' +
          '<div style="font-size:36px;margin-bottom:12px;">&#9201;</div>' +
          '<div style="font-size:14px;font-weight:500;">No reminders yet</div>' +
          '<div style="font-size:12px;margin-top:6px;">Tap <strong>+ New</strong> to create one, or ask Karna in chat.</div>' +
        '</div>';
    } else {
      if (active.length) {
        html += '<div class="section-label" style="margin:16px 0 8px;">UPCOMING</div>';
        for (var i = 0; i < active.length; i++) html += remCardHtml(active[i]);
      }
      if (inactive.length) {
        html += '<div class="section-label" style="margin:20px 0 8px;color:var(--text-muted);">PAUSED / DONE</div>';
        for (var j = 0; j < inactive.length; j++) html += remCardHtml(inactive[j]);
      }
    }

    body.innerHTML = html;
  }

  function remCardHtml(r) {
    var active = r.enabled && r.state !== 'completed';
    var nextLabel = remNextLabel(r);
    var schedLabel = remScheduleLabel(r);
    return (
      '<div class="item-card" style="margin-bottom:10px;' + (active ? '' : 'opacity:0.55;') + '">' +
        '<div class="item-card-header">' +
          '<span class="item-card-title" style="flex:1;">' + escapeHtml(r.name) + '</span>' +
          (nextLabel ? '<span class="tag" style="font-size:11px;color:var(--accent);white-space:nowrap;">' + escapeHtml(nextLabel) + '</span>' : '') +
        '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-top:3px;">' + escapeHtml(schedLabel) + '</div>' +
        (r.description ? '<div style="font-size:12px;margin-top:4px;color:var(--text-secondary);">' + escapeHtml(r.description) + '</div>' : '') +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:10px;">' +
          '<label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;color:var(--text-muted);">' +
            '<input type="checkbox" ' + (active ? 'checked' : '') + ' onchange="remToggleEnabled(' + r.id + ',this.checked)" style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer;">' +
            '<span>' + (active ? 'Active' : 'Paused') + '</span>' +
          '</label>' +
          '<div style="margin-left:auto;display:flex;gap:6px;">' +
            '<button class="btn btn-small" onclick="remStartEdit(' + r.id + ')" style="width:auto;padding:4px 12px;font-size:11px;">Edit</button>' +
            '<button class="btn btn-small btn-outline-danger" onclick="remDelete(' + r.id + ')" style="width:auto;padding:4px 12px;font-size:11px;">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function remFormHtml() {
    var f = remindersState.form;
    var isEdit = remindersState.editId !== null;
    var schedFields = '';

    if (f.schedule_type === 'once') {
      schedFields =
        '<div class="field"><label>Date</label>' +
          '<input type="date" id="rfDate" value="' + escapeHtml(f.date || remTodayDate()) + '" min="' + remTodayDate() + '">' +
        '</div>' +
        '<div class="field"><label>Time</label>' +
          '<input type="time" id="rfTime" value="' + escapeHtml(f.time) + '">' +
        '</div>';
    } else if (f.schedule_type === 'daily') {
      schedFields =
        '<div class="field"><label>Time</label>' +
          '<input type="time" id="rfTime" value="' + escapeHtml(f.time) + '">' +
        '</div>';
    } else if (f.schedule_type === 'weekly') {
      var dayOpts = REMINDER_DAYS_LIST.map(function(d) {
        return '<option value="' + d + '"' + (f.day === d ? ' selected' : '') + '>' + d + '</option>';
      }).join('');
      schedFields =
        '<div class="field"><label>Day</label><select id="rfDay">' + dayOpts + '</select></div>' +
        '<div class="field"><label>Time</label><input type="time" id="rfTime" value="' + escapeHtml(f.time) + '"></div>';
    } else if (f.schedule_type === 'interval') {
      schedFields =
        '<div class="field"><label>Every (minutes)</label>' +
          '<input type="number" id="rfInterval" min="1" value="' + escapeHtml(f.interval) + '" placeholder="60">' +
        '</div>';
    }

    return (
      '<div class="item-card" style="margin-bottom:16px;border:2px solid var(--accent);">' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--text-primary);">' + (isEdit ? 'Edit Reminder' : 'New Reminder') + '</div>' +
        '<div class="field"><label>Name *</label>' +
          '<input type="text" id="rfName" placeholder="e.g. Update AI Subscriptions DB" value="' + escapeHtml(f.name) + '">' +
        '</div>' +
        '<div class="field"><label>Notes</label>' +
          '<input type="text" id="rfDesc" placeholder="Optional details..." value="' + escapeHtml(f.description) + '">' +
        '</div>' +
        '<div class="field"><label>Repeat</label>' +
          '<select id="rfType" onchange="remOnTypeChange(this.value)">' +
            '<option value="once"' + (f.schedule_type === 'once' ? ' selected' : '') + '>Once</option>' +
            '<option value="daily"' + (f.schedule_type === 'daily' ? ' selected' : '') + '>Every day</option>' +
            '<option value="weekly"' + (f.schedule_type === 'weekly' ? ' selected' : '') + '>Every week</option>' +
            '<option value="interval"' + (f.schedule_type === 'interval' ? ' selected' : '') + '>Every N minutes</option>' +
          '</select>' +
        '</div>' +
        schedFields +
        '<div style="display:flex;gap:8px;margin-top:14px;">' +
          '<button class="btn" onclick="remSave()" style="width:auto;padding:8px 24px;"' + (remindersState.saving ? ' disabled' : '') + '>' +
            (remindersState.saving ? 'Saving...' : 'Save') +
          '</button>' +
          '<button class="btn btn-small btn-ghost" onclick="remToggleForm(false)" style="width:auto;padding:8px 16px;">Cancel</button>' +
        '</div>' +
      '</div>'
    );
  }

  function remFormCurrentValues() {
    var f = remindersState.form;
    var name  = (document.getElementById('rfName')  || {}).value || f.name;
    var desc  = (document.getElementById('rfDesc')  || {}).value || '';
    var stype = (document.getElementById('rfType')  || {}).value || f.schedule_type;
    var sval  = '';
    if (stype === 'once') {
      var date = (document.getElementById('rfDate') || {}).value || f.date || remTodayDate();
      var time = (document.getElementById('rfTime') || {}).value || f.time;
      sval = date + ' ' + time;
    } else if (stype === 'daily') {
      sval = (document.getElementById('rfTime') || {}).value || f.time;
    } else if (stype === 'weekly') {
      var day  = (document.getElementById('rfDay')  || {}).value || f.day;
      var time2 = (document.getElementById('rfTime') || {}).value || f.time;
      sval = day + ' ' + time2;
    } else if (stype === 'interval') {
      sval = (document.getElementById('rfInterval') || {}).value || f.interval;
    }
    return { name: name.trim(), description: desc.trim(), schedule_type: stype, schedule_value: sval };
  }

  function remToggleForm(show) {
    if (show) {
      remindersState.editId = null;
      remindersState.form = { name: '', description: '', schedule_type: 'once', date: remTodayDate(), time: '09:00', day: 'Monday', interval: '60' };
    }
    remindersState.showForm = show;
    remRender();
    if (show) {
      var pv = document.querySelector('.page-view');
      if (pv) pv.scrollTop = 0;
    }
  }

  function remOnTypeChange(val) {
    var nameEl = document.getElementById('rfName');
    var descEl = document.getElementById('rfDesc');
    if (nameEl) remindersState.form.name = nameEl.value;
    if (descEl) remindersState.form.description = descEl.value;
    remindersState.form.schedule_type = val;
    remRender();
  }

  async function remSave() {
    var vals = remFormCurrentValues();
    if (!vals.name) { showToast('Name is required', 'error'); return; }
    remindersState.saving = true;
    remRender();
    var isEdit = remindersState.editId !== null;
    var path   = isEdit ? '/notifications/reminders/' + remindersState.editId : '/notifications/reminders';
    var method = isEdit ? 'PATCH' : 'POST';
    var result = await api(path, { method: method, body: JSON.stringify(vals) });
    remindersState.saving = false;
    if (result.error) { showToast(result.error, 'error'); remRender(); return; }
    remindersState.showForm = false;
    remindersState.editId   = null;
    await loadReminders();
    remRender();
    showToast(isEdit ? 'Reminder updated' : 'Reminder created');
  }

  async function remToggleEnabled(id, enabled) {
    var result = await api('/notifications/reminders/' + id, { method: 'PATCH', body: JSON.stringify({ enabled: enabled }) });
    if (result.error) { showToast(result.error, 'error'); return; }
    await loadReminders();
    remRender();
  }

  function remStartEdit(id) {
    var r = remindersState.list.find(function(x) { return x.id === id; });
    if (!r) return;
    var form = { name: r.name || '', description: r.description || '', schedule_type: r.schedule_type || 'once', date: remTodayDate(), time: '09:00', day: 'Monday', interval: '60' };
    if (r.schedule_type === 'daily' && r.schedule_value) {
      form.time = r.schedule_value;
    } else if (r.schedule_type === 'weekly' && r.schedule_value) {
      var parts = r.schedule_value.split(' ');
      if (parts.length >= 2) { form.day = parts[0]; form.time = parts[1]; }
    } else if (r.schedule_type === 'interval' && r.schedule_value) {
      form.interval = r.schedule_value;
    } else if (r.schedule_type === 'once' && r.next_run) {
      var d = new Date(r.next_run);
      form.date = d.toISOString().slice(0, 10);
      form.time = d.toTimeString().slice(0, 5);
    }
    remindersState.editId   = id;
    remindersState.form     = form;
    remindersState.showForm = true;
    remRender();
    var pv = document.querySelector('.page-view');
    if (pv) pv.scrollTop = 0;
  }

  async function remDelete(id) {
    var r = remindersState.list.find(function(x) { return x.id === id; });
    if (!r) return;
    if (!confirm('Delete reminder "' + r.name + '"?')) return;
    var result = await api('/notifications/reminders/' + id, { method: 'DELETE' });
    if (result.error) { showToast(result.error, 'error'); return; }
    await loadReminders();
    remRender();
    showToast('Reminder deleted');
  }

  window.remToggleForm    = remToggleForm;
  window.remOnTypeChange  = remOnTypeChange;
  window.remSave          = remSave;
  window.remToggleEnabled = remToggleEnabled;
  window.remStartEdit     = remStartEdit;
  window.remDelete        = remDelete;
`;
}
