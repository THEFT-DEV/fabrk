/**
 * Forgot Password Template - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Forgot Password Template | Fabrk',
  description: 'Password reset request page with email verification and secure token handling.',
  openGraph: {
    title: 'Forgot Password Template | Fabrk',
    description: 'Password reset request page with email verification and secure token handling.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/authentication/forgot-password`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forgot Password Template | Fabrk',
    description: 'Password reset request page with email verification and secure token handling.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
