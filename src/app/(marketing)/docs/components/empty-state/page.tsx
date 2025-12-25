'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { EmptyState } from '@/components/ui/empty-state';
import { Inbox, FolderOpen, Users, Search, FileX } from 'lucide-react';

export default function EmptyStatePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.26]"
      title="Empty State"
      description="A placeholder component for displaying empty states with optional icon, title, description, and action button."
      importCode={`import { EmptyState } from "@/components/ui/empty-state";`}
      mainPreview={{
        preview: (
          <EmptyState
            icon={Inbox}
            title="No messages yet"
            description="When you receive messages, they will appear here."
          />
        ),
        code: `<EmptyState
  icon={Inbox}
  title="No messages yet"
  description="When you receive messages, they will appear here."
/>`,
      }}
      variants={[
        {
          title: 'With Action Button',
          description: 'Empty state with a call-to-action',
          preview: (
            <EmptyState
              icon={FolderOpen}
              title="No projects found"
              description="Get started by creating your first project."
              action={{
                label: 'Create Project',
                onClick: () => alert('Creating project...'),
              }}
            />
          ),
          code: `<EmptyState
  icon={FolderOpen}
  title="No projects found"
  description="Get started by creating your first project."
  action={{
    label: "Create Project",
    onClick: () => handleCreate(),
  }}
/>`,
        },
        {
          title: 'Search Results Empty',
          description: 'Empty state for no search results',
          preview: (
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search terms or filters."
              action={{
                label: 'Clear Filters',
                onClick: () => alert('Clearing filters...'),
              }}
            />
          ),
          code: `<EmptyState
  icon={Search}
  title="No results found"
  description="Try adjusting your search terms or filters."
  action={{
    label: "Clear Filters",
    onClick: () => handleClearFilters(),
  }}
/>`,
        },
        {
          title: 'No Team Members',
          description: 'Empty state for team management',
          preview: (
            <EmptyState
              icon={Users}
              title="No team members"
              description="Invite team members to collaborate on this project."
              action={{
                label: 'Invite Members',
                onClick: () => alert('Opening invite dialog...'),
              }}
            />
          ),
          code: `<EmptyState
  icon={Users}
  title="No team members"
  description="Invite team members to collaborate on this project."
  action={{
    label: "Invite Members",
    onClick: () => handleInvite(),
  }}
/>`,
        },
        {
          title: 'Error State',
          description: 'Empty state for errors or failed loads',
          preview: (
            <EmptyState
              icon={FileX}
              title="Failed to load data"
              description="Something went wrong. Please try again later."
              action={{
                label: 'Retry',
                onClick: () => alert('Retrying...'),
              }}
            />
          ),
          code: `<EmptyState
  icon={FileX}
  title="Failed to load data"
  description="Something went wrong. Please try again later."
  action={{
    label: "Retry",
    onClick: () => handleRetry(),
  }}
/>`,
        },
        {
          title: 'Without Icon',
          description: 'Minimal empty state with text only',
          preview: (
            <EmptyState
              title="Nothing here yet"
              description="Your content will appear once you add items."
            />
          ),
          code: `<EmptyState
  title="Nothing here yet"
  description="Your content will appear once you add items."
/>`,
        },
      ]}
      props={[
        {
          name: 'icon',
          type: 'LucideIcon',
          description: 'Lucide icon component to display',
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Primary heading text',
        },
        {
          name: 'description',
          type: 'string',
          description: 'Supporting descriptive text',
        },
        {
          name: 'action',
          type: '{ label: string; onClick: () => void }',
          description: 'Optional action button configuration',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Uses semantic heading (h3) for title',
        'Icon is wrapped in muted background container for visual hierarchy',
        'Icon size (h-12 w-12) is large enough to be easily recognizable',
        'Text color contrast meets WCAG AA standards',
        'Description has max-width (max-w-sm) for optimal reading length',
        'Action button uses the Button component with full accessibility support',
        'Flexbox centering works across different container sizes',
      ]}
      previous={{
        title: 'Data Table Header',
        href: '/docs/components/data-table-header',
      }}
      next={{ title: 'Filters Bar', href: '/docs/components/filters-bar' }}
    />
  );
}
