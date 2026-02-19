# 📋 Karna Briefing System - Complete Guide

## Overview

The Karna briefing system provides **automated daily briefings** containing:
- Tomorrow's calendar events (Google + Outlook)
- Email summary (Gmail + Outlook unread counts)
- Pending tasks
- Custom news topics (AI, LLM, Tools, etc.)
- Interactive checklist

## How It Works

### Architecture

```
Cloudflare Cron Worker (karna-cron)
  ↓ Every minute
  ↓
Main App /api/proactive/cron/evening-briefing
  ↓ Checks all users
  ↓
For each user:
  - Get configured briefing time (e.g., 12:00)
  - Convert current UTC time to user's timezone
  - If within 5-minute window: Generate & Send Briefing
```

### Components

1. **Cron Worker** (`cron-worker/worker.js`)
   - Deployed separately as `karna-cron`
   - Runs every minute (`* * * * *`)
   - Calls: `https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing`

2. **Briefing Endpoint** (`/api/proactive/cron/evening-briefing`)
   - Queries all users with their briefing preferences
   - Uses `shouldRunBriefing()` to check if it's time
   - Generates briefing via `generateEveningBriefing()`
   - Sends via Telegram if `telegram_chat_id` exists

3. **Scheduling Logic** (`src/services/briefing.ts`)
   ```javascript
   shouldRunBriefing(briefingTime, timezone, now) {
     // Get current time in user's timezone
     const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
     const userHour = userNow.getHours();
     const userMinute = userNow.getMinutes();
     
     // Check if within 5-minute window
     const currentMinutes = userHour * 60 + userMinute;
     const targetMinutes = targetHour * 60 + targetMinute;
     
     return currentMinutes >= targetMinutes && currentMinutes < targetMinutes + 5;
   }
   ```

## Where Briefings Are Displayed

### 1. Telegram (Primary)
- **Requirement**: User must have `telegram_chat_id` in database
- **Format**: Text message with inline keyboard checkboxes
- **How to enable**:
  1. Start your Telegram bot
  2. Send `/start` or any message
  3. Bot automatically saves your chat ID

### 2. Web UI (Secondary)
- **Location**: Settings → Proactive Intelligence tab
- **Section**: "Recent Briefings" 
- **Display**: Shows last 10 briefings with dates and check counts
- **Access**: Click any briefing card to view full details

## Configuration

### User Settings (Web UI)

Navigate to: **Settings → Proactive Intelligence**

1. **Briefing Time**
   - Format: HH:MM (24-hour)
   - Example: `12:00` for noon, `20:00` for 8 PM
   - Uses your profile timezone

2. **Components** (enable/disable)
   - ✅ Google Calendar
   - ✅ Outlook Calendar  
   - ✅ Gmail
   - ✅ Outlook Email
   - ✅ Tasks
   - ✅ News
   - ⬜ Weather (coming soon)

3. **News Topics** (up to 5)
   - Comma-separated list
   - Example: `AI, Machine Learning, Automation, Tech News, Startups`

4. **Notification Channels**
   - ✅ Telegram (requires setup)
   - ✅ Web (shows in UI)

5. **Proactive Level**
   - 🔹 Conservative: Minimal notifications
   - 🔹 Moderate: Balanced (default)
   - 🔹 Aggressive: All possible notifications

### Database Configuration

**Table**: `briefing_preferences`

```sql
CREATE TABLE briefing_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL,
  briefing_time TEXT DEFAULT '20:00',  -- HH:MM format
  components TEXT DEFAULT '{"google_calendar":true,"gmail":true...}',
  news_topics TEXT DEFAULT 'AI, LLM, Tools, Agentic Workflows, AI Features',
  notification_channels TEXT DEFAULT '{"telegram":true,"web":true}',
  proactive_level TEXT DEFAULT 'moderate' CHECK(proactive_level IN ('conservative','moderate','aggressive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Troubleshooting

### Issue 1: Briefing Not Received on Telegram

**Symptoms**: Set briefing time, but nothing arrives on Telegram

**Possible Causes**:

1. ✅ **Cron Worker Not Deployed**
   ```bash
   # Check if karna-cron worker exists
   cd /home/user/webapp/cron-worker
   npx wrangler deployments list --name karna-cron
   
   # Deploy if missing
   npx wrangler deploy
   ```

2. ✅ **Telegram Chat ID Not Configured**
   ```bash
   # Check database
   npx wrangler d1 execute karna-production --remote \
     --command "SELECT id, username, telegram_chat_id FROM users;"
   ```
   
   **Fix**: Send any message to your Telegram bot to register

3. ✅ **Briefing Time Mismatch**
   - Verify your profile timezone is correct
   - Remember: System checks within 5-minute window
   - If you set 12:00, it triggers between 12:00-12:05

4. ✅ **Cron Secret Mismatch**
   ```bash
   # Check main app environment variables
   # CRON_SECRET must match between:
   # - cron-worker/wrangler.json (default: "karna-cron-default-v1")
   # - Main app CRON_SECRET env variable
   ```

### Issue 2: Briefing Empty or Missing Data

**Possible Causes**:

1. **Google/Outlook Not Connected**
   - Go to Settings → Keys
   - Verify Google OAuth status
   - Test connection

2. **No Events Tomorrow**
   - Briefing only shows tomorrow's events
   - Check if you have events scheduled

3. **Components Disabled**
   - Go to Settings → Proactive Intelligence
   - Ensure desired components are checked

### Issue 3: Briefing Not Showing in Web UI

**Possible Causes**:

1. **No Briefings Generated Yet**
   - Use "Generate Now" button to test
   - Wait for scheduled time

2. **Database Error**
   - Check `briefings` table exists:
     ```bash
     npx wrangler d1 execute karna-production --remote \
       --command "SELECT name FROM sqlite_master WHERE type='table' AND name='briefings';"
     ```

## Manual Testing

### Test 1: Generate Briefing Immediately

**Via Web UI**:
1. Go to Settings → Proactive Intelligence
2. Click "Generate Now" button
3. Check "Recent Briefings" section
4. Click briefing card to view details

**Via API** (requires authentication):
```bash
curl -X POST "https://karna-5xs.pages.dev/api/proactive/briefings/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"
```

### Test 2: Trigger Cron Manually

**Via Cron Worker** (if deployed):
```bash
# Visit the trigger endpoint
curl "https://karna-cron.YOUR_SUBDOMAIN.workers.dev/trigger"
```

**Via Direct Endpoint**:
```bash
curl -X POST "https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing" \
  -H "Content-Type: application/json" \
  -H "X-Cron-Secret: karna-cron-default-v1"
