/**
 * Hero Playground - Interactive demo section like shadcn
 * Shows live components with theme switcher
 */
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/container';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Users, DollarSign, TrendingUp, Activity, Check, CreditCard } from 'lucide-react';

// Dashboard Demo
function DashboardDemo() {
  const metrics = [
    { label: 'REVENUE', value: '$45,231', change: '+20.1%', icon: DollarSign },
    { label: 'USERS', value: '2,350', change: '+15.3%', icon: Users },
    { label: 'GROWTH', value: '12.5%', change: '+4.2%', icon: TrendingUp },
    { label: 'ACTIVE', value: '1,234', change: '+8.7%', icon: Activity },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} size="auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                  {metric.label}
                </span>
                <metric.icon className={cn('h-4 w-4', mode.color.text.muted)} />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={cn('text-2xl font-bold', mode.font)}>{metric.value}</span>
                <span className={cn('text-xs', mode.color.text.success, mode.font)}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card size="auto">
        <CardHeader code="0x10" title="RECENT TRANSACTIONS" />
        <CardContent className="p-4">
          <div className="space-y-4">
            {[
              'Payment received from user_4821',
              'New subscription started',
              'Invoice #1234 paid',
            ].map((item, i) => (
              <div key={i} className="border-primary flex items-center gap-4 border-l-2 pl-3">
                <Check className={cn('h-3 w-3', mode.color.text.success)} />
                <span className={cn('text-xs', mode.font)}>{item}</span>
                <span className={cn('ml-auto text-xs', mode.color.text.muted, mode.font)}>
                  {i + 2}m ago
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Authentication Demo
function AuthDemo() {
  return (
    <div className="mx-auto max-w-md">
      <Card size="auto">
        <CardHeader code="0x20" title="SIGN IN" />
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-xs')}>EMAIL</Label>
            <Input
              type="email"
              placeholder="user@example.com"
              className={cn(mode.radius, mode.font, 'text-xs')}
            />
          </div>
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-xs')}>PASSWORD</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className={cn(mode.radius, mode.font, 'text-xs')}
            />
          </div>
          <Button className={cn('w-full', mode.radius, mode.font, 'text-xs')}>&gt; SIGN IN</Button>
          <div className="flex items-center gap-2">
            <div className="bg-border h-px flex-1" />
            <span className={cn('text-xs', mode.color.text.muted, mode.font)}>OR</span>
            <div className="bg-border h-px flex-1" />
          </div>
          <Button variant="outline" className={cn('w-full', mode.radius, mode.font, 'text-xs')}>
            &gt; CONTINUE WITH GOOGLE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Billing Demo
function BillingDemo() {
  return (
    <div className="mx-auto max-w-md">
      <Card size="auto">
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-xs')}>CARD NUMBER</Label>
            <div className="flex gap-2">
              <Input
                placeholder="1234 5678 9012 3456"
                className={cn('flex-1', mode.radius, mode.font, 'text-xs')}
              />
              <div className="flex items-center gap-1">
                <CreditCard className="text-muted-foreground h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>EXPIRY</Label>
              <Input placeholder="MM/YY" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>CVV</Label>
              <Input placeholder="123" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" id="save-card" />
            <label htmlFor="save-card" className={cn('text-xs', mode.font)}>
              Save card for future payments
            </label>
          </div>
          <Button className={cn('w-full', mode.radius, mode.font, 'text-xs')}>
            &gt; ADD PAYMENT METHOD
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function HeroPlayground() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section className="border-border border-t py-12">
      <Container size="2xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* Theme Badge */}
            <div
              className={cn('flex items-center gap-2 text-xs', mode.font, mode.color.text.muted)}
            >
              <span>THEME:</span>
              <span className={mode.color.text.accent}>TERMINAL</span>
              <span className={mode.color.text.muted}>
                (18 variants available at{' '}
                <a href="/library" className="hover:underline">
                  /library
                </a>
                )
              </span>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="dashboard" className="mt-0">
            <DashboardDemo />
          </TabsContent>
          <TabsContent value="auth" className="mt-0">
            <AuthDemo />
          </TabsContent>
          <TabsContent value="billing" className="mt-0">
            <BillingDemo />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
