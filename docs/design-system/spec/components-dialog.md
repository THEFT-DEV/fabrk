# Dialog Component Specification

> Canonical implementation for all modal dialogs in Fabrk.

---

## Overview

**Dialog** is a molecule-level component for modal content. It follows terminal aesthetic with sharp corners, backdrop blur, and structured header/footer sections.

---

## Canonical Implementation

### Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
```

### Basic Usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>> OPEN_DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text.</DialogDescription>
    </DialogHeader>
    <div className="py-4">Content goes here</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">> CANCEL</Button>
      </DialogClose>
      <Button>> CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Token Mappings

| Property           | Token                    | Value (Terminal Theme)                  |
| ------------------ | ------------------------ | --------------------------------------- |
| Overlay            | `color.bg.overlay`       | `bg-background/80` + `backdrop-blur-sm` |
| Content Background | `color.bg.background`    | `bg-background`                         |
| Border             | `color.border.default`   | `border` (1px)                          |
| Border Radius      | `radius.semantic.dialog` | `rounded-none` (via `mode.radius`)      |
| Padding            | `space.component.dialog` | `p-6` (24px)                            |
| Gap                | `space.gap`              | `gap-4` (16px)                          |
| Max Width          | `size.dialog.default`    | `max-w-lg`                              |

---

## Subcomponents

### DialogOverlay

```tsx
<DialogOverlay className="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm" />
```

### DialogContent

```tsx
<DialogContent
  className={cn(
    'bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6',
    mode.radius
  )}
/>
```

### DialogHeader

```tsx
<DialogHeader className="flex flex-col gap-2 text-center sm:text-left" />
```

### DialogTitle

```tsx
<DialogTitle className="text-lg leading-none font-semibold tracking-tight" />
```

### DialogDescription

```tsx
<DialogDescription className={cn('text-muted-foreground text-xs', mode.font)} />
```

### DialogFooter

```tsx
<DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2" />
```

---

## Props

### Dialog

| Prop           | Type       | Default | Description                 |
| -------------- | ---------- | ------- | --------------------------- |
| `open`         | `boolean`  | -       | Controlled open state       |
| `onOpenChange` | `function` | -       | Callback when state changes |

### DialogContent

| Prop        | Type     | Default | Description        |
| ----------- | -------- | ------- | ------------------ |
| `className` | `string` | -       | Additional styling |

---

## Common Patterns

### Confirmation Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">> DELETE</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">> CANCEL</Button>
      </DialogClose>
      <Button variant="destructive">> DELETE</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Form Dialog

```tsx
<DialogContent className="max-w-md">
  <DialogHeader>
    <DialogTitle>Edit Profile</DialogTitle>
  </DialogHeader>
  <form className="space-y-4">
    <div className="space-y-2">
      <Label>{formatLabel("Name")}</Label>
      <Input placeholder="Your name" />
    </div>
    <DialogFooter>
      <Button type="submit">> SAVE</Button>
    </DialogFooter>
  </form>
</DialogContent>
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded radius
<DialogContent className="rounded-lg">

// CORRECT - let mode.radius apply
<DialogContent>
```

### ❌ Missing DialogTitle

```tsx
// WRONG - no title (bad for accessibility)
<DialogContent>
  <p>Content only</p>
</DialogContent>

// CORRECT - always include title
<DialogContent>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
  <p>Content</p>
</DialogContent>
```

---

## Accessibility

- Uses Radix UI Dialog primitives with full a11y
- Focus trapped within dialog when open
- Escape key closes dialog
- DialogTitle required for screen readers
- Close button has `sr-only` label

---

## Files

- **Component:** `src/components/ui/dialog.tsx`
- **Spec:** `design-system/spec/components-dialog.md`
- **Usage Examples:** `src/app/docs/components/dialog/page.tsx`

---

_Dialog Component Specification v1.0.0_
