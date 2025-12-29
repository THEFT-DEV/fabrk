'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

function CookieConsentDemo() {
  return (
    <div className="relative w-80">
      <Card className={cn('border-accent bg-card border', mode.radius)}>
        <div className={cn('border-border flex items-center justify-between border-b px-4 py-2')}>
          <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
            [0x09] COOKIE_POLICY
          </span>
          <button className={cn('text-xs', mode.state.hover.linkOpacity, mode.color.text.muted)}>✕</button>
        </div>
        <div className="space-y-4 px-4 py-2">
          <p className={cn('text-xs leading-relaxed', mode.font, mode.color.text.muted)}>
            &gt; We use cookies for analytics.{' '}
            <span className={cn('underline', mode.color.text.accent)}>Privacy</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" className={cn('flex-1 text-xs', mode.radius, mode.font)}>
              &gt; ACCEPT
            </Button>
            <Button size="sm" variant="outline" className={cn('text-xs', mode.radius, mode.font)}>
              CONFIG
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function CookieConsentPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.73]"
      category="Components"
      title="Cookie Consent"
      description="GDPR/Privacy compliance banner with granular consent preferences."
      importCode={`import { CookieConsent } from "@/components/ui/cookie-consent"`}
      mainPreview={{
        preview: <CookieConsentDemo />,
        code: `<CookieConsent
  onAccept={(preferences) => saveCookiePreferences(preferences)}
  privacyPolicyUrl="/privacy"
/>`,
      }}
      variants={[
        {
          title: 'Default Banner',
          description: 'Compact terminal-styled banner that appears at bottom-right.',
          preview: <CookieConsentDemo />,
          code: `<CookieConsent />`,
        },
        {
          title: 'With Callbacks',
          description: 'Handle accept/reject actions with callbacks.',
          preview: <CookieConsentDemo />,
          code: `<CookieConsent
  onAccept={(prefs) => saveCookiePreferences(prefs)}
  onReject={() => clearNonEssentialCookies()}
  privacyPolicyUrl="/privacy"
  cookiePolicyUrl="/cookies"
/>`,
        },
      ]}
      props={[
        {
          name: 'onAccept',
          type: '(preferences: CookiePreferences) => void',
          description: 'Called when user accepts cookies with their preferences.',
        },
        {
          name: 'onReject',
          type: '() => void',
          description: 'Called when user rejects all non-essential cookies.',
        },
        {
          name: 'privacyPolicyUrl',
          type: 'string',
          default: '"/privacy"',
          description: 'URL to privacy policy page.',
        },
        {
          name: 'cookiePolicyUrl',
          type: 'string',
          default: '"/cookies"',
          description: 'URL to cookie policy page.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ]}
      accessibility={[
        'Uses role="dialog" for screen reader announcement',
        'aria-live="polite" announces banner appearance',
        'aria-label describes the banner purpose',
        'Respects Do Not Track (DNT) browser setting',
        'Focus management for keyboard navigation',
        'Switch components for preference toggles have aria-labels',
      ]}
      previous={{ title: 'Alert', href: '/docs/components/alert' }}
      next={{ title: 'Loading', href: '/docs/components/loading' }}
    >
      <DocsSection title="Cookie Preferences">
        <DocsCard title="PREFERENCE TYPES">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold">[NECESSARY]</p>
              <p className="text-muted-foreground text-xs">
                Essential cookies required for the website to function. Always enabled.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold">[ANALYTICS]</p>
              <p className="text-muted-foreground text-xs">
                Help understand how visitors interact with the website.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold">[MARKETING]</p>
              <p className="text-muted-foreground text-xs">
                Track visitors across websites for relevant ads.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold">[PREFERENCES]</p>
              <p className="text-muted-foreground text-xs">
                Remember settings like theme, language, and region.
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Features">
        <DocsCard title="GDPR COMPLIANCE">
          <ul className="space-y-2">
            <li className="text-xs">• Granular consent via customize modal</li>
            <li className="text-xs">• Persists choices in localStorage and cookie (365 days)</li>
            <li className="text-xs">• Respects Do Not Track browser setting automatically</li>
            <li className="text-xs">• Links to privacy and cookie policies</li>
            <li className="text-xs">• Accept All / Reject All / Customize options</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
