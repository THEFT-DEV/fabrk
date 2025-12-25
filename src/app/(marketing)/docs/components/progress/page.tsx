'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Progress, AnimatedProgress, ProgressWithInfo } from '@/components/ui/progress';

export default function ProgressPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.16]"
      category="Components"
      title="Progress"
      description="Terminal-style ASCII progress bars with multiple variants including block, hash, pipe, dots, arrow, and braille styles."
      importCode={`import { Progress, AnimatedProgress, ProgressWithInfo } from "@/components/ui/progress"`}
      mainPreview={{
        preview: <Progress value={66} showPercentage />,
        code: `<Progress value={66} showPercentage />`,
      }}
      variants={[
        {
          title: 'Block Style (Default)',
          description: 'Classic terminal progress bar using block characters █ and ░.',
          preview: (
            <div className="space-y-4">
              <Progress value={25} variant="block" showPercentage />
              <Progress value={50} variant="block" showPercentage />
              <Progress value={75} variant="block" showPercentage />
            </div>
          ),
          code: `<Progress value={25} variant="block" showPercentage />
<Progress value={50} variant="block" showPercentage />
<Progress value={75} variant="block" showPercentage />`,
        },
        {
          title: 'Hash Style',
          description: 'ASCII progress using # for filled and . for empty.',
          preview: (
            <div className="space-y-4">
              <Progress value={33} variant="hash" showPercentage />
              <Progress value={66} variant="hash" showPercentage />
              <Progress value={100} variant="hash" showPercentage />
            </div>
          ),
          code: `<Progress value={33} variant="hash" showPercentage />
<Progress value={66} variant="hash" showPercentage />
<Progress value={100} variant="hash" showPercentage />`,
        },
        {
          title: 'Pipe Style',
          description: 'Minimalist progress using | for filled positions.',
          preview: (
            <div className="space-y-4">
              <Progress value={40} variant="pipe" showPercentage />
              <Progress value={80} variant="pipe" showPercentage />
            </div>
          ),
          code: `<Progress value={40} variant="pipe" showPercentage />
<Progress value={80} variant="pipe" showPercentage />`,
        },
        {
          title: 'Dots Style',
          description: 'Unicode dots using ● for filled and ○ for empty.',
          preview: (
            <div className="space-y-4">
              <Progress value={30} variant="dots" showPercentage />
              <Progress value={70} variant="dots" showPercentage />
            </div>
          ),
          code: `<Progress value={30} variant="dots" showPercentage />
<Progress value={70} variant="dots" showPercentage />`,
        },
        {
          title: 'Arrow Style',
          description: 'wget-inspired progress bar with = for filled and > as the head.',
          preview: (
            <div className="space-y-4">
              <Progress value={45} variant="arrow" showPercentage />
              <Progress value={90} variant="arrow" showPercentage />
            </div>
          ),
          code: `<Progress value={45} variant="arrow" showPercentage />
<Progress value={90} variant="arrow" showPercentage />`,
        },
        {
          title: 'Braille Style',
          description: 'Unicode braille characters for a dense, retro look.',
          preview: (
            <div className="space-y-4">
              <Progress value={50} variant="braille" showPercentage />
              <Progress value={100} variant="braille" showPercentage />
            </div>
          ),
          code: `<Progress value={50} variant="braille" showPercentage />
<Progress value={100} variant="braille" showPercentage />`,
        },
        {
          title: 'With Label',
          description: 'Add a custom label before the progress bar.',
          preview: (
            <div className="space-y-4">
              <Progress value={45} label="Downloading:" showPercentage />
              <Progress value={80} label="Installing:" variant="hash" showPercentage />
              <Progress value={60} label="Syncing:" variant="arrow" showPercentage />
            </div>
          ),
          code: `<Progress value={45} label="Downloading:" showPercentage />
<Progress value={80} label="Installing:" variant="hash" showPercentage />
<Progress value={60} label="Syncing:" variant="arrow" showPercentage />`,
        },
        {
          title: 'Percentage Before',
          description: 'Show percentage before the progress bar instead of after.',
          preview: (
            <div className="space-y-4">
              <Progress value={33} percentageBefore />
              <Progress value={66} percentageBefore variant="hash" />
              <Progress value={100} percentageBefore variant="dots" />
            </div>
          ),
          code: `<Progress value={33} percentageBefore />
<Progress value={66} percentageBefore variant="hash" />
<Progress value={100} percentageBefore variant="dots" />`,
        },
        {
          title: 'Different Sizes',
          description: 'Progress bars in small, medium, and large sizes.',
          preview: (
            <div className="space-y-4">
              <Progress value={50} size="sm" showPercentage />
              <Progress value={50} size="md" showPercentage />
              <Progress value={50} size="lg" showPercentage />
            </div>
          ),
          code: `<Progress value={50} size="sm" showPercentage />
<Progress value={50} size="md" showPercentage />
<Progress value={50} size="lg" showPercentage />`,
        },
        {
          title: 'Custom Bar Width',
          description: 'Adjust the width of the progress bar in characters.',
          preview: (
            <div className="space-y-4">
              <Progress value={60} barWidth={10} showPercentage />
              <Progress value={60} barWidth={20} showPercentage />
              <Progress value={60} barWidth={30} showPercentage />
            </div>
          ),
          code: `<Progress value={60} barWidth={10} showPercentage />
<Progress value={60} barWidth={20} showPercentage /> {/* default */}
<Progress value={60} barWidth={30} showPercentage />`,
        },
        {
          title: 'Animated Progress',
          description: 'Auto-animated progress bar that fills over time.',
          preview: <AnimatedProgress duration={3000} loop showPercentage variant="block" />,
          code: `<AnimatedProgress
  duration={3000}
  loop
  showPercentage
  variant="block"
/>`,
        },
        {
          title: 'Progress with Info',
          description: 'Progress bar with additional download/upload info display.',
          preview: (
            <div className="space-y-6">
              <ProgressWithInfo
                value={45}
                variant="arrow"
                showPercentage
                loaded="22.5 MB"
                total="50 MB"
                speed="2.5 MB/s"
                eta="11s"
              />
              <ProgressWithInfo
                value={78}
                variant="block"
                showPercentage
                loaded="156 KB"
                total="200 KB"
                speed="45 KB/s"
              />
            </div>
          ),
          code: `<ProgressWithInfo
  value={45}
  variant="arrow"
  showPercentage
  loaded="22.5 MB"
  total="50 MB"
  speed="2.5 MB/s"
  eta="11s"
/>

<ProgressWithInfo
  value={78}
  variant="block"
  showPercentage
  loaded="156 KB"
  total="200 KB"
  speed="45 KB/s"
/>`,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'number',
          default: '0',
          description: 'The progress value between 0 and 100.',
        },
        {
          name: 'variant',
          type: '"block" | "hash" | "pipe" | "dots" | "arrow" | "braille"',
          default: '"block"',
          description: 'Visual style of the progress bar.',
        },
        {
          name: 'showPercentage',
          type: 'boolean',
          default: 'false',
          description: 'Show percentage after the progress bar.',
        },
        {
          name: 'percentageBefore',
          type: 'boolean',
          default: 'false',
          description: 'Show percentage before the progress bar.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Custom label to show before the progress bar.',
        },
        {
          name: 'barWidth',
          type: 'number',
          default: '20',
          description: 'Width of the progress bar in characters.',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant of the progress text.',
        },
      ]}
      accessibility={[
        "Uses role='progressbar' for screen reader compatibility",
        'Includes aria-valuenow, aria-valuemin, and aria-valuemax attributes',
        'aria-label announces progress percentage or custom label',
        'ASCII characters provide visual feedback without relying on color alone',
        'Works with high contrast modes and screen magnification',
      ]}
      previous={{ title: 'Alert', href: '/docs/components/alert' }}
      next={{ title: 'Loading', href: '/docs/components/loading' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Progress when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Task has known duration or measurable progress (file uploads, downloads)
                </li>
                <li className="text-xs">
                  • Multi-step process where user is on step X of Y (3 of 5 steps)
                </li>
                <li className="text-xs">
                  • Background operations that are visible to user (sync progress, export)
                </li>
                <li className="text-xs">
                  • Long-running tasks where percentage completion is meaningful (0-100%)
                </li>
                <li className="text-xs">
                  • User needs reassurance that process is advancing (installation, processing)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Duration is unknown or indeterminate (use Loading component instead)
                </li>
                <li className="text-xs">
                  • Operation completes instantly (just do it, no indicator needed)
                </li>
                <li className="text-xs">
                  • Step-by-step wizard with discrete steps (use multi-step form)
                </li>
                <li className="text-xs">
                  • Percentage doesn&apos;t make sense for the task (use Loading component)
                </li>
                <li className="text-xs">
                  • Task is in background and user doesn&apos;t need to wait (show Toast when done)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Update value frequently for smooth animation (not just 0%, 50%, 100%)
                </li>
                <li className="text-xs">• Use showPercentage for clarity on longer operations</li>
                <li className="text-xs">
                  • Combine with label prop for context (&quot;Downloading file.pdf...&quot;)
                </li>
                <li className="text-xs">
                  • Use ProgressWithInfo for downloads showing size, speed, and ETA
                </li>
                <li className="text-xs">
                  • Provide cancel option for long operations when possible
                </li>
                <li className="text-xs">• Start at 0%, not 1% (shows clear starting state)</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Variant Reference */}
      <DocsSection title="Variant Reference">
        <DocsCard title="ASCII CHARACTERS">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold">block (default)</p>
                <p className="text-muted-foreground text-xs">█ filled, ░ empty</p>
              </div>
              <div>
                <p className="text-xs font-semibold">hash</p>
                <p className="text-muted-foreground text-xs"># filled, . empty</p>
              </div>
              <div>
                <p className="text-xs font-semibold">pipe</p>
                <p className="text-muted-foreground text-xs">| filled, space empty</p>
              </div>
              <div>
                <p className="text-xs font-semibold">dots</p>
                <p className="text-muted-foreground text-xs">● filled, ○ empty</p>
              </div>
              <div>
                <p className="text-xs font-semibold">arrow</p>
                <p className="text-muted-foreground text-xs">= filled, &gt; head</p>
              </div>
              <div>
                <p className="text-xs font-semibold">braille</p>
                <p className="text-muted-foreground text-xs">⣿ filled, ⣀ empty</p>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
