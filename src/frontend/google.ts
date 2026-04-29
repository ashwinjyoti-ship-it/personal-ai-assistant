// google — Karna frontend section
export function getGoogleScript(): string {
  return `  // ============================================================
  // REMAINING SETTINGS TABS (features tab removed in v4)
  // ============================================================

  async function renderSchedulesTab(container) {
    var data = await api('/settings/schedules');
    var schedules = data.schedules || [];
    if (schedules.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">No scheduled tasks. Ask in chat to set reminders.</div>'; return; }
    var html = '';
    for (var i = 0; i < schedules.length; i++) {
      var job = schedules[i];
      var config = JSON.parse(job.action_config || '{}');
      var stateColors = {created:'#888',active:'#4fd1c5',reminding:'#f6ad55',paused:'#a0aec0',completed:'#68d391'};
      var sc = stateColors[job.state] || '#888';
      html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">' + escapeHtml(job.name) + '</span>' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
        '<span class="tag" style="background:rgba(255,255,255,0.04);color:' + sc + ';border:1px solid ' + sc + '33;">' + (job.state||'active') + '</span>' +
        '<label class="toggle"><input type="checkbox"' + (job.enabled?' checked':'') + ' onchange="toggleSchedule(' + job.id + ',this.checked)"><div class="toggle-track"></div><div class="toggle-thumb"></div></label>' +
        '<button class="btn btn-small btn-danger" onclick="deleteSchedule(' + job.id + ')">\\u00d7</button></div></div>' +
        '<div class="item-card-body">' + 
          (job.schedule_type === 'interval' ? 'Every ' + job.schedule_value + ' min' : 
           job.schedule_type === 'daily' ? 'Daily at ' + job.schedule_value : 
           job.schedule_type === 'weekly' ? 'Weekly on ' + job.schedule_value : 
           job.schedule_type === 'once' ? 'Once at ' + job.schedule_value : 
           job.schedule_type + ' at ' + job.schedule_value) + ' \\u00b7 ' + escapeHtml(job.action_type) + '</div>' +
        (config.description ? '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>' : '') +
        (job.next_run ? '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>' : '') +
        (job.last_run ? '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>' : '') + '</div>';
    }
    container.innerHTML = html;
  }
  async function toggleSchedule(id, enabled) { await api('/settings/schedules/' + id + '/toggle', {method:'PUT',body:JSON.stringify({enabled:enabled})}); }
  async function deleteSchedule(id) { await api('/settings/schedules/' + id, {method:'DELETE'}); renderView(); }

  // Open Tasks as floating centered overlay modal (works from any view)
  window.viewTasksModal = async function() {
    var data = await api('/settings/schedules');
    var schedules = data.schedules || [];
    var existing = document.getElementById('tasksFloatOverlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'tasksFloatOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--bg-glass-deep);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border-glass);border-radius:20px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,0.5);';

    var stateColors = {created:'#888',active:'var(--accent)',reminding:'#f6ad55',paused:'#a0aec0',completed:'var(--success)'};
    var inner = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">';
    inner += '<h2 style="font-size:22px;font-weight:600;margin:0;color:var(--text-primary);">\u23f0 Scheduled Tasks</h2>';
    inner += '<button id="tasksFloatClose" class="btn btn-small">\u2715 Close</button>';
    inner += '</div>';
    if (schedules.length === 0) {
      inner += '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No scheduled tasks. Ask in chat to set reminders or recurring tasks.</div>';
    } else {
      for (var i = 0; i < schedules.length; i++) {
        var job = schedules[i];
        var config = JSON.parse(job.action_config || '{}');
        var sc = stateColors[job.state] || '#888';
        var freq = job.schedule_type === 'interval' ? 'Every ' + job.schedule_value + ' min' :
                   job.schedule_type === 'daily'    ? 'Daily at ' + job.schedule_value :
                   job.schedule_type === 'weekly'   ? 'Weekly on ' + job.schedule_value :
                   job.schedule_type === 'once'     ? 'Once at ' + job.schedule_value :
                   job.schedule_type + ' ' + job.schedule_value;
        inner += '<div style="padding:14px 16px;margin-bottom:10px;background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:12px;">';
        inner += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">';
        inner += '<span style="font-size:14px;font-weight:600;color:var(--text-primary);">' + escapeHtml(job.name) + '</span>';
        inner += '<span style="font-size:11px;font-weight:600;color:' + sc + ';padding:2px 8px;border:1px solid ' + sc + '44;border-radius:10px;">' + (job.state||'active') + '</span>';
        inner += '</div>';
        inner += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">&#128257; ' + escapeHtml(freq) + ' &nbsp;&middot;&nbsp; ' + escapeHtml(job.action_type) + '</div>';
        if (config.description) inner += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + escapeHtml(config.description) + '</div>';
        if (job.next_run && job.state !== 'completed') inner += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Next: ' + new Date(job.next_run).toLocaleString() + '</div>';
        if (job.last_run) inner += '<div style="font-size:11px;color:var(--text-muted);">Last: ' + new Date(job.last_run).toLocaleString() + '</div>';
        inner += '</div>';
      }
    }
    inner += '<div style="margin-top:16px;"><button id="tasksFloatManage" class="btn">Manage in Settings &#8594;</button></div>';
    panel.innerHTML = inner;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Attach button handlers via JS (avoids inline onclick quoting issues)
    document.getElementById('tasksFloatClose').onclick = function() { overlay.remove(); };
    document.getElementById('tasksFloatManage').onclick = function() {
      overlay.remove();
      state.prevView = state.view;
      state.view = 'settings';
      state.settingsSection = 'schedules';
      renderView();
    };
    function onKeyDown(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onKeyDown); } }
    document.addEventListener('keydown', onKeyDown);
  };

  // Open Memory as floating centered modal
  window.viewMemoryModal = async function() {
    var data = await api('/settings/memory');
    var memories = data.memories || [];
    // Build floating overlay modal
    var existing = document.getElementById('memoryFloatOverlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'memoryFloatOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--bg-glass-deep);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border-glass);border-radius:20px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,0.5);';
    var html = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">';
    html += '<h2 style="font-size:22px;font-weight:600;margin:0;color:var(--text-primary);">\U0001f9e0 Memories</h2>';
    html += '<button id="memFloatClose" class="btn btn-small">\u2715 Close</button>';
    html += '</div>';
    if (memories.length === 0) {
      html += '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No memories yet. Important info will be remembered as you chat.</div>';
    } else {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">Working memory is always in context. Long-term is searched on demand.</div>';
      for (var i = 0; i < memories.length; i++) {
        var m = memories[i];
        var tc = m.tier === 'working' ? 'rgba(255,107,74,0.18)' : 'rgba(255,255,255,0.05)';
        var ttc = m.tier === 'working' ? 'var(--accent)' : 'var(--text-muted)';
        html += '<div style="padding:14px 16px;margin-bottom:10px;background:' + tc + ';border:1px solid var(--border-glass);border-radius:12px;">';
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">';
        html += '<span style="font-size:13px;font-weight:600;color:var(--text-primary);flex:1;">' + escapeHtml(m.title) + '</span>';
        html += '<span style="font-size:10px;font-weight:600;color:' + ttc + ';padding:2px 7px;border:1px solid ' + ttc + '44;border-radius:8px;">' + (m.tier==='working'?'active':'archive') + '</span>';
        html += '<span style="font-size:10px;color:var(--text-muted);padding:2px 7px;border:1px solid var(--border);border-radius:8px;">' + escapeHtml(m.type) + '</span>';
        html += '<span style="font-size:10px;color:var(--text-muted);">&#9733;' + m.importance + '</span>';
        html += '<button data-memid="' + m.id + '" class="mem-del-btn" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;padding:2px 6px;border-radius:6px;" title="Delete">&#215;</button>';
        html += '</div>';
        html += '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' + escapeHtml(m.content) + '</div>';
        html += '</div>';
      }
    }
    html += '<div style="margin-top:16px;"><button id="memFloatManage" class="btn">Manage in Settings &#8594;</button></div>';
    panel.innerHTML = html;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Attach handlers via JS — no inline onclick quoting issues
    document.getElementById('memFloatClose').onclick = function() { overlay.remove(); };
    document.getElementById('memFloatManage').onclick = function() {
      overlay.remove();
      state.prevView = state.view;
      state.view = 'settings';
      state.settingsSection = 'preferences';
      renderView();
    };
    panel.querySelectorAll('.mem-del-btn').forEach(function(btn) {
      btn.onclick = function() {
        var mid = parseInt(btn.getAttribute('data-memid'), 10);
        deleteMemory(mid);
        overlay.remove();
        viewMemoryModal();
      };
    });
    function onKeyDown(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onKeyDown); } }
    document.addEventListener('keydown', onKeyDown);
  };
`;
}
