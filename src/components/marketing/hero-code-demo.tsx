'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TypeWriter } from '@/components/ui/typewriter';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * HeroCodeDemo Component
 * Terminal animation showing git clone → npm install → npm run dev flow
 * Used in Hero section to demonstrate setup process
 */
export function HeroCodeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setStep(1), 2000), // Clone done
      setTimeout(() => setStep(2), 3200), // cd done, show npm install
      setTimeout(() => setStep(3), 5500), // npm install done
      setTimeout(() => setStep(4), 6500), // show npm run dev
      setTimeout(() => setStep(5), 8000), // server ready
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="text-code-m p-6">
      {/* git clone */}
      <div className={mode.color.text.muted}>
        <span className={mode.color.text.success}>~</span>{' '}
        <TypeWriter
          text="git clone https://github.com/you/fabrk my-saas"
          delay={0.3}
          speed={30}
          showCursor
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        Cloning into &apos;my-saas&apos;... <span className={mode.color.text.success}>done</span>
      </motion.div>

      {/* cd && npm install */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~</span>{' '}
        <span className={mode.color.text.primary}>cd my-saas && npm install</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 && step < 3 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ⠋ Installing dependencies...
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        added <span className={mode.color.text.primary}>847</span> packages in{' '}
        <span className={mode.color.text.primary}>12s</span>
      </motion.div>

      {/* npm run dev */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~/my-saas</span>{' '}
        <span className={mode.color.text.primary}>npm run dev</span>
      </motion.div>

      {/* Server ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className="border-success/30 bg-success/10 mt-4 border p-4"
      >
        <div className={mode.color.text.success}>▲ Ready</div>
        <div className={cn('mt-1', mode.color.text.muted)}>
          Local: <span className={mode.color.text.accent}>http://localhost:3000</span>
        </div>
      </motion.div>

      {/* Blinking cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~/my-saas</span>{' '}
        <motion.span
          className={cn(mode.color.text.accent, 'inline-block')}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          █
        </motion.span>
      </motion.div>
    </div>
  );
}
