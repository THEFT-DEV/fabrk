'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function TabsPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.17]"
      category="Navigation"
      title="Tabs"
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
      importCode={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`}
      mainPreview={{
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`,
        preview: (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        ),
      }}
      variants={[
        {
          title: 'With Cards',
          description: 'Tabs combined with card components for structured content',
          code: `<Tabs defaultValue="overview" className="w-full">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader code="0x00" title="OVERVIEW" meta="View your account overview and recent activity." />
      <CardContent className="space-y-2">
        <p>Your dashboard content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="analytics">
    <Card>
      <CardHeader code="0x01" title="ANALYTICS" meta="View detailed analytics and insights." />
      <CardContent className="space-y-2">
        <p>Analytics data will be displayed here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="reports">
    <Card>
      <CardHeader code="0x02" title="REPORTS" meta="Generate and view reports." />
      <CardContent className="space-y-2">
        <p>Reports will be shown here.</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
          preview: (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader
                    code="0x00"
                    title="OVERVIEW"
                    meta="View your account overview and recent activity."
                  />
                  <CardContent className="space-y-2">
                    <p>Your dashboard content goes here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader
                    code="0x01"
                    title="ANALYTICS"
                    meta="View detailed analytics and insights."
                  />
                  <CardContent className="space-y-2">
                    <p>Analytics data will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader code="0x02" title="REPORTS" meta="Generate and view reports." />
                  <CardContent className="space-y-2">
                    <p>Reports will be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ),
        },
        {
          title: 'Disabled Tab',
          description: 'Individual tabs can be disabled to prevent interaction',
          code: `<Tabs defaultValue="enabled" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="enabled">Enabled</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
  <TabsContent value="enabled">
    This tab is enabled and active.
  </TabsContent>
  <TabsContent value="disabled">
    This content won't be shown as the tab is disabled.
  </TabsContent>
  <TabsContent value="another">
    Another enabled tab.
  </TabsContent>
</Tabs>`,
          preview: (
            <Tabs defaultValue="enabled" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="enabled">Enabled</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Disabled
                </TabsTrigger>
                <TabsTrigger value="another">Another</TabsTrigger>
              </TabsList>
              <TabsContent value="enabled">This tab is enabled and active.</TabsContent>
              <TabsContent value="disabled">
                This content won't be shown as the tab is disabled.
              </TabsContent>
              <TabsContent value="another">Another enabled tab.</TabsContent>
            </Tabs>
          ),
        },
        {
          title: 'Tabs Inside Card',
          description: 'Tabs as card header navigation with boxed grid style',
          code: `<Card>
  <CardHeader code="0x00" title="NAVIGATION" />
  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="w-full">
      <TabsTrigger value="overview">[OVERVIEW]</TabsTrigger>
      <TabsTrigger value="settings">[SETTINGS]</TabsTrigger>
      <TabsTrigger value="billing">[BILLING]</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="p-4">
      <p>Overview content goes here.</p>
    </TabsContent>
    <TabsContent value="settings" className="p-4">
      <p>Settings content goes here.</p>
    </TabsContent>
    <TabsContent value="billing" className="p-4">
      <p>Billing information goes here.</p>
    </TabsContent>
  </Tabs>
</Card>`,
          preview: (
            <Card>
              <CardHeader code="0x00" title="NAVIGATION" />
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="overview">[OVERVIEW]</TabsTrigger>
                  <TabsTrigger value="settings">[SETTINGS]</TabsTrigger>
                  <TabsTrigger value="billing">[BILLING]</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4">
                  <p>Overview content goes here.</p>
                </TabsContent>
                <TabsContent value="settings" className="p-4">
                  <p>Settings content goes here.</p>
                </TabsContent>
                <TabsContent value="billing" className="p-4">
                  <p>Billing information goes here.</p>
                </TabsContent>
              </Tabs>
            </Card>
          ),
        },
        {
          title: 'Full Width',
          description: 'Tabs that span the full width of their container',
          code: `<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
  <TabsContent value="tab3">Content for tab 3</TabsContent>
</Tabs>`,
          preview: (
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="tab1" className="flex-1">
                  Tab 1
                </TabsTrigger>
                <TabsTrigger value="tab2" className="flex-1">
                  Tab 2
                </TabsTrigger>
                <TabsTrigger value="tab3" className="flex-1">
                  Tab 3
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">Content for tab 1</TabsContent>
              <TabsContent value="tab2">Content for tab 2</TabsContent>
              <TabsContent value="tab3">Content for tab 3</TabsContent>
            </Tabs>
          ),
        },
        {
          title: 'Vertical Orientation',
          description: 'Tabs can be oriented vertically with custom styling',
          code: `<Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="tab1" className="w-full justify-start">
      Profile
    </TabsTrigger>
    <TabsTrigger value="tab2" className="w-full justify-start">
      Settings
    </TabsTrigger>
    <TabsTrigger value="tab3" className="w-full justify-start">
      Notifications
    </TabsTrigger>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="tab1">
      Profile settings and information
    </TabsContent>
    <TabsContent value="tab2">
      Application settings
    </TabsContent>
    <TabsContent value="tab3">
      Notification preferences
    </TabsContent>
  </div>
</Tabs>`,
          preview: (
            <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
              <TabsList className="h-auto flex-col">
                <TabsTrigger value="tab1" className="w-full justify-start">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="tab2" className="w-full justify-start">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="tab3" className="w-full justify-start">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <div className="flex-1">
                <TabsContent value="tab1">Profile settings and information</TabsContent>
                <TabsContent value="tab2">Application settings</TabsContent>
                <TabsContent value="tab3">Notification preferences</TabsContent>
              </div>
            </Tabs>
          ),
        },
      ]}
      props={[
        {
          name: 'defaultValue',
          type: 'string',
          description: 'The value of the tab that should be active by default',
        },
        {
          name: 'value',
          type: 'string',
          description:
            'The controlled value of the active tab. Use with onValueChange for controlled tabs.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback function when the active tab changes',
        },
        {
          name: 'orientation',
          type: '"horizontal" | "vertical"',
          description: 'The orientation of the tabs',
          default: '"horizontal"',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true on TabsTrigger, prevents user interaction',
          default: 'false',
        },
      ]}
      accessibility={[
        'Supports keyboard navigation with arrow keys between tabs',
        'Tab key moves focus into and out of the tab list',
        'Automatically manages aria-selected and aria-controls attributes',
        'TabsContent is hidden with display: none when inactive, properly removing from tab order',
      ]}
      previous={{
        title: 'Navigation Components',
        href: '/docs/components#navigation',
      }}
      next={{
        title: 'Dropdown Menu',
        href: '/docs/components/dropdown-menu',
      }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Tabs when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Organizing related content into 2-7 logical sections (settings, profile,
                  billing)
                </li>
                <li className="text-xs">
                  • Same-level information that users may want to compare or switch between
                </li>
                <li className="text-xs">
                  • Space-saving layout for dense content (dashboard views, documentation)
                </li>
                <li className="text-xs">
                  • Content should stay on the same page without navigation
                </li>
                <li className="text-xs">
                  • Users frequently switch between sections during a single session
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Step-by-step process where order matters (use multi-step form)
                </li>
                <li className="text-xs">
                  • Navigating to different pages (use Navigation component or links)
                </li>
                <li className="text-xs">• Only one section of content (just show it directly)</li>
                <li className="text-xs">
                  • More than 7 tabs (consider accordion, sidebar, or different organization)
                </li>
                <li className="text-xs">
                  • Content needs to be visible simultaneously (use sections with headings)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Ideal range: 2-7 tabs (fewer = just show content; more = different UI pattern)
                </li>
                <li className="text-xs">
                  • Clear, concise labels (1-2 words: &quot;Overview&quot;, &quot;Settings&quot;,
                  &quot;Billing&quot;)
                </li>
                <li className="text-xs">• Always set a default active tab with defaultValue</li>
                <li className="text-xs">
                  • Use horizontal orientation by default; vertical for sidebar-style layouts
                </li>
                <li className="text-xs">
                  • Disable tabs that are temporarily unavailable (don&apos;t hide them)
                </li>
                <li className="text-xs">
                  • Order tabs by importance or logical flow (left to right)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
