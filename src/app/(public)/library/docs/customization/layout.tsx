/**
 * Customization Guide Template - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Customization Guide Template | Fabrk',
  description: 'Template customization documentation with code examples and configuration options.',
  openGraph: {
    title: 'Customization Guide Template | Fabrk',
    description:
      'Template customization documentation with code examples and configuration options.',
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/library/docs/customization`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customization Guide Template | Fabrk',
    description:
      'Template customization documentation with code examples and configuration options.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
