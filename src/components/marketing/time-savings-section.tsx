'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { TIME_BREAKDOWN, TOTAL_HOURS, TOTAL_WEEKS } from '@/data/landing/time-savings';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * Time Savings Section
 * Breaks down where 215+ hours of dev time are saved
 * Receipt-style breakdown with activities per task
 */
export function TimeSavingsSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="TIME SAVINGS BREAKDOWN"
          code="0x25"
          title="WHERE THE 215 HOURS COME FROM"
          description="Every feature below represents days of development work we've already done for you"
          align="center"
        />

        <div className="mt-12 space-y-4">
          {TIME_BREAKDOWN.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-4">
                        <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                          [0x{index.toString().padStart(2, '0')}]
                        </span>
                        <h3 className={cn('text-sm font-semibold', mode.font)}>{item.task}</h3>
                      </div>
                      <ul className="space-y-1">
                        {item.activities.map((activity, i) => (
                          <li
                            key={i}
                            className={cn(
                              'flex items-center gap-2 text-xs',
                              mode.font,
                              mode.color.text.muted
                            )}
                          >
                            <span className={mode.color.text.accent}>├─</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>
                        {item.hours}
                      </div>
                      <div className={cn('text-xs', mode.font, mode.color.text.muted)}>HOURS</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Total */}
          <Card className={cn('border-2', mode.color.border.default)}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className={cn('text-sm font-semibold', mode.font)}>TOTAL TIME SAVED</span>
                <div className="text-right">
                  <div className={cn('text-4xl font-bold', mode.font, mode.color.text.accent)}>
                    {TOTAL_HOURS}
                  </div>
                  <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    HOURS (~{TOTAL_WEEKS} WEEKS)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
