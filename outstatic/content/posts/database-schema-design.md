---
title: 'Designing a Schema for 1000+ Resources'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'database-schema-design'
description: 'How I designed a PostgreSQL schema for a directory with multiple resource types, user-generated content, and analytics using Prisma patterns that actually scale.'
publishedAt: '2025-02-03T12:00:00.000Z'
---

**TL;DR:** How I designed a PostgreSQL schema for a directory with multiple resource types, user-generated content, and analytics - using Prisma patterns that actually scale.

---

## The Data Model Challenge

indx.sh has four core resource types:
- Rules (AI coding prompts)
- MCP Servers (Model Context Protocol)
- Tools (IDEs, extensions, CLIs)
- Jobs (paid listings)

Each has different fields, but they share common patterns:
- Ownership (who submitted it)
- Verification (is it trusted)
- Analytics (views, copies, ratings)
- Relationships (tags, categories)

The challenge: design a schema that's flexible enough for different resource types but consistent enough to share code.

---

## The Core Models

### User Model

Key decisions:
- **Soft deletes** for GDPR compliance
- **Trust score** for community moderation
- **Tier enum** for subscription levels

### Resource Models

Each resource type (Rules, MCP Servers, etc.) includes:
- Categorization (tool, language, tags)
- Status workflow (PENDING → APPROVED → VERIFIED)
- Denormalized analytics (viewCount, copyCount, rating)
- Author relationship

---

## Why Denormalized Counters

The naive approach to view counts - counting on every read - kills performance at scale. Every page load triggers a COUNT query.

Instead, I denormalize. Increment the counter atomically, and reading is instant.

The tradeoff: slightly stale counts (acceptable) vs. fast reads (essential).

---

## The Tag Pattern

Tags are many-to-many, but I use an explicit junction table rather than Prisma's implicit syntax. Why? Because I often need metadata on the relationship (when it was assigned, who assigned it, etc.).

---

## Job Listings (Monetization)

Jobs are special - they're paid content. The tier determines visibility and distribution, not different schemas.

---

## Indexes That Matter

I add indexes based on actual query patterns:
- Filter by tool and status (common listing query)
- Author's submissions
- Featured content for homepage
- Full-text search

Every index is justified by a real query. No speculative indexing.

---

## Soft Deletes Pattern

For GDPR compliance, users can request deletion. But I can't cascade-delete their content (it breaks relationships).

Instead, I null out PII and mark the record as deleted. Their content remains (attributed to "Deleted User"), but PII is gone.

---

## Migration Strategy

I never run migrations on production directly:

1. Generate migration locally
2. Review the SQL
3. Test on staging
4. Only then: production

For risky migrations (adding NOT NULL columns, etc.), I do it in steps:
1. Add column as nullable
2. Backfill data
3. Add NOT NULL constraint

---

## Query Patterns

Key patterns I use:

- **Listing with filters** - Conditional where clauses based on params
- **Increment with atomic operation** - `{ increment: 1 }` syntax
- **Upsert for idempotency** - Create or no-op if exists

---

## What I'd Do Differently

1. **Use UUIDs from the start** - CUIDs work but UUIDs are more standard
2. **Add `createdBy`/`updatedBy` everywhere** - Audit trails matter
3. **Separate analytics tables** - Counters on main models work, but dedicated analytics tables scale better

---

## Current Stats

| Model | Records |
|-------|---------|
| Users | Growing |
| Rules | 100+ curated |
| MCP Servers | 50+ |
| Tools | 200+ |
| Jobs | Launching soon |

The schema handles it easily. The patterns will scale to 10x this.

---

**Live site:** [indx.sh](https://indx.sh)

---

*Part 5 of the "Building indx.sh in Public" series.*
