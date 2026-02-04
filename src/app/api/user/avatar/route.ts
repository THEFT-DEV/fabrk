/**
 * User Avatar Upload API Route
 * POST /api/user/avatar
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/storage/uploads';
import { withCsrfProtection } from '@/lib/security/csrf';
import { logger } from '@/lib/logger';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3 (if configured)
    try {
      const uploadResult = await uploadFile({
        userId: session.user.id,
        file: buffer,
        filename: `avatar-${session.user.id}-${Date.now()}.${file.type.split('/')[1]}`,
        mimeType: file.type,
        visibility: 'public',
        metadata: {
          type: 'avatar',
          userId: session.user.id,
        },
      });

      // Update user's image URL
      await prisma.user.update({
        where: { id: session.user.id },
        data: { image: uploadResult.url },
      });

      return NextResponse.json({
        url: uploadResult.url,
        success: true,
      });
    } catch (uploadError: unknown) {
      // If S3 is not configured, return a placeholder or error
      logger.error('[Avatar Upload] S3 not configured:', uploadError);
      return NextResponse.json(
        {
          error: 'File upload service not configured. Please set up S3 environment variables.',
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    logger.error('[Avatar Upload] Error:', error);
    return NextResponse.json({ error: 'Failed to upload avatar' }, { status: 500 });
  }
});
