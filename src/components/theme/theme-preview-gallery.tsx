/**
 * Theme Preview Gallery
 * Interactive showcase of all 12 themes with live previews
 * Displays theme name, colors, and sample UI components
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Monitor, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export interface ThemeData {
  id: string;
  name: string;
  category: 'CRT' | 'Retro' | 'Minimal';
  description: string;
  primaryColor: string; // OKLCH value for preview
  backgroundColor: string; // OKLCH value for preview
}

const THEMES: ThemeData[] = [
  // CRT Phosphor Themes
  {
    id: 'green',
    name: 'Green CRT',
    category: 'CRT',
    description: 'Classic green phosphor terminal',
    primaryColor: '40% 0.25 140',
    backgroundColor: '5% 0.01 140',
  },
  {
    id: 'red',
    name: 'Red CRT',
    category: 'CRT',
    description: 'Warm red monochrome display',
    primaryColor: '40% 0.25 0',
    backgroundColor: '5% 0.01 0',
  },
  {
    id: 'blue',
    name: 'Blue CRT',
    category: 'CRT',
    description: 'Cool blue terminal aesthetic',
    primaryColor: '40% 0.2 200',
    backgroundColor: '4% 0.01 200',
  },
  {
    id: 'amber',
    name: 'Amber CRT',
    category: 'CRT',
    description: 'Vintage amber monochrome',
    primaryColor: '35% 0.2 50',
    backgroundColor: '5% 0.01 50',
  },
  {
    id: 'purple',
    name: 'Purple CRT',
    category: 'CRT',
    description: 'Retro purple phosphor',
    primaryColor: '55% 0.22 300',
    backgroundColor: '5% 0.01 300',
  },

  // Retro Computer Themes
  {
    id: 'gameboy',
    name: 'Game Boy',
    category: 'Retro',
    description: 'DMG-01 LCD green',
    primaryColor: '25% 0.14 85',
    backgroundColor: '85% 0.18 85',
  },
  {
    id: 'c64',
    name: 'Commodore 64',
    category: 'Retro',
    description: 'Iconic C64 blue',
    primaryColor: '68% 0.2 280',
    backgroundColor: '25% 0.1 280',
  },
  {
    id: 'gbpocket',
    name: 'Game Boy Pocket',
    category: 'Retro',
    description: 'Monochrome LCD',
    primaryColor: '20% 0.01 0',
    backgroundColor: '94% 0.01 0',
  },
  {
    id: 'vic20',
    name: 'VIC-20',
    category: 'Retro',
    description: 'Cyan Commodore display',
    primaryColor: '25% 0.12 180',
    backgroundColor: '90% 0.06 180',
  },
  {
    id: 'atari',
    name: 'Atari 800',
    category: 'Retro',
    description: 'Classic Atari blue',
    primaryColor: '73% 0.2 220',
    backgroundColor: '35% 0.1 220',
  },
  {
    id: 'spectrum',
    name: 'ZX Spectrum',
    category: 'Retro',
    description: 'Sinclair bright mode',
    primaryColor: '18% 0.12 250',
    backgroundColor: '96% 0.02 250',
  },

  // Minimal
  {
    id: 'bw',
    name: 'Black & White',
    category: 'Minimal',
    description: 'Pure grayscale aesthetic',
    primaryColor: '0% 0 0',
    backgroundColor: '100% 0 0',
  },
];

export interface ThemePreviewGalleryProps {
  /** Currently active theme ID */
  currentTheme?: string;
  /** Callback when theme is selected */
  onThemeSelect?: (themeId: string) => void;
  /** Show category filters */
  showFilters?: boolean;
}

export function ThemePreviewGallery({
  currentTheme,
  onThemeSelect,
  showFilters = true,
}: ThemePreviewGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'CRT', 'Retro', 'Minimal'];

  const filteredThemes =
    selectedCategory === 'All'
      ? THEMES
      : THEMES.filter((theme) => theme.category === selectedCategory);

  return (
    <div className="w-full space-y-6">
      {/* Category Filters */}
      {showFilters && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category === 'All' && <Palette className="size-4" />}
                {category === 'CRT' && <Monitor className="size-4" />}
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Theme Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredThemes.map((theme) => (
          <Card
            key={theme.id}
            interactive
            className={cn(
              'relative flex flex-col overflow-hidden transition-all',
              currentTheme === theme.id &&
                'border-primary ring-primary ring-offset-background ring-2 ring-offset-2'
            )}
          >
            <CardHeader
              code={`0x${theme.id.substring(0, 2)}`}
              title={theme.name.toUpperCase()}
              meta={
                <Badge variant="outline" className="ml-auto">
                  [{theme.category.toUpperCase()}]
                </Badge>
              }
            />

            <CardContent className="flex flex-1 flex-col space-y-4">
              {/* Color Swatches */}
              {/* eslint-disable design-system/no-inline-styles, design-system/no-hardcoded-colors -- Displays theme colors dynamically */}
              <div className="flex gap-2">
                <div
                  className={cn('border-border h-12 w-12 border-2', mode.radius)}
                  style={{ backgroundColor: `oklch(${theme.backgroundColor})` }}
                  title="Background"
                />
                <div
                  className={cn('border-border h-12 w-12 border-2', mode.radius)}
                  style={{ backgroundColor: `oklch(${theme.primaryColor})` }}
                  title="Primary"
                />
              </div>
              {/* eslint-enable design-system/no-inline-styles, design-system/no-hardcoded-colors */}

              {/* Description */}
              <p className={cn(mode.font, 'text-muted-foreground text-xs')}>{theme.description}</p>

              {/* Sample UI Preview */}
              <div className="border-border space-y-2 border-t pt-4">
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>[PREVIEW]:</div>

                {/* Mini component samples */}
                <div className="space-y-2">
                  <Input
                    placeholder="Sample input..."
                    className={cn(mode.radius, mode.font, 'h-8 text-xs')}
                    disabled
                  />
                  <div className="flex gap-2">
                    <Badge variant="default" className="text-xs">
                      PRIMARY
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      OUTLINE
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="mt-auto pt-2">
                <Button
                  variant={currentTheme === theme.id ? 'default' : 'outline'}
                  size="sm"
                  className={cn('w-full', mode.radius, mode.font, 'text-xs')}
                  onClick={() => onThemeSelect?.(theme.id)}
                >
                  {currentTheme === theme.id && <Check className="mr-2 size-4" />}
                  &gt; {currentTheme === theme.id ? 'ACTIVE' : 'SELECT'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Footer */}
      <Card>
        <CardContent className="p-4">
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INFO]: All {THEMES.length} themes use OKLCH color space for perceptual uniformity.
            Themes automatically adapt component styling, maintaining WCAG 2.2 AA accessibility
            compliance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
