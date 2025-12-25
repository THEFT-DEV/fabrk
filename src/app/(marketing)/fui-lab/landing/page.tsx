 
/**
 * Landing V3 - Sci-Fi FUI Design (SYSTEM OVERLOAD style)
 * Dark navy + cyan + pink aesthetic with dense data panels
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  COMPONENT_COUNT_STRING,
  TEMPLATE_COUNT_STRING,
  THEME_COUNT_STRING,
} from '@/data/landing/stats';
import { PRICING } from '@/data/landing';

// ============================================================================
// COLOR SCHEME - Matching reference image
// ============================================================================
const C = {
  bg: '#0a0a14',
  bgLight: '#0d1020',
  bgPanel: '#0c0c18',
  primary: '#00D4FF', // Cyan
  accent: '#FF0080', // Pink/Magenta
  text: '#8090A0',
  textLight: '#C0D0E0',
  textDim: '#405060',
  border: '#1a2a3a',
  borderLight: '#203040',
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function Panel({
  children,
  label,
  className = '',
  rightLabel,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
  rightLabel?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: C.bgPanel, border: `1px solid ${C.border}` }}
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: C.primary }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: C.primary }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: C.primary }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: C.primary }} />

      {/* Labels */}
      {label && (
        <div className="absolute -top-2 left-3 px-1 text-[8px] tracking-widest" style={{ backgroundColor: C.bg, color: C.textDim }}>
          {label}
        </div>
      )}
      {rightLabel && (
        <div className="absolute -top-2 right-3 px-1 text-[8px] tracking-widest" style={{ backgroundColor: C.bg, color: C.primary }}>
          {rightLabel}
        </div>
      )}
      {children}
    </div>
  );
}

function StatusDot({ status = 'online' }: { status?: 'online' | 'error' | 'warning' }) {
  const colors = { online: '#00FF88', error: C.accent, warning: '#FFAA00' };
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[status] }} />
    </span>
  );
}

function DataRow({ label, value, status }: { label: string; value: string; status?: 'online' | 'error' }) {
  return (
    <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: C.border }}>
      <span className="text-[9px] uppercase tracking-wider" style={{ color: C.textDim }}>{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[9px]" style={{ color: status === 'error' ? C.accent : C.textLight }}>{value}</span>
        {status && <StatusDot status={status} />}
      </span>
    </div>
  );
}

function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="h-1 w-full" style={{ backgroundColor: C.border }}>
      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: C.primary }} />
    </div>
  );
}

function NavTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className="px-3 py-1.5 text-[9px] uppercase tracking-wider cursor-pointer transition-colors"
      style={{
        backgroundColor: active ? `${C.primary}15` : 'transparent',
        color: active ? C.primary : C.textDim,
        borderBottom: active ? `1px solid ${C.primary}` : '1px solid transparent',
      }}
    >
      {label}
    </div>
  );
}

