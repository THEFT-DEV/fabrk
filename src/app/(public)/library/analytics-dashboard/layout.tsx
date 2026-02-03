/**
 * Analytics Dashboard Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Analytics Dashboard Templates | Fabrk',
  description:
    'Advanced analytics dashboards with KPIs, trends, and data breakdowns. Ideal for metrics tracking.',
  openGraph: {
    title: 'Analytics Dashboard Templates | Fabrk',
    description:
      'Advanced analytics dashboards with KPIs, trends, and data breakdowns. Ideal for metrics tracking.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/analytics-dashboard`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics Dashboard Templates | Fabrk',
    description:
      'Advanced analytics dashboards with KPIs, trends, and data breakdowns. Ideal for metrics tracking.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
