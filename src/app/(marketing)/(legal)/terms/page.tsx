/**
 * Terms of Service Page
 * Legal agreement between Fabrk and users - Terminal Console Style
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import {
  FileText,
  Shield,
  Scale,
  Users,
  CreditCard,
  Ban,
  AlertTriangle,
  RefreshCw,
  Gavel,
  Globe,
  Bell,
  Mail,
} from 'lucide-react';

export default function TermsPage() {
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
          <Badge code="0x00" label="LEGAL" meta="TERMS OF SERVICE" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>FABRK LEGAL:</h1>
          <h2 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>
            TERMS OF SERVICE
          </h2>
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
          <CardHeader code="0x01" title="NOTICE" icon={<FileText className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              Please read these Terms of Service carefully before purchasing or using Fabrk. By
              accessing or using our Service, you acknowledge that you have read, understood, and
              agree to be bound by these terms.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <Card size="auto">
          <CardHeader code="0x10" title="AGREEMENT TO TERMS" icon={<Scale className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              By accessing, purchasing, or using Fabrk (&quot;Service&quot;, &quot;Product&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you (&quot;Buyer&quot;,
              &quot;User&quot;, &quot;you&quot;) agree to be bound by these Terms of Service
              (&quot;Terms&quot;).
            </p>
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              Fabrk is a product offered by THEFT BV, a company registered in the Netherlands (KVK:
              81705344, VAT: NL862188726B01). These Terms constitute a legal agreement between you
              and THEFT BV.
            </p>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card size="auto">
          <CardHeader
            code="0x20"
            title="DESCRIPTION OF SERVICE"
            icon={<FileText className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Fabrk is an enterprise-grade Next.js 15 SaaS boilerplate providing 100
              production-ready components, authentication, payment processing, database integration,
              multi-tenancy, and more.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [2.1] PERPETUAL LICENSE GRANT
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  Upon successful payment of €299 per developer seat, we grant you a non-exclusive,
                  non-transferable, perpetual license to:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Access and download the complete Fabrk source code</li>
                  <li>├─ Use the source code for unlimited commercial and personal projects</li>
                  <li>├─ Modify, customize, and extend the code for your own use</li>
                  <li>├─ Deploy unlimited applications built with Fabrk</li>
                  <li>├─ Receive all v1.x updates at no additional cost</li>
                  <li>└─ Use Fabrk components in client projects</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [2.1.1] PER SEAT LICENSE
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  One license permits one natural person (developer) to access and use the Fabrk
                  source code. For teams:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Purchase one license per developer with code access</li>
                  <li>├─ Licenses may be reassigned permanently</li>
                  <li>└─ May not be used concurrently by multiple individuals</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [2.2] LICENSE RESTRICTIONS
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  You are expressly PROHIBITED from:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-destructive">✗</span> Reselling, redistributing, or
                    sharing the source code
                  </li>
                  <li>
                    ├─ <span className="text-destructive">✗</span> Creating derivative boilerplate
                    products for sale
                  </li>
                  <li>
                    ├─ <span className="text-destructive">✗</span> Claiming the code as your own
                    original creation
                  </li>
                  <li>
                    ├─ <span className="text-destructive">✗</span> Building competing boilerplate
                    products
                  </li>
                  <li>
                    ├─ <span className="text-destructive">✗</span> Removing copyright notices or
                    license files
                  </li>
                  <li>
                    └─ <span className="text-destructive">✗</span> Sharing account credentials
                  </li>
                </ul>
                <p className={cn('text-destructive mt-2 text-xs', mode.font)}>
                  Violation results in immediate license termination and may subject you to legal
                  action.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card size="auto">
          <CardHeader code="0x30" title="USER ACCOUNTS" icon={<Users className="size-4" />} />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [3.1] ACCOUNT SECURITY
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Provide accurate, current information during registration</li>
                  <li>├─ Maintain security of your account credentials</li>
                  <li>├─ Notify us immediately of unauthorized access</li>
                  <li>├─ Accept responsibility for all account activities</li>
                  <li>└─ Never share credentials with third parties</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [3.2] ACCOUNT TERMINATION
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  We may terminate your account for:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Violation of these Terms</li>
                  <li>├─ Fraudulent or illegal activity</li>
                  <li>├─ Sharing or redistributing source code</li>
                  <li>├─ Bad faith chargebacks</li>
                  <li>└─ Security threats or unauthorized access attempts</li>
                </ul>
                <p className={cn('text-muted-foreground mt-2 text-xs', mode.font)}>
                  Termination does not entitle you to a refund under any circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card size="auto">
          <CardHeader code="0x40" title="PAYMENT TERMS" icon={<CreditCard className="size-4" />} />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>[4.1] PRICING</h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Current price:{' '}
                  <span className="text-foreground font-semibold">€299 per developer seat</span>{' '}
                  (one-time payment, lifetime license, no recurring fees).
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [4.2] PAYMENT PROCESSING
                </h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Payments processed via Polar and/or Stripe. By completing purchase, you authorize
                  the charge and acknowledge this is a final sale of a digital product with no
                  refunds.
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [4.3] NO REFUNDS POLICY
                </h3>
                <div
                  className={cn(
                    'border-destructive/30 bg-destructive/5 mt-2 border p-4',
                    mode.radius
                  )}
                >
                  <p className={cn('text-foreground text-xs', mode.font)}>
                    <span className="text-destructive font-semibold">ALL SALES ARE FINAL.</span>{' '}
                    Once you gain access to the source code, no refunds, exchanges, or credits are
                    available. Digital products cannot be &quot;returned&quot; once downloaded.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card size="auto">
          <CardHeader
            code="0x50"
            title="INTELLECTUAL PROPERTY"
            icon={<Shield className="size-4" />}
          />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>[5.1] FABRK IP</h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  All source code, components, templates, documentation remain exclusive property of
                  Fabrk. Your purchase grants a license to use, not ownership.
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>[5.2] YOUR CONTENT</h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  You retain full ownership of applications and products you create using Fabrk as a
                  foundation. We claim no rights to your custom applications.
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [5.3] THIRD PARTY DEPS
                </h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Fabrk uses open-source libraries (Next.js, React, Prisma, etc.) subject to their
                  own licenses. You are responsible for compliance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card size="auto">
          <CardHeader code="0x60" title="PROHIBITED USES" icon={<Ban className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
              You agree NOT to use Fabrk to:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-destructive">✗</span> Violate any laws or regulations
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Infringe intellectual property rights
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Transmit malware or harmful code
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Engage in fraud or deceptive
                practices
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Harass, abuse, or harm others
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Collect data without proper consent
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Interfere with our systems
              </li>
              <li>
                └─ <span className="text-destructive">✗</span> Facilitate illegal activities
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card size="auto">
          <CardHeader
            code="0x70"
            title="DISCLAIMERS LIABILITY"
            icon={<AlertTriangle className="size-4" />}
          />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>[7.1] AS IS BASIS</h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  FABRK IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
                  WARRANTIES OF ANY KIND, INCLUDING MERCHANTABILITY, FITNESS FOR PURPOSE,
                  NON-INFRINGEMENT, OR ERROR-FREE OPERATION.
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [7.2] LIMITATION OF LIABILITY
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  FABRK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, INCLUDING:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Loss of profits, revenue, data, or business</li>
                  <li>├─ Damages from errors, bugs, or security vulnerabilities</li>
                  <li>├─ Damages from third-party services</li>
                  <li>└─ Damages from unauthorized access</li>
                </ul>
                <p className={cn('text-foreground mt-2 text-xs', mode.font)}>
                  TOTAL LIABILITY: Maximum of €299 (amount paid for license).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card size="auto">
          <CardHeader
            code="0x80"
            title="UPDATES VERSIONING"
            icon={<RefreshCw className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Your perpetual license includes lifetime access to all v1.x updates (bug fixes,
              security patches, new components, documentation).
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ Updates delivered via GitHub repository access</li>
              <li>├─ Major versions (v2.0+) may be separate products</li>
              <li>└─ No guarantee of indefinite maintenance</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 9 */}
        <Card size="auto">
          <CardHeader code="0x90" title="INDEMNIFICATION" icon={<Gavel className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              You agree to indemnify and hold harmless Fabrk from claims arising from your use,
              violations of these Terms, violations of rights, and applications you build.
            </p>
          </CardContent>
        </Card>

        {/* Section 10 */}
        <Card size="auto">
          <CardHeader code="0xA0" title="GOVERNING LAW" icon={<Globe className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
              These Terms are governed by the laws of the Netherlands. Disputes shall be resolved in
              the courts of Apeldoorn, Netherlands.
            </p>
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              EU consumers retain all mandatory rights under EU consumer protection law.
            </p>
          </CardContent>
        </Card>

        {/* Section 11 */}
        <Card size="auto">
          <CardHeader code="0xB0" title="TERMS CHANGES" icon={<Bell className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              We may modify these Terms at any time. Material changes will be communicated with 30
              days&apos; notice. Continued use constitutes acceptance.
            </p>
          </CardContent>
        </Card>

        {/* Section 12 */}
        <Card size="auto">
          <CardHeader code="0xC0" title="CONTACT INFO" icon={<Mail className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Questions about these Terms?
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

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card size="auto">
          <CardHeader
            code="0xD0"
            title="RELATED DOCUMENTS"
            icon={<FileText className="size-4" />}
          />
          <CardContent padding="md">
            <div className={cn('flex flex-wrap gap-4 text-xs', mode.font)}>
              <Link href="/privacy" className="text-primary hover:underline">
                &gt; PRIVACY POLICY
              </Link>
              <Link href="/cookies" className="text-primary hover:underline">
                &gt; COOKIE POLICY
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
