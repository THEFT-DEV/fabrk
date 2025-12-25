export function QueueingJobsSection() {
  return {
    title: 'Queueing Jobs',
    description: 'Queue jobs from your API routes',
    code: `// In API routes
import { enqueueJob } from "@/lib/jobs/queue";

// Queue an email
export async function POST(req: Request) {
  const { email, name } = await req.json();

  // Create user...
  const user = await prisma.user.create({ ... });

  // Queue welcome email (processed by email worker)
  await enqueueJob(
    "send-email",
    {
      template: "welcome",
      to: email,
      subject: "Welcome to Fabrk!",
      props: { name },
    },
    { queue: "email" }
  );

  return Response.json({ user });
}

// Queue a report with delay
await enqueueJob(
  "generate-report",
  {
    userId: user.id,
    reportType: "monthly",
  },
  {
    queue: "default",
    delay: 5000, // Wait 5 seconds
    priority: 10, // Higher priority
  }
);

// Queue webhook delivery
await enqueueJob(
  "webhook-delivery",
  {
    webhookId: webhook.id,
    event: "user.created",
    data: { userId: user.id },
  },
  {
    queue: "webhooks",
    maxAttempts: 5,
  }
);`,
    language: 'typescript',
  };
}
