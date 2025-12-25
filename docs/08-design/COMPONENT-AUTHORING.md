# Component Authoring Guide

**Extend Fabrk's design system safely.** This guide ensures your custom components maintain the terminal aesthetic and design consistency.

---

## Core Principles

1. **No hardcoded colors** - Always use CSS variables
2. **Terminal aesthetic** - Monospace fonts, sharp corners, structured layout
3. **Accessibility first** - WCAG 2.1 AA minimum
4. **Design tokens** - Use `mode` object from `@/design-system`

---

## Quick Reference

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function MyComponent({ className, ...props }: MyComponentProps) {
  return (
    <div
      className={cn(
        // Layout
        "flex items-center gap-2",
        // Terminal aesthetics
        mode.radius,  // rounded-none
        mode.font,    // font-mono
        // Design tokens (NO hardcoded colors!)
        "bg-card text-card-foreground",
        "border border-border",
        // States
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        // Custom overrides
        className
      )}
      {...props}
    />
  );
}
```

---

## Design Token Rules

### ✅ DO: Use Semantic Tokens

```tsx
// Background colors
className="bg-background"      // Page background
className="bg-card"             // Card/surface
className="bg-muted"            // Muted backgrounds
className="bg-primary"          // Brand color
className="bg-accent"           // Accent color
className="bg-destructive"      // Error state

// Text colors
className="text-foreground"         // Primary text
className="text-muted-foreground"   // Secondary text
className="text-primary"            // Brand text
className="text-destructive"        // Error text
className="text-success"            // Success text

// Borders
className="border-border"       // Default borders
className="border-input"        // Form inputs
className="border-primary"      // Brand borders
```

###  ❌ DON'T: Use Hardcoded Colors

```tsx
// WRONG - breaks theme switching
className="bg-white text-black"
className="bg-gray-100 text-gray-900"
className="bg-blue-500 text-white"
className="border-gray-300"
style={{ backgroundColor: "#ffffff" }}

// RIGHT - uses design tokens
className="bg-background text-foreground"
className="bg-muted text-muted-foreground"
className="bg-primary text-primary-foreground"
className="border-border"
```

---

## Terminal Aesthetic Rules

### 1. Sharp Corners (No Rounding)

```tsx
// ✅ CORRECT
import { mode } from "@/design-system";

<Button className={mode.radius}>Click Me</Button>
// Renders: rounded-none

// ❌ WRONG
<Button className="rounded-md">Click Me</Button>
<Button className="rounded-lg">Click Me</Button>
```

**Why:** Terminal aesthetic requires sharp, structured edges.

---

### 2. Monospace Typography

```tsx
// ✅ CORRECT - uses mode.font
<p className={cn("text-sm", mode.font)}>Terminal text</p>

// ❌ WRONG - overrides monospace
<p className="font-sans text-sm">Non-terminal text</p>
```

**Why:** Body tag already uses `font-mono`, but components should explicitly apply it for consistency.

---

### 3. Minimal Shadows

```tsx
// ✅ CORRECT - subtle or no shadow
<Card className="shadow-sm">Content</Card>

// ❌ WRONG - too pronounced
<Card className="shadow-lg shadow-2xl">Content</Card>
```

**Why:** Flat, terminal aesthetic minimizes depth cues.

---

## Component Patterns

### Button Pattern

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  // Base styles
  cn(
    "inline-flex items-center justify-center gap-2 text-xs font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:opacity-50 disabled:pointer-events-none",
    mode.radius,  // Sharp corners
    mode.font     // Monospace
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function MyButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

**Key Points:**
- Uses `cva` for variant management
- Applies `mode.radius` and `mode.font`
- All colors use semantic tokens
- Accessible focus states

---

### Card Pattern

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function MyCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground",
        "border border-border",
        "shadow-sm",
        mode.radius,
        className
      )}
      {...props}
    />
  );
}

export function MyCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-6",
        "border-b border-border",
        className
      )}
      {...props}
    />
  );
}

export function MyCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-sm font-semibold leading-none tracking-tight",
        mode.font,
        className
      )}
      {...props}
    />
  );
}

export function MyCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props} />
  );
}
```

