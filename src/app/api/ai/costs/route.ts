/**
 * AI Cost Tracking API
 *
 * GET /api/ai/costs - Get cost summary and breakdown
 * Query params:
 *   - period: 'daily' | 'weekly' | 'monthly' (default: 'daily')
 *   - days: number of days to look back (default: 7)
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    const days = parseInt(searchParams.get('days') || '7', 10);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all events in date range
    const events = await prisma.aICostEvent.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    // Calculate today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEvents = events.filter((e) => e.timestamp >= today);

    const todayStats = {
      cost: todayEvents.reduce((sum, e) => sum + e.costUSD, 0),
      requests: todayEvents.length,
      successRate:
        todayEvents.length > 0
          ? todayEvents.filter((e) => e.success).length / todayEvents.length
          : 1,
      avgDuration:
        todayEvents.length > 0
          ? todayEvents.reduce((sum, e) => sum + e.durationMs, 0) / todayEvents.length
          : 0,
      tokens: todayEvents.reduce((sum, e) => sum + e.totalTokens, 0),
    };

    // Calculate period totals
    const periodStats = {
      cost: events.reduce((sum, e) => sum + e.costUSD, 0),
      requests: events.length,
      successRate:
        events.length > 0
          ? events.filter((e) => e.success).length / events.length
          : 1,
      avgDuration:
        events.length > 0
          ? events.reduce((sum, e) => sum + e.durationMs, 0) / events.length
          : 0,
      tokens: events.reduce((sum, e) => sum + e.totalTokens, 0),
    };

    // Group by date for trend chart
    const costByDate = new Map<string, { cost: number; requests: number; errors: number }>();

    events.forEach((event) => {
      const dateKey = event.timestamp.toISOString().split('T')[0];
      const existing = costByDate.get(dateKey) || { cost: 0, requests: 0, errors: 0 };
      existing.cost += event.costUSD;
      existing.requests += 1;
      if (!event.success) existing.errors += 1;
      costByDate.set(dateKey, existing);
    });

    const trend = Array.from(costByDate.entries())
      .map(([date, stats]) => ({
        date,
        cost: Math.round(stats.cost * 100) / 100,
        requests: stats.requests,
        errors: stats.errors,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Group by feature
    const featureMap = new Map<
      string,
      { cost: number; requests: number; errors: number; tokens: number; lastUsed: Date }
    >();

    events.forEach((event) => {
      const existing = featureMap.get(event.feature) || {
        cost: 0,
        requests: 0,
        errors: 0,
        tokens: 0,
        lastUsed: event.timestamp,
      };
      existing.cost += event.costUSD;
      existing.requests += 1;
      existing.tokens += event.totalTokens;
      if (!event.success) existing.errors += 1;
      if (event.timestamp > existing.lastUsed) existing.lastUsed = event.timestamp;
      featureMap.set(event.feature, existing);
    });

    const features = Array.from(featureMap.entries())
      .map(([feature, stats]) => ({
        feature,
        cost: Math.round(stats.cost * 100) / 100,
        requests: stats.requests,
        errors: stats.errors,
        tokens: stats.tokens,
        successRate: stats.requests > 0 ? (stats.requests - stats.errors) / stats.requests : 1,
        avgCost: stats.requests > 0 ? Math.round((stats.cost / stats.requests) * 1000) / 1000 : 0,
        lastUsed: stats.lastUsed.toISOString(),
      }))
      .sort((a, b) => b.cost - a.cost);

    // Group by model
    const modelMap = new Map<string, { cost: number; requests: number; tokens: number }>();

    events.forEach((event) => {
      const existing = modelMap.get(event.model) || { cost: 0, requests: 0, tokens: 0 };
      existing.cost += event.costUSD;
      existing.requests += 1;
      existing.tokens += event.totalTokens;
      modelMap.set(event.model, existing);
    });

    const models = Array.from(modelMap.entries())
      .map(([model, stats]) => ({
        model,
        cost: Math.round(stats.cost * 100) / 100,
        requests: stats.requests,
        tokens: stats.tokens,
      }))
      .sort((a, b) => b.cost - a.cost);

    // Get recent errors
    const recentErrors = events
      .filter((e) => !e.success && e.errorMessage)
      .slice(0, 10)
      .map((e) => ({
        id: e.id,
        feature: e.feature,
        model: e.model,
        error: e.errorMessage,
        timestamp: e.timestamp.toISOString(),
      }));

    return NextResponse.json({
      today: todayStats,
      period: {
        ...periodStats,
        days,
        label: period,
      },
      trend,
      features,
      models,
      recentErrors,
      budget: {
        daily: Number(process.env.AI_DAILY_BUDGET) || 50,
        used: todayStats.cost,
        remaining: Math.max(0, (Number(process.env.AI_DAILY_BUDGET) || 50) - todayStats.cost),
        percentUsed:
          (todayStats.cost / (Number(process.env.AI_DAILY_BUDGET) || 50)) * 100,
      },
    });
  } catch (error) {
    console.error('Error fetching AI costs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI costs' },
      { status: 500 }
    );
  }
}
