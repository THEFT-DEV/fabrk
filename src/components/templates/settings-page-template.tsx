/**
 * Settings Page Template
 *
 * Reusable template for settings pages with sidebar navigation.
 * Provides consistent layout with section navigation and content areas.
 *
 * @example
 * ```tsx
 * <SettingsPageTemplate
 *   title="Settings"
 *   sections={[
 *     { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
 *     { id: "security", label: "Security", icon: <Lock className="h-4 w-4" /> },
 *     { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
 *     { id: "danger", label: "Danger Zone", isDanger: true },
 *   ]}
 *   activeSection="general"
 *   onSectionChange={(id) => setActiveSection(id)}
 *   onSave={() => saveSettings()}
 * >
 *   {activeSection === "general" && <GeneralSettings />}
 *   {activeSection === "security" && <SecuritySettings />}
 * </SettingsPageTemplate>
 * ```
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Settings } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface SettingsSection {
  /** Unique identifier for the section */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether this is a danger zone section */
  isDanger?: boolean;
}

export interface SettingsPageTemplateProps {
  // Required
  /** Page title displayed in the header */
  title: string;
  /** Navigation sections */
  sections: SettingsSection[];
  /** Content for the active section */
  children: React.ReactNode;

  // Navigation state
  /** Currently active section ID */
  activeSection?: string;
  /** Section change handler */
  onSectionChange?: (sectionId: string) => void;

  // Actions
  /** Save handler */
  onSave?: () => void;
  /** Reset handler */
  onReset?: () => void;
  /** Custom save button label */
  saveLabel?: string;
  /** Whether save is in progress */
  saving?: boolean;

  // Description
  /** Optional description below the title */
  description?: string;

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// SIDEBAR NAVIGATION COMPONENT
// =============================================================================

interface SidebarNavProps {
  sections: SettingsSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

function SidebarNav({ sections, activeSection, onSectionChange }: SidebarNavProps) {
  const regularSections = sections.filter((s) => !s.isDanger);
  const dangerSections = sections.filter((s) => s.isDanger);

  return (
    <nav
      className={cn('border-border bg-card sticky top-6 h-fit w-64 shrink-0 border', mode.radius)}
    >
      {/* Regular Sections */}
      <div className="p-2">
        {regularSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange?.(section.id)}
            className={cn(
              'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors',
              mode.font,
              mode.radius,
              activeSection === section.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {section.icon || <Settings className="h-4 w-4" />}
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Danger Zone Divider */}
      {dangerSections.length > 0 && (
        <>
          <div className="border-border border-t" />
          <div className="p-2">
            {dangerSections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange?.(section.id)}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors',
                  mode.font,
                  mode.radius,
                  activeSection === section.id
                    ? 'bg-destructive text-destructive-foreground'
                    : 'text-destructive hover:bg-destructive/10'
                )}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SettingsPageTemplate({
  title,
  sections,
  children,
  activeSection,
  onSectionChange,
  onSave,
  onReset,
  saveLabel = 'Save Changes',
  saving = false,
  description,
  className,
}: SettingsPageTemplateProps) {
  // Default to first section if none specified
  const effectiveActiveSection = activeSection || sections[0]?.id;

  return (
    <div className={cn('mx-auto max-w-4xl space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>
          {description && (
            <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        {(onSave || onReset) && (
          <div className="flex items-center gap-2">
            {onReset && (
              <Button variant="outline" onClick={onReset} disabled={saving}>
                &gt; RESET
              </Button>
            )}
            {onSave && (
              <Button onClick={onSave} disabled={saving} loading={saving}>
                &gt; {saveLabel.toUpperCase()}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <SidebarNav
          sections={sections}
          activeSection={effectiveActiveSection}
          onSectionChange={onSectionChange}
        />

        {/* Content Area */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS FOR SETTINGS SECTIONS
// =============================================================================

/**
 * Settings section wrapper with terminal-style header
 */
export interface SettingsSectionCardProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Section content */
  children: React.ReactNode;
  /** Whether this is a danger zone section */
  isDanger?: boolean;
  /** Additional className */
  className?: string;
}

export function SettingsSectionCard({
  title,
  description,
  children,
  isDanger = false,
  className,
}: SettingsSectionCardProps) {
  return (
    <div
      className={cn(
        'border p-0',
        mode.radius,
        isDanger ? 'border-destructive' : 'border-border',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'border-b px-4 py-2',
          isDanger ? 'border-destructive bg-destructive/5' : 'border-border'
        )}
      >
        <span
          className={cn(
            'text-xs',
            mode.font,
            isDanger ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          [ {isDanger ? '[!]' : '[0x00]'} {title.toUpperCase()} ]
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        {description && (
          <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

export default SettingsPageTemplate;
