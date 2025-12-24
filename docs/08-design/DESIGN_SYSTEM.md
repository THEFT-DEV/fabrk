# Fabrk Design System

Complete style guide documenting ALL design tokens, styles, and inconsistencies across the Fabrk codebase.

## 📚 Related Documentation

- **[Customization Guide](./CUSTOMIZATION-GUIDE.md)** - Change brand colors, create themes (15 min)
- **[Theme Guide](./THEME-GUIDE.md)** - Explore all 12 retro terminal themes
- **[Component Authoring](./COMPONENT-AUTHORING.md)** - Extend the design system safely
- **[Customization Checklist](../CUSTOMIZATION-CHECKLIST.md)** - Pre-launch customization steps
- **[Audit Reports](../../.archives/design-system/2025-12-12-final/)** - 78/78 design system audit (Dec 12, 2025)
- **[Token Reference](./TOKEN-REFERENCE.md)** - Complete CSS token documentation (98 tokens)

---

## Token Architecture Flow

How design tokens flow from CSS variables to Tailwind classes to components:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           globals.css                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  :root {                                                             │    │
│  │    --background: 5% 0.01 140;       ← OKLCH (lightness% chroma hue) │    │
│  │    --foreground: 82% 0.3 140;                                       │    │
│  │    --primary: 65% 0.28 140;                                         │    │
│  │    --border: 35% 0.18 140;                                          │    │
│  │    ...98 total tokens                                               │    │
│  │  }                                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  @theme {                                                            │    │
│  │    --color-background: oklch(var(--background));   ← Tailwind v4    │    │
│  │    --color-foreground: oklch(var(--foreground));     color mapping  │    │
│  │    --color-primary: oklch(var(--primary));                          │    │
│  │    ...                                                               │    │
│  │  }                                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Tailwind Utility Classes                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  bg-background  →  background-color: var(--color-background)        │    │
│  │  text-foreground → color: var(--color-foreground)                   │    │
│  │  border-primary → border-color: var(--color-primary)                │    │
│  │  text-success  →  color: var(--color-success)                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        design-system/index.ts                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  export const mode = {                                               │    │
│  │    radius: 'rounded-none',           ← Terminal aesthetic           │    │
│  │    font: 'font-mono',                                               │    │
│  │    color: {                                                          │    │
│  │      bg: { surface: 'bg-card', elevated: 'bg-popover' },            │    │
│  │      text: { muted: 'text-muted-foreground', accent: 'text-primary'}│    │
│  │      border: { default: 'border-border', accent: 'border-primary' } │    │
│  │    }                                                                 │    │
│  │  }                                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Components                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  import { mode } from '@/design-system';                             │    │
│  │                                                                      │    │
│  │  <Card className={cn(                                                │    │
│  │    mode.color.bg.surface,     // bg-card                            │    │
│  │    mode.color.border.default, // border-border                      │    │
│  │    mode.radius                // rounded-none                       │    │
│  │  )}>                                                                 │    │
│  │    <h1 className={mode.font}>TITLE</h1>                             │    │
│  │  </Card>                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Theme Switching

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   [data-theme=   │     │   [data-theme=   │     │   [data-theme=   │
│     'green']     │     │     'red']       │     │     'amber']     │
│                  │     │                  │     │                  │
│  --primary:      │     │  --primary:      │     │  --primary:      │
│  65% 0.28 140    │     │  40% 0.25 0      │     │  65% 0.24 75     │
│  (green)         │     │  (red)           │     │  (amber)         │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  Same Component Code:    │
                    │  <Button className=      │
                    │    "bg-primary">         │
                    │                          │
                    │  Renders different       │
                    │  colors per theme!       │
                    └──────────────────────────┘
