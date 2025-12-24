# Design Token Reference

Complete reference for all CSS custom properties (design tokens) in Fabrk's design system.

> All tokens use **OKLCH color format** for perceptual uniformity. Format: `lightness% chroma hue`

---

## Table of Contents

1. [Token Architecture](#token-architecture)
2. [Core Tokens](#core-tokens)
3. [Semantic Tokens](#semantic-tokens)
4. [Status Tokens](#status-tokens)
5. [Chart Tokens](#chart-tokens)
6. [Code Syntax Tokens](#code-syntax-tokens)
7. [Typography Tokens](#typography-tokens)
8. [Utility Tokens](#utility-tokens)
9. [Tailwind Mappings](#tailwind-mappings)
10. [Theme-Specific Overrides](#theme-specific-overrides)

---

## Token Architecture

### Token Hierarchy

```
globals.css
├── :root (Default: Green CRT)
│   ├── Core Tokens (25) ─────────────► Base color definitions
│   ├── Status Tokens (6) ───────────► Success, warning, info colors
│   ├── Chart Tokens (9) ────────────► Data visualization
│   ├── Semantic Mappings (18) ──────► Component-level aliases
│   └── Code Tokens (9) ─────────────► Syntax highlighting
│
├── @theme (Tailwind v4 mapping)
│   └── --color-* mappings (27) ─────► Tailwind utility classes
│
└── [data-theme='*'] (18 themes)
    └── Override all tokens per theme
```

### Token Count Summary

| Category | Count | Purpose |
|----------|-------|---------|
| Core Tokens | 25 | Base colors, backgrounds, borders |
| Status Tokens | 6 | Success, warning, info states |
| Chart Tokens | 9 | Data visualization colors |
| Semantic Tokens | 18 | Component-level aliases |
| Code Tokens | 9 | Syntax highlighting |
| Typography Tokens | 3 | Font family definitions |
| Utility Tokens | 1 | Border radius |
| Tailwind Mappings | 27 | CSS-to-Tailwind bridge |
| **Total** | **98** | |

---

## Core Tokens

### Background Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--background` | `bg-background` | Page background |
| `--card` | `bg-card` | Card/panel backgrounds |
| `--popover` | `bg-popover` | Dropdowns, modals |
| `--muted` | `bg-muted` | Subtle backgrounds, dividers |

### Foreground Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--foreground` | `text-foreground` | Primary text |
| `--card-foreground` | `text-card-foreground` | Text on cards |
| `--popover-foreground` | `text-popover-foreground` | Text in popovers |
| `--muted-foreground` | `text-muted-foreground` | Secondary/dimmed text |

### Primary Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--primary` | `bg-primary`, `text-primary`, `border-primary` | Brand color, CTAs |
| `--primary-foreground` | `text-primary-foreground` | Text on primary backgrounds |

### Secondary Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--secondary` | `bg-secondary`, `text-secondary` | Alternative accent |
| `--secondary-foreground` | `text-secondary-foreground` | Text on secondary |

### Accent Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--accent` | `bg-accent`, `text-accent` | Highlights, emphasis |
| `--accent-foreground` | `text-accent-foreground` | Text on accent |

### Destructive Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--destructive` | `bg-destructive`, `text-destructive` | Errors, delete actions |
| `--destructive-foreground` | `text-destructive-foreground` | Text on destructive |

### Border & Input Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--border` | `border-border` | Default borders |
| `--input` | `border-input` | Form input borders |
| `--ring` | `ring-ring` | Focus rings |

---

## Semantic Tokens

Semantic tokens provide component-level abstractions over core tokens.

### Background Semantics

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-bg-canvas` | `--background` | Page-level background |
| `--color-bg-surface` | `--card` | Elevated surfaces |
| `--color-bg-elevated` | `--popover` | Highest elevation |
| `--color-bg-sunken` | `--muted` | Recessed areas |

### Text Semantics

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-text-primary` | `--foreground` | Main body text |
| `--color-text-secondary` | `--muted-foreground` | Supporting text |
| `--color-text-tertiary` | `--secondary-foreground` | Least prominent |
| `--color-text-inverse` | `--primary-foreground` | Text on dark backgrounds |
| `--color-text-disabled` | `--muted-foreground` | Disabled states |

### Border Semantics

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-border-default` | `--border` | Standard borders |
| `--color-border-muted` | `--input` | Subtle borders |
| `--color-border-strong` | `--ring` | Emphasized borders |
| `--color-border-focus` | `--ring` | Focus indicators |

### Status Semantics

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-status-success` | `--success` | Success text/icon |
| `--color-status-success-bg` | `--success` | Success backgrounds |
| `--color-status-warning` | `--warning` | Warning text/icon |
| `--color-status-warning-bg` | `--warning` | Warning backgrounds |
| `--color-status-error` | `--destructive` | Error text/icon |
| `--color-status-error-bg` | `--destructive` | Error backgrounds |
| `--color-status-info` | `--info` | Info text/icon |
| `--color-status-info-bg` | `--info` | Info backgrounds |

---

## Status Tokens

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--success` | `bg-success`, `text-success` | Success states |
| `--success-foreground` | `text-success-foreground` | Text on success |
| `--warning` | `bg-warning`, `text-warning` | Warning states |
| `--warning-foreground` | `text-warning-foreground` | Text on warning |
| `--info` | `bg-info`, `text-info` | Informational states |
| `--info-foreground` | `text-info-foreground` | Text on info |

### Default Values (Green CRT Theme)

```css
--success: 70% 0.26 140;          /* Green */
--success-foreground: 5% 0.01 140;
--warning: 70% 0.26 60;           /* Amber */
--warning-foreground: 5% 0.01 140;
--info: 70% 0.26 200;             /* Blue */
--info-foreground: 5% 0.01 140;
```

---

## Chart Tokens

Used for data visualization (charts, graphs).

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| `--chart-1` | `fill-chart-1`, `stroke-chart-1` | Primary series |
| `--chart-2` | `fill-chart-2`, `stroke-chart-2` | Secondary series |
| `--chart-3` | `fill-chart-3`, `stroke-chart-3` | Tertiary series |
| `--chart-4` | `fill-chart-4`, `stroke-chart-4` | Fourth series |
| `--chart-5` | `fill-chart-5`, `stroke-chart-5` | Fifth series |
| `--chart-6` | `fill-chart-6`, `stroke-chart-6` | Sixth series |
| `--chart-7` | `fill-chart-7`, `stroke-chart-7` | Seventh series |
| `--chart-8` | `fill-chart-8`, `stroke-chart-8` | Eighth series |
| `--chart-9` | `fill-chart-9`, `stroke-chart-9` | Ninth series |

### Default Values (Green CRT Theme)

```css
--chart-1: 65% 0.28 140;
--chart-2: 60% 0.24 140;
--chart-3: 55% 0.2 140;
--chart-4: 75% 0.3 140;
--chart-5: 70% 0.26 140;
--chart-6: 65% 0.28 140;
--chart-7: 70% 0.26 140;
--chart-8: 70% 0.26 140;
--chart-9: 65% 0.28 140;
```

---

## Code Syntax Tokens

Used for syntax highlighting in code blocks.

| Token | Usage | Example |
|-------|-------|---------|
| `--code-fg` | Default code text | `color: var(--code-fg)` |
| `--code-bg` | Code block background | `background: var(--code-bg)` |
| `--code-comment` | Comments | `// This is a comment` |
| `--code-string` | String literals | `"Hello world"` |
| `--code-punctuation` | Brackets, commas | `{ } [ ] ( ) , ;` |
| `--code-number` | Numeric values | `42`, `3.14` |
| `--code-keyword` | Reserved words | `const`, `function`, `return` |
| `--code-function` | Function names | `myFunction()` |
| `--code-selector` | CSS selectors | `.class`, `#id` |

### Default Values (Green CRT Theme)

```css
--code-fg: oklch(84% 0.13 134);
--code-bg: oklch(19% 0.02 144);
--code-comment: oklch(62% 0.09 136);
--code-string: oklch(85% 0.11 136);
--code-punctuation: oklch(76% 0.12 134);
--code-number: oklch(71% 0.12 134);
--code-keyword: oklch(84% 0.14 133);
--code-function: oklch(86% 0.1 137);
--code-selector: oklch(84% 0.13 134);
```

---

## Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `var(--font-geist-sans)` | Dashboard/app text |
| `--font-mono` | `var(--font-jetbrains-mono), ui-monospace, ...` | Terminal aesthetic |
| `--font-terminal` | `var(--font-pixelbasel), 'Pixelbasel', monospace` | Pixel font option |

### Font Stack Fallbacks

```css
--font-mono:
  var(--font-jetbrains-mono),
  ui-monospace,
  SFMono-Regular,
  Menlo,
  Monaco,
  Consolas,
  'Liberation Mono',
  'Courier New',
  monospace;
```

---

## Utility Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0.5rem` | Default border radius (overridden to `0` in terminal themes) |

---

## Tailwind Mappings

The `@theme` block maps CSS tokens to Tailwind utility classes.

### Color Mappings

```css
@theme {
  --color-background: oklch(var(--background));
  --color-foreground: oklch(var(--foreground));
  --color-card: oklch(var(--card));
  --color-card-foreground: oklch(var(--card-foreground));
  --color-popover: oklch(var(--popover));
  --color-popover-foreground: oklch(var(--popover-foreground));
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  --color-secondary: oklch(var(--secondary));
  --color-secondary-foreground: oklch(var(--secondary-foreground));
  --color-muted: oklch(var(--muted));
  --color-muted-foreground: oklch(var(--muted-foreground));
  --color-accent: oklch(var(--accent));
  --color-accent-foreground: oklch(var(--accent-foreground));
  --color-destructive: oklch(var(--destructive));
  --color-destructive-foreground: oklch(var(--destructive-foreground));
  --color-success: oklch(var(--success));
  --color-success-foreground: oklch(var(--success-foreground));
  --color-warning: oklch(var(--warning));
  --color-warning-foreground: oklch(var(--warning-foreground));
  --color-info: oklch(var(--info));
  --color-info-foreground: oklch(var(--info-foreground));
  --color-border: oklch(var(--border));
  --color-input: oklch(var(--input));
  --color-ring: oklch(var(--ring));
}
```

### Usage in Components

```tsx
// These classes work because of the @theme mapping
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
  <span className="text-success">Success!</span>
</div>
```

---

## Theme-Specific Overrides

All tokens are overridden per theme using `[data-theme='themename']` selectors.

### Available Themes

| Theme | Selector | Style |
|-------|----------|-------|
| Default (Green) | `:root` | Green CRT phosphor |
| Red | `[data-theme='red']` | Red CRT phosphor |
| Blue | `[data-theme='blue']` | Blue CRT phosphor |
| Green | `[data-theme='green']` | Green CRT (explicit) |
| Amber | `[data-theme='amber']` | Amber CRT phosphor |
| Purple | `[data-theme='purple']` | Purple CRT phosphor |
| GameBoy | `[data-theme='gameboy']` | DMG-01 LCD green |
| C64 | `[data-theme='c64']` | Commodore 64 blue |
| GB Pocket | `[data-theme='gbpocket']` | Game Boy Pocket silver |
| VIC-20 | `[data-theme='vic20']` | VIC-20 cyan |
| Atari | `[data-theme='atari']` | Atari 800 blue |
| ZX Spectrum | `[data-theme='spectrum']` | Sinclair bright |
| Black & White | `[data-theme='bw']` | Pure grayscale |

### Theme Token Structure

Each theme overrides these categories:

1. **Core tokens** (25) - All base colors
2. **Status tokens** (6) - Theme-appropriate status colors
3. **Chart tokens** (9) - Monochrome variations
4. **Semantic mappings** (18) - Component aliases
5. **Code tokens** (9) - Syntax highlighting

### Example: Red Theme

```css
[data-theme='red'] {
  --background: 5% 0.01 0;        /* Hue 0 = Red */
  --foreground: 82% 0.3 0;
  --primary: 40% 0.25 0;
  --border: 42% 0.2 0;
  /* ... all other tokens with hue 0 */
}
```

---

## WCAG Compliance

All tokens are designed for WCAG 2.2 AA compliance:

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Text contrast | 4.5:1 minimum | `--foreground` on `--background` |
| Large text | 3:1 minimum | `--primary` buttons |
| Non-text contrast | 3:1 minimum | `--border` visibility |
| Focus visible | 2px ring | `--ring` token |

### Contrast Validation

Primary text: `--foreground` on `--background`
- Green theme: 82% on 5% = **16:1 ratio** ✓
- All themes validated for WCAG AA

---

## Usage Examples

### Component Pattern

```tsx
import { mode } from "@/design-system";

function Card({ children }) {
  return (
    <div className={cn(
      "bg-card text-card-foreground border-border border",
      mode.radius  // Applies rounded-none for terminal
    )}>
      {children}
    </div>
  );
}
```

### Status Feedback

```tsx
<span className="text-success">[SUCCESS]: Operation complete</span>
<span className="text-warning">[WARNING]: Check your input</span>
<span className="text-destructive">[ERROR]: Failed to save</span>
<span className="text-info">[INFO]: Processing...</span>
```

### Custom CSS with Tokens

```css
.custom-element {
  background: oklch(var(--card));
  color: oklch(var(--foreground));
  border: 1px solid oklch(var(--border));
  box-shadow: 0 0 8px oklch(var(--primary) / 0.3);
}
```

---

## Related Documentation

- [Design System Overview](./DESIGN-SYSTEM.md) - Complete design system guide
- [Customization Guide](./CUSTOMIZATION-GUIDE.md) - How to customize tokens
- [Theme Guide](./THEME-GUIDE.md) - Explore all 18 themes
- [Component Authoring](./COMPONENT-AUTHORING.md) - Create custom components
