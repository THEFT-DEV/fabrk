/**
 * Display Effects Documentation
 * CRT, LCD, and VHS retro monitor effects
 */

'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Monitor, Tv, Gamepad2, Film, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { useState, useEffect } from 'react';

type MonitorEffect = 'none' | 'crt' | 'lcd' | 'vhs';

const effects: { id: MonitorEffect; name: string; description: string; icon: typeof Monitor }[] = [
  { id: 'none', name: 'Clean', description: 'No effects - crisp modern display', icon: Monitor },
  {
    id: 'crt',
    name: 'CRT Monitor',
    description: 'Scanlines, phosphor glow, rolling bar, flicker',
    icon: Tv,
  },
  {
    id: 'lcd',
    name: 'LCD Handheld',
    description: 'Pixel grid, recessed screen, no glow',
    icon: Gamepad2,
  },
  {
    id: 'vhs',
    name: 'VHS Glitch',
    description: 'Chromatic aberration, tracking noise',
    icon: Film,
  },
];

function EffectSwitcher() {
  const [activeEffect, setActiveEffect] = useState<MonitorEffect>('none');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration-safe client-side rendering detection
    setMounted(true);
    const saved = localStorage.getItem('monitor-preset') as MonitorEffect;
    if (saved && effects.some((e) => e.id === saved)) {
      setActiveEffect(saved);
    }
  }, []);

  const handleSelect = (effectId: MonitorEffect) => {
    // Remove all existing effect classes
    effects.forEach((e) => {
      document.documentElement.classList.remove(`effect-${e.id}`);
    });

    // Add new effect class (if not none)
    if (effectId !== 'none') {
      document.documentElement.classList.add(`effect-${effectId}`);
    }

    setActiveEffect(effectId);
    localStorage.setItem('monitor-preset', effectId);
  };

  if (!mounted) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {effects.map((effect) => {
        const Icon = effect.icon;
        const isActive = activeEffect === effect.id;
        return (
          <button
            key={effect.id}
            type="button"
            className={cn(
              'border-border flex min-h-[80px] flex-col items-start justify-center gap-1 border p-4 text-left transition-colors',
              isActive ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
              mode.radius,
              mode.font
            )}
            onClick={() => handleSelect(effect.id)}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-semibold">{effect.name}</span>
              </div>
              {isActive && <span className="text-xs">[ACTIVE]</span>}
            </div>
            <span
              className={cn(
                'text-xs',
                isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}
            >
              {effect.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function DisplayEffectsPage() {
  return (
    <FeatureGuideTemplate
      code="[0xB2]"
      category="Extras"
      title="Display Effects"
      description="Retro CRT, LCD handheld, and VHS glitch effects for authentic terminal aesthetics."
      overview="Add nostalgic display effects to your terminal UI. Choose from CRT monitor scanlines, Game Boy-style LCD pixel grids, or VHS tracking errors. All effects are GPU-accelerated and respect prefers-reduced-motion."
      features={[
        {
          icon: Tv,
          title: 'CRT Monitor',
          description: 'Scanlines, glow, flicker',
        },
        {
          icon: Gamepad2,
          title: 'LCD Handheld',
          description: 'Pixel grid, no glow',
        },
        {
          icon: Film,
          title: 'VHS Glitch',
          description: 'Color shift, noise',
        },
        {
          icon: Zap,
          title: 'GPU Accelerated',
          description: 'Smooth 60fps effects',
        },
      ]}
      usage={[
        {
          title: 'Enable via Dropdown',
          description: 'Use the monitor icon in the navigation bar',
          code: `// The MonitorEffectsDropdown is included in Navigation
import { MonitorEffectsDropdown } from '@/components/theme/monitor-effects-dropdown';

// Add to your nav
<MonitorEffectsDropdown />`,
          language: 'tsx',
        },
        {
          title: 'Programmatic Control',
          description: 'Apply effects via JavaScript',
          code: `// Apply CRT effect
document.documentElement.classList.add('effect-crt');

// Apply LCD effect
document.documentElement.classList.add('effect-lcd');

// Apply VHS effect
document.documentElement.classList.add('effect-vhs');

// Remove all effects
['crt', 'lcd', 'vhs'].forEach(e =>
  document.documentElement.classList.remove(\`effect-\${e}\`)
);

// Save preference
localStorage.setItem('monitor-preset', 'crt');`,
          language: 'javascript',
        },
        {
          title: 'CSS Classes',
          description: 'Effects are applied via CSS classes on html element',
          code: `/* CRT Monitor - 80s/90s authentic look */
.effect-crt {
  /* Scanlines + Phosphor Glow + Rolling Bar + Flicker */
}

/* LCD Handheld - Game Boy style */
.effect-lcd {
  /* Pixel Grid + Hard Edges + Recessed Shadow */
}

/* VHS Glitch - Damaged tape */
.effect-vhs {
  /* Chromatic Aberration + Tracking Noise */
}`,
          language: 'css',
        },
      ]}
      previous={{ title: 'Theme Gallery', href: '/docs/extras/theme-gallery' }}
      next={{ title: 'Theme Generator', href: '/docs/extras/theme-generator' }}
    >
      {/* Live Effect Switcher */}
      <DocsSection title="Try It Live">
        <DocsCard title="EFFECT SWITCHER">
          <div className="space-y-4">
            <p className="text-xs">
              Click any effect below to instantly apply it. The effect persists across page
              navigation and is saved to localStorage.
            </p>
            <EffectSwitcher />
          </div>
        </DocsCard>
      </DocsSection>

      {/* Effect Details */}
      <DocsSection title="Effect Details">
        <div className="grid gap-4 md:grid-cols-2">
          <DocsCard title="CRT MONITOR">
            <div className="space-y-2 text-xs">
              <p>The authentic 80s/90s CRT experience:</p>
              <div className="space-y-1">
                <div>├─ Horizontal scanlines (2px spacing)</div>
                <div>├─ RGB sub-pixel simulation</div>
                <div>├─ Phosphor glow on text</div>
                <div>├─ Dark corner vignette</div>
                <div>├─ Rolling refresh bar (8s cycle)</div>
                <div>└─ Subtle power flicker</div>
              </div>
            </div>
          </DocsCard>

          <DocsCard title="LCD HANDHELD">
            <div className="space-y-2 text-xs">
              <p>Game Boy / handheld console look:</p>
              <div className="space-y-1">
                <div>├─ 3px dot matrix pixel grid</div>
                <div>├─ No text glow (flat LCD)</div>
                <div>├─ Recessed screen shadow</div>
                <div>└─ Pairs with gbpocket theme</div>
              </div>
            </div>
          </DocsCard>

          <DocsCard title="VHS GLITCH">
            <div className="space-y-2 text-xs">
              <p>Damaged VHS tape aesthetic:</p>
              <div className="space-y-1">
                <div>├─ Red/blue chromatic aberration</div>
                <div>├─ Coarse tracking scanlines (4px)</div>
                <div>├─ Periodic color shift animation</div>
                <div>└─ Pairs with blue theme</div>
              </div>
            </div>
          </DocsCard>

          <DocsCard title="PERFORMANCE">
            <div className="space-y-2 text-xs">
              <p>All effects are optimized:</p>
              <div className="space-y-1">
                <div>├─ GPU acceleration (transform: translateZ(0))</div>
                <div>├─ will-change hints for animations</div>
                <div>├─ pointer-events: none on overlays</div>
                <div>└─ Respects prefers-reduced-motion</div>
              </div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Accessibility */}
      <DocsSection title="Accessibility">
        <DocsCard title="REDUCED MOTION SUPPORT">
          <div className="space-y-2 text-xs">
            <p>
              All animations automatically disable when the user has{' '}
              <code className="bg-muted px-1 py-0.5">prefers-reduced-motion: reduce</code> set in
              their system preferences.
            </p>
            <div className="border-border mt-4 border-t pt-4">
              <code className="text-xs">
                {`@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation: none !important;
  }
}`}
              </code>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Theme Pairing */}
      <DocsSection title="Recommended Theme Pairings">
        <DocsCard title="SOFT LINKS">
          <div className="space-y-2 text-xs">
            <p>
              When you select an effect from the dropdown, the theme automatically switches to a
              complementary color scheme:
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span>CRT Monitor</span>
                <span className="text-primary">→ Green (phosphor)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LCD Handheld</span>
                <span className="text-primary">→ GB Pocket (dot matrix)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>VHS Glitch</span>
                <span className="text-primary">→ Blue (VCR OSD)</span>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-xs">
              You can still manually change the theme after selecting an effect.
            </p>
          </div>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
