export const IMAGE_TYPES = ['avif', 'bmp', 'gif', 'ico', 'jpg', 'jpeg', 'png', 'svg', 'webp'] as const;

export type ImageType = (typeof IMAGE_TYPES)[number];

// MIME types for data URLs (base64)
export const IMAGE_MIME_MAP: Record<string, string> = {
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
} as const;

export type ImageMimeType = (typeof IMAGE_MIME_MAP)[keyof typeof IMAGE_MIME_MAP];