function MiniGrid() {
  // Fixed pattern instead of random to avoid hydration mismatch
  const activeIndices = [1, 2, 3, 5, 9, 10, 13, 14];
  return (
    <div className="grid grid-cols-4 gap-0.5">
      {Array(16).fill(null).map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 border"
          style={{
            borderColor: C.border,
            backgroundColor: activeIndices.includes(i) ? `${C.primary}20` : 'transparent',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function LandingV3Page() {
  const [systemTime, setSystemTime] = useState('00:00:00');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
      setFrame((f) => f + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen font-mono text-[10px] relative overflow-hidden"
      style={{
        backgroundColor: C.bg,
        color: C.text,
      }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${C.primary}08 1px, transparent 1px),
            linear-gradient(90deg, ${C.primary}08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ================================================================== */}
      {/* TOP NAVIGATION BAR */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 w-full z-50 border-b" style={{ backgroundColor: C.bg, borderColor: C.border }}>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="text-[9px]" style={{ color: C.textDim }}>SYS_</span>
            <span className="text-xs" style={{ color: C.primary }}>/DIAGNOSTICS {'>'} SYSTEM</span>
          </div>
          <div className="flex items-center gap-2 text-[8px]" style={{ color: C.textDim }}>
            <span>94_</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-t overflow-x-auto" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-1 px-4">
            <Panel className="px-2 py-1">
              <span className="text-[9px]" style={{ color: C.textDim }}>CS-101</span>
              <span className="ml-2 text-[9px] font-bold" style={{ color: C.textLight }}>SRW</span>
            </Panel>
          </div>
          <div className="flex items-center ml-auto">
            {['EVL', 'FM', 'DEL', 'BIOS', 'COMMUNICATIONS', 'NAVIGATION', 'ACCELERATOR'].map((tab, i) => (
              <NavTab key={tab} label={tab} active={tab === 'NAVIGATION'} />
            ))}
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* TOP ROW - Status Panels */}
          <div className="grid grid-cols-12 gap-3 mb-4">
            {/* Left Status Panel */}
            <div className="col-span-3 space-y-2">
              <Panel label="REF.LIM" className="p-2">
                <div className="text-[8px] mb-1" style={{ color: C.textDim }}>LOG INIT</div>
                <div className="text-[8px]" style={{ color: C.textLight }}>ENTER /DIAG Y/N?</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[8px]" style={{ color: C.textDim }}>ENTER</span>
                  <span className="text-[8px]" style={{ color: C.textLight }}>/ACCEL_INIT</span>
                  <span className="text-[8px] ml-auto" style={{ color: C.primary }}>DEC8.093</span>
                </div>
                <ProgressBar value={75} />
              </Panel>

              <Panel label="REF.LIM" className="p-2">
                <div className="text-[8px]" style={{ color: C.textDim }}>LOG INIT</div>
                <div className="text-[8px]" style={{ color: C.textLight }}>ENTER /DIAG Y/N?</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[8px]">
                    <span style={{ color: C.textDim }}>ENTER</span>
                    <span style={{ color: C.primary }}>DEC8.093</span>
                  </div>
                  <ProgressBar value={60} />
                </div>
              </Panel>
            </div>

            {/* Center - Main Display Area */}
            <div className="col-span-6">
              <Panel label="BAND_RNGS" rightLabel="REC.06" className="p-0">
                <div className="p-2 border-b" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-4">
                    <span className="text-[8px]" style={{ color: C.textDim }}>REC PROC</span>
                    <span className="text-[9px]" style={{ color: C.textLight }}>ORB.5.IN</span>
                    <StatusDot status="online" />
                    <span className="text-[8px]" style={{ color: C.primary }}>ONLINE</span>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-4">
                  <span className="text-[8px]" style={{ color: C.textDim }}>TERMINAL</span>
                  <span className="text-[9px]" style={{ color: C.textLight }}>/STREAM.DAT</span>
                  <div className="flex-1 flex items-center gap-1">
                    {Array(20).fill(null).map((_, i) => (
                      <div key={i} className="w-1 h-1" style={{ backgroundColor: i < 15 ? C.primary : C.border }} />
                    ))}
                  </div>
                  <span className="text-[8px]" style={{ color: C.textDim }}>N.38</span>
                </div>

                <div className="px-3 py-1 border-t" style={{ borderColor: C.border }}>
                  <span className="text-[8px]" style={{ color: C.textDim }}>/SYSTEMS</span>
                </div>
              </Panel>
            </div>

            {/* Right - Mini Displays */}
            <div className="col-span-3 space-y-2">
              <Panel label="REF.LIM" className="p-2">
                <div className="flex items-center justify-between text-[8px] mb-2">
                  <span style={{ color: C.textDim }}>MOD_MOD.</span>
                </div>
                <MiniGrid />
              </Panel>

              <Panel label="NAV.RANGE" className="p-2">
                <div className="flex justify-between text-[8px]">
                  <span style={{ color: C.textDim }}>VAL.RANGE</span>
                  <span style={{ color: C.primary }}>193.7</span>
                </div>
                <div className="flex justify-between text-[8px]">
                  <span style={{ color: C.textDim }}>INS</span>
                  <span style={{ color: C.textLight }}>199.2</span>
                </div>
              </Panel>
            </div>
          </div>

          {/* ================================================================== */}
          {/* MAIN HERO - SYSTEM OVERLOAD */}
          {/* ================================================================== */}
          <Panel className="p-0 mb-4">
            <div className="p-6 text-center" style={{ backgroundColor: `${C.primary}05` }}>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-4"
                style={{ color: C.primary, textShadow: `0 0 30px ${C.primary}40` }}
              >
                {'<'}SYSTEM OVERLOAD{'>'}
              </h1>
              <ProgressBar value={85} />
            </div>
          </Panel>

          {/* ================================================================== */}
          {/* MIDDLE ROW - Data Panels */}
          {/* ================================================================== */}
          <div className="grid grid-cols-12 gap-3 mb-4">
            {/* Left Column */}
            <div className="col-span-3 space-y-3">
              <Panel label="TX.PROC" className="p-2">
                <DataRow label="NAV.5.OUT" value="<ERROR>" status="error" />
                <DataRow label="NAV.7.OUT" value="<ERROR>" status="error" />
                <div className="mt-2 flex items-center gap-2 text-[8px]">
                  <span style={{ color: C.textDim }}>TX FREQ</span>
                  <span style={{ color: C.accent }}>249.5</span>
                </div>
              </Panel>

              <Panel label="NAV.RANGE" className="p-2">
                <div className="grid grid-cols-3 gap-2">
                  {['2.890', '3.1M', '1.2M'].map((val, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[10px]" style={{ color: C.primary }}>{val}</div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel label="SYS SIMULATION" className="p-2">
                <div className="text-[8px] mb-2" style={{ color: C.textDim }}>PNL 2-6</div>
                <div className="text-lg" style={{ color: C.textLight }}>最近的消息</div>
              </Panel>
            </div>

            {/* Center - Product Info */}
            <div className="col-span-6">
              <Panel label="FABRK.SYS" rightLabel="PRODUCT_DATA" className="p-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left - Main CTA */}
                  <div className="space-y-4">
                    <div className="text-[9px] uppercase tracking-widest" style={{ color: C.textDim }}>
                      SAAS BOILERPLATE // NEXT.JS 16
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: C.primary }}>
                      BUILD IN<br />MINUTES
                    </h2>
                    <p className="text-[10px] leading-relaxed" style={{ color: C.text }}>
                      Ship your product this weekend, not next quarter. Production-ready infrastructure.
                    </p>

                    <div className="space-y-1">
                      <DataRow label="COMPONENTS" value={COMPONENT_COUNT_STRING} status="online" />
                      <DataRow label="TEMPLATES" value={TEMPLATE_COUNT_STRING} status="online" />
                      <DataRow label="THEMES" value={THEME_COUNT_STRING} status="online" />
                      <DataRow label="SETUP TIME" value="<5 MIN" status="online" />
                    </div>

                    <Link
                      href="/api/polar/checkout"
                      className="block w-full py-3 text-center text-[10px] uppercase tracking-wider border"
                      style={{
                        borderColor: C.primary,
                        color: C.primary,
                        backgroundColor: `${C.primary}10`,
                      }}
                    >
                      {'>'} GET FABRK — {PRICING.display.current}
                    </Link>
                  </div>

                  {/* Right - Pricing */}
                  <div className="space-y-4">
                    <Panel label="LAUNCH_OFFER" className="p-3">
                      <div className="text-center">
                        <div className="text-[8px] uppercase mb-2" style={{ color: C.accent }}>LIMITED TIME</div>
                        <div className="text-3xl font-bold" style={{ color: C.primary }}>{PRICING.display.current}</div>
                        <div className="text-lg line-through" style={{ color: C.textDim }}>{PRICING.display.regular}</div>
                        <div className="text-[8px] uppercase mt-2" style={{ color: C.textDim }}>ONE-TIME PAYMENT</div>
                      </div>
                    </Panel>

                    <Panel label="FEATURES.DAT" className="p-2">
                      <div className="space-y-1 text-[8px]">
                        {['AUTH + BILLING', 'AI CREDITS', 'MULTI-TENANT', 'LIFETIME UPDATES'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span style={{ color: C.primary }}>//</span>
                            <span style={{ color: C.textLight }}>{f}</span>
                            <StatusDot status="online" />
                          </div>
                        ))}
                      </div>
                    </Panel>
                  </div>
                </div>
              </Panel>
            </div>

            {/* Right Column */}
            <div className="col-span-3 space-y-3">
              <Panel label="FILTER FILE RE" className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px]" style={{ color: C.textDim }}>SHOW</span>
                  <div className="px-2 py-0.5 border text-[8px]" style={{ borderColor: C.primary, color: C.primary }}>
                    FILE
                  </div>
                </div>
                <div className="text-[8px]" style={{ color: C.textDim }}>/STREAM.DAT</div>
                <div className="flex justify-between text-[8px] mt-1">
                  <span style={{ color: C.textDim }}>STR.STAT</span>
                  <span style={{ color: C.primary }}>BUFFERING</span>
                </div>
              </Panel>

              <Panel label="/TRANS.DAT" className="p-2">
                <div className="flex justify-between text-[8px]">
                  <span style={{ color: C.textDim }}>TX.STAT</span>
                  <span className="px-1" style={{ backgroundColor: C.accent, color: C.bg }}>SCANNING</span>
                </div>
                <div className="mt-2 text-[8px]" style={{ color: C.textDim }}>DATA STREAM</div>
                <ProgressBar value={45} />
              </Panel>

              <Panel label="/REC.DAT" className="p-2">
                <div className="flex justify-between text-[8px] mb-2">
                  <span style={{ color: C.textDim }}>REC.STAT</span>
                  <span style={{ color: C.primary }}>OK</span>
                </div>
                <div className="text-[8px]" style={{ color: C.textDim }}>DATA STREAM</div>
                <div className="h-8 mt-1" style={{ backgroundColor: C.border }}>
                  {/* Waveform placeholder */}
                  <div className="h-full flex items-center justify-center">
                    <span className="text-[7px]" style={{ color: C.textDim }}>[ WAVEFORM ]</span>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          {/* ================================================================== */}
          {/* BOTTOM ROW - SIM Panels + Controls */}
          {/* ================================================================== */}
          <div className="grid grid-cols-12 gap-3">
            {/* Left - Command Input */}
            <div className="col-span-3">
              <Panel label="P08 CONTROL" className="p-2">
                <div className="text-[8px] space-y-1" style={{ color: C.textDim }}>
                  <div>COM1</div>
                  <div>LOG_INIT</div>
                  <div>ACTIVE...</div>
                  <div>ENTER /DIAG Y/N?</div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[8px]" style={{ color: C.textDim }}>ENTER</span>
                  <span className="text-[8px]" style={{ color: C.textLight }}>/FORCE_REBOOT</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="px-2 py-1 border text-[8px]" style={{ borderColor: C.primary, color: C.primary }}>
                    BOOT
                  </div>
                  <div className="px-2 py-1 border text-[8px]" style={{ borderColor: C.border, color: C.textDim }}>
                    NAV
                  </div>
                </div>
              </Panel>
            </div>

            {/* Center - SIM Outputs */}
            <div className="col-span-6 grid grid-cols-2 gap-3">
              <Panel label="SIM A" className="p-2">
                <div className="text-[8px] mb-2" style={{ color: C.textDim }}>TX FREQ</div>
                <div className="text-xl font-bold" style={{ color: C.primary }}>SIMA.OUTPUT</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[8px]" style={{ color: C.accent }}>{'<ERROR>'}</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {Array(8).fill(null).map((_, i) => (
                    <div key={i} className="h-2" style={{ backgroundColor: i < 5 ? C.primary : C.border }} />
                  ))}
                </div>
              </Panel>

              <Panel label="SIM B" className="p-2">
                <div className="text-[8px] mb-2" style={{ color: C.textDim }}>REC PROC</div>
                <div className="text-xl font-bold" style={{ color: C.primary }}>SIMB.OUTPUT</div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusDot status="online" />
                  <span className="text-[8px]" style={{ color: C.textLight }}>ONLINE</span>
                </div>
                <ProgressBar value={70} />
              </Panel>
            </div>

            {/* Right - Action Buttons */}
            <div className="col-span-3">
              <Panel label="FILTER FILE RE" className="p-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[8px]" style={{ color: C.textDim }}>SHOW</span>
                  <div className="px-2 py-0.5 border text-[8px]" style={{ borderColor: C.primary, color: C.primary }}>
                    FILE
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['SHEPARD DIAG', 'HELIOS COMM', 'M:ECK', 'R:ECK'].map((btn, i) => (
                    <div
                      key={btn}
                      className="px-2 py-1.5 border text-center text-[8px] cursor-pointer hover:bg-white/5"
                      style={{ borderColor: i === 1 ? C.primary : C.border, color: i === 1 ? C.primary : C.textDim }}
                    >
                      {btn}
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          {/* ================================================================== */}
          {/* SIDE LABELS - Japanese Characters */}
          {/* ================================================================== */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 text-lg writing-vertical hidden lg:block" style={{ color: C.textDim, writingMode: 'vertical-rl' }}>
            最近的消息
          </div>
          <div className="fixed left-4 top-1/2 -translate-y-1/2 space-y-4 hidden lg:block">
            <div className="text-[8px]" style={{ color: C.textDim }}>TUN_</div>
            <div className="text-[8px]" style={{ color: C.textDim }}>HLP_</div>
            <div className="text-[8px]" style={{ color: C.textDim }}>EQ_</div>
          </div>

        </div>
      </main>

      {/* ================================================================== */}
      {/* BOTTOM STATUS BAR */}
      {/* ================================================================== */}
      <footer className="fixed bottom-0 left-0 w-full border-t px-4 py-2 flex items-center justify-between" style={{ backgroundColor: C.bg, borderColor: C.border }}>
        <div className="flex items-center gap-4">
          <span className="text-[8px]" style={{ color: C.textDim }}>HELIOS_</span>
          <span className="text-[8px]" style={{ color: C.textDim }}>87_</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px]" style={{ color: C.textDim }}>SYS/$STARTUP_$FORCE_REBOOT</span>
          <span className="text-[8px]" style={{ color: C.primary }}>/FILTER</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold" style={{ color: C.textLight }}>SRW</span>
          <span className="text-[8px]" style={{ color: C.textDim }}>*86</span>
        </div>
      </footer>

      {/* Selection style */}
      <style>{`
        ::selection { background: ${C.primary}; color: ${C.bg}; }
        .writing-vertical { writing-mode: vertical-rl; }
      `}</style>
    </div>
  );
}
