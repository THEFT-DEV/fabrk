import { Metadata } from 'next';
import {
  FeatureGuideTemplate,
  DocsSection,
  DocsCard,
  DocsLinkCard,
  DocsCallout,
} from '@/components/docs';
import { Palette, Monitor, Gamepad2, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Theme Guide - Fabrk Docs',
  description:
    'Explore all 12 retro terminal-inspired color themes with use cases, historical context, and pairing recommendations.',
};

export default function ThemeGuidePage() {
  return (
    <FeatureGuideTemplate
      code="[0xD1]"
      category="Design"
      title="Theme Guide"
      description="Complete documentation for all 12 retro terminal-inspired color themes."
      overview="Fabrk includes 12 carefully crafted retro-inspired themes. Each theme is WCAG 2.2 AA compliant with pre-validated contrast ratios."
      features={[
        {
          icon: Monitor,
          title: 'CRT Phosphor',
          description: '5 themes: green, amber, blue, red, purple',
        },
        {
          icon: Gamepad2,
          title: 'Retro Computer',
          description: '6 themes: gameboy, c64, gbpocket, vic20, atari, spectrum',
        },
        {
          icon: Sun,
          title: 'Light Theme',
          description: '1 theme: bw (black & white)',
        },
        {
          icon: Palette,
          title: 'OKLCH Colors',
          description: 'Perceptually uniform color system',
        },
      ]}
      previous={{ title: 'Customization Guide', href: '/docs/design/customization-guide' }}
      next={{ title: 'Component Authoring', href: '/docs/design/component-authoring' }}
    >
      <DocsCallout variant="warning" title="Comprehensive Documentation Available">
        The complete Theme Guide (400+ lines) is available in the repository at{' '}
        <code className="bg-muted px-1 py-0.5">docs/08-design/THEME-GUIDE.md</code>. This page
        provides a quick reference.
      </DocsCallout>

      <DocsSection title="CRT Phosphor Themes">
        <DocsCard title="GREEN (DEFAULT)">
          <p>Classic terminal green phosphor. Best for developer tools and technical products.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> Authentic CRT monitor feel
            </li>
            <li>
              <strong>Best for:</strong> Developer tools, CLI apps, tech products
            </li>
            <li>
              <strong>Mood:</strong> Technical, retro, focused
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="AMBER">
          <p>Warm amber monochrome. Creates a cozy, vintage atmosphere.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> Early IBM PC, warm CRT glow
            </li>
            <li>
              <strong>Best for:</strong> Productivity apps, note-taking, documentation
            </li>
            <li>
              <strong>Mood:</strong> Warm, nostalgic, comfortable
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="BLUE">
          <p>Cool phosphor blue. Professional and trustworthy feel.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> Early text terminals, professional
            </li>
            <li>
              <strong>Best for:</strong> SaaS products, business tools, dashboards
            </li>
            <li>
              <strong>Mood:</strong> Professional, calm, trustworthy
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="RED">
          <p>Alert red CRT. High-impact and attention-grabbing.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> Warning systems, high-alert terminals
            </li>
            <li>
              <strong>Best for:</strong> Security tools, monitoring, alerts
            </li>
            <li>
              <strong>Mood:</strong> Urgent, bold, intense
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="PURPLE">
          <p>Creative purple/magenta. Playful and modern.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> Cyberpunk, synthwave
            </li>
            <li>
              <strong>Best for:</strong> Creative tools, design apps, games
            </li>
            <li>
              <strong>Mood:</strong> Creative, modern, expressive
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Retro Computer Themes">
        <DocsCard title="GAMEBOY">
          <p>Classic Game Boy pea soup green LCD. Iconic nostalgic feel.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1989 Nintendo Game Boy
            </li>
            <li>
              <strong>Best for:</strong> Games, playful apps, retro products
            </li>
            <li>
              <strong>Mood:</strong> Playful, nostalgic, fun
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="C64">
          <p>Commodore 64 blue. The iconic home computer aesthetic.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1982 Commodore 64
            </li>
            <li>
              <strong>Best for:</strong> Retro computing, education, demos
            </li>
            <li>
              <strong>Mood:</strong> Nostalgic, educational, classic
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="GBPOCKET">
          <p>Game Boy Pocket grayscale. Clean and minimalist.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1996 Game Boy Pocket
            </li>
            <li>
              <strong>Best for:</strong> Minimalist products, focused UIs
            </li>
            <li>
              <strong>Mood:</strong> Clean, focused, subtle
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="VIC20">
          <p>VIC-20 cyan terminal. Early home computing vibes.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1980 Commodore VIC-20
            </li>
            <li>
              <strong>Best for:</strong> Educational tools, tutorials
            </li>
            <li>
              <strong>Mood:</strong> Friendly, accessible, retro
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="ATARI">
          <p>Atari 800 blue. Classic arcade aesthetic.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1979 Atari 8-bit family
            </li>
            <li>
              <strong>Best for:</strong> Gaming, entertainment, interactive
            </li>
            <li>
              <strong>Mood:</strong> Fun, energetic, playful
            </li>
          </ul>
        </DocsCard>

        <DocsCard title="SPECTRUM">
          <p>ZX Spectrum black/white. British computing heritage.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Era:</strong> 1982 Sinclair ZX Spectrum
            </li>
            <li>
              <strong>Best for:</strong> Text-heavy apps, documentation
            </li>
            <li>
              <strong>Mood:</strong> Clean, high-contrast, readable
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Light Theme">
        <DocsCard title="BW (BLACK & WHITE)">
          <p>Paper-like black and white. Maximum readability and accessibility.</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Aesthetic:</strong> E-ink, print, minimal
            </li>
            <li>
              <strong>Best for:</strong> Documentation, reading, accessibility
            </li>
            <li>
              <strong>Mood:</strong> Clean, professional, focused
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Switching Themes">
        <DocsCard title="CHANGE DEFAULT THEME">
          <ol className="space-y-2">
            <li>1. Edit src/design-system/providers/ThemeProvider.tsx:82</li>
            <li>
              2. Change <code>defaultColorTheme = &apos;green&apos;</code> to your choice
            </li>
            <li>3. Restart dev server</li>
          </ol>
        </DocsCard>

        <DocsCard title="USER THEME SWITCHING">
          <p>
            Users can switch themes via the theme dropdown in the navigation. Theme preference is
            persisted in localStorage.
          </p>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/design/customization-guide"
            title="Customization Guide"
            description="Change brand colors and create custom themes"
          />
          <DocsLinkCard
            href="/docs/extras/theming"
            title="Theming System"
            description="How the theming system works internally"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
