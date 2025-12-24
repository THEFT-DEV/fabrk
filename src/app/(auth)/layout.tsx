import { CookieConsent } from '@/components/cookie-consent';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-6">{children}</div>
      <CookieConsent />
    </div>
  );
}
