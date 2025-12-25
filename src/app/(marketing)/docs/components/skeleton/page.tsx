'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function SkeletonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.13]"
      category="Display"
      title="Skeleton"
      description="A loading placeholder component that displays an animated pulse effect while content is being fetched or processed."
      importCode={`import { Skeleton } from "@/components/ui/skeleton";`}
      mainPreview={{
        preview: <Skeleton className="h-12 w-[250px]" />,
        code: `<Skeleton className="h-12 w-[250px]" />`,
      }}
      variants={[
        {
          title: 'Text Skeleton',
          description: 'Skeleton placeholders for text content',
          preview: (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-4 w-[150px]" />
</div>`,
        },
        {
          title: 'Card Skeleton',
          description: 'Full card loading state with header and content',
          preview: (
            <Card className="w-[350px]">
              <CardHeader code="0x00" title="LOADING" />
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardHeader code="0x00" title="LOADING" />
  <CardContent className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </CardContent>
</Card>`,
        },
        {
          title: 'Avatar Skeleton',
          description: 'Circular skeleton for avatar placeholders',
          preview: (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-none" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ),
          code: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-none" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </div>
</div>`,
        },
        {
          title: 'List Skeleton',
          description: 'Skeleton for a list of items',
          preview: (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-none" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ),
          code: `<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-none" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ))}
</div>`,
        },
        {
          title: 'Image Skeleton',
          description: 'Rectangle skeleton for image placeholders',
          preview: (
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-none" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ),
          code: `<div className="space-y-4">
  <Skeleton className="h-[200px] w-full rounded-none" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </div>
</div>`,
        },
        {
          title: 'Dashboard Skeleton',
          description: 'Complex skeleton for dashboard widgets',
          preview: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader code="0x00" title="LOADING" />
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
          ),
          code: `<div className="space-y-4">
  <div className="grid grid-cols-3 gap-4">
    <Card>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-16" />
      </CardContent>
    </Card>
    {/* More stat cards... */}
  </div>
  <Card>
    <CardHeader code="0x00" title="LOADING" />
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
</div>`,
        },
      ]}
      props={[
        {
          name: 'className',
          type: 'string',
          description:
            'CSS classes for sizing and styling the skeleton. Use Tailwind utilities for width (w-*) and height (h-*)',
        },
        {
          name: '...props',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'All standard div HTML attributes are supported',
        },
      ]}
      accessibility={[
        "Skeleton components are purely visual - they don't require specific accessibility attributes",
        'The pulse animation provides a clear visual indicator that content is loading',
        "Consider adding aria-busy='true' or aria-label='Loading content' to parent containers when using skeletons",
        'For screen readers, ensure the actual content has proper loading states with appropriate ARIA live regions',
        'The skeleton should match the layout of the actual content to prevent layout shift',
        'Use rounded-none for terminal-style design consistency',
      ]}
      previous={{ title: 'Avatar', href: '/docs/components/avatar' }}
      next={{ title: 'Form Components', href: '/docs/components' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Skeleton when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Loading data from API or database (user lists, product grids, content pages)
                </li>
                <li className="text-xs">
                  • Placeholder for content being fetched (prevents blank screen during load)
                </li>
                <li className="text-xs">
                  • Lazy-loaded images or components (show skeleton until loaded)
                </li>
                <li className="text-xs">
                  • Progressive page rendering (show skeleton, then replace with real content)
                </li>
                <li className="text-xs">
                  • Layout needs to match final content shape (prevents layout shift)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Content loads instantly (no need for placeholder)</li>
                <li className="text-xs">
                  • Indeterminate loading with unknown duration (use Loading component instead)
                </li>
                <li className="text-xs">
                  • Small inline elements (use shimmer effect or simple loading text)
                </li>
                <li className="text-xs">
                  • Background operations user doesn&apos;t wait for (use Toast when complete)
                </li>
                <li className="text-xs">• Static placeholders that never load content</li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Match skeleton layout to actual content (same height, width, structure)
                </li>
                <li className="text-xs">
                  • Use appropriate shapes: rounded-none for terminal style, w-12 h-12 for avatars
                </li>
                <li className="text-xs">
                  • Vary widths for text lines (w-[250px], w-[200px], w-[150px] for natural look)
                </li>
                <li className="text-xs">
                  • Group skeleton items to match final layout (lists, cards, grids)
                </li>
                <li className="text-xs">
                  • Add aria-busy=&quot;true&quot; to parent containers for screen readers
                </li>
                <li className="text-xs">
                  • Replace skeleton with real content smoothly (avoid jarring transitions)
                </li>
                <li className="text-xs">
                  • Show multiple skeleton items for lists (3-5 items typical)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
