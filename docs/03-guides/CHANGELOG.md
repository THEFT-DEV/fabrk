# Changelog

All notable changes to Fabrk will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-11-27 - Security & Billing Update 🔐

### Added

#### Two-Factor Authentication (2FA)
- TOTP-based multi-factor authentication
- QR code setup with authenticator app support
- Manual secret key entry option
- 10 backup codes (XXXX-XXXX format) for account recovery
- Security settings page integration
- Audit logging for MFA events

#### Trial Period System
- Stripe subscription trial checkout flow
- Configurable trial duration (`config.features.trialDays`)
- Trial banner with days remaining
- Urgency states as expiration approaches
- Duplicate trial prevention per user
- Automatic upgrade CTA on expiration

#### Cloud Storage
- Auto-detection: Cloudflare R2 → AWS S3 → Local storage
- File validation (size, MIME type)
- Signed URLs for private files
- Organization-level access control
- Image optimization support (requires sharp)

#### Test Coverage
- Unit tests for MFA, Trial, Storage, CSRF modules
- E2E tests for 2FA flow, Cookie Consent, Trial, File Upload
- 80+ new test cases

### Changed
- Cookie consent hydration fix (combined state pattern)
- CSRF protection now Edge Runtime compatible
- Improved accessibility (modal keyboard handling)

### Fixed
- Cookie consent hydration mismatch errors
- Missing NextAuth route handler
- ESLint warnings in layout and uploads

---

## [1.0.0] - 2025-11-06 - LAUNCH READY 🚀

### Initial Release

Fabrk v1.0.0 is a production-ready Next.js 15 SaaS boilerplate with authentication, payments, database, and email built-in. **78+ components** in **161 essential files**.

---

### ✨ Features

#### Core Stack
- **Next.js 15** with App Router and Server Components
- **TypeScript** strict mode throughout
- **PostgreSQL** + Prisma ORM (type-safe queries)
- **NextAuth v5** (Credentials + Google OAuth)
- **Stripe** (checkout, webhooks, customer portal)
- **Resend** (transactional emails)
- **Radix UI** (23 accessible components)
- **TanStack Table v8** (data tables)
- **Tailwind CSS** + next-themes

#### Components (87+)
- 78 UI components (Button, Card, Input, Dialog, etc.)
- 11 Landing page components (3 hero variations, 2 pricing variations)
- 10 Dashboard components (admin, analytics, user profile)
- 9 Auth & Account components
- 6 Settings components
- 5 Email templates
- 3 Chart components
- 3 Error pages (404, 500, Maintenance)
- 3 Legal pages (Terms, Privacy, Refund - EU/GDPR compliant)
- 4 Theme components

#### Landing Page
- **3 Hero Variations:**
  - Centered hero (default)
  - Split-screen hero
  - Video background hero
- **2 Pricing Layouts:**
  - Pricing cards (default)
  - Comparison table
- Features section (benefit-focused)
- FAQ section (8 competitive questions)
- Comparison section (vs DIY, ShipFast, Supastarter)
- Tech stack showcase
- Navigation & Footer

#### Dashboard
- Usage limits tracker
- Tier badge & purchase status
- License card & billing overview
- Stats cards
- **Admin panel example** (data table with 12 users)
- **Analytics dashboard example** (metrics, activity, top pages)
- **User profile example** (profile, projects, activity)

#### Data & Tables
- **Data Table Component** (TanStack Table v8)
  - Sortable columns (asc/desc/none)
  - Filterable rows (global search)
  - Paginated (78/78/78/78 rows per page)
  - Row selection (checkboxes)
  - Empty & loading states
  - Mobile responsive (horizontal scroll)
  - Neobrutalism styling

#### Authentication
- Email/password with bcrypt hashing
- Google OAuth integration
- Email verification (24-hour expiry)
- Password reset (1-hour expiry)
- Session management (JWT, 30-day expiry)
- Protected routes (middleware)

#### Payments (Stripe)
- Checkout session creation
- Webhook event handling
- Customer portal integration
- Payment records (database)
- Idempotency (prevents duplicate charges)
- Support for one-time & subscriptions

#### Email System
- 5 transactional email templates:
  - Welcome email (after purchase)
  - Email verification
  - Password reset
  - Purchase confirmation
  - Subscription update
- Inline CSS (email client compatible)
- Mobile responsive
- Purple branding

#### Legal & Compliance
- **Terms of Service** (EU consumer rights, unlimited projects, lifetime v1.x updates)
- **Privacy Policy** (GDPR-compliant, data minimization, user rights)
- **Refund Policy** (30-day money-back guarantee)
- All pages mobile responsive

#### Error Handling
- 404 Not Found page
- 500 Server Error page
- Maintenance Mode page
- User-friendly messaging
- Support contact links

---

### 📚 Documentation (50KB)

#### Technical Guides
- **QUICK-START.md** - 5-minute local setup guide
- **DEPLOYMENT.md** - Production deployment for Vercel
- **CLAUDE.md** - Architecture reference and patterns
- **COMPONENT-SHOWCASE.md** - Testing guide and component reference

#### Marketing Materials
- **MARKETING.md** - Comprehensive launch strategy (17KB)
- **PRODUCT-HUNT.md** - Launch copy (ready to paste)
- **LANDING-PAGE-VARIATIONS.md** - Component usage guide (16KB)

#### Project Status
- **LAUNCH-STATUS.md** - Complete progress tracker
- **README.md** - Enhanced with comparison tables

---

### 🎨 Design System

