/**
 * Refund Policy Page
 * No refunds policy for digital product - Terminal Console Style
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import {
  FileText,
  Ban,
  ShoppingBag,
  Package,
  HeadphonesIcon,
  AlertTriangle,
  Scale,
  Shield,
  RefreshCw,
  HelpCircle,
  Gavel,
  CheckCircle,
} from 'lucide-react';

export default function RefundPage() {
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
          <Badge code="0x00" label="LEGAL" meta="REFUND POLICY" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>FABRK LEGAL:</h1>
          <h2 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>REFUND POLICY</h2>
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

      {/* Introduction - Danger Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <Card size="auto" tone="danger">
          <CardHeader code="0x01" title="NOTICE" icon={<AlertTriangle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-foreground text-xs', mode.font)}>
              <span className="text-destructive font-semibold">ALL SALES ARE FINAL.</span> Due to
              the nature of digital products, no refunds, exchanges, or credits are available.
              Please review this policy carefully before purchasing.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <Card size="auto">
          <CardHeader code="0x10" title="NO REFUNDS POLICY" icon={<Ban className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Once you gain access to the Fabrk source code and download the files, no refunds are
              available under any circumstances.
            </p>
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              By completing your purchase, you acknowledge that digital products cannot be
              &quot;returned&quot; once downloaded. This is standard for digital products and
              software licenses.
            </p>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card size="auto">
          <CardHeader code="0x20" title="WHY NO REFUNDS" icon={<FileText className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Unlike physical products, digital products provide immediate value upon download:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ Instant access to complete source code</li>
              <li>├─ Immediate ability to copy, modify, and use</li>
              <li>├─ Digital products cannot be &quot;returned&quot;</li>
              <li>└─ No way to verify code wasn&apos;t copied before refund request</li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              This policy protects business integrity and ensures fair pricing for all customers.
            </p>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card size="auto">
          <CardHeader
            code="0x30"
            title="BEFORE YOU PURCHASE"
            icon={<ShoppingBag className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We encourage you to thoroughly review Fabrk before purchasing:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ Review the{' '}
                <Link href="/features" className="text-primary hover:underline">
                  &gt; VIEW FEATURES
                </Link>
              </li>
              <li>
                ├─ Browse the{' '}
                <Link href="/docs" className="text-primary hover:underline">
                  &gt; VIEW DOCS
                </Link>
              </li>
              <li>├─ Check tech stack and integrations</li>
              <li>
                └─ Contact{' '}
                <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
                  support@fabrk.dev
                </a>{' '}
                with questions
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              We want you to be fully informed before you buy.
            </p>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card size="auto">
          <CardHeader code="0x40" title="WHAT YOU GET" icon={<Package className="size-4" />} />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  [ [0x41] IMMEDIATE ACCESS ]
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Instant download of complete source code</li>
                  <li>├─ Lifetime license (v1.x updates included)</li>
                  <li>├─ Access to 100+ production-ready components</li>
                  <li>└─ Complete documentation and setup guides</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  [ [0x42] ONGOING BENEFITS ]
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ All future v1.x updates at no cost</li>
                  <li>├─ Email support for technical questions</li>
                  <li>└─ New components and features as released</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card size="auto">
          <CardHeader
            code="0x50"
            title="TECHNICAL SUPPORT"
            icon={<HeadphonesIcon className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              While we don&apos;t offer refunds, we provide comprehensive support:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">[EMAIL]:</span> support@fabrk.dev for
                technical questions
              </li>
              <li>
                ├─ <span className="text-foreground">[DOCS]:</span> 400KB+ of guides and examples
              </li>
              <li>
                ├─ <span className="text-foreground">[MAINTENANCE]:</span> Active bug fixes and
                improvements
              </li>
              <li>
                └─ <span className="text-foreground">[COMMUNITY]:</span> Connect with other Fabrk
                users
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              Our goal is to ensure you can successfully use Fabrk for your projects.
            </p>
          </CardContent>
        </Card>

        {/* Section 6 - Danger Card */}
        <Card size="auto" tone="danger">
          <CardHeader code="0x60" title="CHARGEBACKS" icon={<AlertTriangle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-foreground mb-4 text-xs', mode.font)}>
              <span className="text-destructive font-semibold">WARNING:</span> Initiating a
              chargeback for a valid purchase is considered fraudulent activity.
            </p>
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
              Filing a chargeback instead of contacting us about legitimate issues:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-destructive">✗</span> Costs significant processing fees
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Immediate license termination
              </li>
              <li>
                ├─ <span className="text-destructive">✗</span> Banned from future purchases
              </li>
              <li>
                └─ <span className="text-destructive">✗</span> Dispute will be contested with
                documentation
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              Have concerns? Contact support@fabrk.dev first. We&apos;re here to help resolve
              legitimate issues.
            </p>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card size="auto">
          <CardHeader code="0x70" title="EU CONSUMER RIGHTS" icon={<Scale className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              EU consumers have a 14-day withdrawal right under the Consumer Rights Directive
              (2011/83/EU).
            </p>
            <p className={cn('text-foreground mb-4 text-xs', mode.font)}>
              <span className="text-warning font-semibold">HOWEVER:</span> By downloading
              immediately after purchase, you expressly waive this right, as you requested immediate
              delivery of digital content.
            </p>
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              This waiver is required under Article 16(m) of the Consumer Rights Directive.
            </p>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card size="auto">
          <CardHeader code="0x80" title="EXCEPTIONS" icon={<Shield className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We may issue refunds at our sole discretion in rare cases:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">[TECHNICAL IMPOSSIBILITY]:</span> Product
                fundamentally cannot work as described (our error)
              </li>
              <li>
                ├─ <span className="text-foreground">[DUPLICATE CHARGES]:</span> Accidentally
                charged multiple times
              </li>
              <li>
                └─ <span className="text-foreground">[SERVICE FAILURE]:</span> Failed to deliver
                access within 7 days
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              Exceptions require documented proof and case-by-case evaluation. Contact
              support@fabrk.dev with details.
            </p>
          </CardContent>
        </Card>

        {/* Section 9 - Governing Law */}
        <Card size="auto">
          <CardHeader code="0x90" title="GOVERNING LAW" icon={<Scale className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              This refund policy is governed by the laws of the Netherlands. Fabrk is operated by a
              Dutch BV (besloten vennootschap) registered in the Netherlands.
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">[JURISDICTION]:</span> Amsterdam, Netherlands
              </li>
              <li>
                ├─ <span className="text-foreground">[APPLICABLE LAW]:</span> Dutch law
              </li>
              <li>
                └─ <span className="text-foreground">[LANGUAGE]:</span> English (binding version)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 10 - Dispute Resolution */}
        <Card size="auto">
          <CardHeader code="0xA0" title="DISPUTE RESOLUTION" icon={<Gavel className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We encourage resolving disputes informally first. Contact support@fabrk.dev before
              initiating formal proceedings.
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">[STEP 1]:</span> Contact support within 30 days
                of issue
              </li>
              <li>
                ├─ <span className="text-foreground">[STEP 2]:</span> We respond within 5 business
                days
              </li>
              <li>
                └─ <span className="text-foreground">[STEP 3]:</span> If unresolved, disputes
                subject to courts of Amsterdam
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              EU consumers may also use the EU Online Dispute Resolution platform at{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </CardContent>
        </Card>

        {/* Section 11 - Acceptance */}
        <Card size="auto">
          <CardHeader code="0xB0" title="ACCEPTANCE" icon={<CheckCircle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              By completing your purchase, you explicitly acknowledge and agree to:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ You have read and understood this refund policy</li>
              <li>├─ You accept that all sales are final for digital products</li>
              <li>├─ You waive the 14-day EU withdrawal right upon download</li>
              <li>├─ You consent to immediate delivery of digital content</li>
              <li>└─ You agree to the governing law and dispute resolution terms</li>
            </ul>
            <p className={cn('text-foreground mt-4 text-xs', mode.font)}>
              <span className="text-warning font-semibold">NOTE:</span> Checkout includes a
              mandatory checkbox confirming acceptance of these terms.
            </p>
          </CardContent>
        </Card>

        {/* Section 12 - Policy Updates */}
        <Card size="auto">
          <CardHeader code="0xC0" title="POLICY UPDATES" icon={<RefreshCw className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              We may modify this policy at any time. Your purchase is governed by the policy in
              effect at time of purchase.
            </p>
          </CardContent>
        </Card>

        {/* Section 13 - Questions */}
        <Card size="auto">
          <CardHeader code="0xD0" title="QUESTIONS" icon={<HelpCircle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Have questions about this policy or Fabrk?
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">[PRE PURCHASE]:</span>{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  &gt; CONTACT
                </Link>{' '}
                or support@fabrk.dev
              </li>
              <li>
                ├─ <span className="text-foreground">[TECHNICAL]:</span> support@fabrk.dev
              </li>
              <li>
                └─ <span className="text-foreground">[LEGAL]:</span> support@fabrk.dev
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              Please reach out before buying if you have any concerns.
            </p>
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
            code="0xE0"
            title="RELATED DOCUMENTS"
            icon={<FileText className="size-4" />}
          />
          <CardContent padding="md">
            <div className={cn('flex flex-wrap gap-4 text-xs', mode.font)}>
              <Link href="/terms" className="text-primary hover:underline">
                &gt; VIEW TERMS
              </Link>
              <Link href="/privacy" className="text-primary hover:underline">
                &gt; VIEW PRIVACY
              </Link>
              <Link href="/cookies" className="text-primary hover:underline">
                &gt; VIEW COOKIES
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
