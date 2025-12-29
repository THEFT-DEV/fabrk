/**
 * ✅ FABRK COMPONENT
 * Quality Section - Production quality highlights
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { TestTube, Terminal, BookOpen } from 'lucide-react';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function QualitySection() {
  return (
    <section className="border-border bg-background border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4">
            <Badge code="0x20" label="PRODUCTION QUALITY" />
          </div>
          <h2 className={cn('mb-4 text-2xl font-semibold tracking-tight', mode.font)}>
            PRODUCTION QUALITY
          </h2>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            Not just boilerplate. Enterprise-grade code with comprehensive testing.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: TestTube,
              id: '0x21',
              title: '40+ TESTS',
              desc: 'Vitest unit tests and Playwright E2E tests. Every critical flow tested.',
            },
            {
              icon: Terminal,
              id: '0x22',
              title: 'TYPESCRIPT STRICT',
              desc: '100% TypeScript with strict mode. No any types. Full type safety.',
            },
            {
              icon: BookOpen,
              id: '0x23',
              title: '400KB DOCS',
              desc: '24 comprehensive guides covering every feature. No guesswork.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card interactive className="flex h-full flex-col">
                  <CardHeader
                    code={item.id}
                    title="QUALITY"
                    icon={
                      <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    }
                  />
                  <CardContent padding="md" className="flex-1">
                    <div className={cn('text-foreground mb-4 text-xs font-semibold', mode.font)}>
                      {item.title}
                    </div>
                    <div className={cn('text-xs', mode.font)}>
                      <span className="text-muted-foreground">DESC: </span>
                      <span className="text-foreground">{item.desc}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
