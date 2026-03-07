---
title: 'The Mode Object: Theme-Aware Styling Made Simple'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'mode-design-system-object'
description: 'How Fabrk''s mode object provides consistent, theme-aware styling across all 62+ components. One import, perfect theming.'
publishedAt: '2026-01-25T10:00:00.000Z'
---

**One object. Perfect theming. Every component.**

The `mode` object is the heart of Fabrk's design system. It provides a centralized, type-safe way to apply theme-aware styles across your entire application. Instead of remembering dozens of class names or maintaining scattered styling patterns, you import `mode` and let it handle the complexity.

---

## The Problem mode Solves

Traditional styling approaches create maintenance nightmares:

```tsx
// Without mode - scattered, inconsistent, hard to maintain
<Card className="rounded-lg border border-gray-200 bg-white dark:bg-gray-800">
  <Button className="rounded-md font-sans text-white bg-blue-500">
  <Input className="rounded border border-gray-300 font-mono">
</Card>
```

Every component makes its own styling decisions. When you want to change the border radius theme-wide, you're editing dozens of files. When dark mode breaks, you're hunting through the codebase. When you add a new theme, you're touching every component.

```tsx
// With mode - centralized, consistent, maintainable
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

<Card className={cn('border border-border bg-card', mode.radius)}>
  <Button className={cn(mode.radius, mode.font, 'px-4 py-2')}>
  <Input className={cn('border border-border', mode.radius, mode.font)}>
</Card>
```

One source of truth. Change `--radius` once, and every component updates. Switch themes, and everything adapts automatically.

---

## The Theming Problem

Building theme-aware components typically requires:

- Checking current theme context in every component
- Writing conditional class names based on theme
- Maintaining multiple style variations per component
- Remembering which classes to use where
- Testing every component in every theme

It's tedious and error-prone. Worse, it creates technical debt that compounds as your application grows.

---

## Enter the Mode Object

Fabrk's `mode` object provides all theme-aware classes in one place:

```typescript
import { mode } from '@/design-system';

// That's it. Now use mode.* for theming.
```

The mode object is your design system in code form. It ensures every component follows the same patterns, uses the same tokens, and responds to theme changes identically.

---

## What Mode Provides

```typescript
// src/design-system/index.ts
export const mode = {
  // Border radius (dynamic via CSS variable)
  radius: 'rounded-dynamic',

  // Font family (monospace for terminal aesthetic)
  font: 'font-mono',

  // Background colors
  color: {
    bg: {
      base: 'bg-background',
      card: 'bg-card',
      muted: 'bg-muted',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
    },

    // Text colors
    text: {
      base: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success',
    },

    // Border colors
    border: {
      base: 'border-border',
      primary: 'border-primary',
      destructive: 'border-destructive',
    },
  },

  // Spacing (8-point grid)
  spacing: {
    xs: 'p-1',  // 4px
    sm: 'p-2',  // 8px
    md: 'p-4',  // 16px
    lg: 'p-6',  // 24px
    xl: 'p-8',  // 32px
  },
};
```

---

## Dynamic Border Radius

The cornerstone of Fabrk's theming is dynamic border radius. The `mode.radius` class maps to `rounded-dynamic`, which uses a CSS custom property:

```css
/* globals.css */
@theme {
  --radius: 0.5rem;  /* Default radius */
}

/* Tailwind utility */
.rounded-dynamic {
  border-radius: var(--radius);
}
```

### How It Works

1. **CSS Variable**: `--radius` is defined in your theme
2. **Tailwind Utility**: `rounded-dynamic` references this variable
3. **mode.radius**: Provides the class name consistently

```tsx
// Component usage
<Card className={cn('border border-border bg-card', mode.radius)}>
  Content with theme-aware radius
</Card>
```

### Theme-Specific Radius

Different themes can have different radius values:

```css
/* Sharp corners (terminal, cyberpunk, matrix themes) */
[data-theme="terminal"] {
  --radius: 0;
}

/* Rounded corners (default, nord, catppuccin themes) */
[data-theme="default"] {
  --radius: 0.5rem;
}

/* Very rounded (soft, modern themes) */
[data-theme="modern"] {
  --radius: 1rem;
}
```

Switch themes, and every `mode.radius` element updates instantly—no component changes needed.

### When to Use mode.radius

**DO use mode.radius for elements with full borders:**

