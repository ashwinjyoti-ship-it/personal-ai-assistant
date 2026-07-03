// voice — conversational WebRTC client for GPT Realtime 2

/** Shared voice dock markup (home dashboard + chat). */
export function getVoiceDockHtml(): string {
  return '<div class="voice-dock" id="voiceDock">' +
    '<div id="voiceHint" class="voice-hint">Tap mic to start talking</div>' +
    '<div class="voice-dock-controls">' +
      '<button type="button" class="voice-btn" id="voiceBtn" title="Start voice conversation" aria-label="Start voice conversation" aria-pressed="false">' +
        '<svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />' +
          '<path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V21H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-3.08A7 7 0 0 0 19 11Z" />' +
        '</svg>' +
      '</button>' +
      '<button type="button" class="voice-abort-btn" id="voiceAbortBtn" title="Abort browser automation" aria-label="Abort browser automation" style="display:none">Abort</button>' +
    '</div>' +
  '</div>';
}

export function getVoiceScript(): string {
  return `  // ============================================================
  // VOICE (conversation mode, WebRTC → OpenAI Realtime + server VAD)
  // ============================================================

  state.voice = state.voice || {
    status: 'idle',
    conversationActive: false,
    sessionId: null,
    clientSecret: null,
    threadId: null,
    pc: null,
    dc: null,
    micStream: null,
    userText: '',
    assistantText: '',
    toolsUsed: [],
    browserActive: false,
    activeBrowserTaskId: null,
    toolAbortController: null,
    pendingConfirmation: null,
    seenCallIds: {},
    heavyTools: [],
    handoffTriggered: false,
  };

  // ---- Heavy task handoff -------------------------------------------------
  // Research, essays, emails, reports, and other long-form written work don't
  // belong spoken on the home screen. Detect the intent from the transcript
  // (or from the tool the realtime model chooses to call) and hand off to a
  // chat thread: brief spoken ack, full run with progress UI, written result
  // lands in the thread.
  function isHeavyTaskIntent(text) {
    var t = (text || '').toLowerCase().trim();
    if (!t) return false;
    if (/\\b(research|look into|deep dive)\\b/.test(t)) return true;
    if (/\\blong[- ]?form\\b/.test(t)) return true;
    var writeVerb = /\\b(write|draft|compose|put together|prepare)\\b/.test(t);
    var writeNoun = /\\b(essay|article|report|blog( post)?|email|proposal|memo|summary|document|write[- ]?up|newsletter|script|story)\\b/.test(t);
    return writeVerb && writeNoun;
  }

  function heavyTaskThreadTitle(text) {
    var clean = (text || '').replace(/\\s+/g, ' ').trim();
    if (!clean) return 'Voice request';
    return clean.length > 60 ? clean.substring(0, 60) + '...' : clean;
  }

  function triggerHeavyTaskHandoff(requestText) {
    if (state.voice.handoffTriggered) return;
    if (!requestText || !requestText.trim()) return;
    state.voice.handoffTriggered = true;
    var threadId = state.voice.threadId;
    if (threadId) {
      setActiveThreadId(threadId);
      api('/chat/threads/' + threadId, {
        method: 'PUT',
        body: JSON.stringify({ title: heavyTaskThreadTitle(requestText) }),
      }).then(function() {
        if (typeof loadThreadSidebar === 'function') loadThreadSidebar();
      }).catch(function() {});
    }
    state.pendingDashMessage = requestText.trim();
    state.view = 'chat';
    renderView();
  }

  function userSaidYes(text) {
    return /\\b(yes|yeah|yep|go ahead|confirm|do it|send it|proceed|ok|okay)\\b/i.test(text || '');
  }

  function userWantsToEnd(text) {
    return /\\b(goodbye|bye|hang up|stop listening|that'?s all|that is all|end call|stop voice)\\b/i.test(text || '');
  }

  function updateVoiceAbortButton() {
    var btn = document.getElementById('voiceAbortBtn');
    if (!btn) return;
    var show = !!state.voice.browserActive;
    btn.style.display = show ? 'inline-flex' : 'none';
  }

  function setVoiceStatus(status) {
    state.voice.status = status;
    var btn = document.getElementById('voiceBtn');
    if (!btn) return;
    btn.classList.remove('voice-btn--listening', 'voice-btn--processing', 'voice-btn--speaking', 'voice-btn--live');
    var inConversation = !!state.voice.conversationActive;
    btn.setAttribute('aria-pressed', inConversation ? 'true' : 'false');
    var dockEl = document.getElementById('voiceDock');
    if (dockEl) dockEl.classList.toggle('voice-dock--active', inConversation);
    if (status === 'listening') {
      btn.classList.add('voice-btn--listening');
      if (inConversation) btn.classList.add('voice-btn--live');
    }
    if (status === 'processing') btn.classList.add('voice-btn--processing');
    if (status === 'speaking') btn.classList.add('voice-btn--speaking');
    updateVoiceAbortButton();
    var hint = document.getElementById('voiceHint');
    if (!hint) return;
    if (!inConversation) {
      hint.textContent = 'Tap mic to start talking';
      btn.title = 'Start voice conversation';
      btn.setAttribute('aria-label', 'Start voice conversation');
      return;
    }
    btn.title = 'End voice conversation';
    btn.setAttribute('aria-label', 'End voice conversation');
    if (status === 'listening') hint.textContent = 'Listening… tap mic to end';
    else if (status === 'processing') hint.textContent = 'Thinking…';
    else if (status === 'speaking') hint.textContent = 'Speaking…';
    else hint.textContent = 'Tap mic to end';
  }

  function resumeListening() {
    if (!state.voice.conversationActive) {
      setVoiceStatus('idle');
      return;
    }
    setMicEnabled(true);
    setVoiceStatus('listening');
  }

  async function ensureVoiceSession() {
    if (state.voice.sessionId && state.voice.clientSecret) return true;
    setVoiceStatus('processing');
    var body = {
      thread_id: state.activeThreadId || undefined,
      mode: 'work',
      phase: 'full',
    };
    var res = await api('/voice/session', { method: 'POST', body: JSON.stringify(body) });
    if (res.error) {
      alert(res.error);
      setVoiceStatus('idle');
      return false;
    }
    state.voice.sessionId = res.session_id;
    state.voice.clientSecret = res.client_secret;
    state.voice.threadId = res.thread_id;
    state.voice.heavyTools = res.heavy_tools || [];
    if (!state.activeThreadId) {
      state.activeThreadId = res.thread_id;
      if (typeof loadThreadSidebar === 'function') loadThreadSidebar();
    }
    return true;
  }

  function handleVoiceServerEvent(evt) {
    if (!evt || !evt.type) return;
    if (evt.type === 'input_audio_buffer.speech_started') {
      if (state.voice.conversationActive) setVoiceStatus('listening');
      return;
    }
    if (evt.type === 'input_audio_buffer.speech_stopped') {
      if (state.voice.conversationActive) setVoiceStatus('processing');
      return;
    }
    if (evt.type === 'response.created') {
      setMicEnabled(false);
      setVoiceStatus('speaking');
      return;
    }
    if (evt.type === 'response.cancelled') {
      resumeListening();
      return;
    }
    if (evt.type === 'response.function_call_arguments.done') {
      var callId = evt.call_id;
      var name = evt.name;
      var args = evt.arguments || '{}';
      if (state.voice.seenCallIds[callId]) return;
      state.voice.seenCallIds[callId] = true;
      relayVoiceToolCall(callId, name, args);
      return;
    }
    if (evt.type === 'response.output_item.done' && evt.item && evt.item.type === 'function_call') {
      if (state.voice.seenCallIds[evt.item.call_id]) return;
      state.voice.seenCallIds[evt.item.call_id] = true;
      relayVoiceToolCall(evt.item.call_id, evt.item.name, evt.item.arguments || '{}');
      return;
    }
    if (evt.type === 'conversation.item.input_audio_transcription.completed' && evt.transcript) {
      state.voice.userText = (state.voice.userText ? state.voice.userText + ' ' : '') + evt.transcript;
      if (userWantsToEnd(evt.transcript)) {
        endVoiceSession();
        return;
      }
      if (state.voice.pendingConfirmation && userSaidYes(evt.transcript)) {
        var pending = state.voice.pendingConfirmation;
        state.voice.pendingConfirmation = null;
        relayVoiceToolCall(pending.callId, pending.name, pending.args, 'execute');
      }
      if (!state.voice.handoffTriggered && isHeavyTaskIntent(evt.transcript)) {
        triggerHeavyTaskHandoff(state.voice.userText);
      }
    }
    if (evt.type === 'response.output_audio_transcript.done' && evt.transcript) {
      state.voice.assistantText = (state.voice.assistantText ? state.voice.assistantText + ' ' : '') + evt.transcript;
    }
    if (evt.type === 'response.done') {
      finalizeVoiceTurn().then(function() {
        if (state.voice.conversationActive) resumeListening();
      });
      return;
    }
    if (evt.type === 'error') {
      console.error('[voice]', evt);
      endVoiceSession();
    }
  }

  async function relayVoiceToolCall(callId, name, args, transactionMode) {
    if (!callId || !name) return;
    state.voice.toolsUsed.push(name);

    if (state.voice.heavyTools && state.voice.heavyTools.indexOf(name) !== -1) {
      triggerHeavyTaskHandoff(state.voice.userText);
      var ackOutput = 'Got it \\u2014 starting that now. The full result will show up in the chat.';
      if (state.voice.dc && state.voice.dc.readyState === 'open') {
        state.voice.dc.send(JSON.stringify({
          type: 'conversation.item.create',
          item: { type: 'function_call_output', call_id: callId, output: ackOutput },
        }));
        state.voice.dc.send(JSON.stringify({ type: 'response.create' }));
        setMicEnabled(false);
        setVoiceStatus('speaking');
      }
      return;
    }

    if (name === 'browser_task' || name === 'browser_task_status') {
      state.voice.browserActive = true;
      updateVoiceAbortButton();
    }
    if (state.voice.toolAbortController) state.voice.toolAbortController.abort();
    state.voice.toolAbortController = new AbortController();
    var payload = {
      session_id: state.voice.sessionId,
      call_id: callId,
      name: name,
      arguments: args,
    };
    if (transactionMode) payload.transaction_mode = transactionMode;
    var res;
    try {
      res = await fetch(API + '/voice/tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session ? state.session.sessionId : ''),
        },
        body: JSON.stringify(payload),
        signal: state.voice.toolAbortController.signal,
      });
      res = await res.json();
    } catch (e) {
      if (e && e.name === 'AbortError') {
        res = { output: 'Browser automation aborted by user.', pending_confirmation: false };
      } else {
        res = { output: 'Tool call failed: ' + (e.message || String(e)), pending_confirmation: false };
      }
    }
    state.voice.toolAbortController = null;
    if (name === 'browser_task' || name === 'browser_task_status') {
      state.voice.browserActive = false;
      updateVoiceAbortButton();
    }
    var output = res.output || res.error || 'Tool failed';
    if (res.pending_confirmation) {
      state.voice.pendingConfirmation = { callId: callId, name: name, args: args };
      if (userSaidYes(state.voice.userText)) {
        state.voice.pendingConfirmation = null;
        return relayVoiceToolCall(callId, name, args, 'execute');
      }
    } else {
      state.voice.pendingConfirmation = null;
    }
    if (state.voice.dc && state.voice.dc.readyState === 'open') {
      state.voice.dc.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: callId,
          output: output,
        },
      }));
      state.voice.dc.send(JSON.stringify({ type: 'response.create' }));
      setMicEnabled(false);
      setVoiceStatus('speaking');
    }
  }

  async function abortVoiceBrowser() {
    if (state.voice.toolAbortController) state.voice.toolAbortController.abort();
    await api('/voice/abort-browser', {
      method: 'POST',
      body: JSON.stringify({
        session_id: state.voice.sessionId,
        task_id: state.voice.activeBrowserTaskId || undefined,
      }),
    });
    state.voice.browserActive = false;
    state.voice.activeBrowserTaskId = null;
    updateVoiceAbortButton();
    if (state.voice.dc && state.voice.dc.readyState === 'open') {
      state.voice.dc.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [{ type: 'input_text', text: 'The user aborted browser automation. Acknowledge briefly.' }],
        },
      }));
      state.voice.dc.send(JSON.stringify({ type: 'response.create' }));
    }
    resumeListening();
  }

  async function finalizeVoiceTurn() {
    var userText = (state.voice.userText || '').trim();
    var assistantText = (state.voice.assistantText || '').trim();
    // Handed-off turns are persisted by the chat pipeline itself (full request
    // + full written result), so skip the transcript-only save here to avoid
    // duplicating/shadowing that with a truncated spoken ack.
    if (userText && state.voice.threadId && !state.voice.handoffTriggered) {
      await api('/voice/turn', {
        method: 'POST',
        body: JSON.stringify({
          session_id: state.voice.sessionId,
          thread_id: state.voice.threadId,
          user_text: userText,
          assistant_text: assistantText,
          tools_used: state.voice.toolsUsed,
        }),
      });
      if (state.activeThreadId === state.voice.threadId && typeof loadThreadMessages === 'function') {
        loadThreadMessages(state.activeThreadId);
      }
    }
    state.voice.userText = '';
    state.voice.assistantText = '';
    state.voice.toolsUsed = [];
    state.voice.seenCallIds = {};
    state.voice.handoffTriggered = false;
  }

  async function connectVoiceWebRTC() {
    if (state.voice.pc) return true;
    var secret = state.voice.clientSecret;
    if (!secret) return false;

    var pc = new RTCPeerConnection();
    state.voice.pc = pc;

    var remoteAudio = document.getElementById('voiceRemoteAudio');
    if (!remoteAudio) {
      remoteAudio = document.createElement('audio');
      remoteAudio.id = 'voiceRemoteAudio';
      remoteAudio.autoplay = true;
      remoteAudio.style.display = 'none';
      document.body.appendChild(remoteAudio);
    }
    pc.ontrack = function(e) {
      remoteAudio.srcObject = e.streams[0];
    };

    pc.addTransceiver('audio', { direction: 'sendrecv' });

    var dc = pc.createDataChannel('oai-events');
    state.voice.dc = dc;
    dc.onmessage = function(m) {
      try { handleVoiceServerEvent(JSON.parse(m.data)); } catch (e) { console.warn('[voice] bad event', e); }
    };

    var micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.voice.micStream = micStream;
    micStream.getAudioTracks().forEach(function(track) {
      track.enabled = true;
      pc.addTrack(track, micStream);
    });

    var offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    var sdpRes = await fetch('https://api.openai.com/v1/realtime/calls', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + secret,
        'Content-Type': 'application/sdp',
      },
      body: offer.sdp,
    });
    if (!sdpRes.ok) {
      var errText = await sdpRes.text();
      throw new Error('WebRTC connect failed: ' + sdpRes.status + ' ' + errText.slice(0, 200));
    }
    var answerSdp = await sdpRes.text();
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
    return true;
  }

  function setMicEnabled(on) {
    if (!state.voice.micStream) return;
    state.voice.micStream.getAudioTracks().forEach(function(t) { t.enabled = on; });
  }

  async function toggleVoiceConversation() {
    if (!state.session) { alert('Sign in to use voice.'); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone not available in this browser.');
      return;
    }

    if (state.voice.conversationActive) {
      await endVoiceSession();
      return;
    }

    if (state.voice.status === 'processing' || state.voice.status === 'speaking') return;

    var ok = await ensureVoiceSession();
    if (!ok) return;
    try {
      await connectVoiceWebRTC();
    } catch (e) {
      alert(e.message || String(e));
      await endVoiceSession();
      return;
    }
    state.voice.conversationActive = true;
    state.voice.userText = '';
    state.voice.assistantText = '';
    state.voice.toolsUsed = [];
    state.voice.seenCallIds = {};
    state.voice.handoffTriggered = false;
    setMicEnabled(true);
    setVoiceStatus('listening');
  }

  async function endVoiceSession() {
    state.voice.conversationActive = false;
    setMicEnabled(false);
    if (state.voice.sessionId) {
      await api('/voice/end', { method: 'POST', body: JSON.stringify({ session_id: state.voice.sessionId }) });
    }
    if (state.voice.pc) {
      state.voice.pc.close();
      state.voice.pc = null;
    }
    if (state.voice.micStream) {
      state.voice.micStream.getTracks().forEach(function(t) { t.stop(); });
      state.voice.micStream = null;
    }
    state.voice.dc = null;
    state.voice.sessionId = null;
    state.voice.clientSecret = null;
    setVoiceStatus('idle');
  }

  function bindVoiceControls() {
    var btn = document.getElementById('voiceBtn');
    if (btn) btn.onclick = function() { toggleVoiceConversation(); };
    var abortBtn = document.getElementById('voiceAbortBtn');
    if (abortBtn) abortBtn.onclick = function() { abortVoiceBrowser(); };
    // The dock markup is rebuilt fresh on every view switch (e.g. the heavy
    // task handoff moving home -> chat mid-conversation), so re-apply the
    // live status instead of leaving it stuck on the idle default.
    if (state.voice.conversationActive) setVoiceStatus(state.voice.status);
    observeDockReserve();
    bindMicCollapse();
  }

  // On mobile, give the mic's column back to the text field while the
  // field is focused or holds text — you're not reaching for voice
  // input mid-type, so the field should get the full row width instead
  // of permanently sharing it with a 48px button.
  function bindMicCollapse() {
    var anchor = document.querySelector('.input-anchor');
    var field = document.getElementById('inputField') || document.getElementById('dashInputField');
    if (!anchor || !field) return;
    function sync() {
      var typing = document.activeElement === field || (field.textContent || '').trim().length > 0;
      anchor.classList.toggle('input-anchor--typing', typing);
      updateDockReserve();
    }
    field.addEventListener('focus', sync);
    field.addEventListener('blur', sync);
    sync();
  }

  // Keeps the chat scroll area's bottom padding equal to the real,
  // currently-rendered height of the floating input anchor (including
  // the voice dock, whether it's the compact idle mic or the large
  // active orb), so the last message is never hidden underneath it.
  function updateDockReserve() {
    var anchor = document.querySelector('.conv-page .input-anchor');
    var chatArea = document.querySelector('.conv-page .chat-area');
    if (!anchor || !chatArea) return;
    var topY = anchor.getBoundingClientRect().top;
    var dock = document.getElementById('voiceDock');
    if (dock && dock.classList.contains('voice-dock--active')) {
      topY = Math.min(topY, dock.getBoundingClientRect().top);
    }
    chatArea.style.setProperty('--dock-reserve', Math.max(0, window.innerHeight - topY) + 'px');
  }

  function observeDockReserve() {
    if (state.voice.dockReserveObserver) {
      state.voice.dockReserveObserver.disconnect();
      state.voice.dockReserveObserver = null;
    }
    var anchor = document.querySelector('.conv-page .input-anchor');
    if (!anchor || typeof ResizeObserver === 'undefined') return;
    var observer = new ResizeObserver(function() { updateDockReserve(); });
    observer.observe(anchor);
    var dock = document.getElementById('voiceDock');
    if (dock) observer.observe(dock);
    state.voice.dockReserveObserver = observer;
    updateDockReserve();
  }

  if (!state.voiceDockResizeBound) {
    state.voiceDockResizeBound = true;
    window.addEventListener('resize', function() { updateDockReserve(); });
  }
`;
}
