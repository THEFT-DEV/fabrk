import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection } from '@/components/docs';
import { Component, Layers, Code, Palette } from 'lucide-react';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'UI Components Overview - Fabrk Docs',
  description: 'Complete list of 77+ production-ready UI components included in Fabrk boilerplate.',
};

const componentCategories = [
  {
    name: 'Form Inputs',
    hex: '0x61',
    components: [
      { name: 'accordion', description: 'Collapsible content panels' },
      { name: 'calendar', description: 'Date selection calendar' },
      { name: 'checkbox', description: 'Checkbox toggle' },
      { name: 'date-picker', description: 'Date, range, time selection' },
      { name: 'form', description: 'Form with validation' },
      { name: 'form-error', description: 'Error message component' },
      { name: 'input', description: 'Basic text input field' },
      { name: 'input-group', description: 'Grouped inputs with addons' },
      { name: 'input-number', description: 'Numeric input with controls' },
      { name: 'input-otp', description: 'One-time password input' },
      { name: 'input-password', description: 'Password input with toggle' },
      { name: 'input-search', description: 'Search input with icon' },
      { name: 'label', description: 'Form label component' },
      { name: 'radio-group', description: 'Radio button group' },
      { name: 'select', description: 'Dropdown select' },
      { name: 'slider', description: 'Range slider' },
      { name: 'switch', description: 'Toggle switch' },
      { name: 'textarea', description: 'Multi-line text input' },
    ],
  },
  {
    name: 'Buttons Actions',
    hex: '0x63',
    components: [{ name: 'button', description: 'Primary action button' }],
  },
  {
    name: 'Data Display',
    hex: '0x64',
    components: [
      { name: 'avatar', description: 'User avatar' },
      { name: 'badge', description: 'Status badge/tag' },
      { name: 'card', description: 'Content container card' },
      { name: 'code-block', description: 'Syntax highlighted snippets' },
      { name: 'data-table-header', description: 'Table header with sorting' },
      { name: 'empty-state', description: 'Empty state placeholder' },
      { name: 'kpi-card', description: 'Key performance indicator' },
      { name: 'member-card', description: 'Team member card' },
      { name: 'skeleton', description: 'Loading skeleton' },
      { name: 'stat-card', description: 'Statistics card' },
      { name: 'table', description: 'Data table' },
    ],
  },
  {
    name: 'Charts Analytics',
    hex: '0x65',
    components: [
      { name: 'area-chart', description: 'Area chart visualization' },
      { name: 'bar-chart', description: 'Bar chart visualization' },
      { name: 'donut-chart', description: 'Donut/ring chart' },
      { name: 'funnel-chart', description: 'Funnel visualization' },
      { name: 'gauge', description: 'Gauge/meter chart' },
      { name: 'heatmap', description: 'Heatmap visualization' },
      { name: 'line-chart', description: 'Line chart visualization' },
      { name: 'pie-chart', description: 'Pie chart' },
      { name: 'progress', description: 'Progress bar' },
      { name: 'sparkline', description: 'Inline trend chart' },
      { name: 'usage-meter', description: 'Usage meter display' },
    ],
  },
  {
    name: 'Overlays Modals',
    hex: '0x66',
    components: [
      { name: 'alert-dialog', description: 'Confirmation dialog' },
      { name: 'command', description: 'Command palette' },
      { name: 'dialog', description: 'Modal dialog' },
      { name: 'popover', description: 'Popover content' },
      { name: 'sheet', description: 'Side panel/drawer' },
      { name: 'tooltip', description: 'Tooltip hover' },
    ],
  },
  {
    name: 'Navigation',
    hex: '0x67',
    components: [
      { name: 'breadcrumb', description: 'Breadcrumb navigation' },
      { name: 'dropdown-menu', description: 'Dropdown menu' },
      { name: 'navigation', description: 'Main navigation component' },
      { name: 'pagination', description: 'Page pagination' },
      { name: 'sidebar', description: 'Sidebar navigation' },
      { name: 'tabs', description: 'Tab navigation' },
    ],
  },
  {
    name: 'Layout Structure',
    hex: '0x6A',
    components: [
      { name: 'container', description: 'Responsive container' },
      { name: 'scroll-area', description: 'Custom scrollable area' },
      { name: 'separator', description: 'Visual separator' },
    ],
  },
  {
    name: 'Feedback Notifications',
    hex: '0x68',
    components: [
      { name: 'alert', description: 'Alert message' },
      { name: 'loading', description: 'Loading indicator' },
      { name: 'notification-badge', description: 'Count badge' },
      { name: 'notification-center', description: 'Notification dropdown' },
      { name: 'notification-list', description: 'Notification list' },
      { name: 'toast', description: 'Toast notification' },
      { name: 'toaster', description: 'Toast provider' },
    ],
  },
  {
    name: 'SaaS Specific',
    hex: '0x6C',
    components: [
      { name: 'api-key-manager', description: 'API key management' },
      { name: 'audit-log', description: 'Audit log viewer' },
      { name: 'billing-summary-card', description: 'Billing summary display' },
      { name: 'onboarding-checklist', description: 'User onboarding checklist' },
      { name: 'plan-selector', description: 'Pricing plan selector' },
      { name: 'sign-up-form', description: 'User registration form' },
      { name: 'webhook-log', description: 'Webhook event history' },
    ],
  },
  {
    name: 'AI Credits',
    hex: '0x6D',
    components: [
      { name: 'balance-display', description: 'Credit balance indicator' },
      { name: 'credit-usage-chart', description: 'Daily usage bar chart' },
      { name: 'credit-transaction-table', description: 'Transaction history' },
    ],
  },
  {
    name: 'Landing Page Sections',
    hex: '0x6E',
    components: [
      { name: 'faq', description: 'FAQ section component' },
      { name: 'features', description: 'Features showcase section' },
      { name: 'footer', description: 'Landing page footer' },
      { name: 'hero', description: 'Hero section component' },
      { name: 'pricing', description: 'Pricing section component' },
      { name: 'testimonials', description: 'Testimonials section' },
    ],
  },
];

