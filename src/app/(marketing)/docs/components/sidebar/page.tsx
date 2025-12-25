'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Sidebar, type SidebarItem } from '@/components/ui/sidebar';
import { Home, Settings, Users, FileText, BarChart, Mail } from 'lucide-react';

export default function SidebarPage() {
  const basicItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const itemsWithBadges: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    {
      id: 'messages',
      label: 'Messages',
      icon: <Mail className="h-4 w-4" />,
      badge: 5,
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="h-4 w-4" />,
      badge: 12,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const nestedItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart className="h-4 w-4" />,
      children: [
        {
          id: 'overview',
          label: 'Overview',
          icon: <FileText className="h-4 w-4" />,
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: <FileText className="h-4 w-4" />,
        },
        {
          id: 'insights',
          label: 'Insights',
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      children: [
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
      ],
    },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.35]"
      category="Navigation"
      title="Sidebar"
      description="A collapsible navigation sidebar with nested menu support, badges, and icons."
      importCode={`import { Sidebar, type SidebarItem } from "@/components/ui/sidebar"`}
      mainPreview={{
        preview: (
          <div className="border-border flex h-96 overflow-hidden border">
            <Sidebar items={basicItems} />
            <div className="bg-muted/20 flex-1 p-6">
              <p className="text-muted-foreground text-sm">Main content area</p>
            </div>
          </div>
        ),
        code: `const items: SidebarItem[] = [
  { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

<Sidebar items={items} />`,
      }}
      variants={[
        {
          title: 'With Badges',
          description: 'Sidebar items with notification badges.',
          preview: (
            <div className="border-border flex h-96 overflow-hidden border">
              <Sidebar items={itemsWithBadges} />
              <div className="bg-muted/20 flex-1 p-6">
                <p className="text-muted-foreground text-sm">Main content area</p>
              </div>
            </div>
          ),
          code: `const items: SidebarItem[] = [
  { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="h-4 w-4" />,
    badge: 5,
  },
  { id: "users", label: "Users", icon: <Users className="h-4 w-4" />, badge: 12 },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

<Sidebar items={items} />`,
        },
        {
          title: 'Nested Items',
          description: 'Sidebar with expandable nested menu items.',
          preview: (
            <div className="border-border flex h-96 overflow-hidden border">
              <Sidebar items={nestedItems} />
              <div className="bg-muted/20 flex-1 p-6">
                <p className="text-muted-foreground text-sm">Main content area</p>
              </div>
            </div>
          ),
          code: `const items: SidebarItem[] = [
  { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart className="h-4 w-4" />,
    children: [
      { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
      { id: "reports", label: "Reports", icon: <FileText className="h-4 w-4" /> },
      { id: "insights", label: "Insights", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { id: "profile", label: "Profile" },
      { id: "security", label: "Security" },
      { id: "notifications", label: "Notifications" },
    ],
  },
];

<Sidebar items={items} />`,
        },
        {
          title: 'Collapsed by Default',
          description: 'Sidebar that starts in collapsed state.',
          preview: (
            <div className="border-border flex h-96 overflow-hidden border">
              <Sidebar items={basicItems} defaultCollapsed={true} />
              <div className="bg-muted/20 flex-1 p-6">
                <p className="text-muted-foreground text-sm">Main content area</p>
              </div>
            </div>
          ),
          code: `<Sidebar items={items} defaultCollapsed={true} />`,
        },
        {
          title: 'With Click Handler',
          description: 'Sidebar with custom onClick handler for items.',
          preview: (
            <div className="border-border flex h-96 overflow-hidden border">
              <Sidebar
                items={basicItems}
                onItemClick={(item) => console.log('Clicked:', item.label)}
              />
              <div className="bg-muted/20 flex-1 p-6">
                <p className="text-muted-foreground text-sm">
                  Click a sidebar item (check console)
                </p>
              </div>
            </div>
          ),
          code: `<Sidebar
  items={items}
  onItemClick={(item) => console.log("Clicked:", item.label)}
/>`,
        },
      ]}
      props={[
        {
          name: 'items',
          type: 'SidebarItem[]',
          description: 'Array of sidebar menu items.',
          required: true,
        },
        {
          name: 'defaultCollapsed',
          type: 'boolean',
          default: 'false',
          description: 'Whether the sidebar starts collapsed.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the sidebar.',
        },
        {
          name: 'onItemClick',
          type: '(item: SidebarItem) => void',
          description: 'Callback fired when a sidebar item is clicked.',
        },
      ]}
      usageExamples={[
        {
          title: 'SidebarItem Interface',
          description: 'Structure of sidebar menu items.',
          code: `interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
}`,
          language: 'typescript',
        },
      ]}
      accessibility={[
        'Keyboard navigation with Tab and Arrow keys',
        'Focus visible styles for keyboard users',
        'ARIA labels for collapse/expand actions',
        'Screen reader announcements for nested items',
        'Proper semantic button elements for interactive items',
      ]}
      previous={{
        title: 'Navigation Menu',
        href: '/docs/components/navigation-menu',
      }}
      next={{ title: 'Command', href: '/docs/components/command' }}
    />
  );
}
