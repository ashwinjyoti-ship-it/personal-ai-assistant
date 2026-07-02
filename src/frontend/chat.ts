// chat — Karna frontend section
import { getVoiceDockHtml } from './voice';

export function getChatScript(): string {
  return `  // ============================================================
  // CHAT VIEW
  // ============================================================

  function renderChatView(container) {
    container.innerHTML = '<div class="conv-page"><div class="chat-area" id="chatArea">' +
      '<div id="messages"></div>' +
      '<div id="thinking" class="thinking" style="display:none">Thinking&hellip;<span class="thinking-cursor"></span></div>' +
    '</div>' +
    '<div class="input-anchor input-anchor--conv">' +
      '<input type="file" id="fileInput" style="display:none" multiple>' +
      '<div id="fileChips" class="file-chips"></div>' +
      ${JSON.stringify(getVoiceDockHtml())} +
      '<div class="input-pill input-pill--conv">' +
        '<button type="button" class="attach-btn" id="attachBtn" title="Attach file" aria-label="Attach file" tabindex="-1">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<div contenteditable="true" class="text-input" id="inputField" role="textbox" data-placeholder="' + escapeHtml(messagePlaceholder()) + '" enterkeyhint="send" autocorrect="off"></div>' +
        '<button type="button" class="send-btn" id="sendBtn" title="Send (Ctrl+Enter)" tabindex="-1">&#10148;</button>' +
      '</div>' +
    '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend(); } };
    updateMessagePlaceholders();
    document.getElementById('sendBtn').onclick = handleSend;
    document.getElementById('attachBtn').onclick = function() { document.getElementById('fileInput').click(); };
    document.getElementById('fileInput').onchange = handleFileSelect;
    if (typeof bindVoiceControls === 'function') bindVoiceControls();
    if (state.pendingDashMessage) {
      var pendingText = state.pendingDashMessage;
      state.pendingDashMessage = null;
      input.textContent = pendingText;
      setTimeout(function() { handleSend(); }, 50);
    } else {
      input.focus();
    }

    // Update thread title display
    var ttl = document.getElementById('threadTitleDisplay');
    if (ttl && state.activeThreadId) {
      var found = state.threads.find(function(t) { return t.id === state.activeThreadId; });
      if (found) ttl.textContent = found.title;
    }

    if (state.activeThreadId) { loadThreadMessages(state.activeThreadId); }

    // Track user scroll so auto-scroll is suppressed when user scrolls up
    var chatArea = document.getElementById('chatArea');
    if (chatArea) {
      chatArea.addEventListener('scroll', onChatScroll, { passive: true });
    }
  }

  function createChatTurn(userContent) {
    var turn = document.createElement('div');
    turn.className = 'chat-turn';
    turn.innerHTML = '<div class="msg-user">' + escapeHtml(userContent) + '</div><div class="chat-turn-reply"></div>';
    return turn;
  }

  function getLastChatTurn(messagesEl) {
    var turns = messagesEl.querySelectorAll('.chat-turn');
    return turns.length ? turns[turns.length - 1] : null;
  }

  function appendChatTurn(messagesEl, userContent) {
    var welcome = messagesEl.querySelector('.welcome');
    if (welcome) welcome.remove();
    var turn = createChatTurn(userContent);
    messagesEl.appendChild(turn);
    return turn;
  }

  function buildAssistantBlockHtml(content, msgId, type) {
    if (type === 'error-provider') {
      return '<div class="msg-assistant">' + md(content) + '<br><br><button class="btn btn-small" onclick="state.prevView=state.view;state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">Open Settings</button></div>';
    }
    if (type === 'error') {
      return '<div class="msg-assistant" style="color:var(--danger)">' + md(content) + '</div>';
    }
    var safeContent = escapeHtml(content).replace(/"/g, '&quot;');
    var idAttr = msgId ? ' id="msg-' + msgId + '"' : '';
    var html = '<div class="msg-assistant"' + idAttr + '>' + md(content) + '</div>';
    if (msgId) {
      html += '<div class="msg-actions">' +
        '<button class="msg-action-btn" onclick="maCopy(this)" data-content="' + safeContent + '">Copy</button>' +
        '<button class="msg-action-btn" onclick="maSaveDoc(this)" data-content="' + safeContent + '">Save to Doc</button>' +
        '<button class="msg-action-btn" onclick="maEmail(this)" data-content="' + safeContent + '">Email</button>' +
        '<button class="msg-action-btn" onclick="maTask(this)" data-content="' + safeContent + '">Task</button>' +
        '<button class="msg-action-btn" onclick="maRemember(this)" data-content="' + safeContent + '">Remember</button>' +
        '<button class="msg-action-btn" onclick="maReminder(this)" data-content="' + safeContent + '">Reminder</button>' +
        '<button class="msg-action-btn" onclick="maShorter(this)">Shorter</button>' +
        '<button class="msg-action-btn" onclick="maDetailed(this)">More detail</button>' +
        '</div>';
    }
    return html;
  }

  function appendAssistantBlock(messagesEl, content, type, msgId) {
    var html = buildAssistantBlockHtml(content, msgId, type);
    var turn = getLastChatTurn(messagesEl);
    if (turn) {
      var reply = turn.querySelector('.chat-turn-reply');
      var block = document.createElement('div');
      block.className = 'assistant-block';
      block.innerHTML = html;
      reply.appendChild(block);
      return block;
    }
    var group = document.createElement('div');
    group.className = 'message-group';
    group.innerHTML = html;
    messagesEl.appendChild(group);
    return group;
  }

  function appendStreamingContainer(messagesEl) {
    var welcome = messagesEl.querySelector('.welcome');
    if (welcome) welcome.remove();

    var streamingContainer = document.createElement('div');
    streamingContainer.className = 'streaming-response';
    streamingContainer.innerHTML = '<div class="tools-container"></div><div class="streaming-text msg-assistant"></div>';
    var turn = getLastChatTurn(messagesEl);
    if (turn) {
      turn.querySelector('.chat-turn-reply').appendChild(streamingContainer);
    } else {
      var group = document.createElement('div');
      group.className = 'message-group';
      group.appendChild(streamingContainer);
      messagesEl.appendChild(group);
    }
    return streamingContainer;
  }

  var streamingMdTimer = null;

  function finalizeStreamingMarkdown(ctx, immediate) {
    if (!ctx || !ctx.streamingText) return;
    if (streamingMdTimer) {
      clearTimeout(streamingMdTimer);
      streamingMdTimer = null;
    }
    function render() {
      var latest = ctx.accumulatedText || '';
      if (!latest || !ctx.streamingText) return;
      ctx.streamingText.innerHTML = md(latest);
    }
    if (immediate) render();
    else streamingMdTimer = setTimeout(function() { streamingMdTimer = null; render(); }, 100);
  }

  async function loadThreadMessages(threadId) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    messagesEl.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">Loading…</div>';
    var data = await api('/chat/threads/' + threadId + '/messages?limit=100');
    if (!messagesEl.isConnected) return; // DOM replaced while loading
    messagesEl.innerHTML = '';
    if (data.error) {
      messagesEl.innerHTML = '<div style="padding:24px;text-align:center;color:var(--danger);font-size:13px;">Couldn’t load messages — ' + escapeHtml(data.error) + '<br><br><a href="#" onclick="loadThreadMessages(' + threadId + ');return false;" style="color:var(--accent);">Try again</a></div>';
      return;
    }
    if (!data.messages || data.messages.length === 0) {
      messagesEl.innerHTML = '<div class="welcome"><h2>New conversation</h2><p>Start typing below. ' + escapeHtml(state.assistantName || 'Karna') + ' is listening.</p></div>';
      return;
    }
    var currentTurn = null;
    for (var i = 0; i < data.messages.length; i++) {
      var msg = data.messages[i];
      if (msg.role === 'user') {
        currentTurn = createChatTurn(msg.content);
        messagesEl.appendChild(currentTurn);
      } else if (currentTurn) {
        var reply = currentTurn.querySelector('.chat-turn-reply');
        var block = document.createElement('div');
        block.className = 'assistant-block';
        block.innerHTML = buildAssistantBlockHtml(msg.content, msg.id, null);
        reply.appendChild(block);
      } else {
        var group = document.createElement('div');
        group.className = 'message-group';
        group.innerHTML = buildAssistantBlockHtml(msg.content, msg.id, null);
        messagesEl.appendChild(group);
      }
    }
    scrollToBottomForce();

    // After rendering persisted history, check for an in-flight run on this
    // thread (e.g. the user reloaded the page mid-generation). If one is still
    // running, resume it so the streaming answer continues live.
    maybeResumeActiveRun(threadId);
  }

  // On thread open, look up the latest run. If it's still running, attach a
  // streaming container and resume so the user sees the answer stream back in.
  async function maybeResumeActiveRun(threadId) {
    try {
      // Never resume while a live send is already consuming this run's stream.
      if (state.loading || state.resumeInProgress) return;
      var data = await api('/chat/threads/' + threadId + '/active-run');
      if (!data || !data.run || data.run.status !== 'running') return;
      state.activeRunId = data.run.runId;
      var messagesEl = document.getElementById('messages');
      if (!messagesEl) return;

      // Build the streaming container the resume will populate, mirroring the
      // one used during a live send.
      var streamingContainer = appendStreamingContainer(messagesEl);
      var ctx = {
        streamSession: beginStreamSession(),
        eventsReceived: 0,
        streamingText: streamingContainer.querySelector('.streaming-text'),
        toolsContainer: streamingContainer.querySelector('.tools-container'),
        accumulatedText: '',
        activeTools: {},
        browserAckEl: null,
        browserProgressEl: null,
        researchProgressEl: null,
      };
      state.loading = true;
      updateSendBtn();
      showThinking(true);
      await resumeStream(streamingContainer, ctx, 0);
      showThinking(false);
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
    } catch (err) {
      console.warn('resume-on-open failed:', err && err.message);
    } finally {
      state.loading = false;
      state.activeRunId = null;
      updateSendBtn();
    }
  }
  function handleFileSelect(e) {
    var files = e.target.files;
    if (!files || files.length === 0) return;
    for (var i = 0; i < files.length; i++) { state.pendingFiles.push(files[i]); }
    renderFileChips();
    e.target.value = '';
  }

  function renderFileChips() {
    var container = document.getElementById('fileChips');
    if (!container) return;
    if (state.pendingFiles.length === 0) { container.style.display = 'none'; container.innerHTML = ''; return; }
    container.style.display = 'flex';
    var html = '';
    for (var i = 0; i < state.pendingFiles.length; i++) {
      var f = state.pendingFiles[i];
      var sizeKb = Math.round(f.size / 1024);
      var sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';
      html += '<div class="file-chip"><span>&#128196;</span> ' + escapeHtml(f.name) + ' (' + sizeStr + ')<button onclick="removeFile(' + i + ')">\\u00d7</button></div>';
    }
    container.innerHTML = html;
  }

  function removeFile(index) {
    state.pendingFiles.splice(index, 1);
    renderFileChips();
  }

  function updateSendBtn() {
    var btn = document.getElementById('sendBtn');
    if (!btn) return;
    if (state.loading) {
      btn.innerHTML = '&#9632;';
      btn.title = 'Stop';
      btn.classList.add('stop-btn');
      btn.onclick = handleStop;
    } else {
      btn.innerHTML = '&#10148;';
      btn.title = 'Send (Ctrl+Enter)';
      btn.classList.remove('stop-btn');
      btn.onclick = handleSend;
    }
  }

  function handleStop() {
    if (state.abortController) {
      state.abortController.abort();
    }
  }

  async function handleSend() {
    var input = document.getElementById('inputField');
    var text = (input.innerText || '').trim();
    var hasFiles = state.pendingFiles.length > 0;
    if ((!text && !hasFiles) || state.loading) return;
    input.textContent = '';
    _userScrolled = false;
    state.loading = true;
    state.abortController = new AbortController();
    updateSendBtn();

    // Upload files first if present
    var fileInfo = [];
    if (hasFiles) {
      var files = state.pendingFiles.slice();
      state.pendingFiles = [];
      renderFileChips();
      var fileNames = files.map(function(f) { return f.name; }).join(', ');
      addMessage('user', (text ? text + '\\n\\n' : '') + '\\ud83d\\udcce Attached: ' + fileNames);
      showThinking(true);

      for (var fi = 0; fi < files.length; fi++) {
        try {
          var formData = new FormData();
          formData.append('file', files[fi]);
          var uploadRes = await fetch(API + '/chat/upload', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token) },
            body: formData
          });
          var uploadData = await uploadRes.json();
          if (!uploadRes.ok) {
            addMessage('assistant', 'Upload failed for ' + escapeHtml(files[fi].name) + ': ' + (uploadData.error || 'Server error ' + uploadRes.status), 'error');
          } else if (uploadData.file_id) {
            fileInfo.push({ file_id: uploadData.file_id, name: uploadData.name, type: uploadData.type, size: uploadData.size, text_preview: uploadData.text_preview || '' });
            if (uploadData.extracting) {
              addMessage('assistant', '\u23f3 Extracting text from \u201c' + escapeHtml(uploadData.name) + '\u201d in the background. For best results, wait about 30 seconds before asking ' + escapeHtml(state.assistantName || 'Karna') + ' to parse it.', 'info');
            }
          }
        } catch(ue) {
          addMessage('assistant', 'Failed to upload ' + escapeHtml(files[fi].name) + ': ' + ue.message, 'error');
        }
      }

      if (!text && fileInfo.length > 0) {
        text = 'I uploaded ' + (fileInfo.length === 1 ? 'a file: ' + fileInfo[0].name : fileInfo.length + ' files: ' + fileInfo.map(function(f){return f.name;}).join(', ')) + '. What would you like me to do with ' + (fileInfo.length === 1 ? 'it' : 'them') + '?';
      }
    } else {
      addMessage('user', text);
      showThinking(true);
    }

    // Use SSE streaming for better UX
    await handleStreamingSend(text, fileInfo);
  }

  // SSE Streaming send function
  async function handleStreamingSend(text, fileInfo) {
    var input = document.getElementById('inputField');
    var messagesEl = document.getElementById('messages');
    var streamingContainer = null;
    var streamingText = null;
    var toolsContainer = null;
    var accumulatedText = '';
    var activeTools = {};
    var browserAckEl = null;
    var browserProgressEl = null;
    var researchProgressEl = null;
    var eventsReceived = 0;
    var streamReader = null;
    var streamSession = beginStreamSession();

    try {
      var body = { message: text };
      if (state.activeThreadId) body.thread_id = state.activeThreadId;
      if (fileInfo && fileInfo.length > 0) body.files = fileInfo;

      var response = await fetch(API + '/chat/stream', {
        method: 'POST',
        signal: state.abortController ? state.abortController.signal : undefined,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        },
        body: JSON.stringify(body)
      });

      // Check for non-SSE error response
      if (!response.ok || !response.headers.get('content-type')?.includes('text/event-stream')) {
        var errorData = await response.json().catch(function() { return { error: 'Connection failed' }; });
        showThinking(false);
        addMessage('assistant', errorData.error || 'Something went wrong', errorData.type === 'no_provider' ? 'error-provider' : 'error');
        state.loading = false;
        state.abortController = null;
        updateSendBtn();
        input.focus();
        return;
      }

      // Get thread ID + run ID from headers.
      var threadIdHeader = response.headers.get('X-Thread-Id');
      if (threadIdHeader) setActiveThreadId(threadIdHeader);
      var runIdHeader = response.headers.get('X-Run-Id');
      state.activeRunId = runIdHeader || null;
      if (state.activeThreadId && state.view !== 'chat') state.view = 'chat';
      var ttlHeader = document.getElementById('threadTitleDisplay');
      if (state.activeThreadId && ttlHeader && !ttlHeader.textContent) {
        ttlHeader.textContent = text.substring(0, 60);
      }

      // Create streaming response container
      streamingContainer = appendStreamingContainer(messagesEl);
      toolsContainer = streamingContainer.querySelector('.tools-container');
      streamingText = streamingContainer.querySelector('.streaming-text');

      // Read the SSE stream
      streamReader = response.body.getReader();
      var streamCtx = {
        streamSession: streamSession,
        get eventsReceived() { return eventsReceived; },
        set eventsReceived(v) { eventsReceived = v; },
        streamingText: streamingText,
        toolsContainer: toolsContainer,
        get accumulatedText() { return accumulatedText; },
        set accumulatedText(v) { accumulatedText = v; },
        activeTools: activeTools,
        get browserAckEl() { return browserAckEl; },
        set browserAckEl(v) { browserAckEl = v; },
        get browserProgressEl() { return browserProgressEl; },
        set browserProgressEl(v) { browserProgressEl = v; },
        get researchProgressEl() { return researchProgressEl; },
        set researchProgressEl(v) { researchProgressEl = v; },
      };
      await consumeSSEStream(streamReader, streamCtx);

      // Stream completed
      showThinking(false);

      // Remove tool indicators after stream completes — they clutter the final message.
      // Replace with a minimal inline badge showing tool names used.
      if (toolsContainer) {
        var toolEls = toolsContainer.querySelectorAll('.tool-indicator');
        if (toolEls.length > 0) {
          var toolNames = [];
          toolEls.forEach(function(el) {
            var nameEl = el.querySelector('.tool-name');
            if (nameEl) toolNames.push(nameEl.textContent);
          });
          toolsContainer.innerHTML = '';
          if (toolNames.length > 0) {
            var badge = document.createElement('div');
            badge.className = 'tools-used-badge';
            badge.textContent = toolNames.join(' · ');
            toolsContainer.appendChild(badge);
          }
        }
      }

      // Finalize the response - apply markdown rendering
      if (streamingText && accumulatedText) {
        finalizeStreamingMarkdown({ streamingText: streamingText, accumulatedText: accumulatedText }, true);
      }

    } catch(err) {
      showThinking(false);
      // On a network drop (app backgrounded, phone sleep, flaky connection) the
      // run keeps going on the backend. Auto-resume from the buffered events
      // instead of showing a misleading "Connection lost" error.
      var isAbort = err && err.name === 'AbortError';
      var canResume = !isAbort && state.activeRunId && state.loading;
      if (canResume && streamingContainer) {
        // Kill the dropped connection's reader and start a fresh session so two
        // SSE loops never append into the same buffer concurrently.
        invalidateStreamSession(streamSession);
        await cancelStreamReader(streamReader);
        streamSession = beginStreamSession();

        // Show reconnecting status so user knows something is happening
        var reconnecting = document.createElement('div');
        reconnecting.className = 'reconnecting-status';
        reconnecting.textContent = 'Reconnecting\u2026';
        messagesEl.appendChild(reconnecting);

        var resumeCtx = {
          streamSession: streamSession,
          get eventsReceived() { return eventsReceived; },
          set eventsReceived(v) { eventsReceived = v; },
          streamingText: streamingText,
          toolsContainer: toolsContainer,
          get accumulatedText() { return accumulatedText; },
          set accumulatedText(v) { accumulatedText = v; },
          activeTools: activeTools,
          get browserAckEl() { return browserAckEl; },
          set browserAckEl(v) { browserAckEl = v; },
          get browserProgressEl() { return browserProgressEl; },
          set browserProgressEl(v) { browserProgressEl = v; },
          get researchProgressEl() { return researchProgressEl; },
          set researchProgressEl(v) { researchProgressEl = v; },
        };

        // Wait for the PWA/tab to be visible before retrying — mobile browsers
        // suspend SSE connections when backgrounded, so retrying while hidden
        // always fails. We wait up to 30s for visibility, then retry.
        var visWait = new Promise(function(resolve) {
          if (document.visibilityState !== 'hidden') { resolve(); return; }
          function onVisible() {
            if (document.visibilityState !== 'hidden') {
              document.removeEventListener('visibilitychange', onVisible);
              resolve();
            }
          }
          document.addEventListener('visibilitychange', onVisible);
          setTimeout(resolve, 30000); // fallback — don't wait forever
        });
        await visWait;

        // Retry resume up to 4 times with exponential backoff (1s, 2s, 4s, 8s)
        var resumeOk = false;
        for (var retry = 0; retry < 4; retry++) {
          if (retry > 0) await new Promise(function(r) { setTimeout(r, 1000 * Math.pow(2, retry - 1)); });
          var ok = await attemptResume(streamingContainer, resumeCtx, eventsReceived);
          if (ok) { resumeOk = true; break; }
        }

        reconnecting.remove();
        if (!resumeOk) {
          if (streamingContainer) streamingContainer.remove();
          addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
        }
      } else {
        if (streamingContainer) streamingContainer.remove();
        if (!isAbort) {
          addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
        }
      }
    }
    state.loading = false;
    state.activeRunId = null;
    state.abortController = null;
    updateSendBtn();
    if (input) input.focus();
  }

  function beginStreamSession() {
    state.streamSession = (state.streamSession || 0) + 1;
    return state.streamSession;
  }

  function invalidateStreamSession(sessionId) {
    if (state.streamSession === sessionId) {
      state.streamSession = (state.streamSession || 0) + 1;
    }
  }

  function isActiveStreamSession(sessionId) {
    return sessionId == null || sessionId === state.streamSession;
  }

  async function cancelStreamReader(reader) {
    if (!reader) return;
    try { await reader.cancel(); } catch (e) { /* already closed */ }
  }

  // Single resume attempt — returns true if it succeeded, false if not.
  // Uses the event cursor (?from=) so it only gets unseen events.
  async function attemptResume(streamingContainer, ctx, fromEvent) {
    try {
      var from = (typeof fromEvent === 'number' && fromEvent >= 0) ? fromEvent : (ctx.eventsReceived || 0);
      var resumeUrl = API + '/chat/runs/' + encodeURIComponent(state.activeRunId) + '/resume?from=' + from;
      var res = await fetch(resumeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        }
      });
      if (!res.ok || !res.headers.get('content-type') || res.headers.get('content-type').indexOf('text/event-stream') === -1) {
        return false;
      }
      var reader = res.body.getReader();
      await consumeSSEStream(reader, ctx);
      showThinking(false);
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  // Consume an SSE reader and dispatch events into the given context. Shared by
  // the original /chat/stream response and the /resume response.
  async function consumeSSEStream(reader, ctx) {
    var decoder = new TextDecoder();
    var buffer = '';
    var sessionId = ctx.streamSession;
    try {
      while (true) {
        if (!isActiveStreamSession(sessionId)) break;
        var result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        var lines = buffer.split('\\n');
        buffer = lines.pop() || '';
        for (var i = 0; i < lines.length; i++) {
          if (!isActiveStreamSession(sessionId)) break;
          var line = lines[i].trim();
          if (line.startsWith('event: ')) {
            var eventType = line.substring(7);
            var dataLine = lines[++i] || '';
            if (dataLine.startsWith('data: ')) {
              try {
                var eventData = JSON.parse(dataLine.substring(6));
                ctx.eventsReceived = (ctx.eventsReceived || 0) + 1;
                handleSSEEvent(eventType, eventData, {
                  streamSession: sessionId,
                  streamingText: ctx.streamingText,
                  toolsContainer: ctx.toolsContainer,
                  get accumulatedText() { return ctx.accumulatedText; },
                  set accumulatedText(v) { ctx.accumulatedText = v; },
                  activeTools: ctx.activeTools,
                  get browserAckEl() { return ctx.browserAckEl; },
                  set browserAckEl(v) { ctx.browserAckEl = v; },
                  get browserProgressEl() { return ctx.browserProgressEl; },
                  set browserProgressEl(v) { ctx.browserProgressEl = v; },
                  get researchProgressEl() { return ctx.researchProgressEl; },
                  set researchProgressEl(v) { ctx.researchProgressEl = v; },
                });
              } catch (parseErr) {
                console.error('SSE parse error:', parseErr);
              }
            }
          }
        }
        scrollToBottom();
      }
    } finally {
      await cancelStreamReader(reader);
    }
  }

  // Resume an in-flight (or just-completed) run after the connection dropped.
  // Uses an event cursor so only unseen events are delivered — never replays
  // chunks the client already rendered (which caused doubled/garbled text).
  async function resumeStream(streamingContainer, ctx, fromEvent) {
    if (!state.activeRunId || state.resumeInProgress) return;
    state.resumeInProgress = true;
    try {
      var from = (typeof fromEvent === 'number' && fromEvent >= 0) ? fromEvent : (ctx.eventsReceived || 0);
      var resumeUrl = API + '/chat/runs/' + encodeURIComponent(state.activeRunId) + '/resume?from=' + from;
      var res = await fetch(resumeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        }
      });
      if (!res.ok || !res.headers.get('content-type') || res.headers.get('content-type').indexOf('text/event-stream') === -1) {
        // Resume endpoint returned an error (run gone / not owned). Fall back to
        // the friendly message so the user knows to retry.
        if (streamingContainer) streamingContainer.remove();
        addMessage('assistant', 'Connection lost. Your request may still be processing — refresh the thread in a moment.', 'error');
        return;
      }
      var reader = res.body.getReader();
      await consumeSSEStream(reader, ctx);
      showThinking(false);
      // Finalize the rendered text once the resumed stream ends.
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
      // Clean up reconnecting status on successful resume
      var messagesEl = document.getElementById('messages');
      if (messagesEl) {
        var rc = messagesEl.querySelector('.reconnecting-status');
        if (rc) rc.remove();
      }
    } catch (resumeErr) {
      // Resume itself dropped (e.g. slept again). Leave the partial text in
      // place; the run is still going on the backend and the user can reopen
      // the thread to resume once more.
      console.warn('resume failed:', resumeErr && resumeErr.message);
    } finally {
      state.resumeInProgress = false;
    }
  }

  // Handle individual SSE events
  function handleSSEEvent(eventType, data, ctx) {
    if (!isActiveStreamSession(ctx.streamSession)) return;
    if (data && data.threadId) setActiveThreadId(data.threadId);
    switch (eventType) {
      case 'thinking':
        showThinking(true);
        break;

      case 'browser_ack':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          // Remove any stale progress indicator from a prior ack in the same turn
          var oldAck = ctx.toolsContainer.querySelector('.browser-ack');
          if (oldAck) oldAck.remove();
          ctx.browserAckEl = document.createElement('div');
          ctx.browserAckEl.className = 'browser-ack';
          ctx.browserAckEl.innerHTML =
            '<span class="browser-ack-icon">🌐</span>' +
            '<div class="browser-ack-body">' +
              '<span class="browser-ack-msg">' + escapeHtml(data.message) + '</span>' +
              (data.startedAt ? '<span class="browser-ack-time">Started at ' + escapeHtml(data.startedAt) + '</span>' : '') +
            '</div>';
          ctx.toolsContainer.appendChild(ctx.browserAckEl);
          // Reuse ctx.browserProgressEl slot for live updates
          ctx.browserProgressEl = null;
          scrollToBottom();
        }
        break;

      case 'browser_progress':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          if (ctx.browserProgressEl) {
            // Update existing progress element in-place (avoids DOM churn)
            var msgSpan = ctx.browserProgressEl.querySelector('.browser-progress-msg');
            if (msgSpan) msgSpan.textContent = data.message;
          } else {
            ctx.browserProgressEl = document.createElement('div');
            ctx.browserProgressEl.className = 'browser-progress';
            ctx.browserProgressEl.innerHTML =
              '<div class="browser-progress-dots"><span></span><span></span><span></span></div>' +
              '<span class="browser-progress-msg">' + escapeHtml(data.message) + '</span>';
            ctx.toolsContainer.appendChild(ctx.browserProgressEl);
          }
          scrollToBottom();
        }
        break;

      case 'research_ack':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          var researchEl = document.createElement('div');
          researchEl.className = 'research-ack';
          researchEl.textContent = data.message;
          ctx.toolsContainer.appendChild(researchEl);
          scrollToBottom();
        }
        break;

      case 'research_progress':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          if (ctx.researchProgressEl) {
            // Update existing progress element in-place (avoids DOM churn)
            var rMsgSpan = ctx.researchProgressEl.querySelector('.research-progress-msg');
            if (rMsgSpan) rMsgSpan.textContent = data.message;
          } else {
            ctx.researchProgressEl = document.createElement('div');
            ctx.researchProgressEl.className = 'browser-progress research-progress';
            ctx.researchProgressEl.innerHTML =
              '<div class="browser-progress-dots"><span></span><span></span><span></span></div>' +
              '<span class="research-progress-msg">' + escapeHtml(data.message) + '</span>';
            ctx.toolsContainer.appendChild(ctx.researchProgressEl);
          }
          scrollToBottom();
        }
        break;

      case 'tool_start':
        if (ctx.toolsContainer && data.tool) {
          var toolId = 'tool-' + Date.now() + '-' + Math.random().toString(36).substring(7);
          ctx.activeTools[data.tool] = toolId;
          var toolEl = document.createElement('div');
          toolEl.id = toolId;
          toolEl.className = 'tool-indicator running';
          var toolDisplayName = formatToolName(data.tool);
          toolEl.innerHTML = '<div class="tool-spinner"></div><span class="tool-name">' + escapeHtml(toolDisplayName) + '</span><span style="color:var(--text-muted)">running...</span>';
          ctx.toolsContainer.appendChild(toolEl);
          scrollToBottom();
        }
        break;

      case 'tool_end':
        if (data.tool && ctx.activeTools[data.tool]) {
          var toolEl = document.getElementById(ctx.activeTools[data.tool]);
          if (toolEl) {
            var isError = isToolResultError(data.toolResult);
            toolEl.className = 'tool-indicator ' + (isError ? 'error' : 'completed');
            var icon = isError ? '<span class="tool-error-icon">\\u2717</span>' : '<span class="tool-check">\\u2713</span>';
            var toolDisplayName = formatToolName(data.tool);
            toolEl.innerHTML = icon + '<span class="tool-name">' + escapeHtml(toolDisplayName) + '</span><span style="color:var(--text-muted)">' + (isError ? 'failed' : 'done') + '</span>';
            if (data.toolResult && !isError) {
              var resultPreview = data.toolResult.substring(0, 100) + (data.toolResult.length > 100 ? '...' : '');
              toolEl.innerHTML += '<div class="tool-result">' + escapeHtml(resultPreview) + '</div>';
            }
          }
          delete ctx.activeTools[data.tool];
        }
        // Clear browser and research progress indicators when the tool finishes
        if (ctx.browserProgressEl) { ctx.browserProgressEl.remove(); ctx.browserProgressEl = null; }
        if (ctx.browserAckEl) { ctx.browserAckEl.remove(); ctx.browserAckEl = null; }
        if (ctx.researchProgressEl) { ctx.researchProgressEl.remove(); ctx.researchProgressEl = null; }
        showThinking(false);
        break;

      case 'chunk':
        showThinking(false);
        if (data.text && ctx.streamingText) {
          var nextText = (ctx.accumulatedText || '') + data.text;
          ctx.accumulatedText = nextText;
          finalizeStreamingMarkdown(ctx, false);
          // No auto-scroll here — user controls scroll; streaming response grows in place
        }
        break;

      case 'done':
        showThinking(false);
        finalizeStreamingMarkdown(ctx, true);
        break;

      case 'error':
        showThinking(false);
        if (ctx.streamingText) {
          ctx.streamingText.className = 'streaming-text msg-assistant msg-error';
          ctx.streamingText.innerHTML = '<span style="color:var(--danger)">⚠️ ' + escapeHtml(data.error || 'An error occurred') + '</span>';
        }
        break;
    }
  }

  function isToolResultError(toolResult) {
    if (!toolResult) return false;
    return toolResult.startsWith('Error:') ||
      toolResult.startsWith('Gmail search error:') ||
      toolResult.startsWith('Gmail list error:') ||
      toolResult.startsWith('Gmail read error:') ||
      toolResult.startsWith('Gmail access denied') ||
      toolResult.indexOf('could not read message details') !== -1 ||
      toolResult.startsWith('Browser task failed') ||
      toolResult.startsWith('Browser task error') ||
      toolResult.startsWith('Browser status check error');
  }

  // Format tool names for display
  function formatToolName(toolName) {
    var nameMap = {
      'web_search': 'Web Search',
      'research': 'Deep Research',
      'read_url': 'Reading Page',
      'search_youtube': 'YouTube Search',
      'gmail_list': 'Checking Gmail',
      'gmail_read': 'Reading Email',
      'gmail_search': 'Searching Gmail',
      'gmail_send': 'Sending Email',
      'gmail_draft': 'Creating Draft',
      'gmail_unread_count': 'Checking Unread',
      'gmail_modify': 'Updating Email',
      'list_calendar_events': 'Checking Calendar',
      'create_calendar_event': 'Creating Event',
      'read_sheet': 'Reading Sheet',
      'write_sheet': 'Writing Sheet',
      'append_sheet': 'Adding to Sheet',
      'create_sheet': 'Creating Spreadsheet',
      'create_doc': 'Creating Document',
      'create_file': 'Generating File',
      'read_doc': 'Reading Document',
      'append_to_doc': 'Adding to Document',
      'drive_list': 'Listing Drive Files',
      'drive_search': 'Searching Drive',
      'drive_read_file': 'Reading Drive File',
      'drive_delete_file': 'Deleting File',
      'drive_organise': 'Organising File',
      'parse_document': 'Parsing Document',
      'compare_documents': 'Comparing Documents',
      'store_memory': 'Saving Memory',
      'search_memory': 'Searching Memory',
      'delete_memory': 'Deleting Memory',
      'update_memory': 'Updating Memory',
      'create_schedule': 'Creating Schedule',
      'list_schedules': 'Listing Schedules',
      'update_schedule': 'Updating Schedule',
      'delete_schedule': 'Deleting Schedule',
      'toggle_schedule': 'Toggling Schedule',
      'create_skill': 'Creating Skill',
      'list_skills': 'Listing Skills',
      'get_system_status': 'Checking Status',
      'get_capabilities_summary': 'Checking Capabilities',
      'browser_task': 'Running Browser',
      'browser_task_status': 'Checking Browser Task',
      'vault_lookup': 'Checking Vault',
    };
    return nameMap[toolName] || toolName.replace(/_/g, ' ').replace(/\\b\\w/g, function(l) { return l.toUpperCase(); });
  }

  function addMessage(role, content, type) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    if (role === 'user') {
      appendChatTurn(messagesEl, content);
      scrollToBottomForce();
    } else {
      appendAssistantBlock(messagesEl, content, type);
      scrollToBottom();
    }
  }

  var _userScrolled = false;

  function onChatScroll() {
    var area = document.getElementById('chatArea');
    if (!area) return;
    // If user scrolled up more than 60px from bottom, suppress auto-scroll
    _userScrolled = (area.scrollHeight - area.scrollTop - area.clientHeight) > 60;
  }

  function scrollToBottom() {
    if (_userScrolled) return;
    var area = document.getElementById('chatArea');
    if (area) requestAnimationFrame(function() { area.scrollTop = area.scrollHeight; });
  }

  function scrollToBottomForce() {
    var area = document.getElementById('chatArea');
    if (area) requestAnimationFrame(function() { area.scrollTop = area.scrollHeight; });
  }

  function showThinking(show) { var el = document.getElementById('thinking'); if (el) el.style.display = show ? 'block' : 'none'; if (show) scrollToBottom(); }
`;
}
