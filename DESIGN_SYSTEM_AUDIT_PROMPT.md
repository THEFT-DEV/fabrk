# Design System Audit Prompt v2.0

> A comprehensive, battle-tested prompt for auditing and unifying the Fabrk design system.

---

## Pre-Flight Checklist

Before executing this audit:

```bash
# 1. Ensure clean working tree
git status

# 2. Push any pending changes
git push origin <current-branch>

# 3. Verify type-check passes
npm run type-check
```

---

## System Context

You are a **Senior Visual Designer** who has designed the interfaces for Apple, Stripe, Linear, Vercel, and Figma. You have deep expertise in:

- Design systems architecture and token hierarchies
- Terminal/retro aesthetic implementation
- WCAG 2.1 AA/AAA accessibility compliance
- Tailwind CSS and CSS custom properties
- Component-driven development patterns

---

## Mission

Perform a **comprehensive design system audit** of the Fabrk codebase to:

1. **Discover** all hardcoded styles not using design system tokens
2. **Categorize** violations by severity and type
3. **Unify** violations into the design system (create new tokens if needed)
4. **Validate** fixes don't break existing functionality
5. **Document** any new tokens or patterns added

---

## Scope

### Files to Audit
```
src/components/**/*.tsx
src/app/**/*.tsx
src/lib/**/*.tsx
```

### Files to EXCLUDE
```
src/app/(marketing)/fui-lab/**     # Experimental lab (intentionally different)
src/emails/**                       # Email templates (require inline styles)
**/examples/**                      # Documentation examples
**/*.stories.tsx                    # Storybook files
**/*.test.tsx                       # Test files
**/*.demo.tsx                       # Demo files
src/data/landing/*.md              # Spec documents (not code)
```

---

## Audit Categories

### Category 1: Hardcoded Colors (CRITICAL)

**Search Patterns:**
```regex
# Tailwind color utilities with specific values
(bg|text|border|ring|outline|fill|stroke)-(red|blue|green|yellow|orange|purple|pink|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose|white|black)-[0-9]+

# Hex codes in className or style
#[0-9a-fA-F]{3,8}

# RGB/RGBA/HSL without var()
rgb\([^v]
rgba\([^v]
hsl\([^v]
hsla\([^v]
```

**Allowed Exceptions:**
- Brand icons (Google, GitHub, etc.) - require eslint-disable comment
- QR codes - require high contrast black/white
- Chart libraries - may need inline colors

**Fix Strategy:**
- Map to semantic tokens: `text-blue-500` → `text-info`
- Map to design tokens: `bg-gray-100` → `bg-muted`
- Add eslint-disable with justification for true exceptions

---

### Category 2: Hardcoded Opacity (HIGH)

**Search Patterns:**
```regex
# Standalone opacity classes (not in variants)
(?<!hover:|focus:|disabled:|group-hover:|peer-disabled:|data-\[)opacity-[0-9]+

# Exception: animation states (opacity-0 → opacity-100) are OK
```

**Token Mapping:**
| Hardcoded | Token | Value |
|-----------|-------|-------|
| `opacity-90` | `mode.state.hover.opacity` | 0.90 |
| `opacity-80` | `mode.state.hover.linkOpacity` | 0.80 |
| `opacity-70` | `mode.state.secondary.opacity` | 0.70 |
| `opacity-60` | `mode.state.completed.opacity` | 0.60 |
| `opacity-50` | `mode.state.muted.opacity` | 0.50 |
| `opacity-40` | `mode.state.subtle.opacity` | 0.40 |
| `opacity-38` | `mode.state.disabled.opacity` | 0.38 |

**Allowed Exceptions:**
- `opacity-0` / `opacity-100` for animations
- `disabled:opacity-50` (Tailwind variant)
- `group-hover:opacity-100` (reveal animations)

---

### Category 3: Spacing Violations (MEDIUM)

**8-Point Grid System:**
| Valid | Pixels | Invalid |
|-------|--------|---------|
| `p-1` | 4px | |
| `p-2` | 8px | `p-1.5` (6px) |
| `p-4` | 16px | `p-3` (12px) |
| `p-6` | 24px | `p-5` (20px) |
| `p-8` | 32px | `p-7` (28px) |

**Search Patterns:**
```regex
# Non-grid spacing
(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|7|9|11)(?![0-9])

# Half-values (except py-0.5 for badges)
(gap|p|px|pt|pb|pl|pr|m|mx|mt|mb|ml|mr)-[0-9]+\.[0-9]+
```

**Allowed Exceptions:**
- `py-0.5` for badge sizing (2px)
- `mt-0.5` for icon alignment (2px)
- `gap-0.5` for tight groupings (2px)

---

### Category 4: Border Radius Violations (HIGH)

**Terminal Aesthetic Rule:** ALL elements use `rounded-none`

**Search Patterns:**
```regex
rounded-(sm|md|lg|xl|2xl|3xl)
```

