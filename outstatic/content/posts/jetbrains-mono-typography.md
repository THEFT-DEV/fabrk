---
title: 'JetBrains Mono: The Perfect Font for Terminal UI'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'jetbrains-mono-typography'
description: 'Why Fabrk uses JetBrains Mono for terminal-inspired SaaS. Ligatures, readability, and monospace aesthetics.'
publishedAt: '2026-01-13T10:00:00.000Z'
---

**The right font makes all the difference.**

---

## Why Monospace?

Terminal interfaces use monospace fonts for good reasons:

- **Characters align in columns** - Perfect for data tables
- **Data tables look clean** - Numbers and text line up
- **Code snippets feel native** - It's the same font developers use in their IDE
- **Information density increases** - More content in less space
- **Professional credibility** - Signals technical competence

Fabrk embraces monospace as a core design element, not just for code blocks.

---

## Why JetBrains Mono Specifically?

Of all monospace fonts available, JetBrains Mono stands out for several reasons:

### Designed for Developers

JetBrains (makers of IntelliJ, WebStorm, PyCharm) created this font specifically for developers who stare at code all day. Every design decision optimizes for readability during extended use.

### Optimized for Screens

Unlike fonts designed for print, JetBrains Mono is optimized for screen rendering:
- Clear at small sizes (down to 10px)
- Consistent weight across characters
- Excellent anti-aliasing behavior
- Works on both retina and standard displays

### Programming Ligatures

Ligatures combine multiple characters into a single glyph:

```
=>  becomes →
!=  becomes ≠
=== becomes ≡
->  becomes →
<-  becomes ←
>=  becomes ≥
<=  becomes ≤
/* becomes ⁄*
*/ becomes *⁄
```

These make code more readable while preserving the underlying characters.

### Character Disambiguation

JetBrains Mono makes similar characters clearly distinct:

