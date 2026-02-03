import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Refund Policy for Fabrk. Learn about our satisfaction guarantee and refund process.',
  openGraph: {
    title: 'Refund Policy | Fabrk',
    description: 'Refund Policy for Fabrk SaaS boilerplate.',
    type: 'website',
    url: `${baseUrl}/refund`,
  },
  alternates: {
    canonical: `${baseUrl}/refund`,
  },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
