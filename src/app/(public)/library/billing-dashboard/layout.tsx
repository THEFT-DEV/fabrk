/**
 * Billing Dashboard Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Billing Dashboard Templates | Fabrk',
  description:
    'Complete billing management interfaces with invoice history, payment methods, and subscription control.',
  openGraph: {
    title: 'Billing Dashboard Templates | Fabrk',
    description:
      'Complete billing management interfaces with invoice history, payment methods, and subscription control.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/billing-dashboard`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billing Dashboard Templates | Fabrk',
    description:
      'Complete billing management interfaces with invoice history, payment methods, and subscription control.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
