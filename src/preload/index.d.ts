import { ElectronAPI } from '@electron-toolkit/preload';
import type { Image, Images } from '@/types';

declare global {
  interface Window {
    /** Electron API exposed via preload */
    electron: ElectronAPI & {
      /** Get default images path (Pictures or Home) */
      getDefaultImagesPath: () => Promise<{
        success: boolean;
        path?: string;
        error?: string;
      }>;

      /** Get full image as data URL (base64) */
      getFullImageBase64: (path: string) => Promise<string | { error: string }>;

      /** Load images from folder with metadata and thumbnails */
      getImages: (path: string) => Promise<{
        success: boolean;
        images?: Images;
        error?: string;
      }>;

      /** Navigate one directory level up */
      goUpDirectory: (path: string) => Promise<{
        success: boolean;
        path: string;
        isRoot?: boolean;
        error?: string;
      }>;
    };
  }
}

export {};
