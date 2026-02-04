---
title: 'Getting Found: SEO for a Developer Directory'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'seo-for-directories'
description: 'Programmatic SEO for 1000+ directory pages. Dynamic meta tags, structured data, and what actually moves the needle for developer-focused content.'
publishedAt: '2025-02-06T12:00:00.000Z'
---

**TL;DR:** Programmatic SEO for 1000+ directory pages. Dynamic meta tags, structured data, and what actually moves the needle for developer-focused content.

---

## The SEO Challenge for Directories

A directory has a unique SEO opportunity: **every resource is a page**.

- 100 rules = 100 indexable pages
- 50 MCP servers = 50 indexable pages
- 200 tools = 200 indexable pages

That's 350+ pages of content, each targeting specific long-tail keywords.

But it's also a challenge. 350+ pages means:
- 350+ unique meta descriptions
- 350+ OpenGraph images
- Potential duplicate content issues
- Thin content penalties if not careful

---

## The Meta Tag System

Every resource page generates dynamic meta tags using Next.js's `generateMetadata` function.

### Title Formula

Each content type has a title pattern:

| Type | Pattern | Example |
|------|---------|---------|
| Rules | `{title} \| AI Coding Rule for {tool}` | "TypeScript Best Practices \| AI Coding Rule for Claude" |
| MCP | `{name} - MCP Server \| {category}` | "PostgreSQL - MCP Server \| Database" |
| Tools | `{name} - AI Coding Tool \| {category}` | "Cursor - AI Coding Tool \| IDE" |
| Jobs | `{title} at {company} \| AI Developer Job` | "Senior AI Engineer at Anthropic \| AI Developer Job" |

---

## Structured Data (JSON-LD)

Google loves structured data. Every page includes it.

For rules, I use `SoftwareSourceCode` schema with name, description, programming language, author, dates, and aggregate ratings.

For MCP servers, I use `SoftwareApplication` schema with application category and offers.

---

## Sitemap Generation

Dynamic sitemap for all resources - static pages with high priority, then all dynamic resource pages with appropriate priorities and lastModified dates.

---

## The Slug Strategy

Slugs are SEO-critical. My rules:

1. **Include keywords** - `typescript-react-best-practices` not `rule-123`
2. **Keep it readable** - `claude-code-testing-guide` not `claud-cd-tst-gd`
3. **No dates** - Content should feel evergreen
4. **Lowercase, hyphenated** - Standard convention

---

## Internal Linking

Directory pages link to each other strategically. Every resource links to:
- Other resources with same tool
- Other resources with same language
- Other resources with overlapping tags

This creates a web of internal links that helps Google understand content relationships.

---

## Canonical URLs

Prevent duplicate content issues by setting canonical URLs. If the same content appears on multiple URLs (filtered views, pagination), canonical points to the "real" page.

---

## What's Actually Working

After 3 months:

**Working:**
- Long-tail keywords are indexing well
- "MCP server for [X]" queries picking up
- Tool-specific queries gaining traction
- Structured data appearing in SERPs

**Not working yet:**
- Competitive head terms (too new)
- Featured snippets (need more authority)
- Image search (need OG images)

---

## The Content Quality Signal

Google knows thin content. A page with just a title, 20-word description, and one code block won't rank.

Each page needs substance:
- Full rule content (not just a snippet)
- Installation instructions (for MCP/tools)
- Use cases and examples
- Author information
- Related content

---

## Page Speed Matters

Developer audiences have zero patience. Current metrics:

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | ~1.8s |
| FID | < 100ms | ~50ms |
| CLS | < 0.1 | ~0.02 |

How:
- Static generation where possible
- Edge caching for dynamic pages
- No client-side data fetching for critical content
- Minimal JavaScript

---

## Your Takeaway

For any directory/content site:

1. **Every page needs unique meta** - Automate it
2. **Structured data is free** - Implement it
3. **Internal linking matters** - Build the web
4. **Content depth wins** - No thin pages
5. **Speed is table stakes** - Especially for devs

---

**Live site:** [indx.sh](https://indx.sh)

Check out any resource page - view source to see the meta tags and structured data in action.

---

*Part 8 of the "Building indx.sh in Public" series.*
