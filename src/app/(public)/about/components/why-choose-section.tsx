/**
 * Why Choose Section
 * Key reasons to choose Fabrk
 */

'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Layers, Gift, type LucideIcon } from 'lucide-react';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface Reason {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const reasons: Reason[] = [
  {
    id: '0x10',
    title: 'SAVE WEEKS OF DEVELOPMENT',
    icon: Clock,
    description:
      'What normally takes 2-4 weeks to build from scratch is ready in minutes. Focus on your unique features, not boilerplate.',
  },
  {
    id: '0x11',
    title: 'PRODUCTION GRADE SECURITY',
    icon: Shield,
    description:
      'Security headers, rate limiting, token hashing, CSRF protection—all the security best practices implemented and tested.',
  },
  {
    id: '0x12',
    title: 'MODERN TECH STACK',
    icon: Layers,
    description:
      "Built on Next.js 15, TypeScript, Prisma, NextAuth v5, and Stripe. The tools you're already using or want to learn.",
  },
  {
    id: '0x13',
    title: 'LIFETIME UPDATES',
    icon: Gift,
    description:
      'One-time payment, lifetime access to all updates. No subscriptions, no hidden fees.',
  },
];

export function WhyChooseSection() {
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
              <Badge code="0x05" label="WHY FABRK" className="mb-4" />
              <h2 className={cn('mb-4 text-xs font-semibold tracking-tight', mode.font)}>
                WHY CHOOSE FABRK
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className={cn('text-muted-foreground text-xs', mode.font)}>
                We're not just selling code, we're selling time
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <Card interactive size="auto">
                  <CardHeader
                    code={item.id}
                    title={item.title.slice(0, 12)}
                    icon={
                      <item.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    }
                  />
                  <CardContent padding="md">
                    <div className={cn('text-xs', mode.font)}>
                      <span className="text-muted-foreground">[DESC]: </span>
                      <span className="text-foreground">{item.description}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
