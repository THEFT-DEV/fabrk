#!/usr/bin/env node

/**
 * Changelog Sync Script
 *
 * Syncs changelog data from GitHub releases to src/data/changelog.ts
 * Run: npm run sync:changelog
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CHANGELOG_PATH = path.join(ROOT, 'src/data/changelog.ts');
const REPO = 'THEFT-DEV/fabrk';

/**
 * Parse GitHub release body into changelog entries
 */
function parseReleaseBody(body) {
  const changes = [];
  const lines = body.split('\n');

  let currentType = 'added';

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect section headers
    if (/^#+\s*added/i.test(trimmed)) {
      currentType = 'added';
      continue;
    }
    if (/^#+\s*changed/i.test(trimmed)) {
      currentType = 'changed';
      continue;
    }
    if (/^#+\s*fixed/i.test(trimmed)) {
      currentType = 'fixed';
      continue;
    }
    if (/^#+\s*removed/i.test(trimmed)) {
      currentType = 'removed';
      continue;
    }
    if (/^#+\s*security/i.test(trimmed)) {
      currentType = 'security';
      continue;
    }
    if (/^#+\s*deprecated/i.test(trimmed)) {
      currentType = 'deprecated';
      continue;
    }

    // Parse list items
    const match = trimmed.match(/^[-*]\s+(.+)$/);
    if (match) {
      changes.push({
        type: currentType,
        description: match[1].trim(),
      });
    }
  }

  return changes;
}

/**
 * Fetch releases from GitHub
 */
function fetchReleases() {
  try {
    // Get list of releases
    const listOutput = execSync(
      `gh release list --repo ${REPO} --limit 50 --json tagName,name,publishedAt`,
      { encoding: 'utf-8' }
    );
    const releases = JSON.parse(listOutput);

    // Fetch body for each release
    return releases.map((release) => {
      try {
        const viewOutput = execSync(
          `gh release view ${release.tagName} --repo ${REPO} --json body`,
          { encoding: 'utf-8' }
        );
        const { body } = JSON.parse(viewOutput);
        return { ...release, body };
      } catch {
        return { ...release, body: '' };
      }
    });
  } catch (error) {
    console.log('No releases found or gh CLI not authenticated');
    return [];
  }
}

/**
 * Generate changelog.ts content
 */
function generateChangelog(releases) {
  const entries = releases.map((release) => {
    const version = release.tagName.replace(/^v/, '');
    const date = release.publishedAt.split('T')[0];
    const title = release.name || `v${version}`;
    const changes = parseReleaseBody(release.body || '');

    return {
      version,
      date,
      title: title.replace(/^v?\d+\.\d+\.\d+\s*[-–—]?\s*/i, '').toUpperCase().replace(/\s+/g, '_') || 'RELEASE',
      changes:
        changes.length > 0
          ? changes
          : [{ type: 'added', description: 'Release updates' }],
    };
  });

  // Sort by version (newest first)
  entries.sort((a, b) => {
    const [aMajor, aMinor, aPatch] = a.version.split('.').map(Number);
    const [bMajor, bMinor, bPatch] = b.version.split('.').map(Number);
    if (bMajor !== aMajor) return bMajor - aMajor;
    if (bMinor !== aMinor) return bMinor - aMinor;
    return bPatch - aPatch;
  });

  const now = new Date().toISOString();

  return `/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: ${now}
 *
 * Run \`npm run sync:changelog\` to update
 */

export type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'security' | 'deprecated';

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

export const CHANGELOG: ChangelogEntry[] = ${JSON.stringify(entries, null, 2)
    .replace(/"type": "added"/g, "type: 'added'")
    .replace(/"type": "changed"/g, "type: 'changed'")
    .replace(/"type": "fixed"/g, "type: 'fixed'")
    .replace(/"type": "removed"/g, "type: 'removed'")
    .replace(/"type": "security"/g, "type: 'security'")
    .replace(/"type": "deprecated"/g, "type: 'deprecated'")
    .replace(/"version"/g, 'version')
    .replace(/"date"/g, 'date')
    .replace(/"title"/g, 'title')
    .replace(/"changes"/g, 'changes')
    .replace(/"description"/g, 'description')};

export function getChangelogByType(type?: ChangeType): ChangelogEntry[] {
  if (!type) return CHANGELOG;
  return CHANGELOG.map((entry) => ({
    ...entry,
    changes: entry.changes.filter((c) => c.type === type),
  })).filter((entry) => entry.changes.length > 0);
}

export function getLatestVersion(): string {
  return CHANGELOG[0]?.version ?? '0.0.0';
}
`;
}

/**
 * Main
 */
async function main() {
  console.log('📝 Syncing changelog from GitHub releases...\n');

  const releases = fetchReleases();

  if (releases.length === 0) {
    console.log('No releases found. Keeping existing changelog.');
    console.log(`\nTo create a release:\n  gh release create v1.0.0 --repo ${REPO} --title "v1.0.0" --notes "Release notes..."\n`);
    return;
  }

  console.log(`Found ${releases.length} release(s):\n`);
  releases.forEach((r) => {
    console.log(`  - ${r.tagName}: ${r.name || '(no title)'}`);
  });

  const content = generateChangelog(releases);
  fs.writeFileSync(CHANGELOG_PATH, content);

  console.log(`\n✅ Updated ${CHANGELOG_PATH}`);
}

main().catch(console.error);
