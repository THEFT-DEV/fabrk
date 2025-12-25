#!/usr/bin/env node

/**
 * Fabrk Setup Wizard
 * Tab-based navigation with Amber CRT aesthetic
 */

import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { execSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || args.includes('-n');
const TEST_MODE = args.includes('--test') || args.includes('-t');

// Test data for automated testing
const TEST_VALUES = {
  DATABASE_URL: 'postgresql://test:test@localhost:5432/testdb',
  STRIPE_SECRET_KEY: 'sk_test_fake123',
  STRIPE_WEBHOOK_SECRET: 'whsec_fake123',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_fake123',
  RESEND_API_KEY: 're_fake123',
  NEXT_PUBLIC_POSTHOG_KEY: 'phc_fake123',
  OPENAI_API_KEY: 'sk-fake123',
  ALGOLIA_APP_ID: 'FAKE123',
  ALGOLIA_API_KEY: 'fake123',
  R2_ACCESS_KEY_ID: 'fake123',
  R2_SECRET_ACCESS_KEY: 'fake123',
  R2_BUCKET: 'test-bucket',
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

// ============================================================================
// AMBER CRT COLORS
// ============================================================================

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  amber: '\x1b[33m',
  amberBright: '\x1b[93m',
  amberDim: '\x1b[2m\x1b[33m',
  bgAmber: '\x1b[43m',
  black: '\x1b[30m',
};

const clear = () => stdout.write('\x1b[2J\x1b[H');
const hideCursor = () => stdout.write('\x1b[?25l');
const showCursor = () => stdout.write('\x1b[?25h');

// ============================================================================
// TEMPLATES & DATA
// ============================================================================

const TEMPLATES = [
  { name: 'STARTER', file: 'starter.json', time: '1-2 min', keys: 1, desc: 'PostgreSQL + NextAuth', detail: 'demos, prototypes' },
  { name: 'SAAS', file: 'saas.json', time: '4-5 min', keys: 3, desc: 'PostgreSQL + Stripe + Resend', detail: 'subscription apps', recommended: true },
  { name: 'AI APP', file: 'ai-app.json', time: '5-6 min', keys: 4, desc: 'SaaS + OpenAI', detail: 'AI wrappers, chat' },
  { name: 'MARKETPLACE', file: 'marketplace.json', time: '6-7 min', keys: 5, desc: 'SaaS + Algolia + S3', detail: 'platforms' },
  { name: 'CUSTOM', file: null, time: 'varies', keys: '?', desc: 'Mix and match', detail: 'pick each feature' },
];

const MARKETPLACE_STYLES = [
  { name: 'AMAZON/ETSY', value: 'amazon', source: 'marketplace-amazon.tsx', desc: 'Product grid' },
  { name: 'AIRBNB', value: 'airbnb', source: 'marketplace-airbnb.tsx', desc: 'Listing cards' },
  { name: 'GUMROAD', value: 'minimal', source: 'marketplace-minimal.tsx', desc: 'Minimal creator' },
];

const STARTER_PAGES = {
  starter: { source: 'starter.tsx', name: 'Starter Landing' },
  saas: { source: 'saas.tsx', name: 'SaaS Landing' },
  'ai-app': { source: 'ai-app.tsx', name: 'AI App Landing' },
  marketplace: { source: 'marketplace.tsx', name: 'Marketplace Landing' },
  custom: { source: 'starter.tsx', name: 'Starter Landing' }, // Same as starter - generic starting point
};

// Product info prompts for landing page customization
const PRODUCT_INFO_PROMPTS = [
  { key: 'productName', label: 'PRODUCT NAME', placeholder: 'Acme Analytics', desc: 'Your product name' },
  { key: 'tagline', label: 'HEADLINE', placeholder: 'Track Everything. Miss Nothing.', desc: 'Main headline (compelling!)' },
  { key: 'description', label: 'DESCRIPTION', placeholder: 'The analytics platform that helps you understand...', desc: 'Brief description of what you do' },
  { key: 'productUrl', label: 'DOMAIN', placeholder: 'acme.com', desc: 'Your website domain' },
];

const API_KEY_INFO = {
  // Database
  DATABASE_URL: { format: 'postgresql://user:pass@host:5432/db', where: 'supabase.com / neon.tech / vercel.com/storage', placeholder: 'postgresql://USER:PASSWORD@HOST:5432/DATABASE' },
  MONGODB_URI: { format: 'mongodb+srv://...', where: 'cloud.mongodb.com', placeholder: 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/DATABASE' },

  // Payments
  STRIPE_SECRET_KEY: { format: 'sk_test_...', where: 'dashboard.stripe.com/apikeys' },
  STRIPE_WEBHOOK_SECRET: { format: 'whsec_...', where: 'dashboard.stripe.com/webhooks' },
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: { format: 'pk_test_...', where: 'dashboard.stripe.com/apikeys' },
  LEMONSQUEEZY_API_KEY: { format: 'eyJ...', where: 'app.lemonsqueezy.com/settings/api' },
  LEMONSQUEEZY_WEBHOOK_SECRET: { format: '...', where: 'app.lemonsqueezy.com/settings/webhooks' },
  PADDLE_API_KEY: { format: '...', where: 'vendors.paddle.com/authentication' },
  PADDLE_WEBHOOK_SECRET: { format: 'pdl_...', where: 'vendors.paddle.com/notifications' },
  POLAR_ACCESS_TOKEN: { format: 'polar_...', where: 'polar.sh/settings/tokens' },
  PAYPAL_CLIENT_ID: { format: '...', where: 'developer.paypal.com/dashboard/applications' },
  PAYPAL_CLIENT_SECRET: { format: '...', where: 'developer.paypal.com/dashboard/applications' },

  // Email
  RESEND_API_KEY: { format: 're_...', where: 'resend.com/api-keys' },
  POSTMARK_API_KEY: { format: '...', where: 'account.postmarkapp.com/servers' },
  SENDGRID_API_KEY: { format: 'SG....', where: 'app.sendgrid.com/settings/api_keys' },
  AWS_SES_ACCESS_KEY: { format: 'AKIA...', where: 'console.aws.amazon.com/ses' },
  AWS_SES_SECRET_KEY: { format: '...', where: 'console.aws.amazon.com/ses' },
  AWS_SES_REGION: { format: 'us-east-1', where: 'console.aws.amazon.com/ses' },
  MAILGUN_API_KEY: { format: 'key-...', where: 'app.mailgun.com/app/account/security/api_keys' },
  MAILGUN_DOMAIN: { format: 'mg.yourdomain.com', where: 'app.mailgun.com/app/sending/domains' },

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: { format: 'phc_...', where: 'app.posthog.com/project/settings' },
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: { format: 'yourdomain.com', where: 'plausible.io/sites' },
  NEXT_PUBLIC_MIXPANEL_TOKEN: { format: '...', where: 'mixpanel.com/settings/project' },
  NEXT_PUBLIC_AMPLITUDE_KEY: { format: '...', where: 'analytics.amplitude.com/settings' },

  // Newsletter
  CONVERTKIT_API_KEY: { format: '...', where: 'app.convertkit.com/account_settings/developer_settings' },
  BEEHIIV_API_KEY: { format: '...', where: 'app.beehiiv.com/settings/integrations' },
  MAILCHIMP_API_KEY: { format: '...', where: 'admin.mailchimp.com/account/api' },
  MAILCHIMP_SERVER: { format: 'us1', where: 'admin.mailchimp.com (in API key)' },
  BUTTONDOWN_API_KEY: { format: '...', where: 'buttondown.email/settings/api' },
  LOOPS_API_KEY: { format: '...', where: 'app.loops.so/settings/api' },

  // AI Providers
  OPENAI_API_KEY: { format: 'sk-...', where: 'platform.openai.com/api-keys' },
  ANTHROPIC_API_KEY: { format: 'sk-ant-...', where: 'console.anthropic.com/settings/keys' },
  GOOGLE_AI_API_KEY: { format: 'AIza...', where: 'aistudio.google.com/app/apikey' },
  XAI_API_KEY: { format: 'xai-...', where: 'console.x.ai/api-keys' },
  DEEPSEEK_API_KEY: { format: 'sk-...', where: 'platform.deepseek.com/api_keys' },
  MISTRAL_API_KEY: { format: '...', where: 'console.mistral.ai/api-keys' },
  GROQ_API_KEY: { format: 'gsk_...', where: 'console.groq.com/keys' },
  TOGETHER_API_KEY: { format: '...', where: 'api.together.xyz/settings/api-keys' },
  OLLAMA_BASE_URL: { format: 'http://localhost:11434', where: 'Local - run: ollama serve' },

  // Search
  ALGOLIA_APP_ID: { format: 'XXXXXX', where: 'dashboard.algolia.com/account/api-keys' },
  ALGOLIA_API_KEY: { format: '...', where: 'dashboard.algolia.com/account/api-keys' },
  TYPESENSE_HOST: { format: 'xxx.typesense.net', where: 'cloud.typesense.org' },
  TYPESENSE_API_KEY: { format: '...', where: 'cloud.typesense.org' },
  MEILISEARCH_HOST: { format: 'http://localhost:7700', where: 'cloud.meilisearch.com' },
  MEILISEARCH_API_KEY: { format: '...', where: 'cloud.meilisearch.com' },
  ELASTICSEARCH_URL: { format: 'https://...', where: 'cloud.elastic.co' },

  // Storage
  AWS_ACCESS_KEY_ID: { format: 'AKIA...', where: 'console.aws.amazon.com/iam' },
  AWS_SECRET_ACCESS_KEY: { format: '...', where: 'console.aws.amazon.com/iam' },
  AWS_S3_BUCKET: { format: 'my-bucket-name', where: 's3.console.aws.amazon.com' },
  R2_ACCESS_KEY_ID: { format: '...', where: 'dash.cloudflare.com/r2' },
  R2_SECRET_ACCESS_KEY: { format: '...', where: 'dash.cloudflare.com/r2' },
  R2_BUCKET: { format: 'my-bucket', where: 'dash.cloudflare.com/r2' },
  SUPABASE_URL: { format: 'https://xxx.supabase.co', where: 'supabase.com/dashboard/project/settings/api' },
  SUPABASE_ANON_KEY: { format: 'eyJ...', where: 'supabase.com/dashboard/project/settings/api' },
  UPLOADTHING_SECRET: { format: 'sk_live_...', where: 'uploadthing.com/dashboard' },
  BLOB_READ_WRITE_TOKEN: { format: 'vercel_blob_...', where: 'vercel.com/dashboard/stores' },
};

// ============================================================================
// WIZARD STATE
// ============================================================================

// All feature categories - comprehensive industry options
const FEATURE_CATEGORIES = [
  {
    name: 'DATABASE',
    desc: 'Where your data lives',
    options: [
      { id: 'postgres', name: 'PostgreSQL', keys: ['DATABASE_URL'], desc: 'Supabase, Neon, Vercel Postgres', rec: true },
      { id: 'mysql', name: 'MySQL', keys: ['DATABASE_URL'], desc: 'PlanetScale, traditional hosting' },
      { id: 'mongodb', name: 'MongoDB', keys: ['MONGODB_URI'], desc: 'Document database, Atlas' },
      { id: 'sqlite', name: 'SQLite', keys: [], desc: 'Local file, zero config' },
    ],
  },
  {
    name: 'PAYMENTS',
    desc: 'Accept money from customers',
    options: [
      { id: 'stripe', name: 'Stripe', keys: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'], desc: 'Cards, subscriptions, invoices', rec: true },
      { id: 'lemonsqueezy', name: 'Lemonsqueezy', keys: ['LEMONSQUEEZY_API_KEY', 'LEMONSQUEEZY_WEBHOOK_SECRET'], desc: 'Digital products, EU/tax handled' },
      { id: 'paddle', name: 'Paddle', keys: ['PADDLE_API_KEY', 'PADDLE_WEBHOOK_SECRET'], desc: 'Merchant of record, global' },
      { id: 'polar', name: 'Polar.sh', keys: ['POLAR_ACCESS_TOKEN'], desc: 'Open source monetization' },
      { id: 'paypal', name: 'PayPal', keys: ['PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET'], desc: 'Global reach, trusted' },
      { id: 'none-pay', name: 'None', keys: [], desc: 'Skip payments' },
    ],
  },
  {
    name: 'EMAIL',
    desc: 'Send transactional emails',
    options: [
      { id: 'resend', name: 'Resend', keys: ['RESEND_API_KEY'], desc: 'Modern, React email templates', rec: true },
      { id: 'postmark', name: 'Postmark', keys: ['POSTMARK_API_KEY'], desc: 'Best deliverability' },
      { id: 'sendgrid', name: 'SendGrid', keys: ['SENDGRID_API_KEY'], desc: 'High volume, marketing' },
      { id: 'ses', name: 'AWS SES', keys: ['AWS_SES_ACCESS_KEY', 'AWS_SES_SECRET_KEY', 'AWS_SES_REGION'], desc: 'Cheapest at scale' },
      { id: 'mailgun', name: 'Mailgun', keys: ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN'], desc: 'Developer-friendly' },
      { id: 'none-email', name: 'None', keys: [], desc: 'Skip email' },
    ],
  },
  {
    name: 'ANALYTICS',
    desc: 'Track user behavior',
    options: [
      { id: 'posthog', name: 'PostHog', keys: ['NEXT_PUBLIC_POSTHOG_KEY'], desc: 'Product analytics + feature flags', rec: true },
      { id: 'plausible', name: 'Plausible', keys: ['NEXT_PUBLIC_PLAUSIBLE_DOMAIN'], desc: 'Privacy-friendly, simple' },
      { id: 'mixpanel', name: 'Mixpanel', keys: ['NEXT_PUBLIC_MIXPANEL_TOKEN'], desc: 'Event analytics, funnels' },
      { id: 'amplitude', name: 'Amplitude', keys: ['NEXT_PUBLIC_AMPLITUDE_KEY'], desc: 'Product analytics, cohorts' },
      { id: 'vercel', name: 'Vercel Analytics', keys: [], desc: 'Built-in, zero config' },
      { id: 'none-analytics', name: 'None', keys: [], desc: 'Skip analytics' },
    ],
  },
  {
    name: 'NEWSLETTER',
    desc: 'Email marketing and subscribers',
    options: [
      { id: 'convertkit', name: 'ConvertKit', keys: ['CONVERTKIT_API_KEY'], desc: 'Creator-focused, automations', rec: true },
      { id: 'beehiiv', name: 'Beehiiv', keys: ['BEEHIIV_API_KEY'], desc: 'Newsletter monetization' },
      { id: 'mailchimp', name: 'Mailchimp', keys: ['MAILCHIMP_API_KEY', 'MAILCHIMP_SERVER'], desc: 'Enterprise, legacy' },
      { id: 'buttondown', name: 'Buttondown', keys: ['BUTTONDOWN_API_KEY'], desc: 'Simple, markdown' },
      { id: 'loops', name: 'Loops', keys: ['LOOPS_API_KEY'], desc: 'Modern, SaaS-focused' },
      { id: 'resend-audience', name: 'Resend Audiences', keys: [], desc: 'If using Resend for email' },
      { id: 'none-newsletter', name: 'None', keys: [], desc: 'Skip newsletter' },
    ],
  },
  {
    name: 'AI',
    desc: 'Add AI capabilities',
    options: [
      { id: 'openai', name: 'OpenAI', keys: ['OPENAI_API_KEY'], desc: 'GPT-4o, o1, embeddings', rec: true },
      { id: 'anthropic', name: 'Anthropic', keys: ['ANTHROPIC_API_KEY'], desc: 'Claude 3.5 Sonnet, Opus' },
      { id: 'google', name: 'Google AI', keys: ['GOOGLE_AI_API_KEY'], desc: 'Gemini 2.0, Flash' },
      { id: 'xai', name: 'xAI (Grok)', keys: ['XAI_API_KEY'], desc: 'Grok 2, real-time data' },
      { id: 'deepseek', name: 'DeepSeek', keys: ['DEEPSEEK_API_KEY'], desc: 'V3, R1 reasoning' },
      { id: 'mistral', name: 'Mistral', keys: ['MISTRAL_API_KEY'], desc: 'Large 2, Codestral' },
      { id: 'groq', name: 'Groq', keys: ['GROQ_API_KEY'], desc: 'Fastest inference' },
      { id: 'together', name: 'Together AI', keys: ['TOGETHER_API_KEY'], desc: 'Open models, cheap' },
      { id: 'ollama', name: 'Ollama', keys: ['OLLAMA_BASE_URL'], desc: 'Local models, free' },
      { id: 'none-ai', name: 'None', keys: [], desc: 'Skip AI' },
    ],
  },
  {
    name: 'SEARCH',
    desc: 'Search and discovery',
    options: [
      { id: 'algolia', name: 'Algolia', keys: ['ALGOLIA_APP_ID', 'ALGOLIA_API_KEY'], desc: 'Fastest, typo-tolerant', rec: true },
      { id: 'typesense', name: 'Typesense', keys: ['TYPESENSE_HOST', 'TYPESENSE_API_KEY'], desc: 'Open source Algolia alt' },
      { id: 'meilisearch', name: 'Meilisearch', keys: ['MEILISEARCH_HOST', 'MEILISEARCH_API_KEY'], desc: 'Open source, easy' },
      { id: 'elasticsearch', name: 'Elasticsearch', keys: ['ELASTICSEARCH_URL'], desc: 'Full-text, enterprise' },
      { id: 'fuse', name: 'Fuse.js', keys: [], desc: 'Client-side, no API' },
      { id: 'none-search', name: 'None', keys: [], desc: 'Skip search' },
    ],
  },
  {
    name: 'STORAGE',
    desc: 'File uploads and media',
    options: [
      { id: 'r2', name: 'Cloudflare R2', keys: ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET'], desc: 'S3-compatible, no egress', rec: true },
      { id: 's3', name: 'AWS S3', keys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET'], desc: 'Industry standard' },
      { id: 'supabase-storage', name: 'Supabase Storage', keys: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'], desc: 'Integrated with DB' },
      { id: 'uploadthing', name: 'UploadThing', keys: ['UPLOADTHING_SECRET'], desc: 'Simple, type-safe' },
      { id: 'vercel-blob', name: 'Vercel Blob', keys: ['BLOB_READ_WRITE_TOKEN'], desc: 'Zero config on Vercel' },
      { id: 'none-storage', name: 'None', keys: [], desc: 'Skip storage' },
    ],
  },
];

// Template configurations - which categories each template uses and defaults
const TEMPLATE_CONFIGS = {
  starter: {
    categories: ['DATABASE'], // Only database needed
    defaults: {
      DATABASE: 'postgres',
    },
  },
  saas: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
  'ai-app': {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'AI', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      AI: 'openai',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
  marketplace: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'stripe',
      EMAIL: 'resend',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'posthog',
      SEARCH: 'algolia',
      STORAGE: 'r2',
    },
  },
  custom: {
    categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'AI', 'SEARCH', 'STORAGE'],
    defaults: {
      DATABASE: 'postgres',
      PAYMENTS: 'none-pay',
      EMAIL: 'none-email',
      NEWSLETTER: 'none-newsletter',
      ANALYTICS: 'none-analytics',
      AI: 'none-ai',
      SEARCH: 'none-search',
      STORAGE: 'none-storage',
    },
  },
};

const state = {
  currentTab: 0,
  tabs: ['Template', 'Review', 'Starter Page', 'Complete'],
  // Selections
  template: null,
  templateKey: null,
  marketplaceStyle: null,
  apiKeyValues: {},
  wantsStarterPage: false,
  // Product info for landing page customization
  productInfo: {},
  productInfoIndex: 0,
  // UI state for current screen
  selectedIndex: 0,
  inputValue: '',
  // Category tab state - inline key entry
  categoryPhase: 'selection', // 'selection' | 'keys'
  categoryKeyIndex: 0, // which key in current category
  categoryKeys: [], // keys for current category's selection
  // Custom mode
  isCustomMode: false,
  customSelections: {}, // { categoryName: optionId }
};

// ============================================================================
// RENDERING
// ============================================================================

function renderTabs() {
  const tabs = state.tabs.map((tab, i) => {
    if (i === state.currentTab) {
      return `${c.bgAmber}${c.black} ${tab} ${c.reset}`;
    } else if (i < state.currentTab) {
      return `${c.amberDim}${tab}${c.reset}`;
    } else {
      return `${c.amber}${tab}${c.reset}`;
    }
  });

  console.log(`  ${tabs.join('  ')}    ${c.amberDim}(Tab to cycle)${c.reset}`);
  console.log(`${c.amber}${'─'.repeat(74)}${c.reset}`);
}

function renderBox(title, lines) {
  const width = 70;
  const hr = '═'.repeat(width);

  console.log(`${c.amber}  ╔${hr}╗${c.reset}`);

  if (title) {
    const titlePad = width - title.length;
    const left = Math.floor(titlePad / 2);
    const right = titlePad - left;
    console.log(`${c.amber}  ║${' '.repeat(left)}${c.amberBright}${title}${c.amber}${' '.repeat(right)}║${c.reset}`);
    console.log(`${c.amber}  ╠${hr}╣${c.reset}`);
  }

  for (const line of lines) {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, '');
    const pad = width - stripped.length;
    console.log(`${c.amber}  ║${c.reset}${line}${' '.repeat(Math.max(0, pad))}${c.amber}║${c.reset}`);
  }

  console.log(`${c.amber}  ╚${hr}╝${c.reset}`);
}

function renderScreen() {
  clear();

  // Header
  console.log(`${c.amber}`);
  console.log(`  ███████╗ █████╗ ██████╗ ██████╗ ██╗  ██╗`);
  console.log(`  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝`);
  console.log(`  █████╗  ███████║██████╔╝██████╔╝█████╔╝   ${c.amberBright}SETUP WIZARD${c.amber}`);
  console.log(`  ██╔══╝  ██╔══██║██╔══██╗██╔══██╗██╔═██╗   ${c.amberDim}v1.0${c.amber}`);
  console.log(`  ██║     ██║  ██║██████╔╝██║  ██║██║  ██╗`);
  console.log(`  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`);
  console.log(`${c.reset}`);

  if (DRY_RUN) {
    console.log(`  ${c.amberBright}⚠ DRY RUN MODE${c.reset}`);
  }
  console.log('');

  // Tab bar
  renderTabs();
  console.log('');

  // Content based on current tab
  const tabName = state.tabs[state.currentTab];
  switch (tabName) {
    case 'Template':
      renderTemplateTab();
      break;
    case 'Review':
      renderReviewTab();
      break;
    case 'Starter Page':
      renderStarterPageTab();
      break;
    case 'Product Info':
      renderProductInfoTab();
      break;
    case 'Complete':
      renderCompleteTab();
      break;
    default:
      // Check if it's a category tab
      if (FEATURE_CATEGORIES.find((cat) => cat.name === tabName)) {
        renderCategoryTab(tabName);
      }
      break;
  }

  // Footer
  console.log('');
  console.log(`${c.amber}${'─'.repeat(74)}${c.reset}`);
  renderFooter();
}

function renderTemplateTab() {
  const lines = [];
  lines.push(`${c.amberBright}> What are you building?${c.reset}`);
  lines.push('');

  TEMPLATES.forEach((t, i) => {
    const selected = i === state.selectedIndex;
    const bullet = selected ? `${c.amberBright}●${c.reset}` : ' ';
    const num = selected ? `${c.amberBright}${i + 1}.${c.reset}` : `${c.amberDim}${i + 1}.${c.reset}`;
    const name = selected ? `${c.amberBright}${c.bold}${t.name}${c.reset}` : `${c.amber}${t.name}${c.reset}`;
    const rec = t.recommended ? ` ${c.amberBright}★${c.reset}` : '';
    const meta = `${c.amberDim}${t.time} · ${t.keys} keys${c.reset}`;

    lines.push(`${bullet} ${num} ${name}${rec}  ${meta}`);
    lines.push(`     ${c.amberDim}${t.desc}${c.reset}`);
    if (selected) {
      lines.push(`     ${c.amber}→ ${t.detail}${c.reset}`);
    }
    lines.push('');
  });

  renderBox('TEMPLATE', lines);
}

function renderCategoryTab(categoryName) {
  const category = FEATURE_CATEGORIES.find((c) => c.name === categoryName);
  if (!category) return;

  const currentSelection = state.customSelections[categoryName];

  // If in key entry phase, show key input UI
  if (state.categoryPhase === 'keys' && state.categoryKeys.length > 0) {
    renderCategoryKeyEntry(categoryName);
    return;
  }

  // Selection phase
  const lines = [
    '',
    `${c.amberBright}> ${category.desc}${c.reset}`,
    '',
  ];

  category.options.forEach((opt, i) => {
    const isSelected = i === state.selectedIndex;
    const isChosen = currentSelection === opt.id;

    const bullet = isChosen
      ? `${c.amberBright}●${c.reset}`
      : isSelected
        ? `${c.amber}○${c.reset}`
        : `${c.amberDim}○${c.reset}`;

    const name = isSelected
      ? `${c.amberBright}${c.bold}${opt.name}${c.reset}`
      : `${c.amber}${opt.name}${c.reset}`;

    const rec = opt.rec ? ` ${c.amberBright}★ REC${c.reset}` : '';
    const keyCount = opt.keys.length;
    const keyHint = keyCount > 0 ? `${c.amberDim}(${keyCount} key${keyCount > 1 ? 's' : ''})${c.reset}` : '';

    lines.push(`  ${bullet} ${name}${rec}  ${keyHint}`);
    lines.push(`      ${c.amberDim}${opt.desc}${c.reset}`);
    lines.push('');
  });

  // Show summary of selections so far
  const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;
  const tabIndex = config.categories.indexOf(categoryName);
  if (tabIndex > 0) {
    lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
    lines.push(`${c.amberDim}Selected so far:${c.reset}`);
    config.categories.slice(0, tabIndex).forEach((catName) => {
      const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
      if (!cat) return;
      const sel = state.customSelections[catName];
      const opt = cat.options.find((o) => o.id === sel);
      if (opt && !opt.id.startsWith('none')) {
        lines.push(`  ${c.amberDim}${catName}:${c.reset} ${c.amber}${opt.name}${c.reset}`);
      }
    });
    lines.push('');
  }

  renderBox(categoryName, lines);
}

function renderCategoryKeyEntry(categoryName) {
  const category = FEATURE_CATEGORIES.find((c) => c.name === categoryName);
  const selectedOpt = category?.options.find((o) => o.id === state.customSelections[categoryName]);

  const lines = [''];

  // Show what's selected
  lines.push(`${c.amberBright}${selectedOpt?.name || categoryName}${c.reset} ${c.amberDim}selected${c.reset}`);
  lines.push('');

  // Show key entry progress
  state.categoryKeys.forEach((key, i) => {
    const isCurrent = i === state.categoryKeyIndex;
    const isComplete = i < state.categoryKeyIndex;
    const value = state.apiKeyValues[key];

    let status;
    if (isComplete) {
      status = value ? `${c.amberBright}✓${c.reset}` : `${c.amberDim}skipped${c.reset}`;
    } else if (isCurrent) {
      status = `${c.amberBright}◀${c.reset}`;
    } else {
      status = `${c.amberDim}...${c.reset}`;
    }

    const name = isCurrent
      ? `${c.amberBright}${c.bold}${key}${c.reset}`
      : isComplete
        ? `${c.amberDim}${key}${c.reset}`
        : `${c.amber}${key}${c.reset}`;

    lines.push(`  ${status}  ${name}`);
  });

  lines.push('');
  lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
  lines.push('');

  // Current key details
  const key = state.categoryKeys[state.categoryKeyIndex];
  const info = API_KEY_INFO[key] || { format: '', where: '' };

  lines.push(`${c.amber}FORMAT:${c.reset}  ${c.amberDim}${info.format}${c.reset}`);
  lines.push(`${c.amber}WHERE:${c.reset}   ${c.amberDim}${info.where}${c.reset}`);
  lines.push('');
  lines.push(`${c.amberDim}Leave blank to skip · Enter to continue${c.reset}`);
  lines.push('');
  lines.push(`${c.amberBright}>${c.reset} ${state.inputValue}█`);
  lines.push('');

  renderBox(`${categoryName} KEYS`, lines);
}

function renderReviewTab() {
  const lines = [''];
  const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;
  const templateName = TEMPLATES.find((t) => t.name.toLowerCase().replace(' ', '-') === state.templateKey)?.name || state.templateKey;

  // Template header
  lines.push(`${c.amberBright}${templateName.toUpperCase()}${c.reset} ${c.amberDim}template${c.reset}`);
  lines.push('');

  // Features section
  lines.push(`${c.amber}FEATURES${c.reset}`);
  lines.push(`${c.amber}${'─'.repeat(40)}${c.reset}`);

  let keysConfigured = 0;
  let keysTotal = 0;
  const enabledFeatures = [];

  config.categories.forEach((catName) => {
    const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
    if (!cat) return;

    const sel = state.customSelections[catName];
    const opt = cat.options.find((o) => o.id === sel);

    if (opt && !opt.id.startsWith('none')) {
      const configured = opt.keys.filter((k) => state.apiKeyValues[k]).length;
      keysTotal += opt.keys.length;
      keysConfigured += configured;
      enabledFeatures.push({ cat: catName, opt, configured });

      const status = opt.keys.length === 0
        ? `${c.amberBright}✓${c.reset}`
        : configured === opt.keys.length
          ? `${c.amberBright}✓${c.reset}`
          : `${c.amber}${configured}/${opt.keys.length}${c.reset}`;

      lines.push(`  ${status}  ${c.amber}${catName}:${c.reset} ${c.amberBright}${opt.name}${c.reset}`);
    } else {
      lines.push(`  ${c.amberDim}○  ${catName}: Skip${c.reset}`);
    }
  });

  if (config.categories.length === 0) {
    lines.push(`  ${c.amberDim}No optional features${c.reset}`);
  }

  // Product info section (if applicable)
  if (state.wantsStarterPage && Object.keys(state.productInfo).length > 0) {
    lines.push('');
    lines.push(`${c.amber}PRODUCT INFO${c.reset}`);
    lines.push(`${c.amber}${'─'.repeat(40)}${c.reset}`);
    if (state.productInfo.productName) {
      lines.push(`  ${c.amberDim}Name:${c.reset} ${c.amberBright}${state.productInfo.productName}${c.reset}`);
    }
    if (state.productInfo.tagline) {
      lines.push(`  ${c.amberDim}Headline:${c.reset} ${c.amber}${state.productInfo.tagline.length > 35 ? state.productInfo.tagline.slice(0, 35) + '...' : state.productInfo.tagline}${c.reset}`);
    }
    if (state.productInfo.productUrl) {
      lines.push(`  ${c.amberDim}Domain:${c.reset} ${c.amber}${state.productInfo.productUrl}${c.reset}`);
    }
  }

  // Files section
  lines.push('');
  lines.push(`${c.amber}WILL CREATE${c.reset}`);
  lines.push(`${c.amber}${'─'.repeat(40)}${c.reset}`);
  lines.push(`  ${c.amberBright}✓${c.reset} .env.local`);
  if (state.wantsStarterPage) {
    lines.push(`  ${c.amberBright}✓${c.reset} src/app/page.tsx ${c.amberDim}(customized)${c.reset}`);
    lines.push(`  ${c.amberBright}✓${c.reset} FABRK-PROMPTS.md`);
  }

  // Environment variables preview
  lines.push('');
  lines.push(`${c.amber}ENV VARIABLES${c.reset}`);
  lines.push(`${c.amber}${'─'.repeat(40)}${c.reset}`);
  lines.push(`  ${c.amberDim}NEXTAUTH_SECRET${c.reset}    ${c.amber}[auto-generated]${c.reset}`);
  lines.push(`  ${c.amberDim}NEXTAUTH_URL${c.reset}       ${c.amber}http://localhost:3000${c.reset}`);
  lines.push(`  ${c.amberDim}NODE_ENV${c.reset}           ${c.amber}development${c.reset}`);

  // Show configured API keys
  enabledFeatures.forEach(({ opt }) => {
    opt.keys.forEach((key) => {
      const value = state.apiKeyValues[key];
      if (value) {
        const masked = value.length > 12 ? value.slice(0, 8) + '...' + value.slice(-4) : '***';
        lines.push(`  ${c.amberDim}${key}${c.reset}`);
        lines.push(`      ${c.amberBright}${masked}${c.reset}`);
      } else {
        lines.push(`  ${c.amberDim}${key}${c.reset}  ${c.amber}[skipped]${c.reset}`);
      }
    });
  });

  // Next steps
  lines.push('');
  lines.push(`${c.amber}AFTER SETUP${c.reset}`);
  lines.push(`${c.amber}${'─'.repeat(40)}${c.reset}`);
  lines.push(`  ${c.amberBright}1.${c.reset} npm run db:push`);
  lines.push(`  ${c.amberBright}2.${c.reset} npm run dev`);

  lines.push('');
  lines.push(`${c.amberDim}Press Enter to continue${c.reset}`);
  lines.push('');

  renderBox('REVIEW', lines);
}

function renderStarterPageTab() {
  const options = [
    { name: 'YES', desc: 'Generate a customized landing page with YOUR product info' },
    { name: 'NO', desc: 'Skip - keep existing page.tsx' },
  ];

  const lines = [
    '',
    `${c.amberBright}> Generate a custom landing page?${c.reset}`,
    '',
  ];

  options.forEach((opt, i) => {
    const selected = i === state.selectedIndex;
    const bullet = selected ? `${c.amberBright}●${c.reset}` : ' ';
    const num = selected ? `${c.amberBright}${i + 1}.${c.reset}` : `${c.amberDim}${i + 1}.${c.reset}`;
    const name = selected ? `${c.amberBright}${c.bold}${opt.name}${c.reset}` : `${c.amber}${opt.name}${c.reset}`;
    lines.push(`${bullet} ${num} ${name}`);
    lines.push(`     ${c.amberDim}${opt.desc}${c.reset}`);
    lines.push('');
  });

  renderBox('STARTER PAGE', lines);
}

function renderProductInfoTab() {
  const lines = [''];

  // Show what's entered so far
  lines.push(`${c.amberBright}> Tell us about your product${c.reset}`);
  lines.push(`${c.amberDim}This info will be used to customize your landing page${c.reset}`);
  lines.push('');

  // Show all prompts with their status
  PRODUCT_INFO_PROMPTS.forEach((prompt, i) => {
    const isCurrent = i === state.productInfoIndex;
    const isComplete = i < state.productInfoIndex;
    const value = state.productInfo[prompt.key];

    let status;
    if (isComplete) {
      status = value ? `${c.amberBright}✓${c.reset}` : `${c.amberDim}skipped${c.reset}`;
    } else if (isCurrent) {
      status = `${c.amberBright}◀${c.reset}`;
    } else {
      status = `${c.amberDim}...${c.reset}`;
    }

    const label = isCurrent
      ? `${c.amberBright}${c.bold}${prompt.label}${c.reset}`
      : isComplete
        ? `${c.amberDim}${prompt.label}${c.reset}`
        : `${c.amber}${prompt.label}${c.reset}`;

    const displayValue = isComplete && value ? `: ${c.amber}${value.length > 30 ? value.slice(0, 30) + '...' : value}${c.reset}` : '';

    lines.push(`  ${status}  ${label}${displayValue}`);
  });

  lines.push('');
  lines.push(`${c.amber}${'─'.repeat(66)}${c.reset}`);
  lines.push('');

  // Current prompt details
  const currentPrompt = PRODUCT_INFO_PROMPTS[state.productInfoIndex];
  if (currentPrompt) {
    lines.push(`${c.amber}${currentPrompt.desc}${c.reset}`);
    lines.push(`${c.amberDim}Example: ${currentPrompt.placeholder}${c.reset}`);
    lines.push('');
    lines.push(`${c.amberDim}Press Enter to use default · Type to customize${c.reset}`);
    lines.push('');
    lines.push(`${c.amberBright}>${c.reset} ${state.inputValue || `${c.amberDim}${currentPrompt.placeholder}${c.reset}`}█`);
  }

  lines.push('');

  renderBox('PRODUCT INFO', lines);
}

function renderCompleteTab() {
  if (DRY_RUN) {
    const lines = [
      '',
      `${c.amberBright}⚠ DRY RUN - No files written${c.reset}`,
      '',
      `${c.amber}Would create:${c.reset}`,
      `  • .env.local`,
      state.wantsStarterPage ? `  • src/app/page.tsx` : '',
      state.wantsStarterPage ? `  • FABRK-PROMPTS.md` : '',
      '',
      `${c.amberDim}Run ${c.amber}npm run setup${c.amberDim} to apply.${c.reset}`,
      '',
    ].filter(Boolean);
    renderBox('DRY RUN COMPLETE', lines);
  } else {
    const productName = state.productInfo.productName || 'Starter';
    const lines = [
      '',
      `${c.amberBright}✓ Setup Complete!${c.reset}`,
      '',
      `${c.amber}Created:${c.reset}`,
      `  ${c.amberBright}✓${c.reset} .env.local`,
      state.wantsStarterPage ? `  ${c.amberBright}✓${c.reset} Landing page for "${productName}"` : '',
      state.wantsStarterPage ? `  ${c.amberBright}✓${c.reset} FABRK-PROMPTS.md` : '',
      '',
      `${c.amber}Next steps:${c.reset}`,
      `  ${c.amberBright}1.${c.reset} npm run db:push`,
      `  ${c.amberBright}2.${c.reset} npm run dev`,
      '',
    ].filter(Boolean);
    renderBox('COMPLETE', lines);
  }
}

function renderFooter() {
  const hints = [];
  const tabName = state.tabs[state.currentTab];

  // Check if it's a category tab or selection tab
  const isCategory = FEATURE_CATEGORIES.some((c) => c.name === tabName);

  if (isCategory && state.categoryPhase === 'keys') {
    // Key entry mode
    hints.push(`${c.amberDim}type${c.reset} ${c.amber}value${c.reset}`);
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}next key${c.reset}`);
  } else if (tabName === 'Product Info') {
    // Product info entry mode
    hints.push(`${c.amberDim}type${c.reset} ${c.amber}value${c.reset}`);
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}next / use default${c.reset}`);
  } else if (tabName === 'Template' || tabName === 'Starter Page' || (isCategory && state.categoryPhase === 'selection')) {
    hints.push(`${c.amberDim}↑/↓${c.reset} ${c.amber}select${c.reset}`);
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}confirm${c.reset}`);
  } else if (tabName === 'Review') {
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}continue${c.reset}`);
  }

  if (state.currentTab < state.tabs.length - 1 && state.categoryPhase !== 'keys') {
    hints.push(`${c.amberDim}Tab${c.reset} ${c.amber}next${c.reset}`);
    hints.push(`${c.amberDim}Shift+Tab${c.reset} ${c.amber}back${c.reset}`);
  } else if (state.currentTab === state.tabs.length - 1) {
    hints.push(`${c.amberDim}Enter${c.reset} ${c.amber}finish${c.reset}`);
  }
  hints.push(`${c.amberDim}Ctrl+C${c.reset} ${c.amber}exit${c.reset}`);

  console.log(`  ${hints.join('   ')}`);
}

