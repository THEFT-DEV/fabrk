# i18n Quick Start Guide

Quick reference for using internationalization in the Fabrk SaaS boilerplate.

## Supported Locales

- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)
- 🇯🇵 Japanese (ja)

## Using Translations in Components

### Server Components

```typescript
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('navigation');

  return <h1>{t('dashboard')}</h1>;
}
```

### Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('common');

  return <button>{t('save')}</button>;
}
```

### With Parameters

```typescript
const t = useTranslations('dashboard');

// "Welcome back, John!"
<h1>{t('welcome', { name: user.name })}</h1>
```

### Multiple Namespaces

```typescript
const t = useTranslations('footer');
const tNav = useTranslations('navigation');

<h3>{t('product')}</h3>
<Link>{tNav('pricing')}</Link>
```

## Available Namespaces

| Namespace | Keys | Use Case |
|-----------|------|----------|
| `common` | 48 | Buttons, actions, states |
| `navigation` | 18 | Site navigation, menus |
| `auth` | 45 | Login, register, password reset |
| `dashboard` | 11 | Dashboard UI |
| `settings` | 30 | Settings pages |
| `billing` | 15 | Payment management |
| `team` | 12 | Team management |
| `apiKeys` | 11 | Developer tools |
| `errors` | 8 | Error messages |
| `landing` | 20 | Marketing pages |
| `footer` | 6 | Site footer |

## Formatting Utilities

### Dates

```typescript
import { formatDate, formatDateTime, formatRelativeTime } from '@/lib/i18n/formatters';

formatDate(new Date(), 'ja'); // "2025年11月14日"
formatDateTime(new Date(), 'fr'); // "14 nov. 2025 à 10:30"
formatRelativeTime(date, 'es'); // "hace 2 días"
```

### Numbers & Currency

```typescript
import { formatNumber, formatCurrency, formatPercent } from '@/lib/i18n/formatters';

formatNumber(1234.56, 'de'); // "1.234,56"
formatCurrency(4999, 'ja', 'JPY'); // "¥4,999"
formatPercent(0.456, 'fr'); // "45,6 %"
```

## Adding Locale Switcher

```typescript
import { LocaleSwitcher } from '@/components/i18n/locale-switcher';

<LocaleSwitcher />
```

## Adding New Translations

1. Add keys to `src/i18n/messages/en.json`:
```json
{
  "myNamespace": {
    "myKey": "My value"
  }
}
```

2. Translate to all other locales:
- `src/i18n/messages/es.json`
- `src/i18n/messages/fr.json`
- `src/i18n/messages/de.json`
- `src/i18n/messages/pt.json`
- `src/i18n/messages/ja.json`

3. Use in components:
```typescript
const t = useTranslations('myNamespace');
<div>{t('myKey')}</div>
```

## URL Structure

| Locale | URL | Example |
|--------|-----|---------|
| English | `/page` | `/about` |
| Spanish | `/es/page` | `/es/about` |
| French | `/fr/page` | `/fr/about` |
| German | `/de/page` | `/de/about` |
| Portuguese | `/pt/page` | `/pt/about` |
| Japanese | `/ja/page` | `/ja/about` |

## Testing Locale Switching

1. Open app in browser
2. Click locale switcher (Globe icon)
3. Select language from dropdown
4. Verify URL updates with locale prefix
5. Verify translations load correctly
6. Refresh page - locale should persist

## Common Issues

### "Namespace not found"
- Ensure translation key exists in all locale files
- Check for typos in namespace name

### "Translation key not found"
- Add missing key to all 6 locale files
- Use fallback: `t('key', 'Fallback text')`

### Locale not persisting
- Check `NEXT_LOCALE` cookie is set
- Verify middleware is configured correctly

## Full Documentation

See `I18N-PHASE5-COMPLETION-REPORT.md` for complete implementation details.
