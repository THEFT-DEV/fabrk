'use client';

import { SimpleIcon } from '@/components/ui/simple-icon';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siAuth0,
  siResend,
  siStripe,
} from 'simple-icons';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function TechStack() {
  const technologies = [
    { name: 'Next.js', path: siNextdotjs.path, id: '0x20' },
    { name: 'React', path: siReact.path, id: '0x21' },
    { name: 'Tailwind CSS', path: siTailwindcss.path, id: '0x22' },
    { name: 'Prisma', path: siPrisma.path, id: '0x23' },
    { name: 'NextAuth', path: siAuth0.path, id: '0x24' },
    { name: 'Stripe', path: siStripe.path, id: '0x25' },
    { name: 'Resend', path: siResend.path, id: '0x26' },
  ];

  return (
    <section className="border-border bg-background border-t px-6 py-20 font-mono lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge code="0x20" label="TECH STACK" className="mb-4" />
            <h2
              className={cn(
                'text-4xl leading-tight font-semibold tracking-tight lg:text-5xl',
                mode.font
              )}
            >
              A MODERN STACK YOU CAN TRUST
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card className={cn('transition-colors', mode.state.hover.card)}>
                <CardHeader code={tech.id} title="" />
                <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                  <SimpleIcon
                    path={tech.path}
                    className="text-foreground group-hover:text-primary size-6 transition-colors"
                  />
                  <span className="text-foreground text-xs font-medium">
                    {tech.name.toUpperCase().replace(/\./g, '')}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
