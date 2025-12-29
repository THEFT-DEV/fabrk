/**
 * Account Pages Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory } from '../library-data';

const categoryId = 'account';
const categoryTemplates = getTemplatesByCategory(categoryId);

// Strip icon functions for client component serialization
const serializableTemplates = categoryTemplates.map(({ icon: _icon, ...rest }) => rest);

const features = [
  'Settings page with tabbed navigation and forms',
  'Billing dashboard with invoice history',
  'Security settings with 2FA and session management',
  'Profile editing with avatar upload',
  'Subscription management and plan upgrades',
  'GDPR compliance and data export controls',
];

export default function AccountPagesPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="ACCOUNT PAGES"
      title="Account Pages"
      description="User settings, billing, security, and profile management"
      templates={serializableTemplates}
      features={features}
    />
  );
}
