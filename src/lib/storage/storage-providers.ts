/**
 * Storage Provider Configuration
 * S3/R2/Local storage provider detection and client initialization
 */

import { logger } from '@/lib/logger';

// AWS SDK imports are optional (loaded dynamically)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let S3Client: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PutObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DeleteObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getSignedUrl: any;

// Storage provider type
export type StorageProvider = 'r2' | 's3' | 'local';

/**
 * Detect which provider to use based on env vars
 */
export function detectStorageProvider(): StorageProvider {
  // Priority 1: Cloudflare R2
  if (
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    process.env.CLOUDFLARE_R2_BUCKET
  ) {
    return 'r2';
  }

  // Priority 2: AWS S3
  if (
    process.env.AWS_S3_ACCESS_KEY_ID &&
    process.env.AWS_S3_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET
  ) {
    return 's3';
  }

  // Fallback: Local storage
  return 'local';
}

export const STORAGE_PROVIDER = detectStorageProvider();

/**
 * Initialize S3 client based on provider
 */
async function initializeS3Client() {
  if (STORAGE_PROVIDER === 'local') return null;

  try {
    // Dynamic import for optional S3 SDK dependencies
    // These packages are optional - install with: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
    // @ts-expect-error - AWS SDK is an optional dependency
    const s3 = await import('@aws-sdk/client-s3');
    // @ts-expect-error - AWS SDK is an optional dependency
    const presigner = await import('@aws-sdk/s3-request-presigner');

    S3Client = s3.S3Client;
    PutObjectCommand = s3.PutObjectCommand;
    GetObjectCommand = s3.GetObjectCommand;
    DeleteObjectCommand = s3.DeleteObjectCommand;
    getSignedUrl = presigner.getSignedUrl;

    if (STORAGE_PROVIDER === 'r2') {
      return new S3Client({
        region: 'auto',
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
      });
    }

    // AWS S3
    return new S3Client({
      region: process.env.AWS_S3_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
    });
  } catch {
    logger.warn('AWS SDK not installed. Cloud uploads will fall back to local storage.');
    return null;
  }
}

// Lazy-loaded S3 client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let s3ClientPromise: Promise<any> | null = null;

export async function getS3Client() {
  if (!s3ClientPromise) {
    s3ClientPromise = initializeS3Client();
  }
  return s3ClientPromise;
}

/**
 * Get bucket name based on provider
 */
export function getBucketName(): string {
  if (STORAGE_PROVIDER === 'r2') {
    return process.env.CLOUDFLARE_R2_BUCKET || 'uploads';
  }
  if (STORAGE_PROVIDER === 's3') {
    return process.env.AWS_S3_BUCKET || 'uploads';
  }
  return 'uploads';
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(key: string): string {
  if (STORAGE_PROVIDER === 'r2' && process.env.CLOUDFLARE_R2_PUBLIC_URL) {
    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
  }
  if (STORAGE_PROVIDER === 's3') {
    return `https://${getBucketName()}.s3.${process.env.AWS_S3_REGION || 'us-east-1'}.amazonaws.com/${key}`;
  }
  // Local storage
  return `/uploads/${key}`;
}

export const BUCKET_NAME = getBucketName();

/**
 * Get the current storage provider being used
 */
export function getStorageProvider(): StorageProvider {
  return STORAGE_PROVIDER;
}

/**
 * Check if cloud storage is configured
 */
export function isCloudStorageConfigured(): boolean {
  return STORAGE_PROVIDER !== 'local';
}

/**
 * Get S3 commands (lazy loaded)
 */
export function getS3Commands() {
  return {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    getSignedUrl,
  };
}
