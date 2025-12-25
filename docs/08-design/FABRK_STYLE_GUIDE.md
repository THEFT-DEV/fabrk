# FABRK Unified Style Guide

**Source of Truth** combining landing page styles, industry standards, and delta analysis.

---

## 1. Landing Page Styles (Gold Standard)

These are the canonical styles from the landing page components. **Copy these exactly for consistency.**

### Typography

| Element | Class | Usage |
|---------|-------|-------|
| Body text | `font-mono text-sm text-muted-foreground` | All paragraph text |
| Labels/badges | `font-mono text-xs text-muted-foreground` | Hex prefixes, metadata |
| H1 | `font-mono text-3xl font-bold tracking-tight lg:text-4xl` | Page titles |
| H2 | `font-mono text-2xl font-bold tracking-tight` | Section headers |
| H3 | `font-mono text-sm font-bold` | Subsection headers |
| Links | `text-primary hover:underline` | Inline links |
| Success text | `text-success` | Positive indicators |
| Error text | `text-destructive` | Error indicators |

### Terminal Window Pattern

```tsx
<div className="border border-border bg-card">
  {/* Header */}
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
  <div className="p-6 font-mono text-sm">
    Content...
  </div>
</div>
```

### Card Pattern

```tsx
<div className="border border-border bg-card p-6 transition-all hover:border-primary/50">
  {/* Content */}
</div>
```

### Badge Pattern

```tsx
<div className="inline-block border border-border bg-card px-3 py-1">
  <span className="font-mono text-xs text-muted-foreground">
    [ [0xHEX] SECTION ] TITLE
  </span>
</div>
```

### Button Patterns

| Type | Classes |
|------|---------|
| Primary CTA | `rounded-none h-12 bg-primary px-6 font-mono text-xs font-semibold text-primary-foreground` |
| Outline CTA | `rounded-none h-12 border-2 border-foreground px-6 font-mono text-xs font-semibold` |
| Standard | `rounded-none font-mono text-xs` |

### Spacing (Landing)

| Pattern | Classes |
|---------|---------|
| Section padding | `px-6 py-20 lg:py-28` |
| Container | `mx-auto max-w-7xl` |
| Card grid | `grid gap-6 md:grid-cols-2 lg:grid-cols-3` |
| Inline items | `flex items-center gap-2` |
| Stacked items | `space-y-4` |

---

## 2. Industry Standards (Terminal UI)

### Typography Standards

| Property | Standard | Fabrk Uses |
|----------|----------|------------|
| Base font size | 14-16px | 14px (`text-sm`) ✓ |
| Font family | Monospace | JetBrains Mono ✓ |
| Line height | 1.4-1.6 | 1.625 (`leading-relaxed`) ✓ |
| Min readable | 12px | 12px (`text-xs`) ✓ |

### Color Standards (ANSI)

| Color | Standard Hex | Fabrk Token |
|-------|-------------|-------------|
| Red | `#ff6b6b` | `--destructive` ✓ |
| Green | `#51cf66` | `--success` ✓ |
| Yellow | `#ffd43b` | `--warning` ✓ |
| Blue | `#4dabf7` | `--info` ✓ |
| Primary text | High contrast | `--foreground` ✓ |
| Secondary text | 60-70% opacity | `--muted-foreground` ✓ |

### Border Standards

| Property | Standard | Fabrk Uses |
|----------|----------|------------|
| Radius | 0px (sharp) | `rounded-none` ✓ |
| Width | 1-2px | `border` (1px) ✓ |
| Circles only | `rounded-full` | Traffic lights ✓ |

### Animation Standards

| Effect | Standard | Fabrk Uses |
|--------|----------|------------|
| Fade | 150-300ms | `transition-colors` ✓ |
| Scale pulse | 1-2s | Framer Motion ✓ |
| Hover | Subtle | `hover:border-primary/50` ✓ |

---

## 3. Delta Analysis: Documented vs Actual

### Font Sizes

| Size | Documented | Actually Used | Delta |
|------|------------|---------------|-------|
| `text-xs` | ✓ | 1,699 uses | Most used - correct |
| `text-sm` | ✓ | 918 uses | Second most - correct |
| `text-base` | ✓ | 40 uses | Underused |
| `text-lg` | ✓ | 362 uses | OK |
| `text-xl` | ✓ | 193 uses | OK |
| `text-2xl` | ✓ | 125 uses | OK |
| `text-3xl` | ✓ | 95 uses | OK |
| `text-4xl` | ✓ | 37 uses | OK |
| `text-5xl` | ✓ | 1 use | Rare |
| `text-8xl` | ❌ NOT DOCUMENTED | 1 use | **ADD TO DOCS** |
| `text-[10px]` | ✓ | 3 uses | Deprecated - remove |

### Font Weights

| Weight | Documented | Actually Used | Delta |
|--------|------------|---------------|-------|
| `font-bold` | ✓ | 620 uses | ✓ |
| `font-semibold` | ✓ | 667 uses | Most used ✓ |
| `font-medium` | ✓ | 263 uses | ✓ |
| `font-normal` | ✓ | 21 uses | ✓ |
| `font-black` | ❌ NOT DOCUMENTED | 31 uses | **ADD TO DOCS** |

