'use client';

import { Check, Copy, GripHorizontal, Moon, Palette, Sun, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/design-system/providers/ThemeProvider';
import { cn } from '@/lib/utils';

// =============================================================================
// CONTEXT - For external control of the panel
// =============================================================================

interface ThemePlaygroundContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const ThemePlaygroundContext = createContext<ThemePlaygroundContextValue | null>(null);

export function useThemePlayground() {
  const context = useContext(ThemePlaygroundContext);
  if (!context) {
    throw new Error('useThemePlayground must be used within ThemePlaygroundProvider');
  }
  return context;
}

export function ThemePlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <ThemePlaygroundContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </ThemePlaygroundContext.Provider>
  );
}

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

/* eslint-disable design-system/no-hardcoded-colors -- Theme definition colors (not styling) */
const ACCENT_COLORS = [
  // Dark themes - CRT effect
  { id: 'amber', color: '#ffb000', name: 'Amber', mode: 'dark', effect: 'crt' },
  { id: 'green', color: '#33ff66', name: 'Green', mode: 'dark', effect: 'crt' },
  { id: 'blue', color: '#55ccff', name: 'Blue', mode: 'dark', effect: 'crt' },
  { id: 'purple', color: '#bb88ff', name: 'Purple', mode: 'dark', effect: 'crt' },
  { id: 'red', color: '#ff6655', name: 'Red', mode: 'dark', effect: 'crt' },
  { id: 'cyberpunk', color: '#ff0050', name: 'Cyberpunk', mode: 'dark', effect: 'crt' },
  { id: 'phosphor', color: '#00ff41', name: 'Phosphor', mode: 'dark', effect: 'crt' },
  { id: 'holographic', color: '#00ffff', name: 'Holographic', mode: 'dark', effect: 'crt' },
  { id: 'navigator', color: '#ff8c00', name: 'Navigator', mode: 'dark', effect: 'crt' },
  { id: 'blueprint', color: '#4a90d9', name: 'Blueprint', mode: 'dark', effect: 'crt' },
  { id: 'atari', color: '#305070', name: 'Atari', mode: 'dark', effect: 'crt' },
  { id: 'c64', color: '#8888ff', name: 'C64', mode: 'dark', effect: 'crt' },
  // Light themes - LCD effect for handhelds, none for others
  { id: 'bw', color: '#ffffff', name: 'B&W', mode: 'light', effect: 'none' },
  { id: 'vic20', color: '#00ffff', name: 'VIC-20', mode: 'light', effect: 'crt' },
  { id: 'gbpocket', color: '#8a8a8a', name: 'GB Pocket', mode: 'light', effect: 'lcd' },
  { id: 'gameboy', color: '#9bbc0f', name: 'Game Boy', mode: 'light', effect: 'lcd' },
  { id: 'spectrum', color: '#4455bb', name: 'Spectrum', mode: 'light', effect: 'crt' },
  { id: 'infrared', color: '#cc3333', name: 'Infrared', mode: 'light', effect: 'none' },
] as const;
/* eslint-enable design-system/no-hardcoded-colors */

const RADIUS_OPTIONS: { value: RadiusOption; label: string; cssValue: string }[] = [
  { value: 'none', label: 'None', cssValue: '0' },
  { value: 'sm', label: 'Small', cssValue: '0.25rem' },
  { value: 'md', label: 'Medium', cssValue: '0.5rem' },
  { value: 'lg', label: 'Large', cssValue: '0.75rem' },
  { value: 'full', label: 'Full', cssValue: '1rem' }, // Max reasonable radius, not pill-shaped
];

const SCALE_OPTIONS: ScaleOption[] = ['90', '95', '100', '105', '110'];

const STORAGE_KEY = 'fabrk-playground-config';

const DISPLAY_EFFECTS = [
  { id: 'none', name: 'Clean' },
  { id: 'crt', name: 'CRT' },
  { id: 'lcd', name: 'LCD' },
  { id: 'vhs', name: 'VHS' },
] as const;

type DisplayEffect = (typeof DISPLAY_EFFECTS)[number]['id'];

// =============================================================================
// COMPONENT
// =============================================================================

// =============================================================================
// TRIGGER BUTTON - For use in nav bar
// =============================================================================

