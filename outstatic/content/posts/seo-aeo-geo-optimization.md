---
title: 'SEO is Dead. Long Live SEO, AEO, and GEO.'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'seo-aeo-geo-optimization'
description: 'How indx.sh optimized for traditional search (SEO), answer engines (AEO), and AI assistants (GEO). Complete guide with schema implementation examples.'
publishedAt: '2025-02-03T12:00:00.000Z'
---

**TL;DR:** Google isn't the only search engine anymore. I optimized [indx.sh](https://indx.sh) for traditional search (SEO), answer engines like featured snippets (AEO), and AI assistants like ChatGPT and Claude (GEO). Here's what I learned.

---

## The Discovery Problem in 2026

When I launched indx.sh, I assumed SEO was the whole game. Rank on Google, get traffic, done.

Then I noticed something: developers were finding tools through ChatGPT. They'd ask "what's a good MCP server for PostgreSQL?" and get answers. No Google involved.

The search landscape has fractured:

- **Google** - Still dominant for navigational queries
- **Featured Snippets / Voice** - Zero-click answers
- **ChatGPT, Claude, Perplexity** - AI-powered recommendations

If you're only optimizing for Google, you're leaving traffic on the table.

## The Three-Headed SEO Monster

### SEO: Search Engine Optimization

The classic. Keywords, backlinks, site speed, mobile-friendly. Still matters.

What I did:
- Canonical URLs on every page
- Meta descriptions with target keywords
- Sitemap with all 2000+ pages
- Internal linking between related content
- Preconnect hints for faster load times

### AEO: Answer Engine Optimization

Optimizing for featured snippets and "People Also Ask" boxes. The goal: be the answer Google shows without requiring a click.

What I did:
- **FAQ Schema** on every directory page (JSON-LD)
- **HowTo Schema** on installation guides
- **AggregateRating Schema** on detail pages
- **40-60 word definitions** that fit snippet boxes
- Structured content with clear headings

The FAQ schema is particularly powerful. Google uses it to populate "People Also Ask" boxes:

```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is MCP?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "MCP (Model Context Protocol) is an open protocol..."
    }
  }]
}
```

### GEO: Generative Engine Optimization

The new frontier. Optimizing content so AI assistants cite you in their responses.

This is where it gets interesting. AI models pull from:
- Well-structured, factual content
- Entity-rich definitions
- Content that appears on training sources (Reddit, HN, docs sites)
- Clear, unambiguous answers

What I did:
- Created a **Glossary page** with DefinedTerm schema
- Added **SoftwareApplication schema** to tool pages
- Wrote **entity-rich definitions** for every key concept
- **dateModified** signals on all content for freshness
- Structured content in tables and lists (AI-parseable)

The glossary is key for GEO. Each term has:
1. A short definition (40-60 words, snippet-optimized)
2. A detailed explanation
3. Related terms for context
4. DefinedTerm schema for structured data

```typescript
{
  "@type": "DefinedTerm",
  "name": "MCP (Model Context Protocol)",
  "description": "An open protocol that allows AI assistants...",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "AI Coding Glossary"
  }
}
```

## The Schema Stack

After the audit, indx.sh has these schemas on relevant pages:

| Schema Type | Where Used | Purpose |
|-------------|-----------|---------|
| Organization | Root layout | Brand identity |
| WebSite | Root layout | Search box integration |
| BreadcrumbList | All detail pages | Navigation context |
| FAQPage | Directory pages | "People Also Ask" |
| AggregateRating | Detail pages | Star ratings in SERPs |
| SoftwareApplication | Tool pages | Rich results for apps |
| HowTo | Installation docs | Step-by-step snippets |
| DefinedTerm | Glossary | AI citation optimization |
| Article | Blog posts | Author and date info |

## What I Learned

### 1. Schema markup isn't optional anymore

Google's documentation says schema doesn't affect rankings. Maybe. But it definitely affects click-through rates. Rich results with stars, FAQs, and how-to steps get more clicks than plain blue links.

### 2. AI assistants love structured data

When ChatGPT or Claude answers a question, they're more likely to cite content that's clearly structured. Tables, lists, definitions with clear boundaries. If your content is a wall of text, AI can't easily extract the answer.

### 3. Freshness signals matter

Adding `dateModified` to schemas tells search engines (and AI) that your content is maintained. Stale content gets demoted.

### 4. The glossary is an SEO cheat code

A well-structured glossary page does triple duty:
- Ranks for "what is X" queries (SEO)
- Gets featured snippets (AEO)
- Gets cited by AI assistants (GEO)

One page, three channels.

## The Implementation

All the schema generation is centralized in one file:

```typescript
// src/lib/metadata.ts

export function generateRatingSchema(data) { ... }
export function generateSoftwareApplicationSchema(data) { ... }
export function generateHowToSchema(data) { ... }
export function generateDefinedTermSchema(data) { ... }
```

Each page imports what it needs:

```tsx
// tools/[slug]/page.tsx
import { generateBreadcrumbSchema, generateSoftwareApplicationSchema } from '@/lib/metadata';

const breadcrumbSchema = generateBreadcrumbSchema([...]);
const softwareSchema = generateSoftwareApplicationSchema({ name, description, ... });

return (
  <>
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
    <ToolDetailClient tool={tool} />
  </>
);
```

## Results (So Far)

It's early, but after deploying these changes:

- Google Search Console shows new rich results appearing
- More "People Also Ask" boxes include indx.sh content
- Structured data validation passes clean

The GEO results are harder to measure. I can't easily track when ChatGPT cites indx.sh. But the foundation is there.

## What's Next

- Monitor Search Console for rich result impressions
- A/B test different FAQ content for snippet capture
- Build presence on Reddit/HN for GEO training data
- Add more comparison content (tables comparing tools)

---

## Try It

Browse the newly optimized pages:
- [Glossary](https://indx.sh/glossary) - AI coding terms with definitions
- [FAQ](https://indx.sh/faq) - Common questions answered
- [MCP Installation Guide](https://indx.sh/docs/mcp/installation) - HowTo schema in action

Test the structured data yourself with [Google's Rich Results Test](https://search.google.com/test/rich-results).

---

*This is part 3 of the "Building indx.sh in Public" series.*
