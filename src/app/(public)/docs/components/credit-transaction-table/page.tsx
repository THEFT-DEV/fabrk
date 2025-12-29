'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { TransactionTable } from '@/components/credits';

// Static mock transaction data for previews (avoids hydration mismatch from Date.now)
const mixedTransactions = [
  {
    id: '1',
    amount: -10,
    type: 'USAGE',
    description: 'Form generation',
    endpoint: '/api/ai/generate-form',
    createdAt: '2024-12-08T14:55:00.000Z',
  },
  {
    id: '2',
    amount: -20,
    type: 'USAGE',
    description: 'Code generation',
    endpoint: '/api/ai/generate-code',
    createdAt: '2024-12-08T14:30:00.000Z',
  },
  {
    id: '3',
    amount: 500,
    type: 'PURCHASE',
    description: 'Purchased 500 credit pack',
    endpoint: null,
    createdAt: '2024-12-08T13:00:00.000Z',
  },
  {
    id: '4',
    amount: 1000,
    type: 'SUBSCRIPTION_REFILL',
    description: 'Monthly refill for starter plan',
    endpoint: null,
    createdAt: '2024-12-07T15:00:00.000Z',
  },
];

const usageOnlyTransactions = [
  {
    id: '1',
    amount: -10,
    type: 'USAGE',
    description: 'Form generation',
    endpoint: '/api/ai/generate-form',
    createdAt: '2024-12-08T14:55:00.000Z',
  },
  {
    id: '2',
    amount: -1,
    type: 'USAGE',
    description: 'Chat message',
    endpoint: '/api/ai/chat',
    createdAt: '2024-12-08T14:50:00.000Z',
  },
  {
    id: '3',
    amount: -20,
    type: 'USAGE',
    description: 'Code generation',
    endpoint: '/api/ai/generate-code',
    createdAt: '2024-12-08T14:45:00.000Z',
  },
];

const refillTransactions = [
  {
    id: '1',
    amount: 1000,
    type: 'SUBSCRIPTION_REFILL',
    description: 'Monthly refill for starter plan',
    endpoint: null,
    createdAt: '2024-11-08T15:00:00.000Z',
  },
  {
    id: '2',
    amount: 1000,
    type: 'SUBSCRIPTION_REFILL',
    description: 'Monthly refill for starter plan',
    endpoint: null,
    createdAt: '2024-10-08T15:00:00.000Z',
  },
];

const bonusTransactions = [
  {
    id: '1',
    amount: 50,
    type: 'BONUS',
    description: 'Referral bonus',
    endpoint: null,
    createdAt: '2024-12-08T14:00:00.000Z',
  },
  {
    id: '2',
    amount: 25,
    type: 'REFUND',
    description: 'Failed generation refund',
    endpoint: null,
    createdAt: '2024-12-08T12:00:00.000Z',
  },
];

export default function CreditTransactionTablePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.122]"
      category="Credits"
      title="Credit Transaction Table"
      description="Displays credit transaction history with type icons, amounts, descriptions, and timestamps. Supports all transaction types: usage, purchases, refills, bonuses, and refunds."
      importCode={`import { TransactionTable } from "@/components/credits"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-lg p-4">
            <TransactionTable transactions={mixedTransactions} />
          </div>
        ),
        code: `<TransactionTable transactions={transactions} />`,
      }}
      variants={[
        {
          title: 'Usage Transactions',
          description: 'Shows credit deductions from AI operations.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={usageOnlyTransactions} />
            </div>
          ),
          code: `// Usage transactions show red arrows and negative amounts`,
        },
        {
          title: 'Subscription Refills',
          description: 'Monthly credit replenishments.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={refillTransactions} />
            </div>
          ),
          code: `// Refills show refresh icon and green amounts`,
        },
        {
          title: 'Bonuses & Refunds',
          description: 'Special credit additions.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={bonusTransactions} />
            </div>
          ),
          code: `// Bonuses and refunds show distinct icons`,
        },
        {
          title: 'Empty State',
          description: 'Message when no transactions exist.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <TransactionTable transactions={[]} />
            </div>
          ),
          code: `<TransactionTable transactions={[]} />`,
        },
      ]}
      props={[
        {
          name: 'transactions',
          type: 'Transaction[]',
          required: true,
          description:
            'Array of transaction objects with id, amount, type, description, endpoint, and createdAt.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ]}
      usageExamples={[
        {
          title: 'Dashboard Integration',
          description: 'Fetch and display recent transaction history:',
          code: `'use client';

import { useEffect, useState } from 'react';
import { TransactionTable } from '@/components/credits';

export function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch recent transactions
    fetch('/api/credits/history?limit=20')
      .then(r => r.json())
      .then(data => setTransactions(data.transactions));
  }, []);

  return (
    <div className="space-y-4">
      <h3>Recent Transactions</h3>
      <TransactionTable transactions={transactions} />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Transaction Type',
          description: 'TypeScript interface for transaction objects:',
          code: `interface Transaction {
  id: string;
  amount: number;          // Positive = added, Negative = deducted
  type: CreditTransactionType;
  description: string | null;
  endpoint: string | null;  // API endpoint that triggered this
  createdAt: string;        // ISO 8601 date string
}

enum CreditTransactionType {
  USAGE,                 // Red down arrow (-)
  PURCHASE,              // Green up arrow (+)
  SUBSCRIPTION_REFILL,   // Green refresh icon (+)
  BONUS,                 // Blue gift icon (+)
  REFUND,                // Yellow undo icon (+)
}`,
          language: 'typescript',
        },
        {
          title: 'API Response Format',
          description: 'Expected format from GET /api/credits/history:',
          code: `// GET /api/credits/history?limit=20 response
{
  "transactions": [
    {
      "id": "1",
      "amount": -10,
      "type": "USAGE",
      "description": "Form generation",
      "endpoint": "/api/ai/generate-form",
      "createdAt": "2024-12-08T14:55:00.000Z"
    },
    {
      "amount": 500,
      "type": "PURCHASE",
      "description": "Purchased 500 credit pack",
      "endpoint": null,
      "createdAt": "2024-12-08T13:00:00.000Z"
    },
    {
      "amount": 1000,
      "type": "SUBSCRIPTION_REFILL",
      "description": "Monthly refill for starter plan",
      "endpoint": null,
      "createdAt": "2024-12-07T15:00:00.000Z"
    }
  ],
  "stats": [...],  // If ?stats=true was passed
  "totalUsage": 245
}`,
          language: 'json',
        },
        {
          title: 'Filter by Type',
          description: 'Show only specific transaction types:',
          code: `'use client';

import { useState, useEffect } from 'react';
import { TransactionTable } from '@/components/credits';

export function UsageOnlyHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Only fetch USAGE transactions
    fetch('/api/credits/history?type=USAGE&limit=50')
      .then(r => r.json())
      .then(data => setTransactions(data.transactions));
  }, []);

  return (
    <div>
      <h3>Usage History</h3>
      <TransactionTable transactions={transactions} />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Empty State Handling',
          description: 'Component shows "No transactions yet" when array is empty:',
          code: `// Automatically handles empty state
<TransactionTable transactions={[]} />

// Renders: "No transactions yet" message`,
          language: 'tsx',
        },
      ]}
      accessibility={[
        'Color-coded amounts (red for deductions, green for additions)',
        'Type-specific icons for quick recognition',
        'Timestamps for chronological context',
        'Endpoint display for debugging/transparency',
      ]}
      previous={{
        title: 'Credit Usage Chart',
        href: '/docs/components/credit-usage-chart',
      }}
      next={{ title: 'Overview', href: '/docs/components/overview' }}
    />
  );
}
