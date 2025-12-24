# Customization Checklist

**Before you ship, make Fabrk yours.** This checklist ensures your product looks professional and on-brand.

⏱️ **Time required:** 30-45 minutes for basic customization

---

## 🎨 Visual Identity (Required)

### ☐ 1. Choose Your Color Theme (5 min)

**Default:** Green CRT terminal

**Action:** Pick a theme that matches your brand aesthetic.

```bash
# Test themes at http://localhost:3000
npm run dev
```

**Options:**
- **Professional SaaS** → `blue` (cool, trustworthy)
- **Developer tools** → `green` (classic terminal)
- **Creative apps** → `purple` or `gameboy` (playful)
- **Warm/nostalgic** → `amber` (cozy, vintage)
- **Minimalist** → `bw` or `gbpocket` (clean, focused)

**How to change:**
1. Edit `/src/design-system/providers/ThemeProvider.tsx:82`
2. Change `defaultColorTheme = 'green'` to your choice
3. Restart dev server

**Documentation:** [Theme Guide](./docs/08-design/THEME-GUIDE.md)

---

### ☐ 2. Set Your Brand Colors (15 min)

**Default:** Green primary color

**Action:** Replace with your company's brand colors.

**How to change:**
1. Convert your brand color to OKLCH → [oklch.com](https://oklch.com)
2. Edit `/src/app/globals.css:root` block (~line 15)
3. Update these tokens:

```css
:root {
  --primary: oklch(57% 0.21 276);           /* Your brand color */
  --primary-foreground: oklch(100% 0 0);    /* Text on brand color */
  --accent: oklch(60% 0.18 200);            /* Secondary accent */
}
```

**Example conversions:**
| Brand Color | OKLCH |
|------------|-------|
| `#6366f1` (Indigo) | `oklch(57% 0.21 276)` |
| `#22c55e` (Green) | `oklch(70% 0.20 140)` |
| `#f97316` (Orange) | `oklch(68% 0.19 35)` |
| `#ec4899` (Pink) | `oklch(64% 0.25 350)` |

**Verify:**
```bash
npm run scan:hex  # Should find zero hardcoded colors
```

**Documentation:** [Customization Guide](./docs/08-design/CUSTOMIZATION-GUIDE.md#quick-start-change-brand-colors)

---

### ☐ 3. Update Logo & Favicon (10 min)

**Default:** Fabrk logo and branding

**Action:** Replace with your company logo and favicon.

**Logo locations:**
```
/public/logo.svg          # Main logo (navigation, footer)
/public/logo-light.svg    # Light theme variant (if needed)
/public/og-image.png      # Social media preview (1200x630px)
```

**Favicon locations:**
```
/public/favicon.ico       # Browser tab icon
/public/icon.svg          # Modern SVG icon
/public/apple-touch-icon.png  # iOS home screen (180x180px)
```

**How to change:**
1. Replace files in `/public/` directory
2. Keep same filenames (or update references in `/src/app/layout.tsx`)
3. Verify logo appears in navigation and footer

**Logo requirements:**
- SVG format (scalable, small file size)
- Monochrome or uses CSS variables for color
- Transparent background
- Width: ~120-160px height when rendered

---

## 📝 Content & Copy (Required)

### ☐ 4. Update Site Metadata (5 min)

**Default:** Fabrk boilerplate metadata

**Action:** Set your product name, description, and SEO metadata.

**Location:** `/src/app/layout.tsx:14-24`

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Your Product Name',
    template: '%s | Your Product Name',
  },
  description: 'Your product description (150-160 characters for SEO)',
  keywords: ['saas', 'your', 'keywords'],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourproduct.com',
    siteName: 'Your Product Name',
    title: 'Your Product Name - Tagline',
    description: 'Your product description',
    images: [{
      url: 'https://yourproduct.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Your Product Name',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Product Name - Tagline',
    description: 'Your product description',
    images: ['https://yourproduct.com/og-image.png'],
    creator: '@yourhandle',
  },
};
```

**SEO best practices:**
- Title: 50-60 characters
- Description: 150-160 characters
- Include primary keywords naturally
- Match OpenGraph and Twitter metadata

---

### ☐ 5. Customize Landing Page Copy (10 min)

**Default:** Fabrk marketing copy

**Action:** Replace with your product's value proposition.

**Location:** `/src/app/(marketing)/page.tsx`

**Sections to update:**
```tsx
// Hero section
<h1>Your Product Headline</h1>
<p>Your value proposition</p>

// Features section
<Feature title="Feature 1" description="..." />
<Feature title="Feature 2" description="..." />

// CTA section
<Button>Get Started</Button>
```

**Writing tips:**
- Focus on benefits, not features
- Use active voice ("Ship faster" not "Faster shipping is enabled")
- Keep hero headline under 10 words
- Include clear call-to-action

---

## ⚙️ Configuration (Required)

### ☐ 6. Set Environment Variables (10 min)

**Action:** Configure production environment variables.

**Location:** Vercel Dashboard → Settings → Environment Variables

**Required variables:**
```bash
# Database (Vercel Postgres, Supabase, PlanetScale, etc.)
DATABASE_URL=postgresql://...

# Auth (NextAuth.js)
NEXTAUTH_SECRET=your_random_32_char_secret
NEXTAUTH_URL=https://yourproduct.com

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourproduct.com

# Payments (choose one)
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
# OR Polar
POLAR_ACCESS_TOKEN=polar_...
# OR Lemonsqueezy
LEMONSQUEEZY_API_KEY=...
```

**OAuth providers (optional):**
```bash
# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# GitHub OAuth
GITHUB_ID=...
GITHUB_SECRET=...
```

**How to generate:**
- NEXTAUTH_SECRET: `openssl rand -base64 32`
- API keys: Get from provider dashboards

**Documentation:**
- [Environment Setup](./docs/01-getting-started/QUICK-START.md#environment-setup)
- [Stripe Setup](./docs/06-features/STRIPE-INTEGRATION.md)
- [Polar Setup](./docs/06-features/POLAR-INTEGRATION.md)

---

### ☐ 7. Configure Domain (5 min)

**Action:** Point your custom domain to Vercel.

**Steps:**
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `yourproduct.com`
3. Add www subdomain: `www.yourproduct.com`
4. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (5-60 min)

**Verify:** Visit `https://yourproduct.com` (should load your site)

---

### ☐ 8. Set Up Payment Provider (15-30 min)

**Action:** Configure Stripe, Polar, or Lemonsqueezy.

**Choose one:**

#### Option A: Stripe
```bash
# 1. Create Stripe account: https://stripe.com
# 2. Add API keys to Vercel env vars
# 3. Configure products in Stripe Dashboard
# 4. Set up webhook endpoint: https://yourproduct.com/api/webhooks/stripe
# 5. Test with Stripe test mode first
```
**Documentation:** [Stripe Integration](./docs/06-features/STRIPE-INTEGRATION.md)

#### Option B: Polar
```bash
# 1. Create Polar account: https://polar.sh
# 2. Add access token to Vercel env vars
# 3. Configure products in Polar Dashboard
# 4. Set up webhook endpoint: https://yourproduct.com/api/webhooks/polar
```
**Documentation:** [Polar Integration](./docs/06-features/POLAR-INTEGRATION.md)

#### Option C: Lemonsqueezy
```bash
# 1. Create Lemonsqueezy account: https://lemonsqueezy.com
# 2. Add API key to Vercel env vars
# 3. Configure products in Lemonsqueezy Dashboard
# 4. Set up webhook endpoint: https://yourproduct.com/api/webhooks/lemonsqueezy
```
**Documentation:** [Lemonsqueezy Integration](./docs/06-features/LEMONSQUEEZY-INTEGRATION.md)

---

## ✅ Quality Assurance (Recommended)

### ☐ 9. Run Accessibility Audit (5 min)

**Action:** Verify WCAG 2.1 AA compliance.

```bash
npm run dev
```

**Steps:**
1. Open site in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Run "Accessibility" audit
4. Target score: **90+**

**Common issues:**
- Missing `aria-label` on icon-only buttons
- Insufficient color contrast (4.5:1 for text)
- Missing form labels
- Incorrect heading hierarchy

**Fix issues:** See [Accessibility Guide](./docs/06-features/ACCESSIBILITY.md)

---

### ☐ 10. Test Mobile Responsiveness (5 min)

**Action:** Verify site works on mobile devices.

**Test checklist:**
- [ ] Navigation menu opens/closes correctly
- [ ] Forms are usable (inputs large enough to tap)
- [ ] Text is readable (minimum 14px font size)
- [ ] Buttons are tappable (minimum 44px touch targets)
- [ ] Images scale correctly
- [ ] No horizontal scrolling

**How to test:**
1. Chrome DevTools → Device Mode (Cmd+Shift+M / Ctrl+Shift+M)
2. Test on iPhone SE (375px), iPhone 12 Pro (390px), iPad (768px)
3. Test real device if possible

---

### ☐ 11. Verify Design System Compliance (2 min)

**Action:** Check for hardcoded colors and design violations.

```bash
npm run scan:hex
```

**Expected output:**
```
✓ No hardcoded colors found
✓ Design system compliance verified
```

**If violations found:**
- Replace hex colors with CSS variables (e.g., `bg-primary` instead of `bg-blue-500`)
- See [Design System Reference](./docs/08-design/DESIGN_SYSTEM.md)

---

### ☐ 12. Performance Check (5 min)

**Action:** Verify Lighthouse performance score.

**Steps:**
1. Build production version: `npm run build`
2. Start production server: `npm start`
3. Run Lighthouse performance audit
4. Target scores:
   - **Performance:** 90+
   - **Accessibility:** 90+
   - **Best Practices:** 95+
   - **SEO:** 90+

**Common performance issues:**
- Large images (compress with tinypng.com or use Next.js Image)
- Unused JavaScript (audit with Lighthouse)
- Missing meta descriptions
- Slow server response time (check database queries)

---

## 🚀 Pre-Launch (Optional but Recommended)

### ☐ 13. Set Up Analytics (10 min)

**Options:**
- PostHog (privacy-friendly, included)
- Google Analytics
- Plausible
- Fathom

**PostHog (default):**
```bash
# Add to Vercel env vars
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Configuration:** `/src/lib/analytics.ts`

---

### ☐ 14. Configure Email Templates (15 min)

**Action:** Customize transactional email templates.

**Location:** `/src/components/email/`

**Templates to update:**
- Welcome email (`welcome-email.tsx`)
- Password reset (`password-reset-email.tsx`)
- Payment receipt (`payment-receipt-email.tsx`)
- Team invite (`team-invite-email.tsx`)

**Customizations:**
- Replace logo with your brand
- Update copy and tone
- Change colors to match brand (use inline styles)
- Test with Resend Email Testing API

**Documentation:** [Email Setup](./docs/06-features/EMAIL-SYSTEM.md)

---

### ☐ 15. Legal Pages (10 min)

**Action:** Update legal policies.

**Locations:**
```
/src/app/(marketing)/legal/privacy/page.tsx    # Privacy Policy
/src/app/(marketing)/legal/terms/page.tsx      # Terms of Service
/src/app/(marketing)/legal/refund/page.tsx     # Refund Policy
/src/app/(marketing)/legal/cookies/page.tsx    # Cookie Policy
```

**Requirements:**
- Include your company name and contact email
- Update last modified date
- Review data collection practices
- Consult lawyer for production use (templates are starting points only)

**Tools:**
- [Termly](https://termly.io) - Policy generator
- [iubenda](https://www.iubenda.com) - Compliance solution

---

### ☐ 16. Set Up Error Monitoring (10 min)

**Options:**
- Sentry (error tracking)
- LogRocket (session replay)
- Highlight.io (full-stack monitoring)

**Sentry setup:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs

# Add to Vercel env vars
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

**Configuration:** `sentry.client.config.js` and `sentry.server.config.js`

---

## 📋 Final Checklist

Before you ship, verify:

- [ ] ✅ Color theme selected and brand colors updated
- [ ] ✅ Logo and favicon replaced
- [ ] ✅ Site metadata (title, description, OG image) updated
- [ ] ✅ Landing page copy reflects your product
- [ ] ✅ Environment variables configured in Vercel
- [ ] ✅ Custom domain connected and DNS configured
- [ ] ✅ Payment provider configured and tested
- [ ] ✅ Accessibility audit passed (90+ score)
- [ ] ✅ Mobile responsiveness tested
- [ ] ✅ Design system compliance verified (`npm run scan:hex`)
- [ ] ✅ Performance audit passed (90+ score)
- [ ] ✅ Analytics configured (optional)
- [ ] ✅ Email templates customized (optional)
- [ ] ✅ Legal pages updated (optional but recommended)
- [ ] ✅ Error monitoring configured (optional)

---

## 🎉 You're Ready to Ship!

Once all required items are checked, you're ready to deploy to production.

**Final deployment:**
```bash
git add .
git commit -m "chore: production customization complete"
git push origin main

# Vercel auto-deploys on push to main
# Check deployment: https://vercel.com/dashboard
```

**Post-launch:**
- Monitor error rates (Sentry/error logs)
- Check analytics (PostHog/GA)
- Test payment flow with real transaction
- Monitor performance (Vercel Analytics)

---

## Need Help?

- **Customization issues:** [Customization Guide](./docs/08-design/CUSTOMIZATION-GUIDE.md)
- **Theme questions:** [Theme Guide](./docs/08-design/THEME-GUIDE.md)
- **Technical issues:** [Troubleshooting](./docs/01-getting-started/TROUBLESHOOTING.md)
- **Feature docs:** [Features Directory](./docs/06-features/)

**Questions not covered?** Open an issue or check the documentation.

---

**Time saved by using Fabrk:** ~200 hours of boilerplate development
**Time to customize:** ~30-45 minutes
**ROI:** Ship faster, focus on your unique value proposition 🚀
