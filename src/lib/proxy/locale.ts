/**
 * Locale Detection
 *
 * Determines the preferred locale from cookie or Accept-Language header.
 */

import type { NextRequest } from 'next/server';
import { locales, defaultLocale, type Locale } from '@/config/i18n';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

/**
 * Parse the Accept-Language header into locale codes sorted by quality.
 */
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(',')
    .map((entry) => {
      const [code, qualityStr] = entry.trim().split(';q=');
      const quality = qualityStr ? parseFloat(qualityStr) : 1;
      return { code: code.split('-')[0].toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.code);
}

/**
 * Resolve the preferred locale from cookie, then Accept-Language, then default.
 */
export function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = parseAcceptLanguage(acceptLanguage);
    const matched = preferred.find((code) => locales.includes(code as Locale));
    if (matched) return matched as Locale;
  }

  return defaultLocale;
}
