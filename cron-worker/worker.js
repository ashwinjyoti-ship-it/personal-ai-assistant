// Karna Cron Worker — fires every minute, calls the Pages app's cron/execute endpoint
// This is a lightweight Cloudflare Worker with a cron trigger that bridges
// the gap between Pages (no cron support) and Workers (cron support).

export default {
  async scheduled(event, env, ctx) {
    const url = `${env.KARNA_APP_URL}/api/system/cron/execute`;
    const secret = env.CRON_SECRET || 'karna-cron-default-v1';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cron-Secret': secret,
        },
      });

      const data = await res.json();
      console.log(`Cron tick: ${data.executed || 0} jobs processed`, JSON.stringify(data.results || []));
    } catch (err) {
      console.error('Cron worker fetch failed:', err.message || err);
    }
  },

  // Optional: HTTP handler for manual testing
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/trigger') {
      const secret = env.CRON_SECRET || 'karna-cron-default-v1';
      const appUrl = `${env.KARNA_APP_URL}/api/system/cron/execute`;
      
      try {
        const res = await fetch(appUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Cron-Secret': secret,
          },
        });
        const data = await res.json();
        return new Response(JSON.stringify(data, null, 2), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ 
      name: 'karna-cron-worker',
      status: 'active',
      triggers: ['* * * * *'],
      target: env.KARNA_APP_URL || 'not configured'
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
