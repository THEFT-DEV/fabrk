/**
 * FABRK COMPONENT
 * Pricing Page Data - Plans, FAQs, Comparison Features
 */

export const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    description: 'For individuals and small projects',
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    features: [
      'Up to 3 projects',
      'Basic analytics',
      '48-hour support response',
      '1GB storage',
      'Community access',
    ],
    cta: 'GET_STARTED',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'For growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 290,
    badge: 'POPULAR',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      '24-hour support response',
      '10GB storage',
      'API access',
      'Custom domains',
      'Up to 5 team members',
    ],
    cta: 'START PRO TRIAL',
    ctaVariant: 'default' as const,
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    description: 'For large organizations with custom needs',
    monthlyPrice: 99,
    yearlyPrice: 990,
    badge: null,
    features: [
      'Unlimited everything',
      'Enterprise analytics',
      '1-hour support response',
      'Unlimited storage',
      'Full API access',
      'Custom domains',
      'Unlimited team members',
      'SSO/SAML',
    ],
    cta: 'CONTACT SALES',
    ctaVariant: 'outline' as const,
  },
];

export const faqs = [
  {
    question: 'Can I change plans later?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal and bank transfers for Enterprise plans.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Pro plan comes with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What happens when I exceed my limits?',
    answer:
      "We'll notify you when you're approaching limits. You can upgrade your plan or we'll work with you on a custom solution.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund.",
  },
];

export const comparisonFeatures = [
  { name: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '1GB', pro: '10GB', enterprise: 'Unlimited' },
  { name: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { name: 'API Access', starter: false, pro: true, enterprise: true },
  { name: 'Custom Domains', starter: false, pro: true, enterprise: true },
  {
    name: 'Analytics',
    starter: 'Basic',
    pro: 'Advanced',
    enterprise: 'Enterprise',
  },
  { name: 'Support SLA', starter: '48h', pro: '24h', enterprise: '1h' },
  { name: 'SSO/SAML', starter: false, pro: false, enterprise: true },
  { name: 'Audit Logs', starter: false, pro: false, enterprise: true },
  {
    name: 'Dedicated Account Manager',
    starter: false,
    pro: false,
    enterprise: true,
  },
];
