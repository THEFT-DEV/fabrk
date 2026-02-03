import dotenv from "dotenv";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

// Load .env.local first (local dev secrets), then .env as fallback
dotenv.config({ path: ".env.local" });
dotenv.config();

/**
 * Prisma 7 Configuration
 * The database URL is now configured here for Prisma Migrate
 * instead of in the schema.prisma file
 */
export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma", "migrations"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
