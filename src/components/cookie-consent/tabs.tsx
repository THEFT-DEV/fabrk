'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import type {
  AboutTabContentProps,
  ConsentTabContentProps,
  CookieCategory,
  DetailsTabContentProps,
} from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function ConsentTabContent({
  preferences,
  setPreferences,
  acceptAll,
  acceptSelected,
  rejectAll,
}: ConsentTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className={cn('bg-muted flex items-center justify-between border p-4', mode.radius)}>
          <div className="flex-1">
            <h4 className={cn('text-foreground text-sm leading-tight font-semibold', mode.font)}>
              NECESSARY_COOKIES
            </h4>
            <p className={cn('text-muted-foreground mt-1 text-xs leading-relaxed', mode.font)}>
              Essential for website functionality. Cannot be disabled.
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>

        <div className={cn('flex items-center justify-between border p-4', mode.radius)}>
          <div className="flex-1">
            <h4 className={cn('text-foreground text-sm leading-tight font-semibold', mode.font)}>
              PREFERENCE_COOKIES
            </h4>
            <p className={cn('text-muted-foreground mt-1 text-xs leading-relaxed', mode.font)}>
              Remember your settings and preferences.
            </p>
          </div>
          <Switch
            checked={preferences.preferences}
            onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
          />
        </div>

        <div className={cn('flex items-center justify-between border p-4', mode.radius)}>
          <div className="flex-1">
            <h4 className={cn('text-foreground text-sm leading-tight font-semibold', mode.font)}>
              STATISTICS_COOKIES
            </h4>
            <p className={cn('text-muted-foreground mt-1 text-xs leading-relaxed', mode.font)}>
              Help us understand how visitors interact with our website.
            </p>
          </div>
          <Switch
            checked={preferences.statistics}
            onCheckedChange={(checked) => setPreferences({ ...preferences, statistics: checked })}
          />
        </div>

        <div className={cn('flex items-center justify-between border p-4', mode.radius)}>
          <div className="flex-1">
            <h4 className={cn('text-foreground text-sm leading-tight font-semibold', mode.font)}>
              MARKETING_COOKIES
            </h4>
            <p className={cn('text-muted-foreground mt-1 text-xs leading-relaxed', mode.font)}>
              Used to track visitors across websites for relevant advertising.
            </p>
          </div>
          <Switch
            checked={preferences.marketing}
            onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={acceptAll} className={cn('flex-1', mode.font)}>
          &gt; ACCEPT ALL
        </Button>
        <Button onClick={acceptSelected} variant="outline" className={cn('flex-1', mode.font)}>
          &gt; ACCEPT SELECTED
        </Button>
        <Button onClick={rejectAll} variant="outline" className={cn('flex-1', mode.font)}>
          &gt; REJECT ALL
        </Button>
      </div>
    </div>
  );
}

export function DetailsTabContent({ preferences, setPreferences }: DetailsTabContentProps) {
  const categories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Necessary',
      description: 'These cookies are essential for the website to function properly.',
      required: true,
      cookies: [
        {
          name: 'cookie-consent',
          description: 'Stores your cookie consent preferences',
          duration: '1 year',
        },
        {
          name: 'session-id',
          description: 'Maintains your session state',
          duration: 'Session',
        },
      ],
    },
    {
      id: 'preferences',
      name: 'Preferences',
      description: 'These cookies allow the website to remember your choices.',
      cookies: [
        {
          name: 'theme-preference',
          description: 'Remembers your theme choice (light/dark)',
          duration: '1 year',
        },
        {
          name: 'language',
          description: 'Stores your language preference',
          duration: '1 year',
        },
      ],
    },
    {
      id: 'statistics',
      name: 'Statistics',
      description: 'These cookies help us understand how visitors use our website.',
      cookies: [
        {
          name: '_ga',
          description: 'Google Analytics tracking cookie',
          duration: '2 years',
        },
        {
          name: '_gid',
          description: 'Google Analytics session cookie',
          duration: '24 hours',
        },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'These cookies are used to deliver relevant advertisements.',
      cookies: [
        {
          name: 'fbp',
          description: 'Facebook pixel tracking',
          duration: '3 months',
        },
        {
          name: '_gcl_au',
          description: 'Google Ads conversion tracking',
          duration: '3 months',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={cn('text-foreground text-sm leading-tight font-semibold', mode.font)}>
                [{category.name.toUpperCase()}]
              </h4>
              <p className={cn('text-muted-foreground text-xs leading-relaxed', mode.font)}>
                {category.description}
              </p>
            </div>
            <Switch
              checked={preferences[category.id]}
              disabled={category.required}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, [category.id]: checked })
              }
            />
          </div>
          <div className="space-y-2">
            {category.cookies.map((cookie) => (
              <div key={cookie.name} className="bg-muted !rounded-none border p-4">
                <div className="flex items-center justify-between">
                  <span className={cn('text-xs font-semibold', mode.font)}>{cookie.name}</span>
                  <span className={cn('text-muted-foreground text-xs font-normal', mode.font)}>
                    {cookie.duration}
                  </span>
                </div>
                <p
                  className={cn(
                    'text-muted-foreground mt-1 text-xs leading-relaxed font-normal',
                    mode.font
                  )}
                >
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutTabContent({}: AboutTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className={cn('mb-2 text-sm font-semibold', mode.font)}>WHAT ARE COOKIES</h4>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            Cookies are small text files that are placed on your device when you visit a website.
            They help the website remember information about your visit, which can make your next
            visit easier and the site more useful to you.
          </p>
        </div>

        <div>
          <h4 className={cn('mb-2 text-sm font-semibold', mode.font)}>HOW WE USE COOKIES</h4>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            We use different types of cookies for various purposes, including improving your
            browsing experience, analyzing site traffic, and serving personalized content or ads.
          </p>
        </div>

        <div>
          <h4 className={cn('mb-2 text-sm font-semibold', mode.font)}>YOUR RIGHTS</h4>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            Under GDPR and other privacy regulations, you have the right to:
          </p>
          <ul
            className={cn(
              'text-muted-foreground mt-2 list-inside list-disc space-y-1 text-xs',
              mode.font
            )}
          >
            <li>Access the personal data we hold about you</li>
            <li>Correct any inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>

        <div className="bg-primary/10 !rounded-none border p-4">
          <h4 className={cn('text-primary text-sm font-semibold', mode.font)}>GDPR COMPLIANT</h4>
          <p className={cn('text-primary/80 mt-1 text-xs', mode.font)}>
            Our cookie policy and consent management comply with GDPR requirements.
          </p>
        </div>

        <div>
          <h4 className={cn('mb-2 text-sm font-semibold', mode.font)}>CONTACT US</h4>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            If you have questions about our use of cookies or your privacy rights, please contact us
            at support@fabrk.dev
          </p>
        </div>
      </div>
    </div>
  );
}
