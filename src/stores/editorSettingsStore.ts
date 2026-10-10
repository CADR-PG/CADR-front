import { create } from 'zustand';

export interface Asset {
  id: string | null;
  name: string | null;
  directoryId: string | null;
}

interface State {
  scenes: (Asset | null)[];
}

interface Action {
  setScenes: (scenes: Asset[]) => void;
  pushScene: (scene: Asset | null) => void;
  removeScene: (index: number) => void;
  updateScene: (scene: Asset | null, index: number) => void;
}

const initialState: State = {
  scenes: [],
};

export const useEditorSettingsStore = create<State & Action>((set) => ({
  ...initialState,
  setScenes: (scenes: Asset[]) => {
    set({ scenes });
  },
  pushScene: (scene: Asset | null) => {
    set((state) => ({ scenes: [...state.scenes, scene] }));
  },
  removeScene: (index: number) => {
    set((state) => {
      return {
        scenes: state.scenes.filter((_, i) => i !== index),
      };
    });
  },
  updateScene: (scene, index) => {
    set((state) => ({
      scenes: state.scenes.map((s, i) => {
        if (i !== index) return s;
        if (!scene) return { id: null, name: null, directoryId: null };
        return {
          id: scene.id,
          name: scene.name,
          directoryId: scene.directoryId,
        };
      }),
    }));
  },
}));
