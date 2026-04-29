// dashboard — Karna frontend section
export function getDashboardScript(): string {
  return `  // ============================================================
  // DASHBOARD
  // ============================================================

  async function renderDashboard(container) {
    container.innerHTML = '<div class="chat-area has-dash-bg"><div class="dashboard" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>';
    try {
      var data = await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      // drops removed
      // Drop data: [widthPx, heightPx, top%, right%]
      // drops removed
      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      // Status cards — each card navigates to its feature
      html += '<div class="dash-cards">';
      html += '<div class="dash-card" onclick="showConversations()"><div class="dash-card-icon">&#128172;</div><div class="dash-card-value">' + (data.threads || 0) + '</div><div class="dash-card-label">Conversations</div></div>';
      html += '<div class="dash-card" onclick="viewTasksModal()"><div class="dash-card-icon">&#9200;</div><div class="dash-card-value">' + (data.active_schedules || 0) + '</div><div class="dash-card-label">Active Tasks</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();"><div class="dash-card-icon">&#9889;</div><div class="dash-card-value">' + (data.skills_count || 0) + '</div><div class="dash-card-label">Skills</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + (data.preferences_count || 0) + '</div><div class="dash-card-label">Preferences</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      if ((data.memory_suggestions || 0) > 0) {
        html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'memory-review\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + data.memory_suggestions + '</div><div class="dash-card-label">Memory Suggestions</div></div>';
      }
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'documents\\';renderView();"><div class="dash-card-icon">&#128196;</div><div class="dash-card-value">' + (data.documents_count || 0) + '</div><div class="dash-card-label">Documents</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card dash-card-error" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'errors\\';renderView();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:#e05a40;">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
      }
      html += '</div>';

      // Quick Actions
      html += '<div class="dash-quick-actions">';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'memory-review\\';renderView();">Memory Review</button>';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'documents\\';renderView();">Documents</button>';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'proactive\\';renderView();">Email Digest</button>';
      html += '</div>';

      // Provider usage today
      if (data.provider_usage && data.provider_usage.length > 0) {
        html += '<div style="margin-bottom:24px;">';
        html += '<div class="dash-section-title">API usage today</div>';
        // Provider display name mapping
        var providerLabels = {
          'anthropic': 'Anthropic Claude',
          'openai': 'OpenAI GPT',
          'deepseek': 'DeepSeek',
          'gemini': 'Google Gemini',
          'grok': 'xAI Grok',
          'openrouter': 'OpenRouter',
          'abacus': 'Abacus AI'
        };
        for (var p = 0; p < data.provider_usage.length; p++) {
          var pu = data.provider_usage[p];
          var displayName = providerLabels[pu.provider] || pu.provider;
          html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">' + escapeHtml(displayName) + ': ' + (pu.tokens_used || 0).toLocaleString() + ' tokens / ' + (pu.request_count || 0) + ' requests</div>';
        }
        html += '</div>';
      }

      // Recent threads
      if (data.recent_threads && data.recent_threads.length > 0) {
        html += '<div class="dash-section-title">Recent conversations</div>';
        html += '<div class="dash-threads">';
        for (var t = 0; t < data.recent_threads.length; t++) {
          var th = data.recent_threads[t];
          var d = th.updated_at ? new Date(th.updated_at).toLocaleDateString() : '';
          html += '<div class="dash-thread" onclick="openThread(' + th.id + ',\\'' + escapeHtml(th.title).replace(/'/g, "\\\\'") + '\\')">';
          html += '<div class="dash-thread-title">' + escapeHtml(th.title) + '</div>';
          html += '<div class="dash-thread-meta"><span>' + (th.message_count || 0) + ' messages</span><span>' + d + '</span></div>';
          if (th.last_message) { html += '<div class="dash-thread-preview">' + escapeHtml(th.last_message.substring(0, 80)) + '</div>'; }
          html += '</div>';
        }
        html += '</div>';
      }

      if (data.todays_reminders && data.todays_reminders.length > 0) {
        html += '<div class="dash-section-title">Today\u2019s reminders</div>';
        html += '<div class="dash-threads">';
        for (var r = 0; r < data.todays_reminders.length; r++) {
          var rem = data.todays_reminders[r];
          var remTime = rem.next_run ? new Date(rem.next_run).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
          html += '<div class="dash-thread" style="padding:12px 16px;">';
          html += '<div class="dash-thread-title">' + escapeHtml(rem.name) + ' <span style="font-size:11px;color:var(--text-muted);">' + remTime + '</span></div>';
          if (rem.description) html += '<div class="dash-thread-preview">' + escapeHtml(rem.description) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }

      // Recent documents
      if (data.recent_documents && data.recent_documents.length > 0) {
        html += '<div class="dash-section-title">Recent documents</div>';
        html += '<div class="dash-threads">';
        for (var di = 0; di < data.recent_documents.length; di++) {
          var doc = data.recent_documents[di];
          var docMime = doc.mime_type || '';
          var docIcon = docMime.includes('pdf') ? '&#128196;' :
                        docMime.includes('sheet') || docMime.includes('excel') ? '&#128197;' :
                        docMime.includes('word') ? '&#128221;' :
                        docMime.startsWith('image/') ? '&#128247;' : '&#128196;';
          var docStatusColor = doc.status === 'parsed' || doc.status === 'summarized' ? 'var(--success)' :
                               doc.status === 'failed' ? 'var(--danger)' : 'var(--text-muted)';
          var docStatusLabel = doc.status === 'uploaded' ? 'processing' :
                               doc.status === 'parsed' ? 'ready' :
                               doc.status === 'summarized' ? 'ready' : doc.status;
          var docDate = doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '';
          var docSize = doc.size ? (doc.size > 1048576 ? (doc.size/1048576).toFixed(1) + ' MB' : Math.round(doc.size/1024) + ' KB') : '';
          html += '<div class="dash-thread" onclick="state.prevView=\\'dashboard\\';state.view=\\'documents\\';renderView();" style="cursor:pointer;">';
          html += '<div class="dash-thread-title">' + docIcon + ' ' + escapeHtml(doc.name) +
                  ' <span style="font-size:11px;color:' + docStatusColor + ';font-weight:400;">' + docStatusLabel + '</span></div>';
          html += '<div class="dash-thread-meta"><span>' + docSize + '</span><span>' + docDate + '</span></div>';
          html += '</div>';
        }
        html += '</div>';
      }

      html += '<div style="margin-top:28px;text-align:center;"><button class="dash-new-btn" onclick="startNewThread()">Start New Conversation</button></div>';
      dc.innerHTML = html;
      // drops removed

      // Fetch Gmail unread count asynchronously (non-blocking)
      loadDashGmailCount();
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) dc2.innerHTML = '<div class="welcome"><h2>Hello' + (state.session && state.session.user ? ', ' + state.session.user.name : '') + '</h2><p>' + escapeHtml(state.assistantName || 'Karna') + ' is ready. Start a new conversation.</p><button class="btn btn-small" style="width:auto;margin-top:16px;padding:10px 28px;" onclick="startNewThread()">New conversation</button></div>';
    }
  }

  async function loadDashGmailCount() {
    var el = document.getElementById('dashGmailCount');
    var card = document.getElementById('dashGmailCard');
    try {
      var data = await api('/chat/gmail/unread');
      if (!el) return;
      if (data.count !== null && data.count !== undefined) {
        el.textContent = data.count;
        if (data.count > 0) {
          el.style.color = 'var(--accent)';
          if (card) card.style.borderColor = 'rgba(79,209,197,0.3)';
        }
        state.gmailUnread = data.count;
      } else {
        el.innerHTML = '\\u2014';
        el.style.fontSize = '12px';
        el.style.color = 'var(--text-muted)';
        if (card) card.title = data.reason === 'google_not_configured' ? 'Connect Google in Settings \\u2192 Keys' : 'Connect Google account to see unread count';
      }
    } catch(e) {
      if (el) { el.textContent = '\\u2014'; el.style.color = 'var(--text-muted)'; }
    }
  }

  function dashGmailClick() {
    if (state.gmailUnread > 0) {
      startNewThread();
      setTimeout(function() {
        var input = document.getElementById('inputField');
        if (input) { input.value = 'Check my Gmail inbox — list the latest unread messages'; input.focus(); }
      }, 300);
    } else {
      startNewThread();
      setTimeout(function() {
        var input = document.getElementById('inputField');
        if (input) { input.value = 'Check my Gmail inbox'; input.focus(); }
      }, 300);
    }
  }
`;
}
