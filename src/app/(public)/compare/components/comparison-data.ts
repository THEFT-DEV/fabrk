/**
 * Comparison data for FABRK vs other SaaS boilerplates
 */

export interface ComparisonFeature {
  name: string;
  fabrk: string | boolean;
  typical: string | boolean;
  category: string;
}

export interface ComparisonItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: ComparisonFeature[];
}

export const FABRK_ADVANTAGES = [
  { stat: '70+', label: 'PRE-BUILT COMPONENTS' },
  { stat: '18', label: 'TERMINAL THEMES' },
  { stat: '4', label: 'AI PROVIDERS' },
  { stat: '3', label: 'PAYMENT PROCESSORS' },
  { stat: 'FREE', label: 'OPEN SOURCE' },
] as const;

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  // Design System
  { name: 'Component Library', fabrk: '70+ components', typical: '10-20 components', category: 'Design' },
  { name: 'Theme System', fabrk: '18 terminal themes', typical: '1-3 themes', category: 'Design' },
  { name: 'Chart Components', fabrk: '8 chart types', typical: 'None or 1-2', category: 'Design' },
  { name: 'Design Tokens', fabrk: true, typical: false, category: 'Design' },
  { name: 'Dark Mode', fabrk: true, typical: true, category: 'Design' },

  // Authentication
  { name: 'OAuth Providers', fabrk: 'Google + extensible', typical: 'Google only', category: 'Auth' },
  { name: 'Magic Links', fabrk: true, typical: false, category: 'Auth' },
  { name: 'Multi-Factor Auth', fabrk: true, typical: false, category: 'Auth' },
  { name: 'Session Management', fabrk: 'JWT + DB sessions', typical: 'JWT only', category: 'Auth' },

  // Payments
  { name: 'Payment Providers', fabrk: 'Stripe, Polar, Lemon Squeezy', typical: 'Stripe only', category: 'Payments' },
  { name: 'Free Trial System', fabrk: true, typical: false, category: 'Payments' },
  { name: 'Credit System', fabrk: true, typical: false, category: 'Payments' },
  { name: 'Webhook Handling', fabrk: true, typical: true, category: 'Payments' },

  // AI Features
  { name: 'AI Providers', fabrk: 'Anthropic, OpenAI, Google, Ollama', typical: 'OpenAI only', category: 'AI' },
  { name: 'Streaming Chat', fabrk: true, typical: true, category: 'AI' },
  { name: 'Vector Memory (RAG)', fabrk: 'Qdrant + in-memory', typical: 'None', category: 'AI' },
  { name: 'Web Search + Synthesis', fabrk: 'SearXNG integration', typical: 'None', category: 'AI' },
  { name: 'AI Cost Tracking', fabrk: true, typical: false, category: 'AI' },
  { name: 'Text Tools', fabrk: '6 operations', typical: 'None', category: 'AI' },
  { name: 'Image Generation', fabrk: true, typical: false, category: 'AI' },
  { name: 'Speech-to-Text / TTS', fabrk: true, typical: false, category: 'AI' },
  { name: 'Form Generation', fabrk: 'Structured output', typical: 'None', category: 'AI' },

  // Infrastructure
  { name: 'Background Jobs', fabrk: 'BullMQ + Redis', typical: 'None or cron only', category: 'Infrastructure' },
  { name: 'Structured Logging', fabrk: 'Pino (JSON + pretty)', typical: 'console.log', category: 'Infrastructure' },
  { name: 'Redis Cache', fabrk: 'Write-through + fallback', typical: 'None', category: 'Infrastructure' },
  { name: 'File Uploads', fabrk: 'S3/R2/local', typical: 'None or S3 only', category: 'Infrastructure' },
  { name: 'Rate Limiting', fabrk: true, typical: false, category: 'Infrastructure' },
  { name: 'Health Endpoint', fabrk: true, typical: false, category: 'Infrastructure' },
  { name: 'Feature Flags', fabrk: 'Env-driven toggles', typical: 'None', category: 'Infrastructure' },

  // Internationalization
  { name: 'i18n Support', fabrk: '6 languages (next-intl)', typical: 'None', category: 'Infrastructure' },
  { name: 'Locale Detection', fabrk: 'Auto (Accept-Language + cookie)', typical: 'None', category: 'Infrastructure' },

  // Developer Experience
  { name: 'Setup Wizard', fabrk: 'Interactive CLI', typical: 'Manual .env', category: 'DX' },
  { name: 'Docker Compose', fabrk: 'Postgres + Redis + optional', typical: 'None or basic', category: 'DX' },
  { name: 'Pre-commit Hooks', fabrk: 'Husky + lint-staged', typical: 'None', category: 'DX' },
  { name: 'E2E Tests', fabrk: 'Playwright', typical: 'None', category: 'DX' },
  { name: 'Unit Tests', fabrk: 'Vitest (500+ tests)', typical: 'None or minimal', category: 'DX' },
  { name: 'AI Dev Tools', fabrk: 'AGENTS.md, MCP server, .ai/', typical: 'None', category: 'DX' },

  // Documentation
  { name: 'Docs Pages', fabrk: '190+ pages', typical: '10-30 pages', category: 'Docs' },
  { name: 'Interactive Docs', fabrk: 'Live component demos', typical: 'Static markdown', category: 'Docs' },
  { name: 'Recipes/Guides', fabrk: '5+ step-by-step guides', typical: 'README only', category: 'Docs' },

  // Pricing
  { name: 'License', fabrk: 'Open source', typical: '$149-$399 one-time', category: 'Pricing' },
  { name: 'Updates', fabrk: 'Free forever', typical: 'Paid upgrades', category: 'Pricing' },
];

export const CATEGORIES = [
  'Design',
  'Auth',
  'Payments',
  'AI',
  'Infrastructure',
  'DX',
  'Docs',
  'Pricing',
] as const;
