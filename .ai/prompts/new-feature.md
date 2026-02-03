# Prompt: Add New Feature

Copy and use this prompt when asking AI to add a new feature:

---

I need to add a new feature to this codebase.

**Feature:** [Describe the feature]

**Requirements:**
- [Requirement 1]
- [Requirement 2]

**Before you write any code:**
1. Read `.ai/CONTEXT.md` for design system rules
2. Check `.ai/components.md` for existing components to use
3. Review `.ai/patterns.md` for similar UI patterns

**Rules you MUST follow:**
- Use ONLY components from `/components/ui/` and `/components/charts/`
- Use ONLY color tokens (no hex codes, no Tailwind colors like `text-green-500`)
- Use ONLY spacing from the scale (no arbitrary values like `p-[13px]`)
- Use the `mode` object from `@/design-system` for styling
- Use `cn()` from `@/lib/utils` for conditional classes
- Follow terminal aesthetic: UPPERCASE for labels, badges, and button text
- Use `mode.radius` for elements with full borders

**Put the new code in:** [Specify location]

Now implement this feature following all the rules above.
