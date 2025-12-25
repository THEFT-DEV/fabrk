/**
 * About Hero Section
 * Company origin story and mission statement banner
 */

'use client';

import { motion } from 'framer-motion';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function AboutHero() {
  return (
    <section className="overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge code="0x00" label="ABOUT" meta="FABRK ORIGIN STORY" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[FABRK ABOUT]:</p>
          <h1 className={cn('mb-8 text-xs font-bold tracking-tight', mode.font)}>
            BUILT BY DEVELOPERS
            <br />
            <span className="text-primary">FOR DEVELOPERS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-left"
        >
          <Card size="auto">
            <CardHeader code="0x01" title="MISSION STATEMENT" />
            <CardContent padding="md">
              <p className={cn('text-muted-foreground text-xs', mode.font)}>
                We're on a mission to eliminate the repetitive work that slows down every SaaS
                project, so you can focus on building features that matter.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
