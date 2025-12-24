/**
 * ✅ FABRK COMPONENT
 * Stats Section - Component library statistics
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { COMPONENT_STATS } from './feature-data';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function StatsSection() {
  return (
    <section className="border-border bg-background border-b py-12">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {COMPONENT_STATS.map((stat, index) => {
            const Icon = stat.icon;
            const hexId = (index + 2).toString(16).toUpperCase().padStart(2, '0');
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Card interactive className="flex h-full flex-col">
                  <CardHeader
                    code={`0x${hexId}`}
                    title="STAT"
                    icon={
                      <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    }
                  />
                  <CardContent padding="md" className="flex-1">
                    <div className={cn('text-foreground mb-2 text-2xl font-semibold', mode.font)}>
                      {stat.value}
                    </div>
                    <div className={cn('text-xs', mode.font)}>
                      <span className="text-muted-foreground">DESC: </span>
                      <span className="text-foreground">{stat.description}</span>
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
