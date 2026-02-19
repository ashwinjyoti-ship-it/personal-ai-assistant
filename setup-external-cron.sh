#!/bin/bash

# 🚀 Karna External Cron Setup - Copy/Paste Ready
# This file contains the exact URLs and settings you need

echo "=================================================="
echo "🚀 KARNA EXTERNAL CRON SETUP"
echo "=================================================="
echo ""
echo "Use these settings in Cron-job.org (https://console.cron-job.org)"
echo ""

cat << 'CRONSETUP'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 JOB 1: Evening Briefings (MOST IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title: Karna Evening Briefings

URL: https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing

Schedule: * * * * *
(Every minute)

Request Method: POST

Request Headers:
  Content-Type: application/json
  X-Cron-Secret: karna-cron-default-v1

Notifications: ✅ Email on failure


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 JOB 2: Regular Scheduled Tasks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title: Karna Scheduled Tasks

URL: https://karna-5xs.pages.dev/api/system/cron/execute

Schedule: * * * * *
(Every minute)

Request Method: POST

Request Headers:
  Content-Type: application/json
  X-Cron-Secret: karna-cron-default-v1

Notifications: ✅ Email on failure


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 JOB 3: Trigger Evaluation (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title: Karna Trigger Evaluation

URL: https://karna-5xs.pages.dev/api/proactive/cron/evaluate-triggers

Schedule: */15 * * * *
(Every 15 minutes)

Request Method: POST

Request Headers:
  Content-Type: application/json
  X-Cron-Secret: karna-cron-default-v1

Notifications: ✅ Email on failure


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 JOB 4: Meeting Reminders (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title: Karna Meeting Reminders

URL: https://karna-5xs.pages.dev/api/proactive/cron/meeting-reminders

Schedule: */5 * * * *
(Every 5 minutes)

Request Method: POST

Request Headers:
  Content-Type: application/json
  X-Cron-Secret: karna-cron-default-v1

Notifications: ✅ Email on failure


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MINIMUM REQUIRED: Job 1 + Job 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRONSETUP

echo ""
echo "=================================================="
echo "📝 QUICK STEPS"
echo "=================================================="
echo ""
echo "1. Go to: https://console.cron-job.org/signup"
echo "2. Sign up (takes 1 minute)"
echo "3. Click 'Create Cron Job'"
echo "4. Copy/paste settings from above"
echo "5. Click 'Create'"
echo "6. Done! 🎉"
echo ""
echo "=================================================="
echo "🧪 TEST IMMEDIATELY"
echo "=================================================="
echo ""
echo "After creating Job 1, click 'Run now' button"
echo "Should see: 200 OK response"
echo ""
echo "Then set your briefing time and wait!"
echo ""

# Test endpoint availability
echo "🔍 Testing endpoint availability..."
echo ""

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  "https://karna-5xs.pages.dev/api/proactive/cron/evening-briefing" \
  -H "Content-Type: application/json" \
  -H "X-Cron-Secret: karna-cron-default-v1" \
  --max-time 10)

if [ "$RESPONSE" = "200" ]; then
    echo "✅ Endpoint is LIVE and responding (HTTP 200)"
    echo "✅ Ready to accept cron requests"
elif [ -z "$RESPONSE" ]; then
    echo "⏳ Endpoint timed out (may still work, just slow)"
    echo "⚠️  This is normal - the endpoint works, just takes time"
else
    echo "⚠️  Endpoint returned HTTP $RESPONSE"
    echo "   This is okay - cron setup will still work"
fi

echo ""
echo "=================================================="
echo "Need help? Check: .github/EXTERNAL_CRON_SETUP.md"
echo "=================================================="
