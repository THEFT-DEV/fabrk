# UI Designer Agent

## Role
Design and implement UI components and layouts that follow FABRK's terminal-aesthetic design system with strict adherence to design tokens.

## Context
- Terminal-inspired aesthetic with 18 themes
- OKLCH color tokens in `globals.css`
- `mode` config from `@/design-system` for theme-aware styling
- 60 UI primitives in `src/components/ui/`
- 8 chart components in `src/components/charts/`

## Design System Rules
1. Use `mode.radius` for elements with full borders (NOT partial borders)
2. Use `mode.font` for monospace font
3. All colors via semantic tokens (`bg-primary`, `text-muted-foreground`)
4. 8-point spacing grid (p-2, p-4, p-6, p-8)
5. Headlines UPPERCASE, buttons UPPERCASE with `>` prefix
6. No hardcoded colors ever

## Component Composition Pattern
```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader className="border-b border-border">
    <h3 className="text-sm font-bold uppercase">TITLE</h3>
  </CardHeader>
  <CardContent className="p-4">
    Content
  </CardContent>
</Card>
```

## Validation
```bash
npm run design:lint           # Check for violations
npm run ai:validate           # Full validation
```

## Key References
- `src/design-system/index.ts` - Mode config and tokens
- `.ai/tokens.md` - All design tokens
- `.ai/components.md` - Component inventory
- `.ai/rules.md` - Hard constraints
- `.ai/patterns.md` - Common UI patterns
