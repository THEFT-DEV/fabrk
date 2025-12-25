/**
 * FABRK COMPONENT
 * Security & Privacy Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Shield, Lock, Activity, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { SecurityScore } from './components/security-score';
import { SecurityTab } from './components/security-tab';
import { PrivacyTab } from './components/privacy-tab';
import { AuditTab } from './components/audit-tab';
import { ComplianceTab } from './components/compliance-tab';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function SecurityPrivacy() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    activityTracking: false,
    analyticsSharing: false,
  });

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>
          Security & Privacy
        </h1>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader code="0x00" title="SECURITY SCORE" />
        <CardContent padding="lg">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border border-primary bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className={cn(mode.font, "text-2xl font-semibold")}>75%</div>
              <p className={cn(mode.font, "text-muted-foreground text-xs")}>
                Security score
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader code="0x01" title="SECURITY SETTINGS" />
        <CardContent padding="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className={cn(mode.font, "text-xs")}>
                  Two-Factor Authentication
                </Label>
                <p className={cn(mode.font, "text-muted-foreground text-xs")}>
                  Add an extra layer of security
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`;

// Mock data
const securityData = {
  user: {
    email: 'john@example.com',
    emailVerified: true,
    twoFactorEnabled: false,
    lastPasswordChange: '2024-09-15',
  },
  connectedAccounts: [
    {
      provider: 'google',
      accountId: 'john@gmail.com',
      connectedAt: '2024-01-15',
    },
  ],
  activeSessions: [
    {
      id: 'sess_001',
      device: 'Chrome on macOS',
      location: 'San Francisco, CA',
      ip: '192.168.1.1',
      lastActive: 'Just now',
      isCurrent: true,
    },
    {
      id: 'sess_002',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
  ],
  auditLog: [
    {
      id: 'log_001',
      action: 'Password changed',
      timestamp: '2024-11-10 14:23',
      ip: '192.168.1.1',
      status: 'success' as const,
    },
    {
      id: 'log_002',
      action: 'Login',
      timestamp: '2024-11-09 09:15',
      ip: '192.168.1.1',
      status: 'success' as const,
    },
    {
      id: 'log_003',
      action: 'Failed login attempt',
      timestamp: '2024-11-08 22:45',
      ip: '203.0.113.0',
      status: 'failed' as const,
    },
  ],
};

const privacySettings = {
  profileVisibility: true,
  activityTracking: false,
  analyticsSharing: false,
  searchIndexing: true,
  dataRetention: true,
  marketingEmails: false,
  productUpdates: true,
  cookiesEssential: true,
  cookiesAnalytics: false,
  cookiesMarketing: false,
};

const tabs = [
  { id: 'security', label: 'SECURITY', icon: Shield },
  { id: 'privacy', label: 'PRIVACY', icon: Lock },
  { id: 'audit', label: 'AUDIT LOG', icon: Activity },
  { id: 'compliance', label: 'COMPLIANCE', icon: FileText },
];

function SecurityPrivacyPreview() {
  const [activeTab, setActiveTab] = useState('security');
  const [privacy, setPrivacy] = useState(privacySettings);

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEnable2FA = () => {
    toast.info('[2FA]: Setup modal would open here with QR code');
  };

  const handleRevokeSession = (_sessionId: string) => {
    toast.success('[SESSION]: Revoked successfully');
  };

  const handleExportData = () => {
    toast.success('[EXPORT]: Data export started. Check email when ready.');
  };

  const handleRequestAccess = () => {
    toast.success('[ACCESS REPORT]: Request submitted. You will receive a report within 30 days.');
  };

  const handleViewPolicy = (type: 'privacy' | 'terms') => {
    toast.info(
      `[${type.toUpperCase()}]: Opening ${type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}...`
    );
  };

  const handleDeleteAccount = () => {
    toast.success('[DELETE]: Account deletion initiated. Check email for confirmation.');
  };

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Security & Privacy</h1>
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <Settings className="mr-2 h-4 w-4" />
            &gt; VIEW AUDIT LOG
          </Button>
        </div>

        {/* Security Score */}
        <SecurityScore user={securityData.user} />

        {/* Tab Navigation */}
        <StyledTabs
          code="0x00"
          title="SECURITY NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Tab Contents */}
          <StyledTabsContent value="security">
            <SecurityTab
              twoFactorEnabled={securityData.user.twoFactorEnabled}
              lastPasswordChange={securityData.user.lastPasswordChange}
              activeSessions={securityData.activeSessions}
              onEnable2FA={handleEnable2FA}
              onRevokeSession={handleRevokeSession}
            />
          </StyledTabsContent>

          <StyledTabsContent value="privacy">
            <PrivacyTab privacy={privacy} onToggle={handlePrivacyToggle} />
          </StyledTabsContent>

          <StyledTabsContent value="audit">
            <AuditTab auditLog={securityData.auditLog} />
          </StyledTabsContent>

          <StyledTabsContent value="compliance">
            <ComplianceTab
              onExportData={handleExportData}
              onRequestAccess={handleRequestAccess}
              onViewPolicy={handleViewPolicy}
              onDeleteAccount={handleDeleteAccount}
            />
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function SecurityPrivacyTemplate() {
  return (
    <TemplateShowcasePage
      badge="SECURITY PRIVACY"
      title="Security & Privacy"
      description="Manage your account security, privacy settings, and data controls"
      templateId="security-privacy"
      category={{ name: 'Account Pages', href: '/library/account-pages' }}
      preview={<SecurityPrivacyPreview />}
      code={templateCode}
      fileStructure="app/settings/security/page.tsx"
      features={[
        'Security score dashboard',
        'Two-factor authentication setup',
        'Active session management',
        'Privacy settings with toggles',
        'Audit log with filtering',
        'GDPR compliance tools (data export, deletion)',
      ]}
    />
  );
}
