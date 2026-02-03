# Fabrk Design System Context

> Copy this entire file into your AI conversation before asking for code.

## Critical Rules (DO NOT VIOLATE)

1. **NEVER** use hardcoded colors. ALWAYS use CSS variables or Tailwind semantic classes.
2. **NEVER** create new components if one exists in `/components/ui/` or `/components/charts/`.
3. **NEVER** use arbitrary Tailwind values like `w-[137px]`. Use the scale.
4. **ALWAYS** import from `@/components` - never build inline.
5. **ALWAYS** use the `cn()` utility for conditional classes.
6. **ALWAYS** use the `mode` object from `@/design-system` for consistent styling.
7. **ALWAYS** use UPPERCASE for UI labels, badges, and button text (terminal aesthetic).

---

## The `mode` Object

Import and use `mode` for all styling decisions:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Radius (dynamic via CSS variable)
<Card className={cn("border border-border", mode.radius)}>

// Font (monospace)
<span className={mode.font}>Terminal text</span>

// Colors
<div className={mode.color.bg.surface}>Background</div>
<p className={mode.color.text.muted}>Muted text</p>

// Typography
<h1 className={mode.typography.headline.l}>Headline</h1>
<p className={mode.typography.body.m}>Body text</p>

// States
<Button className={cn(mode.state.hover.bg, mode.state.focus.ring)}>
```

---

## Available Components (62 UI + 8 Charts)

Before building anything, check if it exists:

### UI Primitives (`@/components/ui/`)

| Need | Component | Import |
|------|-----------|--------|
| Button | `<Button>` | `@/components/ui/button` |
| Card/Panel | `<Card>`, `<CardHeader>`, `<CardContent>` | `@/components/ui/card` |
| Text input | `<Input>` | `@/components/ui/input` |
| Search input | `<InputSearch>` | `@/components/ui/input-search` |
| Password input | `<InputPassword>` | `@/components/ui/input-password` |
| Number input | `<InputNumber>` | `@/components/ui/input-number` |
| OTP input | `<InputOtp>` | `@/components/ui/input-otp` |
| Dropdown select | `<Select>` | `@/components/ui/select` |
| Modal/Dialog | `<Dialog>` | `@/components/ui/dialog` |
| Alert Dialog | `<AlertDialog>` | `@/components/ui/alert-dialog` |
| Tabs | `<Tabs>` | `@/components/ui/tabs` |
| Styled Tabs | `<StyledTabs>` | `@/components/ui/styled-tabs` |
| Data table | `<Table>` | `@/components/ui/table` |
| Status label | `<Badge>` | `@/components/ui/badge` |
| Menu | `<DropdownMenu>` | `@/components/ui/dropdown-menu` |
| Alert | `<Alert>` | `@/components/ui/alert` |
| Loading state | `<Skeleton>` | `@/components/ui/skeleton` |
| Checkbox | `<Checkbox>` | `@/components/ui/checkbox` |
| Switch toggle | `<Switch>` | `@/components/ui/switch` |
| Tooltip | `<Tooltip>` | `@/components/ui/tooltip` |
| Progress bar | `<Progress>` | `@/components/ui/progress` |
| Avatar | `<Avatar>` | `@/components/ui/avatar` |
| Separator | `<Separator>` | `@/components/ui/separator` |
| Accordion | `<Accordion>` | `@/components/ui/accordion` |
| Breadcrumb | `<Breadcrumb>` | `@/components/ui/breadcrumb` |
| Calendar | `<Calendar>` | `@/components/ui/calendar` |
| Date Picker | `<DatePicker>` | `@/components/ui/date-picker` |
| Command | `<Command>` | `@/components/ui/command` |
| Popover | `<Popover>` | `@/components/ui/popover` |
| Sheet | `<Sheet>` | `@/components/ui/sheet` |
| Slider | `<Slider>` | `@/components/ui/slider` |
| Textarea | `<Textarea>` | `@/components/ui/textarea` |
| Toast | `useToast()` | `@/hooks/use-toast` |
| Form | `<Form>` | `@/components/ui/form` |
| Label | `<Label>` | `@/components/ui/label` |
| Radio Group | `<RadioGroup>` | `@/components/ui/radio-group` |
| Scroll Area | `<ScrollArea>` | `@/components/ui/scroll-area` |
| Code Block | `<CodeBlock>` | `@/components/ui/code-block` |
| Empty State | `<EmptyState>` | `@/components/ui/empty-state` |
| KPI Card | `<KPICard>` | `@/components/ui/kpi-card` |
| Stat Card | `<StatCard>` | `@/components/ui/stat-card` |
| Pricing Card | `<PricingCard>` | `@/components/ui/pricing-card` |
| Pagination | `<Pagination>` | `@/components/ui/pagination` |
| Loading | `<Loading>` | `@/components/ui/loading` |
| Terminal Spinner | `<TerminalSpinner>` | `@/components/ui/terminal-spinner` |
| Typewriter | `<Typewriter>` | `@/components/ui/typewriter` |
| Icons | `lucide-react` | `import { Icon } from 'lucide-react'` |

### Charts (`@/components/charts/`)

| Chart Type | Component | Import |
|------------|-----------|--------|
| Bar chart | `<BarChart>` | `@/components/charts/bar-chart` |
| Line chart | `<LineChart>` | `@/components/charts/line-chart` |
| Area chart | `<AreaChart>` | `@/components/charts/area-chart` |
| Pie chart | `<PieChart>` | `@/components/charts/pie-chart` |
| Donut chart | `<DonutChart>` | `@/components/charts/donut-chart` |
| Funnel | `<FunnelChart>` | `@/components/charts/funnel-chart` |
| Gauge | `<Gauge>` | `@/components/charts/gauge` |
| Sparkline | `<Sparkline>` | `@/components/charts/sparkline` |

---

## Color Tokens (USE THESE)

```
Backgrounds:
  bg-background      - Page background
  bg-card            - Card/surface background
  bg-muted           - Muted/subtle background
  bg-primary         - Primary action background
  bg-secondary       - Secondary background
  bg-destructive     - Error/danger background
  bg-accent          - Accent/highlight background

