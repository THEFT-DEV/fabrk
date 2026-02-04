# Changelog

All notable changes to Fabrk will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2026-02-04

### Added
- **AI Development Toolkit** - Complete suite for AI-assisted development:
  - `npm run ai:validate` - Validate AI-generated code
  - `npm run ai:lint` - ESLint rules for AI code quality
  - `npm run ai:security` - Security scanning for AI code
  - `npm run ai:costs` - API cost tracking and reporting
  - `npm run ai:pre-deploy` - Pre-deployment validation
- **AI Cost Tracking** - Monitor API spending with dashboard at `/admin/ai-costs`
- **AI Development Documentation** - 9 comprehensive guides in `docs/11-ai-development/`
- **New Component Docs** - Added documentation pages for:
  - Terminal Card (12 components)
  - Data Table (TanStack Table wrapper)
  - File Upload (Dropzone)
- **ESLint AI Rules** - Custom rules for design system compliance

### Changed
- **Component Refactoring** - Split large components for maintainability:
  - `sign-in-form.tsx` split into `sign-in-form.tsx`, `sign-up-form.tsx`, `social-auth.tsx`
  - `ascii-background.tsx` split into component + `ascii-animations.ts`
- Updated CLAUDE.md with auth component quick reference
- All files now under 300 line guideline

### Fixed
- Various TODO comments cleaned up or converted to descriptive comments
- ESLint warnings resolved with proper fixes (not workarounds)

---

## [1.2.0] - 2026-01-15

### Added
- **SEO Improvements** - High-priority optimizations for search engines
- **AEO/GEO Optimizations** - AI search engine optimizations
- **HowTo Schemas** - Structured data for tutorials
- **Static llms.txt** - AI crawler guidance file

### Fixed
- Heading hierarchy fixes for better SEO
- robots.txt rules improved

---

## [1.1.0] - 2025-12-27

### Added
- **Bidirectional Font Pairings** - 34 display/body font combinations for headlines and content
- **6 FUI (Futuristic UI) Themes** - Blueprint, Cyberpunk, Navigator, Phosphor, Holographic, Infrared
- **Code Syntax Highlighting** - Complete `--code-*` variables for all 18 themes
- **Extended Chart Colors** - `chart-6` through `chart-9` added to all themes
- **Style Guide Template** - Comprehensive design system reference in `/library`

### Changed
- All 18 themes now pass WCAG AA accessibility audit
- FUI theme border contrast improved (3:1 minimum for UI components)
- Code comment contrast fixed for readability in dark themes
- Chart color duplicates removed from `:root` theme

### Fixed
- Blueprint theme border: 45% → 55% for WCAG 3:1
- Cyberpunk theme border: 25% → 38% for WCAG 3:1
- Navigator theme border: 30% → 36% for WCAG 3:1
- Phosphor theme border: 25% → 35% for WCAG 3:1
- Holographic theme border: 35% → 40% for WCAG 3:1
- Red theme code comments: 40% → 50% for readability
- Infrared theme code comments: 35% → 28% for contrast

---

## [1.0.1] - 2025-12-25

### Changed
- **Dynamic Border Radius System** - Components now use `mode.radius` which maps to CSS `var(--radius)`, allowing themes to control border radius dynamically
- All 78+ UI components updated to use `mode.radius` instead of hardcoded `rounded-none`
- Design system documentation comprehensively updated across 18+ files

### Fixed
- Calendar component layout and centering issues
- ScrollArea radius applied to correct element (outer container)
- InputOTP spacing when rounded
- Progress bar height and radius support
- Table headers no longer break when themes use rounded corners

### Removed
- Sticky CTA bar from landing pages (component retained for optional use)

### Documentation
- Updated CLAUDE.md, README.md, GEMINI.md with new radius rules
- Updated all component specs in `docs/design-system/spec/`
- Updated COMPONENT-AUTHORING.md, COMPONENT-BEST-PRACTICES.md
- Updated CUSTOMIZATION-GUIDE.md, FABRK_STYLE_GUIDE.md, TOKEN-REFERENCE.md

---

## [1.0.0] - 2025-12-14

### Initial Release

Fabrk is a terminal-first SaaS boilerplate built with Next.js 16, featuring a unique retro terminal aesthetic with sharp edges, monospace typography, and OKLCH color system.

### Design System
- 12 terminal themes (5 CRT phosphor, 6 retro computer, 1 light)
- OKLCH color system with WCAG 2.2 AA compliance
- Terminal aesthetic: sharp corners, monospace fonts, structured layouts
- Complete semantic token system
- Runtime theme switching with localStorage persistence

### Components & Templates
- 77 UI components in `src/components/ui/`
- 40 copy-paste page templates in `/library`
- 143 documentation pages in `/docs`

### Authentication
- NextAuth v5 with JWT sessions
- OAuth providers: Google, GitHub
- Magic link authentication
- Two-factor authentication (2FA)
- Role-based access control

### Payments
- Stripe integration with webhooks
- Polar.sh integration
- Lemonsqueezy integration
- Subscription management
- AI credits system

### Backend
- PostgreSQL with Prisma ORM
- 16 API route modules
- Zod schema validation
- Background jobs ready (Inngest)
- Real-time ready (Pusher)

### Developer Experience
- TypeScript strict mode
- ESLint with design system rules
- Husky pre-commit hooks
- `npm run scan:hex` color detection
- Hot module replacement

### Security
- CSRF protection
- Rate limiting
- Security headers
- API key management
- Webhook signature verification

### Documentation
- CLAUDE.md for AI-assisted development
- Design system specification
- Customization checklist
- Component authoring guide

---

**Built with Claude Code**
