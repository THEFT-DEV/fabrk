/**
 * Sign In Page Template - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Sign In Page Template | Fabrk',
  description:
    'Production-ready sign in page with social auth, password visibility toggle, and remember me option.',
  openGraph: {
    title: 'Sign In Page Template | Fabrk',
    description:
      'Production-ready sign in page with social auth, password visibility toggle, and remember me option.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/authentication/sign-in`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In Page Template | Fabrk',
    description:
      'Production-ready sign in page with social auth, password visibility toggle, and remember me option.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
