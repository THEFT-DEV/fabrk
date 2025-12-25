/* eslint-disable design-system/no-hardcoded-colors -- FUI Lab is an experimental playground with custom styling */
'use client';

import {
  FUINav,
  FUIStatusBar,
  FUIPane,
  FUISectionHeader,
} from '../components/fui-components';

// Color constants - matching FUI demo
const COLORS = {
  primary: '#FDE047',
  primaryDim: 'rgba(253, 224, 71, 0.2)',
  secondary: '#00BFFF',
  secondaryDim: 'rgba(0, 191, 255, 0.1)',
  background: '#000000',
  surface: '#0A0A0A',
  textLight: '#B0B0B0',
  textMuted: '#606060',
};

const navItems = [
  { label: 'OPTIONS', href: '#' },
  { label: 'COMPARE', href: '#' },
  { label: 'DECIDE', href: '#' },
];

const statusItems = [
  { label: 'CARD_STYLES', value: '10' },
  { label: 'VARIANTS', value: 'ACTIVE' },
  { label: 'MODE', value: 'DESIGN' },
];

export default function CardOptionsPage() {
  return (
    <div
      className="min-h-screen font-mono text-[10px] leading-tight"
      style={{ backgroundColor: COLORS.background, color: COLORS.textLight }}
    >
      <FUINav
        logoText="CARD.OPTIONS"
        version="v2.0"
        items={navItems}
      />
      <FUIStatusBar status="ONLINE" location="LAB.SECTOR" build="v2.0" />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">

        {/* OPTION A: Unified Layout */}
        <section>
          <FUISectionHeader
            badge="01"
            title="OPTION A: UNIFIED LAYOUT"
            rightText="HEADER → CONTENT → FOOTER"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <div className="border-b pb-2 mb-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.primary }}>PRICING</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>REGULAR:</span>
                  <span className="line-through opacity-50">$399</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>LAUNCH:</span>
                  <span style={{ color: COLORS.primary }}>$199</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>TYPE:</span>
                  <span>ONE-TIME</span>
                </div>
              </div>
              <div className="border-t pt-2 mt-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.secondary }}>&gt; BUY NOW</span>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="border-b pb-2 mb-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.primary }}>AUTH MODULE</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>TIME SAVED:</span>
                  <span>40+ HRS</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>COST SAVED:</span>
                  <span>$4,000+</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>STATUS:</span>
                  <span style={{ color: COLORS.primary }}>READY</span>
                </div>
              </div>
              <div className="border-t pt-2 mt-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.secondary }}>&gt; VIEW DOCS</span>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="border-b pb-2 mb-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.primary }}>COMPONENTS</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>COUNT:</span>
                  <span style={{ color: COLORS.primary }}>77+</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>TYPE:</span>
                  <span>UI PRIMITIVES</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>A11Y:</span>
                  <span>WCAG 2.1</span>
                </div>
              </div>
              <div className="border-t pt-2 mt-3" style={{ borderColor: COLORS.primaryDim }}>
                <span style={{ color: COLORS.secondary }}>&gt; BROWSE</span>
              </div>
            </FUIPane>
          </div>
        </section>

        {/* OPTION B: Typed Cards */}
        <section>
          <FUISectionHeader
            badge="02"
            title="OPTION B: TYPED CARDS"
            rightText="DATA | LIST | STAT"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <div className="flex justify-between items-center mb-3">
                <span style={{ color: COLORS.primary }}>DATA CARD</span>
                <span style={{ color: COLORS.secondary }}>●</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2" style={{ borderColor: COLORS.primaryDim }}>
                  <span style={{ color: COLORS.textMuted }}>FRAMEWORK</span>
                  <span>NEXT.JS 16</span>
                </div>
                <div className="flex justify-between border-b pb-2" style={{ borderColor: COLORS.primaryDim }}>
                  <span style={{ color: COLORS.textMuted }}>LANGUAGE</span>
                  <span>TYPESCRIPT</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>STYLING</span>
                  <span>TAILWIND 4</span>
                </div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex justify-between items-center mb-3">
                <span style={{ color: COLORS.primary }}>LIST CARD</span>
                <span style={{ color: COLORS.secondary }}>5</span>
              </div>
              <div className="space-y-1">
                <div style={{ color: COLORS.secondary }}>&gt; OAuth providers</div>
                <div style={{ color: COLORS.secondary }}>&gt; Magic link auth</div>
                <div style={{ color: COLORS.secondary }}>&gt; JWT sessions</div>
                <div style={{ color: COLORS.secondary }}>&gt; Rate limiting</div>
                <div style={{ color: COLORS.secondary }}>&gt; RBAC permissions</div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex justify-between items-center mb-3">
                <span style={{ color: COLORS.primary }}>STAT CARD</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-4xl font-bold" style={{ color: COLORS.primary }}>77+</div>
                <div className="mt-2" style={{ color: COLORS.textMuted }}>COMPONENTS</div>
              </div>
            </FUIPane>
          </div>
        </section>

        {/* OPTION C: Minimal */}
        <section>
          <FUISectionHeader
            badge="03"
            title="OPTION C: MINIMAL"
            rightText="NO HEADERS"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <div className="mb-3" style={{ color: COLORS.textMuted }}>[PRICING]</div>
              <div className="text-3xl font-bold" style={{ color: COLORS.primary }}>$199</div>
              <div className="mt-1" style={{ color: COLORS.textMuted }}>ONE-TIME PAYMENT</div>
            </FUIPane>

            <FUIPane>
              <div className="mb-3" style={{ color: COLORS.textMuted }}>[FEATURES]</div>
              <div className="space-y-1">
                <div style={{ color: COLORS.secondary }}>&gt; Authentication</div>
                <div style={{ color: COLORS.secondary }}>&gt; Payments</div>
                <div style={{ color: COLORS.secondary }}>&gt; Multi-tenancy</div>
                <div style={{ color: COLORS.secondary }}>&gt; 77+ Components</div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="mb-3" style={{ color: COLORS.textMuted }}>[STAT]</div>
              <div className="text-3xl font-bold" style={{ color: COLORS.primary }}>77+</div>
              <div className="mt-1" style={{ color: COLORS.textMuted }}>UI COMPONENTS</div>
            </FUIPane>
          </div>
        </section>

        {/* OPTION D: True FUI */}
        <section>
          <FUISectionHeader
            badge="04"
            title="OPTION D: TRUE FUI"
            rightText="LABEL:VALUE PAIRS"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: COLORS.primary }}>●</span>
                <span style={{ color: COLORS.textMuted }}>PRICING</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>REGULAR</span>
                  <span className="line-through opacity-50">$399</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>LAUNCH</span>
                  <span style={{ color: COLORS.primary }}>$199</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>TYPE</span>
                  <span>ONE-TIME</span>
                </div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.primary }}>●</span>
                  <span style={{ color: COLORS.textMuted }}>AUTH MODULE</span>
                </div>
                <span style={{ color: COLORS.secondary }}>5</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.textMuted }}>›</span>
                  <span>OAuth providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.textMuted }}>›</span>
                  <span>Magic links</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.textMuted }}>›</span>
                  <span>JWT sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.textMuted }}>›</span>
                  <span>Rate limiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: COLORS.textMuted }}>›</span>
                  <span>RBAC</span>
                </div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: COLORS.primary }}>●</span>
                <span style={{ color: COLORS.textMuted }}>COMPONENTS</span>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>77</span>
                <span style={{ color: COLORS.textMuted }}>UI PRIMITIVES</span>
              </div>
              <div className="mt-3 h-1 w-full" style={{ backgroundColor: COLORS.primaryDim }}>
                <div className="h-full w-3/4" style={{ backgroundColor: COLORS.primary }} />
              </div>
            </FUIPane>
          </div>
        </section>

        {/* OPTION E: Bracket FUI */}
        <section>
          <FUISectionHeader
            badge="05"
            title="OPTION E: BRACKET FUI"
            rightText="CORNER BRACKETS"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <div className="flex justify-between items-center mb-4">
                <span style={{ color: COLORS.textMuted }}>01</span>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                  <span className="h-1 w-6" style={{ backgroundColor: COLORS.primary, opacity: 0.5 }} />
                </div>
              </div>
              <div className="py-4 text-center">
                <div className="text-3xl font-bold" style={{ color: COLORS.textLight }}>$199</div>
                <div className="mt-1" style={{ color: COLORS.textMuted }}>ONE-TIME</div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex justify-between items-center mb-4">
                <span style={{ color: COLORS.textMuted }}>02</span>
                <div className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary, opacity: 0.3 }} />
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary, opacity: 0.3 }} />
                </div>
              </div>
              <div className="py-4 text-center">
                <div className="text-3xl font-bold" style={{ color: COLORS.primary }}>77+</div>
                <div className="mt-1" style={{ color: COLORS.textMuted }}>COMPONENTS</div>
              </div>
            </FUIPane>

            <FUIPane>
              <div className="flex justify-between items-center mb-4">
                <span style={{ color: COLORS.textMuted }}>03</span>
                <span style={{ color: COLORS.secondary }}>AUTH</span>
              </div>
              <div className="py-2 text-center">
                <div>OAuth · Magic Links</div>
                <div className="mt-1">JWT · Rate Limit</div>
                <div className="mt-1">RBAC</div>
              </div>
            </FUIPane>
          </div>
        </section>

        {/* OPTION F: Blueprint */}
        <section>
          <FUISectionHeader
            badge="06"
            title="OPTION F: BLUEPRINT"
            rightText="DASHED BORDERS"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              className="relative p-4 border border-dashed"
              style={{ borderColor: COLORS.primary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>// PRICING</div>
              <div className="mt-3 text-2xl font-bold" style={{ color: COLORS.textLight }}>$199</div>
              <div style={{ color: COLORS.textMuted }}>one-time payment</div>
            </div>

            <div
              className="relative p-4 border border-dashed"
              style={{ borderColor: COLORS.primary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>// COMPONENTS</div>
              <div className="mt-3 text-2xl font-bold" style={{ color: COLORS.primary }}>77+</div>
              <div style={{ color: COLORS.textMuted }}>ui primitives</div>
            </div>

            <div
              className="relative p-4 border border-dashed"
              style={{ borderColor: COLORS.primary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>// FEATURES</div>
              <div className="mt-3 space-y-1">
                <div>- auth</div>
                <div>- payments</div>
                <div>- multi-tenant</div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION G: Accent Bar */}
        <section>
          <FUISectionHeader
            badge="07"
            title="OPTION G: ACCENT BAR"
            rightText="LEFT BORDER"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              className="p-4 border-l-2"
              style={{ borderLeftColor: COLORS.primary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>PRICING</div>
              <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.textLight }}>$199</div>
            </div>

            <div
              className="p-4 border-l-2"
              style={{ borderLeftColor: COLORS.secondary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>COMPONENTS</div>
              <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.primary }}>77+</div>
            </div>

            <div
              className="p-4 border-l-2"
              style={{ borderLeftColor: COLORS.primary, backgroundColor: COLORS.surface }}
            >
              <div style={{ color: COLORS.textMuted }}>AUTH</div>
              <div className="mt-2">OAuth · JWT · RBAC</div>
            </div>
          </div>
        </section>

        {/* OPTION H: ASCII Box */}
        <section>
          <FUISectionHeader
            badge="08"
            title="OPTION H: ASCII BOX"
            rightText="TEXT BORDERS"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FUIPane>
              <pre style={{ color: COLORS.primary }}>
{`┌─ PRICING ──────────┐
│                    │
│       $199         │
│     one-time       │
│                    │
└────────────────────┘`}
              </pre>
            </FUIPane>

            <FUIPane>
              <pre style={{ color: COLORS.secondary }}>
{`┌─ COMPONENTS ───────┐
│                    │
│        77+         │
│    ui primitives   │
│                    │
└────────────────────┘`}
              </pre>
            </FUIPane>

            <FUIPane>
              <pre style={{ color: COLORS.primary }}>
{`┌─ FEATURES ─────────┐
│  > auth            │
│  > payments        │
│  > multi-tenant    │
│  > 77+ components  │
└────────────────────┘`}
              </pre>
            </FUIPane>
          </div>
        </section>

        {/* OPTION I: Double Border */}
        <section>
          <FUISectionHeader
            badge="09"
            title="OPTION I: DOUBLE BORDER"
            rightText="NESTED"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-1 border" style={{ borderColor: COLORS.primaryDim }}>
              <FUIPane>
                <div style={{ color: COLORS.textMuted }}>PRICING</div>
                <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.textLight }}>$199</div>
              </FUIPane>
            </div>

            <div className="p-1 border" style={{ borderColor: COLORS.primaryDim }}>
              <FUIPane>
                <div style={{ color: COLORS.textMuted }}>COMPONENTS</div>
                <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.primary }}>77+</div>
              </FUIPane>
            </div>

            <div className="p-1 border" style={{ borderColor: COLORS.primaryDim }}>
              <FUIPane>
                <div style={{ color: COLORS.textMuted }}>FEATURES</div>
                <div className="mt-2">Auth · Pay · RBAC</div>
              </FUIPane>
            </div>
          </div>
        </section>

        {/* OPTION J: Top Line */}
        <section>
          <FUISectionHeader
            badge="10"
            title="OPTION J: TOP LINE"
            rightText="ULTRA MINIMAL"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="pt-4 border-t-2" style={{ borderTopColor: COLORS.primary }}>
              <div style={{ color: COLORS.textMuted }}>PRICING</div>
              <div className="mt-1 text-2xl font-bold" style={{ color: COLORS.textLight }}>$199</div>
              <div style={{ color: COLORS.textMuted }}>one-time</div>
            </div>

            <div className="pt-4 border-t-2" style={{ borderTopColor: COLORS.secondary }}>
              <div style={{ color: COLORS.textMuted }}>COMPONENTS</div>
              <div className="mt-1 text-2xl font-bold" style={{ color: COLORS.primary }}>77+</div>
              <div style={{ color: COLORS.textMuted }}>ui primitives</div>
            </div>

            <div className="pt-4 border-t-2" style={{ borderTopColor: COLORS.primary }}>
              <div style={{ color: COLORS.textMuted }}>FEATURES</div>
              <div className="mt-1">Auth · Payments · RBAC</div>
              <div style={{ color: COLORS.textMuted }}>production ready</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
