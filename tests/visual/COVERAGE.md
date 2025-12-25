# Visual Test Coverage Summary

This document provides a complete inventory of all pages tested by the visual regression test suite.

## Total Pages: 220+

## Coverage Breakdown

### Marketing Pages (13 pages)
**File:** `full-site.visual.spec.ts`

- `/` - Homepage
- `/about` - About page
- `/blog` - Blog index
- `/component-showcase` - Component showcase
- `/components` - Components overview
- `/contact` - Contact page
- `/demo` - Demo page
- `/features` - Features overview
- `/landing-alt` - Alternative landing
- `/maintenance` - Maintenance page
- `/pricing` - Pricing page
- `/success` - Success page
- `/library` - Templates overview

### Legal Pages (4 pages)
**File:** `full-site.visual.spec.ts`

- `/cookies` - Cookie policy
- `/privacy` - Privacy policy
- `/refund` - Refund policy
- `/terms` - Terms of service

### Dashboard Pages (17 pages - SKIPPED)
**File:** `full-site.visual.spec.ts`

**Status:** Requires authentication - tests are skipped with `.skip`

To enable:
1. Set up auth state using `storageState`
2. Create global setup file
3. Remove `.skip` from tests

Pages:
- `/account` - Account settings
- `/admin` - Admin dashboard
- `/admin/analytics` - Admin analytics
- `/admin/audit-log` - Audit log
- `/admin/feature-flags-db` - Feature flags
- `/admin/monitoring` - System monitoring
- `/admin/security` - Security settings
- `/admin/users` - User management
- `/billing/invoices` - Billing invoices
- `/billing/payment-methods` - Payment methods
- `/dashboard` - Main dashboard
- `/developer/api-keys` - API keys management
- `/examples/admin` - Admin example
- `/examples/analytics` - Analytics example
- `/examples/user-profile` - User profile example
- `/organizations/new` - Create organization
- `/profile` - User profile
- `/settings` - General settings
- `/settings/security` - Security settings

### Docs - Main Pages (2 pages)
**File:** `full-site.visual.spec.ts`

- `/docs` - Documentation home
- `/docs/getting-started` - Getting started guide

### Docs - Launch (1 page)
**File:** `full-site.visual.spec.ts`

- `/docs/launch/checklist` - Launch checklist

### Docs - Components (99 pages)
**File:** `docs-components.visual.spec.ts`

- `/docs/components/overview` - Components overview
- `/docs/components/accordion` - Accordion component
- `/docs/components/activity-timeline` - Activity timeline
- `/docs/components/alert` - Alert component
- `/docs/components/alert-dialog` - Alert dialog
- `/docs/components/aspect-ratio` - Aspect ratio
- `/docs/components/autocomplete` - Autocomplete
- `/docs/components/avatar` - Avatar component
- `/docs/components/avatar-group` - Avatar group
- `/docs/components/badge` - Badge component
- `/docs/components/banner` - Banner component
- `/docs/components/breadcrumb` - Breadcrumb
- `/docs/components/button` - Button component
- `/docs/components/calendar` - Calendar component
- `/docs/components/card` - Card component
- `/docs/components/checkbox` - Checkbox component
- `/docs/components/code-block` - Code block
- `/docs/components/code-generator` - Code generator
- `/docs/components/collapsible` - Collapsible
- `/docs/components/color-picker` - Color picker
- `/docs/components/combobox` - Combobox
- `/docs/components/command` - Command palette
- `/docs/components/container` - Container
- `/docs/components/context-menu` - Context menu
- `/docs/components/copy-button` - Copy button
- `/docs/components/cropper` - Image cropper
- `/docs/components/cropper-controls` - Cropper controls
- `/docs/components/data-table-header` - Data table header
- `/docs/components/date-picker` - Date picker
- `/docs/components/dialog` - Dialog component
- `/docs/components/donut-chart` - Donut chart
- `/docs/components/dropdown-menu` - Dropdown menu
- `/docs/components/empty-state` - Empty state
- `/docs/components/faq` - FAQ component
- `/docs/components/features` - Features component
- `/docs/components/field` - Form field
- `/docs/components/file-upload` - File upload
- `/docs/components/footer` - Footer component
- `/docs/components/form` - Form component
- `/docs/components/form-error` - Form error
- `/docs/components/funnel-chart` - Funnel chart
- `/docs/components/gauge` - Gauge chart
- `/docs/components/grid` - Grid layout
- `/docs/components/heatmap` - Heatmap chart
- `/docs/components/hero` - Hero section
- `/docs/components/hover-card` - Hover card
- `/docs/components/image-dropzone` - Image dropzone
- `/docs/components/image-uploader` - Image uploader
- `/docs/components/input` - Input component
- `/docs/components/input-group` - Input group
- `/docs/components/input-number` - Number input
- `/docs/components/input-otp` - OTP input
- `/docs/components/input-password` - Password input
- `/docs/components/input-search` - Search input
- `/docs/components/invite-form` - Invite form
- `/docs/components/kpi-card` - KPI card
- `/docs/components/label` - Label component
- `/docs/components/lightbox` - Lightbox
- `/docs/components/loading` - Loading component
- `/docs/components/markdown-editor` - Markdown editor
- `/docs/components/markdown-viewer` - Markdown viewer
- `/docs/components/member-card` - Member card
- `/docs/components/menubar` - Menubar
- `/docs/components/multi-select` - Multi-select
- `/docs/components/multi-step-form` - Multi-step form
- `/docs/components/navigation` - Navigation
- `/docs/components/navigation-menu` - Navigation menu
- `/docs/components/notification-badge` - Notification badge
- `/docs/components/notification-center` - Notification center
- `/docs/components/notification-list` - Notification list
- `/docs/components/overview` - Overview component
- `/docs/components/page-wrapper` - Page wrapper
- `/docs/components/pagination` - Pagination
- `/docs/components/password-strength` - Password strength
- `/docs/components/pie-chart` - Pie chart
- `/docs/components/popover` - Popover
- `/docs/components/pricing` - Pricing component
- `/docs/components/progress` - Progress bar
- `/docs/components/prompt-builder` - Prompt builder
- `/docs/components/radio-group` - Radio group
- `/docs/components/rating` - Rating component
- `/docs/components/rich-text-editor` - Rich text editor
- `/docs/components/role-selector` - Role selector
- `/docs/components/scroll-area` - Scroll area
- `/docs/components/section` - Section component
- `/docs/components/select` - Select component
- `/docs/components/separator` - Separator
- `/docs/components/sheet` - Sheet component
- `/docs/components/sidebar` - Sidebar
- `/docs/components/simple-icon` - Simple icon
- `/docs/components/skeleton` - Skeleton loader
- `/docs/components/slider` - Slider component
- `/docs/components/sparkline` - Sparkline chart
- `/docs/components/stack` - Stack layout
- `/docs/components/stat-card` - Stat card
- `/docs/components/status-indicator` - Status indicator
- `/docs/components/switch` - Switch component
- `/docs/components/table` - Table component
- `/docs/components/tabs` - Tabs component
- `/docs/components/testimonials` - Testimonials
- `/docs/components/textarea` - Textarea component
- `/docs/components/time-picker` - Time picker
- `/docs/components/toast` - Toast notification
- `/docs/components/toaster` - Toaster container
- `/docs/components/tooltip` - Tooltip component
- `/docs/components/typography` - Typography

