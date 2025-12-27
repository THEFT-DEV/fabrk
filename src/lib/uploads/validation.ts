/**
 * Production-Grade File Upload Validation
 * Implements magic byte checking, executable detection, and comprehensive security measures
 *
 * Security Features:
 * - Magic byte validation (file signature verification)
 * - File size limits (configurable per type)
 * - Filename sanitization (path traversal prevention)
 * - MIME type validation
 * - Executable file detection
 * - Double extension detection
 * - Malicious pattern detection
 */

import { MAGIC_BYTES, EXECUTABLE_SIGNATURES, matchesMagicBytes } from './file-signatures';
import type { FileTypeConfig, ValidationResult } from './file-type-configs';

// Re-export for backwards compatibility
export { MAGIC_BYTES } from './file-signatures';
export { FILE_TYPE_CONFIGS, type FileTypeConfig, type ValidationResult } from './file-type-configs';

// Unused type imports for module augmentation
export type { FileTypeConfig as _FileTypeConfig, ValidationResult as _ValidationResult };

/**
 * Validate file type using magic bytes
 */
export function validateFileType(buffer: Buffer, mimeType: string): ValidationResult {
  const magicBytes = MAGIC_BYTES[mimeType];

  if (!magicBytes) {
    return { valid: false, error: `Unsupported file type: ${mimeType}` };
  }

  if (!matchesMagicBytes(buffer, magicBytes)) {
    return {
      valid: false,
      error: `File content does not match declared type ${mimeType}. Possible file type mismatch or tampering.`,
    };
  }

  return { valid: true };
}

/**
 * Detect if file is an executable
 */
