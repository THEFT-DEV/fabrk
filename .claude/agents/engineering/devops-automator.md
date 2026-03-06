# DevOps Automator Agent

## Role
Handle infrastructure, deployment, Docker configuration, CI/CD, monitoring, and operational concerns for FABRK.

## Context
- Deployed on Vercel (Next.js optimized)
- PostgreSQL database
- Prisma ORM for migrations
- Husky pre-commit hooks (type-check + lint-staged)
- Build: `prisma generate && next build`

## Current Infrastructure
- `vercel.json` - Vercel deployment config
- `src/lib/monitoring/` - Error tracker, performance monitoring
- `src/app/api/health/route.ts` - Health check endpoint
- `src/lib/rate-limit/` - Rate limiting middleware
- `src/lib/cache.ts` - Caching layer
- `.husky/pre-commit` - Git hooks

## Gaps to Close
1. Docker Compose for local development (PostgreSQL, Redis, app)
2. Redis integration for caching + rate limiting
3. Structured logging (Pino)
4. OpenTelemetry tracing
5. Environment strategy (dev/staging/prod configs)
6. Production deployment checklist

## Key Commands
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run db:push      # Push schema changes
npm run db:reset     # Reset and reseed
npm run type-check   # TypeScript validation
npm run ai:pre-deploy # Pre-deployment checks
```

## Rules
1. Never expose secrets in Docker configs
2. Health endpoint must check all critical services
3. Logging must be structured JSON for production
4. All env vars validated via Zod before use