### Docs - Features (23 pages)
**File:** `docs-features.visual.spec.ts`

- `/docs/features/organizations` - Organizations
- `/docs/features/database` - Database setup
- `/docs/features/polar` - Polar.sh integration
- `/docs/features/payments` - Payment processing
- `/docs/features/lemonsqueezy` - LemonSqueezy
- `/docs/features/trial` - Trial periods
- `/docs/features/emails` - Email system
- `/docs/features/feature-flags` - Feature flags
- `/docs/features/google-oauth` - Google OAuth
- `/docs/features/background-jobs` - Background jobs
- `/docs/features/api-keys` - API keys
- `/docs/features/mfa` - Multi-factor auth
- `/docs/features/blog` - Blog system
- `/docs/features/realtime` - Real-time features
- `/docs/features/cloud-storage` - Cloud storage
- `/docs/features/cookie-consent` - Cookie consent
- `/docs/features/magic-links` - Magic links
- `/docs/features/i18n` - Internationalization
- `/docs/features/seo` - SEO optimization
- `/docs/features/webhooks` - Webhooks
- `/docs/features/impersonation` - User impersonation
- `/docs/features/notifications` - Notifications
- `/docs/features/analytics` - Analytics

### Docs - Security (6 pages)
**File:** `docs-features.visual.spec.ts`

- `/docs/security/csrf` - CSRF protection
- `/docs/security/headers` - Security headers
- `/docs/security/bot-protection` - Bot protection
- `/docs/security/rate-limiting` - Rate limiting
- `/docs/security/audit-logging` - Audit logging
- `/docs/security/validation` - Input validation

### Docs - Tutorials (8 pages)
**File:** `docs-features.visual.spec.ts`

- `/docs/tutorials/quick-start` - Quick start guide
- `/docs/tutorials/authentication` - Authentication setup
- `/docs/tutorials/protected-pages` - Protected pages
- `/docs/tutorials/api-routes` - API routes
- `/docs/tutorials/stripe-payments` - Stripe payments
- `/docs/tutorials/file-uploads` - File uploads
- `/docs/tutorials/email-templates` - Email templates
- `/docs/tutorials/webhooks` - Webhooks tutorial

### Docs - Deployment (3 pages)
**File:** `docs-features.visual.spec.ts`

- `/docs/deployment/vercel` - Vercel deployment
- `/docs/deployment/environment` - Environment setup
- `/docs/deployment/database` - Database deployment

