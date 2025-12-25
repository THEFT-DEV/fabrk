# Design System Foundations

> Complete token definitions for colors, typography, spacing, radii, shadows, and motion.

**Version:** 2.0.0  
**Status:** FROZEN

---

## Token Categories

| Category   | Prefix    | Example                                   |
| ---------- | --------- | ----------------------------------------- |
| Colors     | `color-`  | `color-bg-surface`, `color-text-primary`  |
| Spacing    | `space-`  | `space-xs`, `space-md`, `space-xl`        |
| Typography | `text-`   | `text-size-sm`, `text-weight-bold`        |
| Radius     | `radius-` | `radius-none`, `radius-md`, `radius-full` |
| Shadow     | `shadow-` | `shadow-none`, `shadow-md`, `shadow-xl`   |
| Motion     | `motion-` | `motion-duration-fast`, `motion-ease-out` |
| Layout     | `layout-` | `layout-container-xl`, `layout-z-modal`   |

---

## 1. Color System

### 1.1 Semantic Color Tokens

Components use these semantic tokens. Themes resolve them to primitives.

#### Background Colors

| Token                     | Role                      | CSS Variable    |
| ------------------------- | ------------------------- | --------------- |
| `color-bg-base`           | Page background           | `--background`  |
| `color-bg-surface`        | Card/panel background     | `--card`        |
| `color-bg-surface-raised` | Elevated surface (modals) | `--popover`     |
| `color-bg-surface-sunken` | Inset areas               | `--muted`       |
| `color-bg-muted`          | Subtle backgrounds        | `--muted`       |
| `color-bg-accent`         | Primary action background | `--primary`     |
| `color-bg-accent-muted`   | Subtle accent             | `--accent`      |
| `color-bg-danger`         | Destructive background    | `--destructive` |
| `color-bg-danger-muted`   | Subtle danger             | —               |
| `color-bg-success`        | Success background        | `--success`     |
| `color-bg-success-muted`  | Subtle success            | —               |
| `color-bg-warning`        | Warning background        | `--warning`     |
| `color-bg-warning-muted`  | Subtle warning            | —               |
| `color-bg-info`           | Info background           | `--info`        |
| `color-bg-info-muted`     | Subtle info               | —               |

#### Text Colors

| Token                  | Role                  | CSS Variable           |
| ---------------------- | --------------------- | ---------------------- |
| `color-text-primary`   | Primary content       | `--foreground`         |
| `color-text-secondary` | Supporting content    | `--muted-foreground`   |
| `color-text-muted`     | Tertiary, placeholder | `--muted-foreground`   |
| `color-text-disabled`  | Disabled state        | —                      |
| `color-text-inverse`   | On accent backgrounds | `--primary-foreground` |
| `color-text-accent`    | Links, emphasis       | `--primary`            |
| `color-text-danger`    | Error text            | `--destructive`        |
| `color-text-success`   | Success text          | `--success`            |
| `color-text-warning`   | Warning text          | `--warning`            |
| `color-text-info`      | Info text             | `--info`               |

#### Border Colors

| Token                  | Role               | CSS Variable    |
| ---------------------- | ------------------ | --------------- |
| `color-border-default` | Standard borders   | `--border`      |
| `color-border-muted`   | Subtle borders     | —               |
| `color-border-strong`  | Emphasized borders | —               |
| `color-border-accent`  | Accent borders     | `--primary`     |
| `color-border-danger`  | Error borders      | `--destructive` |
| `color-border-success` | Success borders    | `--success`     |
| `color-border-focus`   | Focus rings        | `--ring`        |

### 1.2 Primitive Color Palettes

Raw values that themes select from. **Never use directly in components.**

#### Gray (Neutral)

