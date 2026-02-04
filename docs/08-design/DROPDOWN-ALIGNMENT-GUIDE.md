# Dropdown Menu Alignment Standards

This guide documents the dropdown menu alignment standards used throughout the Fabrk codebase. Following these patterns ensures consistent, accessible, and responsive dropdown menus across all contexts.

## Quick Reference

| Trigger Position | Alignment | Use Case | Example |
|-----------------|-----------|----------|---------|
| Right side of container | `align="end"` | User menus, table actions, card actions | Navbar user menu, table action column |
| Left side of container | `align="start"` | Sidebar menus, left-positioned actions | Organization switcher in sidebar |
| Center of container | `align="center"` | Centered buttons (rare) | Member card with centered action button |
| Form inputs (Select) | Default (omit align) | All Select components | Pagination selects, filter dropdowns |

## Alignment Decision Rule

**Core Principle:** Align AWAY from screen edge to prevent overflow.

### Why This Matters
- Prevents content being cut off by viewport edges
- Ensures dropdown menus remain fully visible and accessible
- Provides predictable, intuitive user experience
- Avoids horizontal scrollbars on mobile devices

### Decision Logic

```typescript
// Positioning rule:
if (triggerPosition === 'right-side') {
  align = 'end'; // Aligns dropdown's right edge to trigger's right edge
}
if (triggerPosition === 'left-side') {
  align = 'start'; // Aligns dropdown's left edge to trigger's left edge
}
if (triggerPosition === 'center') {
  align = 'center'; // Centers dropdown under trigger
}
```

---

## Implementation Patterns

### Pattern 1: Action Menu (Right-Aligned)

**Use Case:** Table action columns, card action buttons, navbar user menus

**When to use:** Trigger button is positioned on the right side of its container

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Open menu</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    <DropdownMenuItem className="font-semibold">
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold text-destructive">
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Key Properties:**
- `align="end"` - Aligns right edge of menu to right edge of trigger
- `className="w-48"` - Standard width for action menus (192px)
- `font-semibold` - Emphasized text for action items
- Icon spacing: `mr-2 h-4 w-4`

### Pattern 2: Sidebar Menu (Left-Aligned)

**Use Case:** Organization switcher, navigation menus in left sidebar

**When to use:** Trigger button is positioned on the left side or in a sidebar

```typescript
<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        <span className="truncate">{currentOrg.name}</span>
      </div>
      <ChevronsUpDown className="h-4 w-4 shrink-0" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="start"
    className="w-[200px] rounded-brutal border-2 border-brutal shadow-brutal-lg"
  >
    <DropdownMenuLabel className="text-xs text-muted-foreground">
      Your Organizations
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    {organizations.map((org) => (
      <DropdownMenuItem
        key={org.id}
        onSelect={() => handleSwitch(org.id)}
        className="cursor-pointer font-semibold"
      >
        <div className="flex w-full items-center gap-2">
          <span className="flex-1 truncate">{org.name}</span>
          {currentOrg.id === org.id && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </div>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

**Key Properties:**
- `align="start"` - Aligns left edge of menu to left edge of trigger
- `className="w-[200px]"` - Wider width for org names/complex content
- Flex layout for complex item content
- Checkmark indicator for selected state

### Pattern 3: Form Select (Default Alignment)

**Use Case:** Pagination controls, filter dropdowns, form inputs

**When to use:** Using Select component for form fields or table controls

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="h-8 w-[70px] font-semibold">
    <SelectValue />
  </SelectTrigger>
  <SelectContent className="min-w-[70px]">
    {[10, 25, 50, 100].map((size) => (
      <SelectItem key={size} value={`${size}`} className="font-semibold">
        {size}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

**Key Properties:**
- **No `align` prop** - Select uses default Radix UI positioning
- Content width matches trigger: `min-w-[70px]`
- Compact sizing for table context: `h-8 w-[70px]`
- Emphasized text: `font-semibold`

### Pattern 4: Centered Menu (Rare)

**Use Case:** Centered action buttons, symmetric layouts

**When to use:** Trigger button is truly centered in its container (rare)

```typescript
<div className="flex justify-center">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        Options
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="w-[200px]">
      <DropdownMenuItem className="font-semibold">
        Option 1
      </DropdownMenuItem>
      <DropdownMenuItem className="font-semibold">
        Option 2
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
```

**Key Properties:**
- `align="center"` - Centers menu under trigger
- Use sparingly - most menus should use `end` or `start`
- Verify button is actually centered before using

---

## Icon & Spacing Standards

### Icon Sizing

**Standard Size:** `h-4 w-4` (16x16px)

```typescript
<Icon className="h-4 w-4" />
```

**Use cases:**
- Action icons next to text
- Indicator icons (checkmarks, chevrons)
- Status icons

**Exceptions:**
- Avatar images: `h-5 w-5` or `h-6 w-6`
- Large preview icons: `h-8 w-8`

### Icon Spacing

**Standard Spacing:** `mr-2` (8px gap between icon and text)

```typescript
<DropdownMenuItem>
  <Icon className="mr-2 h-4 w-4" />
  <span>Action Text</span>
