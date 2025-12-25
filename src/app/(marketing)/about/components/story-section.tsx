/**
 * Story Section
 * Origin story with problem/solution narrative
 */

'use client';

import { motion } from 'framer-motion';
import { Badge, Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const problems = [
  "Over-engineered with 1000+ files you'll never use",
  'Proprietary frameworks that lock you in',
  'Poor documentation and unclear architecture',
  "Bloated with features you don't need",
];

export function StorySection() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge code="0x04" label="ORIGIN STORY" className="mb-4" />
              <h2 className={cn('mb-4 text-xs font-semibold tracking-tight', mode.font)}>
                THE STORY BEHIND FABRK
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className={cn('text-muted-foreground text-xs', mode.font)}>
                From frustration to solution
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card size="auto">
              <CardContent padding="lg">
                <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  │ &gt; Initializing story sequence...
                </div>
                <div className="space-y-4">
                  <p className={cn('text-muted-foreground text-xs', mode.font)}>
                    Like many developers, we were tired of rebuilding the same infrastructure for
                    every new SaaS project. Authentication, payments, database setup, email
                    integration—it's the same story every time.
                  </p>

                  <p className={cn('text-muted-foreground text-xs', mode.font)}>
                    We looked at existing solutions, but they all had the same problems:
                  </p>

                  <div className="border-border space-y-2 border-l pl-4">
                    {problems.map((problem, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn('flex items-start gap-4 text-xs', mode.font)}
                      >
                        <span className="text-destructive font-semibold">✗</span>
                        <span className="text-muted-foreground">{problem}</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className={cn('text-muted-foreground text-xs', mode.font)}>
                    So we built Fabrk differently. We started with a 1000+ file codebase, then
                    ruthlessly cut it down to just the essentials. We removed every line of code
                    that didn't serve a clear purpose. We focused on clarity over cleverness.
                  </p>

                  <p className={cn('text-muted-foreground text-xs', mode.font)}>
                    The result? A boilerplate with ~160 files that includes everything you need and
                    nothing you don't. Clean TypeScript, modern Next.js, industry-standard tools,
                    and comprehensive documentation.
                  </p>
                </div>
                <div className={cn('text-success mt-4 text-xs', mode.font)}>
                  └─ Story sequence complete [OK]
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
