// voice — push-to-talk WebRTC client for GPT Realtime 2
export function getVoiceScript(): string {
  return `  // ============================================================
  // VOICE (push-to-talk, WebRTC → OpenAI Realtime)
  // ============================================================

  state.voice = state.voice || {
    status: 'idle',
    mode: 'work',
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
  };

  function voiceModeLabel(mode) {
    if (mode === 'quick') return 'Quick';
    if (mode === 'commute') return 'Commute';
    if (mode === 'operator') return 'Operator';
    return 'Work';
  }

  function isVoiceDesktop() {
    return window.matchMedia('(min-width: 641px) and (pointer: fine)').matches;
  }

  function syncVoiceModeOptions() {
    var sel = document.getElementById('voiceModeSelect');
    if (!sel) return;
    var op = sel.querySelector('option[value="operator"]');
    if (op) op.style.display = isVoiceDesktop() ? '' : 'none';
    if (!isVoiceDesktop() && state.voice.mode === 'operator') {
      state.voice.mode = 'work';
      sel.value = 'work';
    }
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
    btn.classList.remove('voice-btn--listening', 'voice-btn--processing', 'voice-btn--speaking');
    btn.setAttribute('aria-pressed', status === 'listening' ? 'true' : 'false');
    if (status === 'listening') btn.classList.add('voice-btn--listening');
    if (status === 'processing') btn.classList.add('voice-btn--processing');
    if (status === 'speaking') btn.classList.add('voice-btn--speaking');
    updateVoiceAbortButton();
    var hint = document.getElementById('voiceHint');
    if (hint) {
      if (status === 'listening') hint.textContent = 'Listening — tap mic when done';
      else if (status === 'processing') hint.textContent = 'Processing…';
      else if (status === 'speaking') hint.textContent = 'Speaking…';
      else hint.textContent = voiceModeLabel(state.voice.mode) + ' · tap mic to talk';
    }
  }

  async function ensureVoiceSession() {
    if (state.voice.sessionId && state.voice.clientSecret) return true;
    setVoiceStatus('processing');
    var mode = state.voice.mode || 'work';
    if (!isVoiceDesktop() && mode === 'operator') mode = 'work';
    var phase = 'read';
    if (isVoiceDesktop() && (mode === 'work' || mode === 'operator')) phase = 'full';
    var body = {
      thread_id: state.activeThreadId || undefined,
      mode: mode,
      phase: phase,
      platform: isVoiceDesktop() ? 'desktop' : 'mobile',
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
    if (!state.activeThreadId) {
      state.activeThreadId = res.thread_id;
      if (typeof loadThreads === 'function') loadThreads();
    }
    return true;
  }

  function handleVoiceServerEvent(evt) {
    if (!evt || !evt.type) return;
    if (evt.type === 'response.function_call_arguments.done') {
      var callId = evt.call_id;
      var name = evt.name;
      var args = evt.arguments || '{}';
      relayVoiceToolCall(callId, name, args);
      return;
    }
    if (evt.type === 'response.output_item.done' && evt.item && evt.item.type === 'function_call') {
      relayVoiceToolCall(evt.item.call_id, evt.item.name, evt.item.arguments || '{}');
      return;
    }
    if (evt.type === 'conversation.item.input_audio_transcription.completed' && evt.transcript) {
      state.voice.userText = (state.voice.userText ? state.voice.userText + ' ' : '') + evt.transcript;
      var said = (evt.transcript || '').toLowerCase();
      if (state.voice.pendingConfirmation && /\\b(yes|go ahead|confirm|do it|send it)\\b/.test(said)) {
        var pending = state.voice.pendingConfirmation;
        state.voice.pendingConfirmation = null;
        relayVoiceToolCall(pending.callId, pending.name, pending.args, 'execute');
      }
    }
    if (evt.type === 'response.output_audio_transcript.done' && evt.transcript) {
      state.voice.assistantText = (state.voice.assistantText ? state.voice.assistantText + ' ' : '') + evt.transcript;
    }
    if (evt.type === 'response.done') {
      finalizeVoiceTurn();
    }
    if (evt.type === 'error') {
      console.error('[voice]', evt);
      setVoiceStatus('idle');
    }
  }

  async function relayVoiceToolCall(callId, name, args, transactionMode) {
    if (!callId || !name) return;
    state.voice.toolsUsed.push(name);
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
    }
    if (res.pending_confirmation && state.voice.dc) {
      state.voice.dc.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [{ type: 'input_text', text: 'Ask the user to confirm with yes or go ahead before executing that write.' }],
        },
      }));
      state.voice.dc.send(JSON.stringify({ type: 'response.create' }));
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
    setVoiceStatus('idle');
  }

  async function finalizeVoiceTurn() {
    var userText = (state.voice.userText || '').trim();
    var assistantText = (state.voice.assistantText || '').trim();
    if (userText && state.voice.threadId) {
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
    setVoiceStatus('idle');
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
      track.enabled = false;
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

  function commitVoiceTurn() {
    if (state.voice.dc && state.voice.dc.readyState === 'open') {
      state.voice.dc.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
      state.voice.dc.send(JSON.stringify({ type: 'response.create' }));
    }
    setMicEnabled(false);
    setVoiceStatus('processing');
  }

  async function toggleVoicePushToTalk() {
    if (!state.session) { alert('Sign in to use voice.'); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone not available in this browser.');
      return;
    }

    var status = state.voice.status;
    if (status === 'processing' || status === 'speaking') return;

    if (status === 'idle') {
      var ok = await ensureVoiceSession();
      if (!ok) return;
      try {
        await connectVoiceWebRTC();
      } catch (e) {
        alert(e.message || String(e));
        setVoiceStatus('idle');
        return;
      }
      state.voice.userText = '';
      state.voice.assistantText = '';
      state.voice.toolsUsed = [];
      setMicEnabled(true);
      setVoiceStatus('listening');
      return;
    }

    if (status === 'listening') {
      commitVoiceTurn();
    }
  }

  async function endVoiceSession() {
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

  function cycleVoiceMode() {
    var modes = ['work', 'quick', 'commute'];
    var idx = modes.indexOf(state.voice.mode || 'work');
    state.voice.mode = modes[(idx + 1) % modes.length];
    var sel = document.getElementById('voiceModeSelect');
    if (sel) sel.value = state.voice.mode;
    setVoiceStatus(state.voice.status);
  }

  function bindVoiceControls() {
    syncVoiceModeOptions();
    window.addEventListener('resize', syncVoiceModeOptions);
    var btn = document.getElementById('voiceBtn');
    if (btn) btn.onclick = function() { toggleVoicePushToTalk(); };
    var sel = document.getElementById('voiceModeSelect');
    if (sel) {
      sel.value = state.voice.mode || 'work';
      sel.onchange = function() {
        state.voice.mode = sel.value;
        endVoiceSession();
        setVoiceStatus('idle');
      };
    }
    var abortBtn = document.getElementById('voiceAbortBtn');
    if (abortBtn) abortBtn.onclick = function() { abortVoiceBrowser(); };
  }
`;
}
