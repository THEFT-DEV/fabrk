export function JobQueueServiceSection() {
  return {
    title: 'Job Queue Service',
    description: 'Core service for managing job queues',
    code: `// src/lib/jobs/queue.ts
import { prisma } from "@/lib/db";

interface JobOptions {
  queue?: string;
  priority?: number;
  delay?: number; // milliseconds
  maxAttempts?: number;
}

export async function enqueueJob(
  type: string,
  payload: Record<string, any>,
  options: JobOptions = {}
) {
  const {
    queue = "default",
    priority = 0,
    delay = 0,
    maxAttempts = 3,
  } = options;

  const runAt = new Date(Date.now() + delay);

  const job = await prisma.job.create({
    data: {
      queue,
      type,
      payload,
      priority,
      maxAttempts,
      runAt,
    },
  });

  return job;
}

export async function getNextJob(queue: string = "default") {
  // Get the next pending job that's ready to run
  const job = await prisma.job.findFirst({
    where: {
      queue,
      status: "pending",
      runAt: { lte: new Date() },
    },
    orderBy: [
      { priority: "desc" },
      { createdAt: "asc" },
    ],
  });

  if (!job) return null;

  // Mark as processing
  return prisma.job.update({
    where: { id: job.id },
    data: {
      status: "processing",
      startedAt: new Date(),
      attempts: { increment: 1 },
    },
  });
}

export async function completeJob(
  jobId: string,
  result?: Record<string, any>
) {
  return prisma.job.update({
    where: { id: jobId },
    data: {
      status: "completed",
      completedAt: new Date(),
      result,
    },
  });
}

export async function failJob(
  jobId: string,
  error: string
) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) return;

  // Check if we should retry
  if (job.attempts < job.maxAttempts) {
    // Exponential backoff: 1min, 2min, 4min...
    const delay = Math.pow(2, job.attempts) * 60 * 1000;

    return prisma.job.update({
      where: { id: jobId },
      data: {
        status: "pending",
        runAt: new Date(Date.now() + delay),
        error,
      },
    });
  }

  // Max retries exceeded
  return prisma.job.update({
    where: { id: jobId },
    data: {
      status: "failed",
      error,
    },
  });
}`,
    language: 'typescript',
  };
}
