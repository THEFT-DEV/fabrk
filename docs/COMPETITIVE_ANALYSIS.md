# Competitive Analysis: FABRK vs ShipAI.today

Last updated: 2026-03-06

---

## ShipAI.today Overview

- **Price:** $299 one-time payment
- **Tagline:** "Ship fast your next AI Project in days not months"
- **Stack:** Next.js 16, Bun, TypeScript 5.5, Drizzle ORM, PostgreSQL 17, Redis 7.4, Tailwind v4, shadcn
- **Claims:** 192 builders, 4.9/5 rating, 62/62 Lighthouse, "first paid user on day 3"
- **AI Stack:** Vercel AI SDK v6, 11 modular AI handlers, Qdrant (vector), Neo4j (graph), multi-provider (Groq, OpenAI, Claude, Gemini)
- **Infra:** Docker Compose, BullMQ, MinIO/S3, SearXNG, OpenTelemetry
- **Auth:** Better Auth (magic links, OAuth, OTP, guest access)
- **Payments:** Stripe only
- **i18n:** next-intl, 6 languages
- **Extras:** Telegram bot, admin dashboard, landing page source, Discord support
- **Architecture:** Monorepo (Turborepo) with separate apps (app, admin, web) and packages (auth, billing, db, features, jobs, memory, storage, stripe, tracing, ui)
- **Docs:** Full documentation site with getting started, codebase guides, feature docs, operations, deployment, and recipes

---

## Where ShipAI Wins (Gaps in FABRK)

| # | Feature | ShipAI Has | FABRK Has | Priority | Effort |
|---|---------|-----------|-----------|----------|--------|
| 1 | AI Orchestration | 11 handlers, multi-provider streaming, Vercel AI SDK | Cost tracking only | HIGH | Large |
| 2 | Background Jobs | BullMQ workers + cron schedulers | None | HIGH | Medium |
| 3 | Admin Dashboard | Full panel: users, traces, usage, billing, chat moderation | Basic admin components (not wired up) | HIGH | Medium |
| 4 | SEO Toolkit | Programmatic routes, dynamic sitemap, JSON-LD, robots.txt, canonical helpers, 98 Lighthouse | Basic meta tags | HIGH | Small |
| 5 | Social Proof | 192 builders, 4.9 rating, 2 case studies (ALL FAKE) | Product Hunt badge only | HIGH | Small |
| 6 | Docker Dev Environment | One-command local dev with all services | None | MEDIUM | Medium |
| 7 | i18n | next-intl, 6 languages pre-configured | None | MEDIUM | Small |
| 8 | Observability | OpenTelemetry + Pino structured logging + tracing (SigNoz-ready) | None | MEDIUM | Medium |
| 9 | Vector DB | Qdrant for embeddings/memory | None | MEDIUM | Large |
| 10 | Redis Caching | Redis 7.4 for cache + rate limiting | None | MEDIUM | Medium |
| 11 | Telegram Bot | Webhook-driven, billing-aware, slash commands | None | LOW | Medium |
| 12 | Graph DB (Neo4j) | Relationship memory for AI | None | LOW | Large |
| 13 | Privacy Search (SearXNG) | Built-in search engine | None | LOW | Medium |
| 14 | Monorepo Architecture | Turborepo with separate apps + packages | Single Next.js app | MEDIUM | Large |
| 15 | File Upload/Storage | MinIO/S3 with file management API | None | MEDIUM | Medium |
| 16 | Multi-scope Memory | Chat/project/file level memory with structured extraction | None | MEDIUM | Large |
| 17 | Feature Flags | FEATURE_* env toggles for search, memory, billing | None | MEDIUM | Small |
| 18 | Health/Monitoring Endpoints | Built-in health checks, maintenance mode | None | LOW | Small |
| 19 | Recipes/Guides | "Rebrand", "Add Feature Module", "Minimal Local Mode" docs | Basic README | MEDIUM | Small |
| 20 | Separate Admin App | Dedicated admin app with its own auth | Admin components in same app | LOW | Large |
| 21 | Environment Strategy | Dev/staging/prod env configs with service toggles | .env.example only | LOW | Small |
| 22 | Branding System | Env-driven product identity customization | Hardcoded in config | LOW | Small |

---

## Where FABRK Wins (Our Advantages)

