/**
 * Comparison Data - Feature matrix vs competitors
 */

import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from './stats';

export const COMPARISON_FEATURES = [
  {
    id: 'components',
    name: 'Components',
    fabrk: COMPONENT_COUNT_STRING,
    shipfast: '~40',
    magicui: '~150',
    saasboldkit: '~60',
  },
  {
    id: 'terminal-ui',
    name: 'Terminal UI',
    fabrk: true,
    shipfast: false,
    magicui: false,
    saasboldkit: false,
  },
  {
    id: 'wcag-aaa',
    name: 'WCAG AAA Compliant',
    fabrk: true,
    shipfast: false,
    magicui: false,
    saasboldkit: false,
  },
  {
    id: 'typescript',
    name: 'TypeScript Strict',
    fabrk: true,
    shipfast: true,
    magicui: true,
    saasboldkit: true,
  },
  {
    id: 'nextauth',
    name: 'NextAuth v5',
    fabrk: true,
    shipfast: false,
    magicui: false,
    saasboldkit: true,
  },
  {
    id: 'payment-providers',
    name: 'Payment Providers',
    fabrk: 'Stripe, Lemon Squeezy, Polar',
    shipfast: 'Stripe only',
    magicui: 'Stripe only',
    saasboldkit: 'Stripe only',
  },
  {
    id: 'multitenancy',
    name: 'Multi-Tenancy',
    fabrk: true,
    shipfast: false,
    magicui: false,
    saasboldkit: true,
  },
  {
    id: 'theme-switching',
    name: 'Theme Switching',
    fabrk: `${THEME_COUNT_STRING} themes`,
    shipfast: 'Light/Dark',
    magicui: 'Light/Dark',
    saasboldkit: 'Light/Dark',
  },
  {
    id: 'price',
    name: 'Price',
    fabrk: '$299',
    shipfast: '$169',
    magicui: '$199',
    saasboldkit: '$499',
  },
] as const;
