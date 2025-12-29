'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function ScrollAreaPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.76]"
      category="Components"
      title="Scroll Area"
      description="Custom styled scrollable area with Radix UI primitives."
      importCode={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`}
      mainPreview={{
        preview: (
          <ScrollArea className="h-48 w-full">
            <div className="p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="border-border border-b py-2 last:border-0">
                  <span className="text-primary">&gt;</span> Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        ),
        code: `<ScrollArea className="h-48 w-full">
  <div className="p-4">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</ScrollArea>`,
      }}
      variants={[
        {
          title: 'Vertical Scroll',
          description: 'Default vertical scrolling behavior.',
          preview: (
            <ScrollArea className="h-48 w-full">
              <div className="space-y-2 p-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="bg-background p-2">
                    Scrollable item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: `<ScrollArea className="h-48">
  <div>Content</div>
</ScrollArea>`,
        },
        {
          title: 'Horizontal Scroll',
          description: 'Horizontal scrolling with custom scrollbar.',
          preview: (
            <ScrollArea className="w-full">
              <div className="flex gap-4 p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-background flex h-24 w-32 shrink-0 items-center justify-center"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ),
          code: `<ScrollArea className="w-full">
  <div className="flex gap-4">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
        },
        {
          title: 'Both Directions',
          description: 'Enable both horizontal and vertical scrolling.',
          preview: (
            <ScrollArea className="h-48 w-full">
              <div className="w-[800px] p-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="border-border border-b py-2 last:border-0">
                    <span className="text-primary">&gt;</span> Wide content that scrolls
                    horizontally - Item {i + 1}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ),
          code: `<ScrollArea className="h-48 w-full">
  <div className="w-[800px]">Wide content</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
        },
        {
          title: 'Code Block',
          description: 'Perfect for scrollable code snippets.',
          preview: (
            <ScrollArea className="h-48 w-full">
              <pre className="p-4">
                <code>
                  {`function example() {
  const items = [1, 2, 3, 4, 5];

  items.forEach((item) => {
    console.log(item);
  });

  return items.map((item) => {
    return item * 2;
  });
}

// More code lines...
// ...
// ...
// ...
// End of code`}
                </code>
              </pre>
            </ScrollArea>
          ),
          code: `<ScrollArea className="h-48">
  <pre>
    <code>{codeString}</code>
  </pre>
</ScrollArea>`,
        },
        {
          title: 'Chat Messages',
          description: 'Scrollable chat or message history.',
          preview: (
            <ScrollArea className="h-48 w-full">
              <div className="space-y-4 p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-primary font-semibold">User {i + 1}</div>
                    <div className="bg-background p-2">This is a message in the chat</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: `<ScrollArea className="h-96">
  <div className="space-y-4">
    {messages.map((msg) => (
      <div key={msg.id}>
        <div>{msg.user}</div>
        <div>{msg.text}</div>
      </div>
    ))}
  </div>
</ScrollArea>`,
        },
      ]}
      props={[
        {
          name: 'orientation (ScrollBar)',
          type: '"vertical" | "horizontal"',
          default: '"vertical"',
          description: 'Direction of the scrollbar.',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: 'Additional CSS classes for styling.',
        },
      ]}
      accessibility={[
        'Uses Radix UI ScrollArea primitive with full accessibility support',
        'Maintains keyboard navigation (arrow keys, Page Up/Down, Home/End)',
        'Scrollbar visible on hover and during scroll',
        'Supports touch gestures on mobile devices',
        'Customizable scrollbar appearance while maintaining native behavior',
        'Preserves semantic HTML structure for screen readers',
      ]}
      previous={{ title: 'Select', href: '/docs/components/select' }}
      next={{ title: 'Section', href: '/docs/components/section' }}
    />
  );
}
