/**
 * Mission Section
 * Detailed mission statement with terminal-style formatting
 */

'use client';

import { motion } from 'framer-motion';
import { Badge, Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function MissionSection() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Badge code="0x02" label="OUR MISSION" className="mb-4" />
            <h2 className={cn('text-xs font-semibold tracking-tight', mode.font)}>OUR MISSION</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card size="auto">
              <CardContent padding="lg" className="text-left">
                <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  │ &gt; Loading mission parameters...
                </div>
                <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
                  Every developer has experienced the frustration of rebuilding the same
                  authentication system, payment integration, and UI components for the hundredth
                  time. We created Fabrk to solve this problem once and for all.
                </p>
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Our mission is simple:{' '}
                  <span className="text-primary font-semibold">
                    help you ship your SaaS product in days, not months
                  </span>
                  . We handle the boring infrastructure so you can focus on the innovation that
                  makes your product unique.
                </p>
                <div className={cn('text-success mt-4 text-xs', mode.font)}>
                  └─ Mission parameters loaded [OK]
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
