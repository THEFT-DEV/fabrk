# Card Animation Guide

**Status**: Production Standard
**Last Updated**: December 15, 2025
**Audit Score**: 78/78 (127 compliant files)

---

## Overview

Fabrk uses **two distinct card patterns** optimized for different contexts:

1. **Pattern 1: Animated Marketing Cards** - Landing pages, feature showcases, benefits sections
2. **Pattern 2: Static Content Cards** - Documentation, dashboards, settings pages

This guide explains when to use each pattern, how to implement them correctly, and the performance implications.

---

## Pattern 1: Animated Marketing Cards

### When to Use

Use Pattern 1 for:
- Landing page sections (hero, features, benefits)
- Marketing pages (pricing, use cases, testimonials)
- Library showcase pages (template previews)
- Any page where visual impact and engagement are priorities

**Key Characteristics**:
- Framer Motion scroll animations (`whileInView`)
- Icon micro-interactions (`whileHover`)
- Client-side rendering required
- Bundle size impact: +50KB (Framer Motion)

### Standard Recipe

```tsx
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Icon } from 'lucide-react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{
    duration: 0.6,
    delay: index * 0.15,
    ease: [0.21, 0.47, 0.32, 0.98],
  }}
  className="h-full"
>
  <Card className="h-full">
    <CardHeader
      code="0xXX"
      title="SECTION_TITLE"
      icon={
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className={cn('size-5', mode.color.text.accent)} />
        </motion.div>
      }
    />
    <CardContent>
      <p className={cn('text-xs', mode.font, mode.color.text.primary)}>
        All text uses text-xs with mode.font
      </p>
    </CardContent>
  </Card>
</motion.div>
```

### Animation Values Explained

| Property | Value | Reasoning |
|----------|-------|-----------|
| `initial.y` | `20` | Subtle upward motion (not jarring) |
| `duration` | `0.6` | Fast enough to feel snappy, slow enough to see |
| `delay` | `index * 0.15` | Stagger cards in grid (150ms per card) |
| `ease` | `[0.21, 0.47, 0.32, 0.98]` | Custom cubic-bezier (smooth deceleration) |
| `viewport.once` | `true` | Animate once (performance optimization) |
| `viewport.margin` | `'-100px'` | Trigger 100px before entering viewport |
| `whileHover.scale` | `1.1` | 10% icon growth on hover |
| `spring.stiffness` | `400` | Fast, snappy spring animation |

### Real-World Examples

**1. Benefit Cards** (`/src/components/landing/benefit-card.tsx`)

Used on landing page for auth/billing/multi-tenancy benefits:

```tsx
export function BenefitCard({
  icon: Icon,
  module,
  code,
  benefit,
  description,
  timeSaved,
  costSaved,
  features,
  index,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader
          code={code}
          title={module}
          icon={
            <motion.div whileHover={{ scale: 1.1 }}>
              <Icon className={cn('size-5', mode.color.text.accent)} />
            </motion.div>
          }
        />
        <CardContent>
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>
            {benefit}
          </h3>
          <p className={cn('text-xs leading-relaxed', mode.font, mode.color.text.muted)}>
            {description}
          </p>
          {/* Stats, features list, CTA button */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

**2. What's Included Section** (`/src/components/marketing/whats-included-section.tsx`)

Used for infrastructure/development/UI checklists:

```tsx
{INCLUDED_FEATURES.map((item, index) => {
  const Icon = item.icon;
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader
          code={`0x${(80 + index).toString(16).toUpperCase()}`}
          title={item.category}
          icon={
            <motion.div whileHover={{ scale: 1.1 }}>
              <Icon className={cn('size-5', mode.color.text.accent)} />
            </motion.div>
          }
        />
        <CardContent>
          <ul className="space-y-4">
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4">
                <Check className={cn('mt-0.5 size-4 shrink-0', mode.color.text.success)} />
                <span className={cn('text-xs', mode.font)}>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
})}
```

### Common Mistakes

❌ **Wrong**: Wrapping in `<motion.div>` without animation props
```tsx
<motion.div className="h-full">  {/* No animation - just use <div> */}
  <Card>...</Card>
