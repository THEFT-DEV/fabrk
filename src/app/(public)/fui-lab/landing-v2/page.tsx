 
/**
 * Landing V2 - FUI Design Exploration
 *
 * FUI styles are now controlled via the main theme dropdown.
 * Select color theme + FUI style from the navbar palette icon.
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { HeroPlaygroundFull } from '@/components/marketing/hero-playground-full';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';

export default function LandingV2Page() {
  return (
    <>
      <HeroSection />
      <HeroPlaygroundFull />
      <FeaturesShowcase />
      <StatsSection />
      <UseCasesSection />
      <PricingSection />
      <WhatsIncludedSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
