'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { TypeWriter } from '@/components/ui/typewriter';

export default function TypewriterPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.78]"
      category="Components"
      title="Typewriter"
      description="Animated typewriter effect that triggers on scroll into view."
      importCode={`import { TypeWriter } from "@/components/ui/typewriter"`}
      mainPreview={{
        preview: (
          <div className="text-foreground space-y-4 font-mono text-sm">
            <TypeWriter text="INITIALIZING SYSTEM..." showCursor />
          </div>
        ),
        code: `<TypeWriter text="INITIALIZING SYSTEM..." showCursor />`,
      }}
      variants={[
        {
          title: 'Basic',
          description: 'Simple typewriter effect.',
          preview: (
            <div className="text-foreground font-mono">
              <TypeWriter text="Hello, terminal world!" />
            </div>
          ),
          code: `<TypeWriter text="Hello, terminal world!" />`,
        },
        {
          title: 'With Cursor',
          description: 'Animated blinking cursor during typing.',
          preview: (
            <div className="text-foreground font-mono">
              <TypeWriter text="Typing with cursor..." showCursor />
            </div>
          ),
          code: `<TypeWriter text="Typing with cursor..." showCursor />`,
        },
        {
          title: 'Persistent Cursor',
          description: 'Cursor remains visible after typing completes.',
          preview: (
            <div className="text-foreground font-mono">
              <TypeWriter text="READY_" showCursor cursorAtEnd />
            </div>
          ),
          code: `<TypeWriter text="READY_" showCursor cursorAtEnd />`,
        },
        {
          title: 'Delayed Start',
          description: 'Starts typing after 1 second delay.',
          preview: (
            <div className="text-foreground font-mono">
              <TypeWriter text="Delayed message..." delay={1} showCursor />
            </div>
          ),
          code: `<TypeWriter text="Delayed message..." delay={1} showCursor />`,
        },
        {
          title: 'Custom Speed',
          description: 'Slower typing (60ms per character).',
          preview: (
            <div className="text-foreground font-mono">
              <TypeWriter text="Slow and steady..." speed={60} showCursor />
            </div>
          ),
          code: `<TypeWriter text="Slow and steady..." speed={60} showCursor />`,
        },
      ]}
      props={[
        {
          name: 'text',
          type: 'string',
          description: 'The text to animate character by character.',
        },
        {
          name: 'delay',
          type: 'number',
          default: '0',
          description: 'Delay in seconds before typing starts.',
        },
        {
          name: 'speed',
          type: 'number',
          default: '30',
          description: 'Milliseconds between each character.',
        },
        {
          name: 'showCursor',
          type: 'boolean',
          default: 'false',
          description: 'Show animated blinking cursor.',
        },
        {
          name: 'cursorAtEnd',
          type: 'boolean',
          default: 'false',
          description: 'Keep cursor visible after typing completes.',
        },
      ]}
      accessibility={[
        'Uses Intersection Observer for scroll-triggered animation',
        'Animation only runs once (once: true) to avoid repeated triggers',
        'Cursor uses aria-hidden implicitly (decorative)',
        'Text content is accessible immediately in DOM',
        'Respects prefers-reduced-motion via Framer Motion defaults',
      ]}
      previous={{ title: 'Table', href: '/docs/components/table' }}
      next={{ title: 'Area Chart', href: '/docs/components/area-chart' }}
    >
      <DocsSection title="Scroll Trigger">
        <DocsCard title="HOW_IT_WORKS">
          <p className="text-muted-foreground mb-4 text-xs">
            The TypeWriter uses Framer Motion&apos;s useInView hook to detect when the element
            enters the viewport. Animation triggers once and does not repeat.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`const isInView = useInView(ref, { once: true });

// Animation starts when element scrolls into view
// Delay is applied AFTER element becomes visible`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Usage Examples">
        <DocsCard title="HERO_HEADLINE">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`<h1 className="text-4xl font-mono">
  <TypeWriter
    text="BUILDING YOUR SAAS JUST GOT UNFAIRLY EASY"
    showCursor
    cursorAtEnd
  />
</h1>`}
          </pre>
        </DocsCard>
        <DocsCard title="STAGGERED_LINES">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`<div className="space-y-2">
  <TypeWriter text="[INIT] System starting..." delay={0} />
  <TypeWriter text="[LOAD] Loading modules..." delay={0.5} />
  <TypeWriter text="[DONE] Ready." delay={1} showCursor cursorAtEnd />
</div>`}
          </pre>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
