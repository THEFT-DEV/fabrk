import { FeatureGuideTemplate } from '@/components/docs';
import { Clock, RefreshCw, Mail, Database } from 'lucide-react';
import {
  DatabaseSchemaSection,
  JobQueueServiceSection,
  WorkerImplementationSection,
  EmailWorkerSection,
  QueueingJobsSection,
  RunningWorkersSection,
  BestPracticesSection,
} from './components';

export const metadata = {
  title: 'Background Jobs - Fabrk Documentation',
  description:
    'Learn how to implement background job processing with queues, workers, and the email worker system.',
};

export default function BackgroundJobsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Features"
      title="Background Jobs"
      description="Process time-consuming tasks asynchronously with job queues, workers, and the email worker system."
      overview="Background jobs allow you to offload time-consuming tasks from your API routes to dedicated workers. This improves response times and provides better reliability with automatic retries and error handling."
      features={[
        {
          icon: Database,
          title: 'Job Queues',
          description: 'Persistent queue with priority support for organizing tasks.',
        },
        {
          icon: RefreshCw,
          title: 'Workers',
          description: 'Process jobs asynchronously with dedicated worker processes.',
        },
        {
          icon: Mail,
          title: 'Email Worker',
          description: 'Dedicated email sending queue with template support.',
        },
        {
          icon: Clock,
          title: 'Retries',
          description: 'Automatic retry with exponential backoff on failures.',
        },
      ]}
      usage={[
        DatabaseSchemaSection(),
        JobQueueServiceSection(),
        WorkerImplementationSection(),
        EmailWorkerSection(),
        QueueingJobsSection(),
        RunningWorkersSection(),
      ]}
      previous={{ title: 'Realtime', href: '/docs/features/realtime' }}
      next={{ title: 'Analytics', href: '/docs/features/analytics' }}
    >
      <BestPracticesSection />
    </FeatureGuideTemplate>
  );
}
