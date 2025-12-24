# Component Specifications

> Token mappings, variants, and patterns for all UI components.

**Version:** 2.0.0  
**Status:** FROZEN

---

## Component Hierarchy

```
ORGANISMS (Complex, composed)
├─ DataTable, Form, Modal, Navigation, Sidebar

MOLECULES (Simple combinations)
├─ Card, InputGroup, FormField, Alert, Menu

ATOMS (Primitive, single-purpose)
├─ Button, Input, Badge, Avatar, Icon, Label
```

---

## Universal Component Rules

### 1. Token Usage

Components MUST use semantic tokens from `@/design-system`:

```typescript
import { mode } from "@/design-system";

// CORRECT
className={cn("border", mode.radius, mode.font)}

// INCORRECT
className="border rounded-none font-mono"
```

### 2. Variant Naming

| Type         | Convention | Values                                            |
| ------------ | ---------- | ------------------------------------------------- |
| Visual style | `variant`  | `default`, `outline`, `ghost`, `link`             |
| Intent/tone  | `tone`     | `neutral`, `danger`, `success`, `warning`, `info` |
| Size         | `size`     | `sm`, `md`, `lg`, `xl`                            |
| State        | `is*`      | `isDisabled`, `isLoading`, `isActive`             |

### 3. Accessibility Requirements

All components MUST:

- Support keyboard navigation
- Have visible focus indicators (2px ring)
- Meet 44px touch target minimum on mobile
- Include appropriate ARIA attributes

---

## Atoms

### Button

**Role:** Primary interactive element for actions.

**Props:**

| Prop         | Type                                                       | Default   | Description          |
| ------------ | ---------------------------------------------------------- | --------- | -------------------- |
| `variant`    | `default` \| `secondary` \| `outline` \| `ghost` \| `link` | `default` | Visual style         |
| `size`       | `sm` \| `md` \| `lg` \| `xl` \| `icon`                     | `md`      | Button size          |
| `tone`       | `neutral` \| `danger`                                      | `neutral` | Intent               |
| `isLoading`  | `boolean`                                                  | `false`   | Show loading state   |
| `isDisabled` | `boolean`                                                  | `false`   | Disable interactions |

**Token Mappings:**

| Property       | Token                                 |
| -------------- | ------------------------------------- |
| Border radius  | `mode.radius` (theme-resolved)        |
| Font family    | `mode.font` (theme-resolved)          |
| Text transform | `mode.textTransform` (theme-resolved) |
| Focus ring     | `ring`, `ring-offset-2`               |

**Sizes:**

| Size   | Height | Padding               | Font Size   |
| ------ | ------ | --------------------- | ----------- |
| `sm`   | 32px   | `space-2` x `space-3` | `text-xs`   |
| `md`   | 40px   | `space-2` x `space-4` | `text-sm`   |
| `lg`   | 48px   | `space-3` x `space-6` | `text-base` |
| `xl`   | 56px   | `space-4` x `space-8` | `text-lg`   |
| `icon` | 40px   | `space-2`             | —           |

**Terminal Formatting:**

- Button text: `> ACTION_NAME` (uppercase, underscore spaces)
- Loading state: `> LOADING...`

---

### Input

**Role:** Text entry field for forms.

**Props:**

| Prop         | Type                 | Default | Description    |
| ------------ | -------------------- | ------- | -------------- |
| `size`       | `sm` \| `md` \| `lg` | `md`    | Input size     |
| `isInvalid`  | `boolean`            | `false` | Error state    |
| `isDisabled` | `boolean`            | `false` | Disabled state |

**Token Mappings:**

| Property      | Token                |
| ------------- | -------------------- |
| Background    | `bg-card`            |
| Border        | `border-border`      |
| Border radius | `mode.radius`        |
| Font family   | `mode.font`          |
| Focus         | `ring-1 ring-ring`   |
| Error         | `border-destructive` |

**Sizes:**

