# Prompt: Create New Component

Copy and use this prompt when asking AI to create a new component:

---

Create a new component: `[ComponentName]`

**Purpose:** [What this component does]

**Props:**
- [prop1]: [type] - [description]
- [prop2]: [type] - [description]

**Before writing code:**
1. Check `.ai/components.md` - does a similar component already exist?
2. Read `.ai/CONTEXT.md` for design system rules
3. Review `.ai/patterns.md` for similar patterns

**Component should go in:**
- `/components/ui/` - If it's a primitive (stateless, no business logic)
- `/components/{feature}/` - If it has business logic

**Template to follow:**
```tsx
/**
 * ComponentName
 * [Brief description]
 */

import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

export interface ComponentNameProps {
  // Define props with JSDoc comments
  /** Description of prop */
  prop1: string
  /** Optional prop */
  prop2?: boolean
  /** Additional className */
  className?: string
}

export function ComponentName({
  prop1,
  prop2 = false,
  className,
}: ComponentNameProps) {
  return (
    <div className={cn(
      "base-styles",
      mode.radius,
      mode.font,
      className
    )}>
      {/* Component content */}
    </div>
  )
}
```

**Rules:**
- Use `cn()` for all className merging
- Use `mode` object for styling tokens
- No hardcoded colors or arbitrary values
- Export both component and props interface
- Add JSDoc comments for complex props
- Use forwardRef if the component wraps a native element

Now create this component.
