# Component Showcase Documentation

> Generated: 2025-12-06 (PHASE 5)
> Status: COMPLETE

---

## Overview

The Component Showcase is a comprehensive visual reference for the Fabrk design system. It provides:

1. **Visual inspection** of all components and tokens
2. **Copy-paste ready** template patterns
3. **Theme preview** across different modes (terminal, modern, soft)
4. **Documentation reference** for developers

---

## Showcase Routes

| Route                             | Purpose           | Contents                                             |
| --------------------------------- | ----------------- | ---------------------------------------------------- |
| `/component-showcase`             | Main showcase     | all 78 UI components organized by category           |
| `/component-showcase/foundations` | Design tokens     | Colors, typography, spacing, radius, shadows, motion |
| `/component-showcase/templates`   | Template snippets | Hero, features, stats, pricing, testimonials, CTAs   |
| `/component-showcase/cards`       | Card deep-dive    | Card variants, tones, composition patterns           |

---

## Structure

### Main Showcase (`/component-showcase`)

**11 Sections:**

1. **FOUNDATIONS** (link) - Design token reference
2. **TEMPLATES** (link) - Template snippet library
3. **CARDS** (link) - Card component showcase
4. **BUTTONS & ACTIONS** - Button variants, sizes, loading states
5. **INPUTS & FORMS** - All form controls and validation
6. **DATA DISPLAY** - Badges, tables, avatars, stats, timeline
7. **CHARTS & VISUALIZATION** - Pie, donut, gauge, sparkline, funnel, heatmap
8. **FEEDBACK & STATUS** - Alerts, toasts, progress, spinners, empty states
9. **OVERLAYS & DIALOGS** - Dialogs, sheets, popovers, dropdowns, tooltips
10. **NAVIGATION** - Tabs, accordion, breadcrumbs, pagination, menus
11. **LAYOUT & CONTAINERS** - Container, grid, scroll area, separator

### Foundations Page (`/component-showcase/foundations`)

**7 Sections:**

1. **COLORS** - Background, semantic, text, and border color swatches
2. **TYPOGRAPHY** - Font families, sizes, weights
3. **SPACING** - 8-point grid visualization
4. **RADIUS** - Border radius scale (terminal uses `rounded-none`)
5. **SHADOWS** - Box shadow scale (terminal uses minimal/none)
6. **MOTION** - Duration and easing tokens
7. **Z_INDEX** - Layer scale visualization

### Templates Page (`/component-showcase/templates`)

**7 Sections:**

1. **HERO_SECTIONS** - Centered, split, email capture variants
2. **FEATURE_GRIDS** - 3-col, 4-col, list patterns
3. **DASHBOARD_STATS** - StatCard, Card with stats
4. **PRICING_CARDS** - Pricing grid with tones
5. **TESTIMONIALS** - Quote cards with ratings
6. **CTA_SECTIONS** - Simple CTA, banner CTA
7. **LIST_PATTERNS** - Docs list, activity list

### Cards Page (`/component-showcase/cards`)

**7 Sections:**

1. **BASE_CARD** - Canonical Card structure
2. **TONE_VARIANTS** - neutral, primary, success, warning, danger
3. **INTERACTIVE** - Hover states and transitions
4. **HEADER_OPTIONS** - icon and meta props
5. **WITH_FOOTER** - Action buttons in footer
6. **CONTENT_COMPOSITION** - Stats, lists, stat groups
7. **WIDTH_CONTROL** - Parent container sizing

---

## Usage

### For Visual Inspection

Navigate to `/component-showcase` to see all components rendered with the current theme. Use the sticky header navigation to jump between sections.

### For Copying Patterns

Each template snippet section shows real implementations using actual components. The patterns demonstrated follow design system rules:

- Terminal button format: `> ACTION_NAME`
- Terminal label format: `[LABEL]:`
- Card headers: `[ [0xNN] TITLE ]`
- All components use `mode.radius` and `mode.font`

### For Theme Preview

When theme switching is enabled:

1. Use the theme dropdown (if available)
2. All showcase pages will update to reflect the new theme
3. Radius, fonts, and formatting will change accordingly

---

## Implementation Notes

### Component Imports

All showcase pages import components from `@/components/ui/`:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
```

### Design Token Usage

The showcase demonstrates proper token usage:

```tsx
// Colors - use semantic tokens
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />

// Radius - use mode.radius
<div className={cn("border", mode.radius)} />

// Font - use mode.font
<span className={cn("text-sm", mode.font)}>Label</span>
```

### Section Headers

All sections use the standard terminal header pattern:

```tsx
function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="border-border bg-card border-b px-6 py-4">
      <span className={cn('text-muted-foreground text-sm', mode.font)}>
        [ [{code}] {title} ]
      </span>
    </div>
  );
}
```

---

## Maintenance

### Adding New Components

1. Add the component demo to the appropriate section in `/component-showcase/page.tsx`
2. Follow the existing pattern: Label + Component + Optional description
3. Use terminal copy format for labels: `[COMPONENT_NAME]:`

### Adding New Template Patterns

1. Add the pattern to `/component-showcase/templates/page.tsx`
2. Group with similar patterns (hero with hero, CTA with CTA)
3. Include a descriptive label

### Updating Foundations

When design tokens change:

1. Update the corresponding section in `/component-showcase/foundations/page.tsx`
2. Ensure CSS variable names match
3. Mark active/current theme values

---

## Files Reference

| File                                              | Purpose                          |
| ------------------------------------------------- | -------------------------------- |
| `src/app/component-showcase/page.tsx`             | Main showcase with 78+ components |
| `src/app/component-showcase/foundations/page.tsx` | Design token visualization       |
| `src/app/component-showcase/templates/page.tsx`   | Template snippet library         |
| `src/app/component-showcase/cards/page.tsx`       | Card deep-dive showcase          |
| `src/components/showcase/showcase-nav.tsx`        | Shared showcase navigation       |
| `design-system/spec/showcase.md`                  | This documentation               |

---

_Documentation generated by PHASE 5: COMPONENT SHOWCASE - 2025-12-06_
