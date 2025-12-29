'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { ChangelogEntry } from '@/components/changelog';
import { type ChangelogEntry as ChangelogEntryType } from '@/data/changelog';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';

const mockEntry: ChangelogEntryType = {
  version: '1.0.0',
  date: '2025-12-15',
  title: 'INITIAL_RELEASE',
  url: 'https://github.com/example/repo/releases/tag/v1.0.0',
  changes: [
    { type: 'added', description: `${COMPONENT_COUNT_STRING} production-ready UI components` },
    { type: 'added', description: `${THEME_COUNT_STRING} terminal color themes` },
    { type: 'added', description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)' },
    { type: 'changed', description: 'Upgraded to Next.js 16 with React 19' },
    { type: 'fixed', description: 'Mobile navigation z-index issues' },
    { type: 'security', description: 'Updated auth dependencies' },
  ],
};

const compactEntry: ChangelogEntryType = {
  version: '0.9.0',
  date: '2025-12-01',
  title: 'BETA_RELEASE',
  changes: [
    { type: 'added', description: 'Initial component library' },
    { type: 'added', description: 'Terminal theme system' },
  ],
};

export default function ChangelogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[SAAS.04]"
      category="SaaS"
      title="Changelog"
      description="Terminal-styled release notes component with version history, change type categorization, and GitHub integration."
      importCode={`import { ChangelogEntry } from "@/components/changelog"
import { CHANGELOG } from "@/data/changelog"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-2xl">
            <ChangelogEntry entry={mockEntry} index={0} />
          </div>
        ),
        code: `<ChangelogEntry
  entry={{
    version: '1.0.0',
    date: '2025-12-15',
    title: 'INITIAL_RELEASE',
    url: 'https://github.com/...',
    changes: [
      { type: 'added', description: 'Production-ready UI components' },
      { type: 'changed', description: 'Upgraded to Next.js 16' },
      { type: 'fixed', description: 'Mobile navigation issues' },
    ],
  }}
  index={0}
/>`,
      }}
      variants={[
        {
          title: 'Compact Mode',
          preview: (
            <div className="w-full max-w-2xl">
              <ChangelogEntry entry={compactEntry} index={0} compact />
            </div>
          ),
          code: `<ChangelogEntry entry={entry} compact />`,
        },
        {
          title: 'No GitHub Link',
          preview: (
            <div className="w-full max-w-2xl">
              <ChangelogEntry entry={compactEntry} index={1} />
            </div>
          ),
          code: `// Entries without 'url' prop won't show GitHub link
<ChangelogEntry
  entry={{
    version: '0.9.0',
    date: '2025-12-01',
    title: 'BETA_RELEASE',
    changes: [...],
    // no url prop
  }}
  index={1}
/>`,
        },
      ]}
      props={[
        {
          name: 'entry',
          type: 'ChangelogEntry',
          default: 'required',
          description:
            'The changelog entry object containing version, date, title, url, and changes array.',
        },
        {
          name: 'index',
          type: 'number',
          default: '0',
          description: 'Index for hex code generation in the card header (0x01, 0x02, etc.).',
        },
        {
          name: 'compact',
          type: 'boolean',
          default: 'false',
          description: 'Enable compact mode - hides GitHub link and reduces spacing.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the card container.',
        },
      ]}
      usageExamples={[
        {
          title: 'Rendering All Changelog Entries',
          code: `import { CHANGELOG } from '@/data/changelog';
import { ChangelogEntry } from '@/components/changelog';

export default function ChangelogPage() {
  return (
    <div className="space-y-12">
      {CHANGELOG.map((entry, index) => (
        <ChangelogEntry
          key={entry.version}
          entry={entry}
          index={index}
        />
      ))}
    </div>
  );
}`,
        },
        {
          title: 'Filtering by Change Type',
          code: `import { getChangelogByType } from '@/data/changelog';

// Get only entries with 'added' changes
const addedOnly = getChangelogByType('added');

// Get only entries with 'fixed' changes
const fixedOnly = getChangelogByType('fixed');`,
        },
        {
          title: 'Syncing from GitHub Releases',
          code: `# Run the sync script to fetch latest releases
npm run sync:changelog

# Configure via environment variables:
# GITHUB_TOKEN - Optional, for private repos
# GITHUB_OWNER - Repository owner (default: "jpoindexter")
# GITHUB_REPO  - Repository name (default: "fabrk-dev")`,
        },
      ]}
      accessibility={[
        'Semantic heading structure with h2 for version titles',
        'Change type icons have associated labels for screen readers',
        'External links marked with rel="noopener noreferrer"',
        'Sufficient color contrast for all change type indicators',
        'Keyboard accessible GitHub links',
      ]}
      previous={{
        title: 'Balance Display',
        href: '/docs/components/balance-display',
      }}
      next={{
        title: 'Billing Summary Card',
        href: '/docs/components/billing-summary-card',
      }}
    />
  );
}
