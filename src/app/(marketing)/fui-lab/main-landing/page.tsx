/* eslint-disable design-system/no-hardcoded-colors -- FUI Lab is an experimental playground with custom styling */
'use client';

/**
 * FUI Lab - Main Landing with FUI Styling
 * Applies Architect Command Center style to the real landing page components
 */

import { useState } from 'react';
import Link from 'next/link';
import { HeroPlaygroundFull } from '@/components/marketing/hero-playground-full';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
import { FUIMarquee, FUIPane, FUIButton } from '../components/fui-components';

// Font options for FUI
const FONTS = [
  { id: 'jetbrains', name: 'JetBrains Mono', family: '"JetBrains Mono", monospace' },
  { id: 'ibm-plex', name: 'IBM Plex Mono', family: '"IBM Plex Mono", monospace' },
  { id: 'fira', name: 'Fira Code', family: '"Fira Code", monospace' },
  { id: 'space', name: 'Space Mono', family: '"Space Mono", monospace' },
  { id: 'roboto', name: 'Roboto Mono', family: '"Roboto Mono", monospace' },
  { id: 'source-code', name: 'Source Code Pro', family: '"Source Code Pro", monospace' },
];

// FUI Theme palettes - 10 sci-fi film inspired themes
const THEMES = [
  { id: 'architect', name: 'Architect', primary: '#FDE047', secondary: '#00BFFF', bg: '#000000' },
  { id: 'blade-runner', name: 'Blade Runner', primary: '#FF0050', secondary: '#00BFFF', bg: '#0a0008' },
  { id: 'alien', name: 'Alien', primary: '#00FF41', secondary: '#00FF41', bg: '#020502' },
  { id: 'oblivion', name: 'Oblivion', primary: '#00FFFF', secondary: '#FFFFFF', bg: '#080810' },
  { id: 'iron-man', name: 'Iron Man', primary: '#FF6B35', secondary: '#00D4FF', bg: '#0a0502' },
  { id: 'tron', name: 'Tron', primary: '#00D4FF', secondary: '#FF6B00', bg: '#000508' },
  { id: 'matrix', name: 'Matrix', primary: '#00FF00', secondary: '#003300', bg: '#000200' },
  { id: 'cyberpunk', name: 'Cyberpunk', primary: '#FF00FF', secondary: '#00FFFF', bg: '#0a000a' },
  { id: 'minority-report', name: 'Minority Report', primary: '#4FC3F7', secondary: '#FFFFFF', bg: '#0a1520' },
  { id: 'prometheus', name: 'Prometheus', primary: '#FFB74D', secondary: '#90A4AE', bg: '#1a1008' },
];

// Helper to generate color object from theme
function getColors(theme: typeof THEMES[0]) {
  return {
    primary: theme.primary,
    primaryDim: `${theme.primary}33`,
    secondary: theme.secondary,
    background: theme.bg,
    surface: `color-mix(in oklch, ${theme.bg} 90%, ${theme.primary} 10%)`,
    textLight: '#B0B0B0',
    textMuted: '#606060',
    success: '#22c55e',
  };
}

const techStack = [
  'NEXT.JS 16', 'REACT 19', 'TYPESCRIPT', 'TAILWIND 4',
  'PRISMA 7', 'STRIPE', 'RESEND', 'NEXTAUTH V5'
];

