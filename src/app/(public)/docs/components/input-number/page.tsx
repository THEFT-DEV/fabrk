'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { InputNumber } from '@/components/ui/input-number';
import { useState } from 'react';

export default function InputNumberPage() {
  const [value, setValue] = useState<number | undefined>(0);
  const [rangeValue, setRangeValue] = useState<number | undefined>(50);
  const [decimalValue, setDecimalValue] = useState<number | undefined>(0);

  return (
    <ComponentShowcaseTemplate
      code="[UI.10]"
      title="Input Number"
      description="A number input component with optional stepper controls, min/max validation, and precision support."
      mainPreview={{
        code: `<InputNumber
  value={value}
  onValueChange={setValue}
  placeholder="Enter a number"
/>`,
        preview: (
          <InputNumber value={value} onValueChange={setValue} placeholder="Enter a number" />
        ),
      }}
      variants={[
        {
          title: 'With Min/Max Range',
          description: 'Constrain values between 0 and 100',
          code: `<InputNumber
  value={rangeValue}
  onValueChange={setRangeValue}
  min={0}
  max={100}
  placeholder="0-100"
/>`,
          preview: (
            <InputNumber
              value={rangeValue}
              onValueChange={setRangeValue}
              min={0}
              max={100}
              placeholder="0-100"
            />
          ),
        },
        {
          title: 'Custom Step',
          description: 'Increment/decrement by 5',
          code: `<InputNumber
  value={value}
  onValueChange={setValue}
  step={5}
  placeholder="Step by 5"
/>`,
          preview: (
            <InputNumber value={value} onValueChange={setValue} step={5} placeholder="Step by 5" />
          ),
        },
        {
          title: 'Decimal Precision',
          description: 'Support decimal values with 2 decimal places',
          code: `<InputNumber
  value={decimalValue}
  onValueChange={setDecimalValue}
  step={0.1}
  precision={2}
  placeholder="0.00"
/>`,
          preview: (
            <InputNumber
              value={decimalValue}
              onValueChange={setDecimalValue}
              step={0.1}
              precision={2}
              placeholder="0.00"
            />
          ),
        },
        {
          title: 'Without Controls',
          description: 'Hide the stepper buttons',
          code: `<InputNumber
  value={value}
  onValueChange={setValue}
  showControls={false}
  placeholder="No controls"
/>`,
          preview: (
            <InputNumber
              value={value}
              onValueChange={setValue}
              showControls={false}
              placeholder="No controls"
            />
          ),
        },
        {
          title: 'Disabled',
          description: 'Disabled state',
          code: `<InputNumber
  value={42}
  disabled
  placeholder="Disabled"
/>`,
          preview: <InputNumber value={42} disabled placeholder="Disabled" />,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'number | undefined',
          description: 'The controlled value of the input',
        },
        {
          name: 'defaultValue',
          type: 'number',
          default: '0',
          description: 'The default value (uncontrolled mode)',
        },
        {
          name: 'onValueChange',
          type: '(value: number | undefined) => void',
          description: 'Callback when the value changes',
        },
        {
          name: 'min',
          type: 'number',
          description: 'Minimum allowed value',
        },
        {
          name: 'max',
          type: 'number',
          description: 'Maximum allowed value',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Increment/decrement step size',
        },
        {
          name: 'precision',
          type: 'number',
          description: 'Number of decimal places to round to',
        },
        {
          name: 'showControls',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show increment/decrement buttons',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the input',
        },
      ]}
      accessibility={[
        "Uses role='spinbutton' for proper screen reader identification",
        'aria-valuemin, aria-valuemax, and aria-valuenow attributes set appropriately',
        "Increment button has aria-label='Increment value'",
        "Decrement button has aria-label='Decrement value'",
        'Arrow Up/Down keys increment/decrement the value',
        'Stepper buttons are disabled when min/max limits are reached',
      ]}
      previous={{
        title: 'Input Search',
        href: '/docs/components/input-search',
      }}
      next={{
        title: 'Input OTP',
        href: '/docs/components/input-otp',
      }}
    />
  );
}
