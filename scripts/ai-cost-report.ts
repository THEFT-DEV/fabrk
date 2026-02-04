#!/usr/bin/env npx tsx
/**
 * AI Cost Report CLI
 *
 * Generates cost analysis reports for AI API usage.
 *
 * Usage:
 *   npm run ai:cost-report                # Today's costs
 *   npm run ai:cost-report --days=7       # Last 7 days
 *   npm run ai:cost-report --json         # Output as JSON
 *   npm run ai:cost-report --budget=50    # Check against budget
 */

import { PrismaClient } from '@/generated/prisma/client';

interface CostEvent {
  id: string;
  timestamp: Date;
  model: string;
  provider: string;
  feature: string;
  costUSD: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  success: boolean;
  durationMs: number;
}

interface CostSummary {
  totalCost: number;
  totalTokens: number;
  totalRequests: number;
  successRate: number;
  avgCostPerRequest: number;
  avgDuration: number;
  byModel: Record<string, { cost: number; requests: number; tokens: number }>;
  byFeature: Record<string, { cost: number; requests: number; tokens: number; avgCost: number }>;
  byDay: Record<string, { cost: number; requests: number }>;
}

// CLI Colors
const colors = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
};

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(4)}`;
}

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(2)}M`;
  }
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return tokens.toString();
}

