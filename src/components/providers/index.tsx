'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { ThemeProvider, type ColorThemeName } from '@/design-system/providers';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * Client-side providers
 *
 * Provider hierarchy:
 * 1. SessionProvider - NextAuth session management (when auth works)
 * 2. ThemeProvider - Design system color theme management
 *
 * Theme System:
 * - Color themes: Light and Dark
 * - Terminal aesthetic (sharp edges, monospace font) is enforced globally
 * - Persisted to localStorage with SSR flash prevention
 */

interface ProvidersProps {
  children: ReactNode;
  /** Default color theme (defaults to "green") */
  defaultColorTheme?: ColorThemeName;
}

/**
 * Wrapper that gracefully handles auth when database isn't configured
 * Uses NEXT_PUBLIC_AUTH_ENABLED to control whether session management is active
 */
function AuthWrapper({ children }: { children: ReactNode }) {
  // Auth is only enabled when explicitly set via env var
  // This prevents console errors when running without database setup
  const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';

  if (!authEnabled) {
    return <>{children}</>;
  }

  return (
    <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false}>
      {children}
    </SessionProvider>
  );
}

export function Providers({ children, defaultColorTheme = 'green' }: ProvidersProps) {
  return (
    <AuthWrapper>
      <ThemeProvider defaultColorTheme={defaultColorTheme} storageKeyPrefix="fabrk-theme">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className: cn('border border-border text-xs', mode.radius, mode.font),
          }}
        />
      </ThemeProvider>
    </AuthWrapper>
  );
}
