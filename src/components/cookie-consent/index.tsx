/**
 * Cookie Consent Component - GDPR Compliant
 * Floating button with comprehensive modal
 * Integrates with Google Consent Mode v2 for GTM
 */

'use client';

import { Cookie, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AboutTabContent, ConsentTabContent, DetailsTabContent } from './tabs';
import type { CookiePreferences } from './types';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

// Helper to get initial preferences from localStorage (runs once on mount)
function getInitialPreferences(): {
  preferences: CookiePreferences;
  showButton: boolean;
} {
  if (typeof window === 'undefined') {
    return { preferences: DEFAULT_PREFERENCES, showButton: false };
  }

  try {
    const testKey = '__cookie_consent_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);

    const consent = localStorage.getItem('cookie-consent');
    const consentDate = localStorage.getItem('cookie-consent-date');

    if (consent && consentDate) {
      const daysSinceConsent = Math.floor(
        (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceConsent < 365) {
        return { preferences: JSON.parse(consent), showButton: false };
      }
    }
    return { preferences: DEFAULT_PREFERENCES, showButton: true };
  } catch {
    return { preferences: DEFAULT_PREFERENCES, showButton: true };
  }
}

// Helper to update Google Consent Mode
function updateGoogleConsent(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return;

  const win = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  // Ensure dataLayer and gtag exist
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function () {
      win.dataLayer?.push(arguments);
    };
  }

  // Update consent state
  win.gtag('consent', 'update', {
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
    analytics_storage: prefs.statistics ? 'granted' : 'denied',
    functionality_storage: prefs.preferences ? 'granted' : 'denied',
    personalization_storage: prefs.marketing ? 'granted' : 'denied',
  });

  // Also push event for GTM triggers
  win.dataLayer?.push({
    event: 'cookie_consent_update',
    cookie_consent: prefs,
  });
}

// Combined state for hydration-safe initialization
interface ConsentState {
  showButton: boolean;
  preferences: CookiePreferences;
}

export interface CookieConsentProps {
  variant?: 'full' | 'modal-only';
  bannerVariant?: 'full' | 'minimal';
}

