'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Simplified Hero Demo for docs
function HeroDemo() {
  return (
    <section className={cn("border-border bg-background w-full border p-6", mode.radius)}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div>
          <span className={cn("border-border bg-card mb-4 inline-block border px-4 py-1", mode.radius)}>
            [ [0x00] SYSTEM INIT ] SAAS BOILERPLATE v2.0
          </span>
          <h1 className="mb-2">FABRK INIT:</h1>
          <h2 className="mb-4 font-mono text-xl font-semibold">
            BUILDING_YOUR_SAAS
            <br />
            <span className="text-primary">JUST GOT UNFAIRLY EASY.</span>
          </h2>
          <div className={cn("border-border bg-card mb-6 border p-4", mode.radius)}>
            <div className="mb-2">[ [0x01] STATUS ]</div>
            <p className="mb-4">Skip auth, billing, emails. Focus on your product.</p>
            <div className="flex gap-4">
              <span>
                <span className="text-muted-foreground">Speed:</span>{' '}
                <span className="text-primary">OPTIMIZED</span>
              </span>
              <span>
                <span className="text-muted-foreground">Integration:</span>{' '}
                <span className="text-primary">SEAMLESS</span>
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="font-mono text-xs">&gt; GET FABRK</Button>
            <Button variant="outline" className="font-mono text-xs">
              &gt; VIEW DEMO
            </Button>
          </div>
        </div>

        {/* Right Column - Terminal */}
        <div className={cn("border-border bg-card border", mode.radius)}>
          <div className="border-border flex items-center border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ TERMINAL ] ~/projects</span>
          </div>
          <div className="p-4">
            <div>
              <span className="text-success">~</span> git clone https://github.com/you/fabrk
            </div>
            <div className="mt-1">
              Cloning... <span className="text-success">done</span>
            </div>
            <div className="mt-2">
              <span className="text-success">~</span> npm install && npm run dev
            </div>
            <div className={cn("border-success/30 bg-success/10 mt-2 border p-2", mode.radius)}>
              <div className="text-success">▲ Ready</div>
              <div>
                Local: <span className="text-primary">http://localhost:3000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Split Hero variant
function HeroSplitDemo() {
  return (
    <section className={cn("border-border bg-background w-full border", mode.radius)}>
      <div className="grid lg:grid-cols-2">
        <div className="p-6">
          <span className={cn("border-border mb-4 inline-block border px-2 py-1", mode.radius)}>[0x00] LAUNCH</span>
          <h1 className="mb-4 font-mono text-xl font-semibold">
            Ship faster with <span className="text-primary">Fabrk</span>
          </h1>
          <p className="mb-6">
            Production-ready Next.js boilerplate with auth, payments, and more.
          </p>
          <Button className="font-mono text-xs">&gt; GET STARTED</Button>
        </div>
        <div className="border-border bg-muted/30 border-t p-6 lg:border-t-0 lg:border-l">
          <div>
            <div className="mb-2"># Quick start</div>
            <div className="text-foreground">npx create-fabrk-app my-app</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.02]"
      title="Hero Section"
      description="Landing page hero with terminal-style branding, animated code preview, and call-to-action buttons."
      mainPreview={{
        preview: <HeroDemo />,
        code: `import { HeroSection } from "@/components/marketing/hero-section";

export default function LandingPage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}`,
      }}
      variants={[
        {
          title: 'Split Layout',
          description: 'Two-column hero with code snippet',
          preview: <HeroSplitDemo />,
          code: `import { HeroSplit } from "@/components/marketing/hero-split";

<HeroSplit
  title="Ship faster with Fabrk"
  description="Production-ready Next.js boilerplate"
  cta={{ label: "> GET STARTED", href: "#pricing" }}
/>`,
        },
        {
          title: 'Terminal Window',
          description: 'Animated terminal showing installation',
          preview: (
            <div className={cn("border-border bg-card w-full max-w-md border", mode.radius)}>
              <div className="border-border flex items-center border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">[ TERMINAL ] bash</span>
              </div>
              <div className="p-4">
                <div>
                  <span className="text-success">$</span> npm create fabrk-app
                </div>
                <div className="mt-1">Creating project...</div>
                <div className="text-success mt-1">✓ Done!</div>
              </div>
            </div>
          ),
          code: `// Terminal window with bracketed header
<div className="border border-border bg-card">
  <div className="flex items-center border-b px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">[ TERMINAL ] bash</span>
  </div>
  <div className="p-4 font-mono text-xs">
    {/* Terminal content */}
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: 'title',
          type: 'string',
          description: 'Main headline text',
        },
        {
          name: 'subtitle',
          type: 'string',
          description: 'Secondary text below headline',
        },
        {
          name: 'primaryCta',
          type: '{ label: string; href: string }',
          description: 'Primary call-to-action button',
        },
        {
          name: 'secondaryCta',
          type: '{ label: string; href: string }',
          description: 'Secondary/outline button',
        },
      ]}
      accessibility={[
        'Proper heading hierarchy (h1, h2)',
        'CTA buttons are focusable and have clear labels',
        'Animations respect reduced-motion preferences',
        'Terminal preview is decorative (aria-hidden)',
      ]}
      previous={{ title: 'Navigation', href: '/docs/components/navigation' }}
      next={{ title: 'Features', href: '/docs/components/features' }}
    />
  );
}