**Allowed Exceptions:**
- `rounded-full` for:
  - Avatar circles
  - Status dots/indicators
  - Loading animation dots
  - Progress bar tracks
  - macOS window buttons (browser chrome)

**Fix Strategy:**
- Replace with `mode.radius` (resolves to `rounded-none`)
- For exceptions, add comment explaining why `rounded-full` is needed

---

### Category 5: Typography Violations (MEDIUM)

**Terminal Font Rule:** ALL text uses `font-mono`

**Search Patterns:**
```regex
# Sans-serif usage (should be mono)
font-sans

# Non-standard text sizes
text-(base|lg|xl)(?!-)
```

**Allowed:**
- `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl` for headings
- `text-sm`, `text-xs`, `text-[10px]` for body/labels

---

### Category 6: Shadow Violations (LOW)

**Terminal Aesthetic Rule:** Minimal shadows, use `shadow-sm` only

**Search Patterns:**
```regex
shadow-(md|lg|xl|2xl)
```

**Fix Strategy:**
- Replace with `shadow-sm` or remove entirely
- Terminal aesthetic prefers borders over shadows

---

### Category 7: Hover State Inconsistencies (MEDIUM)

**Search Patterns:**
```regex
# Hardcoded hover opacity
hover:opacity-[0-9]+

# Hardcoded hover colors
hover:(bg|text|border)-(red|blue|green|gray|etc)-[0-9]+
```

**Token Mapping:**
| Pattern | Token |
|---------|-------|
| `hover:opacity-80` | `mode.state.hover.linkOpacity` |
| `hover:opacity-90` | `mode.state.hover.opacity` |
| `hover:bg-muted/50` | `mode.state.hover.card` |
| `hover:bg-primary/90` | `mode.state.hover.bg` |

---

### Category 8: Transition Inconsistencies (LOW)

**Search Patterns:**
```regex
# Non-standard durations
duration-[0-9]+
```

**Standard Durations:**
- `duration-150` - Micro interactions (button press)
- `duration-200` - Standard transitions
- `duration-300` - Content transitions
- `duration-500` - Larger animations

---

## Execution Process

### Phase 1: Discovery
```bash
# Run all searches in parallel
# Collect results into categorized lists
# Exclude FUI Lab and other exempted directories
```

### Phase 2: Triage
For each violation:
1. Determine if it's a true violation or allowed exception
2. Categorize by severity (CRITICAL → LOW)
3. Group by file for efficient fixing

### Phase 3: Token Creation
If a violation pattern appears 3+ times and no token exists:
1. Create new token in `src/design-system/index.ts`
2. Add CSS variable to `src/app/globals.css` if needed
3. Update TypeScript interface in `src/design-system/tokens/semantic.ts`

### Phase 4: Fix Implementation
For each category (in order of severity):
1. Apply fixes using design system tokens
2. Add eslint-disable comments for true exceptions
3. Run `npm run type-check` after each batch

### Phase 5: Validation
```bash
npm run type-check    # TypeScript
npm run lint          # ESLint with design rules
npm run build         # Full build test
```

### Phase 6: Commit
```bash
git add -A
git commit -m "refactor: [description of fixes]

- [Category]: [count] violations fixed
- [New tokens added if any]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## New Token Creation Guidelines

When creating new tokens:

### 1. Naming Convention
```
mode.state.[state].[property]
mode.color.[category].[variant]
mode.spacing.[component].[size]
```

### 2. Required Updates
- `src/design-system/index.ts` - Add to mode object
- `src/design-system/tokens/semantic.ts` - Add TypeScript interface
- `src/design-system/themes/terminal.ts` - Add theme value
- `src/app/globals.css` - Add CSS variable (if needed)

### 3. Documentation
Add comment in design system files explaining:
- What the token is for
- When to use it
- Example usage

---

## Quality Gates

### Before Marking Complete:
- [ ] Zero type errors (`npm run type-check`)
- [ ] Zero lint errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No visual regressions (spot check key pages)
- [ ] All changes committed and pushed

### Violation Counts Target:
- Hardcoded colors: 0
- Hardcoded opacity: 0 (outside allowed patterns)
- Spacing violations: 0 (outside allowed exceptions)
- Border radius violations: 0 (outside allowed exceptions)
- Typography violations: 0

---

## Reporting Format

After audit completion, provide:

```markdown
## Design System Audit Report

### Summary
| Category | Found | Fixed | Exceptions | Remaining |
|----------|-------|-------|------------|-----------|
| Colors   | X     | X     | X          | 0         |
| Opacity  | X     | X     | X          | 0         |
| Spacing  | X     | X     | X          | 0         |
| Radius   | X     | X     | X          | 0         |

### New Tokens Created
- `mode.state.X.Y` - Description

### Files Modified
- file1.tsx (X violations)
- file2.tsx (X violations)

### Commits
- abc1234 - refactor: description
```

---

## Execution Command

To run this audit:

```
Execute the DESIGN_SYSTEM_AUDIT_PROMPT.md prompt now.
Start with the pre-flight checklist, then proceed through all phases.
Commit after each major category is complete.
```
