import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { Globe, Languages, Flag, Folder, FileJson, Settings } from 'lucide-react';

export const metadata = {
  title: 'Internationalization (i18n) - Fabrk Docs',
  description: 'Multi-language support with next-intl for global audiences.',
};

export default function I18nPage() {
  return (
    <FeatureGuideTemplate
      code="[0x82]"
      category="Features"
      title="i18n Internationalization"
      description="Multi-language support for global audiences using next-intl."
      overview="Fabrk includes full internationalization support using next-intl. Ship your SaaS to users worldwide with translations for English, Spanish, French, German, Portuguese, and Japanese out of the box. Add more languages easily by creating new message files."
      features={[
        {
          icon: Globe,
          title: '6 Languages',
          description: 'English, Spanish, French, German, Portuguese, Japanese included.',
        },
        {
          icon: Languages,
          title: 'Type-safe',
          description: 'TypeScript support for translation keys and parameters.',
        },
        {
          icon: Flag,
          title: 'Locale Switcher',
          description: 'Drop-in component to let users change their language.',
        },
        {
          icon: Folder,
          title: 'Organized Messages',
          description: 'JSON files organized by namespace (common, auth, nav, etc.).',
        },
        {
          icon: FileJson,
          title: 'Easy to Extend',
          description: 'Add new languages by copying and translating a JSON file.',
        },
        {
          icon: Settings,
          title: 'Server & Client',
          description: 'Works in both server components and client components.',
        },
      ]}
      setup={[
        {
          title: 'Installation',
          description: 'next-intl is already installed. If starting fresh:',
          code: `npm install next-intl`,
          language: 'bash',
        },
        {
          title: 'Configuration',
          description: 'i18n configuration in src/i18n/config.ts',
          code: `// src/i18n/config.ts
export const locales = ["en", "es", "fr", "de", "pt", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ja: "日本語",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  pt: "🇧🇷",
  ja: "🇯🇵",
};`,
          language: 'typescript',
        },
        {
          title: 'Request Configuration',
          description: 'Server-side message loading',
          code: `// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(\`./messages/\${locale}.json\`)).default,
}));`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Message Files Structure',
          description: 'Translations organized by namespace',
          code: `// src/i18n/messages/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "search": "Search"
  },
  "auth": {
    "signIn": "Sign In",
    "signOut": "Sign Out",
    "signUp": "Sign Up",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "continueWithGoogle": "Continue with Google"
  },
  "nav": {
    "home": "Home",
    "dashboard": "Dashboard",
    "settings": "Settings",
    "billing": "Billing"
  },
  "dashboard": {
    "welcome": "Welcome back",
    "overview": "Overview",
    "recentActivity": "Recent Activity"
  }
}`,
          language: 'json',
        },
        {
          title: 'Using Translations in Server Components',
          description: 'Access translations in React Server Components',
          code: `// src/app/dashboard/page.tsx
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <h2>{t("overview")}</h2>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Using Translations in Client Components',
          description: 'Access translations in client-side components',
          code: `"use client";

import { useTranslations } from "next-intl";

export function WelcomeMessage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1>{t("welcome")}</h1>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Locale Switcher Component',
          description: 'Let users change their language',
          code: `// src/components/i18n/locale-switcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale) {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="font-mono text-xs">
          <Globe className="mr-1 h-4 w-4" />
          {localeFlags[locale]} {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={loc === locale ? "bg-primary/10" : ""}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Adding a New Language',
          description: 'Easy to add support for more languages',
          code: `// 1. Copy an existing message file
cp src/i18n/messages/en.json src/i18n/messages/ko.json

// 2. Translate the strings in ko.json

// 3. Update config.ts
export const locales = ["en", "es", "fr", "de", "pt", "ja", "ko"] as const;

export const localeNames: Record<Locale, string> = {
  // ...existing
  ko: "한국어",
};

export const localeFlags: Record<Locale, string> = {
  // ...existing
  ko: "🇰🇷",
};`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Blog', href: '/docs/features/blog' }}
      next={{ title: 'SEO', href: '/docs/features/seo' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Translation files prepared (JSON format)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Included Languages */}
      <DocsSection title="Included Languages">
        <DocsCard title="SUPPORTED LOCALES">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <span>en - English</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇪🇸</span>
              <span>es - Español</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇫🇷</span>
              <span>fr - Français</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇩🇪</span>
              <span>de - Deutsch</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇧🇷</span>
              <span>pt - Português</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇯🇵</span>
              <span>ja - 日本語</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Message Namespaces */}
      <DocsSection title="Message Namespaces">
        <DocsCard title="NAMESPACES">
          <p className="mb-4">Messages are organized into logical namespaces:</p>
          <div className="space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">common</code>
              <span className="text-muted-foreground">
                Shared strings (loading, save, cancel, etc.)
              </span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">auth</code>
              <span className="text-muted-foreground">
                Authentication (sign in, sign up, password)
              </span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">nav</code>
              <span className="text-muted-foreground">Navigation labels (dashboard, settings)</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">dashboard</code>
              <span className="text-muted-foreground">Dashboard-specific strings</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">settings</code>
              <span className="text-muted-foreground">Settings page strings</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">billing</code>
              <span className="text-muted-foreground">Billing and subscription strings</span>
            </div>
            <div className="flex justify-between">
              <code className="bg-muted px-1">errors</code>
              <span className="text-muted-foreground">Error messages</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Tips */}
      <DocsSection title="Best Practices">
        <DocsCallout variant="info" title="Translation Tips">
          Keep translation keys descriptive (e.g., &quot;signInButton&quot; not &quot;btn1&quot;).
          Use namespaces to organize related strings. Consider hiring professional translators for
          customer-facing content - machine translations often miss nuances.
        </DocsCallout>
        <DocsCard title="TIPS">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Namespace by feature:</strong> Keep related strings together
            </li>
            <li>
              ├─ <strong>Use descriptive keys:</strong> &quot;welcomeMessage&quot; not
              &quot;msg1&quot;
            </li>
            <li>
              ├─ <strong>Include context:</strong> Add comments for translators
            </li>
            <li>
              ├─ <strong>Handle plurals:</strong> Use ICU message format for counts
            </li>
            <li>
              ├─ <strong>Test RTL:</strong> Test with RTL languages (Arabic, Hebrew)
            </li>
            <li>
              └─ <strong>Fallback gracefully:</strong> Missing keys fall back to default locale
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Common Questions */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How do I handle dynamic content?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Use ICU message format for interpolation:
              <pre className="bg-muted mt-2 p-2 text-xs">
                {`"greeting": "Hello, {name}!"
// Usage: t("greeting", { name: "John" })`}
              </pre>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How do I handle pluralization?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Use ICU plural format:
              <pre className="bg-muted mt-2 p-2 text-xs">
                {`"items": "{count, plural, =0 {No items} one {# item} other {# items}}"
// Usage: t("items", { count: 5 })`}
              </pre>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Where should I put the locale switcher?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Common placements: footer, header settings menu, or user profile dropdown. Make it
              easily accessible but not distracting.
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/seo">
            <DocsCard
              title="SEO LOCALIZATION"
              className="h-full transition-all"
            >
              SEO for Multiple Languages
              <p className="mb-6">Learn how to optimize SEO metadata for each locale.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/lemonsqueezy">
            <DocsCard
              title="GLOBAL PAYMENTS"
              className="h-full transition-all"
            >
              Global Payments
              <p className="mb-6">Accept payments from users worldwide with Lemon Squeezy.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
