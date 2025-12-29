/**
 * Page Header Component
 * Header section for the contact page
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Badge } from '@/components/ui/card';

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 pt-12 text-center"
    >
      <Badge code="0x00" label="CONTACT" meta="COMMUNICATION INTERFACE" className="mb-6" />
      <h1 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>CONTACT US</h1>
      <p className={cn('text-muted-foreground text-xs', mode.font)}>
        Send us a message and we'll respond within 24 hours
      </p>
    </motion.div>
  );
}
