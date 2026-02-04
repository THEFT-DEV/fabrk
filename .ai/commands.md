# Development Commands Reference

Complete reference for all development commands in this project.

> For detailed documentation, see [docs/12-ai-development/](../docs/12-ai-development/README.md)

---

## Quick Start

```bash
npm run setup              # Interactive setup wizard (database, payments, email, themes)
npm run dev                # Start development server (auto-kills port 3000)
npm run build              # Production build
```

---

## Code Quality

### TypeScript & Linting

| Command | Description |
|---------|-------------|
| `npm run type-check` | TypeScript compilation check (no emit) |
| `npm run lint` | ESLint with flat config (includes design-system and AI rules) |
| `npm run lint:css` | Stylelint for CSS files |
| `npm run lint:css:fix` | Stylelint with auto-fix |
| `npm run lint:all` | Run both ESLint and Stylelint |
| `npm run format` | Prettier format all files |
| `npm run format:check` | Check formatting without changes |

### AI Development Validation

| Command | Description |
|---------|-------------|
| `npm run ai:validate` | Security, design tokens, and type safety checks |
| `npm run ai:lint` | AI-specific best practices linting |
| `npm run ai:security` | Security vulnerability scanning |
| `npm run ai:cost-report` | API cost analysis (requires database) |
| `npm run ai:pre-deploy` | All checks combined (run before deployment) |

### Design System

| Command | Description |
|---------|-------------|
| `npm run design:lint` | Check for design system violations |
| `npm run design:lint:ci` | Design lint with JSON output (for CI) |
| `npm run validate:themes` | Validate theme token definitions |

---

## AI Validation Details

### `npm run ai:validate`

Checks for common AI-generated code issues:

**Security**
- `eval()` usage
- `innerHTML` assignments
- XSS vectors
- Hardcoded secrets/API keys

**Design System**
- Hardcoded colors (hex, rgb, hsl)
- Arbitrary Tailwind values (`p-[13px]`)
- Inline styles instead of design tokens

**Type Safety**
- `any` types
- `@ts-ignore` comments
- Non-null assertions (`!`)

### `npm run ai:lint`

AI-specific best practices:
- Cost tracking usage in AI calls
- API response type definitions
- AppError usage for error handling
- Budget checks before AI API calls
- Feature name requirements for tracking

### `npm run ai:security`

Security vulnerability scanning:
- SQL injection patterns
- Hardcoded credentials
- Unsafe redirects
- Missing input validation
- Command injection risks

---

## Database

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed database with test data |
| `npm run db:reset` | Reset database and reseed |
| `npm run db:migrate` | Run Prisma migrations (dev) |

---

## Testing

### Unit Tests (Vitest)

| Command | Description |
|---------|-------------|
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ui` | Open Vitest UI |

### E2E Tests (Playwright)

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run test:e2e:headed` | Run E2E tests in headed browser |
| `npm run test:e2e:debug` | Run E2E tests in debug mode |
| `npm run test:all` | Run all tests (unit + E2E) |

### Accessibility Tests

| Command | Description |
|---------|-------------|
| `npm run test:a11y` | Run accessibility tests |
| `npm run test:a11y:ui` | A11y tests with Playwright UI |
| `npm run test:a11y:headed` | A11y tests in headed browser |
| `npm run test:a11y:report` | Run and open A11y report |

### Visual Regression Tests

| Command | Description |
|---------|-------------|
| `npm run test:visual` | Run visual regression tests |
| `npm run test:visual:update` | Update visual snapshots |
| `npm run test:visual:report` | Show visual test report |

---

## Build & Deploy

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (prisma generate + next build) |
| `npm run build:prod` | Full production build with migrations |
| `npm run start` | Start production server |
| `npm run analyze` | Build with bundle analyzer |

---

## Validation & Utilities

| Command | Description |
|---------|-------------|
| `npm run validate:templates` | Validate template inventory |
| `npm run validate:webhooks` | Validate webhook endpoints |
| `npm run validate:themes` | Validate theme tokens |
| `npm run update-markdown-counts` | Update component counts in docs |

---

## Development Utilities

| Command | Description |
|---------|-------------|
| `npm run dev:restart` | Restart dev server |
| `npm run stripe:listen` | Forward Stripe webhooks to localhost |
| `npm run docs:api` | Generate API documentation |
| `npm run docs:serve` | Serve API documentation |
| `npm run lighthouse:ci` | Run Lighthouse CI |

---

## Sync Commands

| Command | Description |
|---------|-------------|
| `npm run sync:official` | Sync to official repository |
| `npm run sync:official:dry` | Dry run sync (preview changes) |
| `npm run sync:changelog` | Sync changelog |

---

## Pre-Commit Hooks

Git commits automatically run via Husky + lint-staged:

1. `npm run type-check` - TypeScript compilation
2. `lint-staged` on staged files:
   - ESLint + auto-fix
   - Prettier formatting

**Bypass (emergency only):** `git commit --no-verify`

---

## Recommended Workflows

### Before Committing

```bash
npm run type-check && npm run lint
```

### Before Creating PR

```bash
npm run ai:pre-deploy
```

### Full Validation

```bash
npm run type-check && npm run lint && npm run ai:validate && npm test
```

### After Schema Changes

```bash
npm run db:push && npm run type-check
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success (or warnings only) |
| 1 | Errors found |

All validation commands exit with code 1 if errors are found, allowing CI integration.
