# Input Component Specification

> Canonical implementation for all text input fields in Fabrk.

---

## Overview

**Input** is an atom-level component for text entry. It follows terminal aesthetic with sharp corners, mono font, and clear state indicators.

---

## Canonical Implementation

### Import

```tsx
import { Input } from '@/components/ui/input';
```

### Basic Usage

```tsx
<Input placeholder="Enter email" />
<Input type="password" />
<Input error={hasError} />
<Input loading />
```

---

## Token Mappings

| Property      | Token                     | Value (Terminal Theme)             |
| ------------- | ------------------------- | ---------------------------------- |
| Background    | `color.bg.background`     | `bg-background`                    |
| Border        | `color.border.default`    | `border` (1px)                     |
| Border Radius | `radius.semantic.input`   | `rounded-none` (via `mode.radius`) |
| Font Family   | `font.family.mono`        | `font-mono` (via `mode.font`)      |
| Font Size     | `font.size.xs`            | `text-xs` (12px)                   |
| Height        | `size.component.input`    | `h-8` (32px)                       |
| Padding       | `space.component.padding` | `px-4 py-2`                        |

---

## States

### Default State

```tsx
<Input placeholder="Enter text" />
```

### Error State

```tsx
<Input error placeholder="Invalid input" />
// Applies: border-destructive focus-visible:ring-destructive
```

### Success State

```tsx
<Input success placeholder="Valid input" />
// Applies: focus-visible:ring-success
```

### Loading State

```tsx
<Input loading loadingText="Validating..." />
// Shows spinner, adds aria-busy="true"
```

### Disabled State

```tsx
<Input disabled placeholder="Cannot edit" />
// Applies: disabled:cursor-not-allowed disabled:opacity-50
```

---

## Props

| Prop          | Type      | Default  | Description                |
| ------------- | --------- | -------- | -------------------------- |
| `error`       | `boolean` | `false`  | Show error state           |
| `success`     | `boolean` | `false`  | Show success state         |
| `loading`     | `boolean` | `false`  | Show loading spinner       |
| `loadingText` | `string`  | -        | Screen reader loading text |
| `disabled`    | `boolean` | `false`  | Disable input              |
| `type`        | `string`  | `"text"` | HTML input type            |

---

## Design System Integration

The Input component automatically applies:

```tsx
cn(
  'bg-background flex h-8 w-full border px-4 py-2 text-xs font-normal',
  mode.radius, // rounded-none
  mode.font, // font-mono
  'focus-visible:ring-primary focus-visible:ring-2',
  className
);
```

**NEVER hardcode radius or font - use component defaults.**

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded rounded-none
<Input className="rounded-none" />

// CORRECT - let mode.radius apply
<Input />
```

### ❌ Overriding font

```tsx
// WRONG - overriding font
<Input className="font-sans" />

// CORRECT - let mode.font apply
<Input />
```

### ❌ Custom height outside 8-point grid

```tsx
// WRONG - arbitrary height
<Input className="h-11" />

// CORRECT - use standard heights
<Input /> // h-8 default
```

---

## With Label Pattern

Always pair Input with Label component:

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

<div className="space-y-2">
  <Label htmlFor="email">[EMAIL]:</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>;
```

---

## Accessibility

- Focus ring: `focus-visible:ring-2 focus-visible:ring-primary`
- Error state: `aria-invalid="true"` applied automatically
- Loading state: `aria-busy="true"` applied automatically
- Screen reader support via `loadingText` prop

---

## Files

- **Component:** `src/components/ui/input.tsx`
- **Spec:** `design-system/spec/components-input.md`
- **Usage Examples:** `src/app/docs/components/input/page.tsx`

---

_Input Component Specification v1.0.0_
