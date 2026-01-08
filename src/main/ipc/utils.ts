import fs from 'fs/promises';
import path from 'path';

import { IMAGE_MIME_MAP } from '../constants';

export async function handleGetFullImageBase64(_event: any, filePath: string) {
  try {
    const buffer = await fs.readFile(filePath);

    const ext = path.extname(filePath).toLowerCase();
    const mime = IMAGE_MIME_MAP[ext] || 'application/octet-stream';

    return `data:${mime};base64,${buffer.toString('base64')}`;
  } catch (err: unknown) {
    return { error: (err as Error).message };
  }
}
