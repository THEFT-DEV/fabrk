# Competitive Analysis: FABRK vs ShipAI.today

Last updated: 2026-03-06

---

## ShipAI.today Overview

- **Price:** $299 one-time payment
- **Tagline:** "Ship fast your next AI Project in days not months"
- **Stack:** Next.js 16, Bun, TypeScript 5.5, Drizzle ORM, PostgreSQL 17, Redis 7.4, Tailwind v4, shadcn
- **Claims:** 192 builders, 4.9/5 rating, 98/100 Lighthouse, "first paid user on day 3"
- **AI Stack:** Vercel AI SDK v6, 11 modular AI handlers, Qdrant (vector), Neo4j (graph), multi-provider (Groq, OpenAI, Claude, Gemini)
- **Infra:** Docker Compose, BullMQ, MinIO/S3, SearXNG, OpenTelemetry
- **Auth:** Better Auth (magic links, OAuth, OTP, guest access)
- **Payments:** Stripe only
- **i18n:** next-intl, 7 languages
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
| 7 | i18n | next-intl, 7 languages pre-configured | None | MEDIUM | Small |
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

### Quick Wins (This Week) - Small Effort, High Impact

- [ ] **SEO utilities** - Add dynamic sitemap.xml, robots.txt, JSON-LD structured data, canonical helpers, meta utilities
- [ ] **i18n** - Add next-intl with at least English + Spanish + French + German
- [ ] **Real social proof** - Add GitHub stars counter, actual npm downloads, real user quotes (no faking numbers like ShipAI does)
- [ ] **Lighthouse audit** - Run Lighthouse, fix issues, target 95+ score and display it
- [ ] **Feature flags** - Add FEATURE_* and SERVICE_* env toggles to enable/disable modules
- [ ] **Health endpoint** - Add /api/health with service status checks
- [ ] **Recipes docs** - Add "Rebrand", "Add a Feature", "Deploy to Production" guides

### Medium Effort (Next 2 Weeks)

- [ ] **Admin dashboard wiring** - Connect existing admin components to real data (users, subscriptions, usage analytics)
- [ ] **Docker Compose** - Add docker-compose.yml for local dev with PostgreSQL, Redis, app
- [ ] **Background jobs** - Add BullMQ or similar for async processing, cron scheduling
- [ ] **Redis integration** - Caching layer + rate limiting middleware
- [ ] **Observability basics** - Structured logging with Pino, basic error tracking
- [ ] **File upload/storage** - S3-compatible storage integration (MinIO for local dev, S3 for prod)
- [ ] **Environment strategy** - Dev/staging/prod env configs with service availability toggles
- [ ] **Branding system** - Env-driven product identity (name, logo, colors configurable via env vars)

### Large Effort (Framework Roadmap - Next Month)

- [ ] **AI orchestration layer** - Multi-provider support via Vercel AI SDK, streaming, tool use
- [ ] **AI handlers/skills** - Pre-built handlers for common AI patterns (chat, summarize, extract, generate)
- [ ] **Vector memory** - Qdrant or Pinecone integration for embeddings/RAG
- [ ] **Full admin panel** - Users, traces, usage analytics, billing views, log explorer
- [ ] **Multi-scope memory** - Chat/project/file level context with structured extraction for AI features
- [ ] **Documentation site** - Full docs with getting started, codebase guides, feature docs, deployment, recipes

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
4. **Lighthouse score** - 98/100 displayed prominently
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