```tsx
// Cards with complete borders
<Card className={cn('border border-border', mode.radius)}>

// Buttons
<Button className={cn(mode.radius, 'px-4 py-2')}>

// Input fields
<Input className={cn('border border-border', mode.radius)}>

// Modals and dialogs
<DialogContent className={cn('border border-border', mode.radius)}>

// Badges and tags
<Badge className={cn(mode.radius, 'px-2 py-1')}>

// Avatar containers
<Avatar className={cn('border border-border', mode.radius)}>

// Dropdown menus
<DropdownMenuContent className={cn('border border-border', mode.radius)}>
```

**DON'T use mode.radius for:**

```tsx
// Partial borders (top, bottom, left, right only)
<div className="border-b border-border">  {/* NO mode.radius */}
  Divider line should stay straight
</div>

// Table cells (radius breaks table layout)
<td className="border-b border-border px-4 py-2">  {/* NO mode.radius */}
  Table cell content
</td>

// Table headers
<th className="border-b border-border px-4 py-2">  {/* NO mode.radius */}
  Column header
</th>

// Switches (always pill-shaped)
<Switch className="rounded-full">  {/* Use rounded-full explicitly */}

// Progress bars (capsule shape)
<Progress className="rounded-full h-2">  {/* Use rounded-full */}

// Circular avatars
<Avatar className="rounded-full">  {/* Use rounded-full */}
```

---

## Typography with mode.font

Fabrk uses JetBrains Mono throughout for its terminal aesthetic. The `mode.font` class ensures consistency:

```tsx
import { mode } from '@/design-system';

// Apply monospace font explicitly
<p className={mode.font}>
  Terminal-styled text
</p>

// Usually unnecessary since body has font-mono globally
// But useful for overriding parent styles
<div className="font-sans">
  <p>This is sans-serif text</p>
  <code className={mode.font}>This is back to monospace</code>
</div>
```

### Global Font Application

The body tag applies `font-mono` globally:

```tsx
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
```

So you rarely need `mode.font` explicitly—it's there for edge cases and explicit declarations when you need to override a parent's font.

---

## Semantic Color Tokens

Never hardcode colors. Use design tokens from `mode.color` that adapt to themes:

### Background Colors

```tsx
import { mode } from '@/design-system';

// Primary action backgrounds (buttons, highlights)
<button className={mode.color.bg.primary}>
  Primary Button
</button>

// Secondary/subtle backgrounds
<div className={mode.color.bg.secondary}>
  Secondary content area
</div>

// Muted backgrounds (labels, badges, inactive states)
<span className={mode.color.bg.muted}>
  [LABEL]
</span>

// Card backgrounds (elevated content)
<div className={mode.color.bg.card}>
  Card content
</div>

// Destructive actions (delete, remove)
<button className={mode.color.bg.destructive}>
  Delete
</button>

// Page backgrounds
<div className={mode.color.bg.base}>
  Page content
</div>
```

### Text Colors

```tsx
// Primary text (high contrast, main content)
<h1 className={mode.color.text.base}>
  Main heading
</h1>

// Muted text (secondary, supporting content)
<p className={mode.color.text.muted}>
  Supporting description text
</p>

// Primary/accent text (links, highlights)
<span className={mode.color.text.primary}>
  Highlighted or linked text
</span>

// Error/destructive text
<span className={mode.color.text.destructive}>
  Error: Something went wrong
</span>

// Success text
<span className={mode.color.text.success}>
  Success: Operation completed
</span>
```

### Border Colors

```tsx
// Default borders (cards, inputs, dividers)
<div className={cn('border', mode.color.border.base)}>
  Standard border
</div>

// Primary/accent borders (focused inputs, highlights)
<div className={cn('border-2', mode.color.border.primary)}>
  Highlighted border
</div>

// Error state borders
<input className={cn('border', mode.color.border.destructive)} />
```

---

## Spacing Tokens

The `mode.spacing` object provides consistent padding based on an 8-point grid:

```tsx
import { mode } from '@/design-system';

// Extra small padding (4px) - tight spaces, inline elements
<span className={mode.spacing.xs}>
  Tight padding for inline badges
</span>

// Small padding (8px) - compact components
<Badge className={mode.spacing.sm}>
  Standard badge padding
</Badge>

// Medium padding (16px) - default card padding
<Card className={mode.spacing.md}>
  Standard card content padding
</Card>

// Large padding (24px) - sections, generous spacing
<section className={mode.spacing.lg}>
  Section with comfortable padding
</section>

// Extra large padding (32px) - hero sections, major divisions
<div className={mode.spacing.xl}>
  Hero section with significant padding
</div>
```