| Size | Height | Padding                 | Font Size   |
| ---- | ------ | ----------------------- | ----------- |
| `sm` | 32px   | `space-1.5` x `space-2` | `text-xs`   |
| `md` | 40px   | `space-2` x `space-3`   | `text-sm`   |
| `lg` | 48px   | `space-2.5` x `space-4` | `text-base` |

---

### Badge

**Role:** Status indicator, label, or count.

**Props:**

| Prop      | Type                                                      | Default   | Description  |
| --------- | --------------------------------------------------------- | --------- | ------------ |
| `variant` | `default` \| `secondary` \| `outline`                     | `default` | Visual style |
| `tone`    | `neutral` \| `success` \| `warning` \| `danger` \| `info` | `neutral` | Intent       |
| `size`    | `sm` \| `md`                                              | `md`      | Badge size   |

**Token Mappings:**

| Property       | Token                                          |
| -------------- | ---------------------------------------------- |
| Border radius  | `mode.radius` (terminal: `sm`, others: `full`) |
| Font family    | `mode.font`                                    |
| Text transform | `mode.textTransform`                           |

**Terminal Formatting:**

- Text: `UPPERCASE` with tight letter spacing

---

### Label

**Role:** Form field label.

**Props:**

| Prop       | Type      | Default | Description             |
| ---------- | --------- | ------- | ----------------------- |
| `required` | `boolean` | `false` | Show required indicator |

**Token Mappings:**

| Property       | Token                |
| -------------- | -------------------- |
| Font family    | `mode.font`          |
| Font size      | `text-sm`            |
| Font weight    | `font-medium`        |
| Text transform | `mode.textTransform` |

**Terminal Formatting:**

- Label text: `[LABEL]:` (brackets, uppercase)

---

### Avatar

**Role:** User or entity representation.

**Props:**

