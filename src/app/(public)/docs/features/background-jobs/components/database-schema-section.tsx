export function DatabaseSchemaSection() {
  return {
    title: 'Database Schema',
    description: 'Job model in Prisma schema',
    code: `// prisma/schema.prisma
model Job {
  id          String   @id @default(cuid())
  queue       String   // "default", "email", "webhooks"
  type        String   // Job type identifier
  payload     Json     // Job data

  status      String   @default("pending") // pending, processing, completed, failed
  priority    Int      @default(0)

  attempts    Int      @default(0)
  maxAttempts Int      @default(3)

  error       String?  // Last error message
  result      Json?    // Job result

  runAt       DateTime @default(now())
  startedAt   DateTime?
  completedAt DateTime?

  createdAt   DateTime @default(now())

  @@index([queue, status, runAt])
  @@index([status, runAt])
}`,
    language: 'prisma',
  };
}
