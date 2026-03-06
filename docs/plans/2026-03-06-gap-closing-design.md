# Gap-Closing Plan: FABRK vs ShipAI.today

Date: 2026-03-06
Status: APPROVED
Reference: `docs/COMPETITIVE_ANALYSIS.md`

---

## Revised Gap Assessment

After auditing the actual codebase, FABRK already has several features the competitive analysis listed as missing:

| Feature | Status | Location |
|---------|--------|----------|
| SEO toolkit | EXISTS | `src/lib/seo/`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| Health endpoint | EXISTS | `src/app/api/health/route.ts` |
| Cache layer | EXISTS | `src/lib/cache.ts` |
| Rate limiting | EXISTS | `src/lib/rate-limit/` |
| Monitoring | EXISTS | `src/lib/monitoring/` |
| Storage/uploads | EXISTS | `src/lib/storage/`, `src/lib/uploads/` |
| Feature flags | EXISTS | `src/lib/features/` (access-control, tier-config) |
| AI provider abstraction | EXISTS | `src/lib/ai/provider.ts` |

**Actual remaining gaps:** 14 items across 4 phases.

---

## Phase 1: Quick Wins (Week 1) - 15-20 hours

These require minimal effort but close visible competitive gaps.

### 1.1 i18n Support
**Gap:** ShipAI has next-intl with 7 languages. FABRK has none.
**Plan:**
- Install `next-intl`
- Configure for English, Spanish, French, German (4 languages)
- Add locale switcher component using existing `Select` UI component
- Wrap app layout with `NextIntlClientProvider`
- Create `messages/` directory with translation JSON files
- Add i18n middleware for locale detection
**Effort:** 4-6 hours
**Repo:** fabrk-dev

### 1.2 Docker Compose for Local Dev
**Gap:** ShipAI has one-command Docker setup. FABRK has none.
**Plan:**
- Create `docker-compose.yml` with PostgreSQL 17 + Redis 7.4 + app
- Create `Dockerfile` for development
- Add `.dockerignore`
- Update README with Docker setup instructions
- Add `npm run docker:up` and `npm run docker:down` scripts
**Effort:** 3-4 hours
**Repo:** fabrk-dev

### 1.3 Environment Strategy
**Gap:** ShipAI has dev/staging/prod env configs with service toggles.
**Plan:**
- Create `.env.development`, `.env.staging`, `.env.production` templates
- Add `SERVICE_*` toggles to `src/lib/env/index.ts` (e.g., `SERVICE_REDIS`, `SERVICE_STORAGE`)
- Add `FEATURE_*` toggles for optional modules (e.g., `FEATURE_AI`, `FEATURE_BILLING`)
- Update setup wizard to configure these
**Effort:** 2-3 hours
**Repo:** fabrk-dev

### 1.4 Recipes Documentation
**Gap:** ShipAI has how-to recipes. FABRK has basic README.
**Plan:**
- Create `docs/recipes/` directory
- Write: "Rebrand Your App" (change name, logo, colors, fonts)
- Write: "Add a New Feature Module" (page + API route + service)
- Write: "Deploy to Production" (Vercel checklist)
- Write: "Add a Payment Provider" (configure Stripe/Polar/Lemon)
- Write: "Customize a Theme" (create your own terminal theme)
**Effort:** 3-4 hours
**Repo:** fabrk-dev

### 1.5 Branding System
**Gap:** ShipAI has env-driven product identity. FABRK config is in `src/config/index.ts`.
**Plan:**
- Ensure `src/config/index.ts` reads all branding from env vars
- Add env vars: `APP_NAME`, `APP_DESCRIPTION`, `APP_URL`, `APP_LOGO_URL`
- Ensure all pages reference config, not hardcoded strings
- Document in recipes
**Effort:** 2-3 hours
**Repo:** fabrk-dev

---

## Phase 2: Core Infrastructure (Weeks 2-3) - 30-40 hours

These close the most impactful technical gaps.

### 2.1 Redis Integration
**Gap:** ShipAI has Redis 7.4 for cache + rate limiting. FABRK's cache is in-memory.
**Plan:**
- Install `ioredis`
- Create `src/lib/redis.ts` with connection management
- Update `src/lib/cache.ts` to use Redis when `SERVICE_REDIS=true`, fallback to in-memory
- Update `src/lib/rate-limit/middleware.ts` to use Redis backend
- Add Redis to Docker Compose
- Add session storage option via Redis
**Effort:** 6-8 hours
**Repo:** fabrk-dev, then extract to fabrk-framework `@fabrk/config`

