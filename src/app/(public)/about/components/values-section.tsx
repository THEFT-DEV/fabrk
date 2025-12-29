/**
 * Values Section
 * Core company values with icon cards
 */

'use client';

import { motion } from 'framer-motion';
import { Rocket, Code, Zap, Users, Heart, CheckCircle2, type LucideIcon } from 'lucide-react';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface Value {
  id: string;
  icon: LucideIcon;
  module: string;
  status: string;
  description: string;
}

const values: Value[] = [
  {
    id: '0x01',
    icon: Rocket,
    module: 'SHIP FAST',
    status: 'RAPID',
    description:
      'Time is your most valuable resource. Our boilerplate is designed to get you from idea to launch in record time.',
  },
  {
    id: '0x02',
    icon: Code,
    module: 'CLEAN CODE',
    status: 'PRISTINE',
    description:
      'We write code the way you would write it yourself. No over-engineering, no unnecessary abstractions.',
  },
  {
    id: '0x03',
    icon: Zap,
    module: 'PERFORMANCE',
    status: 'OPTIMIZED',
    description:
      'Every line of code is optimized for speed. Latest Next.js features, server components, and best practices.',
  },
  {
    id: '0x04',
    icon: Users,
    module: 'DEV EXPERIENCE',
    status: 'REFINED',
    description:
      "We're developers too. We've built Fabrk to eliminate pain points with great docs and thoughtful defaults.",
  },
  {
    id: '0x05',
    icon: Heart,
    module: 'NO LOCK IN',
    status: 'OPEN',
    description: 'You own the code. No proprietary frameworks, no vendor lock-in. Deploy anywhere.',
  },
  {
    id: '0x06',
    icon: CheckCircle2,
    module: 'PRODUCTION',
    status: 'READY',
    description:
      'From security to error handling to performance optimization, every aspect is built for production.',
  },
];

export function ValuesSection() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge code="0x03" label="CORE VALUES" className="mb-4" />
            <h2 className={cn('mb-4 text-xs font-semibold tracking-tight', mode.font)}>
              CORE VALUES
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              The principles that guide everything we build
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card interactive className="flex h-full flex-col">
                <CardHeader
                  code={value.id}
                  title={value.module}
                  icon={
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <value.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    </motion.div>
                  }
                />
                <CardContent padding="md" className="flex-1">
                  {/* Status */}
                  <div className={cn('mb-4 text-xs', mode.font)}>
                    <span className="text-muted-foreground">[STATUS]: </span>
                    <motion.span
                      className="text-success"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.08 + 0.3 }}
                    >
                      {value.status}
                    </motion.span>
                  </div>

                  {/* Description */}
                  <div className={cn('text-xs', mode.font)}>
                    <span className="text-muted-foreground">[DESC]: </span>
                    <span className="text-foreground">{value.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
