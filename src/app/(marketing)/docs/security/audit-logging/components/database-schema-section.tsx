export function DatabaseSchemaSection() {
  return {
    title: 'Database Schema',
    description: 'The AuditLog model in Prisma',
    code: `// prisma/schema.prisma

model AuditLog {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())

  // Event details
  action      String   // e.g., "user.login", "payment.created"
  category    String   // e.g., "auth", "billing", "admin"
  severity    String   @default("info") // info, warning, error, critical

  // Actor information
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  actorType   String   @default("user") // user, system, api

  // Context
  ipAddress   String?
  userAgent   String?

  // Event data
  targetType  String?  // e.g., "user", "organization", "payment"
  targetId    String?
  metadata    Json?    // Additional event-specific data

  // Result
  status      String   @default("success") // success, failure
  errorMessage String?

  @@index([userId])
  @@index([action])
  @@index([category])
  @@index([createdAt])
}`,
    language: 'prisma' as const,
  };
}
