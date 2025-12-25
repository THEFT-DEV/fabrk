/* 💡 COPY TIP: Replace these testimonials with real customer quotes!
 * Authentic testimonials convert 3-5x better than generic ones.
 * Include specific results (e.g., "saved 40 hours") when possible.
 */
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
  // EXAMPLE_PLACEHOLDER: Replace with real customer testimonials before launch
  const testimonials = [
    {
      quote: '[EXAMPLE] Your customer quote here. Describe specific results or benefits.',
      author: 'Customer Name',
      role: 'Role, Company',
      initials: 'CN',
      color: 'bg-primary text-primary-foreground',
    },
    {
      quote: '[EXAMPLE] Another testimonial highlighting a different feature or benefit.',
      author: 'Customer Name',
      role: 'Role, Company',
      initials: 'CN',
      color: 'bg-accent text-accent-foreground',
    },
    {
      quote: "[EXAMPLE] Include specific metrics when possible (e.g., 'saved 40 hours').",
      author: 'Customer Name',
      role: 'Role, Company',
      initials: 'CN',
      color: 'bg-secondary text-secondary-foreground',
    },
  ];

  return (
    <section className={cn(mode.font, 'border-border bg-background border-t px-6 py-20 lg:py-24')}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2
              className={cn(
                'mb-4 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl',
                mode.font
              )}
            >
              LOVED BY DEVELOPERS
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              &gt; Early access customer feedback
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className={cn('group transition-colors', mode.state.hover.card)}
            >
              <Card>
                <CardHeader
                  code={`0x${(index + 1).toString(16).toUpperCase().padStart(2, '0')}`}
                  title="TESTIMONIAL"
                  icon={
                    <Avatar className={cn(mode.radius, 'h-6 w-6')}>
                      <AvatarFallback
                        className={cn(
                          mode.radius,
                          'bg-primary/10 text-primary text-xs font-medium'
                        )}
                      >
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
                <CardContent>
                  <div className="mb-4 text-sm leading-relaxed">
                    <span className="text-muted-foreground">QUOTE: </span>
                    <span className="text-foreground">"{testimonial.quote}"</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">AUTHOR: </span>
                    <span className="text-foreground font-semibold">
                      {testimonial.author.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground"> | {testimonial.role}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
