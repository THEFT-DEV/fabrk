/**
 * Comparison Index Page
 * Feature-by-feature comparison: FABRK vs typical SaaS boilerplates
 */

import { Metadata } from 'next';
import { CompareHero } from './components/compare-hero';
import { ComparisonTable } from './components/comparison-table';
import { CompareCTA } from './components/compare-cta';

export const metadata: Metadata = {
  title: 'Compare FABRK vs Other SaaS Boilerplates',
  description:
    'Feature-by-feature comparison of FABRK against typical SaaS boilerplates. 70+ components, 18 themes, 4 AI providers, 3 payment processors — free and open source.',
  openGraph: {
    title: 'Compare FABRK vs Other SaaS Boilerplates',
    description:
      '70+ components, 18 themes, multi-provider AI, and 3 payment processors. See how FABRK stacks up.',
  },
};

export default function ComparePage() {
  return (
    <>
      <CompareHero
        title="FABRK VS THE REST"
        subtitle="A transparent, feature-by-feature breakdown of what you get with FABRK compared to a typical SaaS boilerplate. No marketing fluff — just facts."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <ComparisonTable />
        </div>
      </section>
      <CompareCTA />
    </>
  );
}