**Key Points:**
- Card uses `bg-card` (not `bg-white`)
- Border uses `border-border` token
- Typography uses `mode.font`
- Structured composition

---

### Form Input Pattern

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const MyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full px-3 py-2 text-xs",
          "bg-background text-foreground",
          "border border-input",
          "file:border-0 file:bg-transparent file:text-xs file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          mode.radius,
          mode.font,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MyInput.displayName = "MyInput";
```

**Key Points:**
- Uses `border-input` token (not `border-gray-300`)
- Placeholder uses `text-muted-foreground`
- Focus ring uses `ring-ring` token
- Disabled state handled
- ForwardRef for form libraries (React Hook Form, etc.)

---

## Accessibility Requirements

### 1. Focus Visible States

**Required:** All interactive elements must have visible focus indicators.

```tsx
// ✅ CORRECT
<button
  className={cn(
    "...",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  )}
>
  Click Me
</button>

// ❌ WRONG
<button className="focus:outline-none">Click Me</button>  // No visible focus!
```

---

### 2. ARIA Labels for Icon-Only Buttons

**Required:** Icon-only buttons must have `aria-label`.

```tsx
// ✅ CORRECT
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// ❌ WRONG
<Button size="icon">
  <X className="h-4 w-4" />
</Button>  // Screen reader can't announce purpose
```

---

### 3. Color Contrast

**Required:** 4.5:1 for normal text, 3:1 for large text and UI components.

```tsx
// ✅ CORRECT - uses tokens (contrast-tested)
<p className="text-muted-foreground">Secondary text</p>

// ❌ WRONG - hardcoded low-contrast color
<p className="text-gray-400">Secondary text</p>
```

**Verify:** Run `npm run scan:hex` to catch hardcoded colors.

---

### 4. Keyboard Navigation

**Required:** All interactive elements must be keyboard accessible.

```tsx
// ✅ CORRECT - native button (keyboard accessible by default)
<button onClick={handleClick}>Action</button>

// ⚠️ NEEDS WORK - div as button (add role, tabIndex, onKeyDown)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Action
</div>

// ❌ WRONG - div as button without a11y
<div onClick={handleClick}>Action</div>
```

**Best Practice:** Use semantic HTML (`<button>`, `<a>`, `<input>`) instead of divs with click handlers.

---

## Verification Checklist

Before committing a new component:

### ☐ 1. No Hardcoded Colors

```bash
npm run scan:hex
```

**Expected:** `✓ No hardcoded colors found`

**If violations found:** Replace with design tokens.

---

### ☐ 2. Terminal Aesthetic Applied

- [ ] Uses `mode.radius` (sharp corners)
- [ ] Uses `mode.font` (monospace)
- [ ] Uses `shadow-sm` or no shadow (flat aesthetic)

---

### ☐ 3. Accessibility Verified

- [ ] Focus states visible (`focus-visible:ring-2`)
- [ ] Icon-only buttons have `aria-label`
- [ ] Keyboard navigable (no click handlers on divs)
- [ ] Color contrast passes (use DevTools)

---

### ☐ 4. Design Tokens Only

- [ ] All colors use semantic tokens (`bg-primary`, `text-foreground`, etc.)
- [ ] No `bg-white`, `bg-black`, `bg-gray-*`, `text-gray-*`
- [ ] No inline styles with hardcoded colors

---

### ☐ 5. TypeScript Typed

```tsx
export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function MyComponent({ variant = "default", ...props }: MyComponentProps) {
  // ...
}
```

---

## Common Pitfalls

### Pitfall 1: Tailwind Arbitrary Values with Colors

```tsx
// ❌ WRONG - hardcoded color in arbitrary value
<div className="bg-[#ffffff]">

