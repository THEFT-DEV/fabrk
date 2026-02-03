/**
 * Notification Templates - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Notification Templates | Fabrk',
  description:
    'In-app notification center with read/unread states, filtering, and real-time updates.',
  openGraph: {
    title: 'Notification Templates | Fabrk',
    description:
      'In-app notification center with read/unread states, filtering, and real-time updates.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/notifications`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notification Templates | Fabrk',
    description:
      'In-app notification center with read/unread states, filtering, and real-time updates.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
