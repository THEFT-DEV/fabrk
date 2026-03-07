---
title: 'OKLCH Color System: 18 terminal themes That Actually Work'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'oklch-color-system-themes'
description: 'How Fabrk uses OKLCH color space for perceptually uniform themes. Includes the complete 18-theme system with dark mode support.'
publishedAt: '2026-01-30T10:00:00.000Z'
---

Color systems in CSS have evolved from hex codes to RGB to HSL, but none of them are perceptually uniform. OKLCH changes everything by creating colors that look the way they should across themes and accessibility contexts. Fabrk uses OKLCH for all 18 terminal-inspired themes.

---

## Why OKLCH Over HSL?

### The Problem with HSL

HSL (Hue, Saturation, Lightness) seems intuitive but has a fundamental flaw: equal lightness values don't produce colors that appear equally bright.

```css
/* These have the same L (50%) but look completely different in brightness */
--yellow: hsl(60, 100%, 50%);  /* Appears very bright */
--blue: hsl(240, 100%, 50%);   /* Appears much darker */
```

This makes creating consistent themes difficult. A "50% lighter" variant of yellow looks completely different than the same adjustment to blue.

### The OKLCH Solution

OKLCH (Lightness, Chroma, Hue in the Oklab color space) is perceptually uniform:

```css
/* Same L (65%) = actually similar perceived brightness */
--yellow: oklch(0.65 0.15 90);   /* Perceived brightness matches */
--blue: oklch(0.65 0.15 240);    /* Perceived brightness matches */
```

This means:
- **Predictable adjustments** - Changing L by 10% gives consistent visual results
- **Better contrast ratios** - Easier to meet WCAG guidelines
- **Harmonious palettes** - Colors with same L value form natural groups
- **Smooth gradients** - No muddy transitions between colors

---

## How Fabrk Implements OKLCH

### CSS Variable Structure

All colors are defined as OKLCH values in `globals.css`:

```css
/* src/app/globals.css */
:root {
  /* Base colors using OKLCH */
  --background: oklch(0.14 0.01 260);
  --foreground: oklch(0.95 0.01 260);

  --card: oklch(0.17 0.01 260);
  --card-foreground: oklch(0.95 0.01 260);

  --primary: oklch(0.75 0.15 145);
  --primary-foreground: oklch(0.14 0.01 260);

  --secondary: oklch(0.25 0.02 260);
  --secondary-foreground: oklch(0.95 0.01 260);

  --muted: oklch(0.22 0.01 260);
  --muted-foreground: oklch(0.65 0.02 260);

  --destructive: oklch(0.60 0.20 25);
  --destructive-foreground: oklch(0.95 0.01 260);

  --success: oklch(0.65 0.18 145);

  --border: oklch(0.30 0.01 260);
  --input: oklch(0.25 0.01 260);
  --ring: oklch(0.75 0.15 145);
}
```

### Understanding OKLCH Values

Each OKLCH value has three components:

| Component | Range | Purpose |
|-----------|-------|---------|
| L (Lightness) | 0-1 | 0 = black, 1 = white |
| C (Chroma) | 0-0.4 | Color intensity (0 = gray) |
| H (Hue) | 0-360 | Color wheel position |

```css
/* Breaking down an OKLCH value */
--primary: oklch(0.75 0.15 145);
/*              ^    ^    ^
                |    |    └── Hue: 145 (green)
                |    └─────── Chroma: 0.15 (moderate saturation)
                └──────────── Lightness: 0.75 (fairly bright)
*/
```

---

## The 18 Themes

Fabrk includes 18 carefully crafted themes, each following the terminal aesthetic:

### Dark Themes

```css
/* Default Terminal */
.theme-default {
  --background: oklch(0.14 0.01 260);
  --foreground: oklch(0.95 0.01 260);
  --primary: oklch(0.75 0.15 145);
}

/* Matrix - Sharp corners, green terminal */
.theme-matrix {
  --background: oklch(0.05 0.01 140);
  --foreground: oklch(0.80 0.20 140);
  --primary: oklch(0.75 0.25 140);
  --radius: 0;
}

/* Dracula - Purple accents */
.theme-dracula {
  --background: oklch(0.20 0.02 270);
  --foreground: oklch(0.95 0.01 270);
  --primary: oklch(0.70 0.20 300);
}

/* Nord - Arctic blues */
.theme-nord {
  --background: oklch(0.23 0.02 240);
  --foreground: oklch(0.90 0.01 220);
  --primary: oklch(0.70 0.12 220);
}

/* Cyberpunk - Neon pink, sharp corners */
.theme-cyberpunk {
  --background: oklch(0.10 0.02 280);
  --foreground: oklch(0.95 0.01 320);
  --primary: oklch(0.75 0.25 320);
  --radius: 0;
}

/* Tokyo Night - Modern violet */
.theme-tokyo-night {
  --background: oklch(0.18 0.03 265);
  --foreground: oklch(0.85 0.02 250);
  --primary: oklch(0.70 0.15 250);
}

/* Hacker - Pure black with green, sharp */
.theme-hacker {
  --background: oklch(0.00 0.00 0);
  --foreground: oklch(0.75 0.25 145);
  --primary: oklch(0.75 0.25 145);
  --radius: 0;
}
```

