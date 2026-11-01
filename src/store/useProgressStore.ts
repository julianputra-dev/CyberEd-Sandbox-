import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const encodeId = (id: string) => {
  if (typeof window !== 'undefined') {
    return window.btoa(`cyber_done_${id}`);
  }
  return Buffer.from(`cyber_done_${id}`).toString('base64');
};

export const decodeId = (hash: string) => {
  try {
    if (typeof window !== 'undefined') {
      return window.atob(hash).replace('cyber_done_', '');
    }
    return Buffer.from(hash, 'base64').toString('ascii').replace('cyber_done_', '');
  } catch {
    return '';
  }
};

export interface ProgressState {
  completedTheoryHashes: string[];
  completedLabHashes: string[];
  markTheoryComplete: (moduleId: string) => void;
  markLabComplete: (moduleId: string) => void;
  isTheoryCompleted: (moduleId: string) => boolean;
  isLabCompleted: (moduleId: string) => boolean;
  exportProgressData: () => string;
  importProgressData: (jsonString: string) => boolean;
  resetAllProgress: () => void;
}

// Fallback dummy storage to ensure zero SSR / Node.js crashes when localStorage is undefined
const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTheoryHashes: [],
      completedLabHashes: [],

      markTheoryComplete: (moduleId: string) =>
        set((state) => ({
          completedTheoryHashes: Array.from(
            new Set([...state.completedTheoryHashes, encodeId(moduleId)])
          ),
        })),

      markLabComplete: (moduleId: string) =>
        set((state) => ({
          completedLabHashes: Array.from(
            new Set([...state.completedLabHashes, encodeId(moduleId)])
          ),
        })),

      isTheoryCompleted: (moduleId: string) =>
        get().completedTheoryHashes.includes(encodeId(moduleId)),

      isLabCompleted: (moduleId: string) =>
        get().completedLabHashes.includes(encodeId(moduleId)),

      exportProgressData: () =>
        JSON.stringify(
          {
            version: 1,
            appName: 'CyberEd Sandbox',
            timestamp: new Date().toISOString(),
            completedTheoryHashes: get().completedTheoryHashes,
            completedLabHashes: get().completedLabHashes,
          },
          null,
          2
        ),

      importProgressData: (jsonString: string) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (
            parsed &&
            Array.isArray(parsed.completedTheoryHashes) &&
            Array.isArray(parsed.completedLabHashes)
          ) {
            set({
              completedTheoryHashes: parsed.completedTheoryHashes,
              completedLabHashes: parsed.completedLabHashes,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      resetAllProgress: () =>
        set({ completedTheoryHashes: [], completedLabHashes: [] }),
    }),
    {
      name: 'cybered-sandbox-storage',
      version: 1,
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : dummyStorage
      ),
    }
  )
);
