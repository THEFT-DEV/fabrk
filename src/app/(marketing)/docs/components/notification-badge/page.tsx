'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { NotificationBadge } from '@/components/ui/notification-badge';
import { Button } from '@/components/ui/button';
import { Bell, Mail, ShoppingCart, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function NotificationBadgePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.39]"
      category="Components"
      title="Notification Badge"
      description="Displays notification counts or status indicators on elements with customizable position, color, and animation."
      importCode={`import { NotificationBadge } from "@/components/ui/notification-badge"`}
      mainPreview={{
        preview: (
          <NotificationBadge count={5}>
            <Button variant="outline" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </NotificationBadge>
        ),
        code: `<NotificationBadge count={5}>
  <Button variant="outline" size="icon" aria-label="Notifications">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>`,
      }}
      variants={[
        {
          title: 'Count Variants',
          description: 'Different count displays including overflow handling',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={3}>
                <Button variant="outline" size="icon" aria-label="Mail">
                  <Mail className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={25}>
                <Button variant="outline" size="icon" aria-label="Shopping cart">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={150} max={99}>
                <Button variant="outline" size="icon" aria-label="Messages">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge count={3}>
  <Button variant="outline" size="icon" aria-label="Mail">
    <Mail className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge count={25}>
  <Button variant="outline" size="icon" aria-label="Shopping cart">
    <ShoppingCart className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge count={150} max={99}>
  <Button variant="outline" size="icon" aria-label="Messages">
    <MessageSquare className="h-5 w-5" />
  </Button>
</NotificationBadge>`,
        },
        {
          title: 'Color Variants',
          description: 'Different color schemes for various notification types',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={3} variant="primary">
                <Button variant="outline" size="icon" aria-label="Primary notifications">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={5} variant="destructive">
                <Button variant="outline" size="icon" aria-label="Error notifications">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={2} variant="success">
                <Button variant="outline" size="icon" aria-label="Success notifications">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={7} variant="warning">
                <Button variant="outline" size="icon" aria-label="Warning notifications">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge count={3} variant="primary">
  <Button variant="outline" size="icon" aria-label="Primary notifications">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge count={5} variant="destructive">
  <Button variant="outline" size="icon" aria-label="Urgent notifications">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge count={2} variant="success">
  <Button variant="outline" size="icon" aria-label="Success notifications">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge count={7} variant="warning">
  <Button variant="outline" size="icon" aria-label="Warning notifications">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>`,
        },
        {
          title: 'Position Variants',
          description: 'Badge can be positioned at any corner',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={5} position="top-right">
                <div className="border-border bg-card h-12 w-12 rounded-none border" />
              </NotificationBadge>
              <NotificationBadge count={5} position="top-left">
                <div className="border-border bg-card h-12 w-12 rounded-none border" />
              </NotificationBadge>
              <NotificationBadge count={5} position="bottom-right">
                <div className="border-border bg-card h-12 w-12 rounded-none border" />
              </NotificationBadge>
              <NotificationBadge count={5} position="bottom-left">
                <div className="border-border bg-card h-12 w-12 rounded-none border" />
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge count={5} position="top-right">
  <div className="h-12 w-12 rounded-none border" />
</NotificationBadge>

<NotificationBadge count={5} position="top-left">
  <div className="h-12 w-12 rounded-none border" />
</NotificationBadge>

<NotificationBadge count={5} position="bottom-right">
  <div className="h-12 w-12 rounded-none border" />
</NotificationBadge>

<NotificationBadge count={5} position="bottom-left">
  <div className="h-12 w-12 rounded-none border" />
</NotificationBadge>`,
        },
        {
          title: 'Dot Indicator',
          description: 'Display a simple dot without count',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge dot variant="primary">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NotificationBadge>
              <NotificationBadge dot variant="success">
                <Button variant="outline">&gt; STATUS</Button>
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge dot variant="primary">
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</NotificationBadge>

<NotificationBadge dot variant="success">
  <Button variant="outline">&gt; STATUS</Button>
</NotificationBadge>`,
        },
        {
          title: 'Size Variants',
          description: 'Different badge sizes for various use cases',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={5} size="sm">
                <Button variant="outline" size="sm">
                  &gt; SMALL
                </Button>
              </NotificationBadge>
              <NotificationBadge count={5} size="md">
                <Button variant="outline">&gt; MEDIUM</Button>
              </NotificationBadge>
              <NotificationBadge count={5} size="lg">
                <Button variant="outline" size="lg">
                  &gt; LARGE
                </Button>
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge count={5} size="sm">
  <Button size="sm">&gt; SMALL</Button>
</NotificationBadge>

<NotificationBadge count={5} size="md">
  <Button>&gt; MEDIUM</Button>
</NotificationBadge>

<NotificationBadge count={5} size="lg">
  <Button size="lg">&gt; LARGE</Button>
</NotificationBadge>`,
        },
        {
          title: 'Pulse Animation',
          description: 'Animated pulse effect to draw attention',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={3} pulse>
                <Button variant="outline" size="icon" aria-label="Notifications with pulse">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge dot variant="destructive" pulse>
                <Button variant="outline" size="icon" aria-label="Mail with pulse">
                  <Mail className="h-5 w-5" />
                </Button>
              </NotificationBadge>
            </div>
          ),
          code: `<NotificationBadge count={3} pulse>
  <Button variant="outline" size="icon" aria-label="Notifications with pulse">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>

<NotificationBadge dot variant="destructive" pulse>
  <Button variant="outline" size="icon" aria-label="Mail with pulse">
    <Mail className="h-5 w-5" />
  </Button>
</NotificationBadge>`,
        },
        {
          title: 'Show Zero',
          description: 'Display badge even when count is zero',
          preview: (
            <div className="flex items-center gap-6">
              <NotificationBadge count={0} showZero>
                <Button variant="outline" size="icon" aria-label="Notifications showing zero">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationBadge>
              <NotificationBadge count={0}>
                <Button variant="outline" size="icon" aria-label="Mail hidden when zero">
                  <Mail className="h-5 w-5" />
                </Button>
              </NotificationBadge>
            </div>
          ),
          code: `// Shows "0"
<NotificationBadge count={0} showZero>
  <Button variant="outline" size="icon" aria-label="Notifications showing zero">
    <Bell className="h-5 w-5" />
  </Button>
</NotificationBadge>

// Hidden when count is 0
<NotificationBadge count={0}>
  <Button variant="outline" size="icon" aria-label="Mail hidden when zero">
    <Mail className="h-5 w-5" />
  </Button>
</NotificationBadge>`,
        },
        {
          title: 'Custom Offset',
          description: 'Fine-tune badge position with custom offset',
          preview: (
            <NotificationBadge count={5} offset={{ x: 5, y: -5 }}>
              <Button variant="outline">&gt; CUSTOM POSITION</Button>
            </NotificationBadge>
          ),
          code: `<NotificationBadge count={5} offset={{ x: 5, y: -5 }}>
  <Button variant="outline">&gt; CUSTOM POSITION</Button>
</NotificationBadge>`,
        },
      ]}
      props={[
        {
          name: 'count',
          type: 'number',
          description: 'The count to display in the badge',
        },
        {
          name: 'max',
          type: 'number',
          default: '99',
          description: "Maximum count to display before showing 'max+'",
        },
        {
          name: 'showZero',
          type: 'boolean',
          default: 'false',
          description: 'Show badge when count is 0',
        },
        {
          name: 'dot',
          type: 'boolean',
          default: 'false',
          description: 'Display as a dot indicator without count',
        },
        {
          name: 'variant',
          type: '"primary" | "destructive" | "success" | "warning"',
          default: '"primary"',
          description: 'The color scheme of the badge',
        },
        {
          name: 'position',
          type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
          default: '"top-right"',
          description: 'Position of the badge relative to the child',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size of the badge',
        },
        {
          name: 'pulse',
          type: 'boolean',
          default: 'false',
          description: 'Enable pulse animation',
        },
        {
          name: 'offset',
          type: '{ x: number; y: number }',
          default: '{ x: 0, y: 0 }',
          description: 'Custom offset for fine-tuning position',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The element to attach the badge to',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the badge',
        },
      ]}
      accessibility={[
        "Badge uses aria-live='polite' to announce count changes to screen readers",
        "Badge uses aria-atomic='true' for complete announcements",
        'Badge is positioned absolutely and does not interfere with child element interaction',
        'Count is rendered as text for screen reader accessibility',
        'Pulse animation respects prefers-reduced-motion setting',
      ]}
      previous={{
        title: 'Navigation Menu',
        href: '/docs/components/navigation-menu',
      }}
      next={{
        title: 'Notification Center',
        href: '/docs/components/notification-center',
      }}
    />
  );
}
