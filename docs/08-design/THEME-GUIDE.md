# Theme Guide

**Fabrk includes 12 retro-inspired color themes.** Each theme is designed for the terminal aesthetic with monospace typography, sharp corners, and CRT/LCD-inspired palettes.

---

## Quick Theme Selector

| If you're building... | Use this theme |
|----------------------|----------------|
| Developer tools, terminals, CLI apps | `green` (classic CRT) |
| Warm, nostalgic SaaS | `amber` (warm CRT) |
| Professional, cool SaaS | `blue` (cool CRT) |
| Alert systems, urgent UIs | `red` (alarm CRT) |
| Creative tools, gaming apps | `purple` (creative CRT) |
| Playful SaaS, indie games | `gameboy` (LCD green) |
| Retro computing brands | `c64` (Commodore blue) |
| Minimalist, monochrome | `gbpocket` (grayscale LCD) |
| Cyberpunk, futuristic | `vic20` (cyan terminal) |
| Classic computing aesthetic | `atari` (blue terminal) |
| High-contrast, accessible | `spectrum` (black/white) |
| Paper-like, reading interfaces | `bw` (black & white) |

---

## WCAG Accessibility

All Fabrk themes are designed to meet **WCAG 2.2 AA** contrast requirements.

### Contrast Ratios

| Element | Minimum Ratio | Fabrk Target | Standard |
|---------|---------------|--------------|----------|
| Body text | 4.5:1 | 7:1+ | WCAG AA |
| Large text (18px+) | 3:1 | 4.5:1+ | WCAG AA |
| UI components | 3:1 | 4.5:1+ | WCAG AA |
| Focus indicators | 3:1 | 4.5:1+ | WCAG 2.2 |

### OKLCH Advantage

Fabrk uses **OKLCH color space** for perceptually uniform colors:

- **Predictable contrast**: Lightness (L) directly correlates to perceived brightness
- **Consistent accessibility**: Same lightness = same contrast ratio
- **Easy validation**: Check L values to estimate contrast

**Contrast Formula (OKLCH):**
```
// Approximate contrast ratio from lightness difference
// Background L < 50%: Dark mode
// Foreground L > 80%: High contrast text

Background: oklch(10% ...)  // Very dark
Foreground: oklch(85% ...)  // Very light
// Result: ~10:1 contrast ratio (exceeds AAA)
```

### Testing Contrast

```bash
# Run accessibility tests
npm run test:a11y

# Manual check with browser DevTools
# 1. Open DevTools > Accessibility tab
# 2. Check contrast ratio for text elements
# 3. Verify 4.5:1 minimum for body text
```

### Focus States

All themes include visible focus states for keyboard navigation:

```css
/* Terminal-style focus ring */
:focus-visible {
  outline: 2px solid oklch(var(--ring));
  outline-offset: 2px;
}

/* High contrast focus for accessibility */
.focus-visible:focus-visible {
  outline-color: oklch(var(--primary));
}
```

---

## Standard CRT Themes (Phosphor Colors)

These themes simulate classic CRT monitor phosphor colors from the 1970s-1990s.

### 🟢 Green (Default)

**ID:** `green`
**Inspiration:** Classic terminal green phosphor (P1 / P31)

```css
[data-theme='green']
```

**Color Palette:**
- Primary: `oklch(70% 0.26 140)` - Bright phosphor green
- Background: `oklch(9% 0.02 144)` - Dark terminal black
- Text: `oklch(84% 0.13 134)` - Light green glow

**Use Cases:**
- Developer tools and terminals
- Command-line interfaces
- Hacker/tech aesthetics
- Retro computing applications

**Mood:** Classic, technical, nostalgic

---

### 🟠 Amber

**ID:** `amber`
**Inspiration:** Amber monochrome monitors (P3 phosphor)

```css
[data-theme='amber']
```

**Color Palette:**
- Primary: `oklch(68% 0.19 51)` - Warm amber glow
- Background: `oklch(12% 0.02 51)` - Dark brown-black
- Text: `oklch(85% 0.11 51)` - Light amber

