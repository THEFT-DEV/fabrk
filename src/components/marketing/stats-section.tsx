'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { StatCard } from '@/components/landing/stat-card';
import { STATS } from '@/data/landing';

/**
 * Stats Section
 * Shows product metrics - components, themes, routes, TypeScript coverage
 * Grid layout with animated stat cards
 */
export function StatsSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="PRODUCT METRICS"
          code="0x20"
          title="BUILT FOR PRODUCTION"
          description="Every component, theme, and feature is production-ready. No placeholders, no TODOs—just ship it."
          align="center"
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
