'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

type ExportFormat = 'json' | 'csv';

interface ExportOptions {
  includeProfile: boolean;
  includeSettings: boolean;
  includeActivity: boolean;
  includePreferences: boolean;
}

export function DataExport() {
  const [format, setFormat] = useState<ExportFormat>('json');
  const [options, setOptions] = useState<ExportOptions>({
    includeProfile: true,
    includeSettings: true,
    includeActivity: true,
    includePreferences: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOptionChange = (key: keyof ExportOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExport = async () => {
    // Verify at least one option is selected
    const hasSelection = Object.values(options).some((value) => value);
    if (!hasSelection) {
      toast({
        title: 'No data selected',
        description: 'Please select at least one data type to export.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate export delay for demo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Data exported',
      description: `Your data has been exported as ${format.toUpperCase()}.`,
    });

    setIsLoading(false);
  };

  return (
    <Card tone="neutral">
      <CardHeader code="0x02" title="EXPORT DATA" />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="format-select" className={cn(mode.font, 'text-xs')}>
            [FORMAT]:
          </Label>
          <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
            <SelectTrigger id="format-select" disabled={isLoading} className={mode.radius}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="json"
                className={cn(mode.radius, 'focus:bg-primary focus:text-primary-foreground')}
              >
                JSON
              </SelectItem>
              <SelectItem
                value="csv"
                className={cn(mode.radius, 'focus:bg-primary focus:text-primary-foreground')}
              >
                CSV
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 border-t pt-4">
          <Label className={cn(mode.font, 'text-xs')}>[DATA TO INCLUDE]:</Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="profile"
                checked={options.includeProfile}
                onCheckedChange={() => handleOptionChange('includeProfile')}
                disabled={isLoading}
                className={mode.radius}
              />
              <Label
                htmlFor="profile"
                className={cn(mode.font, 'flex-1 cursor-pointer text-xs font-normal')}
              >
                Profile Information
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="settings"
                checked={options.includeSettings}
                onCheckedChange={() => handleOptionChange('includeSettings')}
                disabled={isLoading}
                className={mode.radius}
              />
              <Label
                htmlFor="settings"
                className={cn(mode.font, 'flex-1 cursor-pointer text-xs font-normal')}
              >
                Settings & Preferences
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="activity"
                checked={options.includeActivity}
                onCheckedChange={() => handleOptionChange('includeActivity')}
                disabled={isLoading}
                className={mode.radius}
              />
              <Label
                htmlFor="activity"
                className={cn(mode.font, 'flex-1 cursor-pointer text-xs font-normal')}
              >
                Activity History
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="preferences"
                checked={options.includePreferences}
                onCheckedChange={() => handleOptionChange('includePreferences')}
                disabled={isLoading}
                className={mode.radius}
              />
              <Label
                htmlFor="preferences"
                className={cn(mode.font, 'flex-1 cursor-pointer text-xs font-normal')}
              >
                User Preferences
              </Label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleExport}
          disabled={isLoading || !Object.values(options).some((v) => v)}
          className={cn('w-full', mode.radius, mode.font, 'text-xs')}
        >
          {isLoading ? '> EXPORTING...' : '> DOWNLOAD DATA'}
        </Button>

        <p className={cn(mode.font, 'text-muted-foreground pt-2 text-xs')}>
          Your data is encrypted and will be deleted from our servers after download.
        </p>
      </CardContent>
    </Card>
  );
}

// Alias for backward compatibility
export const DataExportSection = DataExport;
