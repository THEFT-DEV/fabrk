---
title: 'Tailwind CSS 4: Native OKLCH and Modern Styling'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'tailwind-css-4-terminal-styling'
description: 'Fabrk uses Tailwind CSS 4 with native OKLCH support, CSS variables, and modern features for efficient terminal-inspired styling.'
publishedAt: '2026-01-20T10:00:00.000Z'
---

**The latest Tailwind with native OKLCH support.**

Tailwind CSS 4 represents a major evolution in how we write styles. With native OKLCH color support, CSS-first configuration, and improved performance, it's the perfect foundation for Fabrk's terminal-inspired design system. This guide covers how Fabrk leverages Tailwind 4's features for consistent, theme-aware styling.

---

## What's New in Tailwind CSS 4

Tailwind CSS 4 brings significant improvements:

- **Native OKLCH color support** - Perceptually uniform colors out of the box
- **CSS-first configuration** - Define themes directly in CSS
- **Improved performance** - Smaller output, faster builds
- **Better dark mode handling** - Seamless theme switching
- **Container queries** - Responsive components, not just layouts
- **Simplified setup** - Less configuration, more convention

---

## OKLCH Integration

Tailwind 4 natively supports OKLCH colors, which provide perceptually uniform color manipulation:

### Defining Theme Colors

```css
/* globals.css */
@import "tailwindcss";

:root {
  /* OKLCH format: oklch(lightness chroma hue) */
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 280);
  --primary: oklch(0.70 0.20 280);
  --primary-foreground: oklch(0.98 0.01 280);
  --muted: oklch(0.25 0.02 280);
  --muted-foreground: oklch(0.65 0.02 280);
  --card: oklch(0.18 0.02 280);
  --border: oklch(0.30 0.02 280);
  --destructive: oklch(0.55 0.20 25);
  --success: oklch(0.65 0.20 145);
}
```

### Why OKLCH?

OKLCH (Oklab Lightness Chroma Hue) provides:

| Benefit | Description |
|---------|-------------|
| Perceptual uniformity | Equal lightness values look equally bright |
| Predictable manipulation | Changing hue keeps perceived brightness constant |
| Wide gamut support | Access to more colors on modern displays |
| Intuitive model | Hue (0-360), Chroma (saturation), Lightness (0-1) |

```css
/* Compare: Creating a darker shade */

/* HSL - unpredictable brightness change */
--primary-hsl: hsl(260, 80%, 50%);
--primary-dark-hsl: hsl(260, 80%, 40%);  /* May look more saturated */

/* OKLCH - predictable brightness change */
--primary-oklch: oklch(0.60 0.20 280);
--primary-dark-oklch: oklch(0.50 0.20 280);  /* Predictably darker */
```

### Theme-Specific Colors

Each of Fabrk's 18 themes defines colors in OKLCH:

```css
/* Dracula theme */
[data-theme="dracula"] {
  --background: oklch(0.17 0.02 280);
  --foreground: oklch(0.93 0.01 280);
  --primary: oklch(0.68 0.22 310);  /* Purple */
  --card: oklch(0.20 0.02 280);
  --border: oklch(0.28 0.02 280);
}

/* Nord theme */
[data-theme="nord"] {
  --background: oklch(0.22 0.02 240);
  --foreground: oklch(0.90 0.01 220);
  --primary: oklch(0.70 0.12 220);  /* Blue */
  --card: oklch(0.25 0.02 240);
  --border: oklch(0.32 0.02 240);
}

/* Tokyo Night theme */
[data-theme="tokyo-night"] {
  --background: oklch(0.16 0.03 260);
  --foreground: oklch(0.85 0.02 250);
  --primary: oklch(0.72 0.18 260);  /* Purple-blue */
  --card: oklch(0.19 0.03 260);
  --border: oklch(0.28 0.03 260);
}

/* Gruvbox theme */
[data-theme="gruvbox"] {
  --background: oklch(0.20 0.04 80);
  --foreground: oklch(0.88 0.05 90);
  --primary: oklch(0.70 0.16 60);  /* Orange */
  --card: oklch(0.23 0.04 80);
  --border: oklch(0.32 0.04 80);
}
```

