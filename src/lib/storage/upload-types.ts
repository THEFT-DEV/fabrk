/**
 * Upload System Types
 * Type definitions for file uploads
 */

import type { StorageProvider } from './storage-providers';

export interface UploadOptions {
  userId: string;
  organizationId?: string;
  file: File | Buffer;
  filename?: string;
  mimeType?: string;
  visibility?: 'private' | 'public';
  metadata?: Record<string, string>;
}

export interface UploadResult {
  id: string;
  url: string;
  key: string;
  provider: StorageProvider;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface StorageUsage {
  totalBytes: number;
  fileCount: number;
}

export interface ImageOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
}