| Stop | OKLCH Value            | Usage                |
| ---- | ---------------------- | -------------------- |
| 50   | `oklch(98% 0.005 240)` | Lightest backgrounds |
| 100  | `oklch(96% 0.005 240)` | Hover on light       |
| 200  | `oklch(92% 0.005 240)` | Borders on light     |
| 300  | `oklch(87% 0.005 240)` | Light-mid            |
| 400  | `oklch(70% 0.005 240)` | Mid-light            |
| 500  | `oklch(55% 0.005 240)` | Icons, mid-range     |
| 600  | `oklch(45% 0.005 240)` | Secondary text       |
| 700  | `oklch(37% 0.01 240)`  | Primary text dark    |
| 800  | `oklch(27% 0.01 240)`  | Very dark            |
| 900  | `oklch(21% 0.01 240)`  | Near black           |
| 950  | `oklch(14% 0.01 240)`  | Darkest backgrounds  |

#### Primary (Accent)

| Stop | OKLCH Value           | Usage             |
| ---- | --------------------- | ----------------- |
| 50   | `oklch(97% 0.02 290)` | Subtle tint       |
| 100  | `oklch(94% 0.04 290)` | Light accent      |
| 200  | `oklch(88% 0.08 290)` | Hover backgrounds |
| 300  | `oklch(79% 0.14 290)` | Light buttons     |
| 400  | `oklch(70% 0.18 290)` | Icons             |
| 500  | `oklch(60% 0.20 290)` | Base accent       |
| 600  | `oklch(52% 0.22 290)` | Primary buttons   |
| 700  | `oklch(45% 0.22 290)` | Hover state       |
| 800  | `oklch(38% 0.20 290)` | Active state      |
| 900  | `oklch(32% 0.18 290)` | Text on light     |
| 950  | `oklch(22% 0.15 290)` | Darkest accent    |

#### Status Colors

**Red (Danger)**
| Stop | Value | Usage |
|------|-------|-------|
| 500 | `oklch(60% 0.22 25)` | Icons |
| 600 | `oklch(52% 0.24 25)` | Backgrounds |

**Green (Success)**
| Stop | Value | Usage |
|------|-------|-------|
| 500 | `oklch(65% 0.18 145)` | Icons |
| 600 | `oklch(55% 0.18 145)` | Backgrounds |

**Amber (Warning)**
| Stop | Value | Usage |
|------|-------|-------|
| 500 | `oklch(80% 0.16 85)` | Icons |
| 600 | `oklch(70% 0.18 75)` | Backgrounds |

**Blue (Info)**
| Stop | Value | Usage |
|------|-------|-------|
| 500 | `oklch(60% 0.18 250)` | Icons |
| 600 | `oklch(52% 0.20 250)` | Backgrounds |

---

## 2. Spacing Scale

### 2.1 Base Unit: 4px

All spacing derives from a **4px base unit**, creating an 8-point grid with half-step support.

### 2.2 Spacing Tokens

| Token       | Value      | Pixels | Usage          |
| ----------- | ---------- | ------ | -------------- |
| `space-0`   | `0`        | 0      | Reset          |
| `space-px`  | `1px`      | 1      | Hairline       |
| `space-0.5` | `0.125rem` | 2      | Micro          |
| `space-1`   | `0.25rem`  | 4      | Tight          |
| `space-2`   | `0.5rem`   | 8      | Compact        |
| `space-3`   | `0.75rem`  | 12     | Small          |
| `space-4`   | `1rem`     | 16     | Default        |
| `space-5`   | `1.25rem`  | 20     | Medium         |
| `space-6`   | `1.5rem`   | 24     | Comfortable    |
| `space-8`   | `2rem`     | 32     | Large          |
| `space-10`  | `2.5rem`   | 40     | Extra large    |
| `space-12`  | `3rem`     | 48     | Section small  |
| `space-16`  | `4rem`     | 64     | Section medium |
| `space-20`  | `5rem`     | 80     | Section large  |
| `space-24`  | `6rem`     | 96     | Section XL     |
| `space-32`  | `8rem`     | 128    | Hero           |

