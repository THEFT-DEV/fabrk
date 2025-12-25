import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NotFoundTracker } from '@/components/analytics/not-found-tracker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Page Not Found',
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <div className="flex min-h-screen flex-col items-center justify-center px-6 font-mono">
      <div className="mx-auto max-w-2xl text-center">
        {/* Terminal Header */}
        <div className="border-foreground/20 bg-foreground/5 mb-6 inline-block border-2 px-4 py-1">
          <span className="text-foreground/60 text-xs tracking-wider">[ [0x404] ERROR PAGE ]</span>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-foreground text-8xl font-semibold tracking-tighter md:text-9xl">
            404
          </h1>
          <div className="bg-foreground/20 mx-auto mt-4 h-0.5 w-24"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-foreground mb-4 text-xl font-semibold tracking-wider uppercase">
          PAGE NOT FOUND
        </h2>
        <p className="text-foreground/60 mb-2 text-sm">
          [ [0x01] STATUS ]---------------------------------
        </p>
        <p className="text-foreground/80 mb-8">
          The requested resource could not be located on this server.
          <br />
          <span className="text-foreground/60">Path may have been moved or deleted.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="h-12 px-8 tracking-wider uppercase">
            <Link href="/">
              <span className="mr-2 text-sm">▸</span>
              RETURN HOME
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="border-foreground/10 mt-12 border-t pt-8">
          <p className="text-foreground/60 mb-4 text-xs tracking-wider uppercase">
            [ NAVIGATION OPTIONS ]
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/#features"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              &gt; FEATURES
            </Link>
            <Link
              href="/#pricing"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              &gt; PRICING
            </Link>
            <Link href="/#faq" className="text-foreground/70 hover:text-primary transition-colors">
              &gt; FAQ
            </Link>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="text-foreground/40 mt-12 text-xs">
          <span className="animate-pulse">▊</span> System ready for input_
        </div>
      </div>
    </div>
    </>
  );
}
