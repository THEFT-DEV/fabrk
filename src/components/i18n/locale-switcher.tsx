'use client';

/**
 * Locale Switcher
 * Dropdown to change the application language
 */

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/config/i18n';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale) {
    // Replace the locale segment in the path
    const segments = pathname.split('/');

    // Check if first segment is a locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      // No locale in path, add it
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="font-mono text-xs"
          aria-label="Change language"
        >
          <Globe className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">{localeFlags[locale]}</span>
          <span className="ml-1">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`cursor-pointer font-mono text-xs ${
              loc === locale ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
            {loc === locale && <span className="text-primary ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
