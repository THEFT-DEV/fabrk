/**
 * Components Grid - 25+ diverse component types across 4 columns
 * Columns stagger in from left to right as user scrolls
 */
'use client';

import { GridColumnOne, GridColumnTwo, GridColumnThree, GridColumnFour } from './grid-columns';
import { Reveal } from '@/components/motion';

export function ComponentsGrid() {
  return (
    <div className="grid items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <Reveal delay={0} once={true}>
        <GridColumnOne />
      </Reveal>
      <Reveal delay={0.15} once={true}>
        <GridColumnTwo />
      </Reveal>
      <Reveal delay={0.3} once={true}>
        <GridColumnThree />
      </Reveal>
      <Reveal delay={0.45} once={true}>
        <GridColumnFour />
      </Reveal>
    </div>
  );
}
