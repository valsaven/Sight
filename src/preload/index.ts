import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom methods that will be available in the renderer
const customAPI = {
  getDefaultImagesPath: () => ipcRenderer.invoke('get-default-images-path'),
  getFullImageBase64: (path: string) => ipcRenderer.invoke('get-full-image-base64', path),
  getImages: (path: string) => ipcRenderer.invoke('get-images', path),
  goUpDirectory: (path: string) => ipcRenderer.invoke('go-up-directory', path),
};

// Main API
const api = {
  ...electronAPI, // Save the standard methods (store, ipcRenderer, etc.)
  ...customAPI, // Add our custom methods
};

// Expose to window
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api);
  } catch (error) {
    console.error(error);
  }
} else {
  (window as typeof window & { electron?: typeof api }).electron = api;
}