| Character Pair | Problem | JetBrains Solution |
|----------------|---------|-------------------|
| 0 vs O | Zero vs letter O | Dotted zero |
| 1 vs l vs I | One, lowercase L, uppercase I | Distinct serifs |
| { vs ( | Braces vs parentheses | Different curves |
| : vs ; | Colon vs semicolon | Clear dot positioning |

### Open Source and Free

Licensed under SIL Open Font License. Free for any use, commercial or personal, with no restrictions.

### Wide Language Support

145+ languages supported, including:
- Latin, Cyrillic, Greek alphabets
- Vietnamese with diacritics
- Mathematical symbols
- Box-drawing characters

---

## Configuration in Fabrk

### Next.js Font Loading

Fabrk loads JetBrains Mono via Next.js's built-in font optimization:

```typescript
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Why This Setup?

1. **`subsets: ['latin']`** - Only load Latin characters (reduces file size)
2. **`variable: '--font-mono'`** - Creates a CSS custom property for Tailwind
3. **`display: 'swap'`** - Shows fallback font immediately, swaps when loaded
4. **`weight: ['400', '500', '600', '700']`** - Only load needed weights

---

## Global Application

The `font-mono` class applies globally via Tailwind:

```css
/* globals.css */
@theme {
  --font-mono: var(--font-jetbrains-mono), ui-monospace, 'Cascadia Code',
               'Source Code Pro', Menlo, Consolas, monospace;
}
```

The body tag applies it everywhere:

```tsx
<body className="font-mono antialiased">
```

Everything is monospace by default. No need to add `font-mono` to individual elements.

---

## The mode.font Object

For explicit monospace application or overriding other fonts:

```tsx
import { mode } from '@/design-system';

// Explicit monospace (rarely needed since body is font-mono)
<p className={mode.font}>
  This is terminal text
</p>

// Useful when overriding a parent with different font
<div className="font-sans">
  <p>This is sans-serif</p>
  <code className={mode.font}>This is monospace</code>
</div>
```

---

## Typography Scale

Terminal typography uses a simplified scale:

| Element | Class | Size | Weight | Use Case |
|---------|-------|------|--------|----------|
| h1 | `text-4xl` | 36px | `font-semibold` | Page titles |
| h2 | `text-2xl` | 24px | `font-semibold` | Section headers |
| h3 | `text-xl` | 20px | `font-medium` | Card titles |
| h4 | `text-lg` | 18px | `font-medium` | Subsections |
| body | `text-sm` | 14px | `font-normal` | Body text |
| small | `text-xs` | 12px | `font-normal` | Labels, captions |

### Implementation

```tsx
// Page title (H1)
<h1 className="font-mono text-4xl font-semibold text-foreground">
  DASHBOARD
</h1>

// Section header (H2)
<h2 className="font-mono text-2xl font-semibold text-foreground">
  RECENT ACTIVITY
</h2>

// Card title (H3)
<h3 className="font-mono text-xl font-medium text-foreground">
  USER STATISTICS
</h3>

// Body text
<p className="font-mono text-sm text-foreground">
  Welcome to your dashboard. Here's what's happening.
</p>

// Muted caption
<span className="font-mono text-xs text-muted-foreground">
  Last updated 5 minutes ago
</span>

// Terminal-style label
<span className="font-mono text-xs uppercase text-muted-foreground">
  [ STATUS ]
</span>
```

---

## Text Style Patterns

### Headings (UPPERCASE)

```tsx
<h1 className="font-mono text-4xl font-semibold text-foreground tracking-tight">
  WELCOME TO FABRK
</h1>
```

### Body Text (Sentence case)

```tsx
<p className="font-mono text-sm text-foreground leading-relaxed">
  Build production-ready SaaS applications with terminal-inspired design.
  Everything you need is included out of the box.
</p>
```

### Labels (UPPERCASE in brackets)

```tsx
<span className="font-mono text-xs uppercase text-muted-foreground">
  [ ANALYTICS ]
</span>

<span className="font-mono text-xs uppercase text-muted-foreground">
  [ 12 ITEMS ]
</span>
```

### Button Text (UPPERCASE with chevron)

```tsx
<Button className="font-mono text-xs">
  > SUBMIT
</Button>

<Button variant="outline" className="font-mono text-xs">
  > CANCEL
</Button>
```

### Status Text

```tsx
// Success
<span className="font-mono text-xs text-success">
  [ONLINE]
</span>

// Error
<span className="font-mono text-xs text-destructive">
  [ERROR]
</span>

// Warning
<span className="font-mono text-xs text-yellow-500">
  [PENDING]
</span>
```

---

## Ligatures Control

JetBrains Mono includes programming ligatures by default. Control them:

### Enable (Default)

```css
code, pre {
  font-variant-ligatures: normal;
  font-feature-settings: "liga" 1, "calt" 1;
}
```

### Disable

```css
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
```

### Selective Ligatures

```css
/* Enable contextual alternates but disable standard ligatures */
code {
  font-feature-settings: "liga" 0, "calt" 1;
}
```

### Per-Element Control

```tsx
// With ligatures
<code className="[font-variant-ligatures:normal]">
  const arrow = () => {}
</code>

// Without ligatures
<code className="[font-variant-ligatures:none]">
  const arrow = () => {}
</code>
```

---

## Code Blocks

Terminal-styled code blocks:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  return (
    <div className={cn('border border-border overflow-hidden', mode.radius)}>
      {filename && (
        <div className="border-b border-border bg-muted px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          {language && (
            <span className="text-xs text-muted-foreground font-mono uppercase">
              [{language}]
            </span>
          )}
        </div>
      )}
      <pre className="bg-card p-4 overflow-x-auto">
        <code className="font-mono text-xs text-foreground">
          {code}
        </code>
      </pre>
    </div>
  );
}

// Usage
<CodeBlock
  filename="src/app/page.tsx"
  language="tsx"
  code={`export default function Home() {
  return <h1>Hello World</h1>;
}`}
/>
```

---

## Data Display

Monospace excels at displaying structured data:

### Stats Grid

```tsx
<div className="grid grid-cols-3 gap-4 font-mono">
  <div className="text-center">
    <div className="text-3xl font-bold text-primary">1,247</div>
    <div className="text-xs text-muted-foreground">USERS</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-primary">$12,450</div>
    <div className="text-xs text-muted-foreground">REVENUE</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-primary">99.97%</div>
    <div className="text-xs text-muted-foreground">UPTIME</div>
  </div>
</div>
```

### Aligned Key-Value Pairs

```tsx
<div className="font-mono space-y-1 text-sm">
  <div className="flex justify-between">
    <span className="text-muted-foreground">Users:</span>
    <span className="text-foreground">1,247</span>
  </div>
  <div className="flex justify-between">
    <span className="text-muted-foreground">Revenue:</span>
    <span className="text-foreground">$12,450</span>
  </div>
  <div className="flex justify-between">
    <span className="text-muted-foreground">Uptime:</span>
    <span className="text-foreground">99.97%</span>
  </div>
</div>
```

### ASCII-Style Formatting

```tsx
<pre className="font-mono text-xs text-muted-foreground">
{`[ SYSTEM STATUS ]
├── CPU Usage:     23%  ████░░░░░░░░░░░░░░░░
├── Memory:        67%  █████████████░░░░░░░
├── Disk:          45%  █████████░░░░░░░░░░░
└── Network:       12%  ██░░░░░░░░░░░░░░░░░░`}
</pre>
```

---

## Tables

Monospace makes tables naturally align:

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

<Table className="font-mono text-xs">
  <TableHeader>
    <TableRow className="border-b border-border">
      <TableHead className="text-muted-foreground">DATE</TableHead>
      <TableHead className="text-muted-foreground">DESCRIPTION</TableHead>
      <TableHead className="text-muted-foreground text-right">AMOUNT</TableHead>
      <TableHead className="text-muted-foreground">STATUS</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="border-b border-border">
      <TableCell>2026-01-15</TableCell>
      <TableCell>Pro Plan Subscription</TableCell>
      <TableCell className="text-right">$29.00</TableCell>
      <TableCell className="text-success">[PAID]</TableCell>
    </TableRow>
    <TableRow className="border-b border-border">
      <TableCell>2026-01-01</TableCell>
      <TableCell>API Credits Top-up</TableCell>
      <TableCell className="text-right">$10.00</TableCell>
      <TableCell className="text-success">[PAID]</TableCell>
    </TableRow>
    <TableRow className="border-b border-border">
      <TableCell>2025-12-15</TableCell>
      <TableCell>Pro Plan Subscription</TableCell>
      <TableCell className="text-right">$29.00</TableCell>
      <TableCell className="text-success">[PAID]</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Antialiasing

Always enable antialiasing for smooth text rendering:

```tsx
<body className="font-mono antialiased">
```

The `antialiased` class applies:

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

This makes text smoother on all screens, especially important for thin monospace characters.

---

## Font Loading Optimization

Next.js optimizes font loading automatically:

### Self-Hosted

Fonts are downloaded at build time and served from your domain. No external requests to Google Fonts at runtime.

### Automatic font-display: swap

Shows a fallback font immediately while the web font loads. Prevents invisible text during load.

### Preloaded

Critical fonts are preloaded in the document head:

```html
<link rel="preload" href="/_next/static/media/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
```

### Subset

Only Latin characters are loaded by default (reduces size from ~200KB to ~30KB).

---

## Fallback Stack

If JetBrains Mono fails to load, the fallback chain activates:

```css
font-family: var(--font-mono), ui-monospace, 'Cascadia Code',
             'Source Code Pro', Menlo, Consolas, monospace;
```

| Priority | Font | Platform |
|----------|------|----------|
| 1 | JetBrains Mono | Loaded from Next.js |
| 2 | ui-monospace | System default monospace |
| 3 | Cascadia Code | Windows Terminal default |
| 4 | Source Code Pro | Common on Linux |
| 5 | Menlo | macOS default |
| 6 | Consolas | Windows default |
| 7 | monospace | Generic fallback |

System monospace fonts take over seamlessly, maintaining the terminal aesthetic even if the web font fails.

---

## Accessibility

JetBrains Mono is accessibility-friendly:

### Character Distinction

Clear visual difference between similar characters prevents reading errors:
- Zero has a dot (0 vs O)
- One has a distinct base (1 vs l vs I)

### Consistent Spacing

Fixed-width characters provide predictable reading rhythm, helpful for users with dyslexia.

### Good Contrast

The font renders well at high contrast ratios required for WCAG compliance.

### Small Size Readability

Optimized hinting ensures readability even at 10px, important for dense data displays.

---

## Performance Metrics

Font loading impact:

| Metric | Value |
|--------|-------|
| WOFF2 Size (Latin subset) | ~30KB |
| Load Time (3G) | ~150ms |
| First Contentful Paint Impact | Minimal (swap) |
| Cumulative Layout Shift | 0 (proper fallback) |

---

## Best Practices

1. **Use globally** - Apply to body, not individual elements
2. **Keep weights minimal** - 2-3 weights maximum (400, 500, 600)
3. **Size appropriately** - `text-sm` for body, `text-xs` for labels
4. **Always enable antialiasing** - Smoother rendering
5. **Embrace the aesthetic** - Monospace is intentional, not a constraint
6. **Use ligatures in code** - Improves readability
7. **Provide fallbacks** - System fonts as backup

---

## Comparison with Alternatives

| Font | Ligatures | Distinct Chars | Free | Screen Optimized |
|------|-----------|----------------|------|------------------|
| JetBrains Mono | Yes | Excellent | Yes | Yes |
| Fira Code | Yes | Good | Yes | Yes |
| Source Code Pro | No | Good | Yes | Yes |
| Cascadia Code | Yes | Excellent | Yes | Yes |
| Monaco | No | Good | macOS only | Yes |
| Consolas | No | Good | Windows only | Yes |

JetBrains Mono offers the best combination of features for terminal UI.

---

## Getting Started

JetBrains Mono is configured automatically in Fabrk:

1. Font loads via Next.js optimization
2. `font-mono` applies to body
3. `antialiased` enables smooth rendering
4. Fallback stack ensures consistency

Typography that feels right.
