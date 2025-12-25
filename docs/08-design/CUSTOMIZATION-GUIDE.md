# Customization Guide

**Make Fabrk yours in 15 minutes.** This guide shows you how to customize colors, themes, and visual styling to match your brand.

---

## Table of Contents

1. [Quick Start: Change Brand Colors (5 min)](#quick-start-change-brand-colors)
2. [Understanding the Color System](#understanding-the-color-system)
3. [OKLCH Color Format Explained](#oklch-color-format-explained)
4. [Customizing Specific Elements](#customizing-specific-elements)
5. [Creating a Custom Theme](#creating-a-custom-theme)
6. [Verification & Testing](#verification--testing)

---

## Quick Start: Change Brand Colors

**Goal:** Change your primary brand color from green to your company's color.

### Step 1: Find Your Brand Color in OKLCH

Use this converter: [OKLCH Color Picker & Converter](https://oklch.com)

**Example:** Converting `#6366f1` (Indigo) to OKLCH:
- Input: `#6366f1`
- Output: `oklch(57% 0.21 276)`

### Step 2: Update Root Variables

Open `/src/app/globals.css` and find the `:root` block (~line 15):

```css
@layer base {
  :root {
    /* Change these values */
    --primary: oklch(57% 0.21 276);           /* Your brand color */
    --primary-foreground: oklch(100% 0 0);    /* Text on brand color */

    /* Leave these as-is for now */
    --background: oklch(100% 0 0);
    --foreground: oklch(9% 0 0);
    /* ... rest of tokens ... */
  }
}
```

### Step 3: Test & Verify

```bash
# 1. Check for hardcoded colors (should find none)
npm run scan:hex

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
# - Click buttons (should show your new brand color)
# - Check form focus states
# - Verify badges and accents
```

**Done!** Your primary brand color is now applied across all components.

---

## Understanding the Color System

Fabrk uses a **two-level theme system**:

### Level 1: Design System Theme (Architectural)
- **Terminal** - Monospace fonts, sharp corners, structured layout
- Defined in `/src/design-system/themes/terminal.ts`
- **This doesn't change.** The terminal aesthetic is core to Fabrk.

### Level 2: Color Themes (Visual Variants)
- **12 color palettes** - Retro computer and CRT phosphor aesthetics
- Defined in `/src/app/globals.css` using `[data-theme="name"]`
- **You choose one or customize it.**

**Available Color Themes:**
| Theme | Description | Use Case |
|-------|-------------|----------|
| `green` | Classic green CRT phosphor (default) | Developer tools, terminals |
| `amber` | Amber CRT phosphor | Retro computing, warm aesthetic |
| `blue` | Blue CRT phosphor | Cool, professional SaaS |
| `red` | Red CRT phosphor | Alert systems, urgent interfaces |
| `purple` | Purple CRT phosphor | Creative tools, gaming |
| `gameboy` | Game Boy LCD green | Playful SaaS, indie games |
| `c64` | Commodore 64 blue | Nostalgia products, retro brands |
| `gbpocket` | Game Boy Pocket grayscale | Minimalist, monochrome aesthetic |
| `vic20` | VIC-20 cyan | Cyberpunk, futuristic products |
| `atari` | Atari 800 blue | Classic computing aesthetic |
| `spectrum` | ZX Spectrum black/white | High-contrast, accessible |
| `bw` | Black & White | Paper-like, reading interfaces |

**Switching Themes:**
- Users can switch via the theme dropdown in navigation
- Default is `green` (set in `ThemeProvider.tsx:82`)

---

## OKLCH Color Format Explained

**Why OKLCH?** Perceptually uniform colors. Unlike hex/RGB, OKLCH ensures colors look consistent across your design.

### Format Breakdown

```css
--primary: oklch(57% 0.21 276);
              ↑    ↑    ↑
           Light Chroma Hue
```

| Component | Range | Description |
|-----------|-------|-------------|
| **Lightness** | 0-100% | How light/dark (50% = medium) |
| **Chroma** | 0-0.37+ | Color intensity (0 = grayscale, 0.3 = vivid) |
| **Hue** | 0-360 | Color wheel angle (0=red, 120=green, 240=blue) |

### Common Conversions

| Hex | OKLCH | Color Name |
|-----|-------|------------|
| `#22c55e` | `oklch(70% 0.20 140)` | Green |
| `#6366f1` | `oklch(57% 0.21 276)` | Indigo |
| `#f97316` | `oklch(68% 0.19 35)` | Orange |
| `#ec4899` | `oklch(64% 0.25 350)` | Pink |
| `#8b5cf6` | `oklch(59% 0.24 295)` | Purple |

**Tool:** Use [oklch.com](https://oklch.com) to convert your brand colors.

---

## Customizing Specific Elements

### Typography (Font Family)

**Location:** `/src/app/globals.css:3`

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap');
```

**Change to your font:**
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;500;600;700&display=swap');
```

**Update body tag** in `/src/app/layout.tsx:`:
```tsx
<body className="font-mono antialiased">  {/* Change font-mono to your font class */}
```

**Note:** Changing from monospace will lose the terminal aesthetic. Consider keeping JetBrains Mono or using another monospace font (Fira Code, Source Code Pro, IBM Plex Mono).

---

### Border Radius (Corners)

**Current:** Sharp corners (`rounded-none`) for terminal aesthetic.

**To add subtle rounding:**

1. Open `/src/design-system/index.ts:54`
2. Change `mode.radius` from `'rounded-none'` to `'rounded-sm'`

```typescript
export const mode = {
  radius: 'rounded-sm',  // was: 'rounded-none'
  font: 'font-mono',
  // ...
};
```

**Effect:** All components will now have 2px rounded corners.

**Options:**
- `rounded-none` - Sharp (0px) - Terminal aesthetic ✅
- `rounded-sm` - Subtle (2px) - Modern minimal
- `rounded` - Moderate (4px) - Standard UI
- `rounded-md` - Medium (6px) - Friendly UI

---

### Shadows (Elevation)

**Current:** Minimal shadows for flat terminal aesthetic.

**To increase elevation:**

Open `/src/app/globals.css` and find shadow definitions (~line 450):

```css
/* Increase these values for more pronounced shadows */
--shadow-sm: 0 1px 2px oklch(from var(--foreground) l c h / 0.05);
--shadow: 0 2px 4px oklch(from var(--foreground) l c h / 0.1);
--shadow-md: 0 4px 8px oklch(from var(--foreground) l c h / 0.15);
```

**Example - More dramatic elevation:**
```css
--shadow-sm: 0 2px 4px oklch(from var(--foreground) l c h / 0.1);
--shadow: 0 4px 12px oklch(from var(--foreground) l c h / 0.2);
--shadow-md: 0 8px 24px oklch(from var(--foreground) l c h / 0.3);
```

---

### Background Colors

**Location:** `/src/app/globals.css:root` block

```css
:root {
  --background: oklch(100% 0 0);        /* Page background (white) */
  --foreground: oklch(9% 0 0);          /* Text color (near-black) */
  --card: oklch(100% 0 0);              /* Card background (white) */
  --muted: oklch(96.5% 0 0);            /* Muted backgrounds (light gray) */
}
```

**Example - Darker background:**
```css
:root {
  --background: oklch(97% 0 0);         /* Slightly off-white */
  --card: oklch(100% 0 0);              /* Cards still pure white (contrast) */
}
```

---

## Creating a Custom Theme

Want to add a new color theme (e.g., "ocean" with blue-green palette)?

### Step 1: Choose Your Palette

Pick 18 colors in OKLCH format:
- Background colors (3)
- Foreground/text colors (3)
- Primary/accent colors (2)
- Semantic colors (destructive, success, warning, muted, etc.)
- Border colors (2)

### Step 2: Add Theme Block to globals.css

Open `/src/app/globals.css` and add after existing themes (~line 800):

```css
[data-theme='ocean'] {
  /* Base colors */
  --background: oklch(20% 0.05 220);           /* Dark blue-gray */
  --foreground: oklch(95% 0.02 180);           /* Light cyan */

  /* Card & surfaces */
  --card: oklch(22% 0.05 220);
  --card-foreground: oklch(95% 0.02 180);

  /* Muted backgrounds */
  --muted: oklch(25% 0.05 220);
  --muted-foreground: oklch(70% 0.05 180);

  /* Primary (brand color) */
  --primary: oklch(55% 0.18 200);              /* Ocean blue */
  --primary-foreground: oklch(100% 0 0);

  /* Secondary */
  --secondary: oklch(30% 0.05 220);
  --secondary-foreground: oklch(95% 0.02 180);

  /* Accent */
  --accent: oklch(60% 0.15 180);               /* Teal accent */
  --accent-foreground: oklch(15% 0 0);

  /* Semantic colors */
  --destructive: oklch(55% 0.22 25);           /* Coral red */
  --destructive-foreground: oklch(100% 0 0);

  --success: oklch(65% 0.18 160);              /* Sea green */
  --success-foreground: oklch(15% 0 0);

  --warning: oklch(70% 0.18 80);               /* Amber */
  --warning-foreground: oklch(15% 0 0);

  --info: oklch(60% 0.18 220);                 /* Info blue */
  --info-foreground: oklch(100% 0 0);

  /* Borders */
  --border: oklch(30% 0.05 220);
  --input: oklch(30% 0.05 220);

  /* Rings (focus states) */
  --ring: oklch(55% 0.18 200);

  /* Chart colors (9 colors for data visualization) */
  --chart-1: oklch(55% 0.18 200);
  --chart-2: oklch(60% 0.15 180);
  --chart-3: oklch(65% 0.18 160);
  --chart-4: oklch(70% 0.20 140);
  --chart-5: oklch(60% 0.18 220);
  --chart-6: oklch(55% 0.22 25);
  --chart-7: oklch(70% 0.18 80);
  --chart-8: oklch(50% 0.15 260);
  --chart-9: oklch(65% 0.20 320);

  /* Code syntax highlighting */
  --code-fg: oklch(95% 0.02 180);
  --code-bg: oklch(18% 0.05 220);
  --code-comment: oklch(55% 0.08 200);
  --code-keyword: oklch(70% 0.18 280);
  --code-function: oklch(75% 0.15 160);
  --code-string: oklch(70% 0.15 140);
  --code-number: oklch(65% 0.18 40);
  --code-class: oklch(75% 0.15 200);
  --code-variable: oklch(85% 0.08 180);
  --code-operator: oklch(65% 0.12 200);
  --code-constant: oklch(70% 0.18 340);
  --code-tag: oklch(70% 0.18 20);
  --code-attribute: oklch(75% 0.15 180);
  --code-deleted: oklch(60% 0.20 25);
  --code-inserted: oklch(65% 0.18 140);
}
```

### Step 3: Register Theme in ThemeProvider

Open `/src/design-system/providers/ThemeProvider.tsx` and add your theme:

**Line 12-24 - Add to ColorThemeName type:**
```typescript
export type ColorThemeName =
  | 'amber'
  | 'green'
  | 'blue'
  | 'red'
  | 'purple'
  | 'gameboy'
  | 'c64'
  | 'gbpocket'
  | 'vic20'
  | 'atari'
  | 'spectrum'
  | 'bw'
  | 'ocean';  // Add your theme
```

**Line 26-39 - Add to ALL_THEMES array:**
```typescript
const ALL_THEMES = [
  'amber',
  'green',
  'blue',
  'red',
  'purple',
  'gameboy',
  'c64',
  'gbpocket',
  'vic20',
  'atari',
  'spectrum',
  'bw',
  'ocean',  // Add your theme
];
```

**Line 182-195 - Add to validThemes in ThemeScript:**
```typescript
var validThemes = [
  'amber',
  'green',
  'blue',
  'red',
  'purple',
  'gameboy',
  'c64',
  'gbpocket',
  'vic20',
  'atari',
  'spectrum',
  'bw',
  'ocean',  // Add your theme
];
```

### Step 4: Add to Theme Dropdown

Open `/src/components/theme/theme-dropdown.tsx` and add your theme to themeGroups:

```typescript
const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
    { id: 'green', name: 'Green CRT', preview: '#33ff66' },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
    { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070' },
    { id: 'c64', name: 'C64 Blue', preview: '#352879' },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff' },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff' },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f' },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a' },
  ],
  Light: [
    { id: 'bw', name: 'Black & White', preview: '#ffffff' },
  ],
  Custom: [  // Add new category
    { id: 'ocean', name: 'Ocean', preview: '#4fa3d1' },  // Your theme
  ],
} as const;
```

### Step 5: Test Your Theme

```bash
npm run dev
```

1. Open theme dropdown in navigation
2. Select "Ocean" theme
3. Verify all pages look correct
4. Check contrast with DevTools (Lighthouse accessibility audit)

---

## Verification & Testing

### 1. Check for Hardcoded Colors

```bash
npm run scan:hex
```

**Expected output:** `✓ No hardcoded colors found`

If errors appear, you've accidentally used hex/rgb colors. Replace with CSS variables.

---

### 2. Verify Contrast Ratios

Open Chrome DevTools → Lighthouse → Accessibility:
- **Target:** 90+ score
- **WCAG 2.1 AA:** 4.5:1 for normal text, 3:1 for large text
- **Check:** All text on backgrounds, buttons, borders

**Common issues:**
- Muted text too light on muted backgrounds
- Border colors too faint (use 3:1 minimum)

---

### 3. Test Dark Theme

If you created a dark theme:
- Switch to dark theme
- Check all pages for readability
- Verify charts use correct dark palette
- Test forms (input focus states should be visible)

---

### 4. Mobile Testing

```bash
npm run dev
```

Open on mobile (or DevTools responsive mode):
- Typography readable at default size?
- Touch targets ≥44px (buttons, links)?
- Spacing comfortable for touch input?

---

## Troubleshooting

### "My color changes don't appear"

**Solution:** Hard refresh the browser (Cmd+Shift+R / Ctrl+Shift+R) to bypass cache.

---

### "Contrast too low" in Lighthouse

**Solution:** Increase lightness difference between foreground/background:
```css
/* Before */
--foreground: oklch(30% 0 0);    /* Dark gray */
--background: oklch(15% 0 0);    /* Darker gray - low contrast! */

/* After */
--foreground: oklch(95% 0 0);    /* Light gray */
--background: oklch(15% 0 0);    /* Darker gray - high contrast! */
```

---

### "Theme doesn't persist on reload"

**Check:** `/src/app/layout.tsx` includes `<ThemeScript />` in `<head>`

```tsx
<head>
  <ThemeScript defaultColorTheme="green" />
</head>
```

---

### "Components still use old colors"

**Cause:** Component has hardcoded colors (violates design system).

**Fix:** Replace hardcoded values with CSS variables:
```tsx
// Before
<div className="bg-blue-500 text-white">

// After
<div className="bg-primary text-primary-foreground">
```

---

## Next Steps

- **[Theme Gallery](./THEME-GUIDE.md)** - See all 18 themes with screenshots
- **[Component Authoring](./COMPONENT-AUTHORING.md)** - Extend design system safely
- **[Design System Reference](./DESIGN_SYSTEM.md)** - Complete token documentation

---

**Questions?** Check the [Troubleshooting Guide](../01-getting-started/TROUBLESHOOTING.md) or open an issue.
