# i18n Implementation Guide

## Overview

Fabrk Boilerplate now includes **full internationalization (i18n)** support with next-intl for 6 languages:
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)

## What's Included

### 1. Translation Files (200+ Keys)
Location: `src/i18n/messages/`

Each language file includes complete translations for:
- Common UI actions (save, cancel, edit, delete, etc.)
- Navigation labels
- Authentication flows (login, register, password reset, email verification)
- Dashboard sections
- Settings (general, account, security, notifications)
- Billing and team management
- API keys management
- Error messages (404, 500, validation errors)
- Landing page content (hero, features, pricing, FAQ)
- Footer sections

### 2. Locale Configuration
Location: `src/i18n/config.ts`

```typescript
export const locales = ['en', 'es', 'fr', 'de', 'pt'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇵🇹',
};
```

### 3. Middleware Integration
Location: `src/middleware.ts`

The middleware handles both:
- Locale detection and routing
- Authentication protection for dashboard routes
- Locale-aware redirects

```typescript
// Combines next-intl middleware with NextAuth protection
export default auth((req) => {
  // First handle i18n routing
  const intlResponse = intlMiddleware(req as NextRequest);

  // Then check authentication for protected routes
  const pathWithoutLocale = pathname.replace(/^\/(en|es|fr|de|pt)/, '');
  // ... auth logic
});
```

### 4. Request Configuration
Location: `src/i18n/request.ts`

Dynamically loads translation messages based on the detected locale:

```typescript
export default getRequestConfig(async ({ locale }) => {
  const validLocale = (!locales.includes(locale as any) ? 'en' : locale) as string;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
```

### 5. Next.js Configuration
Location: `next.config.ts`

Integrated with next-intl plugin:

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
```

## How to Use Translations in Components

### Server Components (Recommended)

```typescript
import { useTranslations } from 'next-intl';

export default function MyServerComponent() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('save')}</button>
      <button>{t('cancel')}</button>
    </div>
  );
}
```

### Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/features">{t('features')}</a>
      <a href="/pricing">{t('pricing')}</a>
    </nav>
  );
}
```

### Using Multiple Translation Namespaces

```typescript
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const tCommon = useTranslations('common');
  const tSettings = useTranslations('settings.general');

  return (
    <div>
      <h1>{tSettings('title')}</h1>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

### Parameterized Translations

```typescript
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const userName = 'John';

  // Translation: "Welcome back, {name}!"
  return <h1>{t('welcome', { name: userName })}</h1>;
}
```

## Translation Key Structure

### Common Keys
```typescript
t('common.loading')      // "Loading..."
t('common.error')        // "Error"
t('common.save')         // "Save"
t('common.cancel')       // "Cancel"
t('common.delete')       // "Delete"
```

### Navigation Keys
```typescript
t('navigation.home')       // "Home"
t('navigation.dashboard')  // "Dashboard"
t('navigation.features')   // "Features"
t('navigation.pricing')    // "Pricing"
```

### Auth Keys
```typescript
t('auth.login.title')               // "Sign in to your account"
t('auth.login.emailPlaceholder')    // "Enter your email"
t('auth.register.title')            // "Create your account"
t('auth.forgotPassword.title')      // "Reset your password"
```

### Settings Keys
```typescript
t('settings.general.title')          // "General"
t('settings.account.deleteAccount')  // "Delete Account"
t('settings.security.title')         // "Security"
t('settings.notifications.title')    // "Notifications"
```

## Locale Switcher Component (TODO)

Create a locale switcher component to allow users to change languages:

```typescript
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, localeFlags } from '@/i18n/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.replace(/^\/(en|es|fr|de|pt)/, '');
    const newPath = newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            <span className="flex items-center gap-2">
              <span>{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

## Routing Strategy

The boilerplate uses **"as-needed" locale prefix**:

- Default locale (English): `https://fabrk.dev/features`
- Other locales: `https://fabrk.dev/es/features`, `https://fabrk.dev/fr/features`, etc.

This improves SEO for the primary market (English) while supporting internationalization.

## Adding New Translations

### 1. Add Keys to Translation Files

Update all 5 files:
- `src/i18n/messages/en.json`
- `src/i18n/messages/es.json`
- `src/i18n/messages/fr.json`
- `src/i18n/messages/de.json`
- `src/i18n/messages/pt.json`

Example:
```json
{
  "myNewSection": {
    "title": "My New Title",
    "description": "My description"
  }
}
```

### 2. Use in Components

```typescript
const t = useTranslations('myNewSection');

<h1>{t('title')}</h1>
<p>{t('description')}</p>
```

## Adding New Languages

### 1. Update Config

Add locale to `src/i18n/config.ts`:

```typescript
export const locales = ['en', 'es', 'fr', 'de', 'pt', 'ja'] as const;

export const localeNames: Record<Locale, string> = {
  // ...existing
  ja: '日本語',
};

export const localeFlags: Record<Locale, string> = {
  // ...existing
  ja: '🇯🇵',
};
```

### 2. Create Translation File

Copy `src/i18n/messages/en.json` to `src/i18n/messages/ja.json` and translate all keys.

### 3. Update Middleware

Update the regex in `src/middleware.ts`:

```typescript
const pathWithoutLocale = pathname.replace(/^\/(en|es|fr|de|pt|ja)/, '');
```

## Best Practices

1. **Always use translation keys** - Never hardcode text in components
2. **Keep keys organized** - Use namespaces to group related translations
3. **Use descriptive keys** - `auth.login.emailPlaceholder` not `auth.login.p1`
4. **Keep translations consistent** - Use the same term for the same concept across all sections
5. **Test all locales** - Verify UI doesn't break with longer/shorter translations
6. **Use parameterized translations** - For dynamic content like `"Welcome, {name}!"`

## Performance Notes

- Translation messages are loaded **on-demand per locale**
- Each locale's JSON is code-split and only loaded when needed
- Server Components render with translations at build time (for static pages)
- Client Components load translations on the client (slight hydration cost)

## Migration Checklist

- [ ] Create LocaleSwitcher component and add to navigation
- [ ] Update landing page to use translations
- [ ] Update auth pages to use translations
- [ ] Update dashboard pages to use translations
- [ ] Update settings pages to use translations
- [ ] Update billing pages to use translations
- [ ] Add locale selector to footer
- [ ] Test all pages in all 5 locales
- [ ] Update SEO metadata to be locale-aware
- [ ] Add hreflang tags for multi-language SEO

## Files Created

1. **Translation Files** (5 files, 200+ keys each):
   - `src/i18n/messages/en.json`
   - `src/i18n/messages/es.json`
   - `src/i18n/messages/fr.json`
   - `src/i18n/messages/de.json`
   - `src/i18n/messages/pt.json`

2. **Configuration Files** (3 files):
   - `src/i18n/config.ts` - Locale definitions
   - `src/i18n/request.ts` - Request configuration
   - `src/middleware.ts` - Combined i18n + auth middleware (updated)

3. **Next.js Config** (1 file):
   - `next.config.ts` - Integrated next-intl plugin

## Status

✅ **Infrastructure: 100% Complete**
- Translation files for 6 languages
- Middleware with locale detection
- Request configuration
- Next.js integration
- Successful build

⏳ **Component Migration: 0% Complete**
- Need to update ~78+ components to use translations
- Need to create LocaleSwitcher component
- Need to test all pages in all locales

## Next Steps

1. Create LocaleSwitcher component
2. Add locale selector to navigation/footer
3. Migrate landing page to use translations
4. Migrate auth pages
5. Migrate dashboard/settings pages
6. Add comprehensive i18n tests
7. Add hreflang tags for SEO
