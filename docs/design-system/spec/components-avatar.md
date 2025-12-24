# Avatar Component Specification

> Canonical implementation for all user/entity avatars in Fabrk.

---

## Overview

**Avatar** is an atom-level component for displaying user or entity images with fallback. It follows terminal aesthetic with sharp corners via `mode.radius`.

---

## Canonical Implementation

### Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
```

### Basic Usage

```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="User name" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Token Mappings

| Property             | Token                    | Value (Terminal Theme)             |
| -------------------- | ------------------------ | ---------------------------------- |
| Border               | `color.border.default`   | `border` (1px)                     |
| Border Radius        | `radius.semantic.avatar` | `rounded-none` (via `mode.radius`) |
| Size                 | `size.component.avatar`  | `h-10 w-10` (40px)                 |
| Fallback Background  | `color.bg.muted`         | `bg-muted`                         |
| Fallback Font        | `font.family.mono`       | `font-mono` (via `mode.font`)      |
| Fallback Font Size   | `font.size.xs`           | `text-xs` (12px)                   |
| Fallback Font Weight | `font.weight.medium`     | `font-medium` (500)                |

---

## Subcomponents

### Avatar (Container)

```tsx
<Avatar className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden border', mode.radius)} />
```

**NEVER hardcode `rounded-none` or `rounded-full` - use `mode.radius`.**

### AvatarImage

```tsx
<AvatarImage
  src="/path/to/image.jpg"
  alt="User name" // REQUIRED
  className="aspect-square h-full w-full"
/>
```

### AvatarFallback

```tsx
<AvatarFallback
  className={cn(
    'bg-muted flex h-full w-full items-center justify-center text-xs font-medium',
    mode.radius,
    mode.font
  )}
/>
```

---

## Size Variants

Apply size to Avatar container:

| Size      | Classes     | Use Case                |
| --------- | ----------- | ----------------------- |
| `sm`      | `h-8 w-8`   | Compact lists, comments |
| `default` | `h-10 w-10` | Standard usage          |
| `lg`      | `h-12 w-12` | Profile headers         |
| `xl`      | `h-16 w-16` | Profile pages           |
| `2xl`     | `h-20 w-20` | Hero sections           |

```tsx
<Avatar className="h-12 w-12">
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Props

### Avatar

| Prop        | Type     | Default | Description        |
| ----------- | -------- | ------- | ------------------ |
| `className` | `string` | -       | Additional styling |

### AvatarImage

| Prop  | Type     | Default      | Description            |
| ----- | -------- | ------------ | ---------------------- |
| `src` | `string` | -            | Image URL              |
| `alt` | `string` | **REQUIRED** | Accessible description |

### AvatarFallback

| Prop       | Type        | Default | Description                   |
| ---------- | ----------- | ------- | ----------------------------- |
| `children` | `ReactNode` | -       | Fallback content (initials)   |
| `delayMs`  | `number`    | -       | Delay before showing fallback |

---

## Design System Integration

The Avatar component automatically applies `mode.radius` from the design system:

```tsx
// Avatar root
cn('relative flex h-10 w-10 shrink-0 overflow-hidden border', mode.radius);

// AvatarFallback
cn(
  'bg-muted flex h-full w-full items-center justify-center text-xs font-medium',
  mode.radius,
  mode.font
);
```

**NEVER override radius - let the component apply `mode.radius`.**

---

## Common Patterns

### With Status Indicator

```tsx
<div className="relative">
  <Avatar>
    <AvatarImage src="/user.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <span className="bg-success border-background absolute -right-1 -bottom-1 h-3 w-3 border-2" />
</div>
```

### Avatar Group

```tsx
import { AvatarGroup } from '@/components/ui/avatar-group';

<AvatarGroup max={4}>
  <Avatar>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
</AvatarGroup>;
```

### Initials Generation

```tsx
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

<AvatarFallback>{getInitials('John Doe')}</AvatarFallback>;
// Renders: JD
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded rounded-none
<Avatar className="h-8 w-8 rounded-none">

// WRONG - hardcoded rounded-full
<Avatar className="h-8 w-8 rounded-full">

// CORRECT - let mode.radius apply
<Avatar className="h-8 w-8">
```

### ❌ Missing AvatarFallback

```tsx
// WRONG - no fallback
<Avatar>
  <AvatarImage src="/user.jpg" />
</Avatar>

// CORRECT - always include fallback
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>U</AvatarFallback>
</Avatar>
```

### ❌ Missing alt text

```tsx
// WRONG - no alt
<AvatarImage src="/user.jpg" />

// CORRECT - always include alt
<AvatarImage src="/user.jpg" alt="John Doe" />
```

---

## Accessibility

- AvatarImage MUST have `alt` attribute
- AvatarFallback provides text alternative
- Decorative avatars should have `alt=""`
- Color contrast in fallback meets WCAG AA

---

## Files

- **Component:** `src/components/ui/avatar.tsx`
- **Spec:** `design-system/spec/components-avatar.md`
- **Usage Examples:** `src/app/docs/components/avatar/page.tsx`

---

_Avatar Component Specification v1.0.0_
