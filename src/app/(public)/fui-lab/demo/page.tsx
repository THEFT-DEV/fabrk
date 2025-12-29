 
/**
 * FUI Demo Landing Page
 * Architect Command Center style
 */

import { Metadata } from 'next';
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
  FUIDataVizPanel,
} from '../components/fui-components';

export const metadata: Metadata = {
  title: 'Architect Command Center | FUI Demo',
  description: 'Fantasy User Interface - Command Center style demo',
};

const navItems = [
  { label: 'TOPOLOGY', href: '#' },
  { label: 'LOGS_VIEW', href: '#' },
  { label: 'DIAGRAMS', href: '#' },
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
  { time: '00:00:09', type: 'DEPLOY' as const, message: "Protocol 'SHADOW_FALL' activated." },
  { time: '00:00:10', type: 'STATUS' as const, message: 'Core temperatures nominal.' },
];

const features = [
  {
    code: 'CMD-01',
    title: 'Advanced Telemetry',
    description: 'Real-time, multi-dimensional data capture and visualization. Integrated anomaly detection algorithms.',
    stats: [{ label: 'RATE', value: '99GB/s' }, { label: 'PING', value: '0.1ms' }],
  },
  {
    code: 'CMD-02',
    title: 'Threat Mitigation',
    description: 'Proactive security protocols. Automated packet rerouting and network segmentation.',
    stats: [{ label: 'THREATS', value: '0' }, { label: 'STATUS', value: 'SECURE' }],
  },
  {
    code: 'CMD-03',
    title: 'AI Optimization',
    description: 'Neural network driven resource allocation. Predictive load balancing for optimal performance.',
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
  'RENDER_ENGINE: SUB-MILLISEC_LATENCY',
  'GRID_ALIGNMENT: 100%_SYNCH',
];

export default function FUIDemoPage() {
  return (
    <div
      className="min-h-screen font-mono text-xs transition-colors relative overflow-x-hidden selection:bg-[#FDE047] selection:text-black"
      style={{
        backgroundColor: '#000000',
        color: '#B0B0B0',
        backgroundImage: `
          linear-gradient(rgba(253, 224, 71, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(253, 224, 71, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Status bar with top/bottom lines */}
      <FUIStatusBar
        status="SYS.STATUS: ONLINE // INTERFACE: LIVE"
        location="LOC: 45.912, -12.004 // UTC: 13:37:42"
        build="ARCHITECT_NODE // BUILD: 4.0.0"
      />

      {/* Navigation */}
      <div className="pt-10">
        <FUINav
          logoText="ARCHITECT_CORE"
          version="V4.0.0"
          items={navItems}
          ctaLabel="SECURE_LOGIN"
          className="max-w-[calc(100%-2rem)] mx-auto"
        />
      </div>

      {/* Main content */}
      <main className="relative w-full max-w-[calc(100%-2rem)] mx-auto px-4 pt-4 pb-16 z-10 grid grid-cols-12 gap-4">
        {/* Hero section */}
        <FUIPane className="col-span-12 lg:col-span-8 p-6 pb-2">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 text-[9px] border px-2 py-0.5 uppercase tracking-wide mb-4"
            style={{ color: '#FDE047', borderColor: 'rgba(253, 224, 71, 0.3)', backgroundColor: 'rgba(253, 224, 71, 0.05)' }}
          >
            <span className="w-1 h-1" style={{ backgroundColor: '#FDE047' }} />
            SYS.ARCHITECT_MODE_ACTIVE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight text-white mb-2">
                INITIATE <br />
                <span className="relative inline-block" style={{ color: '#FDE047' }}>
                  STRATEGIC
                  <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 0 H100 V1 H0 Z" fill="#FDE047" opacity="0.5" />
                    <rect x="0" y="5" width="15" height="1" fill="#FDE047" />
                    <rect x="25" y="5" width="4" height="1" fill="#FDE047" />
                    <rect x="35" y="5" width="40" height="1" fill="#FDE047" />
                  </svg>
                </span> <br />
                OPERATIONS
              </h1>
              <p
                className="text-[10px] max-w-md leading-relaxed pl-2 mt-4 border-l"
                style={{ color: '#606060', borderColor: 'rgba(0, 191, 255, 0.5)' }}
              >
                High-level system oversight and real-time command execution. Monitor, analyze, and deploy critical protocols across the distributed network. Access granular data streams and manage core infrastructure.
              </p>
            </div>

            {/* Right HUD display */}
            <div className="relative h-48 flex items-center justify-center">
              {/* Outer spinning ring */}
              <div
                className="absolute w-36 h-36 md:w-48 md:h-48 border rounded-full animate-spin flex items-center justify-center"
                style={{ borderColor: 'rgba(253, 224, 71, 0.2)', animationDuration: '12s' }}
              >
                <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l" style={{ borderColor: '#FDE047' }} />
                <div className="absolute -top-px -right-px w-1.5 h-1.5 border-t border-r" style={{ borderColor: '#FDE047' }} />
                <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-b border-l" style={{ borderColor: '#FDE047' }} />
                <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r" style={{ borderColor: '#FDE047' }} />
              </div>

              {/* Inner dashed ring */}
              <div
                className="absolute w-24 h-24 border border-dashed rounded-full"
                style={{ borderColor: 'rgba(253, 224, 71, 0.3)', animation: 'spin 15s linear infinite reverse' }}
              />

              {/* Center core */}
              <div
                className="absolute w-16 h-16 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(253, 224, 71, 0.1)',
                  borderColor: '#FDE047',
                  boxShadow: '0 0 10px rgba(253, 224, 71, 0.3)',
                }}
              >
                <span className="text-[9px] font-bold animate-pulse" style={{ color: '#FDE047' }}>CORE_A</span>
              </div>

              {/* Data readouts */}
              <div
                className="absolute top-0 right-0 border p-1 text-[9px] backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(0, 191, 255, 0.4)', color: '#00BFFF' }}
              >
                <div className="flex justify-between gap-2 border-b mb-0.5 pb-0.5" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <span>CPU_LOAD</span>
                  <span>98%</span>
                </div>
                <div className="h-0.5 w-16 rounded-full overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="h-full w-[98%]" style={{ backgroundColor: '#00BFFF' }} />
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 border p-1 text-[9px] backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(0, 191, 255, 0.4)', color: '#00BFFF' }}
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
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t mt-4" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <FUIButton variant="outline">EXEC_DEPLOY</FUIButton>
            <FUIButton variant="secondary">
              VIEW_DASH <span className="ml-1">→</span>
            </FUIButton>
          </div>
        </FUIPane>

        {/* Log viewer */}
        <div className="col-span-12 lg:col-span-4">
          <FUILogViewer entries={logEntries} />
        </div>

        {/* Metrics grid */}
        <FUIPane className="col-span-12 lg:col-span-8 h-48 flex flex-col">
          <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <span className="text-[10px] uppercase tracking-wide" style={{ color: '#00BFFF' }}>SYSTEM_OVERVIEW // CORE_METRICS</span>
            <span className="text-[10px]" style={{ color: '#606060' }}>UPDATE_CYCLE: 1s</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            <FUIMetricCard label="CPU_UTIL" value="42%" subtext="AVG: 38%" />
            <FUIMetricCard label="RAM_USAGE" value="12.8GB" subtext="TOTAL: 64GB" />
            <FUIMetricCard label="DISK_IO" value="220MB/s" subtext="PEAK: 450MB/s" />
            <FUIMetricCard label="UPTIME" value="234D 04H" subtext="REBOOT: N/A" />
            <FUIMetricCard label="TEMP_CORE" value="45°C" subtext="MAX: 60°C" variant="secondary" />
            <FUIMetricCard label="ERROR_LOG" value="0 WARN" subtext="CRIT: 0" variant="secondary" />
            <FUIMetricCard label="PWR_DRAW" value="1.21GW" subtext="SUPPLY: OPTIMAL" />
            <FUIMetricCard label="THREAT_LVL" value="LOW" subtext="LAST_SCAN: 0s" variant="secondary" />
          </div>
        </FUIPane>

        {/* Connections panel */}
        <FUIPane className="col-span-12 lg:col-span-4 h-48 flex flex-col">
          <div className="flex justify-between items-baseline mb-2 border-b pb-1" style={{ borderColor: 'rgba(253, 224, 71, 0.2)' }}>
            <span className="text-[10px] uppercase tracking-wide" style={{ color: '#FDE047' }}>ACTIVE_CONNECTIONS // SECURE_PORT</span>
            <span className="text-[10px]" style={{ color: '#00BFFF' }}>TOTAL: 12</span>
          </div>
          <div className="flex-grow overflow-y-auto text-[10px] leading-tight">
            {[
              { name: 'NODE_001', ip: '192.168.1.100', status: 'CONN', statusColor: '#22c55e' },
              { name: 'API_GATEWAY', ip: '10.0.0.5', status: 'CONN', statusColor: '#22c55e' },
              { name: 'CLOUD_LINK', ip: '203.0.113.12', status: 'SYNC', statusColor: '#eab308' },
              { name: 'DB_CLUSTER_A', ip: '172.16.0.2', status: 'CONN', statusColor: '#22c55e' },
              { name: 'LOG_SERVER', ip: '10.0.0.10', status: 'CONN', statusColor: '#22c55e' },
              { name: 'REMOTE_AUX_3', ip: '198.51.100.25', status: 'PEND', statusColor: '#eab308' },
              { name: 'LOCAL_PROXY', ip: '127.0.0.1', status: 'CONN', statusColor: '#22c55e' },
            ].map((conn, i) => (
              <div key={i} className="flex justify-between items-center py-1 border-b" style={{ borderColor: '#1a1a1a' }}>
                <span className="text-white">{conn.name}</span>
                <span style={{ color: '#00BFFF' }}>{conn.ip}</span>
                <span style={{ color: conn.statusColor }}>{conn.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto border-t pt-1 flex justify-between text-[10px]" style={{ borderColor: 'rgba(253, 224, 71, 0.1)', color: '#606060' }}>
            <span>SEC_LVL: 5</span>
            <span>UPLINK: Q-1</span>
          </div>
        </FUIPane>
      </main>

      {/* Marquee ticker */}
      <FUIMarquee items={marqueeItems} />

      {/* Features section */}
      <section className="max-w-[calc(100%-2rem)] mx-auto px-4 py-16">
        <FUISectionHeader
          badge="ACTIVE_MODULES"
          title="Core System Architecture"
          rightText="ARCHITECT_SEC_01 // TYPE: HYPER-V"
          rightSubtext="STATUS: OPTIMAL"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FUIFeatureCard
              key={i}
              code={feature.code}
              title={feature.title}
              description={feature.description}
              stats={feature.stats}
            />
          ))}
        </div>
      </section>

      {/* Pricing section */}
      <section className="max-w-[calc(100%-2rem)] mx-auto px-4 py-16 relative overflow-hidden">
        {/* Background lines */}
        <div className="absolute top-0 left-1/4 w-px h-full" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }} />
        <div className="absolute top-0 left-3/4 w-px h-full" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }} />
        <div className="absolute top-1/2 left-0 w-full h-px" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }} />

        <div className="text-center mb-12 relative z-10">
          <span
            className="text-[9px] font-bold tracking-wide border px-2 py-0.5 uppercase"
            style={{ color: '#FDE047', borderColor: 'rgba(253, 224, 71, 0.3)', backgroundColor: 'rgba(253, 224, 71, 0.05)' }}
          >
            ACCESS_LEVELS
          </span>
          <h2 className="text-3xl font-bold uppercase text-white mt-4 tracking-wider">Acquire Protocols</h2>
          <div className="w-20 h-px mx-auto mt-2" style={{ backgroundColor: '#FDE047' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto relative z-10">
          {pricingPlans.map((plan, i) => (
            <FUIPricingCard
              key={i}
              tier={plan.tier}
              price={plan.price}
              features={plan.features}
              cta={plan.cta}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t pt-12 pb-6 text-[10px] relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(253, 224, 71, 0.3)' }}
      >
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FDE047] to-transparent opacity-30" />
        <div className="absolute top-0 right-8 w-px h-16" style={{ backgroundColor: 'rgba(253, 224, 71, 0.3)' }} />

        <div className="max-w-[calc(100%-2rem)] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 border flex items-center justify-center"
                style={{ borderColor: '#FDE047', backgroundColor: 'rgba(253, 224, 71, 0.1)' }}
              >
                <span className="font-bold text-base" style={{ color: '#FDE047' }}>A</span>
              </div>
              <span className="text-base font-bold tracking-wider text-white uppercase">
                ARCHITECT<span style={{ color: '#FDE047' }}>_CORE</span>
              </span>
            </div>
            <p className="uppercase max-w-sm leading-relaxed tracking-tight" style={{ color: '#606060' }}>
              Empowering chief system architects with unparalleled control and visibility over complex digital ecosystems.
              <span className="block mt-1" style={{ color: 'rgba(253, 224, 71, 0.7)' }}>ID: A-991-001 // SECTOR_ALPHA</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-bold uppercase mb-4 border-b inline-block pb-1 pr-6"
              style={{ color: '#FDE047', borderColor: 'rgba(253, 224, 71, 0.3)' }}
            >
              CORE_SYSTEMS
            </h4>
            <ul className="space-y-2 uppercase tracking-tight" style={{ color: '#606060' }}>
              {['Documentation', 'API_Reference', 'System_Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FDE047] transition-colors flex items-center gap-1.5">
                    <span className="w-0.5 h-0.5" style={{ backgroundColor: '#FDE047' }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold uppercase mb-4 border-b inline-block pb-1 pr-6"
              style={{ color: '#FDE047', borderColor: 'rgba(253, 224, 71, 0.3)' }}
            >
              NETWORK_OPS
            </h4>
            <ul className="space-y-2 uppercase tracking-tight" style={{ color: '#606060' }}>
              {['Network_Map', 'Data_Flows', 'Incident_Log'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FDE047] transition-colors flex items-center gap-1.5">
                    <span className="w-0.5 h-0.5" style={{ backgroundColor: '#FDE047' }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="max-w-[calc(100%-2rem)] mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center border-t pt-4"
          style={{ borderColor: 'rgba(253, 224, 71, 0.1)', color: '#444' }}
        >
          <div>© 2084 ARCHITECT_CORE. All rights reserved. // DATA_INTEGRITY: HIGH</div>
          <div className="flex gap-4 mt-2 md:mt-0 font-mono" style={{ color: 'rgba(253, 224, 71, 0.6)' }}>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-success rounded-full" />
              SYS_READY
            </span>
            <span>[ OK ]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
