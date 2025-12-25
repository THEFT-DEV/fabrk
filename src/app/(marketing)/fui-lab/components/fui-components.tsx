/* eslint-disable design-system/no-hardcoded-colors -- FUI Lab is an experimental playground with custom styling */
/**
 * FUI Component Library
 * Architect Command Center style - Yellow/Black with Blue accents
 */

'use client';

import { cn } from '@/lib/utils';

// Color constants
const COLORS = {
  primary: '#FDE047', // Sharp Lemon Yellow
  primaryDim: 'rgba(253, 224, 71, 0.2)',
  secondary: '#00BFFF', // Electric Blue
  secondaryDim: 'rgba(0, 191, 255, 0.1)',
  background: '#000000',
  surface: '#0A0A0A',
  textLight: '#B0B0B0',
  textMuted: '#606060',
};

// =============================================================================
// FUI PANE - Main container with corner brackets
// =============================================================================

interface FUIPaneProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function FUIPane({ children, className = '', hover = true }: FUIPaneProps) {
  return (
    <div
      className={cn(
        'relative border p-4 text-[10px] leading-tight transition-colors',
        hover && 'hover:border-[#FDE047]/60',
        className
      )}
      style={{
        borderColor: COLORS.primaryDim,
        backgroundColor: COLORS.surface,
        boxShadow: `0 0 10px ${COLORS.secondaryDim}, inset 0 0 5px rgba(0, 191, 255, 0.02)`,
      }}
    >
      {/* Corner brackets */}
      <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: COLORS.primary }} />
      <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: COLORS.primary }} />
      <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: COLORS.primary }} />
      <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: COLORS.primary }} />
      {children}
    </div>
  );
}

// =============================================================================
// FUI NAV - Navigation bar
// =============================================================================

interface FUINavProps {
  logoText?: string;
  version?: string;
  items?: { label: string; href: string }[];
  ctaLabel?: string;
  className?: string;
}

export function FUINav({
  logoText = 'ARCHITECT_CORE',
  version = 'V4.0.0',
  items = [],
  ctaLabel = 'SECURE_LOGIN',
  className = '',
}: FUINavProps) {
  return (
    <nav className={cn('relative w-full px-4 py-3 flex justify-between items-center', className)}>
      {/* Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div
          className="w-8 h-8 border flex items-center justify-center relative transition-colors"
          style={{
            borderColor: COLORS.primary,
            backgroundColor: 'rgba(253, 224, 71, 0.05)',
          }}
        >
          <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
            {logoText.charAt(0)}
          </span>
          <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l" style={{ borderColor: COLORS.primary }} />
          <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r" style={{ borderColor: COLORS.primary }} />
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-bold tracking-wider text-white uppercase leading-none">
            {logoText}
          </div>
          <div className="text-[9px] tracking-wide uppercase" style={{ color: COLORS.primary }}>
            COMMAND_CENTER // {version}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="hidden md:flex items-center gap-6 text-[10px] tracking-wide uppercase font-bold" style={{ color: COLORS.textMuted }}>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="relative group transition-colors"
            style={{ color: COLORS.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
          >
            {item.label}
            <span
              className="absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full"
              style={{ backgroundColor: COLORS.primary }}
            />
          </a>
        ))}
        <button
          className="px-4 py-1.5 border uppercase font-bold text-[10px] tracking-wide transition-colors"
          style={{
            borderColor: COLORS.primary,
            color: COLORS.primary,
            clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.primary;
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = COLORS.primary;
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </nav>
  );
}

// =============================================================================
// FUI STATUS BAR - Top status bar
// =============================================================================

interface FUIStatusBarProps {
  status?: string;
  location?: string;
  build?: string;
}

export function FUIStatusBar({
  status = 'SYS.STATUS: ONLINE // INTERFACE: LIVE',
  location = 'LOC: 45.912, -12.004 // UTC: 13:37:42',
  build = 'ARCHITECT_NODE // BUILD: 4.0.0',
}: FUIStatusBarProps) {
  return (
    <>
      {/* Top line */}
      <div className="fixed top-0 left-0 w-full h-px z-50" style={{ backgroundColor: COLORS.primary }} />
      {/* Status bar */}
      <div
        className="fixed top-px left-0 w-full flex justify-between px-4 py-1 text-[9px] uppercase z-40 border-b backdrop-blur-sm"
        style={{
          color: COLORS.primary,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderColor: COLORS.primaryDim,
        }}
      >
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: COLORS.primary }} />
          {status}
        </span>
        <span className="hidden sm:inline">{location}</span>
        <span>{build}</span>
      </div>
      {/* Bottom line */}
      <div className="fixed bottom-0 left-0 w-full h-px z-50" style={{ backgroundColor: COLORS.primary }} />
    </>
  );
}

// =============================================================================
// FUI BUTTON - Chamfered button
// =============================================================================

interface FUIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
  children: React.ReactNode;
}

