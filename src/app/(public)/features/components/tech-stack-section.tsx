/**
 * ✅ FABRK COMPONENT
 * Tech Stack Section - Technology stack display
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from './feature-data';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function TechStackSection() {
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
            <Badge code="0x10" label="TECH STACK" />
          </div>
          <h2 className={cn('mb-4 text-2xl font-semibold tracking-tight', mode.font)}>
            TECH STACK
          </h2>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            Built with the latest technologies. No legacy code, no outdated dependencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TECH_STACK.map((tech, index) => {
            const hexId = (index + 10).toString(16).toUpperCase();
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Card interactive className="flex h-full flex-col">
                  <CardHeader
                    code={`0x${hexId}`}
                    title="STACK"
                    icon={
                      <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    }
                  />
                  <CardContent padding="md" className="flex-1">
                    <div className={cn('text-foreground mb-4 text-xs font-semibold', mode.font)}>
                      {tech.name.toUpperCase().replace(/\./g, '')}
                    </div>
                    <div className={cn('text-xs', mode.font)}>
                      <span className="text-muted-foreground">DESC: </span>
                      <span className="text-foreground">{tech.description}</span>
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
