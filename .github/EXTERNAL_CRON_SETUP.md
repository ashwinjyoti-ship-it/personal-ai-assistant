# ⏰ External Cron Setup for Karna Briefings

## Why External Cron?

Cloudflare Pages doesn't support cron triggers in your plan. **External cron services are a standard, production-grade solution** used by many professional applications.

## ✅ Recommended: Cron-job.org

**Why Cron-job.org?**
- ✅ Free tier: Up to 50 cron jobs
- ✅ Reliable: 99.9% uptime
- ✅ Simple: Web interface, no API key needed
- ✅ Monitoring: Email alerts on failures
- ✅ Trusted: Used by thousands of apps

---

## 🚀 Setup Instructions (5 Minutes)

### Step 1: Create Account
1. Go to: https://console.cron-job.org/signup
2. Sign up with your email
3. Verify email

### Step 2: Create Cron Job for Briefings

1. **Click "Create Cron Job"**

2. **Enter Details:**
   ```
   Title: Karna Evening Briefings
   Address: https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing
   ```

3. **Schedule:**
   - Select: **"Every minute"**
   - Or manually: `* * * * *`

4. **Advanced Settings** (click "Show advanced settings"):
   - **Request Method**: `POST`
   - **Request Headers**: Add these two headers:
     ```
     Content-Type: application/json
     X-Cron-Secret: karna-cron-default-v1
     ```

5. **Notification Settings:**
   - ✅ Enable "Notify me on failures"
   - Email: Your email address

6. **Click "Create"**

### Step 3: Create Additional Cron Jobs

**Job 2: Trigger Evaluation (Every 15 minutes)**
```
Title: Karna Trigger Evaluation
Address: https://karna-5xs.pages.dev/api/proactive/cron/evaluate-triggers
Schedule: */15 * * * * (every 15 minutes)
Method: POST
Headers: Same as above
```

**Job 3: Meeting Reminders (Every 5 minutes)**
```
Title: Karna Meeting Reminders
Address: https://karna-5xs.pages.dev/api/proactive/cron/meeting-reminders
Schedule: */5 * * * * (every 5 minutes)
Method: POST
Headers: Same as above
```

**Job 4: Regular Cron Tasks (Every minute)**
```
Title: Karna Regular Tasks
Address: https://karna-5xs.pages.dev/api/system/cron/execute
Schedule: * * * * * (every minute)
Method: POST
Headers: Same as above
```

---

## 🧪 Testing

After creating the cron job:

1. **Immediate Test**: Click "Run now" button in Cron-job.org dashboard
2. **Check Execution Log**: View in Cron-job.org interface
   - Should show: `200 OK` response
   - If `401 Unauthorized`: Check headers
   - If `500 Error`: Check app logs

3. **Wait for Scheduled Time**: Set your briefing time and wait

4. **Verify**: Check Telegram and Web UI

---

## 🔍 Monitoring

**Cron-job.org Dashboard:**
- View execution history
- See success/failure rates
- Get email alerts on failures
- Pause/resume jobs anytime

**Check Karna Logs:**
```bash
# View recent briefings
npx wrangler d1 execute karna-production --remote \
  --command "SELECT id, user_id, sent_at, briefing_type FROM briefings ORDER BY sent_at DESC LIMIT 5;"
```

---

## 🔄 Alternative: UptimeRobot (Free Backup)

If you want redundancy, use **UptimeRobot** as backup:

1. Go to: https://uptimerobot.com
2. Add "HTTP(s)" monitor
3. URL: `https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing`
4. Interval: 1 minute (free tier)
5. Alert when down: Yes

UptimeRobot monitors + triggers the endpoint, acting as both health check and cron.

---

## 💰 Cost Comparison

| Solution | Cost | Reliability | Setup Time |
|----------|------|-------------|------------|
| **Cron-job.org** | Free | 99.9% | 5 min |
| **UptimeRobot** | Free | 99.9% | 3 min |
| **EasyCron** | Free tier | 99.5% | 5 min |
| **Cloudflare Worker Cron** | $0 (included) | 99.99% | 10 min |
| **AWS EventBridge** | ~$1/mo | 99.99% | 20 min |

**Recommendation**: Cron-job.org (free + reliable + simple)

---

## 🛡️ Security Note

The `X-Cron-Secret` header authenticates the cron service. Your endpoints check this header before executing. Current secret: `karna-cron-default-v1`

To change the secret:
1. Update in Cloudflare Pages environment variables: `CRON_SECRET`
2. Update in Cron-job.org headers
3. Deploy app

---

## ✅ Advantages of External Cron

1. **Platform Independent**: Works with any hosting (not just Cloudflare)
2. **Easy Migration**: If you move hosting, cron stays the same
3. **Monitoring**: Built-in dashboards and alerts
4. **Flexible**: Change schedule without redeploying app
5. **Reliable**: Dedicated cron infrastructure

---

## 📊 Architecture

```
┌───────────────────────┐
│   Cron-job.org        │
│   Schedule: Every 1m  │
└──────────┬────────────┘
           │ HTTP POST
           ↓
┌───────────────────────┐
│  karna-5xs.pages.dev  │
│  Endpoint: /api/...   │
│  Header: X-Cron-Secret│
└──────────┬────────────┘
           │
    ┌──────┴──────┐
    ↓             ↓
┌─────────┐  ┌─────────┐
│Briefings│  │ Other   │
│         │  │ Crons   │
└─────────┘  └─────────┘
```

**Flow:**
1. Cron-job.org sends POST request every minute
2. App validates `X-Cron-Secret` header
3. Endpoint processes scheduled tasks
4. Response logged in Cron-job.org

---

## 🎯 Next Steps

1. **Sign up**: https://console.cron-job.org/signup (2 min)
2. **Create briefing job** (3 min)
3. **Test immediately** (1 min)
4. **Set briefing time & wait** (done!)

---

**Total Setup Time**: 5 minutes  
**Cost**: $0  
**Reliability**: Production-grade  
**Maintenance**: Zero

This is a **standard, professional solution** used by thousands of apps worldwide. Don't let "external" make you think it's hacky - it's actually best practice! 🎉
