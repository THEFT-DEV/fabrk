/**
 * Admin Stats API
 * Retrieve aggregated statistics for admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET(_req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch comprehensive stats
    const [
      totalUsers,
      activeUsers,
      totalOrganizations,
      activeOrganizations,
      totalPayments,
      recentSignups,
      recentPayments,
      totalRevenue,
      monthlyRevenue,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // Active users (with sessions in last 30 days)
      prisma.user.count({
        where: {
          sessions: {
            some: {
              expires: {
                gt: new Date(),
              },
            },
          },
        },
      }),

      // Total organizations
      prisma.organization.count(),

      // Active organizations (with activity in last 30 days)
      prisma.organization.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Total successful payments
      prisma.payment.count({
        where: {
          status: 'succeeded',
        },
      }),

      // Recent signups (last 7 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Recent payments (last 7 days)
      prisma.payment.count({
        where: {
          status: 'succeeded',
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Total revenue (all time)
      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: 'succeeded',
        },
      }),

      // Monthly recurring revenue (MRR) - payments in last 30 days
      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: 'succeeded',
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Calculate growth rates
    const previousMonthStart = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const previousMonthEnd = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [previousMonthSignups, previousMonthRevenue] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: previousMonthStart,
            lt: previousMonthEnd,
          },
        },
      }),
      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: 'succeeded',
          createdAt: {
            gte: previousMonthStart,
            lt: previousMonthEnd,
          },
        },
      }),
    ]);

    // Calculate growth percentages
    const currentMonthSignups = recentSignups;
    const userGrowth =
      previousMonthSignups > 0
        ? ((currentMonthSignups - previousMonthSignups) / previousMonthSignups) * 100
        : 100;

    const currentMonthRevenueValue = monthlyRevenue._sum.amount || 0;
    const previousMonthRevenueValue = previousMonthRevenue._sum.amount || 0;
    const revenueGrowth =
      previousMonthRevenueValue > 0
        ? ((currentMonthRevenueValue - previousMonthRevenueValue) / previousMonthRevenueValue) * 100
        : 100;

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        recentSignups: recentSignups,
        growth: Math.round(userGrowth * 10) / 10, // Round to 1 decimal
      },
      organizations: {
        total: totalOrganizations,
        active: activeOrganizations,
      },
      revenue: {
        total: totalRevenue._sum.amount || 0,
        monthly: currentMonthRevenueValue,
        mrr: currentMonthRevenueValue, // Same as monthly for now
        growth: Math.round(revenueGrowth * 10) / 10,
      },
      payments: {
        total: totalPayments,
        recent: recentPayments,
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