export default function ComponentsOverviewPage() {
  const totalComponents = componentCategories.reduce((acc, cat) => acc + cat.components.length, 0);

  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="UI Components Library"
      description="77+ production-ready components built with Radix UI and Tailwind CSS."
      overview={`${totalComponents} components across ${componentCategories.length} categories. All fully typed with TypeScript. Built on Radix UI primitives for accessibility.`}
      features={[
        {
          icon: Component,
          title: `${totalComponents}`,
          description: 'Production-ready components.',
        },
        {
          icon: Layers,
          title: `${componentCategories.length}`,
          description: 'Component categories.',
        },
        { icon: Code, title: '100%', description: 'TypeScript coverage.' },
        {
          icon: Palette,
          title: 'Radix',
          description: 'Accessible primitives.',
        },
      ]}
      usage={[
        {
          title: 'Import Pattern',
          description: 'Import components from @/components/ui/',
          code: `// Import any component from @/components/ui/
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Getting Started', href: '/docs/getting-started' }}
      next={{ title: 'Button', href: '/docs/components/button' }}
    >
      {/* Component Categories */}
      {componentCategories.map((category) => (
        <DocsSection key={category.name} title={category.name}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {category.components.map((component) => (
              <Link
                key={component.name}
                href={`/docs/components/${component.name}`}
                className={cn('border-border bg-card block border p-4 transition-colors', mode.state.hover.card)}
              >
                <div className="font-mono text-sm font-medium uppercase">{component.name}</div>
                <div className="text-muted-foreground mt-1 font-mono text-xs">
                  {component.description}
                </div>
              </Link>
            ))}
          </div>
        </DocsSection>
      ))}
    </FeatureGuideTemplate>
  );
}