async function fetchCostData(days: number): Promise<CostEvent[]> {
  const prisma = new PrismaClient();

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const events = await prisma.aICostEvent.findMany({
      where: {
        timestamp: {
          gte: startDate,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return events.map((e) => ({
      id: e.id,
      timestamp: e.timestamp,
      model: e.model,
      provider: e.provider,
      feature: e.feature,
      costUSD: e.costUSD,
      promptTokens: e.promptTokens,
      completionTokens: e.completionTokens,
      totalTokens: e.totalTokens,
      success: e.success,
      durationMs: e.durationMs,
    }));
  } finally {
    await prisma.$disconnect();
  }
}

function analyzeCosts(events: CostEvent[]): CostSummary {
  const byModel: Record<string, { cost: number; requests: number; tokens: number }> = {};
  const byFeature: Record<string, { cost: number; requests: number; tokens: number; avgCost: number }> = {};
  const byDay: Record<string, { cost: number; requests: number }> = {};

  let totalCost = 0;
  let totalTokens = 0;
  let totalDuration = 0;
  let successCount = 0;

  for (const event of events) {
    totalCost += event.costUSD;
    totalTokens += event.totalTokens;
    totalDuration += event.durationMs;
    if (event.success) successCount++;

    // By model
    if (!byModel[event.model]) {
      byModel[event.model] = { cost: 0, requests: 0, tokens: 0 };
    }
    byModel[event.model].cost += event.costUSD;
    byModel[event.model].requests += 1;
    byModel[event.model].tokens += event.totalTokens;

    // By feature
    if (!byFeature[event.feature]) {
      byFeature[event.feature] = { cost: 0, requests: 0, tokens: 0, avgCost: 0 };
    }
    byFeature[event.feature].cost += event.costUSD;
    byFeature[event.feature].requests += 1;
    byFeature[event.feature].tokens += event.totalTokens;

    // By day
    const day = event.timestamp.toISOString().split('T')[0];
    if (!byDay[day]) {
      byDay[day] = { cost: 0, requests: 0 };
    }
    byDay[day].cost += event.costUSD;
    byDay[day].requests += 1;
  }

  // Calculate averages for features
  for (const feature of Object.keys(byFeature)) {
    byFeature[feature].avgCost = byFeature[feature].cost / byFeature[feature].requests;
  }

  return {
    totalCost,
    totalTokens,
    totalRequests: events.length,
    successRate: events.length > 0 ? successCount / events.length : 1,
    avgCostPerRequest: events.length > 0 ? totalCost / events.length : 0,
    avgDuration: events.length > 0 ? totalDuration / events.length : 0,
    byModel,
    byFeature,
    byDay,
  };
}

function printReport(summary: CostSummary, days: number, budget?: number): void {
  console.log(colors.bold(`\n📊 AI Cost Report (Last ${days} day${days > 1 ? 's' : ''})\n`));
  console.log(colors.bold('─────────────────────────────────────'));

  // Overview
  console.log(colors.bold('\n📈 Overview\n'));
  console.log(`  Total Cost:        ${colors.cyan(formatCurrency(summary.totalCost))}`);
  console.log(`  Total Requests:    ${summary.totalRequests}`);
  console.log(`  Total Tokens:      ${formatTokens(summary.totalTokens)}`);
  console.log(`  Success Rate:      ${(summary.successRate * 100).toFixed(1)}%`);
  console.log(`  Avg Cost/Request:  ${formatCurrency(summary.avgCostPerRequest)}`);
  console.log(`  Avg Duration:      ${summary.avgDuration.toFixed(0)}ms`);

  // Budget check
  if (budget !== undefined) {
    const dailyBudget = budget;
    const avgDailyCost = summary.totalCost / days;
    const percentUsed = (avgDailyCost / dailyBudget) * 100;

    console.log(colors.bold('\n💰 Budget Status\n'));
    console.log(`  Daily Budget:      ${formatCurrency(dailyBudget)}`);
    console.log(`  Avg Daily Cost:    ${formatCurrency(avgDailyCost)}`);
    console.log(`  Budget Usage:      ${percentUsed.toFixed(1)}%`);

    if (percentUsed >= 100) {
      console.log(`  Status:            ${colors.red('OVER BUDGET')}`);
    } else if (percentUsed >= 80) {
      console.log(`  Status:            ${colors.yellow('APPROACHING LIMIT')}`);
    } else {
      console.log(`  Status:            ${colors.green('WITHIN BUDGET')}`);
    }
  }

  // By Model
  console.log(colors.bold('\n🤖 By Model\n'));
  const modelEntries = Object.entries(summary.byModel).sort(([, a], [, b]) => b.cost - a.cost);
  if (modelEntries.length === 0) {
    console.log(colors.gray('  No data available'));
  } else {
    console.log(`  ${'Model'.padEnd(35)} ${'Cost'.padStart(10)} ${'Requests'.padStart(10)} ${'Tokens'.padStart(10)}`);
    console.log(colors.gray('  ' + '─'.repeat(65)));
    for (const [model, data] of modelEntries) {
      const modelName = model.length > 33 ? model.substring(0, 30) + '...' : model;
      console.log(
        `  ${modelName.padEnd(35)} ${formatCurrency(data.cost).padStart(10)} ${data.requests.toString().padStart(10)} ${formatTokens(data.tokens).padStart(10)}`
      );
    }
  }

  // By Feature
  console.log(colors.bold('\n🎯 By Feature\n'));
  const featureEntries = Object.entries(summary.byFeature).sort(([, a], [, b]) => b.cost - a.cost);
  if (featureEntries.length === 0) {
    console.log(colors.gray('  No data available'));
  } else {
    console.log(`  ${'Feature'.padEnd(25)} ${'Cost'.padStart(10)} ${'Requests'.padStart(10)} ${'Avg'.padStart(10)}`);
    console.log(colors.gray('  ' + '─'.repeat(55)));
    for (const [feature, data] of featureEntries.slice(0, 10)) {
      const featureName = feature.length > 23 ? feature.substring(0, 20) + '...' : feature;
      console.log(
        `  ${featureName.padEnd(25)} ${formatCurrency(data.cost).padStart(10)} ${data.requests.toString().padStart(10)} ${formatCurrency(data.avgCost).padStart(10)}`
      );
    }
    if (featureEntries.length > 10) {
      console.log(colors.gray(`  ... and ${featureEntries.length - 10} more features`));
    }
  }

  // Daily Trend
  if (days > 1) {
    console.log(colors.bold('\n📅 Daily Trend\n'));
    const dayEntries = Object.entries(summary.byDay).sort(([a], [b]) => a.localeCompare(b));
    if (dayEntries.length === 0) {
      console.log(colors.gray('  No data available'));
    } else {
      console.log(`  ${'Date'.padEnd(12)} ${'Cost'.padStart(10)} ${'Requests'.padStart(10)}`);
      console.log(colors.gray('  ' + '─'.repeat(32)));
      for (const [day, data] of dayEntries) {
        console.log(
          `  ${day.padEnd(12)} ${formatCurrency(data.cost).padStart(10)} ${data.requests.toString().padStart(10)}`
        );
      }
    }
  }

  console.log('');
}

async function main() {
  const args = process.argv.slice(2);
  const help = args.includes('--help') || args.includes('-h');
  const json = args.includes('--json');

  // Parse days argument
  const daysArg = args.find((a) => a.startsWith('--days='));
  const days = daysArg ? parseInt(daysArg.split('=')[1], 10) : 1;

  // Parse budget argument
  const budgetArg = args.find((a) => a.startsWith('--budget='));
  const budget = budgetArg ? parseFloat(budgetArg.split('=')[1]) : undefined;

  if (help) {
    console.log(`
${colors.bold('AI Cost Report CLI')}

${colors.gray('Usage:')}
  npm run ai:cost-report                # Today's costs
  npm run ai:cost-report -- --days=7    # Last 7 days
  npm run ai:cost-report -- --json      # Output as JSON
  npm run ai:cost-report -- --budget=50 # Check against $50/day budget

${colors.gray('Options:')}
  --days=N    Number of days to include (default: 1)
  --budget=N  Daily budget to check against (dollars)
  --json      Output results as JSON
  --help, -h  Show this help message

${colors.gray('Examples:')}
  npm run ai:cost-report -- --days=30 --budget=100
  npm run ai:cost-report -- --json > report.json
`);
    process.exit(0);
  }

  try {
    const events = await fetchCostData(days);
    const summary = analyzeCosts(events);

    if (json) {
      console.log(JSON.stringify({ summary, events: events.length, days }, null, 2));
    } else {
      if (events.length === 0) {
        console.log(colors.yellow(`\n⚠ No cost data found for the last ${days} day(s)\n`));
        console.log(colors.gray('  Make sure AI cost tracking is enabled and the database is configured.\n'));
      } else {
        printReport(summary, days, budget);
      }
    }

    // Exit with error if over budget
    if (budget !== undefined) {
      const avgDailyCost = summary.totalCost / days;
      if (avgDailyCost > budget) {
        process.exit(1);
      }
    }
  } catch (error) {
    if (!json) {
      console.error(colors.red('\n✖ Failed to generate cost report\n'));
      if (error instanceof Error) {
        if (error.message.includes('prisma') || error.message.includes('database')) {
          console.log(colors.gray('  Database connection failed. Make sure:'));
          console.log(colors.gray('  1. DATABASE_URL is set in .env'));
          console.log(colors.gray('  2. The database is running'));
          console.log(colors.gray('  3. Migrations have been run (npm run db:push)\n'));
        } else {
          console.log(colors.gray(`  Error: ${error.message}\n`));
        }
      }
    }
    process.exit(1);
  }
}

main();