</DropdownMenuItem>
```

**Pattern Variations:**

1. **Simple Icon + Text:**
```typescript
<Edit className="mr-2 h-4 w-4" />
Edit
```

2. **Icon + Text + Right Indicator:**
```typescript
<DropdownMenuItem>
  <Icon className="mr-2 h-4 w-4" />
  <span className="flex-1">Text</span>
  <Check className="h-4 w-4 text-primary" />
</DropdownMenuItem>
```

3. **Complex Layout:**
```typescript
<DropdownMenuItem className="flex items-center gap-2">
  <Icon className="h-4 w-4" />
  <div className="flex flex-1 items-center justify-between">
    <span className="font-semibold">Primary Text</span>
    <Badge variant="outline">Status</Badge>
  </div>
</DropdownMenuItem>
```

### Text Layout

**Standard Pattern:** Use flex layout for complex content

```typescript
// Long text that might overflow
<span className="flex-1 truncate">
  {longText}
</span>

// Full layout
<div className="flex w-full items-center gap-2">
  <Avatar className="h-5 w-5" />
  <span className="flex-1 truncate">{name}</span>
  <Badge variant="outline">{role}</Badge>
</div>
```

**Key Classes:**
- `flex-1` - Takes remaining space
- `truncate` - Prevents overflow with ellipsis
- `items-center` - Vertically centers content
- `gap-2` - 8px spacing between items

---

## Content Width Guidelines

### Standard Widths

| Width Class | Size | Use Case |
|-------------|------|----------|
| `w-48` | 192px | Standard action menus (Edit, Delete, etc.) |
| `w-56` | 224px | Menus with longer action names |
| `w-80` | 320px | User menus with profile preview |
| `w-[70px]` | 70px | Compact pagination selects |
| `w-[160px]` | 160px | Medium-sized org/team menus |
| `w-[200px]` | 200px | Organization switcher |

### Choosing Width

**Decision Factors:**
1. **Content length** - Ensure longest item fits without truncation
2. **Context** - Table contexts need compact widths
3. **Visual hierarchy** - Larger menus for primary actions
4. **Consistency** - Use existing widths when possible

**Examples:**

```typescript
// Compact table actions
<DropdownMenuContent align="end" className="w-48">

// Complex user menu with preview
<DropdownMenuContent align="end" className="w-80">

// Organization switcher with logos
<DropdownMenuContent align="start" className="w-[200px]">

