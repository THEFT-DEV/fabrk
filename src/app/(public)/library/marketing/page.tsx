/**
 * Marketing Category Page
 * Uses CategoryShowcasePage template for consistent styling
 */
import { CategoryShowcasePage } from '@/components/library';
import { getTemplatesByCategory } from '../library-data';

const categoryId = 'marketing';
const categoryTemplates = getTemplatesByCategory(categoryId);

// Strip icon functions for client component serialization
const serializableTemplates = categoryTemplates.map(({ icon: _icon, ...rest }) => rest);

const features = [
  'Landing pages with hero sections',
  'Feature showcase sections with icons',
  'Testimonials and social proof',
  'Pricing tables with plan comparison',
  'Call-to-action sections and buttons',
  'Newsletter signup forms',
  'Footer with site navigation and links',
];

export default function MarketingPage() {
  return (
    <CategoryShowcasePage
      categoryId={categoryId}
      badge="MARKETING"
      title="Marketing Templates"
      description="Landing pages, pricing, blog, and marketing sections"
      templates={serializableTemplates}
      features={features}
    />
  );
}
