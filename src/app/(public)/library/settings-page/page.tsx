/**
 * Settings Page Template - Terminal console style
 */
'use client';

import { useState } from 'react';
import { Settings, User, Lock, CreditCard } from 'lucide-react';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { SettingsHeader } from './components/settings-header';
import { GeneralTab } from './components/general-tab';
import { AccountTab } from './components/account-tab';
import { PrivacyTab } from './components/privacy-tab';
import { BillingTab } from './components/billing-tab';

const templateCode = `"use client";

import { useState } from "react";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { Settings, User, Lock, CreditCard } from "lucide-react";
import { SettingsHeader } from "./components/settings-header";
import { GeneralTab } from "./components/general-tab";
import { AccountTab } from "./components/account-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { BillingTab } from "./components/billing-tab";

const tabs = [
  { id: "general", label: "GENERAL", icon: Settings },
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "privacy", label: "PRIVACY", icon: Lock },
  { id: "billing", label: "BILLING", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <SettingsHeader />

      {/* Tabs Container */}
      <StyledTabs
        code="0x00"
        title="SETTINGS NAVIGATION"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        {/* Tab Content */}
        <StyledTabsContent value="general">
          <GeneralTab />
        </StyledTabsContent>

        <StyledTabsContent value="account">
          <AccountTab />
        </StyledTabsContent>

        <StyledTabsContent value="privacy">
          <PrivacyTab />
        </StyledTabsContent>

        <StyledTabsContent value="billing">
          <BillingTab />
        </StyledTabsContent>
      </StyledTabs>
    </div>
  );
}`;

const tabs = [
  { id: 'general', label: 'GENERAL', icon: Settings },
  { id: 'account', label: 'ACCOUNT', icon: User },
  { id: 'privacy', label: 'PRIVACY', icon: Lock },
  { id: 'billing', label: 'BILLING', icon: CreditCard },
];

function SettingsPreview() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="space-y-6">
        {/* Header */}
        <SettingsHeader />

        {/* Tabs Container */}
        <StyledTabs
          code="0x00"
          title="SETTINGS NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Tab Content */}
          <StyledTabsContent value="general">
            <GeneralTab />
          </StyledTabsContent>

          <StyledTabsContent value="account">
            <AccountTab />
          </StyledTabsContent>

          <StyledTabsContent value="privacy">
            <PrivacyTab />
          </StyledTabsContent>

          <StyledTabsContent value="billing">
            <BillingTab />
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function SettingsPageTemplate() {
  return (
    <TemplateShowcasePage
      badge="SETTINGS PAGE"
      title="Settings Page"
      description="Multi-tab settings interface with general, account, privacy, and billing sections"
      templateId="settings-page"
      category={{ name: 'Account Pages', href: '/library/account-pages' }}
      preview={<SettingsPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', '(dashboard)/', 'settings/page.tsx'], label: '← Copy template here' },
        { path: ['app/', '(dashboard)/settings/components/', 'settings-header.tsx'] },
        { path: ['app/', '(dashboard)/settings/components/', 'general-tab.tsx'] },
        { path: ['app/', '(dashboard)/settings/components/', 'account-tab.tsx'] },
        { path: ['app/', '(dashboard)/settings/components/', 'privacy-tab.tsx'] },
        { path: ['app/', '(dashboard)/settings/components/', 'billing-tab.tsx'] },
      ]}
      features={[
        '4-tab navigation (General, Account, Privacy, Billing)',
        'Appearance settings (theme, font size, layout)',
        'Notification preferences (email, push, in-app)',
        'Privacy controls (data sharing, cookies, analytics)',
        'Language & region settings',
        'Account security (password, 2FA, sessions)',
        'Responsive mobile-first design',
      ]}
    />
  );
}
