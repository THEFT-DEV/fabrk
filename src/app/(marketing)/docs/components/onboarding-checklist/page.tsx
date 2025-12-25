'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { OnboardingChecklist } from '@/components/ui/onboarding-checklist';
import { useState } from 'react';

const mockTasks = [
  {
    id: '1',
    title: 'Connect your first integration',
    description: 'Link your account to start syncing data across platforms.',
    completed: true,
    link: {
      text: 'View integrations',
      href: '/integrations',
    },
  },
  {
    id: '2',
    title: 'Invite team members',
    description: 'Collaborate by inviting your team to join your workspace.',
    completed: true,
    link: {
      text: 'Invite team',
      href: '/team/invite',
    },
  },
  {
    id: '3',
    title: 'Configure webhook endpoint',
    description: 'Set up a webhook to receive real-time events from our API.',
    completed: false,
    link: {
      text: 'Setup webhooks',
      href: '/webhooks',
    },
  },
  {
    id: '4',
    title: 'Generate API token',
    description: 'Create an API key for programmatic access to your data.',
    completed: false,
    link: {
      text: 'Manage API keys',
      href: '/api-keys',
    },
  },
];

export default function OnboardingChecklistPage() {
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <ComponentShowcaseTemplate
      code="[PRO.04]"
      category="Pro Pack"
      title="Onboarding Checklist"
      description="Track user setup progress with expandable tasks, progress bar, and celebration animation on completion."
      importCode={`import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-2xl">
            <OnboardingChecklist
              tasks={tasks}
              onTaskToggle={(taskId, completed) => {
                setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed } : t)));
              }}
              onDismiss={() => {
                // Handle dismiss
              }}
              showCelebration={true}
            />
          </div>
        ),
        code: `<OnboardingChecklist
  tasks={tasks}
  onTaskToggle={(taskId, completed) => {
    // Update task completion
  }}
  onDismiss={() => {
    // Handle dismiss
  }}
  showCelebration={true}
/>`,
      }}
      props={[
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
        {
          name: 'tasks',
          type: 'OnboardingTask[]',
          default: 'required',
          description: 'Array of onboarding tasks to display.',
        },
        {
          name: 'onTaskToggle',
          type: '(taskId: string, completed: boolean) => void | Promise<void>',
          default: 'undefined',
          description: 'Callback when a task is checked/unchecked.',
        },
        {
          name: 'onDismiss',
          type: '() => void',
          default: 'undefined',
          description: 'Callback when the checklist is dismissed.',
        },
        {
          name: 'showCelebration',
          type: 'boolean',
          default: 'true',
          description: 'Show confetti animation when all tasks are complete.',
        },
      ]}
      accessibility={[
        'Checkboxes properly labeled with task titles',
        'Expandable details with keyboard navigation',
        'Minimize/dismiss buttons have aria-labels',
        'Progress bar shows visual and text completion status',
        'Framer Motion animations respect prefers-reduced-motion',
        'All interactive elements keyboard accessible',
      ]}
      previous={{
        title: 'Cookie Consent',
        href: '/docs/components/cookie-consent',
      }}
      next={{ title: 'Webhook Log', href: '/docs/components/webhook-log' }}
    />
  );
}