### Docs - Extras (2 pages)
**File:** `docs-features.visual.spec.ts`

- `/docs/extras/testing` - Testing guide
- `/docs/extras/theming` - Theming guide

### Templates (24 pages)
**File:** `templates-full.visual.spec.ts`

- `/library/admin-panels` - Admin panel templates
- `/library/documentation` - Documentation templates
- `/library/security-privacy` - Security/privacy templates
- `/library/search-results` - Search results
- `/library/pricing-page` - Pricing page templates
- `/library/billing-dashboard` - Billing dashboard
- `/library/email-templates` - Email templates
- `/library/chart-library` - Chart library
- `/library/modals` - Modal templates
- `/library/account-pages` - Account pages
- `/library/landing-variations` - Landing variations
- `/library/blog` - Blog templates
- `/library/error-pages` - Error pages
- `/library/profile` - Profile templates
- `/library/dashboards` - Dashboard templates
- `/library/marketing` - Marketing templates
- `/library/settings-page` - Settings page
- `/library/analytics-dashboard` - Analytics dashboard
- `/library/user-management` - User management
- `/library/team-dashboard` - Team dashboard
- `/library/empty-states` - Empty states
- `/library/authentication` - Authentication templates
- `/library/notifications` - Notification templates
- `/library/onboarding` - Onboarding templates

## Site-wide Validation Tests

**File:** `site-wide-validation.spec.ts`

These tests run against sampled pages (every 10th, 15th, 20th, etc.) to validate:

### Terminal Aesthetic Checks
- ✅ No banned rounded classes (`rounded-sm/md/lg/xl`)
- ✅ No hardcoded hex colors (`#fff`, `#000`, etc.)
- ✅ No arbitrary color classes (`bg-[#...]`)
- ✅ Font-mono usage verification
- ✅ Design token compliance

### Accessibility Checks
- ✅ Main landmark present
- ✅ H1 heading hierarchy
- ✅ Images have alt text
- ✅ Buttons have accessible names
- ✅ Links have accessible text
- ✅ Form inputs have labels

### Performance Checks
- ✅ DOM interactive time < 5s
- ✅ Cumulative Layout Shift (CLS) < 0.25
- ✅ No horizontal scroll on mobile
- ✅ Charts render properly

### Console Error Checks
- ✅ No JavaScript errors
- ✅ No React warnings
- ✅ No failed network requests

### Responsive Checks
Tested on:
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (1920x1080)

Critical pages tested:
- Homepage
- Docs
- Templates
- Pricing
- Component pages

## Test Commands

```bash
# Run all visual tests
npm run test:visual

# Run specific category
npx playwright test tests/visual/full-site.visual.spec.ts
npx playwright test tests/visual/docs-components.visual.spec.ts
npx playwright test tests/visual/docs-features.visual.spec.ts
npx playwright test tests/visual/library-full.visual.spec.ts
npx playwright test tests/visual/site-wide-validation.spec.ts

# Update snapshots (after intentional changes)
npm run test:visual:update

# View test report
npm run test:visual:report
```

## Snapshot Coverage

- **Marketing:** 13 snapshots
- **Legal:** 4 snapshots
- **Docs Main:** 2 snapshots
- **Docs Launch:** 1 snapshot
- **Docs Components:** 99 snapshots
- **Docs Features:** 23 snapshots
- **Docs Security:** 6 snapshots
- **Docs Tutorials:** 8 snapshots
- **Docs Deployment:** 3 snapshots
- **Docs Extras:** 2 snapshots
- **Templates:** 24 snapshots
- **Responsive (mobile/tablet/desktop):** ~15 additional snapshots
- **Terminal validation:** Visual checks only (no snapshots)
- **Site-wide validation:** Sampled checks (no snapshots)

**Total Snapshots:** ~200 baseline images

## Not Tested

The following are excluded from visual tests:

1. **Dashboard pages** (require authentication)
   - 17 pages total
   - Can be enabled with auth setup

2. **Dynamic routes** (need specific IDs)
   - `/blog/[slug]`
   - `/docs/blog/[slug]`
   - `/organizations/[slug]/*`

3. **API routes**
   - `/api/*` (backend only)

4. **Auth pages** (handled by NextAuth)
   - `/api/auth/*`

## Future Enhancements

1. **Auth testing**
   - Set up `storageState` for dashboard pages
   - Create global setup for authentication

2. **Dynamic route testing**
   - Seed database with test content
   - Test sample blog posts and organization pages

3. **Cross-browser testing**
   - Enable Firefox and WebKit in playwright.config.ts
   - Validate consistency across browsers

4. **Performance budgets**
   - Set strict thresholds for Core Web Vitals
   - Fail tests if performance degrades

5. **Visual diff threshold tuning**
   - Adjust `maxDiffPixels` per component type
   - Stricter thresholds for static pages

6. **Snapshot compression**
   - Use Playwright's built-in compression
   - Store snapshots in git LFS for large repos
