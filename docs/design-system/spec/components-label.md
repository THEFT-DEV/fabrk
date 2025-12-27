# Label Component Specification

> Canonical implementation for all form labels in Fabrk.

---

## Overview

**Label** is an atom-level component for form field labels. It follows terminal aesthetic with bracket format, mono font, and semibold weight.

---

## Canonical Implementation

### Import

```tsx
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';
```

### Basic Usage

```tsx
<Label htmlFor="email">{formatLabel("Email")}</Label>
// Renders: [EMAIL]:

<Label htmlFor="password" required>{formatLabel("Password")}</Label>
// Renders: [PASSWORD]: *
```

---

## Token Mappings

| Property    | Token                    | Value (Terminal Theme)        |
| ----------- | ------------------------ | ----------------------------- |
| Font Family | `font.family.mono`       | `font-mono` (via `mode.font`) |
| Font Size   | `font.size.xs`           | `text-xs` (12px)              |
| Font Weight | `font.weight.semibold`   | `font-semibold` (600)         |
| Color       | `color.text.foreground`  | `text-foreground`             |
| Error Color | `color.text.destructive` | `text-destructive`            |

---

## Text Format Convention

**ALL label text MUST follow terminal format:**

```tsx
// CORRECT - Terminal format using formatLabel
<Label>{formatLabel("Email Address")}</Label>
// Output: [EMAIL_ADDRESS]:

// CORRECT - Manual terminal format
<Label>[EMAIL_ADDRESS]:</Label>

// WRONG - Plain text
<Label>Email Address</Label>
```

**Rules:**

1. Wrap in square brackets: `[LABEL]`
2. ALL UPPERCASE
3. Underscores for multi-word
4. Colon suffix: `:`

**Helper function:**

```tsx
import { formatLabel } from '@/design-system';
formatLabel('Email Address'); // Returns "[EMAIL_ADDRESS]:"
```

---

## Props

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `required` | `boolean` | `false` | Show required indicator (\*) |
| `error`    | `boolean` | `false` | Show error state (red text)  |
| `htmlFor`  | `string`  | -       | Associated input ID          |

---

## Design System Integration

The Label component automatically applies:

```tsx
cn(
  'text-xs font-semibold',
  mode.font, // font-mono
  error && 'text-destructive',
  className
);
```

**NEVER override font-weight to font-normal on labels.**

---

## States

### Default State

```tsx
<Label>{formatLabel('Username')}</Label>
// [USERNAME]:
```

### Required State

```tsx
<Label required>{formatLabel('Password')}</Label>
// [PASSWORD]: *
```

### Error State

```tsx
<Label error>{formatLabel('Email')}</Label>
// [EMAIL]: (in red)
```

---

## Anti-Patterns (Do Not Do)

### ❌ Plain text labels

```tsx
// WRONG - plain text
<Label>Email</Label>

// CORRECT - terminal format
<Label>{formatLabel("Email")}</Label>
// Or: <Label>[EMAIL]:</Label>
```

### ❌ Overriding font-weight

```tsx
// WRONG - overriding to font-normal
<Label className="font-normal">Name</Label>

// CORRECT - use default font-semibold
<Label>{formatLabel("Name")}</Label>
```

### ❌ Using text-sm instead of text-xs

```tsx
// WRONG - wrong font size
<Label className="text-sm">Name</Label>

// CORRECT - use default text-xs
<Label>{formatLabel("Name")}</Label>
```

### ❌ Missing htmlFor

```tsx
// WRONG - no association
<Label>Email</Label>
<Input />

// CORRECT - properly associated
<Label htmlFor="email">{formatLabel("Email")}</Label>
<Input id="email" />
```

---

## With Input Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="email" required>
    {formatLabel('Email')}
  </Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

---

## With Error Message Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="email" error>
    {formatLabel('Email')}
  </Label>
  <Input id="email" error />
  <p className="text-destructive font-mono text-xs">[ERROR]: Invalid email format</p>
</div>
```

---

## Accessibility

- Must have `htmlFor` prop matching input `id`
- Required indicator has `aria-label="required"`
- Error state changes color for visual indication
- Works with `peer-disabled` for disabled inputs

---

## Files

- **Component:** `src/components/ui/label.tsx`
- **Spec:** `design-system/spec/components-label.md`
- **Usage Examples:** `src/app/docs/components/label/page.tsx`

---

_Label Component Specification v1.0.0_
