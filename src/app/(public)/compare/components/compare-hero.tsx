import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { FABRK_ADVANTAGES } from './comparison-data';

interface CompareHeroProps {
  title: string;
  subtitle: string;
}

export function CompareHero({ title, subtitle }: CompareHeroProps) {
  return (
    <section className="border-b border-border bg-background py-16 lg:py-24">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
          [COMPARISON]
        </p>
        <h1 className="mb-6 text-3xl font-bold uppercase tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
          {subtitle}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {FABRK_ADVANTAGES.map((item) => (
            <div
              key={item.label}
              className={cn(
                'border border-border bg-card p-4',
                mode.radius
              )}
            >
              <div className="text-2xl font-bold text-primary">{item.stat}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
