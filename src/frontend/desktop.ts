// desktop — Karna four-pane Poppin layout (Phase 1: live threads)
// Separate layout module; no isDesktop props in shared components.

import { DESKTOP_HTML } from './desktop-html';

export function getDesktopScript(): string {
  return `  // ============================================================
  // DESKTOP SHELL — Poppin four-pane layout (Phase 1 live)
  // ============================================================

  var DESKTOP_HTML = ${JSON.stringify(DESKTOP_HTML)};

  var _kdMq = window.matchMedia('(min-width: 1200px)');
  var _kdMqBound = false;

  if (!state.desktop) {
    state.desktop = {
      tabs: [],
      activeTabKey: null,
      lastProvider: null,
      lastModel: null,
      pinnedProvider: null,
      toolRows: [],
      loading: false,
    };
  }

  function kdInitials() {
    var u = state.session && state.session.user;
    var name = (u && (u.name || u.username)) || 'AJ';
    var parts = String(name).trim().split(/\\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return String(name).slice(0, 2).toUpperCase();
  }

  function kdTabKey(type, id) { return type + ':' + id; }

  function kdEnsureTab(thread) {
    var key = kdTabKey('thread', thread.id);
    var existing = state.desktop.tabs.find(function(t) { return t.key === key; });
    if (!existing) {
      state.desktop.tabs.push({ key: key, type: 'thread', id: thread.id, title: thread.title || 'Untitled' });
    } else {
      existing.title = thread.title || existing.title;
    }
    state.desktop.activeTabKey = key;
    kdRenderTabs();
  }

  function kdRenderTabs() {
    var el = document.getElementById('kdTabs');
    if (!el) return;
    var html = '';
    for (var i = 0; i < state.desktop.tabs.length; i++) {
      var t = state.desktop.tabs[i];
      var on = t.key === state.desktop.activeTabKey ? ' on' : '';
      html += '<button type="button" class="tab' + on + '" role="tab" data-key="' + escapeHtml(t.key) + '" aria-selected="' + (on ? 'true' : 'false') + '">' +
        '<span class="ti"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>' +
        '<span class="tt">' + escapeHtml(t.title || 'Untitled') + '</span>' +
        '<span class="tx" data-close="' + escapeHtml(t.key) + '" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></span>' +
      '</button>';
    }
    html += '<button type="button" class="tab-add" id="kdTabAdd" aria-label="New tab"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>';
    el.innerHTML = html;
    el.querySelectorAll('.tab').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var close = e.target.closest('[data-close]');
        if (close) {
          e.stopPropagation();
          kdCloseTab(close.getAttribute('data-close'));
          return;
        }
        var key = btn.getAttribute('data-key');
        var tab = state.desktop.tabs.find(function(t) { return t.key === key; });
        if (tab && tab.type === 'thread') kdOpenThread(tab.id);
      });
    });
    var add = document.getElementById('kdTabAdd');
    if (add) add.onclick = function() { kdNewThread(); };
  }

  function kdCloseTab(key) {
    state.desktop.tabs = state.desktop.tabs.filter(function(t) { return t.key !== key; });
    if (state.desktop.activeTabKey === key) {
      var next = state.desktop.tabs[state.desktop.tabs.length - 1];
      if (next && next.type === 'thread') kdOpenThread(next.id);
      else {
        state.desktop.activeTabKey = null;
        clearActiveThreadId();
        kdRenderEmptyCentre();
        kdRenderTabs();
        kdRenderRail();
      }
    } else {
      kdRenderTabs();
    }
  }

  function kdGroupThreads(threads) {
    var today = new Date().toISOString().split('T')[0];
    var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    var groups = { today: [], yesterday: [], older: [] };
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      if (t.channel === 'voice') continue;
      var d = (t.updated_at || t.created_at || '').substring(0, 10);
      if (d === today) groups.today.push(t);
      else if (d === yesterday) groups.yesterday.push(t);
      else groups.older.push(t);
    }
    return groups;
  }

  function kdRenderRail() {
    var list = document.getElementById('kdThreadList');
    var count = document.getElementById('kdThreadCount');
    if (!list) return;
    var threads = state.threads || [];
    if (count) count.textContent = String(threads.length);
    if (!threads.length) {
      list.innerHTML = '<div class="eyebrow">No threads yet</div><div class="th" id="kdEmptyNew"><div class="t">Start a conversation</div><div class="m">Click New thread</div></div>';
      var empty = document.getElementById('kdEmptyNew');
      if (empty) empty.onclick = function() { kdNewThread(); };
      kdRenderRecent();
      return;
    }
    var g = kdGroupThreads(threads);
    var html = '';
    function renderGroup(label, items) {
      if (!items.length) return;
      html += '<div class="eyebrow">' + label + '</div><div class="grp">';
      for (var i = 0; i < items.length; i++) {
        var t = items[i];
        var on = t.id === state.activeThreadId ? ' on' : '';
        var rel = typeof formatRelativeDate === 'function' ? formatRelativeDate(t.updated_at) : '';
        var mc = t.message_count || 0;
        html += '<div class="th' + on + '" data-id="' + t.id + '">' +
          '<div class="t">' + escapeHtml(t.title || 'Untitled') + '</div>' +
          '<div class="m">' + (mc ? '<em>' + mc + ' messages</em> · ' : '') + escapeHtml(rel) + '</div></div>';
      }
      html += '</div>';
    }
    renderGroup('Today', g.today);
    renderGroup('Yesterday', g.yesterday);
    renderGroup('Older', g.older);
    list.innerHTML = html;
    list.querySelectorAll('.th').forEach(function(el) {
      el.addEventListener('click', function() {
        kdOpenThread(parseInt(el.getAttribute('data-id'), 10));
      });
    });
    kdRenderRecent();
  }

  function kdRenderRecent() {
    var el = document.getElementById('kdRecent');
    if (!el) return;
    var threads = (state.threads || []).slice(0, 4);
    if (!threads.length) { el.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var rel = typeof formatRelativeDate === 'function' ? formatRelativeDate(t.updated_at) : '';
      html += '<div class="reci" data-id="' + t.id + '"><span class="rd ok"></span><span class="rn">' + escapeHtml(t.title || 'Untitled') + '</span><span class="rs">' + escapeHtml(rel) + '</span></div>';
    }
    el.innerHTML = html;
    el.querySelectorAll('.reci').forEach(function(row) {
      row.addEventListener('click', function() {
        kdOpenThread(parseInt(row.getAttribute('data-id'), 10));
      });
    });
  }

  async function kdLoadThreads() {
    try {
      var data = await api('/chat/threads?limit=50');
      state.threads = data.threads || [];
      kdRenderRail();
    } catch (e) {
      var list = document.getElementById('kdThreadList');
      if (list) list.innerHTML = '<div class="eyebrow" style="color:var(--red)">Could not load threads</div>';
    }
  }

  function kdRenderEmptyCentre() {
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    var stream = document.getElementById('kdStream');
    if (title) title.textContent = 'Select a thread';
    if (sub) sub.textContent = 'Or start a new conversation';
    if (stream) stream.innerHTML = '<div class="turn"><div class="said" style="color:var(--text-secondary)">Pick a thread from the rail, or press New thread.</div></div>';
  }

  function kdRenderMessages(messages, thread) {
    var title = document.getElementById('kdCentreTitle');
    var sub = document.getElementById('kdCentreSub');
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    if (title) title.textContent = (thread && thread.title) || 'Conversation';
    if (sub) {
      var n = (messages && messages.length) || 0;
      sub.textContent = n + ' message' + (n === 1 ? '' : 's');
    }
    if (!messages || !messages.length) {
      stream.innerHTML = '<div class="turn"><div class="said" style="color:var(--text-secondary)">No messages yet. Ask Karna below.</div></div>';
      return;
    }
    var html = '';
    for (var i = 0; i < messages.length; i++) {
      var msg = messages[i];
      if (msg.role === 'user') {
        html += '<div class="turn"><div class="who">You</div><div class="said you">' + escapeHtml(msg.content) + '</div></div>';
      } else {
        html += '<div class="turn"><div class="who"><svg class="orbit" width="13" height="15"><use href="#kd-orbit"/></svg>' +
          escapeHtml(state.assistantName || 'Karna') + '</div><div class="said">' + md(msg.content || '') + '</div></div>';
      }
    }
    stream.innerHTML = html;
    stream.scrollTop = stream.scrollHeight;
  }

  async function kdOpenThread(threadId) {
    if (!threadId) return;
    setActiveThreadId(threadId);
    var thread = (state.threads || []).find(function(t) { return t.id === threadId; }) || { id: threadId, title: 'Conversation' };
    kdEnsureTab(thread);
    kdRenderRail();
    var stream = document.getElementById('kdStream');
    if (stream) stream.innerHTML = '<div class="turn"><div class="said" style="color:var(--text-secondary)">Loading…</div></div>';
    try {
      var data = await api('/chat/threads/' + threadId + '/messages?limit=100');
      if (state.activeThreadId !== threadId) return;
      kdRenderMessages(data.messages || [], thread);
    } catch (e) {
      if (stream) stream.innerHTML = '<div class="turn"><div class="said" style="color:var(--red)">Could not load messages.</div></div>';
    }
  }

  async function kdNewThread() {
    clearActiveThreadId();
    state.desktop.activeTabKey = null;
    try {
      var data = await api('/chat/threads', { method: 'POST', body: JSON.stringify({ title: 'New conversation' }) });
      if (data.thread) {
        state.threads = [data.thread].concat(state.threads || []);
        await kdOpenThread(data.thread.id);
        kdRenderRail();
      } else {
        kdRenderEmptyCentre();
        kdRenderTabs();
      }
    } catch (e) {
      kdRenderEmptyCentre();
    }
    var input = document.getElementById('kdInput');
    if (input) input.focus();
  }

  function kdSetProvider(provider, model) {
    if (provider) state.desktop.lastProvider = provider;
    if (model) state.desktop.lastModel = model;
    var rot = document.getElementById('kdProvRot');
    var nm = document.getElementById('kdProvName');
    if (rot) rot.textContent = state.desktop.pinnedProvider ? 'Pinned' : 'Auto';
    if (nm) {
      var p = state.desktop.lastProvider || '—';
      var m = state.desktop.lastModel || '';
      nm.textContent = m ? (p + ' · ' + m) : p;
    }
  }

  function kdSetTask(label, status, running) {
    var lab = document.getElementById('kdTaskLabel');
    var st = document.getElementById('kdTaskStatus');
    var dot = document.getElementById('kdTaskDot');
    var meta = document.getElementById('kdTaskMeta');
    if (lab) lab.textContent = label || 'Idle';
    if (st) st.textContent = status || '';
    if (dot) {
      dot.style.background = running ? 'var(--accent)' : 'var(--text-secondary)';
      dot.style.boxShadow = running ? '0 0 0 3px var(--accent-soft)' : 'none';
    }
    if (meta) {
      var chips = [];
      if (state.desktop.lastProvider) chips.push('<span class="mchip">' + escapeHtml(state.desktop.lastProvider) + '</span>');
      if (state.desktop.lastModel) chips.push('<span class="mchip">' + escapeHtml(state.desktop.lastModel) + '</span>');
      meta.innerHTML = chips.join('');
    }
  }

  function kdAppendUserTurn(text) {
    var stream = document.getElementById('kdStream');
    if (!stream) return;
    var empty = stream.querySelector('.said') && stream.textContent.indexOf('No messages') >= 0;
    if (empty || (stream.textContent || '').indexOf('Pick a thread') >= 0 || (stream.textContent || '').indexOf('Select a thread') >= 0) {
      stream.innerHTML = '';
    }
    var turn = document.createElement('div');
    turn.className = 'turn';
    turn.innerHTML = '<div class="who">You</div><div class="said you">' + escapeHtml(text) + '</div>';
    stream.appendChild(turn);
    stream.scrollTop = stream.scrollHeight;
  }

  function kdBeginAssistantTurn() {
    var stream = document.getElementById('kdStream');
    if (!stream) return null;
    var turn = document.createElement('div');
    turn.className = 'turn';
    turn.innerHTML = '<div class="who"><svg class="orbit" width="13" height="15"><use href="#kd-orbit"/></svg>' +
      escapeHtml(state.assistantName || 'Karna') + '</div>' +
      '<div class="said"><div class="kd-chips chips"></div><div class="kd-stream-text"></div></div>';
    stream.appendChild(turn);
    stream.scrollTop = stream.scrollHeight;
    return {
      turn: turn,
      chips: turn.querySelector('.kd-chips'),
      textEl: turn.querySelector('.kd-stream-text'),
      accumulated: '',
    };
  }

  async function kdSend() {
    if (state.desktop.loading) return;
    var input = document.getElementById('kdInput');
    if (!input) return;
    var text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    state.desktop.loading = true;
    kdSetTask('Thinking', 'streaming', true);
    kdAppendUserTurn(text);

    var asst = kdBeginAssistantTurn();
    var body = { message: text };
    if (state.activeThreadId) body.thread_id = state.activeThreadId;

    try {
      acquireWakeLock();
      var response = await fetch(API + '/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        },
        body: JSON.stringify(body)
      });

      if (!response.ok || !(response.headers.get('content-type') || '').includes('text/event-stream')) {
        var err = await response.json().catch(function() { return { error: 'Connection failed' }; });
        if (asst && asst.textEl) asst.textEl.innerHTML = '<span style="color:var(--red)">' + escapeHtml(err.error || 'Something went wrong') + '</span>';
        kdSetTask('Idle', '', false);
        state.desktop.loading = false;
        releaseWakeLock();
        return;
      }

      var threadIdHeader = response.headers.get('X-Thread-Id');
      if (threadIdHeader) {
        setActiveThreadId(threadIdHeader);
        var tid = parseInt(threadIdHeader, 10);
        var existing = (state.threads || []).find(function(t) { return t.id === tid; });
        if (!existing) {
          state.threads = [{ id: tid, title: text.substring(0, 60), message_count: 1, updated_at: new Date().toISOString() }].concat(state.threads || []);
        }
        kdEnsureTab({ id: tid, title: (existing && existing.title) || text.substring(0, 60) });
        kdRenderRail();
      }

      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      var eventType = 'message';

      while (true) {
        var result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        var parts = buffer.split('\\n');
        buffer = parts.pop();
        for (var i = 0; i < parts.length; i++) {
          var line = parts[i];
          if (line.indexOf('event:') === 0) {
            eventType = line.slice(6).trim();
          } else if (line.indexOf('data:') === 0) {
            var raw = line.slice(5).trim();
            if (!raw) continue;
            var data = null;
            try { data = JSON.parse(raw); } catch (e) { continue; }
            if (eventType === 'chunk' && data.text && asst) {
              asst.accumulated += data.text;
              asst.textEl.textContent = asst.accumulated;
              var stream = document.getElementById('kdStream');
              if (stream) stream.scrollTop = stream.scrollHeight;
            } else if (eventType === 'tool_start' && data.tool && asst && asst.chips) {
              var chip = document.createElement('span');
              chip.className = 'chip';
              chip.setAttribute('data-tool', data.tool);
              chip.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>' + escapeHtml(data.tool);
              asst.chips.appendChild(chip);
              state.desktop.toolRows.push({ tool: data.tool, status: 'running', ts: new Date() });
            } else if (eventType === 'tool_end' && data.tool && asst && asst.chips) {
              var existingChip = asst.chips.querySelector('[data-tool="' + data.tool + '"]');
              if (existingChip) {
                existingChip.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>' + escapeHtml(data.tool);
              }
            } else if (eventType === 'done') {
              kdSetProvider(data.provider, data.model);
              if (asst && asst.textEl && asst.accumulated) {
                asst.textEl.innerHTML = md(asst.accumulated);
              }
            } else if (eventType === 'error') {
              if (asst && asst.textEl) {
                asst.textEl.innerHTML = '<span style="color:var(--red)">' + escapeHtml((data && data.error) || 'Error') + '</span>';
              }
            }
            eventType = 'message';
          } else if (line === '') {
            eventType = 'message';
          }
        }
      }

      if (asst && asst.textEl && asst.accumulated && !asst.textEl.querySelector('p, ul, pre, code')) {
        asst.textEl.innerHTML = md(asst.accumulated);
      }
      await kdLoadThreads();
      if (state.activeThreadId) {
        var thr = (state.threads || []).find(function(t) { return t.id === state.activeThreadId; });
        if (thr) kdEnsureTab(thr);
      }
    } catch (err) {
      if (asst && asst.textEl) {
        asst.textEl.innerHTML = '<span style="color:var(--red)">' + escapeHtml((err && err.message) || 'Connection lost') + '</span>';
      }
    } finally {
      state.desktop.loading = false;
      kdSetTask('Idle', '', false);
      releaseWakeLock();
      if (input) input.focus();
    }
  }

  async function kdRenameThread() {
    if (!state.activeThreadId) return;
    var thr = (state.threads || []).find(function(t) { return t.id === state.activeThreadId; });
    var next = prompt('Rename thread', (thr && thr.title) || '');
    if (next === null) return;
    next = next.trim();
    if (!next) return;
    await api('/chat/threads/' + state.activeThreadId, { method: 'PUT', body: JSON.stringify({ title: next }) });
    if (thr) thr.title = next;
    var tab = state.desktop.tabs.find(function(t) { return t.id === state.activeThreadId; });
    if (tab) tab.title = next;
    var title = document.getElementById('kdCentreTitle');
    if (title) title.textContent = next;
    kdRenderTabs();
    kdRenderRail();
  }

  async function kdDeleteThread() {
    if (!state.activeThreadId) return;
    if (!confirm('Delete this thread?')) return;
    var id = state.activeThreadId;
    await api('/chat/threads/' + id, { method: 'DELETE' });
    state.threads = (state.threads || []).filter(function(t) { return t.id !== id; });
    kdCloseTab(kdTabKey('thread', id));
    await kdLoadThreads();
  }

  function bindDesktopShell() {
    var av = document.getElementById('kdAvatar');
    if (av) av.textContent = kdInitials();
    var send = document.getElementById('kdSend');
    if (send) send.onclick = function() { kdSend(); };
    var input = document.getElementById('kdInput');
    if (input) {
      input.onkeydown = function(e) {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); kdSend(); }
      };
    }
    var neu = document.getElementById('kdNewThread');
    if (neu) {
      neu.onclick = function() { kdNewThread(); };
      neu.onkeydown = function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); kdNewThread(); } };
    }
    var rename = document.getElementById('kdRenameBtn');
    if (rename) rename.onclick = function() { kdRenameThread(); };
    var del = document.getElementById('kdDeleteBtn');
    if (del) del.onclick = function() { kdDeleteThread(); };
    var settings = document.getElementById('kdSettingsBtn');
    if (settings) {
      settings.onclick = function() {
        // Fall back to mobile settings shell for now (Phase 5 expands rail views)
        renderMain(document.getElementById('app'));
        state.view = 'settings';
        state.settingsSection = null;
        renderView();
      };
    }
    document.querySelectorAll('#kdNav a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('#kdNav a').forEach(function(x) { x.classList.remove('on'); });
        a.classList.add('on');
        var nav = a.getAttribute('data-nav');
        if (nav === 'threads') return;
        // Phase 5: full desktop views. Until then open mobile screens.
        var map = { documents: 'document-library', digests: 'digests', memory: 'memory-review', skills: 'skills', schedules: 'reminders' };
        if (map[nav]) {
          renderMain(document.getElementById('app'));
          state.view = map[nav];
          renderView();
        }
      });
    });
    kdSetProvider(state.desktop.lastProvider, state.desktop.lastModel);
  }

  function renderDesktop(container) {
    container.innerHTML = DESKTOP_HTML;
    bindDesktopShell();
    kdRenderTabs();
    kdRenderEmptyCentre();
    kdLoadThreads().then(function() {
      if (state.activeThreadId) kdOpenThread(state.activeThreadId);
    });
    ensureDesktopBreakpointListener();
  }

  function ensureDesktopBreakpointListener() {
    if (_kdMqBound) return;
    _kdMqBound = true;
    function onChange() {
      if (!state.session) return;
      var app = document.getElementById('app');
      if (!app) return;
      var showing = !!app.querySelector('.kd');
      if (_kdMq.matches && !showing) renderDesktop(app);
      else if (!_kdMq.matches && showing) renderMain(app);
    }
    if (_kdMq.addEventListener) _kdMq.addEventListener('change', onChange);
    else if (_kdMq.addListener) _kdMq.addListener(onChange);
  }

  ensureDesktopBreakpointListener();
`;
}
