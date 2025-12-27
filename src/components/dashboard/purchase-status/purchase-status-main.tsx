/**
 * ✅ FABRK COMPONENT
 * Purchase Status Main Component
 * Under 150 lines ✓
 * Production ready ✓
 */

'use client';

import { logger } from '@/lib/logger';
import { useState } from 'react';
import { AccessCard } from './access-card';
import { LicenseCard } from './license-card';
import { PurchaseStatusProps } from './purchase-status-types';
import { ResourcesCard } from './resources-card';

export function PurchaseStatus({ user, purchase, className = '' }: PurchaseStatusProps) {
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [_downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copiedLicense, setCopiedLicense] = useState(false);

  const hasAccess = user.tier === 'complete' || purchase?.status === 'completed';
  const licenseKey = purchase?.licenseKey || user.licenseKey;

  const handleGenerateDownload = async () => {
    setIsGeneratingDownload(true);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setDownloadUrl(data.downloadUrl);
        window.open(data.downloadUrl, '_blank');
      } else {
        logger.error('Download generation failed:', data.error);
      }
    } catch (error: unknown) {
      logger.error('Download generation error:', error);
    } finally {
      setIsGeneratingDownload(false);
    }
  };

  const copyLicenseKey = async () => {
    if (!licenseKey) return;

    await navigator.clipboard.writeText(licenseKey);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2000);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AccessCard
          hasAccess={hasAccess}
          onGenerateDownload={handleGenerateDownload}
          isGeneratingDownload={isGeneratingDownload}
        />

        <LicenseCard
          licenseKey={licenseKey}
          onCopyLicense={copyLicenseKey}
          copiedLicense={copiedLicense}
        />

        <ResourcesCard hasAccess={hasAccess} />
      </div>
    </div>
  );
}
