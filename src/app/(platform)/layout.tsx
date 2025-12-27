/**
 * Dashboard Layout
 * Shared layout for all authenticated dashboard pages
 * Includes header with org switcher and navigation
 */

import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { CookieConsent } from '@/components/cookie-consent';

// Force dynamic rendering for auth-protected pages
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <CookieConsent />
    </div>
  );
}
