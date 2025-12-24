/**
 * Feature Section Layout Component
 * Two-column layout with text content and visual preview
 */
'use client';

import { motion } from 'framer-motion';
import { FeatureItem, type FeatureItemProps } from './feature-item';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Badge } from '@/components/ui/card';

interface FeatureSectionLayoutProps {
  spec: string;
  title: string;
  description: string;
  features: Array<Omit<FeatureItemProps, never>>;
  reversed?: boolean;
  children?: React.ReactNode;
}

export function FeatureSectionLayout({
  spec,
  title,
  description,
  features,
  reversed,
  children,
}: FeatureSectionLayoutProps) {
  return (
    <div className={cn('border-t pt-16 lg:pt-20', mode.color.border.default)}>
      <div
        className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          {/* Spec Label */}
          <Badge label="SPEC" meta={spec} className="mb-4 self-start" />

          {/* Title */}
          <h3 className={cn(mode.font, 'mb-4 text-2xl font-semibold')}>{title}</h3>

          {/* Description */}
          <div className={cn('mb-6 border-l-2 pl-4', mode.color.border.default)}>
            <span className={cn(mode.font, mode.color.text.muted, 'text-xs')}>│ [DESC]: </span>
            <span className={cn(mode.font, mode.color.text.muted, 'text-xs')}>{description}</span>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <FeatureItem key={i} {...feature} />
            ))}
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
