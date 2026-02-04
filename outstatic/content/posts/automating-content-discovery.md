---
title: 'Automating Content Discovery: How I Keep indx.sh Fresh'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'automating-content-discovery'
description: 'I built automated crawlers that discover AI coding resources from GitHub daily. The directory stays fresh without manual work.'
publishedAt: '2025-01-31T12:00:00.000Z'
---

**TL;DR:** I built automated crawlers that discover AI coding resources from GitHub daily. The directory stays fresh without manual work.

---

## The Manual Content Problem

When I launched [indx.sh](https://indx.sh), I had a content problem. The AI coding ecosystem moves fast:

- New MCP servers pop up daily
- Developers publish cursor rules and skill definitions constantly
- Official repositories get updates
- Star counts change

Manually tracking all this? Impossible.

## The Solution: Automated Crawlers

I built a set of crawlers that run on a schedule:

1. **Prompts Crawler** - Discovers AI coding rules and prompts across different tools
2. **Skills Crawler** - Finds skill definitions in the Claude Code ecosystem
3. **MCP Crawler** - Finds Model Context Protocol servers

All run as Vercel cron jobs, keeping the directory fresh automatically.

## The General Approach

Each crawler follows a similar pattern:

1. **Search GitHub** using their code search API with targeted queries
2. **Fetch content** from discovered files
3. **Extract metadata** - titles, descriptions, categories, tags
4. **Quality signals** - star counts, verification status, official sources
5. **Upsert to database** - update existing or create new entries

The key insight: GitHub's API is powerful enough to find specific file types and patterns across millions of repos. Knowing what to search for is the tricky part.

## Handling Scale

GitHub's API has rate limits, so I handle this carefully:

- **Batched processing** - don't try to crawl everything at once
- **Incremental updates** - process a portion each run, let it accumulate
- **Graceful retries** - back off when rate limited
- **Deduplication** - same repo can appear in multiple searches

Early versions tried to crawl everything at once. Timeouts, rate limits, chaos. Incremental is better.

## Quality Over Quantity

Not everything discovered is worth indexing:

- **False positives** - repos that match keywords but aren't relevant
- **Empty descriptions** - many repos lack useful metadata
- **Abandoned projects** - old repos that no longer work

I use a combination of automated signals (star counts, recent activity, official orgs) and manual review to maintain quality. Repos from official sources like `modelcontextprotocol` and `anthropics` get auto-verified.

## What I Learned

**1. Trust but verify**

Automated discovery is great for finding things, but human curation still matters for quality.

**2. Metadata is often missing**

Many repos have empty or useless descriptions. Building good fallbacks and inference is important.

**3. Incremental beats bulk**

Processing smaller batches consistently is more reliable than trying to do everything at once.

**4. The long tail matters**

Popular repos are easy to find. The real value is discovering useful but lesser-known resources.

## Current Stats

After the crawlers have been running:
- **790+ MCP servers** indexed
- **1,300+ skills** discovered
- **300+ prompts/rules** indexed
- Daily updates keep star counts fresh

## What's Next

- Better category inference using AI
- README parsing for richer descriptions
- Automatic quality scoring based on activity and documentation
- User submissions to fill gaps

---

## Try It

Browse the auto-discovered resources at [indx.sh](https://indx.sh):
- [Rules & Prompts](https://indx.sh/prompts) - Cursor, Claude Code, Copilot rules
- [MCP Servers](https://indx.sh/mcp) - sorted by GitHub stars
- [Skills](https://indx.sh/skills) - searchable by name/tags

Got a resource that's not indexed? [Submit it](https://indx.sh/submit) or wait for the crawlers to find it.

---

*This is part 2 of the "Building indx.sh in Public" series.*