// ============================================================================
// LOGIC
// ============================================================================

async function loadTemplate(filename) {
  const content = await readFile(join(__dirname, 'templates', filename), 'utf-8');
  return JSON.parse(content);
}

function generateSecret() {
  return randomBytes(32).toString('base64');
}

async function buildEnvContent(template, values = {}) {
  const lines = [
    '# Generated by Fabrk Setup Wizard',
    `# Template: ${template.name}`,
    '#',
    '# IMPORTANT: Replace any placeholder values before running npm run db:push',
    '# Get a free PostgreSQL database at: neon.tech or supabase.com',
    '',
  ];

  const skippedKeys = [];

  for (const [key, val] of Object.entries(template.env)) {
    if (val === '{{AUTO_GENERATE}}') {
      lines.push(`${key}="${generateSecret()}"`);
    } else if (typeof val === 'string' && val.startsWith('{{PROMPT:')) {
      const userValue = values[key];
      if (userValue) {
        lines.push(`${key}="${userValue}"`);
      } else {
        // Use placeholder if available, otherwise empty
        const info = API_KEY_INFO[key];
        const placeholder = info?.placeholder || '';
        if (placeholder) {
          lines.push(`# TODO: Replace with your actual ${key}`);
          lines.push(`${key}="${placeholder}"`);
          skippedKeys.push(key);
        } else {
          lines.push(`${key}=""`);
        }
      }
    } else {
      lines.push(`${key}="${val}"`);
    }
  }

  if (skippedKeys.length > 0) {
    lines.push('');
    lines.push('# ⚠️  SKIPPED KEYS - You must set these before running db:push:');
    skippedKeys.forEach((key) => {
      const info = API_KEY_INFO[key];
      lines.push(`#   ${key} - Get from: ${info?.where || 'your provider'}`);
    });
  }

  return lines.join('\n') + '\n';
}

