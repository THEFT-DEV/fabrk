'use client';

import { motion } from 'framer-motion';
import { Download, Code, Rocket } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const STEPS = [
  {
    number: 1,
    icon: Download,
    title: 'GET FABRK',
    description: 'Purchase once, own forever. Instant access to GitHub repo with all components.',
    command: 'git clone https://github.com/your-repo/fabrk.git',
  },
  {
    number: 2,
    icon: Code,
    title: 'CUSTOMIZE',
    description: 'Update branding, configure auth providers, connect your database.',
    command: 'npm install && npm run dev',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'SHIP',
    description: 'Deploy to Vercel, Railway, or any platform. Your SaaS goes live within hours.',
    command: 'vercel deploy --prod',
  },
] as const;

/**
 * How It Works Section
 * Simple 3-step process showing how to get started with Fabrk
 * Shows commands and terminal-style workflow
 */
export function HowItWorksSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="PROCESS"
          code="0x50"
          title="HOW IT WORKS"
          description="Three simple steps from purchase to production. No complicated setup—just clone and deploy."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative"
              >
                <Card>
                  <CardHeader
                    code={`0x5${step.number}`}
                    title={`STEP ${step.number}`}
                    icon={
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className={cn('size-5', mode.color.text.accent)} />
                      </motion.div>
                    }
                  />
                  <CardContent>
                    {/* Step Title */}
                    <h3
                      className={cn('mb-2 text-sm font-bold', mode.font, mode.color.text.primary)}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className={cn('mb-4 text-sm', mode.font, mode.color.text.muted)}>
                      {step.description}
                    </p>

                    {/* Terminal Command */}
                    <div
                      className={cn('border-border bg-muted/50 border p-4', mode.radius, mode.font)}
                    >
                      <code className={cn('block overflow-x-auto text-xs', mode.color.text.accent)}>
                        $ {step.command}
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {/* Connector Arrow (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-1/2 right-0 hidden translate-x-1/2 -translate-y-1/2 md:block',
                      mode.color.text.muted
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
