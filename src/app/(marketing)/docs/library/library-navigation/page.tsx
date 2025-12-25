import { ComponentShowcaseTemplate } from '@/components/docs';
import { LibraryNavigation } from '@/components/library';

export const metadata = {
  title: 'Library Navigation - Fabrk',
  description: 'Breadcrumb navigation component for library template pages',
};

const importCode = `import { LibraryNavigation } from '@/components/library';`;

const usageCode = `<LibraryNavigation
  templateName="User Management"
  category="Admin Panels"
  categoryHref="/library/admin-panels"
/>`;

const basicUsageCode = `<LibraryNavigation templateName="Analytics Dashboard" />`;

export default function LibraryNavigationPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LIB.01]"
      title="Library Navigation"
      description="Breadcrumb navigation with back button for library template pages"
      importCode={importCode}
      mainPreview={{
        preview: (
          <div className="bg-background p-6">
            <LibraryNavigation
              templateName="User Management"
              category="Admin Panels"
              categoryHref="/library/admin-panels"
            />
          </div>
        ),
        code: usageCode,
      }}
      variants={[
        {
          title: 'Basic (No Category)',
          preview: (
            <div className="bg-background p-6">
              <LibraryNavigation templateName="Analytics Dashboard" />
            </div>
          ),
          code: basicUsageCode,
        },
      ]}
      props={[
        {
          name: 'templateName',
          type: 'string',
          required: true,
          description: 'Name of the template (shown in breadcrumb)',
        },
        {
          name: 'category',
          type: 'string',
          description: 'Category name (e.g., "Admin Panels")',
        },
        {
          name: 'categoryHref',
          type: 'string',
          description: 'Link to category page (e.g., "/library/admin-panels")',
        },
      ]}
      accessibility={[
        'Automatically shows Home → Library → Category → Template breadcrumb',
        'Back button always links to /library',
        'Category and categoryHref must be provided together',
        'Template name is automatically uppercased in display',
        'Fully responsive with mobile layout',
      ]}
      previous={{ title: 'Input Search', href: '/docs/components/input-search' }}
      next={{ title: 'Related Templates', href: '/docs/components/related-templates' }}
    />
  );
}
