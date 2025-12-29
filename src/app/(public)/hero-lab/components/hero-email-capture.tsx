/**
 * Hero Variation 32: EMAIL CAPTURE
 * Hook: Lead gen variant with email input
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Mail, Check } from 'lucide-react';

export function HeroEmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight mb-4', mode.font)}>
          GET EARLY ACCESS
          <br />
          <span className="text-primary">TO FABRK 2.0</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-8', mode.font, mode.color.text.muted)}>
          Be the first to know when we launch new features.
          Plus get 20% off launch pricing.
        </p>

        {/* Email Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
            <div className={cn('flex border', mode.font, mode.radius)}>
              <div className="flex items-center px-3 border-r bg-muted/30">
                <Mail className={cn('h-4 w-4', mode.color.text.muted)} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={cn(
                  'flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none',
                  mode.font
                )}
                required
              />
              <Button
                type="submit"
                className={cn('px-6 py-3 text-sm', mode.radius, mode.font)}
              >
                NOTIFY ME
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className={cn('text-xs mt-2', mode.font, mode.color.text.muted)}>
              No spam. Unsubscribe anytime.
            </div>
          </form>
        ) : (
          <div className={cn('border border-success p-6 mb-8', mode.font, mode.radius)}>
            <Check className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="font-bold text-success">YOU&apos;RE ON THE LIST!</div>
            <div className={cn('text-xs mt-2', mode.color.text.muted)}>
              We&apos;ll email you when 2.0 launches.
            </div>
          </div>
        )}

        {/* Secondary Link */}
        <div className={cn('text-sm', mode.font, mode.color.text.muted)}>
          Want access now?{' '}
          <Link href="/library" className="text-primary underline">
            Try the current version →
          </Link>
        </div>
      </div>
    </Container>
  );
}
