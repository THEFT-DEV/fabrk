/**
 * File Signatures (Magic Bytes)
 * First bytes of file that identify its true type
 */

/**
 * Magic Bytes (File Signatures)
 * First bytes of file that identify its true type
 */
export const MAGIC_BYTES: Record<string, number[]> = {
  // Images
  'image/png': [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/gif': [0x47, 0x49, 0x46, 0x38], // GIF8
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF (WebP container)
  'image/bmp': [0x42, 0x4d], // BM
  'image/tiff': [0x49, 0x49, 0x2a, 0x00], // II*\0 (little-endian)
  'image/svg+xml': [0x3c, 0x73, 0x76, 0x67], // <svg

  // Documents
  'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
  'application/zip': [0x50, 0x4b, 0x03, 0x04], // PK..
  'application/x-rar-compressed': [0x52, 0x61, 0x72, 0x21], // Rar!
  'application/x-7z-compressed': [0x37, 0x7a, 0xbc, 0xaf], // 7z

  // Office Documents (DOCX, XLSX, PPTX are ZIP-based)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    0x50, 0x4b, 0x03, 0x04,
  ],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [0x50, 0x4b, 0x03, 0x04],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    0x50, 0x4b, 0x03, 0x04,
  ],

  // Text
  'text/plain': [], // No magic bytes for plain text

  // Audio
  'audio/mpeg': [0x49, 0x44, 0x33], // ID3 (MP3)
  'audio/wav': [0x52, 0x49, 0x46, 0x46], // RIFF

  // Video
  'video/mp4': [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ....ftyp
  'video/webm': [0x1a, 0x45, 0xdf, 0xa3], // WebM
};

/**
 * Executable file signatures (to block)
 */
export const EXECUTABLE_SIGNATURES: number[][] = [
  [0x4d, 0x5a], // MZ (Windows EXE, DLL)
  [0x7f, 0x45, 0x4c, 0x46], // ELF (Linux executables)
  [0xca, 0xfe, 0xba, 0xbe], // Mach-O (macOS executables)
  [0xfe, 0xed, 0xfa, 0xce], // Mach-O (macOS 32-bit)
  [0xfe, 0xed, 0xfa, 0xcf], // Mach-O (macOS 64-bit)
  [0x23, 0x21], // #! (Shell scripts)
  [0x3c, 0x3f, 0x70, 0x68, 0x70], // <?php (PHP scripts)
];

/**
 * Check if buffer starts with magic bytes
 */
export function matchesMagicBytes(buffer: Buffer, magicBytes: number[]): boolean {
  if (magicBytes.length === 0) {
    // No magic bytes defined (e.g., text files)
    return true;
  }

  if (buffer.length < magicBytes.length) {
    return false;
  }

  for (let i = 0; i < magicBytes.length; i++) {
    if (buffer[i] !== magicBytes[i]) {
      return false;
    }
  }

  return true;
}
