# Theme System Architecture

> How themes plug into the design system to enable visual variety without code changes.

**Version:** 2.0.0  
**Status:** FROZEN

---

## Philosophy

### Separation of Concerns

```
COMPONENTS
├─ Reference semantic tokens only
├─ Never reference raw values
└─ Never reference theme-specific tokens

SEMANTIC TOKENS
├─ Role-based naming (bg-surface, text-primary)
├─ Resolved by active theme
└─ What components import

THEMES
├─ Map semantic tokens to primitive values
├─ Terminal, Modern, Soft
└─ Swappable at runtime

PRIMITIVES
├─ Raw values (colors, sizes)
├─ Shared across all themes
└─ Foundation layer
```

### Design Goals

1. **Zero component changes** when switching themes
2. **Consistent behavior** with different aesthetics
3. **Type-safe** theme definitions
4. **Runtime switchable** without page reload
5. **CSS-first** with JS enhancement

---

## Available Themes

### Terminal

Sharp, developer-focused aesthetic inspired by CLI tools.

| Property       | Value             | Notes                     |
| -------------- | ----------------- | ------------------------- |
| Radius         | `none`            | All sharp corners         |
| Font           | `mono`            | JetBrains Mono everywhere |
| Text Transform | `UPPERCASE`       | Labels, buttons, headings |
| Shadows        | minimal           | Border-focused elevation  |
| Decorators     | `[ ]`, `> `, `├─` | Terminal syntax           |

**Use Cases:**

- Developer tools
- CLI documentation
- Technical dashboards
- Admin panels

### Modern

Clean, Linear/Vercel-inspired aesthetic.

| Property       | Value      | Notes               |
| -------------- | ---------- | ------------------- |
| Radius         | `md` (6px) | Subtle rounding     |
| Font           | `sans`     | Inter, system fonts |
| Text Transform | `none`     | Natural casing      |
| Shadows        | subtle     | Soft depth cues     |
| Decorators     | none       | Minimal chrome      |

**Use Cases:**

- SaaS products
- Marketing sites
- Enterprise apps
- Professional tools

### Soft

Friendly, approachable aesthetic for consumer apps.

| Property       | Value         | Notes               |
| -------------- | ------------- | ------------------- |
| Radius         | `lg` (8-12px) | Rounded corners     |
| Font           | `sans`        | Friendly typography |
| Text Transform | `none`        | Natural casing      |
| Shadows        | prominent     | Floating elements   |
| Decorators     | none          | Approachable feel   |

**Use Cases:**

- Consumer apps
- Social platforms
- Wellness/lifestyle
- Creative tools

---

## Token Resolution Table

### Radius Tokens

| Token           | Terminal | Modern | Soft   |
| --------------- | -------- | ------ | ------ |
| `radius-button` | `none`   | `md`   | `lg`   |
| `radius-input`  | `none`   | `md`   | `lg`   |
| `radius-card`   | `none`   | `lg`   | `xl`   |
| `radius-modal`  | `none`   | `xl`   | `2xl`  |
| `radius-badge`  | `sm`     | `full` | `full` |
| `radius-avatar` | `none`   | `full` | `full` |

### Shadow Tokens

| Token             | Terminal | Modern | Soft |
| ----------------- | -------- | ------ | ---- |
| `shadow-card`     | `none`   | `sm`   | `md` |
| `shadow-dropdown` | `sm`     | `md`   | `lg` |
| `shadow-modal`    | `sm`     | `lg`   | `xl` |
| `shadow-button`   | `none`   | `xs`   | `sm` |

### Font Tokens

| Token          | Terminal | Modern | Soft   |
| -------------- | -------- | ------ | ------ |
| `font-body`    | `mono`   | `sans` | `sans` |
| `font-heading` | `mono`   | `sans` | `sans` |
| `font-code`    | `mono`   | `mono` | `mono` |
| `font-ui`      | `mono`   | `sans` | `sans` |

### Text Transform Tokens

| Token               | Terminal    | Modern | Soft         |
| ------------------- | ----------- | ------ | ------------ |
| `transform-button`  | `uppercase` | `none` | `none`       |
| `transform-label`   | `uppercase` | `none` | `capitalize` |
| `transform-heading` | `uppercase` | `none` | `none`       |

---

## Theme Structure

Each theme defines:

```typescript
interface Theme {
  // Identification
  name: string;
  description: string;

  // Semantic Mappings
  color: ColorTokens; // Color resolutions
  radius: RadiusTokens; // Corner treatments
  shadow: ShadowTokens; // Elevation levels
  font: FontTokens; // Typography choices
  textTransform: TransformTokens;

  // Utility Classes
  classes: ThemeClasses; // Tailwind class strings

  // Formatting Functions
  utils: ThemeUtils; // Text formatters
}

interface ThemeClasses {
  radius: string; // e.g., "rounded-none"
  font: string; // e.g., "font-mono"
  text: string; // e.g., "uppercase"
  card: string; // Full card class string
  button: string; // Full button class string
  input: string; // Full input class string
  badge: string; // Full badge class string
}

interface ThemeUtils {
  formatButtonText: (text: string) => string;
  formatLabelText: (label: string) => string;
  formatCardHeader: (title: string, code?: string) => string;
  formatStatusText: (status: string) => string;
}
```

---

## Theme Application

### Method 1: Data Attribute (Runtime)

```html
<html data-theme="terminal"></html>
```

Themes are applied via CSS custom properties:

