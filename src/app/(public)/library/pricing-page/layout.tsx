/**
 * Pricing Page Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Pricing Page Templates | Fabrk',
  description:
    'Conversion-optimized pricing page templates with tier comparisons, feature lists, and CTAs. Ready for Stripe integration.',
  openGraph: {
    title: 'Pricing Page Templates | Fabrk',
    description:
      'Conversion-optimized pricing page templates with tier comparisons, feature lists, and CTAs. Ready for Stripe integration.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/pricing-page`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Page Templates | Fabrk',
    description:
      'Conversion-optimized pricing page templates with tier comparisons, feature lists, and CTAs. Ready for Stripe integration.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