### 2.3 Semantic Spacing

| Token                | Maps To           | Usage            |
| -------------------- | ----------------- | ---------------- |
| `space-component-xs` | `space-1` (4px)   | Tight padding    |
| `space-component-sm` | `space-2` (8px)   | Small padding    |
| `space-component-md` | `space-4` (16px)  | Default padding  |
| `space-component-lg` | `space-6` (24px)  | Large padding    |
| `space-component-xl` | `space-8` (32px)  | Extra large      |
| `space-gap-xs`       | `space-1` (4px)   | Tight gaps       |
| `space-gap-sm`       | `space-2` (8px)   | Small gaps       |
| `space-gap-md`       | `space-4` (16px)  | Default gaps     |
| `space-gap-lg`       | `space-6` (24px)  | Large gaps       |
| `space-section-sm`   | `space-8` (32px)  | Small sections   |
| `space-section-md`   | `space-12` (48px) | Default sections |
| `space-section-lg`   | `space-16` (64px) | Large sections   |
| `space-section-xl`   | `space-24` (96px) | Hero sections    |
| `space-page`         | `space-6` (24px)  | Page gutters     |

---

## 3. Typography Scale

### 3.1 Font Families

| Token          | Value                            | Usage          |
| -------------- | -------------------------------- | -------------- |
| `font-sans`    | `"Inter", system-ui, sans-serif` | Body, UI       |
| `font-mono`    | `"JetBrains Mono", monospace`    | Code, terminal |
| `font-display` | `"Inter", system-ui, sans-serif` | Headlines      |

### 3.2 Font Sizes

Based on **Major Third** ratio (1.25) with 16px base.

| Token            | Size       | Pixels | Usage            |
| ---------------- | ---------- | ------ | ---------------- |
| `text-size-2xs`  | `0.625rem` | 10     | Micro labels     |
| `text-size-xs`   | `0.75rem`  | 12     | Captions, badges |
| `text-size-sm`   | `0.875rem` | 14     | Body small, UI   |
| `text-size-base` | `1rem`     | 16     | Body default     |
| `text-size-lg`   | `1.125rem` | 18     | Lead text        |
| `text-size-xl`   | `1.25rem`  | 20     | H5               |
| `text-size-2xl`  | `1.5rem`   | 24     | H4               |
| `text-size-3xl`  | `1.875rem` | 30     | H3               |
| `text-size-4xl`  | `2.25rem`  | 36     | H2               |
| `text-size-5xl`  | `3rem`     | 48     | H1               |
| `text-size-6xl`  | `3.75rem`  | 60     | Display          |
| `text-size-7xl`  | `4.5rem`   | 72     | Hero             |
| `text-size-8xl`  | `6rem`     | 96     | Giant            |

### 3.3 Font Weights

| Token                  | Value | Usage             |
| ---------------------- | ----- | ----------------- |
| `text-weight-normal`   | 400   | Body text         |
| `text-weight-medium`   | 500   | Emphasized body   |
| `text-weight-semibold` | 600   | Headings, buttons |
| `text-weight-bold`     | 700   | Strong emphasis   |

### 3.4 Line Heights

| Token                  | Value | Usage          |
| ---------------------- | ----- | -------------- |
| `text-leading-none`    | 1     | Display text   |
| `text-leading-tight`   | 1.25  | Headings       |
| `text-leading-snug`    | 1.375 | Compact body   |
| `text-leading-normal`  | 1.5   | Body text      |
| `text-leading-relaxed` | 1.625 | Readable prose |
| `text-leading-loose`   | 2     | Spacious text  |

### 3.5 Letter Spacing

| Token                   | Value    | Usage           |
| ----------------------- | -------- | --------------- |
| `text-tracking-tighter` | -0.05em  | Large display   |
| `text-tracking-tight`   | -0.025em | Headings        |
| `text-tracking-normal`  | 0        | Body            |
| `text-tracking-wide`    | 0.025em  | Buttons, caps   |
| `text-tracking-wider`   | 0.05em   | All-caps labels |
| `text-tracking-widest`  | 0.1em    | Sparse caps     |

