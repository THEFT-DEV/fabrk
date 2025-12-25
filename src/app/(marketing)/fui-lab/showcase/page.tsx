 
'use client';

import { useState } from 'react';
import {
  FUINav,
  FUIStatusBar,
  FUIPane,
  FUIButton,
  FUISectionHeader,
  FUIMetricCard,
  FUIFeatureCard,
  FUIPricingCard,
  FUIMarquee,
  FUILogViewer,
} from '../components/fui-components';

// Color palettes
const PALETTES = [
  { id: 'architect', name: 'Architect', primary: '#FDE047', secondary: '#00BFFF', bg: '#000000' },
  { id: 'blade-runner', name: 'Blade Runner', primary: '#FF0050', secondary: '#00BFFF', bg: '#0a0008' },
  { id: 'alien', name: 'Alien', primary: '#00FF41', secondary: '#00FF41', bg: '#020502' },
  { id: 'oblivion', name: 'Oblivion', primary: '#00FFFF', secondary: '#FFFFFF', bg: '#080810' },
  { id: 'iron-man', name: 'Iron Man', primary: '#FF6B35', secondary: '#00D4FF', bg: '#0a0502' },
  { id: 'tron', name: 'Tron', primary: '#00D4FF', secondary: '#FF6B00', bg: '#000508' },
  { id: 'matrix', name: 'Matrix', primary: '#00FF00', secondary: '#003300', bg: '#000200' },
  { id: 'cyberpunk', name: 'Cyberpunk', primary: '#FF00FF', secondary: '#00FFFF', bg: '#0a000a' },
];

const logEntries = [
  { time: '00:00:01', type: 'INIT' as const, message: 'System boot sequence complete.' },
  { time: '00:00:02', type: 'STATUS' as const, message: 'Network topology scan initiated.' },
  { time: '00:00:03', type: 'INFO' as const, message: 'Data stream integrity check [OK].' },
  { time: '00:00:04', type: 'WARNING' as const, message: "Node 'GAMMA-7' reports high latency." },
  { time: '00:00:05', type: 'ACTION' as const, message: "Redirecting traffic from 'GAMMA-7'." },
  { time: '00:00:06', type: 'ALERT' as const, message: 'Unknown packet detected on port 2200.' },
  { time: '00:00:07', type: 'STATUS' as const, message: 'Automated firewall engaged.' },
  { time: '00:00:08', type: 'INFO' as const, message: 'Packet trace initiated. Source: [REDACTED].' },
];

const features = [
  {
    code: 'MOD-01',
    title: 'Advanced Telemetry',
    description: 'Real-time, multi-dimensional data capture and visualization with anomaly detection.',
    stats: [{ label: 'RATE', value: '99GB/s' }, { label: 'PING', value: '0.1ms' }],
  },
  {
    code: 'MOD-02',
    title: 'Threat Mitigation',
    description: 'Proactive security protocols with automated packet rerouting and network segmentation.',
    stats: [{ label: 'THREATS', value: '0' }, { label: 'STATUS', value: 'SECURE' }],
  },
  {
    code: 'MOD-03',
    title: 'AI Optimization',
    description: 'Neural network driven resource allocation with predictive load balancing.',
    stats: [{ label: 'OPTIMIZED', value: '99%' }, { label: 'EFFICIENCY', value: 'A+' }],
  },
];

const pricingPlans = [
  {
    tier: 'Operator_Tier',
    price: 'Free',
    features: ['Basic Node Access', 'Telemetry Stream (L1)', '5GB Data Log'],
    cta: 'Request_Access',
    highlighted: false,
  },
  {
    tier: 'Architect_Tier',
    price: 99,
    features: ['Multi-Node Access', 'Advanced Telemetry (L3)', '500GB Data Log', 'Priority Uplink'],
    cta: 'ACTIVATE_PROTOCOL',
    highlighted: true,
  },
  {
    tier: 'Chief_Tier',
    price: 499,
    features: ['Global Network Control', 'Neural Analysis Engine', 'Unlimited Data Log', '24/7 Priority Support'],
    cta: 'CONTACT_HQ',
    highlighted: false,
  },
];

const marqueeItems = [
  'SCANNING_NETWORK_GRID...',
  'ACCESS_PROTOCOL_ENGAGED',
  'BUFFER_ALLOC: 2048PB',
  'ENCRYPTION: QUANTUM-SECURE_V4',
  'NODE_STATUS: ALL_GREEN',
  'PROTOCOL: ARCHITECT_MESH/V4',
];

