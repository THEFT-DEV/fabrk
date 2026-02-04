'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import {
  Stat,
  StatGroup,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
  MetricCard,
  FeatureCard,
} from '@/components/ui/terminal-card';
import { Box, Mail } from 'lucide-react';

export default function TerminalCardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.61]"
      title="Terminal Card"
      description="Marketing-oriented card variants with terminal patterns. Used for feature showcases, metrics, stats displays, and template documentation."
      importCode={`import {
  Stat,
  StatGroup,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
  MetricCard,
  FeatureCard,
} from "@/components/ui/terminal-card";`}
      mainPreview={{
        preview: (
          <MetricCard
            code="0x1A"
            title="UI_COMPONENTS"
            value="62+"
            label="UI Components"
            icon={<Box className="size-5" />}
          />
        ),
        code: `<MetricCard
  code="0x1A"
  title="UI_COMPONENTS"
  value="62+"
  label="UI Components"
  icon={<Box className="size-5" />}
/>`,
      }}
      variants={[
        {
          title: 'Stat & StatGroup',
          description: 'Key-value pairs for displaying stats',
          preview: (
            <StatGroup>
              <Stat label="Speed" value="OPTIMIZED" />
              <Stat label="Integration" value="SEAMLESS" />
              <Stat label="Status" value="ACTIVE" />
            </StatGroup>
          ),
          code: `<StatGroup>
  <Stat label="Speed" value="OPTIMIZED" />
  <Stat label="Integration" value="SEAMLESS" />
  <Stat label="Status" value="ACTIVE" />
</StatGroup>`,
        },
        {
          title: 'StyledLabel',
          description: 'Bracketed label with terminal pattern',
          preview: (
            <div className="space-y-2">
              <StyledLabel>TEMPLATE FEATURES</StyledLabel>
              <StyledLabel showColon={false}>NO COLON</StyledLabel>
            </div>
          ),
          code: `<StyledLabel>TEMPLATE FEATURES</StyledLabel>
<StyledLabel showColon={false}>NO COLON</StyledLabel>`,
        },
        {
          title: 'FeatureList & FeatureItem',
          description: 'Feature list with icon prefixes',
          preview: (
            <FeatureList>
              <FeatureItem icon="arrow">Multi-step form wizard</FeatureItem>
              <FeatureItem icon="check">Form validation included</FeatureItem>
              <FeatureItem icon="dot">Custom styling support</FeatureItem>
            </FeatureList>
          ),
          code: `<FeatureList>
  <FeatureItem icon="arrow">Multi-step form wizard</FeatureItem>
  <FeatureItem icon="check">Form validation included</FeatureItem>
  <FeatureItem icon="dot">Custom styling support</FeatureItem>
</FeatureList>`,
        },
        {
          title: 'InfoNote',
          description: 'Note text with customizable label',
          preview: (
            <div className="space-y-2">
              <InfoNote>Connect to your API to persist data.</InfoNote>
              <InfoNote label="TIP">Use environment variables for secrets.</InfoNote>
            </div>
          ),
          code: `<InfoNote>Connect to your API to persist data.</InfoNote>
<InfoNote label="TIP">Use environment variables for secrets.</InfoNote>`,
        },
        {
          title: 'PageBadge',
          description: 'Badge for template/page identification',
          preview: (
            <div className="space-y-2">
              <PageBadge>SIGN IN</PageBadge>
              <PageBadge prefix="COMPONENT">BUTTON</PageBadge>
            </div>
          ),
          code: `<PageBadge>SIGN IN</PageBadge>
<PageBadge prefix="COMPONENT">BUTTON</PageBadge>`,
        },
        {
          title: 'TemplatePageHeader',
          description: 'Complete header with badge, title, and description',
          preview: (
            <TemplatePageHeader
              badge="DASHBOARD"
              title="Analytics Dashboard"
              description="Real-time metrics and insights for your application"
            />
          ),
          code: `<TemplatePageHeader
  badge="DASHBOARD"
  title="Analytics Dashboard"
  description="Real-time metrics and insights for your application"
/>`,
        },
        {
          title: 'FeaturesCard',
          description: 'Complete feature card with header and list',
          preview: (
            <FeaturesCard
              code="0x10"
              title="TEMPLATE FEATURES"
              features={[
                'Authentication flow',
                'Form validation',
                'Error handling',
                'Loading states',
              ]}
              note="Connect to your API for real data."
              featureIcon="check"
            />
          ),
          code: `<FeaturesCard
  code="0x10"
  title="TEMPLATE FEATURES"
  features={[
    "Authentication flow",
    "Form validation",
    "Error handling",
    "Loading states",
  ]}
  note="Connect to your API for real data."
  featureIcon="check"
/>`,
        },
        {
          title: 'FeatureCard',
          description: 'Marketing feature card with stats and CTA',
          preview: (
            <FeatureCard
              code="0x15"
              title="EMAIL_SYSTEM"
              icon={<Mail className="size-5" />}
              headline="Transactional emails that just work"
              description="Resend integration with React Email templates for beautiful, reliable transactional emails."
              stats={[
                { label: 'TIME SAVED', value: '30+ HRS' },
                { label: 'COST SAVED', value: '$3K' },
              ]}
              includes={['Resend Integration', 'React Email Templates', 'Preview Mode']}
              ctaLabel="EMAIL TEMPLATES"
              ctaHref="/docs/features/emails"
            />
          ),
          code: `<FeatureCard
  code="0x15"
  title="EMAIL_SYSTEM"
  icon={<Mail className="size-5" />}
  headline="Transactional emails that just work"
  description="Resend integration with React Email templates..."
  stats={[
    { label: "TIME SAVED", value: "30+ HRS" },
    { label: "COST SAVED", value: "$3K" }
  ]}
  includes={["Resend Integration", "React Email Templates", "Preview Mode"]}
  ctaLabel="EMAIL TEMPLATES"
  ctaHref="/docs/features/emails"
/>`,
        },
      ]}
    >
      <DocsSection title="Component Reference">
        <DocsCard title="AVAILABLE COMPONENTS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">Stat</td>
                  <td className="p-2">Key-value pair with label and value</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">StatGroup</td>
                  <td className="p-2">Container for multiple Stat components</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">StyledLabel</td>
                  <td className="p-2">Bracketed label [LABEL]:</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">FeatureItem</td>
                  <td className="p-2">List item with icon prefix</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">FeatureList</td>
                  <td className="p-2">Container for FeatureItem components</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">InfoNote</td>
                  <td className="p-2">Note text [NOTE]: message</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">PageBadge</td>
                  <td className="p-2">Page identification badge</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">TemplatePageHeader</td>
                  <td className="p-2">Complete page header with badge</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">FeaturesCard</td>
                  <td className="p-2">Card with feature list</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">MetricCard</td>
                  <td className="p-2">Large metric display card</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">FeatureCard</td>
                  <td className="p-2">Marketing card with stats and CTA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