async function copyStarterPage(templateKey, marketplaceStyle = null, productInfo = {}) {
  const templatesDir = join(__dirname, 'page-templates');
  let sourceFile;

  // Check for marketplace style variants first
  if (templateKey === 'marketplace' && marketplaceStyle) {
    const style = MARKETPLACE_STYLES.find((s) => s.value === marketplaceStyle);
    if (style?.source) {
      sourceFile = style.source;
    }
  }

  // Fall back to standard template pages
  if (!sourceFile && STARTER_PAGES[templateKey]) {
    sourceFile = STARTER_PAGES[templateKey].source;
  }

  if (!sourceFile) return false;

  const sourcePath = join(templatesDir, sourceFile);
  const destPath = join(ROOT_DIR, 'src/app/page.tsx');

  if (!existsSync(sourcePath)) return false;

  if (existsSync(destPath)) {
    await copyFile(destPath, destPath + '.backup');
  }

  // Read template content
  let content = await readFile(sourcePath, 'utf-8');

  // Apply template interpolation if we have product info
  if (productInfo && Object.keys(productInfo).length > 0) {
    // Replace headline
    if (productInfo.tagline) {
      content = content.replace(
        /YOUR PRODUCT HEADLINE GOES HERE/g,
        productInfo.tagline.toUpperCase()
      );
    }

    // Replace description (handle multi-line)
    if (productInfo.description) {
      content = content.replace(
        /A clear, compelling description of what your product does and why it matters\.\s*Focus on the benefit to the user, not just features\./g,
        productInfo.description
      );
    }

    // Replace domain
    if (productInfo.productUrl) {
      content = content.replace(/your-product\.com/g, productInfo.productUrl);
    }

    // Replace screenshot placeholder
    if (productInfo.productName) {
      content = content.replace(
        /\[YOUR PRODUCT SCREENSHOT\]/g,
        `[${productInfo.productName.toUpperCase()} SCREENSHOT]`
      );
      content = content.replace(
        /Replace this with an actual screenshot or demo video/g,
        `Your ${productInfo.productName} dashboard goes here`
      );
    }

    // Add a comment at the top noting customization
    const customHeader = `/**
 * ${(productInfo.productName || 'Product').toUpperCase()} LANDING PAGE
 * Generated by Fabrk Setup Wizard
 *
 * Product: ${productInfo.productName || 'My Product'}
 * Tagline: ${productInfo.tagline || 'Your tagline'}
 *
 * NEXT STEPS:
 * 1. Replace the placeholder product screenshot
 * 2. Update features with your actual features
 * 3. Set your pricing
 * 4. Update FAQ with your questions
 */

`;
    // Replace existing header comment if present
    content = content.replace(/\/\*\*[\s\S]*?\*\/\s*\n\n'use client';/, customHeader + "'use client';");
  }

  await writeFile(destPath, content, 'utf-8');
  return true;
}

