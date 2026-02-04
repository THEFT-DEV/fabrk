import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Development Tools | Fabrk',
  description:
    'Build with AI confidently. Type-safe, cost-aware, design-consistent code generation tools.',
  openGraph: {
    title: 'AI Development Tools | Fabrk',
    description:
      'Build with AI confidently. Type-safe, cost-aware, design-consistent code generation tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Tools | Fabrk',
    description:
      'Build with AI confidently. Type-safe, cost-aware, design-consistent code generation tools.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
