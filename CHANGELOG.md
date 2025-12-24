# Changelog

All notable changes to Fabrk will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