| Prop       | Type                                 | Default | Description       |
| ---------- | ------------------------------------ | ------- | ----------------- |
| `size`     | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md`    | Avatar size       |
| `src`      | `string`                             | —       | Image URL         |
| `fallback` | `string`                             | —       | Initials fallback |

**Token Mappings:**

| Property      | Token                                            |
| ------------- | ------------------------------------------------ |
| Border radius | `mode.radius` (terminal: `none`, others: `full`) |
| Border        | `border-border` (optional)                       |

**Sizes:**

| Size | Dimensions | Font Size   |
| ---- | ---------- | ----------- |
| `xs` | 24px       | `text-2xs`  |
| `sm` | 32px       | `text-xs`   |
| `md` | 40px       | `text-sm`   |
| `lg` | 48px       | `text-base` |
| `xl` | 64px       | `text-lg`   |

---

## Molecules

### Card

**Role:** Container for grouped content. Critical component for layout.

See [components-card.md](./components-card.md) for full specification.

**Quick Reference:**

| Prop          | Type                                                         | Default   | Description    |
| ------------- | ------------------------------------------------------------ | --------- | -------------- |
| `tone`        | `neutral` \| `primary` \| `success` \| `warning` \| `danger` | `neutral` | Border color   |
| `size`        | `auto` \| `full`                                             | `full`    | Width behavior |
| `interactive` | `boolean`                                                    | `false`   | Hover state    |

**Subcomponents:**

- `Card` — Main container
- `CardHeader` — Header with code and title
- `CardContent` — Content area
- `CardFooter` — Footer with actions
- `PageBadge` — Page-level badge
- `Badge` — Inline badge

---

### Alert

**Role:** Important message or status.

**Props:**

| Prop      | Type                                         | Default   | Description  |
| --------- | -------------------------------------------- | --------- | ------------ |
| `variant` | `default` \| `destructive`                   | `default` | Visual style |
| `tone`    | `info` \| `success` \| `warning` \| `danger` | `info`    | Intent       |

**Token Mappings:**

| Property      | Token                        |
| ------------- | ---------------------------- |
| Border radius | `mode.radius`                |
| Padding       | `space-4`                    |
| Border        | `border-l-4` with tone color |

**Tone Colors:**

| Tone      | Background          | Border               | Icon Color         |
| --------- | ------------------- | -------------------- | ------------------ |
| `info`    | `bg-info/10`        | `border-info`        | `text-info`        |
| `success` | `bg-success/10`     | `border-success`     | `text-success`     |
| `warning` | `bg-warning/10`     | `border-warning`     | `text-warning`     |
| `danger`  | `bg-destructive/10` | `border-destructive` | `text-destructive` |

---

### Tabs

**Role:** Organize content into switchable panels.

**Props:**

| Prop      | Type                                | Default   | Description  |
| --------- | ----------------------------------- | --------- | ------------ |
| `variant` | `default` \| `pills` \| `underline` | `default` | Visual style |

**Token Mappings:**

| Property         | Token                            |
| ---------------- | -------------------------------- |
| Border radius    | `mode.radius`                    |
| Font family      | `mode.font`                      |
| Active indicator | `bg-primary` or `border-primary` |

---

### Menu / Dropdown

**Role:** List of actions or options.

**Token Mappings:**

| Property      | Token           |
| ------------- | --------------- |
| Background    | `bg-popover`    |
| Border        | `border-border` |
| Border radius | `mode.radius`   |
| Shadow        | `shadow-md`     |
| Min width     | 180px           |

**Menu Item:**

| Property  | Token                 |
| --------- | --------------------- |
| Padding   | `space-2` x `space-3` |
| Font size | `text-sm`             |
| Hover     | `bg-muted`            |

---

## Organisms

### DataTable

**Role:** Display and interact with tabular data.

**Token Mappings:**

| Property          | Token                                 |
| ----------------- | ------------------------------------- |
| Header background | `bg-muted`                            |
| Header font       | `mode.font`, `text-xs`, `font-medium` |
| Cell padding      | `space-3` x `space-4`                 |
| Row border        | `border-border`                       |
| Hover row         | `bg-muted/50`                         |

---

### Modal / Dialog

**Role:** Focused interaction overlay.

**Token Mappings:**

| Property      | Token           |
| ------------- | --------------- |
| Background    | `bg-card`       |
| Border radius | `mode.radius`   |
| Shadow        | `shadow-lg`     |
| Backdrop      | `bg-black/80`   |
| Max width     | 480px (default) |
| Padding       | `space-6`       |

**Subcomponents:**

- `DialogHeader` — Title and close button
- `DialogTitle` — `text-lg`, `font-semibold`
- `DialogDescription` — `text-sm`, `text-muted-foreground`
- `DialogContent` — Main area
- `DialogFooter` — Action buttons

---

### Sidebar

**Role:** Secondary navigation for apps.

**Token Mappings:**

| Property          | Token                           |
| ----------------- | ------------------------------- |
| Width (expanded)  | 240px                           |
| Width (collapsed) | 64px                            |
| Background        | `bg-card`                       |
| Border            | `border-r border-border`        |
| Item height       | 40px                            |
| Active item       | `bg-primary/10`, `text-primary` |

---

## Component Token Summary

| Component | Radius        | Font        | Shadow  | Border       |
| --------- | ------------- | ----------- | ------- | ------------ |
| Button    | `mode.radius` | `mode.font` | none/xs | none         |
| Input     | `mode.radius` | `mode.font` | none    | `border`     |
| Card      | `mode.radius` | —           | none/sm | `border`     |
| Badge     | sm/full       | `mode.font` | none    | none         |
| Alert     | `mode.radius` | —           | none    | `border-l-4` |
| Dialog    | `mode.radius` | —           | lg      | `border`     |
| Dropdown  | `mode.radius` | —           | md      | `border`     |

---

## Responsive Patterns

### Button Groups

```
Mobile:    [Full Width Button]
           [Full Width Button]

Desktop:   [Button] [Button] [Button]
```

### Cards

```
Mobile:    1 column, full width

Tablet:    2 columns

Desktop:   3-4 columns
```

### Navigation

```
Mobile:    Hamburger → Slide drawer

Desktop:   Horizontal navbar
```

---

_Component Specifications Version 2.0.0 - FROZEN_
