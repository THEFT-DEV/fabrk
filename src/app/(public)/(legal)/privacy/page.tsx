/**
 * Privacy Policy Page
 * How we collect, use, and protect user data - Terminal Console Style
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import {
  Database,
  Scale,
  Share2,
  Lock,
  Clock,
  UserCheck,
  Cookie,
  Baby,
  Globe,
  RefreshCw,
  Mail,
  FileText,
} from 'lucide-react';

export default function PrivacyPage() {
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
          <Badge code="0x00" label="LEGAL" meta="PRIVACY POLICY" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>FABRK LEGAL:</h1>
          <h2 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>PRIVACY POLICY</h2>
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
          <CardHeader code="0x01" title="OVERVIEW" icon={<FileText className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              We value your privacy and are committed to protecting your personal data. This Privacy
              Policy explains how we collect, use, and safeguard your information.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-8">
        {/* Section 1 */}
        <Card size="auto">
          <CardHeader
            code="0x10"
            title="INFORMATION WE COLLECT"
            icon={<Database className="size-4" />}
          />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [1.1] INFORMATION YOU PROVIDE
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  When you use Fabrk, we collect information you provide directly:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-foreground">ACCOUNT INFO:</span> Name, email address,
                    password (hashed)
                  </li>
                  <li>
                    ├─ <span className="text-foreground">PAYMENT INFO:</span> Processed by Stripe
                    (we don't store full card details)
                  </li>
                  <li>
                    ├─ <span className="text-foreground">PROFILE DATA:</span> Optional profile
                    picture, bio, preferences
                  </li>
                  <li>
                    ├─ <span className="text-foreground">COMMUNICATIONS:</span> Support inquiries,
                    feedback, email correspondence
                  </li>
                  <li>
                    └─ <span className="text-foreground">GITHUB USERNAME:</span> Required for
                    granting repository access
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [1.2] AUTO COLLECTED INFO
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  We automatically collect certain information when you use our Service:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-foreground">USAGE DATA:</span> Pages visited, features
                    used, time spent
                  </li>
                  <li>
                    ├─ <span className="text-foreground">DEVICE INFO:</span> Browser type, OS,
                    device model
                  </li>
                  <li>
                    ├─ <span className="text-foreground">LOG DATA:</span> IP address, access times,
                    error logs
                  </li>
                  <li>
                    └─ <span className="text-foreground">COOKIES:</span> Session cookies, preference
                    cookies
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [1.3] THIRD PARTY DATA
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  If you authenticate via OAuth (Google, GitHub), we receive:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Your name and email address</li>
                  <li>├─ Profile picture (if provided)</li>
                  <li>└─ Account ID (for linking purposes)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card size="auto">
          <CardHeader
            code="0x20"
            title="HOW WE USE YOUR INFO"
            icon={<Scale className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We use collected information for:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">SERVICE PROVISION:</span> Account creation,
                authentication, service delivery
              </li>
              <li>
                ├─ <span className="text-foreground">PAYMENT PROCESSING:</span> Billing, invoices,
                subscription management
              </li>
              <li>
                ├─ <span className="text-foreground">COMMUNICATION:</span> Service updates, security
                alerts, support responses
              </li>
              <li>
                ├─ <span className="text-foreground">IMPROVEMENT:</span> Analyzing usage to improve
                features and performance
              </li>
              <li>
                ├─ <span className="text-foreground">SECURITY:</span> Fraud detection, abuse
                prevention, system security
              </li>
              <li>
                └─ <span className="text-foreground">LEGAL COMPLIANCE:</span> Meeting legal
                obligations, enforcing terms
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card size="auto">
          <CardHeader code="0x30" title="LEGAL BASIS GDPR" icon={<Scale className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Under GDPR, we process your data based on:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">CONTRACT:</span> Processing necessary to
                provide the Service you purchased
              </li>
              <li>
                ├─ <span className="text-foreground">CONSENT:</span> You've given explicit consent
                (e.g., marketing emails)
              </li>
              <li>
                ├─ <span className="text-foreground">LEGITIMATE INTEREST:</span> Necessary for our
                business operations
              </li>
              <li>
                └─ <span className="text-foreground">LEGAL OBLIGATION:</span> Required by law (e.g.,
                tax records)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card size="auto">
          <CardHeader
            code="0x40"
            title="DATA SHARING DISCLOSURE"
            icon={<Share2 className="size-4" />}
          />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [4.1] SERVICE PROVIDERS
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  We share data with trusted third parties:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-foreground">STRIPE:</span> Payment processing (PCI-DSS
                    compliant)
                  </li>
                  <li>
                    ├─ <span className="text-foreground">RESEND:</span> Transactional email delivery
                  </li>
                  <li>
                    ├─ <span className="text-foreground">VERCEL:</span> Infrastructure and hosting
                  </li>
                  <li>
                    ├─ <span className="text-foreground">ANALYTICS:</span> Usage analytics
                    (anonymized)
                  </li>
                  <li>
                    └─ <span className="text-foreground">GITHUB:</span> Repository access via
                    Collaborator API
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [4.2] LEGAL REQUIREMENTS
                </h3>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  We may disclose data if required by law:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Valid legal process (subpoenas, court orders)</li>
                  <li>├─ Enforcement of our Terms of Service</li>
                  <li>└─ Protection of rights, property, or safety</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [4.3] BUSINESS TRANSFERS
                </h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  If Fabrk is acquired or merged, your information may be transferred. We'll notify
                  you before any transfer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card size="auto">
          <CardHeader code="0x50" title="DATA SECURITY" icon={<Lock className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We implement industry-standard security measures:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">ENCRYPTION:</span> TLS 1.3 in transit, AES-256
                at rest
              </li>
              <li>
                ├─ <span className="text-foreground">AUTH:</span> Bcrypt password hashing (12
                rounds)
              </li>
              <li>
                ├─ <span className="text-foreground">SESSIONS:</span> JWT tokens with expiration,
                versioning
              </li>
              <li>
                ├─ <span className="text-foreground">INFRA:</span> Secure cloud hosting with
                security patches
              </li>
              <li>
                ├─ <span className="text-foreground">ACCESS CONTROL:</span> Limited employee access
                to user data
              </li>
              <li>
                └─ <span className="text-foreground">MONITORING:</span> Automated security
                monitoring and alerts
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card size="auto">
          <CardHeader code="0x60" title="DATA RETENTION" icon={<Clock className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We retain your data for:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">ACTIVE ACCOUNTS:</span> Duration + 30 days
                after deletion
              </li>
              <li>
                ├─ <span className="text-foreground">PAYMENT RECORDS:</span> 7 years (required by
                tax law)
              </li>
              <li>
                ├─ <span className="text-foreground">LOGS:</span> 90 days for security and debugging
              </li>
              <li>
                └─ <span className="text-foreground">BACKUPS:</span> 30 days (then auto-deleted)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card size="auto">
          <CardHeader
            code="0x70"
            title="YOUR PRIVACY RIGHTS"
            icon={<UserCheck className="size-4" />}
          />
          <CardContent padding="md">
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [7.1] GDPR RIGHTS (EU USERS)
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>
                    ├─ <span className="text-foreground">ACCESS:</span> Request a copy of your
                    personal data
                  </li>
                  <li>
                    ├─ <span className="text-foreground">RECTIFICATION:</span> Correct inaccurate
                    data
                  </li>
                  <li>
                    ├─ <span className="text-foreground">ERASURE:</span> Request deletion ("right to
                    be forgotten")
                  </li>
                  <li>
                    ├─ <span className="text-foreground">PORTABILITY:</span> Receive data in
                    portable format
                  </li>
                  <li>
                    ├─ <span className="text-foreground">RESTRICTION:</span> Limit how we process
                    your data
                  </li>
                  <li>
                    ├─ <span className="text-foreground">OBJECTION:</span> Object to data processing
                  </li>
                  <li>
                    └─ <span className="text-foreground">WITHDRAW CONSENT:</span> Revoke consent at
                    any time
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [7.2] CCPA RIGHTS (CA USERS)
                </h3>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ Know what personal information we collect</li>
                  <li>├─ Know if we sell/disclose info (we don't sell)</li>
                  <li>├─ Access your personal information</li>
                  <li>├─ Request deletion of your info</li>
                  <li>└─ Non-discrimination for exercising rights</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [7.3] EXERCISING RIGHTS
                </h3>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  Contact us at:
                </p>
                <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
                  <li>├─ EMAIL: support@fabrk.dev</li>
                  <li>
                    └─ PROFILE:{' '}
                    <Link href="/profile" className="text-primary hover:underline">
                      /profile
                    </Link>
                  </li>
                </ul>
                <p className={cn('text-muted-foreground mt-2 text-xs', mode.font)}>
                  Response time: 30 days
                </p>
              </div>

              <div>
                <h3 className={cn('mb-2 text-xs font-semibold', mode.font)}>
                  [7.4] GITHUB ACCESS REVOCATION
                </h3>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  If you request data deletion, we will revoke your access to the fabrk-boilerplate
                  repository on GitHub.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card size="auto">
          <CardHeader
            code="0x80"
            title="COOKIES AND TRACKING"
            icon={<Cookie className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              We use cookies for:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">ESSENTIAL:</span> Authentication, session
                management (required)
              </li>
              <li>
                ├─ <span className="text-foreground">PREFERENCE:</span> Remember your settings
                (theme, language)
              </li>
              <li>
                └─ <span className="text-foreground">ANALYTICS:</span> Understand usage patterns
                (optional)
              </li>
            </ul>
            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              See our{' '}
              <Link href="/cookies" className="text-primary hover:underline">
                COOKIE POLICY
              </Link>{' '}
              for details.
            </p>
          </CardContent>
        </Card>

        {/* Section 9 */}
        <Card size="auto">
          <CardHeader code="0x90" title="CHILDRENS PRIVACY" icon={<Baby className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              Fabrk is not intended for users under 18. We do not knowingly collect data from
              children. If you believe we've collected data from a child, contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Section 10 */}
        <Card size="auto">
          <CardHeader
            code="0xA0"
            title="INTERNATIONAL DATA TRANSFERS"
            icon={<Globe className="size-4" />}
          />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Your data may be processed in countries outside your own. We ensure adequate
              protection through:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ Standard Contractual Clauses (EU-approved)</li>
              <li>├─ Data Processing Agreements with all vendors</li>
              <li>└─ Compliance with applicable data protection laws</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 11 */}
        <Card size="auto">
          <CardHeader code="0xB0" title="POLICY CHANGES" icon={<RefreshCw className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              We may update this policy periodically. We'll notify you of significant changes via
              email or prominent notice. Continued use after changes constitutes acceptance.
            </p>
          </CardContent>
        </Card>

        {/* Section 12 */}
        <Card size="auto">
          <CardHeader code="0xC0" title="CONTACT US" icon={<Mail className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Privacy questions or concerns?
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>
                ├─ <span className="text-foreground">EMAIL:</span> support@fabrk.dev
              </li>
              <li>
                ├─ <span className="text-foreground">DPO:</span> support@fabrk.dev
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
              <Link href="/terms" className="text-primary hover:underline">
                &gt; TERMS OF SERVICE
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
