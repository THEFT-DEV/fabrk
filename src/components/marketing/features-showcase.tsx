/**
 * ✅ FABRK COMPONENT
 * Core Benefits - Carousel with 16 feature cards
 * Shows 3 at a time with auto-rotation
 * Production-ready ✓
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent, Stat, StatGroup } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/landing/section-header';
import { BenefitCard } from '@/components/landing/benefit-card';
import { CORE_BENEFITS, PRICING } from '@/data/landing';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const CARDS_PER_VIEW = 3;
const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds

export function FeaturesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const totalBenefits = CORE_BENEFITS.length;
  const maxIndex = totalBenefits - CARDS_PER_VIEW;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [currentIndex, maxIndex]
  );

  // Auto-rotation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(goToNext, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPlaying, goToNext]);

  // Get visible cards
  const visibleBenefits = CORE_BENEFITS.slice(currentIndex, currentIndex + CARDS_PER_VIEW);

  // Calculate dot indicators (show groups of 3)
  const totalGroups = Math.ceil(totalBenefits / CARDS_PER_VIEW);
  const currentGroup = Math.floor(currentIndex / CARDS_PER_VIEW);

  return (
    <section id="features" className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="WHAT MAKES FABRK DIFFERENT"
          code="0x10"
          title="SHIP YOUR AI SAAS BEFORE YOUR RUNWAY ENDS"
          description="AI credit system: done. Multi-provider billing: done. Production components: done. 875+ hours of work—saved. Launch this weekend, not next quarter."
          align="center"
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <div className="absolute -left-12 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className={cn('h-10 w-10', mode.radius)}
              aria-label="Previous features"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute -right-12 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className={cn('h-10 w-10', mode.radius)}
              aria-label="Next features"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Cards Grid with Animation */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleBenefits.map((benefit, index) => (
                  <BenefitCard
                    key={benefit.id}
                    icon={benefit.icon}
                    module={benefit.module}
                    code={benefit.code}
                    benefit={benefit.benefit}
                    description={benefit.description}
                    timeSaved={benefit.timeSaved}
                    costSaved={benefit.costSaved}
                    features={benefit.features}
                    index={index}
                    ctaLabel={benefit.ctaLabel}
                    ctaHref={benefit.ctaHref}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Dots + Play/Pause */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                <button
                  key={groupIndex}
                  onClick={() => goToSlide(groupIndex * CARDS_PER_VIEW)}
                  className={cn(
                    'h-2 transition-all duration-300',
                    mode.radius,
                    groupIndex === currentGroup
                      ? 'bg-primary w-6'
                      : 'bg-muted hover:bg-muted-foreground/50 w-2'
                  )}
                  aria-label={`Go to feature group ${groupIndex + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn('h-8 w-8 p-0', mode.radius)}
              aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            {/* Counter */}
            <span className={cn('text-xs tabular-nums', mode.font, mode.color.text.muted)}>
              {currentIndex + 1}-{Math.min(currentIndex + CARDS_PER_VIEW, totalBenefits)} of{' '}
              {totalBenefits}
            </span>
          </div>

          {/* Mobile Navigation */}
          <div className="mt-4 flex justify-center gap-4 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              className={cn(mode.radius)}
              aria-label="Previous features"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              PREV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className={cn(mode.radius)}
              aria-label="Next features"
            >
              NEXT
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Total Savings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardHeader code="0x20" title="TOTAL VALUE" />
            <CardContent>
              <StatGroup>
                <Stat label="Components" value={COMPONENT_COUNT_STRING} />
                <Stat label="Features" value={`${totalBenefits}`} />
                <Stat label="Themes" value="12" />
                <Stat label="Launch Price" value={PRICING.display.current} />
              </StatGroup>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
