// desktop — Karna four-pane Poppin layout (live threads + Phase 5 views)
// Separate layout module; no isDesktop props in shared components.

import { DESKTOP_HTML } from './desktop-html';
import { getDesktopViewsScript } from './desktop-views';

export function getDesktopScript(): string {
  return `  // ============================================================
  // DESKTOP SHELL — Poppin four-pane layout
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
      contextInclude: [],
      loading: false,
      railMode: 'threads',
      prevTabKey: null,
    };
  }
  if (!state.desktop.railMode) state.desktop.railMode = 'threads';
  if (state.desktop.prevTabKey === undefined) state.desktop.prevTabKey = null;

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
        if (tab) kdActivateTab(tab);
      });
    });
    var add = document.getElementById('kdTabAdd');
    if (add) add.onclick = function() { kdNewThread(); };
  }

  function kdCloseTab(key) {
    if (key === kdTabKey('settings', 'settings') && typeof kdLeaveSettings === 'function') {
      kdLeaveSettings();
      return;
    }
    state.desktop.tabs = state.desktop.tabs.filter(function(t) { return t.key !== key; });
    if (state.desktop.activeTabKey === key) {
      var next = state.desktop.tabs[state.desktop.tabs.length - 1];
      if (next) kdActivateTab(next);
      else {
        state.desktop.activeTabKey = null;
        clearActiveThreadId();
        kdSetViewMode(false);
        state.desktop.railMode = 'threads';
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
    if (state.desktop.railMode === 'documents') {
      kdLoadDocumentsRail();
      return;
    }
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

  function kdParseTools(metadata) {
    try {
      var meta = typeof metadata === 'string' ? JSON.parse(metadata || '{}') : (metadata || {});
      return Array.isArray(meta.tools) ? meta.tools : [];
    } catch (e) { return []; }
  }

  function kdChipsHtml(tools) {
    if (!tools || !tools.length) return '';
    var html = '<div class="chips">';
    for (var i = 0; i < tools.length; i++) {
      html += '<span class="chip"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>' + escapeHtml(tools[i]) + '</span>';
    }
    return html + '</div>';
  }

  function kdFormatTs(ts) {
    if (!ts) return '';
    try {
      var d = new Date(ts.indexOf('T') >= 0 ? ts : ts.replace(' ', 'T') + 'Z');
      if (isNaN(d.getTime())) return String(ts).slice(11, 19) || String(ts);
      return d.toTimeString().slice(0, 8);
    } catch (e) { return String(ts).slice(0, 8); }
  }

  function kdRenderLedger(tools, tallies) {
    var ledger = document.getElementById('kdLedger');
    var foot = document.getElementById('kdLedgerFoot');
    if (!ledger) return;
    tools = tools || [];
    if (!tools.length) {
      ledger.innerHTML = '';
      if (foot) foot.innerHTML = 'No verified executions yet';
      return;
    }
    var html = '';
    for (var i = 0; i < tools.length; i++) {
      var row = tools[i];
      var held = !!row.held;
      html += '<div class="lrow' + (held ? ' held' : '') + '">' +
        '<div class="top"><span class="ts">' + escapeHtml(kdFormatTs(row.ts)) + '</span>' +
        '<span class="fn">' + escapeHtml(row.tool) + '</span>' +
        '<span class="stamp">' + (held ? 'held' : 'verified') + '</span></div>' +
        (row.args ? '<div class="arg">' + escapeHtml(String(row.args).substring(0, 160)) + '</div>' : '') +
        (row.result ? '<div class="res">' + escapeHtml(String(row.result).substring(0, 160)) + '</div>' : '') +
      '</div>';
    }
    ledger.innerHTML = html;
    var v = (tallies && tallies.verified != null) ? tallies.verified : tools.filter(function(t) { return t.verified && !t.held; }).length;
    var h = (tallies && tallies.held != null) ? tallies.held : tools.filter(function(t) { return t.held; }).length;
    var c = (tallies && tallies.claimed != null) ? tallies.claimed : 0;
    if (foot) {
      foot.innerHTML = '<b>' + v + ' verified</b> · ' + h + ' held · <span class="z">' + c + '</span> claimed without running';
    }
  }

  async function kdLoadTools(threadId) {
    if (!threadId) {
      kdRenderLedger([], { verified: 0, held: 0, claimed: 0 });
      return;
    }
    try {
      var data = await api('/chat/threads/' + threadId + '/tools');
      state.desktop.toolRows = data.tools || [];
      kdRenderLedger(data.tools || [], data.tallies);
    } catch (e) {
      kdRenderLedger([], { verified: 0, held: 0, claimed: 0 });
    }
  }

  function kdGateHtml(action) {
    var primary = action.safe_primary || null;
    var substitute = action.substitute;
    var html = '<div class="gate" data-action-id="' + escapeHtml(action.id) + '">' +
      '<div class="gate-h"><span class="w"><svg viewBox="0 0 24 24"><path d="M12 8v5M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg></span>' +
      '<b>Needs your approval</b><span class="tag">' + escapeHtml(action.tool_name) + '</span></div>' +
      '<p>' + escapeHtml(action.consequence || 'This action cannot be undone automatically.') + '</p>' +
      '<div class="gate-acts">';
    if (primary && substitute) {
      html += '<button type="button" class="btn btn-primary" data-act="substitute">'+ escapeHtml(primary) +'</button>';
      html += '<button type="button" class="btn btn-secondary" data-act="approve">Send now</button>';
    } else {
      html += '<button type="button" class="btn btn-primary" data-act="approve">Approve</button>';
    }
    html += '<button type="button" class="btn btn-ghost" data-act="reject">Reject</button></div></div>';
    return html;
  }

  async function kdResolveAction(id, act) {
    var path = act === 'substitute' ? '/actions/' + id + '/substitute'
      : act === 'reject' ? '/actions/' + id + '/reject'
      : '/actions/' + id + '/approve';
    var res = await api(path, { method: 'POST', body: '{}' });
    if (res.error) { alert(res.error); return; }
    if (state.activeThreadId) {
      await kdOpenThread(state.activeThreadId);
      await kdLoadPending(state.activeThreadId);
    }
  }

  async function kdLoadContext(threadId) {
    var el = document.getElementById('kdContext');
    if (!el) return;
    if (!threadId) {
      el.innerHTML = '<div class="ctxi"><span class="n" style="color:var(--text-secondary)">Select a thread</span></div>';
      return;
    }
    try {
      var data = await api('/chat/threads/' + threadId + '/context');
      var sources = data.sources || [];
      state.desktop.contextInclude = sources.filter(function(s) { return s.included; }).map(function(s) { return s.id; });
      var html = '';
      var total = 0;
      for (var i = 0; i < sources.length; i++) {
        var s = sources[i];
        var on = s.included ? ' on' : '';
        if (s.included) total += s.chars || 0;
        html += '<div class="ctxi' + on + '" data-id="' + escapeHtml(s.id) + '">' +
          '<span class="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>' +
          '<span><span class="n">' + escapeHtml(s.label) + '</span><div class="d">' + escapeHtml(s.detail) + '</div></span></div>';
      }
      html += '<div class="payload" id="kdPayloadBtn">' +
        '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
        '<span class="n">Read the exact payload</span><span class="c" id="kdPayloadChars">' + total.toLocaleString() + ' ch</span></div>';
      el.innerHTML = html;
      el.querySelectorAll('.ctxi').forEach(function(row) {
        row.addEventListener('click', async function() {
          var id = row.getAttribute('data-id');
          row.classList.toggle('on');
          state.desktop.contextInclude = [];
          el.querySelectorAll('.ctxi.on').forEach(function(r) {
            state.desktop.contextInclude.push(r.getAttribute('data-id'));
          });
          var prev = await api('/chat/threads/' + threadId + '/context/preview', {
            method: 'POST',
            body: JSON.stringify({ include: state.desktop.contextInclude }),
          });
          var ch = document.getElementById('kdPayloadChars');
          if (ch) ch.textContent = ((prev && prev.chars) || 0).toLocaleString() + ' ch';
        });
      });
      var payloadBtn = document.getElementById('kdPayloadBtn');
      if (payloadBtn) {
        payloadBtn.addEventListener('click', async function() {
          var prev = await api('/chat/threads/' + threadId + '/context/preview', {
            method: 'POST',
            body: JSON.stringify({ include: state.desktop.contextInclude || [] }),
          });
          if (!prev || prev.payload == null) {
            alert('Payload could not be displayed — nothing will be sent with a hidden payload.');
            return;
          }
          var masked = (prev.masked && prev.masked.length) ? ('\\n\\nMasked: ' + prev.masked.join(', ')) : '';
          alert((prev.payload || '(empty)') + masked);
        });
      }
    } catch (e) {
      el.innerHTML = '<div class="ctxi"><span class="n" style="color:var(--red)">Could not load context</span></div>';
    }
  }

  async function kdLoadPending(threadId) {
    var stream = document.getElementById('kdStream');
    if (!stream || !threadId) return;
    stream.querySelectorAll('.gate').forEach(function(g) { g.remove(); });
    try {
      var data = await api('/actions/pending?thread_id=' + threadId);
      var actions = data.actions || [];
      if (!actions.length) return;
      var wrap = document.createElement('div');
      wrap.className = 'turn';
      var said = document.createElement('div');
      said.className = 'said';
      for (var i = 0; i < actions.length; i++) {
        said.insertAdjacentHTML('beforeend', kdGateHtml(actions[i]));
      }
      wrap.appendChild(said);
      stream.appendChild(wrap);
      stream.scrollTop = stream.scrollHeight;
      stream.querySelectorAll('.gate').forEach(function(gate) {
        gate.querySelectorAll('[data-act]').forEach(function(btn) {
          btn.addEventListener('click', function() {
            kdResolveAction(gate.getAttribute('data-action-id'), btn.getAttribute('data-act'));
          });
        });
      });
    } catch (e) { /* ignore */ }
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
        var tools = kdParseTools(msg.metadata);
        html += '<div class="turn"><div class="who"><svg class="orbit" width="13" height="15"><use href="#kd-orbit"/></svg>' +
          escapeHtml(state.assistantName || 'Karna') + '</div><div class="said">' +
          kdChipsHtml(tools) + md(msg.content || '') + '</div></div>';
      }
    }
    stream.innerHTML = html;
    stream.scrollTop = stream.scrollHeight;
  }

  async function kdOpenThread(threadId) {
    if (!threadId) return;
    setActiveThreadId(threadId);
    state.desktop.railMode = 'threads';
    kdSetViewMode(false);
    document.querySelectorAll('#kdNav a').forEach(function(x) {
      x.classList.toggle('on', x.getAttribute('data-nav') === 'threads');
    });
    var thread = (state.threads || []).find(function(t) { return t.id === threadId; }) || { id: threadId, title: 'Conversation' };
    kdEnsureTab(thread);
    kdRenderRail();
    var stream = document.getElementById('kdStream');
    if (stream) stream.innerHTML = '<div class="turn"><div class="said" style="color:var(--text-secondary)">Loading…</div></div>';
    try {
      var data = await api('/chat/threads/' + threadId + '/messages?limit=100');
      if (state.activeThreadId !== threadId) return;
      kdRenderMessages(data.messages || [], thread);
      await kdLoadTools(threadId);
      await kdLoadPending(threadId);
      await kdLoadContext(threadId);
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
    var include = (state.desktop.contextInclude || []);
    if (include.length) body.context = { include: include };

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
            } else if (eventType === 'tool_end' && data.tool && asst && asst.chips) {
              var existingChip = asst.chips.querySelector('[data-tool="' + data.tool + '"]');
              if (existingChip) {
                existingChip.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>' + escapeHtml(data.tool);
              }
              state.desktop.toolRows = (state.desktop.toolRows || []).concat([{
                ts: new Date().toISOString(),
                tool: data.tool,
                args: data.toolArgs ? JSON.stringify(data.toolArgs).substring(0, 160) : '',
                result: data.toolResult ? String(data.toolResult).substring(0, 160) : '',
                verified: true,
                held: false,
                message_id: null,
              }]);
              kdRenderLedger(state.desktop.toolRows, null);
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
        await kdLoadTools(state.activeThreadId);
        await kdLoadPending(state.activeThreadId);
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
      settings.onclick = function() { kdOpenSettings(null); };
    }
    document.querySelectorAll('#kdNav a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        kdOpenNav(a.getAttribute('data-nav'));
      });
    });
    kdSetProvider(state.desktop.lastProvider, state.desktop.lastModel);
  }

${getDesktopViewsScript()}

  function renderDesktop(container) {
    container.innerHTML = DESKTOP_HTML;
    bindDesktopShell();
    kdRenderTabs();
    kdRenderEmptyCentre();
    kdLoadThreads().then(function() {
      if (state.activeThreadId) kdOpenThread(state.activeThreadId);
    });
    ensureDesktopBreakpointListener();
    // Same Google-disconnect banner poller Warm Clay starts in renderMain
    if (typeof checkGoogleConnectionBanner === 'function') {
      checkGoogleConnectionBanner();
      if (typeof googleStatusInterval !== 'undefined' && googleStatusInterval) {
        clearInterval(googleStatusInterval);
      }
      googleStatusInterval = setInterval(checkGoogleConnectionBanner, 5 * 60 * 1000);
    }
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
