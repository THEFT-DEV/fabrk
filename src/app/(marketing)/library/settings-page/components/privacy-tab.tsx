/**
 * ✅ FABRK COMPONENT
 * Privacy Tab Content
 * Production-ready ✓
 */

import { DataExportSection } from '@/components/settings/data-export';
import { NotificationsForm } from '@/components/settings/notifications-form';
import { PrivacyForm } from '@/components/settings/privacy-form';
import { Bell, Lock, Download } from 'lucide-react';
import { CodeWindow } from './code-window';
import { SectionHeader } from './section-header';

export function PrivacyTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Notifications */}
      <CodeWindow filename="notifications.config">
        <div className="p-4">
          <SectionHeader
            icon={Bell}
            title="NOTIFICATIONS"
            description="Manage your notification preferences"
          />
          <NotificationsForm />
        </div>
      </CodeWindow>

      {/* Privacy */}
      <CodeWindow filename="privacy.config">
        <div className="p-4">
          <SectionHeader
            icon={Lock}
            title="PRIVACY"
            description="Control your data sharing and privacy settings"
          />
          <PrivacyForm />
        </div>
      </CodeWindow>

      {/* Data Export */}
      <CodeWindow filename="data_export.tsx">
        <div className="p-4">
          <SectionHeader
            icon={Download}
            title="DATA EXPORT"
            description="Download a copy of your data"
          />
          <DataExportSection />
        </div>
      </CodeWindow>
    </div>
  );
}
