/**
 * Related Templates Component - Documentation Layout
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Related Templates Component | Fabrk',
  description:
    'Template suggestion component showing related templates with previews and navigation. Improves template discoverability.',
  openGraph: {
    title: 'Related Templates Component | Fabrk Documentation',
    description:
      'Template suggestion component showing related templates with previews and navigation. Improves template discoverability.',
    type: 'article',
  },
  alternates: {
    canonical: `${baseUrl}/docs/library/related-templates`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Related Templates Component | Fabrk',
    description:
      'Template suggestion component showing related templates with previews and navigation. Improves template discoverability.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
