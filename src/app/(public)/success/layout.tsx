import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Successful',
  description:
    'Thank you for purchasing Fabrk! Access your download, documentation, and support resources.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
