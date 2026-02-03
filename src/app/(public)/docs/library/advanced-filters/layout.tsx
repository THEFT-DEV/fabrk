/**
 * Advanced Filters Component - Documentation Layout
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Advanced Filters Component | Fabrk',
  description:
    'Comprehensive filtering component with date ranges, search, status filters, and clear all functionality. Terminal-styled for SaaS dashboards.',
  openGraph: {
    title: 'Advanced Filters Component | Fabrk Documentation',
    description:
      'Comprehensive filtering component with date ranges, search, status filters, and clear all functionality. Terminal-styled for SaaS dashboards.',
    type: 'article',
  },
  alternates: {
    canonical: `${baseUrl}/docs/library/advanced-filters`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Filters Component | Fabrk',
    description:
      'Comprehensive filtering component with date ranges, search, status filters, and clear all functionality. Terminal-styled for SaaS dashboards.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
