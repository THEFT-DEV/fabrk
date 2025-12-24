# Alert Component Specification

> Canonical implementation for all alert/notification messages in Fabrk.

---

## Overview

**Alert** is a molecule-level component for displaying important messages. It follows terminal aesthetic with sharp corners, mono font, and semantic color variants.

---

## Canonical Implementation

### Import

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
```

### Basic Usage

```tsx
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>
```

---

## Token Mappings

| Property      | Token                           | Value (Terminal Theme)             |
| ------------- | ------------------------------- | ---------------------------------- |
| Background    | `color.bg.primary`              | `bg-primary`                       |
| Text          | `color.text.primary-foreground` | `text-primary-foreground`          |
| Border        | `color.border.default`          | `border` (1px)                     |
| Border Radius | `radius.semantic.alert`         | `rounded-none` (via `mode.radius`) |
| Font Family   | `font.family.mono`              | `font-mono` (via `mode.font`)      |
| Font Size     | `font.size.xs`                  | `text-xs` (12px)                   |
| Padding       | `space.component.alert`         | `px-6 py-4`                        |
| Icon Gap      | `space.gap`                     | `gap-x-4` (16px)                   |

---

## Variants

| Variant       | Use Case      | Styling                                      |
| ------------- | ------------- | -------------------------------------------- |
| `default`     | Informational | `bg-primary text-primary-foreground`         |
| `destructive` | Error/warning | `bg-destructive text-destructive-foreground` |
| `success`     | Confirmation  | `bg-accent text-accent-foreground`           |

---

## Subcomponents

### Alert (Container)

```tsx
<Alert
  variant="default" | "destructive" | "success"
  className={cn(alertVariants({ variant }), mode.radius, mode.font)}
/>
```

### AlertTitle

```tsx
<AlertTitle className="col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight" />
```

### AlertDescription

```tsx
<AlertDescription
  className={cn('col-start-2 grid justify-items-start gap-1 text-xs font-normal', mode.font)}
/>
```

---

## Props

### Alert

| Prop      | Type     | Default     | Description  |
| --------- | -------- | ----------- | ------------ |
| `variant` | `string` | `"default"` | Visual style |

---

## Common Patterns

### With Icon

```tsx
<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

### Success Alert

```tsx
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>
```

### Without Icon

```tsx
<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is a simple note.</AlertDescription>
</Alert>
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding colors

```tsx
// WRONG - hardcoded color
<Alert className="bg-red-500">Error</Alert>

// CORRECT - use semantic variant
<Alert variant="destructive">Error</Alert>
```

### ❌ Missing AlertTitle for screen readers

```tsx
// WRONG - no title
<Alert>
  <AlertDescription>Message only</AlertDescription>
</Alert>

// CORRECT - include title
<Alert>
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>Message with context</AlertDescription>
</Alert>
```

---

## Accessibility

- Uses `role="alert"` for screen reader announcement
- Icon colors inherit from text for consistency
- AlertTitle provides context for screen readers

---

## Files

- **Component:** `src/components/ui/alert.tsx`
- **Spec:** `design-system/spec/components-alert.md`
- **Usage Examples:** `src/app/docs/components/alert/page.tsx`

---

_Alert Component Specification v1.0.0_