```

---

## Design System Overview

This boilerplate has **TWO distinct design contexts**:

### 1. Base UI Components (`/src/components/ui/*`)
**Style: VANILLA / GENERIC** - Like DaisyUI, Shadcn, or Radix
- **Purpose**: Provide clean, customizable components for users
- **Philosophy**: NOT opinionated - users can easily theme/style
- **Borders**: `border border-border` (1px standard)
- **Radius**: `rounded-md` (standard), `rounded-lg` (cards)
- **Shadows**: `shadow-sm`, `shadow` (subtle)
- **Font**: Sans-serif default, `font-mono` ONLY for code components
- **Colors**: Semantic tokens only (`bg-card`, `bg-muted`, `text-foreground`)

### 2. Marketing/Landing Pages (`/src/components/landing/*`, `/src/app/docs/*`)
**Style: TERMINAL / HACKER AESTHETIC**
- **Purpose**: Showcase the boilerplate's personality
- **Philosophy**: Highly opinionated terminal UI style
- **Borders**: `border border-border` (1px), `rounded-none`
- **Radius**: Sharp corners (`rounded-none`) except dots (`rounded-full`)
- **Shadows**: Framer Motion scale effects instead
- **Font**: `font-mono` for everything (JetBrains Mono)
- **Colors**: Same semantic tokens + ANSI-inspired status colors

### Key Distinction

| Property | Base UI (Vanilla) | Marketing (Terminal) |
|----------|-------------------|---------------------|
| Font | Sans-serif (system) | `font-mono` |
| Border radius | `rounded-md` / `rounded-lg` | `rounded-none` |
| Border width | `border` (1px) | `border` (1px) |
| Shadows | `shadow-sm` | Framer Motion scale |
| Text transform | Normal | UPPER_SNAKE_CASE |
| Decorations | None | Hex prefixes `[0xHEX]`, tree symbols `├─` |

---

## Industry Standards: Terminal UI Design

Reference standards from CLI/terminal design best practices.

### Typography Standards

| Property | Industry Standard | Fabrk Implementation |
|----------|------------------|---------------------|
| Base Font Size | 14-16px | 14px (`text-sm`) |
| Font Family | Monospace (JetBrains Mono, Fira Code, SF Mono) | JetBrains Mono |
| Line Height | 1.4-1.6 (20-24px for 16px base) | 1.625 (`leading-relaxed`) |
| Character Spacing | Normal to slightly expanded | `tracking-tight` for headings |
| Min Readable Size | 12px (WCAG AA) | 12px (`text-xs`) for labels |

### Color Standards (ANSI-Inspired)

| Color | ANSI Name | Hex | Usage |
|-------|-----------|-----|-------|
| Red | Bright Red | `#ff6b6b` | Errors, destructive |
| Green | Bright Green | `#51cf66` | Success, active |
| Yellow | Bright Yellow | `#ffd43b` | Warnings, caution |
| Blue | Bright Blue | `#4dabf7` | Info, links |
| Magenta | Bright Magenta | `#cc5de8` | Accents |
| Cyan | Bright Cyan | `#22b8cf` | Secondary info |
| White | Bright White | `#f8f9fa` | Primary text (dark mode) |
| Black | Black | `#212529` | Primary text (light mode) |

### Spacing Standards

| Pattern | Calculation | Example |
|---------|-------------|---------|
| Character-width | Font size × 0.6 | 14px → 8.4px unit |
| Line-based | Line height × n | 20px × 2 = 40px |
| Grid unit | 4px or 8px base | 8, 16, 24, 32px |

### Border Standards

| Property | Standard | Rationale |
|----------|----------|-----------|
| Radius | 0px (sharp) | Terminal aesthetic |
| Width | 1-2px solid | Clear boundaries |
| Color | Low contrast | `border-border` at 10-20% opacity |

### Badge Sizing Standards

**CRITICAL:** All badges must use compact sizing for visual consistency across the entire application.

| Size | Padding | Text | Icon Size | Usage |
|------|---------|------|-----------|-------|
| sm (default) | `px-2 py-0.5` | `text-xs` | `size-3` (12px) | Status badges, inline labels |
| md | `px-2 py-1` | `text-xs` | `size-3` (12px) | Slightly larger status |
| lg | `px-3 py-1.5` | `text-xs` | `size-3` (12px) | Prominent badges |

**Design Pattern:**
```tsx
// Status badge (badge.tsx component)
<Badge variant="default" size="sm">NEW</Badge>
<Badge variant="destructive" size="sm">ERROR</Badge>

// Section header badge (card.tsx Badge)
<Badge code="0x00" label="SYSTEM_INIT" />  // Uses px-2 py-1

// With icons (standardized to size-3)
<Badge className="gap-1">
  <Check className="h-3 w-3" />
  VERIFIED
</Badge>
```

**Enforcement:**
- Badge component defaults to `size="sm"`
- All icons inside badges use `h-3 w-3` or `size-3` (12px)
- Section header badges use `px-2 py-1` padding
- Matches tech stack badge pattern for consistency

**Visual Reference:** See tech stack section footer badges for canonical example.

### Animation Standards

| Effect | Duration | Easing | Usage |
|--------|----------|--------|-------|
| Cursor blink | 530ms | Step | Text input indicators |
| Typing | 50-100ms/char | Linear | Typewriter effects |
| Fade | 150-300ms | Ease-out | UI transitions |
| Scale pulse | 1-2s | Ease-in-out | Status indicators |

### Accessibility Standards

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | 4.5:1 (AA) | `text-foreground` on `bg-background` |
| Focus visible | 2px ring | `focus-visible:ring-2` |
| Min touch target | 44×44px | `h-10 w-10` minimum |
| Reduced motion | Respect prefers-reduced-motion | Use Framer Motion's `useReducedMotion` |

### Screen Reader Guidance

**Terminal Symbols**

When using terminal tree-drawing characters (├─, └─, │, ─), add screen reader support:

```tsx
// GOOD: Decorative symbols hidden from screen readers
<span aria-hidden="true">├─</span> Item name

// GOOD: Visually-hidden alternative text
<span className="sr-only">Child item:</span>
<span aria-hidden="true">├─</span> Item name

// BAD: Raw symbols exposed to screen readers
├─ Item name  // Screen reader says "box drawings light vertical and right"
```

**Common Terminal Patterns:**

| Symbol | Unicode | SR Says | Solution |
|--------|---------|---------|----------|
| `├─` | U+251C U+2500 | "box drawings..." | `aria-hidden="true"` |
| `└─` | U+2514 U+2500 | "box drawings..." | `aria-hidden="true"` |
| `│` | U+2502 | "box drawings..." | `aria-hidden="true"` |
| `>` | U+003E | "greater than" | Keep for prompts |
| `$` | U+0024 | "dollar sign" | Keep for prompts |

**Focus Indicators for Terminal Aesthetic:**

The `rounded-none` rule affects focus rings. Ensure visibility:

```css
/* Terminal-style focus with sharp corners */
.focus-terminal:focus-visible {
  outline: 2px solid oklch(var(--ring));
  outline-offset: 2px;
  border-radius: 0; /* Keep sharp corners */
}
```

**Pages Analyzed:** 83 pages from sitemaps
- Marketing/Landing: 10 pages
- Templates: 14 pages
- Dashboard/App: 7 pages
- Docs: 52 pages

---

## Table of Contents

1. [Typography](#1-typography)
2. [Colors](#2-colors)
3. [Spacing](#3-spacing)
4. [Borders](#4-borders)
5. [Layout Patterns](#5-layout-patterns)
6. [Components](#6-components)
7. [Interactive States](#7-interactive-states)
8. [Animations](#8-animations)
9. [Terminal Patterns](#9-terminal-patterns)
10. [Responsive Breakpoints](#10-responsive-breakpoints)
11. [Icon Sizes](#11-icon-sizes)
12. [Z-Index Layers](#12-z-index-layers)
13. [Inconsistencies](#13-inconsistencies)
14. [Design Rules](#14-design-rules)

---

## 1. Typography

### Font Families

| Token | CSS Variable | Usage |
|-------|-------------|-------|
| Mono | `--font-jetbrains-mono` | Terminal aesthetic - landing, docs, templates |
| Sans | `--font-geist-sans` | Dashboard app pages |

**Fallback Stack (Mono):** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New`

