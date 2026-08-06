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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(74,58,44,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';

    var stateColors = {created:'#888',active:'var(--terracotta)',reminding:'#f6ad55',paused:'#a0aec0',completed:'var(--success)'};
    var inner = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between;">';
    inner += '<h2 class="ac-title" style="margin:0;">\u23f0 Scheduled Tasks</h2>';
    inner += '<button id="tasksFloatClose" class="btn btn-small btn-secondary">\u2715 Close</button>';
    inner += '</div>';
    if (schedules.length === 0) {
      inner += '<div class="ac-empty">No scheduled tasks. Ask in chat to set reminders or recurring tasks.</div>';
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
        inner += '<div class="item-card">';
        inner += '<div class="item-card-header">';
        inner += '<span class="item-card-title">' + escapeHtml(job.name) + '</span>';
        inner += '<span class="tag" style="color:' + sc + ';border-color:' + sc + '44;">' + (job.state||'active') + '</span>';
        inner += '</div>';
        inner += '<div class="item-card-body">&#128257; ' + escapeHtml(freq) + ' &nbsp;&middot;&nbsp; ' + escapeHtml(job.action_type) + '</div>';
        if (config.description) inner += '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>';
        if (job.next_run && job.state !== 'completed') inner += '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>';
        if (job.last_run) inner += '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>';
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
      if (document.getElementById('karnaDesktop') && typeof kdOpenNav === 'function') {
        kdOpenNav('schedules');
      } else {
        openSettingsSmart('schedules');
      }
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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(74,58,44,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';
    var html = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between;">';
    html += '<h2 class="ac-title" style="margin:0;">\U0001f9e0 Memories</h2>';
    html += '<button id="memFloatClose" class="btn btn-small btn-secondary">\u2715 Close</button>';
    html += '</div>';
    if (memories.length === 0) {
      html += '<div class="ac-empty">No memories yet. Important info will be remembered as you chat.</div>';
    } else {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">Working memory is always in context. Long-term is searched on demand.</div>';
      for (var i = 0; i < memories.length; i++) {
        var m = memories[i];
        var ttc = m.tier === 'working' ? 'var(--terracotta)' : 'var(--text-muted)';
        html += '<div class="item-card">';
        html += '<div class="item-card-header">';
        html += '<span class="item-card-title">' + escapeHtml(m.title) + '</span>';
        html += '<span class="tag" style="color:' + ttc + ';border-color:' + ttc + '44;">' + (m.tier==='working'?'active':'archive') + '</span>';
        html += '<span class="tag">' + escapeHtml(m.type) + '</span>';
        html += '<span class="tag" style="color:var(--terracotta);">&#9733;' + m.importance + '</span>';
        html += '</div>';
        html += '<div class="item-card-body">' + escapeHtml(m.content) + '</div>';
        html += '<div style="display:flex;justify-content:flex-end;margin-top:6px;"><button data-memid="' + m.id + '" class="mem-del-btn ac-btn danger" title="Delete">&#215; Forget</button></div>';
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
      if (document.getElementById('karnaDesktop') && typeof kdOpenNav === 'function') {
        kdOpenNav('memory');
      } else {
        openSettingsSmart('preferences');
      }
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
