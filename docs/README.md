# Fabrk Documentation

> Terminal-first SaaS boilerplate documentation

---

## Quick Start

| Goal | Start Here |
|------|------------|
| Get running in 1 hour | [QUICK-START.md](01-getting-started/QUICK-START.md) |
| Explore components | [/components](../src/app/(marketing)/components) |
| Deploy to production | [DEPLOYMENT.md](10-deployment/DEPLOYMENT.md) |
| Customize themes | [THEME-GUIDE.md](08-design/THEME-GUIDE.md) |

---

## Documentation Sections

### [01 - Getting Started](01-getting-started/)
Setup, installation, environment configuration, and troubleshooting.

- [QUICK-START.md](01-getting-started/QUICK-START.md) - Get up and running
- [COMPONENT-SHOWCASE.md](01-getting-started/COMPONENT-SHOWCASE.md) - Explore all 78+ components
- [DOCUMENTATION_INDEX.md](01-getting-started/DOCUMENTATION_INDEX.md) - Full documentation index

### [02 - Components](02-components/)
Component documentation, usage patterns, and examples.

- [CHARTS-GUIDE.md](02-components/CHARTS-GUIDE.md) - Recharts integration
- [LANDING-PAGE-VARIATIONS.md](02-components/LANDING-PAGE-VARIATIONS.md) - Landing page styles
- [chat-components/](02-components/chat-components/) - Chat and comment components

### [03 - Guides](03-guides/)
Feature implementation guides for common tasks.

- Stripe integration
- i18n setup
- Email configuration
- Authentication patterns

### [04 - Development](04-development/)
API documentation, testing guides, and development workflows.

- [API-REFERENCE.md](04-development/API-REFERENCE.md) - API documentation
- [TESTING-GUIDE.md](04-development/TESTING-GUIDE.md) - Testing with Vitest + Playwright
- [LIGHTHOUSE-CI.md](04-development/LIGHTHOUSE-CI.md) - Performance monitoring

### [06 - Features](06-features/)
Feature inventory and implementation details.

- [FEATURES-INVENTORY.md](06-features/FEATURES-INVENTORY.md) - Complete feature list

### [07 - Advanced](07-advanced/)
Security, performance, and advanced configuration.

- [SECURITY-BEST-PRACTICES.md](07-advanced/SECURITY-BEST-PRACTICES.md) - Security guidelines
- [PERFORMANCE-OPTIMIZATION.md](07-advanced/PERFORMANCE-OPTIMIZATION.md) - Performance tips

### [08 - Design System](08-design/)
Terminal-first design system documentation.

- [DESIGN_SYSTEM.md](08-design/DESIGN_SYSTEM.md) - Complete design system reference
- [THEME-GUIDE.md](08-design/THEME-GUIDE.md) - 12 OKLCH themes
- [TOKEN-REFERENCE.md](08-design/TOKEN-REFERENCE.md) - Design tokens

### [09 - Launch](09-launch/)
Launch preparation and checklists.

- [LAUNCH-CHECKLIST.md](09-launch/LAUNCH-CHECKLIST.md) - Pre-launch checklist
- [RELEASE-NOTES-v1.1.md](09-launch/RELEASE-NOTES-v1.1.md) - Latest release notes

### [10 - Deployment](10-deployment/)
Deployment guides for various platforms.

- [DEPLOYMENT.md](10-deployment/DEPLOYMENT.md) - Vercel deployment
- [PRODUCTION-DEPLOYMENT.md](10-deployment/PRODUCTION-DEPLOYMENT.md) - Production setup
- [ALTERNATIVE-DEPLOYMENTS.md](10-deployment/ALTERNATIVE-DEPLOYMENTS.md) - Other platforms

### [Design System Specs](design-system/spec/)
Component specifications and design tokens.

---

## By Use Case

### Building Your First Feature
1. [QUICK-START.md](01-getting-started/QUICK-START.md) - Setup
2. [COMPONENT-SHOWCASE.md](01-getting-started/COMPONENT-SHOWCASE.md) - Find components
3. [DESIGN_SYSTEM.md](08-design/DESIGN_SYSTEM.md) - Styling rules

### Customizing the Theme
1. [THEME-GUIDE.md](08-design/THEME-GUIDE.md) - Understanding themes
2. [TOKEN-REFERENCE.md](08-design/TOKEN-REFERENCE.md) - Token customization
3. [globals.css](../src/app/globals.css) - CSS variables

### Deploying to Production
1. [DEPLOYMENT.md](10-deployment/DEPLOYMENT.md) - Basic deployment
2. [PRODUCTION-DEPLOYMENT.md](10-deployment/PRODUCTION-DEPLOYMENT.md) - Production checklist
3. [SECURITY-BEST-PRACTICES.md](07-advanced/SECURITY-BEST-PRACTICES.md) - Security hardening

### Adding Payments
1. Check [03-guides/](03-guides/) for Stripe integration
2. Configure webhooks at `/api/webhooks/stripe`
3. Set up environment variables

---

## Quick Stats

| Metric | Value |
|--------|-------|
| Components | 77+ |
| Templates | 50+ |
| Themes | 12 |
| Documentation Files | 100+ |

---

## Need Help?

- **Component Examples**: Visit `/components` in your running app
- **Design System**: See [DESIGN_SYSTEM.md](08-design/DESIGN_SYSTEM.md)
- **GitHub Issues**: Report bugs and feature requests

---

Last Updated: December 2025
