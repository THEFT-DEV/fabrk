/**
 * Marketing Layout
 * Layout for all public-facing marketing pages (Home, Pricing, About, etc.)
 * Includes SiteNavigation, Footer, and minimal cookie consent banner.
 */

import { SiteNavigation } from '@/components/navigation';
import { Footer } from '@/components/shared/footer';
import { CookieConsent } from '@/components/cookie-consent';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookieConsent bannerVariant="minimal" />
      <SiteNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
