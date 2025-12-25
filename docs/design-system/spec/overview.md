# Design System Specification: Overview

> A token-driven, themeable design system for modern SaaS applications.

**Version:** 2.0.0  
**Status:** FROZEN (Phase 1 Complete)  
**Last Updated:** 2025-12-06

---

## IMPORTANT: Design System Freeze

This specification is **FROZEN** as of Phase 1 completion. Any changes require explicit authorization in a "Design System Edit" phase.

**To propose changes:**

1. Add suggestions to `/design-system/proposed/` directory
2. Request a "Design System Edit" phase
3. Changes must be approved before implementation

---

## Philosophy

### 1. Token-Driven Architecture

Every visual decision flows from design tokens. Tokens are the single source of truth for:

- **Colors** - Semantic, role-based naming (not brand-specific)
- **Typography** - Scale, weights, line heights
- **Spacing** - Consistent rhythm based on 4px base unit
- **Radii** - Corner treatments from sharp to pill
- **Shadows** - Elevation levels for depth
- **Motion** - Durations and easing functions

**Why tokens?**

- Consistency at scale (78+ components)
- Theme switching without code changes
- Design-to-code handoff clarity
- Automated tooling (linting, validation)

### 2. Semantic Over Literal

Tokens use **semantic names** that describe purpose, not appearance:

```
GOOD (semantic - what it's for):
  color-bg-surface
  color-text-primary
  space-component-padding-md

BAD (literal - what it looks like):
  color-gray-100
  color-black
  space-16
```

This allows the same token to resolve to different values per theme.

### 3. Theme-Agnostic Core

The system supports multiple visual themes without changing component code:

| Theme        | Character                                | Use Case                      |
| ------------ | ---------------------------------------- | ----------------------------- |
| **Terminal** | Sharp edges, monospace, uppercase labels | Developer tools, CLI-inspired |
| **Modern**   | Subtle radii, clean sans-serif, minimal  | Linear/Vercel-style SaaS      |
| **Soft**     | Rounded corners, friendly typography     | Consumer-facing apps          |

Components reference semantic tokens; themes provide the values.

### 4. SaaS-Optimized Patterns

Built for the full SaaS surface area:

- **Landing pages** - Marketing, pricing, testimonials
- **Authentication** - Sign in, sign up, password reset
- **Dashboard** - Stats, tables, charts, activity feeds
- **Settings** - Forms, toggles, danger zones
- **Documentation** - Guides, API references, code blocks
- **Admin** - User management, audit logs, feature flags

---

## Naming Conventions

### Token Naming (CANONICAL)

**Format:** `{category}-{property}-{variant}`

| Category       | Format                        | Examples                                                      |
| -------------- | ----------------------------- | ------------------------------------------------------------- |
| **Colors**     | `color-{role}-{variant}`      | `color-bg-surface`, `color-text-muted`, `color-border-accent` |
| **Spacing**    | `space-{size}`                | `space-xs`, `space-md`, `space-xl`                            |
| **Typography** | `text-{property}-{variant}`   | `text-size-sm`, `text-weight-semibold`                        |
| **Radius**     | `radius-{size}`               | `radius-none`, `radius-md`, `radius-full`                     |
| **Shadow**     | `shadow-{size}`               | `shadow-none`, `shadow-md`, `shadow-xl`                       |
| **Motion**     | `motion-{property}-{variant}` | `motion-duration-fast`, `motion-ease-out`                     |

### Context-Specific Naming

| Context         | Format                      | Example              |
| --------------- | --------------------------- | -------------------- |
| CSS Variables   | `--{token-name}` kebab-case | `--color-bg-surface` |
| TypeScript      | camelCase                   | `colorBgSurface`     |
| Tailwind        | kebab-case                  | `bg-surface`         |
| Component Props | PascalCase enums            | `Variant.Primary`    |

### File Naming

| Type            | Convention     | Example                |
| --------------- | -------------- | ---------------------- |
| Spec files      | kebab-case.md  | `components-button.md` |
| Token files     | camelCase.ts   | `primitives.ts`        |
| Theme files     | camelCase.ts   | `terminal.ts`          |
| Component files | kebab-case.tsx | `button.tsx`           |

### Component Prop Conventions

