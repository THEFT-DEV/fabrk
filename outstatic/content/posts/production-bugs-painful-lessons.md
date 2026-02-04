---
title: 'Production Bugs and Painful Lessons'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'production-bugs-painful-lessons'
description: 'Building in public means sharing the failures too. Here is what broke, why it broke, and what I learned.'
publishedAt: '2025-02-07T12:00:00.000Z'
---

**TL;DR:** Building in public means sharing the failures too. Here's what broke, why it broke, and what I learned.

---

## The Auth Disaster (Week 2)

**What happened:** Users couldn't log in. For 6 hours.

**The bug:** I updated NextAuth configuration and forgot that session callback changes require existing sessions to be invalidated. Existing sessions didn't have the new `tier` field, causing runtime errors.

**The fix:** Add defaults for new session fields.

**Lesson learned:** Session shape changes need defaults. Always.

---

## The Database Migration That Wasn't (Week 4)

**What happened:** Deployed to production. Everything crashed.

**The bug:** I ran `prisma migrate dev` locally, which creates migrations. But I deployed without running `prisma migrate deploy` in production. The app tried to query a column that didn't exist.

**The fix:** Added migration check to deploy script - abort if migrations fail.

**Lesson learned:** Never trust "it worked locally." Migration deployment must be explicit.

---

## The N+1 Query Performance Bomb (Week 6)

**What happened:** Homepage took 8 seconds to load.

**The bug:** Classic N+1. Fetching rules, then fetching author for each rule in a loop. 20 rules = 21 database queries.

**The fix:** Single query with Prisma `include` statement. 20 rules = 1 database query.

**Lesson learned:** Always check query counts during development. Prisma's query logging helps.

---

## The Infinite Re-render Loop (Week 8)

**What happened:** Browser tab crashed on the dashboard.

**The bug:** useEffect dependency array included state that was being set inside the effect. Every fetch updated `data`, which triggered the effect, which fetched, which updated `data`...

**The fix:** Remove state being set from the dependency array.

**Lesson learned:** Never put state you're setting inside the effect's dependency array. Obvious in hindsight.

---

## The CORS Nightmare (Week 10)

**What happened:** API calls from the frontend failed with "CORS error."

**The bug:** I added a new API route but forgot it needed CORS headers for the browser extension I was testing.

**The fix:** Add proper CORS headers to the response.

**Lesson learned:** CORS errors are always about the response, not the request. The server must explicitly allow cross-origin access.

---

## The Webhook That Fired Twice (Week 11)

**What happened:** Users got charged twice for job listings.

**The bug:** Webhook endpoint wasn't idempotent. If Polar retried a webhook (which they do on timeout), we processed the payment twice.

**The fix:** Deduplicate by event ID - check if already processed before handling.

**Lesson learned:** Webhooks will retry. Always. Your handlers must handle duplicates gracefully.

---

## The Memory Leak (Week 12)

**What happened:** Server crashed after ~2 hours of uptime.

**The bug:** Event listener wasn't being cleaned up in a useEffect. Every component mount added a listener. Every unmount left it there. Memory grew until crash.

**The fix:** Return a cleanup function that removes the event listener.

**Lesson learned:** Every `addEventListener` needs a matching `removeEventListener` in the cleanup function. No exceptions.

---

## The Monitoring Stack

After these incidents, I added:

1. **Error Tracking** - Sentry for error capture
2. **Query Logging** - Log slow queries
3. **Health Checks** - /api/health endpoint
4. **Uptime Monitoring** - External service pings every minute

---

## Lessons Summary

| Bug | Root Cause | Lesson |
|-----|------------|--------|
| Auth failure | Missing defaults | Backwards compatibility for session changes |
| Migration crash | Forgot deploy step | Explicit migration in deploy script |
| N+1 queries | Lazy fetching | Always use includes/joins |
| Infinite loop | Wrong useEffect deps | Never put setState target in deps |
| CORS errors | Missing headers | Server must allow, not client |
| Double webhooks | No idempotency | Deduplicate by event ID |
| Memory leak | No cleanup | Always return cleanup function |

---

## The Humbling Truth

I've been building web apps for years. I still make these mistakes.

The difference now: I catch them faster, fix them cleaner, and document them for next time.

Building in public means admitting when things break. It's uncomfortable. It's also how you actually learn.

---

**Live site:** [indx.sh](https://indx.sh)

Everything's working today. Tomorrow? We'll see.

---

*Part 9 of the "Building indx.sh in Public" series.*
