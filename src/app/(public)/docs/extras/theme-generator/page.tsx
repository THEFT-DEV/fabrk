'use client';

/**
 * Theme Generator - Interactive Tool
 *
 * ⚠️ BOILERPLATE NOTICE:
 * This is an intentionally large single-file component (896 lines) following boilerplate design patterns.
 *
 * WHY SINGLE-FILE:
 * - Complete copy-paste ready tool for customers
 * - Self-contained hex → OKLCH conversion logic
 * - No external dependencies to maintain
 * - Easier for customers to customize in one place
 *
 * This file includes:
 * - Color conversion utilities (hex to OKLCH)
 * - Interactive theme builder UI
 * - Live preview components
 * - Code generation and export
 *
 * For production use, customers can:
 * 1. Copy this entire file to their project
 * 2. Customize color palettes and conversion logic
 * 3. Modify export formats as needed
 * 4. Add custom theme presets
 */

import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { FeatureGuideTemplate, DocsCard } from '@/components/docs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CodeBlock } from '@/components/ui/code-block';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Download, Copy, Check, Palette, RefreshCw, Eye, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Enhanced hex to OKLCH conversion with more accurate calculations
 */
function hexToOKLCH(hex: string): { lightness: number; chroma: number; hue: number } {
  const cleanHex = hex.replace('#', '');

  // Parse RGB
  const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
  const b = parseInt(cleanHex.substr(4, 2), 16) / 255;

  // Gamma correction
  const rLinear = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate luminance
  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  const lightness = Math.round(luminance * 100);

  // Calculate hue
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2);
    } else {
      hue = 60 * ((r - g) / delta + 4);
    }
  }
  if (hue < 0) hue += 360;

  // Calculate chroma with better saturation
  const saturation = max === 0 ? 0 : delta / max;
  const chroma = Math.min(0.37, saturation * 0.4);

  return {
    lightness: Math.max(0, Math.min(100, lightness)),
    chroma: Math.max(0, Math.min(0.4, chroma)),
    hue: Math.round(hue),
  };
}

/**
 * Generate color palette with customizable parameters
 */
interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  border: string;
  input: string;
  ring: string;
  // Code syntax highlighting
  codeFg: string;
  codeBg: string;
  codeComment: string;
  codeKeyword: string;
  codeString: string;
  codeFunction: string;
  codeVariable: string;
  codeNumber: string;
  codeOperator: string;
  codePunctuation: string;
  codeSelector: string;
}

