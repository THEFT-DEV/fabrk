/**
 * Error Page Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Error Page Templates | Fabrk',
  description:
    '404, 500, and maintenance page templates with helpful navigation and terminal-style error messages.',
  openGraph: {
    title: 'Error Page Templates | Fabrk',
    description:
      '404, 500, and maintenance page templates with helpful navigation and terminal-style error messages.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/error-pages`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Error Page Templates | Fabrk',
    description:
      '404, 500, and maintenance page templates with helpful navigation and terminal-style error messages.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
