'use client';

import { Check, Copy, GripVertical, Minus, Moon, Palette, RotateCcw, Sun, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useThemeContext } from '@/design-system/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { FONT_OPTIONS, DEFAULT_BODY_FONT, DEFAULT_HEADLINE_FONT, getFontCssValue, getPairedHeadlineFont, getPairedBodyFont } from '@/config/fonts';

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
type LetterSpacingOption = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
type TextCaseOption = 'normal' | 'uppercase';

interface ThemeConfig {
  accentColor: string;
  appearance: 'light' | 'dark';
  radius: RadiusOption;
  scale: ScaleOption;
  panelBackground: PanelBackground;
  bodyFont: string;
  headlineFont: string;
  bodyLetterSpacing: LetterSpacingOption;
  headlineLetterSpacing: LetterSpacingOption;
  uiTextCase: TextCaseOption;
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
  { value: 'full', label: 'Full', cssValue: '1rem' },
];

const LETTER_SPACING_OPTIONS: { value: LetterSpacingOption; label: string; cssValue: string }[] = [
  { value: 'tighter', label: 'Tighter', cssValue: '-0.05em' },
  { value: 'tight', label: 'Tight', cssValue: '-0.025em' },
  { value: 'normal', label: 'Normal', cssValue: '0' },
  { value: 'wide', label: 'Wide', cssValue: '0.025em' },
  { value: 'wider', label: 'Wider', cssValue: '0.05em' },
];

const SCALE_OPTIONS: ScaleOption[] = ['90', '95', '100', '105', '110'];

const STORAGE_KEY = 'fabrk-playground-config';
const PANEL_POSITION_KEY = 'fabrk-playground-position';

interface PanelPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_PANEL_POSITION: PanelPosition = {
  x: -1, // -1 means use default (right side)
  y: 96,
  width: 320,
  height: 600,
};

const DISPLAY_EFFECTS = [
  { id: 'none', name: 'Clean' },
  { id: 'crt', name: 'CRT' },
  { id: 'lcd', name: 'LCD' },
  { id: 'vhs', name: 'VHS' },
] as const;

type DisplayEffect = (typeof DISPLAY_EFFECTS)[number]['id'];

// =============================================================================
// TRIGGER BUTTON - For use in nav bar
// =============================================================================

interface ThemePlaygroundTriggerProps {
  className?: string;
  iconOnly?: boolean;
}

