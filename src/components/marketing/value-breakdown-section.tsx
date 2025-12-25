'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { VALUE_ITEMS, VALUE_TOTALS } from '@/data/landing/value-breakdown';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * Value Breakdown Section
 * Receipt-style breakdown showing $51K+ value for $399
 * Anchors perceived value to make price feel absurdly cheap
 */
export function ValueBreakdownSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="VALUE BREAKDOWN"
          code="0x35"
          title="WHAT YOU'RE ACTUALLY GETTING"
          description="Building all of this from scratch would cost $51,000+"
          align="center"
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-2">
            <div className={cn('bg-muted/50 border-b px-6 py-4', mode.color.border.default)}>
              <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                [ RECEIPT_0x00 ]
              </span>
            </div>
            <CardContent className="p-0">
              <div className={cn('divide-y', mode.color.border.default)}>
                {VALUE_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                      {item.item}
                    </span>
                    <span className={cn('text-sm font-semibold', mode.font)}>{item.value}</span>
                  </motion.div>
                ))}

                {/* Subtotal */}
                <div className={cn('bg-muted/30 flex items-center justify-between px-6 py-4')}>
                  <span className={cn('text-sm font-semibold', mode.font)}>TOTAL_VALUE</span>
                  <span className={cn('text-2xl font-bold', mode.font)}>{VALUE_TOTALS.total}</span>
                </div>

                {/* Your Price */}
                <div className="bg-accent/10 flex items-center justify-between px-6 py-4">
                  <span className={cn('text-accent text-sm font-semibold', mode.font)}>
                    YOUR_PRICE
                  </span>
                  <span className={cn('text-accent text-2xl font-bold', mode.font)}>
                    {VALUE_TOTALS.price}
                  </span>
                </div>

                {/* Savings */}
                <div className="bg-accent/5 flex items-center justify-between px-6 py-6">
                  <span className={cn('text-success text-2xl font-bold', mode.font)}>
                    TOTAL_SAVINGS
                  </span>
                  <div className="text-right">
                    <div className={cn('text-success text-3xl font-bold', mode.font)}>
                      {VALUE_TOTALS.savings}
                    </div>
                    <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
                      ({VALUE_TOTALS.discount} OFF)
                    </div>
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
