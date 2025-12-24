'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { COMPARISON_FEATURES } from '@/data/landing';

/**
 * Comparison Section
 * Feature comparison table: Fabrk vs ShipFast vs MagicUI vs SaasBoldKit
 * Shows competitive advantages with checkmarks and values
 */
export function ComparisonSection() {
  const products = ['Fabrk', 'ShipFast', 'MagicUI', 'SaasBoldKit'] as const;

  return (
    <section className="border-border border-t py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="COMPARISON"
          code="0x60"
          title="HOW WE STACK UP"
          description="See why developers choose Fabrk over alternatives. Real feature comparison, no marketing fluff."
          align="center"
        />

        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn('border-border min-w-[700px] border', mode.radius)}
          >
            {/* Table Header */}
            <div className="border-border bg-muted/50 grid grid-cols-5 border-b">
              <div className={cn('border-border border-r p-4', mode.font)}>
                <span className={cn('text-xs', mode.color.text.muted)}>[FEATURE]</span>
              </div>
              {products.map((product) => (
                <div
                  key={product}
                  className={cn(
                    'border-border border-r p-4 text-center last:border-r-0',
                    mode.font,
                    product === 'Fabrk' && 'bg-primary/10'
                  )}
                >
                  <span
                    className={cn(
                      'text-xs font-medium',
                      product === 'Fabrk' ? mode.color.text.accent : mode.color.text.primary
                    )}
                  >
                    {product.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            {/* Table Body */}
            {COMPARISON_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-border hover:bg-muted/30 grid grid-cols-5 border-b last:border-b-0"
              >
                {/* Feature Name */}
                <div className={cn('border-border border-r p-4', mode.font)}>
                  <span className={cn('text-sm', mode.color.text.primary)}>{feature.name}</span>
                </div>

                {/* Fabrk */}
                <div
                  className={cn(
                    'border-border bg-primary/5 flex items-center justify-center border-r p-4',
                    mode.font
                  )}
                >
                  {renderValue(feature.fabrk, true)}
                </div>

                {/* ShipFast */}
                <div
                  className={cn(
                    'border-border flex items-center justify-center border-r p-4',
                    mode.font
                  )}
                >
                  {renderValue(feature.shipfast, false)}
                </div>

                {/* MagicUI */}
                <div
                  className={cn(
                    'border-border flex items-center justify-center border-r p-4',
                    mode.font
                  )}
                >
                  {renderValue(feature.magicui, false)}
                </div>

                {/* SaasBoldKit */}
                <div className={cn('flex items-center justify-center p-4', mode.font)}>
                  {renderValue(feature.saasboldkit, false)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn('mt-6 text-center text-xs', mode.font, mode.color.text.muted)}
        >
          * Competitor data based on public documentation. Last updated:{' '}
          {new Date().toLocaleDateString()}
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Renders a comparison value (boolean, string, or number)
 * @param value - The value to render
 * @param highlight - Whether to highlight the value (for Fabrk column)
 */
function renderValue(value: boolean | string, highlight: boolean) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check
        className={cn('size-5', highlight ? mode.color.text.success : mode.color.text.muted)}
      />
    ) : (
      <X className={cn('size-5', mode.color.text.danger)} />
    );
  }

  return (
    <span className={cn('text-sm', highlight ? mode.color.text.accent : mode.color.text.primary)}>
      {value}
    </span>
  );
}