// Pagination select (very compact)
<SelectContent className="min-w-[70px]">
```

---

## Accessibility Requirements

### Touch Targets

**Minimum Size:** 44x44px on mobile devices (WCAG 2.1 Level AAA)

```typescript
// Ensure trigger buttons meet minimum size
<Button
  variant="ghost"
  size="icon" // size="icon" is 40x40px - add padding to reach 44x44px
  className="h-11 w-11" // Override to 44x44px for mobile
>
  <MoreHorizontal className="h-4 w-4" />
</Button>
```

**Testing:**
```typescript
// Playwright test example
test('touch targets meet minimum size', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // Mobile
  const trigger = page.locator('[data-testid="menu-trigger"]');
  const box = await trigger.boundingBox();

  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
});
```

### Keyboard Navigation

**Standard Behavior** (handled by Radix UI):
- `Tab` - Focus trigger button
- `Enter` or `Space` - Open menu
- `↓` / `↑` - Navigate menu items
- `Esc` - Close menu
- `Enter` - Select item

**Implementation:**
```typescript
// Add ARIA label for screen readers
<DropdownMenuTrigger asChild>
  <Button
    variant="ghost"
    size="sm"
    aria-label="Open actions menu" // Required!
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Open menu</span>
  </Button>
</DropdownMenuTrigger>
```

### Screen Reader Support

**Requirements:**
1. **Trigger labels** - Every trigger needs descriptive text
2. **Menu state** - Radix automatically announces open/closed
3. **Item descriptions** - Use clear, action-oriented text
4. **Disabled states** - Radix handles `data-disabled` attribute

**Good Example:**
```typescript
<DropdownMenuItem className="font-semibold">
  <UserCog className="mr-2 h-4 w-4" />
  Change user role
</DropdownMenuItem>
```

**Bad Example:**
```typescript
<DropdownMenuItem>
  <Icon className="mr-2 h-4 w-4" />
  Edit
</DropdownMenuItem>
// ❌ Too vague - "Edit what?"
```

### Focus Management

**Standard Behavior:**
- Focus returns to trigger on menu close
- First item focused when menu opens
- Focus trapped within menu (cannot tab out)

**Styling Focus Indicators:**
```typescript
// Radix applies focus:bg-accent automatically
// Add custom focus rings if needed:
<DropdownMenuTrigger asChild>
  <Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
    Trigger
  </Button>
</DropdownMenuTrigger>
```

---

## Testing Checklist

Use this checklist when implementing new dropdown menus:

### Visual Testing
- [ ] Dropdown opens below/above trigger (automatic)
- [ ] Alignment looks natural (left/right/center matches trigger position)
- [ ] No content cut off by viewport edges
- [ ] Works on mobile (390px width)
- [ ] Works on tablet (768px width)
- [ ] Works on desktop (1920px width)
- [ ] Icons are properly sized (`h-4 w-4`)
- [ ] Spacing between icon and text is correct (`mr-2`)
- [ ] Text truncates properly for long content

### Functional Testing
- [ ] Dropdown opens on click/tap
- [ ] Dropdown closes on outside click
- [ ] Dropdown closes on item selection
- [ ] Dropdown closes on Escape key
- [ ] Keyboard navigation works (↑↓ keys)
- [ ] Enter key selects item
- [ ] Tab key focuses trigger
- [ ] Focus returns to trigger on close

### Accessibility Testing
- [ ] Trigger has descriptive `aria-label` or visible text
- [ ] Touch target is ≥44x44px on mobile
- [ ] Screen reader announces menu state
- [ ] Screen reader announces each item
- [ ] Disabled items are properly marked
- [ ] Focus indicator is visible
- [ ] Color contrast meets WCAG AA (4.5:1)

### Responsive Testing
- [ ] Menu doesn't overflow on small screens
- [ ] Touch targets are adequate on mobile
- [ ] Menu width is appropriate for viewport
- [ ] Scrolling works if menu is taller than viewport

### Theme Testing
- [ ] Works with all 20 color themes
- [ ] No hardcoded colors (uses design tokens only)
- [ ] Focus states are visible in all themes
- [ ] Hover states are clear

---

## Common Mistakes to Avoid

### Mistake 1: Using wrong alignment

**Problem:**
```typescript
// ❌ Wrong - table action menu in right column using align="start"
<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-48">
      {/* Menu will extend beyond right viewport edge! */}
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
```

**Solution:**
```typescript
// ✅ Correct - use align="end" for right-side triggers
<DropdownMenuContent align="end" className="w-48">
```

### Mistake 2: Forgetting align prop

**Problem:**
```typescript
// ⚠️ Missing align prop - Radix defaults to "center"
<DropdownMenuContent className="w-48">
```

**Solution:**
```typescript
// ✅ Explicit alignment based on trigger position
<DropdownMenuContent align="end" className="w-48">
```

### Mistake 3: Inconsistent icon sizing

**Problem:**
```typescript
// ❌ Mixing icon sizes
<DropdownMenuItem>
  <Edit className="h-5 w-5" />
  Edit
