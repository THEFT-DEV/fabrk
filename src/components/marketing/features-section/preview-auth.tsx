/**
 * Auth Preview Component
 * Terminal-style login form with typing animation
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PreviewHeader } from './preview-header';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function AuthPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [emailText, setEmailText] = useState('');
  const [passwordDots, setPasswordDots] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullEmail = 'user@example.com';

  useEffect(() => {
    if (!isInView) return;

    // Typing animation for email
    let emailIndex = 0;
    const emailTimer = setInterval(() => {
      if (emailIndex <= fullEmail.length) {
        setEmailText(fullEmail.slice(0, emailIndex));
        emailIndex++;
      } else {
        clearInterval(emailTimer);
        // Start password animation after email is done
        let dotIndex = 0;
        const dotTimer = setInterval(() => {
          if (dotIndex <= 8) {
            setPasswordDots(dotIndex);
            dotIndex++;
          } else {
            clearInterval(dotTimer);
          }
        }, 100);
      }
    }, 80);

    // Blinking cursor
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(emailTimer);
      clearInterval(cursorTimer);
    };
  }, [isInView]);

  return (
    <Card ref={ref} className="w-full max-w-sm">
      <PreviewHeader title="auth module.exe" animated />

      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>[AUTH_FORM]:</div>

        <div className="space-y-4">
          <div>
            <span className={cn(mode.font, 'text-muted-foreground mb-2 block text-xs')}>
              EMAIL:
            </span>
            <div
              className={cn(
                mode.radius,
                'border-border bg-background flex min-h-[36px] items-center border px-4 py-2'
              )}
            >
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                {emailText}
                {emailText.length < fullEmail.length && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
            </div>
          </div>
          <div>
            <span className={cn(mode.font, 'text-muted-foreground mb-2 block text-xs')}>
              PASSWORD:
            </span>
            <div
              className={cn(
                mode.radius,
                'border-border bg-background flex min-h-[36px] items-center border px-4 py-2'
              )}
            >
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                {'•'.repeat(passwordDots)}
                {passwordDots < 8 && passwordDots > 0 && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
              {passwordDots === 0 && emailText.length >= fullEmail.length && showCursor && (
                <span className={cn(mode.font, 'text-primary text-xs')}>|</span>
              )}
            </div>
          </div>
          <div
            className={cn(
              mode.radius,
              `bg-primary cursor-pointer px-4 py-2 text-center transition-opacity ${mode.state.hover.opacity}`
            )}
          >
            <span className={cn(mode.font, 'text-primary-foreground text-xs')}>
              &gt; AUTHENTICATE
            </span>
          </div>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span
                className={cn(mode.radius, mode.font, 'bg-card text-muted-foreground px-2 text-xs')}
              >
                OR
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={cn(
                mode.radius,
                mode.font,
                'border-border cursor-pointer border px-4 py-2 text-center text-xs transition-colors',
                mode.state.hover.card
              )}
            >
              GOOGLE
            </div>
            <div
              className={cn(
                mode.radius,
                mode.font,
                'border-border cursor-pointer border px-4 py-2 text-center text-xs transition-colors',
                mode.state.hover.card
              )}
            >
              MICROSOFT
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
