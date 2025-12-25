/**
 * Generic Logo Cloud Example
 *
 * Replace with your actual clients, partners, or trusted brands.
 * These are format examples showing the expected structure.
 */

export const LOGO_CLOUD_EXAMPLE = [
  {
    id: 'company-1',
    name: 'TechCorp',
    logo: '/logos/techcorp.svg',
    website: 'https://techcorp.example.com',
  },
  {
    id: 'company-2',
    name: 'StartupName',
    logo: '/logos/startup.svg',
    website: 'https://startup.example.com',
  },
  {
    id: 'company-3',
    name: 'SaaS Inc',
    logo: '/logos/saas-inc.svg',
    website: 'https://saas.example.com',
  },
  {
    id: 'company-4',
    name: 'DevTools Co',
    logo: '/logos/devtools.svg',
    website: 'https://devtools.example.com',
  },
  {
    id: 'company-5',
    name: 'CloudApp',
    logo: '/logos/cloudapp.svg',
    website: 'https://cloudapp.example.com',
  },
  {
    id: 'company-6',
    name: 'DataTech',
    logo: '/logos/datatech.svg',
    website: 'https://datatech.example.com',
  },
] as const;

// Alternative: Text-based logos (when actual logos not available)
export const TEXT_LOGO_CLOUD_EXAMPLE = [
  { id: 'brand-1', name: 'Acme Corp' },
  { id: 'brand-2', name: 'GlobalTech' },
  { id: 'brand-3', name: 'Innovation Labs' },
  { id: 'brand-4', name: 'Digital Ventures' },
  { id: 'brand-5', name: 'Future Systems' },
  { id: 'brand-6', name: 'NextGen Solutions' },
] as const;

// Categorized logos (for different sections)
export const CATEGORIZED_LOGOS_EXAMPLE = {
  customers: [
    { id: 'customer-1', name: 'Customer A', logo: '/logos/customer-a.svg' },
    { id: 'customer-2', name: 'Customer B', logo: '/logos/customer-b.svg' },
    { id: 'customer-3', name: 'Customer C', logo: '/logos/customer-c.svg' },
  ],
  partners: [
    { id: 'partner-1', name: 'Partner A', logo: '/logos/partner-a.svg' },
    { id: 'partner-2', name: 'Partner B', logo: '/logos/partner-b.svg' },
  ],
  integrations: [
    {
      id: 'integration-1',
      name: 'Stripe',
      logo: '/logos/stripe.svg',
      description: 'Payment processing',
    },
    {
      id: 'integration-2',
      name: 'PostgreSQL',
      logo: '/logos/postgresql.svg',
      description: 'Database',
    },
    {
      id: 'integration-3',
      name: 'Vercel',
      logo: '/logos/vercel.svg',
      description: 'Deployment',
    },
  ],
} as const;

// Social proof variant (with testimonial snippets)
export const SOCIAL_PROOF_LOGOS_EXAMPLE = [
  {
    id: 'proof-1',
    company: 'TechStartup',
    logo: '/logos/techstartup.svg',
    quote: 'Saved us 3 months of development time',
    author: 'John Smith, CTO',
  },
  {
    id: 'proof-2',
    company: 'SaaS Co',
    logo: '/logos/saasco.svg',
    quote: 'Best investment we made this year',
    author: 'Jane Doe, Founder',
  },
  {
    id: 'proof-3',
    company: 'DevShop',
    logo: '/logos/devshop.svg',
    quote: 'Production-ready code out of the box',
    author: 'Mike Johnson, Lead Dev',
  },
] as const;
