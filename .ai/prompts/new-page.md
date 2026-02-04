# Prompt: Create New Page

Copy and use this prompt when asking AI to create a new page:

---

Create a new page at `/app/(public|platform|auth)/[page-name]/page.tsx`

**Page purpose:** [Describe what this page does]

**Page type:**
- [ ] Public marketing page → `/app/(public)/`
- [ ] Authenticated app page → `/app/(platform)/`
- [ ] Auth page (login, register) → `/app/(auth)/`

**Required sections:**
- [Section 1]
- [Section 2]

**Before writing code:**
1. Read `.ai/CONTEXT.md`
2. Check `.ai/patterns.md` for Page Header pattern
3. Use components from `/components/ui/`

**Structure to follow:**
```tsx
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

export default function PageName() {
  return (
    <div className="space-y-6">
      {/* Page header - use pattern from patterns.md */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-semibold tracking-tight", mode.font)}>
          PAGE TITLE
        </h1>
        <p className={cn(mode.color.text.muted, mode.typography.body.m)}>
          Page description.
        </p>
      </div>

      {/* Page content - use Card, Table, etc. from components */}
    </div>
  )
}
```

**Rules:**
- No hardcoded colors
- No arbitrary Tailwind values
- Use existing components only
- Follow spacing scale (4, 6, 8, etc.)
- UPPERCASE for headings and labels
- Use `mode.radius` for bordered elements

Now create this page.
