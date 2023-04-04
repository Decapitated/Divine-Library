import { contextBridge, ipcRenderer } from 'electron';
import type { Bookmark, NewChapter } from './library/types';

contextBridge.exposeInMainWorld('electronAPI', {
    getBookmarks: () => ipcRenderer.invoke('getBookmarks') as Promise<Bookmark[]>
});