### 3.6 Composite Typography (Presets)

| Token             | Composition            | Usage             |
| ----------------- | ---------------------- | ----------------- |
| `text-heading-xl` | 5xl / bold / tight     | Page titles       |
| `text-heading-lg` | 4xl / semibold / tight | Section titles    |
| `text-heading-md` | 3xl / semibold / tight | Subsection titles |
| `text-heading-sm` | 2xl / semibold / snug  | Card titles       |
| `text-heading-xs` | xl / semibold / snug   | Group titles      |
| `text-body-lg`    | lg / normal / relaxed  | Lead paragraphs   |
| `text-body`       | base / normal / normal | Default body      |
| `text-body-sm`    | sm / normal / normal   | Compact body      |
| `text-caption`    | xs / normal / normal   | Help text, meta   |
| `text-label`      | sm / medium / normal   | Form labels       |
| `text-button`     | sm / semibold / normal | Button text       |
| `text-code`       | sm / normal / mono     | Inline code       |

---

## 4. Border Radius

### 4.1 Radius Scale

| Token         | Value      | Pixels | Usage          |
| ------------- | ---------- | ------ | -------------- |
| `radius-none` | `0`        | 0      | Sharp/terminal |
| `radius-sm`   | `0.125rem` | 2      | Subtle         |
| `radius-md`   | `0.375rem` | 6      | Default        |
| `radius-lg`   | `0.5rem`   | 8      | Prominent      |
| `radius-xl`   | `0.75rem`  | 12     | Large          |
| `radius-2xl`  | `1rem`     | 16     | Extra large    |
| `radius-3xl`  | `1.5rem`   | 24     | Statement      |
| `radius-full` | `9999px`   | —      | Circular/pill  |

### 4.2 Semantic Radius (Theme-Resolved)

| Token           | Terminal | Modern | Soft |
| --------------- | -------- | ------ | ---- |
| `radius-button` | none     | md     | lg   |
| `radius-input`  | none     | md     | lg   |
| `radius-card`   | none     | lg     | xl   |
| `radius-modal`  | none     | xl     | 2xl  |
| `radius-badge`  | sm       | full   | full |
| `radius-avatar` | none     | full   | full |

---

## 5. Shadows & Elevation

### 5.1 Shadow Scale

| Token          | Value                                                                 | Usage          |
| -------------- | --------------------------------------------------------------------- | -------------- |
| `shadow-none`  | `none`                                                                | Flat           |
| `shadow-xs`    | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       | Subtle lift    |
| `shadow-sm`    | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       | Cards          |
| `shadow-md`    | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    | Dropdowns      |
| `shadow-lg`    | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  | Modals         |
| `shadow-xl`    | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Popovers       |
| `shadow-2xl`   | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 | High elevation |
| `shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`                                 | Inset          |

### 5.2 Semantic Shadows (Theme-Resolved)

| Token             | Terminal | Modern | Soft |
| ----------------- | -------- | ------ | ---- |
| `shadow-card`     | none     | sm     | md   |
| `shadow-dropdown` | sm       | md     | lg   |
| `shadow-modal`    | sm       | lg     | xl   |
| `shadow-button`   | none     | xs     | sm   |

---

## 6. Motion & Transitions

### 6.1 Duration Scale

| Token                     | Value  | Usage                |
| ------------------------- | ------ | -------------------- |
| `motion-duration-instant` | 0ms    | No animation         |
| `motion-duration-fast`    | 100ms  | Micro interactions   |
| `motion-duration-normal`  | 200ms  | Standard transitions |
| `motion-duration-slow`    | 300ms  | Complex animations   |
| `motion-duration-slower`  | 500ms  | Page transitions     |
| `motion-duration-slowest` | 1000ms | Loading states       |

