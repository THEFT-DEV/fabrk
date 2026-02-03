/**
 * Landing Page Variations - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Landing Page Variations | Fabrk',
  description:
    'High-converting landing page templates with hero sections, features, testimonials, and CTAs. Multiple layout variations.',
  openGraph: {
    title: 'Landing Page Variations | Fabrk',
    description:
      'High-converting landing page templates with hero sections, features, testimonials, and CTAs. Multiple layout variations.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/landing-variations`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Page Variations | Fabrk',
    description:
      'High-converting landing page templates with hero sections, features, testimonials, and CTAs. Multiple layout variations.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
