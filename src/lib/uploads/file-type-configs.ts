/**
 * File Type Configurations
 * Allowed MIME types, extensions, and size limits per file category
 */

/**
 * File type configuration interface
 */
export interface FileTypeConfig {
  mimeTypes: string[];
  extensions: string[];
  maxSize: number; // in bytes
  description: string;
}

/**
 * Predefined file type configurations
 */
export const FILE_TYPE_CONFIGS: Record<string, FileTypeConfig> = {
  image: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'],
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'],
    maxSize: 10 * 1024 * 1024, // 10MB
    description: 'Image files',
  },
  avatar: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    description: 'Avatar images',
  },
  document: {
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ],
    extensions: ['pdf', 'docx', 'xlsx', 'txt'],
    maxSize: 25 * 1024 * 1024, // 25MB
    description: 'Document files',
  },
  video: {
    mimeTypes: ['video/mp4', 'video/webm'],
    extensions: ['mp4', 'webm'],
    maxSize: 100 * 1024 * 1024, // 100MB
    description: 'Video files',
  },
  audio: {
    mimeTypes: ['audio/mpeg', 'audio/wav'],
    extensions: ['mp3', 'wav'],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'Audio files',
  },
};

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: {
    fileType?: string;
    size?: number;
    sanitizedFilename?: string;
  };
}
