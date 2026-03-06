# Customize a Theme

FABRK ships with 18 terminal themes built on OKLCH color tokens. Here is how they work and how to create your own.

---

## How Themes Work

Every theme is a set of CSS custom properties defined in `src/app/globals.css`. The default theme (Green CRT) lives in `:root`. Other themes use `[data-theme='name']` selectors.

Colors use **OKLCH format**: `lightness% chroma hue`

```css
/* OKLCH breakdown */
--primary: 40% 0.25 140;
/*          |    |    |
            |    |    └── hue (0-360, like a color wheel)
            |    └─────── chroma (0-0.4, saturation intensity)
            └──────────── lightness (0%-100%) */
```

The `data-theme` attribute on `<html>` controls which theme is active. The `ThemeDropdown` component handles switching.

### Theme Token Map

Each theme must define these tokens:

| Token | Purpose |
|-------|---------|
| `--background` | Page background |
| `--foreground` | Default text color |
| `--card` / `--card-foreground` | Card surfaces |
| `--popover` / `--popover-foreground` | Dropdown/popover surfaces |
| `--primary` / `--primary-foreground` | Primary action color |
| `--secondary` / `--secondary-foreground` | Secondary elements |
| `--muted` / `--muted-foreground` | Subdued backgrounds/text |
| `--accent` / `--accent-foreground` | Accent highlights |
| `--destructive` / `--destructive-foreground` | Error/delete actions |
| `--border` | Default border color |
| `--input` | Input border color |
| `--ring` | Focus ring color |
| `--success` / `--warning` / `--info` | Status colors |
| `--chart-1` through `--chart-9` | Chart data series |

## Modify an Existing Theme

To tweak the default green theme, edit the `:root` block in `src/app/globals.css`:

```css
:root {
  /* Make the green brighter */
  --foreground: 88% 0.32 140;
  /* Warmer green (shift hue toward yellow) */
  --primary: 40% 0.25 130;
}
```

To tweak a named theme, find its `[data-theme='...']` block:

```css
[data-theme='amber'] {
  /* Shift amber hue slightly warmer */
  --primary: 55% 0.28 50;
}
```

## Create a New Theme

### Step 1: Add CSS Variables

Add a new block in `src/app/globals.css` after the existing themes:

```css
/* Cyberpunk Neon - Hot pink on dark */
[data-theme='neon'] {
  /* Core tokens - set your hue (330 = pink), adjust lightness/chroma */
  --background: 5% 0.01 330;
  --foreground: 85% 0.3 330;
  --card: 8% 0.02 330;
  --card-foreground: 85% 0.3 330;
  --primary: 55% 0.3 330;
  --primary-foreground: 5% 0.01 330;
  --muted: 18% 0.05 330;
  --muted-foreground: 68% 0.22 330;
  --border: 42% 0.2 330;
  --ring: 60% 0.25 330;

  /* Copy remaining tokens (popover, secondary, accent, destructive,
     success/warning/info, chart-1 through chart-9, semantic mappings,
     code syntax) from any existing theme in globals.css and
     adjust the hue value to match your color. */
}
```

### Step 2: Register in Theme Dropdown

Find the theme list in your theme dropdown component and add your new theme:

```ts
{ value: 'neon', label: 'Neon' },
```

### Step 3: Verify

Your theme works automatically — all components use the `mode` object from `@/design-system`, which resolves to your CSS variables.

```bash
npm run validate:themes    # Checks all required tokens are defined
npm run dev                # Preview your theme in the theme dropdown
```

## OKLCH Hue Reference

| Hue | Color | Hue | Color |
|-----|-------|-----|-------|
| 0 | Red | 180 | Cyan |
| 30 | Orange | 200-220 | Blue |
| 60 | Yellow | 270 | Purple |
| 120-140 | Green | 330 | Pink |
