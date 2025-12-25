/**
 * Components Grid - Column 1: Alerts, Tabs, Accordion, File Upload, Search
 */
'use client';

import { Search, Upload, Info, AlertTriangle, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GridColumnOne() {
  return (
    <div className="space-y-4">
      {/* Alerts - NO CARD, direct background */}
      <Alert className={cn('border-l-4', mode.color.border.accent)}>
        <Info className="h-4 w-4" />
        <AlertTitle className="text-xs font-semibold">[INFO]</AlertTitle>
        <AlertDescription className="text-xs">New features available in v2.0</AlertDescription>
      </Alert>

      <Alert variant="destructive" className={cn('border-l-4', mode.color.border.danger)}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-xs font-semibold">[ERROR]</AlertTitle>
        <AlertDescription className="text-xs">Failed to connect to server</AlertDescription>
      </Alert>

      {/* Tabs */}
      <Card>
        <div className="p-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 text-xs">
              <p>Performance metrics and key insights.</p>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4 text-xs">
              <p>Detailed analytics data and trends.</p>
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* File Upload - NO CARD, just border */}
      <div className={cn('flex flex-col items-center justify-center border-2 border-dashed p-8', mode.color.border.default, mode.color.bg.mutedSubtle)}>
        <Upload className="text-muted-foreground mb-4 h-12 w-12" />
        <p className="mb-1 text-xs font-semibold">[DROP FILES HERE]</p>
        <p className="text-muted-foreground text-xs">or click to browse</p>
      </div>

      {/* Accordion */}
      <Card>
        <div className="p-4">
          <h2 className="sr-only">Documentation Sections</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xs">Getting Started</AccordionTrigger>
              <AccordionContent className="text-xs">
                Quick start guide for new users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xs">API Reference</AccordionTrigger>
              <AccordionContent className="text-xs">Complete API documentation.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>

      {/* Search with Results */}
      <Card>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Search..." className="pl-9 text-xs" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <FileText className="text-muted-foreground h-4 w-4" />
              <span>Documentation.pdf</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <FileText className="text-muted-foreground h-4 w-4" />
              <span>API-Guide.md</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