### 2.2 Background Jobs
**Gap:** ShipAI has BullMQ workers + cron. FABRK has none.
**Plan:**
- Install `bullmq`
- Create `src/lib/jobs/` with:
  - `queue.ts` - Queue creation and configuration
  - `worker.ts` - Worker setup and job processing
  - `scheduler.ts` - Cron job scheduling
  - `types.ts` - Job type definitions
- Create example jobs: email sending, data cleanup, usage metering
- Add admin UI for job monitoring (use existing admin components)
- Add to Docker Compose (requires Redis)
**Effort:** 10-12 hours
**Repo:** fabrk-dev, then extract to fabrk-framework

### 2.3 Structured Logging
**Gap:** ShipAI has Pino + OpenTelemetry. FABRK has basic `console.error`.
**Plan:**
- Install `pino` and `pino-pretty`
- Create `src/lib/logger/` with:
  - `index.ts` - Logger factory with context
  - `middleware.ts` - Request logging middleware
  - `formats.ts` - JSON for prod, pretty for dev
- Replace all `console.error` / `console.log` with structured logger
- Add request ID tracking
- Add log level configuration via env var
**Effort:** 6-8 hours
**Repo:** fabrk-dev

### 2.4 Admin Dashboard Wiring
**Gap:** ShipAI has full admin panel. FABRK has admin components but they're not fully wired.
**Plan:**
- Audit existing admin components: `admin-metrics-card.tsx`, `audit-log.tsx`, `user-management-table.tsx`, `system-health-widget.tsx`
- Wire `user-management-table.tsx` to real Prisma user queries
- Wire `admin-metrics-card.tsx` to real analytics (signups, active users, revenue)
- Wire `system-health-widget.tsx` to health endpoint data
- Add usage analytics view (API calls, AI usage, storage)
- Add billing overview (subscriptions, MRR, churn)
**Effort:** 8-12 hours
**Repo:** fabrk-dev

---

## Phase 3: AI Orchestration (Weeks 3-4) - 30-40 hours

This closes the biggest competitive gap. ShipAI's 11 AI handlers is their headline feature.