### Heading Scale by Context

| Element | Landing Page | Docs Page | Templates | Dashboard |
|---------|-------------|-----------|-----------|-----------|
| H1 Hero | `text-3xl sm:text-4xl md:text-5xl` | `text-2xl lg:text-3xl` | `text-4xl` | `text-4xl` |
| H2 Section | `text-3xl lg:text-4xl` | `text-lg` | `text-3xl` | `text-2xl` |
| H3 Subsection | `text-2xl` | `text-sm` | `text-2xl` | `text-lg` |
| H4 Item | `text-sm` | `text-sm` | `text-sm` | `text-sm font-medium` |

**Common Classes:** `font-mono font-bold tracking-tight`

### Body Text Scale

| Size | Class | Pixels | Usage |
|------|-------|--------|-------|
| Base | `text-base` | 16px | Standard body (landing only) |
| Small | `text-sm` | 14px | Most body text, descriptions |
| XS | `text-xs` | 12px | Labels, badges, metadata |
| Tiny | `text-[10px]` | 10px | Tertiary text (docs only) |

### Font Weights

| Weight | Class | Value | Usage |
|--------|-------|-------|-------|
| Bold | `font-bold` | 700 | Page titles, prices, stats |
| Semibold | `font-semibold` | 600 | Section headers, emphasis |
| Medium | `font-medium` | 500 | Card titles, labels |
| Normal | (default) | 400 | Body text |

### Line Height & Tracking

| Class | Value | Usage |
|-------|-------|-------|
| `tracking-tight` | -0.025em | Headings |
| `leading-relaxed` | 1.625 | Body paragraphs |
| `leading-[1.1]` | 1.1 | Hero headlines |
| `leading-tight` | 1.25 | Compact headings |

### Inline Code

```tsx
<code className="bg-muted px-1.5 py-0.5 font-mono text-xs">code</code>
```

---

## 2. Colors

### Color Format
All colors use **OKLCH** format: `lightness% chroma hue`

### Core Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `100% 0 0` | `23.26% 0.014 253.1` | Page backgrounds |
| `--foreground` | `0% 0 0` | `97.807% 0.029 256.847` | Primary text |
| `--card` | `100% 0 0` | `25.33% 0.016 252.42` | Card surfaces |
| `--muted` | `96% 0 0` | `21.15% 0.012 254.09` | Subtle backgrounds |
| `--muted-foreground` | `40% 0 0` | `85% 0.02 256` | Secondary text |
| `--border` | `90% 0 0` | `21.15% 0.012 254.09` | Borders |
| `--primary` | `49.12% 0.3096 275.75` | `78.9% 0.154 211.53` | CTAs, links |
| `--primary-foreground` | `100% 0.02 320` | `15.83% 0.017 212.09` | Text on primary |

### Semantic Colors

