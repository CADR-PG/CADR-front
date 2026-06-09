import { create } from 'zustand';
import { getProjectAssets } from '../api/client';
import type { AssetsDirectory } from '../types/Assets';

interface AssetsStore {
  assets: AssetsDirectory | null;
  fetch: (projectId: string) => Promise<void>;
}

export const useAssetsStore = create<AssetsStore>((set) => ({
  assets: null,
  fetch: async (projectId: string) => {
    const response = await getProjectAssets(projectId);
    set({ assets: response.data.assets });
  },
}));