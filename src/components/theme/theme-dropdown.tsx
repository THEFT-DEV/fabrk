/**
 * ✅ FABRK COMPONENT
 * Color theme picker dropdown for navbar
 * Production-ready ✓
 */

'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';
import { themeGroups, themes, type ColorTheme } from '@/data/themes';

export type { ColorTheme };

export function ThemeDropdown() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('green');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    // Remove any leftover dark mode class and localStorage from old theme system
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');

    // Clear old next-themes localStorage keys
    localStorage.removeItem('theme-mode'); // Old key if it exists

    // Set DaisyUI theme (force green as default if no valid theme)
    const saved = (localStorage.getItem('theme') as ColorTheme) || 'green';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    // Force remove dark class if it somehow persists (safe cleanup)
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      // Only remove theme-related keys, not auth tokens or other data
      localStorage.removeItem('theme');
      localStorage.removeItem('theme-mode');
      localStorage.removeItem('color-theme');
    }
  }, []);

  const handleChange = (themeId: ColorTheme) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);

    // Get effect from theme data (dynamic, not hardcoded)
    const theme = themes.find((t) => t.id === themeId);
    const effect = theme?.effect || 'none';

    // Remove all potential effect classes
    ['effect-crt', 'effect-lcd', 'effect-vhs', 'effect-none'].forEach((c) =>
      document.documentElement.classList.remove(c)
    );
    if (effect !== 'none') {
      document.documentElement.classList.add(`effect-${effect}`);
    }
    localStorage.setItem('monitor-preset', effect);

    // Dispatch storage event to sync other components if they listen
    window.dispatchEvent(new Event('storage'));
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={mode.radius} disabled aria-label="Loading theme">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  const currentThemeName = themes.find((t) => t.id === currentTheme)?.name || 'Green CRT';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-2', mode.radius)}
          aria-label={`Change theme, current: ${currentThemeName}`}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">{currentThemeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn('w-56 max-h-[70vh] overflow-y-auto', mode.radius)}>
        {Object.entries(themeGroups).map(([groupName, groupThemes], index) => (
          <div key={groupName}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-muted-foreground text-xs tracking-wider uppercase">
              {groupName}
            </DropdownMenuLabel>
            {groupThemes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => handleChange(theme.id)}
                className={cn(
                  'font-semibold',
                  currentTheme === theme.id && 'bg-primary text-primary-foreground'
                )}
              >
                <div
                  className={cn('mr-2 h-4 w-4 border', mode.radius)}
                  style={{ backgroundColor: theme.preview }}
                />
                {theme.name}
                {currentTheme === theme.id && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