export function FUIButton({ variant = 'outline', children, className = '', ...props }: FUIButtonProps) {
  const baseStyles = 'px-6 py-2 font-mono text-[10px] tracking-wide uppercase font-bold transition-colors';
  const clipPath = 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)';

  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary,
      color: '#000',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
    },
    secondary: {
      backgroundColor: COLORS.secondaryDim,
      color: '#000',
      border: 'none',
    },
  };

  return (
    <button
      className={cn(baseStyles, className)}
      style={{ ...variantStyles[variant], clipPath }}
      {...props}
    >
      {children}
    </button>
  );
}

// =============================================================================
// FUI SECTION HEADER
// =============================================================================

interface FUISectionHeaderProps {
  badge?: string;
  title: string;
  rightText?: string;
  rightSubtext?: string;
}

export function FUISectionHeader({ badge, title, rightText, rightSubtext }: FUISectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8 border-b pb-2" style={{ borderColor: `${COLORS.primary}30` }}>
      <div>
        {badge && (
          <span
            className="text-[9px] tracking-wide px-1.5 py-0.5 uppercase"
            style={{ color: COLORS.primary, backgroundColor: `${COLORS.primary}10`, border: `1px solid ${COLORS.primary}30` }}
          >
            {badge}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mt-2">{title}</h2>
      </div>
      {rightText && (
        <div className="hidden md:block text-right text-[10px] font-mono" style={{ color: COLORS.textMuted }}>
          <div>{rightText}</div>
          {rightSubtext && <div className="mt-1" style={{ color: COLORS.primary }}>{rightSubtext}</div>}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// FUI METRIC CARD
// =============================================================================

interface FUIMetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  variant?: 'primary' | 'secondary';
}

export function FUIMetricCard({ label, value, subtext, variant = 'primary' }: FUIMetricCardProps) {
  const colors = variant === 'primary'
    ? { label: COLORS.primary, border: `${COLORS.primary}10`, bg: `${COLORS.primary}05` }
    : { label: COLORS.secondary, border: `${COLORS.secondary}10`, bg: `${COLORS.secondary}05` };

  return (
    <div
      className="flex flex-col justify-between p-3 border"
      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
    >
      <span className="uppercase mb-1 text-[10px]" style={{ color: colors.label }}>{label}</span>
      <span className="text-white text-lg font-bold">{value}</span>
      {subtext && <span className="text-[10px]" style={{ color: COLORS.textMuted }}>{subtext}</span>}
    </div>
  );
}

// =============================================================================
// FUI FEATURE CARD
// =============================================================================

interface FUIFeatureCardProps {
  icon?: React.ReactNode;
  code: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
}

export function FUIFeatureCard({ icon, code, title, description, stats = [] }: FUIFeatureCardProps) {
  return (
    <FUIPane className="group h-full flex flex-col">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-px transition-colors"
        style={{ backgroundColor: `${COLORS.primary}40` }}
      />
      <div
        className="absolute top-0 left-0 w-px h-full transition-colors"
        style={{ backgroundColor: `${COLORS.primary}20` }}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div
          className="p-2 border rounded-sm"
          style={{ borderColor: `${COLORS.primary}30`, backgroundColor: `${COLORS.primary}05` }}
        >
          {icon || <span className="text-2xl" style={{ color: COLORS.primary }}>◆</span>}
        </div>
        <span
          className="text-[9px] font-bold border px-1.5 py-1"
          style={{ color: COLORS.primary, borderColor: `${COLORS.primary}30` }}
        >
          {code}
        </span>
      </div>

      {/* Content */}
      <h3
        className="text-sm font-bold uppercase text-white mb-2 tracking-wide transition-colors group-hover:text-[#FDE047]"
      >
        {title}
      </h3>
      <p className="text-[10px] mb-6 leading-relaxed flex-grow" style={{ color: COLORS.textMuted }}>
        {description}
      </p>

      {/* Stats footer */}
      {stats.length > 0 && (
        <div
          className="mt-auto border-t border-dashed pt-2 flex justify-between text-[10px] font-mono"
          style={{ borderColor: '#333', color: COLORS.secondary }}
        >
          {stats.map((stat, i) => (
            <span key={i}>{stat.label}: {stat.value}</span>
          ))}
        </div>
      )}
    </FUIPane>
  );
}

// =============================================================================
// FUI PRICING CARD
// =============================================================================

interface FUIPricingCardProps {
  tier: string;
  price: string | number;
  priceLabel?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  onCtaClick?: () => void;
}

export function FUIPricingCard({
  tier,
  price,
  priceLabel = '/ CYCLE',
  features,
  cta,
  highlighted = false,
  onCtaClick,
}: FUIPricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col p-4 transition-colors',
        highlighted && 'transform md:-translate-y-4 z-20'
      )}
      style={{
        border: highlighted ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.primaryDim}`,
        backgroundColor: COLORS.surface,
        boxShadow: highlighted ? `0 0 20px rgba(253, 224, 71, 0.15)` : undefined,
      }}
    >
      {/* Recommended badge */}
      {highlighted && (
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 text-[9px] font-bold uppercase tracking-wide"
          style={{
            backgroundColor: COLORS.primary,
            color: '#000',
            clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
          }}
        >
          RECOMMENDED_PROTOCOL
        </div>
      )}

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: COLORS.primary }} />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: COLORS.primary }} />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: COLORS.primary }} />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: COLORS.primary }} />

      {/* Tier name */}
      <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORS.primary }}>
        {tier}
      </h3>

      {/* Price */}
      <div className="flex items-baseline mt-2 mb-6">
        <span className="text-3xl font-bold text-white">
          {typeof price === 'number' ? `$${price}` : price}
        </span>
        {typeof price === 'number' && (
          <span className="text-[10px] ml-1" style={{ color: COLORS.textMuted }}>{priceLabel}</span>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ backgroundColor: `${COLORS.primary}20` }} />

      {/* Features */}
      <ul className="space-y-3 text-[10px] mb-6 flex-1" style={{ color: highlighted ? COLORS.textLight : COLORS.textMuted }}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span style={{ color: COLORS.primary }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <FUIButton
        variant={highlighted ? 'primary' : 'outline'}
        onClick={onCtaClick}
        className="w-full"
      >
        {cta}
      </FUIButton>
    </div>
  );
}

// =============================================================================
// FUI MARQUEE - Scrolling status text
// =============================================================================

interface FUIMarqueeProps {
  items: string[];
}

export function FUIMarquee({ items }: FUIMarqueeProps) {
  return (
    <div
      className="w-full border-y py-2 overflow-hidden whitespace-nowrap relative text-[10px]"
      style={{
        backgroundColor: COLORS.surface,
        borderColor: `${COLORS.primary}30`,
      }}
    >
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

      {/* Scrolling content */}
      <div
        className="flex gap-8 uppercase tracking-wide font-bold animate-marquee"
        style={{ color: `${COLORS.primary}70` }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span style={{ color: '#333' }}>//</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center gap-8">
            {item}
            <span style={{ color: '#333' }}>//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// FUI LOG VIEWER
// =============================================================================

interface FUILogEntry {
  time: string;
  type: 'INIT' | 'STATUS' | 'INFO' | 'WARNING' | 'ALERT' | 'ACTION' | 'DEPLOY';
  message: string;
}

interface FUILogViewerProps {
  title?: string;
  bufferStatus?: string;
  entries: FUILogEntry[];
  className?: string;
}

export function FUILogViewer({
  title = 'LIVE_LOGS // CRITICAL',
  bufferStatus = 'BUFFER: 95%',
  entries,
  className = '',
}: FUILogViewerProps) {
  const typeColors: Record<string, string> = {
    INIT: COLORS.primary,
    STATUS: COLORS.secondary,
    INFO: COLORS.textLight,
    WARNING: COLORS.primary,
    ALERT: COLORS.primary,
    ACTION: COLORS.secondary,
    DEPLOY: COLORS.primary,
  };

  return (
    <FUIPane className={cn('flex flex-col', className)}>
      {/* Header */}
      <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: `${COLORS.primary}20` }}>
        <span className="text-[10px] uppercase tracking-wide" style={{ color: COLORS.primary }}>{title}</span>
        <span className="text-[10px] animate-pulse" style={{ color: COLORS.textMuted }}>{bufferStatus}</span>
      </div>

      {/* Log entries */}
      <div className="flex-grow overflow-y-auto h-48 text-[10px]" style={{ color: COLORS.secondary }}>
        <pre className="whitespace-pre-wrap leading-relaxed">
          {entries.map((entry, i) => (
            <div key={i}>
              [{entry.time}] <span style={{ color: typeColors[entry.type] }}>{entry.type}</span>: {entry.message}
            </div>
          ))}
        </pre>
      </div>
    </FUIPane>
  );
}

// =============================================================================
// FUI DATA VIZ PANEL
// =============================================================================

interface FUIDataVizPanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: { left: string; right: string };
  className?: string;
}

export function FUIDataVizPanel({ title, subtitle, children, footer, className = '' }: FUIDataVizPanelProps) {
  return (
    <div
      className={cn('relative border p-3 flex flex-col', className)}
      style={{
        backgroundColor: COLORS.background,
        borderColor: `${COLORS.primary}10`,
        boxShadow: `inset 0 0 8px rgba(253, 224, 71, 0.05)`,
      }}
    >
      {/* Inner grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(253, 224, 71, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253, 224, 71, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-baseline mb-2 border-b pb-1 relative z-10" style={{ borderColor: `${COLORS.primary}10` }}>
        <span className="text-[10px] uppercase tracking-wide" style={{ color: COLORS.primary }}>{title}</span>
        {subtitle && <span className="text-[10px]" style={{ color: COLORS.secondary }}>{subtitle}</span>}
      </div>

      {/* Content */}
      <div className="flex-grow relative z-10">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="mt-auto border-t pt-1 flex justify-between text-[10px] relative z-10"
          style={{ borderColor: `${COLORS.primary}10`, color: COLORS.textMuted }}
        >
          <span>{footer.left}</span>
          <span>{footer.right}</span>
        </div>
      )}
    </div>
  );
}

// Re-export for backwards compatibility
export { FUIPane as FUIPanel };
