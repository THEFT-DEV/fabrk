/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { LazyPlayground } from '@/components/marketing/lazy-playground';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
import { Reveal } from '@/components/motion';

export default function HomePage() {
  return (
    <>
      {/* Hero - Sticky card effect */}
      <HeroSection />

      {/* Content slides up over the hero */}
      <div className="relative z-20 bg-background">
        {/* Interactive Playground - Lazy loaded for better LCP */}
        <Reveal>
          <LazyPlayground />
        </Reveal>

        {/* What Makes Fabrk Different - Unique features (Terminal UI, 31 Demos, AI Credits, 3 Providers) */}
        <Reveal>
          <FeaturesShowcase />
        </Reveal>

        {/* Trust Indicators - Updated with verifiable stats */}
        <Reveal>
          <StatsSection />
        </Reveal>

        {/* Target Personas - Who Fabrk is for */}
        <Reveal>
          <UseCasesSection />
        </Reveal>

        {/* Pricing - Launch price ($199) for first 100 buyers */}
        <Reveal>
          <PricingSection />
        </Reveal>

        {/* What's Included - NEW: Auth/Billing/Multi-tenancy checklist */}
        <Reveal>
          <WhatsIncludedSection />
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <FAQSection />
        </Reveal>

        {/* Final Conversion Push */}
        <Reveal>
          <FinalCTASection />
        </Reveal>
      </div>

      {/* Overlays */}
      <StickyCTABar message="Launch your SaaS in days—not months" ctaText="Get Fabrk Now" />
    </>
  );
}
