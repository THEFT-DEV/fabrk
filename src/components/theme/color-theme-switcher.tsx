/**
 * ✅ FABRK COMPONENT
 * Color theme switcher - Light and Dark modes
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Minimal theme set - Ayu light + CRT phosphor themes
const themes = [
  // Light theme
  { id: 'light', name: 'Light Mode', preview: '#f8f9fa' },
  { id: 'dark', name: 'Monokai Night', preview: '#1f1f1f' },
  // CRT phosphor themes
  { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
  { id: 'green', name: 'Green CRT', preview: '#33ff66' },
  { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
  { id: 'red', name: 'Red CRT', preview: '#ff6655' },
  { id: 'purple', name: 'Purple CRT', preview: '#bb88ff' },
] as const;

export type ColorTheme = (typeof themes)[number]['id'];

export function ColorThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);
    // Load saved theme from localStorage
    const saved = (localStorage.getItem('theme') as ColorTheme) || 'light';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const handleChange = (themeId: ColorTheme) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className={cn('bg-muted h-8 w-full animate-pulse', mode.radius)} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Choose Theme ({themes.length} available)</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            onClick={() => handleChange(theme.id)}
            variant={currentTheme === theme.id ? 'default' : 'outline'}
            size="sm"
            className="justify-start gap-2"
          >
            <div
              className={cn('border-border h-4 w-4 border', mode.radius)}
              style={{ backgroundColor: theme.preview }}
            />
            <span className="text-xs">{theme.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

// Helper to get current theme (for server components)
export function getColorTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as ColorTheme) || 'light';
}
