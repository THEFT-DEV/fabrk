export function WorkerImplementationSection() {
  return {
    title: 'Worker Implementation',
    description: 'Create workers to process jobs',
    code: `// scripts/worker.ts
import { getNextJob, completeJob, failJob } from "@/lib/jobs/queue";

// Job handlers
const handlers: Record<string, (payload: any) => Promise<any>> = {
  "send-welcome-email": async (payload) => {
    const { userId, email } = payload;
    await sendWelcomeEmail(email);
    return { sent: true };
  },

  "process-payment": async (payload) => {
    const { paymentId } = payload;
    // Process payment logic...
    return { processed: true };
  },

  "generate-report": async (payload) => {
    const { userId, reportType } = payload;
    // Generate report logic...
    return { reportUrl: "/reports/123.pdf" };
  },

  "webhook-delivery": async (payload) => {
    const { webhookId, event, data } = payload;
    // Deliver webhook logic...
    return { delivered: true };
  },
};

async function processJobs(queue: string = "default") {


  while (true) {
    const job = await getNextJob(queue);

    if (!job) {
      // No jobs, wait before polling again
      await sleep(1000);
      continue;
    }



    try {
      const handler = handlers[job.type];

      if (!handler) {
        throw new Error(\`Unknown job type: \${job.type}\`);
      }

      const result = await handler(job.payload);
      await completeJob(job.id, result);


    } catch (_) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await failJob(job.id, message);

      console.error(\`Failed job \${job.id}: \${message}\`);
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start worker
processJobs(process.env.QUEUE || "default");`,
    language: 'typescript',
  };
}
