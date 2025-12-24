# Card Component Specification

Version: 1.2.0
Last Updated: 2025-12-15

> **Animation Guide**: See [Card Animation Guide](./card-animations.md) for Pattern 1 (Animated Marketing) vs Pattern 2 (Static Content) decision making, animation recipes, and performance implications.

## Overview

The Card component system provides a unified API for all card-like UI patterns in Fabrk. It supports two visual modes:

- **Terminal Style** (default): Sharp edges, monospace font, hex code headers
- **Modern Style**: Rounded corners, system font (via theme tokens)

---

## When to Animate

Fabrk uses **two distinct card patterns** optimized for different contexts:

### Pattern 1: Animated Marketing Cards
Use for landing pages, feature showcases, benefits sections. Requires Framer Motion (+50KB bundle).

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, delay: index * 0.15 }}
  className="h-full"
>
  <Card className="h-full">
    <CardHeader code="0x01" title="FEATURES" icon={<Icon />} />
    <CardContent>Content</CardContent>
  </Card>
</motion.div>
```

### Pattern 2: Static Content Cards
Use for documentation, dashboards, settings pages. Server-renderable, 0KB additional bundle.

```tsx
<Card>
  <CardHeader code="0x01" title="DOCS" />
  <CardContent>Content</CardContent>
</Card>
```

**Decision Tree**:
- Landing page? → Pattern 1
- Marketing page? → Pattern 1
- Documentation? → Pattern 2
- Dashboard? → Pattern 2
- Settings page? → Pattern 2

**Full guide**: [Card Animation Guide](./card-animations.md)

---

## Component Hierarchy

```
Card (container)
├── CardHeader (optional)
├── CardContent (required for cards with body)
└── CardFooter (optional)

Badge (standalone inline element, NOT a card)
```

---

## Component API

### Card

The canonical card component for the design system.

```tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader
    code="0x00"
    title="SECTION_TITLE"
    icon={<Icon className="size-4" />}
    meta="optional metadata"
  />
  <CardContent>{children}</CardContent>
</Card>;
```

#### Props

| Prop          | Type                                                           | Default     | Description                                                  |
| ------------- | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `tone`        | `"neutral" \| "primary" \| "success" \| "warning" \| "danger"` | `"neutral"` | Color tone for borders/accents                               |
| `size`        | `"auto" \| "full"`                                             | `"full"`    | Height behavior: "auto" = natural, "full" = h-full for grids |
| `interactive` | `boolean`                                                      | `false`     | Enable hover/focus states                                    |
| `as`          | `"div" \| "article" \| "section"`                              | `"div"`     | Semantic HTML element                                        |

#### Size Variants

| Size   | CSS            | Use Case                                             |
| ------ | -------------- | ---------------------------------------------------- |
| `auto` | Natural height | Standalone cards, notes, non-grid layouts, FAQ items |
| `full` | `h-full`       | Equal-height card grids (default)                    |

**Important:** Use `size="auto"` when the card is NOT in a grid or when you don't need equal heights.

#### Subcomponents

##### CardHeader

| Prop    | Type                  | Default     | Description                           |
| ------- | --------------------- | ----------- | ------------------------------------- |
| `code`  | `string`              | `"0x00"`    | Hex code displayed in brackets        |
| `title` | `string`              | required    | Title in UPPERCASE_SNAKE_CASE         |
| `icon`  | `ReactNode`           | `undefined` | Icon displayed on right               |
| `meta`  | `string \| ReactNode` | `undefined` | Additional metadata (e.g., "8 items") |

##### CardContent

| Prop      | Type                   | Default | Description          |
| --------- | ---------------------- | ------- | -------------------- |
| `padding` | `"sm" \| "md" \| "lg"` | `"md"`  | Content padding size |

---

### Badge

Inline badge element for section headers and labels. **This is NOT a card.**

```tsx
import { Badge } from '@/components/ui/card';

