---
title: 'Zero Hardcoded Colors: Building a Militant Design System'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'zero-hardcoded-colors-design-system'
description: 'I built a design system that rejects code with hardcoded colors at commit time. Here is how OKLCH, semantic tokens, and pre-commit hooks keep 62+ components perfectly consistent.'
publishedAt: '2025-02-01T12:00:00.000Z'
---

**TL;DR:** I built Fabrk - a design system that rejects code with hardcoded colors at commit time. Here's how OKLCH, semantic tokens, and pre-commit hooks keep 62+ components perfectly consistent.

---

## Why I Built Fabrk

Most projects start with good intentions. "We'll use design tokens." "We'll be consistent." Then six months later you're grepping for `bg-gray-` and finding 47 different shades.

I decided to make it impossible to cheat. So I built **Fabrk** - a design system and component library that enforces consistency at the code level.

Every color in indx.sh goes through a semantic token. Not "allowed" - **required**. Pre-commit hooks scan for hardcoded Tailwind colors and reject the commit if they find any.

Extreme? Yes. Worth it? Absolutely.

---

## The Terminal Aesthetic

indx.sh has a specific visual identity: terminal-flat. Monospace fonts. No shadows. No rounded corners. Swiss-industrial minimalism.

Why terminal? Because the audience is developers using AI coding tools. The aesthetic should feel native to them.

**The visual rules:**

| Rule | Enforcement |
|------|-------------|
| No shadows | `box-shadow: none` on everything |
| No rounded corners | `rounded-none` globally |
| Monospace only | TX-02 font throughout |
| 8-point grid | Only `p-4`, `p-6`, `p-8` etc. |
| Two themes | `bw` (light) and `navigator` (dark) |

---

## Why OKLCH Instead of RGB

Most design systems use HSL or RGB. I chose OKLCH (Oklab Lightness Chroma Hue) for one reason: **perceptual uniformity**.

In HSL, yellow at 50% lightness looks way brighter than blue at 50% lightness. Your eye perceives them differently even though the numbers are the same.

OKLCH fixes this. Same lightness value = same perceived brightness across all hues.

This means my success, warning, and error colors all have the same visual weight. No more "why does the error state scream louder than success?"

---

## The Token Architecture

Every color in Fabrk has three layers:

```
Raw OKLCH value → CSS Variable → Semantic Token
```

**Layer 1:** Raw values in CSS
**Layer 2:** CSS variables in globals.css
**Layer 3:** Semantic tokens in TypeScript
**Layer 4:** Usage in components

---

## The 8-Point Grid Religion

Spacing is just as important as color. I enforce an 8-point grid:

**Allowed:**
```
p-0 (0px)   p-1 (4px)   p-2 (8px)   p-4 (16px)
p-6 (24px)  p-8 (32px)  p-10 (40px) p-12 (48px)
```

**Banned:**
```
p-3 (12px)  p-5 (20px)  p-7 (28px)  p-9 (36px)
```

Why? Consistent rhythm. Every element aligns to the same invisible grid. The eye notices even if the brain doesn't.

---

## Pre-Commit Enforcement

The magic happens in a pre-commit hook that scans staged files for banned patterns like hardcoded Tailwind colors and non-8pt spacing.

When a pattern matches, the hook:
1. Shows the offending line
2. Suggests the correct token
3. Blocks the commit

It's annoying for about a week. Then it becomes muscle memory.

---

## Two Themes, Zero Effort

Because everything uses semantic tokens, theming is trivial. Switch `data-theme` on the HTML element. Every component updates instantly. No conditional logic anywhere.

---

## Results After 3 Months

- **62+ components** - all using the same tokens
- **0 hardcoded colors** - literally zero
- **2 themes** - work perfectly everywhere
- **~30 seconds** - to add a new theme variant

The upfront investment in building Fabrk was real. But now I can:
- Change the entire color palette in one file
- Add new themes without touching components
- Trust that any new code follows the system
- Reuse Fabrk on other projects

---

## Try It Yourself

The pattern works for any project:

1. Define your semantic tokens (surface, primary, muted, etc.)
2. Create TypeScript exports for them
3. Add pre-commit hooks to enforce usage
4. Suffer for one week
5. Never think about it again

---

**Live site:** [indx.sh](https://indx.sh)

Toggle between `bw` and `navigator` themes to see the system in action.

---

*Part 3 of the "Building indx.sh in Public" series.*
