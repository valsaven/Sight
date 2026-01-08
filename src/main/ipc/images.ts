import fs from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';
import { nativeImage } from 'electron';
import { format } from 'date-fns';
import { imageSizeFromFile } from 'image-size/fromFile';

import { type Image } from '../../../src/renderer/src/types';
import { IMAGE_TYPES, type ImageType } from '../constants';
import { humanFileSize } from '../utils/file';
import { getHash } from '../utils/hash';

export function isSupportedImageType(ext: string): ext is ImageType {
  return IMAGE_TYPES.includes(ext as ImageType);
}

export async function handleGetImages(_event: any, dirPath: string) {
  const limit = pLimit(10); // Limit to 20 concurrent tasks to avoid overloading disk/CPU

  try {
    let files = await fs.readdir(dirPath);

    // Sort by name (natural order)
    files = files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    // Process files with limited concurrency instead of sequentially
    const imagePromises = files.map((file) =>
      limit(async () => {
        const ext = path.extname(file).slice(1).toLowerCase();

        if (!isSupportedImageType(ext)) {
          return null;
        }

        const fullPath = path.join(dirPath, file);
        const stats = await fs.stat(fullPath);
        if (!stats.isFile()) {
          return null;
        }

        // Skip if too small or corrupted
        let dimensions = 'Unknown';
        try {
          const dim = await imageSizeFromFile(fullPath);
          dimensions = `${dim.width}x${dim.height}`;
        } catch {
          return null; // Skip broken images
        }

        // Generate thumbnail (80x80 max, preserves aspect ratio)
        let thumbnailSrc: string | undefined;
        try {
          const thumbnail = await nativeImage.createThumbnailFromPath(fullPath, { width: 80, height: 80 });
          if (!thumbnail.isEmpty()) {
            thumbnailSrc = thumbnail.toDataURL(); // data:image/png;base64,...
          }
        } catch {
          // Fallback: no thumbnail if system can't generate it (common on Linux)
        }

        let fileHash = 'error';
        try {
          const buffer = await fs.readFile(fullPath);
          fileHash = getHash(buffer);
        } catch (err) {
          console.error('Hash error:', err);
          fileHash = 'error';
        }

        return {
          src: fullPath,
          name: file,
          dimensions,
          ext,
          size: humanFileSize(stats.size),
          modifiedTime: format(stats.mtimeMs, 'dd MMM yyyy, HH:mm:ss'),
          selected: false,
          active: false,
          hash: fileHash,
          thumbnailSrc,
        } as Image;
      }),
    );

    // Wait for all limited tasks to complete
    const processed = (await Promise.all(imagePromises)).filter(Boolean) as Image[];

    // Assign sequential IDs after processing (order preserved by original sort)
    processed.forEach((img, index) => {
      img.id = index;
    });

    return { success: true, images: processed };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message };
  }
}