### 6.2 Easing Functions

| Token                | Value                                     | Usage          |
| -------------------- | ----------------------------------------- | -------------- |
| `motion-ease-linear` | `linear`                                  | Constant speed |
| `motion-ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`              | Accelerate     |
| `motion-ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`              | Decelerate     |
| `motion-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)`            | Smooth both    |
| `motion-ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)`  | Playful        |
| `motion-ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Natural        |

### 6.3 Composite Motion

| Token           | Duration + Easing    | Usage             |
| --------------- | -------------------- | ----------------- |
| `motion-hover`  | fast + ease-out      | Hover states      |
| `motion-active` | instant + ease-out   | Click feedback    |
| `motion-enter`  | normal + ease-out    | Element appears   |
| `motion-exit`   | fast + ease-in       | Element leaves    |
| `motion-expand` | slow + ease-in-out   | Accordion, drawer |
| `motion-page`   | slower + ease-in-out | Route transitions |

---

## 7. Layout

### 7.1 Breakpoints

| Token            | Min Width | Target           |
| ---------------- | --------- | ---------------- |
| `breakpoint-xs`  | 0         | Mobile portrait  |
| `breakpoint-sm`  | 480px     | Mobile landscape |
| `breakpoint-md`  | 640px     | Tablet portrait  |
| `breakpoint-lg`  | 768px     | Tablet landscape |
| `breakpoint-xl`  | 1024px    | Desktop          |
| `breakpoint-2xl` | 1280px    | Large desktop    |
| `breakpoint-3xl` | 1536px    | Ultra-wide       |

### 7.2 Container Widths

| Token             | Max Width | Usage             |
| ----------------- | --------- | ----------------- |
| `container-xs`    | 320px     | Narrow forms      |
| `container-sm`    | 480px     | Dialogs, auth     |
| `container-md`    | 640px     | Prose, articles   |
| `container-lg`    | 768px     | Settings pages    |
| `container-xl`    | 1024px    | Dashboard content |
| `container-2xl`   | 1280px    | Wide layouts      |
| `container-3xl`   | 1536px    | Full-width tables |
| `container-full`  | 100%      | Edge-to-edge      |
| `container-prose` | 65ch      | Readable text     |

### 7.3 Z-Index Scale

| Token        | Value | Usage           |
| ------------ | ----- | --------------- |
| `z-behind`   | -1    | Behind content  |
| `z-base`     | 0     | Default         |
| `z-raised`   | 10    | Subtle lift     |
| `z-dropdown` | 20    | Dropdowns       |
| `z-sticky`   | 30    | Sticky headers  |
| `z-overlay`  | 40    | Backdrops       |
| `z-modal`    | 50    | Modals, dialogs |
| `z-popover`  | 60    | Popovers        |
| `z-toast`    | 70    | Toasts          |
| `z-tooltip`  | 80    | Tooltips        |
| `z-max`      | 9999  | Always on top   |

---

## 8. Accessibility

### 8.1 Focus Ring

| Token               | Value    |
| ------------------- | -------- |
| `focus-ring-width`  | 2px      |
| `focus-ring-offset` | 2px      |
| `focus-ring-color`  | `--ring` |

### 8.2 Touch Targets

| Token                      | Value | Standard     |
| -------------------------- | ----- | ------------ |
| `touch-target-min`         | 44px  | WCAG minimum |
| `touch-target-comfortable` | 48px  | Recommended  |

### 8.3 Contrast Requirements

| Context            | Min Ratio | Standard |
| ------------------ | --------- | -------- |
| Normal text        | 4.5:1     | WCAG AA  |
| Large text (18px+) | 3:1       | WCAG AA  |
| UI components      | 3:1       | WCAG AA  |
| Enhanced           | 7:1       | WCAG AAA |

---

_Foundations Version 2.0.0 - FROZEN_
