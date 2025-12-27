# Typography System Guide

Comprehensive guide to using Fabrk's centralized typography system for consistent, accessible text styling across your application.

## Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Typography Scale](#typography-scale)
- [Component Reference](#component-reference)
- [Usage Examples](#usage-examples)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)

---

## Overview

Fabrk's typography system provides a set of reusable React components that enforce consistent styling across your application. All components use design tokens for colors, ensuring **maximum accessibility** and proper theme compatibility.

### Key Benefits

- **Single source of truth**: One centralized system for all typography
- **WCAG AA compliant**: 7:1+ contrast ratios for text-foreground
- **Responsive**: Typography scales across breakpoints automatically
- **Type-safe**: Full TypeScript support with proper typing
- **Semantic HTML**: Renders correct HTML elements for screen readers
- **Design token integration**: Colors adapt to theme changes

### Import

```tsx
import {
  H1, H2, H3, H4,
  Body, BodyMuted, Lead, Small,
  List, ListItem,
  Strong, Code, Link
} from "@/components/ui/typography";
```

---

## Design Principles

### 1. Maximum Accessibility

All body text uses `text-foreground` instead of `text-muted-foreground` to ensure maximum readability and accessibility. This decision prioritizes:

- **WCAG AA compliance**: 7:1+ contrast ratio on all body text
- **Readability**: High contrast improves reading comprehension
- **Inclusive design**: Works for users with visual impairments
- **Legal compliance**: Meets industry standards for accessibility

Use `BodyMuted` only for supporting content (captions, metadata, helper text), never for primary information.

### 2. Consistent Line Height

All body text uses `leading-relaxed` (1.625 line-height) for optimal readability:

- **Improves reading flow**: Proper spacing between lines reduces eye strain
- **Industry standard**: 1.625 is the recommended line-height for body text
- **Responsive friendly**: Works across all device sizes

### 3. Semantic HTML

All typography components render proper semantic HTML elements:

- `H1-H4` → `<h1>` to `<h4>` heading elements
- `Body` → `<p>` paragraph element
- `List` → `<ul>` or `<ol>` list element
- `Strong` → `<strong>` emphasis element
- `Link` → `<a>` anchor element

This ensures proper screen reader support and SEO.

### 4. Design Token Integration

All colors use CSS variables from the design system:

- `text-foreground` - Primary text color (maximum contrast)
- `text-muted-foreground` - Secondary text color (reduced contrast)
- `text-primary` - Brand color for links and accents
- `bg-muted` - Background for inline code

These tokens automatically adapt when users switch themes.

---

## Typography Scale

### Heading Scale (Responsive)

| Component | Mobile (base) | Small (sm:) | Medium (md:) | Large (lg:) | Weight | Line Height |
|-----------|---------------|-------------|--------------|-------------|--------|-------------|
| **H1** | text-4xl (36px) | text-5xl (48px) | text-5xl (48px) | text-6xl (60px) | font-bold (700) | leading-tight (1.25) |
| **H2** | text-3xl (30px) | text-3xl (30px) | text-4xl (36px) | - | font-bold (700) | leading-tight (1.25) |
| **H3** | text-xl (20px) | - | - | - | font-semibold (600) | leading-tight (1.25) |
| **H4** | text-lg (18px) | - | - | - | font-semibold (600) | leading-tight (1.25) |

### Body Text Scale (Fixed across breakpoints)

| Component | Size | Weight | Line Height | Color |
|-----------|------|--------|-------------|-------|
| **Lead** | text-lg (18px) | font-normal (400) | leading-relaxed (1.625) | text-foreground |
| **Body** | text-base (16px) | font-normal (400) | leading-relaxed (1.625) | text-foreground |
| **BodyMuted** | text-base (16px) | font-normal (400) | leading-relaxed (1.625) | text-muted-foreground |
| **Small** | text-sm (14px) | font-normal (400) | leading-relaxed (1.625) | text-muted-foreground |

### List Scale

| Component | Spacing | Indent | Marker | Color |
|-----------|---------|--------|--------|-------|
| **List** | space-y-2 (8px) | ml-6 (24px) | disc / decimal | text-foreground |
| **ListItem** | - | - | - | text-foreground |

---

## Component Reference

### Headings

#### H1 - Primary Page Heading

**Use for**: Page titles, hero headings, main section headings

```tsx
<H1>Welcome to Fabrk</H1>
<H1 className="text-center">Centered Hero Title</H1>
```

**Responsive behavior**: Scales from 36px → 48px (sm) → 48px (md) → 60px (lg)

---

#### H2 - Section Heading

**Use for**: Major section headings, content area titles

```tsx
<H2>Features Overview</H2>
<H2 className="mb-8">Section Title with Spacing</H2>
```

**Responsive behavior**: Scales from 30px → 30px (sm) → 36px (md)

---

#### H3 - Subsection Heading

**Use for**: Subsection titles, card headings, content blocks

```tsx
<H3>Key Features</H3>
<H3 className="mt-6 mb-3">Subsection Title</H3>
```

**Fixed size**: 20px across all breakpoints

---

#### H4 - Minor Heading

**Use for**: Small section titles, list headers, component labels

```tsx
<H4>Details</H4>
<H4 className="mb-2">Component Label</H4>
```

**Fixed size**: 18px across all breakpoints

---

### Body Text

#### Body - Primary Body Text

**Use for**: Main content, paragraphs, important descriptions

```tsx
<Body>
  This is primary body text using text-foreground for maximum accessibility.
</Body>
<Body className="mb-4">Paragraph with spacing</Body>
```

**Accessibility**: Uses `text-foreground` (7:1+ contrast ratio) for maximum readability

---

#### BodyMuted - Secondary Body Text

**Use for**: Supporting text, captions, helper text, metadata

```tsx
<BodyMuted>Last updated: January 2025</BodyMuted>
<BodyMuted className="text-sm">Helper text</BodyMuted>
```

**When NOT to use**: Never use for primary content or important information. Only for visual de-emphasis of supporting content.

---

#### Lead - Introductory Text

**Use for**: Page introductions, section descriptions, subheadings

```tsx
<Lead>
  A comprehensive SaaS boilerplate for rapid development.
</Lead>
<Lead className="mb-8 text-center">Section introduction</Lead>
```

**Size**: Slightly larger than body text (18px vs 16px)

---

#### Small - Fine Print Text

**Use for**: Legal text, disclaimers, footnotes, form helper text

```tsx
<Small>© 2025 Fabrk. All rights reserved.</Small>
<Small className="block text-destructive">Error message</Small>
```

**Note**: Use `className="block"` to display as block element (default is inline)

---

### Lists

#### List - Unordered or Ordered List

**Use for**: Feature lists, bullet points, numbered steps

```tsx
// Unordered list (bullets)
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>

// Ordered list (numbers)
<List ordered>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
  <ListItem>Step three</ListItem>
</List>
```

**Spacing**: 8px between items, 24px left indent

---

### Semantic Text

#### Strong - Bold Emphasis

**Use for**: Important text, keywords, emphasis within body text

```tsx
<Body>
  This is <Strong>important</Strong> information.
</Body>
```

---

#### Code - Inline Code

**Use for**: Variable names, function names, inline code snippets

```tsx
<Body>
  Run <Code>npm install</Code> to get started.
</Body>
```

**Styling**: Monospace font, muted background, subtle padding

---

#### Link - Text Link

**Use for**: Inline links within body text

```tsx
<Body>
  Read our <Link href="/privacy">Privacy Policy</Link> for details.
</Body>
```

**Behavior**: Primary color, underlines on hover

---

## Usage Examples

### Legal Page Example

```tsx
export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      <H1 className="mb-4 text-center">Terms of Service</H1>
      <Small className="block text-center">Last Updated: January 1, 2025</Small>

      <section className="mt-12">
        <H2 className="mb-4">1. Agreement to Terms</H2>
        <Body className="mb-4">
          By accessing or using our Service, you agree to be bound by these Terms.
        </Body>

        <H3 className="mt-6 mb-3">1.1 License Grant</H3>
        <Body className="mb-4">
          We grant you a <Strong>non-exclusive, perpetual license</Strong> to:
        </Body>
        <List className="mb-4">
          <ListItem>Access and download the source code</ListItem>
          <ListItem>Create unlimited commercial projects</ListItem>
          <ListItem>Modify and customize for your use</ListItem>
        </List>
      </section>

      <section className="mt-12">
        <Small className="block">
          © 2025 Fabrk. All rights reserved.
        </Small>
      </section>
    </main>
  );
}
```

### Landing Page Example

```tsx
export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <H1 className="mb-6 text-center">About Fabrk</H1>
        <Lead className="mb-8 text-center">
          A premium enterprise-grade Next.js 15 SaaS boilerplate
        </Lead>

        <H2 className="mb-4">Our Mission</H2>
        <Body className="mb-4">
          We believe developers should spend time building features, not
          boilerplate. Fabrk provides everything you need to launch a SaaS
          product in <Strong>days, not months</Strong>.
        </Body>

        <H3 className="mt-6 mb-3">Key Features</H3>
        <List>
          <ListItem>Complete authentication with NextAuth v5</ListItem>
          <ListItem>Stripe payment integration</ListItem>
          <ListItem>Multi-tenant organization management</ListItem>
        </List>
      </section>
    </>
  );
}
```

### Article/Blog Example

```tsx
export default function BlogPost() {
  return (
    <article className="prose">
      <H1>How to Build a SaaS Product in 2025</H1>
      <BodyMuted>Published: January 15, 2025</BodyMuted>

      <Lead>
        Building a SaaS product has never been easier, but choosing the right
        tools is critical.
      </Lead>

      <H2>Technology Stack</H2>
      <Body className="mb-4">
        Modern SaaS applications require careful technology selection. Here's
        what we recommend:
      </Body>

      <List ordered>
        <ListItem>
          <Strong>Framework</Strong>: Next.js 15 for full-stack development
        </ListItem>
        <ListItem>
          <Strong>Database</Strong>: PostgreSQL with Prisma ORM
        </ListItem>
        <ListItem>
          <Strong>Payments</Strong>: Stripe for billing and subscriptions
        </ListItem>
      </List>

      <H3>Getting Started</H3>
      <Body>
        First, install the necessary dependencies with <Code>npm install</Code>.
        Then, check out the <Link href="/docs">documentation</Link> for setup
        instructions.
      </Body>
    </article>
  );
}
```

---

## Accessibility

### Color Contrast Ratios

All typography components meet or exceed WCAG AA standards:

| Component | Color | Background | Contrast Ratio | WCAG Level |
|-----------|-------|------------|----------------|------------|
| Body | text-foreground | bg-background | 7:1+ | AAA |
| BodyMuted | text-muted-foreground | bg-background | 4.5:1+ | AA |
| Strong | inherits parent | - | matches parent | - |
| Link | text-primary | bg-background | 4.5:1+ | AA |
| Code | text-foreground | bg-muted | 4.5:1+ | AA |

### Semantic HTML Support

All typography components render proper semantic HTML:

- **Headings (H1-H4)**: Render `<h1>` to `<h4>` elements for document outline
- **Body/Lead**: Render `<p>` elements for paragraphs
- **Lists**: Render `<ul>`/`<ol>` and `<li>` for screen reader navigation
- **Strong**: Renders `<strong>` for semantic emphasis
- **Link**: Renders `<a>` with proper href attribute

### Screen Reader Support

Typography components provide excellent screen reader support:

- Proper heading hierarchy allows users to navigate by headings
- Lists are announced with item count ("List with 3 items")
- Links announce their destination
- Strong emphasis is vocalized
- Line-height of 1.625 improves readability for all users

---

## Best Practices

### DO ✅

1. **Use text-foreground for all primary content**
   ```tsx
   // ✅ GOOD - Maximum accessibility
   <Body>Primary content here</Body>
   ```

2. **Maintain consistent heading hierarchy**
   ```tsx
   // ✅ GOOD - Logical structure
   <H1>Page Title</H1>
   <H2>Section</H2>
   <H3>Subsection</H3>
   ```

3. **Add spacing classes when needed**
   ```tsx
   // ✅ GOOD - Explicit spacing control
   <H2 className="mb-4">Section Title</H2>
   <Body className="mb-4">Paragraph</Body>
   ```

4. **Use BodyMuted only for supporting content**
   ```tsx
   // ✅ GOOD - Metadata/captions only
   <Body>Main announcement text</Body>
   <BodyMuted>Last updated: Jan 15</BodyMuted>
   ```

5. **Use List components for all bullet/numbered lists**
   ```tsx
   // ✅ GOOD - Consistent list styling
   <List>
     <ListItem>Item one</ListItem>
     <ListItem>Item two</ListItem>
   </List>
   ```

### DON'T ❌

1. **Don't use BodyMuted for primary content**
   ```tsx
   // ❌ BAD - Reduces accessibility
   <BodyMuted>Important announcement</BodyMuted>

   // ✅ GOOD
   <Body>Important announcement</Body>
   ```

2. **Don't skip heading levels**
   ```tsx
   // ❌ BAD - Breaks hierarchy
   <H1>Page Title</H1>
   <H3>Subsection</H3>

   // ✅ GOOD
   <H1>Page Title</H1>
   <H2>Section</H2>
   <H3>Subsection</H3>
   ```

3. **Don't override color tokens**
   ```tsx
   // ❌ BAD - Breaks theme switching
   <Body className="text-gray-600">Text</Body>

   // ✅ GOOD - Uses design tokens
   <Body>Text</Body>
   <BodyMuted>Text</BodyMuted>
   ```

4. **Don't use manual typography classes**
   ```tsx
   // ❌ BAD - Inconsistent styling
   <p className="text-base leading-relaxed">Text</p>

   // ✅ GOOD - Uses typography component
   <Body>Text</Body>
   ```

5. **Don't forget line-height on custom text**
   ```tsx
   // ❌ BAD - Missing line-height
   <p className="text-base">Text</p>

   // ✅ GOOD - Component includes leading-relaxed
   <Body>Text</Body>
   ```

---

## Migration Guide

### Migrating Existing Pages

#### Step 1: Import Typography Components

```tsx
// Before
import Link from "next/link";

// After
import NextLink from "next/link"; // Rename Next.js Link
import {
  H1, H2, H3, Body, List, ListItem, Link, Strong
} from "@/components/ui/typography";
```

#### Step 2: Replace Manual Heading Classes

```tsx
// Before
<h1 className="text-4xl font-bold text-foreground">Page Title</h1>
<h2 className="text-3xl font-bold text-foreground">Section</h2>
<h3 className="text-xl font-semibold text-foreground">Subsection</h3>

// After
<H1>Page Title</H1>
<H2>Section</H2>
<H3>Subsection</H3>
```

#### Step 3: Replace Paragraph Elements

```tsx
// Before
<p className="text-base text-muted-foreground leading-relaxed">
  Body text content
</p>
<p className="text-lg text-muted-foreground">
  Lead text
</p>
<p className="text-sm text-muted-foreground">
  Small text
</p>

// After
<Body>Body text content</Body>
<Lead>Lead text</Lead>
<Small className="block">Small text</Small>
```

#### Step 4: Replace Lists

```tsx
// Before
<ul className="space-y-2 ml-6 list-disc text-base text-muted-foreground">
  <li className="leading-relaxed">Item one</li>
  <li className="leading-relaxed">Item two</li>
</ul>

// After
<List>
  <ListItem>Item one</ListItem>
  <ListItem>Item two</ListItem>
</List>
```

#### Step 5: Replace Inline Formatting

```tsx
// Before
<p>
  Run <code className="bg-muted px-1.5 py-0.5 rounded">npm install</code> to
  get started. Read the <a href="/docs" className="text-primary hover:underline">documentation</a>
  for <strong>more details</strong>.
</p>

// After
<Body>
  Run <Code>npm install</Code> to get started. Read the{" "}
  <Link href="/docs">documentation</Link> for <Strong>more details</Strong>.
</Body>
```

### Automated Migration Script

For pages with many typography elements, use this sed script:

```bash
# Create migration script
cat > /tmp/migrate-typography.sed << 'EOF'
s|<h1 className="text-[^"]*">|<H1>|g
s|</h1>|</H1>|g
s|<h2 className="text-[^"]*">|<H2>|g
s|</h2>|</H2>|g
s|<h3 className="text-[^"]*">|<H3>|g
s|</h3>|</H3>|g
s|<p className="text-base[^"]*">|<Body>|g
s|</p>|</Body>|g
s|<ul className="space-y-2[^"]*">|<List>|g
s|</ul>|</List>|g
s|<li className="leading-relaxed">|<ListItem>|g
s|</li>|</ListItem>|g
s|<strong>|<Strong>|g
s|</strong>|</Strong>|g
EOF

# Apply to file
sed -f /tmp/migrate-typography.sed src/app/page.tsx > /tmp/page-updated.tsx
mv /tmp/page-updated.tsx src/app/page.tsx
```

**Note**: Manual review recommended after automated migration to fix edge cases.

---

## Typography in Different Contexts

### Legal Pages

- **Primary goal**: Maximum readability and accessibility
- **Color**: Use `text-foreground` for all body text (not muted)
- **Structure**: Clear heading hierarchy (H1 → H2 → H3)
- **Spacing**: Generous spacing between sections (space-y-12)

```tsx
<H1>Terms of Service</H1>
<Body>Legal text content</Body>
<List>
  <ListItem>Legal list item</ListItem>
</List>
```

### Landing Pages

- **Primary goal**: Visual hierarchy and engagement
- **Headings**: Larger, responsive headings (H1 scales to text-6xl)
- **Lead text**: Use Lead component for introductions
- **Lists**: Highlight key features

```tsx
<H1 className="text-center">Hero Title</H1>
<Lead className="text-center">Compelling subtitle</Lead>
```

### Documentation

- **Primary goal**: Clear technical communication
- **Code**: Heavy use of Code component
- **Lists**: Ordered lists for step-by-step instructions
- **Links**: Extensive cross-referencing

```tsx
<H2>Installation</H2>
<Body>Run <Code>npm install</Code></Body>
<List ordered>
  <ListItem>Step one</ListItem>
</List>
```

---

## Performance Considerations

### Component Overhead

Typography components add minimal overhead:

- **Bundle size**: ~3KB gzipped (all components)
- **Runtime**: Zero runtime cost (compiles to HTML)
- **Rendering**: Same performance as manual JSX

### Tree Shaking

Unused components are automatically tree-shaken:

```tsx
// Only imports Body component (not H1, H2, etc.)
import { Body } from "@/components/ui/typography";
```

---

## Testing Typography

### Visual Testing (component documentation)

View all typography components in component documentation:

```bash
#Component showcase at /components
```

Navigate to: **UI/Typography** in the sidebar

### E2E Testing (Playwright)

```typescript
// Test heading hierarchy
await expect(page.locator('h1')).toContainText('Page Title');
await expect(page.locator('h2').first()).toContainText('Section');

// Test contrast ratios
const bodyColor = await page.locator('p').first().evaluate(
  el => getComputedStyle(el).color
);
expect(contrastRatio(bodyColor, 'white')).toBeGreaterThan(7);
```

---

## FAQs

### Why use text-foreground instead of text-muted-foreground for body text?

**Answer**: Maximum accessibility. `text-foreground` provides 7:1+ contrast (WCAG AAA), while `text-muted-foreground` provides 4.5:1 (WCAG AA minimum). For primary content, we prioritize readability over visual de-emphasis.

### Can I override typography component styles?

**Answer**: Yes, but use className for spacing/alignment only, not colors:

```tsx
// ✅ GOOD - Spacing override
<H2 className="mb-8">Title</H2>

// ❌ BAD - Color override (breaks themes)
<Body className="text-gray-500">Text</Body>
```

### How do I use Next.js Link with typography Link component?

**Answer**: The typography Link component is purely visual. Use Next.js Link for routing:

```tsx
import NextLink from "next/link";
import { Link as TypographyLink } from "@/components/ui/typography";

// Option 1: Use typography Link directly (has href prop)
<TypographyLink href="/about">About</TypographyLink>

// Option 2: Wrap Next.js Link
<NextLink href="/about" passHref legacyBehavior>
  <TypographyLink>About</TypographyLink>
</NextLink>
```

### Should I use H1 for hero sections?

**Answer**: Yes! Per user requirements, ALL h1 elements should use the H1 component for consistency, including hero sections on landing pages.

### When should I use BodyMuted?

**Answer**: Only for supporting content that should be visually de-emphasized:

- ✅ Timestamps ("Last updated: Jan 15")
- ✅ Captions ("Figure 1: Architecture diagram")
- ✅ Helper text ("Optional field")
- ❌ Primary content or important information

---

## Support & Resources

- **component documentation**: `#Component showcase at /components` → UI/Typography
- **Source**: `src/components/ui/typography.tsx`
- **Stories**: `src/components/ui/typography.stories.tsx`
- **Issues**: Report typography issues on GitHub

---

**Last Updated**: January 2025
**Version**: 1.0.0
