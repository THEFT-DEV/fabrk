# Design Tokens Reference

> AI: Reference this document for all styling decisions. Never hardcode values.

## Colors

### Semantic Colors (USE THESE)

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| Background | `bg-background` | Page background |
| Card | `bg-card` | Card/panel surfaces |
| Popover | `bg-popover` | Dropdown/popover backgrounds |
| Primary | `bg-primary`, `text-primary` | Main actions, links, focus states |
| Primary Foreground | `text-primary-foreground` | Text on primary backgrounds |
| Secondary | `bg-secondary`, `text-secondary` | Secondary actions |
| Muted | `bg-muted`, `text-muted-foreground` | Disabled states, subtle backgrounds |
| Accent | `bg-accent`, `text-accent` | Highlights, emphasis |
| Destructive | `bg-destructive`, `text-destructive` | Errors, delete actions |
| Success | `bg-success`, `text-success` | Success states |
| Warning | `bg-warning`, `text-warning` | Warning states |
| Info | `bg-info`, `text-info` | Info states |
| Border | `border-border` | All default borders |
| Ring | `ring-ring` | Focus rings |

### Extended Color Tokens (via `mode.color`)

```tsx
import { mode } from '@/design-system';

// Backgrounds
mode.color.bg.base           // bg-background
mode.color.bg.surface        // bg-card
mode.color.bg.elevated       // bg-popover
mode.color.bg.accent         // bg-accent
mode.color.bg.accentMuted    // bg-accent/10
mode.color.bg.danger         // bg-destructive
mode.color.bg.dangerMuted    // bg-destructive/10
mode.color.bg.success        // bg-success
mode.color.bg.successMuted   // bg-success/10
mode.color.bg.warning        // bg-warning
mode.color.bg.warningMuted   // bg-warning/10
mode.color.bg.muted          // bg-muted
mode.color.bg.mutedSubtle    // bg-muted/20

// Text
mode.color.text.primary      // text-foreground
mode.color.text.secondary    // text-card-foreground
mode.color.text.muted        // text-muted-foreground
mode.color.text.accent       // text-accent
mode.color.text.danger       // text-destructive
mode.color.text.success      // text-success
mode.color.text.warning      // text-warning

// Borders
mode.color.border.default    // border-border
mode.color.border.focus      // border-ring
mode.color.border.accent     // border-primary
mode.color.border.danger     // border-destructive
mode.color.border.success    // border-success
```

### FORBIDDEN - Never Use These

```tsx
// Hex codes
className="text-[#10b981]"
className="bg-[#ffffff]"
style={{ color: '#ff0000' }}

// RGB/HSL values
className="text-[rgb(16,185,129)]"
style={{ backgroundColor: 'hsl(160, 84%, 39%)' }}

// Tailwind color palette
className="text-green-500"
className="bg-blue-600"
className="border-gray-200"
className="text-slate-700"

// Named colors
className="text-red"
style={{ color: 'blue' }}
```

---

## Spacing

### Scale (USE ONLY THESE)

| Class | Value | Usage |
|-------|-------|-------|
| `0` | 0px | Reset |
| `0.5` | 2px | Micro spacing |
| `1` | 4px | Tight inline spacing |
| `1.5` | 6px | Small inline |
| `2` | 8px | Icon gaps, tight padding |
| `2.5` | 10px | Between tight and small |
| `3` | 12px | Small padding |
| `3.5` | 14px | Between small and default |
| `4` | 16px | Default padding, gaps |
| `5` | 20px | Medium padding |
| `6` | 24px | Card padding, section gaps |
| `7` | 28px | Between 6 and 8 |
| `8` | 32px | Large gaps |
| `9` | 36px | Between 8 and 10 |
| `10` | 40px | Section spacing |
| `11` | 44px | Between 10 and 12 |
| `12` | 48px | Large section spacing |
| `14` | 56px | XL spacing |
| `16` | 64px | Page sections |
| `20` | 80px | Hero spacing |
| `24` | 96px | Major sections |

### Spacing Tokens (via `mode.spacing`)

```tsx
import { mode } from '@/design-system';

// Button padding
mode.spacing.button.sm   // px-2 py-1
mode.spacing.button.md   // px-4 py-2
mode.spacing.button.lg   // px-6 py-4

// Input padding
mode.spacing.input       // px-4 py-2

// Card padding
mode.spacing.card        // p-4

// Badge padding
mode.spacing.badge.sm    // px-2 py-0.5
mode.spacing.badge.md    // px-2 py-1
```

### FORBIDDEN Spacing

```tsx
// Arbitrary values
className="p-[13px]"
className="gap-[22px]"
className="mt-[100px]"
className="w-[137px]"

// Values not in scale
className="p-7"   // Use p-6 or p-8
className="gap-9" // Use gap-8 or gap-10
className="mt-11" // Use mt-10 or mt-12
```

---

## Typography

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-2xs` | 10px | 14px | Micro text |
| `text-xs` | 12px | 16px | Captions, badges, labels |
| `text-sm` | 14px | 20px | Secondary text, table cells |
| `text-base` | 16px | 24px | Body text (default) |
| `text-lg` | 18px | 28px | Lead paragraphs |
| `text-xl` | 20px | 28px | Card titles, small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 30px | 36px | Page headings |
| `text-4xl` | 36px | 40px | Hero headings |

### Typography Tokens (via `mode.typography`)

```tsx
import { mode } from '@/design-system';

