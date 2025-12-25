/**
 * Minimal Cookie Consent Banner
 * Compact top banner for marketing pages
 */

'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function MinimalCookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      // Check if user already made a choice
      const hasConsent = localStorage.getItem('cookie-consent');
      if (!hasConsent) {
        // Show banner after short delay
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // If storage is unavailable (some privacy modes), still show the banner
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenSettings = () => {
    // Trigger the main cookie settings modal
    window.dispatchEvent(new Event('open-cookie-settings'));
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // Save minimal consent (necessary only)
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      })
    );
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed right-6 bottom-6 z-[60]',
        'animate-in slide-in-from-bottom-5 duration-300'
      )}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div
        className={cn(
          'bg-card border-accent flex items-center gap-2 border-2 px-4 py-2',
          mode.radius
        )}
      >
        <button
          onClick={handleOpenSettings}
          className={cn(
            'text-accent hover:text-accent/80 text-xs whitespace-nowrap transition-colors',
            mode.font
          )}
        >
          [ (0xB7) COOKIE_SETTINGS.CFG ]
        </button>
        <button
          onClick={handleDismiss}
          className={cn('text-accent hover:text-accent/80 transition-opacity', mode.font)}
          aria-label="Dismiss and reject all"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
