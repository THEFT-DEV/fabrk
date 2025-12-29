import { DocsSection, DocsCard } from '@/components/docs';

export function BestPracticesSection() {
  return (
    <DocsSection title="Best Practices">
      <DocsCard title="BEST PRACTICES">
        <ul className="space-y-1">
          <li>
            ├─ <strong>Keep payloads small:</strong> Store IDs and fetch data in the worker
          </li>
          <li>
            ├─ <strong>Make jobs idempotent:</strong> Safe to retry without side effects
          </li>
          <li>
            ├─ <strong>Set appropriate retries:</strong> More for transient errors, fewer for
            permanent
          </li>
          <li>
            ├─ <strong>Monitor queue depth:</strong> Alert when jobs are backing up
          </li>
          <li>
            ├─ <strong>Use separate queues:</strong> Isolate critical jobs from bulk operations
          </li>
          <li>
            ├─ <strong>Log everything:</strong> Track job lifecycle for debugging
          </li>
          <li>
            ├─ <strong>Handle timeouts:</strong> Set reasonable timeouts for long-running jobs
          </li>
          <li>
            └─ <strong>Clean up completed jobs:</strong> Archive or delete old jobs periodically
          </li>
        </ul>
      </DocsCard>
    </DocsSection>
  );
}
