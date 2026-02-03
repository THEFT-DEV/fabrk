/**
 * User Profile Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'User Profile Templates | Fabrk',
  description: 'User profile page templates with avatars, bio, activity feeds, and social links.',
  openGraph: {
    title: 'User Profile Templates | Fabrk',
    description: 'User profile page templates with avatars, bio, activity feeds, and social links.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/profile`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'User Profile Templates | Fabrk',
    description: 'User profile page templates with avatars, bio, activity feeds, and social links.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
