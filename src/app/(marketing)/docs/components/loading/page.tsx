'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Spinner, Skeleton, LoadingContainer, LoadingButton } from '@/components/ui/loading';
import { useState } from 'react';

export default function LoadingPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.17]"
      category="Components"
      title="Loading"
      description="A collection of loading components including spinners, skeletons, and loading states for buttons and containers."
      importCode={`import { Spinner, Skeleton, LoadingContainer, LoadingButton } from "@/components/ui/loading"`}
      mainPreview={{
        preview: <Spinner />,
        code: `<Spinner />`,
      }}
      variants={[
        {
          title: 'Spinner Variants',
          description: 'ASCII spinner styles: braille (default), line, block, and dots.',
          preview: (
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="braille" />
                <span className="text-xs text-muted-foreground">braille</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="line" />
                <span className="text-xs text-muted-foreground">line</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="block" />
                <span className="text-xs text-muted-foreground">block</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="dots" />
                <span className="text-xs text-muted-foreground">dots</span>
              </div>
            </div>
          ),
          code: `<Spinner variant="braille" /> {/* default */}
<Spinner variant="line" />
<Spinner variant="block" />
<Spinner variant="dots" />`,
        },
        {
          title: 'Spinner Sizes',
          description: 'ASCII spinner in different sizes: small, medium, and large.',
          preview: (
            <div className="flex items-center gap-8">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          ),
          code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
        },
        {
          title: 'Skeleton Text',
          description: 'Text skeleton loader for placeholder content.',
          preview: (
            <div className="w-full space-y-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          ),
          code: `<div className="space-y-2 w-full">
  <Skeleton variant="text" />
  <Skeleton variant="text" className="w-3/4" />
  <Skeleton variant="text" className="w-1/2" />
</div>`,
        },
        {
          title: 'Skeleton Circular',
          description: 'Circular skeleton for avatar placeholders.',
          preview: (
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" className="h-12 w-12" />
              <Skeleton variant="circular" className="h-16 w-16" />
              <Skeleton variant="circular" className="h-20 w-20" />
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <Skeleton variant="circular" className="h-12 w-12" />
  <Skeleton variant="circular" className="h-16 w-16" />
  <Skeleton variant="circular" className="h-20 w-20" />
</div>`,
        },
        {
          title: 'Skeleton Rectangular',
          description: 'Rectangular skeleton for card and image placeholders.',
          preview: (
            <div className="w-full space-y-4">
              <Skeleton variant="rectangular" className="h-32 w-full" />
              <Skeleton variant="rectangular" className="h-48 w-full" />
            </div>
          ),
          code: `<div className="space-y-4 w-full">
  <Skeleton variant="rectangular" className="h-32 w-full" />
  <Skeleton variant="rectangular" className="h-48 w-full" />
</div>`,
        },
        {
          title: 'Loading Container',
          description: 'Full-page loading state with spinner and optional message.',
          preview: <LoadingContainer>Loading your content...</LoadingContainer>,
          code: `<LoadingContainer>
  Loading your content...
</LoadingContainer>`,
        },
        {
          title: 'Loading Button',
          description: 'Button with integrated loading state.',
          preview: (
            <LoadingButton loading={loading} onClick={handleClick} loadingText="Saving...">
              Save Changes
            </LoadingButton>
          ),
          code: `const [loading, setLoading] = useState(false);

const handleClick = () => {
  setLoading(true);
  setTimeout(() => setLoading(false), 2000);
};

<LoadingButton
  loading={loading}
  onClick={handleClick}
  loadingText="Saving..."
>
  Save Changes
</LoadingButton>`,
        },
      ]}
      props={[
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'The size of the spinner (Spinner component only).',
        },
        {
          name: 'variant',
          type: '"text" | "circular" | "rectangular"',
          default: '"text"',
          description: 'The shape variant of the skeleton (Skeleton component only).',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is in loading state (LoadingButton only).',
        },
        {
          name: 'loadingText',
          type: 'string',
          description: 'Text to display when button is loading (LoadingButton only).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the component.',
        },
      ]}
      accessibility={[
        "Spinner includes role='status' and aria-label='Loading'",
        "Skeleton uses aria-hidden='true' to avoid screen reader noise",
        'LoadingButton disables interaction during loading state',
        'Loading indicator uses Loader2 icon with proper animation',
        'Screen reader-only text announces loading state changes',
      ]}
      previous={{ title: 'Progress', href: '/docs/components/progress' }}
      next={{ title: 'Badge', href: '/docs/components/badge' }}
    />
  );
}
