/**
 * ✅ FABRK COMPONENT
 * Feature Category Card - Individual feature category display
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { FEATURE_CATEGORIES } from './feature-data';
import { Badge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface FeatureCategoryCardProps {
  category: (typeof FEATURE_CATEGORIES)[0];
  index: number;
}

export function FeatureCategoryCard({ category, index }: FeatureCategoryCardProps) {
  const _Icon = category.icon; // Reserved for future icon display
  const isEven = index % 2 === 0;
  const hexIndex = (index + 1).toString(16).toUpperCase().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      id={category.id}
      className="border-border scroll-mt-24 border-t pt-16 lg:pt-20"
    >
      <div
        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
      >
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-4">
            <Badge
              code={`0x${hexIndex}`}
              label={category.stats.label.toUpperCase()}
              meta={category.stats.value}
            />
          </div>

          <div>
            <span className={cn('text-muted-foreground text-xs', mode.font)}>[0x{hexIndex}]</span>
            <h2 className={cn('text-2xl font-semibold tracking-tight', mode.font)}>
              {category.title.toUpperCase()}
            </h2>
            <span className={cn('text-primary text-xs font-medium', mode.font)}>
              &gt; {category.tagline}
            </span>
          </div>

          <p className={cn('text-muted-foreground text-xs', mode.font)}>{category.description}</p>
        </div>

        {/* Features List Side */}
        <div className="w-full flex-1">
          <Card size="auto">
            <CardHeader
              code={`0x${hexIndex}`}
              title="INCLUDED FEATURES"
              meta={`${category.features.length} items`}
            />
            <CardContent padding="lg">
              <ul className="space-y-2">
                {category.features.map((feature, i) => (
                  <li key={i} className={cn('flex items-start gap-4 text-xs', mode.font)}>
                    <span className="text-primary flex-shrink-0">
                      {i === category.features.length - 1 ? '└─' : '├─'}
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
