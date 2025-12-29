import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Sun, Moon, Sparkles } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Theming & Colors - Fabrk Docs',
  description:
    'Customize your Fabrk app with light and dark color themes plus Terminal and Modern visual styles.',
};

export default function ThemingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xB0]"
      category="Extras"
      title="Theming And Customization"
      description="Light/Dark color themes + Terminal/Modern visual styles."
      overview="Dual theme system: Color themes (light/dark) and Visual themes (Terminal/Modern). Persistent localStorage, no theme flash, and Tailwind v4 native."
      features={[
        {
          icon: Palette,
          title: '2 Color Themes',
          description: 'Light and Dark palettes.',
        },
        {
          icon: Sun,
          title: 'Light/Dark',
          description: 'Automatic mode switching.',
        },
        {
          icon: Moon,
          title: 'Persistent',
          description: 'Saved to localStorage.',
        },
        {
          icon: Sparkles,
          title: 'No Flash',
          description: 'Pre-hydration loading.',
        },
      ]}
      usage={[
        {
          title: 'Theme Switcher Components',
          description: 'Compact dropdowns for navbar',
          code: `import { ThemeDropdown } from "@/components/theme/theme-dropdown";
import { VisualThemeDropdown } from "@/components/theme/visual-theme-dropdown";

export function MyNavbar() {
  return (
    <nav>
      <ThemeDropdown /> {/* Light/Dark color switcher */}
      <VisualThemeDropdown /> {/* Terminal/Modern visual switcher */}
    </nav>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'How It Works',
          description: 'Dual theme system via data attributes',
          code: `<!-- Color theme via data-theme (light/dark) -->
<html data-theme="light" data-visual-mode="terminal">
  <!-- data-theme="light" sets colors (light or dark) -->
  <!-- data-visual-mode="terminal" sets visual style -->
</html>

<!-- Themes auto-loaded before React hydration (no flash) -->
<script>
  const theme = localStorage.getItem('theme') || 'light';
  const visualMode = localStorage.getItem('fabrk-theme-visual-mode') || 'terminal';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-visual-mode', visualMode);
</script>`,
          language: 'html',
        },
        {
          title: 'CSS Implementation',
          description: 'Each theme defines CSS variables in globals.css',
          code: `/* Light theme (default colors) */
[data-theme="light"] {
  --background: 99% 0 0;  /* Off-white */
  --foreground: 0% 0 0;   /* Pure black */
  --primary: 0% 0 0;      /* Black */
  --accent: 55% 0.21 250; /* Vercel blue */
  /* ...more variables */
}

/* Dark theme */
[data-theme="dark"] {
  --background: 0% 0 0;    /* Pure black */
  --foreground: 100% 0 0;  /* Pure white */
  --primary: 100% 0 0;     /* White */
  --accent: 55% 0.21 250;  /* Vercel blue */
  /* ...more variables */
}

/* Terminal visual style (sharp edges, monospace) */
[data-visual-mode="terminal"] * {
  border-radius: 0 !important;
}

/* Modern visual style (rounded, sans-serif) */
[data-visual-mode="modern"] * {
  border-radius: 0.5rem !important;
}`,
          language: 'css',
        },
        {
          title: 'Using Theme Colors',
          description: 'Always use semantic color classes',
          code: `// ✅ GOOD - Theme-aware colors
<button className="bg-primary text-primary-foreground">
  Matches active theme (light or dark)
</button>

<div className="border-primary ring-primary">
  Adapts automatically when user switches themes
</div>

// ❌ BAD - Hardcoded colors (breaks theming)
<button className="bg-[hardcoded] text-[hardcoded]">
  Always same color, ignores theme selection
</button>`,
          language: 'tsx',
        },
        {
          title: 'Customizing Themes',
          description: 'Modify light/dark themes in globals.css',
          code: `/* Customize existing themes in globals.css */
[data-theme="light"] {
  --background: 99% 0 0;
  --foreground: 0% 0 0;
  --primary: 0% 0 0;
  --accent: 55% 0.21 250;  /* Vercel blue - customize to your brand */
  /* ...modify other variables */
}

[data-theme="dark"] {
  --background: 0% 0 0;
  --foreground: 100% 0 0;
  --primary: 100% 0 0;
  --accent: 65% 0.21 250;  /* Brighter for dark mode */
  /* ...modify other variables */
}`,
          language: 'css',
        },
      ]}
      previous={{ title: 'Testing', href: '/docs/extras/testing' }}
      next={{ title: 'Launch Checklist', href: '/docs/launch/checklist' }}
    >
      {/* Theme System */}
      <DocsSection title="Dual Theme System">
        <DocsCard title="THEME SYSTEM">
          <div className="space-y-1">
            <div>├─ Color Themes: Light and Dark color palettes</div>
            <div>
              ├─ Visual Themes: Terminal (sharp, monospace) and Modern (rounded, sans-serif)
            </div>
            <div>├─ Persistent: Both choices saved to localStorage</div>
            <div>├─ No Flash: Pre-hydration loading prevents theme flash</div>
            <div>└─ Tailwind v4 Native: Works seamlessly with Tailwind CSS v4</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Color Themes */}
      <DocsSection title="Color Themes">
        <div className="grid gap-2 sm:grid-cols-2">
          {/* eslint-disable design-system/no-hardcoded-colors, design-system/no-inline-styles -- Theme color examples */}
          {[
            { name: 'Light', desc: 'Clean white background', color: '#ffffff' },
            { name: 'Dark', desc: 'Pure black background', color: '#1d232a' },
          ].map((theme) => (
            <Card key={theme.name} interactive className={cn("transition-all", mode.radius)}>
              <CardContent padding="sm" className="p-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn('border-border h-6 w-6 border-2', mode.radius)}
                    style={{ backgroundColor: theme.color }}
                  />
                  <div>
                    <div className="font-mono text-xs">{theme.name}</div>
                    <div className="text-muted-foreground font-mono text-xs">{theme.desc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* eslint-enable design-system/no-hardcoded-colors, design-system/no-inline-styles */}
        </div>
      </DocsSection>

      {/* Visual Themes */}
      <DocsSection title="Visual Themes">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: 'Terminal', desc: 'Sharp edges, monospace font', icon: '[]' },
            { name: 'Modern', desc: 'Rounded edges, sans-serif font', icon: '()' },
          ].map((theme) => (
            <Card key={theme.name} interactive className={cn("transition-all", mode.radius)}>
              <CardContent padding="sm" className="p-4">
                <div className="flex items-center gap-2">
                  <div className={cn('border-border flex h-6 w-6 items-center justify-center border-2', mode.radius)}>
                    <span className="font-mono text-xs">{theme.icon}</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs">{theme.name}</div>
                    <div className="text-muted-foreground font-mono text-xs">{theme.desc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DocsSection>

      {/* Best Practices */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <div className="space-y-1">
            <div>├─ Use semantic colors: bg-primary instead of bg-purple-500</div>
            <div>├─ Test across themes: Verify UI works in light and dark variants</div>
            <div>├─ Default to Light: Clean, neutral starting point</div>
            <div>└─ Customize themes: Modify colors in globals.css [data-theme] selectors</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Architecture */}
      <DocsSection title="Architecture">
        <DocsCard title="ARCHITECTURE">
          <div className="space-y-1">
            <div>├─ ThemeDropdown - Navbar component for theme selection</div>
            <div>├─ ColorThemeSwitcher - Full-page grid for settings</div>
            <div>├─ globals.css - All 20 theme CSS variable definitions</div>
            <div>├─ layout.tsx - Pre-hydration script prevents flash</div>
            <div>└─ localStorage - Persists user preference (key: theme)</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/components/overview"
            title="UI Components"
            description="All components use semantic colors"
          />
          <DocsLinkCard
            href="/docs/extras/testing"
            title="Testing"
            description="Test across different themes"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
