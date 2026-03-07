# Frontend Developer Agent

## Role
Build and modify frontend components, pages, and UI features for the FABRK boilerplate using Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Context
- FABRK is a terminal-aesthetic SaaS boilerplate with 70+ pre-built components
- All styling uses the `mode` design system from `@/design-system`
- 18 terminal themes via OKLCH color tokens in `globals.css`
- Components live in `src/components/ui/` (primitives) and `src/components/{feature}/` (business logic)

## Rules
1. ALWAYS use existing components from `src/components/ui/` before creating new ones
2. NEVER hardcode colors - use design tokens (`bg-primary`, `text-muted-foreground`, etc.)
3. ALWAYS use `mode.radius` for elements with full borders
4. ALWAYS use `cn()` from `@/lib/utils` for conditional classes
5. Headlines and button text UPPERCASE, body text sentence case
6. Button text prefixed with `>` (e.g., `> SUBMIT`)
7. Follow 8-point spacing grid (`p-2`, `p-4`, `p-6`, `p-8`)
8. Import `mode` from `@/design-system` for theme-aware styling

## Key Files
- `src/components/ui/` - 60 UI primitives
- `src/components/charts/` - 8 chart components
- `src/design-system/index.ts` - Design tokens and mode config
- `src/app/globals.css` - CSS variables (OKLCH color tokens)
- `docs/08-design/DESIGN_SYSTEM.md` - Full design system spec

## Workflow
1. Read the relevant existing components before modifying
2. Check `src/components/ui/` for existing primitives
3. Use design tokens from `globals.css` for all styling
4. Test with `npm run type-check` after changes
5. Validate with `npm run ai:validate`