export function CookieConsent({ variant = 'full', bannerVariant = 'full' }: CookieConsentProps) {
  // Use ref to track if we've done initial hydration
  const hasHydrated = useRef(false);

  // Combined state to minimize setState calls during hydration
  const [consentState, setConsentState] = useState<ConsentState>({
    showButton: false,
    preferences: DEFAULT_PREFERENCES,
  });
  const [showModal, setShowModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('consent');

  // Destructure for convenience
  const { showButton, preferences } = consentState;

  // Helper to update just preferences
  const setPreferences = (prefs: CookiePreferences) => {
    setConsentState((prev) => ({ ...prev, preferences: prefs }));
  };

  // Helper to update just showButton
  const setShowButton = (show: boolean) => {
    setConsentState((prev) => ({ ...prev, showButton: show }));
  };

  // Run initialization once on client-side mount
  // This pattern is required for hydration-safe localStorage access
  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    const { preferences: savedPrefs, showButton: shouldShowButton } = getInitialPreferences();
    const hasSavedConsent = !shouldShowButton;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration-safe localStorage sync; server renders default, client updates from storage
    setConsentState({
      showButton: variant === 'full' ? shouldShowButton : false,
      preferences: savedPrefs,
    });

    // Update Google consent only if consent already exists
    if (hasSavedConsent) {
      updateGoogleConsent(savedPrefs);
    }
  }, [variant]);

  // Listen for custom event to open cookie settings
  useEffect(() => {
    const handleOpenCookieSettings = () => {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-cookie-settings', handleOpenCookieSettings);
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenCookieSettings);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(prefs));
      localStorage.setItem('cookie-consent-date', new Date().toISOString());
      updateGoogleConsent(prefs);
      closeModal();
    } catch (e) {
      console.error('Could not save cookie consent', e);
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowModal(false);
      setShowButton(false);
      setIsExiting(false);
      setActiveTab('consent');
    }, 300);
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    if (!showModal) {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  if ((variant === 'modal-only' || !showButton) && !showModal) return null;

  return (
    <>
      {/* Floating Cookie Button */}
      {variant === 'full' && showButton && !showModal && (
        <>
          {bannerVariant === 'full' ? (
            // Full banner with cookie icon
            <div
              className={cn(
                'bg-background text-foreground animate-in slide-in-from-bottom-5 fixed right-6 bottom-6 z-50 flex items-center border transition-all duration-300',
                mode.radius
              )}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <button
                onClick={openModal}
                className={cn(
                  'hover:bg-muted flex items-center gap-2 px-4 py-4 transition-colors',
                  mode.font
                )}
                aria-label="Cookie Settings"
              >
                <Cookie className="size-5" />
                <span className="text-xs">&gt; COOKIE SETTINGS</span>
              </button>
              <button
                onClick={() => setShowButton(false)}
                className="border-border hover:bg-muted border-l px-4 py-4 transition-colors"
                aria-label="Dismiss cookie notice"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            // Minimal banner with terminal text
            <div
              className={cn(
                'fixed right-6 bottom-6 z-[60]',
                'animate-in slide-in-from-bottom-5 duration-300'
              )}
              style={{ transform: 'translate3d(0, 0, 0)' }}
              role="dialog"
              aria-live="polite"
              aria-label="Cookie consent banner"
            >
              <div
                className={cn(
                  'bg-card border-accent flex items-center gap-2 border-2 px-4 py-2',
                  mode.radius
                )}
              >
                <button
                  onClick={openModal}
                  className={cn(
                    'text-accent hover:text-accent/80 text-xs whitespace-nowrap transition-colors',
                    mode.font
                  )}
                >
                  [ (0xB7) COOKIE_SETTINGS.CFG ]
                </button>
                <button
                  onClick={() => setShowButton(false)}
                  className={cn('text-accent hover:text-accent/80 transition-opacity', mode.font)}
                  aria-label="Dismiss and reject all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Cookie Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div
            className="bg-background/80 fixed inset-0 z-0 backdrop-blur-sm"
            onClick={closeModal}
            onKeyDown={(e) => e.key === 'Escape' && closeModal()}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          />
          <div className="relative z-10 flex min-h-full items-center justify-center p-4">
            <div
              className={cn(
                'bg-background relative w-full max-w-2xl transition-all duration-300',
                isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              )}
            >
              {/* Close button - positioned in header row */}
              <button
                onClick={closeModal}
                className={cn('focus:ring-ring absolute top-1.5 right-2 z-10 p-1.5 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-none', mode.state.secondary.opacity)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {/* Tabs */}
              <StyledTabs
                code="00"
                title="COOKIE PREFERENCES"
                tabs={[
                  { id: 'consent', label: 'CONSENT' },
                  { id: 'details', label: 'DETAILS' },
                  { id: 'about', label: 'ABOUT' },
                ]}
                value={activeTab}
                onValueChange={setActiveTab}
              >
                {/* Content - border outside scroll container so it's always visible */}
                <StyledTabsContent value="consent" className="mt-0">
                  <div className="border-border border border-t-0">
                    <div className="max-h-[60vh] overflow-y-auto p-6">
                      <ConsentTabContent
                        preferences={preferences}
                        setPreferences={setPreferences}
                        acceptAll={acceptAll}
                        acceptSelected={acceptSelected}
                        rejectAll={rejectAll}
                      />
                    </div>
                  </div>
                </StyledTabsContent>
                <StyledTabsContent value="details" className="mt-0">
                  <div className="border-border border border-t-0">
                    <div className="max-h-[60vh] overflow-y-auto p-6">
                      <DetailsTabContent
                        preferences={preferences}
                        setPreferences={setPreferences}
                      />
                    </div>
                  </div>
                </StyledTabsContent>
                <StyledTabsContent value="about" className="mt-0">
                  <div className="border-border border border-t-0">
                    <div className="max-h-[60vh] overflow-y-auto p-6">
                      <AboutTabContent />
                    </div>
                  </div>
                </StyledTabsContent>
              </StyledTabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
