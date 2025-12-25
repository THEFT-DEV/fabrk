'use client';

import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard, DocsPreview } from '@/components/docs';
import { CardHeader } from '@/components/ui/card';
import { Cookie, Shield, Settings, Download } from 'lucide-react';
import { useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Terminal-styled cookie consent preview
function CookieConsentDemo() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  return (
    <div className="border-border bg-card w-full max-w-md border">
      {/* Terminal Header */}
      <CardHeader code="0x00" title="COMPONENT" />

      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Cookie className="text-primary h-4 w-4" />
          <span className="font-mono text-xs font-semibold">[COOKIE PREFERENCES]</span>
        </div>

        <p className="text-muted-foreground font-mono text-xs">
          &gt; We use cookies to enhance your experience. Select your preferences:
        </p>

        <div className="space-y-2">
          {[
            { key: 'necessary', label: 'NECESSARY', locked: true },
            { key: 'preferences', label: 'PREFERENCES', locked: false },
            { key: 'statistics', label: 'STATISTICS', locked: false },
            { key: 'marketing', label: 'MARKETING', locked: false },
          ].map((item) => (
            <div
              key={item.key}
              className="border-border bg-background flex items-center justify-between border p-2"
            >
              <span className="font-mono text-xs">{item.label}</span>
              <button
                onClick={() =>
                  !item.locked &&
                  setPreferences((p) => ({
                    ...p,
                    [item.key]: !p[item.key as keyof typeof p],
                  }))
                }
                className={`border px-2 py-0.5 font-mono text-xs ${
                  preferences[item.key as keyof typeof preferences]
                    ? 'border-success text-success'
                    : 'border-border text-muted-foreground'
                } ${item.locked ? 'cursor-not-allowed opacity-50' : cn(mode.state.hover.card, 'cursor-pointer')}`}
                disabled={item.locked}
              >
                {preferences[item.key as keyof typeof preferences] ? '[ON]' : '[OFF]'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className={cn('border-border bg-background flex-1 border px-4 py-2 font-mono text-xs transition-colors', mode.state.hover.card)}>
            &gt; REJECT ALL
          </button>
          <button className="border-primary bg-primary text-primary-foreground flex-1 border px-4 py-2 font-mono text-xs">
            &gt; ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsentPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Features"
      title="Cookie Consent GDPR"
      description="GDPR-compliant cookie banner with Google Consent Mode v2 integration."
      overview="If your app has users in Europe, you're legally required to ask permission before tracking them with cookies. This component handles that for you. Think of it like asking guests if they want coffee before pouring - some want it (marketing cookies), some don't (privacy-focused users). This lets them choose."
      features={[
        {
          icon: Shield,
          title: 'Legal Compliance',
          description:
            'GDPR (Europe), CCPA (California), and other privacy regulations. Fines up to 4% of annual revenue for violations.',
        },
        {
          icon: Cookie,
          title: 'Google Consent Mode v2',
          description:
            'Required since March 2024 for Google Ads remarketing and Analytics features.',
        },
        {
          icon: Settings,
          title: 'Granular Control',
          description:
            'Four cookie categories: Necessary (always on), Preferences, Statistics, and Marketing.',
        },
        {
          icon: Download,
          title: 'Data Export',
          description: "Built-in 'Download My Data' button for GDPR right to access compliance.",
        },
      ]}
      setup={[
        {
          title: 'Already Included',
          description: 'The cookie consent component is already in your layout. No setup required!',
          code: `// Already in src/app/layout.tsx
import { CookieConsent } from "@/components/cookie-consent";
import { CardHeader } from "@/components/ui/card";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsent />  {/* Automatically shows for new visitors */}
      </body>
    </html>
  );
}`,
          language: 'tsx',
        },
      ]}
      usage={[
        {
          title: 'Google Tag Manager Integration',
          description: 'The component automatically integrates with Google Consent Mode v2',
          code: `// Automatically called when user saves preferences
gtag("consent", "update", {
  ad_storage: marketing ? "granted" : "denied",
  ad_user_data: marketing ? "granted" : "denied",
  ad_personalization: marketing ? "granted" : "denied",
  analytics_storage: statistics ? "granted" : "denied",
  functionality_storage: preferences ? "granted" : "denied",
  personalization_storage: marketing ? "granted" : "denied",
});

// Event also pushed for GTM triggers
dataLayer.push({
  event: "cookie_consent_update",
  cookie_consent: { necessary, preferences, statistics, marketing }
});`,
          language: 'typescript',
        },
        {
          title: 'Add/Remove Cookie Categories',
          description: 'Edit the categories in src/components/cookie-consent/tabs.tsx',
          code: `// In DetailsTabContent function
const categories: CookieCategory[] = [
  {
    id: "necessary",
    name: "Necessary",
    description: "Essential for website functionality.",
    required: true,  // Cannot be disabled
    cookies: [
      {
        name: "cookie-consent",
        description: "Stores your cookie preferences",
        duration: "1 year",
      },
      // Add your cookies here
    ],
  },
  // Add more categories...
];`,
          language: 'typescript',
        },
        {
          title: 'Change Consent Duration',
          description:
            'By default, consent is valid for 1 year. Edit in src/components/cookie-consent/index.tsx',
          code: `// In getInitialPreferences function
const daysSinceConsent = Math.floor(
  (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
);
if (daysSinceConsent < 365) {  // Change 365 to your desired days
  return { preferences: JSON.parse(consent), showButton: false };
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'SEO', href: '/docs/features/seo' }}
      next={{ title: 'Trial', href: '/docs/features/trial' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Next.js project set up and running</li>
            <li className="font-mono text-xs">├─ Components installed (included in Fabrk)</li>
            <li className="font-mono text-xs">
              ├─ Optional: Google Tag Manager account for analytics integration
            </li>
            <li className="font-mono text-xs">└─ No additional dependencies required</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Component Variants */}
      <DocsSection title="Component Variants">
        {/* Full Version */}
        <DocsCard title="FULL VERSION (COOKIE ICON)">
          <p className="text-muted-foreground mb-4 text-sm">
            Banner with cookie icon and text. Opens comprehensive modal with tabs when clicked. Best
            for main app layout.
          </p>
          <div className="bg-muted/50 mb-4 p-4">
            <code className="font-mono text-xs">
              {`import { CookieConsent } from "@/components/cookie-consent";

// Default bannerVariant is "full"
<CookieConsent />

// Or explicitly:
<CookieConsent bannerVariant="full" />`}
            </code>
          </div>
        </DocsCard>

        <DocsPreview
          title="Full Version Preview"
          description="Interactive cookie preference modal (same modal for both variants)"
          preview={<CookieConsentDemo />}
          code={`import { CookieConsent } from "@/components/cookie-consent";

// Already included in layout.tsx
<CookieConsent />`}
        />

        {/* Minimal Banner */}
        <DocsCard title="MINIMAL VERSION (TERMINAL TEXT)">
          <p className="text-muted-foreground mb-4 text-sm">
            Compact terminal-styled banner. Opens the same modal as full version when clicked. Best
            for marketing pages. Currently used in marketing layout.
          </p>
          <div className="bg-muted/50 mb-4 p-4">
            <code className="font-mono text-xs">
              {`import { CookieConsent } from "@/components/cookie-consent";

// Use minimal banner style
<CookieConsent bannerVariant="minimal" />`}
            </code>
          </div>
        </DocsCard>

        <DocsPreview
          title="Minimal Banner Preview"
          description="Compact terminal-styled banner (as seen on this page)"
          preview={
            <div className="border-border bg-card relative h-48 w-full border">
              <div className="absolute right-6 bottom-6 z-[60]">
                <div className="bg-card border-accent flex items-center gap-2 border-2 px-4 py-2">
                  <span className="text-accent font-mono text-xs whitespace-nowrap">
                    [ (0xB7) COOKIE_SETTINGS.CFG ]
                  </span>
                  <button className="text-accent" aria-label="Dismiss">
                    <span className="font-mono text-sm">✕</span>
                  </button>
                </div>
              </div>
            </div>
          }
          code={`import { CookieConsent } from "@/components/cookie-consent";

// In marketing layout:
<CookieConsent bannerVariant="minimal" />`}
        />
      </DocsSection>

      {/* How It Works Section */}
      <DocsSection title="How It Works">
        <div className="space-y-4">
          <DocsCard title="STEP 01">
            <div className="mb-2 flex items-center gap-4">
              <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center font-mono font-semibold">
                1
              </span>
              First Visit
            </div>
            <p className="mb-6">
              New visitors see a &quot;Cookie Settings&quot; button in the bottom-right corner. All
              non-essential cookies are blocked until they make a choice.
            </p>
          </DocsCard>
          <DocsCard title="STEP 02">
            <div className="mb-2 flex items-center gap-4">
              <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center font-mono font-semibold">
                2
              </span>
              User Makes Choice
            </div>
            <p className="mb-6">
              Clicking the button opens a modal with three tabs: Consent (quick toggles), Details
              (see exactly which cookies), and About (their privacy rights).
            </p>
          </DocsCard>
          <DocsCard title="STEP 03">
            <div className="mb-2 flex items-center gap-4">
              <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center font-mono font-semibold">
                3
              </span>
              Choice Saved
            </div>
            <p className="mb-6">
              Their preference is stored in localStorage for 1 year. Google Consent Mode is updated
              automatically, enabling/disabling analytics and ads accordingly.
            </p>
          </DocsCard>
          <DocsCard title="STEP 04">
            <div className="mb-2 flex items-center gap-4">
              <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center font-mono font-semibold">
                4
              </span>
              Return Visits
            </div>
            <p className="mb-6">
              The banner doesn&apos;t show again (unless they clear storage). Their saved
              preferences are applied immediately on page load.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Cookie Categories Section */}
      <DocsSection title="Cookie Categories">
        <DocsCard title="COOKIE CATEGORIES">
          <div className="space-y-4">
            <div className="bg-muted/50 flex items-start gap-4 p-4">
              <div className="bg-success mt-1 h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Necessary (Always On)</p>
                <p className="mb-6">
                  Essential for the site to work. Includes session cookies and consent storage.
                  Cannot be disabled.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 flex items-start gap-4 p-4">
              <div className="bg-info mt-1 h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Preferences</p>
                <p className="mb-6">
                  Remember settings like theme (dark/light) and language. Off by default.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 flex items-start gap-4 p-4">
              <div className="bg-warning mt-1 h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Statistics</p>
                <p className="mb-6">
                  Google Analytics and similar tools. Helps you understand how people use your app.
                  Off by default.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 flex items-start gap-4 p-4">
              <div className="bg-destructive mt-1 h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Marketing</p>
                <p className="mb-6">
                  Facebook Pixel, Google Ads conversion tracking. Used for targeted advertising. Off
                  by default.
                </p>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Common Questions Section */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Do I need this if I don&apos;t have EU users?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                Technically no, but it&apos;s good practice. California (CCPA), Brazil (LGPD), and
                other regions have similar requirements. Plus, Google requires Consent Mode v2 for
                personalized ads even in the US.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Why do I need Consent Mode v2 for Google?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                As of March 2024, Google requires Consent Mode v2 for any site that uses Google Ads
                remarketing or audience features. Without it, your ads may not work properly and you
                could lose audience data.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Can I change the button position?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                Yes! In <code className="bg-muted px-1 font-mono">cookie-consent.tsx</code>, find
                the button element and change the Tailwind classes. It&apos;s currently{' '}
                <code className="bg-muted px-1 font-mono">bottom-6 right-6</code>. Change to{' '}
                <code className="bg-muted px-1 font-mono">bottom-6 left-6</code> for bottom-left,
                etc.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              What if the user never makes a choice?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                All non-essential cookies remain blocked. The button stays visible on every page
                until they interact with it. This is the GDPR-compliant default.
              </p>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Testing Section */}
      <DocsSection title="Testing">
        <DocsCard title="TESTING GUIDE">
          Manual Testing
          <ol className="list-inside list-decimal space-y-2">
            <li>Open your app in a private/incognito window</li>
            <li>You should see the &quot;Cookie Settings&quot; button (bottom-right)</li>
            <li>Click it and test each action: Accept All, Reject All, Accept Selected</li>
            <li>Refresh the page - banner should not reappear</li>
            <li>
              Open DevTools → Application → Local Storage → look for{' '}
              <code className="bg-muted px-1 font-mono">cookie-consent</code>
            </li>
          </ol>
          Verify GTM Integration
          <ol className="list-inside list-decimal space-y-2">
            <li>Open DevTools → Console</li>
            <li>
              Type <code className="bg-muted px-1 font-mono">dataLayer</code> and press Enter
            </li>
            <li>
              Look for <code className="bg-muted px-1 font-mono">cookie_consent_update</code> events
            </li>
            <li>Check that consent states match your selections</li>
          </ol>
        </DocsCard>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/analytics"
            title="Analytics"
            description="Set up PostHog analytics that respects consent."
          />
          <DocsLinkCard
            href="/docs/security/headers"
            title="Security Headers"
            description="Configure CSP and other security headers."
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
