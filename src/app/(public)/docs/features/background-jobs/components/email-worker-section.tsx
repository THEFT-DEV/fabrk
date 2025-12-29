export function EmailWorkerSection() {
  return {
    title: 'Email Worker',
    description: 'Dedicated worker for processing email queue',
    code: `// scripts/email-worker.ts
import { Resend } from "resend";
import { getNextJob, completeJob, failJob } from "@/lib/jobs/queue";
import { WelcomeEmail } from "@/emails/welcome";
import { PasswordResetEmail } from "@/emails/password-reset";
import { InvoiceEmail } from "@/emails/invoice";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplates: Record<string, React.ComponentType<any>> = {
  welcome: WelcomeEmail,
  "password-reset": PasswordResetEmail,
  invoice: InvoiceEmail,
};

async function processEmailQueue() {


  while (true) {
    const job = await getNextJob("email");

    if (!job) {
      await sleep(1000);
      continue;
    }

    const { template, to, subject, props } = job.payload;

    try {
      const EmailTemplate = emailTemplates[template];

      if (!EmailTemplate) {
        throw new Error(\`Unknown email template: \${template}\`);
      }

      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to,
        subject,
        react: EmailTemplate(props),
      });

      if (error) {
        throw new Error(error.message);
      }

      await completeJob(job.id, { emailId: data?.id });

    } catch (_) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await failJob(job.id, message);
      console.error(\`Failed to send email: \${message}\`);
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

processEmailQueue();`,
    language: 'typescript',
  };
}