### 3.1 Vercel AI SDK Integration
**Gap:** ShipAI uses Vercel AI SDK v6 with multi-provider streaming. FABRK has cost tracking but no orchestration.
**Plan:**
- Install `ai` (Vercel AI SDK) and provider packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`)
- Create `src/lib/ai/orchestration/` with:
  - `providers.ts` - Multi-provider configuration
  - `stream.ts` - Streaming response utilities
  - `tools.ts` - Tool use / function calling support
  - `middleware.ts` - Cost tracking, rate limiting, logging middleware
- Integrate with existing cost tracker in `src/lib/ai/cost.ts`
- Add provider selection via env vars
**Effort:** 10-12 hours
**Repo:** fabrk-dev, then extract to fabrk-framework `@fabrk/ai`

### 3.2 Pre-Built AI Handlers
**Gap:** ShipAI has 11 modular handlers. FABRK has none.
**Plan:**
- Create `src/lib/ai/handlers/` with modular handlers:
  1. `chat.ts` - Conversational AI with context
  2. `summarize.ts` - Text summarization
  3. `extract.ts` - Structured data extraction from text
  4. `generate.ts` - Content generation (text, code, email)
  5. `classify.ts` - Text classification and labeling
  6. `translate.ts` - Multi-language translation
  7. `analyze.ts` - Sentiment analysis, content analysis
  8. `search.ts` - RAG-style search with context
- Each handler: typed input/output, streaming support, cost tracking, provider-agnostic
- Create corresponding API routes in `src/app/api/ai/`
- Add React hooks: `useChat`, `useSummarize`, `useGenerate`, etc.
**Effort:** 12-16 hours
**Repo:** fabrk-dev, then extract to fabrk-framework `@fabrk/ai`

### 3.3 Vector Memory (RAG)
**Gap:** ShipAI has Qdrant for vector embeddings. FABRK has none.
**Plan:**
- Create `src/lib/ai/memory/` with:
  - `embeddings.ts` - Generate embeddings via AI SDK
  - `vector-store.ts` - Abstract vector store interface
  - `providers/qdrant.ts` - Qdrant implementation
  - `providers/pinecone.ts` - Pinecone implementation
  - `providers/in-memory.ts` - Development fallback
  - `rag.ts` - Retrieval-augmented generation pipeline
- Add `SERVICE_VECTOR_DB` env toggle
- Add embedding model selection via env var
- Add to Docker Compose (Qdrant container for local dev)
**Effort:** 8-12 hours
**Repo:** fabrk-dev, then extract to fabrk-framework `@fabrk/ai`

---

## Phase 4: Documentation & Polish (Week 5) - 15-20 hours

### 4.1 Full Documentation Site
**Gap:** ShipAI has comprehensive docs with getting started, features, operations, deployment, recipes.
**Plan:**
- Create documentation structure matching or exceeding ShipAI:
  - Getting Started (setup, configuration, troubleshooting)
  - Codebase (architecture, directory structure, data flow)
  - Features (auth, billing, AI, themes, components)
  - Operations (database, jobs, monitoring, maintenance)
  - Deployment (Vercel, Docker, production checklist)
  - Recipes (rebrand, add feature, customize theme, etc.)
- Use existing blog infrastructure or add dedicated docs section
**Effort:** 8-10 hours
**Repo:** fabrk-dev

### 4.2 Comparison Pages
**Gap:** No head-to-head comparison content for SEO.
**Plan:**
- Create `/compare/shipai` page
- Create `/compare/shipfast` page
- Create `/compare` index page listing all comparisons
- Each page: feature table, honest pros/cons, CTA
- SEO optimized for "FABRK vs ShipAI" type searches
**Effort:** 4-6 hours
**Repo:** fabrk-dev

### 4.3 Performance Benchmarking
**Gap:** ShipAI claims 98 Lighthouse. FABRK hasn't published scores.
**Plan:**
- Run Lighthouse on all key pages
- Fix any issues to hit 95+ across all categories
- Add scores to landing page
- Set up automated Lighthouse CI
**Effort:** 3-4 hours
**Repo:** fabrk-dev

---

## Phase 5: Framework Extraction (Ongoing, Parallel)

All features built in Phases 1-4 should be designed for extraction to fabrk-framework.

### Package Mapping
| Feature | fabrk-dev Location | Framework Package |
|---------|-------------------|-------------------|
| AI orchestration | `src/lib/ai/` | `@fabrk/ai` |
| Components | `src/components/ui/` | `@fabrk/components` |
| Design system | `src/design-system/` | `@fabrk/design-system` |
| Config/env | `src/config/`, `src/lib/env/` | `@fabrk/config` |
| Auth patterns | `src/lib/auth.ts` | `@fabrk/core` |
| Jobs/queues | `src/lib/jobs/` | `@fabrk/core` |
| Redis/cache | `src/lib/redis.ts`, `src/lib/cache.ts` | `@fabrk/config` |

### Extraction Criteria
Before extracting any module:
1. Working and tested in fabrk-dev
2. Clean interface with no business logic leakage
3. Configurable via options/env vars
4. TypeScript types exported
5. README with usage examples

---

## Timeline Summary

| Phase | Duration | Hours | Key Deliverables |
|-------|----------|-------|-----------------|
| 1: Quick Wins | Week 1 | 15-20h | i18n, Docker, env strategy, recipes, branding |
| 2: Core Infrastructure | Weeks 2-3 | 30-40h | Redis, BullMQ, Pino logging, admin dashboard |
| 3: AI Orchestration | Weeks 3-4 | 30-40h | Vercel AI SDK, 8 handlers, vector memory |
| 4: Docs & Polish | Week 5 | 15-20h | Full docs, comparison pages, Lighthouse 95+ |
| 5: Framework Extract | Ongoing | Parallel | Extract to @fabrk/* packages |
| **Total** | **5 weeks** | **90-120h** | |

---

## Success Criteria

After completing all phases:

- [ ] i18n with 4+ languages
- [ ] Docker one-command local dev
- [ ] Redis-backed cache and rate limiting
- [ ] Background job processing with BullMQ
- [ ] Structured logging with Pino
- [ ] Admin dashboard with real data
- [ ] AI orchestration with multi-provider streaming
- [ ] 8+ pre-built AI handlers
- [ ] Vector memory / RAG support
- [ ] Full documentation site
- [ ] Comparison pages for SEO
- [ ] Lighthouse 95+ on all pages
- [ ] All features extractable to fabrk-framework

## Competitive Position After Plan

| Feature | ShipAI | FABRK (After) |
|---------|--------|---------------|
| AI Handlers | 11 | 8+ |
| Themes | 1 (dark) | 18 |
| Payment Providers | 1 (Stripe) | 3 |
| Components | 60+ | 70+ |
| i18n Languages | 7 | 4+ |
| Docker Setup | Yes | Yes |
| Background Jobs | Yes | Yes |
| Vector Memory | Yes (Qdrant) | Yes (multi-provider) |
| Design System | No | Yes (OKLCH tokens) |
| Price | $299 | Free |
| Lighthouse | 98 | 95+ |
| Docs | Good | Comprehensive |
| Social Proof | Fake | Real |

FABRK matches or exceeds ShipAI on every dimension except raw AI handler count (8 vs 11), while maintaining advantages in design system, pricing, payment flexibility, and honesty.