| Type           | Convention             | Example                                   |
| -------------- | ---------------------- | ----------------------------------------- |
| Boolean        | `is*`, `has*`, `show*` | `isDisabled`, `hasIcon`                   |
| Variant        | Literal union          | `variant="primary" \| "secondary"`        |
| Size           | T-shirt sizing         | `size="sm" \| "md" \| "lg"`               |
| Tone           | Semantic meaning       | `tone="neutral" \| "danger" \| "success"` |
| Event handlers | `on*`                  | `onClick`, `onChange`                     |

---

## Token Architecture

### Three-Layer System

```
LAYER 3: COMPONENT TOKENS (optional)
├─ Component-specific decisions
├─ e.g., button-padding, card-radius
└─ Used when semantic tokens aren't specific enough

LAYER 2: SEMANTIC TOKENS (required)
├─ Role-based, theme-resolved
├─ e.g., color-bg-surface, color-text-primary
└─ What components reference

LAYER 1: PRIMITIVE TOKENS (foundation)
├─ Raw values, scale definitions
├─ e.g., gray-900, space-16, radius-4
└─ Themes select from these
```

### Token Resolution Flow

```
Component uses    → Semantic token      → Primitive value
────────────────────────────────────────────────────────
bg-surface        → color-bg-surface    → gray-50 (light)
                                        → gray-950 (dark)

radius-button     → radius-button       → none (terminal)
                                        → md (modern)
                                        → lg (soft)
```

---

## Theme System

### How Themes Work

1. **Primitives** define raw values (shared by all themes)
2. **Semantic tokens** are role-based names
3. **Themes** map semantic tokens to primitive values
4. **Components** only reference semantic tokens

### Theme Application

Themes are applied via:

1. **Data attribute** (runtime): `<html data-theme="terminal">`
2. **CSS class** (build-time): `.theme-terminal`
3. **Context** (React): `ThemeProvider`

### Available Themes

| Theme    | Radius | Font | Text Transform | Shadows   |
| -------- | ------ | ---- | -------------- | --------- |
| Terminal | `none` | mono | UPPERCASE      | minimal   |
| Modern   | `md`   | sans | normal         | subtle    |
| Soft     | `lg`   | sans | normal         | prominent |

---

## Design Principles

### 1. Clarity Over Cleverness

Every token name should be self-explanatory. When in doubt, be explicit.

### 2. Constraint Enables Creativity

Limited, intentional scales (spacing, typography) create visual harmony.

### 3. Accessibility First

All color combinations meet WCAG 2.1 AA. Touch targets are 44px minimum.

### 4. Progressive Enhancement

Core functionality works without JavaScript. Animations are bonus.

### 5. Performance Budget

Design decisions consider bundle size. Unused tokens are tree-shakeable.

---

## File Structure

```
design-system/
├── spec/                      # Specification (source of truth)
│   ├── overview.md            # This file
│   ├── foundations.md         # Token definitions
│   ├── tokens.json            # Machine-readable tokens
│   ├── themes.md              # Theme architecture
│   ├── components.md          # Component patterns
│   └── components-*.md        # Individual component specs
│
├── tokens/                    # TypeScript token exports
│   ├── primitives.ts          # Raw values
│   ├── semantic.ts            # Type definitions
│   └── index.ts               # Bundle export
│
├── themes/                    # Theme configurations
│   ├── terminal.ts            # Terminal theme
│   ├── modern.ts              # Modern theme
│   ├── soft.ts                # Soft theme
│   └── index.ts               # Theme registry
│
├── audit/                     # Audit reports
│   └── design-system-current.md
│
├── proposed/                  # Proposed changes (pending approval)
│   └── .gitkeep
│
└── index.ts                   # Main export (mode API)
```

---

## Specification Documents

| Document             | Purpose                        | Status |
| -------------------- | ------------------------------ | ------ |
| **overview.md**      | Philosophy, naming conventions | FROZEN |
| **foundations.md**   | Complete token definitions     | FROZEN |
| **tokens.json**      | Machine-readable token export  | FROZEN |
| **themes.md**        | Theme system architecture      | FROZEN |
| **components.md**    | Component patterns             | FROZEN |
| **components-\*.md** | Individual component specs     | FROZEN |

---

## Changelog

| Version | Date       | Changes                                           |
| ------- | ---------- | ------------------------------------------------- |
| 2.0.0   | 2025-12-06 | Phase 1 freeze, normalized naming, audit complete |
| 1.0.0   | 2025-12-01 | Initial specification                             |

---

_Specification Version 2.0.0 - FROZEN_