| Token | OKLCH Value | Usage |
|-------|------------|-------|
| `--success` | `76% 0.177 163.223` | Green - positive states |
| `--destructive` | `71% 0.194 13.428` | Red - errors, danger |
| `--warning` | `82% 0.189 84.429` | Yellow - cautions |
| `--info` | `74% 0.16 232.661` | Blue - informational |

### Text Color Classes

| Class | Usage |
|-------|-------|
| `text-foreground` | Primary body text |
| `text-muted-foreground` | Secondary text, labels |
| `text-primary` | Brand accent, links, CTAs |
| `text-primary-foreground` | Text on primary backgrounds |
| `text-success` | Success indicators |
| `text-destructive` | Error indicators |
| `text-warning` | Warning indicators |

### Background Color Classes

| Class | Usage |
|-------|-------|
| `bg-background` | Page/section backgrounds |
| `bg-card` | Card surfaces, containers |
| `bg-muted` | Subtle backgrounds, code blocks |
| `bg-muted/30`, `bg-muted/50` | Semi-transparent muted |
| `bg-primary` | Brand backgrounds, buttons |
| `bg-primary/5`, `bg-primary/10` | Subtle brand tint |
| `bg-success/10`, `bg-success/50` | Success backgrounds |
| `bg-destructive/10`, `bg-destructive/50` | Error backgrounds |
| `bg-warning/50` | Warning backgrounds |

### Border Color Classes

| Class | Usage |
|-------|-------|
| `border-border` | Standard borders |
| `border-primary` | Brand emphasis borders |
| `border-primary/50` | Faded brand borders |
| `border-destructive/30`, `border-destructive/50` | Error borders |
| `border-success/20`, `border-success/30` | Success borders |
| `border-foreground` | High contrast borders |

### Theme Support
12 retro terminal-inspired color themes available via `[data-theme]`:

**CRT Phosphor Themes (5):**
`green`, `amber`, `blue`, `red`, `purple`

**Retro Computer Themes (6):**
`gameboy`, `c64`, `gbpocket`, `vic20`, `atari`, `spectrum`

**Light Theme (1):**
`bw`

See [Theme Guide](./THEME-GUIDE.md) for detailed descriptions, use cases, and color palettes.

---

## 3. Spacing

### Padding Scale

| Class | Value | Usage |
|-------|-------|-------|
| `p-2` | 0.5rem | Minimal padding, icon containers |
| `p-3` | 0.75rem | Compact cards (docs) |
| `p-4` | 1rem | Standard cards |
| `p-6` | 1.5rem | Large cards, content blocks |
| `px-3 py-1` | - | Badges, tags |
| `px-2 py-0.5` | - | Small badges |
| `px-4 py-2` | - | Terminal window headers |

### Section Padding

| Pattern | Usage |
|---------|-------|
| `py-8` | Dashboard pages, docs |
| `py-16 lg:py-24` | Marketing pages |
| `py-20 lg:py-28` | Landing page sections |
| `px-6` | Standard horizontal (mobile) |
| `px-4 sm:px-6 lg:px-8` | Responsive horizontal |

### Margin Scale

| Class | Value | Usage |
|-------|-------|-------|
| `mb-1`, `mb-2`, `mb-3` | 0.25-0.75rem | Compact spacing |
| `mb-4` | 1rem | Standard spacing |
| `mb-6` | 1.5rem | Medium spacing |
| `mb-8` | 2rem | Large spacing (landing) |
| `mb-12` | 3rem | Section spacing |
| `mb-16 lg:mb-24` | 4-6rem | Major section breaks |

### Gap Scale (Flex/Grid)

| Class | Value | Usage |
|-------|-------|-------|
| `gap-1` | 0.25rem | Minimal gaps |
| `gap-1.5` | 0.375rem | Traffic light dots |
| `gap-2` | 0.5rem | Inline elements |
| `gap-3` | 0.75rem | Tight spacing |
| `gap-4` | 1rem | Compact grids, nav items |
| `gap-6` | 1.5rem | Standard grid gaps |
| `gap-8` | 2rem | Card group spacing |
| `gap-12 lg:gap-16` | 3-4rem | Section content (landing) |

### Space Between

| Class | Usage |
|-------|-------|
| `space-y-1` | Very tight lists |
| `space-y-2` | Tight lists |
| `space-y-3` | Compact lists |
| `space-y-4` | Standard lists |
| `space-y-6` | Card groups |
| `space-y-8` | Page sections |

---

## 4. Borders

### Border Width

| Class | Width | Usage |
|-------|-------|-------|
| `border` | 1px | Standard borders |
| `border-2` | 2px | Emphasis, brutalist style |
| `border-4` | 4px | Heavy emphasis |

### Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | **Primary** - terminal aesthetic |
| `rounded-full` | 9999px | Circles only (dots, avatars) |
| `rounded-lg` | 0.5rem | Dashboard cards only |
| `rounded-md` | 0.375rem | Some form elements |

