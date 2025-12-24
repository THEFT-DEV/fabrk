/**
 * File Upload System
 * S3-compatible file storage with image optimization
 *
 * Features:
 * - S3/R2/MinIO compatible (requires @aws-sdk/client-s3)
 * - Auto-detection: R2 > S3 > Local storage
 * - Image optimization (sharp)
 * - File validation
 * - Signed URLs
 *
 * NOTE: AWS SDK packages are optional. Install them if you need cloud uploads:
 * npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
 */

import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from '@/lib/logger';

// Extracted modules
import {
  STORAGE_PROVIDER,
  BUCKET_NAME,
  getS3Client,
  getS3Commands,
  getPublicUrl,
  getStorageProvider,
  isCloudStorageConfigured,
} from './storage-providers';

import type {
  UploadOptions,
  UploadResult,
  ValidationResult,
  StorageUsage,
  ImageOptimizeOptions,
  FileValidationOptions,
} from './upload-types';

// Re-export for backwards compatibility
export { getStorageProvider, isCloudStorageConfigured };
export type { UploadOptions, UploadResult, ValidationResult, StorageUsage, ImageOptimizeOptions };

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB default
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

/**
 * Validate file
 */
export function validateFile(
  file: File | Buffer,
  options: FileValidationOptions
): ValidationResult {
  const maxSize = options.maxSize || MAX_FILE_SIZE;

  // Check size
  const size = file instanceof File ? file.size : file.length;
  if (size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB`,
    };
  }

  // Check mime type
  if (options.allowedTypes && file instanceof File) {
    if (!options.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed: ${options.allowedTypes.join(', ')}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Upload file to local storage
 */
async function uploadToLocalStorage(
  buffer: Buffer,
  key: string,
  mimeType: string
): Promise<string> {
  // Ensure upload directory exists
  const userDir = path.dirname(path.join(LOCAL_UPLOAD_DIR, key));
  await fs.mkdir(userDir, { recursive: true });

  // Write file
  const filePath = path.join(LOCAL_UPLOAD_DIR, key);
  await fs.writeFile(filePath, buffer);

  logger.info('File uploaded to local storage', {
    key,
    size: buffer.length,
    mimeType,
  });

  return getPublicUrl(key);
}

/**
 * Upload file to cloud storage (S3 or R2)
 */
async function uploadToCloud(
  buffer: Buffer,
  key: string,
  mimeType: string,
  visibility: 'private' | 'public',
  metadata?: Record<string, string>
): Promise<string> {
  const s3Client = await getS3Client();
  const { PutObjectCommand, GetObjectCommand, getSignedUrl } = getS3Commands();

  if (!s3Client) {
    throw new Error('Cloud storage not configured. Falling back to local storage.');
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      Metadata: metadata,
      ...(visibility === 'public' && STORAGE_PROVIDER === 's3' ? { ACL: 'public-read' } : {}),
    })
  );

  logger.info(`File uploaded to ${STORAGE_PROVIDER}`, {
    bucket: BUCKET_NAME,
    key,
    size: buffer.length,
  });

  // Generate URL
  if (visibility === 'public') {
    return getPublicUrl(key);
  }

  // Generate signed URL for private files
  return await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }), {
    expiresIn: 3600,
  });
}

/**
 * Upload file to storage (auto-detects provider)
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  // Validate file
  const validation = validateFile(options.file, {});
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate unique filename
  const ext = options.filename?.split('.').pop() || '';
  const randomName = crypto.randomBytes(16).toString('hex');
  const filename = `${randomName}.${ext}`;
  const key = `${options.userId}/${filename}`;

  // Get file buffer
  const buffer =
    options.file instanceof File ? Buffer.from(await options.file.arrayBuffer()) : options.file;

  const mimeType =
    options.mimeType ||
    (options.file instanceof File ? options.file.type : 'application/octet-stream');
  const visibility = options.visibility || 'private';

  let url: string;
  let actualProvider = STORAGE_PROVIDER;

  // Try cloud storage first, fall back to local
  if (STORAGE_PROVIDER !== 'local') {
    try {
      url = await uploadToCloud(buffer, key, mimeType, visibility, options.metadata);
    } catch (error: unknown) {
      logger.warn('Cloud upload failed, falling back to local storage', { error });
      url = await uploadToLocalStorage(buffer, key, mimeType);
      actualProvider = 'local';
    }
  } else {
    url = await uploadToLocalStorage(buffer, key, mimeType);
  }

  // Save to database
  const upload = await prisma.upload.create({
    data: {
      userId: options.userId,
      organizationId: options.organizationId,
      filename,
      originalName: options.filename || filename,
      mimeType,
      size: buffer.length,
      url,
      key,
      bucket: actualProvider === 'local' ? 'local' : BUCKET_NAME,
      metadata: options.metadata,
      visibility,
    },
  });

  return {
    id: upload.id,
    url: upload.url,
    key: upload.key,
    provider: actualProvider,
  };
}

/**
 * Get signed URL for private file
 */
export async function getSignedFileUrl(
  fileId: string,
  userId: string,
  expiresIn: number = 3600
): Promise<string> {
  // Get upload record
  const upload = await prisma.upload.findUnique({
    where: { id: fileId },
  });

  if (!upload) {
    throw new Error('File not found');
  }

  // Check permissions
  if (upload.userId !== userId && upload.organizationId) {
    const member = await prisma.organizationMember.findFirst({
      where: { organizationId: upload.organizationId, userId },
    });
    if (!member) throw new Error('Access denied');
  } else if (upload.userId !== userId) {
    throw new Error('Access denied');
  }

  // Local files don't need signed URLs
  if (upload.bucket === 'local') return upload.url;

  // Get S3 client
  const s3Client = await getS3Client();
  const { GetObjectCommand, getSignedUrl } = getS3Commands();
  if (!s3Client) throw new Error('Cloud storage not available');

  return await getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: upload.bucket || BUCKET_NAME, Key: upload.key }),
    { expiresIn }
  );
}

/**
 * Delete file
 */
export async function deleteFile(fileId: string, userId: string): Promise<void> {
  const upload = await prisma.upload.findUnique({ where: { id: fileId } });
  if (!upload) throw new Error('File not found');
  if (upload.userId !== userId) throw new Error('Access denied');

  // Delete from storage
  if (upload.bucket === 'local') {
    const filePath = path.join(LOCAL_UPLOAD_DIR, upload.key);
    try {
      await fs.unlink(filePath);
      logger.info('Deleted local file', { key: upload.key });
    } catch (error: unknown) {
      logger.warn('Failed to delete local file', { key: upload.key, error });
    }
  } else {
    const s3Client = await getS3Client();
    const { DeleteObjectCommand } = getS3Commands();
    if (s3Client) {
      await s3Client.send(
        new DeleteObjectCommand({ Bucket: upload.bucket || BUCKET_NAME, Key: upload.key })
      );
      logger.info('Deleted cloud file', { bucket: upload.bucket, key: upload.key });
    }
  }

  await prisma.upload.delete({ where: { id: fileId } });
}

/**
 * Get user uploads
 */
export async function getUserUploads(userId: string, limit: number = 50) {
  return await prisma.upload.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get organization uploads
 */
export async function getOrganizationUploads(organizationId: string, limit: number = 50) {
  return await prisma.upload.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get storage usage
 */
export async function getStorageUsage(userId: string): Promise<StorageUsage> {
  const result = await prisma.upload.aggregate({
    where: { userId },
    _sum: { size: true },
    _count: true,
  });

  return {
    totalBytes: result._sum.size || 0,
    fileCount: result._count,
  };
}

/**
 * Image optimization (requires sharp)
 */
export async function optimizeImage(
  buffer: Buffer,
  options: ImageOptimizeOptions = {}
): Promise<Buffer> {
  try {
    const sharp = (await import('sharp')).default;
    let image = sharp(buffer);

    if (options.width || options.height) {
      image = image.resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (options.format) {
      image = image.toFormat(options.format, { quality: options.quality || 80 });
    }

    return await image.toBuffer();
  } catch {
    return buffer;
  }
}
