# Button Component Specification

> Canonical implementation for all interactive button elements in Fabrk.

---

## Overview

**Button** is an atom-level component for user interactions. It follows terminal aesthetic with uppercase text, sharp corners, and mono font.

---

## Canonical Implementation

### Import

```tsx
import { Button } from '@/components/ui/button';
```

### Basic Usage

```tsx
<Button>> SUBMIT</Button>
<Button variant="outline">> CANCEL</Button>
<Button variant="destructive">> DELETE</Button>
```

---

## Token Mappings

| Property       | Token                           | Value (Terminal Theme)                      |
| -------------- | ------------------------------- | ------------------------------------------- |
| Background     | `color.bg.primary`              | `bg-primary`                                |
| Text           | `color.text.primary-foreground` | `text-primary-foreground`                   |
| Border Radius  | `radius.semantic.button`        | `rounded-none` (via `mode.radius`)          |
| Font Family    | `font.family.mono`              | `font-mono` (via `mode.font`)               |
| Text Transform | `text.transform`                | `uppercase` (via `mode.textTransform`)      |
| Height         | `size.component.button`         | `h-8` (32px) desktop, `min-h-[44px]` mobile |
| Padding        | `space.component.padding`       | `px-4 py-2`                                 |

---

## Text Format Convention

**ALL button text MUST follow terminal format:**

```tsx
// CORRECT - Terminal format
<Button>> SUBMIT</Button>
<Button>> SAVE_CHANGES</Button>
<Button>> DELETE_ACCOUNT</Button>

// WRONG - Non-terminal format
<Button>Submit</Button>
<Button>Save Changes</Button>
```

**Rules:**

1. Start with `>` prefix (space after)
2. ALL UPPERCASE
3. Underscores for multi-word (no spaces)

**Helper function available:**

```tsx
import { formatButtonText } from '@/design-system';
formatButtonText('Save Changes'); // Returns "> SAVE_CHANGES"
```

---

## Variants

### Visual Variants

| Variant       | Use Case          | Styling                                      |
| ------------- | ----------------- | -------------------------------------------- |
| `default`     | Primary action    | `bg-primary text-primary-foreground`         |
| `destructive` | Dangerous actions | `bg-destructive text-destructive-foreground` |
| `outline`     | Secondary action  | `border bg-background`                       |
| `secondary`   | Tertiary action   | `bg-secondary text-secondary-foreground`     |
| `ghost`       | Minimal emphasis  | `hover:bg-foreground/10`                     |
| `link`        | Text link         | `underline-offset-4 hover:underline`         |

### Size Variants

| Size      | Height        | Padding     | Touch Target          |
| --------- | ------------- | ----------- | --------------------- |
| `default` | `h-8` (32px)  | `px-4 py-2` | `min-h-[44px]` mobile |
| `sm`      | `h-8` (32px)  | `px-2`      | `min-h-[44px]` mobile |
| `lg`      | `h-10` (40px) | `px-6`      | `min-h-[44px]` mobile |
| `xl`      | `h-12` (48px) | `px-8`      | `min-h-[44px]` mobile |
| `icon`    | `h-10 w-10`   | -           | `min-h-[44px]` mobile |

---

## Props

| Prop          | Type      | Default        | Description               |
| ------------- | --------- | -------------- | ------------------------- |
| `variant`     | `string`  | `"default"`    | Visual style              |
| `size`        | `string`  | `"default"`    | Size variant              |
| `asChild`     | `boolean` | `false`        | Render as child component |
| `loading`     | `boolean` | `false`        | Show loading spinner      |
| `loadingText` | `string`  | `"Loading..."` | Loading state text        |
| `disabled`    | `boolean` | `false`        | Disable button            |

---

## Design System Integration

The Button component automatically applies:

```tsx
cn(
  buttonVariants({ variant, size }),
  mode.radius, // rounded-none
  mode.font, // font-mono
  mode.textTransform === 'uppercase' && 'uppercase',
  className
);
```

**NEVER hardcode `rounded-none` - use `mode.radius` via the component.**

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded rounded-none
<Button className="rounded-none text-sm">> SUBMIT</Button>

// CORRECT - let mode.radius apply
<Button className="text-sm">> SUBMIT</Button>
```

### ❌ Non-terminal text format

```tsx
// WRONG - lowercase, no prefix
<Button>Submit</Button>

// CORRECT - terminal format
<Button>> SUBMIT</Button>
```

### ❌ Spaces in button text

```tsx
// WRONG - spaces
<Button>> SAVE CHANGES</Button>

// CORRECT - underscores
<Button>> SAVE_CHANGES</Button>
```

---

## Icon Buttons

For icon-only buttons, use `size="icon"`:

```tsx
<Button size="icon" aria-label="Close">
  <X className="h-4 w-4" />
</Button>
```

**Required:** `aria-label` for accessibility.

---

## Loading State

```tsx
<Button loading loadingText="Saving...">
  > SAVE
</Button>
```

Renders spinner + loading text automatically.

---

## Accessibility

- Minimum touch target: 44x44px on mobile (WCAG 2.1 AA)
- Focus ring: `focus-visible:ring-2 focus-visible:ring-primary`
- Loading state: `aria-busy="true"` applied automatically
- Disabled state: `disabled:cursor-not-allowed disabled:opacity-50`

---

## Files

- **Component:** `src/components/ui/button.tsx`
- **Spec:** `design-system/spec/components-button.md`
- **Usage Examples:** `src/app/docs/components/button/page.tsx`

---

_Button Component Specification v1.0.0_
