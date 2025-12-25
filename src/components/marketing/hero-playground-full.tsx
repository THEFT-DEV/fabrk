/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout with REAL component examples
 *
 * Components split into smaller files for maintainability:
 * - playground/browser-frame.tsx - Browser chrome wrapper
 * - playground/left-navigation.tsx - Sidebar navigation
 * - playground/components-grid.tsx - 4-column component showcase
 * - playground/dashboard-preview.tsx - Analytics dashboard demo
 * - playground/table-preview.tsx - User management table demo
 * - playground/profile-preview.tsx - Profile page demo
 * - playground/mock-data.ts - All mock data
 */
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ComponentsGrid, DashboardPreview, TablePreview, ProfilePreview } from './playground';

export function HeroPlaygroundFull() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Header with tabs */}
          <div className="mb-8">
            <TabsList className="bg-transparent">
              <TabsTrigger value="components">COMPONENTS</TabsTrigger>
              <TabsTrigger value="dashboard">DASHBOARD</TabsTrigger>
              <TabsTrigger value="table">TABLE</TabsTrigger>
              <TabsTrigger value="profile">PROFILE</TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content - TabsContent handles aria relationships */}
          <TabsContent value="components">
            <ComponentsGrid />
          </TabsContent>
          <TabsContent value="dashboard">
            <DashboardPreview />
          </TabsContent>
          <TabsContent value="table">
            <TablePreview />
          </TabsContent>
          <TabsContent value="profile">
            <ProfilePreview />
          </TabsContent>
      </Tabs>
    </div>
  );
}
