'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateTime, setDateTime] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>();

  return (
    <ComponentShowcaseTemplate
      code="[UI.08]"
      title="Date Picker"
      description="Unified date picker supporting single date, date range, date+time, and month-only selection modes."
      importCode={`import { DatePicker } from "@/components/ui/date-picker"`}
      mainPreview={{
        code: `const [date, setDate] = useState<Date>();

<DatePicker
  value={date}
  onChange={setDate}
/>`,
        preview: <DatePicker value={date} onChange={setDate} />,
      }}
      variants={[
        {
          title: 'Single Date',
          description: 'Basic date selection with month/year dropdowns.',
          code: `<DatePicker
  value={date}
  onChange={setDate}
  showMonthYearPicker
/>`,
          preview: <DatePicker value={date} onChange={setDate} showMonthYearPicker />,
        },
        {
          title: 'Date Range',
          description: 'Select a start and end date with preset options.',
          code: `const [range, setRange] = useState<DateRange>();

<DatePicker
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  showPresets
  numberOfMonths={2}
/>`,
          preview: (
            <DatePicker
              mode="range"
              rangeValue={dateRange}
              onRangeChange={setDateRange}
              showPresets
              numberOfMonths={2}
            />
          ),
        },
        {
          title: 'Date + Time',
          description: 'Pick both date and time with tabbed interface.',
          code: `const [dateTime, setDateTime] = useState<Date>();

<DatePicker
  value={dateTime}
  onChange={setDateTime}
  showTime
/>`,
          preview: <DatePicker value={dateTime} onChange={setDateTime} showTime />,
        },
        {
          title: 'Month Only',
          description: 'Select just month and year, no day grid.',
          code: `const [month, setMonth] = useState<Date>();

<DatePicker
  value={month}
  onChange={setMonth}
  monthOnly
/>`,
          preview: <DatePicker value={month} onChange={setMonth} monthOnly />,
        },
        {
          title: 'With Min/Max Dates',
          description: 'Restrict selectable date range.',
          code: `<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
/>`,
          preview: (
            <DatePicker
              value={date}
              onChange={setDate}
              minDate={new Date()}
              maxDate={new Date(2025, 11, 31)}
            />
          ),
        },
        {
          title: '24-Hour Time',
          description: 'Use 24-hour format for time picker.',
          code: `<DatePicker
  value={dateTime}
  onChange={setDateTime}
  showTime
  use24Hour
/>`,
          preview: <DatePicker value={dateTime} onChange={setDateTime} showTime use24Hour />,
        },
        {
          title: 'Disabled State',
          description: 'Disabled date picker.',
          code: `<DatePicker
  value={new Date()}
  disabled
/>`,
          preview: <DatePicker value={new Date()} disabled />,
        },
      ]}
      props={[
        {
          name: 'mode',
          type: '"single" | "range" | "multiple"',
          default: '"single"',
          description: 'Selection mode',
        },
        {
          name: 'value',
          type: 'Date | undefined',
          description: 'Selected date (single mode)',
        },
        {
          name: 'rangeValue',
          type: 'DateRange | undefined',
          description: 'Selected range (range mode)',
        },
        {
          name: 'onChange',
          type: '(date: Date | undefined) => void',
          description: 'Callback for single date selection',
        },
        {
          name: 'onRangeChange',
          type: '(range: DateRange | undefined) => void',
          description: 'Callback for range selection',
        },
        {
          name: 'showTime',
          type: 'boolean',
          default: 'false',
          description: 'Show time picker (single mode)',
        },
        {
          name: 'use24Hour',
          type: 'boolean',
          default: 'false',
          description: 'Use 24-hour time format',
        },
        {
          name: 'showPresets',
          type: 'boolean',
          default: 'false',
          description: 'Show preset quick selects (range mode)',
        },
        {
          name: 'showMonthYearPicker',
          type: 'boolean',
          default: 'false',
          description: 'Show month/year dropdown selectors',
        },
        {
          name: 'monthOnly',
          type: 'boolean',
          default: 'false',
          description: 'Month-only picker (no day grid)',
        },
        {
          name: 'numberOfMonths',
          type: '1 | 2',
          default: '1',
          description: 'Number of months to display',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the picker',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Custom placeholder text',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Full keyboard navigation in calendar grid',
        'Arrow keys move between dates',
        'Enter/Space selects focused date',
        'Escape closes popover',
        'Calendar auto-focuses on open',
        'Screen readers announce date selections',
        'Time inputs have labeled spinners',
      ]}
      previous={{
        title: 'Calendar',
        href: '/docs/components/calendar',
      }}
      next={{
        title: 'Dialog',
        href: '/docs/components/dialog',
      }}
    />
  );
}
