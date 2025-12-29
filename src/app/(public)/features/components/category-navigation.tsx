/**
 * ✅ FABRK COMPONENT
 * Category Navigation - Sticky navigation for feature categories
 * Production-ready ✓
 */

'use client';

import Link from 'next/link';
import { FEATURE_CATEGORIES } from './feature-data';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function CategoryNavigation() {
  return (
    <section className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-16 z-40 border-b py-4 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="grid grid-cols-5 gap-2">
          {FEATURE_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`#${category.id}`}
                className={cn(
                  'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center gap-2 border px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors',
                  mode.radius,
                  mode.font
                )}
              >
                <Icon className="size-4" />
                {category.title.split(' ')[0].toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
