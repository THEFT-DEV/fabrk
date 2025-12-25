/**
 * About CTA Section
 * Final call-to-action with pricing and features links
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '@/config/app';
import { Badge, Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';

export function AboutCTA() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge code="0xFF" label="EXECUTE" className="mb-4" />
          <h2 className={cn('text-xs font-semibold tracking-tight', mode.font)}>
            READY TO BUILD YOUR SAAS
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <Card size="auto">
            <CardContent padding="md">
              <p className={cn('text-muted-foreground text-xs', mode.font)}>
                Start shipping faster with {COMPONENT_COUNT_STRING} production-ready components.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="text-xs" asChild>
            <Link href="/#pricing">
              &gt; GET FABRK - {config.pricing.fabrk.display.current}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-xs" asChild>
            <Link href="/features">&gt; VIEW ALL FEATURES</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={cn('text-muted-foreground flex justify-center gap-4 text-xs', mode.font)}
        >
          <span className="text-success">■ INSTANT ACCESS</span>
          <span className="text-success">■ LIFETIME UPDATES</span>
          <span className="text-success">■ 30 DAY GUARANTEE</span>
        </motion.div>
      </div>
    </section>
  );
}
