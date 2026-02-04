---
title: 'The Job Board Model: $69 to $159 Per Listing'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'job-board-monetization'
description: 'How I am monetizing a developer directory with a job board - the pricing strategy, payment implementation, and what I have learned about niche job boards.'
publishedAt: '2025-02-05T12:00:00.000Z'
---

**TL;DR:** How I'm monetizing a developer directory with a job board - the pricing strategy, payment implementation, and what I've learned about niche job boards.

---

## Why a Job Board?

I considered several monetization models:

| Model | Pros | Cons |
|-------|------|------|
| **Ads** | Passive income | Annoying, low CPM for dev audiences |
| **Premium listings** | Aligned incentives | Feels pay-to-play |
| **Sponsorships** | High value | Requires scale first |
| **Job board** | Solves real problem | Requires job supply |

Job boards won because:

1. **Companies pay real money** for quality developer hiring
2. **Users get value** (relevant jobs, not spam)
3. **Aligns with the directory** (AI developer tools → AI developer jobs)
4. **Proven model** - works for many niche communities

---

## The Three-Tier Pricing

After researching niche job boards, I landed on three tiers:

### Good - $69
- Basic listing for 30 days
- Appears in job directory
- Standard placement

### Better - $109
- Everything in Good
- **Featured badge** on listing
- **Homepage placement** for 7 days
- **Twitter/X post** to our audience

### Best - $159
- Everything in Better
- **Top placement** for 14 days
- **Newsletter inclusion** (when launched)
- **Extended reach** - 45 days active

---

## Pricing Psychology

Why these specific numbers?

**$69 (Good)**
- Low enough to be an impulse buy for startups
- Filters out low-quality/spam postings
- Comparable to basic listings elsewhere

**$109 (Better)**
- Sweet spot for serious hiring
- Social amplification adds real value
- Most popular tier (expected)

**$159 (Best)**
- Premium but not enterprise pricing
- Newsletter is the key differentiator
- Attracts companies wanting max exposure

The gap between tiers matters. $40 between Good and Better feels like an easy upgrade. $50 for Best feels premium but reachable.

---

## The Payment Flow

Built with Polar.sh (simpler than Stripe for this use case):

1. Save draft job with PENDING_PAYMENT status
2. Create Polar checkout with job metadata
3. On webhook: activate job, trigger tier-specific actions
4. Higher tiers get social posting and newsletter queue

---

## Early Learnings

### What's Working

1. **Niche focus converts** - "AI developer jobs" is specific enough to attract the right companies
2. **Three tiers is right** - More tiers = decision paralysis
3. **Featured badge matters** - Visual differentiation drives upgrades

### What's Not Working Yet

1. **Job supply** - Chicken-and-egg problem. Need more listings to attract more companies
2. **Applicant tracking** - Companies want to know where applicants come from
3. **Renewals** - No automated renewal flow yet

---

## Revenue Projections

Being realistic about early-stage numbers:

**Conservative (Month 1-3)**
- 5 listings/month × $100 avg = $500/month

**Growth (Month 4-6)**
- 15 listings/month × $110 avg = $1,650/month

**Target (Month 12)**
- 50 listings/month × $120 avg = $6,000/month

These aren't predictions - they're targets to aim for.

---

## Competitive Analysis

| Platform | Basic Price | Notes |
|----------|-------------|-------|
| indx.sh | $69 | AI developer niche |
| Wellfound | $0-299 | General startup jobs |
| Indeed | Per-click | No niche focus |
| RemoteOK | $299 | Remote-focused |
| Work at a Startup | $299 | YC companies only |

The niche focus is the differentiator. Companies posting AI developer roles want to reach AI developers, not general audiences.

---

## Lessons for Your Project

If you're building a niche community:

1. **Job boards work** - Companies pay to reach targeted audiences
2. **Start simple** - Three tiers, clear value, done
3. **Automate the extras** - Social posting, newsletter inclusion
4. **Niche is the moat** - General job boards can't compete on focus

---

**Live site:** [indx.sh/jobs](https://indx.sh/jobs)

Hiring AI developers? Post a job. Building an AI tool? We want to feature your open roles.

---

*Part 7 of the "Building indx.sh in Public" series.*
