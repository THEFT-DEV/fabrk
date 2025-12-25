# Design System Gaps

**Last Updated:** 2025-12-07

This document tracks gaps, missing features, and areas for improvement in the design system.

---

## Token Gaps

### 1. Missing `mode.textTransform` Usage

**Status:** Gap  
**Priority:** Low  
**Description:** Only 78/78+ components (14.1%) use `mode.textTransform`

Most components don't apply uppercase text transform even when the Terminal theme expects it. This is partially by design (not everything should be uppercase), but some components that display labels/titles should support it.

**Components that should consider adding:**

- CardHeader title
- Alert title
- Toast title
- Tab labels

### 2. No Animation Tokens

**Status:** Gap  
**Priority:** Medium  
**Description:** Animation durations and easing are hardcoded

Components use various animation classes (`animate-in`, `duration-200`, `transition-colors`) but there's no centralized animation token system.

**Recommendation:**

```css
/* Add to globals.css or tokens.json */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
```

### 3. No Shadow Tokens

**Status:** Gap  
**Priority:** Low  
**Description:** Some components use `shadow-sm` or `shadow-md` directly

The Terminal theme generally avoids shadows, but Modern/Soft themes might want them. No token system for theme-adaptive shadows.

**Recommendation:**

```css
--shadow-sm: /* theme dependent */;
--shadow-md: /* theme dependent */;
```

---

## Component Gaps

### 1. Missing Data Table

**Status:** Gap  
**Priority:** High  
**Description:** No composite DataTable component

While `table.tsx` exists for basic tables, there's no full-featured DataTable with:

- Sorting
- Filtering
- Pagination integration
- Column visibility
- Row selection

**Note:** `data-table/` directory exists but may be incomplete.

### 2. Missing Drawer Component

**Status:** Gap  
**Priority:** Medium  
**Description:** Sheet serves as drawer but naming may confuse developers

Consider an alias or clear documentation that Sheet = Drawer for side panels.

### 3. Missing Stepper Component

**Status:** Gap  
**Priority:** Low  
**Description:** No visual step indicator for multi-step forms

`multi-step-form.tsx` exists but may not have a visual stepper UI.

---

## Documentation Gaps

### 1. Component Theming Guide

**Status:** Gap  
**Priority:** High  
**Description:** No documentation on how to theme-enable new components

Developers need guidance on:

- When to use mode.font vs hardcoded font classes
- When to use mode.radius
- When to use mode.textTransform
- How tokens cascade

### 2. Token Reference

**Status:** Gap  
**Priority:** Medium  
**Description:** No single-page token reference

`tokens.json` exists but no human-readable documentation showing all available tokens with examples.

### 3. Migration Guide

**Status:** Gap  
**Priority:** Low  
**Description:** No guide for migrating existing components to design system

If someone has hardcoded styles, how do they convert to tokens?

---

## Specification Gaps

### 1. Icon Size Tokens

**Status:** Gap  
**Priority:** Low  
**Description:** Icon sizes are hardcoded (h-4 w-4, h-5 w-5, size-4)

No token system for consistent icon sizing across themes.

### 2. Border Width Tokens

**Status:** Gap  
**Priority:** Low  
**Description:** Border widths are assumed to be 1px

No token for border width if themes need different border treatments.

### 3. Focus Ring Specification

**Status:** Gap  
**Priority:** Medium  
**Description:** Focus ring styling varies slightly across components

Most use `focus-visible:ring-2 focus-visible:ring-primary` but should be tokenized for consistency.

---

## Tooling Gaps

### 1. Automated Compliance Testing

**Status:** Gap  
**Priority:** High  
**Description:** No automated tests for design system compliance

Need ESLint rules or custom scripts to detect:

- Hardcoded colors (hex, rgb, named colors)
- Missing mode tokens
- Non-8-point spacing values
- Theme-specific naming

### 2. component documentation/Component Showcase

**Status:** Partial  
**Priority:** Medium  
**Description:** Component showcase exists but may not show all variants

Ensure every component is documented with all variants and states.

### 3. Token Sync Tooling

**Status:** Gap  
**Priority:** Low  
**Description:** No tool to sync Figma tokens to code

If design uses Figma, need a pipeline to keep tokens in sync.

---

## Resolution Tracking

| Gap                      | Status | Target Date | Assigned |
| ------------------------ | ------ | ----------- | -------- |
| mode.textTransform usage | Open   | -           | -        |
| Animation tokens         | Open   | -           | -        |
| DataTable component      | Open   | -           | -        |
| Theming guide docs       | Open   | -           | -        |
| Automated testing        | Open   | -           | -        |

---

_This document should be updated as gaps are discovered or resolved._
