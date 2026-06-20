// init — Karna frontend section
export function getInitScript(): string {
  return `  // === Init ===
  // Global error boundary — prevents silent blank white page on unhandled JS errors
  window.onerror = function(msg, src, line, col, err) {
    var app = document.getElementById('app');
    if (app && app.innerHTML.trim() === '') {
      app.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Georgia,serif;color:var(--text-primary);flex-direction:column;gap:12px;background:var(--linen);">' +
        '<div style="font-size:18px;color:var(--text-primary);">Something went wrong</div>' +
        '<div style="font-size:13px;color:var(--text-secondary);">Try refreshing the page</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:10px 20px;background:var(--terracotta);color:#fff;border:none;border-radius:9999px;cursor:pointer;font-size:13px;font-weight:600;">Refresh</button>' +
        '</div>';
    }
    return false;
  };
  loadSession();
  render(); // render immediately — avoids blank white page
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); render(); }
      else if (data.user && data.user.assistant_name) applyAssistantName(data.user.assistant_name);
    }).catch(function(err) {
      console.error('Auth error:', err);
      clearSession();
      render();
    });
  }
  document.onkeydown = function(e) { if (e.key === 'Escape') toggleOverlay(null); };

  // Handle iOS keyboard — lift fixed input-anchor and adjust input-area
  if ('visualViewport' in window) {
    var _baseHeight = window.innerHeight;
    window.visualViewport.addEventListener('resize', function() {
      var vp = window.visualViewport;
      var anchor = document.querySelector('.input-anchor');
      if (anchor) {
        // Gap between visual viewport bottom and layout viewport bottom (keyboard above layout bottom)
        var fixedGap = window.innerHeight - vp.offsetTop - vp.height;
        // Whether keyboard has shrunk the visual viewport (layout viewport resizes on this device)
        var kbOpen = vp.height < _baseHeight - 100;
        if (fixedGap > 50) {
          // Layout viewport did NOT resize — push anchor up above keyboard
          anchor.style.bottom = fixedGap + 'px';
          anchor.style.paddingBottom = '8px';
        } else if (kbOpen) {
          // Layout viewport DID resize — anchor is already at viewport bottom, just kill safe-area pad
          anchor.style.bottom = '';
          anchor.style.paddingBottom = '8px';
        } else {
          // Keyboard closed — restore CSS defaults
          anchor.style.bottom = '';
          anchor.style.paddingBottom = '';
        }
      }
      // non-fixed .input-area (documents view): pad by keyboard height
      var inputArea = document.querySelector('.input-area');
      if (inputArea) {
        var offset = window.innerHeight - vp.height;
        inputArea.style.paddingBottom = (offset > 0 ? offset + 8 : 16) + 'px';
      }
    });
  }

  // ============================================================
  // DOCUMENTS VIEW FUNCTIONS
  // ============================================================`;
}
