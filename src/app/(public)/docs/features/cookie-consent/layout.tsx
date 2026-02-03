/**
 * Cookie Consent - Layout with Metadata
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Cookie Consent | Fabrk',
  description:
    'Cookie Consent feature guide with implementation steps, code examples, and best practices for Fabrk boilerplate.',
  openGraph: {
    title: 'Cookie Consent | Fabrk',
    description:
      'Cookie Consent feature guide with implementation steps, code examples, and best practices for Fabrk boilerplate.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/docs/features/cookie-consent`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Consent | Fabrk',
    description:
      'Cookie Consent feature guide with implementation steps, code examples, and best practices for Fabrk boilerplate.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
