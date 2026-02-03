# Design System Rules

> AI: These rules are NON-NEGOTIABLE. Violating them produces incorrect code.

---

## Rule 1: No Hardcoded Colors

**FORBIDDEN:**
```tsx
className="text-[#10b981]"
className="bg-green-500"
className="border-gray-200"
className="text-slate-700"
style={{ color: '#ff0000' }}
style={{ backgroundColor: 'rgb(16, 185, 129)' }}
```

**REQUIRED:**
```tsx
className="text-primary"
className="bg-primary"
className="text-foreground"
className="text-muted-foreground"
className="border-border"
className={mode.color.text.accent}
className={mode.color.bg.success}
```

---

## Rule 2: No Arbitrary Values

**FORBIDDEN:**
```tsx
className="w-[137px]"
className="p-[13px]"
className="text-[17px]"
className="gap-[22px]"
className="rounded-[10px]"
className="z-[999]"
```

**REQUIRED:**
```tsx
className="w-36"         // Use closest scale value
className="p-3"          // Use scale: 0,1,2,3,4,5,6,8,10,12,16,20,24
className="text-base"    // Use text scale
className="gap-6"        // Use spacing scale
className={mode.radius}  // Use mode.radius for border radius
className="z-50"         // Use z-index scale
```

---

## Rule 3: No Custom Components When One Exists

**FORBIDDEN:**
```tsx
// Building a button from scratch
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Save
</button>

// Building a card from scratch
<div className="rounded-lg border p-6 shadow">
  <h3>Title</h3>
</div>

// Building an input from scratch
<input className="w-full border rounded px-3 py-2" />
```

**REQUIRED:**
```tsx
// Use the Button component
import { Button } from "@/components/ui/button"
<Button>Save</Button>

// Use the Card component
import { Card, CardHeader, CardContent } from "@/components/ui/card"
<Card>
  <CardHeader code="0x01" title="TITLE" />
  <CardContent>...</CardContent>
</Card>

// Use the Input component
import { Input } from "@/components/ui/input"
<Input />
```

---

## Rule 4: Use the cn() Utility

**FORBIDDEN:**
```tsx
// String concatenation
className={"base-class " + (condition ? "active" : "")}

// Template literals for conditionals
className={`base-class ${condition ? 'active' : ''}`}

// Multiple className assignments
className="base" className={condition ? "active" : ""}
```

**REQUIRED:**
```tsx
import { cn } from "@/lib/utils"

className={cn("base-class", condition && "active")}

className={cn("base-class", {
  "active": isActive,
  "disabled": isDisabled,
})}

className={cn(
  "border border-border",
  mode.radius,
  isSelected && "bg-primary"
)}
```

---

## Rule 5: Use the mode Object

**FORBIDDEN:**
```tsx
// Hardcoding theme-specific values
className="rounded-none font-mono"
className="text-xs uppercase"
```

**REQUIRED:**
```tsx
import { mode } from "@/design-system"

className={cn("border border-border", mode.radius, mode.font)}
className={cn(mode.typography.label.m, mode.typography.caps)}
className={mode.color.text.muted}
className={mode.state.hover.card}
```

---

## Rule 6: Consistent Spacing

**FORBIDDEN:**
```tsx
// Mixing spacing approaches
<div className="p-4">
  <div className="mt-3">
    <div className="mb-5">
```

**REQUIRED:**
```tsx
// Use space-y or gap consistently
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Or flex with gap
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Rule 7: Import from Correct Paths

**FORBIDDEN:**
```tsx
// Relative imports
import { Button } from "../../components/ui/button"
import { mode } from "../../design-system"

