/**
 * FABRK COMPONENT
 * Notification types and utilities
 */

import { Bell, Check, Info, AlertTriangle, AlertCircle, MessageSquare } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Deployment Complete',
    message: 'Your application was successfully deployed to production.',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storage Warning',
    message: "You're using 85% of your storage quota. Consider upgrading.",
    timestamp: '15 minutes ago',
    read: false,
    actionUrl: '/settings/billing',
  },
  {
    id: '3',
    type: 'info',
    title: 'New Feature Available',
    message: 'Check out our new analytics dashboard with real-time metrics.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'message',
    title: 'New Comment',
    message: 'Sarah left a comment on your project: "Looking great!"',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'error',
    title: 'Build Failed',
    message: 'Build #1234 failed due to type errors. Check logs for details.',
    timestamp: '3 hours ago',
    read: true,
    actionUrl: '/builds/1234',
  },
  {
    id: '6',
    type: 'info',
    title: 'Team Invitation',
    message: 'You\'ve been invited to join the "Fabrk Core" team.',
    timestamp: '5 hours ago',
    read: true,
    actionUrl: '/teams/invites',
  },
  {
    id: '7',
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $29.00 for Pro plan has been processed.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '8',
    type: 'warning',
    title: 'SSL Certificate Expiring',
    message: 'Your SSL certificate expires in 7 days. Renew now.',
    timestamp: '2 days ago',
    read: true,
    actionUrl: '/settings/domains',
  },
];

export const getTypeIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return Info;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return AlertCircle;
    case 'success':
      return Check;
    case 'message':
      return MessageSquare;
    default:
      return Bell;
  }
};

export const getTypeColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'text-primary';
    case 'warning':
      return 'text-warning';
    case 'error':
      return 'text-destructive';
    case 'success':
      return 'text-success';
    case 'message':
      return 'text-muted-foreground';
    default:
      return 'text-foreground';
  }
};
