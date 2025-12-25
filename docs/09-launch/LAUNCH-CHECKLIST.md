# Fabrk Launch Checklist

This checklist covers everything needed to launch Fabrk (the boilerplate product) to customers.

**Last Updated:** 2025-12-20

---

## 1. Pre-Launch Verification (The "Must Haves")

### Core Features
- [x] **Setup Wizard:** `npm run setup` works for all 5 templates (STARTER, SAAS, AI APP, MARKETPLACE, CUSTOM)
- [x] **Landing Page Templates:** All 5 page templates copy correctly
- [x] **78 UI Components:** All components verified in `/src/components/ui/`
- [x] **18 terminal themes:** All themes working with live switching
- [x] **Multi-Provider Payments:** Stripe, Polar.sh, Lemonsqueezy configured

### Code Quality & Security
- [x] **Type Safety:** TypeScript strict mode enabled (no `any` types)
- [x] **Linting:** ESLint passing with zero errors
- [x] **Dependencies:** `npm audit` check for critical vulnerabilities
- [x] **Pre-commit Hooks:** Husky + lint-staged configured
- [ ] **Tests:** Run `npm run test:all` (Target: 95%+ pass rate)
- [ ] **Build:** Verify `npm run build` succeeds without errors

### Documentation
- [x] **README.md:** Updated with setup wizard instructions
- [x] **QUICK-START.md:** Setup wizard flow documented
- [x] **COMPONENTS-INVENTORY.md:** 78+ components listed
- [x] **LICENSE.md:** Commercial license terms verified
- [x] **SECURITY.md:** Security policy and reporting contacts correct

### Legal & Business
- [x] **Pricing:** Confirmed $299 one-time price
- [x] **Support:** Support email `support@fabrk.dev` configured
- [x] **Terms:** License agreement ready for distribution

---

## 2. Payment Provider Setup

Choose ONE payment provider (Stripe recommended, but Polar.sh and Lemonsqueezy also supported).

### Option A: Stripe (Recommended)

**Product Configuration:**
- [ ] Create products in Stripe Dashboard
- [ ] Set one-time prices ($299)
- [ ] Copy Price IDs to `.env` (`NEXT_PUBLIC_STRIPE_PRICE_*`)

**Webhook Configuration:**
- [ ] Add `https://your-domain.com/api/webhooks/stripe` endpoint
- [ ] Select events: `checkout.session.completed`, `payment_intent.*`
- [ ] Copy Signing Secret to `.env` (`STRIPE_WEBHOOK_SECRET`)

### Option B: Polar.sh

**Configuration:**
- [ ] Create products in Polar Dashboard
- [ ] Add webhook: `https://your-domain.com/api/webhooks/polar`
- [ ] Copy access token to `.env` (`POLAR_ACCESS_TOKEN`)
- [ ] Copy webhook secret to `.env` (`POLAR_WEBHOOK_SECRET`)

### Option C: Lemonsqueezy

**Configuration:**
- [ ] Create products in Lemonsqueezy Dashboard
- [ ] Add webhook: `https://your-domain.com/api/webhooks/lemonsqueezy`
- [ ] Copy API key to `.env` (`LEMONSQUEEZY_API_KEY`)
- [ ] Copy webhook secret to `.env` (`LEMONSQUEEZY_WEBHOOK_SECRET`)

### Webhook Validation
- [ ] Run `npm run validate:webhooks` to verify all endpoints exist

---

## 3. Auto-Distribution Automation

### GitHub Access
- [ ] **Token:** Generate GitHub Personal Access Token (Classic) with `repo` and `admin:org` scopes.
- [ ] **Env Var:** Add token to `.env` as `GITHUB_ACCESS_TOKEN`.
- [ ] **Repo Owner:** Set `GITHUB_REPO_OWNER` in `.env`.
- [ ] **Repo Name:** Set `GITHUB_REPO_NAME` in `.env`.

### Automation Workflow
- [ ] **Job Worker:** Verify background job worker is running (`npm run worker` or similar).
- [ ] **Test Grant:** Manually trigger `github.access_grant` job for a test user.
- [ ] **Verify Access:** Check if test user was added as a collaborator to the private repo.

---

## 4. Marketing Assets & Videos

### Video 1: "The Pitch" (30-60s)
- [ ] **Script:** "Stop building auth. Stop building payments. Start building your SaaS."
- [ ] **Visuals:** Fast cuts of Dashboard, Stripe integration, Email templates.
- [ ] **Call to Action:** "Get Fabrk today."
- [ ] **Distribution:** Twitter/X, LinkedIn, Hero Section.

### Video 2: "The Walkthrough" (3-5 mins)
- [ ] **Script:** Deep dive into the folder structure and key features.
- [ ] **Visuals:** Screen recording of VS Code, running `npm run dev`, making a quick change.
- [ ] **Goal:** Show developer experience (DX) is top-tier.
- [ ] **Distribution:** YouTube, Documentation.

### Video 3: "From Zero to Deploy" (Short)
- [ ] **Script:** Time-lapse of cloning repo -> deploying to Vercel.
- [ ] **Goal:** Prove speed to market.

---

## 5. Launch Day Execution

### Distribution Setup
- [ ] **GitHub Repo:** Create private repository for distribution
- [ ] **Access Control:** Verify invite system for new customers
- [ ] **Webhooks:** Test Stripe -> GitHub access automation
- [ ] **Welcome Email:** Verify "Welcome to Fabrk" email template

### Announcement
- [ ] **Product Hunt:** Schedule launch post
- [ ] **Social Media:** Prepare Twitter/LinkedIn threads
- [ ] **Communities:** Post in relevant subreddits/Discord servers

---

## 6. Post-Launch (First 48 Hours)

### Monitoring
- [ ] **Support:** Monitor `support@fabrk.dev` continuously
- [ ] **Stripe:** Watch for failed payments or disputes
- [ ] **GitHub:** Monitor repo access issues
- [ ] **Errors:** Check Sentry/Logs for unhandled exceptions.

### Feedback Loop
- [ ] **Bugs:** Triage critical bugs immediately
- [ ] **Feedback:** Collect feature requests in a central doc
- [ ] **Testimonials:** Ask happy early adopters for quotes

---

## 7. Rollback Plan

If critical issues arise (e.g., broken auth, payment failures):
1. **Pause Sales:** Disable Stripe checkout
2. **Notify:** Email affected customers immediately
3. **Fix:** Deploy hotfix to main distribution repo
4. **Compensate:** Offer refunds or extended support if necessary

---

## Useful Commands

```bash
# Run full test suite
npm run test:all

# Check for TODOs
grep -r "TODO" src/

# Verify build
npm run build

# Check types
npm run type-check

# Run background worker (for local testing)
npm run worker
```
