/**
 * ✅ FABRK COMPONENT
 * Purchase Status Types
 * Under 150 lines ✓
 * Production ready ✓
 */

export interface PurchaseStatusProps {
  user: {
    id: string;
    email: string;
    name?: string;
    tier: string;
    licenseKey?: string;
    accessGrantedAt?: Date;
  };
  purchase?: {
    id: string;
    product: string;
    amount: number;
    status: string;
    licenseKey: string;
    deliveredAt?: Date;
    lastDownloadAt?: Date;
  };
  className?: string;
}

export interface AccessCardProps {
  hasAccess: boolean;
  onGenerateDownload: () => void;
  isGeneratingDownload: boolean;
}

export interface LicenseCardProps {
  licenseKey?: string;
  onCopyLicense: () => void;
  copiedLicense: boolean;
}

export interface ResourcesCardProps {
  hasAccess: boolean;
}
