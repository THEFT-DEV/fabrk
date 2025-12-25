/**
 * Theme Gallery Page
 * Interactive showcase of all 12 themes
 */

'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { ThemePreviewGallery } from '@/components/theme/theme-preview-gallery';
import { Palette, Sparkles, Eye, Code } from 'lucide-react';
import { useState } from 'react';

export default function ThemeGalleryPage() {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    // Initialize with current theme from DOM
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'green';
    }
    return 'green';
  });

  const handleThemeSelect = (themeId: string) => {
    // Update theme in DOM
    document.documentElement.setAttribute('data-theme', themeId);
    // Save to localStorage
    localStorage.setItem('theme', themeId);
    setCurrentTheme(themeId);
  };

  return (
    <FeatureGuideTemplate
      code="[0xB1]"
      category="Extras"
      title="Theme Gallery"
      description="Explore all 12 terminal themes with live previews and instant switching."
      overview="Interactive gallery showcasing all themes: 5 CRT phosphor, 6 retro computer themes, and 1 minimal black & white. Click any theme to instantly preview it across the entire site."
      features={[
        {
          icon: Palette,
          title: '12 Complete Themes',
          description: 'CRT, Retro, Minimal',
        },
        {
          icon: Eye,
          title: 'Live Preview',
          description: 'See before you select',
        },
        {
          icon: Sparkles,
          title: 'OKLCH Colors',
          description: 'Perceptually uniform',
        },
        {
          icon: Code,
          title: 'WCAG 2.2 AA',
          description: 'Fully accessible',
        },
      ]}
      usage={[
        {
          title: 'Select a Theme',
          description: 'Click any theme card to instantly apply it',
          code: `// Theme is automatically applied to:
// 1. All UI components
// 2. All marketing pages
// 3. All docs pages
// 4. Charts and data visualizations

// No code changes needed!`,
          language: 'tsx',
        },
        {
          title: 'Theme Persistence',
          description: 'Selected theme is saved to localStorage',
          code: `// Automatic localStorage save
localStorage.setItem('theme', 'gameboy');

// Retrieved on page load
const savedTheme = localStorage.getItem('theme');
document.documentElement.setAttribute('data-theme', savedTheme);`,
          language: 'javascript',
        },
        {
          title: 'Programmatic Theme Switching',
          description: 'Change themes programmatically',
          code: `// Update theme attribute
document.documentElement.setAttribute('data-theme', 'c64');

// All components automatically update
// No re-render needed`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Theming', href: '/docs/extras/theming' }}
      next={{ title: 'Launch Checklist', href: '/docs/launch/checklist' }}
    >
      {/* Live Theme Gallery */}
      <DocsSection title="Interactive Theme Gallery">
        <DocsCard title="THEME GALLERY">
          <div className="space-y-4">
            <p className="text-xs">
              Click any theme below to instantly preview it across the entire site. Your selection
              is automatically saved to localStorage.
            </p>

            <ThemePreviewGallery
              currentTheme={currentTheme}
              onThemeSelect={handleThemeSelect}
              showFilters
            />
          </div>
        </DocsCard>
      </DocsSection>

      {/* Theme Categories */}
      <DocsSection title="Theme Categories">
        <div className="grid gap-4 md:grid-cols-2">
          <DocsCard title="CRT PHOSPHOR (5 THEMES)">
            <div className="space-y-1 text-xs">
              <div>├─ Green CRT: Classic green phosphor terminal</div>
              <div>├─ Red CRT: Warm red monochrome display</div>
              <div>├─ Blue CRT: Cool blue terminal aesthetic</div>
              <div>├─ Amber CRT: Vintage amber monochrome</div>
              <div>└─ Purple CRT: Retro purple phosphor</div>
            </div>
          </DocsCard>

          <DocsCard title="RETRO COMPUTER (6 THEMES)">
            <div className="space-y-1 text-xs">
              <div>├─ Game Boy: DMG-01 iconic LCD green</div>
              <div>├─ Commodore 64: Classic C64 blue</div>
              <div>├─ Game Boy Pocket: Monochrome silver LCD</div>
              <div>├─ VIC-20: Cyan Commodore display</div>
              <div>├─ Atari 800: Vintage Atari blue</div>
              <div>└─ ZX Spectrum: Sinclair bright mode</div>
            </div>
          </DocsCard>

          <DocsCard title="MINIMAL (1 THEME)">
            <div className="space-y-1 text-xs">
              <div>└─ Black & White: Pure grayscale aesthetic</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Technical Details */}
      <DocsSection title="Technical Details">
        <DocsCard title="OKLCH COLOR SYSTEM">
          <div className="space-y-2 text-xs">
            <p>
              All themes use OKLCH (Oklab Lightness Chroma Hue) color space for perceptually uniform
              color mixing and gradients.
            </p>
            <div className="border-border mt-4 border-t pt-4">
              <div className="space-y-1">
                <div>
                  <span className="text-primary font-semibold">Format:</span> oklch(lightness%
                  chroma hue)
                </div>
                <div>
                  <span className="text-primary font-semibold">Example:</span> oklch(40% 0.25 140)
                </div>
                <div>
                  <span className="text-primary font-semibold">Benefits:</span> Better dark mode,
                  reliable gradients, perceptual uniformity
                </div>
              </div>
            </div>
          </div>
        </DocsCard>

        <DocsCard title="ACCESSIBILITY COMPLIANCE">
          <div className="space-y-2 text-xs">
            <p>All 12 themes pass WCAG 2.2 AA accessibility requirements:</p>
            <div className="space-y-1">
              <div>✓ Text contrast ≥4.5:1 (normal text)</div>
              <div>✓ Non-text contrast ≥3:1 (borders, controls)</div>
              <div>✓ Focus indicators visible on all themes</div>
              <div>✓ Status colors distinguishable</div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
