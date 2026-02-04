import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * Prisma client singleton
 * Prevents multiple instances in development
 * Uses the new Prisma 7 adapter pattern for database connections
 *
 * Note: Prisma 7 requires either an adapter or accelerateUrl.
 * If DATABASE_URL is not set, database operations will throw at runtime.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  // Prisma 7 requires an adapter - use a dummy pool that will fail at runtime
  // if DATABASE_URL is not set. This allows the app to build without a DB.
  const pool = new Pool({
    connectionString: connectionString || 'postgresql://localhost:5432/dummy',
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
