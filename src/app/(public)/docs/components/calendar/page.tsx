'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <ComponentShowcaseTemplate
      code="[UI.55]"
      category="Components"
      title="Calendar"
      description="A date picker calendar component for selecting single dates or date ranges."
      importCode={`import { Calendar } from "@/components/ui/calendar"`}
      mainPreview={{
        preview: (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={cn('border-border border', mode.radius)}
          />
        ),
        code: `const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="border border-border"
/>`,
      }}
      variants={[
        {
          title: 'Single Date',
          description: 'Select a single date from the calendar.',
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `const [date, setDate] = useState<Date>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="border border-border"
/>`,
        },
        {
          title: 'Date Range',
          description: 'Select a range of dates (start and end).',
          preview: (
            <Calendar
              mode="range"
              numberOfMonths={2}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `const [range, setRange] = useState<DateRange>();

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  className="border border-border"
/>`,
        },
        {
          title: 'Multiple Dates',
          description: 'Select multiple individual dates.',
          preview: <Calendar mode="multiple" className={cn('border-border border', mode.radius)} />,
          code: `const [dates, setDates] = useState<Date[]>();

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
  className="border border-border"
/>`,
        },
        {
          title: 'Without Outside Days',
          description: 'Hide days from previous/next months.',
          preview: (
            <Calendar
              mode="single"
              showOutsideDays={false}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `<Calendar
  mode="single"
  showOutsideDays={false}
  className="border border-border"
/>`,
        },
        {
          title: 'Disabled Dates',
          description: 'Disable specific dates or date ranges.',
          preview: (
            <Calendar
              mode="single"
              disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `<Calendar
  mode="single"
  disabled={(date) =>
    date < new Date() || date < new Date("1900-01-01")
  }
  className="border border-border"
/>`,
        },
        {
          title: 'Multiple Months',
          description: 'Show multiple months side by side.',
          preview: (
            <Calendar
              mode="single"
              numberOfMonths={2}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `<Calendar
  mode="single"
  numberOfMonths={2}
  className="border border-border"
/>`,
        },
        {
          title: 'With Default Month',
          description: 'Set the initial month to display.',
          preview: (
            <Calendar
              mode="single"
              defaultMonth={new Date(2024, 0)}
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `<Calendar
  mode="single"
  defaultMonth={new Date(2024, 0)}
  className="border border-border"
/>`,
        },
        {
          title: 'Footer Content',
          description: 'Add custom footer content below the calendar.',
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              footer={
                <div className="border-border mt-2 border-t pt-2">
                  <p className="text-muted-foreground font-mono text-xs">
                    {date ? (
                      <>
                        <span className="text-primary">&gt;</span> Selected:{' '}
                        {date.toLocaleDateString()}
                      </>
                    ) : (
                      <>
                        <span className="text-muted-foreground">&gt;</span> No date selected
                      </>
                    )}
                  </p>
                </div>
              }
              className={cn('border-border border', mode.radius)}
            />
          ),
          code: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  footer={
    <p className="text-sm text-muted-foreground">
      {date ? \`Selected: \${date.toLocaleDateString()}\` : "Pick a date"}
    </p>
  }
/>`,
        },
      ]}
      props={[
        {
          name: 'mode',
          type: '"single" | "multiple" | "range"',
          default: '"single"',
          description: 'Selection mode for the calendar.',
        },
        {
          name: 'selected',
          type: 'Date | Date[] | DateRange',
          default: 'undefined',
          description: 'The selected date(s) based on mode.',
        },
        {
          name: 'onSelect',
          type: '(date: Date | Date[] | DateRange) => void',
          default: 'undefined',
          description: 'Callback when date selection changes.',
        },
        {
          name: 'defaultMonth',
          type: 'Date',
          default: 'new Date()',
          description: 'The month to display initially.',
        },
        {
          name: 'numberOfMonths',
          type: 'number',
          default: '1',
          description: 'Number of months to display.',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          default: 'true',
          description: 'Show days from previous/next months.',
        },
        {
          name: 'disabled',
          type: 'boolean | Date[] | ((date: Date) => boolean)',
          default: 'false',
          description: 'Disable specific dates or all dates.',
        },
        {
          name: 'footer',
          type: 'ReactNode',
          default: 'undefined',
          description: 'Custom content to render in the footer.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the calendar.',
        },
      ]}
      accessibility={[
        'Built on react-day-picker with full ARIA support',
        'Keyboard navigation with arrow keys (↓/↑/←/→)',
        'Tab key moves between calendar controls',
        'Space/Enter selects the focused date',
        'Screen readers announce selected dates and navigation',
        'Disabled dates are properly communicated to assistive tech',
        'Focus indicators for keyboard navigation',
      ]}
      previous={{ title: 'Button', href: '/docs/components/button' }}
      next={{ title: 'Card', href: '/docs/components/card' }}
    />
  );
}
