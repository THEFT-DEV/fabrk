/**
 * AI Form Generator Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'AI Form Generator Templates | Fabrk',
  description:
    'AI-powered form generation templates with validation, multi-step flows, and dynamic fields.',
  openGraph: {
    title: 'AI Form Generator Templates | Fabrk',
    description:
      'AI-powered form generation templates with validation, multi-step flows, and dynamic fields.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/ai-forms`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Form Generator Templates | Fabrk',
    description:
      'AI-powered form generation templates with validation, multi-step flows, and dynamic fields.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
