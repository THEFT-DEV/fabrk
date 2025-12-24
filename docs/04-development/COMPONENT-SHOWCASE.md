# Component Showcase & Testing

This document provides quick links to preview all components and variations in the Fabrk boilerplate.

---

## 🎨 Landing Page Components

### Main Landing Page
**URL:** `/`
**Description:** Default landing page with centered hero and pricing cards

**What's included:**
- Centered hero
- Tech stack
- Features section
- Pricing cards
- FAQ section

---

### Alternative Landing Page (with Comparison)
**URL:** `/landing-alt`
**Description:** Alternative layout that includes the competitive comparison section

**What's included:**
- Centered hero
- **Comparison section** (vs DIY, ShipFast, Supastarter)
- Features section
- Pricing cards
- FAQ section

**When to use:** When you want to emphasize competitive advantages early in the funnel.

---

### Variations Showcase
**URL:** `/variations`
**Description:** Side-by-side comparison of all hero and pricing variations

**What's included:**
- All 3 hero variations (Centered, Split-Screen, Video)
- All 2 pricing variations (Cards, Comparison Table)
- Implementation instructions
- Usage examples with code snippets

**When to use:** For previewing and choosing which variations to use in your production landing page.

---

## 📊 Dashboard Examples

### Admin Panel (Data Table)
**URL:** `/examples/admin`
**Description:** Admin panel with data table showing user management

**Features:**
- Sortable columns (click headers)
- Filterable rows (search by name)
- Pagination (78/78/78/78 rows per page)
- Row selection
- Stats cards
- Mock data with 12 users

**Use case:** User management, admin dashboards, any tabular data.

---

### Analytics Dashboard
**URL:** `/examples/analytics`
**Description:** Analytics dashboard with metrics and activity feeds

**Features:**
- 4 stat cards with trend indicators
- Recent activity feed
- Top pages list
- Chart placeholder (ready for Recharts integration)
- Date range selector

**Use case:** Analytics pages, metrics dashboards, reporting.

---

### User Profile
**URL:** `/examples/user-profile`
**Description:** Complete user profile page

**Features:**
- Profile card with avatar and bio
- Stats display (projects, followers, following)
- Contact information section
- Social media links (Twitter, GitHub, LinkedIn)
- Recent projects showcase
- Activity timeline
- Edit/share actions

**Use case:** User profiles, team member pages, portfolio pages.

---

## 🧩 Component Variations

### Hero Sections (3 variations)

#### 1. Centered Hero (Default)
**File:** `src/components/landing/hero-section.tsx`
**Best for:** Simple messaging, code-first products
**Features:**
- Large, centered headline
- Code snippet mockup
- Early access badge
- Trust indicators

#### 2. Split-Screen Hero
**File:** `src/components/landing/hero-split.tsx`
**Best for:** Showcasing product UI, visual products
**Features:**
- 78/78 text/visual layout
- Dashboard mockup (or custom image)
- Configurable image position (left/right)
- Trust badges as pills

**Props:**
```tsx
<HeroSplit
  headline="Your headline"
  subheadline="Your subheadline"
  ctaPrimary={{ text: "Get Started", href: "#pricing" }}
  ctaSecondary={{ text: "View Docs", href: "/docs" }}
  trustBadges={["TypeScript", "PostgreSQL", "Next.js 15"]}
  image="/dashboard-preview.png"
  imagePosition="right"
/>
```

#### 3. Video Background Hero
**File:** `src/components/landing/hero-video.tsx`
**Best for:** High-impact launches, demo videos
**Features:**
- Full-width video background
- Animated gradient fallback (no video needed)
- Adjustable overlay opacity
- Glass-morphism UI

**Props:**
```tsx
<HeroVideo
  headline="Your headline"
  subheadline="Your subheadline"
  videoSrc="/demo.mp4"  // Optional
  videoPoster="/poster.jpg"  // Optional
  overlayOpacity={0.6}  // 0-1
/>
```

---

### Pricing Sections (2 variations)

#### 1. Pricing Cards (Default)
**File:** `src/components/landing/pricing-section.tsx`
**Best for:** Simple pricing, clear CTAs
**Features:**
- Single pricing tier
- Feature list with checkmarks
- Early access badge
- 30-day guarantee

#### 2. Comparison Table
**File:** `src/components/landing/pricing-table.tsx`
**Best for:** Showing competitive advantages
**Features:**
- 4-column comparison (DIY, ShipFast, Supastarter, Fabrk)
- 12 feature rows
- Highlighted column (your product)
- Sticky header on scroll
- Mobile responsive

**Props:**
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
        support: "Email only",
      },
      highlighted: false,
      cta: { text: "Get Started", href: "/checkout" },
    },
    // Add more plans...
  ]}
