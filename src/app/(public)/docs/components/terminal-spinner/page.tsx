'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { TerminalSpinner } from '@/components/ui/terminal-spinner';

export default function TerminalSpinnerPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.77]"
      category="Components"
      title="Terminal Spinner"
      description="Authentic terminal loading animation using Braille dots."
      importCode={`import { TerminalSpinner } from "@/components/ui/terminal-spinner"`}
      mainPreview={{
        preview: (
          <div className="flex items-center gap-8">
            <TerminalSpinner />
            <TerminalSpinner label="Loading..." />
          </div>
        ),
        code: `<TerminalSpinner />
<TerminalSpinner label="Loading..." />`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard medium-sized spinner.',
          preview: <TerminalSpinner />,
          code: `<TerminalSpinner />`,
        },
        {
          title: 'Small',
          description: 'Compact spinner for inline use.',
          preview: <TerminalSpinner size="sm" />,
          code: `<TerminalSpinner size="sm" />`,
        },
        {
          title: 'Large',
          description: 'Large spinner for page-level loading.',
          preview: <TerminalSpinner size="lg" />,
          code: `<TerminalSpinner size="lg" />`,
        },
        {
          title: 'With Label',
          description: 'Spinner with descriptive loading text.',
          preview: <TerminalSpinner label="Fetching data..." />,
          code: `<TerminalSpinner label="Fetching data..." />`,
        },
        {
          title: 'Custom Speed',
          description: 'Slower animation (120ms per frame).',
          preview: <TerminalSpinner speed={120} label="Processing..." />,
          code: `<TerminalSpinner speed={120} label="Processing..." />`,
        },
      ]}
      props={[
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size of the spinner (sm=14px, md=24px, lg=36px).',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional loading label displayed next to spinner.',
        },
        {
          name: 'speed',
          type: 'number',
          default: '80',
          description: 'Animation speed in milliseconds per frame.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the container.',
        },
      ]}
      accessibility={[
        'Uses aria-live="polite" via parent component for screen readers',
        'Spinner character is decorative (not announced)',
        'Label provides context for loading state',
        'No motion preference: respects prefers-reduced-motion',
      ]}
      previous={{ title: 'Notification List', href: '/docs/components/notification-list' }}
      next={{ title: 'Toast', href: '/docs/components/toast' }}
    >
      <DocsSection title="Animation Frames">
        <DocsCard title="BRAILLE_SEQUENCE">
          <p className="text-muted-foreground mb-4 text-xs">
            The spinner uses Unicode Braille characters for an authentic terminal look:
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`const SPINNER_FRAMES = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];`}
          </pre>
          <p className="text-muted-foreground mt-4 text-xs">
            8 frames at 80ms = smooth 640ms cycle
          </p>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Usage Examples">
        <DocsCard title="BUTTON_LOADING">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`<Button disabled={isLoading}>
  {isLoading ? (
    <TerminalSpinner size="sm" />
  ) : (
    '> SUBMIT'
  )}
</Button>`}
          </pre>
        </DocsCard>
        <DocsCard title="PAGE_LOADING">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`<div className="flex h-screen items-center justify-center">
  <TerminalSpinner size="lg" label="[INIT] Loading system..." />
</div>`}
          </pre>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
