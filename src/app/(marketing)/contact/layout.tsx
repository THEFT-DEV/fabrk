import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Fabrk team. Contact us for sales inquiries, technical support, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | Fabrk',
    description:
      'Get in touch with the Fabrk team for sales, support, or partnership opportunities.',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
