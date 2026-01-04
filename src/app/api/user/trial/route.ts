/**
 * Trial Status API Route
 * GET /api/user/trial
 *
 * Returns the current user's trial status
 */

import { auth } from '@/lib/auth';
import { getTrialStatus } from '@/lib/trial';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = await getTrialStatus(session.user.id);

    return NextResponse.json(status);
  } catch {
    return NextResponse.json({ error: 'Failed to get trial status' }, { status: 500 });
  }
}
