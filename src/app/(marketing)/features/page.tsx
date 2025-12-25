/**
 * ✅ FABRK COMPONENT
 * Features Page - Dedicated feature deep-dive
 * Production-ready ✓
 */

'use client';

import { FeaturesHero } from './components/features-hero';
import { StatsSection } from './components/stats-section';
import { CategoryNavigation } from './components/category-navigation';
import { FeatureCategoryCard } from './components/feature-category-card';
import { TechStackSection } from './components/tech-stack-section';
import { QualitySection } from './components/quality-section';
import { FeaturesCTA } from './components/features-cta';
import { FEATURE_CATEGORIES } from './components/feature-data';

function FeatureCategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-16 lg:space-y-24">
          {FEATURE_CATEGORIES.map((category, index) => (
            <FeatureCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <section id="stats">
        <StatsSection />
      </section>
      <section id="category-nav">
        <CategoryNavigation />
      </section>
      <section id="feature-categories">
        <FeatureCategoriesSection />
      </section>
      <section id="tech-stack">
        <TechStackSection />
      </section>
      <section id="quality">
        <QualitySection />
      </section>
      <FeaturesCTA />
    </>
  );
}
