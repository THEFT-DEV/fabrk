/**
 * Cookie Policy Page
 * How we use cookies and similar tracking technologies - Terminal Console Style
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield, Globe, RefreshCw, HelpCircle } from 'lucide-react';

export default function CookiesPage() {
  return (
    <main className={cn('container mx-auto max-w-4xl px-6 py-16', mode.font)}>
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge code="0x00" label="LEGAL" meta="COOKIE POLICY" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>FABRK LEGAL:</h1>
          <h2 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>COOKIE POLICY</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={cn('text-muted-foreground text-xs', mode.font)}>
            [LAST UPDATED]: November 26, 2025
          </span>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <Card size="auto">
          <CardHeader code="0x01" title="OVERVIEW" icon={<Cookie className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              This Cookie Policy explains how Fabrk uses cookies and similar technologies to
              recognize you when you visit our website.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <Card size="auto">
          <CardHeader code="0x10" title="WHAT ARE COOKIES" icon={<Cookie className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Cookies are small text files placed on your device when you visit a website. They are
              widely used to make websites work efficiently and provide information to website
              owners.
            </p>

            <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>[1.1] COOKIE TYPES</h3>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">SESSION:</span> Temporary, expire when browser
                closes
              </li>
              <li>
                ├─ <span className="text-foreground">PERSISTENT:</span> Remain until expiry or
                deletion
              </li>
              <li>
                ├─ <span className="text-foreground">FIRST PARTY:</span> Set by Fabrk directly
              </li>
              <li>
                └─ <span className="text-foreground">THIRD PARTY:</span> Set by external services
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card size="auto">
          <CardHeader code="0x20" title="COOKIES WE USE" icon={<Shield className="size-4" />} />
          <CardContent padding="md">
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div>
                <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>
                  [2.1] ESSENTIAL COOKIES (REQUIRED)
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
                <div
                  className={cn(
                    'border-border bg-background overflow-x-auto border p-4',
                    mode.radius
                  )}
                >
                  <table className={cn('w-full text-xs', mode.font)}>
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-muted-foreground py-2 pr-4 text-left">COOKIE NAME</th>
                        <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                        <th className="text-muted-foreground py-2 text-left">DURATION</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">next-auth.session-token</td>
                        <td className="py-2 pr-4">User authentication</td>
                        <td className="py-2">30 days</td>
                      </tr>
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">next-auth.csrf-token</td>
                        <td className="py-2 pr-4">CSRF protection</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr>
                        <td className="text-foreground py-2 pr-4">
                          __Secure-next-auth.callback-url
                        </td>
                        <td className="py-2 pr-4">OAuth callback</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Cookies */}
              <div>
                <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>
                  [2.2] FUNCTIONAL COOKIES (OPTIONAL)
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  These cookies enable enhanced functionality and personalization.
                </p>
                <div
                  className={cn(
                    'border-border bg-background overflow-x-auto border p-4',
                    mode.radius
                  )}
                >
                  <table className={cn('w-full text-xs', mode.font)}>
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-muted-foreground py-2 pr-4 text-left">COOKIE NAME</th>
                        <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                        <th className="text-muted-foreground py-2 text-left">DURATION</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">theme</td>
                        <td className="py-2 pr-4">Light/dark mode preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">color-scheme</td>
                        <td className="py-2 pr-4">Color scheme preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="text-foreground py-2 pr-4">locale</td>
                        <td className="py-2 pr-4">Language preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div>
                <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>
                  [2.3] ANALYTICS COOKIES (OPTIONAL)
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  These cookies help us understand how visitors use our website.
                </p>
                <div
                  className={cn(
                    'border-border bg-background overflow-x-auto border p-4',
                    mode.radius
                  )}
                >
                  <table className={cn('w-full text-xs', mode.font)}>
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-muted-foreground py-2 pr-4 text-left">SERVICE</th>
                        <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                        <th className="text-muted-foreground py-2 text-left">DURATION</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">Vercel Analytics</td>
                        <td className="py-2 pr-4">Page views, performance (anonymized)</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr>
                        <td className="text-foreground py-2 pr-4">Custom Analytics</td>
                        <td className="py-2 pr-4">Feature usage (anonymized)</td>
                        <td className="py-2">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div>
                <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>
                  [2.4] THIRD PARTY COOKIES
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  External services may set their own cookies:
                </p>
                <div
                  className={cn(
                    'border-border bg-background overflow-x-auto border p-4',
                    mode.radius
                  )}
                >
                  <table className={cn('w-full text-xs', mode.font)}>
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-muted-foreground py-2 pr-4 text-left">SERVICE</th>
                        <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                        <th className="text-muted-foreground py-2 text-left">POLICY</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-border/50 border-b">
                        <td className="text-foreground py-2 pr-4">Polar.sh</td>
                        <td className="py-2 pr-4">Payment processing</td>
                        <td className="py-2">
                          <a
                            href="https://polar.sh/legal/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            VIEW POLICY
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-foreground py-2 pr-4">Google OAuth</td>
                        <td className="py-2 pr-4">Authentication</td>
                        <td className="py-2">
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            VIEW POLICY
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card size="auto">
          <CardHeader code="0x30" title="MANAGE COOKIES" icon={<Settings className="size-4" />} />
          <CardContent padding="md">
            <div className="space-y-4">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [3.1] BROWSER SETTINGS
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  Most browsers allow you to control cookies:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ View and delete cookies individually</li>
                  <li>├─ Block third-party cookies</li>
                  <li>├─ Block cookies from specific websites</li>
                  <li>└─ Delete all cookies on browser close</li>
                </ul>
                <p className={cn('text-warning mt-2 text-xs', mode.font)}>
                  [WARNING]: Blocking essential cookies prevents login and core features.
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [3.2] BROWSER INSTRUCTIONS
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-foreground">CHROME:</span> Settings → Privacy → Cookies
                  </li>
                  <li>
                    ├─ <span className="text-foreground">FIREFOX:</span> Settings → Privacy →
                    Cookies
                  </li>
                  <li>
                    ├─ <span className="text-foreground">SAFARI:</span> Preferences → Privacy →
                    Manage Data
                  </li>
                  <li>
                    └─ <span className="text-foreground">EDGE:</span> Settings → Cookies and
                    permissions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [3.3] OPT OUT ANALYTICS
                </h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Opt-out via account settings or by enabling "Do Not Track" in your browser.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card size="auto">
          <CardHeader code="0x40" title="OTHER TRACKING" icon={<Globe className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
              In addition to cookies, we may use:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">LOCAL STORAGE:</span> Store preferences and app
                state
              </li>
              <li>
                ├─ <span className="text-foreground">SESSION STORAGE:</span> Temporary storage
                (cleared on tab close)
              </li>
              <li>
                └─ <span className="text-foreground">WEB BEACONS:</span> Small images for email
                tracking
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card size="auto">
          <CardHeader code="0x50" title="POLICY UPDATES" icon={<RefreshCw className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              We may update this Cookie Policy. Changes will be posted with an updated "Last
              Updated" date.
            </p>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card size="auto">
          <CardHeader code="0x60" title="QUESTIONS" icon={<HelpCircle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Questions about cookies?
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">EMAIL:</span> support@fabrk.dev
              </li>
              <li>
                └─ <span className="text-foreground">FORM:</span>{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  /contact
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Management Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card size="auto" tone="primary">
          <CardHeader
            code="0x70"
            title="MANAGE PREFERENCES"
            icon={<Settings className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              You&apos;ll see a cookie consent banner on first visit. Click below to update your
              preferences.
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-cookie-settings'));
              }}
              className="h-auto p-0 text-xs"
            >
              &gt; OPEN COOKIE SETTINGS
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Card size="auto">
          <CardHeader code="0x80" title="RELATED DOCUMENTS" />
          <CardContent padding="md">
            <div className={cn('flex flex-wrap gap-4 text-xs', mode.font)}>
              <Link href="/terms" className="text-primary hover:underline">
                &gt; TERMS OF SERVICE
              </Link>
              <Link href="/privacy" className="text-primary hover:underline">
                &gt; PRIVACY POLICY
              </Link>
              <Link href="/refund" className="text-primary hover:underline">
                &gt; REFUND POLICY
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
