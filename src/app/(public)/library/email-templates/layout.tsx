/**
 * Email Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Email Templates | Fabrk',
  description:
    'Responsive HTML email templates for transactional emails. Welcome, reset password, billing notifications, and more.',
  openGraph: {
    title: 'Email Templates | Fabrk',
    description:
      'Responsive HTML email templates for transactional emails. Welcome, reset password, billing notifications, and more.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/email-templates`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Templates | Fabrk',
    description:
      'Responsive HTML email templates for transactional emails. Welcome, reset password, billing notifications, and more.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
