/**
 * FABRK COMPONENT
 * Getting Started Guide - Library Templates
 * Complete walkthrough for first-time users
 * Uses LibraryGuideTemplate for consistent structure
 */
import Link from 'next/link';
import { Rocket, FolderTree, Terminal } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function GettingStartedPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Getting Started' }]}
      icon={Rocket}
      badge="GETTING_STARTED"
      title="Getting Started with Library Templates"
      description="Learn how to copy, customize, and integrate production-ready templates into your Next.js project in under 10 minutes."
      meta={{ time: '~10 minutes', level: 'Beginner' }}
      learningObjectives={[
        'How to navigate the library and find the right template',
        'How to copy template code into your project',
        'Understanding template structure and dependencies',
        'First customizations and basic modifications',
        'Next steps for integrations and advanced features',
      ]}
      prerequisites={[
        {
          title: 'Next.js 15+ Project',
          description: 'App Router with TypeScript enabled. Templates use Next.js 15 features.',
        },
        {
          title: 'Fabrk Dependencies',
          description:
            "All templates assume you're using Fabrk with Radix UI, Tailwind CSS 4, and the design system.",
        },
        {
          title: 'Design System Setup',
          description:
            'Templates use mode.font, mode.radius, and design tokens from @/design-system.',
        },
      ]}
      steps={[
        {
          code: '0x02',
          title: 'STEP 1: BROWSE THE LIBRARY',
          content: (
            <>
              <p>
                Start by exploring the{' '}
                <Link href="/library" className="text-primary hover:underline">
                  template library
                </Link>{' '}
                to find components that match your needs.
              </p>
              <div className="border-border space-y-4 border p-4">
                <p className="text-muted-foreground font-medium">[NAVIGATION TIPS]:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
                  <li>
                    <span className="font-medium">Search bar</span>: Type keywords like
                    "authentication", "dashboard", or "billing"
                  </li>
                  <li>
                    <span className="font-medium">Category filters</span>: Filter by Dashboards,
                    Auth, Admin, etc.
                  </li>
                  <li>
                    <span className="font-medium">Featured section</span>: Most popular and
                    essential templates
                  </li>
                  <li>
                    <span className="font-medium">Status badges</span>: Look for "Popular", "New",
                    or "Essential" tags
                  </li>
                </ul>
              </div>
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-2 font-medium">[EXAMPLE]:</p>
                <p className="text-muted-foreground">
                  Building a SaaS dashboard? Search for "analytics dashboard" or filter by
                  "Dashboards" category to find the Analytics Dashboard, Team Dashboard, and Chart
                  Library templates.
                </p>
              </div>
            </>
          ),
        },
        {
          code: '0x03',
          title: 'STEP 2: PREVIEW & INSPECT',
          content: (
            <>
              <p>Each template page has two tabs: [PREVIEW] and [CODE].</p>
              <div className="space-y-4">
                <div className="border-border border p-4">
                  <p className="text-primary mb-2 font-medium">[PREVIEW TAB]:</p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                    <li>See the template in action with live interactions</li>
                    <li>Test responsive behavior by resizing your browser</li>
                    <li>Verify it matches your design requirements</li>
                  </ul>
                </div>
                <div className="border-border border p-4">
                  <p className="text-primary mb-2 font-medium">[CODE TAB]:</p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                    <li>Complete, copyable source code</li>
                    <li>Includes all imports, state management, and styling</li>
                    <li>Ready to paste with minimal modifications</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground">
                Scroll down to see the <span className="font-medium">File Structure</span> section,
                which shows exactly where to place the code in your project.
              </p>
            </>
          ),
        },
        {
          code: '0x04',
          title: 'STEP 3: COPY THE CODE',
          content: (
            <>
              <p>
                Click the [CODE] tab and use the copy button in the top-right corner of the code
                block.
              </p>
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-2 flex items-center gap-2 font-medium">
                  <Terminal className="h-4 w-4" />
                  [QUICK COPY]:
                </p>
                <ol className="text-muted-foreground list-inside list-decimal space-y-2 pl-2">
                  <li>Switch to [CODE] tab on template page</li>
                  <li>Click the copy icon in the code block header</li>
                  <li>
                    Code is now in your clipboard with syntax highlighting preserved for readability
                  </li>
                </ol>
              </div>
              <div className="border-border border-l-primary space-y-2 border-l-2 pl-4">
                <p className="font-medium">[TIP]:</p>
                <p className="text-muted-foreground">
                  The code includes comments showing exactly where to paste it in your project
                  structure (e.g.,{' '}
                  <code className="bg-muted px-1">app/(dashboard)/analytics/page.tsx</code>).
                </p>
              </div>
            </>
          ),
        },
        {
          code: '0x05',
          title: 'STEP 4: PASTE INTO YOUR PROJECT',
          content: (
            <>
              <p>Create the file structure shown in the template's [FILE STRUCTURE] section.</p>
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-4 flex items-center gap-2 font-medium">
                  <FolderTree className="h-4 w-4" />
                  [EXAMPLE FILE STRUCTURE]:
                </p>
                <LibraryCodeBlock
                  code={`app/
  (dashboard)/          ← Create route group if needed
    analytics/          ← Create directory
      page.tsx          ← Paste template code here
components/
  metric-cards.tsx      ← Extract component (if splitting)
  revenue-chart.tsx     ← Extract component (if splitting)`}
                  language="bash"
                  maxHeight="200px"
                />
              </div>
              <div className="space-y-4">
                <p className="font-medium">What to adjust after pasting:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
                  <li>
                    <span className="font-medium">Import paths</span>: Verify all{' '}
                    <code className="bg-muted px-1">@/components/...</code> imports resolve
                    correctly
                  </li>
                  <li>
                    <span className="font-medium">Mock data</span>: Replace placeholder data with
                    real API calls or database queries
                  </li>
                  <li>
                    <span className="font-medium">Routes</span>: Update any hardcoded routes to
                    match your app structure
                  </li>
                  <li>
                    <span className="font-medium">Environment variables</span>: Add any required env
                    vars to <code className="bg-muted px-1">.env.local</code>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          code: '0x06',
          title: 'STEP 5: TEST & VERIFY',
          content: (
            <>
              <p>Run your development server and verify the template works:</p>
              <LibraryCodeBlock
                code={`# Start dev server
npm run dev

# Visit your new route
# e.g., http://localhost:3000/analytics

# Check for TypeScript errors
npm run type-check

# Run linting
npm run lint`}
                language="bash"
                maxHeight="200px"
              />
              <div className="border-border space-y-2 border p-4">
                <p className="text-primary font-medium">[COMMON ISSUES]:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                  <li>Missing imports? Check you have all required components installed</li>
                  <li>
                    TypeScript errors? Verify <code className="bg-muted px-1">@/design-system</code>{' '}
                    module exists
                  </li>
                  <li>Styling broken? Ensure Tailwind CSS config includes all template paths</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  See the{' '}
                  <Link
                    href="/library/docs/troubleshooting"
                    className="text-primary hover:underline"
                  >
                    Troubleshooting Guide
                  </Link>{' '}
                  for detailed solutions.
                </p>
              </div>
            </>
          ),
        },
      ]}
      nextSteps={[
        {
          title: 'Add Authentication',
          description: 'Integrate NextAuth for user login, sessions, and protected routes',
          href: '/library/docs/integration/nextauth',
        },
        {
          title: 'Connect Database',
          description: 'Replace mock data with real database queries using Prisma',
          href: '/library/docs/integration/prisma',
        },
        {
          title: 'Customize Design',
          description: 'Change colors, fonts, spacing, and components to match your brand',
          href: '/library/docs/customization',
        },
        {
          title: 'Browse More Templates',
          description: 'Explore 30+ more production-ready templates across all categories',
          href: '/library',
        },
      ]}
      quickReference={[
        {
          title: '[RESOURCES]',
          links: [
            { label: 'Template Library', href: '/library' },
            { label: 'Component API Docs', href: '/docs' },
            { label: 'Troubleshooting', href: '/library/docs/troubleshooting' },
          ],
        },
        {
          title: '[INTEGRATIONS]',
          links: [
            { label: 'NextAuth', href: '/library/docs/integration/nextauth' },
            { label: 'Prisma', href: '/library/docs/integration/prisma' },
            { label: 'Polar.sh', href: '/library/docs/integration/polar' },
          ],
        },
      ]}
    />
  );
}
