'use client';

import { useState } from 'react';
import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Settings, User, Bell } from 'lucide-react';

function StyledTabsDemo() {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <StyledTabs
      code="0x00"
      title="NAVIGATION"
      tabs={[
        { id: 'tab1', label: 'OVERVIEW' },
        { id: 'tab2', label: 'SETTINGS', icon: Settings },
        { id: 'tab3', label: 'PROFILE', icon: User },
      ]}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <StyledTabsContent value="tab1">
        <Card>
          <CardHeader code="0x01" title="OVERVIEW_CONTENT" />
          <CardContent>
            <p className="text-muted-foreground text-xs">Overview content here</p>
          </CardContent>
        </Card>
      </StyledTabsContent>
      <StyledTabsContent value="tab2">
        <Card>
          <CardHeader code="0x01" title="SETTINGS_CONTENT" />
          <CardContent>
            <p className="text-muted-foreground text-xs">Settings content here</p>
          </CardContent>
        </Card>
      </StyledTabsContent>
      <StyledTabsContent value="tab3">
        <Card>
          <CardHeader code="0x01" title="PROFILE_CONTENT" />
          <CardContent>
            <p className="text-muted-foreground text-xs">Profile content here</p>
          </CardContent>
        </Card>
      </StyledTabsContent>
    </StyledTabs>
  );
}

function WithDescriptionDemo() {
  const [activeTab, setActiveTab] = useState('alerts');
  return (
    <StyledTabs
      code="0x00"
      title="NOTIFICATIONS"
      tabs={[
        { id: 'alerts', label: 'ALERTS', icon: Bell },
        { id: 'settings', label: 'SETTINGS', icon: Settings },
      ]}
      value={activeTab}
      onValueChange={setActiveTab}
      description={(tab) =>
        tab === 'alerts' ? 'Configure alert notifications' : 'Manage notification settings'
      }
    >
      <StyledTabsContent value="alerts">
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-xs">Alerts panel</p>
          </CardContent>
        </Card>
      </StyledTabsContent>
      <StyledTabsContent value="settings">
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-xs">Settings panel</p>
          </CardContent>
        </Card>
      </StyledTabsContent>
    </StyledTabs>
  );
}

export default function StyledTabsPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.76]"
      category="Components"
      title="Styled Tabs"
      description="Standardized tabs component with terminal card header and consistent styling."
      importCode={`import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs"`}
      mainPreview={{
        preview: <StyledTabsDemo />,
        code: `const [activeTab, setActiveTab] = useState('tab1');

<StyledTabs
  code="0x00"
  title="NAVIGATION"
  tabs={[
    { id: 'tab1', label: 'OVERVIEW' },
    { id: 'tab2', label: 'SETTINGS', icon: Settings },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
>
  <StyledTabsContent value="tab1">
    <Card>Content 1</Card>
  </StyledTabsContent>
  <StyledTabsContent value="tab2">
    <Card>Content 2</Card>
  </StyledTabsContent>
</StyledTabs>`,
      }}
      variants={[
        {
          title: 'With Icons',
          description: 'Tabs with Lucide icons.',
          preview: <StyledTabsDemo />,
          code: `<StyledTabs
  tabs={[
    { id: 'settings', label: 'SETTINGS', icon: Settings },
    { id: 'profile', label: 'PROFILE', icon: User },
  ]}
  ...
/>`,
        },
        {
          title: 'With Description',
          description: 'Dynamic description based on active tab.',
          preview: <WithDescriptionDemo />,
          code: `<StyledTabs
  description={(tab) => tab === 'alerts'
    ? 'Configure alert notifications'
    : 'Manage notification settings'}
  ...
/>`,
        },
      ]}
      props={[
        {
          name: 'code',
          type: 'string',
          description: 'Header code (e.g., "0x00").',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Header title displayed in terminal style.',
        },
        {
          name: 'tabs',
          type: 'StyledTab[]',
          description: 'Array of tab definitions with id, label, and optional icon.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Currently active tab id (controlled).',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when tab changes.',
        },
        {
          name: 'description',
          type: 'string | ((activeTab: string) => string)',
          description: 'Optional description shown below tabs. Can be dynamic function.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the outer container.',
        },
      ]}
      accessibility={[
        'Built on Radix UI Tabs primitive with full ARIA support',
        'Keyboard navigation: Arrow keys, Home, End',
        'role="tablist" on tab container',
        'role="tab" on each tab with aria-selected state',
        'role="tabpanel" on content panels',
        'Focus visible rings on all tabs',
      ]}
      previous={{ title: 'Sidebar', href: '/docs/components/sidebar' }}
      next={{ title: 'Tabs', href: '/docs/components/tabs' }}
    >
      <DocsSection title="Tab Interface">
        <DocsCard title="STYLED_TAB_TYPE">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`interface StyledTab {
  id: string;      // Unique identifier
  label: string;   // Display text (UPPERCASE)
  icon?: LucideIcon; // Optional Lucide icon
}`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Why Use StyledTabs?">
        <DocsCard title="BENEFITS">
          <ul className="space-y-2">
            <li className="text-xs">• Enforces consistent terminal styling across templates</li>
            <li className="text-xs">• Automatic card header with code/title pattern</li>
            <li className="text-xs">• Built-in icon support with proper sizing</li>
            <li className="text-xs">• Dynamic descriptions based on active tab</li>
            <li className="text-xs">• Adapts to current visual mode (sharp/standard/minimal)</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
