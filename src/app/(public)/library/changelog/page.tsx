/**
 * FABRK TEMPLATE
 * Changelog - Terminal console style version history
 * Production-ready
 */

'use client';

import { TemplateShowcasePage } from '@/components/library';
import { ChangelogPreview } from './components';

const templateCode = `/**
 * Changelog Page
 * Version history and release notes - Terminal style
 */

import { Metadata } from "next";
import { Rss } from "lucide-react";
import { CHANGELOG } from "@/data/changelog";
import { Badge } from "@/components/ui/card";
import { ChangelogEntry } from "@/components/changelog";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export const metadata: Metadata = {
  title: "Changelog | Your App",
  description: "Version history and release notes.",
  alternates: {
    types: {
      "application/rss+xml": "/changelog/rss",
    },
  },
};

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-border mb-12 border-b pb-8">
        <div className="mb-4">
          <Badge code="0x00" label="CHANGELOG" meta="VERSION HISTORY" />
        </div>
        <h1 className={cn("mb-2 text-lg font-bold", mode.font)}>
          VERSION HISTORY
        </h1>
        <p className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
          Track every update, improvement, and fix. All changes are documented here.
        </p>
        <a
          href="/changelog/rss"
          className={cn(
            "text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs transition-colors",
            mode.font
          )}
          title="Subscribe to RSS feed"
        >
          <Rss className="h-3 w-3" />
          [RSS FEED]
        </a>
      </div>

      {/* Changelog Entries */}
      <div className="space-y-12">
        {CHANGELOG.map((entry, index) => (
          <section key={entry.version} className="scroll-mt-20">
            <h2
              id={\`v\${entry.version}\`}
              className={cn("mb-4 text-sm font-semibold", mode.font)}
            >
              v{entry.version} - {entry.title}
            </h2>
            <ChangelogEntry entry={entry} index={index} />
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="border-border mt-16 border-t pt-8">
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          [EOF] - End of changelog
        </p>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA FILE: src/data/changelog.ts
// ═══════════════════════════════════════════════════════════════════════════

export type ChangeType = "added" | "changed" | "fixed" | "removed" | "security" | "deprecated";

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  url?: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
}

// Import dynamic counts
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from "@/data/landing/stats";

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2025-12-15",
    title: "INITIAL_RELEASE",
    changes: [
      { type: "added", description: \`\${COMPONENT_COUNT_STRING} production-ready UI components\` },
      { type: "added", description: \`\${THEME_COUNT_STRING} terminal color themes\` },
      { type: "added", description: "Multi-provider payments" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// RSS FEED: app/changelog/rss/route.ts
// ═══════════════════════════════════════════════════════════════════════════

import { CHANGELOG } from "@/data/changelog";
import { env } from "@/lib/env";

const SITE_URL = env.client.NEXT_PUBLIC_SITE_URL || "https://example.com";
const SITE_NAME = "Your App";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateRssFeed(): string {
  const items = CHANGELOG.map((entry) => \`
    <item>
      <title>v\${escapeXml(entry.version)} - \${escapeXml(entry.title)}</title>
      <link>\${SITE_URL}/changelog#v\${entry.version}</link>
      <guid isPermaLink="false">changelog-\${entry.version}</guid>
      <pubDate>\${new Date(entry.date).toUTCString()}</pubDate>
      <description><![CDATA[
        <ul>
          \${entry.changes.map((c) =>
            \`<li><strong>[\${c.type.toUpperCase()}]</strong> \${escapeXml(c.description)}</li>\`
          ).join("")}
        </ul>
      ]]></description>
    </item>
  \`).join("");

  return \`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>\${escapeXml(SITE_NAME)} Changelog</title>
    <link>\${SITE_URL}/changelog</link>
    <description>Version history and release notes.</description>
    <language>en-us</language>
    \${items}
  </channel>
</rss>\`;
}

export async function GET() {
  return new Response(generateRssFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}`;

export default function ChangelogTemplate() {
  return (
    <TemplateShowcasePage
      badge="CHANGELOG"
      title="Changelog"
      description="Terminal-styled version history with RSS feed support"
      templateId="changelog"
      category={{ name: 'Marketing', href: '/library/marketing' }}
      preview={<ChangelogPreview />}
      code={templateCode}
      fileStructure="app/changelog/page.tsx + app/changelog/rss/route.ts + src/data/changelog.ts"
      features={[
        'Terminal-styled release cards',
        'Change type categorization (Added, Changed, Fixed, Removed, Security, Deprecated)',
        'RSS feed for subscribers',
        'GitHub release link integration',
        'Auto-sync script from GitHub releases',
        'SEO-optimized with metadata',
        'Compact mode for sidebars/widgets',
      ]}
    />
  );
}