---

## CSS Variables in Tailwind 4

Tailwind 4 uses CSS variables by default, making theme switching seamless:

### How It Works

```css
/* Tailwind generates these utilities */
.bg-background {
  background-color: var(--background);
}

.text-foreground {
  color: var(--foreground);
}

.border-border {
  border-color: var(--border);
}

.bg-primary {
  background-color: var(--primary);
}

.text-primary {
  color: var(--primary);
}
```

### Theme Switching

When you change themes, only CSS variables update—no class changes needed:

```tsx
// Theme switcher - just changes data attribute
function setTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// All components automatically update
<Button className="bg-primary">  {/* Uses var(--primary) */}
```

### Registering Custom Colors

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Register colors as Tailwind utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
}
```

---

## Dynamic Border Radius

Fabrk's signature feature is theme-aware border radius:

### The rounded-dynamic Class

```css
/* globals.css */
:root {
  --radius: 0.5rem;  /* Default: slightly rounded */
}

/* Terminal themes: sharp corners */
[data-theme="terminal"],
[data-theme="cyberpunk"],
[data-theme="matrix"] {
  --radius: 0;
}

/* Modern themes: more rounded */
[data-theme="modern"],
[data-theme="soft"] {
  --radius: 1rem;
}

/* The dynamic class */
.rounded-dynamic {
  border-radius: var(--radius);
}
```

### Usage with mode Object

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// mode.radius maps to 'rounded-dynamic'
<Card className={cn('border border-border', mode.radius)}>
  Content with theme-aware radius
</Card>

// Switches themes without code changes
// Dracula: 0.5rem radius
// Terminal: 0 radius (sharp)
// Soft: 1rem radius
```

---

## CSS-First Configuration

Tailwind 4 moves configuration from JavaScript to CSS:

### The @theme Directive

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);

  /* Custom spacing (8-point grid) */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Custom fonts */
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code',
               'Source Code Pro', Menlo, Consolas, monospace;

  /* Custom breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Custom animations */
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Benefits Over JavaScript Config

| JavaScript Config | CSS Config |
|-------------------|------------|
| Separate file | Colocated with styles |
| Requires rebuild | Hot reloads instantly |
| Limited to Tailwind syntax | Full CSS power |
| Can't use CSS features | Use any CSS, including nesting |

---

## Using Theme Colors

Apply colors consistently with Tailwind classes:

### Background Colors

```tsx
// Page backgrounds
<div className="bg-background" />      {/* Main page */}
<div className="bg-card" />            {/* Elevated cards */}
<div className="bg-muted" />           {/* Subtle emphasis */}
<div className="bg-primary" />         {/* Primary actions */}
<div className="bg-secondary" />       {/* Secondary actions */}
<div className="bg-destructive" />     {/* Danger/error */}

// With opacity
<div className="bg-primary/50" />      {/* 50% opacity */}
<div className="bg-muted/80" />        {/* 80% opacity */}
```

### Text Colors

```tsx
// Primary content
<span className="text-foreground" />        {/* Main text */}
<span className="text-muted-foreground" />  {/* Secondary text */}

// Semantic colors
<span className="text-primary" />           {/* Accent/links */}
<span className="text-destructive" />       {/* Errors */}
<span className="text-success" />           {/* Success */}

// Contrast colors (for backgrounds)
<span className="text-primary-foreground" /> {/* On primary bg */}
```

### Border Colors

```tsx
// Standard borders
<div className="border border-border" />     {/* Default border */}
<div className="border border-primary" />    {/* Accent border */}

// Partial borders
<div className="border-b border-border" />   {/* Bottom only */}
<div className="border-t border-muted" />    {/* Top with muted */}
```

---

## Monospace Typography

Terminal styling uses monospace fonts throughout:

