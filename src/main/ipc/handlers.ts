import { ipcMain } from 'electron';

import { handleGetDefaultImagesPath } from './navigation';
import { handleGetFullImageBase64 } from './utils';
import { handleGetImages } from './images';
import { handleGoUpDirectory } from './navigation';

export function registerHandlers(): void {
  ipcMain.handle('get-default-images-path', handleGetDefaultImagesPath);

  ipcMain.handle('get-full-image-base64', handleGetFullImageBase64);

  ipcMain.handle('get-images', handleGetImages);

  ipcMain.handle('go-up-directory', handleGoUpDirectory);
}
