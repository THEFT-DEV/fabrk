'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { TestimonialCard } from '@/components/landing/testimonial-card';
import { TESTIMONIALS } from '@/data/landing';

/**
 * Social Proof Section
 * Displays customer testimonials in a 3-column grid
 * Builds trust through real user feedback
 */
export function SocialProofSection() {
  return (
    <section className="border-border border-t py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="SOCIAL PROOF"
          code="0x30"
          title="LOVED BY DEVELOPERS"
          description="Don't take our word for it. Here's what builders say about shipping with Fabrk."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