### Border Sides

| Class | Usage |
|-------|-------|
| `border-t` | Top dividers |
| `border-b` | Bottom dividers, section separators |
| `border-l` | Left accents, tree lines |
| `border-l-2` | Emphasis left border (docs quotes) |
| `border-r` | Right separators |

### Dividers

| Pattern | Usage |
|---------|-------|
| `divide-y divide-border` | Vertical dividers between rows |
| `divide-x divide-border` | Horizontal dividers between columns |

---

## 5. Layout Patterns

### Container Max Widths

| Class | Width | Usage |
|-------|-------|-------|
| `max-w-7xl` | 80rem (1280px) | Landing sections, full-width |
| `max-w-6xl` | 72rem (1152px) | Dashboard containers |
| `max-w-5xl` | 64rem (1024px) | Marketing content |
| `max-w-4xl` | 56rem (896px) | Narrow content |
| `max-w-3xl` | 48rem (768px) | Docs main content |
| `max-w-2xl` | 42rem (672px) | Centered content |
| `max-w-md` | 28rem (448px) | Small containers |
| `max-w-sm` | 24rem (384px) | Compact containers |

### Flexbox Patterns

| Pattern | Usage |
|---------|-------|
| `flex items-center gap-2` | Horizontal inline elements |
| `flex items-center justify-between` | Space between |
| `flex flex-col gap-4` | Vertical stacks |
| `flex flex-col sm:flex-row` | Responsive direction |
| `flex flex-wrap gap-2` | Wrapping items |
| `flex-1` | Fill available space |
| `shrink-0` | Prevent shrinking |

### Grid Patterns

| Pattern | Usage |
|---------|-------|
| `grid gap-12 lg:grid-cols-2 lg:gap-16` | Hero/feature 2-column |
| `grid gap-6 md:grid-cols-2 lg:grid-cols-4` | Stats cards |
| `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` | Card grids |
| `grid gap-8 lg:grid-cols-[200px_1fr]` | Sidebar layout |
| `grid grid-cols-3 gap-3` | Fixed 3-column |

### Page Structure

| Pattern | Usage |
|---------|-------|
| `min-h-screen bg-background` | Full page wrapper |
| `relative isolate` | Stacking context |
| `container mx-auto` | Centered container |

### Sticky Elements

| Pattern | Usage |
|---------|-------|
| `sticky top-0 z-50` | Navigation |
| `sticky top-16` | Below-nav sticky |
| `scroll-mt-16` | Scroll margin for sticky nav |

---

## 6. Components

### Terminal Window

```tsx
<div className="border border-border bg-card">
  {/* Header with traffic lights */}
  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
    <div className="flex gap-1.5">
      <div className="size-2.5 rounded-full bg-destructive/50" />
      <div className="size-2.5 rounded-full bg-warning/50" />
      <div className="size-2.5 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">
      [0xHEX] filename.exe │ PID:1234
    </span>
  </div>
  {/* Content */}
  <div className="p-6 font-mono text-xs">
    Content...
  </div>
</div>
```

### Cards

| Context | Classes |
|---------|---------|
| Terminal style | `border border-border bg-card rounded-none` |
| Dashboard | `border border-border bg-card rounded-lg` |
| Hover effect | `transition-all hover:border-primary/50` |
| CardContent | `p-4` or `p-6` |

#### Card Component API

The Card component (`src/components/ui/card.tsx`) exports 14 subcomponents:

**Core Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| `Card` | Container shell | `<Card tone="primary" interactive>...</Card>` |
| `CardHeader` | Terminal header `[ [0xXX] TITLE ]` | `<CardHeader code="0x00" title="SYSTEM" />` |
| `CardContent` | Content area with padding | `<CardContent padding="lg">...</CardContent>` |
| `CardFooter` | Footer area for actions | `<CardFooter>...</CardFooter>` |

**Card Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Border color tone |
| `size` | `'auto' \| 'full'` | `'full'` | Height behavior |
| `interactive` | `boolean` | `false` | Enable hover states |
| `as` | `'div' \| 'article' \| 'section'` | `'div'` | Semantic HTML element |

**CardHeader Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | Auto-generated | Hex code (e.g., "0x00") |
| `title` | `string` | Required | Header title |
| `icon` | `ReactNode` | - | Right-side icon |
| `meta` | `ReactNode` | - | Right-side metadata |

**Stat Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| `Stat` | Key-value pair | `<Stat label="Speed" value="OPTIMIZED" />` |
| `StatGroup` | Container for Stats | `<StatGroup><Stat /><Stat /></StatGroup>` |

```tsx
// Usage
<StatGroup>
  <Stat label="Speed" value="OPTIMIZED" />
  <Stat label="Integration" value="SEAMLESS" />
</StatGroup>
```

**Badge Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| `Badge` | Inline badge with hex code | `<Badge code="0x00" label="SYSTEM" meta="v2.0" />` |
| `PageBadge` | Page-level badge | `<PageBadge prefix="TEMPLATE">SIGN IN</PageBadge>` |

