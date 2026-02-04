# Example Marketing Data

Generic example data for building your marketing pages. These files show the structure and expected format for all common SaaS marketing sections.

**Total: 14 example files** covering everything from pricing to SEO metadata.

## Files

### Core Marketing Data (4 files)

| File | Purpose | Used By |
|------|---------|---------|
| `pricing-example.ts` | Generic pricing tiers (Starter/Pro/Enterprise) | Pricing pages, checkout flows |
| `benefits-example.ts` | Product benefits and value propositions | Landing pages, feature sections |
| `faq-example.ts` | Common SaaS frequently asked questions | FAQ sections, support pages |
| `testimonials-example.ts` | Customer testimonials format | Social proof sections |

### Landing Page Sections (4 files)

| File | Purpose | Used By |
|------|---------|---------|
| `stats-example.ts` | Product metrics and key numbers | Stats sections, homepage hero |
| `use-cases-example.ts` | Target personas and use cases | Use case sections, persona pages |
| `comparison-example.ts` | Competitive feature comparison | Comparison tables, vs. pages |
| `included-features-example.ts` | Categorized feature checklist | What's included sections |

### Value Proposition (2 files)

| File | Purpose | Used By |
|------|---------|---------|
| `time-savings-example.ts` | Task breakdown with hours saved | ROI calculators, value sections |
| `value-breakdown-example.ts` | Receipt-style value calculation | Pricing pages, value propositions |

### Site Configuration (2 files)

| File | Purpose | Used By |
|------|---------|---------|
| `site-config-example.ts` | Centralized site metadata | Multiple components, layouts |
| `logo-cloud-example.ts` | Client/partner logos | Trust badges, social proof |

### Content & SEO (2 files)

| File | Purpose | Used By |
|------|---------|---------|
| `blog-config-example.ts` | Blog post metadata structure | Blog pages, content management |
| `seo-metadata-example.ts` | Per-page SEO templates | Next.js metadata API |

## Usage

### Option 1: Use as Reference

Keep these files as reference while creating your own marketing data:

```typescript
// src/data/landing/pricing.ts (your custom data)
export const PRICING = {
  launch: 199,  // Your pricing
  features: [
    'YOUR FEATURE 1',
    'YOUR FEATURE 2',
  ],
  // ... customize for your product
};
```

### Option 2: Copy and Customize

Copy an example file and customize it:

```bash
cp src/data/examples/pricing-example.ts src/data/landing/pricing.ts
# Edit src/data/landing/pricing.ts with your content
```

### Option 3: Import Temporarily

Use example data while building, replace later:

```typescript
// Temporary - use example data
import { PRICING_EXAMPLE } from '@/data/examples/pricing-example';

// Later - replace with your data
import { PRICING } from '@/data/landing/pricing';
```

## Customization Guidelines

### Core Marketing Data

**Pricing:**
- Update prices to match your business model
- Customize features for each tier
- Adjust currency and billing periods
- Add/remove tiers as needed

**Benefits:**
- Focus on **outcomes**, not features
- Use real time/cost savings if available
- Highlight what makes you unique
- Keep descriptions concise and specific

**FAQs:**
- Answer questions your customers actually ask
- Be honest and transparent
- Link to docs for technical details
- Update as you get more questions

**Testimonials:**
- Use real customer quotes (with permission)
- Include specific metrics/results
- Add customer photo/logo if possible
- Avoid generic praise - be specific

### Landing Page Sections

**Stats:**
- Use real metrics from your product
- Update regularly to show growth
- Choose metrics that matter to customers
- 3-4 stats is optimal

**Use Cases:**
- Target 3-4 key personas
- Focus on pain points and solutions
- Be specific about benefits
- Include CTAs for each persona

**Comparison:**
- Be honest and fair to competitors
- Focus on unique differentiators
- Avoid negativity or false claims
- Update when competitors change

**Included Features:**
- Organize by category for clarity
- Be comprehensive but not overwhelming
- Use icons for visual appeal
- Keep descriptions clear and concise

### Value Proposition

**Time Savings:**
- Use realistic hour estimates
- Break down by specific tasks
- Show ROI in concrete terms
- Base on actual development time

**Value Breakdown:**
- Calculate based on market rates
- Show clear savings vs. building
- Use receipt-style format
- Be transparent about pricing

### Site Configuration

**Site Config:**
- Update all URLs and contact info
- Keep social links current
- Verify email addresses work
- Review legal page links

**Logo Cloud:**
- Get permission before using logos
- Use high-quality SVG/PNG files
- Keep logos up to date
- Remove defunct companies

### Content & SEO

**Blog Config:**
- Define clear categories
- Set up author profiles
- Choose relevant tags
- Configure SEO settings

**SEO Metadata:**
- Title: 50-60 characters optimal
- Description: 150-160 characters
- Use unique OG images per page
- Follow Next.js Metadata API

## Structure

All example files export TypeScript constants with `as const` for type safety:

```typescript
export const EXAMPLE_DATA = {
  // your data
} as const;

// TypeScript will infer exact types
type ExampleType = typeof EXAMPLE_DATA;
```

## Import Examples

```typescript
// Import individual exports
import { PRICING_EXAMPLE, STATS_EXAMPLE } from '@/data/examples';

// Import specific file
import { USE_CASES_EXAMPLE } from '@/data/examples/use-cases-example';

// Use in component
export default function HomePage() {
  return (
    <div>
      <StatsSection stats={STATS_EXAMPLE} />
      <UseCasesSection useCases={USE_CASES_EXAMPLE} />
    </div>
  );
}
```

## Industry Standards

These examples are based on analysis of premium SaaS boilerplates:
- ShipFast
- SaaSRock
- SaaSBold
- Magic UI
- SupaStarter
- BuilderKit

All patterns follow industry-standard structures while using original, generic content.

## Next Steps

1. **Review examples** to understand the structure
2. **Create your own files** in `src/data/landing/` (for Fabrk-specific data)
3. **Update components** to import your data instead of examples
4. **Keep examples** as reference or delete if not needed

## File Organization

```
src/data/
├── examples/          # Generic templates (THIS DIRECTORY)
│   ├── pricing-example.ts
│   ├── stats-example.ts
│   └── ...
└── landing/           # Your actual marketing data
    ├── pricing.ts
    ├── stats.ts
    └── ...
```

**Rule:** Examples stay in `examples/`, your real data goes in `landing/`

---

**Note:** These are generic examples. Real marketing data should be based on your product, customers, and value proposition. Never copy competitor content directly - use these structures as templates.