export function ThemePlaygroundTrigger({ className }: { className?: string }) {
  const { isOpen, toggle } = useThemePlayground();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'flex h-10 items-center gap-2 px-3',
        'font-mono text-xs uppercase tracking-wide',
        'text-muted-foreground transition-colors',
        'hover:text-foreground hover:bg-muted',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        isOpen && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
        className
      )}
      aria-label="Toggle theme playground"
      aria-pressed={isOpen}
    >
      <Palette className="h-4 w-4" />
      <span>Customize</span>
    </button>
  );
}

// =============================================================================
// PANEL COMPONENT
// =============================================================================

interface ThemePlaygroundPanelProps {
  showTrigger?: boolean;
}

export function ThemePlaygroundPanel({ showTrigger = false }: ThemePlaygroundPanelProps) {
  const playgroundContext = useContext(ThemePlaygroundContext);
  const { colorTheme, setColorTheme } = useThemeContext();

  // Use context if available, otherwise use local state (for standalone usage)
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = playgroundContext?.isOpen ?? localIsOpen;
  const setIsOpen = playgroundContext?.setIsOpen ?? setLocalIsOpen;

  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [displayEffect, setDisplayEffect] = useState<DisplayEffect>('none');
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null); // null = default position
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary for hydration safety
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ThemeConfig>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
      // Load display effect
      const savedEffect = localStorage.getItem('monitor-preset') as DisplayEffect;
      if (savedEffect && DISPLAY_EFFECTS.some((e) => e.id === savedEffect)) {
        setDisplayEffect(savedEffect);
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  // Apply display effect
  useEffect(() => {
    if (!mounted) return;
    // Remove all existing effect classes
    DISPLAY_EFFECTS.forEach((e) => {
      document.documentElement.classList.remove(`effect-${e.id}`);
    });
    // Add new effect class (if not none)
    if (displayEffect !== 'none') {
      document.documentElement.classList.add(`effect-${displayEffect}`);
    }
    localStorage.setItem('monitor-preset', displayEffect);
  }, [displayEffect, mounted]);

  // Sync with actual theme
  useEffect(() => {
    if (mounted) {
      const themeInfo = ACCENT_COLORS.find((c) => c.id === colorTheme);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing external theme state
      setConfig((prev) => ({
        ...prev,
        accentColor: colorTheme,
        appearance: themeInfo?.mode === 'light' ? 'light' : 'dark',
      }));
    }
  }, [colorTheme, mounted]);

  // Apply radius to document - set CSS variable that .rounded-dynamic uses
  useEffect(() => {
    if (!mounted) return;
    const radiusOption = RADIUS_OPTIONS.find((r) => r.value === config.radius);
    const radiusValue = radiusOption?.cssValue || '0';
    document.documentElement.style.setProperty('--radius', radiusValue);

    // Inject/update style tag for special cases only
    let styleTag = document.getElementById('theme-playground-radius');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-playground-radius';
      document.head.appendChild(styleTag);
    }

    // The .rounded-dynamic utility now handles most radius changes automatically
    // We only need overrides for special cases
    const isFull = config.radius === 'full';

    styleTag.textContent = `
      /* Theme Playground: Special case overrides */

      ${isFull ? `
      /* For 'full' radius, make buttons/badges pill-shaped */
      [data-slot="button"],
      [data-slot="badge"] {
        border-radius: 9999px !important;
      }

      /* Cap cards at reasonable max radius */
      [data-slot="card"],
      [data-slot="alert"],
      [role="dialog"] > div,
      [data-slot="popover-content"],
      [data-slot="select-content"],
      [data-slot="dropdown-menu-content"] {
        border-radius: 1rem !important;
      }
      ` : ''}

      /* Never round single-side border elements (dividers, tabs) */
      hr,
      [role="separator"] {
        border-radius: 0 !important;
      }

      /* Apply theme radius to the panel container and manual controls */
      #theme-playground-panel,
      #theme-playground-panel button:not([data-slot="button"]),
      #theme-playground-panel input,
      #theme-playground-panel select {
        border-radius: var(--radius) !important;
      }
    `;

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
      const selectedColor = ACCENT_COLORS.find((c) => c.id === id);
      setConfig((prev) => ({
        ...prev,
        accentColor: id,
        appearance: selectedColor?.mode === 'light' ? 'light' : 'dark',
      }));
      // Auto-apply the matching display effect
      if (selectedColor?.effect) {
        setDisplayEffect(selectedColor.effect as DisplayEffect);
      }
    },
    [setColorTheme]
  );

  const handleAppearanceChange = useCallback(
    (appearance: 'light' | 'dark') => {
      setConfig((prev) => ({ ...prev, appearance }));
      // If current theme doesn't match the new appearance, switch to first theme of that mode
      const currentThemeMode = ACCENT_COLORS.find((c) => c.id === config.accentColor)?.mode;
      if (currentThemeMode !== appearance) {
        const firstThemeOfMode = ACCENT_COLORS.find((c) => c.mode === appearance);
        if (firstThemeOfMode) {
          setColorTheme(firstThemeOfMode.id as typeof colorTheme);
        }
      }
    },
    [config.accentColor, setColorTheme]
  );

  // Filter colors by current appearance mode
  const filteredColors = ACCENT_COLORS.filter((c) => c.mode === config.appearance);

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

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return; // Don't drag when clicking buttons
    e.preventDefault(); // Prevent text selection while dragging

    // Get current position from element if not already set
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const currentX = position?.x ?? rect.left;
    const currentY = position?.y ?? rect.top;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: currentX,
      startPosY: currentY,
    };
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      // Calculate new position with bounds checking
      const newX = Math.max(0, Math.min(window.innerWidth - 320, dragRef.current.startPosX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 100, dragRef.current.startPosY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Panel - Anchored to top right, draggable */}
      {isOpen && (
        <div
          ref={panelRef}
          id="theme-playground-panel"
          className={cn(
            'fixed z-50',
            isMinimized ? 'w-48' : 'w-80 max-h-[calc(100vh-10rem)]',
            'flex flex-col',
            'border border-border',
            config.panelBackground === 'translucent'
              ? 'bg-card/80 backdrop-blur-md'
              : 'bg-card',
            !isMinimized && 'animate-in slide-in-from-top-5 duration-200',
            isDragging && 'cursor-grabbing'
          )}
          // eslint-disable-next-line design-system/no-inline-styles -- Dynamic position for dragging
          style={position ? {
            left: position.x,
            top: position.y,
            right: 'auto',
          } : {
            right: '1.5rem',
            top: '8rem',
          }}
        >
          {/* Header - Draggable */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-between border-b border-border p-3',
              'cursor-grab select-none',
              isDragging && 'cursor-grabbing'
            )}
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <GripHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono text-sm font-medium uppercase tracking-wide">
                Theme
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={isMinimized ? 'Expand panel' : 'Minimize panel'}
              >
                <div className={cn('h-3 w-3 border border-current', isMinimized ? 'bg-current' : '')} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content - Hidden when minimized */}
          {!isMinimized && (
          <div className="space-y-6 p-4 overflow-y-auto flex-1">
            {/* Accent Color */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                  Accent color
                </label>
                {/* Fixed height to prevent layout shift */}
                <span className="font-mono text-xs text-foreground h-4">
                  {hoveredColor || ACCENT_COLORS.find(c => c.id === config.accentColor)?.name || ''}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {filteredColors.map((color) => (
                  <button
                    type="button"
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
                    // eslint-disable-next-line design-system/no-inline-styles -- Dynamic theme color picker requires inline styles
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
                      'font-mono text-2xs transition-all',
                      config.radius === option.value
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {/* Visual preview of radius - scaled down for 24x24 box */}
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
                              ? '2px'
                              : option.value === 'md'
                                ? '4px'
                                : option.value === 'lg'
                                  ? '6px'
                                  : '8px', // Full - clearly rounded but not a circle
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
                  type="button"
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
                  type="button"
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

            {/* Display Effects */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                Display effects
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DISPLAY_EFFECTS.map((effect) => (
                  <button
                    type="button"
                    key={effect.id}
                    onClick={() => setDisplayEffect(effect.id)}
                    className={cn(
                      'border px-2 py-2',
                      'font-mono text-xs transition-all',
                      displayEffect === effect.id
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {effect.name}
                  </button>
                ))}
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
          )}
        </div>
      )}
    </>
  );
}

export default ThemePlaygroundPanel;
