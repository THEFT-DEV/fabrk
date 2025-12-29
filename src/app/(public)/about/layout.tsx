import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Fabrk - the terminal-first SaaS boilerplate built for developers who ship fast. Our mission, values, and story.',
  openGraph: {
    title: 'About Us | Fabrk',
    description:
      'Learn about Fabrk - the terminal-first SaaS boilerplate built for developers who ship fast.',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