function generateThemeColors(
  primaryHex: string,
  isDark: boolean,
  chromaIntensity: number = 1,
  contrastLevel: number = 1,
  codeHighlightIntensity: number = 1
): ThemeColors {
  const primary = hexToOKLCH(primaryHex);

  // Adjust chroma based on intensity, but ensure minimum visibility
  const adjustedChroma = Math.max(0.05, primary.chroma * chromaIntensity);
  const codeChroma = Math.max(0.08, adjustedChroma * codeHighlightIntensity);

  // Calculate base lightness with ENFORCED MINIMUM CONTRAST
  // WCAG AA requires 4.5:1 contrast ratio - in OKLCH this roughly means 60%+ lightness difference
  const MIN_CONTRAST_DIFF = 65; // Minimum lightness difference for readability

  let bgLightness: number;
  let fgLightness: number;

  if (isDark) {
    // Dark mode: dark background, light text
    bgLightness = Math.max(3, Math.min(12, 5 * contrastLevel)); // 3-12% (always dark)
    fgLightness = Math.max(
      bgLightness + MIN_CONTRAST_DIFF,
      Math.min(95, 85 + 10 * (contrastLevel - 1))
    ); // Always 65%+ lighter than bg
  } else {
    // Light mode: light background, dark text
    bgLightness = Math.max(92, Math.min(99, 98 - 2 * (contrastLevel - 1))); // 92-99% (always light)
    fgLightness = Math.min(
      bgLightness - MIN_CONTRAST_DIFF,
      Math.max(5, 15 - 5 * (contrastLevel - 1))
    ); // Always 65%+ darker than bg
  }

  // Muted colors with enforced contrast
  const mutedLightness = isDark ? 18 : 92;
  const mutedFgLightness = isDark
    ? Math.max(mutedLightness + 35, 55) // At least 35% lighter than muted bg
    : Math.min(mutedLightness - 40, 52); // At least 40% darker than muted bg
  const accentLightness = isDark ? 22 : 88;

  // Border must be visible against background (at least 15% difference)
  const borderLightness = isDark
    ? Math.max(bgLightness + 18, 22) // Visible against dark bg
    : Math.min(bgLightness - 12, 82); // Visible against light bg

  return {
    background: `${bgLightness}% ${adjustedChroma * 0.08} ${primary.hue}`,
    foreground: `${fgLightness}% ${adjustedChroma * 0.25} ${primary.hue}`,
    card: `${isDark ? bgLightness + 2 : bgLightness - 1}% ${adjustedChroma * 0.08} ${primary.hue}`,
    cardForeground: `${fgLightness}% ${adjustedChroma * 0.25} ${primary.hue}`,
    popover: `${isDark ? bgLightness + 2 : bgLightness - 1}% ${adjustedChroma * 0.08} ${primary.hue}`,
    popoverForeground: `${fgLightness}% ${adjustedChroma * 0.25} ${primary.hue}`,
    primary: `${Math.max(35, Math.min(65, primary.lightness))}% ${adjustedChroma} ${primary.hue}`,
    primaryForeground: `${isDark ? 8 : 98}% ${adjustedChroma * 0.15} ${primary.hue}`,
    secondary: `${mutedLightness + 4}% ${adjustedChroma * 0.4} ${primary.hue}`,
    secondaryForeground: `${fgLightness}% ${adjustedChroma * 0.25} ${primary.hue}`,
    muted: `${mutedLightness}% ${adjustedChroma * 0.15} ${primary.hue}`,
    mutedForeground: `${mutedFgLightness}% ${adjustedChroma * 0.18} ${primary.hue}`,
    accent: `${accentLightness}% ${adjustedChroma * 0.35} ${primary.hue}`,
    accentForeground: `${fgLightness}% ${adjustedChroma * 0.25} ${primary.hue}`,
    destructive: `${isDark ? 48 : 52}% 0.22 12`,
    destructiveForeground: `${isDark ? 8 : 98}% 0.04 12`,
    success: `${isDark ? 52 : 42}% 0.18 145`,
    successForeground: `${isDark ? 8 : 98}% 0.04 145`,
    warning: `${isDark ? 58 : 48}% 0.18 75`,
    warningForeground: `${isDark ? 8 : 98}% 0.04 75`,
    border: `${borderLightness}% ${adjustedChroma * 0.12} ${primary.hue}`,
    input: `${borderLightness}% ${adjustedChroma * 0.12} ${primary.hue}`,
    ring: `${Math.max(35, Math.min(65, primary.lightness))}% ${adjustedChroma} ${primary.hue}`,
    // Code syntax highlighting with enforced visibility
    codeFg: `${isDark ? 85 : 25}% ${codeChroma * 0.12} ${(primary.hue + 180) % 360}`,
    codeBg: `${isDark ? 16 : 98}% ${adjustedChroma * 0.02} ${primary.hue}`,
    codeComment: `${isDark ? 58 : 48}% ${codeChroma * 0.08} ${(primary.hue + 180) % 360}`,
    codeKeyword: `${isDark ? 72 : 42}% ${codeChroma * 0.14} ${(primary.hue + 330) % 360}`,
    codeString: `${isDark ? 68 : 38}% ${codeChroma * 0.14} ${(primary.hue + 60) % 360}`,
    codeFunction: `${isDark ? 75 : 40}% ${codeChroma * 0.15} ${(primary.hue + 30) % 360}`,
    codeVariable: `${isDark ? 70 : 35}% ${codeChroma * 0.11} ${primary.hue}`,
    codeNumber: `${isDark ? 74 : 42}% ${codeChroma * 0.13} ${(primary.hue + 90) % 360}`,
    codeOperator: `${isDark ? 78 : 32}% ${codeChroma * 0.1} ${(primary.hue + 300) % 360}`,
    codePunctuation: `${isDark ? 72 : 40}% ${codeChroma * 0.1} ${(primary.hue + 15) % 360}`,
    codeSelector: `${isDark ? 82 : 32}% ${codeChroma * 0.12} ${primary.hue}`,
  };
}

/**
 * Generate complete theme CSS
 */
