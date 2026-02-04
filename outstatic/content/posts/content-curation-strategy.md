---
title: 'Curating an AI Tool Directory Without Losing Your Mind'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'content-curation-strategy'
description: 'A directory is only as good as its content. Here is how I source, evaluate, and organize 1000+ AI coding resources and the automation that makes it sustainable.'
publishedAt: '2025-02-04T12:00:00.000Z'
---

**TL;DR:** A directory is only as good as its content. Here's how I source, evaluate, and organize 1000+ AI coding resources - and the automation that makes it sustainable.

---

## The Content Problem

Building the platform was the easy part. Filling it with quality content? That's the real work.

A directory with 10 resources is useless. A directory with 1000 low-quality resources is worse than useless. The goal is **curated abundance** - enough content to be comprehensive, good enough content to be trusted.

---

## Where I Find Resources

### Primary Sources

**GitHub**
- Trending repos with "cursor rules", "claude", "mcp server"
- Awesome lists (awesome-mcp, awesome-cursor, etc.)
- Release notes from AI coding tools

**Twitter/X**
- Following AI developer accounts
- Searching for shared rules and configs
- Monitoring viral threads about AI coding

**Discord/Slack**
- AI tool community servers
- Developer communities sharing tips
- Direct submissions from users

**Reddit**
- r/ClaudeAI, r/ChatGPTPro, r/LocalLLaMA
- Tool-specific subreddits
- Weekly "what's new" threads

---

## The Evaluation Criteria

Not everything makes it in. Each resource is evaluated on:

### For Rules/Prompts
- Specificity - Does it solve a specific problem?
- Completeness - Is it ready to use as-is?
- Originality - Is it meaningfully different from existing rules?
- Quality - Is it well-written and tested?
- Attribution - Can I credit the original author?

### For MCP Servers
- Functionality - Does it actually work?
- Documentation - Can someone install it?
- Maintenance - Is it actively maintained?
- Security - Any obvious red flags?
- Usefulness - Does it solve a real problem?

### For Tools
- Availability - Can people actually get it?
- Relevance - Is it for AI-assisted coding?
- Quality - Is it production-ready?
- Differentiation - What makes it unique?

---

## The Verification System

Resources have three trust levels:

```
PENDING → APPROVED → VERIFIED
```

**Pending**: Just submitted, not yet reviewed
**Approved**: Reviewed and accepted, basic quality check
**Verified**: Tested personally, high confidence

The verified badge matters. It means I've actually used this resource, it works as described, and it's maintained and reliable.

I'm stingy with verification. Maybe 20% of approved content gets verified.

---

## Community Submissions

As traffic grows, submissions increase. The workflow:

1. User submits via form
2. Auto-validation checks for spam, duplicates
3. Queue for manual review
4. Review within 48 hours
5. Feedback if rejected (with reason)

I reject about 30% of submissions: duplicates, low-effort descriptions, broken links, self-promotion without value.

---

## Automation That Helps

### GitHub Stars Tracking
Nightly job updates star counts and surfaces trending projects, abandoned projects, and archived repos.

### Duplicate Detection
Exact URL matching plus fuzzy title matching before adding content.

### Broken Link Checker
Weekly job to verify all external links and flag dead ones for review.

---

## The Daily Routine

**Morning (15 min)**
- Check submission queue
- Review GitHub trending
- Scan Twitter for new shares

**Weekly (1 hour)**
- Deep dive into one category
- Update outdated entries
- Review broken link report

**Monthly (2 hours)**
- Audit verification badges
- Update taxonomy
- Plan content campaigns

---

## What's Working

1. **GitHub is the best source** - Most quality content lives there
2. **Community submissions scale** - As traffic grows, so do submissions
3. **Verification matters** - Users trust the verified badge
4. **Automation saves time** - Star tracking and link checking run themselves

## What's Not Working (Yet)

1. **Discovery of new tools** - Still manual, want better monitoring
2. **Content freshness** - Need better "last updated" tracking
3. **International content** - Mostly English, missing other languages

---

**Live site:** [indx.sh](https://indx.sh)

Have a resource that should be included? Submit it - I review everything.

---

*Part 6 of the "Building indx.sh in Public" series.*
