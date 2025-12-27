/**
 * Database Seed Script
 *
 * ⚠️ BOILERPLATE NOTICE:
 * This file contains EXAMPLE seed data for development/testing purposes.
 *
 * BEFORE DEPLOYING TO PRODUCTION:
 * 1. Replace example users with your own admin accounts
 * 2. Update test data to match your business needs
 * 3. Remove or modify hardcoded passwords
 * 4. Adjust customer IDs, payment amounts, etc.
 *
 * TO RUN: npm run db:seed
 *
 * This seed script demonstrates:
 * - Creating users with different roles (admin, regular user)
 * - Different user states (verified, unverified, with reset token)
 * - Sample payment records for testing
 * - Example checkout sessions
 *
 * Customize this file to match your application's data model.
 */

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

// Create Prisma client with PostgreSQL adapter for seeding
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding");
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");
  console.log("⚠️  WARNING: This creates EXAMPLE data for development/testing");
  console.log("   Customize this seed file before using in production!");

  // Clear existing data (development only!)
  if (process.env.NODE_ENV === "development") {
    console.log("🗑️  Clearing existing data...");
    await prisma.payment.deleteMany();
    await prisma.checkoutSession.deleteMany();
    await prisma.webhookEvent.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
  }

  // Create EXAMPLE test users (replace with your own data!)
  console.log("👤 Creating EXAMPLE test users...");

  const hashedPassword = await bcrypt.hash("password123", 12);

  // Admin user
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@fabrk.dev",
      password: hashedPassword,
      emailVerified: new Date(),
      role: "ADMIN",
      customerId: "cus_test_admin",
    },
  });

  // Regular verified user
  const verifiedUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      emailVerified: new Date(),
      role: "USER",
      customerId: "cus_test_john",
    },
  });

  // Unverified user
  const unverifiedUser = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: hashedPassword,
      emailVerified: null, // Not verified
      role: "USER",
      verifyToken: "test-verify-token-123",
    },
  });

  // User with reset token
  await prisma.user.create({
    data: {
      name: "Bob Johnson",
      email: "bob@example.com",
      password: hashedPassword,
      emailVerified: new Date(),
      role: "USER",
      resetToken: "test-reset-token-456",
      resetExpires: new Date(Date.now() + 3600000), // 1 hour from now
    },
  });

  console.log("✅ Created 4 test users:");
  console.log("   - admin@fabrk.dev (Admin, password: password123)");
  console.log("   - john@example.com (Verified, password: password123)");
  console.log("   - jane@example.com (Unverified, password: password123)");
  console.log("   - bob@example.com (With reset token, password: password123)");

  // Create sample payments
  console.log("💳 Creating sample payments...");

  await prisma.payment.create({
    data: {
      userId: verifiedUser.id,
      stripeId: "pi_test_123456",
      amount: 7900, // $79.00
      status: "succeeded",
      productId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "price_test",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
  });

  await prisma.payment.create({
    data: {
      userId: admin.id,
      stripeId: "pi_test_789012",
      amount: 4900, // $49.00
      status: "succeeded",
      productId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "price_test",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
  });

  // Failed payment
  await prisma.payment.create({
    data: {
      userId: verifiedUser.id,
      stripeId: "pi_test_failed",
      amount: 29900, // $299.00
      status: "failed",
      productId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "price_test",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  });

  console.log("✅ Created 3 sample payments (2 succeeded, 1 failed)");

  // Create checkout sessions
  console.log("🛒 Creating checkout sessions...");

  await prisma.checkoutSession.create({
    data: {
      userId: verifiedUser.id,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "price_test",
      sessionId: "cs_test_session_123",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  });

  // Expired checkout session
  await prisma.checkoutSession.create({
    data: {
      userId: unverifiedUser.id,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "price_test",
      sessionId: "cs_test_session_expired",
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired yesterday
    },
  });

  console.log("✅ Created 2 checkout sessions (1 active, 1 expired)");

  // Create webhook events (for idempotency testing)
  console.log("🪝 Creating webhook events...");

  await prisma.webhookEvent.createMany({
    data: [
      {
        eventId: "evt_test_123",
      },
      {
        eventId: "evt_test_456",
      },
      {
        eventId: "evt_test_789",
      },
    ],
  });

  console.log("✅ Created 3 webhook events");

  console.log("\n🎉 Database seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: ${await prisma.user.count()}`);
  console.log(`   - Payments: ${await prisma.payment.count()}`);
  console.log(`   - Checkout Sessions: ${await prisma.checkoutSession.count()}`);
  console.log(`   - Webhook Events: ${await prisma.webhookEvent.count()}`);

  console.log("\n🔐 Test Accounts:");
  console.log("   Admin:    admin@fabrk.dev / password123");
  console.log("   User:     john@example.com / password123");
  console.log("   Unverified: jane@example.com / password123");
  console.log("   Reset:    bob@example.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
