'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { useState } from 'react';

export default function InputOTPPage() {
  const [value, setValue] = useState('');
  const [sixDigit, setSixDigit] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  return (
    <ComponentShowcaseTemplate
      code="[UI.11]"
      title="Input OTP"
      description="A one-time password input component with individual character slots and automatic focus management."
      mainPreview={{
        code: `<InputOTP maxLength={4} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
        preview: (
          <InputOTP maxLength={4} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        ),
      }}
      variants={[
        {
          title: '6-Digit Code',
          description: 'Common format for email/SMS verification codes',
          code: `<InputOTP maxLength={6} value={sixDigit} onChange={setSixDigit}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
          preview: (
            <InputOTP maxLength={6} value={sixDigit} onChange={setSixDigit}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
        {
          title: 'With Separator',
          description: 'Group digits with visual separator',
          code: `<InputOTP maxLength={6} value={phoneCode} onChange={setPhoneCode}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
          preview: (
            <InputOTP maxLength={6} value={phoneCode} onChange={setPhoneCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
        {
          title: 'Disabled',
          description: 'Disabled state',
          code: `<InputOTP maxLength={4} value="1234" disabled>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
          preview: (
            <InputOTP maxLength={4} value="1234" disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
        {
          title: '8-Digit with Groups',
          description: 'Longer codes with multiple groups',
          code: `<InputOTP maxLength={8} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
    <InputOTPSlot index={6} />
    <InputOTPSlot index={7} />
  </InputOTPGroup>
</InputOTP>`,
          preview: (
            <InputOTP maxLength={8} value={value} onChange={setValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
      ]}
      props={[
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum number of characters (required)',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the input',
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Callback when the value changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the input',
        },
        {
          name: 'containerClassName',
          type: 'string',
          description: 'Additional classes for the container',
        },
      ]}
      accessibility={[
        'Automatically focuses next slot on character entry',
        'Backspace moves to previous slot when current is empty',
        'Visual caret indicator shows current input position',
        'Active slot is highlighted with ring for keyboard users',
        'Paste support - automatically distributes characters across slots',
        'Screen readers announce each character slot individually',
      ]}
      previous={{
        title: 'Input Number',
        href: '/docs/components/input-number',
      }}
      next={{
        title: 'Combobox',
        href: '/docs/components/combobox',
      }}
    />
  );
}