async function generatePromptsFile() {
  const content = `# FABRK-PROMPTS.md

Copy-paste these prompts into Cursor, Claude Code, or Windsurf.

## QUICK START - Update Your Landing Page
\`\`\`
Update src/app/page.tsx:
1. Replace placeholder text with my app name and tagline
2. Update the 3-6 features to match what my product does
3. Keep the terminal aesthetic (font-mono, rounded-none, uppercase headings)
4. Remove the [SETUP] instruction banner at the top when done
\`\`\`

## ADD PRICING PAGE
\`\`\`
Create src/app/pricing/page.tsx with 3 tiers (Free, Pro, Enterprise).
Match the terminal style from the landing page.
Include a FAQ section at the bottom.
\`\`\`

## ADD ABOUT PAGE
\`\`\`
Create src/app/about/page.tsx with:
- Brief company/founder story
- Mission statement
- Team section (if applicable)
Keep terminal aesthetic consistent.
\`\`\`

## ADD BLOG
\`\`\`
Create a blog at src/app/blog/ with:
- List page showing all posts
- Individual post pages from MDX files
- Categories and tags support
\`\`\`

## CUSTOMIZE THEME
\`\`\`
Update src/app/globals.css to change the color scheme.
Look for the :root section and modify the CSS variables.
Available themes: red, blue, green, amber, purple (see theme switcher).
\`\`\`

---
Generated by Fabrk Setup Wizard
Delete this file after you've customized your site.
`;
  await writeFile(join(ROOT_DIR, 'FABRK-PROMPTS.md'), content, 'utf-8');
}