```css
:root[data-theme='terminal'] {
  --radius-button: 0;
  --font-body: var(--font-mono);
  --shadow-card: none;
}

:root[data-theme='modern'] {
  --radius-button: 0.375rem;
  --font-body: var(--font-sans);
  --shadow-card: var(--shadow-sm);
}
```

### Method 2: Mode Object (Build-time)

Components import the `mode` object:

```typescript
import { mode } from "@/design-system";

// mode.radius → "rounded-none" (terminal)
// mode.font → "font-mono" (terminal)

<div className={cn("border", mode.radius, mode.font)}>
```

### Method 3: Theme Provider (React Context)

```typescript
import { ThemeProvider, useTheme } from "@/design-system";

function App() {
  return (
    <ThemeProvider defaultTheme="terminal">
      <YourApp />
    </ThemeProvider>
  );
}

function Component() {
  const { theme, setTheme } = useTheme();
  // theme.mode → "terminal"
  // setTheme({ mode: "modern" })
}
```

---

## Theme Formatting Functions

### Terminal Theme

```typescript
formatButtonText("Save Changes")     → "> SAVE_CHANGES"
formatLabelText("Email")             → "[EMAIL]:"
formatCardHeader("Settings", "00")   → "[ [0x00] SETTINGS ]"
formatStatusText("Active")           → "[ACTIVE]"
```

### Modern Theme

```typescript
formatButtonText("Save Changes")     → "Save Changes"
formatLabelText("Email")             → "Email"
formatCardHeader("Settings")         → "Settings"
formatStatusText("Active")           → "Active"
```

### Soft Theme

```typescript
formatButtonText("Save Changes")     → "Save Changes"
formatLabelText("email")             → "Email"
formatCardHeader("Settings")         → "Settings"
formatStatusText("active")           → "Active"
```

---

## Implementation Files

### TypeScript Themes

| File                                | Purpose                    |
| ----------------------------------- | -------------------------- |
| `/design-system/themes/terminal.ts` | Terminal theme definition  |
| `/design-system/themes/modern.ts`   | Modern theme definition    |
| `/design-system/themes/soft.ts`     | Soft theme definition      |
| `/design-system/themes/index.ts`    | Theme registry and exports |

### JSON Themes (for tooling)

| File                                  | Purpose                          |
| ------------------------------------- | -------------------------------- |
| `/design-system/themes/terminal.json` | Machine-readable terminal tokens |
| `/design-system/themes/modern.json`   | Machine-readable modern tokens   |

### Main Entry

| File                      | Purpose                              |
| ------------------------- | ------------------------------------ |
| `/design-system/index.ts` | Exports `mode`, utilities, theme API |

---

## Creating Custom Themes

### Step 1: Define Theme Object

```typescript
// themes/custom.ts
import { primitives } from '../tokens/primitives';
import type { SemanticTokens } from '../tokens/semantic';

export const customTheme: SemanticTokens = {
  color: {
    /* color mappings */
  },
  radius: {
    button: primitives.radius.md,
    input: primitives.radius.md,
    card: primitives.radius.lg,
    modal: primitives.radius.xl,
    badge: primitives.radius.full,
    avatar: primitives.radius.full,
  },
  shadow: {
    card: primitives.shadow.sm,
    dropdown: primitives.shadow.md,
    modal: primitives.shadow.lg,
    button: primitives.shadow.xs,
  },
  font: {
    body: primitives.fontFamily.sans,
    heading: primitives.fontFamily.sans,
    code: primitives.fontFamily.mono,
    ui: primitives.fontFamily.sans,
  },
  textTransform: {
    button: 'capitalize',
    label: 'none',
    heading: 'none',
  },
};
```

### Step 2: Add Utility Classes

```typescript
export const customClasses = {
  radius: 'rounded-md',
  font: 'font-sans',
  text: '',
  card: 'rounded-lg border border-border shadow-sm',
  button: 'rounded-md font-sans shadow-xs',
  input: 'rounded-md font-sans border-border',
  badge: 'rounded-full font-sans text-xs',
};
```

### Step 3: Register Theme

```typescript
// themes/index.ts
import { customTheme, customClasses } from './custom';

export const themes = {
  terminal: terminalTheme,
  modern: modernTheme,
  soft: softTheme,
  custom: customTheme,
};

export const themeClasses = {
  terminal: terminalClasses,
  modern: modernClasses,
  soft: softClasses,
  custom: customClasses,
};
```

---

## Dark Mode

Each theme supports both light and dark color schemes independently.

### Color Scheme Matrix

| Token            | Terminal Light | Terminal Dark |
| ---------------- | -------------- | ------------- |
| `bg-base`        | gray-50        | gray-950      |
| `bg-surface`     | white          | gray-900      |
| `text-primary`   | gray-900       | gray-50       |
| `border-default` | gray-200       | gray-800      |

### Application

Dark mode is applied via:

1. CSS class: `<html class="dark">`
2. Media query: `@media (prefers-color-scheme: dark)`
3. Data attribute: `<html data-color-scheme="dark">`

Theme (terminal/modern/soft) and color scheme (light/dark) are **independent**.

---

## Best Practices

### DO

- Reference `mode.radius` instead of `rounded-none`
- Use `mode.font` instead of `font-mono`
- Import formatters from theme utils
- Keep theme-specific logic in theme files

### DON'T

- Hardcode `rounded-none` in components
- Use theme-specific formatting inline
- Mix theme classes across contexts
- Create new tokens without proposal

---

_Theme System Architecture Version 2.0.0 - FROZEN_
