import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { FileText, Search, Bell, Database } from 'lucide-react';
import {
  DatabaseSchemaSection,
  AuditServiceSection,
  UsageExamplesSection,
  QueryingLogsSection,
  LogRetentionSection,
  SecurityAlertsSection,
} from './components';

export const metadata = {
  title: 'Audit Logging - Fabrk Docs',
  description:
    'Track user actions for compliance. Immutable audit trail with 18+ event types and admin viewer.',
};

export default function AuditLoggingPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Audit Logging"
      description="Track security-relevant events and user actions for compliance and debugging."
      overview="Audit logging creates an immutable record of security-relevant events. Track logins, payments, admin actions, and more for compliance requirements and security investigations."
      features={[
        {
          icon: Database,
          title: 'Persistent Storage',
          description: 'Database-backed audit log storage.',
        },
        {
          icon: FileText,
          title: 'Event Types',
          description: '18+ pre-defined security event types.',
        },
        {
          icon: Search,
          title: 'Searchable',
          description: 'Filter by user, action, category, and date.',
        },
        {
          icon: Bell,
          title: 'Alerts',
          description: 'Send alerts for critical security events.',
        },
      ]}
      usage={[
        DatabaseSchemaSection(),
        AuditServiceSection(),
        UsageExamplesSection(),
        QueryingLogsSection(),
        LogRetentionSection(),
        SecurityAlertsSection(),
      ]}
      previous={{
        title: 'Rate Limiting',
        href: '/docs/security/rate-limiting',
      }}
      next={{ title: 'CSRF Protection', href: '/docs/security/csrf' }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/validation"
            title="Schema Validation"
            description="Validate all inputs with Zod"
          />
          <DocsLinkCard
            href="/docs/deployment/database"
            title="Database Setup"
            description="Set up production database"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
