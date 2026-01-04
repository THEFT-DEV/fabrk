# Landing Page Variations Guide

Fabrk includes multiple landing page component variations to help you find the perfect layout for your SaaS. This guide shows you how to use and customize each variation.

---

## Hero Section Variations

Fabrk includes **3 hero section variations**:

1. **Centered Hero** (Default) - `hero-section.tsx`
2. **Split-Screen Hero** - `hero-split.tsx`
3. **Video Background Hero** - `hero-video.tsx`

---

### 1. Centered Hero (Default)

**File:** `src/components/landing/hero-section.tsx`

**Best for:**
- Simple, focused messaging
- Code-first products (shows code snippet)
- When you want maximum attention on the headline

**Features:**
- Centered text alignment
- Large, bold headline
- Code snippet mockup below CTA
- Early access badge
- Trust indicators
- File count badge (161 files)

**Usage:**

```tsx
import { HeroSection } from "@/components/landing/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Other sections... */}
    </>
  );
}
```

**Customization:**

The centered hero is static and uses inline text. To customize:

1. Open `src/components/landing/hero-section.tsx`
2. Edit the headline text:
   ```tsx
   <h1>Your Custom Headline</h1>
   ```
3. Update the subheadline and CTA text
4. Modify the code snippet mockup to show your project structure

---

### 2. Split-Screen Hero

**File:** `src/components/landing/hero-split.tsx`

**Best for:**
- Showcasing product screenshots
- Visual-heavy products (dashboards, design tools)
- When you want to show the product immediately

**Features:**
- 78/78 split layout (text left, visual right)
- Configurable image position (left or right)
- Dashboard mockup (or custom image)
- Trust badges as pills
- Early access badge
- File count badge overlay

**Usage:**

```tsx
import { HeroSplit } from "@/components/landing/hero-split";

export default function HomePage() {
  return (
    <>
      <HeroSplit
        headline="The Anti-Bloat Next.js Boilerplate"
        subheadline="161 files. Not 1000. Ship your SaaS in hours, not weeks."
        ctaPrimary={{ text: "Get Fabrk Now - $79", href: "#pricing" }}
        ctaSecondary={{ text: "View Docs", href: "/docs" }}
        trustBadges={["TypeScript Strict", "PostgreSQL", "Next.js 15", "78+ components"]}
        image="/dashboard-preview.png"
        imageAlt="Fabrk Dashboard Preview"
        imagePosition="right"
      />
      {/* Other sections... */}
    </>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | string | "The Anti-Bloat..." | Main headline text |
| `subheadline` | string | "161 files..." | Supporting text |
| `ctaPrimary` | object | { text, href } | Primary CTA button |
| `ctaSecondary` | object | { text, href } | Secondary CTA button |
| `trustBadges` | string[] | ["TypeScript...", ...] | Trust indicators as pills |
| `image` | string | "/dashboard-preview.png" | Product screenshot path |
| `imageAlt` | string | "Fabrk Dashboard..." | Alt text for image |
| `imagePosition` | "left" \| "right" | "right" | Which side shows the image |

**Customization Tips:**

1. **Add Your Product Screenshot:**
   ```bash
   # Add your screenshot to public folder
   public/dashboard-preview.png
   ```

2. **Change Image Position:**
   ```tsx
   <HeroSplit imagePosition="left" />
   ```

3. **Update Trust Badges:**
   ```tsx
   <HeroSplit
     trustBadges={[
       "10K+ Users",
       "99.9% Uptime",
       "SOC 2 Certified",
       "GDPR Compliant"
     ]}
   />
   ```

4. **Customize Dashboard Mockup:**
   - Open `src/components/landing/hero-split.tsx`
   - Find the `{/* Dashboard Mockup */}` section
   - Replace placeholder with your own UI elements

---

### 3. Video Background Hero

**File:** `src/components/landing/hero-video.tsx`

**Best for:**
- High-impact landing pages
- When you have a demo video
- Creating an immersive first impression
- Technical products showing IDE/terminal

**Features:**
- Full-width video background (muted, autoplay, loop)
- Animated gradient fallback (if no video)
- Dark overlay for text readability
- Centered text with white theme
- Scroll indicator
- Glass-morphism badges

**Usage:**

```tsx
import { HeroVideo } from "@/components/landing/hero-video";