// FUI Hero Section - Custom styled to match the demo
// Using 8-point grid: 8px (p-2), 16px (p-4), 24px (p-6), 32px (p-8)
function FUIHeroSection({ C }: { C: ReturnType<typeof getColors> }) {
  return (
    <section className="relative px-4 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left: Main Hero Panel */}
          <div
            className="lg:col-span-7 p-6 lg:p-8 relative border"
            style={{
              borderColor: C.primaryDim,
              backgroundColor: C.surface,
              boxShadow: `0 0 16px ${C.secondary}0a, inset 0 0 8px ${C.secondary}05`,
            }}
          >
            {/* Corner brackets */}
            <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: C.primary }} />
            <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: C.primary }} />
            <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: C.primary }} />
            <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: C.primary }} />

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 text-xs border px-3 py-1 uppercase tracking-wide mb-6"
              style={{ color: C.primary, borderColor: C.primaryDim, backgroundColor: `${C.primary}0a` }}
            >
              <span className="w-2 h-2 animate-pulse" style={{ backgroundColor: C.success }} />
              SYSTEM INIT // SAAS BOILERPLATE v2.0
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Content */}
              <div>
                <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: C.textMuted }}>[FABRK INIT]</p>

                {/* Desktop: ASCII art */}
                <pre
                  className="hidden md:block text-[7px] lg:text-[9px] leading-tight mb-6 font-bold"
                  style={{ color: C.primary }}
                >
{`███████████  █████  █████ █████ █████       ██████████
░░███░░░░░███░░███  ░░███ ░░███ ░░███       ░░███░░░░███
 ░███    ░███ ░███   ░███  ░███  ░███        ░███   ░░███
 ░██████████  ░███   ░███  ░███  ░███        ░███    ░███
 ░███░░░░░███ ░███   ░███  ░███  ░███        ░███    ░███
 ░███    ░███ ░███   ░███  ░███  ░███      █ ░███    ███
 ███████████  ░░████████   █████ ███████████ ██████████
░░░░░░░░░░░    ░░░░░░░░   ░░░░░ ░░░░░░░░░░░ ░░░░░░░░░░

 ██████   ██████ █████ ██████   █████ █████  █████ ███████████ ██████████  █████████
░░██████ ██████ ░░███ ░░██████ ░░███ ░░███  ░░███ ░█░░░███░░░█░░███░░░░░█ ███░░░░░███
 ░███░█████░███  ░███  ░███░███ ░███  ░███   ░███ ░   ░███  ░  ░███  █ ░ ░███    ░░░
 ░███░░███ ░███  ░███  ░███░░███░███  ░███   ░███     ░███     ░██████   ░░█████████
 ░███ ░░░  ░███  ░███  ░███ ░░██████  ░███   ░███     ░███     ░███░░█    ░░░░░░░░███
 ░███      ░███  ░███  ░███  ░░█████  ░███   ░███     ░███     ░███ ░   █ ███    ░███
 █████     █████ █████ █████  ░░█████ ░░████████      █████    ██████████░░█████████
░░░░░     ░░░░░ ░░░░░ ░░░░░    ░░░░░   ░░░░░░░░      ░░░░░    ░░░░░░░░░░  ░░░░░░░░░`}
                </pre>

                {/* Mobile: Simple text */}
                <h2 className="md:hidden text-4xl font-bold mb-6" style={{ color: C.primary }}>
                  BUILD IN<br />MINUTES
                </h2>

                <p
                  className="text-sm leading-relaxed pl-4 border-l-2 mb-6"
                  style={{ color: C.textMuted, borderColor: C.secondary }}
                >
                  Ship your product this weekend not next quarter. Terminal-first SaaS boilerplate with auth, payments, and multi-tenancy built-in.
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-4 text-sm mb-8" style={{ color: C.textLight }}>
                  <span><span style={{ color: C.primary }}>77+</span> Components</span>
                  <span style={{ color: C.textMuted }}>•</span>
                  <span><span style={{ color: C.primary }}>34+</span> Templates</span>
                  <span style={{ color: C.textMuted }}>•</span>
                  <span><span style={{ color: C.primary }}>&lt;5 MIN</span> Setup</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <button
                    className="px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors"
                    style={{
                      backgroundColor: C.primary,
                      color: C.background,
                      clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                    }}
                  >
                    <Link href="/api/polar/checkout">&gt; GET FABRK — $199</Link>
                  </button>
                  <button
                    className="px-6 py-3 text-sm font-bold uppercase tracking-wide border transition-colors"
                    style={{
                      borderColor: C.primary,
                      color: C.primary,
                      clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                    }}
                  >
                    <Link href="/library">&gt; EXPLORE DEMOS</Link>
                  </button>
                </div>
              </div>

              {/* HUD Display */}
              <div className="relative h-56 md:h-auto flex items-center justify-center">
                {/* Outer spinning ring */}
                <div
                  className="absolute w-40 h-40 md:w-48 md:h-48 border rounded-full animate-spin"
                  style={{ borderColor: C.primaryDim, animationDuration: '12s' }}
                >
                  <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: C.primary }} />
                  <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: C.primary }} />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: C.primary }} />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: C.primary }} />
                </div>

                {/* Inner dashed ring */}
                <div
                  className="absolute w-24 h-24 border border-dashed rounded-full"
                  style={{ borderColor: C.primaryDim, animation: 'spin 15s linear infinite reverse' }}
                />

                {/* Center core */}
                <div
                  className="absolute w-16 h-16 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: `${C.primary}1a`,
                    borderColor: C.primary,
                    boxShadow: `0 0 24px ${C.primary}4d`,
                  }}
                >
                  <span className="text-xs font-bold animate-pulse" style={{ color: C.primary }}>FABRK</span>
                </div>

                {/* Data readouts */}
                <div
                  className="absolute top-0 right-0 border p-2 text-xs"
                  style={{ backgroundColor: `${C.background}ee`, borderColor: `${C.secondary}60`, color: C.secondary }}
                >
                  <div className="border-b mb-1 pb-1 uppercase" style={{ borderColor: `${C.secondary}30` }}>MODULES</div>
                  <div className="text-white font-bold">77+ READY</div>
                </div>

                <div
                  className="absolute bottom-0 left-0 border p-2 text-xs"
                  style={{ backgroundColor: `${C.background}ee`, borderColor: `${C.secondary}60`, color: C.secondary }}
                >
                  <div className="border-b mb-1 pb-1 uppercase" style={{ borderColor: `${C.secondary}30` }}>SETUP</div>
                  <div className="text-white font-bold">&lt;5 MIN</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pricing Card */}
          <div className="lg:col-span-5">
            <div
              className="relative border-2 p-6"
              style={{
                borderColor: C.primary,
                backgroundColor: C.surface,
                boxShadow: `0 0 24px ${C.primary}26`,
              }}
            >
              {/* Corner brackets - 12px (1.5 units on 8pt grid) */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: C.primary }} />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: C.primary }} />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: C.primary }} />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: C.primary }} />
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wide" style={{ color: C.textMuted }}>[LAUNCH OFFER]</span>
                <span
                  className="animate-pulse px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: C.primary, color: C.background }}
                >
                  -$100
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl font-bold" style={{ color: C.primary }}>$199</span>
                <span className="text-xl line-through" style={{ color: C.textMuted }}>$299</span>
              </div>

              {/* Launch info */}
              <div className="border-l-2 pl-4 mb-4" style={{ borderColor: C.primary }}>
                <div className="text-xs font-bold" style={{ color: C.primary }}>LAUNCH PRICE: $199</div>
                <div className="text-xs" style={{ color: C.textMuted }}>$299 after first 100 buyers</div>
              </div>

              {/* Divider */}
              <div className="border-t pt-4 mb-4" style={{ borderColor: C.primaryDim }}>
                <div className="flex items-center justify-center gap-4 text-sm font-bold">
                  <span style={{ color: C.textMuted }}>FROM IDEA</span>
                  <span style={{ color: C.primary }}>│</span>
                  <span style={{ color: C.success }}>TO LIVE</span>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2 text-xs mb-6" style={{ color: C.textLight }}>
                {[
                  'Full source code access',
                  '77+ UI components',
                  '34+ page templates',
                  '12 terminal themes',
                  'Auth + Payments + Multi-tenant',
                  'Lifetime updates',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span style={{ color: C.success }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full px-6 py-3 font-mono text-xs tracking-wide uppercase font-bold transition-colors"
                style={{
                  backgroundColor: C.primary,
                  color: C.background,
                  clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                }}
              >
                <Link href="/api/polar/checkout" className="block w-full text-center">
                  &gt; INITIALIZE PURCHASE
                </Link>
              </button>
            </div>

            {/* Mini metrics below pricing */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: 'THEMES', value: '12' },
                { label: 'AUTH', value: 'OK' },
                { label: 'PAYMENTS', value: '3+' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="border p-2 text-center"
                  style={{ borderColor: C.primaryDim, backgroundColor: C.surface }}
                >
                  <div className="text-xs uppercase" style={{ color: C.textMuted }}>{stat.label}</div>
                  <div className="text-sm font-bold" style={{ color: C.primary }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FUIMainLanding() {
  const [theme, setTheme] = useState(THEMES[0]);
  const [font, setFont] = useState(FONTS[0]);
  const C = getColors(theme);

  return (
    <div
      className="min-h-screen transition-colors relative overflow-x-hidden"
      style={{
        backgroundColor: C.background,
        color: C.textLight,
        fontFamily: font.family,
        backgroundImage: `
          linear-gradient(${C.primary}08 1px, transparent 1px),
          linear-gradient(90deg, ${C.primary}08 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px', /* 8-point grid: 32px = 4 units */
      }}
    >
      {/* Google Fonts for FUI */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&family=Roboto+Mono:wght@400;500;700&family=Source+Code+Pro:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Dynamic selection color */}
      <style>{`::selection { background: ${C.primary}; color: ${C.background}; }`}</style>

      {/* FUI Status bar */}
      <div className="fixed top-0 left-0 w-full h-px z-50" style={{ backgroundColor: C.primary }} />
      <div
        className="fixed top-px left-0 w-full flex justify-between px-4 py-2 text-xs uppercase z-40 border-b backdrop-blur-sm"
        style={{
          color: C.primary,
          backgroundColor: `${C.background}ee`,
          borderColor: C.primaryDim,
        }}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.primary }} />
          SYS.STATUS: ONLINE // FABRK.DEV
        </span>
        <span className="hidden sm:inline">THEME: {theme.name.toUpperCase()}</span>
        <span>FABRK // BUILD: 2.0.0</span>
      </div>

      {/* Theme & Font selector - sticky (top-10 = 40px to clear status bar) */}
      <div
        className="sticky top-10 z-[100] mx-4 lg:mx-auto lg:max-w-6xl mt-8 mb-8 p-4 border backdrop-blur-md"
        style={{
          backgroundColor: `${C.surface}ee`,
          borderColor: C.primaryDim,
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: C.primary, color: C.background }}
            >
              FUI LAB
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.primary, boxShadow: `0 0 8px ${C.primary}` }} />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Theme selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-wide" style={{ color: C.textMuted }}>
                THEME:
              </label>
              <select
                value={theme.id}
                onChange={(e) => setTheme(THEMES.find(t => t.id === e.target.value) || THEMES[0])}
                className="border text-xs px-2 py-1 outline-none font-bold uppercase cursor-pointer"
                style={{
                  backgroundColor: C.background,
                  borderColor: C.primaryDim,
                  color: C.primary,
                }}
              >
                {THEMES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Font selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-wide" style={{ color: C.textMuted }}>
                FONT:
              </label>
              <select
                value={font.id}
                onChange={(e) => setFont(FONTS.find(f => f.id === e.target.value) || FONTS[0])}
                className="border text-xs px-2 py-1 outline-none font-bold uppercase cursor-pointer"
                style={{
                  backgroundColor: C.background,
                  borderColor: C.primaryDim,
                  color: C.primary,
                }}
              >
                {FONTS.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Theme swatches */}
        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: `${C.primary}20` }}>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              className="w-8 h-8 border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: t.bg,
                borderColor: theme.id === t.id ? t.primary : `${t.primary}40`,
                boxShadow: theme.id === t.id ? `0 0 8px ${t.primary}` : 'none',
              }}
              title={t.name}
            >
              <div className="w-full h-1/2" style={{ backgroundColor: t.primary }} />
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for fixed status bar */}
      <div className="h-2" />

      {/* FUI CSS overrides for marketing components - dynamic based on theme */}
      <style>{`
        .fui-wrapper * {
          border-radius: 0 !important;
        }

        .fui-wrapper section {
          border-color: ${C.primaryDim};
        }

        /* Override backgrounds */
        .fui-wrapper [class*="bg-background"],
        .fui-wrapper [class*="bg-card"] {
          background-color: ${C.surface} !important;
        }

        .fui-wrapper [class*="bg-muted"] {
          background-color: ${C.background} !important;
        }

        /* Override text colors */
        .fui-wrapper [class*="text-foreground"],
        .fui-wrapper h1,
        .fui-wrapper h2,
        .fui-wrapper h3 {
          color: #ffffff !important;
        }

        .fui-wrapper [class*="text-muted-foreground"] {
          color: ${C.textMuted} !important;
        }

        /* Override primary colors */
        .fui-wrapper [class*="text-primary"],
        .fui-wrapper [class*="text-accent"] {
          color: ${C.primary} !important;
        }

        .fui-wrapper [class*="bg-primary"]:not([class*="text-"]),
        .fui-wrapper [class*="bg-accent"]:not([class*="text-"]) {
          background-color: ${C.primary} !important;
          color: ${C.background} !important;
        }

        /* Override borders */
        .fui-wrapper [class*="border-border"],
        .fui-wrapper [class*="border-primary"],
        .fui-wrapper [class*="border-accent"] {
          border-color: ${C.primaryDim} !important;
        }

        /* Buttons */
        .fui-wrapper button,
        .fui-wrapper [role="button"] {
          border-radius: 0 !important;
          font-family: ui-monospace, monospace !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Section backgrounds */
        .fui-wrapper section:nth-child(even) {
          background-color: ${C.surface};
        }

        .fui-wrapper section:nth-child(odd) {
          background-color: ${C.background};
        }

        /* Links */
        .fui-wrapper a:hover {
          color: ${C.primary} !important;
        }

        /* Inputs */
        .fui-wrapper input,
        .fui-wrapper textarea,
        .fui-wrapper select {
          background-color: ${C.background} !important;
          border-color: ${C.primaryDim} !important;
          color: ${C.textLight} !important;
          border-radius: 0 !important;
        }

        /* Code blocks */
        .fui-wrapper pre,
        .fui-wrapper code {
          background-color: ${C.background} !important;
          border-color: ${C.primaryDim} !important;
        }

        /* Tabs */
        .fui-wrapper [role="tablist"] {
          background-color: ${C.background} !important;
          border-color: ${C.primaryDim} !important;
        }

        .fui-wrapper [role="tab"][data-state="active"] {
          background-color: ${C.primary}1a !important;
          color: ${C.primary} !important;
        }

        /* Sticky CTA */
        .fui-wrapper [class*="sticky"],
        .fui-wrapper [class*="fixed"] {
          background-color: ${C.background}f5 !important;
          border-color: ${C.primaryDim} !important;
        }
      `}</style>

      {/* Custom FUI Hero */}
      <FUIHeroSection C={C} />

      {/* Tech stack marquee */}
      <div className="py-4 border-y overflow-hidden" style={{ borderColor: C.primaryDim, backgroundColor: C.surface }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-2 h-2" style={{ backgroundColor: C.primary }} />
          <span className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>POWERED BY</span>
        </div>
        {/* Custom marquee with dynamic colors */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10" style={{ background: `linear-gradient(to right, ${C.surface}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10" style={{ background: `linear-gradient(to left, ${C.surface}, transparent)` }} />
          <div className="flex gap-8 uppercase tracking-wide font-bold text-xs animate-marquee whitespace-nowrap" style={{ color: `${C.primary}b3` }}>
            {[...techStack, ...techStack].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                {item}
                <span style={{ color: '#333' }}>//</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wrapped marketing components */}
      <div className="fui-wrapper">
        <HeroPlaygroundFull />
        <FeaturesShowcase />
        <StatsSection />
        <UseCasesSection />
        <PricingSection />
        <WhatsIncludedSection />
        <FAQSection />
        <FinalCTASection />
        <StickyCTABar message="Launch your SaaS in days, not months" ctaText="Get Fabrk Now" />
      </div>

      {/* Bottom line */}
      <div className="fixed bottom-0 left-0 w-full h-px z-50" style={{ backgroundColor: C.primary }} />
    </div>
  );
}
