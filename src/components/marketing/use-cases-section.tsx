'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { UseCaseCard } from '@/components/landing/use-case-card';
import { USE_CASES } from '@/data/landing';

/**
 * Use Cases Section
 * Shows target personas and how Fabrk solves their problems
 * 3-column grid with persona-specific pain points and solutions
 */
export function UseCasesSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="WHO IT'S FOR"
          code="0x40"
          title="BUILT FOR BUILDERS LIKE YOU"
          description="Whether you're shipping solo or leading a team, Fabrk adapts to your workflow perfectly."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase, index) => (
            <UseCaseCard
              key={useCase.id}
              icon={useCase.icon}
              persona={useCase.persona}
              painPoint={useCase.painPoint}
              solution={useCase.solution}
              features={useCase.features}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
