/**
 * User Management Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'User Management Templates | Fabrk',
  description:
    'Admin user management interfaces with role assignment, permissions, and user search.',
  openGraph: {
    title: 'User Management Templates | Fabrk',
    description:
      'Admin user management interfaces with role assignment, permissions, and user search.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/user-management`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'User Management Templates | Fabrk',
    description:
      'Admin user management interfaces with role assignment, permissions, and user search.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
