/**
 * FABRK COMPONENT
 * Features Card - List of template features
 */

import {
  Card,
  CardHeader,
  CardContent,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
} from '@/components/ui/card';

export function FeaturesCard() {
  return (
    <Card>
      <CardHeader code="0x00" title="TEMPLATE FEATURES" />
      <CardContent>
        <StyledLabel className="mb-4">TEMPLATE FEATURES</StyledLabel>
        <FeatureList>
          <FeatureItem>Confirmation dialog for destructive actions</FeatureItem>
          <FeatureItem>Form dialog with inputs and validation</FeatureItem>
          <FeatureItem>Side sheet for settings/navigation</FeatureItem>
          <FeatureItem>Popover for contextual content</FeatureItem>
          <FeatureItem>Accessible with keyboard navigation</FeatureItem>
          <FeatureItem>Terminal-styled headers and labels</FeatureItem>
        </FeatureList>
        <InfoNote>All patterns use Radix UI primitives for accessibility.</InfoNote>
      </CardContent>
    </Card>
  );
}
