/**
 * Generic Site Configuration Example
 *
 * Replace with your actual site information.
 * This is a centralized config for site metadata used across components.
 */

export const SITE_CONFIG_EXAMPLE = {
  name: 'YourProduct',
  tagline: 'Ship Your SaaS Faster',
  description:
    'Production-ready SaaS boilerplate with authentication, payments, and more. Launch in days, not months.',
  url: 'https://yourproduct.com',
  ogImage: 'https://yourproduct.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/yourproduct',
    github: 'https://github.com/yourcompany/yourproduct',
    linkedin: 'https://linkedin.com/company/yourcompany',
    discord: 'https://discord.gg/yourserver',
    email: 'mailto:hello@yourproduct.com',
  },
  contact: {
    email: 'hello@yourproduct.com',
    support: 'support@yourproduct.com',
  },
  company: {
    name: 'Your Company Inc.',
    address: '123 Main St, San Francisco, CA 94102',
    country: 'United States',
  },
  legal: {
    privacyPolicy: '/privacy',
    termsOfService: '/terms',
    cookiePolicy: '/cookies',
  },
  social: {
    twitterHandle: '@yourproduct',
    twitterCreator: '@founder',
  },
  meta: {
    themeColor: '#000000',
    language: 'en',
    locale: 'en_US',
  },
  features: {
    newsletter: true,
    blog: true,
    changelog: true,
    docs: true,
    api: true,
  },
} as const;

// Navigation structure
export const NAVIGATION_CONFIG_EXAMPLE = {
  header: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
  ],
  footer: {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Guides', href: '/docs/guides' },
      { label: 'Support', href: '/support' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'License', href: '/license' },
    ],
  },
  cta: {
    primary: { label: 'Get Started', href: '/signup' },
    secondary: { label: 'View Demo', href: '/demo' },
  },
} as const;