### Gap Equivalents

For flex/grid gaps, use the corresponding Tailwind classes:

| mode.spacing | Padding | Gap Equivalent | Pixels |
|--------------|---------|----------------|--------|
| xs | p-1 | gap-1 | 4px |
| sm | p-2 | gap-2 | 8px |
| md | p-4 | gap-4 | 16px |
| lg | p-6 | gap-6 | 24px |
| xl | p-8 | gap-8 | 32px |

```tsx
// Grid with consistent spacing
<div className="grid grid-cols-3 gap-4">  {/* Matches mode.spacing.md */}
  <Card className={mode.spacing.md}>...</Card>
  <Card className={mode.spacing.md}>...</Card>
  <Card className={mode.spacing.md}>...</Card>
</div>
```

---

## The cn() Utility

The `cn()` function (from `@/lib/utils`) is essential for combining mode classes with other Tailwind utilities:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### How cn() Works

1. **clsx**: Handles conditional classes, arrays, and objects
2. **twMerge**: Resolves Tailwind class conflicts intelligently

```tsx
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Basic combination
<Card className={cn('border border-border', mode.radius)}>

// Conditional classes
<Button className={cn(
  mode.radius,
  mode.font,
  'px-4 py-2',
  isDisabled && 'opacity-50 cursor-not-allowed',
  isActive ? 'bg-primary' : 'bg-secondary'
)}>

// Overriding defaults (twMerge handles conflicts)
<Card className={cn(
  mode.radius,      // Default radius from mode
  'rounded-none'    // Override: twMerge removes mode.radius
)}>

// With className prop for composition
<Button className={cn(
  mode.radius,
  mode.font,
  'bg-primary text-primary-foreground',
  className  // Allow parent to override
)}>
```

### Why twMerge Matters

Without `twMerge`, conflicting Tailwind classes cause unpredictable results:

```tsx
// Without twMerge - both classes applied, unpredictable result
className="rounded-lg rounded-none"

// With twMerge via cn() - conflict resolved, rounded-none wins
cn('rounded-lg', 'rounded-none')  // Returns 'rounded-none'

// This matters for component composition
cn(mode.radius, className)  // User's className can override mode.radius
```

---

## Usage Examples

### Basic Card

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

<div className={cn(
  'border border-border bg-card p-4',
  mode.radius,
  mode.font
)}>
  <span className="text-muted-foreground text-xs uppercase">
    [ CARD TITLE ]
  </span>
  <p className="text-foreground mt-2">
    Terminal-styled card content
  </p>
</div>
```

### Button

```tsx
<button className={cn(
  'bg-primary text-primary-foreground px-4 py-2',
  'hover:bg-primary/90 transition-colors',
  'focus:ring-2 focus:ring-primary focus:ring-offset-2',
  mode.radius,
  mode.font,
  'text-xs uppercase'
)}>
  &gt; SUBMIT
</button>
```

### Input

```tsx
<input
  className={cn(
    'border border-border bg-background px-3 py-2',
    'focus:ring-2 focus:ring-primary focus:outline-none',
    'placeholder:text-muted-foreground',
    mode.radius,
    mode.font,
    'text-sm'
  )}
  placeholder="Enter value..."
/>
```

### Form Field

```tsx
<div className="space-y-2">
  <label className={cn(
    'text-xs uppercase',
    mode.font,
    mode.color.text.muted
  )}>
    EMAIL ADDRESS
  </label>
  <input
    type="email"
    className={cn(
      'w-full border border-border bg-background px-3 py-2',
      'focus:ring-2 focus:ring-primary focus:border-primary',
      mode.radius,
      mode.font
    )}
  />
  <p className={cn('text-xs', mode.color.text.muted)}>
    We'll never share your email
  </p>
</div>
```

---

## Component Integration

all 62 UI components use the mode object internally:

```tsx
// components/ui/card.tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border border-border bg-card',
        mode.radius,
        className
      )}
      {...props}
    />
  );
}
```

When you use `<Card>`, theming is automatic. You don't need to remember to add `mode.radius`—it's built in.

```tsx
// Usage - theming is automatic
<Card className="p-4">
  Content with automatic theme-aware radius
</Card>

