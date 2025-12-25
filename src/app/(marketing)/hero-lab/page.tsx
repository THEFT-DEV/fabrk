/**
 * Hero Lab - 35 Hero Section Variations
 * Test different approaches to find the most compelling hero
 */
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Original Homepage (preserved)
import { HeroOriginal } from './components/hero-original';

// Original Heroes (now compact)
import { HeroTimeSaved } from './components/hero-time-saved';
import { HeroLiveRevenue } from './components/hero-live-revenue';
import { HeroBeforeAfter } from './components/hero-before-after';
import { HeroComponentGallery } from './components/hero-component-gallery';
import { HeroTerminalBoot } from './components/hero-terminal-boot';
import { HeroSocialProof } from './components/hero-social-proof';
import { HeroFeatureChecklist } from './components/hero-feature-checklist';
import { HeroPricingBreakdown } from './components/hero-pricing-breakdown';
import { HeroThemeShowcase } from './components/hero-theme-showcase';
import { HeroSpeedRun } from './components/hero-speed-run';

// Compact Heroes
import { HeroCommandLine } from './components/hero-command-line';
import { HeroSplitCompact } from './components/hero-split-compact';
import { HeroStatsWall } from './components/hero-stats-wall';
import { HeroVideoPreview } from './components/hero-video-preview';
import { HeroMinimalCTA } from './components/hero-minimal-cta';

// Headline-Focused Heroes
import { HeroTypewriter } from './components/hero-typewriter';
import { HeroQuestionHook } from './components/hero-question-hook';
import { HeroCountdown } from './components/hero-countdown';
import { HeroOneLiner } from './components/hero-one-liner';
import { HeroProblemSolution } from './components/hero-problem-solution';

// Visual-Focused Heroes
import { HeroBrowserMockup } from './components/hero-browser-mockup';
import { HeroCodeEditor } from './components/hero-code-editor';
import { HeroTerminalOnly } from './components/hero-terminal-only';
import { HeroSplitScreen } from './components/hero-split-screen';
import { HeroFloatingCards } from './components/hero-floating-cards';

// Social Proof Heroes
import { HeroLogoBar } from './components/hero-logo-bar';
import { HeroSingleTestimonial } from './components/hero-single-testimonial';
import { HeroGithubStars } from './components/hero-github-stars';
import { HeroStatsOnly } from './components/hero-stats-only';
import { HeroReviewScore } from './components/hero-review-score';

// CTA-Focused Heroes
import { HeroDualCTA } from './components/hero-dual-cta';
import { HeroEmailCapture } from './components/hero-email-capture';
import { HeroVideoCTA } from './components/hero-video-cta';
import { HeroComparisonCTA } from './components/hero-comparison-cta';
import { HeroGuarantee } from './components/hero-guarantee';

export const metadata = {
  title: 'Hero Lab | Fabrk',
  description: 'Testing 35 hero section variations',
};

// Recommended heroes (stay above fold, high impact)
const RECOMMENDED = [
  { id: 'minimal-cta', name: 'MINIMAL CTA', component: HeroMinimalCTA },
  { id: 'command-line', name: 'COMMAND LINE', component: HeroCommandLine },
  { id: 'one-liner', name: 'ONE LINER', component: HeroOneLiner },
  { id: 'typewriter', name: 'TYPEWRITER', component: HeroTypewriter },
  { id: 'guarantee', name: 'GUARANTEE', component: HeroGuarantee },
];

// Original heroes (now all compact)
const ORIGINAL = [
  { id: 'original', name: 'ORIGINAL HOMEPAGE', component: HeroOriginal },
  { id: 'stats-wall', name: 'STATS WALL', component: HeroStatsWall },
  { id: 'split-compact', name: 'SPLIT COMPACT', component: HeroSplitCompact },
  { id: 'video-preview', name: 'VIDEO PREVIEW', component: HeroVideoPreview },
  { id: 'terminal-boot', name: 'TERMINAL BOOT', component: HeroTerminalBoot },
  { id: 'before-after', name: 'BEFORE/AFTER', component: HeroBeforeAfter },
  { id: 'time-saved', name: 'TIME SAVED', component: HeroTimeSaved },
  { id: 'live-revenue', name: 'LIVE REVENUE', component: HeroLiveRevenue },
  { id: 'component-gallery', name: 'COMPONENT GALLERY', component: HeroComponentGallery },
  { id: 'social-proof', name: 'SOCIAL PROOF', component: HeroSocialProof },
  { id: 'feature-checklist', name: 'FEATURE CHECKLIST', component: HeroFeatureChecklist },
  { id: 'pricing-breakdown', name: 'PRICING BREAKDOWN', component: HeroPricingBreakdown },
  { id: 'theme-showcase', name: 'THEME SHOWCASE', component: HeroThemeShowcase },
  { id: 'speed-run', name: 'SPEED RUN', component: HeroSpeedRun },
];