</motion.div>
```

❌ **Wrong**: Using `animate` instead of `whileInView`
```tsx
<motion.div animate={{ opacity: 1 }}>  {/* Animates immediately on mount */}
  <Card>...</Card>
</motion.div>
```

❌ **Wrong**: Missing `viewport.once` (re-animates on scroll)
```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}  {/* Performance issue - animates every scroll */}
>
```

✅ **Correct**: Full animation recipe
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
  className="h-full"
>
  <Card className="h-full">...</Card>
</motion.div>
```

---

## Pattern 2: Static Content Cards

### When to Use

Use Pattern 2 for:
- Documentation pages (components, features, tutorials)
- Admin dashboards (stats, metrics, settings)
- Platform pages (account, security, billing)
- Any page where server rendering or performance is a priority

**Key Characteristics**:
- No animations (instant rendering)
- Server-side rendering compatible
- Zero additional bundle size
- Faster Time to Interactive (TTI)

### Standard Recipe

```tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

<Card>
  <CardHeader code="0xXX" title="SECTION_TITLE" />
  <CardContent>
    <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
      Static content, no animation, server-renderable
    </p>
  </CardContent>
</Card>
```

### Real-World Examples

**1. Documentation Pages** (`/src/app/(marketing)/docs/`)

Used throughout docs site for component examples, feature guides, tutorials:

```tsx
<Card>
  <CardHeader code="0x21" title="INSTALLATION" />
  <CardContent>
    <CodeBlock
      code="npm install @fabrk/ui"
      language="bash"
    />
  </CardContent>
</Card>

<Card>
  <CardHeader code="0x22" title="USAGE" />
  <CardContent>
    <p className={cn('mb-4 text-xs', mode.font, mode.color.text.muted)}>
      Import the component and use it in your app:
    </p>
    <CodeBlock
      code={usageCode}
      language="tsx"
    />
  </CardContent>
</Card>
```

**2. Dashboard Stats** (`/src/app/(platform)/dashboard/`)

Used for revenue metrics, user counts, activity feeds:

```tsx
<Card>
  <CardHeader code="0x01" title="REVENUE" />
  <CardContent>
    <div className={cn('text-xs font-bold', mode.font)}>$12,450</div>
    <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
      <span className="text-success">+12%</span> from last month
    </p>
  </CardContent>
</Card>
```

**3. Settings Pages** (`/src/app/(platform)/account/`)

Used for configuration options, toggles, form inputs:

```tsx
<Card>
  <CardHeader code="0x03" title="SECURITY" />
  <CardContent>
    <ul className={cn('space-y-2 text-xs', mode.font)}>
      <li className="flex justify-between">
        <span>Two-factor authentication</span>
        <span className="text-success">[ENABLED]</span>
      </li>
      <li className="flex justify-between">
        <span>Session timeout</span>
        <span className="text-muted-foreground">30 minutes</span>
      </li>
    </ul>
  </CardContent>
</Card>
```

### Common Mistakes

❌ **Wrong**: Adding Framer Motion to static content
```tsx
<motion.div whileInView={{ opacity: 1 }}>  {/* Unnecessary */}
  <Card>
    <CardHeader code="0x01" title="DOCS" />
    <CardContent>Static docs don't need animation</CardContent>
  </Card>
</motion.div>
```

❌ **Wrong**: Using Pattern 1 values for documentation
```tsx
<Card className="hover:scale-105 transition-transform">  {/* Distracting */}
  <CardHeader code="0x01" title="API_REFERENCE" />
</Card>
```

✅ **Correct**: Clean, static card
```tsx
<Card>
  <CardHeader code="0x01" title="API_REFERENCE" />
  <CardContent>
    <p className={cn('text-xs', mode.font)}>Documentation content</p>
  </CardContent>
</Card>
```