**Feature List Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| `StyledLabel` | Bracketed label `[LABEL]:` | `<StyledLabel>FEATURES</StyledLabel>` |
| `FeatureItem` | List item with prefix | `<FeatureItem icon="check">Feature</FeatureItem>` |
| `FeatureList` | Container for FeatureItems | `<FeatureList>...</FeatureList>` |
| `InfoNote` | Note text `[NOTE]:` | `<InfoNote>Connect to API.</InfoNote>` |

**FeatureItem icons:** `'arrow'` (>), `'check'` (✓), `'dot'` (•)

**Composite Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| `TemplatePageHeader` | Page header with badge + title | `<TemplatePageHeader badge="SIGN IN" title="Sign In" />` |
| `FeaturesCard` | Complete features card | `<FeaturesCard features={[...]} note="..." />` |

```tsx
// TemplatePageHeader
<TemplatePageHeader
  badge="SIGN IN"
  title="Sign In"
  description="Login page with social auth"
/>

// FeaturesCard
<FeaturesCard
  title="TEMPLATE FEATURES"
  features={["Multi-step form", "Validation", "API integration"]}
  note="Connect to your API for real data."
  featureIcon="check"
/>
```

**Import Pattern:**

```tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Stat,
  StatGroup,
  Badge,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
} from '@/components/ui/card';
```

### Buttons

| Variant | Classes |
|---------|---------|
| Primary CTA | `rounded-none h-12 bg-primary px-6 font-mono text-xs font-semibold` |
| Outline CTA | `rounded-none h-12 border-2 border-foreground px-6 font-mono text-xs` |
| Standard | `rounded-none font-mono text-xs` |
| Icon button | `rounded-none h-10 w-10` |
| Small | `h-7 rounded-md px-2 text-xs` |

### Badges

| Type | Classes |
|------|---------|
| Terminal label | `inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground` |
| Primary badge | `border border-primary bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary` |
| Status badge | `border px-2 py-0.5 font-mono text-xs` + color variant |

### Step Indicators

```tsx
<span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">
  1
</span>
```

### Details/Accordion

```tsx
<details className="border border-border bg-card">
  <summary className="cursor-pointer p-4 font-mono text-sm font-medium hover:bg-muted/50">
    <span className="text-primary">├─</span>
    <span className="ml-2">[LABEL]</span>
    <span className="ml-2">TITLE_HERE</span>
  </summary>
  <div className="border-t border-border p-4">
    <p className="font-mono text-xs text-muted-foreground">Content...</p>
  </div>
</details>
```

### Lists (Tree Style)

```tsx
<ul className="font-mono text-xs text-muted-foreground space-y-1">
  <li>├─ First item</li>
  <li>├─ Second item</li>
  <li>└─ Last item</li>
</ul>
```

### Code Blocks

```tsx
<div className="[&>div]:rounded-none">
  <CodeBlock language="bash" code="..." />
</div>
```

### Inputs

| State | Classes |
|-------|---------|
| Base | `h-8 w-full rounded-md border bg-background px-3 py-2 text-sm` |
| Terminal | `rounded-none font-mono text-xs border border-border` |
| Focus | `focus-visible:ring-2 focus-visible:ring-primary` |
| Error | `border-destructive focus-visible:ring-destructive` |
| Disabled | `disabled:cursor-not-allowed disabled:opacity-50` |

### Shadows

**Base UI (Vanilla):**
| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle elevation |
| `shadow` | Standard elevation |
| `shadow-md` | Medium elevation |
| `shadow-lg` | High elevation (modals) |

**Marketing (Terminal):**
Uses Framer Motion scale effects instead of CSS shadows for interaction feedback.

---

## 7. Interactive States

### Hover States

| Pattern | Usage |
|---------|-------|
| `hover:bg-muted` | Subtle background |
| `hover:bg-muted/30`, `hover:bg-muted/50` | Light backgrounds |
| `hover:bg-accent` | Accent background |
| `hover:text-foreground` | Text emphasis |
| `hover:text-primary` | Brand color |
| `hover:border-primary/50` | Border highlight |
| `hover:underline` | Link underline |
| `hover:opacity-80` | Opacity fade |

### Focus States

| Class | Usage |
|-------|-------|
| `focus-visible:outline-none` | Remove outline |
| `focus-visible:ring-1 focus-visible:ring-ring` | Thin focus ring |
| `focus-visible:ring-2 focus-visible:ring-primary` | Thick primary ring |

### Disabled States

| Class | Usage |
|-------|-------|
| `disabled:pointer-events-none` | Prevent interaction |
| `disabled:opacity-50` | Visual indication |
| `disabled:cursor-not-allowed` | Disabled cursor |

### Transitions

| Class | Usage |
|-------|-------|
| `transition-colors` | Color changes |
| `transition-opacity` | Opacity changes |
| `transition-transform` | Transform changes |
| `transition-all` | All properties |
| `duration-200`, `duration-300` | Timing |