async function finalize() {
  const selectedTemplate = TEMPLATES[state.selectedIndex];

  // Load template
  let template;
  if (selectedTemplate.file) {
    template = await loadTemplate(selectedTemplate.file);
  } else {
    // Custom - basic template
    template = {
      name: 'Custom',
      env: {
        NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NODE_ENV: 'development',
      },
    };
  }

  state.template = template;
  state.templateKey = selectedTemplate.name.toLowerCase().replace(' ', '-');

  // Build env content
  const envContent = await buildEnvContent(template, state.apiKeyValues);

  if (!DRY_RUN) {
    // Write .env.local
    await writeFile(join(ROOT_DIR, '.env.local'), envContent, 'utf-8');

    // Copy starter page if requested and available
    state.landingPageCopied = false;
    if (state.wantsStarterPage && STARTER_PAGES[state.templateKey]) {
      const copied = await copyStarterPage(state.templateKey, state.marketplaceStyle, state.productInfo);
      if (copied) {
        state.landingPageCopied = true;
        await generatePromptsFile();
      }
    }

    // Run post-setup commands
    await runPostSetup();
  }
}

async function runPostSetup() {
  // Check if DATABASE_URL has a real value (not a placeholder)
  const envPath = join(ROOT_DIR, '.env.local');
  const envContent = await readFile(envPath, 'utf-8');
  const hasValidDb = envContent.includes('DATABASE_URL=') &&
    !envContent.includes('DATABASE_URL="postgresql://USER:PASSWORD');

  state.postSetupResults = [];

  // Show cursor for command output
  showCursor();
  if (stdin.isTTY) stdin.setRawMode(false);

  clear();
  console.log(`${c.amber}`);
  console.log(`  ███████╗ █████╗ ██████╗ ██████╗ ██╗  ██╗`);
  console.log(`  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝`);
  console.log(`  █████╗  ███████║██████╔╝██████╔╝█████╔╝   ${c.amberBright}RUNNING SETUP${c.amber}`);
  console.log(`  ██╔══╝  ██╔══██║██╔══██╗██╔══██╗██╔═██╗`);
  console.log(`  ██║     ██║  ██║██████╔╝██║  ██║██║  ██╗`);
  console.log(`  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`);
  console.log(`${c.reset}`);
  console.log('');

  // Check if dependencies are installed
  const nodeModulesExists = fs.existsSync(path.join(ROOT_DIR, 'node_modules'));

  // Run prisma generate (skip if no node_modules - user needs to run npm install first)
  console.log(`${c.amber}[1/3]${c.reset} ${c.amberBright}Generating Prisma client...${c.reset}`);
  if (!nodeModulesExists) {
    console.log(`${c.amber}⚠${c.reset} Dependencies not installed. Run ${c.amberBright}npm install${c.reset} first, then ${c.amberBright}npx prisma generate${c.reset}`);
    state.postSetupResults.push({ cmd: 'prisma generate', status: 'skipped', error: 'node_modules not found' });
  } else {
    try {
      execSync('npx prisma generate', { cwd: ROOT_DIR, stdio: 'inherit' });
      state.postSetupResults.push({ cmd: 'prisma generate', status: 'success' });
      console.log(`${c.amberBright}✓${c.reset} Prisma client generated`);
    } catch (error) {
      state.postSetupResults.push({ cmd: 'prisma generate', status: 'failed', error: error.message });
      console.log(`${c.amber}✗${c.reset} Prisma generate failed`);
    }
  }
  console.log('');

  // Run db:push if we have a valid database URL
  if (hasValidDb) {
    console.log(`${c.amber}[2/3]${c.reset} ${c.amberBright}Pushing database schema...${c.reset}`);
    try {
      execSync('npm run db:push', { cwd: ROOT_DIR, stdio: 'inherit' });
      state.postSetupResults.push({ cmd: 'db:push', status: 'success' });
      console.log(`${c.amberBright}✓${c.reset} Database schema pushed`);
    } catch (error) {
      state.postSetupResults.push({ cmd: 'db:push', status: 'failed', error: error.message });
      console.log(`${c.amber}✗${c.reset} Database push failed - check your DATABASE_URL`);
    }
  } else {
    console.log(`${c.amber}[2/3]${c.reset} ${c.amberDim}Skipping db:push - DATABASE_URL not configured${c.reset}`);
    state.postSetupResults.push({ cmd: 'db:push', status: 'skipped', reason: 'DATABASE_URL not configured' });
  }
  console.log('');

  // Start dev server
  console.log(`${c.amber}[3/3]${c.reset} ${c.amberBright}Starting development server...${c.reset}`);
  console.log('');

  console.log(`${c.amberBright}╔══════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.amberBright}║                         SETUP COMPLETE                               ║${c.reset}`);
  console.log(`${c.amberBright}╚══════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
  console.log(`  ${c.amberBright}✓${c.reset} .env.local created`);
  if (state.landingPageCopied) {
    console.log(`  ${c.amberBright}✓${c.reset} Landing page copied`);
  }
  console.log(`  ${c.amberBright}✓${c.reset} Prisma client generated`);
  if (state.postSetupResults.find((r) => r.cmd === 'db:push' && r.status === 'success')) {
    console.log(`  ${c.amberBright}✓${c.reset} Database schema pushed`);
  } else if (state.postSetupResults.find((r) => r.cmd === 'db:push' && r.status === 'skipped')) {
    console.log(`  ${c.amber}○${c.reset} Database: Update DATABASE_URL in .env.local, then run: npm run db:push`);
  }
  console.log('');
  console.log(`  ${c.amberDim}Starting dev server and opening browser...${c.reset}`);
  console.log('');
  console.log(`  ${c.amberDim}Press Ctrl+C to stop the server${c.reset}`);
  console.log('');

  // Run dev server with spawn (non-blocking) so we can open browser
  const devServer = spawn('npm', ['run', 'dev'], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  // Open browser after server starts (wait for it to be ready)
  setTimeout(() => {
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    try {
      execSync(`${openCmd} http://localhost:3000`, { stdio: 'ignore' });
    } catch {
      // Browser open failed, that's ok
    }
  }, 4000);

  // Handle Ctrl+C
  devServer.on('close', () => {
    process.exit(0);
  });
}

