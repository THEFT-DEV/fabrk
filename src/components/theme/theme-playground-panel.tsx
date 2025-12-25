'use client';

import { Check, Copy, Moon, Palette, Sun, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/design-system/providers/ThemeProvider';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

type RadiusOption = 'none' | 'sm' | 'md' | 'lg' | 'full';
type ScaleOption = '90' | '95' | '100' | '105' | '110';
type PanelBackground = 'solid' | 'translucent';
interface ThemeConfig {
  accentColor: string;
  appearance: 'light' | 'dark';
  radius: RadiusOption;
  scale: ScaleOption;
  panelBackground: PanelBackground;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const ACCENT_COLORS = [
  // Row 1 - Standard CRT
  { id: 'amber', color: '#ffb000', name: 'Amber' },
  { id: 'green', color: '#33ff66', name: 'Green' },
  { id: 'blue', color: '#55ccff', name: 'Blue' },
  { id: 'purple', color: '#bb88ff', name: 'Purple' },
  { id: 'red', color: '#ff6655', name: 'Red' },
  // Row 2 - Futuristic
  { id: 'cyberpunk', color: '#ff0050', name: 'Cyberpunk' },
  { id: 'phosphor', color: '#00ff41', name: 'Phosphor' },
  { id: 'holographic', color: '#00ffff', name: 'Holographic' },
  { id: 'navigator', color: '#ff8c00', name: 'Navigator' },
  { id: 'blueprint', color: '#4a90d9', name: 'Blueprint' },
  // Row 3 - Retro & Handheld
  { id: 'atari', color: '#305070', name: 'Atari' },
  { id: 'c64', color: '#8888ff', name: 'C64' },
  { id: 'spectrum', color: '#ff00ff', name: 'Spectrum' },
  { id: 'vic20', color: '#00ffff', name: 'VIC-20' },
  { id: 'gameboy', color: '#9bbc0f', name: 'Game Boy' },
  // Row 4 - Additional
  { id: 'gbpocket', color: '#8a8a8a', name: 'GB Pocket' },
  { id: 'infrared', color: '#cc3333', name: 'Infrared' },
  { id: 'bw', color: '#ffffff', name: 'B&W' },
] as const;

const RADIUS_OPTIONS: { value: RadiusOption; label: string; cssValue: string }[] = [
  { value: 'none', label: 'None', cssValue: '0' },
  { value: 'sm', label: 'Small', cssValue: '0.25rem' },
  { value: 'md', label: 'Medium', cssValue: '0.5rem' },
  { value: 'lg', label: 'Large', cssValue: '0.75rem' },
  { value: 'full', label: 'Full', cssValue: '9999px' },
];

const SCALE_OPTIONS: ScaleOption[] = ['90', '95', '100', '105', '110'];

const STORAGE_KEY = 'fabrk-playground-config';

// =============================================================================
// COMPONENT
// =============================================================================

export function ThemePlaygroundPanel() {
  const { colorTheme, setColorTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  // Playground-specific settings (stored locally, not affecting global theme)
  const [config, setConfig] = useState<ThemeConfig>({
    accentColor: colorTheme,
    appearance: colorTheme === 'bw' ? 'light' : 'dark',
    radius: 'none', // Terminal default
    scale: '100',
    panelBackground: 'solid',
  });

  // Load saved config on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ThemeConfig>;
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  // Sync with actual theme
  useEffect(() => {
    if (mounted) {
      setConfig((prev) => ({
        ...prev,
        accentColor: colorTheme,
        appearance: colorTheme === 'bw' ? 'light' : 'dark',
      }));
    }
  }, [colorTheme, mounted]);

  // Apply radius to document - inject CSS to override rounded-none
  useEffect(() => {
    if (!mounted) return;
    const radiusValue = RADIUS_OPTIONS.find((r) => r.value === config.radius)?.cssValue || '0';
    document.documentElement.style.setProperty('--radius', radiusValue);

    // Inject/update style tag to override Tailwind's rounded-none when radius is not 'none'
    let styleTag = document.getElementById('theme-playground-radius');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-playground-radius';
      document.head.appendChild(styleTag);
    }

    if (config.radius === 'none') {
      // Remove overrides when radius is none (terminal default)
      styleTag.textContent = '';
    } else {
      // Override rounded-none and apply radius to key elements
      styleTag.textContent = `
        /* Theme Playground: Override radius */
        [data-slot="card"],
        [data-slot="button"],
        [data-slot="badge"],
        [data-slot="metric-card"],
        [data-slot="feature-card"],
        .rounded-none {
          border-radius: ${radiusValue} !important;
        }

        /* Inputs and form elements */
        input:not([type="checkbox"]):not([type="radio"]),
        textarea,
        select,
        [data-slot="select-trigger"],
        [data-slot="input"] {
          border-radius: ${radiusValue} !important;
        }

        /* Popovers and dropdowns */
        [data-slot="popover-content"],
        [data-slot="select-content"],
        [data-slot="dropdown-menu-content"],
        [data-slot="dialog-content"],
        [data-slot="sheet-content"] {
          border-radius: ${radiusValue} !important;
        }
      `;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config, mounted]);

  // Apply scale to document
  useEffect(() => {
    if (!mounted) return;
    const scaleValue = parseInt(config.scale) / 100;
    document.documentElement.style.setProperty('--ui-scale', scaleValue.toString());
    // Apply scale transform to main content
    const main = document.querySelector('main');
    if (main && config.scale !== '100') {
      main.style.transform = `scale(${scaleValue})`;
      main.style.transformOrigin = 'top left';
      main.style.width = `${100 / scaleValue}%`;
    } else if (main) {
      main.style.transform = '';
      main.style.transformOrigin = '';
      main.style.width = '';
    }
  }, [config.scale, mounted]);

  const handleAccentChange = useCallback(
    (id: string) => {
      setColorTheme(id as typeof colorTheme);
      setConfig((prev) => ({
        ...prev,
        accentColor: id,
        appearance: id === 'bw' ? 'light' : 'dark',
      }));
    },
    [setColorTheme]
  );

  const handleAppearanceChange = useCallback(
    (appearance: 'light' | 'dark') => {
      if (appearance === 'light') {
        setColorTheme('bw');
      } else if (config.accentColor === 'bw') {
        setColorTheme('green'); // Default dark theme
      }
      setConfig((prev) => ({ ...prev, appearance }));
    },
    [config.accentColor, setColorTheme]
  );

  const handleCopyTheme = useCallback(async () => {
    const themeCode = `// Theme Configuration
const themeConfig = {
  accentColor: '${config.accentColor}',
  appearance: '${config.appearance}',
  radius: '${config.radius}', // CSS: ${RADIUS_OPTIONS.find((r) => r.value === config.radius)?.cssValue}
  scale: '${config.scale}%',
  panelBackground: '${config.panelBackground}',
};

// Apply to your globals.css:
:root {
  --radius: ${RADIUS_OPTIONS.find((r) => r.value === config.radius)?.cssValue};
}

// Set data-theme attribute:
document.documentElement.setAttribute('data-theme', '${config.accentColor}');`;

    try {
      await navigator.clipboard.writeText(themeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = themeCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [config]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Toggle Button - Top right, below nav */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed right-6 top-20 z-50',
          'flex h-10 w-10 items-center justify-center',
          'border border-border bg-card',
          'transition-all duration-200',
          'hover:bg-muted hover:border-primary',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          isOpen && 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
        aria-label="Toggle theme playground"
      >
        <Palette className="h-4 w-4" />
      </button>

      {/* Panel - Anchored to top right */}
      {isOpen && (
        <div
          className={cn(
            'fixed right-6 top-32 z-50',
            'w-72 max-h-[calc(100vh-10rem)] overflow-y-auto',
            'border border-border',
            config.panelBackground === 'translucent'
              ? 'bg-card/80 backdrop-blur-md'
              : 'bg-card',
            'animate-in slide-in-from-top-5 duration-200'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <span className="font-mono text-sm font-medium uppercase tracking-wide">
              Theme
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6 p-4">
            {/* Accent Color */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Accent color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleAccentChange(color.id)}
                    onMouseEnter={() => setHoveredColor(color.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={cn(
                      'relative h-8 w-8 transition-all duration-150',
                      'hover:scale-110 hover:z-10',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                      config.accentColor === color.id && 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                    )}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                    aria-label={`Select ${color.name} theme`}
                  >
                    {config.accentColor === color.id && (
                      <Check
                        className={cn(
                          'absolute inset-0 m-auto h-4 w-4',
                          color.id === 'bw' ? 'text-black' : 'text-white'
                        )}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
              {hoveredColor && (
                <p className="font-mono text-xs text-muted-foreground">{hoveredColor}</p>
              )}
            </div>

            {/* Appearance */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Appearance
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAppearanceChange('light')}
                  className={cn(
                    'flex items-center justify-center gap-2 border px-4 py-2',
                    'font-mono text-xs transition-all',
                    config.appearance === 'light'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </button>
                <button
                  onClick={() => handleAppearanceChange('dark')}
                  className={cn(
                    'flex items-center justify-center gap-2 border px-4 py-2',
                    'font-mono text-xs transition-all',
                    config.appearance === 'dark'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
              </div>
            </div>

            {/* Radius */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Radius
              </label>
              <div className="grid grid-cols-5 gap-2">
                {RADIUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setConfig((prev) => ({ ...prev, radius: option.value }))}
                    className={cn(
                      'flex flex-col items-center gap-1 border px-2 py-2',
                      'font-mono text-[10px] transition-all',
                      config.radius === option.value
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {/* Visual preview of radius */}
                    <div
                      className={cn(
                        'h-6 w-6 border-2',
                        config.radius === option.value
                          ? 'border-background bg-background/20'
                          : 'border-primary bg-primary/20'
                      )}
                      style={{
                        borderRadius:
                          option.value === 'none'
                            ? '0'
                            : option.value === 'sm'
                              ? '4px'
                              : option.value === 'md'
                                ? '8px'
                                : option.value === 'lg'
                                  ? '12px'
                                  : '50%',
                      }}
                    />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scaling */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Scaling
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SCALE_OPTIONS.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setConfig((prev) => ({ ...prev, scale }))}
                    className={cn(
                      'border px-2 py-2',
                      'font-mono text-xs transition-all',
                      config.scale === scale
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {scale}%
                  </button>
                ))}
              </div>
            </div>

            {/* Panel Background */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Panel background
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, panelBackground: 'solid' }))}
                  className={cn(
                    'border px-4 py-2',
                    'font-mono text-xs transition-all',
                    config.panelBackground === 'solid'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  Solid
                </button>
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, panelBackground: 'translucent' }))}
                  className={cn(
                    'border px-4 py-2',
                    'font-mono text-xs transition-all',
                    config.panelBackground === 'translucent'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  Translucent
                </button>
              </div>
            </div>

            {/* Copy Theme Button */}
            <Button
              onClick={handleCopyTheme}
              className="w-full"
              variant="default"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  COPIED!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  COPY THEME
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ThemePlaygroundPanel;
