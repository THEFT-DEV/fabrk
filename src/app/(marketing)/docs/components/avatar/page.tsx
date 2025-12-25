'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AvatarPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.12]"
      category="Display"
      title="Avatar"
      description="A user profile image component with automatic fallback support for when images fail to load."
      importCode={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";`}
      mainPreview={{
        preview: (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ),
        code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
      }}
      variants={[
        {
          title: 'With Image',
          description: 'Avatar with a loaded image',
          preview: (
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
          ),
          code: `<Avatar>
  <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
  <AvatarFallback>VC</AvatarFallback>
</Avatar>`,
        },
        {
          title: 'Fallback Only',
          description: 'Avatar showing fallback text (no image or failed load)',
          preview: (
            <Avatar>
              <AvatarImage src="/invalid-url.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
          code: `<Avatar>
  <AvatarImage src="/invalid-url.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
        },
        {
          title: 'Custom Sizes',
          description: 'Avatars in different sizes',
          preview: (
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
                <AvatarFallback className="text-2xl">XL</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar className="h-8 w-8">
  <AvatarImage src="..." alt="Small" />
  <AvatarFallback className="text-xs">SM</AvatarFallback>
</Avatar>

<Avatar className="h-16 w-16">
  <AvatarImage src="..." alt="Large" />
  <AvatarFallback className="text-lg">LG</AvatarFallback>
</Avatar>`,
        },
        {
          title: 'Avatar Group',
          description: 'Multiple avatars in a horizontal group',
          preview: (
            <div className="flex -space-x-4">
              <Avatar className="border-background border-2">
                <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-background border-2">
                <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-background border-2">
                <AvatarImage src="/invalid.png" alt="User 3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="border-background border-2">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`,
        },
        {
          title: 'Colored Fallbacks',
          description: 'Avatars with custom colored fallback backgrounds',
          preview: (
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-success text-success-foreground">CD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  EF
                </AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-warning text-warning-foreground">GH</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-success text-success-foreground">CD</AvatarFallback>
</Avatar>`,
        },
        {
          title: 'With Status Indicator',
          description: 'Avatar with online/offline status badge',
          preview: (
            <div className="flex gap-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Online User" />
                  <AvatarFallback>ON</AvatarFallback>
                </Avatar>
                <span className="border-background bg-success absolute right-0 bottom-0 h-3 w-3 border-2" />
              </div>
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" alt="Busy User" />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <span className="border-background bg-warning absolute right-0 bottom-0 h-3 w-3 border-2" />
              </div>
              <div className="relative">
                <Avatar>
                  <AvatarFallback>OF</AvatarFallback>
                </Avatar>
                <span className="border-background bg-muted-foreground absolute right-0 bottom-0 h-3 w-3 border-2" />
              </div>
            </div>
          ),
          code: `<div className="relative">
  <Avatar>
    <AvatarImage src="..." alt="Online User" />
    <AvatarFallback>ON</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 border-2 border-background bg-success" />
</div>`,
        },
      ]}
      props={[
        {
          name: 'Avatar',
          type: 'React.ComponentProps',
          description: 'Root avatar container - accepts all div props plus Radix Avatar.Root props',
        },
        {
          name: 'AvatarImage.src',
          type: 'string',
          description: 'Image URL to display',
        },
        {
          name: 'AvatarImage.alt',
          type: 'string',
          description: 'Alt text for the image (required for accessibility)',
        },
        {
          name: 'AvatarFallback',
          type: 'React.ReactNode',
          description: 'Content to display when image fails to load or while loading',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to any avatar component',
        },
      ]}
      accessibility={[
        'Always provide alt text for AvatarImage - it describes the user/entity to screen readers',
        'Fallback content should be concise - typically 1-2 initials or a short abbreviation',
        'The component automatically handles image loading failures and shows the fallback',
        'Avatar uses Radix UI primitives for robust accessibility support',
        'When using avatars in groups, each should have a unique alt text',
        'Status indicators should use aria-label to describe the status to screen readers',
      ]}
      previous={{ title: 'Badge', href: '/docs/components/badge' }}
      next={{ title: 'Skeleton', href: '/docs/components/skeleton' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Avatar when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Representing users or people (profile picture, comment author, team member)
                </li>
                <li className="text-xs">
                  • Showing visual identity in lists (user lists, search results, mentions)
                </li>
                <li className="text-xs">• Displaying current user in navigation or header</li>
                <li className="text-xs">• Avatar groups showing collaborators or participants</li>
                <li className="text-xs">
                  • Status indicators needed (online/offline, available/busy)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Showing generic icons or illustrations (use icon components instead)
                </li>
                <li className="text-xs">
                  • Product images or thumbnails (use Next.js Image component)
                </li>
                <li className="text-xs">
                  • Organization logos or brand images (use dedicated Logo/Brand component)
                </li>
                <li className="text-xs">
                  • Decorative images without representing a person (use Image)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Always provide AvatarFallback with 1-2 initials (JD, AC, not John Doe)
                </li>
                <li className="text-xs">
                  • Use consistent sizing throughout your app (h-8 w-8 for small, h-10 w-10 for
                  default)
                </li>
                <li className="text-xs">
                  • Add border-2 border-background for overlapping avatar groups
                </li>
                <li className="text-xs">
                  • Status indicators: absolute positioned dot at bottom-right with appropriate
                  color
                </li>
                <li className="text-xs">
                  • Scale fallback text with avatar size (text-xs for small, text-lg for large)
                </li>
                <li className="text-xs">
                  • Provide meaningful alt text (&quot;John Doe&apos;s avatar&quot; not just
                  &quot;avatar&quot;)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
