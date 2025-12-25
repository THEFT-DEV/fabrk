/**
 * ✅ FABRK COMPONENT
 * Footer - Terminal console [SYSTEM INFO] style
 * Production-ready ✓
 */
import Link from 'next/link';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from 'simple-icons';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

export function Footer() {
  return (
    <footer id="footer" className="border-border bg-background border-t">
      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6">
        <div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Left: Logo + Status + Powered By */}
            <div>
              <Badge code="0x71" label="SYSTEM INFO" className="mb-4" />
              <Link
                href="/"
                className={cn(
                  'mb-4 flex items-center gap-2 transition-opacity',
                  mode.state.hover.linkOpacity,
                  mode.font
                )}
              >
                <span className="text-primary text-sm">&gt;</span>
                <span className="text-xl font-semibold tracking-tight">FABRK</span>
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>└─ [STATUS]:</span>
                <span className={cn('text-success text-xs', mode.font)}>■ OPERATIONAL</span>
              </div>

              {/* Powered By - Tech Stack Icons */}
              <div className="mt-6">
                <div className={cn('text-muted-foreground mb-3 text-xs', mode.font)}>
                  └─ [POWERED BY]:
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                      title={tech.name}
                    >
                      <SimpleIcon path={tech.path} className="size-3.5" />
                      <span className={cn('text-xs', mode.font)}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Nav Links in Terminal Box */}
            <Card>
              <CardHeader title="nav links.exe │ PID:1024" code="0x72" />
              <CardContent>
                <div className="divide-border grid grid-cols-3 divide-x">
                  {/* Product */}
                  <div className="p-4">
                    <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                      [ PRODUCT ]
                    </div>
                    <nav aria-label="Product links" className="flex flex-col gap-2">
                      <Link
                        href="#features"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; FEATURES
                      </Link>
                      <Link
                        href="#pricing"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; PRICING
                      </Link>
                      <Link
                        href="/docs"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; DOCS
                      </Link>
                      <Link
                        href="/changelog"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; CHANGELOG
                      </Link>
                    </nav>
                  </div>

                  {/* Company */}
                  <div className="p-4">
                    <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                      [ COMPANY ]
                    </div>
                    <nav aria-label="Company links" className="flex flex-col gap-2">
                      <Link
                        href="/about"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; ABOUT
                      </Link>
                      <Link
                        href="/contact"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; CONTACT
                      </Link>
                    </nav>
                  </div>

                  {/* Legal */}
                  <div className="p-4">
                    <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                      [ LEGAL ]
                    </div>
                    <nav aria-label="Legal links" className="flex flex-col gap-2">
                      <Link
                        href="/terms"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; TERMS
                      </Link>
                      <Link
                        href="/privacy"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; PRIVACY
                      </Link>
                      <Link
                        href="/cookies"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; COOKIES
                      </Link>
                      <Link
                        href="/refund"
                        className={cn(
                          'text-muted-foreground hover:text-foreground text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; REFUND
                      </Link>
                    </nav>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="border-border border-t px-4 py-6 sm:px-6">
        <div className={cn('text-muted-foreground text-xs', mode.font)}>
          <span>[ [0x7F] COPYRIGHT ] © {new Date().getFullYear()} Fabrk │ All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
