import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Fabrk. Read about the legal agreement between Fabrk and users.',
  openGraph: {
    title: 'Terms of Service | Fabrk',
    description: 'Terms of Service for Fabrk SaaS boilerplate.',
    type: 'website',
    url: `${baseUrl}/terms`,
  },
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