```

### Test 3: Check Recent Briefings

```bash
# Get last 5 briefings for user ID 1
npx wrangler d1 execute karna-production --remote \
  --command "SELECT id, briefing_type, sent_at FROM briefings WHERE user_id=1 ORDER BY sent_at DESC LIMIT 5;"
```

## Deployment Checklist

Before briefings will work automatically, ensure:

- [x] Main app deployed: `https://karna-5xs.pages.dev`
- [ ] **Cron worker deployed**: `karna-cron`
- [ ] **Cron worker variables set**:
  - `KARNA_APP_URL`: `https://karna-5xs.pages.dev`
  - `CRON_SECRET`: `karna-cron-default-v1`
- [ ] **Main app environment variables**:
  - `CRON_SECRET`: `karna-cron-default-v1`
  - `GOOGLE_CLIENT_ID`: Set via `npx wrangler secret put`
  - `GOOGLE_CLIENT_SECRET`: Set via `npx wrangler secret put`
- [ ] **Database migrations applied**: All 9 migrations
- [ ] **Telegram bot configured**: Users have `telegram_chat_id`

## Deployment Commands

### Deploy Cron Worker

```bash
cd /home/user/webapp/cron-worker

# Deploy the worker
npx wrangler deploy

# Set environment variables (if needed)
npx wrangler secret put CRON_SECRET
# Enter: karna-cron-default-v1

# Verify deployment
npx wrangler deployments list --name karna-cron

# Test the worker
curl "https://karna-cron.YOUR_SUBDOMAIN.workers.dev/trigger"
```

### Apply Database Migrations

```bash
cd /home/user/webapp

# Check pending migrations
npx wrangler d1 migrations list karna-production --remote

# Apply all migrations
npx wrangler d1 migrations apply karna-production --remote

# Verify briefing tables exist
npx wrangler d1 execute karna-production --remote \
  --command "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%brief%';"
```

## Timezone Configuration

The system defaults to **Asia/Kolkata (IST)** if no timezone is set.

### Update User Timezone

**Via Database**:
```bash
npx wrangler d1 execute karna-production --remote \
  --command "UPDATE users SET timezone='America/New_York' WHERE id=1;"
```

**Via Web UI**:
1. Settings → Profile
2. Update timezone field
3. Save changes

### Supported Timezones

Any valid IANA timezone name:
- `America/New_York` (EST/EDT)
- `America/Los_Angeles` (PST/PDT)
- `Europe/London` (GMT/BST)
- `Asia/Tokyo` (JST)
- `Asia/Kolkata` (IST)
- Full list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

## FAQ

### Q: Can I have multiple briefing times per day?
**A**: Currently, only one briefing time per user. Future update may support multiple.

### Q: What if I miss a briefing?
**A**: Briefings are stored in database and visible in Web UI. Past briefings remain accessible.

### Q: Can I customize the briefing content format?
**A**: Yes, via components selection and news topics. Future updates will add more customization.

### Q: Why does it check every minute but has a 5-minute window?
**A**: To handle edge cases where the cron might be delayed by 1-2 minutes. The 5-minute window ensures delivery.

### Q: Can I disable Telegram and only use Web UI?
**A**: Yes! Uncheck "Telegram" in notification channels. Briefings will only appear in Web UI.

### Q: What happens if Google/Gmail fails?
**A**: The system continues with available components. Failed components show empty/zero counts.

## Next Steps

1. **Deploy the cron worker** (if not already deployed)
2. **Configure your Telegram bot** (send a message to register)
3. **Set your preferred briefing time** (Settings → Proactive)
4. **Test with "Generate Now"** button
5. **Wait for scheduled time** and check Telegram + Web UI

## Support

If issues persist:
1. Check Cloudflare Workers logs for `karna-cron`
2. Check main app logs for `/api/proactive/cron/evening-briefing` 
3. Verify all environment variables are set correctly
4. Ensure database migrations are applied
5. Test with "Generate Now" to isolate scheduling vs. generation issues

---

**Last Updated**: 2026-02-19  
**Version**: 1.0  
**Project**: Karna Personal AI Assistant
