/**
 * Library Layout - Server Component with Metadata
 * Provides SEO metadata for all library template pages
 */
import type { Metadata } from 'next';
import { LibrarySidebar } from './library-sidebar';

export const metadata: Metadata = {
  title: 'Template Library',
  description:
    'Browse 40+ production-ready templates including dashboards, authentication, marketing pages, and more. All templates follow terminal design system standards.',
  openGraph: {
    title: 'Template Library | Fabrk',
    description:
      'Browse 40+ production-ready templates including dashboards, authentication, marketing pages, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Template Library | Fabrk',
    description:
      'Browse 40+ production-ready templates including dashboards, authentication, marketing pages, and more.',
  },
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <LibrarySidebar>{children}</LibrarySidebar>;
}
