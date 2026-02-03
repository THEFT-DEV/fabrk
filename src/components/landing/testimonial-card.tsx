'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  index: number;
}

/**
 * TestimonialCard Component
 * Displays customer testimonial with quote, author, role, and rating
 * Used in Social Proof section
 */
export function TestimonialCard({ quote, author, role, rating, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader code={`0x${(30 + index).toString(16).toUpperCase()}`} title="TESTIMONIAL" />
        <CardContent>
          {/* Rating */}
          <div className="mb-4 flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className={cn('size-4 fill-current', mode.color.text.accent)}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className={cn('mb-4 text-sm', mode.font, mode.color.text.primary)}>
            "{quote}"
          </blockquote>

          {/* Author */}
          <div className="border-border border-t pt-4">
            <div className={cn('text-sm font-medium', mode.font, mode.color.text.primary)}>
              {author}
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>{role}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
