/**
 * Toast - Layout with Metadata
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Toast | Fabrk',
  description:
    'Toast component documentation with examples, props, and usage guidelines. Terminal-styled UI component for modern SaaS applications.',
  openGraph: {
    title: 'Toast | Fabrk',
    description:
      'Toast component documentation with examples, props, and usage guidelines. Terminal-styled UI component for modern SaaS applications.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/docs/components/toast`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toast | Fabrk',
    description:
      'Toast component documentation with examples, props, and usage guidelines. Terminal-styled UI component for modern SaaS applications.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
