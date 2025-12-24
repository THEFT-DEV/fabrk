/**
 * ✅ FABRK COMPONENT
 * Feature Deep-Dives - Terminal console [DEEP DIVE] style
 * Production-ready ✓
 *
 * Split into subcomponents:
 * - feature-item.tsx - Single feature display
 * - feature-section.tsx - Two-column layout
 * - terminal-header.tsx - Reusable window header
 * - preview-auth.tsx - Auth form animation
 * - preview-organization.tsx - Org manager animation
 * - preview-billing.tsx - Billing portal animation
 * - preview-design.tsx - Design system showcase
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/card';
import {
  Mail,
  Key,
  Shield,
  UserPlus,
  Users,
  ArrowLeftRight,
  Receipt,
  Gauge,
  DollarSign,
  Moon,
  Palette,
  Layers,
  Coins,
  BarChart3,
  Zap,
} from 'lucide-react';

import { FeatureSectionLayout } from './feature-section';
import { AuthPreview } from './preview-auth';
import { OrganizationPreview } from './preview-organization';
import { BillingPreview } from './preview-billing';
import { DesignSystemPreview } from './preview-design';
import { CreditsPreview } from './preview-credits';

export function FeaturesSection() {
  return (
    <section
      id="features"
      className={cn('scroll-mt-16 border-t py-24 lg:py-42', mode.color.border.default)}
    >
      <Container size="2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <Badge
            code="0x30"
            label="DEEP DIVE"
            meta="FEATURE ANALYSIS │ FIB[377,610]"
            className="mb-4"
          />
          <h2
            className={cn(
              mode.font,
              'mb-4 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl'
            )}
          >
            BUILT FOR SERIOUS SAAS PRODUCTS
          </h2>
          <p className={cn(mode.font, mode.color.text.muted, 'max-w-2xl text-sm leading-relaxed')}>
            Includes many foundational and advanced components that cover a wide range of use-cases
            without sacrificing flexibility and design.
          </p>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-20 lg:space-y-24">
          {/* Authentication */}
          <FeatureSectionLayout
            spec="AUTHENTICATION"
            title="Authentication"
            description="Full implementation including email/password, social sign-in, MFA, account linking and session management."
            features={[
              {
                icon: Mail,
                title: 'Email/Password',
                description: 'Verify email, change password, forgot password flows.',
              },
              {
                icon: Key,
                title: 'Social Sign-In',
                description: 'Google, Microsoft, or configure additional providers.',
              },
              {
                icon: Shield,
                title: 'Multi-Factor',
                description: 'MFA/2FA using TOTP with authenticator apps.',
              },
            ]}
          >
            <AuthPreview />
          </FeatureSectionLayout>

          {/* Multi-Tenancy */}
          <FeatureSectionLayout
            spec="MULTI TENANCY"
            title="Multi-Tenancy"
            description="Built-in support for organizations including member management, invitations and roles."
            reversed
            features={[
              {
                icon: UserPlus,
                title: 'Invitations',
                description: 'Invite members, assign roles and gate access.',
              },
              {
                icon: Users,
                title: 'Roles',
                description: 'Predefined membership roles or add your own.',
              },
              {
                icon: ArrowLeftRight,
                title: 'Transfer Ownership',
                description: 'Give ownership to another member.',
              },
            ]}
          >
            <OrganizationPreview />
          </FeatureSectionLayout>

          {/* Billing & Payments */}
          <FeatureSectionLayout
            spec="BILLING PAYMENTS"
            title="Billing & Payments"
            description="Securely accept payments on your site and start selling to customers in no time."
            features={[
              {
                icon: Receipt,
                title: 'Billing Portal',
                description: 'View transactions, invoices, manage plans.',
              },
              {
                icon: Gauge,
                title: 'Restricted Access',
                description: 'Gate features until user upgrades.',
              },
              {
                icon: DollarSign,
                title: 'Billing Granularity',
                description: 'Per org, per seat, or usage-based.',
              },
            ]}
          >
            <BillingPreview />
          </FeatureSectionLayout>

          {/* AI Credits */}
          <FeatureSectionLayout
            spec="AI CREDITS"
            title="AI Credits System"
            description="Token-based billing for AI features. Track usage, manage allowances, and monetize AI capabilities."
            reversed
            features={[
              {
                icon: Coins,
                title: 'Credit Balance',
                description: 'Track credits per user with tier-based allowances.',
              },
              {
                icon: BarChart3,
                title: 'Usage Analytics',
                description: 'Visual dashboard showing daily consumption.',
              },
              {
                icon: Zap,
                title: 'Per-Endpoint Metering',
                description: 'Different credit costs per AI feature.',
              },
            ]}
          >
            <CreditsPreview />
          </FeatureSectionLayout>

          {/* Design System */}
          <FeatureSectionLayout
            spec="DESIGN SYSTEM"
            title="Design System"
            description="Foundational and advanced components covering wide range of use-cases without sacrificing flexibility."
            features={[
              {
                icon: Moon,
                title: 'Responsive Design',
                description: 'Works on all screen sizes out of the box.',
              },
              {
                icon: Palette,
                title: 'Light and Dark Themes',
                description: 'Toggle with a switch button.',
              },
              {
                icon: Layers,
                title: 'Shadcn UI + Tailwind',
                description: '50+ accessible components included.',
              },
            ]}
          >
            <DesignSystemPreview />
          </FeatureSectionLayout>
        </div>
      </Container>
    </section>
  );
}

// Re-export for backwards compatibility
export { FeatureSectionLayout as FeatureSection };