### Border Radius

| Radius | Documented | Actually Used | Delta |
|--------|------------|---------------|-------|
| `rounded-none` | ✓ Primary | 307 uses | ✓ Most used |
| `rounded-full` | ✓ Circles | 285 uses | ✓ Traffic lights |
| `rounded-lg` | ✓ Dashboard | 85 uses | ✓ |
| `rounded-md` | ✓ Forms | 36 uses | ✓ |
| `rounded-brutal` | ❌ NOT DOCUMENTED | 62 uses | **ADD TO DOCS** |
| `rounded-sm` | ❌ NOT DOCUMENTED | 5 uses | **ADD TO DOCS** |
| `rounded` (default) | ❌ NOT DOCUMENTED | 53 uses | **ADD TO DOCS** |

### Spacing Gaps

| Gap | Documented | Actually Used | Delta |
|-----|------------|---------------|-------|
| `gap-1` | ✓ | 34 uses | ✓ |
| `gap-1.5` | ✓ | 74 uses | ✓ Traffic lights |
| `gap-2` | ✓ | 438 uses | ✓ Most used |
| `gap-3` | ✓ | 157 uses | ✓ |
| `gap-4` | ✓ | 139 uses | ✓ |
| `gap-6` | ✓ | 46 uses | ✓ |
| `gap-8` | ✓ | 8 uses | ✓ |
| `gap-12` | ✓ | 4 uses | ✓ |
| `gap-0.5` | ❌ NOT DOCUMENTED | 1 use | Minor |

### Colors

| Color | Documented | Actually Used | Delta |
|-------|------------|---------------|-------|
| `text-muted-foreground` | ✓ | 1,942 uses | ✓ Most used |
| `text-foreground` | ✓ | 304 uses | ✓ |
| `text-primary` | ✓ | 264 uses | ✓ |
| `text-success` | ✓ | 186 uses | ✓ |
| `text-destructive` | ✓ | 105 uses | ✓ |
| `bg-card` | ✓ | 400 uses | ✓ Most used |
| `bg-muted` | ✓ | 306 uses | ✓ |
| `bg-primary` | ✓ | 111 uses | ✓ |
| `bg-white` | ❌ NOT DOCUMENTED | 7 uses | **AVOID - use bg-background** |
| `bg-black/10` | ❌ NOT DOCUMENTED | 5 uses | **AVOID - use tokens** |

---

## 4. Required Fixes

### Critical (Fix Now)

| Issue | Location | Fix |
|-------|----------|-----|
| `font-black` undocumented | 31 files | Add to DESIGN_SYSTEM.md |
| `rounded-brutal` undocumented | 62 files | Add to DESIGN_SYSTEM.md |
| `bg-white` usage | 7 files | Replace with `bg-background` |
| `bg-black/10` usage | 5 files | Replace with `bg-muted` or token |
| `text-8xl` undocumented | 1 file | Add to DESIGN_SYSTEM.md |

### Minor (Track)

| Issue | Count | Note |
|-------|-------|------|
| `text-[10px]` | 3 uses | Deprecate - use `text-xs` |
| `rounded-sm` | 5 uses | Document or standardize |
| `rounded` (bare) | 53 uses | Document or replace |

---

## 5. Canonical Classes Reference

### Use These (Approved)

```
Typography:
  font-mono text-xs text-muted-foreground  (labels)
  font-mono text-sm text-muted-foreground  (body)
  font-mono text-lg font-bold              (h2)
  font-mono text-2xl font-bold lg:text-3xl (h1)

Colors:
  text-foreground / text-muted-foreground
  text-primary / text-primary-foreground
  text-success / text-destructive / text-warning
  bg-background / bg-card / bg-muted
  bg-primary / bg-primary/10
  border-border / border-primary/50

Spacing:
  p-4 / p-6 (cards)
  px-3 py-1 (badges)
  gap-2 / gap-3 / gap-4 (flex/grid)
  space-y-2 / space-y-4 / space-y-6 (stacks)
  mb-4 / mb-6 / mb-8 (margins)

Borders:
  border border-border (standard)
  rounded-none (terminal aesthetic)
  rounded-full (circles only)

Interactive:
  transition-colors
  hover:border-primary/50
  hover:text-foreground
  hover:bg-muted/50
```

### Avoid These (Non-Standard)

```
❌ bg-white          → ✓ bg-background
❌ bg-black/10       → ✓ bg-muted
❌ text-[10px]       → ✓ text-xs
❌ rounded (bare)    → ✓ rounded-none or rounded-lg
❌ h-4 w-4          → ✓ size-4
```

---

## 6. File Locations

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS variables, colors |
| `src/components/landing/*.tsx` | Gold standard components |
| `src/components/ui/*.tsx` | Base components (don't modify) |
| `DESIGN_SYSTEM.md` | Full documentation |
| `FABRK_STYLE_GUIDE.md` | This quick reference |

---

*Generated from 10,002 styles extracted across 320 TSX files.*
