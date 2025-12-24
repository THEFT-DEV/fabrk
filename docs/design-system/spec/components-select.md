# Select Component Specification

> Canonical implementation for all dropdown selects in Fabrk.

---

## Overview

**Select** is a molecule-level component for dropdown selection. It follows terminal aesthetic with sharp corners, mono font, and keyboard navigation.

---

## Canonical Implementation

### Import

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
```

### Basic Usage

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

## Token Mappings

| Property           | Token                     | Value (Terminal Theme)             |
| ------------------ | ------------------------- | ---------------------------------- |
| Trigger Background | `color.bg.background`     | `bg-background`                    |
| Trigger Border     | `color.border.default`    | `border` (1px)                     |
| Content Background | `color.bg.popover`        | `bg-popover`                       |
| Border Radius      | `radius.semantic.select`  | `rounded-none` (via `mode.radius`) |
| Font Family        | `font.family.mono`        | `font-mono` (via `mode.font`)      |
| Font Size          | `font.size.xs`            | `text-xs` (12px)                   |
| Height             | `size.component.select`   | `h-8` desktop, `h-[48px]` mobile   |
| Padding            | `space.component.padding` | `px-4`                             |

---

## Subcomponents

### SelectTrigger

```tsx
<SelectTrigger
  className={cn(
    'bg-background flex h-[48px] w-full items-center justify-between border px-4 text-xs sm:h-8',
    mode.radius,
    mode.font
  )}
/>
```

### SelectContent

```tsx
<SelectContent
  className={cn(
    'bg-popover text-popover-foreground relative z-50 max-h-96 min-w-32 overflow-hidden border',
    mode.radius
  )}
/>
```

### SelectItem

```tsx
<SelectItem
  className={cn(
    'hover:bg-primary hover:text-primary-foreground relative flex h-[48px] w-full cursor-default items-center pr-2 pl-8 text-xs sm:h-auto sm:py-2',
    mode.radius,
    mode.font
  )}
/>
```

---

## Props

### Select

| Prop            | Type       | Default | Description                 |
| --------------- | ---------- | ------- | --------------------------- |
| `value`         | `string`   | -       | Controlled value            |
| `onValueChange` | `function` | -       | Callback when value changes |
| `defaultValue`  | `string`   | -       | Default uncontrolled value  |

### SelectTrigger

| Prop        | Type     | Default | Description        |
| ----------- | -------- | ------- | ------------------ |
| `className` | `string` | -       | Additional styling |

### SelectItem

| Prop       | Type      | Default      | Description  |
| ---------- | --------- | ------------ | ------------ |
| `value`    | `string`  | **REQUIRED** | Item value   |
| `disabled` | `boolean` | `false`      | Disable item |

---

## Common Patterns

### With Label

```tsx
<div className="space-y-2">
  <Label htmlFor="role">{formatLabel('Role')}</Label>
  <Select>
    <SelectTrigger id="role">
      <SelectValue placeholder="Select role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### With Groups

```tsx
<SelectContent>
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
    <SelectItem value="celery">Celery</SelectItem>
  </SelectGroup>
</SelectContent>
```

### Compact (Pagination)

```tsx
<Select>
  <SelectTrigger className="h-8 w-[70px] font-semibold">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="10" className="font-semibold">
      10
    </SelectItem>
    <SelectItem value="20" className="font-semibold">
      20
    </SelectItem>
    <SelectItem value="50" className="font-semibold">
      50
    </SelectItem>
  </SelectContent>
</Select>
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded radius
<SelectTrigger className="rounded-md">

// CORRECT - let mode.radius apply
<SelectTrigger>
```

### ❌ Using align prop on SelectContent

```tsx
// WRONG - align prop causes issues
<SelectContent align="start">

// CORRECT - let automatic positioning handle it
<SelectContent>
```

---

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- Checkmark indicator for selected item
- WCAG 2.1 AA touch targets (48px mobile)
- Focus ring on trigger

---

## Files

- **Component:** `src/components/ui/select.tsx`
- **Spec:** `design-system/spec/components-select.md`
- **Usage Examples:** `src/app/docs/components/select/page.tsx`

---

_Select Component Specification v1.0.0_
