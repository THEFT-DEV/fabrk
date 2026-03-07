import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';

export function CompareCTA() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight lg:text-3xl">
          READY TO BUILD?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Start with 70+ components, 18 themes, and a full AI toolkit. Free and open source.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className={cn(mode.radius)}>
            <Link href="/docs/getting-started">{`> GET STARTED`}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className={cn(mode.radius)}>
            <Link href="/features">{`> VIEW FEATURES`}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
