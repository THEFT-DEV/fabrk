/**
 * Library Navigation Component - Documentation Layout
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Library Navigation Component | Fabrk',
  description:
    'Sidebar navigation component for template libraries with category grouping and active state management.',
  openGraph: {
    title: 'Library Navigation Component | Fabrk Documentation',
    description:
      'Sidebar navigation component for template libraries with category grouping and active state management.',
    type: 'article',
  },
  alternates: {
    canonical: `${baseUrl}/docs/library/library-navigation`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Library Navigation Component | Fabrk',
    description:
      'Sidebar navigation component for template libraries with category grouping and active state management.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