Text:
  text-foreground         - Primary text
  text-muted-foreground   - Secondary/muted text
  text-primary            - Primary accent text
  text-destructive        - Error text
  text-success            - Success text
  text-warning            - Warning text

Borders:
  border-border      - Default border
  border-primary     - Accent border
  border-destructive - Error border
```

### FORBIDDEN Colors

```tsx
// NEVER use these:
className="text-[#10b981]"     // No hex codes
className="bg-green-500"       // No Tailwind color palette
className="text-gray-600"      // No gray scale
style={{ color: '#ff0000' }}   // No inline hex
```

---

## Spacing Scale (8-Point Grid)

ONLY use these values:

| Class | Value | Usage |
|-------|-------|-------|
| `0` | 0px | Reset |
| `1` | 4px | Tight inline |
| `2` | 8px | Icon gaps |
| `3` | 12px | Small padding |
| `4` | 16px | Default padding |
| `5` | 20px | Medium padding |
| `6` | 24px | Card padding |
| `8` | 32px | Large gaps |
| `10` | 40px | Section spacing |
| `12` | 48px | Large sections |
| `16` | 64px | Page sections |

### FORBIDDEN Spacing

```tsx
// NEVER use arbitrary values:
className="p-[13px]"    // Bad
className="gap-[22px]"  // Bad
className="mt-7"        // Bad (not in scale)
```

---

## Typography Scale

```
text-xs      - 12px - Captions, badges, labels
text-sm      - 14px - Body small
text-base    - 16px - Body default
text-lg      - 18px - Body large
text-xl      - 20px - Heading small
text-2xl     - 24px - Heading medium
text-3xl     - 30px - Heading large
text-4xl     - 36px - Page titles
```

### Terminal Text Casing

| Element | Casing | Example |
|---------|--------|---------|
| UI Labels/Badges | UPPERCASE | `[SYSTEM]`, `[STATUS]` |
| Button Text | UPPERCASE with `>` | `> SUBMIT` |
| Headlines | UPPERCASE | `WELCOME TO FABRK` |
| Body Text | Normal case | "Get started by..." |

---

## Border Radius Rules

```tsx
// Full borders - ADD mode.radius
<Card className={cn("border border-border", mode.radius)}>

// Partial borders - NO mode.radius
<div className="border-b border-border">

// Switches - ALWAYS rounded-full
<Switch /> // Built into component
```

---

## File Conventions

```
Pages:
  /app/(public)/[page]/page.tsx     - Public marketing pages
  /app/(platform)/[page]/page.tsx   - Authenticated app pages
  /app/(auth)/[page]/page.tsx       - Auth pages (login, register)

Components:
  /components/ui/                   - Primitives only (no business logic)
  /components/charts/               - Chart components
  /components/{feature}/            - Feature-specific components

Other:
  /hooks/                           - Custom hooks
  /lib/                             - Utilities and business logic
  /types/                           - TypeScript types
```

---

## Example: Correct Implementation

```tsx
// CORRECT
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function FeatureCard() {
  return (
    <Card className={cn("border border-border", mode.radius)}>
      <CardHeader code="0x01" title="FEATURE" />
      <CardContent padding="md" className="space-y-4">
        <Input placeholder="Enter value" />
        <Button>&gt; SUBMIT</Button>
      </CardContent>
    </Card>
  );
}
```

```tsx
// WRONG - DO NOT DO THIS
export function FeatureCard() {
  return (
    <div className="rounded-lg border border-[#e5e5e5] p-6 bg-white">
      <h2 className="text-[18px] font-semibold mb-4">Feature Name</h2>
      <input className="w-full px-3 py-2 border rounded" />
      <button className="mt-4 px-4 py-2 bg-[#10b981] text-white rounded">
        Submit
      </button>
    </div>
  );
}
```

---

## Quick Checklist Before Writing Code

- [ ] Component exists in `/components/ui/`? Use it.
- [ ] Using semantic color tokens? Not hex or Tailwind colors.
- [ ] Using spacing scale values? Not arbitrary `[px]` values.
- [ ] Using `mode.radius` for bordered elements?
- [ ] Using `cn()` for conditional classes?
- [ ] Using UPPERCASE for terminal UI text?
- [ ] Importing from `@/components/...`?
