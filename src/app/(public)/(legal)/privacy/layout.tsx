import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Fabrk. Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Fabrk',
    description: 'Privacy Policy for Fabrk SaaS boilerplate.',
    type: 'website',
    url: `${baseUrl}/privacy`,
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