---

## Decision Tree: Which Pattern When?

| Question | Yes → | No → |
|----------|-------|------|
| Is this a landing page? | Pattern 1 | Next question |
| Is this a marketing page? | Pattern 1 | Next question |
| Is this a library showcase? | Pattern 1 | Next question |
| Is this documentation? | Pattern 2 | Next question |
| Is this a dashboard? | Pattern 2 | Next question |
| Is this a settings page? | Pattern 2 | Next question |
| Do you need visual impact? | Pattern 1 | Pattern 2 |
| Is bundle size a concern? | Pattern 2 | Pattern 1 |
| Is server rendering required? | Pattern 2 | Pattern 1 |

### Quick Reference Table

| Context | Pattern | Reason |
|---------|---------|--------|
| Landing hero | 1 | Visual impact, engagement |
| Features section | 1 | Showcase benefits with animation |
| Pricing cards | 1 | Draw attention to value props |
| Testimonials | 1 | Social proof deserves emphasis |
| Component docs | 2 | Fast loading, server renderable |
| API reference | 2 | Content focus, no distraction |
| Dashboard stats | 2 | Performance, frequent updates |
| Settings forms | 2 | Functionality over aesthetics |
| Admin tables | 2 | Data density, quick scanning |

---

## Performance Implications

### Bundle Size Impact

| Pattern | Framer Motion | Additional KB |
|---------|--------------|---------------|
| Pattern 1 | Required | +50KB gzipped |
| Pattern 2 | Not needed | 0KB |

**Recommendation**: Use Pattern 1 selectively. If 80% of your site is documentation, keep Framer Motion limited to marketing pages only.

### Core Web Vitals

**Pattern 1 (Animated)**:
- LCP (Largest Contentful Paint): +100-200ms (client rendering delay)
- CLS (Cumulative Layout Shift): 0 (no layout shift if `h-full` used correctly)
- FID (First Input Delay): No impact

**Pattern 2 (Static)**:
- LCP: Faster (server-rendered)
- CLS: 0
- FID: No impact

### Rendering Strategy

**Pattern 1**: Must use `'use client'` directive
```tsx
'use client';

import { motion } from 'framer-motion';

export function MarketingSection() {
  return (
    <motion.div whileInView={{ opacity: 1 }}>
      <Card>...</Card>
    </motion.div>
  );
}
```

**Pattern 2**: Can use Server Components (faster)
```tsx
// No 'use client' needed - server-rendered by default

export function DocsSection() {
  return (
    <Card>
      <CardHeader code="0x01" title="DOCS" />
      <CardContent>Rendered on server</CardContent>
    </Card>
  );
}
```

---

## Migration Guide

### Converting Pattern 1 → Pattern 2 (Remove Animation)

**Before** (Pattern 1):
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="h-full"
>
  <Card className="h-full">
    <CardHeader code="0x01" title="DOCS" />
    <CardContent>Content</CardContent>
  </Card>
</motion.div>
```

**After** (Pattern 2):
```tsx
<Card>
  <CardHeader code="0x01" title="DOCS" />
  <CardContent>Content</CardContent>
</Card>
```

**Steps**:
1. Remove `motion.div` wrapper entirely
2. Remove `className="h-full"` from `Card` (unless in grid that needs it)
3. Remove `'use client'` directive if no other client features
4. Remove `import { motion }` if not used elsewhere

### Converting Pattern 2 → Pattern 1 (Add Animation)

**Before** (Pattern 2):
```tsx
<Card>
  <CardHeader code="0x01" title="FEATURES" />
  <CardContent>Content</CardContent>
</Card>
```

**After** (Pattern 1):
```tsx
'use client';  // Add at top of file

import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{
    duration: 0.6,
    delay: index * 0.15,
    ease: [0.21, 0.47, 0.32, 0.98],
  }}
  className="h-full"