/>
```

---

## 📧 Email Templates

### All Templates
**Location:** `src/emails/`
**Description:** 5 transactional email templates

**Available templates:**
1. **Welcome Email** - After purchase
2. **Email Verification** - 24-hour expiry
3. **Password Reset** - 1-hour expiry
4. **Purchase Confirmation** - With license key
5. **Subscription Update** - 4 types (upgraded, downgraded, renewed, cancelled)

**Usage:**
```tsx
import { generateWelcomeEmailHTML } from "@/emails";

const html = generateWelcomeEmailHTML({
  name: "John Doe",
  licenseKey: "FABRK-ABC-123",
  downloadUrl: "https://...",
});
```

**Or use barrel export:**
```tsx
import {
  generateWelcomeEmailHTML,
  generateVerifyEmailHTML,
  generateResetPasswordHTML,
  generatePurchaseConfirmationHTML,
  generateSubscriptionUpdateHTML,
} from "@/emails";
```

---

## 🎯 Quick Start Testing Checklist

Test these pages locally to preview everything:

### Landing Pages
- [ ] `/` - Main landing page
- [ ] `/landing-alt` - With comparison section
- [ ] `/variations` - All variations showcase

### Dashboard Examples
- [ ] `/examples/admin` - Data table demo
- [ ] `/examples/analytics` - Analytics dashboard
- [ ] `/examples/user-profile` - User profile page

### Legal & Error Pages
- [ ] `/terms` - Terms of Service
- [ ] `/privacy` - Privacy Policy
- [ ] `/refund` - Refund Policy
- [ ] `/404-test` - 404 error page (invalid URL)
- [ ] `/maintenance` - Maintenance mode

---

## 🔧 Implementation Guide

### Using Different Hero Variations

**Option A: Replace in main page**
```tsx
// In src/app/page.tsx
import { HeroSplit } from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <HeroSplit />  {/* Instead of <HeroSection /> */}
      {/* Rest of page... */}
    </>
  );
}
```

**Option B: A/B testing with URL parameter**
```tsx
// In src/app/page.tsx
import { HeroSection, HeroSplit, HeroVideo } from "@/components/landing";

export default function HomePage({ searchParams }) {
  const variant = searchParams.hero || "default";

  const renderHero = () => {
    switch (variant) {
      case "split":
        return <HeroSplit />;
      case "video":
        return <HeroVideo />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <>
      {renderHero()}
      {/* Rest of page... */}
    </>
  );
}
```

Now test:
- `/` - Default hero
- `/?hero=split` - Split-screen hero
- `/?hero=video` - Video background hero

---

### Barrel Exports for Clean Imports

Instead of:
```tsx
import { HeroSection } from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/landing/footer";
```

Use:
```tsx
import { HeroSection, PricingSection, Footer } from "@/components/landing";
```

Available barrel exports:
- `@/components/landing` - All landing page components
- `@/emails` - All email template generators

---

## 📱 Mobile Testing

Test these breakpoints:
- **Mobile:** 375px (iPhone SE)
- **Tablet:** 768px (iPad)
- **Desktop:** 1440px (Laptop)
- **Wide:** 1920px (Desktop)

**Key components to test on mobile:**
- Hero variations (should stack/adapt)
- Pricing table (should scroll horizontally)
- Data table (should scroll horizontally)
- Navigation (should collapse to menu)

---

## 🎨 Customization Quick Reference

### Colors
**Primary:** `#007AFF` (Purple/Blue)
**Background:** `#FFFFFF` (White)
**Text:** `#000000` (Black)
**Borders:** `#000000` (Black, 2-4px)

**To change:**
Edit `tailwind.config.ts` or use inline Tailwind classes.

### Shadows (Neobrutalism)
**Standard:** `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
**Large:** `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
**Extra Large:** `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`

### Borders
**Standard:** `border-2 border-black`
**Thick:** `border-4 border-black`

---

## 📚 Documentation References

- **Component Usage:** `docs/LANDING-PAGE-VARIATIONS.md`
- **Marketing Strategy:** `docs/MARKETING.md`
- **Product Hunt Launch:** `docs/PRODUCT-HUNT.md`
- **Quick Start:** `docs/QUICK-START.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **Architecture:** `CLAUDE.md`

---

## ✅ Production Checklist

Before launching, verify:

### Components
- [ ] Chosen hero variation
- [ ] Chosen pricing layout
- [ ] Customized copy (headlines, CTAs)
- [ ] Updated trust badges
- [ ] Added product screenshots

### Content
- [ ] Pricing is correct ($79)
- [ ] File count is accurate (161 files)
- [ ] No placeholder text
- [ ] All links work
- [ ] Legal pages reviewed

### Testing
- [ ] Mobile responsive (all pages)
- [ ] Forms work (auth, checkout)
- [ ] Data table functions (sort, filter, paginate)
- [ ] Email templates send correctly
- [ ] Stripe checkout completes

### Infrastructure
- [ ] Support email set up (support@fabrk.dev)
- [ ] Discord server created
- [ ] Stripe products configured
- [ ] Environment variables in production
- [ ] Database deployed

---

**Need help? Check the docs or contact support.**

**Happy building! 🚀**
