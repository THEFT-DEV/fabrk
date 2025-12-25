/**
 * Billing Dashboard Template - Terminal console style
 */
'use client';

import { ArrowUpRight, Download, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { ArrowUpRight, Filter, Download, Plus, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Mock data
const subscription = {
  plan: "Pro Plan",
  price: 29,
  billingCycle: "Month",
};

const usage = {
  apiRequests: { current: 8500, limit: 10000, percentage: 85 },
  storage: { current: 2, limit: 5, percentage: 40, unit: "GB" },
};

const billingHistory = [
  { id: 1, date: "Aug 03, 2025", description: "Pro Plan – Monthly", amount: 29, status: "paid" },
  { id: 2, date: "Aug 01, 2025", description: "Pro Plan – Monthly", amount: 29, status: "failed" },
  { id: 3, date: "Jul 01, 2025", description: "Pro Plan – Monthly", amount: 29, status: "paid" },
];

const paymentMethod = {
  brand: "VISA",
  last4: "6888",
  name: "John Smith",
  expiry: "24/11",
};

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>Billing</h1>
        <p className={cn(mode.font, "text-muted-foreground text-sm mt-1")}>
          Manage your subscription, view payment history, and update your billing details — all in one place.
        </p>
      </div>

      {/* Subscription Overview */}
      <div>
        <h2 className={cn(mode.font, "text-sm font-semibold mb-4")}>Subscription Overview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Plan */}
          <Card>
            <CardHeader code="0x00" title="CURRENT_PLAN" />
            <CardContent padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={cn(mode.radius, mode.font, "mb-2")}>{subscription.plan}</Badge>
                  <div className={cn(mode.font, "text-3xl font-semibold")}>
                    \${subscription.price}
                    <span className="text-muted-foreground text-sm font-normal">
                      / {subscription.billingCycle}
                    </span>
                  </div>
                </div>
                <Button className={cn(mode.radius, mode.font, "text-xs")}>
                  <ArrowUpRight className="mr-2 size-4" />
                  &gt; UPGRADE
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Summary */}
          <Card>
            <CardHeader code="0x01" title="USAGE_SUMMARY" />
            <CardContent padding="md">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className={cn(mode.font, "text-sm font-semibold mb-2")}>
                    {usage.apiRequests.current.toLocaleString()} / {usage.apiRequests.limit.toLocaleString()}
                  </div>
                  <Progress value={usage.apiRequests.percentage} size="sm" />
                  <div className={cn(mode.font, "text-muted-foreground text-xs mt-1")}>
                    API Requests Used
                  </div>
                </div>
                <div>
                  <div className={cn(mode.font, "text-sm font-semibold mb-2")}>
                    {usage.storage.current} {usage.storage.unit} / {usage.storage.limit} {usage.storage.unit}
                  </div>
                  <Progress value={usage.storage.percentage} size="sm" />
                  <div className={cn(mode.font, "text-muted-foreground text-xs mt-1")}>
                    Storage Used
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader code="0x02" title="BILLING_HISTORY" />
        <CardContent padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn(mode.font, "border-b border-border text-xs text-muted-foreground")}>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border">
                    <td className={cn(mode.font, "px-4 py-3 text-sm")}>{invoice.date}</td>
                    <td className={cn(mode.font, "px-4 py-3 text-sm")}>{invoice.description}</td>
                    <td className={cn(mode.font, "px-4 py-3 text-sm")}>\${invoice.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        mode.font,
                        "flex items-center gap-1 text-xs",
                        invoice.status === "paid" ? "text-success" : "text-destructive"
                      )}>
                        {invoice.status === "paid" ? (
                          <CheckCircle className="size-3" />
                        ) : (
                          <XCircle className="size-3" />
                        )}
                        {invoice.status === "paid" ? "Paid" : "Failed"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {invoice.status === "paid" ? (
                        <Button variant="ghost" size="sm" className={cn(mode.font, "text-xs h-8")}>
                          <Download className="mr-1 size-3" />
                          Download Invoice
                        </Button>
                      ) : (
                        <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                          No Action Available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <div>
        <h2 className={cn(mode.font, "text-sm font-semibold mb-4")}>Payment Method</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Credit Card */}
          <Card className="relative h-48">
            <CardHeader code="0x03" title={paymentMethod.brand} />
            <CardContent padding="md" className="flex h-full flex-col justify-between pb-6">
              <div className={cn(mode.font, "text-xl tracking-wider")}>
                •••• •••• •••• {paymentMethod.last4}
              </div>
              <div className="flex justify-between">
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>NAME</div>
                  <div className={cn(mode.font, "text-sm")}>{paymentMethod.name}</div>
                </div>
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>VALID THRU</div>
                  <div className={cn(mode.font, "text-sm")}>{paymentMethod.expiry}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Card */}
          <button className="h-48 border border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
            <Plus className="size-6 text-muted-foreground" />
            <span className={cn(mode.font, "text-muted-foreground text-sm")}>Add New Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}`;

// Mock data
const subscription = {
  plan: 'Pro Plan',
  price: 29,
  billingCycle: 'Month',
};

const usage = {
  apiRequests: { current: 8500, limit: 10000, percentage: 85 },
  storage: { current: 2, limit: 5, percentage: 40, unit: 'GB' },
};

const billingHistory = [
  { id: 1, date: 'Aug 03, 2025', description: 'Pro Plan – Monthly', amount: 29, status: 'paid' },
  { id: 2, date: 'Aug 01, 2025', description: 'Pro Plan – Monthly', amount: 29, status: 'failed' },
  { id: 3, date: 'Jul 01, 2025', description: 'Pro Plan – Monthly', amount: 29, status: 'paid' },
];

const paymentMethod = {
  brand: 'VISA',
  last4: '6888',
  name: 'John Smith',
  expiry: '24/11',
};

function BillingPreview() {
  return (
    <TemplatePreviewWrapper minHeight="800px">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Billing</h1>
          <p className={cn(mode.font, 'text-muted-foreground mt-1 text-sm')}>
            Manage your subscription, view payment history, and update your billing details — all in
            one place.
          </p>
        </div>

        {/* Subscription Overview */}
        <div>
          <h2 className={cn(mode.font, 'mb-4 text-sm font-semibold')}>Subscription Overview</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Current Plan */}
            <Card>
              <CardHeader code="0x00" title="CURRENT_PLAN" />
              <CardContent padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={cn(mode.radius, mode.font, 'mb-2')}>
                      {subscription.plan}
                    </Badge>
                    <div className={cn(mode.font, 'text-3xl font-semibold')}>
                      ${subscription.price}
                      <span className="text-muted-foreground text-sm font-normal">
                        {' '}
                        / {subscription.billingCycle}
                      </span>
                    </div>
                  </div>
                  <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                    <ArrowUpRight className="mr-2 size-4" />
                    &gt; UPGRADE
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Summary */}
            <Card>
              <CardHeader code="0x01" title="USAGE_SUMMARY" />
              <CardContent padding="md">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className={cn(mode.font, 'mb-2 text-sm font-semibold')}>
                      {usage.apiRequests.current.toLocaleString()} /{' '}
                      {usage.apiRequests.limit.toLocaleString()}
                    </div>
                    <Progress value={usage.apiRequests.percentage} size="sm" />
                    <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
                      API Requests Used
                    </div>
                  </div>
                  <div>
                    <div className={cn(mode.font, 'mb-2 text-sm font-semibold')}>
                      {usage.storage.current} {usage.storage.unit} / {usage.storage.limit}{' '}
                      {usage.storage.unit}
                    </div>
                    <Progress value={usage.storage.percentage} size="sm" />
                    <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
                      Storage Used
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader code="0x02" title="BILLING_HISTORY" />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={cn(
                      mode.font,
                      'border-border text-muted-foreground border-b text-xs'
                    )}
                  >
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id} className="border-border border-b">
                      <td className={cn(mode.font, 'px-4 py-3 text-sm')}>{invoice.date}</td>
                      <td className={cn(mode.font, 'px-4 py-3 text-sm')}>{invoice.description}</td>
                      <td className={cn(mode.font, 'px-4 py-3 text-sm')}>
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            mode.font,
                            'flex items-center gap-1 text-xs',
                            invoice.status === 'paid' ? 'text-success' : 'text-destructive'
                          )}
                        >
                          {invoice.status === 'paid' ? (
                            <CheckCircle className="size-3" />
                          ) : (
                            <XCircle className="size-3" />
                          )}
                          {invoice.status === 'paid' ? 'Paid' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {invoice.status === 'paid' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(mode.font, 'h-8 text-xs')}
                          >
                            <Download className="mr-1 size-3" />
                            Download Invoice
                          </Button>
                        ) : (
                          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                            No Action Available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <div>
          <h2 className={cn(mode.font, 'mb-4 text-sm font-semibold')}>Payment Method</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Credit Card */}
            <Card className="relative h-48">
              <CardHeader code="0x03" title={paymentMethod.brand} />
              <CardContent padding="md" className="flex h-full flex-col justify-between pb-6">
                <div className={cn(mode.font, 'text-xl tracking-wider')}>
                  •••• •••• •••• {paymentMethod.last4}
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className={cn(mode.font, 'text-muted-foreground text-xs')}>NAME</div>
                    <div className={cn(mode.font, 'text-sm')}>{paymentMethod.name}</div>
                  </div>
                  <div>
                    <div className={cn(mode.font, 'text-muted-foreground text-xs')}>VALID THRU</div>
                    <div className={cn(mode.font, 'text-sm')}>{paymentMethod.expiry}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add New Card */}
            <button className={cn('border-border flex h-48 flex-col items-center justify-center gap-2 border border-dashed transition-colors', mode.state.hover.card)}>
              <Plus className="text-muted-foreground size-6" />
              <span className={cn(mode.font, 'text-muted-foreground text-sm')}>Add New Card</span>
            </button>
          </div>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function BillingDashboardTemplate() {
  return (
    <TemplateShowcasePage
      badge="BILLING DASHBOARD"
      title="Billing & Subscription"
      description="Manage your subscription, payments, and billing information"
      templateId="billing-dashboard"
      category={{ name: 'Account Pages', href: '/library/account-pages' }}
      preview={<BillingPreview />}
      code={templateCode}
      fileStructure="app/(dashboard)/billing/page.tsx"
      features={[
        'Current plan overview with upgrade button',
        'Usage metrics (API requests, storage) with progress bars',
        'Billing history table with status indicators',
        'Credit card display with gradient styling',
        'Add new payment method button',
        'Responsive mobile-first design',
      ]}
    />
  );
}