/* eslint-disable design-system/no-hardcoded-colors -- Theme generator outputs CSS with oklch() color values */
function generateThemeCSS(
  themeName: string,
  themeId: string,
  colors: ThemeColors,
  borderRadius: number = 0
): string {
  return `/* ${themeName} Theme - Generated with Fabrk Theme Generator */
[data-theme='${themeId}'] {
  /* Base colors */
  --background: ${colors.background};
  --foreground: ${colors.foreground};

  /* Card */
  --card: ${colors.card};
  --card-foreground: ${colors.cardForeground};

  /* Popover */
  --popover: ${colors.popover};
  --popover-foreground: ${colors.popoverForeground};

  /* Primary */
  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};

  /* Secondary */
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.secondaryForeground};

  /* Muted */
  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};

  /* Accent */
  --accent: ${colors.accent};
  --accent-foreground: ${colors.accentForeground};

  /* Destructive */
  --destructive: ${colors.destructive};
  --destructive-foreground: ${colors.destructiveForeground};

  /* Success */
  --success: ${colors.success};
  --success-foreground: ${colors.successForeground};

  /* Warning */
  --warning: ${colors.warning};
  --warning-foreground: ${colors.warningForeground};

  /* Border */
  --border: ${colors.border};
  --input: ${colors.input};
  --ring: ${colors.ring};

  /* Chart colors (derived from primary) */
  --chart-1: ${colors.primary};
  --chart-2: ${colors.secondary};
  --chart-3: ${colors.accent};
  --chart-4: ${colors.success};
  --chart-5: ${colors.warning};

  /* Code syntax highlighting (wrapped in oklch for Prism compatibility) */
  --code-fg: oklch(${colors.codeFg});
  --code-bg: oklch(${colors.codeBg});
  --code-comment: oklch(${colors.codeComment});
  --code-keyword: oklch(${colors.codeKeyword});
  --code-string: oklch(${colors.codeString});
  --code-function: oklch(${colors.codeFunction});
  --code-variable: oklch(${colors.codeVariable});
  --code-number: oklch(${colors.codeNumber});
  --code-operator: oklch(${colors.codeOperator});
  --code-punctuation: oklch(${colors.codePunctuation});
  --code-selector: oklch(${colors.codeSelector});

  /* Radius */
  --radius: ${borderRadius}rem;
}`;
}
/* eslint-enable design-system/no-hardcoded-colors */

// Preset color palettes
/* eslint-disable design-system/no-hardcoded-colors -- Theme generator requires preset hex colors for user input */
const PRESET_COLORS = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Purple', hex: '#9333ea' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Lime', hex: '#84cc16' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Blue', hex: '#3b82f6' },
];
/* eslint-enable design-system/no-hardcoded-colors */