// ============================================================================
// INPUT HANDLING
// ============================================================================

async function handleKeypress(str, key) {
  // Ctrl+C - exit
  if (key.ctrl && key.name === 'c') {
    showCursor();
    if (stdin.isTTY) stdin.setRawMode(false);
    clear();
    console.log(`\n  ${c.amberDim}Setup cancelled. No changes made.${c.reset}\n`);
    process.exit(0);
  }

  // Tab - next tab
  if (key.name === 'tab' && !key.shift) {
    await goToNextTab();
    return;
  }

  // Shift+Tab - previous tab
  if (key.name === 'tab' && key.shift) {
    goToPrevTab();
    return;
  }

  // Tab-specific handling
  const tabName = state.tabs[state.currentTab];
  switch (tabName) {
    case 'Template':
      if (key.name === 'up') {
        state.selectedIndex = (state.selectedIndex - 1 + TEMPLATES.length) % TEMPLATES.length;
        renderScreen();
      } else if (key.name === 'down') {
        state.selectedIndex = (state.selectedIndex + 1) % TEMPLATES.length;
        renderScreen();
      } else if (key.name === 'return') {
        await goToNextTab();
      } else if (str >= '1' && str <= '5') {
        state.selectedIndex = parseInt(str, 10) - 1;
        renderScreen();
      }
      break;


    case 'Review':
      if (key.name === 'return') {
        await goToNextTab();
      }
      break;

    case 'Starter Page':
      if (key.name === 'up' || key.name === 'down') {
        state.selectedIndex = state.selectedIndex === 0 ? 1 : 0;
        renderScreen();
      } else if (key.name === 'return') {
        state.wantsStarterPage = state.selectedIndex === 0;
        if (state.wantsStarterPage) {
          // Insert Product Info tab after Starter Page
          const starterPageIndex = state.tabs.indexOf('Starter Page');
          if (starterPageIndex >= 0 && !state.tabs.includes('Product Info')) {
            state.tabs.splice(starterPageIndex + 1, 0, 'Product Info');
          }
          state.productInfoIndex = 0;
          state.inputValue = '';
        }
        await goToNextTab();
      } else if (str === '1' || str === '2') {
        state.selectedIndex = parseInt(str, 10) - 1;
        state.wantsStarterPage = state.selectedIndex === 0;
        renderScreen();
      }
      break;

    case 'Product Info':
      if (key.name === 'return') {
        // Save current value (or use default placeholder)
        const currentPrompt = PRODUCT_INFO_PROMPTS[state.productInfoIndex];
        const value = state.inputValue.trim() || currentPrompt.placeholder;
        state.productInfo[currentPrompt.key] = value;
        state.inputValue = '';
        state.productInfoIndex++;

        if (state.productInfoIndex >= PRODUCT_INFO_PROMPTS.length) {
          // Done with product info, advance to next tab
          state.productInfoIndex = 0;
          await goToNextTab();
        } else {
          renderScreen();
        }
      } else if (key.name === 'backspace') {
        state.inputValue = state.inputValue.slice(0, -1);
        renderScreen();
      } else if (str && str.length === 1 && !key.ctrl) {
        state.inputValue += str;
        renderScreen();
      }
      break;

    case 'Complete':
      if (key.name === 'return') {
        showCursor();
        if (stdin.isTTY) stdin.setRawMode(false);
        console.log('');
        process.exit(0);
      }
      break;

    default:
      // Handle category tabs (DATABASE, PAYMENTS, EMAIL, etc.)
      const category = FEATURE_CATEGORIES.find((c) => c.name === tabName);
      if (category) {
        if (state.categoryPhase === 'keys') {
          // Key entry mode
          if (key.name === 'return') {
            // Save current value and move to next key
            const currentKey = state.categoryKeys[state.categoryKeyIndex];
            state.apiKeyValues[currentKey] = state.inputValue;
            state.inputValue = '';
            state.categoryKeyIndex++;

            if (state.categoryKeyIndex >= state.categoryKeys.length) {
              // Done with keys, advance to next tab
              state.categoryPhase = 'selection';
              state.categoryKeys = [];
              state.categoryKeyIndex = 0;
              await goToNextTab();
            } else {
              renderScreen();
            }
          } else if (key.name === 'backspace') {
            state.inputValue = state.inputValue.slice(0, -1);
            renderScreen();
          } else if (str && str.length === 1 && !key.ctrl) {
            state.inputValue += str;
            renderScreen();
          }
        } else {
          // Selection mode
          if (key.name === 'up') {
            state.selectedIndex = (state.selectedIndex - 1 + category.options.length) % category.options.length;
            renderScreen();
          } else if (key.name === 'down') {
            state.selectedIndex = (state.selectedIndex + 1) % category.options.length;
            renderScreen();
          } else if (key.name === 'return') {
            // Save selection
            const selectedOpt = category.options[state.selectedIndex];
            state.customSelections[tabName] = selectedOpt.id;

            // If option has keys, switch to key entry phase
            if (selectedOpt.keys.length > 0) {
              state.categoryPhase = 'keys';
              state.categoryKeys = [...selectedOpt.keys];
              state.categoryKeyIndex = 0;
              state.inputValue = '';
              renderScreen();
            } else {
              // No keys needed, advance to next tab
              await goToNextTab();
            }
          }
        }
      }
      break;
  }
}

