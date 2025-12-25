/**
 * Root Layout (For Non-Locale Routes)
 *
 * This layout provides HTML structure for routes OUTSIDE of /[locale].
 * - Locale routes (/[locale]/*): Use /[locale]/layout.tsx (with i18n)
 * - Non-locale routes (/demo, /components, etc.): Use this layout
 *
 * Next.js 16 requires ALL layouts to have <html> and <body> tags.
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Providers } from '@/components/providers';
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';
import { generateOrganizationSchema, generateProductSchema } from '@/lib/metadata';
import { ThemeScript } from '@/design-system/providers';
import { MonitorEffectScript } from '@/components/theme/monitor-effect-script';
import { getNonce } from '@/lib/nonce';
import './globals.css';
import './typography.css';
import '@/styles/crt-effects.css';
import '@/lib/dev-validation';

const jetbrainsMono = localFont({
  src: [
    {
      path: '../../public/fonts/jetbrains-mono/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/jetbrains-mono/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
});

// Pixelbasel - Premium pixel font for Terminal mode
const pixelbasel = localFont({
  src: '../../public/fonts/pixelbasel/Pixelbasel.ttf',
  weight: '400',
  variable: '--font-pixelbasel',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fabrk.dev'),
  title: {
    default: 'Fabrk - Build Production Apps at AI Speed',
    template: '%s | Fabrk',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  description:
    'A complete UI system with 169 production-ready components, design tokens, automated testing, and AI workflows. Build faster with enforced quality standards.',
  keywords: [
    'ui components',
    'design system',
    'react components',
    'nextjs',
    'typescript',
    'tailwind css',
    'ai workflows',
    'component library',
    'design tokens',
    'accessibility',
    'wcag',
    'production ready',
  ],
  authors: [{ name: 'Fabrk', url: 'https://fabrk.dev' }],
  creator: 'Fabrk',
  publisher: 'Fabrk',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Fabrk - Build Production Apps at AI Speed',
    description:
      '169 production-ready components with automated quality enforcement and AI workflows',
    type: 'website',
    locale: 'en_US',
    url: 'https://fabrk.dev',
    siteName: 'Fabrk',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fabrk - Build Production Apps at AI Speed',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabrk - Build Production Apps at AI Speed',
    description: '169 production-ready components with automated quality enforcement',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add your site verification codes when ready
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
  category: 'technology',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = await getNonce();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${jetbrainsMono.variable} ${pixelbasel.variable}`}
    >
      <head>
        {/* Static meta tags for SEO - ensures Lighthouse sees them immediately */}
        <meta
          name="description"
          content="A complete UI system with 169 production-ready components, design tokens, automated testing, and AI workflows. Build faster with enforced quality standards."
        />
        <ThemeScript defaultColorTheme="green" storageKeyPrefix="fabrk-theme" nonce={nonce} />
        <MonitorEffectScript nonce={nonce} />
        {/* Google Tag Manager - Only when GTM_ID is configured */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            {/* Google Consent Mode v2 - Must load BEFORE GTM */}
            <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Set default consent to denied (GDPR compliant)
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });

              // Check for existing consent
              try {
                const consent = localStorage.getItem('cookie-consent');
                if (consent) {
                  const prefs = JSON.parse(consent);
                  gtag('consent', 'update', {
                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                    'ad_personalization': prefs.marketing ? 'granted' : 'denied',
                    'analytics_storage': prefs.statistics ? 'granted' : 'denied',
                    'functionality_storage': prefs.preferences ? 'granted' : 'denied',
                    'personalization_storage': prefs.marketing ? 'granted' : 'denied'
                  });
                }
              } catch (e) {}
            `,
          }}
        />
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script
              nonce={nonce}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductSchema()),
          }}
        />
      </head>
      <body
        className="bg-background text-foreground font-mono antialiased"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) - Only when GTM_ID is configured */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Providers>
          {/* Vercel Analytics - Only when deployed to Vercel */}
          {process.env.VERCEL && <Analytics />}
          {/* Skip link - points to main content only (navigation/footer are page-specific) */}
          <a
            href="#main-content"
            className="skip-link focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-none focus:px-6 focus:py-4 focus:font-semibold focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Skip to main content
          </a>
          <div className="relative isolate flex min-h-screen flex-col">
            <main id="main-content" className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
