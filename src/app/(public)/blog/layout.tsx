import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles, tutorials, and updates from Fabrk',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