### Font Configuration

```css
/* globals.css */
@theme {
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code',
               'Source Code Pro', Menlo, Consolas, monospace;
}
```

### Global Application

```tsx
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
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

### Using font-mono

```tsx
// Global: body has font-mono, so most elements inherit it

// Explicit application (usually not needed)
<p className="font-mono">Terminal text</p>

// Override for specific elements
<span className="font-sans">Non-monospace text</span>

// With design system
import { mode } from '@/design-system';
<code className={mode.font}>Explicit monospace</code>
```

---

## Dark Mode

Tailwind 4 handles dark mode elegantly with CSS variables:

### Class-Based Dark Mode

```css
/* Light mode (default) */
:root {
  --background: oklch(0.98 0.01 280);
  --foreground: oklch(0.15 0.02 280);
  --card: oklch(1.00 0.00 0);
  --border: oklch(0.85 0.01 280);
}

/* Dark mode */
.dark,
[data-theme="dracula"],
[data-theme="nord"],
[data-theme="tokyo-night"] {
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 280);
  --card: oklch(0.18 0.02 280);
  --border: oklch(0.30 0.02 280);
}
```

### Theme Provider

```tsx
// components/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'system',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: (t) => { setTheme(t); applyTheme(t); } }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

---

## Container Queries

Tailwind 4 includes container queries for component-level responsiveness:

### Basic Usage

```tsx
// Parent defines the container
<div className="@container">
  {/* Children respond to container size, not viewport */}
  <div className="@md:flex @lg:grid @lg:grid-cols-3">
    Responsive to container width
  </div>
</div>
```

### Named Containers

```tsx
// Named container for specificity
<div className="@container/sidebar">
  <nav className="@md/sidebar:flex @md/sidebar:flex-col">
    Sidebar navigation
  </nav>
</div>

<div className="@container/main">
  <article className="@lg/main:prose-lg">
    Main content area
  </article>
</div>
```

### Practical Example: Card Grid

```tsx
// Card that adapts to its container
function AdaptiveCard({ title, content }) {
  return (
    <div className="@container">
      <div className={cn(
        'border border-border p-4',
        '@sm:flex @sm:items-start @sm:gap-4',
        '@lg:block @lg:text-center',
        mode.radius
      )}>
        <div className="@sm:flex-1">
          <h3 className="font-mono text-lg @lg:text-xl">{title}</h3>
          <p className="text-muted-foreground text-sm @lg:text-base">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

// Use in different contexts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <AdaptiveCard title="Small" content="Adapts to grid column width" />
  <AdaptiveCard title="Medium" content="Adapts to grid column width" />
  <AdaptiveCard title="Large" content="Adapts to grid column width" />
</div>

<aside className="w-64">
  <AdaptiveCard title="Sidebar" content="Adapts to sidebar width" />
</aside>
```

---

## Common Patterns

### Card with Terminal Styling

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
    Card content goes here
  </p>
</div>
```

### Button Variants

```tsx
// Primary button
<button className={cn(
  'bg-primary text-primary-foreground px-4 py-2',
  'hover:bg-primary/90 transition-colors',
  'focus:ring-2 focus:ring-primary focus:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  mode.radius,
  mode.font,
  'text-xs uppercase'
)}>
  &gt; PRIMARY ACTION
</button>

// Secondary button
<button className={cn(
  'bg-secondary text-secondary-foreground px-4 py-2',
  'hover:bg-secondary/80 transition-colors',
  mode.radius,
  mode.font,
  'text-xs uppercase'
)}>
  &gt; SECONDARY
</button>

// Outline button
<button className={cn(
  'border border-border bg-transparent px-4 py-2',
  'hover:bg-muted transition-colors',
  'text-foreground',
  mode.radius,
  mode.font,
  'text-xs uppercase'
)}>
  &gt; OUTLINE
</button>