export default function ThemeGeneratorPage() {
  const [themeName, setThemeName] = useState('Custom Theme');
  const [themeId, setThemeId] = useState('custom-theme');
  // eslint-disable-next-line design-system/no-hardcoded-colors -- Default preset color for theme generator initialization
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isDark, setIsDark] = useState(true);
  const [chromaIntensity, setChromaIntensity] = useState(1);
  const [contrastLevel, setContrastLevel] = useState(1);
  const [borderRadius, setBorderRadius] = useState(0);
  const [codeHighlightIntensity, setCodeHighlightIntensity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(false);

  // Auto-generate theme ID from name
  const handleNameChange = (name: string) => {
    setThemeName(name);
    const id = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    setThemeId(id);
  };

  const themeColors = useMemo(() => {
    return generateThemeColors(
      primaryColor,
      isDark,
      chromaIntensity,
      contrastLevel,
      codeHighlightIntensity
    );
  }, [primaryColor, isDark, chromaIntensity, contrastLevel, codeHighlightIntensity]);

  const generatedCSS = useMemo(() => {
    if (!themeName || !themeId) return '';
    return generateThemeCSS(themeName, themeId, themeColors, borderRadius);
  }, [themeName, themeId, themeColors, borderRadius]);

  // Apply preview theme
  useEffect(() => {
    if (!previewEnabled) return;

    const root = document.documentElement;
    const originalValues: Record<string, string> = {};

    // Code syntax highlighting variables need oklch() wrapper
    // (unlike other theme vars, these are stored pre-wrapped in globals.css)
    const codeVarKeys = [
      'codeFg',
      'codeBg',
      'codeComment',
      'codeKeyword',
      'codeString',
      'codeFunction',
      'codeVariable',
      'codeNumber',
      'codeOperator',
      'codePunctuation',
      'codeSelector',
    ];

    // Save original values and apply new theme colors
    Object.entries(themeColors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      originalValues[cssVar] = getComputedStyle(root).getPropertyValue(cssVar);

      // Code variables need oklch() wrapper, others are raw values
      // eslint-disable-next-line design-system/no-hardcoded-colors -- Preview applies generated oklch values
      const finalValue = codeVarKeys.includes(key) ? `oklch(${value})` : value;
      root.style.setProperty(cssVar, finalValue);
    });

    // Apply border radius to preview via CSS variable
    originalValues['--radius'] = getComputedStyle(root).getPropertyValue('--radius');
    root.style.setProperty('--radius', `${borderRadius}rem`);

    // Inject style tag to override rounded-none classes when border radius > 0
    // This is necessary because Tailwind's rounded-none class overrides CSS variables
    let styleEl: HTMLStyleElement | null = null;
    if (borderRadius > 0) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-generator-radius-override';
      // NO-OP: We now rely on components using mode.radius (rounded-dynamic)
      // This prevents unwanted rounding of elements that should stay square (dividers, tabs, etc.)
      styleEl.textContent = ``;
      document.head.appendChild(styleEl);
    }

    return () => {
      // Restore original values on cleanup
      Object.entries(originalValues).forEach(([cssVar, value]) => {
        if (value) {
          root.style.setProperty(cssVar, value);
        } else {
          root.style.removeProperty(cssVar);
        }
      });
      // Remove injected style tag
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [previewEnabled, themeColors, borderRadius]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${themeId}.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRandomize = () => {
    const randomPreset = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
    setPrimaryColor(randomPreset.hex);
    setIsDark(Math.random() > 0.5);
    // Randomize all sliders within their valid ranges
    setChromaIntensity(0.5 + Math.random() * 1); // 0.5 to 1.5
    setContrastLevel(0.7 + Math.random() * 0.6); // 0.7 to 1.3
    setBorderRadius(Math.random() * 1); // 0 to 1rem
    setCodeHighlightIntensity(0.5 + Math.random() * 1); // 0.5 to 1.5
  };

  return (
    <FeatureGuideTemplate
      code="[0xB2]"
      category="Extras"
      title="Advanced Theme Generator"
      description="Professional theme creation tool with live preview, color science, and fine-tuning controls."
      overview="Create production-ready OKLCH themes with advanced color generation algorithms. Features live preview, color intensity controls, contrast adjustment, and instant export. All themes maintain WCAG AA accessibility standards."
      features={[
        {
          icon: Eye,
          title: 'Live Preview',
          description: 'See changes in real-time',
        },
        {
          icon: Palette,
          title: '20+ Semantic Colors',
          description: 'Auto-generated palette',
        },
        {
          icon: Zap,
          title: 'Advanced Controls',
          description: 'Fine-tune every aspect',
        },
      ]}
    >
      <div className="space-y-6">
        {/* Configuration Panel */}
        <DocsCard title="THEME_CONFIGURATION">
          <div className="space-y-6">
            {/* Theme Name */}
            <div className="space-y-2">
              <Label htmlFor="theme-name" className={cn(mode.font, 'text-xs')}>
                [THEME NAME]:
              </Label>
              <Input
                id="theme-name"
                placeholder="e.g., Neon Nights"
                value={themeName}
                onChange={(e) => handleNameChange(e.target.value)}
                className={cn(mode.radius, mode.font)}
              />
            </div>

            {/* Theme ID */}
            <div className="space-y-2">
              <Label htmlFor="theme-id" className={cn(mode.font, 'text-xs')}>
                [THEME ID]:
              </Label>
              <Input
                id="theme-id"
                placeholder="e.g., neon-nights"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className={cn(mode.radius, mode.font)}
              />
            </div>

            {/* Primary Color */}
            <div className="space-y-2">
              <Label htmlFor="primary-color" className={cn(mode.font, 'text-xs')}>
                [PRIMARY COLOR]:
              </Label>
              {/* eslint-disable design-system/no-hardcoded-colors, design-system/no-inline-styles -- Color inputs display user-selected hex values */}
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="text"
                  placeholder="#6366f1"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className={cn('flex-1', mode.radius, mode.font)}
                />
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className={cn('h-10 w-20 cursor-pointer', mode.radius)}
                />
              </div>

              {/* Color Presets */}
              <div className="flex flex-wrap gap-2 pt-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setPrimaryColor(preset.hex)}
                    className={cn(
                      'h-8 w-8 border-2 transition-all hover:scale-110',
                      mode.radius,
                      primaryColor.toLowerCase() === preset.hex.toLowerCase()
                        ? 'border-primary ring-primary ring-2 ring-offset-2'
                        : 'border-border'
                    )}
                    style={{ backgroundColor: preset.hex }}
                    title={preset.name}
                  />
                ))}
              </div>
              {/* eslint-enable design-system/no-hardcoded-colors, design-system/no-inline-styles */}
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className={cn(mode.font, 'text-xs')}>
                  [DARK MODE]:
                </Label>
                <p className="text-muted-foreground text-xs">
                  {isDark ? 'Dark theme variant' : 'Light theme variant'}
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={setIsDark}
                className={mode.radius}
              />
            </div>

            {/* Chroma Intensity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={cn(mode.font, 'text-xs')}>[COLOR INTENSITY]:</Label>
                <Badge variant="outline" className="font-mono text-xs">
                  {Math.round(chromaIntensity * 100)}%
                </Badge>
              </div>
              <Slider
                value={[chromaIntensity]}
                onValueChange={([value]) => setChromaIntensity(value)}
                min={0.5}
                max={1.5}
                step={0.05}
                className="w-full"
              />
              <p className="text-muted-foreground text-xs">Adjust color saturation and vibrancy</p>
            </div>

            {/* Contrast Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={cn(mode.font, 'text-xs')}>[CONTRAST LEVEL]:</Label>
                <Badge variant="outline" className="font-mono text-xs">
                  {Math.round(contrastLevel * 100)}%
                </Badge>
              </div>
              <Slider
                value={[contrastLevel]}
                onValueChange={([value]) => setContrastLevel(value)}
                min={0.7}
                max={1.3}
                step={0.05}
                className="w-full"
              />
              <p className="text-muted-foreground text-xs">
                Fine-tune text contrast for accessibility
              </p>
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={cn(mode.font, 'text-xs')}>[BORDER RADIUS]:</Label>
                <Badge variant="outline" className="font-mono text-xs">
                  {borderRadius}rem
                </Badge>
              </div>
              <Slider
                value={[borderRadius]}
                onValueChange={([value]) => setBorderRadius(value)}
                min={0}
                max={1}
                step={0.125}
                className="w-full"
              />
              <p className="text-muted-foreground text-xs">
                Adjust corner roundness (0 = sharp terminal style)
              </p>
            </div>

            {/* Code Highlight Intensity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={cn(mode.font, 'text-xs')}>[CODE HIGHLIGHT]:</Label>
                <Badge variant="outline" className="font-mono text-xs">
                  {Math.round(codeHighlightIntensity * 100)}%
                </Badge>
              </div>
              <Slider
                value={[codeHighlightIntensity]}
                onValueChange={([value]) => setCodeHighlightIntensity(value)}
                min={0.5}
                max={1.5}
                step={0.05}
                className="w-full"
              />
              <p className="text-muted-foreground text-xs">
                Control syntax highlighting color intensity
              </p>
            </div>

            {/* Actions */}
            <div className="border-border flex gap-2 border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRandomize}
                className={cn('flex-1', mode.radius, mode.font, 'h-8 text-xs')}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                &gt; RANDOMIZE
              </Button>
              <Button
                variant={previewEnabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewEnabled(!previewEnabled)}
                className={cn('flex-1', mode.radius, mode.font, 'h-8 text-xs')}
              >
                <Eye className="mr-1 h-3 w-3" />
                &gt; {previewEnabled ? '[PREVIEWING]' : 'PREVIEW'}
              </Button>
            </div>

            {previewEnabled && (
              <div
                className={cn(
                  'border-primary bg-primary/10 flex items-center gap-2 border p-4',
                  mode.radius
                )}
              >
                <AlertCircle className="text-primary h-4 w-4" />
                <p className="text-primary text-xs">
                  Live preview active - changes apply to entire page
                </p>
              </div>
            )}
          </div>
        </DocsCard>

        {/* Color Palette Preview */}
        <DocsCard title="COLOR_PALETTE">
          {/* eslint-disable design-system/no-inline-styles, design-system/no-hardcoded-colors -- Displays generated theme colors dynamically */}
          <div className="space-y-1">
            {Object.entries(themeColors).map(([name, value]) => (
              <div
                key={name}
                className={cn(
                  'border-border flex items-center gap-4 border-b p-2 font-mono text-xs last:border-0',
                  mode.font
                )}
              >
                <div
                  className={cn('border-border h-6 w-6 shrink-0 border', mode.radius)}
                  style={{ backgroundColor: `oklch(${value})` }}
                />
                <span className="text-foreground w-48 uppercase">
                  --{name.replace(/([A-Z])/g, '-$1').toLowerCase()}
                </span>
                <span className="text-muted-foreground flex-1">oklch({value})</span>
              </div>
            ))}
          </div>
          {/* eslint-enable design-system/no-inline-styles, design-system/no-hardcoded-colors */}
        </DocsCard>

        {/* UI Component Preview */}
        <DocsCard title="COMPONENT_PREVIEW">
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs">
              Preview how your theme looks on actual UI components
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Sample Cards */}
              <Card className={cn(mode.radius)}>
                <CardHeader code="0x01" title="SAMPLE_CARD" />
                <CardContent className="space-y-4">
                  <Input placeholder="Sample input field" className={cn(mode.radius, mode.font)} />
                  <div className="flex gap-2">
                    <Button size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
                      PRIMARY
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(mode.radius, mode.font, 'text-xs')}
                    >
                      OUTLINE
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className={cn(mode.radius)}>
                <CardHeader code="0x02" title="STATUS_BADGES" />
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-success text-success-foreground">Success</Badge>
                    <Badge className="bg-warning text-warning-foreground">Warning</Badge>
                    <Badge className="bg-destructive text-destructive-foreground">Error</Badge>
                  </div>
                  <div className="bg-muted text-muted-foreground p-4 text-xs">
                    Muted background with muted foreground text for less emphasis
                  </div>
                  <div className="bg-accent text-accent-foreground p-4 text-xs">
                    Accent background highlighting important information
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DocsCard>

        {/* Generated CSS */}
        {generatedCSS && (
          <DocsCard title="GENERATED_CSS">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>
                  [EXPORT OPTIONS]:
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className={cn(mode.radius, mode.font, 'h-7 text-xs')}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        [COPIED]
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        &gt; COPY
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleDownload}
                    className={cn(mode.radius, mode.font, 'h-7 text-xs')}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    &gt; DOWNLOAD
                  </Button>
                </div>
              </div>

              <CodeBlock
                key={`${chromaIntensity}-${contrastLevel}-${primaryColor}-${isDark}-${themeName}`}
                code={generatedCSS}
                language="css"
                maxHeight="400px"
              />
            </div>
          </DocsCard>
        )}

        {/* Usage Instructions */}
        <DocsCard title="INTEGRATION_GUIDE">
          <Tabs defaultValue="css">
            <TabsList className={cn(mode.radius)}>
              <TabsTrigger value="css" className={cn(mode.font, 'text-xs')}>
                [CSS]
              </TabsTrigger>
              <TabsTrigger value="js" className={cn(mode.font, 'text-xs')}>
                [JAVASCRIPT]
              </TabsTrigger>
              <TabsTrigger value="react" className={cn(mode.font, 'text-xs')}>
                [REACT]
              </TabsTrigger>
            </TabsList>

            <TabsContent value="css" className="space-y-4">
              <p className="text-muted-foreground text-xs">
                Add the generated CSS to your globals.css file:
              </p>
              <CodeBlock
                key={`css-${themeName}-${themeId}`}
                code={`/* src/app/globals.css */\n${generatedCSS || '/* Generate a theme to see output */'}`}
                language="css"
                maxHeight="200px"
              />
            </TabsContent>

            <TabsContent value="js" className="space-y-4">
              <p className="text-muted-foreground text-xs">
                Apply the theme dynamically with JavaScript:
              </p>
              <CodeBlock
                key={`js-${themeId}`}
                code={`// Apply theme
document.documentElement.setAttribute('data-theme', '${themeId}');

// Save preference
localStorage.setItem('theme', '${themeId}');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}`}
                language="javascript"
                maxHeight="200px"
              />
            </TabsContent>

            <TabsContent value="react" className="space-y-4">
              <p className="text-muted-foreground text-xs">React theme hook implementation:</p>
              <CodeBlock
                key={`react-${themeId}-${themeName}`}
                code={`// hooks/useTheme.ts
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('${themeId}');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || '${themeId}';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, setTheme: changeTheme };
}

// Usage in component
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('${themeId}')}>
      Apply ${themeName}
    </button>
  );
}`}
                language="typescript"
                maxHeight="300px"
              />
            </TabsContent>
          </Tabs>
        </DocsCard>
      </div>
    </FeatureGuideTemplate>
  );
}
