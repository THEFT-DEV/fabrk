/**
 * Build Custom Landing Page Tool
 * Generates a complete landing page with user-provided content
 */

import { fillTemplate, defaultValues } from '../templates/landing-page.js';

export interface BuildCustomLandingArgs {
  // Required
  productName: string;
  tagline: string;
  description: string;

  // Optional - will use defaults if not provided
  productUrl?: string;
  trustBadge?: string;

  // CTAs
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;

  // Trust indicators
  trust1?: string;
  trust2?: string;
  trust3?: string;

  // Features (provide as arrays or comma-separated)
  features?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;

  // Stats
  stats?: Array<{
    value: string;
    label: string;
  }>;

  // Steps (How It Works)
  steps?: Array<{
    title: string;
    description: string;
  }>;

  // Pricing tiers
  pricing?: Array<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
  }>;

  // FAQs
  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  // Final CTA
  finalCtaHeadline?: string;
  finalCtaDescription?: string;
}

// Available Lucide icons for features
const AVAILABLE_ICONS = [
  'Zap',
  'Shield',
  'Globe',
  'BarChart3',
  'Users',
  'Clock',
  'Star',
  'Rocket',
  'Target',
  'Sparkles',
  'Lock',
  'Code',
  'Database',
  'Cpu',
  'Cloud',
  'Server',
  'Smartphone',
  'Laptop',
  'Settings',
  'Layers',
];

export function buildCustomLanding(args: BuildCustomLandingArgs): string {
  const values: Record<string, string> = {};

  // Basic info
  values.PRODUCT_NAME = args.productName.toUpperCase();
  values.HEADLINE = args.tagline.toUpperCase();
  values.DESCRIPTION = args.description;
  if (args.productUrl) values.PRODUCT_URL = args.productUrl;
  if (args.trustBadge) values.TRUST_BADGE = args.trustBadge.toUpperCase();

  // CTAs
  if (args.primaryCtaText) values.PRIMARY_CTA_TEXT = args.primaryCtaText.toUpperCase();
  if (args.primaryCtaUrl) values.PRIMARY_CTA_URL = args.primaryCtaUrl;
  if (args.secondaryCtaText) values.SECONDARY_CTA_TEXT = args.secondaryCtaText.toUpperCase();
  if (args.secondaryCtaUrl) values.SECONDARY_CTA_URL = args.secondaryCtaUrl;

  // Trust indicators
  if (args.trust1) values.TRUST_1 = args.trust1;
  if (args.trust2) values.TRUST_2 = args.trust2;
  if (args.trust3) values.TRUST_3 = args.trust3;

  // Features
  if (args.features && args.features.length > 0) {
    const features = args.features.slice(0, 4); // Max 4 features
    features.forEach((feature, i) => {
      const num = i + 1;
      values[`FEATURE_${num}_ICON`] = feature.icon && AVAILABLE_ICONS.includes(feature.icon)
        ? feature.icon
        : AVAILABLE_ICONS[i % AVAILABLE_ICONS.length];
      values[`FEATURE_${num}_TITLE`] = feature.title.toUpperCase();
      values[`FEATURE_${num}_DESCRIPTION`] = feature.description;
    });
  }

  // Stats
  if (args.stats && args.stats.length > 0) {
    const stats = args.stats.slice(0, 4); // Max 4 stats
    stats.forEach((stat, i) => {
      const num = i + 1;
      values[`STAT_${num}_VALUE`] = stat.value;
      values[`STAT_${num}_LABEL`] = stat.label;
    });
  }

  // Steps (How It Works)
  if (args.steps && args.steps.length > 0) {
    const steps = args.steps.slice(0, 3); // Max 3 steps
    steps.forEach((step, i) => {
      const num = i + 1;
      values[`STEP_${num}_TITLE`] = step.title.toUpperCase();
      values[`STEP_${num}_DESCRIPTION`] = step.description;
    });
  }

  // Pricing tiers
  if (args.pricing && args.pricing.length > 0) {
    const pricing = args.pricing.slice(0, 3); // Max 3 tiers
    pricing.forEach((tier, i) => {
      const num = i + 1;
      values[`PRICE_TIER_${num}_NAME`] = tier.name.toUpperCase();
      values[`PRICE_TIER_${num}_PRICE`] = tier.price;
      values[`PRICE_TIER_${num}_PERIOD`] = tier.period || '';
      values[`PRICE_TIER_${num}_DESCRIPTION`] = tier.description;
      values[`PRICE_TIER_${num}_FEATURES`] = tier.features.map((f) => `'${f}'`).join(', ');
      values[`PRICE_TIER_${num}_CTA`] = tier.cta.toUpperCase();
    });
  }

  // FAQs
  if (args.faqs && args.faqs.length > 0) {
    const faqs = args.faqs.slice(0, 5); // Max 5 FAQs
    faqs.forEach((faq, i) => {
      const num = i + 1;
      values[`FAQ_${num}_QUESTION`] = faq.question;
      values[`FAQ_${num}_ANSWER`] = faq.answer;
    });
  }

  // Final CTA
  if (args.finalCtaHeadline) values.FINAL_CTA_HEADLINE = args.finalCtaHeadline.toUpperCase();
  if (args.finalCtaDescription) values.FINAL_CTA_DESCRIPTION = args.finalCtaDescription;

  return fillTemplate(values);
}

/**
 * Get the list of all available template placeholders
 */
export function getTemplatePlaceholders(): string[] {
  return Object.keys(defaultValues);
}

/**
 * Get the list of available icons
 */
export function getAvailableIcons(): string[] {
  return AVAILABLE_ICONS;
}
