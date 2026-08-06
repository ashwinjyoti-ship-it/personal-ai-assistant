// desktop — Karna four-pane Poppin layout (Phase 0: static)
// Separate layout module; no isDesktop props in shared components.

import { DESKTOP_HTML } from './desktop-html';

export function getDesktopScript(): string {
  return `  // ============================================================
  // DESKTOP SHELL — Poppin four-pane layout (Phase 0 static)
  // ============================================================

  var DESKTOP_HTML = ${JSON.stringify(DESKTOP_HTML)};

  var _kdMq = window.matchMedia('(min-width: 1200px)');
  var _kdMqBound = false;

  function kdInitials() {
    var u = state.session && state.session.user;
    var name = (u && (u.name || u.username)) || 'AJ';
    var parts = String(name).trim().split(/\\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return String(name).slice(0, 2).toUpperCase();
  }

  function bindDesktopInteractions(root) {
    root.querySelectorAll('.ctxi').forEach(function(el) {
      el.addEventListener('click', function() { el.classList.toggle('on'); });
    });
    root.querySelectorAll('.th').forEach(function(el) {
      el.addEventListener('click', function() {
        root.querySelectorAll('.th').forEach(function(t) { t.classList.remove('on'); });
        el.classList.add('on');
      });
    });
    root.querySelectorAll('.tab').forEach(function(el) {
      el.addEventListener('click', function(e) {
        if (e.target.closest('.tx')) return;
        root.querySelectorAll('.tab').forEach(function(t) {
          t.classList.remove('on');
          t.setAttribute('aria-selected', 'false');
        });
        el.classList.add('on');
        el.setAttribute('aria-selected', 'true');
      });
    });
    root.querySelectorAll('.nav a').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        root.querySelectorAll('.nav a').forEach(function(a) { a.classList.remove('on'); });
        el.classList.add('on');
      });
    });
  }

  function renderDesktop(container) {
    container.innerHTML = DESKTOP_HTML;
    var av = document.getElementById('kdAvatar');
    if (av) av.textContent = kdInitials();
    bindDesktopInteractions(container);
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