// Override if needed
<Card className="rounded-none p-4">
  Content with sharp corners (overrides mode.radius)
</Card>
```

---

## Custom Components

When building custom components, follow the pattern:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      'border border-border bg-card p-4',
      mode.radius,
      className  // Allow overrides
    )}>
      <span className={cn(
        'text-xs uppercase',
        mode.font,
        mode.color.text.muted
      )}>
        [ {label} ]
      </span>
      <div className="flex items-baseline gap-2 mt-2">
        <p className={cn('text-2xl font-semibold', mode.color.text.base)}>
          {value}
        </p>
        {trend && (
          <span className={cn(
            'text-xs',
            trend === 'up' ? mode.color.text.success : mode.color.text.destructive
          )}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </div>
  );
}
```

### Pattern Checklist

When creating components with mode:

1. **Import mode and cn**: Always start with these imports
2. **Apply mode.radius to bordered elements**: Cards, buttons, inputs
3. **Apply mode.font for terminal text**: Usually inherited, but explicit when needed
4. **Use mode.color for semantic colors**: Never hardcode
5. **Accept className prop**: Allow overrides for flexibility
6. **Use cn() for all class combinations**: Never template literals

---

## Theme Switching

Themes are applied via `data-theme` attribute:

```tsx
// Theme switcher component
function ThemeSwitcher() {
  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <Select onValueChange={setTheme}>
      <SelectItem value="dracula">Dracula</SelectItem>
      <SelectItem value="nord">Nord</SelectItem>
      <SelectItem value="tokyo-night">Tokyo Night</SelectItem>
      {/* ... 18 themes total */}
    </Select>
  );
}
```

All components using `mode` update automatically when the theme changes—no re-renders needed for CSS variable changes.

---

## Color Token Reference

Never hardcode colors. Use these design tokens:

| Need | Token | Class |
|------|-------|-------|
| Page background | --background | bg-background |
| Card/elevated background | --card | bg-card |
| Muted/subtle background | --muted | bg-muted |
| Primary action | --primary | bg-primary |
| Secondary action | --secondary | bg-secondary |
| Destructive/error | --destructive | bg-destructive |
| Primary text | --foreground | text-foreground |
| Secondary text | --muted-foreground | text-muted-foreground |
| Accent text | --primary | text-primary |
| Error text | --destructive | text-destructive |
| Success text | --success | text-success |
| Default border | --border | border-border |
| Accent border | --primary | border-primary |

### Banned Patterns

```tsx
// NEVER do this - breaks theming
<div className="bg-gray-800">  // ❌ Hardcoded
<div className="bg-white">     // ❌ Hardcoded
<div className="bg-[#1a1a2e]"> // ❌ Arbitrary value
<span className="text-gray-400"> // ❌ Hardcoded

// ALWAYS do this - theme-aware
<div className="bg-background">   // ✓ Token
<div className="bg-card">         // ✓ Token
<div className={mode.color.bg.card}> // ✓ Mode object
<span className="text-muted-foreground"> // ✓ Token
```

---

## TypeScript Support

The mode object is fully typed for excellent IDE support:

```typescript
// src/design-system/types.ts
export interface ModeConfig {
  radius: string;
  font: string;
  color: {
    bg: Record<'base' | 'card' | 'muted' | 'primary' | 'secondary' | 'destructive', string>;
    text: Record<'base' | 'muted' | 'primary' | 'destructive' | 'success', string>;
    border: Record<'base' | 'primary' | 'destructive', string>;
  };
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
}

// src/design-system/index.ts
export const mode: ModeConfig = {
  // ... implementation
};
```

TypeScript provides autocomplete and catches errors:

```tsx
import { mode } from '@/design-system';

// TypeScript autocomplete works
mode.color.text.primary  // ✓ Autocomplete suggests valid keys
mode.color.text.invalid  // ✗ Type error: 'invalid' is not a valid key
mode.colors              // ✗ Type error: Property 'colors' does not exist
```

---

## Debugging mode Issues

### Problem: Radius Not Applying

```tsx
// Check that --radius CSS variable is defined
// In browser DevTools, inspect the element:
// computed styles should show border-radius with a value

// Common fix: ensure globals.css is imported
// app/layout.tsx
import '@/app/globals.css';

// Check that rounded-dynamic class is defined in your CSS
// globals.css
.rounded-dynamic {
  border-radius: var(--radius);
}
```

### Problem: Colors Don't Match Theme