</DropdownMenuItem>
<DropdownMenuItem>
  <Trash2 className="h-4 w-4" />
  Delete
</DropdownMenuItem>
```

**Solution:**
```typescript
// ✅ Consistent h-4 w-4 for all action icons
<DropdownMenuItem>
  <Edit className="mr-2 h-4 w-4" />
  Edit
</DropdownMenuItem>
<DropdownMenuItem>
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>
```

### Mistake 4: Missing screen reader text

**Problem:**
```typescript
// ❌ Icon-only button with no label
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon">
    <MoreHorizontal className="h-4 w-4" />
  </Button>
</DropdownMenuTrigger>
```

**Solution:**
```typescript
// ✅ Include sr-only text for screen readers
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon">
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Open actions menu</span>
  </Button>
</DropdownMenuTrigger>
```

### Mistake 5: Hardcoded colors

**Problem:**
```typescript
// ❌ Hardcoded colors break theme switching
<DropdownMenuItem className="text-red-500">
  Delete
</DropdownMenuItem>
```

**Solution:**
```typescript
// ✅ Use semantic design tokens
<DropdownMenuItem className="text-destructive">
  Delete
</DropdownMenuItem>
```

---

## Examples from the Codebase

### Real-World Implementation References

**Files to Reference:**
- `src/components/theme/ThemeDropdown.tsx` - Theme selector with color previews
- `src/components/organization/org-switcher.tsx` - Left-aligned sidebar menu
- `src/components/admin/user-management-table.tsx` - Right-aligned table actions
- `src/components/dashboard/dashboard-header.tsx` - User menu with profile
- `src/components/ui/data-table/data-table-pagination.tsx` - Pagination Select

**component documentation Examples:**
View live examples at http://localhost:6006
- DropdownMenu/Alignment stories
- Select component variations

---

## Summary

### Key Takeaways

1. **Use `align="end"` for right-side triggers** (90% of cases)
2. **Use `align="start"` for left-side triggers** (sidebar menus)
3. **Use default alignment for Select components** (omit align prop)
4. **Icon standard:** `h-4 w-4` with `mr-2` spacing
5. **Font weight:** `font-semibold` for emphasized action menus
6. **Accessibility:** Always include screen reader labels
7. **Touch targets:** Minimum 44x44px on mobile
8. **Theme-safe:** Use design tokens, never hardcode colors

### Quick Decision Tree

```
Is this a DropdownMenu or Select?
│
├─ DropdownMenu
│  │
│  ├─ Trigger on right side?
│  │  └─> Use align="end" with w-48
│  │
│  ├─ Trigger on left side?
│  │  └─> Use align="start" with w-[200px]
│  │
│  └─ Trigger centered?
│     └─> Use align="center"
│
└─ Select
   └─> Omit align prop
       Use min-w-[70px] for pagination
       Use default for forms
```

---

**Last Updated:** 2025-11-25
**Maintained By:** Fabrk Engineering Team
