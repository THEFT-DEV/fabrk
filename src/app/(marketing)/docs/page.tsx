import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for Fabrk boilerplate. Learn how to customize, deploy, and extend your SaaS application.',
};

export default function DocsPage() {
  redirect('/docs/getting-started');
}