// Destructive button
<button className={cn(
  'bg-destructive text-destructive-foreground px-4 py-2',
  'hover:bg-destructive/90 transition-colors',
  mode.radius,
  mode.font,
  'text-xs uppercase'
)}>
  &gt; DELETE
</button>
```

### Input Field

```tsx
<input
  type="text"
  className={cn(
    'w-full border border-border bg-background px-3 py-2',
    'focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none',
    'placeholder:text-muted-foreground',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    mode.radius,
    mode.font,
    'text-sm'
  )}
  placeholder="Enter value..."
/>
```

### Badge/Tag

```tsx
// Status badge
<span className={cn(
  'inline-flex items-center px-2 py-1',
  'text-xs uppercase',
  mode.radius,
  mode.font,
  // Variant: success
  'bg-success/10 text-success'
)}>
  [ACTIVE]
</span>

// Muted badge
<span className={cn(
  'inline-flex items-center px-2 py-1',
  'text-xs uppercase',
  mode.radius,
  mode.font,
  'bg-muted text-muted-foreground'
)}>
  [DRAFT]
</span>
```

---

## Arbitrary Values

When you need custom values not in the design system:

```tsx
// Use brackets for arbitrary values
<div className="w-[347px] h-[72px]" />          {/* Custom dimensions */}
<div className="mt-[13px]" />                    {/* Custom margin */}
<div className="bg-[oklch(0.5_0.2_280)]" />     {/* Custom color */}
<div className="grid-cols-[200px_1fr_100px]" /> {/* Custom grid */}

// But prefer design tokens when possible
<div className="w-full h-16" />                  {/* Standard sizing */}
<div className="mt-4" />                         {/* Standard spacing */}
<div className="bg-primary" />                   {/* Semantic color */}
```

---

## Responsive Design

Standard Tailwind breakpoints work as expected:

### Breakpoint Reference

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| sm | 640px | Large phones, landscape |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

### Mobile-First Approach

```tsx
<div className="
  p-4              /* Base: mobile */
  md:p-6           /* Medium screens */
  lg:p-8           /* Large screens */
  grid
  grid-cols-1      /* Base: single column */
  md:grid-cols-2   /* Medium: 2 columns */
  lg:grid-cols-3   /* Large: 3 columns */
  xl:grid-cols-4   /* Extra large: 4 columns */
  gap-4
  md:gap-6
">
  {/* Grid items */}
</div>
```

### Hiding/Showing Elements

```tsx
{/* Hide on mobile, show on desktop */}
<Sidebar className="hidden lg:block" />

{/* Show on mobile, hide on desktop */}
<MobileNav className="lg:hidden" />

{/* Different content per breakpoint */}
<span className="md:hidden">Mobile text</span>
<span className="hidden md:inline lg:hidden">Tablet text</span>
<span className="hidden lg:inline">Desktop text</span>
```

---

## Pseudo-Classes and States

Tailwind handles interactive states naturally:

### Interactive States

```tsx
<button className="
  bg-primary
  hover:bg-primary/90        /* Hover state */
  active:bg-primary/80       /* Click/active state */
  focus:ring-2               /* Focus state */
  focus:ring-primary
  focus:ring-offset-2
  focus-visible:ring-2       /* Keyboard focus only */
  disabled:opacity-50        /* Disabled state */
  disabled:cursor-not-allowed
">
  Interactive Button
</button>
```

### Form States

```tsx
<input className="
  border border-border
  focus:border-primary       /* Focus border */
  focus:ring-2               /* Focus ring */
  focus:ring-primary
  invalid:border-destructive /* Validation error */
  placeholder:text-muted-foreground
  read-only:bg-muted         /* Read-only state */
  disabled:opacity-50
"/>
```

### Group and Peer States

```tsx
{/* Group hover - child reacts to parent hover */}
<div className="group border border-border p-4 hover:bg-muted">
  <span className="group-hover:text-primary">
    Highlights when parent is hovered
  </span>
</div>

{/* Peer - sibling reacts to element state */}
<input type="checkbox" className="peer" />
<label className="peer-checked:text-primary">
  Highlighted when checkbox is checked
