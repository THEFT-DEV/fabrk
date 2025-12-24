# Analytics Setup Guide

This guide walks you through setting up analytics for your Fabrk SaaS to track user behavior, conversions, and growth metrics.

---

## Table of Contents

1. [Analytics Strategy](#analytics-strategy)
2. [Google Analytics 4 (GA4) Setup](#google-analytics-4-ga4-setup)
3. [Plausible Analytics (Privacy-Friendly Alternative)](#plausible-analytics-privacy-friendly-alternative)
4. [Custom Event Tracking](#custom-event-tracking)
5. [Conversion Tracking](#conversion-tracking)
6. [Dashboard Metrics](#dashboard-metrics)
7. [Privacy & GDPR Compliance](#privacy--gdpr-compliance)
8. [Testing Analytics](#testing-analytics)

---

## Analytics Strategy

### What to Track

**1. Acquisition Metrics:**
- Traffic sources (organic, paid, social, referral)
- Landing page views
- Bounce rate
- UTM campaign performance

**2. Engagement Metrics:**
- Page views and sessions
- Time on site
- Pages per session
- Hero variation performance (A/B testing)

**3. Conversion Metrics:**
- Sign-up conversions (registration → verification)
- Purchase conversions (checkout → payment success)
- Customer lifetime value (LTV)
- Conversion rate by traffic source

**4. Product Metrics:**
- Feature usage (which components are viewed)
- Documentation page views
- Variation page engagement
- Support ticket volume

---

## Google Analytics 4 (GA4) Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Set property name: "Fabrk"
4. Set timezone and currency
5. Create a **Web** data stream

### 2. Get Measurement ID

After creating the stream, you'll get a Measurement ID like `G-XXXXXXXXXX`.

### 3. Install GA4 in Next.js

**Option A: Using `next/script` (Recommended)**

Create `src/components/analytics/google-analytics.tsx`:

```tsx
"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null; // Don't load in development or if not configured
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
```

Add to `src/app/layout.tsx`:

```tsx
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
```

**Option B: Using gtag Package**

```bash
npm install @next/third-parties
```

```tsx
// In src/app/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### 4. Add Environment Variable

In `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. Test GA4 Installation

1. Open your site in production or preview
2. Open Chrome DevTools → Network tab
3. Filter by "google-analytics" or "gtag"
4. You should see requests to `www.google-analytics.com`
5. Go to GA4 → Reports → Realtime → You should see your session

---

## Plausible Analytics (Privacy-Friendly Alternative)

Plausible is a privacy-friendly alternative to GA4. No cookie banners needed, GDPR compliant by default.

### 1. Sign Up

1. Go to [plausible.io](https://plausible.io/)
2. Create account (€9/month for 10k pageviews)
3. Add your domain: `fabrk.dev`

### 2. Install Plausible Script

**Option A: Using `next/script`**

```tsx
// src/components/analytics/plausible-analytics.tsx
"use client";

import Script from "next/script";

export function PlausibleAnalytics() {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || "fabrk.dev";

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
```

**Option B: Using Plausible Proxy (Avoid Ad Blockers)**

Follow [Plausible's Next.js proxy guide](https://plausible.io/docs/proxy/guides/nextjs) to proxy requests through your domain.

### 3. Track Custom Events

```tsx
// src/lib/analytics.ts
export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }
}
```

Usage:

```tsx
import { trackEvent } from "@/lib/analytics";

// Track button click
trackEvent("CTA Clicked", { location: "hero", variant: "split" });

// Track purchase
trackEvent("Purchase", { plan: "Professional", amount: 199 });
```

### 4. Plausible Dashboard

View your analytics at: `https://plausible.io/fabrk.dev`

---

## PostHog Analytics (Included in Fabrk)

Fabrk includes optional PostHog integration for product analytics, feature flags, and session recordings. PostHog only initializes when configured - leave environment variables empty to disable.

### 1. Sign Up (Optional)

1. Go to [posthog.com](https://posthog.com/)
2. Create free account (generous free tier)
3. Create new project
4. Copy API key (starts with `phc_`)

### 2. Configure Environment Variables

**In `.env.local` or Vercel:**

```env
# PostHog (Optional - leave empty to disable)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # Or https://app.posthog.com for EU
```

**If not set:** PostHog will not initialize. App works perfectly without analytics (graceful degradation).

### 3. Verify Integration

PostHog is already integrated in Fabrk:

```typescript
// src/lib/analytics/posthog-provider.tsx - Already configured
// Automatically initializes if NEXT_PUBLIC_POSTHOG_KEY is present
// Proxies through /ingest to bypass ad blockers (100% data capture)
```

**Test it:**
```bash
npm run dev
# Visit http://localhost:3000
# Open PostHog dashboard → Live Events
# You should see your session (if key configured)
```

### 4. Track Custom Events

**Client-side tracking:**

```typescript
import { trackEvent } from '@/lib/analytics/posthog-provider';

// Safe tracking - no-op if PostHog not configured
trackEvent('button_clicked', {
  button_name: 'checkout',
  page: 'pricing',
});
```

**Server-side tracking:**

```typescript
import { trackUserSignup, trackOrgCreated } from '@/lib/analytics/events';

// Safe helper functions with graceful degradation
await trackUserSignup(userId, email, { provider: 'google' });
await trackOrgCreated(userId, orgId, orgName);
```

### 5. PostHog Dashboard

View your analytics at: `https://app.posthog.com`

**Key Features:**
- Event tracking and funnels
- Session recordings (opt-in)
- Feature flags for A/B testing
- Cohort analysis
- Retention tracking

### 6. Privacy Settings

PostHog is GDPR-compliant by default:
- IP addresses anonymized
- No persistent cookies (uses localStorage)
- User data deletion supported
- Self-hosting available

**Disable session recordings** (if not needed):

PostHog session recordings are disabled by default in Fabrk. To enable them, modify `posthog-provider.tsx`:

```typescript
posthog.init(key, {
  // ...existing config
  disable_session_recording: false, // Enable recordings
});
```

---

## Custom Event Tracking

### Key Events to Track

Create `src/lib/analytics.ts`:

```typescript
// Type-safe event tracking
type AnalyticsEvent =
  | { name: "page_view"; props: { page: string } }
  | { name: "sign_up"; props: { method: "email" | "google" } }
  | { name: "purchase"; props: { plan: string; amount: number } }
  | { name: "checkout_started"; props: { plan: string } }
  | { name: "hero_cta_click"; props: { variant: string; location: string } }
  | { name: "pricing_cta_click"; props: { plan: string } }
  | { name: "variation_viewed"; props: { type: string; variant: string } }
  | { name: "docs_viewed"; props: { page: string } };

export function trackEvent<T extends AnalyticsEvent>(
  event: T["name"],
  props: T["props"]
) {
  // Send to GA4
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, props);
  }

  // Send to Plausible
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, props);
  }
}
```

### Track Button Clicks

```tsx
// Example: Track hero CTA click
import { trackEvent } from "@/lib/analytics";

<button
  onClick={() => {
    trackEvent("hero_cta_click", {
      variant: "split",
      location: "hero-section",
    });
    // ... handle click
  }}
>
  Get Started
</button>
```

### Track Page Views (Server Components)

For Next.js 15 with App Router, page views are tracked automatically by GA4. For custom tracking:

```tsx
// src/app/variations/page.tsx
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

export default function VariationsPage() {
  useEffect(() => {
    trackEvent("page_view", { page: "variations" });
  }, []);

  return (/* ... */);
}
```

---

## Conversion Tracking

### 1. Sign-Up Conversion

Track when users complete registration:

```typescript
// In src/app/api/auth/register/route.ts
import { trackEvent } from "@/lib/analytics";

export async function POST(req: Request) {
  try {
    // ... registration logic

    // Track sign-up
    trackEvent("sign_up", { method: "email" });

    return NextResponse.json({ success: true });
  } catch (error) {
    // ...
  }
}
```

### 2. Purchase Conversion

Track when Stripe checkout completes:

```typescript
// In src/app/api/webhooks/stripe/route.ts
import { trackEvent } from "@/lib/analytics";

export async function POST(req: Request) {
  // ... webhook handling

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Track purchase
    trackEvent("purchase", {
      plan: session.metadata?.plan || "unknown",
      amount: (session.amount_total || 0) / 100,
    });

    // Track in GA4 as conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "purchase", {
        transaction_id: session.id,
        value: (session.amount_total || 0) / 100,
        currency: "USD",
        items: [
          {
            item_id: session.metadata?.priceId,
            item_name: session.metadata?.plan,
            price: (session.amount_total || 0) / 100,
          },
        ],
      });
    }
  }

  return NextResponse.json({ received: true });
}
```

### 3. Set Up GA4 Conversions

1. Go to GA4 → Admin → Events
2. Mark these events as conversions:
   - `sign_up`
   - `purchase`
   - `checkout_started`

### 4. Track Conversion Value

Enable Enhanced Ecommerce in GA4:

```typescript
// When user clicks "Buy Now"
trackEvent("begin_checkout", {
  currency: "USD",
  value: 79,
  items: [
    {
      item_id: "fabrk-boilerplate",
      item_name: "Fabrk Boilerplate",
      price: 79,
    },
  ],
});

// When purchase completes (in webhook)
trackEvent("purchase", {
  transaction_id: session.id,
  currency: "USD",
  value: 79,
  items: [
    {
      item_id: "fabrk-boilerplate",
      item_name: "Fabrk Boilerplate",
      price: 79,
    },
  ],
});
```

---

## Dashboard Metrics

### Create Custom Dashboard in GA4

**Key Reports to Add:**

1. **Acquisition Overview**
   - Traffic sources
   - UTM campaign performance
   - Landing page conversion rates

2. **User Engagement**
   - Active users (daily/weekly/monthly)
   - Engagement rate
   - Average engagement time

3. **E-commerce Overview**
   - Purchase revenue
   - Conversion rate
   - Average order value

4. **Custom Events**
   - Hero CTA clicks by variant
   - Pricing CTA clicks by plan
   - Documentation page views

### Plausible Dashboard

Plausible provides a simpler dashboard out of the box:

- Top pages
- Top sources
- Countries
- Devices (mobile/desktop/tablet)
- Goals (custom events)

**Set Up Goals in Plausible:**

1. Go to Settings → Goals
2. Add custom events:
   - `sign_up`
   - `purchase`
   - `checkout_started`
   - `hero_cta_click`

---

## Privacy & GDPR Compliance

### Plausible (No Cookie Banner Needed)

Plausible doesn't use cookies and is GDPR-compliant by default. No consent banner required.

### GA4 (Cookie Banner Required in EU)

If using GA4, you need a cookie consent banner for EU visitors.

**Option A: Cookie Consent Library**

```bash
npm install react-cookie-consent
```

```tsx
// src/components/cookie-consent.tsx
"use client";

import CookieConsent from "react-cookie-consent";

export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={() => {
        // Enable GA4
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      }}
      onDecline={() => {
        // Disable GA4
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
      }}
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#007AFF", color: "#fff", fontSize: "14px" }}
    >
      We use cookies to analyze site usage and improve your experience.
    </CookieConsent>
  );
}
```

**Option B: Simple Custom Banner**

Create a minimal banner that saves preference to localStorage and only loads GA4 after consent.

---

## Testing Analytics

### 1. Local Testing (Development)

```typescript
// src/lib/analytics.ts
if (process.env.NODE_ENV === "development") {
  console.log("[Analytics]", event, props); // Logs to console in dev
}
```

### 2. Preview Deployment Testing

Deploy to Vercel preview and test:

```bash
npm run build
vercel --prod=false
```

Open the preview URL and check:
- Chrome DevTools → Network → Filter by "gtag" or "plausible"
- GA4 Realtime report (should show 1 active user)
- Plausible dashboard (real-time updates)

### 3. Production Testing

After deploying to production:

1. **GA4 Realtime Report:**
   - Go to GA4 → Reports → Realtime
   - Visit your site
   - You should see yourself as an active user

2. **GA4 DebugView:**
   - Install GA Debugger Chrome extension
   - Visit your site
   - Go to GA4 → Configure → DebugView
   - See events in real-time

3. **Plausible:**
   - Visit your Plausible dashboard
   - Your visit should appear within 1 minute

---

## Analytics Checklist

Before launch, verify:

### Setup
- [ ] GA4 or Plausible installed and tested
- [ ] Measurement ID added to environment variables
- [ ] Script loads on all pages
- [ ] Realtime report shows test visits

### Events
- [ ] Page view tracking works
- [ ] Sign-up conversion tracked
- [ ] Purchase conversion tracked
- [ ] CTA clicks tracked
- [ ] Custom events fire correctly

### Privacy
- [ ] Cookie consent banner (if using GA4 in EU)
- [ ] Privacy policy mentions analytics
- [ ] Data retention configured (14 months max in GA4)
- [ ] IP anonymization enabled (automatic in GA4)

### Dashboard
- [ ] Custom dashboard created in GA4
- [ ] Goals configured in Plausible
- [ ] Conversion events marked as conversions
- [ ] E-commerce tracking enabled (if applicable)

### Testing
- [ ] Tested in development (console logs)
- [ ] Tested in preview deployment
- [ ] Tested in production (realtime report)
- [ ] Verified events in GA4 DebugView
- [ ] Verified goals in Plausible

---

## Recommended Analytics for Fabrk

### PostHog (Built-in, Free Tier Available)

**Why PostHog for SaaS products:**

1. **Included in Fabrk** - Already integrated, optional initialization
2. **All-in-one platform** - Analytics + Feature Flags + Session Replay + A/B Testing
3. **Product analytics** - Funnels, cohorts, retention tracking
4. **Self-hostable** - Own your data completely
5. **Generous free tier** - 1M events/month free
6. **No cookie banner needed** - GDPR compliant by default

**When to use PostHog:**
- Building a SaaS product (most Fabrk users)
- Need feature flags and A/B testing
- Want session replay for debugging
- Privacy-focused product analytics

### Plausible (Simple Alternative)

**Why Plausible for indie hackers:**

1. **No cookie banner** - GDPR compliant by default
2. **Simpler** - Less overwhelming than GA4
3. **Privacy-focused** - Better for your users
4. **Lightweight** - <1KB script vs 45KB for GA4
5. **Great UX** - Beautiful, intuitive dashboard
6. **€9/month** - Affordable for indie hackers

**When to use Plausible:**
- Content sites, blogs, marketing pages
- Simple traffic tracking
- No need for product analytics

### GA4 (For Marketing Analytics)

**When to use GA4:**
- Running Google Ads campaigns
- Need detailed funnel analysis
- Advanced segmentation required
- Team already knows GA4

---

## Next Steps

After setting up analytics:

1. **Week 1:** Monitor traffic and conversions daily
2. **Week 2:** Analyze top traffic sources, optimize low performers
3. **Month 1:** Set up custom alerts for conversion drops
4. **Month 2:** A/B test hero variations using event data
5. **Ongoing:** Review monthly reports, track growth trends

---

**Need help with analytics? Check the Fabrk Discord or email support@fabrk.dev.**

**Analytics = Growth. Track what matters. 📊**