```tsx
// Ensure you're using semantic tokens, not hardcoded colors
// Bad
<div className="bg-gray-800">  // ❌ Won't change with theme

// Good
<div className="bg-card">  // ✓ Changes with theme

// Check that data-theme attribute is set on html/body
<html data-theme="dracula">  // Theme must be set

// Verify CSS variables are defined for your theme
[data-theme="dracula"] {
  --background: oklch(0.17 0.02 280);
  --card: oklch(0.20 0.02 280);
  // etc.
}
```

### Problem: cn() Not Merging Correctly

```tsx
// Ensure you're passing strings, not undefined
const className = condition ? 'extra-class' : undefined;

// Bad - undefined can cause issues
cn(mode.radius, className)  // If className is undefined

// Good - filter out falsy values
cn(mode.radius, condition && 'extra-class')

// cn() handles false/null/undefined, but be explicit
cn(mode.radius, className || '')  // Explicit empty string
```

### Problem: Mode Styles Being Overridden

```tsx
// Class order matters - later classes win (when using cn())
cn('rounded-lg', mode.radius)  // mode.radius wins
cn(mode.radius, 'rounded-lg')  // rounded-lg wins

// For component APIs, put className last
<Button className={cn(
  mode.radius,
  mode.font,
  'bg-primary',
  className  // User's className can override defaults
)}>
```

---

## Best Practices

### 1. Always Import mode and cn Together

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
```

### 2. Apply mode.radius to Full Borders Only

```tsx
// Correct - full border
<Card className={cn('border border-border', mode.radius)}>

// Correct - no radius on partial border
<div className="border-b border-border">

// Incorrect - radius on partial border
<div className={cn('border-b border-border', mode.radius)}>  // ❌
```

### 3. Use cn() for All Class Combinations

```tsx
// Correct
<Button className={cn(mode.radius, mode.font, 'px-4')}>

// Incorrect - template literals don't handle conflicts
<Button className={`${mode.radius} ${mode.font} px-4`}>  // ❌
```

### 4. Keep mode at Component Boundaries

```tsx
// Apply mode classes at the component level, not deep inside
export function Card({ className, children }) {
  return (
    <div className={cn(
      'border border-border bg-card',
      mode.radius,
      className
    )}>
      {children}  {/* Children inherit, don't need mode */}
    </div>
  );
}
```

### 5. Don't Over-Apply mode.font

```tsx
// Since body has font-mono, most elements inherit it
// Only use mode.font when explicitly needed

// Unnecessary - inherits from body
<p className={mode.font}>Text</p>  // Usually redundant

// Necessary - overriding a parent
<div className="font-sans">
  <span className={mode.font}>Back to monospace</span>
</div>
```

### 6. Use Semantic Colors Over Hardcoded

```tsx
// Correct - semantic, theme-aware
<span className={mode.color.text.destructive}>Error</span>

// Incorrect - hardcoded, breaks theming
<span className="text-red-500">Error</span>  // ❌
```

---

## Quick Reference

| Need | mode Property | Example |
|------|---------------|---------|
| Border radius | mode.radius | `className={mode.radius}` |
| Monospace font | mode.font | `className={mode.font}` |
| Primary background | mode.color.bg.primary | `className={mode.color.bg.primary}` |
| Card background | mode.color.bg.card | `className={mode.color.bg.card}` |
| Muted background | mode.color.bg.muted | `className={mode.color.bg.muted}` |
| Primary text | mode.color.text.base | `className={mode.color.text.base}` |
| Muted text | mode.color.text.muted | `className={mode.color.text.muted}` |
| Error text | mode.color.text.destructive | `className={mode.color.text.destructive}` |
| Success text | mode.color.text.success | `className={mode.color.text.success}` |
| Default border | mode.color.border.base | `className={mode.color.border.base}` |
| Small padding | mode.spacing.sm | `className={mode.spacing.sm}` |
| Medium padding | mode.spacing.md | `className={mode.spacing.md}` |
| Large padding | mode.spacing.lg | `className={mode.spacing.lg}` |

---

## Summary

The `mode` object is your design system in code form:

1. **Import once**: `import { mode } from '@/design-system'`
2. **Combine with cn()**: `cn('custom-class', mode.radius, mode.font)`
3. **Apply consistently**: Same patterns across all components
4. **Theme automatically**: Switch themes without code changes

One object. Consistent styling. Infinite themes.

