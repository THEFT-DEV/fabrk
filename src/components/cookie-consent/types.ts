export interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

export interface ConsentTabContentProps {
  preferences: CookiePreferences;
  setPreferences: (prefs: CookiePreferences) => void;
  acceptAll: () => void;
  acceptSelected: () => void;
  rejectAll: () => void;
}

export interface DetailsTabContentProps {
  preferences: CookiePreferences;
  setPreferences: (prefs: CookiePreferences) => void;
}

export interface AboutTabContentProps {
  className?: string;
}

export interface CookieCategory {
  id: keyof CookiePreferences;
  name: string;
  description: string;
  required?: boolean;
  cookies: {
    name: string;
    description: string;
    duration: string;
  }[];
}