export default function HomePage() {
  return (
    <>
      <HeroVideo
        headline="The Anti-Bloat Next.js Boilerplate"
        subheadline="161 files. Not 1000. Ship your SaaS in hours, not weeks."
        ctaPrimary={{ text: "Get Fabrk Now - $79", href: "#pricing" }}
        ctaSecondary={{ text: "View Demo", href: "#demo" }}
        trustBadges={["TypeScript Strict", "PostgreSQL", "Next.js 15", "78+ components"]}
        videoSrc="/videos/demo.mp4"
        videoPoster="/images/video-poster.jpg"
        overlayOpacity={0.6}
      />
      {/* Other sections... */}
    </>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | string | "The Anti-Bloat..." | Main headline text |
| `subheadline` | string | "161 files..." | Supporting text |
| `ctaPrimary` | object | { text, href } | Primary CTA button (white) |
| `ctaSecondary` | object | { text, href } | Secondary CTA button (outline) |
| `trustBadges` | string[] | ["TypeScript...", ...] | Trust indicators |
| `videoSrc` | string | undefined | Path to MP4 video |
| `videoPoster` | string | undefined | Fallback image for video |
| `overlayOpacity` | number | 0.6 | Dark overlay opacity (0-1) |

**Video Requirements:**

- **Format:** MP4 (H.264 codec for best compatibility)
- **Resolution:** 1920x1080 or higher
- **Duration:** 10-30 seconds (should loop seamlessly)
- **File Size:** <5MB (optimize with HandBrake or FFmpeg)
- **Content Ideas:**
  - Terminal commands (npm install, npm run dev)
  - Code editor showing project structure
  - Browser showing auth → dashboard → checkout flow
  - Quick product tour

**Creating a Demo Video:**

```bash
# Option 1: Screen recording with OBS Studio (free)
# Record your screen showing:
# - Terminal (npm install, npm run dev)
# - VS Code (showing clean TypeScript)
# - Browser (landing → login → dashboard)
# - Export as MP4, optimize to <5MB

# Option 2: FFmpeg optimization
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1920:1080 -b:v 2M output.mp4
```

**Customization Tips:**

1. **No Video? Use Gradient Fallback:**
   ```tsx
   <HeroVideo /> {/* No videoSrc prop = animated gradient */}
   ```

2. **Adjust Overlay Darkness:**
   ```tsx
   <HeroVideo overlayOpacity={0.7} /> {/* Darker text background */}
   ```

3. **Change Gradient Colors:**
   - Open `src/components/landing/hero-video.tsx`
   - Find `bg-gradient-to-br from-[#007AFF] via-purple-600 to-[#007AFF]`
   - Replace with your brand colors

---

## Pricing Section Variations

Fabrk includes **2 pricing layouts**:

1. **Pricing Cards** (Default) - `pricing-section.tsx`
2. **Comparison Table** - `pricing-table.tsx`

---

### 1. Pricing Cards (Default)

**File:** `src/components/landing/pricing-section.tsx`

**Best for:**
- Simple pricing (1-3 tiers)
- Feature-focused presentation
- When you want clear CTA buttons

**Features:**
- Vertical card layout
- Feature list with checkmarks
- "Most Popular" badge
- Early access badge
- Guarantee text

**Usage:**

```tsx
import { PricingSection } from "@/components/landing/pricing-section";

export default function HomePage() {
  return (
    <>
      {/* Other sections... */}
      <PricingSection />
    </>
  );
}
```

**Customization:**

The default pricing section is static. To customize:

1. Open `src/components/landing/pricing-section.tsx`
2. Update pricing tier details
3. Modify feature lists
4. Change CTA text and links

---

### 2. Comparison Table

**File:** `src/components/landing/pricing-table.tsx`

**Best for:**
- Comparing against competitors
- Feature-heavy products (many differentiators)
- When you want to emphasize value vs alternatives
- Educational pricing pages

**Features:**
- Horizontal table layout
- Feature rows with checkmarks/text
- Highlighted column (your product)
- Competitive comparison (DIY, ShipFast, Supastarter, Fabrk)
- Savings calculation
- Sticky header on scroll
- Mobile responsive (horizontal scroll)

**Usage:**

```tsx
import { PricingTable } from "@/components/landing/pricing-table";

export default function HomePage() {
  return (
    <>
      {/* Other sections... */}
      <PricingTable />
    </>
  );
}
```

**Customization:**

**1. Modify Plans:**

```tsx
<PricingTable
  plans={[
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for side projects",
      features: {
        typescript: true,
        database: "PostgreSQL",
        components: "40+",
        dataTable: false,
        support: "Email only",
      },
      highlighted: false,
      cta: { text: "Get Started", href: "/checkout?plan=starter" },
    },
    {
      name: "Pro",
      price: "$79",
      description: "Best for serious builders",
      features: {
        typescript: "Strict Mode",
        database: "PostgreSQL",
        components: "80+",
        dataTable: true,
        support: "Discord + Email",
      },
      highlighted: true, // This column gets purple background
      cta: { text: "Get Pro", href: "/checkout?plan=pro" },
    },
  ]}
/>
```

**2. Add Custom Features:**

Update `featureLabels` in `pricing-table.tsx`:

```tsx
const featureLabels: Record<string, string> = {
  typescript: "TypeScript Support",
  database: "Database",
  components: "Component Count",
  dataTable: "Data Table",
  // Add your features:
  multiTenancy: "Multi-Tenancy",
  apiRateLimit: "API Rate Limiting",
  customDomain: "Custom Domain",
};
```

**3. Change Highlighted Column:**

```tsx
plans={[
  { name: "Starter", highlighted: false },
  { name: "Pro", highlighted: true }, // This one gets purple
  { name: "Enterprise", highlighted: false },
]}
```

**Mobile Behavior:**

The comparison table:
- Scrolls horizontally on mobile
- First column (features) is sticky
- Optimized for touch
- Maintains readability

---

## Mixing and Matching

You can mix any hero with any pricing layout:

### Example 1: Split Hero + Comparison Table

```tsx
import { HeroSplit } from "@/components/landing/hero-split";
import { PricingTable } from "@/components/landing/pricing-table";

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <FeaturesSection />
      <PricingTable />
      <FAQSection />
    </>
  );
}
```

### Example 2: Video Hero + Card Pricing

```tsx
import { HeroVideo } from "@/components/landing/hero-video";
import { PricingSection } from "@/components/landing/pricing-section";

export default function HomePage() {
  return (
    <>
      <HeroVideo videoSrc="/demo.mp4" />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
```

### Example 3: Multiple Variants (A/B Testing)

```tsx
// Use URL parameter or feature flag to show different variants
import { HeroSection } from "@/components/landing/hero-section";
import { HeroSplit } from "@/components/landing/hero-split";

export default function HomePage({ searchParams }: { searchParams: { variant?: string } }) {
  const isVariantB = searchParams.variant === "b";

  return (
    <>
      {isVariantB ? <HeroSplit /> : <HeroSection />}
      {/* Rest of page... */}
    </>
  );
}
```

---

## Best Practices

### Choosing the Right Hero

**Use Centered Hero when:**
- You want maximum focus on messaging
- Your product is code-focused (dev tools, boilerplates)
- You don't have great product screenshots yet
- You want simplicity

**Use Split Hero when:**
- You have a beautiful dashboard/UI to show
- Your product is visual (design tools, analytics)
- You want to immediately show the product
- You have strong visual branding

**Use Video Hero when:**
- You have a demo video (or can easily create one)
- You want high impact (SaaS with lots of features)
- Your product has complex workflows to demonstrate
- You want to stand out from competitors

### Choosing the Right Pricing Layout

**Use Pricing Cards when:**
- You have 1-3 simple pricing tiers
- Features are straightforward
- You're not competing directly with established players
- You want clear, obvious CTAs

**Use Comparison Table when:**
- You're competing against known alternatives
- You have strong differentiators to highlight
- You want to educate buyers on what makes you different
- Pricing is a key decision factor

### Design Consistency

When using different variants, maintain consistency:

1. **Keep the same messaging:**
   - Same headline across all heroes
   - Same value proposition
   - Same CTAs

2. **Maintain brand colors:**
   - Purple/blue theme throughout
   - Consistent button styles
   - Same border/shadow treatments

3. **Match trust signals:**
   - Same trust badges
   - Same guarantee text
   - Same support options

---

## Performance Considerations

### Video Background Hero

Videos can impact page load time:

**Optimization Checklist:**
- ✅ Keep video under 5MB
- ✅ Use H.264 codec (best compatibility)
- ✅ Provide poster image (shows while loading)
- ✅ Consider lazy loading for below-fold videos
- ✅ Offer gradient fallback for slow connections

**Code for Lazy Video:**

```tsx
"use client";

import { useState, useEffect } from "react";

export function HeroVideo() {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Only load video after page is interactive
    const timer = setTimeout(() => setLoadVideo(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {loadVideo ? (
        <video autoPlay loop muted>
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="gradient-fallback" />
      )}
    </section>
  );
}
```

### Image Optimization

For Split Hero screenshots:

```tsx
import Image from "next/image";

// Instead of <img>, use Next.js Image:
<Image
  src="/dashboard-preview.png"
  alt="Dashboard"
  width={1200}
  height={900}
  priority // Load above-fold images first
/>
```

---

## Testing Your Variations

### A/B Testing Setup

Use Vercel's Edge Middleware for A/B testing:

```ts
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);

  // 78/78 split between variant A and B
  const variant = Math.random() > 0.5 ? "a" : "b";

  url.searchParams.set("variant", variant);
  return NextResponse.rewrite(url);
}
```

Track conversions in your analytics:

```tsx
// Track which variant converted
if (purchaseSuccess) {
  analytics.track("Purchase", {
    variant: searchParams.variant, // "a" or "b"
    value: 79,
  });
}
```

### Quick Test Checklist

Before launching:

- [ ] Mobile responsive (test on iPhone, Android)
- [ ] CTA buttons work (link to correct pages)
- [ ] Videos autoplay and loop (if using video hero)
- [ ] Images load quickly (optimize with Next.js Image)
- [ ] Text is readable on all backgrounds
- [ ] Trust badges are accurate and up-to-date
- [ ] Pricing matches what's in Stripe
- [ ] Forms work (if any)
- [ ] No broken links

---

## Need Help?

- Check the component source code for inline comments
- Email support: support@fabrk.dev
- Example pages: See `src/app/(dashboard)/examples/`

---

**Happy building! Choose the variant that best represents your SaaS and start shipping. 🚀**
