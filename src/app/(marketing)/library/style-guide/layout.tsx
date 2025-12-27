import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Style Guide | Fabrk',
  description: 'Complete design system reference - typography, colors, spacing, components, and effects',
};

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