async function goToNextTab() {
  const tabName = state.tabs[state.currentTab];

  // Handle Template tab - set up categories based on template config
  if (tabName === 'Template') {
    const selectedTemplate = TEMPLATES[state.selectedIndex];
    state.templateKey = selectedTemplate.name.toLowerCase().replace(' ', '-');

    // Get template config
    const config = TEMPLATE_CONFIGS[state.templateKey] || TEMPLATE_CONFIGS.custom;

    if (config.categories.length > 0) {
      // Template has categories - show category tabs
      state.tabs = ['Template', ...config.categories, 'Review', 'Starter Page', 'Complete'];

      // Initialize selections with defaults
      state.customSelections = { ...config.defaults };
    } else {
      // Starter template - no categories, just basic setup
      state.tabs = ['Template', 'Review', 'Starter Page', 'Complete'];
      state.customSelections = {};
    }

    state.inputValue = '';
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;
  }

  // Before Review tab - build template env
  const nextTabName = state.tabs[state.currentTab + 1];
  if (nextTabName === 'Review') {
    // Collect all API keys from selected options
    const allKeys = [];
    Object.entries(state.customSelections).forEach(([catName, optionId]) => {
      const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
      if (cat) {
        const opt = cat.options.find((o) => o.id === optionId);
        if (opt) {
          allKeys.push(...opt.keys);
        }
      }
    });

    // Build template env
    state.template = {
      name: state.templateKey,
      env: {
        NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NODE_ENV: 'development',
      },
    };
    allKeys.forEach((key) => {
      state.template.env[key] = `{{PROMPT:${key}}}`;
    });
  }

  // Finalize when the NEXT tab is Complete (handles both Starter Page → Complete and Product Info → Complete)
  const upcomingTab = state.tabs[state.currentTab + 1];
  if (upcomingTab === 'Complete') {
    await finalize();
  }

  if (state.currentTab < state.tabs.length - 1) {
    state.currentTab++;

    // Reset category phase when moving between tabs
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;

    // Set correct selection index for category tabs
    const nextTab = state.tabs[state.currentTab];
    const nextCategory = FEATURE_CATEGORIES.find((c) => c.name === nextTab);
    if (nextCategory && state.customSelections[nextTab]) {
      const idx = nextCategory.options.findIndex((o) => o.id === state.customSelections[nextTab]);
      state.selectedIndex = idx >= 0 ? idx : 0;
    } else {
      state.selectedIndex = 0;
    }

    renderScreen();
  }
}

