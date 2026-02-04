# Design System Rules for AI

Rules that AI-generated code must follow to maintain design consistency.

---

## Overview

AI assistants often generate code with:
- Hardcoded colors (`#10b981`, `text-green-500`)
- Arbitrary values (`p-[13px]`, `w-[200px]`)
- Custom components instead of system components
- Inline styles instead of Tailwind classes

This guide defines the rules AI must follow.

---

## Color Rules

### Use Semantic Tokens Only

```tsx
// CORRECT - semantic tokens
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border-border">
<div className="text-destructive">

// WRONG - hardcoded colors
<div className="bg-green-500 text-white">
<div className="#10b981">
<div style={{ backgroundColor: 'rgb(16, 185, 129)' }}>
```

### Available Color Tokens

| Token | Usage |
|-------|-------|
| `primary` | Primary brand color |
| `primary-foreground` | Text on primary |
| `secondary` | Secondary actions |
| `secondary-foreground` | Text on secondary |
| `muted` | Subtle backgrounds |
| `muted-foreground` | Subtle text |
| `accent` | Highlights |
| `accent-foreground` | Text on accent |
| `destructive` | Errors, delete actions |
| `destructive-foreground` | Text on destructive |
| `background` | Page background |
| `foreground` | Default text |
| `card` | Card backgrounds |
| `card-foreground` | Card text |
| `border` | Borders |
| `input` | Input borders |
| `ring` | Focus rings |

### What Triggers Errors

```tsx
// ERROR - Tailwind palette colors
<div className="text-red-500">      // Use text-destructive
<div className="bg-blue-600">       // Use bg-primary
<div className="border-gray-200">   // Use border-border

// ERROR - Hex colors
<div style={{ color: '#ff0000' }}>
<div className="text-[#10b981]">

// ERROR - RGB/HSL colors
<div style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
```

---

## Spacing Rules

### Use 8-Point Grid

```tsx
// CORRECT - scale values
<div className="p-4">     // 16px
<div className="gap-6">   // 24px
<div className="mt-8">    // 32px
<div className="px-2">    // 8px

// WRONG - arbitrary values
<div className="p-[13px]">
<div className="gap-[22px]">
<div className="mt-[30px]">
```

### Spacing Scale

| Class | Value | Pixels |
|-------|-------|--------|
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |

---

## Border Radius Rules

### Use Dynamic Radius

```tsx
import { mode } from '@/design-system';

// CORRECT - uses CSS variable
<div className={cn("border", mode.radius)}>

// CORRECT - standard Tailwind
<div className="rounded-lg">
<div className="rounded-full">  // For pills/avatars

// WRONG - arbitrary values
<div className="rounded-[10px]">
<div className="rounded-[0.625rem]">
```

### When to Use mode.radius

| Element | Use mode.radius? |
|---------|-----------------|
| Cards | Yes |
| Buttons | Yes |
| Inputs | Yes |
| Modals | Yes |
| Table cells | No |
| Partial borders (border-t) | No |
| Avatars | No (use rounded-full) |

---

## Component Rules

### Use System Components

```tsx
// CORRECT - system components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

<Button>Click me</Button>
<Card>Content</Card>
<Input placeholder="Enter text" />

// WRONG - custom elements
<button className="bg-blue-500 px-4 py-2 rounded">Click</button>
<div className="border rounded-lg p-4 shadow">Content</div>
<input className="border px-3 py-2 rounded" />
```

### Available Components

| Need | Component | Import |
|------|-----------|--------|
| Button | `<Button>` | `@/components/ui/button` |
| Card | `<Card>` | `@/components/ui/card` |
| Input | `<Input>` | `@/components/ui/input` |
| Select | `<Select>` | `@/components/ui/select` |
| Dialog | `<Dialog>` | `@/components/ui/dialog` |
| Table | `<Table>` | `@/components/ui/table` |
| Badge | `<Badge>` | `@/components/ui/badge` |
| Alert | `<Alert>` | `@/components/ui/alert` |
| Tabs | `<Tabs>` | `@/components/ui/tabs` |
| Tooltip | `<Tooltip>` | `@/components/ui/tooltip` |

See `src/components/ui/` for full list (62+ components).

---

## Typography Rules

### Use Semantic Classes

```tsx
// CORRECT
<h1 className="text-3xl font-bold">Title</h1>
<p className="text-sm text-muted-foreground">Subtitle</p>
<span className="text-xs">Small text</span>

// WRONG - arbitrary sizes
<h1 className="text-[28px]">Title</h1>
<p className="text-[13px]">Text</p>
```

### Text Size Scale

| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-3xl` | 30px |
| `text-4xl` | 36px |

---

## The mode Object

Import from `@/design-system`:

```tsx
import { mode } from '@/design-system';

// Available properties
mode.radius    // Dynamic border radius
mode.font      // Monospace font family

// Usage
<Card className={cn("border", mode.radius, mode.font)}>
```

---

## ESLint Rules

Design rules are enforced via ESLint:

```javascript
// eslint.config.mjs
{
  rules: {
    'design-system/no-hardcoded-colors': 'error',
    'design-system/no-inline-styles': 'error',
    'ai/no-hardcoded-colors': 'warn',
    'ai/no-arbitrary-tailwind': 'warn',
  }
}
```

---

## Exemptions

Some files are exempt from design rules:

| File Type | Reason |
|-----------|--------|
| Color picker components | Handle raw color values |
| Theme components | Define color tokens |
| Chart components | Recharts uses color strings |
| Email templates | Require inline styles |
| Canvas/QR components | Need RGB values |

Add exemptions in `eslint.config.mjs`:

```javascript
{
  files: ["src/components/ui/color-picker.tsx"],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
  }
}
```

---

## Validation Commands

```bash
# Check design system compliance
npm run design:lint

# Check with AI validation
npm run ai:validate

# Full validation
npm run ai:pre-deploy
```

---

## Common Fixes

### Hardcoded Color

```tsx
// Before
<div className="text-green-500">Success</div>

// After
<div className="text-success">Success</div>
// Or if success token doesn't exist:
<div className="text-primary">Success</div>
```

### Arbitrary Value

```tsx
// Before
<div className="p-[13px]">Content</div>

// After (use closest scale value)
<div className="p-3">Content</div>  // 12px
// Or
<div className="p-4">Content</div>  // 16px
```

### Custom Button

```tsx
// Before
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click
</button>

// After
import { Button } from '@/components/ui/button';
<Button>Click</Button>
```

### Inline Styles

```tsx
// Before
<div style={{ backgroundColor: '#f0f0f0', padding: '16px' }}>

// After
<div className="bg-muted p-4">
```

---

## Prompt Template for AI

Include this in your AI prompts:

```markdown
## Design System Rules

MUST follow these rules:
- NEVER use hardcoded colors (hex, rgb, Tailwind palette)
- ALWAYS use semantic tokens: text-primary, bg-muted, etc.
- NEVER use arbitrary values: p-[13px], w-[200px]
- ALWAYS use scale values: p-4, w-48, gap-6
- NEVER create custom components when system components exist
- ALWAYS import from @/components/ui/
- ALWAYS use mode.radius for border radius on cards/buttons
```
