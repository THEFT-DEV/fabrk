/**
 * Dashboards Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory } from '../library-data';

const categoryId = 'dashboard';
const categoryTemplates = getTemplatesByCategory(categoryId);

// Strip icon functions for client component serialization
const serializableTemplates = categoryTemplates.map(({ icon: _icon, ...rest }) => rest);

const features = [
  'Analytics Dashboard with charts and metrics',
  'Team Dashboard for collaboration and task tracking',
  'Billing Dashboard for subscription management',
  'Real-time data visualization and reporting',
  'Responsive grid layouts with tabbed sections',
  'Activity feeds and user interaction tracking',
];

export default function DashboardsPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="DASHBOARDS"
      title="Dashboards"
      description="Data visualization, metrics, and reporting templates"
      templates={serializableTemplates}
      features={features}
    />
  );
}