- **Style:** Neobrutalism (bold shadows, thick borders, purple theme)
- **Primary Color:** #007AFF (Purple/Blue)
- **Shadows:** 2px/4px/8px brutal shadows
- **Borders:** 2px/4px black borders
- **Typography:** System fonts for performance
- **Responsive:** Mobile-first breakpoints
- **Dark Mode:** Built-in with next-themes

---

### 🛠️ Developer Experience

- **Barrel Exports** - Clean imports for landing components and emails
- **Variations Showcase** - `/variations` page to preview all hero/pricing layouts
- **Alternative Layouts** - `/landing-alt` page with comparison section
- **TypeScript Strict** - No `any` types, full type safety
- **Path Aliases** - `@/*` for clean imports
- **ESLint** - Code quality enforcement
- **Prisma Studio** - Visual database management

---

### 📦 Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation
npm run db:push          # Push Prisma schema to database
npm run db:studio        # Open Prisma Studio GUI
npm run stripe:listen    # Listen to Stripe webhooks locally
```

---

### 💰 Pricing & Value

**Launch Price:** $79 (one-time payment)

**Competitive Positioning:**
- 60% cheaper than ShipFast ($199)
- 77% cheaper than Supastarter ($349)
- Saves 31-46 hours vs DIY

**What's Included:**
- 87+ production-ready components
- Complete source code (TypeScript strict)
- Lifetime updates for v1.x
- Unlimited projects (personal + commercial)
- No attribution required
- Email support (support@fabrk.dev)
- 30-day money-back guarantee
- Comprehensive documentation

---

### 🚀 Launch Highlights

#### Anti-Bloat Philosophy
- **161 essential files** (not 1000+)
- Clean, readable TypeScript
- No magic abstractions
- Standard Next.js patterns

#### Latest Stack
- Next.js 15 (competitors on 78/78)
- NextAuth v5 (competitors on v4)
- React 19 ready
- Turbopack in dev mode

#### Time Savings
- 3-4 weeks of dev work → 3 hours of setup
- Auth, payments, database, emails all configured
- Production-ready security & error handling
- Best practices baked in

---

### 📝 Known Limitations

- No multi-tenancy (add if needed)
- No MFA (add if needed)
- No audit logs (add if needed)
- No advanced analytics (placeholder provided)
- No queue system for emails (sends directly via Resend)
- No subscription model in database schema (Payment records only)

These are intentional design decisions to keep the boilerplate minimal and essential-only. Add complexity as your SaaS requires it.

---

### 🔒 Security

- bcrypt password hashing (12 rounds)
- JWT session tokens (30-day expiry)
- CSRF protection (NextAuth)
- Stripe webhook signature verification
- Environment variable validation
- TypeScript strict mode
- Security headers configured

---

### 🌍 Compliance

- **EU/GDPR Ready** - Privacy policy, data minimization, user rights
- **30-Day Money-Back Guarantee** - No questions asked
- **Refund Policy** - 5-7 business day processing
- **Terms of Service** - Unlimited projects, lifetime v1.x updates

---

### 📊 Statistics

- **78+ components** (exceeds 80+ target)
- **161 files** (essential-only)
- **50KB documentation** (8 comprehensive guides)
- **5 email templates** (transactional)
- **3 hero variations** (choose your style)
- **2 pricing layouts** (cards or comparison table)
- **3 dashboard examples** (admin, analytics, profile)
- **3 legal pages** (EU/GDPR compliant)
- **100% TypeScript** (strict mode)

---

### 🎯 Target Audience

- Indie hackers building their first SaaS
- Solo developers who want to ship fast
- First-time founders with technical background
- Developers tired of 1000-file boilerplates
- Small agencies building client SaaS products

---

### 🆚 Competitive Advantages

**vs ShipFast ($199):**
- ✅ TypeScript (they have JavaScript only)
- ✅ PostgreSQL (they have MongoDB only)
- ✅ Next.js 15 (they have 78/78)
- ✅ 60% cheaper ($79 vs $199)
- ✅ Open source code

**vs Supastarter ($349):**
- ✅ 77% cheaper ($79 vs $349)
- ✅ 161 files vs 800+ (less bloat)
- ✅ Next.js 15 (they have 14)
- ✅ Essential-only approach

**vs DIY:**
- ✅ Save 31-46 hours of dev time
- ✅ Best practices baked in
- ✅ Production-ready security
- ✅ Get to unique features 10x faster

---

### 🔗 Links

- **Website:** https://fabrk.dev
- **GitHub:** https://github.com/yourusername/fabrk
- **Support:** support@fabrk.dev
- **Documentation:** /docs

---

## [Unreleased]

### Planned for v1.1.0
- [ ] Command palette (Cmd+K)
- [ ] Calendar component
- [ ] File upload component
- [ ] Rich text editor (Tiptap)
- [ ] Subscription model in database schema
- [ ] Video tutorials (30+ videos)

### Planned for v2.0.0 (Major)
- [ ] Multi-tenancy support
- [ ] Role-based access control (RBAC)
- [ ] Advanced analytics dashboard
- [ ] Webhooks system
- [ ] API rate limiting (production-ready)
- [ ] Queue system for emails
- [ ] Audit logs

---

## Version History

- **v1.0.0** (2025-11-06) - Initial launch-ready release

---

## Migration Guides

### v1.0.0 → v1.1.0 (Future)
Migration guide will be provided when v1.1.0 is released.

---

## Support

- **Email:** support@fabrk.dev
- **GitHub Issues:** https://github.com/yourusername/fabrk/issues

---

**Ready to launch? Ship your SaaS in hours, not weeks. 🚀**