// ✅ CORRECT - use design token
<div className="bg-background">
```

---

### Pitfall 2: Forgetting `mode` Import

```tsx
// ❌ WRONG - hardcoded classes
<Button className="rounded-none font-mono">

// ✅ CORRECT - uses mode object
import { mode } from "@/design-system";

<Button className={cn(mode.radius, mode.font)}>
```

---

### Pitfall 3: Overriding Terminal Aesthetic

```tsx
// ❌ WRONG - breaks terminal aesthetic
<Card className="rounded-xl shadow-2xl">

// ✅ CORRECT - respects terminal aesthetic
<Card className={cn(mode.radius, "shadow-sm")}>
```

---

### Pitfall 4: Missing Focus States

```tsx
// ❌ WRONG - focus removed entirely
<button className="focus:outline-none">

// ✅ CORRECT - focus visible with ring
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
```

---

## Testing Your Component

### 1. Visual Testing

```bash
npm run dev
```

**Check:**
- Component renders correctly
- Hover states work
- Focus states visible
- Disabled states styled
- Mobile responsive

---

### 2. Theme Switching

**Test all 18 themes:**
1. Open theme dropdown
2. Switch between `green`, `amber`, `blue`, `red`, `purple`
3. Try retro themes: `gameboy`, `c64`, `vic20`
4. Verify component looks good in all themes

**Common issues:**
- Hardcoded colors don't switch
- Contrast too low in some themes
- Borders invisible in certain themes

---

### 3. Accessibility Audit

```bash
# 1. Start dev server
npm run dev

# 2. Open Chrome DevTools
# 3. Run Lighthouse accessibility audit
# 4. Target score: 90+
```

**Common failures:**
- Missing `aria-label` on icon buttons
- Insufficient contrast
- Non-semantic HTML (divs as buttons)
- Missing focus indicators

---

## Example: Building a Status Badge

**Goal:** Create a status badge component that supports multiple variants.

```tsx
// status-badge.tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  cn(
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium",
    mode.radius,
    mode.font
  ),
  {
    variants: {
      status: {
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        error: "bg-destructive/10 text-destructive border border-destructive/20",
        info: "bg-info/10 text-info border border-info/20",
        neutral: "bg-muted text-muted-foreground border border-border",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode;
}

export function StatusBadge({
  className,
  status,
  icon,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status, className }))}
      role="status"
      aria-label={`Status: ${status}`}
      {...props}
    >
      {icon && <span className="h-3 w-3" aria-hidden="true">{icon}</span>}
      {children}
    </div>
  );
}
```

**Usage:**
```tsx
import { Check, AlertCircle, Info } from "lucide-react";

<StatusBadge status="success" icon={<Check />}>
  Active
</StatusBadge>

<StatusBadge status="error" icon={<AlertCircle />}>
  Failed
</StatusBadge>

<StatusBadge status="info" icon={<Info />}>
  Pending
</StatusBadge>
```

**Why This Works:**
- ✅ Uses design tokens (no hardcoded colors)
- ✅ Applies terminal aesthetic (`mode.radius`, `mode.font`)
- ✅ Accessible (`role="status"`, `aria-label`)
- ✅ Type-safe with TypeScript
- ✅ Variant-based styling with CVA
- ✅ Works across all 18 themes

---

## Resources

- **Design System Reference:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Customization Guide:** [CUSTOMIZATION-GUIDE.md](./CUSTOMIZATION-GUIDE.md)
- **Theme Guide:** [THEME-GUIDE.md](./THEME-GUIDE.md)
- **Component Docs:** [/docs/components/](/docs/components/)

---

## Getting Help

**Questions?**
- Check existing components in `/src/components/ui/` for patterns
- Review design system documentation
- Run `npm run scan:hex` to verify compliance
- Use Lighthouse for accessibility audits

**Found a bug?** Open an issue with component code and expected behavior.

---

**Remember:** The terminal aesthetic is Fabrk's signature. Keep it sharp, monospace, and token-based. 🚀
