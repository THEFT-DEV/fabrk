import {
  BarChart3,
  Users,
  LineChart,
  Settings,
  CreditCard,
  Shield,
  FileText,
  Mail,
  LayoutDashboard,
  Lock,
  DollarSign,
  Rocket,
  AlertTriangle,
  Bell,
  User,
  Inbox,
  Newspaper,
  Search,
  Layers,
  Layout,
  Sparkles,
  FormInput,
  BookOpen,
  Wrench,
  Database,
  Palette,
  MessageSquare,
  Image,
  Volume2,
  History,
} from 'lucide-react';

export interface TemplateNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export interface TemplateNavSection {
  title: string;
  id: string;
  href: string;
  icon: React.ElementType;
  items: TemplateNavItem[];
}

export const templatesNavigation: TemplateNavSection[] = [
  {
    title: 'Getting Started',
    id: 'getting-started',
    href: '/library/docs',
    icon: BookOpen,
    items: [
      {
        title: 'Getting Started',
        href: '/library/docs/getting-started',
        icon: Rocket,
      },
      {
        title: 'NextAuth Integration',
        href: '/library/docs/integration/nextauth',
        icon: Lock,
      },
      {
        title: 'Prisma Integration',
        href: '/library/docs/integration/prisma',
        icon: Database,
      },
      {
        title: 'Customization Guide',
        href: '/library/docs/customization',
        icon: Palette,
      },
      {
        title: 'Troubleshooting',
        href: '/library/docs/troubleshooting',
        icon: Wrench,
      },
    ],
  },
  {
    title: 'AI Tools',
    id: 'ai-tools',
    href: '/library/ai-tools',
    icon: Sparkles,
    items: [
      {
        title: 'AI Chat',
        href: '/library/ai-chat',
        icon: MessageSquare,
      },
      {
        title: 'AI Form Generator',
        href: '/library/ai-forms',
        icon: FormInput,
      },
      {
        title: 'AI Image Generation',
        href: '/library/ai-image',
        icon: Image,
      },
      {
        title: 'AI Text Tools',
        href: '/library/ai-text-tools',
        icon: FileText,
      },
      {
        title: 'AI Voice (STT/TTS)',
        href: '/library/ai-voice',
        icon: Volume2,
      },
      {
        title: 'AI Autofill',
        href: '/library/ai-autofill',
        icon: FormInput,
      },
      {
        title: 'AI PDF Chat',
        href: '/library/ai-pdf-chat',
        icon: FileText,
      },
      {
        title: 'AI QR Generator',
        href: '/library/ai-qr-generator',
        icon: Image,
      },
      {
        title: 'AI Search',
        href: '/library/ai-search',
        icon: Search,
      },
    ],
  },
  {
    title: 'Dashboards',
    id: 'dashboards',
    href: '/library/dashboards',
    icon: LayoutDashboard,
    items: [
      {
        title: 'Analytics Dashboard',
        href: '/library/analytics-dashboard',
        icon: BarChart3,
      },
      { title: 'Team Dashboard', href: '/library/team-dashboard', icon: Users },
      {
        title: 'Chart Library',
        href: '/library/chart-library',
        icon: LineChart,
      },
    ],
  },
  {
    title: 'Authentication',
    id: 'authentication',
    href: '/library/authentication',
    icon: Lock,
    items: [
      { title: 'Sign In', href: '/library/authentication/sign-in', icon: Lock },
      {
        title: 'Sign Up',
        href: '/library/authentication/sign-up',
        icon: Users,
      },
      {
        title: 'Forgot Password',
        href: '/library/authentication/forgot-password',
        icon: Shield,
      },
      {
        title: 'Two-Factor Auth',
        href: '/library/authentication/two-factor',
        icon: Lock,
      },
    ],
  },
  {
    title: 'Admin Panels',
    id: 'admin-panels',
    href: '/library/admin-panels',
    icon: Settings,
    items: [
      {
        title: 'User Management',
        href: '/library/user-management',
        icon: Users,
      },
    ],
  },
  {
    title: 'Account Pages',
    id: 'account-pages',
    href: '/library/account-pages',
    icon: CreditCard,
    items: [
      {
        title: 'Settings Page',
        href: '/library/settings-page',
        icon: Settings,
      },
      {
        title: 'Billing Dashboard',
        href: '/library/billing-dashboard',
        icon: CreditCard,
      },
      {
        title: 'Security & Privacy',
        href: '/library/security-privacy',
        icon: Shield,
      },
    ],
  },
  {
    title: 'Marketing',
    id: 'marketing',
    href: '/library/marketing',
    icon: FileText,
    items: [
      {
        title: 'Documentation',
        href: '/library/documentation',
        icon: FileText,
      },
      {
        title: 'Email Templates',
        href: '/library/email-templates',
        icon: Mail,
      },
      {
        title: 'Pricing Page',
        href: '/library/pricing-page',
        icon: DollarSign,
      },
      { title: 'Blog', href: '/library/blog', icon: Newspaper },
      { title: 'Blog Post', href: '/library/blog/post', icon: FileText },
      {
        title: 'Changelog',
        href: '/library/changelog',
        icon: History,
      },
      {
        title: 'Landing Variations',
        href: '/library/landing-variations',
        icon: Layout,
      },
    ],
  },
  {
    title: 'User Experience',
    id: 'user-experience',
    href: '/library/user-experience',
    icon: User,
    items: [
      { title: 'Onboarding', href: '/library/onboarding', icon: Rocket },
      { title: 'Profile Page', href: '/library/profile', icon: User },
      { title: 'Notifications', href: '/library/notifications', icon: Bell },
      {
        title: 'Search Results',
        href: '/library/search-results',
        icon: Search,
      },
    ],
  },
  {
    title: 'Patterns',
    id: 'patterns',
    href: '/library/patterns',
    icon: Layers,
    items: [
      {
        title: 'Error Pages',
        href: '/library/error-pages',
        icon: AlertTriangle,
      },
      { title: 'Empty States', href: '/library/empty-states', icon: Inbox },
      { title: 'Modal Patterns', href: '/library/modals', icon: Layers },
    ],
  },
];

// Helper to find template info by href
export function findTemplateByHref(href: string): {
  template?: TemplateNavItem;
  section?: TemplateNavSection;
} {
  for (const section of templatesNavigation) {
    // Check if it's a category page
    if (section.href === href) {
      return { section };
    }
    // Check template items
    const template = section.items.find((item) => item.href === href);
    if (template) {
      return { template, section };
    }
  }
  return {};
}

// Convert title to terminal-style format (UPPER_SNAKE_CASE)
export function toDisplayCase(str: string): string {
  return str.toUpperCase().replace(/&/g, '');
}

// Calculate template count (excluding Getting Started docs)
let templateCount = 0;
templatesNavigation.forEach((section) => {
  if (section.id !== 'getting-started') {
    templateCount += section.items.length;
  }
});

export const TEMPLATE_COUNT_STRING = `${templateCount}+`;
export const TEMPLATE_COUNT_INT = templateCount;
