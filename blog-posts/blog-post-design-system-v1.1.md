# I Built a Terminal Design System, Then Had to Break It

> How dogfooding my own boilerplate revealed a font flexibility problem—and led to building a runtime font swapping system.

---

## The Discovery

I was building a new project using [Fabrk](https://fabrk.dev), my terminal-inspired SaaS boilerplate. Everything was going smoothly until I wanted to try a different font for the headlines.

I opened the theme customizer, clicked the font dropdown, and... nothing. The entire system was hardcoded to monospace. Every headline, every paragraph, every button—all locked to `font-mono`.

That's when I realized: I'd built a design system that was too rigid for my own use.

## The Original Problem

Fabrk started as a terminal-first boilerplate. The aesthetic was clear: monospace everything, sharp corners, CRT phosphor colors. It looked great for that specific vibe.

```css
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
}

/* Everything inherits mono */
h1, h2, h3, p, button, input {
  font-family: inherit;
}
```

But here I was, trying to use my own boilerplate for a project that needed a bolder headline font. The terminal aesthetic was right, but the typography was too restrictive.

I had two choices:
1. Fork the code and manually change fonts everywhere
2. Fix the design system to be flexible

I chose option 2.

---

## The Fix: CSS Variables + Runtime Injection

The solution was surprisingly simple. Instead of hardcoding `font-mono`, I introduced two CSS variables:

```css
:root {
  --font-body: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  --font-headline: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
}

body, p, span, li {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headline);
}
```

Now the defaults are still monospace (preserving the terminal look), but anyone can override them.

### Runtime Font Swapping

The theme customizer now injects fonts dynamically:

```typescript
function applyFonts(bodyFont: string, headlineFont: string) {
  document.documentElement.style.setProperty('--font-body', bodyFont);
  document.documentElement.style.setProperty('--font-headline', headlineFont);
}
```

No rebuild required. Pick a font, see it instantly.

### Auto-Generated Google Fonts

I didn't want to manually maintain font URLs. So I built a config-driven system:

```typescript
export const FONT_OPTIONS: FontOption[] = [
  {
    value: 'roboto',
    label: 'Roboto',
    googleFamily: 'Roboto',
    cssValue: "'Roboto', system-ui, sans-serif",
    category: 'sans',
  },
  // Add fonts here, URL generates automatically
];

export const GOOGLE_FONTS_URL = generateGoogleFontsUrl();
```

Adding a new font is just adding an object to the array.

---

## The Pairing Problem

With font selection working, I hit another issue: when I selected a body font, the headline font stayed the same. Users had to manually pick both fonts every time.

I added automatic font pairing using common typographic combinations:

```typescript
export const FONT_PAIRINGS: Record<string, string> = {
  // Mono body → same mono (terminal consistency)
  'jetbrains': 'jetbrains',
  'fira-code': 'fira-code',

  // Sans body → Display headline (Google's popular pairings)
  'roboto': 'oswald',
  'open-sans': 'oswald',
  'inter': 'bebas-neue',

  // Serif body → Sans headline (traditional contrast)
  'playfair': 'lato',
  'merriweather': 'montserrat',
};
```

Now when you select Roboto for body text, Oswald automatically becomes the headline font. These aren't random—they're the most popular pairings from Google Fonts.

---

## What Else I Fixed Along the Way

While I was in the code, I ran a full accessibility audit on all 18 themes. Found some issues:

### Border Contrast (FUI Themes)

The futuristic UI themes had low-contrast borders. Looked cool, failed WCAG.

| Theme | Before | After |
|-------|--------|-------|
| Blueprint | 45% | 55% |
| Cyberpunk | 25% | 38% |
| Navigator | 30% | 36% |
| Phosphor | 25% | 35% |
| Holographic | 35% | 40% |

### Code Comment Contrast

Some themes had unreadable code comments:

- Red theme: 40% → 50%
- Infrared theme: 35% → 28%

### Missing Theme Variables

Added `--code-*` syntax highlighting variables to all themes. Added `chart-6` through `chart-9` for data visualization.

---

## The Takeaway

The best way to find UX problems is to use your own product. I thought the monospace-only system was a feature. Turns out it was a limitation I just hadn't hit yet.

Now Fabrk has:
- **Runtime font swapping** via CSS variables
- **20+ fonts** available in the theme customizer
- **Smart pairing** using real typographic combinations
- **Full WCAG AA compliance** across all 18 themes

The terminal aesthetic is still the default. But now you can break out of it when you need to.

---

## Try It

Fabrk is at [fabrk.dev](https://fabrk.dev). Open the theme customizer, pick a font, watch it change instantly.

The code that powers this is in `src/config/fonts.ts`—add your own fonts in 30 seconds.

---

**Tags:** #css #designsystems #accessibility #nextjs
