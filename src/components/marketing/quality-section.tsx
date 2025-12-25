'use client';

import { SimpleIcon } from '@/components/ui/simple-icon';
import { Card, CardContent, Badge } from '@/components/ui/card';
import { siTypescript, siVitest, siGithubactions, siMdx } from 'simple-icons';
import { CheckCircle2, TestTube2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function QualitySection() {
  const qualityMetrics = [
    {
      metric: '85%',
      label: 'Test Coverage',
      description: 'Core components and flows are covered by Vitest and integration tests',
      icon: siVitest.path,
    },
    {
      metric: '77+',
      label: 'Documented Components',
      description: 'Every component has examples and documentation',
      icon: siMdx.path,
    },
    {
      metric: '100%',
      label: 'TypeScript Strict',
      description: 'Full TypeScript strict mode enforcement across the codebase',
      icon: siTypescript.path,
    },
    {
      metric: '6',
      label: 'CI/CD Pipelines',
      description: 'Automated lint, test, build, E2E, performance, and PR checks',
      icon: siGithubactions.path,
    },
    {
      metric: '114+',
      label: 'Comprehensive Tests',
      description: 'Unit tests + E2E Playwright tests for critical user flows',
      iconComponent: 'testTube',
    },
  ];

  return (
    <section className="border-border bg-background border-t px-6 py-24 font-mono lg:py-42">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge code="0x70" label="QUALITY ASSURANCE" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2
              className={cn(
                'mb-4 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl',
                mode.font
              )}
            >
              BUILT TO LAST, TESTED TO SHIP
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-relaxed">
              &gt; Every component is battle-tested with comprehensive coverage. No cutting corners,
              no technical debt. Production-ready from day one.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {qualityMetrics.map((item, index) => {
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={cn('transition-all', mode.state.hover.card)}>
                  <CardContent className="p-8">
                    <div className="bg-accent-surface mb-4 inline-flex items-center justify-center p-4">
                      {item.iconComponent === 'testTube' ? (
                        <TestTube2 className="text-primary h-12 w-12" />
                      ) : (
                        <SimpleIcon path={item.icon!} className="text-primary h-12 w-12" />
                      )}
                    </div>
                    <div className="mb-4">
                      <div className="text-foreground text-5xl font-bold">{item.metric}</div>
                      <h3 className={cn('mt-1 text-sm font-semibold', mode.font)}>
                        {item.label.toUpperCase()}
                      </h3>
                    </div>
                    <span className="text-muted-foreground block text-sm leading-relaxed">
                      {item.description}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card size="auto" className="mt-12">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <CheckCircle2 className="text-primary h-16 w-16" />
                </div>
                <div>
                  <h3
                    className={cn('mb-2 text-xl leading-snug font-semibold lg:text-2xl', mode.font)}
                  >
                    QUALITY GUARANTEE
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Unlike other boilerplates that ship untested code, every Fabrk component is
                    rigorously tested, fully documented, and validated by CI/CD pipelines.
                    You're not inheriting technical debt—you're getting production-grade
                    infrastructure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
