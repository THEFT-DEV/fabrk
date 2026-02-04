/**
 * Large Animated ASCII Background
 * Various thematic animations for hero backdrop
 */
'use client';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  useCodeRain,
  useRocket,
  useCoffeeSteam,
  useBuildingBlocks,
  useTerminalTyping,
  useGears,
  useHourglass,
  useDevMood,
} from './ascii-animations';

// ============================================
// COMPONENT EXPORT
// ============================================

export type AsciiVariant =
  | 'coderain'
  | 'rocket'
  | 'coffee'
  | 'blocks'
  | 'terminal'
  | 'gears'
  | 'hourglass'
  | 'devmood';

interface AsciiBackgroundProps {
  variant?: AsciiVariant;
  className?: string;
  opacity?: number;
}

export function AsciiBackground({
  variant = 'blocks',
  className,
  opacity = 0.2,
}: AsciiBackgroundProps) {
  const codeRain = useCodeRain(120, 40);
  const rocket = useRocket();
  const coffee = useCoffeeSteam();
  const blocks = useBuildingBlocks();
  const terminal = useTerminalTyping();
  const gears = useGears();
  const hourglass = useHourglass();
  const devmood = useDevMood();

  const content = {
    coderain: codeRain,
    rocket,
    coffee,
    blocks,
    terminal,
    gears,
    hourglass,
    devmood,
  }[variant];

  // For coderain, fill the whole screen
  const isFillScreen = variant === 'coderain';

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        isFillScreen ? '' : 'flex items-center justify-center',
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <pre
        className={cn(
          'whitespace-pre leading-tight select-none',
          isFillScreen
            ? 'text-3xs sm:text-2xs md:text-xs'
            : 'text-sm sm:text-base md:text-lg lg:text-xl',
          mode.font,
          mode.color.text.primary
        )}
      >
        {content}
      </pre>
    </div>
  );
}