export function detectExecutable(buffer: Buffer): boolean {
  if (buffer.length < 2) return false;
  return EXECUTABLE_SIGNATURES.some((signature) => matchesMagicBytes(buffer, signature));
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path components
  filename = filename.replace(/^.*[\\\/]/, '');
  // Remove null bytes
  filename = filename.replace(/\0/g, '');
  // Remove path traversal patterns
  filename = filename.replace(/\.\./g, '');
  filename = filename.replace(/[\\\/]/g, '');
  // Remove potentially dangerous characters
  filename = filename.replace(/[<>:"|?*]/g, '');
  // Replace spaces and special characters with underscores
  filename = filename.replace(/[^\w\s.-]/g, '_');
  // Collapse multiple dots
  filename = filename.replace(/\.{2,}/g, '.');
  // Trim dots and spaces from start/end
  filename = filename.replace(/^[.\s]+|[.\s]+$/g, '');

  // Limit length (filesystem limits)
  const maxLength = 255;
  if (filename.length > maxLength) {
    const ext = filename.split('.').pop() || '';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    filename = nameWithoutExt.substring(0, maxLength - ext.length - 1) + '.' + ext;
  }

  // Ensure filename is not empty
  if (!filename || filename.length === 0) {
    filename = 'file';
  }

  return filename;
}

/**
 * Validate file extension against allowed types
 */
function validateExtension(filename: string, allowedExtensions: string[]): ValidationResult {
  const parts = filename.toLowerCase().split('.');

  // Check for double extensions (e.g., file.php.jpg)
  if (parts.length > 2) {
    return {
      valid: false,
      error:
        'File cannot have multiple extensions. This may indicate a file type obfuscation attempt.',
    };
  }

  const ext = parts.pop();
  if (!ext) return { valid: false, error: 'File must have an extension' };

  if (!allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension .${ext} not allowed. Allowed: ${allowedExtensions.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate file size
 */
function validateFileSize(size: number, maxSize: number): ValidationResult {
  if (size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);
    return { valid: false, error: `File too large. Maximum size: ${maxSizeMB}MB` };
  }
  if (size === 0) return { valid: false, error: 'File is empty' };
  return { valid: true };
}

/**
 * Detect potential malicious patterns in file content
 */
function detectMaliciousPatterns(buffer: Buffer, mimeType: string): ValidationResult {
  // For text-based files, check for malicious scripts
  if (mimeType.startsWith('text/') || mimeType.includes('xml') || mimeType.includes('svg')) {
    const content = buffer.toString('utf-8', 0, Math.min(buffer.length, 1024 * 10)); // Check first 10KB

    if (/<script[^>]*>/i.test(content)) {
      return { valid: false, error: 'File contains potentially malicious script tags' };
    }
    if (/on\w+\s*=/i.test(content)) {
      return { valid: false, error: 'File contains potentially malicious event handlers' };
    }
    if (/javascript:/i.test(content)) {
      return { valid: false, error: 'File contains potentially malicious JavaScript protocol' };
    }
  }

  return { valid: true };
}

/**
 * Comprehensive file upload validation
 */
export async function validateUpload(
  file: File | { buffer: Buffer; name: string; type: string; size: number },
  config: {
    allowedTypes?: FileTypeConfig;
    maxSize?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): Promise<ValidationResult> {
  // Extract file data
  let buffer: Buffer;
  let filename: string;
  let mimeType: string;
  let size: number;

  if (file instanceof File) {
    buffer = Buffer.from(await file.arrayBuffer());
    filename = file.name;
    mimeType = file.type;
    size = file.size;
  } else {
    buffer = file.buffer;
    filename = file.name;
    mimeType = file.type;
    size = file.size;
  }

  const sanitizedFilename = sanitizeFilename(filename);

  // Check for executable files
  if (detectExecutable(buffer)) {
    return { valid: false, error: 'Executable files are not allowed for security reasons' };
  }

  // Validate file size
  const maxSize = config.maxSize || config.allowedTypes?.maxSize || 10 * 1024 * 1024;
  const sizeValidation = validateFileSize(size, maxSize);
  if (!sizeValidation.valid) return sizeValidation;

  // Validate MIME type
  const allowedMimeTypes = config.allowedMimeTypes || config.allowedTypes?.mimeTypes || [];
  if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(mimeType)) {
    return {
      valid: false,
      error: `MIME type ${mimeType} not allowed. Allowed: ${allowedMimeTypes.join(', ')}`,
    };
  }

  // Validate extension
  const allowedExtensions = config.allowedExtensions || config.allowedTypes?.extensions || [];
  if (allowedExtensions.length > 0) {
    const extValidation = validateExtension(filename, allowedExtensions);
    if (!extValidation.valid) return extValidation;
  }

  // Validate file type using magic bytes
  if (MAGIC_BYTES[mimeType]) {
    const magicByteValidation = validateFileType(buffer, mimeType);
    if (!magicByteValidation.valid) return magicByteValidation;
  }

  // Detect malicious patterns
  const maliciousPatternValidation = detectMaliciousPatterns(buffer, mimeType);
  if (!maliciousPatternValidation.valid) return maliciousPatternValidation;

  return { valid: true, details: { fileType: mimeType, size, sanitizedFilename } };
}

/**
 * Validate multiple files
 */
export async function validateMultipleUploads(
  files: (File | { buffer: Buffer; name: string; type: string; size: number })[],
  config: {
    allowedTypes?: FileTypeConfig;
    maxSize?: number;
    maxFiles?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): Promise<ValidationResult> {
  if (config.maxFiles && files.length > config.maxFiles) {
    return { valid: false, error: `Too many files. Maximum: ${config.maxFiles}` };
  }

  for (let i = 0; i < files.length; i++) {
    const result = await validateUpload(files[i], config);
    if (!result.valid) return { valid: false, error: `File ${i + 1}: ${result.error}` };
  }

  return { valid: true };
}

/**
 * Get file type from buffer (magic byte detection)
 */
export function detectFileType(buffer: Buffer): string | null {
  for (const [mimeType, magicBytes] of Object.entries(MAGIC_BYTES)) {
    if (matchesMagicBytes(buffer, magicBytes)) return mimeType;
  }
  return null;
}

/**
 * Validate image dimensions (requires sharp)
 */
export async function validateImageDimensions(
  buffer: Buffer,
  options: { minWidth?: number; minHeight?: number; maxWidth?: number; maxHeight?: number }
): Promise<ValidationResult> {
  try {
    const sharpModule = await import('sharp');
    const sharp = sharpModule.default || sharpModule;
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return { valid: false, error: 'Could not determine image dimensions' };
    }

    if (options.minWidth && metadata.width < options.minWidth) {
      return { valid: false, error: `Image width too small. Minimum: ${options.minWidth}px` };
    }
    if (options.minHeight && metadata.height < options.minHeight) {
      return { valid: false, error: `Image height too small. Minimum: ${options.minHeight}px` };
    }
    if (options.maxWidth && metadata.width > options.maxWidth) {
      return { valid: false, error: `Image width too large. Maximum: ${options.maxWidth}px` };
    }
    if (options.maxHeight && metadata.height > options.maxHeight) {
      return { valid: false, error: `Image height too large. Maximum: ${options.maxHeight}px` };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Failed to validate image dimensions' };
  }
}