// Headline-focused
const HEADLINE = [
  { id: 'question-hook', name: 'QUESTION HOOK', component: HeroQuestionHook },
  { id: 'countdown', name: 'COUNTDOWN', component: HeroCountdown },
  { id: 'problem-solution', name: 'PROBLEM/SOLUTION', component: HeroProblemSolution },
];

// Visual-focused
const VISUAL = [
  { id: 'browser-mockup', name: 'BROWSER MOCKUP', component: HeroBrowserMockup },
  { id: 'code-editor', name: 'CODE EDITOR', component: HeroCodeEditor },
  { id: 'terminal-only', name: 'TERMINAL ONLY', component: HeroTerminalOnly },
  { id: 'split-screen', name: 'SPLIT SCREEN', component: HeroSplitScreen },
  { id: 'floating-cards', name: 'FLOATING CARDS', component: HeroFloatingCards },
];

// Social proof
const SOCIAL = [
  { id: 'logo-bar', name: 'LOGO BAR', component: HeroLogoBar },
  { id: 'single-testimonial', name: 'TESTIMONIAL', component: HeroSingleTestimonial },
  { id: 'github-stars', name: 'GITHUB STARS', component: HeroGithubStars },
  { id: 'stats-only', name: 'STATS ONLY', component: HeroStatsOnly },
  { id: 'review-score', name: 'REVIEW SCORE', component: HeroReviewScore },
];

// CTA-focused
const CTA = [
  { id: 'dual-cta', name: 'DUAL CTA', component: HeroDualCTA },
  { id: 'email-capture', name: 'EMAIL CAPTURE', component: HeroEmailCapture },
  { id: 'video-cta', name: 'VIDEO CTA', component: HeroVideoCTA },
  { id: 'comparison-cta', name: 'COMPARISON', component: HeroComparisonCTA },
];

const ALL_CATEGORIES = [
  { name: 'RECOMMENDED', items: RECOMMENDED, color: 'text-success' },
  { name: 'ORIGINAL', items: ORIGINAL, color: 'text-foreground' },
  { name: 'HEADLINE', items: HEADLINE, color: 'text-primary' },
  { name: 'VISUAL', items: VISUAL, color: 'text-accent' },
  { name: 'SOCIAL', items: SOCIAL, color: 'text-warning' },
  { name: 'CTA', items: CTA, color: 'text-info' },
];

const ALL_VARIATIONS = ALL_CATEGORIES.flatMap((cat) => cat.items);

export default function HeroLabPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container size="2xl">
          <div className="py-3 space-y-2">
            {ALL_CATEGORIES.map((category) => (
              <div key={category.name} className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                <span className={cn('text-xs shrink-0', mode.font, category.color)}>
                  [{category.name}]
                </span>
                {category.items.map((v) => (
                  <a
                    key={v.id}
                    href={`#${v.id}`}
                    className={cn(
                      'text-xs shrink-0 border px-2 py-1 transition-colors',
                      mode.font,
                      category.name === 'RECOMMENDED' ? 'border-success text-success' : mode.color.text.muted,
                      mode.state.hover.card
                    )}
                  >
                    {v.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Hero Variations */}
      <div className="divide-y">
        {ALL_VARIATIONS.map((variation, index) => {
          const category = ALL_CATEGORIES.find((cat) =>
            cat.items.some((item) => item.id === variation.id)
          );
          const isRecommended = category?.name === 'RECOMMENDED';

          return (
            <section
              key={variation.id}
              id={variation.id}
              className="py-8 scroll-mt-56 min-h-[80vh]"
            >
              {/* Section Label */}
              <Container size="2xl">
                <div className={cn('mb-6 flex items-center gap-4', mode.font)}>
                  <span
                    className={cn(
                      'text-xs px-2 py-1 border',
                      isRecommended ? 'border-success text-success' : mode.color.text.accent
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}: {variation.name}
                  </span>
                  {isRecommended && (
                    <span className={cn('text-xs', mode.color.text.success)}>RECOMMENDED</span>
                  )}
                  <span className={cn('text-xs', mode.color.text.muted)}>
                    [{category?.name}]
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </Container>

              {/* Hero Component */}
              <variation.component />
            </section>
          );
        })}
      </div>
    </div>
  );
}
