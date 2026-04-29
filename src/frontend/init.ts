// init — Karna frontend section
export function getInitScript(): string {
  return `  // === Init ===
  // Global error boundary — prevents silent blank white page on unhandled JS errors
  window.onerror = function(msg, src, line, col, err) {
    var app = document.getElementById('app');
    if (app && app.innerHTML.trim() === '') {
      app.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Georgia,serif;color:#5a5248;flex-direction:column;gap:12px;">' +
        '<div style="font-size:18px;">Something went wrong</div>' +
        '<div style="font-size:13px;color:#8a7e72;">Try refreshing the page</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:8px 20px;background:#4f86c6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;">Refresh</button>' +
        '</div>';
    }
    return false;
  };
  loadSession();
  render(); // render immediately — avoids blank white page
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); render(); }
    }).catch(function(err) {
      console.error('Auth error:', err);
      clearSession();
      render();
    });
  }
  document.onkeydown = function(e) { if (e.key === 'Escape') toggleOverlay(null); };

  // Handle iOS keyboard — adjust input area
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', function() {
      var inputArea = document.querySelector('.input-area');
      if (inputArea) {
        var offset = window.innerHeight - window.visualViewport.height;
        inputArea.style.paddingBottom = (offset > 0 ? offset + 8 : 16) + 'px';
      }
    });
  }

  // ============================================================
  // DOCUMENTS VIEW FUNCTIONS
  // ============================================================`;
}