**Use Cases:**
- Warm, nostalgic applications
- Reading-focused interfaces
- Retro productivity tools
- Vintage computing aesthetic

**Mood:** Warm, cozy, vintage

---

### 🔵 Blue

**ID:** `blue`
**Inspiration:** Blue phosphor terminals (IBM 3270)

```css
[data-theme='blue']
```

**Color Palette:**
- Primary: `oklch(71% 0.17 237)` - Cool phosphor blue
- Background: `oklch(10% 0.02 237)` - Dark blue-black
- Text: `oklch(85% 0.10 230)` - Light cyan-blue

**Use Cases:**
- Professional SaaS applications
- Business tools
- Cool, modern aesthetic
- Medical/scientific interfaces

**Mood:** Professional, cool, trustworthy

---

### 🔴 Red

**ID:** `red`
**Inspiration:** Red CRT displays (Soviet terminals, alert systems)

```css
[data-theme='red']
```

**Color Palette:**
- Primary: `oklch(61% 0.24 22)` - Alert red
- Background: `oklch(11% 0.02 22)` - Dark red-black
- Text: `oklch(87% 0.12 22)` - Light pink-red

**Use Cases:**
- Alert and monitoring systems
- Urgent interfaces (errors, warnings)
- Cyberpunk aesthetics
- Security applications

**Mood:** Urgent, intense, dramatic

---

### 🟣 Purple

**ID:** `purple`
**Inspiration:** Purple/magenta phosphor displays

```css
[data-theme='purple']
```

**Color Palette:**
- Primary: `oklch(61% 0.24 302)` - Vibrant purple
- Background: `oklch(11% 0.02 302)` - Deep purple-black
- Text: `oklch(87% 0.12 302)` - Light magenta

**Use Cases:**
- Creative tools and design apps
- Gaming interfaces
- Music production software
- Artistic/expressive brands

**Mood:** Creative, playful, energetic

---

## Retro Computer Themes (Classic Systems)

These themes recreate the color palettes of legendary 1980s home computers.

### 🎮 Game Boy

**ID:** `gameboy`
**Inspiration:** Original Game Boy (DMG-01) LCD screen

```css
[data-theme='gameboy']
```

**Color Palette:**
- Primary: `oklch(65% 0.13 120)` - Pea soup green
- Background: `oklch(52% 0.08 120)` - Olive green
- Text: `oklch(29% 0.05 120)` - Dark green-black

**Use Cases:**
- Playful SaaS applications
- Indie game projects
- Nostalgic brands
- Retro gaming aesthetic

**Mood:** Playful, nostalgic, fun

**Note:** This is an LCD theme, not CRT. Pairs well with the `lcd` monitor effect.

---

### 💾 Commodore 64

**ID:** `c64`
**Inspiration:** Commodore 64 blue screen with purple border

```css
[data-theme='c64']
```

**Color Palette:**
- Primary: `oklch(57% 0.26 285)` - C64 blue
- Background: `oklch(28% 0.08 285)` - Deep blue
- Text: `oklch(83% 0.13 241)` - Light blue

**Use Cases:**
- Retro computing brands
- 8-bit aesthetic applications
- Nostalgia-focused products
- Demoscene/chiptune culture

**Mood:** Nostalgic, retro, playful

**Historical Note:** The Commodore 64 (1982-1994) was the best-selling single computer model of all time. Its blue-on-blue interface is iconic.

---

### 🎮 Game Boy Pocket

**ID:** `gbpocket`
**Inspiration:** Game Boy Pocket monochrome LCD

```css
[data-theme='gbpocket']
```

**Color Palette:**
- Primary: `oklch(60% 0 0)` - Medium gray
- Background: `oklch(87% 0 0)` - Light gray (LCD off-white)
- Text: `oklch(18% 0 0)` - Near-black

**Use Cases:**
- Minimalist interfaces
- E-ink / e-reader aesthetic
- Monochrome design systems
- Accessible high-contrast UIs

**Mood:** Clean, minimal, focused

**Note:** This is a light theme. Works best with `lcd` monitor effect for authentic handheld feel.

---

### 🖥️ VIC-20

