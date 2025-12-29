/**
 * Hero Variation 22: CODE EDITOR
 * Hook: VSCode-style preview showing actual code
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

const CODE_SNIPPET = `// app/page.tsx
import { Auth, Billing, Dashboard } from "@fabrk"

export default function App() {
  return (
    <Auth>
      <Dashboard>
        <Billing />
      </Dashboard>
    </Auth>
  )
}`;

export function HeroCodeEditor() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Editor */}
          <div className={cn('border overflow-hidden', mode.radius)}>
            {/* Editor Tab Bar */}
            <div className={cn('flex items-center gap-0 border-b bg-muted/30', mode.font)}>
              <div className={cn('px-4 py-2 border-r border-b-2 border-b-primary bg-background text-xs')}>
                page.tsx
              </div>
              <div className={cn('px-4 py-2 text-xs', mode.color.text.muted)}>
                layout.tsx
              </div>
            </div>

            {/* Code */}
            <div className="p-4 bg-background">
              <pre className={cn('text-xs leading-relaxed', mode.font)}>
                <code>
                  {CODE_SNIPPET.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className={cn('w-6 text-right mr-4 select-none', mode.color.text.muted)}>
                        {i + 1}
                      </span>
                      <span>
                        {line.includes('import') && (
                          <span className={mode.color.text.accent}>{line}</span>
                        )}
                        {line.includes('export') && (
                          <span className={mode.color.text.accent}>{line}</span>
                        )}
                        {line.includes('return') && (
                          <span className={mode.color.text.accent}>{line}</span>
                        )}
                        {line.includes('<') && !line.includes('import') && (
                          <span className="text-primary">{line}</span>
                        )}
                        {line.includes('//') && (
                          <span className={mode.color.text.muted}>{line}</span>
                        )}
                        {!line.includes('import') && !line.includes('export') && !line.includes('return') && !line.includes('<') && !line.includes('//') && line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              THIS IS YOUR
              <br />
              <span className="text-primary">ENTIRE APP</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Auth, billing, and dashboard in 9 lines.
              We handle the complexity. You write features.
            </p>

            <div className="flex flex-col gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium w-fit',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; START CODING
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-fit text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/getting-started">&gt; READ DOCS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