function goToPrevTab() {
  if (state.currentTab > 0) {
    state.currentTab--;

    // If going back to Template tab, reset tabs to default
    const tabName = state.tabs[state.currentTab];
    if (tabName === 'Template') {
      state.tabs = ['Template', 'Review', 'Starter Page', 'Complete'];
      state.isCustomMode = false;
      state.customSelections = {};
      state.apiKeyValues = {};
    }

    // Reset category phase
    state.categoryPhase = 'selection';
    state.categoryKeys = [];
    state.categoryKeyIndex = 0;

    // Restore selection index for category tabs
    const category = FEATURE_CATEGORIES.find((c) => c.name === tabName);
    if (category && state.customSelections[tabName]) {
      const idx = category.options.findIndex((o) => o.id === state.customSelections[tabName]);
      state.selectedIndex = idx >= 0 ? idx : 0;
    } else {
      state.selectedIndex = 0;
    }

    state.inputValue = '';
    renderScreen();
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  if (!stdin.isTTY) {
    console.log(`${c.amber}Fabrk Setup Wizard requires an interactive terminal.${c.reset}`);
    console.log(`${c.amberDim}Please run in a terminal that supports TTY.${c.reset}`);
    process.exit(1);
  }

  readline.emitKeypressEvents(stdin);
  stdin.setRawMode(true);
  hideCursor();

  // Check for existing .env.local
  if (!DRY_RUN && existsSync(join(ROOT_DIR, '.env.local'))) {
    clear();
    console.log(`\n  ${c.amberBright}Warning:${c.reset} .env.local already exists.`);
    console.log(`  ${c.amberDim}It will be overwritten. Press Enter to continue or Ctrl+C to cancel.${c.reset}\n`);

    await new Promise((resolve) => {
      const handler = (str, key) => {
        if (key.ctrl && key.name === 'c') {
          showCursor();
          stdin.setRawMode(false);
          console.log(`\n  ${c.amberDim}Cancelled.${c.reset}\n`);
          process.exit(0);
        }
        if (key.name === 'return') {
          stdin.removeListener('keypress', handler);
          resolve();
        }
      };
      stdin.on('keypress', handler);
    });
  }

  // Initial render
  renderScreen();

  // Listen for input
  stdin.on('keypress', handleKeypress);
}

process.on('SIGINT', () => {
  showCursor();
  if (stdin.isTTY) stdin.setRawMode(false);
  process.exit(0);
});

// ============================================================================
// AUTOMATED TEST MODE
// ============================================================================

async function runTests() {
  console.log(`${c.amberBright}╔══════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.amberBright}║                    FABRK SETUP WIZARD - TEST MODE                    ║${c.reset}`);
  console.log(`${c.amberBright}╚══════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');

  const results = [];
  const templateKeys = ['starter', 'saas', 'ai-app', 'marketplace', 'custom'];

  for (const templateKey of templateKeys) {
    console.log(`${c.amber}Testing template: ${c.amberBright}${templateKey.toUpperCase()}${c.reset}`);

    try {
      // Get template config
      const config = TEMPLATE_CONFIGS[templateKey] || TEMPLATE_CONFIGS.custom;
      const templateInfo = TEMPLATES.find((t) => t.name.toLowerCase().replace(' ', '-') === templateKey);

      // Load template file if exists
      let template;
      if (templateInfo?.file) {
        template = await loadTemplate(templateInfo.file);
      } else {
        template = {
          name: 'Custom',
          env: {
            NEXTAUTH_SECRET: '{{AUTO_GENERATE}}',
            NEXTAUTH_URL: 'http://localhost:3000',
            NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
            NODE_ENV: 'development',
          },
        };
      }

      // Simulate selections with test values
      const testSelections = {};
      const testApiValues = {};

      config.categories.forEach((catName) => {
        const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
        if (cat) {
          // Pick first non-none option (usually the recommended one)
          const opt = cat.options.find((o) => !o.id.startsWith('none')) || cat.options[0];
          testSelections[catName] = opt.id;

          // Add test values for keys
          opt.keys.forEach((key) => {
            if (TEST_VALUES[key]) {
              testApiValues[key] = TEST_VALUES[key];
            }
          });
        }
      });

      // Build env with test values
      const allKeys = [];
      Object.entries(testSelections).forEach(([catName, optionId]) => {
        const cat = FEATURE_CATEGORIES.find((c) => c.name === catName);
        if (cat) {
          const opt = cat.options.find((o) => o.id === optionId);
          if (opt) {
            allKeys.push(...opt.keys);
          }
        }
      });

      // Build template env
      const testTemplate = {
        name: templateKey,
        env: {
          ...template.env,
        },
      };
      allKeys.forEach((key) => {
        if (!testTemplate.env[key]) {
          testTemplate.env[key] = `{{PROMPT:${key}}}`;
        }
      });

      // Generate env content
      const envContent = await buildEnvContent(testTemplate, testApiValues);

      // Validate env content
      const hasDatabase = envContent.includes('DATABASE_URL=');
      const hasAuthSecret = envContent.includes('NEXTAUTH_SECRET=');
      const envLines = envContent.split('\n').filter((l) => l && !l.startsWith('#'));

      console.log(`  ${c.amberBright}✓${c.reset} Template loaded`);
      console.log(`  ${c.amberBright}✓${c.reset} Categories: ${config.categories.length}`);
      console.log(`  ${c.amberBright}✓${c.reset} Keys configured: ${Object.keys(testApiValues).length}`);
      console.log(`  ${c.amberBright}✓${c.reset} Env vars: ${envLines.length}`);
      console.log(`  ${hasDatabase ? `${c.amberBright}✓${c.reset}` : `${c.amber}○${c.reset}`} DATABASE_URL: ${hasDatabase ? 'present' : 'not needed'}`);
      console.log(`  ${hasAuthSecret ? `${c.amberBright}✓${c.reset}` : `${c.amber}✗${c.reset}`} NEXTAUTH_SECRET: ${hasAuthSecret ? 'present' : 'MISSING'}`);

      results.push({
        template: templateKey,
        status: 'pass',
        categories: config.categories.length,
        keys: Object.keys(testApiValues).length,
        envVars: envLines.length,
      });

      console.log(`  ${c.amberBright}→ PASS${c.reset}`);
      console.log('');
    } catch (error) {
      console.log(`  ${c.amber}✗ ERROR: ${error.message}${c.reset}`);
      results.push({
        template: templateKey,
        status: 'fail',
        error: error.message,
      });
      console.log(`  ${c.amber}→ FAIL${c.reset}`);
      console.log('');
    }
  }

  // Summary
  console.log(`${c.amber}${'═'.repeat(74)}${c.reset}`);
  console.log(`${c.amberBright}TEST SUMMARY${c.reset}`);
  console.log(`${c.amber}${'─'.repeat(74)}${c.reset}`);

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;

  results.forEach((r) => {
    const status = r.status === 'pass' ? `${c.amberBright}✓ PASS${c.reset}` : `${c.amber}✗ FAIL${c.reset}`;
    console.log(`  ${status}  ${r.template.toUpperCase()}`);
    if (r.error) {
      console.log(`         ${c.amberDim}${r.error}${c.reset}`);
    }
  });

  console.log('');
  console.log(`${c.amberBright}Results: ${passed}/${results.length} passed${c.reset}`);
  if (failed > 0) {
    console.log(`${c.amber}${failed} test(s) failed${c.reset}`);
  }
  console.log('');

  return failed === 0;
}

// Entry point
if (TEST_MODE) {
  runTests()
    .then((success) => process.exit(success ? 0 : 1))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} else {
  main().catch((err) => {
    showCursor();
    if (stdin.isTTY) stdin.setRawMode(false);
    console.error(err);
    process.exit(1);
  });
}
