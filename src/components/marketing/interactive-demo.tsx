/**
 * ✅ FABRK COMPONENT
 * Interactive Demo - Tabbed preview of dashboards, data tables, and settings
 * Production-ready ✓
 */

'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const DEMO_ROUTES = [
  { id: 'team', label: 'Team Dashboard', path: '/library/team-dashboard' },
  { id: 'analytics', label: 'Analytics', path: '/library/analytics-dashboard' },
  { id: 'users', label: 'Data Table', path: '/library/user-management' },
  { id: 'settings', label: 'Settings', path: '/library/settings-page' },
];

export function InteractiveDemo() {
  return (
    <section className="border-border bg-background border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className={cn('text-center', mode.font)}>
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2 className={cn('mb-4 text-2xl font-semibold tracking-tight', mode.font)}>
              LIVE DEMO EXPLORE TEMPLATES
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
              &gt; See production-ready dashboards, data tables, and settings pages. Click tabs to
              explore.
            </p>
          </div>

          {/* Tabbed Demo */}
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList>
              {DEMO_ROUTES.map((route) => (
                <TabsTrigger key={route.id} value={route.id}>
                  {route.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Demo Container */}
            <Card className="overflow-hidden">
              {DEMO_ROUTES.map((route) => (
                <TabsContent key={route.id} value={route.id} className="m-0">
                  <iframe
                    src={route.path}
                    className="h-[700px] w-full border-0"
                    title={route.label}
                  />
                </TabsContent>
              ))}
            </Card>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader title="INFO" />
                <CardContent>
                  <p className="text-foreground text-xs">
                    <span className="text-primary font-semibold">[FULLY INTERACTIVE]</span> All
                    dashboards and tables are fully functional. Sort columns, filter data, toggle
                    settings, and explore the full UX. These are the exact templates included in
                    Fabrk.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
