/**
 * ✅ COMPONENT
 * - File Size: ✓ (< 250 lines)
 * - Type Safety: ✓
 * - Alias Imports: ✓
 */

'use client';

import { ApiKeysSection } from '@/components/account/api-keys-section';
import { BillingSection } from '@/components/account/billing-section';
import { ProfileForm } from '@/components/account/profile-form';
import { SecurityForm } from '@/components/account/security-form';
import { SessionsSection } from '@/components/account/sessions-section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { CreditCard, Key, Monitor, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      value: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Manage your personal information',
    },
    {
      value: 'security',
      label: 'Security',
      icon: Shield,
      description: 'Password and two-factor authentication',
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: CreditCard,
      description: 'Subscription and payment methods',
    },
    {
      value: 'api-keys',
      label: 'API Keys',
      icon: Key,
      description: 'Manage your API access',
    },
    {
      value: 'sessions',
      label: 'Sessions',
      icon: Monitor,
      description: 'Active sessions and devices',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className={cn('text-4xl font-semibold tracking-tight', mode.color.text.primary)}>
          Account Settings
        </h1>
        <p className={cn('mt-2', mode.color.text.muted)}>
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid h-auto w-full max-w-6xl grid-cols-5 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'flex flex-col items-center gap-2 px-4 py-4 transition-colors',
                  `data-[state=active]:${mode.color.bg.base}`,
                  `hover:${mode.color.bg.accent} hover:${mode.color.text.inverse}`
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TabsContent value="profile" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x00"
                  title="PROFILE INFORMATION"
                  icon={<User className="h-4 w-4" />}
                  meta="Update your personal details and profile picture"
                />
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x01"
                  title="SECURITY SETTINGS"
                  icon={<Shield className="h-4 w-4" />}
                  meta="Manage your password and security preferences"
                />
                <CardContent>
                  <SecurityForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x02"
                  title="BILLING AND SUBSCRIPTION"
                  icon={<CreditCard className="h-4 w-4" />}
                  meta="Manage your subscription plan and payment methods"
                />
                <CardContent>
                  <BillingSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-keys" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x03"
                  title="API KEYS"
                  icon={<Key className="h-4 w-4" />}
                  meta="Create and manage API keys for programmatic access"
                />
                <CardContent>
                  <ApiKeysSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x04"
                  title="ACTIVE SESSIONS"
                  icon={<Monitor className="h-4 w-4" />}
                  meta="View and manage your active sessions across devices"
                />
                <CardContent>
                  <SessionsSection />
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader code="0xF0" title="QUICK ACTIONS" />
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={cn(
                        'flex w-full items-start gap-6 p-6 text-left transition-colors',
                        mode.color.text.primary,
                        mode.radius,
                        'hover:bg-primary hover:text-primary-foreground',
                        activeTab === tab.value && 'bg-primary text-primary-foreground'
                      )}
                    >
                      <Icon className="mt-0.5 size-5" />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className={cn(mode.font, 'text-xs', mode.color.text.muted)}>
                          {tab.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader code="0xF1" title="ACCOUNT STATUS" />
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={cn(mode.font, 'text-sm', mode.color.text.muted)}>Plan</span>
                  <span className={cn(mode.font, 'text-sm font-medium', mode.color.text.primary)}>
                    Pro
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(mode.font, 'text-sm', mode.color.text.muted)}>Status</span>
                  <span className={cn(mode.font, 'text-sm font-medium', mode.color.text.accent)}>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(mode.font, 'text-sm', mode.color.text.muted)}>
                    Member Since
                  </span>
                  <span className={cn(mode.font, 'text-sm font-medium', mode.color.text.primary)}>
                    Jan 2024
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(mode.font, 'text-sm', mode.color.text.muted)}>
                    Storage Used
                  </span>
                  <span className={cn(mode.font, 'text-sm font-medium', mode.color.text.primary)}>
                    2.4 GB / 10 GB
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader code="0xF2" title="NEED HELP" />
              <CardContent className={cn('space-y-2 text-sm', mode.color.text.muted)}>
                <p>
                  Visit our{' '}
                  <Link href="/docs" className={cn('hover:underline', mode.color.text.accent)}>
                    documentation
                  </Link>{' '}
                  for detailed guides.
                </p>
                <p>
                  Contact{' '}
                  <a href="/contact" className={cn('hover:underline', mode.color.text.accent)}>
                    support
                  </a>{' '}
                  for assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
