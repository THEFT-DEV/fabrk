/**
 * Dashboard Types
 * Shared type definitions for dashboard components
 */

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  activeUsers: number;
  usersChange: number;
  totalUploads: number;
  uploadsChange: number;
  storageUsed: number;
  storageLimit: number;
}

export interface ActivityItem {
  id: string;
  type: 'login' | 'upload' | 'payment' | 'setting' | 'security';
  description: string;
  timestamp: Date;
}
