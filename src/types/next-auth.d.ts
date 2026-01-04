/**
 * TypeScript declarations for NextAuth
 * Extends NextAuth types to include custom user properties
 */

import { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

// Define Role type to match Prisma schema
type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

declare module 'next-auth' {
  interface User {
    role: Role;
    tier?: string | null;
    subscriptionTier?: string | null;
    customerId?: string | null;
    trialEndsAt?: Date | null;
    activeOrganizationId?: string | null;
    mfaEnabled?: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      tier?: string | null;
      subscriptionTier?: string | null;
      customerId?: string | null;
      trialEndsAt?: Date | null;
      activeOrganizationId?: string | null;
      mfaEnabled?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    tier?: string | null;
    subscriptionTier?: string | null;
    customerId?: string | null;
    trialEndsAt?: Date | null;
    activeOrganizationId?: string | null;
    mfaEnabled?: boolean;
    sessionVersion?: number;
  }
}
