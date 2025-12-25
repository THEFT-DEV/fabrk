/**
 * Organization Preview Component
 * Terminal-style organization manager with add animation
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PreviewHeader } from './preview-header';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function OrganizationPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    // After 2 seconds, animate the button click
    const clickTimer = setTimeout(() => {
      // After button animation, show startup
      setTimeout(() => {
        setShowStartup(true);
      }, 300);
    }, 2000);

    return () => clearTimeout(clickTimer);
  }, [isInView]);

  return (
    <Card ref={ref} className="w-full max-w-md">
      <PreviewHeader title="org manager.exe" />

      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[ORGANIZATIONS]:</span>
          <button
            className={cn(
              mode.radius,
              mode.font,
              'border-primary text-primary hover:bg-primary hover:text-primary-foreground border px-2 py-1 text-xs transition-colors'
            )}
          >
            + ADD ORG
          </button>
        </div>

        {/* Fixed height container to prevent layout shift */}
        <div className="min-h-[116px] space-y-2">
          {/* ACME_INC - always visible */}
          <div
            className={cn(
              mode.radius,
              'border-border bg-background flex items-center justify-between border p-4'
            )}
          >
            <div className="flex items-center gap-4">
              <Building2 className="text-muted-foreground size-4" />
              <div>
                <span className={cn(mode.font, 'block text-xs')}>ACME INC</span>
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>12 members</span>
              </div>
            </div>
            <span className={cn(mode.font, 'text-success text-xs')}>OWNER</span>
          </div>

          {/* STARTUP_CO - appears after button click */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={showStartup ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={cn(
              mode.radius,
              'border-border bg-background flex items-center justify-between border p-4'
            )}
          >
            <div className="flex items-center gap-4">
              <Building2 className="text-muted-foreground size-4" />
              <div>
                <span className={cn(mode.font, 'block text-xs')}>STARTUP CO</span>
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>5 members</span>
              </div>
            </div>
            <span className={cn(mode.font, 'text-success text-xs')}>ADMIN</span>
          </motion.div>
        </div>

        <div className="border-border mt-4 border-t pt-4">
          <span className={cn(mode.font, 'text-muted-foreground mb-2 block text-xs')}>
            [ROLES]:
          </span>
          <div className="flex flex-wrap gap-2">
            {['OWNER', 'ADMIN', 'MEMBER', 'GUEST'].map((role) => (
              <span
                key={role}
                className={cn(
                  mode.radius,
                  mode.font,
                  'border-border bg-card border px-2 py-1 text-xs'
                )}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