// Display - Hero/marketing
mode.typography.display.xl   // 88px/96px
mode.typography.display.l    // 57px/64px
mode.typography.display.m    // 45px/52px
mode.typography.display.s    // 36px/44px

// Headline - Page titles
mode.typography.headline.l   // 32px/40px
mode.typography.headline.m   // 28px/36px
mode.typography.headline.s   // 24px/32px

// Title - Section headers
mode.typography.title.l      // 22px/30px
mode.typography.title.m      // 16px/24px
mode.typography.title.s      // 14px/20px

// Body - Running text
mode.typography.body.l       // 16px/24px
mode.typography.body.m       // 14px/20px
mode.typography.body.s       // 12px/16px

// Label - UI components
mode.typography.label.l      // 14px/20px
mode.typography.label.m      // 12px/16px
mode.typography.label.s      // 11px/16px

// Code - Terminal output
mode.typography.code.l       // 16px/24px
mode.typography.code.m       // 14px/20px
mode.typography.code.s       // 12px/16px

// Legacy aliases
mode.typography.button       // text-label-m font-medium
mode.typography.caption      // text-caption text-muted-foreground
mode.typography.micro        // text-2xs
mode.typography.caps         // uppercase tracking-caps
```

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Buttons, labels |
| `font-semibold` | 600 | Headings, emphasis |
| `font-bold` | 700 | Strong emphasis only |

### FORBIDDEN Typography

```tsx
// Arbitrary sizes
className="text-[17px]"
className="text-[22px]"

// Inline font-size
style={{ fontSize: 18 }}
style={{ fontSize: '1.125rem' }}
```

---

## Border Radius

### Standard Classes

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners (terminal default) |
| `rounded-sm` | 2px | Subtle rounding |
| `rounded` | 4px | Default, inputs |
| `rounded-md` | 6px | Cards, buttons |
| `rounded-lg` | 8px | Modals, larger cards |
| `rounded-xl` | 12px | Feature cards |
| `rounded-full` | 9999px | Pills, avatars, switches |

### Dynamic Radius (via `mode.radius`)

```tsx
import { mode } from '@/design-system';

// Use mode.radius for theme-aware radius
<Card className={cn("border border-border", mode.radius)}>

// This maps to CSS variable --radius
// Terminal theme: rounded-none
// Other themes: may use rounded values
```

### FORBIDDEN Radius

```tsx
// Arbitrary radius
className="rounded-[10px]"
className="rounded-[5px]"
```

---

## Shadows

| Class | Usage |
|-------|-------|
| `shadow-none` | Flat elements |
| `shadow-sm` | Subtle depth, inputs |
| `shadow` | Cards, dropdowns |
| `shadow-md` | Elevated cards |
| `shadow-lg` | Modals, popovers |

### Shadow Token (via `mode`)

```tsx
import { mode } from '@/design-system';

mode.shadow // shadow-sm (terminal default)
```

### FORBIDDEN Shadows

```tsx
// Custom shadows
className="shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
```

---

## Z-Index Scale

| Class | Value | Usage |
|-------|-------|-------|
| `z-0` | 0 | Default |
| `z-10` | 10 | Dropdowns |
| `z-20` | 20 | Sticky headers |
| `z-30` | 30 | Fixed elements |
| `z-40` | 40 | Modals |
| `z-50` | 50 | Toasts, tooltips |
| `z-banner` | 60 | Cookie consent, floating notices |
| `z-modal` | 100 | Modals, navigation |

### Z-Index Tokens (via `mode.zIndex`)

```tsx
import { mode } from '@/design-system';

mode.zIndex.banner  // z-banner (60)
mode.zIndex.modal   // z-modal (100)
```

### FORBIDDEN Z-Index

```tsx
// Arbitrary z-index
className="z-[999]"
className="z-[9999]"
style={{ zIndex: 1000 }}
```

---

## Sizing Tokens

```tsx
import { mode } from '@/design-system';

mode.sizing.panel          // h-panel (600px)
mode.sizing.panelSm        // h-panel-sm (400px)
mode.sizing.sidebar        // w-sidebar (288px)
mode.sizing.auth           // max-w-auth (400px)
mode.sizing.dropdown       // min-w-dropdown (8rem)
mode.sizing.dropdownHeight // max-h-dropdown (300px)
mode.sizing.textareaHeight // max-h-textarea (200px)
mode.sizing.touch          // min-h-touch min-w-touch (44px WCAG)
```

---

## State Tokens

```tsx
import { mode } from '@/design-system';

// Hover states
mode.state.hover.bg           // hover:bg-primary/90
mode.state.hover.text         // hover:text-foreground
mode.state.hover.card         // hover:bg-muted/50
mode.state.hover.cardSubtle   // hover:bg-muted/30
mode.state.hover.link         // hover:text-primary
mode.state.hover.listItem     // hover:bg-muted/50

// Focus states
mode.state.focus.ring         // focus-visible:ring-2 ring-ring ring-offset-2

// Disabled states
mode.state.disabled.opacity   // disabled:opacity-50
mode.state.disabled.cursor    // disabled:cursor-not-allowed

// Opacity states
mode.state.completed.opacity  // opacity-60
mode.state.muted.opacity      // opacity-50
mode.state.subtle.opacity     // opacity-40
mode.state.secondary.opacity  // opacity-70
```
