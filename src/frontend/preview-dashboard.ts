// Standalone dashboard preview — no auth, minimal salutation + composer.
export function getDashboardPreviewHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#1E1C24">
  <title>Karna — Dashboard Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app">
    <div class="topbar">
      <div class="topbar-left">
        <button class="topbar-btn" type="button" title="Chat history">&#9776;</button>
      </div>
      <div class="topbar-right">
        <button class="topbar-btn notif-btn" type="button" title="Schedule">&#128276;</button>
        <button class="topbar-btn topbar-icon-btn" type="button" title="Settings">
          <img class="nav-icon" src="/static/ui/nav-settings.png" alt="Settings">
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="dash-page">
        <div class="chat-area">
          <div class="dashboard dashboard--minimal">
            <div class="dash-greeting" id="dashGreeting">Good afternoon, Ashwin</div>
          </div>
        </div>

        <div class="dash-input-area">
          <div class="dash-input-wrap">
            <div class="dash-input-row">
              <textarea class="dash-input-field" placeholder="Message Karna&#8230;" rows="1"></textarea>
              <button type="button" class="dash-send-btn" title="Send" aria-label="Send">&#10148;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      var el = document.getElementById('dashGreeting');
      if (el) el.textContent = greeting + ', Ashwin';
    })();
  </script>
</body>
</html>`;
}
