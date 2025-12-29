/**
 * Error page configurations
 * Extracted from page.tsx for maintainability
 */
import {
  LucideIcon,
  AlertTriangle,
  Lock,
  ShieldX,
  FileQuestion,
  Clock,
  ServerCrash,
  Wifi,
  Construction,
  Timer,
} from 'lucide-react';

export interface ErrorConfig {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  terminal: string[];
  actions: string[];
  color: 'destructive' | 'warning';
}

export const errorConfigs: Record<string, ErrorConfig> = {
  error: {
    code: 'ERROR',
    title: 'Something Went Wrong',
    description:
      "We're sorry, but something unexpected happened. This error has been logged and we're looking into it.",
    icon: AlertTriangle,
    terminal: [
      '$ process.run --component=App',
      'STATUS: EXCEPTION CAUGHT',
      'TYPE: RuntimeError',
      '',
      'ERROR: Unexpected application error',
      'DIGEST: err_1921274745',
      'LOGGED: true',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'destructive',
  },
  '401': {
    code: '401',
    title: 'Unauthorized',
    description: 'You need to sign in to access this page.',
    icon: Lock,
    terminal: [
      '$ curl -I https://fabrk.ai/dashboard',
      'HTTP/1.1 401 Unauthorized',
      'WWW-Authenticate: Bearer',
      '',
      'ERROR: Authentication required',
      'REASON: No valid session token',
      'REDIRECT: /sign-in',
    ],
    actions: ['SIGN IN', 'GO HOME'],
    color: 'destructive',
  },
  '403': {
    code: '403',
    title: 'Access Denied',
    description: "You don't have permission to access this resource.",
    icon: ShieldX,
    terminal: [
      '$ fabrk access --resource=/admin',
      'USER: user@example.com',
      'ROLE: member',
      'REQUIRED: admin',
      '',
      'ERROR: Insufficient permissions',
      'ACTION: Contact administrator',
    ],
    actions: ['GO BACK', 'GO HOME'],
    color: 'destructive',
  },
  '404': {
    code: '404',
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    icon: FileQuestion,
    terminal: [
      '$ curl -I https://fabrk.ai/unknown-page',
      'HTTP/1.1 404 Not Found',
      'Content-Type: text/html',
      'X-Request-ID: abc123',
      '',
      'ERROR: Resource not found in database',
      'PATH: /unknown-page',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['GO HOME', 'GO BACK'],
    color: 'destructive',
  },
  '429': {
    code: '429',
    title: 'Too Many Requests',
    description: "You've made too many requests. Please wait before trying again.",
    icon: Clock,
    terminal: [
      '$ fabrk api --endpoint=/users',
      'RATE_LIMIT: 100 req/min',
      'CURRENT: 127 req/min',
      'RETRY_AFTER: 45 seconds',
      '',
      'ERROR: Rate limit exceeded',
      'COOLDOWN: 00:00:45',
    ],
    actions: ['WAIT', 'GO HOME'],
    color: 'warning',
  },
  '500': {
    code: '500',
    title: 'Server Error',
    description: "Something went wrong on our end. We're working to fix it.",
    icon: ServerCrash,
    terminal: [
      '$ systemctl status fabrk-api',
      '● fabrk-api.service - Fabrk API Server',
      '   Status: ERROR',
      '   Memory: 512MB',
      '',
      'ERROR: Internal server exception',
      'TRACE: DatabaseConnectionError',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'destructive',
  },
  '502': {
    code: '502',
    title: 'Bad Gateway',
    description: 'The server received an invalid response from an upstream server.',
    icon: Wifi,
    terminal: [
      '$ fabrk health --upstream',
      'GATEWAY: nginx/1.24.0',
      'UPSTREAM: api.fabrk.ai:8080',
      'RESPONSE: Invalid',
      '',
      'ERROR: Bad gateway response',
      'UPSTREAM_STATUS: Connection refused',
    ],
    actions: ['TRY AGAIN', 'STATUS PAGE'],
    color: 'destructive',
  },
  '503': {
    code: '503',
    title: 'Under Maintenance',
    description: "We're performing scheduled maintenance. Be back soon!",
    icon: Construction,
    terminal: [
      '$ fabrk status',
      'SERVICE: maintenance_mode=true',
      'DOWNTIME: ~30 minutes',
      'REASON: Database migration',
      '',
      'SCHEDULED: 2024-11-12T14:00:00Z',
      'ESTIMATED_END: 2024-11-12T14:30:00Z',
      'STATUS: IN PROGRESS',
    ],
    actions: ['REFRESH', 'STATUS PAGE'],
    color: 'warning',
  },
  '504': {
    code: '504',
    title: 'Gateway Timeout',
    description: 'The server took too long to respond. Please try again.',
    icon: Timer,
    terminal: [
      '$ fabrk request --timeout=30s',
      'ENDPOINT: /api/export',
      'TIMEOUT: 30000ms',
      'ELAPSED: 30001ms',
      '',
      'ERROR: Gateway timeout exceeded',
      'SUGGESTION: Retry with smaller payload',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'warning',
  },
};

export const errorTypes = [
  'error',
  '401',
  '403',
  '404',
  '429',
  '500',
  '502',
  '503',
  '504',
] as const;
export type ErrorType = (typeof errorTypes)[number];

export const errorTitles: Record<ErrorType, string> = {
  error: 'GENERIC_ERROR',
  '401': '401_UNAUTHORIZED',
  '403': '403_FORBIDDEN',
  '404': '404_NOT_FOUND',
  '429': '429_RATE_LIMIT',
  '500': '500_SERVER_ERROR',
  '502': '502_BAD_GATEWAY',
  '503': '503_MAINTENANCE',
  '504': '504_GATEWAY_TIMEOUT',
};

export const fileStructures: Record<string, { path: string; label: string }> = {
  error: { path: 'app/error.tsx', label: '← Generic errors' },
  '401': { path: 'app/(auth)/unauthorized/page.tsx', label: '← Auth required' },
  '403': { path: 'app/(auth)/forbidden/page.tsx', label: '← Access denied' },
  '404': { path: 'app/not-found.tsx', label: '← 404 errors' },
  '429': { path: 'app/api/error.tsx', label: '← Rate limit' },
  '500': { path: 'app/error.tsx', label: '← Server errors' },
  '502': { path: 'app/error.tsx', label: '← Gateway errors' },
  '503': { path: 'app/maintenance/page.tsx', label: '← Maintenance mode' },
  '504': { path: 'app/error.tsx', label: '← Timeout errors' },
};

export const features = [
  'Generic error page template',
  '401 Unauthorized page',
  '403 Access Denied page',
  '404 Not Found page',
  '429 Rate Limit page',
  '500 Server Error page',
  '502 Bad Gateway page',
  '503 Maintenance mode page',
  '504 Gateway Timeout page',
  'Terminal-style error output',
  'Contextual action buttons',
  'Request ID for debugging',
  'Color-coded severity (error vs warning)',
];
