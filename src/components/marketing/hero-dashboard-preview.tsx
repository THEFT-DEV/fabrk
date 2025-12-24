/**
 * Hero Dashboard Preview
 * Simplified terminal-style proof component
 */
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { COMPONENT_COUNT_STRING, TEMPLATE_COUNT_STRING } from '@/data/landing/stats';

const stats = [
  { label: 'COMPONENTS', value: COMPONENT_COUNT_STRING, status: 'READY' },
  { label: 'TEMPLATES', value: TEMPLATE_COUNT_STRING, status: 'READY' },
  { label: 'SETUP_TIME', value: '< 5 MIN', status: 'FAST' },
];

export function HeroDashboardPreview() {
  return (
    <Card size="auto">
      <CardHeader code="0x04" title="SYSTEM STATUS.LOG" />
      <CardContent className="space-y-4 p-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-primary flex items-center border-l-2 pl-3">
            <div className="flex-1">
              <span className={cn('text-xs', mode.color.text.muted, mode.font)}>{stat.label}:</span>
              <span className={cn('ml-2 text-sm font-bold text-primary', mode.font)}>
                {stat.value}
              </span>
            </div>
            <span className={cn('text-xs', mode.color.text.success, mode.font)}>
              [{stat.status}]
            </span>
          </div>
        ))}

        <div className="border-primary mt-4 border-t pt-3">
          <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
            <span className="text-primary">▸</span> AUTH, BILLING, DASHBOARD
          </div>
          <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
            <span className="text-primary">▸</span> PAYMENTS, EMAIL, STORAGE
          </div>
          <div className={cn('text-xs', mode.color.text.success, mode.font)}>
            <span>▸</span> ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
