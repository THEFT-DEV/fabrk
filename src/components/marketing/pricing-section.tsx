/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Terminal console style card
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Container } from '@/components/ui/container';
import { Card, CardContent, InfoNote, Badge } from '@/components/ui/card';
import { PricingCard } from '@/components/landing/pricing-card';
import { PromoBanner } from '@/components/polar/promo-banner';

export function PricingSection() {
  return (
    <section
      id="pricing"
      className={cn('scroll-mt-16 border-t py-42 lg:py-40', mode.color.border.default)}
    >
      <Container size="2xl">
        {/* Promo Banner - auto-hides when exhausted */}
        <PromoBanner />

        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            <PricingCard />
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <Badge
              code="0x40"
              label="PRICING"
              meta="COMMERCIAL TIER │ FIB[144]"
              className="mb-4 self-start"
            />

            <h2 className={cn('mb-2 text-sm', mode.color.text.accent, mode.font)}>
              [FABRK STARTER]
            </h2>
            <h3 className={cn('mb-6 text-4xl font-semibold tracking-tight', mode.font)}>
              ONE-TIME PURCHASE.
              <br />
              <span className={mode.color.text.muted}>UNLIMITED PROJECTS.</span>
            </h3>

            <div className={cn('mb-6 border-l-2 pl-4', mode.color.border.default)}>
              <p className={cn('text-sm', mode.color.text.muted, mode.font)}>
                Upon purchase, use the starter kit for personal and commercial projects—no restrictions on developers or deployments.
              </p>
            </div>

            <Card size="auto">
              <CardContent padding="sm">
                <InfoNote label="NOTE" className="mt-0">
                  Fabrk is 40-70% more affordable than comparable Next.js starter kits. Zero hidden
                  charges or fees.
                </InfoNote>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