>
  <Card className="h-full">
    <CardHeader
      code="0x01"
      title="FEATURES"
      icon={
        <motion.div whileHover={{ scale: 1.1 }}>
          <Icon className={cn('size-5', mode.color.text.accent)} />
        </motion.div>
      }
    />
    <CardContent>Content</CardContent>
  </Card>
</motion.div>
```

**Steps**:
1. Add `'use client'` directive at top of file
2. Import `motion` from `framer-motion`
3. Wrap card in `motion.div` with full animation recipe
4. Add `className="h-full"` to both wrapper and `Card`
5. Add icon with `whileHover` to `CardHeader` if appropriate

---

## Testing Checklist

### Before Committing Pattern 1 Changes

- [ ] Animation triggers when scrolling card into view
- [ ] Animation only plays once (not on every scroll)
- [ ] Icon scales smoothly on hover (no jank)
- [ ] Cards in grid stagger correctly (150ms delay per card)
- [ ] No Cumulative Layout Shift (CLS = 0)
- [ ] Page loads in < 3 seconds on 3G
- [ ] Works in Safari, Chrome, Firefox
- [ ] No console errors related to Framer Motion

### Before Committing Pattern 2 Changes

- [ ] Card renders instantly (no animation delay)
- [ ] Content is readable immediately
- [ ] No "pop-in" effect on page load
- [ ] Works with JavaScript disabled
- [ ] Server-rendered HTML includes card content
- [ ] No Framer Motion imports in file
- [ ] No `'use client'` directive (unless other client features)

---

## Related Documentation

- [Card API Reference](/docs/design-system/spec/components-card.md) - Complete CardHeader/CardContent props
- [Design System](/docs/08-design/DESIGN_SYSTEM.md) - Terminal aesthetic rules
- [Component Authoring](/docs/08-design/COMPONENT-AUTHORING.md) - How to create new components
- [Best Practices](/docs/02-components/COMPONENT-BEST-PRACTICES.md) - General component patterns

---

## Enforcement

**Pre-commit hooks** automatically check for:
- Hardcoded `font-mono` (should use `mode.font`)
- Custom header divs (should use `CardHeader` component)
- Mixed typography sizes (should be text-xs only)
- Missing animation props (if `motion.div` used)

**ESLint rule**: `design-system/card-patterns` (coming soon)
- Detects Pattern 1 without full animation recipe
- Detects Pattern 2 with unnecessary Framer Motion

---

## FAQ

**Q: Can I use Pattern 1 for dashboard cards?**
A: Generally no. Dashboards prioritize data density and performance over visual flair. Use Pattern 2 for faster rendering and better UX.

**Q: What if I need subtle animation on docs pages?**
A: Use CSS transitions instead of Framer Motion:
```tsx
<Card className="transition-colors hover:bg-muted/50">
  <CardHeader code="0x01" title="DOCS" />
</Card>
```

**Q: Can I customize the animation timing?**
A: Yes, but stick close to the standard values. Changing `duration` from 0.6 to 0.4 is fine. Changing to 2.0 will feel sluggish.

**Q: What about mobile performance?**
A: Pattern 1 works fine on modern phones. If targeting low-end devices, prefer Pattern 2 for better Time to Interactive.

**Q: How do I stagger cards in a grid?**
A: Use the `index * 0.15` delay pattern:
```tsx
{cards.map((card, index) => (
  <motion.div
    key={card.id}
    transition={{ delay: index * 0.15 }}  // 0ms, 150ms, 300ms, 450ms...
  >
    <Card>...</Card>
  </motion.div>
))}
```

**Q: What if my card doesn't need a header?**
A: Still use `CardHeader` for consistency. Use a minimal code like `0x00` and a generic title like `INFO`.

---

**Last Updated**: December 15, 2025
**Audit Status**: 153 files now compliant (62%), 94 files pending migration (38%)
**Target**: 100% compliance by end of sprint