**ID:** `vic20`
**Inspiration:** Commodore VIC-20 cyan on blue

```css
[data-theme='vic20']
```

**Color Palette:**
- Primary: `oklch(89% 0.06 200)` - Bright cyan
- Background: `oklch(29% 0.06 240)` - Deep blue
- Text: `oklch(94% 0.03 200)` - Light cyan

**Use Cases:**
- Cyberpunk aesthetics
- Futuristic interfaces
- Tron-like designs
- Neon-inspired brands

**Mood:** Futuristic, electric, cyberpunk

**Historical Note:** The VIC-20 (1980) was Commodore's first color computer. Its cyan-on-blue palette is instantly recognizable.

---

### 🕹️ Atari 800

**ID:** `atari`
**Inspiration:** Atari 800 light blue on dark blue

```css
[data-theme='atari']
```

**Color Palette:**
- Primary: `oklch(63% 0.11 240)` - Atari blue
- Background: `oklch(23% 0.05 240)` - Dark blue-black
- Text: `oklch(81% 0.06 230)` - Light blue

**Use Cases:**
- Classic computing aesthetic
- Retro gaming brands
- 8-bit/16-bit inspired apps
- Vintage tech products

**Mood:** Classic, authoritative, retro

**Historical Note:** The Atari 800 (1979) was a groundbreaking home computer. Its blue palette represented professionalism vs. the warmer tones of competitors.

---

### 🖤 ZX Spectrum

**ID:** `spectrum`
**Inspiration:** Sinclair ZX Spectrum white on black

```css
[data-theme='spectrum']
```

**Color Palette:**
- Primary: `oklch(65% 0 0)` - Medium gray
- Background: `oklch(0% 0 0)` - Pure black
- Text: `oklch(100% 0 0)` - Pure white

**Use Cases:**
- High-contrast interfaces
- Accessibility-focused designs
- Stark, dramatic aesthetics
- Terminal/command-line tools

**Mood:** Stark, dramatic, focused

**Historical Note:** The ZX Spectrum (1982) popularized affordable computing in the UK. Its high-contrast display was designed for TV output.

---

## Light Themes

### 📄 Black & White

**ID:** `bw`
**Inspiration:** Paper documents, e-readers, classic typography

```css
[data-theme='bw']
```

**Color Palette:**
- Primary: `oklch(0% 0 0)` - Pure black
- Background: `oklch(100% 0 0)` - Pure white
- Text: `oklch(0% 0 0)` - Pure black

**Use Cases:**
- Reading-focused applications
- Documentation sites
- Print-like interfaces
- Accessible, high-contrast UIs

**Mood:** Classic, readable, timeless

**Note:** This is a light theme. Pairs well with `none` monitor effect for clean, modern look.

---

## Theme Switching

### For End Users

Users can switch themes via the theme dropdown in the navigation bar:

1. Click the palette icon in top-right navigation
2. Choose from 12 available themes
3. Theme persists across sessions (saved in localStorage)

### For Developers

Set default theme in `/src/design-system/providers/ThemeProvider.tsx:82`:

```typescript
export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  defaultColorTheme = 'green',  // Change this
  // ...
}) {
```

**Available options:**
- `'amber'` | `'green'` | `'blue'` | `'red'` | `'purple'`
- `'gameboy'` | `'c64'` | `'gbpocket'` | `'vic20'` | `'atari'` | `'spectrum'`
- `'bw'`

---

## Theme Pairing with Monitor Effects

Some themes work better with specific monitor effects. See `/docs/06-features/MONITOR-EFFECTS.md` for details.

**Recommended Pairings:**

| Theme | Monitor Effect | Reason |
|-------|----------------|--------|
| `green`, `amber`, `blue`, `red`, `purple` | `crt` | Authentic CRT phosphor glow |
| `gameboy`, `gbpocket` | `lcd` | Authentic LCD pixel grid |
| `c64`, `vic20`, `atari`, `spectrum` | `crt` | CRT-era computers |
| `bw` | `none` | Modern, clean aesthetic |

**Auto-pairing:** The theme dropdown automatically switches monitor effects when you change themes. This can be customized in `/src/components/theme/theme-dropdown.tsx:86-117`.

