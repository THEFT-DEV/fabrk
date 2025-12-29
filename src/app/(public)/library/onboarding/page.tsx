/**
 * FABRK COMPONENT
 * Onboarding Flow Template - Terminal console style
 * Two variants: Multi-step wizard & Vertical checklist
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { User, Building2, Settings, CheckCircle2, Sparkles } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  FeatureList,
  FeatureItem,
  TemplatePageHeader,
} from '@/components/ui/card';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { OnboardingChecklist } from '@/components/ui/onboarding-checklist';
import { TemplatePreviewWrapper } from '@/components/library';
import { RelatedTemplates } from '@/components/library/related-templates';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ProgressSection } from './components/progress-section';
import { StepWelcome } from './components/step-welcome';
import { StepProfile } from './components/step-profile';
import { StepWorkspace } from './components/step-workspace';
import { StepPreferences } from './components/step-preferences';
import { StepComplete } from './components/step-complete';
import { NavigationControls } from './components/navigation-controls';

const templateCode = `"use client";

import { useState } from "react";
import { User, Building2, Settings, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Welcome", icon: Sparkles },
  { id: 2, name: "Profile", icon: User },
  { id: 3, name: "Workspace", icon: Building2 },
  { id: 4, name: "Preferences", icon: Settings },
  { id: 5, name: "Complete", icon: CheckCircle2 },
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    workspaceName: "",
    teamSize: "",
    useCases: [] as string[],
    emailUpdates: true,
    productTips: true,
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader code="0x00" title="ONBOARDING" />

        {/* Progress indicator */}
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <step.icon className={cn(
                  "h-6 w-6",
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(mode.font, "text-xs mt-2")}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          {/* Step content goes here */}
          <div className="min-h-[400px]">
            {/* Add step components */}
          </div>

          {/* Navigation buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                disabled={currentStep === 1}
                variant="outline"
                className={cn(mode.radius, mode.font, "text-xs")}
              >
                &lt; BACK
              </Button>
              <Button
                onClick={handleNext}
                className={cn(mode.radius, mode.font, "text-xs")}
              >
                &gt; NEXT
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}`;

const steps = [
  { id: 1, name: 'Welcome', icon: Sparkles },
  { id: 2, name: 'Profile', icon: User },
  { id: 3, name: 'Workspace', icon: Building2 },
  { id: 4, name: 'Preferences', icon: Settings },
  { id: 5, name: 'Complete', icon: CheckCircle2 },
];

function OnboardingPreview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    workspaceName: '',
    teamSize: '',
    useCases: [] as string[],
    emailUpdates: true,
    productTips: true,
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleUseCase = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      useCases: prev.useCases.includes(id)
        ? prev.useCases.filter((c) => c !== id)
        : [...prev.useCases, id],
    }));
  };

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader code="0x00" title="ONBOARDING" />

          <ProgressSection currentStep={currentStep} steps={steps} progress={progress} />

          <div className="min-h-[400px] p-6">
            {currentStep === 1 && <StepWelcome />}

            {currentStep === 2 && (
              <StepProfile
                fullName={formData.fullName}
                role={formData.role}
                onFullNameChange={(value) => setFormData({ ...formData, fullName: value })}
                onRoleChange={(value) => setFormData({ ...formData, role: value })}
              />
            )}

            {currentStep === 3 && (
              <StepWorkspace
                workspaceName={formData.workspaceName}
                teamSize={formData.teamSize}
                selectedUseCases={formData.useCases}
                onWorkspaceNameChange={(value) =>
                  setFormData({ ...formData, workspaceName: value })
                }
                onTeamSizeChange={(value) => setFormData({ ...formData, teamSize: value })}
                onToggleUseCase={toggleUseCase}
              />
            )}

            {currentStep === 4 && (
              <StepPreferences
                emailUpdates={formData.emailUpdates}
                productTips={formData.productTips}
                onEmailUpdatesChange={(checked) =>
                  setFormData({ ...formData, emailUpdates: checked })
                }
                onProductTipsChange={(checked) =>
                  setFormData({ ...formData, productTips: checked })
                }
              />
            )}

            {currentStep === 5 && <StepComplete formData={formData} />}
          </div>

          {currentStep < 5 && (
            <NavigationControls currentStep={currentStep} onBack={handleBack} onNext={handleNext} />
          )}
        </Card>
      </div>
    </TemplatePreviewWrapper>
  );
}

// Checklist variant code
const checklistCode = `"use client";

import { useState } from "react";
import { OnboardingChecklist, OnboardingTask } from "@/components/ui/onboarding-checklist";

const initialTasks: OnboardingTask[] = [
  {
    id: "1",
    title: "Connect your first integration",
    description: "Link your account to start syncing data across platforms.",
    completed: false,
    link: { text: "View integrations", href: "/integrations" },
  },
  {
    id: "2",
    title: "Invite team members",
    description: "Collaborate by inviting your team to join your workspace.",
    completed: false,
    link: { text: "Invite team", href: "/team/invite" },
  },
  {
    id: "3",
    title: "Configure webhook endpoint",
    description: "Set up a webhook to receive real-time events from our API.",
    completed: false,
    link: { text: "Setup webhooks", href: "/webhooks" },
  },
  {
    id: "4",
    title: "Generate API token",
    description: "Create an API key for programmatic access to your data.",
    completed: false,
    link: { text: "Manage API keys", href: "/api-keys" },
  },
];

export default function OnboardingChecklistPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
    );
  };

  return (
    <div className="p-6">
      <OnboardingChecklist
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
        onDismiss={() => {}}
        showCelebration={true}
      />
    </div>
  );
}`;

// Checklist preview component
function ChecklistPreview() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Connect your first integration',
      description: 'Link your account to start syncing data across platforms.',
      completed: true,
      link: { text: 'View integrations', href: '#' },
    },
    {
      id: '2',
      title: 'Invite team members',
      description: 'Collaborate by inviting your team to join your workspace.',
      completed: true,
      link: { text: 'Invite team', href: '#' },
    },
    {
      id: '3',
      title: 'Configure webhook endpoint',
      description: 'Set up a webhook to receive real-time events from our API.',
      completed: false,
      link: { text: 'Setup webhooks', href: '#' },
    },
    {
      id: '4',
      title: 'Generate API token',
      description: 'Create an API key for programmatic access to your data.',
      completed: false,
      link: { text: 'Manage API keys', href: '#' },
    },
  ]);

  return (
    <TemplatePreviewWrapper minHeight="500px">
      <div className="mx-auto max-w-2xl">
        <OnboardingChecklist
          tasks={tasks}
          onTaskToggle={(taskId, completed) => {
            setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed } : t)));
          }}
          onDismiss={() => {}}
          showCelebration={true}
        />
      </div>
    </TemplatePreviewWrapper>
  );
}

// File structure helper
function FileStructureLine({ path, label }: { path: string; label?: string }) {
  const segments = path.split('/').filter(Boolean);
  const fileName = segments.pop() || '';

  return (
    <div>
      {segments.map((segment, idx) => (
        <span key={idx}>
          <span
            className={segment.startsWith('(') ? mode.color.text.muted : mode.color.text.accent}
          >
            {segment}
          </span>
          <span className={mode.color.text.muted}>/</span>
        </span>
      ))}
      <span className={mode.color.text.primary}>{fileName}</span>
      {label && <span className={cn('ml-4', mode.color.text.muted)}>{label}</span>}
    </div>
  );
}

export default function OnboardingTemplate() {
  const [activeVariant, setActiveVariant] = useState<string>('wizard');
  const [activePreviewTab, setActivePreviewTab] = useState<string>('preview');

  const wizardFeatures = [
    '5-step onboarding flow',
    'Progress tracking with visual indicators',
    'Form state management',
    'Navigation controls (back/next)',
    'Multi-select use case options',
    'Completion summary',
  ];

  const checklistFeatures = [
    'Vertical checklist layout',
    'Progress bar with percentage',
    'Expandable task details',
    'Link actions for each task',
    'Minimize/dismiss controls',
    'Celebration animation on completion',
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="ONBOARDING"
          title="Onboarding Flow"
          description="Two variants: Multi-step wizard for guided setup, or vertical checklist for task-based progress"
        />

        {/* Variant Selector */}
        <StyledTabs
          code="0x00"
          title="TEMPLATE_PREVIEW"
          tabs={[
            { id: 'wizard', label: '[WIZARD]' },
            { id: 'checklist', label: '[CHECKLIST]' },
          ]}
          value={activeVariant}
          onValueChange={setActiveVariant}
          className="w-full min-w-0 overflow-hidden"
        >
          {/* Wizard Tab */}
          <StyledTabsContent value="wizard" className="w-full max-w-full space-y-6">
            {/* Wizard Preview/Code Tabs */}
            <StyledTabs
              code="0x01"
              title="WIZARD_FLOW"
              tabs={[
                { id: 'preview', label: '[PREVIEW]' },
                { id: 'code', label: '[CODE]' },
              ]}
              value={activePreviewTab}
              onValueChange={setActivePreviewTab}
              className="w-full min-w-0 overflow-hidden"
            >
              <StyledTabsContent value="preview" className="w-full max-w-full">
                <Card className="overflow-hidden">
                  <CardHeader code="0x02" title="LIVE_PREVIEW" />
                  <OnboardingPreview />
                </Card>
              </StyledTabsContent>

              <StyledTabsContent value="code" className="w-full max-w-full">
                <Card className="overflow-hidden">
                  <CardHeader code="0x02" title="SOURCE_CODE" />
                  <div className="w-full max-w-full overflow-x-auto p-4">
                    <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
                  </div>
                </Card>
              </StyledTabsContent>
            </StyledTabs>
          </StyledTabsContent>

          {/* Checklist Tab */}
          <StyledTabsContent value="checklist" className="w-full max-w-full space-y-6">
            {/* Checklist Preview/Code Tabs */}
            <StyledTabs
              code="0x01"
              title="CHECKLIST_FLOW"
              tabs={[
                { id: 'preview', label: '[PREVIEW]' },
                { id: 'code', label: '[CODE]' },
              ]}
              value={activePreviewTab}
              onValueChange={setActivePreviewTab}
              className="w-full min-w-0 overflow-hidden"
            >
              <StyledTabsContent value="preview" className="w-full max-w-full">
                <Card className="overflow-hidden">
                  <CardHeader code="0x02" title="LIVE_PREVIEW" />
                  <ChecklistPreview />
                </Card>
              </StyledTabsContent>

              <StyledTabsContent value="code" className="w-full max-w-full">
                <Card className="overflow-hidden">
                  <CardHeader code="0x02" title="SOURCE_CODE" />
                  <div className="w-full max-w-full overflow-x-auto p-4">
                    <CodeBlock code={checklistCode} language="tsx" maxHeight="600px" />
                  </div>
                </Card>
              </StyledTabsContent>
            </StyledTabs>
          </StyledTabsContent>
        </StyledTabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x03" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className={mode.color.text.muted}>[FILES]:</div>
              <div className="space-y-1 pl-4">
                <FileStructureLine
                  path={
                    activeVariant === 'wizard'
                      ? 'app/onboarding/page.tsx'
                      : 'app/dashboard/page.tsx'
                  }
                  label="← Copy template here"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x04" title="FEATURES" />
          <CardContent padding="md">
            <FeatureList>
              {(activeVariant === 'wizard' ? wizardFeatures : checklistFeatures).map(
                (feature, idx) => (
                  <FeatureItem key={idx}>{feature}</FeatureItem>
                )
              )}
            </FeatureList>
          </CardContent>
        </Card>

        {/* Related Templates */}
        <RelatedTemplates currentTemplateId="onboarding" limit={3} />
      </div>
    </div>
  );
}
