/**
 * Dashboard Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Dashboard Templates | Fabrk',
  description:
    'Analytics dashboard templates with metrics, charts, and real-time data displays. Perfect for SaaS applications.',
  openGraph: {
    title: 'Dashboard Templates | Fabrk',
    description:
      'Analytics dashboard templates with metrics, charts, and real-time data displays. Perfect for SaaS applications.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/dashboards`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard Templates | Fabrk',
    description:
      'Analytics dashboard templates with metrics, charts, and real-time data displays. Perfect for SaaS applications.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