---

## Creating a Custom Theme

Want to create your own theme? See the [Customization Guide](./CUSTOMIZATION-GUIDE.md#creating-a-custom-theme) for a step-by-step tutorial.

**Steps:**
1. Choose your color palette (18 OKLCH colors)
2. Add theme block to `globals.css`
3. Register theme in `ThemeProvider.tsx`
4. Add to theme dropdown
5. Test contrast and accessibility

---

## Theme Token Structure

All themes use the same token structure. Only the color values change.

**Required tokens (18):**
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`
- `--ring`
- `--success`, `--success-foreground` (optional semantic)
- `--warning`, `--warning-foreground` (optional semantic)

**Chart colors (9):**
- `--chart-1` through `--chart-9`

**Code syntax highlighting (14):**
- `--code-fg`, `--code-bg`, `--code-comment`, `--code-keyword`, etc.

See [Design System Reference](./DESIGN_SYSTEM.md) for complete token documentation.

---

## Accessibility Considerations

All themes meet **WCAG 2.1 AA** contrast requirements:
- **4.5:1** for normal text (< 18pt)
- **3:1** for large text (≥ 18pt or bold ≥ 14pt)
- **3:1** for UI components and graphical objects

**Testing:** Use Lighthouse accessibility audit or Chrome DevTools contrast checker to verify custom themes.

**High-contrast themes:**
- `spectrum` - Pure black/white (21:1 ratio)
- `bw` - Pure black/white (21:1 ratio)
- `gbpocket` - Near-black on off-white (16:1 ratio)

---

## Theme Comparison

### Dark Themes (CRT-inspired)

| Theme | Primary Hue | Mood | Best For |
|-------|-------------|------|----------|
| Green | 140° (green) | Technical, classic | Developer tools |
| Amber | 51° (orange-yellow) | Warm, nostalgic | Reading apps |
| Blue | 237° (blue) | Cool, professional | Business tools |
| Red | 22° (red-orange) | Urgent, dramatic | Alert systems |
| Purple | 302° (magenta) | Creative, playful | Design tools |

### Dark Themes (Retro computers)

| Theme | Primary Hue | Era | Best For |
|-------|-------------|-----|----------|
| Game Boy | 120° (yellow-green) | 1989 | Playful apps |
| C64 | 285° (blue-violet) | 1982 | 8-bit aesthetic |
| VIC-20 | 200° (cyan) | 1980 | Cyberpunk |
| Atari | 240° (blue) | 1979 | Classic retro |
| Spectrum | 0° (grayscale) | 1982 | High-contrast |

### Light Themes

| Theme | Background | Best For |
|-------|------------|----------|
| GB Pocket | Light gray | Minimalist apps |
| B&W | Pure white | Documentation |

---

## Historical Context

These themes pay homage to computing history:

**1970s - CRT Phosphors:**
- Green phosphor (P1) - Most common terminal phosphor
- Amber phosphor (P3) - Reduced eye strain for long sessions
- Monochrome displays dominated until mid-1980s

**1980s - Home Computers:**
- Commodore 64 (1982) - 17 million units sold, most successful computer model
- ZX Spectrum (1982) - Popularized computing in UK, 5 million units sold
- Atari 800 (1979) - High-end home computer, advanced graphics for the era
- VIC-20 (1980) - First computer to sell 1 million units

**Late 1980s - Handhelds:**
- Game Boy (1989) - Monochrome LCD, 118 million units sold
- LCD technology revolutionized portable computing

These weren't just products - they were cultural phenomena that shaped how we think about computers and interfaces.

---

## Next Steps

- **[Customization Guide](./CUSTOMIZATION-GUIDE.md)** - Change colors and create themes
- **[Monitor Effects](../06-features/MONITOR-EFFECTS.md)** - Add CRT/LCD visual effects
- **[Design System Reference](./DESIGN_SYSTEM.md)** - Complete token documentation

---

**Questions?** Check the [Troubleshooting Guide](../01-getting-started/TROUBLESHOOTING.md) or open an issue.
