/**
 * Blog Post Template - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Blog Post Template | Fabrk',
  description:
    'Individual blog post template with rich formatting, code syntax highlighting, and responsive images.',
  openGraph: {
    title: 'Blog Post Template | Fabrk',
    description:
      'Individual blog post template with rich formatting, code syntax highlighting, and responsive images.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/blog/post`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Post Template | Fabrk',
    description:
      'Individual blog post template with rich formatting, code syntax highlighting, and responsive images.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
