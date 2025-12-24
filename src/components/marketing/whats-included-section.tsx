'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { BenefitCard } from '@/components/landing/benefit-card';
import { INCLUDED_FEATURES } from '@/data/landing/included-features';

/**
 * What's Included Section
 * Uses BenefitCard for consistent terminal-style cards
 */
export function WhatsIncludedSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="INCLUDED"
          code="0x45"
          title="EVERYTHING YOU NEED TO SHIP"
          description="Full-stack SaaS infrastructure, no assembly required"
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INCLUDED_FEATURES.map((item, index) => (
            <BenefitCard
              key={item.id}
              icon={item.icon}
              module={item.module}
              code={item.code}
              benefit={item.benefit}
              description={item.description}
              timeSaved={item.timeSaved}
              costSaved={item.costSaved}
              features={item.features}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
