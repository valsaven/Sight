import { app } from 'electron';
import fs from 'fs/promises';
import path from 'path';

export async function handleGetDefaultImagesPath() {
  try {
    // The standard Pictures folder for the user
    const picturesPath = app.getPath('pictures');

    // Check if it exists on the disk (on some systems, the Pictures folder may not be created by default)
    try {
      await fs.access(picturesPath);
      return { success: true, path: picturesPath };
    } catch {
      // If the Pictures folder does not exist, return the user's home folder
      const homePath = app.getPath('home');
      return { success: true, path: homePath };
    }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message };
  }
}

export async function handleGoUpDirectory(_event, currentPath: string) {
  try {
    const parentDir = path.dirname(currentPath);

    // If the path is already at the root ( '/' on Linux or 'C:\' on Windows), we return the same path or a special flag
    if (parentDir === currentPath) {
      return { success: true, path: currentPath, isRoot: true };
    }

    return { success: true, path: parentDir };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message };
  }
}
