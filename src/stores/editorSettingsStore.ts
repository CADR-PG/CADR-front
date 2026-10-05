import { create } from 'zustand';

export interface Asset {
  id: string | null;
  name: string | null;
  directory: string | null;
}

interface State {
  scene: Asset | null;
  scenes: (Asset | null)[];
}

interface Action {
  setScene: (scene: Asset | null) => void;
  setScenes: (scenes: Asset[]) => void;
  pushScene: (scene: Asset | null) => void;
  removeScene: (index: number) => void;
  updateScene: (scene: Asset | null) => void;
}

const initialState: State = {
  scene: null,
  scenes: [],
};

export const useEditorSettingsStore = create<State & Action>((set) => ({
  ...initialState,
  setScene: (scene: Asset | null) => {
    set({ scene });
  },
  setScenes: (scenes: Asset[]) => {
    set({ scenes });
  },
  pushScene: (scene: Asset | null) => {
    set((state) => ({ scenes: [...state.scenes, scene] }));
  },
  removeScene: (index: number) => {
    set((state) => ({ scenes: state.scenes.filter((_, i) => i !== index) }));
  },
  updateScene: (scene: Asset | null) => {
    set((state) => {
      if (!scene) return { scene: { id: null, name: null, directory: null } };
      return {
        scene: { id: scene.id, name: scene.name, directory: scene.directory },
      };
    });
  },
}));