### Group Hover

| Pattern | Usage |
|---------|-------|
| `group` | Parent element |
| `group-hover:translate-x-1` | Child translation |
| `group-hover:text-primary` | Child color change |

---

## 8. Animations

### Framer Motion Patterns

| Name | Initial | Animate | Duration | Usage |
|------|---------|---------|----------|-------|
| Fade in up | `opacity: 0, y: 12` | `opacity: 1, y: 0` | 0.5-0.6s | Section reveals |
| Fade in left | `opacity: 0, x: -20` | `opacity: 1, x: 0` | 0.5s | Left content |
| Fade in right | `opacity: 0, x: 20` | `opacity: 1, x: 0` | 0.5s | Right content |
| Scale in | `opacity: 0, scale: 0.95` | `opacity: 1, scale: 1` | 0.5s | CTAs |
| Stagger | - | - | `delay: index * 0.05` | List items |

### Viewport Options

| Property | Value | Usage |
|----------|-------|-------|
| `once` | `true` | Animate only on first view |
| `margin` | `"-50px"` | Expand trigger area |

### Tailwind Animations

| Class | Usage |
|-------|-------|
| `animate-pulse` | Skeleton loaders |
| `animate-spin` | Loading spinners |
| `animate-gradient-shift` | Gradient backgrounds |

### Custom Keyframes

| Name | Effect | Duration |
|------|--------|----------|
| `bar-grow` | scaleY(0) → scaleY(1) | - |
| `fade-in-up` | opacity + translateY | - |
| `terminal-blink` | opacity step | - |
| `gradient-shift` | background-position | 15s |

---

## 9. Terminal Patterns

### Hex Prefixes by Section

| Prefix | Section |
|--------|---------|
| `[0x00]` | START_HERE (getting-started, architecture) |
| `[0x10]` | TUTORIALS |
| `[0x20]` | AUTHENTICATION |
| `[0x30]` | PAYMENTS |
| `[0x40]` | EMAILS |
| `[0x50]` | CORE_BLOCKS |
| `[0x60]` | COMPONENTS |
| `[0x70]` | ADVANCED |
| `[0x80]` | SECURITY |
| `[0x90]` | DEPLOYMENT |
| `[0xA0]` | LAUNCH |
| `[0xB0]` | EXTRAS |
| `[0xFF]` | EXECUTE (final CTA) |

### Terminal Symbols

| Symbol | Usage |
|--------|-------|
| `>` | Command prompt |
| `├─` | Tree branch |
| `└─` | Tree end |
| `│` | Vertical line |
| `[OK]` | Success status |
| `[ERROR]` | Error status |
| `_SUFFIX` | Section identifier (e.g., `_DOCS`, `_CONSOLE`) |

### Terminal Badge

```tsx
<div className="inline-block border border-border bg-card px-3 py-1">
  <span className="font-mono text-xs text-muted-foreground">
    [ [0xHEX] SECTION ] PAGE_TITLE
  </span>
</div>
```

### Terminal Logo

```tsx
<Link href="/" className="flex items-center gap-1.5 font-mono">
  <span className="text-xs text-primary">&gt;</span>
  <span className="text-sm font-bold tracking-tight">FABRK</span>
  <span className="text-xs text-muted-foreground">_DOCS</span>
</Link>
```

---

## 10. Responsive Breakpoints

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (none) | 0px |
| Small | `sm:` | 640px |
| Medium | `md:` | 768px |
| Large | `lg:` | 1024px |
| Extra Large | `xl:` | 1280px |

### Common Responsive Patterns

```css
/* Typography */
text-2xl lg:text-3xl
text-3xl lg:text-4xl
text-3xl sm:text-4xl md:text-5xl

/* Grid */
grid gap-4 sm:grid-cols-2 lg:grid-cols-3
md:grid-cols-2 lg:grid-cols-4

/* Visibility */
hidden md:block
lg:hidden
hidden sm:inline

/* Spacing */
px-4 sm:px-6 lg:px-8
py-16 lg:py-24

/* Flex direction */
flex-col sm:flex-row
flex-col lg:flex-row-reverse
```

---

## 11. Icon Sizes

| Size | Classes | Usage |
|------|---------|-------|
| Tiny | `size-2.5`, `h-2.5 w-2.5` | Traffic light dots |
| Small | `size-3`, `h-3 w-3` | Chevrons, inline icons |
| Standard | `size-4`, `h-4 w-4` | Most icons |
| Medium | `size-5`, `h-5 w-5` | Feature icons |
| Large | `size-6`, `h-6 w-6` | Hero icons |

---

## 12. Z-Index Layers

| Class | Value | Usage |
|-------|-------|-------|
| `z-50` | 50 | Navigation, modals, sticky |
| `z-40` | 40 | Below-nav sticky elements |
| `z-10` | 10 | Elevated elements |
| `-z-10` | -10 | Background decorations |

---

## 13. Inconsistencies

### Critical Issues

