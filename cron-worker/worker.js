// Karna Cron Worker — fires every minute
// Phase 1: calls /cron/execute to find due jobs (fast — timing updates only)
// Phase 2: for each actionable job, calls /cron/run-task/:jobId (slow — runs agent)
// Phase 3: Proactive Intelligence — briefings (8PM IST), triggers (every 15 mins), meeting reminders (every 5 mins)

export default {
  async scheduled(event, env, ctx) {
    const appUrl = env.KARNA_APP_URL;
    const secret = env.CRON_SECRET || 'karna-cron-default-v1';
    const headers = { 'Content-Type': 'application/json', 'X-Cron-Secret': secret };

    // Get current time in IST for proactive features
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const istHour = istTime.getHours();
    const istMinute = istTime.getMinutes();

    try {
      // === Phase 1: Find and dispatch due cron jobs (fast) ===
      const res = await fetch(`${appUrl}/api/system/cron/execute`, {
        method: 'POST', headers,
      });
      const data = await res.json();
      
      // Phase 2: Run agent for each actionable job (parallel)
      if (data.results && data.results.length > 0) {
        const agentJobs = data.results.filter(r => r.needs_agent && r.status === 'dispatched');
        
        if (agentJobs.length > 0) {
          const promises = agentJobs.map(job =>
            fetch(`${appUrl}/api/system/cron/run-task/${job.job_id}`, {
              method: 'POST', headers,
            }).then(r => r.json()).catch(err => ({ job_id: job.job_id, error: err.message }))
          );
          
          ctx.waitUntil(Promise.allSettled(promises).then(results => {
            console.log(`Cron: ${data.executed} dispatched, ${agentJobs.length} agent tasks`, 
              JSON.stringify(results.map(r => r.status === 'fulfilled' ? r.value : r.reason)));
          }));
        }

        const simpleJobs = data.results.filter(r => !r.needs_agent && r.status === 'dispatched');
        if (simpleJobs.length > 0) {
          const simplePromises = simpleJobs.map(job =>
            fetch(`${appUrl}/api/system/cron/run-task/${job.job_id}`, {
              method: 'POST', headers,
            }).catch(() => {})
          );
          ctx.waitUntil(Promise.allSettled(simplePromises));
        }
      }

      // === Phase 3: Proactive Intelligence ===
      
      // Evening Briefing — runs every minute, endpoint checks each user's preferred briefing time
      // Each user has their own briefing time configured in preferences (default 20:00)
      ctx.waitUntil(
        fetch(`${appUrl}/api/proactive/cron/evening-briefing`, {
          method: 'POST', headers,
        }).then(r => r.json()).then(r => {
          if (r.executed > 0) {
            console.log('Evening briefing result:', JSON.stringify(r));
          }
        }).catch(err => {
          console.error('Evening briefing error:', err.message);
        })
      );
      
      // Trigger Evaluation — every 15 minutes (minutes 0, 15, 30, 45)
      if (istMinute % 15 < 2) {
        ctx.waitUntil(
          fetch(`${appUrl}/api/proactive/cron/evaluate-triggers`, {
            method: 'POST', headers,
          }).then(r => r.json()).then(r => {
            if (r.results?.some(x => x.triggered_count > 0)) {
              console.log('Triggers evaluated:', JSON.stringify(r));
            }
          }).catch(() => {})
        );
      }
      
      // Meeting Reminders — every 5 minutes
      if (istMinute % 5 < 2) {
        ctx.waitUntil(
          fetch(`${appUrl}/api/proactive/cron/meeting-reminders`, {
            method: 'POST', headers,
          }).then(r => r.json()).then(r => {
            if (r.results?.some(x => x.reminders_sent > 0)) {
              console.log('Meeting reminders:', JSON.stringify(r));
            }
          }).catch(() => {})
        );
      }

    } catch (err) {
      console.error('Cron worker error:', err.message || err);
    }
  },

  // HTTP handler for manual testing
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/trigger') {
      const secret = env.CRON_SECRET || 'karna-cron-default-v1';
      const headers = { 'Content-Type': 'application/json', 'X-Cron-Secret': secret };
      
      try {
        // Phase 1
        const res = await fetch(`${env.KARNA_APP_URL}/api/system/cron/execute`, {
          method: 'POST', headers,
        });
        const data = await res.json();
        
        // Phase 2 for actionable jobs
        const agentJobs = (data.results || []).filter(r => r.needs_agent);
        const agentResults = [];
        
        for (const job of agentJobs) {
          try {
            const taskRes = await fetch(`${env.KARNA_APP_URL}/api/system/cron/run-task/${job.job_id}`, {
              method: 'POST', headers,
            });
            agentResults.push(await taskRes.json());
          } catch (err) {
            agentResults.push({ job_id: job.job_id, error: err.message });
          }
        }
        
        return new Response(JSON.stringify({ phase1: data, phase2: agentResults }, null, 2), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500, headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ 
      name: 'karna-cron-worker',
      status: 'active',
      triggers: ['* * * * *'],
      target: env.KARNA_APP_URL || 'not configured',
      architecture: 'Phase 1 (dispatch) → Phase 2 (agent execution per job)',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