export default function StyleShowcasePage() {
  const [palette, setPalette] = useState(PALETTES[0]);

  const PRIMARY = palette.primary;
  const SECONDARY = palette.secondary;
  const BG = palette.bg;
  const SURFACE = palette.id === 'architect' ? '#0A0A0A' : `color-mix(in oklch, ${BG} 90%, ${PRIMARY} 10%)`;

  return (
    <div
      className="min-h-screen font-mono text-xs relative overflow-x-hidden"
      style={{
        backgroundColor: BG,
        color: '#B0B0B0',
        backgroundImage: `
          linear-gradient(${PRIMARY}08 1px, transparent 1px),
          linear-gradient(90deg, ${PRIMARY}08 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Dynamic selection color */}
      <style>{`::selection { background: ${PRIMARY}; color: ${BG}; }`}</style>

      {/* Status bar */}
      <div className="fixed top-0 left-0 w-full h-px z-50" style={{ backgroundColor: PRIMARY }} />
      <div
        className="fixed top-px left-0 w-full flex justify-between px-4 py-1 text-[9px] uppercase z-40 border-b backdrop-blur-sm"
        style={{
          color: PRIMARY,
          backgroundColor: `${BG}ee`,
          borderColor: `${PRIMARY}33`,
        }}
      >
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: PRIMARY }} />
          SYS.STATUS: ONLINE // SHOWCASE_MODE
        </span>
        <span className="hidden sm:inline">PALETTE: {palette.name.toUpperCase()}</span>
        <span>FUI_SHOWCASE // V4.0.0</span>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-px z-50" style={{ backgroundColor: PRIMARY }} />

      {/* Palette selector */}
      <div
        className="sticky top-6 z-[100] mx-auto max-w-[calc(100%-2rem)] mt-8 mb-4 p-3 border backdrop-blur-md"
        style={{
          backgroundColor: `${SURFACE}ee`,
          borderColor: `${PRIMARY}40`,
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="px-2 py-0.5 text-[10px] font-black uppercase tracking-tight"
              style={{ backgroundColor: PRIMARY, color: BG }}
            >
              FUI SHOWCASE
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: PRIMARY, boxShadow: `0 0 8px ${PRIMARY}` }} />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[9px] uppercase tracking-wide" style={{ color: `${PRIMARY}99` }}>
              PALETTE:
            </label>
            <select
              value={palette.id}
              onChange={(e) => setPalette(PALETTES.find(p => p.id === e.target.value) || PALETTES[0])}
              className="border text-[10px] p-1.5 outline-none font-bold uppercase cursor-pointer"
              style={{
                backgroundColor: BG,
                borderColor: `${PRIMARY}60`,
                color: PRIMARY,
              }}
            >
              {PALETTES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Palette preview swatches */}
        <div className="flex gap-2 mt-2 pt-2 border-t" style={{ borderColor: `${PRIMARY}20` }}>
          {PALETTES.map(p => (
            <button
              key={p.id}
              onClick={() => setPalette(p)}
              className="w-6 h-6 border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: p.bg,
                borderColor: palette.id === p.id ? p.primary : `${p.primary}40`,
                boxShadow: palette.id === p.id ? `0 0 8px ${p.primary}` : 'none',
              }}
              title={p.name}
            >
              <div className="w-full h-1/2" style={{ backgroundColor: p.primary }} />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative w-full max-w-[calc(100%-2rem)] mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div
            className="w-8 h-8 border flex items-center justify-center relative transition-colors"
            style={{ borderColor: PRIMARY, backgroundColor: `${PRIMARY}0a` }}
          >
            <span className="font-bold text-lg" style={{ color: PRIMARY }}>A</span>
            <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l" style={{ borderColor: PRIMARY }} />
            <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r" style={{ borderColor: PRIMARY }} />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold tracking-wider text-white uppercase leading-none">
              ARCHITECT_CORE
            </div>
            <div className="text-[9px] tracking-wide uppercase" style={{ color: PRIMARY }}>
              COMMAND_CENTER // V4.0.0
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[10px] tracking-wide uppercase font-bold" style={{ color: '#606060' }}>
          {['TOPOLOGY', 'LOGS_VIEW', 'DIAGRAMS'].map(item => (
            <a
              key={item}
              href="#"
              className="relative group transition-colors hover:text-white"
              onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#606060')}
            >
              {item}
            </a>
          ))}
          <button
            className="px-4 py-1.5 border uppercase font-bold text-[10px] tracking-wide transition-colors"
            style={{
              borderColor: PRIMARY,
              color: PRIMARY,
              clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
            }}
          >
            SECURE_LOGIN
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative w-full max-w-[calc(100%-2rem)] mx-auto px-4 pt-4 pb-16 z-10 grid grid-cols-12 gap-4">
        {/* Hero section */}
        <div
          className="col-span-12 lg:col-span-8 relative border p-6 pb-2"
          style={{
            borderColor: `${PRIMARY}33`,
            backgroundColor: SURFACE,
            boxShadow: `0 0 10px ${SECONDARY}0a, inset 0 0 5px ${SECONDARY}05`,
          }}
        >
          {/* Corner brackets */}
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 text-[9px] border px-2 py-0.5 uppercase tracking-wide mb-4"
            style={{ color: PRIMARY, borderColor: `${PRIMARY}4d`, backgroundColor: `${PRIMARY}0a` }}
          >
            <span className="w-1 h-1" style={{ backgroundColor: PRIMARY }} />
            SYS.ARCHITECT_MODE_ACTIVE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight text-white mb-2">
                INITIATE <br />
                <span className="relative inline-block" style={{ color: PRIMARY }}>
                  STRATEGIC
                  <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 0 H100 V1 H0 Z" fill={PRIMARY} opacity="0.5" />
                    <rect x="0" y="5" width="15" height="1" fill={PRIMARY} />
                    <rect x="25" y="5" width="4" height="1" fill={PRIMARY} />
                    <rect x="35" y="5" width="40" height="1" fill={PRIMARY} />
                  </svg>
                </span> <br />
                OPERATIONS
              </h1>
              <p className="text-[10px] max-w-md leading-relaxed pl-2 mt-4 border-l" style={{ color: '#606060', borderColor: `${SECONDARY}80` }}>
                High-level system oversight and real-time command execution. Monitor, analyze, and deploy critical protocols across the distributed network.
              </p>
            </div>

            {/* HUD display */}
            <div className="relative h-48 flex items-center justify-center">
              <div
                className="absolute w-36 h-36 md:w-48 md:h-48 border rounded-full animate-spin flex items-center justify-center"
                style={{ borderColor: `${PRIMARY}33`, animationDuration: '12s' }}
              >
                <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l" style={{ borderColor: PRIMARY }} />
                <div className="absolute -top-px -right-px w-1.5 h-1.5 border-t border-r" style={{ borderColor: PRIMARY }} />
                <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-b border-l" style={{ borderColor: PRIMARY }} />
                <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r" style={{ borderColor: PRIMARY }} />
              </div>

              <div
                className="absolute w-24 h-24 border border-dashed rounded-full"
                style={{ borderColor: `${PRIMARY}4d`, animation: 'spin 15s linear infinite reverse' }}
              />

              <div
                className="absolute w-16 h-16 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: `${PRIMARY}1a`,
                  borderColor: PRIMARY,
                  boxShadow: `0 0 10px ${PRIMARY}4d`,
                }}
              >
                <span className="text-[9px] font-bold animate-pulse" style={{ color: PRIMARY }}>CORE_A</span>
              </div>

              {/* Data readouts */}
              <div
                className="absolute top-0 right-0 border p-1 text-[9px] backdrop-blur-sm"
                style={{ backgroundColor: `${BG}cc`, borderColor: `${SECONDARY}66`, color: SECONDARY }}
              >
                <div className="flex justify-between gap-2 border-b mb-0.5 pb-0.5" style={{ borderColor: `${SECONDARY}33` }}>
                  <span>CPU_LOAD</span>
                  <span>98%</span>
                </div>
                <div className="h-0.5 w-16 rounded-full overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="h-full w-[98%]" style={{ backgroundColor: SECONDARY }} />
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 border p-1 text-[9px] backdrop-blur-sm"
                style={{ backgroundColor: `${BG}cc`, borderColor: `${SECONDARY}66`, color: SECONDARY }}
              >
                <div className="flex justify-between gap-2 mb-0.5">
                  <span>NET_IO</span>
                  <span>ACTIVE</span>
                </div>
                <div className="text-white">TX: 889 Mb/s</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t mt-4" style={{ borderColor: `${SECONDARY}33` }}>
            <button
              className="px-6 py-2 font-mono text-[10px] tracking-wide uppercase font-bold transition-colors border"
              style={{
                borderColor: PRIMARY,
                color: PRIMARY,
                clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
              }}
            >
              EXEC_DEPLOY
            </button>
            <button
              className="px-6 py-2 font-mono text-[10px] tracking-wide uppercase font-bold transition-colors"
              style={{
                backgroundColor: `${SECONDARY}1a`,
                color: '#000',
                clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
              }}
            >
              VIEW_DASH →
            </button>
          </div>
        </div>

        {/* Log viewer */}
        <div
          className="col-span-12 lg:col-span-4 relative border p-4 flex flex-col"
          style={{
            borderColor: `${PRIMARY}33`,
            backgroundColor: SURFACE,
            boxShadow: `0 0 10px ${SECONDARY}0a, inset 0 0 5px ${SECONDARY}05`,
          }}
        >
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

          <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: `${PRIMARY}33` }}>
            <span className="text-[10px] uppercase tracking-wide" style={{ color: PRIMARY }}>LIVE_LOGS // CRITICAL</span>
            <span className="text-[10px] animate-pulse" style={{ color: '#606060' }}>BUFFER: 95%</span>
          </div>

          <div className="flex-grow overflow-y-auto h-48 text-[10px]" style={{ color: SECONDARY }}>
            <pre className="whitespace-pre-wrap leading-relaxed">
              {logEntries.map((entry, i) => (
                <div key={i}>
                  [{entry.time}] <span style={{ color: entry.type === 'STATUS' || entry.type === 'ACTION' ? SECONDARY : PRIMARY }}>{entry.type}</span>: {entry.message}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Metrics grid */}
        <div
          className="col-span-12 lg:col-span-8 h-48 relative border p-4 flex flex-col"
          style={{
            borderColor: `${PRIMARY}33`,
            backgroundColor: SURFACE,
          }}
        >
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

          <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: `${SECONDARY}33` }}>
            <span className="text-[10px] uppercase tracking-wide" style={{ color: SECONDARY }}>SYSTEM_OVERVIEW // CORE_METRICS</span>
            <span className="text-[10px]" style={{ color: '#606060' }}>UPDATE_CYCLE: 1s</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            {[
              { label: 'CPU_UTIL', value: '42%', sub: 'AVG: 38%', variant: 'primary' },
              { label: 'RAM_USAGE', value: '12.8GB', sub: 'TOTAL: 64GB', variant: 'primary' },
              { label: 'DISK_IO', value: '220MB/s', sub: 'PEAK: 450MB/s', variant: 'primary' },
              { label: 'UPTIME', value: '234D 04H', sub: 'REBOOT: N/A', variant: 'primary' },
              { label: 'TEMP_CORE', value: '45°C', sub: 'MAX: 60°C', variant: 'secondary' },
              { label: 'ERROR_LOG', value: '0 WARN', sub: 'CRIT: 0', variant: 'secondary' },
              { label: 'PWR_DRAW', value: '1.21GW', sub: 'SUPPLY: OPTIMAL', variant: 'primary' },
              { label: 'THREAT_LVL', value: 'LOW', sub: 'LAST_SCAN: 0s', variant: 'secondary' },
            ].map((m, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-3 border"
                style={{
                  borderColor: m.variant === 'primary' ? `${PRIMARY}1a` : `${SECONDARY}1a`,
                  backgroundColor: m.variant === 'primary' ? `${PRIMARY}08` : `${SECONDARY}08`,
                }}
              >
                <span className="uppercase mb-1 text-[10px]" style={{ color: m.variant === 'primary' ? PRIMARY : SECONDARY }}>{m.label}</span>
                <span className="text-white text-lg font-bold">{m.value}</span>
                <span className="text-[10px]" style={{ color: '#606060' }}>{m.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connections panel */}
        <div
          className="col-span-12 lg:col-span-4 h-48 relative border p-4 flex flex-col"
          style={{
            borderColor: `${PRIMARY}33`,
            backgroundColor: SURFACE,
          }}
        >
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

          <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: `${PRIMARY}33` }}>
            <span className="text-[10px] uppercase tracking-wide" style={{ color: PRIMARY }}>ACTIVE_CONNECTIONS</span>
            <span className="text-[10px]" style={{ color: SECONDARY }}>TOTAL: 7</span>
          </div>
          <div className="flex-grow overflow-y-auto text-[10px] leading-tight">
            {[
              { name: 'NODE_001', ip: '192.168.1.100', status: 'CONN', ok: true },
              { name: 'API_GATEWAY', ip: '10.0.0.5', status: 'CONN', ok: true },
              { name: 'CLOUD_LINK', ip: '203.0.113.12', status: 'SYNC', ok: false },
              { name: 'DB_CLUSTER_A', ip: '172.16.0.2', status: 'CONN', ok: true },
              { name: 'LOG_SERVER', ip: '10.0.0.10', status: 'CONN', ok: true },
              { name: 'REMOTE_AUX_3', ip: '198.51.100.25', status: 'PEND', ok: false },
              { name: 'LOCAL_PROXY', ip: '127.0.0.1', status: 'CONN', ok: true },
            ].map((conn, i) => (
              <div key={i} className="flex justify-between items-center py-1 border-b" style={{ borderColor: '#1a1a1a' }}>
                <span className="text-white">{conn.name}</span>
                <span style={{ color: SECONDARY }}>{conn.ip}</span>
                <span style={{ color: conn.ok ? '#22c55e' : '#eab308' }}>{conn.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Marquee */}
      <div
        className="w-full border-y py-2 overflow-hidden whitespace-nowrap relative text-[10px]"
        style={{ backgroundColor: SURFACE, borderColor: `${PRIMARY}4d` }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10" style={{ background: `linear-gradient(to right, ${SURFACE}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10" style={{ background: `linear-gradient(to left, ${SURFACE}, transparent)` }} />
        <div className="flex gap-8 uppercase tracking-wide font-bold animate-marquee" style={{ color: `${PRIMARY}b3` }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <span style={{ color: '#333' }}>//</span>
            </span>
          ))}
        </div>
      </div>

      {/* Features section */}
      <section className="max-w-[calc(100%-2rem)] mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8 border-b pb-2" style={{ borderColor: `${PRIMARY}4d` }}>
          <div>
            <span
              className="text-[9px] tracking-wide px-1.5 py-0.5 uppercase"
              style={{ color: PRIMARY, backgroundColor: `${PRIMARY}1a`, border: `1px solid ${PRIMARY}4d` }}
            >
              ACTIVE_MODULES
            </span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mt-2">Core System Architecture</h2>
          </div>
          <div className="hidden md:block text-right text-[10px] font-mono" style={{ color: '#606060' }}>
            <div>ARCHITECT_SEC_01 // TYPE: HYPER-V</div>
            <div className="mt-1" style={{ color: PRIMARY }}>STATUS: OPTIMAL</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative border p-4 flex flex-col group hover:border-opacity-60 transition-colors"
              style={{
                borderColor: `${PRIMARY}33`,
                backgroundColor: SURFACE,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: `${PRIMARY}66` }} />
              <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: `${PRIMARY}33` }} />
              <div className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
              <div className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
              <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border rounded-sm" style={{ borderColor: `${PRIMARY}4d`, backgroundColor: `${PRIMARY}08` }}>
                  <span className="text-2xl" style={{ color: PRIMARY }}>◆</span>
                </div>
                <span className="text-[9px] font-bold border px-1.5 py-1" style={{ color: PRIMARY, borderColor: `${PRIMARY}4d` }}>
                  {feature.code}
                </span>
              </div>

              <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wide group-hover:text-opacity-100 transition-colors" style={{ color: 'white' }}>
                {feature.title}
              </h3>
              <p className="text-[10px] mb-6 leading-relaxed flex-grow" style={{ color: '#606060' }}>
                {feature.description}
              </p>

              <div className="mt-auto border-t border-dashed pt-2 flex justify-between text-[10px] font-mono" style={{ borderColor: '#333', color: SECONDARY }}>
                {feature.stats.map((stat, j) => (
                  <span key={j}>{stat.label}: {stat.value}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing section */}
      <section className="max-w-[calc(100%-2rem)] mx-auto px-4 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full" style={{ backgroundColor: `${SECONDARY}1a` }} />
        <div className="absolute top-0 left-3/4 w-px h-full" style={{ backgroundColor: `${SECONDARY}1a` }} />
        <div className="absolute top-1/2 left-0 w-full h-px" style={{ backgroundColor: `${SECONDARY}1a` }} />

        <div className="text-center mb-12 relative z-10">
          <span
            className="text-[9px] font-bold tracking-wide border px-2 py-0.5 uppercase"
            style={{ color: PRIMARY, borderColor: `${PRIMARY}4d`, backgroundColor: `${PRIMARY}08` }}
          >
            ACCESS_LEVELS
          </span>
          <h2 className="text-3xl font-bold uppercase text-white mt-4 tracking-wider">Acquire Protocols</h2>
          <div className="w-20 h-px mx-auto mt-2" style={{ backgroundColor: PRIMARY }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto relative z-10">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-4 transition-colors ${plan.highlighted ? 'transform md:-translate-y-4 z-20' : ''}`}
              style={{
                border: plan.highlighted ? `2px solid ${PRIMARY}` : `1px solid ${PRIMARY}33`,
                backgroundColor: SURFACE,
                boxShadow: plan.highlighted ? `0 0 20px ${PRIMARY}26` : undefined,
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: PRIMARY,
                    color: BG,
                    clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
                  }}
                >
                  RECOMMENDED_PROTOCOL
                </div>
              )}

              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: PRIMARY }} />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: PRIMARY }} />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: PRIMARY }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: PRIMARY }} />

              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: PRIMARY }}>{plan.tier}</h3>

              <div className="flex items-baseline mt-2 mb-6">
                <span className="text-3xl font-bold text-white">
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                {typeof plan.price === 'number' && (
                  <span className="text-[10px] ml-1" style={{ color: '#606060' }}>/ CYCLE</span>
                )}
              </div>

              <div className="w-full h-px mb-4" style={{ backgroundColor: `${PRIMARY}33` }} />

              <ul className="space-y-3 text-[10px] mb-6 flex-1" style={{ color: plan.highlighted ? '#B0B0B0' : '#606060' }}>
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span style={{ color: PRIMARY }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full px-6 py-2 font-mono text-[10px] tracking-wide uppercase font-bold transition-colors"
                style={{
                  backgroundColor: plan.highlighted ? PRIMARY : 'transparent',
                  color: plan.highlighted ? BG : PRIMARY,
                  border: plan.highlighted ? 'none' : `1px solid ${PRIMARY}`,
                  clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-12 pb-6 text-[10px] relative overflow-hidden" style={{ backgroundColor: SURFACE, borderColor: `${PRIMARY}4d` }}>
        <div className="absolute bottom-0 left-0 w-full h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${PRIMARY}, transparent)` }} />

        <div className="max-w-[calc(100%-2rem)] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 border flex items-center justify-center" style={{ borderColor: PRIMARY, backgroundColor: `${PRIMARY}1a` }}>
                <span className="font-bold text-base" style={{ color: PRIMARY }}>A</span>
              </div>
              <span className="text-base font-bold tracking-wider text-white uppercase">
                ARCHITECT<span style={{ color: PRIMARY }}>_CORE</span>
              </span>
            </div>
            <p className="uppercase max-w-sm leading-relaxed tracking-tight" style={{ color: '#606060' }}>
              Empowering chief system architects with unparalleled control and visibility.
              <span className="block mt-1" style={{ color: `${PRIMARY}b3` }}>ID: A-991-001 // SECTOR_ALPHA</span>
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase mb-4 border-b inline-block pb-1 pr-6" style={{ color: PRIMARY, borderColor: `${PRIMARY}4d` }}>
              CORE_SYSTEMS
            </h4>
            <ul className="space-y-2 uppercase tracking-tight" style={{ color: '#606060' }}>
              {['Documentation', 'API_Reference', 'System_Status'].map(item => (
                <li key={item}>
                  <a href="#" className="transition-colors flex items-center gap-1.5 hover:text-white">
                    <span className="w-0.5 h-0.5" style={{ backgroundColor: PRIMARY }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase mb-4 border-b inline-block pb-1 pr-6" style={{ color: PRIMARY, borderColor: `${PRIMARY}4d` }}>
              NETWORK_OPS
            </h4>
            <ul className="space-y-2 uppercase tracking-tight" style={{ color: '#606060' }}>
              {['Network_Map', 'Data_Flows', 'Incident_Log'].map(item => (
                <li key={item}>
                  <a href="#" className="transition-colors flex items-center gap-1.5 hover:text-white">
                    <span className="w-0.5 h-0.5" style={{ backgroundColor: PRIMARY }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="max-w-[calc(100%-2rem)] mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center border-t pt-4"
          style={{ borderColor: `${PRIMARY}1a`, color: '#444' }}
        >
          <div>© 2084 ARCHITECT_CORE. All rights reserved. // DATA_INTEGRITY: HIGH</div>
          <div className="flex gap-4 mt-2 md:mt-0 font-mono" style={{ color: `${PRIMARY}99` }}>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              SYS_READY
            </span>
            <span>[ OK ]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