| # | Issue | Location | Current State | Recommendation |
|---|-------|----------|---------------|----------------|
| 1 | **Typography scale** | Docs vs Landing | Docs missing `text-base`, `text-xl`, `text-4xl` | Add missing sizes to docs OR intentional (docs = dense) |
| 2 | **Section spacing** | Docs vs Landing | Docs: `py-8`. Landing: `py-78/78` | Intentional (docs = dense, landing = spacious) |
| 3 | **Animations** | Docs vs Landing | Docs: none. Landing: heavy framer-motion | Add subtle animations to docs headers |
| 4 | **Max-width** | Docs vs Landing | Docs: `max-w-3xl`. Landing: `max-w-7xl` | Intentional (docs = readable, landing = wide) |
| 5 | **Gap patterns** | Docs vs Landing | Docs: `gap-6` max. Landing: `gap-78/78` | Intentional (different contexts) |

### Minor Issues

| # | Issue | Location | Current State | Recommendation |
|---|-------|----------|---------------|----------------|
| 6 | **Terminal dot size** | Various | Mixed: `size-2.5`, `size-3`, `h-3 w-3` | Standardize to `size-2.5` |
| 7 | **Dot animations** | Pricing section | Pricing dots don't animate, others do | Add animation to pricing dots |
| 8 | **Hover border opacity** | Various | Mixed: `border-primary` vs `border-primary/50` | Standardize to `border-primary/50` |
| 9 | **Breakpoint strategy** | Grids | Mixed: `sm:` vs `md:` for 2-column | Prefer `sm:` consistently |
| 10 | **Focus states** | All interactive | Missing visible focus rings | Add `focus-visible:ring-2 focus-visible:ring-primary` |
| 11 | **Shadow strategy** | Landing | CLAUDE.md says hard shadows, code uses Framer Motion scale | Update CLAUDE.md or add shadows |
| 12 | **Icon sizing syntax** | Various | `h-X w-X` vs `size-X` | Prefer `size-X` for new code |

### Specific Fixes Needed

1. **Pricing terminal dots** (`src/components/landing/pricing-section.tsx`):
   - Add animation to match hero/features sections

2. **Focus states** (global):
   - Add to buttons, inputs, links: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`

3. **Terminal dot standardization** (all terminal windows):
   - Use `size-2.5 rounded-full` consistently

4. **Hover borders** (all cards/buttons):
   - Standardize to `hover:border-primary/50`

---

## 14. Design Rules

### Base UI Components (Vanilla)

Rules for `/src/components/ui/*`:

1. **Font**: Sans-serif default, `font-mono` ONLY for code components
2. **Corners**: `rounded-md` (standard), `rounded-lg` (cards), `rounded-full` (avatars)
3. **Borders**: `border border-border` (1px, subtle)
4. **Shadows**: `shadow-sm`, `shadow` (subtle, not hard)
5. **Colors**: Semantic tokens only - never raw colors like `bg-black`, `text-white`
6. **Transitions**: `transition-colors` for hover states
7. **Focus**: `focus-visible:ring-2 focus-visible:ring-primary`

### Marketing/Landing Pages (Terminal)

Rules for `/src/components/landing/*` and `/src/app/docs/*`:

1. **Font**: Use `font-mono` for everything
2. **Corners**: Use `rounded-none` for terminal aesthetic (except traffic light dots)
3. **Headings**: UPPER_SNAKE_CASE for terminal style
4. **Lists**: Tree-style with `├─` and `└─` characters
5. **Badges**: Include hex prefix in square brackets `[0xHEX]`
6. **Step indicators**: Square boxes, never circles
7. **Colors**: Muted text for secondary content
8. **Transitions**: Always add `transition-colors` or `transition-all`
9. **Spacing**: Use consistent spacing scale (2, 3, 4, 6, 8)
10. **Code blocks**: Wrap with `[&>div]:rounded-none`

### Component Usage Rules

- Base UI components CAN be modified for naming/token consistency
- When using base UI in marketing, add terminal styling via `className`
- Example: `<Card className="rounded-none font-mono">`
- Use CSS child selectors for nested overrides: `[&>div]:rounded-none`

### Naming Conventions

- Terminal labels: `[LABEL]: content`
- Section badges: `[ [0xHEX] SECTION ] PAGE_TITLE`
- CTA buttons: `> ACTION_TEXT`
- Status indicators: `[OK]`, `[ERROR]`, `[PENDING]`

---

## Files Reference

| File | Purpose |
|------|---------|
| `/src/app/globals.css` | OKLCH color definitions, CSS variables, keyframes |
| `/src/lib/design-system/tokens.ts` | TypeScript token definitions |
| `/src/components/ui/*.tsx` | Base UI components (don't modify) |
| `/src/components/landing/*.tsx` | Landing page components |
| `/src/components/demo/*.tsx` | Demo/template components |
| `/DESIGN_SYSTEM.md` | This file |

---

**Last Updated:** 2025-12-20
