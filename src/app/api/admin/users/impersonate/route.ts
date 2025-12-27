import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { logger } from '@/lib/logger';
import { cookies } from 'next/headers';

const IMPERSONATION_COOKIE = 'fabrk_impersonation';

/**
 * POST /api/admin/users/impersonate
 * Start impersonating a user (admin only)
 */
export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    // Only admins can impersonate
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { userId, reason } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Find target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't allow impersonating other admins
    if (targetUser.role === 'ADMIN') {
      return NextResponse.json(
        { error: 'Cannot impersonate other administrators' },
        { status: 403 }
      );
    }

    // Log the impersonation in audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'admin.user_impersonated',
        resource: 'user',
        resourceId: userId,
        metadata: {
          reason: reason || 'No reason provided',
          targetEmail: targetUser.email,
          targetName: targetUser.name,
        },
      },
    });

    // Store original admin info in a secure cookie
    const impersonationData = {
      originalUserId: session.user.id,
      originalUserName: session.user.name,
      originalUserEmail: session.user.email,
      targetUserId: targetUser.id,
      startedAt: new Date().toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set(IMPERSONATION_COOKIE, JSON.stringify(impersonationData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour max impersonation
      path: '/',
    });

    logger.info('Admin started impersonation', {
      adminId: session.user.id,
      targetUserId: userId,
      reason,
    });

    return NextResponse.json({
      success: true,
      message: `Now impersonating ${targetUser.name || targetUser.email}`,
      targetUser: {
        id: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
      },
      redirect: '/dashboard',
    });
  } catch (error) {
    logger.error('Error starting impersonation:', error);
    return NextResponse.json({ error: 'Failed to start impersonation' }, { status: 500 });
  }
});

/**
 * DELETE /api/admin/users/impersonate
 * Stop impersonating and return to admin account
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const impersonationCookie = cookieStore.get(IMPERSONATION_COOKIE);

    if (!impersonationCookie) {
      return NextResponse.json({ error: 'Not currently impersonating' }, { status: 400 });
    }

    const impersonationData = JSON.parse(impersonationCookie.value);

    // Log the end of impersonation
    await prisma.auditLog.create({
      data: {
        userId: impersonationData.originalUserId,
        action: 'admin.impersonation_ended',
        resource: 'user',
        resourceId: impersonationData.targetUserId,
        metadata: {
          duration: Date.now() - new Date(impersonationData.startedAt).getTime(),
        },
      },
    });

    // Clear the impersonation cookie
    cookieStore.delete(IMPERSONATION_COOKIE);

    logger.info('Admin ended impersonation', {
      adminId: impersonationData.originalUserId,
      targetUserId: impersonationData.targetUserId,
    });

    return NextResponse.json({
      success: true,
      message: 'Impersonation ended',
      redirect: '/admin/users',
    });
  } catch (error) {
    logger.error('Error ending impersonation:', error);
    return NextResponse.json({ error: 'Failed to end impersonation' }, { status: 500 });
  }
}

/**
 * GET /api/admin/users/impersonate
 * Check current impersonation status
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const impersonationCookie = cookieStore.get(IMPERSONATION_COOKIE);

    if (!impersonationCookie) {
      return NextResponse.json({ isImpersonating: false });
    }

    const impersonationData = JSON.parse(impersonationCookie.value);

    // Fetch target user info
    const targetUser = await prisma.user.findUnique({
      where: { id: impersonationData.targetUserId },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({
      isImpersonating: true,
      originalUser: {
        id: impersonationData.originalUserId,
        name: impersonationData.originalUserName,
        email: impersonationData.originalUserEmail,
      },
      targetUser,
      startedAt: impersonationData.startedAt,
    });
  } catch {
    return NextResponse.json({ isImpersonating: false });
  }
}
