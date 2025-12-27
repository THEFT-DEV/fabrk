# Post-Launch Monitoring Guide

Complete guide to monitoring your Fabrk SaaS after launch, including metrics, dashboards, alerts, and incident response.

---

## Table of Contents

1. [Monitoring Philosophy](#monitoring-philosophy)
2. [Key Metrics to Track](#key-metrics-to-track)
3. [Dashboard Setup](#dashboard-setup)
4. [Uptime Monitoring](#uptime-monitoring)
5. [Error Tracking](#error-tracking)
6. [Performance Monitoring](#performance-monitoring)
7. [Security Monitoring](#security-monitoring)
8. [Business Metrics](#business-metrics)
9. [Alert Configuration](#alert-configuration)
10. [Incident Response](#incident-response)
11. [Daily Monitoring Routine](#daily-monitoring-routine)
12. [Weekly/Monthly Review](#weeklymonthly-review)

---

## Monitoring Philosophy

**Good monitoring enables:**
- Early detection of issues before customers complain
- Data-driven decision making
- Understanding user behavior and pain points
- Measuring success of features and campaigns
- Maintaining 99.9%+ uptime

**Three levels of monitoring:**
1. **Technical** - Server health, errors, performance
2. **Product** - User engagement, conversions, retention
3. **Business** - Revenue, churn, customer acquisition cost

---

## Key Metrics to Track

### Application Health

**1. Uptime**
- Target: 99.9% (8.76 hours downtime/year max)
- Monitor: Every 5 minutes
- Alert: Immediately on downtime

**2. Response Time**
- Target: <500ms server response, <3s page load
- Monitor: P50, P95, P99 latency
- Alert: If P95 >2s for 5 minutes

**3. Error Rate**
- Target: <0.1% of requests
- Monitor: 4xx and 5xx errors
- Alert: If >1% error rate for 5 minutes

**4. Database Performance**
- Target: <100ms query time (P95)
- Monitor: Slow queries, connection pool usage
- Alert: If queries >500ms or connections >80% of pool

### User Engagement

**5. Daily Active Users (DAU)**
- Track unique visitors per day
- Monitor trends week-over-week
- Alert: If DAU drops >20% for 2 consecutive days

**6. Session Duration**
- Target: >3 minutes average
- Monitor: Average time on site
- Alert: If drops below 1 minute (might indicate issue)

**7. Bounce Rate**
- Target: <60% on landing page
- Monitor: % of single-page sessions
- Alert: If >80% (might indicate broken experience)

### Conversion Metrics

**8. Sign-Up Conversion Rate**
- Target: 2-5% of landing page visitors
- Formula: (Sign-ups / Visitors) × 100
- Monitor daily
- Alert: If drops below 1%

**9. Purchase Conversion Rate**
- Target: 1-3% of visitors (cold traffic), 10-30% (warm traffic)
- Formula: (Purchases / Visitors) × 100
- Monitor daily
- Alert: If drops below 0.5%

**10. Checkout Abandonment Rate**
- Target: <70%
- Formula: (Checkouts Started - Completed) / Checkouts Started
- Monitor: Stripe checkout session data
- Alert: If >85% (might indicate issue)

### Business Metrics

**11. Revenue (MRR/ARR)**
- Track daily revenue
- Monitor: MRR growth rate
- Alert: If revenue drops >20% day-over-day (might indicate refunds or issue)

**12. Customer Acquisition Cost (CAC)**
- Formula: Marketing Spend / New Customers
- Target: <$50 for $79 product
- Monitor weekly

**13. Customer Lifetime Value (LTV)**
- For one-time products: Average order value + upsells
- For subscriptions: (Average Revenue per User) × (Average Customer Lifespan)
- Target: LTV:CAC ratio of 3:1 or higher

**14. Refund Rate**
- Target: <5%
- Formula: (Refunds / Total Sales) × 100
- Monitor weekly
- Alert: If >10%

---

## Dashboard Setup

### 1. Vercel Dashboard (Infrastructure)

Monitor:
- Deployment status
- Function execution time
- Error rate
- Bandwidth usage
- Concurrent connections

**Set up alerts:**
- Deployment failures
- Error rate >1%
- Function timeout >10s

### 2. Stripe Dashboard (Payments)

Monitor:
- Daily revenue
- Failed payments
- Disputes/chargebacks
- Refund requests
- Subscription cancellations (if applicable)

**Set up alerts:**
- Failed payment >$100
- New dispute
- Refund request

### 3. Plausible or GA4 (Analytics)

**Plausible Dashboard:**
- Unique visitors (today, last 7 days, last 30 days)
- Top pages
- Top sources
- Goal conversions (sign-ups, purchases)
- Real-time visitors

**GA4 Dashboard (if using):**
- Acquisition overview (traffic sources)
- User engagement (active users, engagement rate)
- E-commerce overview (revenue, conversions)
- Realtime report

### 4. Custom Dashboard (Notion/Airtable/Spreadsheet)

Track daily:
```
Date       | Visitors | Sign-Ups | Purchases | Revenue | Conv Rate | Notes
-----------|----------|----------|-----------|---------|-----------|-------
2025-11-06 | 1,234    | 45       | 12        | $948    | 0.97%     | PH Launch
2025-11-07 | 892      | 23       | 8         | $632    | 0.90%     | -
```

**Weekly/Monthly aggregates:**
- Total revenue
- Total customers
- Average daily visitors
- Conversion rate trends
- Top traffic sources

---

## Uptime Monitoring

### Option 1: UptimeRobot (Free)

**Setup:**
1. Go to [uptimerobot.com](https://uptimerobot.com/)
2. Create free account
3. Add HTTP(s) monitor for `https://fabrk.dev`
4. Set check interval: 5 minutes
5. Add alert contacts (email, SMS, Slack)

**Monitors to create:**
- Landing page: `https://fabrk.dev`
- API health: `https://fabrk.dev/api/health` (create this endpoint)
- Stripe checkout: `https://fabrk.dev/api/stripe/checkout` (GET request should return 405)

### Option 2: Better Uptime (Paid, $10/mo)

Better features:
- Status page (status.fabrk.dev)
- Incident management
- On-call scheduling
- Phone call alerts

### API Health Endpoint

Create `src/app/api/health/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
      },
      { status: 503 }
    );
  }
}
```

Monitor this endpoint with UptimeRobot. It checks both app and database health.

---

## Error Tracking

### Option 1: Sentry (Recommended)

**Setup:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configure `sentry.client.config.ts`:**

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
});
```

**What Sentry tracks:**
- JavaScript errors
- API errors
- Performance issues
- User sessions (when errors occur)
- Release tracking

**Set up alerts:**
- New error type appears
- Error rate >10/hour
- Critical errors (payment failures, auth issues)

### Option 2: LogSnag (Lightweight Alternative)

Simple logging for key events:

```bash
npm install logsnag
```

```typescript
// src/lib/logger.ts
import { LogSnag } from "logsnag";

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_TOKEN!,
  project: "fabrk",
});

export async function logEvent(
  channel: string,
  event: string,
  description: string,
  notify: boolean = false
) {
  if (process.env.NODE_ENV === "production") {
    await logsnag.publish({
      channel,
      event,
      description,
      icon: "🚀",
      notify,
    });
  }
}
```

**Usage:**

```typescript
// Log new purchase
await logEvent("sales", "New Purchase", "John Doe bought Professional plan", true);

// Log errors
await logEvent("errors", "Stripe Webhook Failed", error.message, true);
```

---

## Performance Monitoring

### 1. Vercel Analytics (Built-in)

Monitor:
- Core Web Vitals (LCP, FID, CLS)
- Page load time
- Function execution time

**Set up Vercel Speed Insights:**

```bash
npm install @vercel/speed-insights
```

```tsx
// In src/app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. Lighthouse CI (Automated Testing)

Run Lighthouse on every deployment:

```bash
npm install -g @lhci/cli
```

**Create `lighthouserc.json`:**

```json
{
  "ci": {
    "collect": {
      "url": ["https://fabrk.dev", "https://fabrk.dev/variations"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

Run weekly:

```bash
lhci autorun
```

### 3. Database Performance

**Monitor slow queries in Prisma:**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export { prisma };
```

**Check query performance:**
- Prisma Studio → Query history
- Database provider dashboard (Vercel Postgres, Supabase, etc.)

**Alert if:**
- Query time >500ms (P95)
- N+1 query pattern detected
- Connection pool >80% usage

---

## Security Monitoring

### 1. Failed Login Attempts

Track failed auth attempts to detect brute force:

```typescript
// In src/app/api/auth/[...nextauth]/route.ts
import { logEvent } from "@/lib/logger";

// Log failed sign-ins
async authorize(credentials) {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    await logEvent(
      "security",
      "Failed Login Attempt",
      `Email: ${credentials.email}`,
      false
    );
    return null;
  }

  return user;
}
```

**Alert if:**
- >10 failed attempts from same IP in 5 minutes
- >100 failed attempts globally per hour

### 2. Stripe Fraud Detection

Monitor:
- Disputes/chargebacks
- Failed payments (might be stolen cards)
- High-value orders from new accounts

**Enable Stripe Radar:**
- Stripe Dashboard → Radar → Enable
- Blocks fraudulent payments automatically

### 3. Rate Limiting

Monitor API rate limit hits:

```typescript
// src/middleware.ts or rate limit middleware
import { logEvent } from "@/lib/logger";

if (rateLimitExceeded) {
  await logEvent(
    "security",
    "Rate Limit Exceeded",
    `IP: ${ip}, Endpoint: ${endpoint}`,
    false
  );
  return new Response("Too Many Requests", { status: 429 });
}
```

---

## Business Metrics

### 1. Revenue Dashboard

**Track daily:**
- Revenue (from Stripe)
- Number of sales
- Average order value
- Refund amount

**Create Stripe Revenue Report:**
1. Go to Stripe Dashboard → Reports
2. Create custom report
3. Metrics: Gross volume, Refunds, Net volume
4. Grouping: Daily
5. Export to Google Sheets (auto-sync)

### 2. Conversion Funnel

Track drop-off at each stage:

```
Landing Page (100%) → Sign Up (5%) → Checkout (50%) → Purchase (80%)
```

**Where to track:**
- Landing → Sign Up: GA4/Plausible
- Sign Up → Checkout: Database (user.createdAt vs first checkout session)
- Checkout → Purchase: Stripe (checkout sessions vs completed payments)

**Alert if:**
- Landing → Sign Up drops below 2%
- Sign Up → Checkout drops below 30%
- Checkout → Purchase drops below 60%

### 3. Customer Cohorts

Track retention by signup date:

```
Cohort      | Week 0 | Week 1 | Week 2 | Week 3
------------|--------|--------|--------|--------
2025-11-01  | 100%   | 45%    | 32%    | 28%
2025-11-08  | 100%   | 52%    | 38%    | -
```

**Tools:**
- Manual tracking in spreadsheet
- Amplitude (paid)
- Mixpanel (paid)

---

## Alert Configuration

### Critical Alerts (Immediate Response)

**Infrastructure:**
- Site down (>1 minute)
- Database down
- API error rate >5%
- Stripe webhook failures

**Business:**
- Purchase failure (customer attempted but failed)
- Chargeback/dispute
- Refund request

**Delivery:**
- SMS (Twilio)
- Phone call (Better Uptime)
- Slack/Discord
- Email (as backup)

### Warning Alerts (Review within 1 hour)

**Performance:**
- Response time >2s (P95)
- Page load time >5s

**Product:**
- Conversion rate drops >20%
- Bounce rate >80%
- Daily active users drops >30%

**Delivery:**
- Slack/Discord
- Email

### Info Alerts (Review daily)

**Milestones:**
- New customer
- Revenue milestone ($100, $1000, $10k)
- Traffic milestone (1000, 10k, 100k visitors)

**Delivery:**
- Slack/Discord
- Email digest (daily)

---

## Incident Response

### Incident Severity Levels

**SEV1 (Critical) - Response: Immediate**
- Site down for all users
- Payment processing broken
- Database unavailable
- Data breach

**SEV2 (Major) - Response: <30 minutes**
- Site slow (>5s load times)
- Specific feature broken
- Webhook processing failing

**SEV3 (Minor) - Response: <2 hours**
- Visual bug
- Non-critical feature issue
- Performance degradation

### Incident Response Process

**Step 1: Acknowledge (1 minute)**
- Confirm incident is real (not false alarm)
- Post in Slack: "Investigating: Site down"
- Set status page to "Investigating" (if using Better Uptime)

**Step 2: Diagnose (5-10 minutes)**
- Check Vercel logs
- Check Sentry errors
- Check database status
- Check Stripe status page
- Identify root cause

**Step 3: Mitigate (10-30 minutes)**
- Roll back deployment (if recent deploy)
- Scale up resources (if capacity issue)
- Failover to backup (if database issue)
- Disable feature (if specific feature broken)

**Step 4: Resolve**
- Deploy fix
- Verify resolution
- Monitor for 30 minutes
- Update status page: "Resolved"

**Step 5: Post-Mortem (within 24 hours)**
- Document what happened
- Why it happened
- How it was fixed
- How to prevent in future
- Share publicly (optional, builds trust)

### Incident Communication

**Internal:**
- Slack: "🚨 Incident: Site down. Investigating..."
- Slack: "✅ Incident resolved. Site back up."

**External (if >5 minute downtime):**
- Twitter: "We're aware of an issue affecting fabrk.dev. Investigating now."
- Twitter: "Issue resolved. Site is back up. Apologies for the disruption."
- Email affected customers (if purchases failed)

---

## Daily Monitoring Routine

**Morning (9 AM, 15 minutes):**
- [ ] Check uptime status (UptimeRobot)
- [ ] Review yesterday's analytics (GA4/Plausible)
- [ ] Check Stripe dashboard (revenue, failed payments)
- [ ] Review error logs (Sentry)
- [ ] Respond to support emails

**Afternoon (3 PM, 10 minutes):**
- [ ] Check real-time analytics (traffic spike?)
- [ ] Monitor social media mentions
- [ ] Check Stripe for new sales
- [ ] Respond to support emails

**Evening (9 PM, 5 minutes):**
- [ ] Final check of uptime and errors
- [ ] Log daily metrics in spreadsheet
- [ ] Plan tomorrow's tasks

---

## Weekly/Monthly Review

### Weekly Review (30 minutes, Monday morning)

**Metrics:**
- [ ] Total revenue this week vs last week
- [ ] Total customers this week vs last week
- [ ] Traffic sources (which performed best?)
- [ ] Conversion rates (any trends?)
- [ ] Top pages (what's resonating?)
- [ ] Support ticket volume and themes

**Actions:**
- [ ] Identify top-performing marketing channel → double down
- [ ] Identify underperforming pages → optimize
- [ ] Review common support questions → update FAQ
- [ ] Check for patterns in errors → prioritize fixes

### Monthly Review (2 hours, 1st of month)

**Business Metrics:**
- [ ] MRR/ARR (if subscriptions)
- [ ] Total revenue this month
- [ ] Customer acquisition cost (CAC)
- [ ] Customer lifetime value (LTV)
- [ ] LTV:CAC ratio (target: 3:1)
- [ ] Churn rate (if subscriptions)
- [ ] Refund rate

**Technical Metrics:**
- [ ] Uptime % (target: >99.9%)
- [ ] Average response time
- [ ] Error rate
- [ ] Page load time (Core Web Vitals)

**Product Metrics:**
- [ ] Monthly active users (MAU)
- [ ] User engagement (sessions per user)
- [ ] Feature usage (which features are used most?)

**Growth:**
- [ ] Traffic growth month-over-month
- [ ] Revenue growth month-over-month
- [ ] Customer growth month-over-month

**Actions:**
- [ ] Update product roadmap based on feedback
- [ ] Plan next month's marketing initiatives
- [ ] Review and adjust pricing (if needed)
- [ ] Celebrate wins! 🎉

---

## Monitoring Checklist

**Day 1 (Launch Day):**
- [ ] Uptime monitoring configured
- [ ] Analytics installed and tracking
- [ ] Error tracking configured
- [ ] Stripe alerts enabled
- [ ] Support email monitored
- [ ] Status page created (optional)

**Week 1:**
- [ ] Daily metrics tracking in spreadsheet
- [ ] Alert thresholds tuned (not too noisy, not too quiet)
- [ ] First weekly review completed
- [ ] Common issues documented

**Month 1:**
- [ ] Monthly metrics calculated
- [ ] Conversion funnel analyzed
- [ ] Customer cohorts tracked
- [ ] First post-mortem written (if incident occurred)

**Ongoing:**
- [ ] Daily morning check (15 min)
- [ ] Weekly review (30 min)
- [ ] Monthly deep dive (2 hours)
- [ ] Quarterly planning (4 hours)

---

## Tools Summary

**Free Tier Sufficient:**
- UptimeRobot (uptime monitoring)
- Plausible (analytics, €9/mo but worth it)
- Vercel Analytics (performance, free for Pro plan)
- Stripe Dashboard (payments)
- Google Sheets (manual tracking)

**Paid (Optional):**
- Sentry ($26/mo for 50k errors, great for debugging)
- Better Uptime ($10/mo for status page)
- LogSnag ($8/mo for event logging)
- Mixpanel ($20/mo for cohort analysis)

**Total cost:** $0-50/month depending on needs

---

## Final Thoughts

**Good monitoring prevents disasters.** The goal is to:
1. Detect issues before customers complain
2. Respond quickly when issues occur
3. Learn from incidents to prevent recurrence
4. Make data-driven decisions about product and marketing

**Start simple.** Don't over-engineer monitoring on day 1. Core essentials:
- Uptime monitoring (UptimeRobot)
- Analytics (Plausible)
- Error tracking (Sentry)
- Daily manual check (spreadsheet)

**Scale as you grow.** Add more sophisticated monitoring (cohorts, funnels, A/B tests) once you have consistent traffic and revenue.

**Monitor what matters.** Focus on metrics that drive action, not vanity metrics.

---

**Questions? Join the Fabrk Discord or email support@fabrk.dev.**

**Ship fast. Monitor well. Sleep soundly. 😴**
