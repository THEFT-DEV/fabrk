/**
 * Authentication Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Authentication Templates | Fabrk',
  description:
    'Complete authentication flow templates including sign in, sign up, password reset, and 2FA.',
  openGraph: {
    title: 'Authentication Templates | Fabrk',
    description:
      'Complete authentication flow templates including sign in, sign up, password reset, and 2FA.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/authentication`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentication Templates | Fabrk',
    description:
      'Complete authentication flow templates including sign in, sign up, password reset, and 2FA.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