<Badge code="0x00" label="SYSTEM_INIT" meta="SAAS_BOILERPLATE_v2.0" />;
```

#### Props

| Prop    | Type     | Default     | Description                    |
| ------- | -------- | ----------- | ------------------------------ |
| `code`  | `string` | `"0x00"`    | Hex code displayed in brackets |
| `label` | `string` | required    | Primary label text             |
| `meta`  | `string` | `undefined` | Optional metadata after label  |

#### Output Format

```
[ [0xXX] LABEL ] META
```

#### When to Use Badge vs Card

| Use Case                  | Component          |
| ------------------------- | ------------------ |
| Section header label      | `Badge`            |
| Page section badge        | `Badge`            |
| Trust/status indicator    | `Badge`            |
| Feature card with content | `Card`             |
| Stat display              | `Card`             |
| Accordion/expandable      | `Card size="auto"` |

---

## Visual Specifications

### Typography

| Element            | Token                   | Value     |
| ------------------ | ----------------------- | --------- |
| Header text        | `text-xs`               | 12px      |
| Header font        | `mode.font`             | font-mono |
| Content title      | `text-xs font-semibold` | 12px bold |
| Content body       | `text-xs`               | 12px      |
| Description prefix | `text-muted-foreground` | "DESC: "  |

### Spacing (8-Point Grid)

| Element              | Token       | Value      |
| -------------------- | ----------- | ---------- |
| Header padding       | `px-4 py-2` | 16px / 8px |
| Content padding (sm) | `p-2`       | 8px        |
| Content padding (md) | `p-4`       | 16px       |
| Content padding (lg) | `p-6`       | 24px       |
| Grid gap             | `gap-6`     | 24px       |

### Colors

| Element      | Token                   | Description      |
| ------------ | ----------------------- | ---------------- |
| Background   | `bg-card`               | Card background  |
| Border       | `border-border`         | Default border   |
| Border hover | `border-primary/50`     | Hover state      |
| Header text  | `text-muted-foreground` | Subdued text     |
| Content text | `text-foreground`       | Primary text     |
| Icon default | `text-muted-foreground` | Icon color       |
| Icon hover   | `text-primary`          | Icon hover color |

### Border & Radius

| Element       | Token         | Description                                  |
| ------------- | ------------- | -------------------------------------------- |
| Border width  | `border`      | 1px solid                                    |
| Radius        | `mode.radius` | From visual mode (rounded-none for terminal) |
| Header border | `border-b`    | Bottom separator                             |

---

## Variants

### default

```tsx
// Standard card with border
className = 'border-border bg-card border';
```

### outline

```tsx
// Outline only, no background
className = 'border-border border bg-transparent';
```

### ghost

```tsx
// No border, subtle background on hover
className = 'bg-transparent hover:bg-muted/50';
```

### accent

```tsx
// Accent background
className = 'border-border bg-accent/30 border';
```

### featured

```tsx
// Primary border for highlighted cards
className = 'border-primary bg-card border';
```

---

## Tones

### neutral (default)

```tsx
borderColor: 'border-border';
```

### primary

```tsx
borderColor: 'border-primary';
```

### success

```tsx
borderColor: 'border-success';
```

### warning

```tsx
borderColor: 'border-warning';
```

### danger

```tsx
borderColor: 'border-destructive';
```

---

## Usage Patterns

### Grid Card (Most Common)

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item, index) => (
    <Card key={item.id} interactive>
      <CardHeader
        code={`0x${index.toString(16).toUpperCase().padStart(2, '0')}`}
        title={item.title.toUpperCase().replace(/ /g, '_')}
        icon={<item.icon className="size-4" />}
      />
      <CardContent withDesc>{item.description}</CardContent>
    </Card>
  ))}
</div>
```

### Feature List Card

```tsx
<Card>
  <CardHeader code="0x00" title="INCLUDED_FEATURES" meta={`${features.length} items`} />
  <CardContent>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-xs">
          <span className="text-primary flex-shrink-0">
            {i === features.length - 1 ? '└─' : '├─'}
          </span>
          <span className="text-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>
```

### Metric/Stat Card

```tsx
<Card>
  <CardHeader code="0x50" title="METRIC_NAME" icon={<TrendingUp className="size-4" />} />
  <CardContent>
    <div className="text-foreground mb-2 text-3xl font-semibold">85%</div>
    <div className="text-foreground mb-3 text-xs font-semibold">TEST_COVERAGE</div>
    <div className="text-xs">
      <span className="text-muted-foreground">DESC: </span>
      <span className="text-foreground">Core components covered</span>
    </div>
  </CardContent>
</Card>
```

### Hero Status Card (Style A Exception)

```tsx
// Hero cards use inline header pattern, NOT Card component
<div className="border-border bg-card mx-auto max-w-2xl border p-4 text-left">
  <div className="text-muted-foreground mb-4 text-xs">
    [ [0x01] STATUS ]────────────────────────
  </div>
  <p className="text-muted-foreground mb-4 text-sm">{description}</p>
  <div className="flex flex-wrap gap-4 text-sm">
    <span>
      <span className="text-muted-foreground">Label:</span>{' '}
      <span className="text-primary">VALUE</span>
    </span>
  </div>
</div>
```

---

## Migration Mapping

| Current Card                      | Migration Path         |
| --------------------------------- | ---------------------- |
| Legacy card + inline styles       | `Card`                 |
| `StyledCard` + `StyledCardHeader` | Already canonical      |
| `DocsCard`                        | Uses `Card` internally |
| `KpiCard`                         | Add `CardHeader`       |
| `MemberCard`                      | Add `CardHeader`       |
| `OrgCard`                         | Add `CardHeader`       |
| Inline grid cards                 | Use `Card`             |

---

## Accessibility

- Cards use semantic HTML (`article` for standalone, `section` for grouped)
- Focus ring on interactive cards: `focus-within:ring-primary focus-within:ring-2`
- Headers are `<div>` not `<h*>` to avoid heading hierarchy issues
- Icons have `aria-hidden="true"` when decorative

---

## Implementation Notes

1. **Equal Heights**: Use `h-full flex flex-col` on card, `flex-1` on content
2. **Hover States**: Only apply to interactive cards
3. **Icon Transitions**: `transition-colors` for smooth hover
4. **Grid Gaps**: Always use `gap-6` for card grids
5. **Header Icons**: Always `size-4` and aligned right
