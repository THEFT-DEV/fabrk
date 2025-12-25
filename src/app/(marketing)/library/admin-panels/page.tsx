/**
 * Admin Panels Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory } from '../library-data';

const categoryId = 'admin';
const categoryTemplates = getTemplatesByCategory(categoryId);

// Strip icon functions for client component serialization
const serializableTemplates = categoryTemplates.map(({ icon: _icon, ...rest }) => rest);

const features = [
  'User management with role-based access control',
  'Invitation system with 7-day token expiry',
  'Organization switcher with multi-tenancy support',
  'Audit logs and activity tracking',
  'Data tables with sorting, filtering, and pagination',
  'Webhook management and delivery history',
];

export default function AdminPanelsPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="ADMIN PANELS"
      title="Admin Panels"
      description="Backend admin interfaces for user management, webhooks, and system monitoring"
      templates={serializableTemplates}
      features={features}
    />
  );
}