export function ThemePlaygroundTrigger({ className, iconOnly = false }: ThemePlaygroundTriggerProps) {
  const { isOpen, toggle } = useThemePlayground();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'flex items-center gap-2 rounded-dynamic',
        iconOnly ? 'h-8 w-8 justify-center' : 'h-10 px-3',
        'font-body text-xs uppercase tracking-wide',
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
      {!iconOnly && <span>Customize</span>}
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

  // Drag and resize state
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPosition, setPanelPosition] = useState<PanelPosition>(DEFAULT_PANEL_POSITION);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number }>({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number; posX: number; posY: number }>({ x: 0, y: 0, width: 320, height: 600, posX: 0, posY: 0 });

  // Playground-specific settings (stored locally, not affecting global theme)
  const [config, setConfig] = useState<ThemeConfig>({
    accentColor: colorTheme,
    appearance: colorTheme === 'bw' ? 'light' : 'dark',
    radius: 'none',
    scale: '100',
    panelBackground: 'solid',
    bodyFont: DEFAULT_BODY_FONT,
    headlineFont: DEFAULT_HEADLINE_FONT,
    bodyLetterSpacing: 'normal',
    headlineLetterSpacing: 'tight',
    uiTextCase: 'uppercase',
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
      const savedEffect = localStorage.getItem('monitor-preset') as DisplayEffect;
      if (savedEffect && DISPLAY_EFFECTS.some((e) => e.id === savedEffect)) {
        setDisplayEffect(savedEffect);
      }
      const savedPosition = localStorage.getItem(PANEL_POSITION_KEY);
      if (savedPosition) {
        const parsed = JSON.parse(savedPosition) as PanelPosition;
        setPanelPosition(parsed);
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  // Save panel position when it changes
  useEffect(() => {
    if (mounted && panelPosition.x !== -1) {
      localStorage.setItem(PANEL_POSITION_KEY, JSON.stringify(panelPosition));
    }
  }, [panelPosition, mounted]);

  // Drag handlers
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
    const currentX = panelPosition.x === -1 ? window.innerWidth - panelPosition.width - 24 : panelPosition.x;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: currentX,
      posY: panelPosition.y,
    };
  }, [panelPosition]);

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const newX = Math.max(0, Math.min(window.innerWidth - panelPosition.width, dragStartRef.current.posX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 100, dragStartRef.current.posY + deltaY));
    setPanelPosition(prev => ({ ...prev, x: newX, y: newY }));
  }, [isDragging, panelPosition.width]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
    const currentX = panelPosition.x === -1 ? window.innerWidth - panelPosition.width - 24 : panelPosition.x;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: panelPosition.width,
      height: panelPosition.height,
      posX: currentX,
      posY: panelPosition.y,
    };
  }, [panelPosition]);

  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;

    let newWidth = resizeStartRef.current.width;
    let newHeight = resizeStartRef.current.height;
    let newX = resizeStartRef.current.posX;
    let newY = resizeStartRef.current.posY;

    if (isResizing.includes('e')) {
      newWidth = Math.max(280, Math.min(600, resizeStartRef.current.width + deltaX));
    }
    if (isResizing.includes('w')) {
      const widthDelta = -deltaX;
      newWidth = Math.max(280, Math.min(600, resizeStartRef.current.width + widthDelta));
      if (newWidth !== resizeStartRef.current.width) {
        newX = resizeStartRef.current.posX - (newWidth - resizeStartRef.current.width);
      }
    }
    if (isResizing.includes('s')) {
      newHeight = Math.max(400, Math.min(window.innerHeight - 100, resizeStartRef.current.height + deltaY));
    }
    if (isResizing.includes('n')) {
      const heightDelta = -deltaY;
      newHeight = Math.max(400, Math.min(window.innerHeight - 100, resizeStartRef.current.height + heightDelta));
      if (newHeight !== resizeStartRef.current.height) {
        newY = resizeStartRef.current.posY - (newHeight - resizeStartRef.current.height);
      }
    }

    setPanelPosition({ x: newX, y: newY, width: newWidth, height: newHeight });
  }, [isResizing]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(null);
  }, []);

  // Global mouse event listeners for drag and resize
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResize, handleResizeEnd]);

  // Apply display effect
  useEffect(() => {
    if (!mounted) return;
    DISPLAY_EFFECTS.forEach((e) => {
      document.documentElement.classList.remove(`effect-${e.id}`);
    });
    if (displayEffect !== 'none') {
      document.documentElement.classList.add(`effect-${displayEffect}`);
    }
    localStorage.setItem('monitor-preset', displayEffect);
  }, [displayEffect, mounted]);

  // Sync with actual theme
  useEffect(() => {
    if (mounted) {
      const themeInfo = ACCENT_COLORS.find((c) => c.id === colorTheme);
      setConfig((prev) => ({
        ...prev,
        accentColor: colorTheme,
        appearance: themeInfo?.mode === 'light' ? 'light' : 'dark',
      }));
    }
  }, [colorTheme, mounted]);

  // Apply radius to document
  useEffect(() => {
    if (!mounted) return;
    const radiusOption = RADIUS_OPTIONS.find((r) => r.value === config.radius);
    const radiusValue = radiusOption?.cssValue || '0';
    document.documentElement.style.setProperty('--radius', radiusValue);

    let styleTag = document.getElementById('theme-playground-radius');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-playground-radius';
      document.head.appendChild(styleTag);
    }

    const isFull = config.radius === 'full';

    styleTag.textContent = `
      /* Theme Playground: Special case overrides */
      ${isFull ? `
      [data-slot="button"],
      [data-slot="badge"] {
        border-radius: 9999px !important;
      }
      [data-slot="card"],
      [data-slot="alert"],
      [role="dialog"] > div,
      [data-slot="popover-content"],
      [data-slot="select-content"],
      [data-slot="dropdown-menu-content"] {
        border-radius: 1rem !important;
      }
      ` : ''}
      hr,
      [role="separator"] {
        border-radius: 0 !important;
      }
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

  // Apply fonts and typography to document
  useEffect(() => {
    if (!mounted) return;
    const bodySpacingOption = LETTER_SPACING_OPTIONS.find((l) => l.value === config.bodyLetterSpacing);
    const headlineSpacingOption = LETTER_SPACING_OPTIONS.find((l) => l.value === config.headlineLetterSpacing);

    // Use helper for safe font lookup with fallback
    const bodyFont = getFontCssValue(config.bodyFont);
    const headlineFont = getFontCssValue(config.headlineFont);
    const bodySpacing = bodySpacingOption?.cssValue || '0';
    const headlineSpacing = headlineSpacingOption?.cssValue || '-0.025em';
    const uiTextTransform = config.uiTextCase === 'uppercase' ? 'uppercase' : 'none';

    // Set CSS variables
    document.documentElement.style.setProperty('--font-body', bodyFont);
    document.documentElement.style.setProperty('--font-headline', headlineFont);
    document.documentElement.style.setProperty('--letter-spacing-body', bodySpacing);
    document.documentElement.style.setProperty('--letter-spacing-headline', headlineSpacing);

    let fontStyleTag = document.getElementById('theme-playground-fonts');
    if (!fontStyleTag) {
      fontStyleTag = document.createElement('style');
      fontStyleTag.id = 'theme-playground-fonts';
      document.head.appendChild(fontStyleTag);
    }

    fontStyleTag.textContent = `
      /* Theme Playground: Font & Typography Overrides */
      :root {
        --font-body: ${bodyFont};
        --font-headline: ${headlineFont};
        --letter-spacing-body: ${bodySpacing};
        --letter-spacing-headline: ${headlineSpacing};
        --ui-text-transform: ${uiTextTransform};
      }

      /* Body text */
      body, .font-body, p, span, div, li, td, th {
        font-family: ${bodyFont} !important;
        letter-spacing: ${bodySpacing};
      }

      /* Headlines */
      h1, h2, h3, h4, h5, h6,
      h1.font-body, h2.font-body, h3.font-body, h4.font-body, h5.font-body, h6.font-body,
      .font-headline {
        font-family: ${headlineFont} !important;
        letter-spacing: ${headlineSpacing};
      }

      /* UI elements */
      button, [role="button"], [data-slot="button"],
      label, [data-slot="badge"],
      .uppercase {
        text-transform: ${uiTextTransform};
        ${uiTextTransform === 'uppercase' ? 'letter-spacing: 0.05em;' : ''}
      }

      /* Form inputs inherit body font */
      input, textarea, select {
        font-family: ${bodyFont} !important;
        letter-spacing: ${bodySpacing};
      }
    `;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config.bodyFont, config.headlineFont, config.bodyLetterSpacing, config.headlineLetterSpacing, config.uiTextCase, mounted]);

  const handleAccentChange = useCallback(
    (id: string) => {
      setColorTheme(id as typeof colorTheme);
      const selectedColor = ACCENT_COLORS.find((c) => c.id === id);
      setConfig((prev) => ({
        ...prev,
        accentColor: id,
        appearance: selectedColor?.mode === 'light' ? 'light' : 'dark',
      }));
      if (selectedColor?.effect) {
        setDisplayEffect(selectedColor.effect as DisplayEffect);
      }
    },
    [setColorTheme]
  );

  const handleAppearanceChange = useCallback(
    (appearance: 'light' | 'dark') => {
      setConfig((prev) => ({ ...prev, appearance }));
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

  const filteredColors = ACCENT_COLORS.filter((c) => c.mode === config.appearance);

  const handleCopyTheme = useCallback(async () => {
    const themeInfo = ACCENT_COLORS.find((c) => c.id === config.accentColor);
    const radiusValue = RADIUS_OPTIONS.find((r) => r.value === config.radius)?.cssValue || '0';
    const bodyFontOption = FONT_OPTIONS.find((f) => f.value === config.bodyFont);
    const headlineFontOption = FONT_OPTIONS.find((f) => f.value === config.headlineFont);
    const bodySpacingOption = LETTER_SPACING_OPTIONS.find((l) => l.value === config.bodyLetterSpacing);
    const headlineSpacingOption = LETTER_SPACING_OPTIONS.find((l) => l.value === config.headlineLetterSpacing);
    const uiTextTransform = config.uiTextCase === 'uppercase' ? 'uppercase' : 'none';

    const themeCode = `/* FABRK THEME: ${themeInfo?.name?.toUpperCase() || config.accentColor.toUpperCase()} */

/* ════════════════════════════════════════════════════════════════
   PASTE THIS INTO src/app/globals.css (replace :root block)
   ════════════════════════════════════════════════════════════════ */

:root {
  --radius: ${radiusValue};
  --font-body: ${bodyFontOption?.cssValue || 'ui-monospace, monospace'};
  --font-headline: ${headlineFontOption?.cssValue || 'ui-monospace, monospace'};
  --letter-spacing-body: ${bodySpacingOption?.cssValue || '0'};
  --letter-spacing-headline: ${headlineSpacingOption?.cssValue || '-0.025em'};
}

/* ════════════════════════════════════════════════════════════════
   SET THEME IN src/app/layout.tsx
   ════════════════════════════════════════════════════════════════ */

<html data-theme="${config.accentColor}" className="${config.appearance}">

/* ════════════════════════════════════════════════════════════════
   THAT'S IT! Your theme is configured.

   Theme: ${themeInfo?.name || config.accentColor} (${config.appearance})
   Radius: ${radiusValue}
   Body: ${bodyFontOption?.label || config.bodyFont}
   Headlines: ${headlineFontOption?.label || config.headlineFont}${displayEffect !== 'none' ? `
   Effect: ${displayEffect}` : ''}

   To change fonts: Edit src/config/fonts.ts
   ════════════════════════════════════════════════════════════════ */`;

    try {
      await navigator.clipboard.writeText(themeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = themeCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [config, displayEffect]);

  const handleReset = useCallback(() => {
    const defaultConfig: ThemeConfig = {
      accentColor: 'green',
      appearance: 'dark',
      radius: 'none',
      scale: '100',
      panelBackground: 'solid',
      bodyFont: DEFAULT_BODY_FONT,
      headlineFont: DEFAULT_HEADLINE_FONT,
      bodyLetterSpacing: 'normal',
      headlineLetterSpacing: 'tight',
      uiTextCase: 'uppercase',
    };
    setConfig(defaultConfig);
    setColorTheme('green');
    setDisplayEffect('none');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PANEL_POSITION_KEY);
    setPanelPosition(DEFAULT_PANEL_POSITION);
    // Reset CSS variables
    document.documentElement.style.removeProperty('--font-body');
    document.documentElement.style.removeProperty('--font-headline');
    document.documentElement.style.removeProperty('--letter-spacing-body');
    document.documentElement.style.removeProperty('--letter-spacing-headline');
    document.documentElement.style.removeProperty('--radius');
    // Remove effect classes
    document.documentElement.classList.remove('effect-crt', 'effect-lcd', 'effect-vhs');
  }, [setColorTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div
          ref={panelRef}
          id="theme-playground-panel"
          className={cn(
            'fixed z-50 flex flex-col',
            'border border-border shadow-lg',
            config.panelBackground === 'translucent'
              ? 'bg-card/80 backdrop-blur-md'
              : 'bg-card',
            !isDragging && !isResizing && 'animate-in slide-in-from-top-5 duration-200',
            (isDragging || isResizing) && 'select-none'
          )}
          style={{
            left: panelPosition.x === -1 ? 'auto' : panelPosition.x,
            right: panelPosition.x === -1 ? 24 : 'auto',
            top: panelPosition.y,
            width: isMinimized ? 180 : panelPosition.width,
            height: isMinimized ? 'auto' : panelPosition.height,
            maxHeight: 'calc(100vh - 100px)',
          }}
        >
          {/* Header - Draggable */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-between p-3',
              !isMinimized && 'border-b border-border',
              'cursor-grab active:cursor-grabbing'
            )}
            onMouseDown={handleDragStart}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="font-body text-sm font-medium uppercase tracking-wide">
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
                <Minus className="h-4 w-4" />
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
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                    Accent color
                  </label>
                  <span className="font-body text-xs text-foreground h-4">
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
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Appearance
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAppearanceChange('light')}
                    className={cn(
                      'flex items-center justify-center gap-2 border px-4 py-2',
                      'font-body text-xs transition-all',
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
                      'font-body text-xs transition-all',
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
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Radius
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {RADIUS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setConfig((prev) => ({ ...prev, radius: option.value }))}
                      className={cn(
                        'flex flex-col items-center gap-1 border px-2 py-2',
                        'font-body text-2xs transition-all',
                        config.radius === option.value
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
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
                                    : '8px',
                        }}
                      />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Font */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Body Font
                </label>
                <Select
                  value={config.bodyFont}
                  onValueChange={(newBodyFont) => {
                    const pairedHeadline = getPairedHeadlineFont(newBodyFont);
                    setConfig((prev) => ({
                      ...prev,
                      bodyFont: newBodyFont,
                      headlineFont: pairedHeadline,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Display</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'display').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Monospace</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'mono').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Sans-Serif</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'sans').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Serif</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'serif').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Headline Font */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Headline Font
                </label>
                <Select
                  value={config.headlineFont}
                  onValueChange={(newHeadlineFont) => {
                    const pairedBody = getPairedBodyFont(newHeadlineFont);
                    setConfig((prev) => ({
                      ...prev,
                      headlineFont: newHeadlineFont,
                      bodyFont: pairedBody,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Display</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'display').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Monospace</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'mono').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Sans-Serif</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'sans').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Serif</SelectLabel>
                      {FONT_OPTIONS.filter(f => f.category === 'serif').map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Body Letter Spacing */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Body Spacing
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {LETTER_SPACING_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setConfig((prev) => ({ ...prev, bodyLetterSpacing: option.value }))}
                      className={cn(
                        'border px-1 py-1.5',
                        'font-body text-2xs transition-all',
                        config.bodyLetterSpacing === option.value
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline Letter Spacing */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Headline Spacing
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {LETTER_SPACING_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setConfig((prev) => ({ ...prev, headlineLetterSpacing: option.value }))}
                      className={cn(
                        'border px-1 py-1.5',
                        'font-body text-2xs transition-all',
                        config.headlineLetterSpacing === option.value
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* UI Text Case */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  UI Text Case
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, uiTextCase: 'uppercase' }))}
                    className={cn(
                      'border px-2 py-2',
                      'font-body text-xs transition-all uppercase',
                      config.uiTextCase === 'uppercase'
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    UPPERCASE
                  </button>
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, uiTextCase: 'normal' }))}
                    className={cn(
                      'border px-2 py-2',
                      'font-body text-xs transition-all',
                      config.uiTextCase === 'normal'
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    Normal Case
                  </button>
                </div>
              </div>

              {/* Scaling */}
              <div className="space-y-3">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Scaling
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {SCALE_OPTIONS.map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setConfig((prev) => ({ ...prev, scale }))}
                      className={cn(
                        'border px-2 py-2',
                        'font-body text-xs transition-all',
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
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Panel background
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig((prev) => ({ ...prev, panelBackground: 'solid' }))}
                    className={cn(
                      'border px-4 py-2',
                      'font-body text-xs transition-all',
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
                      'font-body text-xs transition-all',
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
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wide">
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
                        'font-body text-xs transition-all',
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

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleReset}
                  className="flex-1"
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  RESET
                </Button>
                <Button
                  onClick={handleCopyTheme}
                  className="flex-1"
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
                      COPY
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Resize Handles - Only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Edges */}
              <div
                className="absolute top-0 left-2 right-2 h-1 cursor-n-resize hover:bg-primary/20"
                onMouseDown={(e) => handleResizeStart(e, 'n')}
              />
              <div
                className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize hover:bg-primary/20"
                onMouseDown={(e) => handleResizeStart(e, 's')}
              />
              <div
                className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize hover:bg-primary/20"
                onMouseDown={(e) => handleResizeStart(e, 'w')}
              />
              <div
                className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize hover:bg-primary/20"
                onMouseDown={(e) => handleResizeStart(e, 'e')}
              />
              {/* Corners */}
              <div
                className="absolute top-0 left-0 h-3 w-3 cursor-nw-resize hover:bg-primary/30"
                onMouseDown={(e) => handleResizeStart(e, 'nw')}
              />
              <div
                className="absolute top-0 right-0 h-3 w-3 cursor-ne-resize hover:bg-primary/30"
                onMouseDown={(e) => handleResizeStart(e, 'ne')}
              />
              <div
                className="absolute bottom-0 left-0 h-3 w-3 cursor-sw-resize hover:bg-primary/30"
                onMouseDown={(e) => handleResizeStart(e, 'sw')}
              />
              <div
                className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize hover:bg-primary/30"
                onMouseDown={(e) => handleResizeStart(e, 'se')}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ThemePlaygroundPanel;
