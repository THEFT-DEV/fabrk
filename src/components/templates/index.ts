/**
 * FABRK Template Components
 * Standard components for template showcase pages
 */

// Showcase components
export { TemplateShowcase } from './template-showcase';
export { TemplateCategoryPage } from './template-category-page';

// Page templates
export { AuthPageTemplate } from './auth-page-template';
export type { AuthPageTemplateProps, AuthField } from './auth-page-template';
export { ListPageTemplate } from './list-page-template';
export type { ListPageTemplateProps, ListPageEmptyState } from './list-page-template';
export { DashboardPageTemplate } from './dashboard-page-template';
export type {
  DashboardPageTemplateProps,
  DashboardStat,
  DashboardAction,
} from './dashboard-page-template';
export { DetailPageTemplate } from './detail-page-template';
export type {
  DetailPageTemplateProps,
  DetailBreadcrumb,
  DetailAction,
  DetailTab,
  DetailMetadata,
} from './detail-page-template';
export { SettingsPageTemplate, SettingsSectionCard } from './settings-page-template';
export type {
  SettingsPageTemplateProps,
  SettingsSection,
  SettingsSectionCardProps,
} from './settings-page-template';
export { LegalPageTemplate, LegalSection } from './legal-page-template';
export type { LegalPageTemplateProps, LegalSectionProps } from './legal-page-template';
export { UtilityPageTemplate } from './utility-page-template';
export type { UtilityPageTemplateProps, UtilityAction } from './utility-page-template';