// Direct file imports
import Button from "@/components/ui/button/Button"
```

**REQUIRED:**
```tsx
// Always use @ alias
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
```

---

## Rule 8: No Inline Styles

**FORBIDDEN:**
```tsx
<div style={{ marginTop: 20, padding: '16px', color: '#333' }}>
<span style={{ fontSize: 14, fontWeight: 500 }}>
```

**REQUIRED:**
```tsx
<div className="mt-5 p-4 text-foreground">
<span className={cn(mode.typography.body.m, "font-medium")}>
```

**Exception:** Only use inline styles for truly dynamic values:
```tsx
// OK - dynamic value that can't be a class
<div style={{ width: `${percentage}%` }}>
<div style={{ transform: `translateX(${offset}px)` }}>
```

---

## Rule 9: Terminal Text Casing

**REQUIRED Text Casing:**

| Element Type | Casing | Example |
|--------------|--------|---------|
| UI Labels/Badges | UPPERCASE | `[SYSTEM]`, `[STATUS]` |
| Button Text | UPPERCASE with `>` | `> SUBMIT`, `> CANCEL` |
| Card Headers | UPPERCASE | `USER_SETTINGS` |
| Headlines (H1/H2) | UPPERCASE | `WELCOME TO FABRK` |
| Body Text | Normal case | "Get started by..." |
| Descriptions | Normal case | "Configure your settings" |

**FORBIDDEN:**
```tsx
<Button>Submit</Button>        // Missing > prefix, not uppercase
<CardHeader title="Settings">  // Not uppercase
<Badge>active</Badge>          // Not uppercase
```

**REQUIRED:**
```tsx
<Button>&gt; SUBMIT</Button>
<CardHeader title="SETTINGS" />
<Badge>ACTIVE</Badge>
```

---

## Rule 10: Semantic HTML

**FORBIDDEN:**
```tsx
<div onClick={handleClick}>Click me</div>
<div className="heading">Title</div>
<span className="paragraph">Text content</span>
```

**REQUIRED:**
```tsx
<Button onClick={handleClick}>Click me</Button>
<h2 className={mode.typography.headline.m}>Title</h2>
<p className={mode.typography.body.m}>Text content</p>
```

---

## Rule 11: Accessibility

**Required on interactive elements:**
- Buttons must have accessible text (visible or aria-label)
- Form inputs must have associated labels
- Images must have alt text
- Icons must have aria-hidden="true" if decorative

**FORBIDDEN:**
```tsx
<Button><Icon /></Button>
<Input />
<img src="photo.jpg" />
```

**REQUIRED:**
```tsx
<Button aria-label="Close menu">
  <Icon aria-hidden="true" />
</Button>

<Label htmlFor="email">Email</Label>
<Input id="email" />

<img src="photo.jpg" alt="Team photo from company retreat" />
```

---

## Rule 12: File Organization

**New pages go in:**
- `/app/(public)/[page-name]/page.tsx` - Public marketing pages
- `/app/(platform)/[page-name]/page.tsx` - Authenticated pages
- `/app/(auth)/[page-name]/page.tsx` - Auth pages

**New components go in:**
- `/components/ui/` - Primitive components (stateless, no business logic)
- `/components/{feature}/` - Feature-specific components with business logic

**Hooks go in:**
- `/hooks/use-[name].ts`

**Utils go in:**
- `/lib/[name].ts`

**Types go in:**
- `/types/[name].ts`

---

## Rule 13: Border Radius Usage

**Full borders → ADD mode.radius:**
```tsx
<Card className={cn("border border-border", mode.radius)}>
<div className={cn("border-2 border-primary", mode.radius)}>
```

**Partial borders → NO mode.radius:**
```tsx
<div className="border-b border-border">
<div className="border-t border-muted">
```

**Table cells → NO mode.radius:**
```tsx
<th className="border-b border-border px-4 py-2">
<td className="border-b border-border px-4 py-2">
```

**Switches → ALWAYS rounded-full:**
```tsx
// Built into Switch component, don't override
<Switch />
```

---

## Rule 14: Card Component Usage

**REQUIRED Card Structure:**
```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x01" title="SECTION_TITLE" />
  <CardContent padding="md">
    {/* Content here */}
  </CardContent>
</Card>
```

**CardHeader props:**
- `code` - Terminal-style code (e.g., "0x01", "0x02")
- `title` - UPPERCASE title with underscores

**CardContent padding options:**
- `sm` - Small padding
- `md` - Medium padding (default)
- `lg` - Large padding

---

## Rule 15: Form Component Usage

**REQUIRED Form Pattern:**
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

const form = useForm<FormValues>()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>EMAIL</FormLabel>
          <FormControl>
            <Input placeholder="you@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">&gt; SUBMIT</Button>
  </form>
</Form>
```
