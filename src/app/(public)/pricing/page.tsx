/**
 * ✅ FABRK PAGE
 * Dedicated Pricing Page - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from 'next';
import { MarketingPageHeader } from '@/components/marketing/marketing-header';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FAQSection } from '@/components/marketing/faq-section';

export const metadata: Metadata = {
  title: 'Pricing - Fabrk',
  description:
    'One-time purchase. Unlimited projects. Get lifetime access to Fabrk starter kit with all features included.',
};

export default function PricingPage() {
  return (
    <>
      <MarketingPageHeader
        code="0x00"
        badge="COMMERCIAL LICENSE"
        title="Simple Transparent Pricing"
        description="One time payment. Lifetime updates. No subscriptions."
      />
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
    </>
  );
}