</label>
```

---

## The cn() Utility

Combine classes safely with `cn()`:

```tsx
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Basic usage
<div className={cn('border border-border', mode.radius)}>

// Conditional classes
<div className={cn(
  // Base styles
  'border border-border bg-card p-4',
  // Mode styles
  mode.radius,
  mode.font,
  // Conditional styles
  isActive && 'ring-2 ring-primary',
  isDisabled && 'opacity-50 cursor-not-allowed',
  // Ternary conditions
  variant === 'primary' ? 'bg-primary' : 'bg-secondary',
  // Custom className prop (for component composition)
  className
)}>
```

### How cn() Works

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

1. **clsx**: Handles conditional classes, arrays, objects
2. **twMerge**: Resolves Tailwind class conflicts

```tsx
// twMerge resolves conflicts - last value wins
cn('p-2', 'p-4')                    // → 'p-4'
cn('rounded-lg', 'rounded-none')    // → 'rounded-none'
cn(mode.radius, 'rounded-full')     // → 'rounded-full'
```

---

## Performance Optimizations

Tailwind 4 improves performance significantly:

### Smaller CSS Output

- Unused utilities are tree-shaken
- CSS is minified automatically
- Only used color values are included

### Faster Build Times

- Incremental compilation
- Cached utility generation
- Parallel processing

### Runtime Performance

- No JavaScript needed for styling
- CSS variables for theming (no re-renders)
- Minimal specificity conflicts

### Best Practices

```tsx
// DO: Use design tokens
<div className="bg-primary text-primary-foreground" />

// DON'T: Use arbitrary values when tokens exist
<div className="bg-[#8b5cf6] text-[#fff]" />  // ❌

// DO: Combine related utilities
<div className="px-4 py-2" />  // Horizontal + vertical padding

// DON'T: Over-specify
<div className="pl-4 pr-4 pt-2 pb-2" />  // ❌ Same result, more classes

// DO: Use responsive utilities
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

// DON'T: Duplicate across breakpoints
<div className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2" />  // ❌ sm same as base
```

---

## Best Practices Summary

### 1. Use Design Tokens

```tsx
// Good - semantic, theme-aware
<div className="bg-primary text-primary-foreground" />

// Bad - hardcoded, breaks theming
<div className="bg-purple-500 text-white" />  // ❌
```

### 2. Use CSS Variables for Theming

```css
/* Define once */
:root {
  --primary: oklch(0.70 0.20 280);
}

/* Use everywhere */
.bg-primary {
  background-color: var(--primary);
}
```

### 3. Use cn() for Conditional Classes

```tsx
// Good - clean, safe merging
className={cn(mode.radius, isActive && 'ring-2')}

// Bad - string concatenation
className={`${mode.radius} ${isActive ? 'ring-2' : ''}`}  // ❌
```

### 4. Prefer Design System Utilities

```tsx
// Good - use mode object
<Card className={cn('border border-border', mode.radius)}>

// Acceptable - direct Tailwind tokens
<Card className="border border-border rounded-dynamic">

// Bad - arbitrary values
<Card className="border-[1px] border-[#333] rounded-[8px]">  // ❌
```

### 5. Keep Classes Organized

```tsx
// Good - logical grouping
className={cn(
  // Layout
  'flex items-center gap-4',
  // Sizing
  'w-full h-12',
  // Spacing
  'px-4 py-2',
  // Colors
  'bg-card text-foreground',
  // Borders
  'border border-border',
  // Interactive
  'hover:bg-muted transition-colors',
  // Dynamic
  mode.radius
)}
```

---

## Resources

- `src/app/globals.css` - All CSS variable definitions and @theme config
- `src/design-system/index.ts` - Mode object with semantic class mappings
- `src/lib/utils.ts` - The cn() utility function
- `tailwind.config.ts` - Any additional Tailwind configuration

Tailwind CSS 4: modern styling for terminal-inspired design.

