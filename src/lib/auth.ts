/* 💡 AUTH TIP: This is the main NextAuth v5 configuration file.
 * Add new OAuth providers by importing from "next-auth/providers/..." and adding to providers[].
 * Configure callback URLs in your OAuth provider dashboard (e.g., Google Cloud Console).
 * Session settings and redirect paths can be customized in the callbacks section below.
 */
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

/**
 * NextAuth configuration
 * Keep under 100 lines following 300-line rule
 */

// Session version cache to avoid N+1 queries
const sessionVersionCache = new Map<string, { version: number; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 1000;

function getCachedSessionVersion(userId: string): number | null {
  const cached = sessionVersionCache.get(userId);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    sessionVersionCache.delete(userId);
    return null;
  }
  return cached.version;
}

function setCachedSessionVersion(userId: string, version: number) {
  if (sessionVersionCache.size >= MAX_CACHE_SIZE) {
    const entriesToDelete = Array.from(sessionVersionCache.keys()).slice(0, 100);
    entriesToDelete.forEach((key) => sessionVersionCache.delete(key));
  }
  sessionVersionCache.set(userId, { version, timestamp: Date.now() });
}

// Hash token using Web Crypto API (edge runtime compatible)
async function hashTokenWebCrypto(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const authConfig: NextAuthConfig = {
  // @ts-expect-error - Adapter version mismatch between @auth/core and next-auth
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        magicToken: { label: 'Magic Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        // Magic link authentication
        if (credentials.magicToken) {
          // Hash the incoming token to match stored hash (security: tokens are hashed in DB)
          const hashedToken = await hashTokenWebCrypto(credentials.magicToken as string);

          const magicToken = await prisma.verificationToken.findFirst({
            where: {
              identifier: credentials.email as string,
              token: hashedToken,
              expires: { gt: new Date() },
            },
          });

          if (!magicToken) {
            return null;
          }

          // Delete the used token (one-time use)
          await prisma.verificationToken.delete({
            where: { token: hashedToken },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // Regular password authentication
        if (!credentials.password || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account: _account }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
        // Fetch fresh user data for subscription info and session version
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            subscriptionTier: true,
            customerId: true,
            trialEndsAt: true,
            sessionVersion: true,
          },
        });
        if (dbUser) {
          token.subscriptionTier = dbUser.subscriptionTier;
          token.customerId = dbUser.customerId;
          token.trialEndsAt = dbUser.trialEndsAt;
          token.sessionVersion = dbUser.sessionVersion;
        }
      }

      // Verify session version on every request (invalidate if changed)
      if (token.id && token.sessionVersion) {
        // Check cache first to avoid N+1 query
        const cachedVersion = getCachedSessionVersion(token.id as string);

        if (cachedVersion !== null) {
          // Use cached version
          if (cachedVersion !== token.sessionVersion) {
            return null; // Session invalidated
          }
        } else {
          // Cache miss - query database and cache result
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { sessionVersion: true },
          });

          // If session version doesn't match, invalidate the token
          if (!dbUser || dbUser.sessionVersion !== token.sessionVersion) {
            return null; // This will log the user out
          }

          // Cache the version for future requests
          setCachedSessionVersion(token.id as string, dbUser.sessionVersion);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.subscriptionTier = token.subscriptionTier;
        session.user.customerId = token.customerId;
        session.user.trialEndsAt = token.trialEndsAt;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
