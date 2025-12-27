# Badge Component Specification

> Canonical implementation for all status indicators and labels in Fabrk.

---

## Overview

**Badge** is an atom-level component for displaying status, categories, and counts. It follows terminal aesthetic with uppercase text, sharp corners, and mono font.

---

## Canonical Implementation

### Import

```tsx
import { Badge } from '@/components/ui/badge';
```

### Basic Usage

```tsx
<Badge>NEW</Badge>
<Badge variant="destructive">ERROR</Badge>
<Badge variant="secondary">DRAFT</Badge>
```

---

## Token Mappings

| Property       | Token                           | Value (Terminal Theme)                 |
| -------------- | ------------------------------- | -------------------------------------- |
| Background     | `color.bg.primary`              | `bg-primary`                           |
| Text           | `color.text.primary-foreground` | `text-primary-foreground`              |
| Border         | `color.border.primary`          | `border-primary`                       |
| Border Radius  | `radius.semantic.badge`         | `rounded-none` (via `mode.radius`)     |
| Font Family    | `font.family.mono`              | `font-mono` (via `mode.font`)          |
| Font Size      | `font.size.xs`                  | `text-xs` (12px)                       |
| Text Transform | `text.transform`                | `uppercase` (via `mode.textTransform`) |
| Padding        | `space.component.badge`         | `px-2 py-2` (sm), `px-4 py-2` (md/lg)  |

---

## Variants

### Visual Variants

| Variant       | Use Case       | Styling                                           |
| ------------- | -------------- | ------------------------------------------------- |
| `default`     | Primary status | `bg-primary text-primary-foreground`              |
| `secondary`   | Muted status   | `bg-secondary text-secondary-foreground`          |
| `accent`      | Highlighted    | `bg-accent text-accent-foreground`                |
| `destructive` | Error/warning  | `bg-destructive text-destructive-foreground`      |
| `neutral`     | Subtle         | `bg-background text-foreground border-foreground` |
| `outline`     | Bordered only  | `bg-transparent border-foreground`                |

### Size Variants

| Size | Padding     | Font Weight     | Icon Size |
| ---- | ----------- | --------------- | --------- |
| `sm` | `px-2 py-2` | `font-semibold` | `size-3`  |
| `md` | `px-4 py-2` | `font-medium`   | `size-3`  |
| `lg` | `px-4 py-2` | `font-semibold` | `size-4`  |

---

## Props

| Prop      | Type      | Default     | Description               |
| --------- | --------- | ----------- | ------------------------- |
| `variant` | `string`  | `"default"` | Visual style              |
| `size`    | `string`  | `"md"`      | Size variant              |
| `asChild` | `boolean` | `false`     | Render as child component |

---

## Design System Integration

The Badge component automatically applies:

```tsx
cn(
  badgeVariants({ variant, size }),
  mode.radius, // rounded-none
  mode.font, // font-mono
  mode.textTransform === 'uppercase' && 'uppercase',
  className
);
```

**Text is automatically uppercase in terminal theme.**

---

## Common Patterns

### Status Badge

```tsx
<Badge variant="default">ACTIVE</Badge>
<Badge variant="secondary">PENDING</Badge>
<Badge variant="destructive">FAILED</Badge>
```

### Count Badge

```tsx
<Badge size="sm">12</Badge>
```

### With Icon

```tsx
<Badge>
  <CheckCircle className="size-3" />
  VERIFIED
</Badge>
```

### As Link

```tsx
<Badge asChild>
  <a href="/category">TUTORIAL</a>
</Badge>
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded rounded
<Badge className="rounded-full">NEW</Badge>

// CORRECT - let mode.radius apply
<Badge>NEW</Badge>
```

### ❌ Lowercase text

```tsx
// WRONG - lowercase (mode.textTransform handles this)
<Badge>new</Badge>

// CORRECT - will be uppercase automatically
<Badge>NEW</Badge>
```

### ❌ Non-standard colors

```tsx
// WRONG - hardcoded color
<Badge className="bg-blue-500">INFO</Badge>

// CORRECT - use semantic variant
<Badge variant="accent">INFO</Badge>
```

---

## Accessibility

- Badges are decorative by default (no role needed)
- If interactive, use `asChild` with proper link/button
- Color alone should not convey meaning (add text)
- Contrast meets WCAG AA requirements

---

## Files

- **Component:** `src/components/ui/badge.tsx`
- **Spec:** `design-system/spec/components-badge.md`
- **Usage Examples:** `src/app/docs/components/badge/page.tsx`

---

_Badge Component Specification v1.0.0_
