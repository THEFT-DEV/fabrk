'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { MetricCard } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
  /** Optional hex code for header (auto-generates if not provided) */
  code?: string;
}

/**
 * StatCard Component - Animated wrapper around MetricCard
 * Adds scroll-triggered animations to the base MetricCard component
 * Used in Stats section to show trust indicators
 */
export function StatCard({ icon: Icon, value, label, index, code }: StatCardProps) {
  // Convert label to SNAKE_CASE for terminal header
  const headerTitle = label.toUpperCase().replace(/\s+/g, '_');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <MetricCard
        code={code}
        title={headerTitle}
        value={value}
        label={label}
        icon={<Icon className="size-5" />}
      />
    </motion.div>
  );
}