### Light Themes

```css
/* Solarized Light */
.theme-solarized-light {
  --background: oklch(0.97 0.02 95);
  --foreground: oklch(0.35 0.05 200);
  --primary: oklch(0.55 0.15 200);
}

/* Ocean - Cool blue light theme */
.theme-ocean {
  --background: oklch(0.97 0.01 220);
  --foreground: oklch(0.25 0.03 220);
  --primary: oklch(0.55 0.15 220);
}
```

---

## Implementing Theme Switching

### Theme Provider Setup

```tsx
// src/components/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'matrix' | 'dracula' | 'nord' | 'cyberpunk';

const THEMES = ['default', 'matrix', 'dracula', 'nord', 'cyberpunk', /*...*/];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored && THEMES.includes(stored)) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    THEMES.forEach((t) => document.documentElement.classList.remove(`theme-${t}`));
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Theme Switcher Component

```tsx
// src/components/theme-switcher.tsx
'use client';

import { useTheme } from './theme-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((t) => (
          <SelectItem key={t} value={t}>{t.toUpperCase()}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

---

## Creating Custom Themes

### Step 1: Define Color Palette

```css
/* Custom theme: Electric Blue */
.theme-electric-blue {
  --background: oklch(0.12 0.02 240);
  --foreground: oklch(0.95 0.01 240);
  --card: oklch(0.16 0.02 240);
  --card-foreground: oklch(0.95 0.01 240);
  --primary: oklch(0.70 0.20 240);
  --primary-foreground: oklch(0.12 0.02 240);
  --secondary: oklch(0.25 0.05 240);
  --muted: oklch(0.20 0.02 240);
  --muted-foreground: oklch(0.65 0.02 240);
  --destructive: oklch(0.55 0.22 25);
  --success: oklch(0.60 0.18 145);
  --border: oklch(0.28 0.02 240);
  --input: oklch(0.20 0.02 240);
  --ring: oklch(0.70 0.20 240);
  --radius: 0.5rem;
}
```

### Step 2: Test Contrast Ratios

Use OKLCH's perceptual uniformity to ensure accessibility. For WCAG AA compliance:
- Normal text needs 4.5:1 contrast ratio
- Large text needs 3:1 contrast ratio

With OKLCH, you can approximate this from the lightness values:
- Background L: 0.12
- Foreground L: 0.95
- Difference of 0.83 typically exceeds requirements

### Step 3: Register the Theme

```tsx
// Add to THEMES array in theme-provider.tsx
const THEMES = [...existingThemes, 'electric-blue'];
```

---

## Best Practices

### 1. Maintain Consistent Lightness Hierarchy

```css
/* Good: Consistent lightness levels */
--background: oklch(0.12 ...);  /* Darkest */
--card: oklch(0.16 ...);        /* Slightly lighter */
--muted: oklch(0.20 ...);       /* Even lighter */
--border: oklch(0.28 ...);      /* Visible but subtle */
```

### 2. Use Low Chroma for UI, High for Accents

```css
/* UI elements: Low chroma (0.01-0.03) */
--background: oklch(0.12 0.01 260);

/* Accent elements: Higher chroma (0.15-0.25) */
--primary: oklch(0.70 0.20 145);
```

### 3. Keep Hue Consistent Within Theme

All neutral colors should share the same base hue:

```css
/* All neutrals use hue 260 */
--background: oklch(0.12 0.01 260);
--card: oklch(0.16 0.01 260);
--muted: oklch(0.20 0.01 260);
--foreground: oklch(0.95 0.01 260);
```

---

## Dark Mode with next-themes

Integrate with `next-themes` for system preference detection:

```tsx
// src/app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Browser Support

OKLCH has excellent modern browser support:
- Chrome 111+
- Firefox 113+
- Safari 15.4+
- Edge 111+

For older browsers, provide fallbacks:

```css
:root {
  /* Fallback for older browsers */
  --primary: #22c55e;
  /* Modern browsers use OKLCH */
  --primary: oklch(0.75 0.15 145);
}
```

---

## Next Steps

1. **Choose a base theme** - Start with one of the 18 included themes
2. **Customize the primary color** - Adjust hue while keeping L and C
3. **Test accessibility** - Verify contrast ratios meet WCAG
4. **Add to your layout** - Wrap app in ThemeProvider

OKLCH makes theming predictable. Colors that look right, across every theme.
