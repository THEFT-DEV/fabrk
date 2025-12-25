import { NavSection } from '@/components/docs/docs-sidebar';
import { COUNTS } from '@/data/counts';
import {
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  Database,
  Mail,
  Users,
  Blocks,
  Cloud,
  Settings,
  Lock,
  Key,
  Bell,
  Webhook,
  BarChart3,
  Globe,
  Palette,
  TestTube,
  FileCode,
  Layout,
  MousePointer,
  FormInput,
  Table,
  LineChart,
  MessageSquare,
  Upload,
  Zap,
  Flag,
  Clock,
  Bot,
  ScrollText,
  ShieldCheck,
  AlertTriangle,
  Cookie,
  CircleDollarSign,
  FileText,
  UserCog,
  Languages,
  Coins,
  Check,
  Paintbrush,
  Wrench,
  CheckSquare,
  Monitor,
  GalleryVerticalEnd,
  Accessibility,
  Sparkles,
  Image,
  Volume2,
  History,
  QrCode,
  FileUp,
  Search,
} from 'lucide-react';

const rawNavigation: NavSection[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 1: GETTING STARTED
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'START',
    items: [
      {
        title: 'GETTING STARTED',
        href: '/docs/getting-started',
        icon: BookOpen,
      },
      {
        title: 'QUICK START',
        href: '/docs/tutorials/quick-start',
        icon: Rocket,
      },
      {
        title: 'ARCHITECTURE',
        href: '/docs/architecture',
        icon: Blocks,
      },
      {
        title: 'CUSTOMIZATION CHECKLIST',
        href: '/docs/customization-checklist',
        icon: CheckSquare,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 2: ENVIRONMENT SETUP
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'SETUP',
    items: [
      {
        title: 'ENV VARIABLES',
        href: '/docs/deployment/environment',
        icon: Settings,
      },
      {
        title: 'DATABASE',
        href: '/docs/features/database',
        icon: Database,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3: AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'AUTHENTICATION',
    items: [
      {
        title: 'AUTH OVERVIEW',
        href: '/docs/tutorials/authentication',
        icon: Lock,
      },
      {
        title: 'GOOGLE OAUTH',
        href: '/docs/features/google-oauth',
        icon: Key,
      },
      {
        title: 'MAGIC LINKS',
        href: '/docs/features/magic-links',
        icon: Zap,
      },
      {
        title: 'MULTI FACTOR AUTH',
        href: '/docs/features/mfa',
        icon: ShieldCheck,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 4: PAYMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'PAYMENTS',
    items: [
      {
        title: 'STRIPE SETUP',
        href: '/docs/features/payments',
        icon: CreditCard,
      },
      {
        title: 'STRIPE GUIDE',
        href: '/docs/tutorials/stripe-payments',
        icon: CreditCard,
      },
      {
        title: 'POLAR.SH',
        href: '/docs/features/polar',
        icon: CircleDollarSign,
      },
      {
        title: 'LEMON SQUEEZY',
        href: '/docs/features/lemonsqueezy',
        icon: CircleDollarSign,
      },
      {
        title: 'FREE TRIALS',
        href: '/docs/features/trial',
        icon: Clock,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 5: EMAILS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'EMAILS',
    items: [
      {
        title: 'RESEND SETUP',
        href: '/docs/features/emails',
        icon: Mail,
      },
      {
        title: 'EMAIL TEMPLATES',
        href: '/docs/tutorials/email-templates',
        icon: Mail,
      },
      {
        title: 'NOTIFICATIONS',
        href: '/docs/features/notifications',
        icon: Bell,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 6: CORE FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'CORE FEATURES',
    items: [
      {
        title: 'API ROUTES',
        href: '/docs/tutorials/api-routes',
        icon: FileCode,
      },
      {
        title: 'PROTECTED PAGES',
        href: '/docs/tutorials/protected-pages',
        icon: Shield,
      },
      {
        title: 'CLOUD STORAGE',
        href: '/docs/features/cloud-storage',
        icon: Cloud,
      },
      {
        title: 'FILE UPLOADS',
        href: '/docs/tutorials/file-uploads',
        icon: Upload,
      },
      {
        title: 'WEBHOOKS',
        href: '/docs/features/webhooks',
        icon: Webhook,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 6.5: AI FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'AI FEATURES',
    items: [
      {
        title: 'AI INTEGRATION',
        href: '/docs/features/ai-integration',
        icon: Sparkles,
      },
      {
        title: 'AI CHAT',
        href: '/docs/library/ai-chat',
        icon: MessageSquare,
      },
      {
        title: 'TEXT TOOLS',
        href: '/docs/library/ai-text-tools',
        icon: FileText,
      },
      {
        title: 'IMAGE GENERATION',
        href: '/docs/library/ai-image',
        icon: Image,
      },
      {
        title: 'VOICE (STT/TTS)',
        href: '/docs/library/ai-voice',
        icon: Volume2,
      },
      {
        title: 'AI FORMS',
        href: '/docs/library/ai-forms',
        icon: FileCode,
      },
      {
        title: 'QR GENERATOR',
        href: '/docs/library/ai-qr-generator',
        icon: QrCode,
      },
      {
        title: 'PDF CHAT',
        href: '/docs/library/ai-pdf-chat',
        icon: FileUp,
      },
      {
        title: 'AI AUTOFILL',
        href: '/docs/library/ai-autofill',
        icon: Sparkles,
      },
      {
        title: 'AI SEARCH',
        href: '/docs/library/ai-search',
        icon: Search,
      },
      {
        title: 'AI CREDITS',
        href: '/docs/features/ai-credits',
        icon: Coins,
      },
      {
        title: 'MCP SERVER',
        href: '/docs/features/mcp-server',
        icon: Bot,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 6.6: LIBRARY UTILITIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'LIBRARY UTILS',
    items: [
      {
        title: 'LIBRARY NAVIGATION',
        href: '/docs/library/library-navigation',
        icon: Layout,
      },
      {
        title: 'RELATED TEMPLATES',
        href: '/docs/library/related-templates',
        icon: GalleryVerticalEnd,
      },
      {
        title: 'ADVANCED FILTERS',
        href: '/docs/library/advanced-filters',
        icon: FormInput,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 7: COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'COMPONENTS',
    items: [
      {
        title: 'UI LIBRARY', // Placeholder, will be updated dynamically
        href: '/docs/components/overview',
        icon: Blocks,
      },
    ],
    subSections: [
      {
        title: 'FORM INPUTS',
        items: [
          { title: 'ACCORDION', href: '/docs/components/accordion', icon: FormInput },
          { title: 'CALENDAR', href: '/docs/components/calendar', icon: FormInput },
          { title: 'CHECKBOX', href: '/docs/components/checkbox', icon: FormInput },
          { title: 'DATE PICKER', href: '/docs/components/date-picker', icon: FormInput },
          { title: 'FORM', href: '/docs/components/form', icon: FormInput },
          { title: 'FORM ERROR', href: '/docs/components/form-error', icon: FormInput },
          { title: 'INPUT', href: '/docs/components/input', icon: FormInput },
          { title: 'INPUT GROUP', href: '/docs/components/input-group', icon: FormInput },
          { title: 'INPUT NUMBER', href: '/docs/components/input-number', icon: FormInput },
          { title: 'INPUT OTP', href: '/docs/components/input-otp', icon: FormInput },
          { title: 'INPUT PASSWORD', href: '/docs/components/input-password', icon: FormInput },
          { title: 'INPUT SEARCH', href: '/docs/components/input-search', icon: FormInput },
          { title: 'LABEL', href: '/docs/components/label', icon: FormInput },
          { title: 'RADIO GROUP', href: '/docs/components/radio-group', icon: FormInput },
          { title: 'SELECT', href: '/docs/components/select', icon: FormInput },
          { title: 'SLIDER', href: '/docs/components/slider', icon: FormInput },
          { title: 'SWITCH', href: '/docs/components/switch', icon: FormInput },
          { title: 'TEXTAREA', href: '/docs/components/textarea', icon: FormInput },
        ],
      },
      {
        title: 'BUTTONS',
        items: [{ title: 'BUTTON', href: '/docs/components/button', icon: MousePointer }],
      },
      {
        title: 'DATA DISPLAY',
        items: [
          { title: 'AVATAR', href: '/docs/components/avatar', icon: Table },
          { title: 'BADGE', href: '/docs/components/badge', icon: Table },
          { title: 'CARD', href: '/docs/components/card', icon: Table },
          { title: 'CODE BLOCK', href: '/docs/components/code-block', icon: Table },
          { title: 'DATA TABLE HEADER', href: '/docs/components/data-table-header', icon: Table },
          { title: 'EMPTY STATE', href: '/docs/components/empty-state', icon: Table },
          { title: 'KPI CARD', href: '/docs/components/kpi-card', icon: Table },
          { title: 'MEMBER CARD', href: '/docs/components/member-card', icon: Table },
          { title: 'SIMPLE ICON', href: '/docs/components/simple-icon', icon: Table },
          { title: 'SKELETON', href: '/docs/components/skeleton', icon: Table },
          { title: 'STAT CARD', href: '/docs/components/stat-card', icon: Table },
          { title: 'TABLE', href: '/docs/components/table', icon: Table },
          { title: 'TYPEWRITER', href: '/docs/components/typewriter', icon: Table },
        ],
      },
      {
        title: 'CHARTS',
        items: [
          { title: 'AREA CHART', href: '/docs/components/area-chart', icon: LineChart },
          { title: 'BAR CHART', href: '/docs/components/bar-chart', icon: LineChart },
          { title: 'DONUT CHART', href: '/docs/components/donut-chart', icon: LineChart },
          { title: 'FUNNEL CHART', href: '/docs/components/funnel-chart', icon: LineChart },
          { title: 'GAUGE', href: '/docs/components/gauge', icon: LineChart },
          { title: 'HEATMAP', href: '/docs/components/heatmap', icon: LineChart },
          { title: 'LINE CHART', href: '/docs/components/line-chart', icon: LineChart },
          { title: 'PIE CHART', href: '/docs/components/pie-chart', icon: LineChart },
          { title: 'PROGRESS', href: '/docs/components/progress', icon: LineChart },
          { title: 'SPARKLINE', href: '/docs/components/sparkline', icon: LineChart },
          { title: 'USAGE METER', href: '/docs/components/usage-meter', icon: LineChart },
        ],
      },
      {
        title: 'OVERLAYS',
        items: [
          { title: 'ALERT DIALOG', href: '/docs/components/alert-dialog', icon: MessageSquare },
          { title: 'DIALOG', href: '/docs/components/dialog', icon: MessageSquare },
          { title: 'POPOVER', href: '/docs/components/popover', icon: MessageSquare },
          { title: 'SHEET', href: '/docs/components/sheet', icon: MessageSquare },
          { title: 'TOOLTIP', href: '/docs/components/tooltip', icon: MessageSquare },
        ],
      },
      {
        title: 'NAVIGATION',
        items: [
          { title: 'BREADCRUMB', href: '/docs/components/breadcrumb', icon: Layout },
          { title: 'COMMAND', href: '/docs/components/command', icon: Layout },
          { title: 'DROPDOWN MENU', href: '/docs/components/dropdown-menu', icon: Layout },
          { title: 'NAVIGATION', href: '/docs/components/navigation', icon: Layout },
          { title: 'PAGINATION', href: '/docs/components/pagination', icon: Layout },
          { title: 'SIDEBAR', href: '/docs/components/sidebar', icon: Layout },
          { title: 'DOCS SIDEBAR', href: '/docs/components/docs-sidebar', icon: Layout },
          { title: 'STYLED TABS', href: '/docs/components/styled-tabs', icon: Layout },
          { title: 'TABS', href: '/docs/components/tabs', icon: Layout },
        ],
      },
      {
        title: 'LAYOUT',
        items: [
          { title: 'CONTAINER', href: '/docs/components/container', icon: Blocks },
          { title: 'SCROLL AREA', href: '/docs/components/scroll-area', icon: Blocks },
          { title: 'SEPARATOR', href: '/docs/components/separator', icon: Blocks },
        ],
      },
      {
        title: 'FEEDBACK',
        items: [
          { title: 'ALERT', href: '/docs/components/alert', icon: Bell },
          { title: 'COOKIE CONSENT', href: '/docs/components/cookie-consent', icon: Bell },
          { title: 'LOADING', href: '/docs/components/loading', icon: Bell },
          { title: 'NOTIFICATION BADGE', href: '/docs/components/notification-badge', icon: Bell },
          {
            title: 'NOTIFICATION CENTER',
            href: '/docs/components/notification-center',
            icon: Bell,
          },
          { title: 'NOTIFICATION LIST', href: '/docs/components/notification-list', icon: Bell },
          { title: 'TERMINAL SPINNER', href: '/docs/components/terminal-spinner', icon: Bell },
          { title: 'TOAST', href: '/docs/components/toast', icon: Bell },
          { title: 'TOASTER', href: '/docs/components/toaster', icon: Bell },
        ],
      },
      {
        title: 'SAAS',
        items: [
          { title: 'API KEY MANAGER', href: '/docs/components/api-key-manager', icon: Key },
          { title: 'AUDIT LOG', href: '/docs/components/audit-log', icon: ScrollText },
          { title: 'BALANCE DISPLAY', href: '/docs/components/balance-display', icon: Coins },
          { title: 'CHANGELOG', href: '/docs/components/changelog', icon: History },
          {
            title: 'BILLING SUMMARY CARD',
            href: '/docs/components/billing-summary-card',
            icon: CreditCard,
          },
          {
            title: 'CREDIT TRANSACTION TABLE',
            href: '/docs/components/credit-transaction-table',
            icon: Coins,
          },
          { title: 'CREDIT USAGE CHART', href: '/docs/components/credit-usage-chart', icon: Coins },
          {
            title: 'ONBOARDING CHECKLIST',
            href: '/docs/components/onboarding-checklist',
            icon: Check,
          },
          { title: 'PLAN SELECTOR', href: '/docs/components/plan-selector', icon: CreditCard },
          { title: 'PRICING CARD', href: '/docs/components/pricing-card', icon: CreditCard },
          { title: 'SIGN IN FORM', href: '/docs/components/sign-in-form', icon: Users },
          { title: 'SIGN UP FORM', href: '/docs/components/sign-up-form', icon: Users },
          { title: 'WEBHOOK LOG', href: '/docs/components/webhook-log', icon: Webhook },
        ],
      },
      {
        title: 'LANDING',
        items: [
          { title: 'HERO', href: '/docs/components/hero', icon: Rocket },
          { title: 'FEATURES', href: '/docs/components/features', icon: Blocks },
          { title: 'PRICING', href: '/docs/components/pricing', icon: CreditCard },
          { title: 'TESTIMONIALS', href: '/docs/components/testimonials', icon: Users },
          { title: 'FAQ', href: '/docs/components/faq', icon: MessageSquare },
          { title: 'FOOTER', href: '/docs/components/footer', icon: Layout },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 8: DESIGN SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'DESIGN SYSTEM',
    items: [
      {
        title: 'THEME GUIDE',
        href: '/docs/design/theme-guide',
        icon: Palette,
      },
      {
        title: 'CUSTOMIZATION GUIDE',
        href: '/docs/design/customization-guide',
        icon: Paintbrush,
      },
      {
        title: 'COMPONENT AUTHORING',
        href: '/docs/design/component-authoring',
        icon: Wrench,
      },
      {
        title: 'ACCESSIBILITY',
        href: '/docs/design/accessibility',
        icon: Accessibility,
      },
      {
        title: 'THEME GALLERY',
        href: '/docs/extras/theme-gallery',
        icon: GalleryVerticalEnd,
      },
      {
        title: 'THEME GENERATOR',
        href: '/docs/extras/theme-generator',
        icon: Palette,
      },
      {
        title: 'DISPLAY EFFECTS',
        href: '/docs/extras/display-effects',
        icon: Monitor,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 9: SECURITY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'SECURITY',
    items: [
      {
        title: 'COOKIE CONSENT',
        href: '/docs/features/cookie-consent',
        icon: Cookie,
      },
      {
        title: 'RATE LIMITING',
        href: '/docs/security/rate-limiting',
        icon: AlertTriangle,
      },
      {
        title: 'CSRF PROTECTION',
        href: '/docs/security/csrf',
        icon: Shield,
      },
      {
        title: 'SECURITY HEADERS',
        href: '/docs/security/headers',
        icon: ShieldCheck,
      },
      {
        title: 'VALIDATION',
        href: '/docs/security/validation',
        icon: ScrollText,
      },
      {
        title: 'BOT PROTECTION',
        href: '/docs/security/bot-protection',
        icon: Bot,
      },
      {
        title: 'AUDIT LOGGING',
        href: '/docs/security/audit-logging',
        icon: ScrollText,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 10: ADVANCED
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'ADVANCED',
    items: [
      {
        title: 'ORGANIZATIONS',
        href: '/docs/features/organizations',
        icon: Users,
      },
      {
        title: 'REALTIME',
        href: '/docs/features/realtime',
        icon: Bell,
      },
      {
        title: 'BACKGROUND JOBS',
        href: '/docs/features/background-jobs',
        icon: Clock,
      },
      {
        title: 'ANALYTICS',
        href: '/docs/features/analytics',
        icon: BarChart3,
      },
      {
        title: 'SEO',
        href: '/docs/features/seo',
        icon: Globe,
      },
      {
        title: 'API KEYS',
        href: '/docs/features/api-keys',
        icon: Key,
      },
      {
        title: 'FEATURE FLAGS',
        href: '/docs/features/feature-flags',
        icon: Flag,
      },
      {
        title: 'BLOG SYSTEM',
        href: '/docs/features/blog',
        icon: FileText,
      },
      {
        title: 'I18N',
        href: '/docs/features/i18n',
        icon: Languages,
      },
      {
        title: 'USER IMPERSONATION',
        href: '/docs/features/impersonation',
        icon: UserCog,
      },
      {
        title: 'MCP SERVER',
        href: '/docs/features/mcp-server',
        icon: Bot,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 11: DEPLOY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'DEPLOY',
    items: [
      {
        title: 'TESTING',
        href: '/docs/extras/testing',
        icon: TestTube,
      },
      {
        title: 'VERCEL',
        href: '/docs/deployment/vercel',
        icon: Cloud,
      },
      {
        title: 'LAUNCH CHECKLIST',
        href: '/docs/launch/checklist',
        icon: Rocket,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 12: RESOURCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'RESOURCES',
    items: [
      {
        title: 'CHANGELOG',
        href: '/changelog',
        icon: History,
      },
    ],
  },
];

// Use dynamic component count from source files (not nav items)
const componentsSection = rawNavigation.find((s) => s.title === 'COMPONENTS');
if (componentsSection) {
  const overviewItem = componentsSection.items.find((i) => i.href === '/docs/components/overview');
  if (overviewItem) {
    overviewItem.title = `UI LIBRARY ${COUNTS.components}`;
  }
}

export const docsNavigation = rawNavigation;
