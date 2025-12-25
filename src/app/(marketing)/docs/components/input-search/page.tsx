'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { InputSearch } from '@/components/ui/input-search';
import { useState } from 'react';

export default function InputSearchPage() {
  const [searchValue, setSearchValue] = useState('');
  const [loadingValue, setLoadingValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingSearch = (value: string) => {
    setLoadingValue(value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.15]"
      title="Input Search"
      description="A search input component with built-in search icon, optional clear button, and loading state support."
      mainPreview={{
        code: `<InputSearch
  value={searchValue}
  onValueChange={setSearchValue}
  placeholder="Search..."
/>`,
        preview: (
          <InputSearch value={searchValue} onValueChange={setSearchValue} placeholder="Search..." />
        ),
      }}
      variants={[
        {
          title: 'With Loading State',
          description: 'Display a loading spinner while searching',
          code: `<InputSearch
  value={loadingValue}
  onValueChange={handleLoadingSearch}
  loading={isLoading}
  placeholder="Search with loading..."
/>`,
          preview: (
            <InputSearch
              value={loadingValue}
              onValueChange={handleLoadingSearch}
              loading={isLoading}
              placeholder="Search with loading..."
            />
          ),
        },
        {
          title: 'Without Clear Button',
          description: 'Hide the clear button',
          code: `<InputSearch
  value={searchValue}
  onValueChange={setSearchValue}
  showClearButton={false}
  placeholder="No clear button..."
/>`,
          preview: (
            <InputSearch
              value={searchValue}
              onValueChange={setSearchValue}
              showClearButton={false}
              placeholder="No clear button..."
            />
          ),
        },
        {
          title: 'Disabled',
          description: 'Disabled state',
          code: `<InputSearch
  value="Disabled search"
  disabled
  placeholder="Disabled..."
/>`,
          preview: <InputSearch value="Disabled search" disabled placeholder="Disabled..." />,
        },
        {
          title: 'With Clear Handler',
          description: 'Custom handler when clear button is clicked',
          code: `<InputSearch
  value={searchValue}
  onValueChange={setSearchValue}
  onClear={() => console.log("Cleared!")}
  placeholder="Search with clear handler..."
/>`,
          preview: (
            <InputSearch
              value={searchValue}
              onValueChange={setSearchValue}
              onClear={() => console.log('Cleared!')}
              placeholder="Search with clear handler..."
            />
          ),
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the input',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when the value changes',
        },
        {
          name: 'onClear',
          type: '() => void',
          description: 'Optional callback when clear button is clicked',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading spinner instead of clear button',
        },
        {
          name: 'showClearButton',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show the clear button when input has value',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the input',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text',
        },
      ]}
      accessibility={[
        "Clear button includes aria-label='Clear search' for screen readers",
        'Search icon is decorative and does not interfere with screen readers',
        'Supports all standard input keyboard interactions',
        'Loading state is visually indicated with spinner animation',
      ]}
      previous={{
        title: 'Input',
        href: '/docs/components/input',
      }}
      next={{
        title: 'Input Number',
        href: '/docs/components/input-number',
      }}
    />
  );
}
