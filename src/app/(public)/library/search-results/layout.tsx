/**
 * Search Results Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Search Results Templates | Fabrk',
  description:
    'Advanced search interface templates with filters, sorting, and pagination. Perfect for data-heavy applications.',
  openGraph: {
    title: 'Search Results Templates | Fabrk',
    description:
      'Advanced search interface templates with filters, sorting, and pagination. Perfect for data-heavy applications.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/search-results`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Results Templates | Fabrk',
    description:
      'Advanced search interface templates with filters, sorting, and pagination. Perfect for data-heavy applications.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
