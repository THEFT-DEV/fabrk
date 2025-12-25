'use client';

import dynamic from 'next/dynamic';

// Client-side only playground to reduce initial bundle and improve LCP
const HeroPlaygroundFull = dynamic(
  () => import('./hero-playground-full').then(mod => mod.HeroPlaygroundFull),
  {
    ssr: false,
    loading: () => (
      <div className="mb-8 flex gap-2">
        <div className="h-9 w-24 bg-muted/50" />
        <div className="h-9 w-24 bg-muted/50" />
        <div className="h-9 w-24 bg-muted/50" />
        <div className="h-9 w-24 bg-muted/50" />
      </div>
    )
  }
);

export function LazyPlayground() {
  return (
    <section className="border-border border-t py-16">
      <div className="container mx-auto max-w-[1800px] px-12 lg:px-24">
        <HeroPlaygroundFull />
      </div>
    </section>
  );
}
