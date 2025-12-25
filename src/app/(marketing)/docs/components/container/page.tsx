'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Container } from '@/components/ui/container';

export default function ContainerPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.73]"
      category="Components"
      title="Container"
      description="A responsive container component for consistent page width and padding."
      importCode={`import { Container } from "@/components/ui/container"`}
      mainPreview={{
        preview: (
          <Container className="border-border bg-card border">
            <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
              <span className="text-primary">&gt;</span> Container with default size (2xl)
            </div>
          </Container>
        ),
        code: `<Container>
  <div>Content</div>
</Container>`,
      }}
      variants={[
        {
          title: 'Small',
          description: 'Compact container for focused content (640px max).',
          preview: (
            <Container size="sm" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-screen-sm
              </div>
            </Container>
          ),
          code: `<Container size="sm">
  <div>Content</div>
</Container>`,
        },
        {
          title: 'Medium',
          description: 'Medium width for articles and forms (768px max).',
          preview: (
            <Container size="md" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-screen-md
              </div>
            </Container>
          ),
          code: `<Container size="md">
  <div>Content</div>
</Container>`,
        },
        {
          title: 'Large',
          description: 'Large container for dashboards (1024px max).',
          preview: (
            <Container size="lg" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-screen-lg
              </div>
            </Container>
          ),
          code: `<Container size="lg">
  <div>Content</div>
</Container>`,
        },
        {
          title: 'Extra Large',
          description: 'Wide container for data tables (1280px max).',
          preview: (
            <Container size="xl" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-screen-xl
              </div>
            </Container>
          ),
          code: `<Container size="xl">
  <div>Content</div>
</Container>`,
        },
        {
          title: '2XL (Default)',
          description: 'Maximum width for full layouts (1536px max).',
          preview: (
            <Container size="2xl" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-screen-2xl
              </div>
            </Container>
          ),
          code: `<Container size="2xl">
  <div>Content</div>
</Container>`,
        },
        {
          title: 'Prose',
          description: 'Optimized for long-form reading (65ch max).',
          preview: (
            <Container size="prose" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                max-w-prose
              </div>
            </Container>
          ),
          code: `<Container size="prose">
  <article>Content</article>
</Container>`,
        },
        {
          title: 'No Padding',
          description: 'Remove horizontal padding for custom spacing.',
          preview: (
            <Container padding="none" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                No padding applied
              </div>
            </Container>
          ),
          code: `<Container padding="none">
  <div>Content</div>
</Container>`,
        },
        {
          title: 'As Main Element',
          description: 'Render as semantic <main> element.',
          preview: (
            <Container as="main" className="border-border bg-card border">
              <div className="border-muted-foreground/30 rounded-none border border-dashed p-4">
                &lt;main&gt; element
              </div>
            </Container>
          ),
          code: `<Container as="main">
  <div>Main content</div>
</Container>`,
        },
      ]}
      props={[
        {
          name: 'size',
          type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full" | "prose"',
          default: '"2xl"',
          description: 'Maximum width of the container.',
        },
        {
          name: 'padding',
          type: '"none" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: 'Horizontal padding applied to the container.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: '"div"',
          description: 'HTML element to render (div, main, section, article, etc.).',
        },
      ]}
      accessibility={[
        "Uses semantic HTML elements based on 'as' prop",
        'Maintains consistent horizontal padding on all devices',
        'Centers content with automatic margins',
        'Supports all standard HTML attributes',
        'Responsive padding scales appropriately on mobile',
      ]}
      previous={{ title: 'Combobox', href: '/docs/components/combobox' }}
      next={{ title: 'Context Menu', href: '/docs/components/context-menu' }}
    />
  );
}