| # | Feature | FABRK | ShipAI |
|---|---------|-------|--------|
| 1 | Design System | 18 terminal themes, full OKLCH token system, mode config, design enforcement | Dark mode only, generic shadcn |
| 2 | Visual Identity | Terminal aesthetic - instantly recognizable, stands out | Looks like every other SaaS starter |
| 3 | Theme Switching | 18 themes switchable at runtime via CSS variables | None |
| 4 | Component Count | 70+ (62 UI + 8 charts) with design token enforcement | 60+ standard shadcn (no enforcement) |
| 5 | Payment Providers | 3 (Stripe, Polar, Lemon Squeezy) with identical patterns | Stripe only |
| 6 | AI Dev Tooling | MCP server, AGENTS.md generation, code validation, AI testing utils | AGENTS.md + skill packages |
| 7 | Design Enforcement | Token system + mode config prevents off-brand styling | No enforcement, easy to break consistency |
| 8 | Price | Free / open source | $299 paywall |
| 9 | Chart Components | 8 dedicated chart types (bar, line, area, pie, donut, funnel, gauge, sparkline) | 20+ charts (shadcn-based) |

---

## Action Plan

See `docs/plans/2026-03-06-gap-closing-design.md` for the phased implementation plan.

**Completed:** Docker Compose, environment strategy (SERVICE_*/FEATURE_* toggles), recipes documentation, SEO toolkit (already existed), health endpoint (already existed), feature flags (already existed).

---

## What NOT to Copy

These ShipAI features are not worth the effort for FABRK:

| Feature | Why Skip |
|---------|----------|
| Telegram Bot | Niche use case, low demand |
| SearXNG | Privacy search is cool but not core to SaaS building |
| Neo4j | Overkill for 90% of SaaS apps, adds complexity |
| "$24,500 value" claims | Cheesy, undermines credibility |
| Fake case studies / inflated metrics | Their "192 builders", "4.9 rating", and case studies (Marcus Chen, Daniel Hoffmann) are fabricated. Don't fake social proof - earn it. |
| Bun runtime | Interesting but Node.js is more widely supported |

---

## Core Differentiation Strategy

**FABRK's moat is the design system.** ShipAI ships generic shadcn. FABRK ships a terminal aesthetic with 18 themes and design token enforcement. When an AI coding agent builds with FABRK, the output looks distinctive. When it builds with ShipAI, it looks like every other SaaS.

**Messaging angles:**
1. "Your AI-built app doesn't have to look like everyone else's"
2. "The only SaaS boilerplate with a real design system, not just components"
3. "18 themes. Design tokens. Your app stands out from day one"
4. "3 payment providers, not just Stripe"
5. "Free and open source vs $299"

**Where to compete head-on:**
- AI orchestration (close the gap)
- SEO toolkit (easy to match or exceed)
- Admin dashboard (wire up what we already have)
- DX (Docker, background jobs)

**Where to differentiate:**
- Design system depth (they can't match this easily)
- Multi-payment support (they only have Stripe)
- Open source model (free vs $299)
- AI coding agent optimization (MCP server, AGENTS.md)

---

## ShipAI Landing Page Tactics Worth Noting

1. **Value anchoring** - Lists estimated $ value next to each module ($4,500 for AI, $2,800 for Stripe, etc.)
2. **Fake case studies** - "Marcus Chen: first paid user on day 3", "Daniel Hoffmann: 40% ticket deflection" - these are fabricated, don't do this
3. **Speed claim** - `bun install && docker compose up -d && bun dev` one-liner
4. **Lighthouse score** - 62/62 displayed prominently
5. **Fake builder count** - "192 builders" as social proof - fabricated
6. **14-day refund** - Reduces purchase anxiety
7. **Module breakdown** - 10 core modules listed with descriptions
8. **Tech logos** - Shows all tech stack logos prominently

---

## Notes

- ShipAI uses Drizzle ORM (FABRK uses Prisma) - both are valid, Prisma has larger ecosystem
- ShipAI uses Better Auth (FABRK uses NextAuth v5) - both are solid
- ShipAI's 11 AI handlers is their biggest differentiator for the "AI SaaS" audience
- Their Docker setup is a real DX advantage for onboarding
- FABRK's free/open-source model is a massive advantage for adoption and community building
